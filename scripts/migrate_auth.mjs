import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function migrateAuth() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to transfer auth schema...");
  await newClient.query("SET session_replication_role = 'replica';");

  // Get columns from new auth.users that are NOT generated
  const { rows: newCols } = await newClient.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' AND table_name = 'users' AND is_generated = 'NEVER';
  `);
  const validColNames = newCols.map(c => c.column_name);

  // Get all users from old auth.users
  const { rows: users } = await oldClient.query("SELECT * FROM auth.users;");
  console.log(`Found ${users.length} users in old auth.users`);

  for (const u of users) {
    const keys = Object.keys(u).filter(k => validColNames.includes(k));
    const colsSql = keys.map(k => `"${k}"`).join(", ");
    const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(", ");
    const values = keys.map(k => {
      let val = u[k];
      if (typeof val === "object" && val !== null && !(val instanceof Date)) {
        val = JSON.stringify(val);
      }
      return val;
    });

    const insertSql = `INSERT INTO auth.users (${colsSql}) VALUES (${placeholders}) ON CONFLICT (id) DO UPDATE SET encrypted_password = EXCLUDED.encrypted_password;`;
    await newClient.query(insertSql, values);
  }
  console.log("✓ All auth.users transferred!");

  // Transfer auth.identities
  const { rows: identities } = await oldClient.query("SELECT * FROM auth.identities;");
  console.log(`Found ${identities.length} identities in old auth.identities`);

  const { rows: idCols } = await newClient.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' AND table_name = 'identities' AND is_generated = 'NEVER';
  `);
  const validIdColNames = idCols.map(c => c.column_name);

  for (const id of identities) {
    const keys = Object.keys(id).filter(k => validIdColNames.includes(k));
    const colsSql = keys.map(k => `"${k}"`).join(", ");
    const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(", ");
    const values = keys.map(k => {
      let val = id[k];
      if (typeof val === "object" && val !== null && !(val instanceof Date)) {
        val = JSON.stringify(val);
      }
      return val;
    });

    const insertSql = `INSERT INTO auth.identities (${colsSql}) VALUES (${placeholders}) ON CONFLICT (id) DO NOTHING;`;
    await newClient.query(insertSql, values);
  }
  console.log("✓ All auth.identities transferred!");

  await newClient.query("SET session_replication_role = 'origin';");

  // Check admin account in new auth
  const { rows: checkAdmin } = await newClient.query(
    "SELECT id, email, role, email_confirmed_at FROM auth.users WHERE lower(email) = 'admin@ielts.com';"
  );
  console.log("\nAdmin account in NEW auth.users:", checkAdmin[0]);

  await oldClient.end();
  await newClient.end();
  console.log("\n🎉 AUTH MIGRATION COMPLETED SUCCESSFULLY!");
}

migrateAuth().catch(console.error);
