import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  console.log('--- Step 1: Creating partial unique index on arena_rooms ---');
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "idx_arena_rooms_active_pin" 
    ON "arena_rooms" ("pin") 
    WHERE "status" != 'ENDED';
  `);
  console.log('✓ Step 1 done');

  console.log('--- Step 2: Creating public.admin_create_user (9 parameters) ---');
  await prisma.$executeRawUnsafe(`
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
      -- Authorization check: caller must be service_role, postgres, or an admin
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
  `);
  console.log('✓ Step 2 done');

  console.log('--- Step 3: Creating backward-compatible public.admin_create_user (6 parameters) ---');
  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION public.admin_create_user(
      p_email text,
      p_full_name text DEFAULT NULL,
      p_phone text DEFAULT NULL,
      p_gender text DEFAULT NULL,
      p_role text DEFAULT 'student',
      p_password text DEFAULT 'nextband123'
    )
    RETURNS json
    LANGUAGE sql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
      SELECT public.admin_create_user(
        p_email,
        p_full_name,
        p_phone,
        p_gender,
        p_role,
        p_password,
        NULL::text,
        NULL::text,
        NULL::date
      );
    $$;
  `);
  console.log('✓ Step 3 done');

  console.log('🎉 All 3 migration steps completed successfully!');
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
