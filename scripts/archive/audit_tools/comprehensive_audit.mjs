import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function comprehensiveAudit() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("================================================================================");
  console.log("            COMPREHENSIVE AUDIT: OLD SUPABASE vs NEW SUPABASE                  ");
  console.log("================================================================================\n");

  // 1. Audit ALL Public Tables
  const { rows: publicTables } = await oldClient.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations'
    ORDER BY table_name;
  `);

  console.log("--- 1. AUDIT PUBLIC SCHEMA TABLES ---");
  const missingTables = [];
  const countMismatches = [];

  for (const { table_name } of publicTables) {
    try {
      const { rows: oldRes } = await oldClient.query(`SELECT count(*) FROM "${table_name}";`);
      const oldCount = parseInt(oldRes[0].count, 10);

      // Check if table exists in new DB
      const { rows: existsCheck } = await newClient.query(`
        SELECT count(*) FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1;
      `, [table_name]);

      if (parseInt(existsCheck[0].count, 10) === 0) {
        missingTables.push({ table: table_name, oldCount });
        continue;
      }

      const { rows: newRes } = await newClient.query(`SELECT count(*) FROM "${table_name}";`);
      const newCount = parseInt(newRes[0].count, 10);

      const status = oldCount === newCount ? "✅ MATCH" : "⚠️ MISMATCH";
      if (oldCount !== newCount) {
        countMismatches.push({ table: table_name, old: oldCount, new: newCount });
      }
      console.log(`[${status}] ${table_name.padEnd(35)} : Old = ${oldCount.toString().padStart(5)}, New = ${newCount.toString().padStart(5)}`);
    } catch (err) {
      console.error(`❌ Error auditing table ${table_name}:`, err.message);
    }
  }

  // 2. Audit Auth Schema
  console.log("\n--- 2. AUDIT AUTH SCHEMA (USERS & IDENTITIES) ---");
  const { rows: oldAuthUsers } = await oldClient.query("SELECT count(*) FROM auth.users;");
  const { rows: newAuthUsers } = await newClient.query("SELECT count(*) FROM auth.users;");
  console.log(`Auth Users: Old = ${oldAuthUsers[0].count}, New = ${newAuthUsers[0].count}`);

  const { rows: oldAuthIdentities } = await oldClient.query("SELECT count(*) FROM auth.identities;");
  const { rows: newAuthIdentities } = await newClient.query("SELECT count(*) FROM auth.identities;");
  console.log(`Auth Identities: Old = ${oldAuthIdentities[0].count}, New = ${newAuthIdentities[0].count}`);

  // 3. Audit Storage Schema
  console.log("\n--- 3. AUDIT STORAGE SCHEMA (BUCKETS & OBJECTS) ---");
  const { rows: oldBuckets } = await oldClient.query("SELECT id, name, public FROM storage.buckets;");
  const { rows: newBuckets } = await newClient.query("SELECT id, name, public FROM storage.buckets;");
  console.log("Old Buckets:", oldBuckets);
  console.log("New Buckets:", newBuckets);

  const { rows: oldObjects } = await oldClient.query("SELECT count(*) FROM storage.objects;");
  const { rows: newObjects } = await newClient.query("SELECT count(*) FROM storage.objects;");
  console.log(`Storage Objects: Old = ${oldObjects[0].count}, New = ${newObjects[0].count}`);

  // 4. Audit PostgreSQL Functions & RPCs
  console.log("\n--- 4. AUDIT DATABASE FUNCTIONS & RPCs ---");
  const { rows: oldFuncs } = await oldClient.query(`
    SELECT routine_name 
    FROM information_schema.routines 
    WHERE routine_schema = 'public'
    ORDER BY routine_name;
  `);
  const { rows: newFuncs } = await newClient.query(`
    SELECT routine_name 
    FROM information_schema.routines 
    WHERE routine_schema = 'public'
    ORDER BY routine_name;
  `);

  const oldFuncNames = oldFuncs.map(f => f.routine_name);
  const newFuncNames = newFuncs.map(f => f.routine_name);
  const missingFuncs = oldFuncNames.filter(f => !newFuncNames.includes(f));

  console.log(`Functions in OLD public: ${oldFuncNames.length} (${oldFuncNames.join(", ")})`);
  console.log(`Functions in NEW public: ${newFuncNames.length} (${newFuncNames.join(", ")})`);
  if (missingFuncs.length > 0) {
    console.log(`⚠️ Missing Functions in NEW DB:`, missingFuncs);
  } else {
    console.log(`✅ All functions match!`);
  }

  // 5. Audit RLS (Row Level Security) Policies
  console.log("\n--- 5. AUDIT ROW LEVEL SECURITY (RLS) POLICIES ---");
  const { rows: oldPolicies } = await oldClient.query(`
    SELECT tablename, policyname, permissive, roles, cmd, qual 
    FROM pg_policies 
    WHERE schemaname = 'public';
  `);
  const { rows: newPolicies } = await newClient.query(`
    SELECT tablename, policyname, permissive, roles, cmd, qual 
    FROM pg_policies 
    WHERE schemaname = 'public';
  `);
  console.log(`Total Policies in OLD public: ${oldPolicies.length}`);
  console.log(`Total Policies in NEW public: ${newPolicies.length}`);

  // Summary
  console.log("\n================================================================================");
  console.log("                               SUMMARY REPORT                                   ");
  console.log("================================================================================");
  console.log(`- Mismatched tables count: ${countMismatches.length}`);
  if (countMismatches.length > 0) {
    console.log("  Details:", countMismatches);
  }
  console.log(`- Missing tables in new DB: ${missingTables.length}`);
  if (missingTables.length > 0) {
    console.log("  Details:", missingTables);
  }
  console.log(`- Missing functions: ${missingFuncs.length}`);
  if (missingFuncs.length > 0) {
    console.log("  Details:", missingFuncs);
  }

  await oldClient.end();
  await newClient.end();
}

comprehensiveAudit().catch(console.error);
