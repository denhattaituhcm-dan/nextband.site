-- Migration generated via Prisma CLI diff:
-- Comparison: Schema (pre-VIU) -> Schema (with VocabInUseBookmark)

-- CreateTable
CREATE TABLE IF NOT EXISTS "vocab_in_use_bookmarks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "lexicon_id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "ipa" TEXT,
    "pos" TEXT,
    "meaning_vi" TEXT NOT NULL,
    "meaning_en" TEXT,
    "nuance_tip" TEXT,
    "example" TEXT,
    "register_note" TEXT,
    "example_source" TEXT,
    "ielts_use" TEXT,
    "usage_flag" TEXT,
    "mastery_state" INTEGER NOT NULL DEFAULT 0,
    "mastery_score" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "interval_days" INTEGER NOT NULL DEFAULT 1,
    "ease_factor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "next_review_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_reviews" INTEGER NOT NULL DEFAULT 0,
    "failed_reviews" INTEGER NOT NULL DEFAULT 0,
    "history" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vocab_in_use_bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "vocab_in_use_bookmarks_user_id_next_review_at_idx" ON "vocab_in_use_bookmarks"("user_id", "next_review_at");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "vocab_in_use_bookmarks_user_id_unit_id_lexicon_id_key" ON "vocab_in_use_bookmarks"("user_id", "unit_id", "lexicon_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'vocab_in_use_bookmarks_user_id_fkey'
    ) THEN
        ALTER TABLE "vocab_in_use_bookmarks" 
        ADD CONSTRAINT "vocab_in_use_bookmarks_user_id_fkey" 
        FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Enable Row Level Security (RLS) for Supabase direct access safety
ALTER TABLE "vocab_in_use_bookmarks" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'vocab_in_use_bookmarks' AND policyname = 'Users can manage their own VIU bookmarks'
    ) THEN
        CREATE POLICY "Users can manage their own VIU bookmarks"
        ON "vocab_in_use_bookmarks"
        FOR ALL
        USING (auth.uid()::text = user_id)
        WITH CHECK (auth.uid()::text = user_id);
    END IF;
END $$;
