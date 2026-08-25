import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const exams = await prisma.exam.findMany({
    select: { id: true, title: true, courseId: true }
  });
  console.log(`Total exams in DB: ${exams.length}`);
  const courseIdCounts: Record<string, number> = {};
  exams.forEach(e => {
    const cid = e.courseId || "NULL";
    courseIdCounts[cid] = (courseIdCounts[cid] || 0) + 1;
  });
  console.log("Exams grouped by courseId in DB:", courseIdCounts);

  // Check class 2
  const class2 = await prisma.class.findUnique({
    where: { id: '0defcb78-0eca-490e-8e41-476eedffe353' }
  });
  console.log("Class 2 (D01 07.2026):", class2);
}

main().finally(() => prisma.$disconnect());
