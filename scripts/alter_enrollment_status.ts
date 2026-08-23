import { PrismaClient } from "@prisma/client";

async function alterEnrollmentStatus() {
  const prisma = new PrismaClient();
  try {
    console.log("Checking / applying type EnrollmentStatus...");
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'EnrollmentStatus') THEN
          CREATE TYPE "EnrollmentStatus" AS ENUM ('INVITED', 'PENDING', 'ACTIVE', 'SUSPENDED', 'COMPLETED');
        END IF;
      END $$;
    `);

    // Check if class_students has status column and alter it
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'class_students' AND column_name = 'status'
        ) THEN
          ALTER TABLE class_students 
            ALTER COLUMN status DROP DEFAULT,
            ALTER COLUMN status TYPE "EnrollmentStatus" USING (
              CASE 
                WHEN status = 'INVITED' THEN 'INVITED'::"EnrollmentStatus"
                WHEN status = 'PENDING' THEN 'PENDING'::"EnrollmentStatus"
                WHEN status = 'SUSPENDED' THEN 'SUSPENDED'::"EnrollmentStatus"
                WHEN status = 'COMPLETED' THEN 'COMPLETED'::"EnrollmentStatus"
                ELSE 'ACTIVE'::"EnrollmentStatus"
              END
            ),
            ALTER COLUMN status SET DEFAULT 'ACTIVE'::"EnrollmentStatus";
        ELSE
          ALTER TABLE class_students 
            ADD COLUMN status "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE'::"EnrollmentStatus";
        END IF;
      END $$;
    `);

    console.log("✅ EnrollmentStatus enum & column updated successfully.");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

alterEnrollmentStatus();
