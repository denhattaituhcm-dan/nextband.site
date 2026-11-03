import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'staff';`);
    console.log("Successfully ensured 'staff' in enum app_role");
  } catch (err) {
    console.error("Migration error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
