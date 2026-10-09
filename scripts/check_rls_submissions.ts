import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const policies = await prisma.$queryRawUnsafe(`
    SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE tablename = 'exam_submissions';
  `);
  console.log('POLICIES:', JSON.stringify(policies, null, 2));

  const rlsStatus = await prisma.$queryRawUnsafe(`
    SELECT relname, relrowsecurity, relforcerowsecurity 
    FROM pg_class 
    WHERE relname = 'exam_submissions';
  `);
  console.log('RLS STATUS:', JSON.stringify(rlsStatus, null, 2));

  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
