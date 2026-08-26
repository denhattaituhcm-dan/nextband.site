import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function upgradeFunctionsAndTest() {
  try {
    console.log("Upgrading handle_new_user()...");
    await prisma.$executeRawUnsafe(`
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
    `);

    console.log("Upgrading admin_create_user()...");
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
        -- Defense-in-depth: Caller check
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
          jsonb_build_object('full_name', p_full_name, 'role', p_role),
          false,
          'authenticated',
          'authenticated',
          now(),
          now()
        );

        -- 3. Create or update profile record matching auth.users(id)
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

        -- 4. Create user role mapping
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
    console.log("Functions upgraded successfully!");

    // Now test creating student exactly as entered by user in screenshot!
    // Email: danhngochoang0504@gmail.com
    // Name: Ngô Hoàng Phương Anh
    // Phone: 0901234567
    // Parent Phone: 0909876543
    const testEmail = "danhngochoang0504@gmail.com";
    const fullName = "Ngô Hoàng Phương Anh";
    const phone = "0901234567";
    const parentPhone = "0909876543";

    console.log("Testing user creation for:", testEmail);
    const createRes = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        $2::text,
        $3::text,
        NULL::text,
        'student'::text,
        'nextband123',
        NULL::text,
        $4::text,
        NULL::date
      ) as result;
    `, testEmail, fullName, phone, parentPhone);

    console.log("Creation result:", JSON.stringify(createRes, null, 2));

    const verify = await prisma.user.findFirst({
      where: { email: testEmail },
      include: { roles: true },
    });
    console.log("Verified in Prisma:", JSON.stringify(verify, null, 2));

  } catch (err) {
    console.error("Test error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

upgradeFunctionsAndTest();
