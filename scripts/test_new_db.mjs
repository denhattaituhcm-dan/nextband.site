import { PrismaClient } from "@prisma/client";

const newDirectUrl = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";
const newPoolerUrl = "postgresql://postgres.dmamqxiukfiyhfbbcqsq:anhxtanhmat1@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

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
