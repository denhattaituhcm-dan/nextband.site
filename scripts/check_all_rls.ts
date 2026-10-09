import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const rlsAll = await prisma.$queryRawUnsafe(`
    SELECT c.relname, c.relrowsecurity, c.relforcerowsecurity
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
    ORDER BY c.relname;
  `);
  console.log('ALL TABLES RLS STATUS:');
  for (const r of rlsAll as any[]) {
    console.log(`${r.relname}: rls=${r.relrowsecurity}, force=${r.relforcerowsecurity}`);
  }
  await prisma.$disconnect();
}

run().catch(console.error);
