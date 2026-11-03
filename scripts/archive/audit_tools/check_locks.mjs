import pg from "pg";
const { Client } = pg;

const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function check() {
  const client = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const res = await client.query(`
    SELECT pid, age(clock_timestamp(), query_start), usename, query, state 
    FROM pg_stat_activity 
    WHERE state != 'idle' AND pid <> pg_backend_pid();
  `);
  console.log("Active queries in DB:", res.rows);

  await client.end();
}

check().catch(console.error);
