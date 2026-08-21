import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function applyPatch() {
  console.log("================================================================================");
  console.log("             PHASE 1: APPLYING P0 RLS & PRIVILEGE LOCKDOWN PATCH                ");
  console.log("             Target: Supabase PostgreSQL (Production DB)                        ");
  console.log("================================================================================\n");

  const sqlStatements = [
    // --- 1. COURSES ---
    `ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow authenticated full access to courses" ON public.courses;`,
    `DROP POLICY IF EXISTS "Allow anon select courses" ON public.courses;`,
    `DROP POLICY IF EXISTS "courses_select_policy" ON public.courses;`,
    `DROP POLICY IF EXISTS "courses_admin_write_policy" ON public.courses;`,
    `CREATE POLICY "courses_select_policy" ON public.courses FOR SELECT USING (
      is_published = true 
      OR has_role(auth.uid(), 'admin'::app_role) 
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR EXISTS (SELECT 1 FROM public.enrollments en WHERE en.course_id = courses.id AND en.student_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.class_students cs JOIN public.classes c ON cs.class_id = c.id WHERE c.course_id = courses.id AND cs.student_id = auth.uid())
    );`,
    `CREATE POLICY "courses_admin_write_policy" ON public.courses FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
    );`,

    // --- 2. CLASSES ---
    `ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow authenticated full access to classes" ON public.classes;`,
    `DROP POLICY IF EXISTS "Allow anon select classes" ON public.classes;`,
    `DROP POLICY IF EXISTS "classes_select_policy" ON public.classes;`,
    `DROP POLICY IF EXISTS "classes_write_policy" ON public.classes;`,
    `CREATE POLICY "classes_select_policy" ON public.classes FOR SELECT USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR teacher_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.class_students cs WHERE cs.class_id = classes.id AND cs.student_id = auth.uid())
    );`,
    `CREATE POLICY "classes_write_policy" ON public.classes FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR (has_role(auth.uid(), 'teacher'::app_role) AND teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR (has_role(auth.uid(), 'teacher'::app_role) AND teacher_id = auth.uid())
    );`,

    // --- 3. ENROLLMENTS ---
    `ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "Allow authenticated full access to enrollments" ON public.enrollments;`,
    `DROP POLICY IF EXISTS "Users can view own enrollments or admins/teachers can view all" ON public.enrollments;`,
    `DROP POLICY IF EXISTS "Users can enroll themselves or admins can enroll anyone" ON public.enrollments;`,
    `DROP POLICY IF EXISTS "Users can update own enrollments or admins can update any" ON public.enrollments;`,
    `DROP POLICY IF EXISTS "Users can delete own enrollments or admins can delete any" ON public.enrollments;`,
    `DROP POLICY IF EXISTS "enrollments_select_policy" ON public.enrollments;`,
    `DROP POLICY IF EXISTS "enrollments_admin_write_policy" ON public.enrollments;`,
    `CREATE POLICY "enrollments_select_policy" ON public.enrollments FOR SELECT USING (
      student_id = auth.uid()
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    );`,
    `CREATE POLICY "enrollments_admin_write_policy" ON public.enrollments FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
    );`,

    // --- 4. CLASS_STUDENTS ---
    `ALTER TABLE public.class_students ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "class_students_select_policy" ON public.class_students;`,
    `DROP POLICY IF EXISTS "class_students_write_policy" ON public.class_students;`,
    `CREATE POLICY "class_students_select_policy" ON public.class_students FOR SELECT USING (
      student_id = auth.uid()
      OR has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid())
    );`,
    `CREATE POLICY "class_students_write_policy" ON public.class_students FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid())
    );`,

    // --- 5. CLASS_SESSIONS & CLASS_ATTENDANCE ---
    `ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "class_sessions_select_policy" ON public.class_sessions;`,
    `DROP POLICY IF EXISTS "class_sessions_write_policy" ON public.class_sessions;`,
    `CREATE POLICY "class_sessions_select_policy" ON public.class_sessions FOR SELECT USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_sessions.class_id AND c.teacher_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.class_students cs WHERE cs.class_id = class_sessions.class_id AND cs.student_id = auth.uid())
    );`,
    `CREATE POLICY "class_sessions_write_policy" ON public.class_sessions FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_sessions.class_id AND c.teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_sessions.class_id AND c.teacher_id = auth.uid())
    );`,

    `ALTER TABLE public.class_attendance ENABLE ROW LEVEL SECURITY;`,
    `DROP POLICY IF EXISTS "class_attendance_select_policy" ON public.class_attendance;`,
    `DROP POLICY IF EXISTS "class_attendance_write_policy" ON public.class_attendance;`,
    `CREATE POLICY "class_attendance_select_policy" ON public.class_attendance FOR SELECT USING (
      student_id = auth.uid()
      OR has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_attendance.class_id AND c.teacher_id = auth.uid())
    );`,
    `CREATE POLICY "class_attendance_write_policy" ON public.class_attendance FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_attendance.class_id AND c.teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_attendance.class_id AND c.teacher_id = auth.uid())
    );`,

    // --- 6. RPC admin_create_user DENY-BY-DEFAULT & AUTHORIZATION ---
    `REVOKE EXECUTE ON FUNCTION public.admin_create_user(text, text, text, text, text, text) FROM public, anon, authenticated;`,
    `GRANT EXECUTE ON FUNCTION public.admin_create_user(text, text, text, text, text, text) TO service_role, postgres;`,
    `CREATE OR REPLACE FUNCTION public.admin_create_user(
      p_email text,
      p_full_name text DEFAULT NULL,
      p_phone text DEFAULT NULL,
      p_gender text DEFAULT NULL,
      p_role text DEFAULT 'student',
      p_password text DEFAULT 'nextband123'
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_new_id uuid := gen_random_uuid();
      v_existing_id uuid;
      v_result json;
      v_encrypted_pw text;
    BEGIN
      -- Authorization Check: Must be service_role, postgres superuser, or admin
      IF (COALESCE(auth.role(), '') <> 'service_role' AND current_user <> 'postgres' AND NOT has_role(auth.uid(), 'admin'::app_role)) THEN
        RAISE EXCEPTION 'Access denied: caller does not have admin privileges' USING ERRCODE = '42501';
      END IF;

      -- 1. Check if user already exists in auth.users or profiles (Idempotency Check)
      SELECT id INTO v_existing_id FROM auth.users WHERE email = p_email LIMIT 1;
      IF v_existing_id IS NULL THEN
        SELECT user_id INTO v_existing_id FROM public.profiles WHERE email = p_email LIMIT 1;
      END IF;

      IF v_existing_id IS NOT NULL THEN
        UPDATE public.profiles
        SET full_name = COALESCE(p_full_name, full_name),
            phone = COALESCE(p_phone, phone),
            gender = COALESCE(p_gender, gender),
            is_active = true,
            updated_at = now()
        WHERE user_id = v_existing_id OR id = v_existing_id;

        INSERT INTO public.user_roles (user_id, role)
        VALUES (v_existing_id, p_role::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;

        SELECT row_to_json(p) INTO v_result FROM public.profiles p WHERE user_id = v_existing_id OR id = v_existing_id LIMIT 1;
        RETURN v_result;
      END IF;

      -- 2. Create Root Identity in auth.users with encrypted password
      v_encrypted_pw := extensions.crypt(COALESCE(p_password, 'nextband123'), extensions.gen_salt('bf'));

      INSERT INTO auth.users (
        id, instance_id, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud,
        created_at, updated_at
      ) VALUES (
        v_new_id,
        '00000000-0000-0000-0000-000000000000',
        p_email,
        v_encrypted_pw,
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('full_name', p_full_name),
        false,
        'authenticated',
        'authenticated',
        now(),
        now()
      );

      -- 3. Create or update profile record matching auth.users(id)
      INSERT INTO public.profiles (id, user_id, email, full_name, phone, gender, is_active)
      VALUES (v_new_id, v_new_id, p_email, p_full_name, p_phone, p_gender, true)
      ON CONFLICT (user_id) DO UPDATE
      SET full_name = EXCLUDED.full_name,
          phone = EXCLUDED.phone,
          gender = EXCLUDED.gender;

      -- 4. Create user role mapping
      INSERT INTO public.user_roles (user_id, role)
      VALUES (v_new_id, p_role::app_role)
      ON CONFLICT (user_id, role) DO NOTHING;

      SELECT row_to_json(p) INTO v_result FROM public.profiles p WHERE user_id = v_new_id;
      RETURN v_result;
    EXCEPTION WHEN OTHERS THEN
      RAISE;
    END;
    $$;`
  ];

  for (let i = 0; i < sqlStatements.length; i++) {
    const stmt = sqlStatements[i].trim();
    try {
      await prisma.$executeRawUnsafe(stmt);
      console.log(`✓ [${i + 1}/${sqlStatements.length}] Statement executed successfully.`);
    } catch (err: any) {
      console.error(`❌ [${i + 1}/${sqlStatements.length}] Error executing statement:`, err.message);
      throw err;
    }
  }

  console.log("\n================================================================================");
  console.log("       ✅ PHASE 1 SQL PATCH APPLIED SUCCESSFULLY TO PRODUCTION DATABASE         ");
  console.log("================================================================================");
}

applyPatch()
  .catch((e) => {
    console.error("FATAL PATCH ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
