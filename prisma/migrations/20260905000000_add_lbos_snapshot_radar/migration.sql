-- Migration: add_lbos_snapshot_radar
-- Adds all LBOS-related schema changes:
--   1. Class.total_weeks
--   2. ClassStudent.parent_token
--   3. WeeklySnapshot (new table, full)
--   4. StudentInterventionLog: outcome, metadata columns + new index
--   5. NotificationType: RE_ENROLLMENT_INTENT

-- 1. Add total_weeks to classes
ALTER TABLE "classes"
  ADD COLUMN IF NOT EXISTS "total_weeks" INTEGER NOT NULL DEFAULT 10;

-- 2. Add parent_token to class_students
ALTER TABLE "class_students"
  ADD COLUMN IF NOT EXISTS "parent_token" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "class_students_parent_token_key"
  ON "class_students" ("parent_token");

CREATE INDEX IF NOT EXISTS "class_students_parent_token_idx"
  ON "class_students" ("parent_token");

-- 3. Create weekly_snapshots table
CREATE TABLE IF NOT EXISTS "weekly_snapshots" (
  "id"                  UUID NOT NULL DEFAULT gen_random_uuid(),
  "class_id"            UUID NOT NULL,
  "student_id"          UUID NOT NULL,
  "week_number"         INTEGER NOT NULL,
  "cutoff_at"           TIMESTAMP(3) NOT NULL,
  "hw_completed"        INTEGER NOT NULL,
  "hw_total"            INTEGER NOT NULL,
  "hw_rate"             DOUBLE PRECISION NOT NULL,
  "streak_days"         INTEGER NOT NULL DEFAULT 0,
  "attendance_rate"     DOUBLE PRECISION NOT NULL DEFAULT 100.0,
  "scholarship_tier"    TEXT NOT NULL,
  "scholarship_amount"  DECIMAL(10, 2) NOT NULL DEFAULT 0,
  "loss_aversion_note"  TEXT,
  "performance_level"   TEXT NOT NULL DEFAULT 'ON_TRACK',
  "trajectory"          TEXT NOT NULL DEFAULT 'STABLE',
  "risk_level"          TEXT NOT NULL DEFAULT 'NONE',
  "risk_reason"         TEXT,
  "teacher_note"        TEXT,
  "parent_encouraged"   BOOLEAN NOT NULL DEFAULT false,
  "created_at"          TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "weekly_snapshots_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "weekly_snapshots_class_id_fkey"
    FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE CASCADE,
  CONSTRAINT "weekly_snapshots_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "profiles" ("user_id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "weekly_snapshots_class_id_student_id_week_number_key"
  ON "weekly_snapshots" ("class_id", "student_id", "week_number");

CREATE INDEX IF NOT EXISTS "weekly_snapshots_class_id_week_number_idx"
  ON "weekly_snapshots" ("class_id", "week_number");

CREATE INDEX IF NOT EXISTS "weekly_snapshots_student_id_idx"
  ON "weekly_snapshots" ("student_id");

ALTER TABLE "weekly_snapshots"
  ADD CONSTRAINT "weekly_snapshots_class_id_fkey"
    FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE CASCADE;

ALTER TABLE "weekly_snapshots"
  ADD CONSTRAINT "weekly_snapshots_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "profiles" ("user_id") ON DELETE CASCADE;

-- 4. Add outcome + metadata to student_intervention_logs
ALTER TABLE "student_intervention_logs"
  ADD COLUMN IF NOT EXISTS "outcome"   TEXT,
  ADD COLUMN IF NOT EXISTS "metadata"  JSONB;

CREATE INDEX IF NOT EXISTS "student_intervention_logs_class_id_status_idx"
  ON "student_intervention_logs" ("class_id", "status");

-- 5. Add RE_ENROLLMENT_INTENT to notification_type enum (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'RE_ENROLLMENT_INTENT'
      AND enumtypid = (
        SELECT oid FROM pg_type WHERE typname = 'NotificationType'
      )
  ) THEN
    ALTER TYPE "NotificationType" ADD VALUE 'RE_ENROLLMENT_INTENT';
  END IF;
END
$$;
