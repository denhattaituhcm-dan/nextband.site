import { PrismaClient } from "@prisma/client";

async function applyMigration() {
  const prisma = new PrismaClient();
  try {
    console.log("Checking / applying type ClassStatus...");
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ClassStatus') THEN
          CREATE TYPE "ClassStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'CLOSED', 'ARCHIVED');
        END IF;
      END $$;
    `);
    console.log("✅ ClassStatus enum type checked/created successfully.");

    await prisma.$executeRawUnsafe(`
      ALTER TABLE classes 
      ADD COLUMN IF NOT EXISTS branch_id UUID,
      ADD COLUMN IF NOT EXISTS room_id UUID;
    `);
    console.log("✅ branch_id & room_id columns checked/added successfully.");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

applyMigration();
