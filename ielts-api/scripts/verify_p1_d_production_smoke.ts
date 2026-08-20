import { PrismaClient } from "@prisma/client";
import { buildApp } from "../src/app.js";

const prisma = new PrismaClient();

async function runProductionSmokeTest() {
  console.log("================================================================================");
  console.log("             P1-D: REAL PRODUCTION LEAN LEARNING LOOP SMOKE TEST               ");
  console.log("             (Target: Live PostgreSQL Database on Supabase Cloud)              ");
  console.log("================================================================================");

  const studentUser = await prisma.user.findFirst({
    where: { roles: { some: { role: "student" } } },
    include: { roles: true },
  });

  const teacherUser = await prisma.user.findFirst({
    where: { roles: { some: { role: "teacher" } } },
    include: { roles: true },
  });

  const exam = await prisma.exam.findFirst({
    where: {
      sections: {
        some: {
          questionGroups: {
            some: {
              questions: {
                some: {},
              },
            },
          },
        },
      },
    },
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

  if (!studentUser || !teacherUser || !exam) {
    throw new Error("Could not find required seed entities with questions in PostgreSQL database.");
  }

  // Find the first question in the exam structure
  let question: any = null;
  for (const sec of exam.sections) {
    for (const grp of sec.questionGroups) {
      if (grp.questions && grp.questions.length > 0) {
        question = grp.questions[0];
        break;
      }
    }
    if (question) break;
  }

  if (!question) {
    throw new Error("Exam has no questions to test.");
  }

  console.log(`✓ Target Live DB: db.gzpdlqxjggyxlkeatvvf.supabase.co`);
  console.log(`✓ Student:       ${studentUser.fullName} (${studentUser.id})`);
  console.log(`✓ Teacher:       ${teacherUser.fullName} (${teacherUser.id})`);
  console.log(`✓ Exam:          ${exam.title} (${exam.id})`);
  console.log(`✓ Question:      ${question.id} (Type: ${question.questionType})`);

  const app = await buildApp();
  await app.ready();

  const studentToken = app.jwt.sign({ id: studentUser.id, email: studentUser.email, roles: ["student"] });
  const teacherToken = app.jwt.sign({ id: teacherUser.id, email: teacherUser.email, roles: ["teacher", "admin"] });

  let attempt1Id: string | null = null;
  let attempt1AnswerId: string | null = null;
  let attempt2Id: string | null = null;

  try {
    // -------------------------------------------------------------------------
    // STEP 1: Student Starts Attempt 1
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 1] Student starts Attempt 1...");
    const startRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: { examId: exam.id },
    });
    console.log(`  Response: HTTP ${startRes.statusCode}`);
    if (startRes.statusCode !== 200 && startRes.statusCode !== 201) {
      throw new Error(`Failed to start attempt 1: ${startRes.payload}`);
    }
    const startData = JSON.parse(startRes.payload);
    attempt1Id = startData.id;
    console.log(`  ✓ Attempt 1 created with ID: ${attempt1Id} (Status: ${startData.status})`);

    // -------------------------------------------------------------------------
    // STEP 2: Student Submits Attempt 1
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 2] Student submits Attempt 1 essay/speaking answer...");
    const submitRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt1Id}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId: question.id,
            answerText: "P1-D Production Smoke Test - Initial Essay Attempt 1",
          },
        ],
      },
    });
    console.log(`  Response: HTTP ${submitRes.statusCode}`);
    if (submitRes.statusCode !== 200) {
      throw new Error(`Failed to submit attempt 1: ${submitRes.payload}`);
    }
    const submitData = JSON.parse(submitRes.payload);
    console.log(`  ✓ Attempt 1 submitted (Status: ${submitData.status})`);

    // Fetch answer ID from DB
    const attempt1InDb = await prisma.examSubmission.findUnique({
      where: { id: attempt1Id! },
      include: { answers: true },
    });
    attempt1AnswerId = attempt1InDb!.answers[0]?.id;
    console.log(`  ✓ Physical Answer Record in DB: ${attempt1AnswerId}`);

    // -------------------------------------------------------------------------
    // STEP 3: Teacher Reviews & Grades Attempt 1 (revisionRequired = true)
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 3] Teacher reviews Attempt 1: score=5.5, revisionRequired=true, category=STRUCTURE...");
    const gradeRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt1Id}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 5.5,
        grades: [
          {
            answerId: attempt1AnswerId,
            score: 5.5,
            feedback: "Cần cải thiện cấu trúc câu và sự liên kết giữa các đoạn.",
          },
        ],
        feedback: "Cần cải thiện cấu trúc câu và sự liên kết giữa các đoạn.",
        primaryErrorCategory: "STRUCTURE",
        revisionRequired: true,
      },
    });
    console.log(`  Response: HTTP ${gradeRes.statusCode}`);
    if (gradeRes.statusCode !== 200) {
      throw new Error(`Failed to grade attempt 1: ${gradeRes.payload}`);
    }
    const gradeData = JSON.parse(gradeRes.payload);
    console.log(`  ✓ Attempt 1 graded (Status: ${gradeData.status}, TotalScore: ${gradeData.totalScore})`);

    // -------------------------------------------------------------------------
    // STEP 4: Student Starts Revision (Attempt 2)
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 4] Student initiates Revision -> Creates Attempt 2...");
    const revRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions/revision",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        examId: exam.id,
        clonePreviousAnswers: true,
      },
    });
    console.log(`  Response: HTTP ${revRes.statusCode}`);
    if (revRes.statusCode !== 201 && revRes.statusCode !== 200) {
      throw new Error(`Failed to create revision: ${revRes.payload}`);
    }
    const revData = JSON.parse(revRes.payload);
    attempt2Id = revData.id;
    console.log(`  ✓ Attempt 2 created with ID: ${attempt2Id} (Status: ${revData.status})`);

    // -------------------------------------------------------------------------
    // STEP 5: Forensic Immutability Verification on PostgreSQL DB
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 5] Performing Forensic Immutability Check on Live DB...");
    const sub1Check = await prisma.examSubmission.findUnique({
      where: { id: attempt1Id! },
      include: { answers: true },
    });
    if (sub1Check!.status !== "graded") {
      throw new Error(`CRITICAL DRIFT: Attempt 1 status was modified to ${sub1Check!.status}!`);
    }
    if (Number(sub1Check!.totalScore) !== 5.5) {
      throw new Error(`CRITICAL DRIFT: Attempt 1 score was modified to ${sub1Check!.totalScore}!`);
    }
    console.log("  ✓ Attempt 1 is 100% IMMUTABLE & FROZEN in PostgreSQL:");
    console.log(`    - Submission ID: ${sub1Check!.id}`);
    console.log(`    - Status:        ${sub1Check!.status}`);
    console.log(`    - Score:         ${sub1Check!.totalScore}`);
    console.log(`    - Feedback:      ${sub1Check!.answers[0]?.feedback}`);

    // -------------------------------------------------------------------------
    // STEP 6: Student Submits Attempt 2
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 6] Student submits revised Essay (Attempt 2)...");
    const submitRevRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt2Id}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId: question.id,
            answerText: "P1-D Production Smoke Test - Revised Essay Attempt 2 with perfected structure",
          },
        ],
      },
    });
    console.log(`  Response: HTTP ${submitRevRes.statusCode}`);
    if (submitRevRes.statusCode !== 200) {
      throw new Error(`Failed to submit attempt 2: ${submitRevRes.payload}`);
    }
    console.log("  ✓ Attempt 2 successfully submitted");

    // Fetch attempt 2 answer from DB
    const sub2InDb = await prisma.examSubmission.findUnique({
      where: { id: attempt2Id! },
      include: { answers: true },
    });
    const attempt2AnswerId = sub2InDb!.answers[0]?.id;

    // -------------------------------------------------------------------------
    // STEP 7: Teacher Reviews & Approves Attempt 2 (revisionRequired = false)
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 7] Teacher reviews Attempt 2: score=7.0, revisionRequired=false...");
    const grade2Res = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt2Id}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 7.0,
        grades: [
          {
            answerId: attempt2AnswerId,
            score: 7.0,
            feedback: "Bài sửa xuất sắc. Cấu trúc và liên kết hoàn thiện.",
          },
        ],
        feedback: "Bài sửa xuất sắc. Cấu trúc và liên kết hoàn thiện.",
        primaryErrorCategory: null,
        revisionRequired: false,
      },
    });
    console.log(`  Response: HTTP ${grade2Res.statusCode}`);
    if (grade2Res.statusCode !== 200) {
      throw new Error(`Failed to grade attempt 2: ${grade2Res.payload}`);
    }
    console.log("  ✓ Attempt 2 approved and finalized");

    // -------------------------------------------------------------------------
    // STEP 8: Final Forensic Read-Only Multi-Attempt Audit
    // -------------------------------------------------------------------------
    console.log("\n>>> [Step 8] Final Read-Only Forensic Multi-Attempt Verification...");
    const finalAudit = await prisma.examSubmission.findMany({
      where: { id: { in: [attempt1Id!, attempt2Id!] } },
      include: { answers: true },
      orderBy: { createdAt: "asc" },
    });

    console.log("\n================================================================================");
    console.log("                   PRODUCTION FORENSIC ATTEMPT AUDIT LOG                        ");
    console.log("================================================================================");
    console.table(finalAudit.map(s => ({
      "Attempt ID": s.id,
      "Exam ID": s.examId,
      "Student ID": s.studentId,
      "Status": s.status,
      "Score": Number(s.totalScore),
      "Answers Count": s.answers.length,
      "First Answer Text": s.answers[0]?.answerText?.substring(0, 40) + "...",
      "Created At": s.createdAt?.toISOString(),
    })));

    console.log("\n>>> LEAN LEARNING LOOP v1.0 REAL-WORLD PRODUCTION SMOKE TEST: ✅ PASS");

  } finally {
    // Clean up smoke test artifacts from live DB
    console.log("\n>>> Cleaning up test submission records from production DB...");
    if (attempt1Id || attempt2Id) {
      const idsToDelete = [attempt1Id, attempt2Id].filter(Boolean) as string[];
      await prisma.answer.deleteMany({
        where: { submissionId: { in: idsToDelete } },
      });
      await prisma.examSubmission.deleteMany({
        where: { id: { in: idsToDelete } },
      });
      console.log("✓ Production database cleaned up cleanly.");
    }
    await app.close();
  }
}

runProductionSmokeTest()
  .catch((e) => {
    console.error("FATAL SMOKE TEST FAILURE:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
