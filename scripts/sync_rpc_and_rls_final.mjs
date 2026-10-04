import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const NEW_DIRECT = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

async function completeRpcAndRls() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("1. Creating functions with text/uuid compatibility in new DB...");

  // has_role (supporting both uuid and text)
  await newClient.query(`
    CREATE OR REPLACE FUNCTION public.has_role(_user_id anyelement, _role app_role)
    RETURNS boolean
    LANGUAGE sql
    STABLE SECURITY DEFINER
    SET search_path TO 'public', 'auth'
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = _user_id::text AND role = _role
      );
    $$;
  `);
  console.log("✓ has_role created with polymorphic/text support");

  // is_teacher_of_class
  await newClient.query(`
    CREATE OR REPLACE FUNCTION public.is_teacher_of_class(_class_id text, _user_id anyelement)
    RETURNS boolean
    LANGUAGE sql
    STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM classes
        WHERE id = _class_id AND teacher_id = _user_id::text
      );
    $$;
  `);
  console.log("✓ is_teacher_of_class created");

  // is_student_in_class
  await newClient.query(`
    CREATE OR REPLACE FUNCTION public.is_student_in_class(_class_id text, _user_id anyelement)
    RETURNS boolean
    LANGUAGE sql
    STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM class_students
        WHERE class_id = _class_id AND student_id = _user_id::text
      );
    $$;
  `);
  console.log("✓ is_student_in_class created");

  // is_student_enrolled_in_course
  await newClient.query(`
    CREATE OR REPLACE FUNCTION public.is_student_enrolled_in_course(_course_id text, _user_id anyelement)
    RETURNS boolean
    LANGUAGE sql
    STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM enrollments
        WHERE course_id = _course_id AND student_id = _user_id::text
      );
    $$;
  `);
  console.log("✓ is_student_enrolled_in_course created");

  // 2. Enable RLS and sync policies
  const { rows: policies } = await oldClient.query(`
    SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public';
  `);

  console.log(`\n2. Syncing ${policies.length} RLS policies...`);
  let successCount = 0;
  let failCount = 0;

  for (const pol of policies) {
    try {
      // Check if table exists in new DB
      const { rows: existsCheck } = await newClient.query(`
        SELECT count(*) FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = $1;
      `, [pol.tablename]);

      if (parseInt(existsCheck[0].count, 10) === 0) {
        continue;
      }

      await newClient.query(`ALTER TABLE "${pol.tablename}" ENABLE ROW LEVEL SECURITY;`);

      // Adapt auth.uid() = user_id where user_id is text
      let qual = pol.qual;
      if (qual) {
        qual = qual.replace(/auth\.uid\(\)/g, "auth.uid()::text");
      }
      let withCheck = pol.with_check;
      if (withCheck) {
        withCheck = withCheck.replace(/auth\.uid\(\)/g, "auth.uid()::text");
      }

      const rolesList = Array.isArray(pol.roles) ? pol.roles.join(", ") : pol.roles || "public";
      let createPolicySql = `CREATE POLICY "${pol.policyname}" ON "${pol.tablename}" AS ${pol.permissive} FOR ${pol.cmd} TO ${rolesList}`;
      if (qual) {
        createPolicySql += ` USING (${qual})`;
      }
      if (withCheck) {
        createPolicySql += ` WITH CHECK (${withCheck})`;
      }
      createPolicySql += ";";

      // Drop if exists first
      await newClient.query(`DROP POLICY IF EXISTS "${pol.policyname}" ON "${pol.tablename}";`);
      await newClient.query(createPolicySql);
      successCount++;
    } catch (e) {
      failCount++;
      console.error(`  ❌ Failed policy "${pol.policyname}" on "${pol.tablename}":`, e.message);
    }
  }

  console.log(`\n✓ Successfully synced ${successCount} RLS policies (Failed: ${failCount})`);

  // Final check
  const { rows: polCount } = await newClient.query("SELECT count(*) FROM pg_policies WHERE schemaname = 'public';");
  const { rows: funcCount } = await newClient.query("SELECT count(*) FROM information_schema.routines WHERE routine_schema = 'public';");
  console.log(`\n=================== VERIFICATION ===================`);
  console.log(`✓ Total RPC Functions in NEW DB: ${funcCount[0].count}`);
  console.log(`✓ Total RLS Security Policies in NEW DB: ${polCount[0].count}`);

  await oldClient.end();
  await newClient.end();
}

completeRpcAndRls().catch(console.error);
