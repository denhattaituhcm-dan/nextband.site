import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkSpecificQuestion() {
  const q = await prisma.question.findUnique({
    where: { id: "075074cb-1131-42b7-87f4-2a8b836b62a4" },
  });

  if (q) {
    console.log("=== CLEANED QUESTION IN SCREENSHOT ===");
    console.log(q.questionText);
  }
}

checkSpecificQuestion()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
