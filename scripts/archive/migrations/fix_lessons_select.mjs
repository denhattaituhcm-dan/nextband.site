import pg from "pg";
const { Client } = pg;

const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function fixLessonsSelect() {
  const client = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });
  await client.connect();

  await client.query(`
    CREATE OR REPLACE FUNCTION public.is_student_enrolled_in_course(_course_id anyelement, _user_id anyelement)
    RETURNS boolean
    LANGUAGE sql
    STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM enrollments
        WHERE course_id = _course_id::text AND student_id = _user_id::text
      );
    $$;
  `);

  await client.query(`
    CREATE POLICY "lessons_select" ON "lessons" AS PERMISSIVE FOR SELECT TO public 
    USING ((status = 'PUBLISHED') OR (EXISTS ( SELECT 1 FROM courses c WHERE ((c.id = lessons.course_id) AND (c.teacher_id = auth.uid()::text)))) OR is_student_enrolled_in_course(course_id, auth.uid()::text) OR has_role(auth.uid()::text, 'admin'::app_role));
  `);

  console.log("✓ lessons_select created successfully!");

  const { rows } = await client.query("SELECT count(*) FROM pg_policies WHERE schemaname = 'public';");
  console.log(`🎉 Total active RLS Policies in NEW DB: ${rows[0].count}`);

  await client.end();
}

fixLessonsSelect().catch(console.error);
