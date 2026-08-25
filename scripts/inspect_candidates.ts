import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function inspectCandidates() {
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

  const candidates: any[] = [];

  for (const q of allQuestions) {
    const text = q.questionText || "";
    const hasTagN = /<\/[a-z0-9]+>n+/i.test(text) || /n+<[a-z0-9]+/i.test(text);
    const hasWordN = /\b(Tourist|Features|impressing|traffic|improve|making|separate|move|far|sunlight|of)n\b/i.test(text) ||
                     /([a-z]{3,})n([a-z]{3,})/i.test(text) ||
                     /n\s{1,2}[a-z]/i.test(text);

    if (hasTagN || hasWordN || text.includes("nn")) {
      candidates.push({
        id: q.id,
        exam: q.group?.section?.exam?.title,
        section: q.group?.section?.title,
        group: q.group?.title,
        text,
      });
    }
  }

  console.log(`Found ${candidates.length} candidate questions.`);
  for (const c of candidates) {
    console.log(`\n======================================================`);
    console.log(`ID: ${c.id} | Exam: "${c.exam}" | Section: "${c.section}"`);
    console.log(c.text);
  }

  // Check QuestionGroups
  const allGroups = await prisma.questionGroup.findMany({
    include: {
      section: {
        include: {
          exam: true,
        },
      },
    },
  });

  console.log(`\n=== CHECKING ALL GROUPS ===`);
  for (const g of allGroups) {
    const text = (g.passage || "") + (g.instructions || "");
    if (/<\/[a-z0-9]+>n+/i.test(text) || /n+<[a-z0-9]+/i.test(text) || text.includes("Touristn") || text.includes("Featuresn")) {
      console.log(`\n[Group ID: ${g.id}] in Exam: "${g.section?.exam?.title}"`);
      console.log("Passage:", g.passage);
    }
  }
}

inspectCandidates()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
