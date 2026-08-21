import { PrismaClient } from "@prisma/client";

const poolerUrl = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10";
const directUrl = "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:5432/postgres";

async function testConnection(name, url) {
  console.log(`\nTesting ${name}...`);
  const prisma = new PrismaClient({
    datasources: { db: { url } },
    log: ["error"],
  });

  try {
    const start = Date.now();
    await prisma.$connect();
    const count = await prisma.user.count();
    const duration = Date.now() - start;
    console.log(`✅ ${name} SUCCESS in ${duration}ms. Total users: ${count}`);
    await prisma.$disconnect();
    return true;
  } catch (err) {
    console.error(`❌ ${name} FAILED:`, err.message);
    await prisma.$disconnect().catch(() => {});
    return false;
  }
}

async function main() {
  await testConnection("Direct Port 5432", directUrl);
  // Also test standard db host on 6543
  await testConnection("Direct Host Port 6543", "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:6543/postgres?pgbouncer=true");
  // Test Pooler host on 6543
  await testConnection("Supabase Pooler Port 6543", poolerUrl);
}

main();
