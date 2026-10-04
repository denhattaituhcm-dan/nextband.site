-- AlterTable profiles
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "joined_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "resigned_at" TIMESTAMP(3) WITH TIME ZONE;

-- AlterTable class_students
ALTER TABLE "class_students" ADD COLUMN IF NOT EXISTS "completed_at" TIMESTAMP(3) WITH TIME ZONE;

-- AlterTable contact_leads
ALTER TABLE "contact_leads" ADD COLUMN IF NOT EXISTS "converted_at" TIMESTAMP(3) WITH TIME ZONE;

-- AlterTable assessment_sessions
ALTER TABLE "assessment_sessions" ADD COLUMN IF NOT EXISTS "user_id" UUID;

-- CreateTable lessons
CREATE TABLE IF NOT EXISTS "lessons" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "lesson_order" INTEGER NOT NULL DEFAULT 1,
    "estimated_minutes" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable lesson_resources
CREATE TABLE IF NOT EXISTS "lesson_resources" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'LINK',
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lesson_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable invitations
CREATE TABLE IF NOT EXISTS "invitations" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "invite_token" TEXT NOT NULL UNIQUE,
    "invite_code" TEXT NOT NULL UNIQUE,
    "created_by" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable enrollment_audit_logs
CREATE TABLE IF NOT EXISTS "enrollment_audit_logs" (
    "id" TEXT NOT NULL,
    "operator_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "from_status" TEXT,
    "to_status" TEXT,
    "action" TEXT NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "enrollment_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable homeworks
CREATE TABLE IF NOT EXISTS "homeworks" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "lesson_id" TEXT,
    "exam_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "homeworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable submissions
CREATE TABLE IF NOT EXISTS "submissions" (
    "id" TEXT NOT NULL,
    "homework_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "submitted_at" TIMESTAMP(3),
    "graded_at" TIMESTAMP(3),
    "score" DECIMAL(65,30),
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "submissions_homework_student_unique" UNIQUE ("homework_id", "student_id")
);

-- CreateTable idempotency_records
CREATE TABLE IF NOT EXISTS "idempotency_records" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL UNIQUE,
    "submission_id" TEXT NOT NULL,
    "payload_hash" TEXT NOT NULL,
    "response_payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMMITTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "idempotency_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable student_periodic_reports
CREATE TABLE IF NOT EXISTS "student_periodic_reports" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "period_start" DATE NOT NULL,
    "period_end" DATE NOT NULL,
    "strengths" TEXT,
    "weaknesses" TEXT,
    "recommendations" TEXT,
    "next_period_goals" JSONB DEFAULT '[]'::jsonb,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "student_periodic_reports_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "student_periodic_reports_unique" UNIQUE ("class_id", "student_id", "period_start", "period_end")
);

-- Functions & Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (user_id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'student'::public.app_role))
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_create_user(
  p_email text,
  p_full_name text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_gender text DEFAULT NULL,
  p_role text DEFAULT 'student',
  p_password text DEFAULT 'nextband123',
  p_parent_name text DEFAULT NULL,
  p_parent_phone text DEFAULT NULL,
  p_date_of_birth date DEFAULT NULL
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
  IF (COALESCE(auth.role(), '') <> 'service_role' AND current_user <> 'postgres' AND NOT has_role(auth.uid(), 'admin'::app_role)) THEN
    RAISE EXCEPTION 'Access denied: caller does not have admin privileges' USING ERRCODE = '42501';
  END IF;

  SELECT id INTO v_existing_id FROM auth.users WHERE email = p_email LIMIT 1;
  IF v_existing_id IS NULL THEN
    SELECT user_id INTO v_existing_id FROM public.profiles WHERE email = p_email LIMIT 1;
  END IF;

  IF v_existing_id IS NOT NULL THEN
    UPDATE public.profiles
    SET full_name = COALESCE(p_full_name, full_name),
        phone = COALESCE(p_phone, phone),
        gender = COALESCE(p_gender, gender),
        parent_name = COALESCE(p_parent_name, parent_name),
        parent_phone = COALESCE(p_parent_phone, parent_phone),
        date_of_birth = COALESCE(p_date_of_birth, date_of_birth),
        is_active = true,
        updated_at = now()
    WHERE user_id = v_existing_id OR id = v_existing_id;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_existing_id, p_role::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;

    SELECT row_to_json(p) INTO v_result FROM public.profiles p WHERE user_id = v_existing_id OR id = v_existing_id LIMIT 1;
    RETURN v_result;
  END IF;

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
    jsonb_build_object('full_name', p_full_name, 'role', p_role),
    false,
    'authenticated',
    'authenticated',
    now(),
    now()
  );

  INSERT INTO public.profiles (
    id, user_id, email, full_name, phone, gender, parent_name, parent_phone, date_of_birth, is_active
  )
  VALUES (
    v_new_id, v_new_id, p_email, p_full_name, p_phone, p_gender, p_parent_name, p_parent_phone, p_date_of_birth, true
  )
  ON CONFLICT (user_id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      phone = EXCLUDED.phone,
      gender = EXCLUDED.gender,
      parent_name = EXCLUDED.parent_name,
      parent_phone = EXCLUDED.parent_phone,
      date_of_birth = EXCLUDED.date_of_birth,
      is_active = true,
      updated_at = now();

  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_new_id, p_role::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  SELECT row_to_json(p) INTO v_result FROM public.profiles p WHERE user_id = v_new_id;
  RETURN v_result;
EXCEPTION WHEN OTHERS THEN
  RAISE;
END;
$$;
