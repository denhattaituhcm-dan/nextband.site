import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:6543/postgres?pgbouncer=true&connection_limit=5",
    },
  },
});

async function hardenAllPolicies() {
  console.log("Hardening all PostgreSQL RLS policies against cascade/recursion failures...");

  const stmts = [
    // 1. Course enrollment security definer helper
    `CREATE OR REPLACE FUNCTION public.is_student_enrolled_in_course(_course_id uuid, _user_id uuid)
     RETURNS boolean
     LANGUAGE sql
     STABLE SECURITY DEFINER
     SET search_path = public, auth
     AS $$
       SELECT EXISTS (
         SELECT 1 FROM public.enrollments WHERE course_id = _course_id AND student_id = _user_id
       ) OR EXISTS (
         SELECT 1 FROM public.class_students cs
         JOIN public.classes c ON cs.class_id = c.id
         WHERE c.course_id = _course_id AND cs.student_id = _user_id
       );
     $$;`,

    // 2. Update courses select policy
    `DROP POLICY IF EXISTS "courses_select_policy" ON public.courses;`,
    `CREATE POLICY "courses_select_policy" ON public.courses
     FOR SELECT
     USING (
       is_published = true
       OR has_role(auth.uid(), 'admin'::app_role)
       OR has_role(auth.uid(), 'teacher'::app_role)
       OR is_student_enrolled_in_course(id, auth.uid())
     );`,

    // 3. Update class_attendance policies
    `DROP POLICY IF EXISTS "class_attendance_select_policy" ON public.class_attendance;`,
    `CREATE POLICY "class_attendance_select_policy" ON public.class_attendance
     FOR SELECT
     USING (
       student_id = auth.uid()
       OR has_role(auth.uid(), 'admin'::app_role)
       OR is_teacher_of_class(class_id, auth.uid())
     );`,

    `DROP POLICY IF EXISTS "class_attendance_write_policy" ON public.class_attendance;`,
    `CREATE POLICY "class_attendance_write_policy" ON public.class_attendance
     FOR ALL
     USING (
       has_role(auth.uid(), 'admin'::app_role)
       OR is_teacher_of_class(class_id, auth.uid())
     )
     WITH CHECK (
       has_role(auth.uid(), 'admin'::app_role)
       OR is_teacher_of_class(class_id, auth.uid())
     );`,

    // 4. Update class_sessions policies
    `DROP POLICY IF EXISTS "class_sessions_select_policy" ON public.class_sessions;`,
    `CREATE POLICY "class_sessions_select_policy" ON public.class_sessions
     FOR SELECT
     USING (
       has_role(auth.uid(), 'admin'::app_role)
       OR is_teacher_of_class(class_id, auth.uid())
       OR is_student_in_class(class_id, auth.uid())
     );`,

    `DROP POLICY IF EXISTS "class_sessions_write_policy" ON public.class_sessions;`,
    `CREATE POLICY "class_sessions_write_policy" ON public.class_sessions
     FOR ALL
     USING (
       has_role(auth.uid(), 'admin'::app_role)
       OR is_teacher_of_class(class_id, auth.uid())
     )
     WITH CHECK (
       has_role(auth.uid(), 'admin'::app_role)
       OR is_teacher_of_class(class_id, auth.uid())
     );`,
  ];

  for (const sql of stmts) {
    await prisma.$executeRawUnsafe(sql);
  }

  console.log("✅ All RLS policies hardened successfully!");
  await prisma.$disconnect();
}

hardenAllPolicies().catch(console.error);
