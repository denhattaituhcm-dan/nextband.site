import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// Helper to extract question number from text
function extractQuestionNumber(text) {
  if (!text) return null;
  const clean = text.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  // Pattern 1: "Câu 1.", "Câu 1:", "Câu 1", "Question 1.", "Question 1"
  const m1 = clean.match(/^(?:câu|question)\s*(\d+)/i);
  if (m1) return parseInt(m1[1], 10);

  // Pattern 2: "1.", "1)", "1:", "1 " at start of text
  const m2 = clean.match(/^\(?(\d+)\)?[.:]\s*/);
  if (m2) return parseInt(m2[1], 10);

  // Pattern 3: "Câu X", "Question X" anywhere in the first 50 chars
  const m3 = clean.substring(0, 50).match(/(?:câu|question)\s*(\d+)/i);
  if (m3) return parseInt(m3[1], 10);

  // Pattern 4: "Questions 1-5" -> 1
  const m4 = clean.match(/questions?\s*(\d+)\s*[-–to]/i);
  if (m4) return parseInt(m4[1], 10);

  // Pattern 5: "1) ", "2) " in hints
  const m5 = clean.match(/\b(\d+)\)\s+/);
  if (m5) return parseInt(m5[1], 10);

  return null;
}

// Helper to extract group starting number from title or children
function extractGroupNumber(title, questions = []) {
  if (title) {
    const clean = title.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

    // "from 1 to 5", "from 6 to 13", "from 19 to 28"
    const mFrom = clean.match(/from\s*(\d+)\s*to\s*(\d+)/i);
    if (mFrom) return parseInt(mFrom[1], 10);

    // "Questions 1-5", "Questions 11-14"
    const mQRange = clean.match(/questions?\s*(\d+)\s*[-–to]\s*(\d+)/i);
    if (mQRange) return parseInt(mQRange[1], 10);

    // "PHẦN 1", "Phần 2:", "Part 1", "Passage 1", "Section 1", "Task 1"
    const mPart = clean.match(/(?:phần|part|passage|section|task)\s*(\d+)/i);
    if (mPart) return parseInt(mPart[1], 10);

    // "Câu 1", "Question 1"
    const mQ = clean.match(/(?:câu|question)\s*(\d+)/i);
    if (mQ) return parseInt(mQ[1], 10);
  }

  // Fallback: use lowest question number
  if (questions.length > 0) {
    const qNums = questions
      .map((q) => extractQuestionNumber(q.questionText))
      .filter((n) => n !== null);
    if (qNums.length > 0) {
      return Math.min(...qNums);
    }
  }

  return null;
}

