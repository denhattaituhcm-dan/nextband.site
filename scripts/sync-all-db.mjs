import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function syncAll() {
  const ddlStatements = [
    // 1. Missing columns
    `ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS joined_at timestamptz DEFAULT now()`,
    `ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS resigned_at timestamptz`,
    `ALTER TABLE public.class_students ADD COLUMN IF NOT EXISTS completed_at timestamptz`,
    `ALTER TABLE public.contact_leads ADD COLUMN IF NOT EXISTS converted_at timestamptz`,
    `ALTER TABLE public.assessment_sessions ADD COLUMN IF NOT EXISTS user_id uuid`,

    // 2. Missing tables
    `CREATE TABLE IF NOT EXISTS public.lessons (
      id text PRIMARY KEY,
      course_id text NOT NULL,
      title text NOT NULL,
      description text,
      lesson_order integer NOT NULL DEFAULT 1,
      estimated_minutes integer,
      status text NOT NULL DEFAULT 'PUBLISHED',
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS public.lesson_resources (
      id text PRIMARY KEY,
      lesson_id text NOT NULL,
      title text NOT NULL,
      type text NOT NULL DEFAULT 'LINK',
      url text NOT NULL,
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS public.invitations (
      id text PRIMARY KEY,
      class_id text NOT NULL,
      invite_token text NOT NULL UNIQUE,
      invite_code text NOT NULL UNIQUE,
      created_by text NOT NULL,
      status text NOT NULL DEFAULT 'ACTIVE',
      expires_at timestamp(3),
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS public.enrollment_audit_logs (
      id text PRIMARY KEY,
      operator_id text NOT NULL,
      student_id text NOT NULL,
      class_id text NOT NULL,
      from_status text,
      to_status text,
      action text NOT NULL,
      reason text,
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS public.homeworks (
      id text PRIMARY KEY,
      class_id text NOT NULL,
      created_by text NOT NULL,
      lesson_id text,
      exam_id text,
      title text NOT NULL,
      description text,
      deadline timestamp(3),
      status text NOT NULL DEFAULT 'PUBLISHED',
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS public.submissions (
      id text PRIMARY KEY,
      homework_id text NOT NULL,
      student_id text NOT NULL,
      status text NOT NULL DEFAULT 'in_progress',
      submitted_at timestamp(3),
      graded_at timestamp(3),
      score numeric,
      feedback text,
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT submissions_hw_student_unique UNIQUE (homework_id, student_id)
    )`,

    `CREATE TABLE IF NOT EXISTS public.idempotency_records (
      id text PRIMARY KEY,
      key text NOT NULL UNIQUE,
      submission_id text NOT NULL,
      payload_hash text NOT NULL,
      response_payload jsonb NOT NULL,
      status text NOT NULL DEFAULT 'COMMITTED',
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS public.student_periodic_reports (
      id text PRIMARY KEY,
      class_id text NOT NULL,
      student_id text NOT NULL,
      teacher_id text NOT NULL,
      period_start date NOT NULL,
      period_end date NOT NULL,
      strengths text,
      weaknesses text,
      recommendations text,
      next_period_goals jsonb DEFAULT '[]'::jsonb,
      created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT student_reports_unique UNIQUE (class_id, student_id, period_start, period_end)
    )`
  ];

  for (const sql of ddlStatements) {
    try {
      await prisma.$executeRawUnsafe(sql);
      console.log("Executed successfully:", sql.slice(0, 50) + "...");
    } catch (err) {
      console.error("Failed statement:", sql.slice(0, 50), err.message);
    }
  }

  await prisma.$disconnect();
}

syncAll();
