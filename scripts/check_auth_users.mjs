import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function checkAuth() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  const { rows: oldAdmins } = await oldClient.query(
    "SELECT id, email, encrypted_password, email_confirmed_at, role, raw_app_meta_data, raw_user_meta_data FROM auth.users WHERE email ILIKE '%admin%';"
  );
  console.log("OLD auth.users matching admin:", oldAdmins);

  const { rows: newUsers } = await newClient.query("SELECT count(*) FROM auth.users;");
  console.log("NEW auth.users count:", newUsers[0].count);

  await oldClient.end();
  await newClient.end();
}

checkAuth().catch(console.error);
