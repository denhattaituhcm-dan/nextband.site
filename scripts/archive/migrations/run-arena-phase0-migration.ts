/**
 * Migration Script: Phase 0 - Arena Domain Tables and Constraints
 * 
 * Creates:
 * 1. ENUM ArenaRoomStatus
 * 2. TABLE arena_rooms
 * 3. TABLE arena_participants
 * 4. TABLE arena_answers
 * 5. Partial Unique Index on active PIN: WHERE status != 'ENDED'
 * 6. Unique Constraint on (room_id, normalized_nickname)
 * 7. Unique Constraint on (participant_id, question_id)
 * 
 * Run: npx tsx server/scripts/run-arena-phase0-migration.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runMigration() {
  console.log('🚀 Starting Phase 0: Arena Database Migration...\n');

  const statements = [
    // 1. Create Enum ArenaRoomStatus if not exists
    `DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ArenaRoomStatus') THEN
        CREATE TYPE "ArenaRoomStatus" AS ENUM (
          'LOBBY',
          'QUESTION_LIVE',
          'ROUND_LOCKED',
          'ROUND_REVEAL',
          'LEADERBOARD',
          'PODIUM',
          'ENDED'
        );
      END IF;
    END$$;`,

    // 2. Create table arena_rooms
    `CREATE TABLE IF NOT EXISTS "arena_rooms" (
      "id" UUID NOT NULL DEFAULT gen_random_uuid(),
      "pin" VARCHAR(6) NOT NULL,
      "host_user_id" UUID REFERENCES "profiles"("user_id") ON DELETE SET NULL,
      "host_token_hash" TEXT NOT NULL,
      "exam_id" UUID REFERENCES "exams"("id") ON DELETE SET NULL,
      "status" "ArenaRoomStatus" NOT NULL DEFAULT 'LOBBY',
      "current_round" INTEGER NOT NULL DEFAULT 0,
      "current_question_id" TEXT,
      "round_started_at" TIMESTAMP(3),
      "round_deadline_at" TIMESTAMP(3),
      "last_command_id" TEXT,
      "config" JSONB,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "expires_at" TIMESTAMP(3),
      CONSTRAINT "arena_rooms_pkey" PRIMARY KEY ("id")
    );`,

    // 3. Partial Unique Index on pin (active rooms only: status != 'ENDED')
    `CREATE UNIQUE INDEX IF NOT EXISTS "idx_arena_rooms_active_pin"
     ON "arena_rooms" ("pin")
     WHERE "status" != 'ENDED';`,

    // 4. Additional indexes on arena_rooms
    `CREATE INDEX IF NOT EXISTS "idx_arena_rooms_pin" ON "arena_rooms" ("pin");`,
    `CREATE INDEX IF NOT EXISTS "idx_arena_rooms_status" ON "arena_rooms" ("status");`,

    // 5. Create table arena_participants
    `CREATE TABLE IF NOT EXISTS "arena_participants" (
      "id" UUID NOT NULL DEFAULT gen_random_uuid(),
      "room_id" UUID NOT NULL REFERENCES "arena_rooms"("id") ON DELETE CASCADE,
      "player_session_token" TEXT NOT NULL,
      "nickname" VARCHAR(30) NOT NULL,
      "normalized_nickname" VARCHAR(30) NOT NULL,
      "avatar_id" INTEGER NOT NULL DEFAULT 0,
      "total_score" INTEGER NOT NULL DEFAULT 0,
      "total_gold" INTEGER NOT NULL DEFAULT 0,
      "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "arena_participants_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "arena_participants_player_session_token_key" UNIQUE ("player_session_token"),
      CONSTRAINT "arena_participants_room_id_normalized_nickname_key" UNIQUE ("room_id", "normalized_nickname")
    );`,

    // 6. Index on arena_participants
    `CREATE INDEX IF NOT EXISTS "idx_arena_participants_room_id" ON "arena_participants" ("room_id");`,

    // 7. Create table arena_answers
    `CREATE TABLE IF NOT EXISTS "arena_answers" (
      "id" UUID NOT NULL DEFAULT gen_random_uuid(),
      "room_id" UUID NOT NULL REFERENCES "arena_rooms"("id") ON DELETE CASCADE,
      "participant_id" UUID NOT NULL REFERENCES "arena_participants"("id") ON DELETE CASCADE,
      "question_id" TEXT NOT NULL,
      "round_index" INTEGER NOT NULL,
      "selected_option_id" TEXT NOT NULL,
      "is_correct" BOOLEAN NOT NULL,
      "score_awarded" INTEGER NOT NULL DEFAULT 0,
      "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "client_telemetry_time" TIMESTAMP(3),
      CONSTRAINT "arena_answers_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "arena_answers_participant_id_question_id_key" UNIQUE ("participant_id", "question_id")
    );`,

    // 8. Index on arena_answers
    `CREATE INDEX IF NOT EXISTS "idx_arena_answers_room_round" ON "arena_answers" ("room_id", "round_index");`
  ];

  let ok = 0;
  let errors = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    try {
      await prisma.$executeRawUnsafe(stmt);
      ok++;
      console.log(`  [${i + 1}/${statements.length}] OK`);
    } catch (err: any) {
      errors++;
      console.error(`  [${i + 1}/${statements.length}] ERROR: ${err?.message || err}`);
    }
  }

  console.log(`\nMigration completed: ${ok} succeeded, ${errors} failed.`);
  await prisma.$disconnect();

  if (errors > 0) {
    process.exit(1);
  }
}

runMigration().catch((e) => {
  console.error('Fatal migration error:', e);
  process.exit(1);
});
