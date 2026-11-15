const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');

async function main() {
  const directUrl = process.env.DIRECT_URL.replace(/^"|"$/g, '');
  const client = new Client({ connectionString: directUrl });
  try {
    await client.connect();
    console.log('Applying RLS and policies on vocab_in_use_bookmarks...');

    await client.query(`ALTER TABLE "vocab_in_use_bookmarks" ENABLE ROW LEVEL SECURITY;`);
    await client.query(`ALTER TABLE "vocab_in_use_bookmarks" FORCE ROW LEVEL SECURITY;`);

    // Drop if existing
    await client.query(`DROP POLICY IF EXISTS "Users can only read own vocab_in_use_bookmarks" ON "vocab_in_use_bookmarks";`);
    await client.query(`DROP POLICY IF EXISTS "Users can only insert own vocab_in_use_bookmarks" ON "vocab_in_use_bookmarks";`);
    await client.query(`DROP POLICY IF EXISTS "Users can only update own vocab_in_use_bookmarks" ON "vocab_in_use_bookmarks";`);
    await client.query(`DROP POLICY IF EXISTS "Users can only delete own vocab_in_use_bookmarks" ON "vocab_in_use_bookmarks";`);

    // Create policies
    await client.query(`
      CREATE POLICY "Users can only read own vocab_in_use_bookmarks"
        ON "vocab_in_use_bookmarks" FOR SELECT
        USING (auth.uid()::text = user_id);
    `);

    await client.query(`
      CREATE POLICY "Users can only insert own vocab_in_use_bookmarks"
        ON "vocab_in_use_bookmarks" FOR INSERT
        WITH CHECK (auth.uid()::text = user_id);
    `);

    await client.query(`
      CREATE POLICY "Users can only update own vocab_in_use_bookmarks"
        ON "vocab_in_use_bookmarks" FOR UPDATE
        USING (auth.uid()::text = user_id)
        WITH CHECK (auth.uid()::text = user_id);
    `);

    await client.query(`
      CREATE POLICY "Users can only delete own vocab_in_use_bookmarks"
        ON "vocab_in_use_bookmarks" FOR DELETE
        USING (auth.uid()::text = user_id);
    `);

    console.log('✅ RLS and 4 Policies applied successfully!');

    // Re-verify
    const rlsRes = await client.query(`
      SELECT c.relname, c.relrowsecurity, c.relforcerowsecurity 
      FROM pg_class c 
      JOIN pg_namespace n ON n.oid = c.relnamespace 
      WHERE n.nspname = 'public' AND c.relname = 'vocab_in_use_bookmarks'
    `);
    console.log('RLS status:', rlsRes.rows);

    const policiesRes = await client.query(`
      SELECT polname, polcmd 
      FROM pg_policy 
      WHERE polrelid = 'vocab_in_use_bookmarks'::regclass
    `);
    console.log('Policies applied:', policiesRes.rows);
  } catch (err) {
    console.error('Error applying RLS:', err);
  } finally {
    await client.end();
  }
}

main();
