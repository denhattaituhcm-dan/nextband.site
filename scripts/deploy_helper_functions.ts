import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  console.log('--- Creating helper functions (has_role, is_teacher_of_class, is_student_in_class) ---');
  
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student');
      END IF;
    END
    $$;
  `);

  await prisma.$executeRawUnsafe(`
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
  console.log('✓ has_role function created');

  await prisma.$executeRawUnsafe(`
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
  console.log('✓ is_teacher_of_class function created');

  await prisma.$executeRawUnsafe(`
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
  console.log('✓ is_student_in_class function created');

  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
