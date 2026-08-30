import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkClassStudent() {
  const cs = await prisma.classStudent.findMany({
    where: { studentId: "3835536b-ac37-426f-bbea-fe7e4a61a21b" },
    include: { class: true },
  });
  console.log("Student classes:", cs.map(c => ({ id: c.classId, name: c.class.name })));
}

checkClassStudent().finally(() => prisma.$disconnect());
