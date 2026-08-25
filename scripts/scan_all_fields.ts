import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function scanAllFields() {
  console.log("=== SCANNING ALL TEXT FIELDS ACROSS THE ENTIRE DATABASE ===");

  // 1. Question Groups
  const groups = await prisma.questionGroup.findMany();
  for (const g of groups) {
    for (const [key, val] of Object.entries(g)) {
      if (typeof val === "string") {
        if (val.includes("</p>nn") || val.includes("nn<") || val.includes(">nn") || val.includes("nn\n") || (val.includes("nn") && val.includes("<p>"))) {
          console.log(`[Group ${g.id}] Field '${key}' contains corrupted nn pattern!`);
          console.log(val.slice(0, 300));
        }
      }
    }
  }

  // 2. Questions
  const questions = await prisma.question.findMany();
  for (const q of questions) {
    for (const [key, val] of Object.entries(q)) {
      if (typeof val === "string") {
        if (val.includes("</p>nn") || val.includes("nn<") || val.includes(">nn") || val.includes("nn\n") || (val.includes("nn") && val.includes("<p>"))) {
          console.log(`[Question ${q.id}] Field '${key}' contains corrupted nn pattern!`);
          console.log(val.slice(0, 300));
        }
      }
    }
  }

  // 3. Exam Sections
  const sections = await prisma.examSection.findMany();
  for (const s of sections) {
    for (const [key, val] of Object.entries(s)) {
      if (typeof val === "string") {
        if (val.includes("</p>nn") || val.includes("nn<") || val.includes(">nn") || val.includes("nn\n") || (val.includes("nn") && val.includes("<p>"))) {
          console.log(`[Section ${s.id}] Field '${key}' contains corrupted nn pattern!`);
        }
      }
    }
  }

  // 4. Exams
  const exams = await prisma.exam.findMany();
  for (const e of exams) {
    for (const [key, val] of Object.entries(e)) {
      if (typeof val === "string") {
        if (val.includes("</p>nn") || val.includes("nn<") || val.includes(">nn") || val.includes("nn\n") || (val.includes("nn") && val.includes("<p>"))) {
          console.log(`[Exam ${e.id}] Field '${key}' contains corrupted nn pattern!`);
        }
      }
    }
  }

  // 5. Courses
  const courses = await prisma.course.findMany();
  for (const c of courses) {
    for (const [key, val] of Object.entries(c)) {
      if (typeof val === "string") {
        if (val.includes("</p>nn") || val.includes("nn<") || val.includes(">nn") || val.includes("nn\n") || (val.includes("nn") && val.includes("<p>"))) {
          console.log(`[Course ${c.id}] Field '${key}' contains corrupted nn pattern!`);
        }
      }
    }
  }

  console.log("=== SCAN FINISHED ===");
}

scanAllFields()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
