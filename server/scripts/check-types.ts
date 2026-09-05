import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

// Add FK constraints with correct UUID types
const statements = [
  // Fix: weekly_snapshots FKs (columns are TEXT but referenced cols are UUID — need to cast)
  // Actually Postgres allows FK between TEXT and UUID only if types match.
  // Solution: Alter columns to UUID type first, then add FK.
  `ALTER TABLE "weekly_snapshots" ALTER COLUMN "id" TYPE uuid USING id::uuid`,
  `ALTER TABLE "weekly_snapshots" ALTER COLUMN "class_id" TYPE uuid USING class_id::uuid`,
  `ALTER TABLE "weekly_snapshots" ALTER COLUMN "student_id" TYPE uuid USING student_id::uuid`,
  `ALTER TABLE "weekly_snapshots" ADD CONSTRAINT "weekly_snapshots_class_id_fkey"
    FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE CASCADE`,
  `ALTER TABLE "weekly_snapshots" ADD CONSTRAINT "weekly_snapshots_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "profiles" ("user_id") ON DELETE CASCADE`,
];

for (const stmt of statements) {
  try {
    await p.$executeRawUnsafe(stmt);
    console.log('✓', stmt.substring(0, 80));
  } catch (err: any) {
    const msg = err.message ?? '';
    if (msg.includes('already exists') || msg.includes('duplicate')) {
      console.log('⚠ skip:', stmt.substring(0, 60));
    } else {
      console.error('✗', msg.substring(0, 300));
    }
  }
}

await p.$disconnect();
