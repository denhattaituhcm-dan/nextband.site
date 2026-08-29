import { PrismaClient } from "@prisma/client";

async function runMigration() {
  const prisma = new PrismaClient();
  console.log("🚀 Starting Phase 0 DDL Migration...");

  try {
    // 1. Audit Outbox Table
    console.log("-> Creating audit_outbox table...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "public"."audit_outbox" (
        "id" TEXT NOT NULL,
        "event_type" TEXT NOT NULL,
        "actor_id" TEXT NOT NULL,
        "actor_role" TEXT NOT NULL,
        "submission_id" TEXT,
        "exam_id" TEXT,
        "request_id" TEXT,
        "idempotency_key_hash" TEXT,
        "old_state" TEXT,
        "new_state" TEXT,
        "result_summary" TEXT,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "audit_outbox_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "audit_outbox_event_type_created_at_idx" ON "public"."audit_outbox"("event_type", "created_at");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "audit_outbox_submission_id_idx" ON "public"."audit_outbox"("submission_id");
    `);

    // 2. Profiles: referral_code
    console.log("-> Adding referral_code to profiles...");
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "public"."profiles" ADD COLUMN IF NOT EXISTS "referral_code" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "profiles_referral_code_key" ON "public"."profiles"("referral_code");
    `);

    // 3. Contact Leads: referral_code & inviter_user_id
    console.log("-> Adding referral fields to contact_leads...");
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "public"."contact_leads" ADD COLUMN IF NOT EXISTS "referral_code" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "public"."contact_leads" ADD COLUMN IF NOT EXISTS "inviter_user_id" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "contact_leads_inviter_user_id_idx" ON "public"."contact_leads"("inviter_user_id");
    `);

    // 4. Enums
    console.log("-> Creating Enums...");
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "public"."AttributionStatus" AS ENUM ('ATTRIBUTED', 'CONVERTED', 'ENROLLED', 'CANCELLED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "public"."RewardStatus" AS ENUM ('PENDING_QUALIFICATION', 'ELIGIBLE', 'PROCESSING', 'DELIVERED', 'CANCELLED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 5. Referral Attributions Table
    console.log("-> Creating referral_attributions table...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "public"."referral_attributions" (
        "id" TEXT NOT NULL,
        "inviter_user_id" TEXT NOT NULL,
        "referee_lead_id" TEXT,
        "referee_user_id" TEXT NOT NULL,
        "referral_code" TEXT NOT NULL,
        "discount_amount" DECIMAL(12,2) NOT NULL DEFAULT 200000.00,
        "status" "public"."AttributionStatus" NOT NULL DEFAULT 'ATTRIBUTED',
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "referral_attributions_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "referral_attributions_referee_lead_id_key" UNIQUE ("referee_lead_id"),
        CONSTRAINT "referral_attributions_referee_user_id_key" UNIQUE ("referee_user_id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "referral_attributions_inviter_user_id_idx" ON "public"."referral_attributions"("inviter_user_id");
    `);

    // 6. Referral Rewards Table
    console.log("-> Creating referral_rewards table...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "public"."referral_rewards" (
        "id" TEXT NOT NULL,
        "attribution_id" TEXT NOT NULL,
        "inviter_user_id" TEXT NOT NULL,
        "reward_type" TEXT NOT NULL DEFAULT 'ARIS_GIFT_BOX',
        "status" "public"."RewardStatus" NOT NULL DEFAULT 'PENDING_QUALIFICATION',
        "qualified_at" TIMESTAMP(3),
        "delivered_at" TIMESTAMP(3),
        "notes" TEXT,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "referral_rewards_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "referral_rewards_attribution_id_reward_type_key" UNIQUE ("attribution_id", "reward_type")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "referral_rewards_inviter_user_id_status_idx" ON "public"."referral_rewards"("inviter_user_id", "status");
    `);

    // 7. Backfill stable referralCode for existing users
    console.log("-> Backfilling referral codes for existing users without one...");
    const usersWithoutCode = await prisma.user.findMany({
      where: { referralCode: null },
      select: { userId: true, fullName: true },
    });

    for (const u of usersWithoutCode) {
      const cleanName = (u.fullName || "STUDENT")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z]/g, "")
        .slice(0, 5)
        .padEnd(5, "X");
      const idSuffix = u.userId.replace(/-/g, "").slice(-4).toUpperCase();
      let code = `ARIS-${cleanName}${idSuffix}`;
      
      try {
        await prisma.user.update({
          where: { userId: u.userId },
          data: { referralCode: code },
        });
      } catch {
        code = `ARIS-${cleanName}${Math.floor(1000 + Math.random() * 9000)}`;
        await prisma.user.update({
          where: { userId: u.userId },
          data: { referralCode: code },
        }).catch(() => {});
      }
    }

    console.log(`✅ Backfilled referral codes for ${usersWithoutCode.length} users.`);
    console.log("🎉 Phase 0 DDL Migration Completed Successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();
