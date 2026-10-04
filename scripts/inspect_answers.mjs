import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function inspect() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  await oldClient.connect();

  const { rows: sampleData } = await oldClient.query(`SELECT * FROM answers LIMIT 2;`);
  console.log("Answers rows:", sampleData);

  const { rows: count } = await oldClient.query(`SELECT count(*) FROM answers;`);
  console.log("Total answers count:", count[0].count);

  await oldClient.end();
}

inspect().catch(console.error);
