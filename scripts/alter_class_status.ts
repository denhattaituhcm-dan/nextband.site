import { PrismaClient } from "@prisma/client";

async function alterColumnType() {
  const prisma = new PrismaClient();
  try {
    console.log("Altering classes.status column to ClassStatus enum...");
    await prisma.$executeRawUnsafe(`
      ALTER TABLE classes 
        ALTER COLUMN status DROP DEFAULT,
        ALTER COLUMN status TYPE "ClassStatus" USING (
          CASE 
            WHEN status = 'DRAFT' THEN 'DRAFT'::"ClassStatus"
            WHEN status = 'COMPLETED' THEN 'COMPLETED'::"ClassStatus"
            WHEN status = 'CLOSED' THEN 'CLOSED'::"ClassStatus"
            WHEN status = 'ARCHIVED' THEN 'ARCHIVED'::"ClassStatus"
            ELSE 'ACTIVE'::"ClassStatus"
          END
        ),
        ALTER COLUMN status SET DEFAULT 'ACTIVE'::"ClassStatus";
    `);
    console.log("✅ Column classes.status altered to ClassStatus successfully.");
  } catch (err) {
    console.error("Error altering column:", err);
  } finally {
    await prisma.$disconnect();
  }
}

alterColumnType();
