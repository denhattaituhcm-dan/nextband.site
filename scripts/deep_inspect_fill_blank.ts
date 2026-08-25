import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function inspectAllFillBlank() {
  console.log("=== INSPECTING ALL FILL_BLANK & SHORT_ANSWER QUESTIONS ===");
  const questions = await prisma.question.findMany({
    where: {
      questionType: {
        in: ["fill_blank", "short_answer", "essay"],
      },
    },
    select: {
      id: true,
      questionType: true,
      questionText: true,
      group: {
        select: {
          id: true,
          title: true,
          section: {
            select: {
              exam: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(`Found ${questions.length} fill_blank/short_answer/essay questions.`);

  for (const q of questions) {
    const text = q.questionText || "";
    // Check if it has 'n' before lowercase letters where a newline or space was intended, or 'nn', or '[BLANK]'
    const hasNn = text.includes("nn");
    const hasNWord = /([a-z])n([a-z]{3,})/g.test(text);
    const hasMso = text.includes("MsoNormal");

    if (hasNn || hasMso) {
      console.log(`\n======================================================`);
      console.log(`Exam: [${q.group?.section?.exam?.title}] (Question ID: ${q.id})`);
      console.log(`Type: ${q.questionType}`);
      console.log(`Text:\n${text}`);
    }
  }

  // Also check all question groups with passages
  const groupsWithPassages = await prisma.questionGroup.findMany({
    where: {
      passage: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      passage: true,
      section: {
        select: {
          exam: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  console.log(`\n=== CHECKING ${groupsWithPassages.length} QUESTION GROUPS PASSAGES ===`);
  for (const g of groupsWithPassages) {
    const passage = g.passage || "";
    if (passage.includes("nn") || passage.includes("MsoNormal")) {
      console.log(`\n--- Group [${g.id}] in Exam [${g.section?.exam?.title}] ---`);
      console.log(passage.slice(0, 400));
    }
  }
}

inspectAllFillBlank()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
