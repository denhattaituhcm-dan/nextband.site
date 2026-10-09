import { PrismaClient } from "@prisma/client";

const poolerUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const directUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

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
  await testConnection("Direct Host Port 6543", process.env.DIRECT_URL || process.env.DATABASE_URL || "");
  // Test Pooler host on 6543
  await testConnection("Supabase Pooler Port 6543", poolerUrl);
}

main();
