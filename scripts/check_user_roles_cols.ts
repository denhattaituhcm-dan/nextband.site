import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const cols = await prisma.$queryRawUnsafe(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = 'user_roles';
  `);
  console.log('USER_ROLES COLUMNS:', JSON.stringify(cols, null, 2));
  await prisma.$disconnect();
}

run().catch(console.error);
