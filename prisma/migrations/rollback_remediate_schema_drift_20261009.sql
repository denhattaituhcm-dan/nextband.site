-- ==============================================================================
-- ROLLBACK SCRIPT FOR remediate_schema_drift_20261009.sql
-- ==============================================================================

-- 1. Drop partial index on arena_rooms
DROP INDEX IF EXISTS "idx_arena_rooms_active_pin";

-- 2. Drop overloaded functions
DROP FUNCTION IF EXISTS public.admin_create_user(text, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.admin_create_user(text, text, text, text, text, text, text, text, date);
