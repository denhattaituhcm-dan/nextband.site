import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function inspect() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });
  await oldClient.connect();
  await newClient.connect();

  console.log("--- ENROLLMENTS OLD COLUMNS ---");
  const { rows: oldCols } = await oldClient.query(`
    SELECT column_name, data_type, udt_name 
    FROM information_schema.columns 
    WHERE table_name = 'enrollments';
  `);
  console.log(oldCols);

  console.log("--- ENROLLMENTS NEW COLUMNS ---");
  const { rows: newCols } = await newClient.query(`
    SELECT column_name, data_type, udt_name 
    FROM information_schema.columns 
    WHERE table_name = 'enrollments';
  `);
  console.log(newCols);

  const { rows: sampleData } = await oldClient.query(`SELECT * FROM enrollments LIMIT 2;`);
  console.log("Sample enrollments rows:", sampleData);

  await oldClient.end();
  await newClient.end();
}

inspect().catch(console.error);
