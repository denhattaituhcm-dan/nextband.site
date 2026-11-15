const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');

async function main() {
  const directUrl = process.env.DIRECT_URL.replace(/^"|"$/g, '');
  const client = new Client({ connectionString: directUrl });
  try {
    await client.connect();
    const cols = await client.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles'");
    console.log('Profiles columns:', cols.rows);
    const existingUsers = await client.query("SELECT user_id, email, full_name FROM profiles LIMIT 5");
    console.log('Existing users in profiles:', existingUsers.rows);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
