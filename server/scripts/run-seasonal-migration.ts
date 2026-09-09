/**
 * Create Seasonal Event tables directly via Prisma $executeRawUnsafe
 *
 * Run: npx tsx server/scripts/run-seasonal-migration.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runMigration() {
  const statements = [
    `CREATE TABLE IF NOT EXISTS "seasonal_events" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "code" TEXT NOT NULL UNIQUE,
      "name" TEXT NOT NULL,
      "type" TEXT NOT NULL DEFAULT 'TET',
      "is_active" BOOLEAN NOT NULL DEFAULT false,
      "start_at" TIMESTAMP(3),
      "end_at" TIMESTAMP(3),
      "budget_cap" INTEGER NOT NULL DEFAULT 800000,
      "total_slots" INTEGER NOT NULL DEFAULT 60,
      "ui_config" JSONB,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS "seasonal_reward_pools" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "event_id" TEXT NOT NULL REFERENCES "seasonal_events"("id") ON DELETE CASCADE,
      "tier" TEXT NOT NULL,
      "amount" INTEGER NOT NULL,
      "total_slots" INTEGER NOT NULL,
      "claimed_slots" INTEGER NOT NULL DEFAULT 0,
      "order" INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE INDEX IF NOT EXISTS "seasonal_reward_pools_event_id_idx" ON "seasonal_reward_pools"("event_id")`,
    `CREATE TABLE IF NOT EXISTS "seasonal_reward_claims" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "event_id" TEXT NOT NULL REFERENCES "seasonal_events"("id") ON DELETE CASCADE,
      "student_id" UUID NOT NULL REFERENCES "profiles"("user_id") ON DELETE CASCADE,
      "homework_id" TEXT NOT NULL,
      "reward_type" TEXT NOT NULL DEFAULT 'CASH',
      "amount" INTEGER NOT NULL DEFAULT 0,
      "milestone_key" TEXT,
      "is_disbursed" BOOLEAN NOT NULL DEFAULT false,
      "disbursed_at" TIMESTAMP(3),
      "claimed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "seasonal_reward_claims_event_id_student_id_homework_id_key" UNIQUE("event_id", "student_id", "homework_id")
    )`,
    `CREATE INDEX IF NOT EXISTS "seasonal_reward_claims_event_id_student_id_idx" ON "seasonal_reward_claims"("event_id", "student_id")`
  ];

  console.log(`Running ${statements.length} seasonal statements...\n`);

  let ok = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (!stmt) continue;
    try {
      await prisma.$executeRawUnsafe(stmt + (stmt.endsWith(';') ? '' : ';'));
      console.log(`✓ [${i + 1}] Success`);
      ok++;
    } catch (err: any) {
      const msg = err.message ?? '';
      if (msg.includes('already exists') || msg.includes('duplicate') || msg.includes('P2010')) {
        console.log(`⚠ [${i + 1}] Already exists: ${stmt.substring(0, 40)}`);
        skipped++;
      } else {
        console.error(`✗ [${i + 1}] FAILED: ${msg}`);
        errors++;
      }
    }
  }

  console.log(`\nDone: ${ok} applied, ${skipped} skipped, ${errors} errors`);
}

runMigration()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
