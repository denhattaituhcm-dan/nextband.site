import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function applyAllPolicies() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  const { rows: policies } = await oldClient.query(`
    SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public';
  `);

  console.log(`Processing ${policies.length} policies...`);
  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const pol of policies) {
    try {
      const { rows: existsCheck } = await newClient.query(`
        SELECT count(*) FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1;
      `, [pol.tablename]);

      if (parseInt(existsCheck[0].count, 10) === 0) {
        skipped++;
        continue;
      }

      await newClient.query(`ALTER TABLE "${pol.tablename}" ENABLE ROW LEVEL SECURITY;`);

      // Roles in pg_policies is a string like "{public}" or "{authenticated}"
      let rawRoles = pol.roles;
      let rolesClean = "public";
      if (typeof rawRoles === "string") {
        rolesClean = rawRoles.replace(/[{}]/g, "").trim() || "public";
      } else if (Array.isArray(rawRoles)) {
        rolesClean = rawRoles.join(", ");
      }

      let qual = pol.qual;
      if (qual) {
        qual = qual.replace(/auth\.uid\(\)/g, "auth.uid()::text");
      }
      let withCheck = pol.with_check;
      if (withCheck) {
        withCheck = withCheck.replace(/auth\.uid\(\)/g, "auth.uid()::text");
      }

      let sql = `CREATE POLICY "${pol.policyname}" ON "${pol.tablename}" AS ${pol.permissive} FOR ${pol.cmd} TO ${rolesClean}`;
      if (qual) {
        sql += ` USING (${qual})`;
      }
      if (withCheck) {
        sql += ` WITH CHECK (${withCheck})`;
      }
      sql += ";";

      await newClient.query(`DROP POLICY IF EXISTS "${pol.policyname}" ON "${pol.tablename}";`);
      await newClient.query(sql);
      success++;
    } catch (e) {
      failed++;
      console.error(`❌ Failed: [${pol.tablename}] "${pol.policyname}":`, e.message);
    }
  }

  console.log(`\nResults: Success: ${success}, Skipped: ${skipped}, Failed: ${failed}`);

  const { rows: finalCount } = await newClient.query("SELECT count(*) FROM pg_policies WHERE schemaname = 'public';");
  console.log(`🎉 Total RLS Policies active in NEW DB: ${finalCount[0].count}`);

  await oldClient.end();
  await newClient.end();
}

applyAllPolicies().catch(console.error);
