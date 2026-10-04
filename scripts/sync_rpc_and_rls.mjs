import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function syncRpcAndSecurity() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to extract RPCs and RLS policies...");

  // 1. Sync all Functions/RPCs
  const { rows: functions } = await oldClient.query(`
    SELECT pg_get_functiondef(p.oid) AS def, p.proname
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public';
  `);

  console.log(`Extracting ${functions.length} functions from OLD DB...`);
  for (const { def, proname } of functions) {
    try {
      await newClient.query(def);
      console.log(`  ✓ Synced function: ${proname}`);
    } catch (e) {
      console.error(`  ❌ Error syncing function ${proname}:`, e.message);
    }
  }

  // 2. Sync Triggers on public schema
  const { rows: triggers } = await oldClient.query(`
    SELECT pg_get_triggerdef(t.oid) AS def, t.tgname, c.relname
    FROM pg_trigger t
    JOIN pg_class c ON t.tgrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'public' AND NOT t.tgisinternal;
  `);

  console.log(`Extracting ${triggers.length} triggers from OLD DB...`);
  for (const { def, tgname, relname } of triggers) {
    try {
      await newClient.query(def);
      console.log(`  ✓ Synced trigger: ${tgname} on ${relname}`);
    } catch (e) {
      // Trigger may already exist or error if function missing
      console.log(`  ℹ Trigger ${tgname} on ${relname}: ${e.message}`);
    }
  }

  // 3. Enable RLS on tables and sync policies
  const { rows: rlsTables } = await oldClient.query(`
    SELECT relname 
    FROM pg_class c
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'public' AND c.relrowsecurity = true;
  `);

  console.log(`Enabling RLS on ${rlsTables.length} tables in NEW DB...`);
  for (const { relname } of rlsTables) {
    try {
      await newClient.query(`ALTER TABLE "${relname}" ENABLE ROW LEVEL SECURITY;`);
    } catch (e) {}
  }

  // Extract RLS policies definitions
  const { rows: policies } = await oldClient.query(`
    SELECT 
      schemaname,
      tablename,
      policyname,
      permissive,
      roles,
      cmd,
      qual,
      with_check
    FROM pg_policies
    WHERE schemaname = 'public';
  `);

  console.log(`Migrating ${policies.length} RLS policies...`);
  for (const pol of policies) {
    try {
      const rolesList = Array.isArray(pol.roles) ? pol.roles.join(", ") : pol.roles || "public";
      let createPolicySql = `CREATE POLICY "${pol.policyname}" ON "${pol.tablename}" AS ${pol.permissive} FOR ${pol.cmd} TO ${rolesList}`;
      if (pol.qual) {
        createPolicySql += ` USING (${pol.qual})`;
      }
      if (pol.with_check) {
        createPolicySql += ` WITH CHECK (${pol.with_check})`;
      }
      createPolicySql += ";";

      await newClient.query(createPolicySql);
    } catch (e) {
      // Ignore if exists
    }
  }
  console.log("✓ RLS Policies migration completed!");

  // Verify
  const { rows: newFuncs } = await newClient.query(`
    SELECT count(*) FROM information_schema.routines WHERE routine_schema = 'public';
  `);
  const { rows: newPols } = await newClient.query(`
    SELECT count(*) FROM pg_policies WHERE schemaname = 'public';
  `);
  console.log(`\n=================== VERIFICATION ===================`);
  console.log(`✓ Functions in NEW DB: ${newFuncs[0].count}`);
  console.log(`✓ RLS Policies in NEW DB: ${newPols[0].count}`);

  await oldClient.end();
  await newClient.end();
}

syncRpcAndSecurity().catch(console.error);
