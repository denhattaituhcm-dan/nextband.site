import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const sqlPath = 'd:\\handover\\ielts\\evidence\\database\\nextband_backup.sql';
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

function parseTuples(rawString: string): any[][] {
  const results: any[][] = [];
  let currentTuple: any[] = [];
  let currentVal = "";
  let inQuotes = false;
  let quoteChar = "";
  let inTuple = false;
  let escaped = false;

  for (let i = 0; i < rawString.length; i++) {
    const char = rawString[i];
    if (escaped) {
      currentVal += char;
      escaped = false;
      continue;
    }
    if (char === "\\" && inQuotes) {
      escaped = true;
      continue;
    }
    if (!inTuple) {
      if (char === "(") {
        inTuple = true;
        currentTuple = [];
        currentVal = "";
      }
      continue;
    }
    if (inQuotes) {
      if (char === quoteChar) {
        inQuotes = false;
      } else {
        currentVal += char;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      inQuotes = true;
      quoteChar = char;
      continue;
    }
    if (char === ",") {
      currentTuple.push(cleanVal(currentVal));
      currentVal = "";
      continue;
    }
    if (char === ")") {
      currentTuple.push(cleanVal(currentVal));
      results.push(currentTuple);
      inTuple = false;
      currentVal = "";
      continue;
    }
    currentVal += char;
  }
  return results;
}

function cleanVal(val: string): any {
  val = val.trim();
  if (val === "NULL" || val === "null") return null;
  if (val.startsWith("'") && val.endsWith("'")) {
    return val.slice(1, -1).replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  }
  if (val === "1" || val === "true") return true;
  if (val === "0" || val === "false") return false;
  if (!isNaN(Number(val)) && val !== "") return Number(val);
  return val;
}

function parseTable(tableName: string): any[] {
  const regex = new RegExp(`INSERT INTO \`${tableName}\` VALUES\\s*(.*?);`, "gs");
  const match = regex.exec(sqlContent);
  if (!match) return [];
  return parseTuples(match[1]);
}

async function run() {
  console.log("=== PARSING BACKUP DATA ===");

  // 1. Courses
  const rawCourses = parseTable("courses");
  console.log(`Found ${rawCourses.length} courses in backup`);
  const validCourses = rawCourses
    .map(row => ({
      id: row[0],
      title: row[1],
      description: row[2] || "",
      thumbnailUrl: row[3] || null,
      level: row[4] || "beginner",
      price: String(row[6] ?? "0"),
      isPublished: Boolean(row[7]),
      isActive: Boolean(row[8]),
      slug: row[10] || row[0],
      isLocked: Boolean(row[13]),
    }))
    .filter(c => c.title && !['test', 'testing', 'test-2', 'test-3', 'test-4', 'test-5'].includes(c.title.toLowerCase().trim()));

  console.log("Valid Courses to restore:", validCourses.map(c => ({ id: c.id, title: c.title, slug: c.slug })));

  // Upsert all courses
  for (const c of validCourses) {
    await prisma.course.upsert({
      where: { id: c.id },
      create: c,
      update: {
        title: c.title,
        description: c.description,
        thumbnailUrl: c.thumbnailUrl,
        level: c.level,
        price: c.price,
        isPublished: c.isPublished,
        isActive: c.isActive,
        slug: c.slug,
        isLocked: c.isLocked,
      },
    });
    console.log(`✅ Upserted course: ${c.title} (${c.id})`);
  }

  // Ensure class D01 07.2026 is linked to DREAMER
  await prisma.class.update({
    where: { id: '0defcb78-0eca-490e-8e41-476eedffe353' },
    data: {
      name: 'D01 07.2026',
      courseId: '605d3bec-7a80-4cb7-ba7f-ecc74e77e1ab', // DREAMER
    }
  });
  console.log("✅ Linked class D01 07.2026 to course DREAMER");

  // 2. Exams
  const rawExams = parseTable("exams");
  console.log(`Found ${rawExams.length} exams in backup`);
  const validCourseIds = new Set(validCourses.map(c => c.id));
  const validExams = rawExams
    .map(row => ({
      id: row[0],
      courseId: row[1],
      title: row[2],
      description: row[3] || null,
      week: Number(row[4]) || 1,
      durationMinutes: Number(row[5]) || 60,
      isPublished: Boolean(row[6]),
      isActive: Boolean(row[7]),
      isLocked: Boolean(row[8]),
      isOpen: Boolean(row[9]),
      examType: row[12] || "ielts",
    }))
    .filter(e => validCourseIds.has(e.courseId));

  console.log(`Valid Exams to restore: ${validExams.length}`);
  for (const e of validExams) {
    await prisma.exam.upsert({
      where: { id: e.id },
      create: e,
      update: {
        courseId: e.courseId,
        title: e.title,
        description: e.description,
        week: e.week,
        durationMinutes: e.durationMinutes,
        isPublished: e.isPublished,
        isActive: e.isActive,
        isLocked: e.isLocked,
        isOpen: e.isOpen,
        examType: e.examType,
      },
    });
  }
  console.log(`✅ Successfully restored ${validExams.length} exams`);

function safeJsonParse(val: any): any {
  if (!val) return undefined;
  if (typeof val === 'object') return val;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

  // 3. Exam Sections
  const rawSections = parseTable("exam_sections");
  const validExamIds = new Set(validExams.map(e => e.id));
  const validSections = rawSections
    .map(row => ({
      id: row[0],
      examId: row[1],
      sectionType: row[2],
      title: row[3] || "",
      instructions: row[4] || null,
      audioUrl: row[6] || null,
      durationMinutes: Number(row[7]) || null,
      orderIndex: Number(row[8]) || 0,
      config: safeJsonParse(row[10]),
    }))
    .filter(s => validExamIds.has(s.examId));

  console.log(`Valid Exam Sections to restore: ${validSections.length}`);
  for (const s of validSections) {
    await prisma.examSection.upsert({
      where: { id: s.id },
      create: s,
      update: {
        examId: s.examId,
        sectionType: s.sectionType,
        title: s.title,
        instructions: s.instructions,
        audioUrl: s.audioUrl,
        durationMinutes: s.durationMinutes,
        orderIndex: s.orderIndex,
        config: s.config,
      },
    });
  }
  console.log(`✅ Successfully restored ${validSections.length} exam sections`);

  // 4. Questions
  const rawQuestions = parseTable("questions");
  const validSectionIds = new Set(validSections.map(s => s.id));
  const validQuestions = rawQuestions
    .map(row => ({
      id: row[0],
      sectionId: row[1],
      questionType: row[2],
      prompt: row[3] || "",
      orderIndex: Number(row[4]) || 0,
      points: Number(row[5]) || 1,
      options: safeJsonParse(row[6]),
      correctAnswer: row[7] || null,
      metadata: safeJsonParse(row[8]),
      passage: row[9] || null,
      explanation: row[10] || null,
    }))
    .filter(q => validSectionIds.has(q.sectionId));

  console.log(`Valid Questions to restore: ${validQuestions.length}`);
  for (const q of validQuestions) {
    await prisma.question.upsert({
      where: { id: q.id },
      create: q,
      update: {
        sectionId: q.sectionId,
        questionType: q.questionType,
        prompt: q.prompt,
        orderIndex: q.orderIndex,
        points: q.points,
        options: q.options,
        correctAnswer: q.correctAnswer,
        metadata: q.metadata,
        passage: q.passage,
        explanation: q.explanation,
      },
    });
  }
  console.log(`✅ Successfully restored ${validQuestions.length} questions`);

  console.log("\n=== SUMMARY OF RESTORED DATABASE ===");
  const finalCourses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      _count: {
        select: { exams: true, classes: true }
      }
    },
    orderBy: { title: 'asc' }
  });
  console.log("Final Courses:", JSON.stringify(finalCourses, null, 2));

  const finalClasses = await prisma.class.findMany({
    select: {
      id: true,
      name: true,
      course: { select: { title: true } },
      _count: { select: { students: true } }
    }
  });
  console.log("Final Classes:", JSON.stringify(finalClasses, null, 2));
}

run().catch(console.error).finally(() => prisma.$disconnect());