// Known corrupted words dictionary caused by \n stripping
const GLUED_WORDS_REPLACEMENTS = [
  { from: /\bverynconfident\b/gi, to: "very confident" },
  { from: /\bcomingntonight\b/gi, to: "coming tonight" },
  { from: /\benvironmentalnissues\b/gi, to: "environmental issues" },
  { from: /\bbeforenexams\b/gi, to: "before exams" },
  { from: /\barencurrently\b/gi, to: "are currently" },
  { from: /\bmeaningnto\b/gi, to: "meaning to" },
  { from: /\bbestndescribed\b/gi, to: "best described" },
  { from: /\beconomynimplies\b/gi, to: "economy implies" },
  { from: /\blocalnheritage\b/gi, to: "local heritage" },
  { from: /\bEurope\\'s\b/g, to: "Europe's" },
];

function repairGluedWords(text) {
  if (!text || typeof text !== "string") return text;
  let s = text;
  for (const item of GLUED_WORDS_REPLACEMENTS) {
    s = s.replace(item.from, item.to);
  }
  return s;
}

async function runReorderAndRepair(dryRun = false) {
  console.log(`\n======================================================`);
  console.log(`RE-ORDERING & REPAIRING DATABASE (dryRun = ${dryRun})`);
  console.log(`======================================================\n`);

  const exams = await prisma.exam.findMany({
    include: {
      sections: {
        include: {
          questionGroups: {
            include: {
              questions: true,
            },
          },
        },
      },
    },
  });

  let questionsRepaired = 0;
  let questionsReordered = 0;
  let groupsReordered = 0;

  for (const exam of exams) {
    for (const sec of exam.sections) {
      // 1. Text repair & question reordering within each group
      for (const grp of sec.questionGroups) {
        // A. Repair group text if needed
        const repairedPassage = repairGluedWords(grp.passage);
        const repairedInstructions = repairGluedWords(grp.instructions);
        if (repairedPassage !== grp.passage || repairedInstructions !== grp.instructions) {
          if (!dryRun) {
            await prisma.questionGroup.update({
              where: { id: grp.id },
              data: {
                passage: repairedPassage,
                instructions: repairedInstructions,
              },
            });
          }
        }

        // B. Re-order questions
        const questionsWithNums = grp.questions.map((q, originalIdx) => {
          const repairedText = repairGluedWords(q.questionText);
          if (repairedText !== q.questionText) {
            questionsRepaired++;
          }
          return {
            question: q,
            repairedText,
            num: extractQuestionNumber(repairedText),
            originalIdx,
            originalOrderIndex: q.orderIndex ?? 0,
          };
        });

        const hasNumberedQuestions = questionsWithNums.some((item) => item.num !== null);

        let sortedQuestions = [...questionsWithNums];
        if (hasNumberedQuestions) {
          sortedQuestions.sort((a, b) => {
            if (a.num !== null && b.num !== null) return a.num - b.num;
            if (a.num !== null) return -1;
            if (b.num !== null) return 1;
            return a.originalIdx - b.originalIdx;
          });
        }

        for (let i = 0; i < sortedQuestions.length; i++) {
          const item = sortedQuestions[i];
          const needsOrderUpdate = item.originalOrderIndex !== i || (hasNumberedQuestions && item.question.id !== grp.questions[i].id);
          const needsTextUpdate = item.repairedText !== item.question.questionText;

          if (needsOrderUpdate || needsTextUpdate) {
            questionsReordered++;
            if (!dryRun) {
              await prisma.question.update({
                where: { id: item.question.id },
                data: {
                  orderIndex: i,
                  questionText: item.repairedText,
                },
              });
            }
          }
        }
      }

      // 2. Re-order QuestionGroups within Section
      if (sec.questionGroups.length > 1) {
        const groupsWithNums = sec.questionGroups.map((g, originalIdx) => ({
          group: g,
          num: extractGroupNumber(g.title, g.questions),
          originalIdx,
          originalOrderIndex: g.orderIndex ?? 0,
        }));

        const hasNumberedGroups = groupsWithNums.some((item) => item.num !== null);

        let sortedGroups = [...groupsWithNums];
        if (hasNumberedGroups) {
          sortedGroups.sort((a, b) => {
            if (a.num !== null && b.num !== null) return a.num - b.num;
            if (a.num !== null) return -1;
            if (b.num !== null) return 1;
            return a.originalIdx - b.originalIdx;
          });
        }

        for (let i = 0; i < sortedGroups.length; i++) {
          const item = sortedGroups[i];
          const needsGroupOrderUpdate = item.originalOrderIndex !== i || (hasNumberedGroups && item.group.id !== sec.questionGroups[i].id);

          if (needsGroupOrderUpdate) {
            groupsReordered++;
            if (!dryRun) {
              await prisma.questionGroup.update({
                where: { id: item.group.id },
                data: {
                  orderIndex: i,
                },
              });
            }
          }
        }
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`COMPLETED RE-ORDERING & REPAIR (dryRun = ${dryRun})`);
  console.log(`======================================================`);
  console.log(`Questions with text repaired: ${questionsRepaired}`);
  console.log(`Questions reordered: ${questionsReordered}`);
  console.log(`QuestionGroups reordered: ${groupsReordered}`);

  await prisma.$disconnect();
}

const isDryRun = process.argv.includes("--dry-run");
runReorderAndRepair(isDryRun).catch(console.error);
