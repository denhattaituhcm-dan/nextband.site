const { Client } = require('pg');

async function main() {
  const client = new Client({ connectionString: 'postgresql://postgres:postgres@localhost:5432/nextband_test' });
  try {
    await client.connect();
    // Create profiles table mock if needed, or migration SQL
    const fs = require('fs');
    const sql = fs.readFileSync('prisma/migrations/20261115000000_add_vocab_in_use_bookmarks/migration.sql', 'utf8');
    
    // ensure schema auth exists with auth.uid() function
    await client.query(`CREATE SCHEMA IF NOT EXISTS auth;`);
    await client.query(`
      CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid AS $$
        SELECT NULLIF(current_setting('request.jwt.claims', true)::json->>'sub', '')::uuid;
      $$ LANGUAGE sql STABLE;
    `);

    // Create minimal profiles table if not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS "profiles" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT UNIQUE NOT NULL,
        "email" TEXT UNIQUE NOT NULL
      );
    `);

    // Run migration
    await client.query(sql);
    console.log('✅ Local test DB migration executed successfully!');
  } catch (err) {
    console.log('Note:', err.message);
  } finally {
    await client.end();
  }
}

main();
