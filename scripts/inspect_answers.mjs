import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

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
