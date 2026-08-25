import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Scanning Database for corrupted escaped newlines (e.g. 'nn', 'n[', etc.)...");

  const sampleQuestion = await prisma.question.findFirst({
    where: {
      questionText: {
        contains: "painters show remarkable",
      },
    },
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

  if (sampleQuestion) {
    console.log("\n=== FOUND SAMPLE QUESTION FROM SCREENSHOT ===");
    console.log("ID:", sampleQuestion.id);
    console.log("Exam Title:", sampleQuestion.group?.section?.exam?.title);
    console.log("Raw Question Text:\n", JSON.stringify(sampleQuestion.questionText));
    console.log("Formatted Question Text:\n", sampleQuestion.questionText);
    console.log("Options:\n", JSON.stringify(sampleQuestion.options));
    console.log("Correct Answer:\n", JSON.stringify(sampleQuestion.correctAnswer));
  } else {
    console.log("Sample question not found by exact phrase. Searching for questions containing 'nn'...");
  }

  const allQuestionsWithNn = await prisma.question.findMany({
    where: {
      OR: [
        { questionText: { contains: "\nn\n" } },
        { questionText: { contains: "nn\n" } },
        { questionText: { contains: "\nnn" } },
        { questionText: { contains: "nn(" } },
        { questionText: { contains: "impressingn" } },
      ],
    },
    select: {
      id: true,
      questionText: true,
      questionType: true,
    },
    take: 10,
  });

  console.log(`\nFound ${allQuestionsWithNn.length} sample questions matching pattern:`);
  for (const q of allQuestionsWithNn) {
    console.log(`\n--- Question [${q.id}] (${q.questionType}) ---`);
    console.log(JSON.stringify(q.questionText));
  }

  // Count across all tables
  const totalQuestions = await prisma.question.count();
  const totalGroups = await prisma.questionGroup.count();
  console.log(`\nTotal Questions in DB: ${totalQuestions}, Total Groups: ${totalGroups}`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
