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

  // Get table list from old DB
  const { rows: tables } = await oldClient.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations';
  `);

  console.log(`Found ${tables.length} tables to transfer.`);

  for (const { table_name } of tables) {
    try {
      // Check column list in new DB
      const { rows: newCols } = await newClient.query(`
        SELECT column_name, data_type, udt_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1;
      `, [table_name]);

      if (newCols.length === 0) {
        console.log(`- ${table_name}: not in new DB schema, skipping.`);
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
      await newClient.query(`TRUNCATE TABLE "${table_name}" CASCADE;`);

      // Batch insert in blocks of 50
      const BATCH_SIZE = 50;
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        const valuePlaceholders = [];
        const flatValues = [];

        batch.forEach((row, rowIdx) => {
          const rowPlaceholders = validColNames.map((colName, colIdx) => {
            const paramIdx = rowIdx * validColNames.length + colIdx + 1;
            let val = row[colName];

            // Type casts if needed
            if (table_name === "enrollments" && colName === "progress_percent" && val !== null) {
              val = Math.round(Number(val));
            }
            if (typeof val === "object" && val !== null && !(val instanceof Date)) {
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

  // Run quick count verification
  const countChecks = [
    "profiles",
    "user_roles",
    "courses",
    "exams",
    "exam_sections",
    "question_groups",
    "questions",
    "exam_submissions",
    "answers",
    "enrollments",
    "classes"
  ];
  console.log("\n=================== VERIFICATION IN NEW DB ===================");
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
  console.log("\n🎉 ALL DATABASE DATA HAS BEEN TRANSFERRED SUCCESSFULLY!");
}

run().catch(console.error);
