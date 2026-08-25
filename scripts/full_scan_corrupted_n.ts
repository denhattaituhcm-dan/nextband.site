import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fullScan() {
  console.log("=== COMPREHENSIVE SCAN FOR 'n' / ESCAPED NEWLINE CORRUPTIONS ===");

  // 1. Scan Questions
  try {
    const allQuestions = await prisma.question.findMany({
      select: { id: true, questionText: true, questionType: true, groupId: true },
    });

    const corruptedQuestions: any[] = [];
    for (const q of allQuestions) {
      const text = q.questionText || "";
      if (text.includes("</p>nn") || text.includes("nn<p>") || text.includes("nn<") || text.includes(">nn") || text.includes("nn\n") || text.includes("\nn") || text.includes("nn(")) {
        corruptedQuestions.push({ id: q.id, type: q.questionType, text: text });
      }
    }
    console.log(`Corrupted Questions: ${corruptedQuestions.length} / ${allQuestions.length}`);
    for (const q of corruptedQuestions) {
      console.log(`\n[Question ID ${q.id}] (${q.type})`);
      console.log(q.text.slice(0, 300));
    }
  } catch (e: any) {
    console.error("Questions error:", e.message);
  }

  // 2. Scan QuestionGroups
  try {
    const allGroups = await prisma.questionGroup.findMany({
      select: { id: true, title: true, instructions: true, passage: true },
    });
    const corruptedGroups: any[] = [];
    for (const g of allGroups) {
      const combined = `${g.title || ""} ${g.instructions || ""} ${g.passage || ""}`;
      if (combined.includes("</p>nn") || combined.includes("nn<p>") || combined.includes("nn<") || combined.includes(">nn") || combined.includes("nn\n") || combined.includes("\nn") || combined.includes("nn(")) {
        corruptedGroups.push({ id: g.id, title: g.title, passage: g.passage, instructions: g.instructions });
      }
    }
    console.log(`\nCorrupted QuestionGroups: ${corruptedGroups.length} / ${allGroups.length}`);
    for (const g of corruptedGroups) {
      console.log(`\n[Group ID ${g.id}] Title: ${g.title}`);
      if (g.passage) console.log("Passage sample:", g.passage.slice(0, 200));
      if (g.instructions) console.log("Instructions sample:", g.instructions.slice(0, 200));
    }
  } catch (e: any) {
    console.error("Groups error:", e.message);
  }

  // 3. Scan ExamSections
  try {
    const allSections = await prisma.examSection.findMany({
      select: { id: true, title: true, instructions: true },
    });
    const corruptedSections: any[] = [];
    for (const s of allSections) {
      const combined = `${s.title || ""} ${s.instructions || ""}`;
      if (combined.includes("</p>nn") || combined.includes("nn<p>") || combined.includes("nn<") || combined.includes(">nn") || combined.includes("nn\n") || combined.includes("\nn") || combined.includes("nn(")) {
        corruptedSections.push({ id: s.id, title: s.title });
      }
    }
    console.log(`\nCorrupted ExamSections: ${corruptedSections.length} / ${allSections.length}`);
  } catch (e: any) {
    console.error("Sections error:", e.message);
  }

  // 4. Scan Exams
  try {
    const allExams = await prisma.exam.findMany({
      select: { id: true, title: true, description: true },
    });
    const corruptedExams: any[] = [];
    for (const e of allExams) {
      const combined = `${e.title || ""} ${e.description || ""}`;
      if (combined.includes("</p>nn") || combined.includes("nn<p>") || combined.includes("nn<") || combined.includes(">nn") || combined.includes("nn\n") || combined.includes("\nn") || combined.includes("nn(")) {
        corruptedExams.push({ id: e.id, title: e.title });
      }
    }
    console.log(`\nCorrupted Exams: ${corruptedExams.length} / ${allExams.length}`);
  } catch (e: any) {
    console.error("Exams error:", e.message);
  }
}

fullScan()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
