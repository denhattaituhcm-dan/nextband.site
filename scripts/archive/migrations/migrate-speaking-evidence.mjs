import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function migrate() {
  console.log("🚀 Executing DDL for ARIS Speaking Evidence Engine...");

  // 1. Create speaking_evidence_tags table
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS speaking_evidence_tags (
      id VARCHAR(64) NOT NULL,
      criterion VARCHAR(8) NOT NULL,
      polarity VARCHAR(16) NOT NULL,
      label_vi VARCHAR(255) NOT NULL,
      description_vi TEXT NOT NULL,
      inclusion_rule TEXT NOT NULL,
      exclusion_rule TEXT NOT NULL,
      display_order INT DEFAULT 0,
      version VARCHAR(16) NOT NULL DEFAULT '1.0',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (id),
      CONSTRAINT uq_speaking_tag_criterion UNIQUE (id, criterion)
    );
  `);
  console.log("✅ Created/verified table: speaking_evidence_tags");

  // Create index on criterion, is_active, display_order
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS idx_speaking_tags_criterion ON speaking_evidence_tags (criterion, is_active, display_order);
  `);
  console.log("✅ Created/verified index: idx_speaking_tags_criterion");

  // 2. Create speaking_assessment_evidence table with assessment_id as UUID matching exam_submissions(id)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS speaking_assessment_evidence (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      assessment_id UUID NOT NULL REFERENCES exam_submissions(id) ON DELETE CASCADE,
      criterion VARCHAR(8) NOT NULL,
      tag_id VARCHAR(64) NOT NULL,
      evidence_note TEXT,
      created_by VARCHAR(64) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      removed_by VARCHAR(64) DEFAULT NULL,
      removed_at TIMESTAMPTZ DEFAULT NULL,
      CONSTRAINT fk_evidence_tag_strict_criterion 
          FOREIGN KEY (tag_id, criterion) 
          REFERENCES speaking_evidence_tags(id, criterion) 
          ON DELETE RESTRICT
    );
  `);
  console.log("✅ Created/verified table: speaking_assessment_evidence");

  // 3. Create partial unique index to prevent duplicate active tags on same assessment
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS uq_active_assessment_evidence_tag 
    ON speaking_assessment_evidence (assessment_id, tag_id) 
    WHERE removed_at IS NULL;
  `);
  console.log("✅ Created/verified partial unique index: uq_active_assessment_evidence_tag");

  // Indexes for querying assessment evidence & analytics
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS idx_evidence_assessment_criterion 
    ON speaking_assessment_evidence (assessment_id, criterion);
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS idx_evidence_tag_analytics 
    ON speaking_assessment_evidence (tag_id, created_at);
  `);
  console.log("✅ Created/verified analytics indexes for speaking_assessment_evidence");

  console.log("🎉 Database Migration Completed Successfully!");
}

migrate()
  .catch((e) => {
    console.error("❌ Migration error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
