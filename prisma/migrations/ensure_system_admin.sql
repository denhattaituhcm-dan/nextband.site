-- ==============================================================================
-- Migration / Script: ensure_system_admin.sql
-- Description: Idempotently ensures root system administrator accounts have 
--              authoritative 'admin' role in public.user_roles.
-- Architecture: Database-controlled identity -> Authoritative admin role.
-- Note: No regex/email matching triggers on user_roles or classes tables.
-- ==============================================================================

DO $$
DECLARE
    v_admin_id UUID;
BEGIN
    -- 1. admin@ielts.com
    SELECT id INTO v_admin_id 
    FROM auth.users 
    WHERE lower(email) = 'admin@ielts.com' 
    LIMIT 1;

    IF v_admin_id IS NOT NULL THEN
        INSERT INTO public.user_roles (id, user_id, role, created_at)
        VALUES (gen_random_uuid(), v_admin_id, 'admin'::public.app_role, NOW())
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;

    -- 2. denhattaituhcm@gmail.com
    SELECT id INTO v_admin_id 
    FROM auth.users 
    WHERE lower(email) = 'denhattaituhcm@gmail.com' 
    LIMIT 1;

    IF v_admin_id IS NOT NULL THEN
        INSERT INTO public.user_roles (id, user_id, role, created_at)
        VALUES (gen_random_uuid(), v_admin_id, 'admin'::public.app_role, NOW())
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;
