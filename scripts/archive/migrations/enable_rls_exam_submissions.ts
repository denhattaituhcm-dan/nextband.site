import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  console.log('--- Enabling RLS on exam_submissions with single statements ---');

  await prisma.$executeRawUnsafe(`ALTER TABLE public.exam_submissions ENABLE ROW LEVEL SECURITY;`);
  
  await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "exam_submissions_admin_teacher_manage" ON public.exam_submissions;`);
  await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "exam_submissions_student_select_own" ON public.exam_submissions;`);
  await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "exam_submissions_student_insert_own" ON public.exam_submissions;`);
  await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "exam_submissions_service_role" ON public.exam_submissions;`);

  await prisma.$executeRawUnsafe(`
    CREATE POLICY "exam_submissions_service_role" ON public.exam_submissions
    FOR ALL
    USING (
      COALESCE(auth.role(), '') = 'service_role' OR current_user = 'postgres'
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE POLICY "exam_submissions_admin_teacher_manage" ON public.exam_submissions
    FOR ALL
    USING (
      has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role)
    )
    WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role)
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE POLICY "exam_submissions_student_select_own" ON public.exam_submissions
    FOR SELECT
    USING (
      student_id = auth.uid()::text
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE POLICY "exam_submissions_student_insert_own" ON public.exam_submissions
    FOR INSERT
    WITH CHECK (
      student_id = auth.uid()::text
    );
  `);

  console.log('✓ Successfully configured RLS policies for exam_submissions!');
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
