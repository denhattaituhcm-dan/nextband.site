const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');

async function main() {
  const directUrl = process.env.DIRECT_URL.replace(/^"|"$/g, '');
  const client = new Client({ connectionString: directUrl });
  try {
    await client.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='vocab_in_use_bookmarks'");
    console.log('Result:', res.rows);
    const rlsRes = await client.query(`
      SELECT c.relname, c.relrowsecurity, c.relforcerowsecurity 
      FROM pg_class c 
      JOIN pg_namespace n ON n.oid = c.relnamespace 
      WHERE n.nspname = 'public' AND c.relname = 'vocab_in_use_bookmarks'
    `);
    console.log('RLS status:', rlsRes.rows);
    const policiesRes = await client.query(`
      SELECT polname, polcmd, polroles::regrole[], polqual, polwithcheck 
      FROM pg_policy 
      WHERE polrelid = 'vocab_in_use_bookmarks'::regclass
    `);
    console.log('Policies:', policiesRes.rows);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
