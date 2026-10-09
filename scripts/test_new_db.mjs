import { PrismaClient } from "@prisma/client";

const newDirectUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const newPoolerUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function testConnection(name, url) {
  console.log(`Testing ${name}...`);
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected, current_database() as db;`;
    console.log(`✅ ${name} SUCCESS:`, result);
  } catch (err) {
    console.error(`❌ ${name} ERROR:`, err.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  await testConnection("Direct Port 5432", newDirectUrl);
  await testConnection("Pooler Port 6543", newPoolerUrl);
}

run();
