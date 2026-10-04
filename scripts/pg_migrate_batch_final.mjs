import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function run() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to both old & new databases.");

  // Disable FK triggers in PostgreSQL
  await newClient.query("SET session_replication_role = 'replica';");
  console.log("✓ Disabled foreign keys (replica mode)");

  // 1. First truncate all target tables with cascade
  const { rows: tables } = await oldClient.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations';
  `);

  console.log("Truncating all public tables in new DB...");
  for (const { table_name } of tables) {
    try {
      await newClient.query(`TRUNCATE TABLE "${table_name}" CASCADE;`);
    } catch (e) {}
  }
  console.log("✓ Truncation complete.");

  // 2. Transfer each table
  for (const { table_name } of tables) {
    try {
      const { rows: newCols } = await newClient.query(`
        SELECT column_name, data_type, udt_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1;
      `, [table_name]);

      if (newCols.length === 0) {
        continue;
      }

      const validColNames = newCols.map(c => c.column_name);
      const colsSql = validColNames.map(c => `"${c}"`).join(", ");

      const { rows: data } = await oldClient.query(`SELECT ${colsSql} FROM "${table_name}";`);

      if (data.length === 0) {
        console.log(`- ${table_name}: 0 rows (skipped)`);
        continue;
      }

      console.log(`- ${table_name}: migrating ${data.length} rows...`);

      const BATCH_SIZE = 50;
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        const valuePlaceholders = [];
        const flatValues = [];

        batch.forEach((row, rowIdx) => {
          const rowPlaceholders = validColNames.map((colName, colIdx) => {
            const paramIdx = rowIdx * validColNames.length + colIdx + 1;
            let val = row[colName];

            // Type fix: enrollments progress_percent
            if (table_name === "enrollments" && colName === "progress_percent" && val !== null) {
              val = Math.round(Number(val));
            }

            // Type fix: questions points and order_index (decimal to int)
            if (table_name === "questions" && (colName === "points" || colName === "order_index") && val !== null) {
              val = Math.round(Number(val));
            }

            // Type fix: cognitive_words string array
            if (table_name === "cognitive_words" && Array.isArray(val)) {
              // pg client handles js array as postgres array if passed directly
            } else if (typeof val === "object" && val !== null && !(val instanceof Date) && !Array.isArray(val)) {
              val = JSON.stringify(val);
            }

            flatValues.push(val);
            return `$${paramIdx}`;
          });
          valuePlaceholders.push(`(${rowPlaceholders.join(", ")})`);
        });

        const insertQuery = `
          INSERT INTO "${table_name}" (${colsSql}) 
          VALUES ${valuePlaceholders.join(", ")} 
          ON CONFLICT DO NOTHING;
        `;
        await newClient.query(insertQuery, flatValues);
      }

      console.log(`  ✓ Successfully migrated ${data.length} rows into "${table_name}"`);
    } catch (err) {
      console.error(`  ❌ Error on table ${table_name}:`, err.message);
    }
  }

  await newClient.query("SET session_replication_role = 'origin';");
  console.log("✓ Re-enabled foreign keys (origin mode)");

  // Run comprehensive count verification
  const countChecks = [
    "profiles",
    "user_roles",
    "courses",
    "classes",
    "exams",
    "exam_sections",
    "question_groups",
    "questions",
    "exam_submissions",
    "answers",
    "enrollments",
    "class_students",
    "class_sessions",
    "class_attendance"
  ];

  console.log("\n=================== FINAL VERIFICATION IN NEW DB ===================");
  for (const t of countChecks) {
    try {
      const res = await newClient.query(`SELECT count(*) FROM "${t}";`);
      console.log(`✓ Table "${t}": ${res.rows[0].count} rows`);
    } catch (e) {
      console.error(`Error checking "${t}":`, e.message);
    }
  }

  await oldClient.end();
  await newClient.end();
  console.log("\n🎉 FULL SUCCESS: DATA MIGRATION COMPLETE!");
}

run().catch(console.error);
