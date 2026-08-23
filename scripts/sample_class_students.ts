import { PrismaClient } from "@prisma/client";

async function sampleClassStudents() {
  const prisma = new PrismaClient();
  try {
    const records = await prisma.$queryRaw`
      SELECT * FROM class_students LIMIT 5;
    `;
    console.log("Sample class_students records:", records);
  } finally {
    await prisma.$disconnect();
  }
}

sampleClassStudents();
