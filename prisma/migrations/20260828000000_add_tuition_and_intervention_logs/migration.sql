-- CreateEnum
DO $$ BEGIN
    CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID', 'WAIVED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "InvitationStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'DISABLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "LessonStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "ResourceType" AS ENUM ('PDF', 'VIDEO', 'AUDIO', 'SLIDE', 'LINK', 'IMAGE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "HomeworkStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "AttendanceStatus" AS ENUM ('UNMARKED', 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "ClassSessionStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable class_students
ALTER TABLE "class_students" 
  ADD COLUMN IF NOT EXISTS "tuition_fee" DECIMAL(65,30) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS "paid_amount" DECIMAL(65,30) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS "payment_status" "PaymentStatus" DEFAULT 'UNPAID',
  ADD COLUMN IF NOT EXISTS "payment_note" TEXT,
  ADD COLUMN IF NOT EXISTS "external_ref" TEXT,
  ADD COLUMN IF NOT EXISTS "suspended_at" TIMESTAMP(3) WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS "expected_return_date" TIMESTAMP(3) WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS "suspension_reason" TEXT;

CREATE INDEX IF NOT EXISTS "class_students_status_expected_return_date_idx" 
ON "class_students"("status", "expected_return_date");

-- AlterTable contact_leads
ALTER TABLE "contact_leads" 
  ADD COLUMN IF NOT EXISTS "assigned_to_user_id" TEXT,
  ADD COLUMN IF NOT EXISTS "assigned_at" TIMESTAMP(3) WITH TIME ZONE;

-- CreateTable student_intervention_logs
CREATE TABLE IF NOT EXISTS "student_intervention_logs" (
  "id" TEXT NOT NULL,
  "student_id" TEXT NOT NULL,
  "class_id" TEXT,
  "author_id" TEXT,
  "category" TEXT NOT NULL DEFAULT 'ACADEMIC_RISK',
  "title" TEXT,
  "notes" TEXT NOT NULL,
  "action_taken" TEXT,
  "agreed_plan" TEXT,
  "follow_up_date" DATE,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "resolved_at" TIMESTAMP(3) WITH TIME ZONE,
  "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "student_intervention_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "student_intervention_logs_student_id_created_at_idx" 
ON "student_intervention_logs"("student_id", "created_at");

CREATE INDEX IF NOT EXISTS "student_intervention_logs_follow_up_date_status_idx" 
ON "student_intervention_logs"("follow_up_date", "status");
