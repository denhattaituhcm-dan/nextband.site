import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function deepCheck() {
  console.log("=== DEEP CHECK FOR DUMMY/TEST DATA ===");

  // 1. Audit outbox
  const testOutbox = await prisma.auditOutbox.findMany({
    where: {
      OR: [
        { examId: { in: ["8c531d75-c935-486c-8826-f4ddc9625149", "bf25a3cb-7e6a-4265-b5ec-31240f6aec31"] } },
      ],
    },
  });
  console.log("Audit outbox entries for test exams:", testOutbox.length);

  // 2. Exam Submissions
  const submissions = await prisma.examSubmission.findMany({
    where: {
      OR: [
        { exam: { title: { contains: "INTEGRITY", mode: "insensitive" } } },
        { exam: { course: { title: { contains: "INTEGRITY", mode: "insensitive" } } } },
      ],
    },
    select: { id: true, examId: true, studentId: true, status: true },
  });
  console.log("Submissions for test exams:", submissions.length, JSON.stringify(submissions));

  // 3. Assessment sessions
  const assessments = await prisma.assessmentSession.findMany({
    where: {
      OR: [
        { fullName: { contains: "Test", mode: "insensitive" } },
        { phone: { contains: "99999" } },
      ],
    },
  });
  console.log("Test assessment sessions:", assessments.length);

  // 4. Check all exams in general
  const allExams = await prisma.exam.findMany({
    select: { id: true, title: true, course: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });
  console.log("\nAll Exams in database:");
  allExams.forEach(e => console.log(`- [${e.id}] "${e.title}" (Course: ${e.course?.title})`));
}

deepCheck().finally(() => prisma.$disconnect());
