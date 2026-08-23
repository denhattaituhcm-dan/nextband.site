import { PrismaClient } from "@prisma/client";

async function inspectTable() {
  const prisma = new PrismaClient();
  try {
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_name = 'classes';
    `;
    console.log("📊 Columns in 'classes' table:", columns);
  } catch (err) {
    console.error("Error inspecting:", err);
  } finally {
    await prisma.$disconnect();
  }
}

inspectTable();
