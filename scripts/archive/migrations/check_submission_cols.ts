import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const cols = await prisma.$queryRawUnsafe(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'exam_submissions';
  `);
  console.log('EXAM_SUBMISSIONS COLS:', JSON.stringify(cols, null, 2));
  await prisma.$disconnect();
}

run().catch(console.error);
