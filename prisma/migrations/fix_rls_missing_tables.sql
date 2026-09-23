-- ============================================================
-- FIX: Enable Row Level Security on tables flagged by Supabase
-- Ticket: rls_disabled_in_public warning email
-- Date: 2026-09-23
-- ============================================================

-- -----------------------------------------------------------
-- 1. notifications table (missing RLS entirely)
-- -----------------------------------------------------------
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (auth.uid() = recipient_id);

-- Users can mark their own notifications as read
DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- Only admins/service_role can insert notifications
DROP POLICY IF EXISTS "notifications_insert_admin" ON public.notifications;
CREATE POLICY "notifications_insert_admin" ON public.notifications
  FOR INSERT WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR (auth.role() = 'service_role')
  );

-- Only admins/service_role can delete notifications
DROP POLICY IF EXISTS "notifications_delete_admin" ON public.notifications;
CREATE POLICY "notifications_delete_admin" ON public.notifications
  FOR DELETE USING (
    has_role(auth.uid(), 'admin'::app_role) OR (auth.role() = 'service_role')
  );

-- -----------------------------------------------------------
-- 2. Ensure all other public tables that appeared in the
--    Supabase alert also have RLS enabled.
--    (Safe to run even if already enabled)
-- -----------------------------------------------------------
ALTER TABLE IF EXISTS public.activity_feed         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.alerts                ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.announcement_reads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.announcements         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.answer_evaluation_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.assessment_sessions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.branches              ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.class_attendance      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.class_schedules       ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.class_sessions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.class_students        ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contact_leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enrollment_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.exam_policies         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.exam_version_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.exam_versions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.highlights            ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.invitations           ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.lesson_resources      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.lessons               ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.notification_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.notifications_legacy  ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.question_versions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.rooms                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.site_settings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.speaking_recording_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.student_intervention_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.student_periodic_reports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_branches         ENABLE ROW LEVEL SECURITY;
