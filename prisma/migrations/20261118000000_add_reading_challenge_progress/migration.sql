-- CreateTable
CREATE TABLE IF NOT EXISTS "reading_challenge_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "unit_number" INTEGER NOT NULL,
    "current_step_index" INTEGER NOT NULL DEFAULT 0,
    "completed_steps" JSONB NOT NULL DEFAULT '[]',
    "step_answers" JSONB NOT NULL DEFAULT '{}',
    "reading_wpm" INTEGER,
    "reading_seconds" INTEGER,
    "scores" JSONB NOT NULL DEFAULT '{}',
    "writing_draft" TEXT,
    "is_unit_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "last_practiced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reading_challenge_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "reading_challenge_progress_user_id_unit_number_key" ON "reading_challenge_progress"("user_id", "unit_number");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reading_challenge_progress_user_id_idx" ON "reading_challenge_progress"("user_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reading_challenge_progress_user_id_fkey'
    ) THEN
        ALTER TABLE "reading_challenge_progress" 
        ADD CONSTRAINT "reading_challenge_progress_user_id_fkey" 
        FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Enable Row Level Security (RLS) for Supabase direct access safety
ALTER TABLE "reading_challenge_progress" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'reading_challenge_progress' AND policyname = 'Users can manage their own reading challenge progress'
    ) THEN
        CREATE POLICY "Users can manage their own reading challenge progress"
        ON "reading_challenge_progress"
        FOR ALL
        USING (auth.uid()::text = user_id)
        WITH CHECK (auth.uid()::text = user_id);
    END IF;
END $$;
