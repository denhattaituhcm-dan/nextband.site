import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function showAllCorrupted() {
  const allQuestions = await prisma.question.findMany({
    include: {
      group: {
        include: {
          section: {
            include: {
              exam: true,
            },
          },
        },
      },
    },
  });

  console.log(`Checking ${allQuestions.length} questions...`);

  let count = 0;
  for (const q of allQuestions) {
    const text = q.questionText || "";
    // Check patterns
    if (text.includes("</p>nn") || text.includes("nn<") || text.includes(">nn") || text.includes("impressingn") || text.includes("trafficn") || text.includes("improven") || text.includes("makingn") || text.includes("separaten") || text.includes("moven") || text.includes("sunlightn") || text.includes("ofnsomething") || text.includes("farnahead")) {
      count++;
      console.log(`\n======================================================`);
      console.log(`[#${count}] Exam: "${q.group?.section?.exam?.title}" | Section: "${q.group?.section?.title}" | Group: "${q.group?.title || 'No Title'}"`);
      console.log(`Question ID: ${q.id} (Type: ${q.questionType})`);
      console.log(`--- RAW TEXT ---`);
      console.log(text);
    }
  }

  console.log(`\nTotal corrupted questions found: ${count}`);
}

showAllCorrupted()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
