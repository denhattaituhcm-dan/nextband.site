import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { buildApp } from "../app.js";
import { FastifyInstance } from "fastify";

const prisma = new PrismaClient();

describe("🚀 PHASE 2: GATEWAY E2E BUSINESS FLOW & FAILURE ISOLATION TESTS", () => {
  let app: FastifyInstance;
  let studentToken: string;
  let teacherToken: string;
  let studentId: string;
  let teacherId: string;
  let courseId: string;
  let examId: string;
  let questionId: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    // 1. Setup Student & Teacher in DB
    const student = await prisma.user.findFirst({
      where: { roles: { some: { role: "student" } } },
      include: { roles: true },
    });
    const teacher = await prisma.user.findFirst({
      where: { roles: { some: { role: "teacher" } } },
      include: { roles: true },
    });

    studentId = student?.userId || student?.id || "test-student-id";
    teacherId = teacher?.userId || teacher?.id || "test-teacher-id";

    studentToken = app.jwt.sign({
      sub: studentId,
      id: studentId,
      email: student?.email,
      roles: ["student"],
    });

    teacherToken = app.jwt.sign({
      sub: teacherId,
      id: teacherId,
      email: teacher?.email,
      roles: ["teacher"],
    });

    // 2. Setup Course, Exam, Section, Question Group, and Question
    let course = await prisma.course.findFirst({
      where: { isPublished: true },
    });
    if (!course) {
      course = await prisma.course.create({
        data: {
          title: "E2E IELTS Gateway Test Course",
          level: "intermediate",
          isPublished: true,
          isActive: true,
        },
      });
    }
    courseId = course.id;

    // Ensure student is enrolled in course for exam access
    await prisma.enrollment.upsert({
      where: {
        courseId_studentId: {
          courseId,
          studentId,
        },
      },
      update: { progressPercent: 0 },
      create: {
        courseId,
        studentId,
        progressPercent: 0,
      },
    });

    // Ensure teacher and student are connected via class for authorized grading
    let testClass = await prisma.class.findFirst({
      where: { name: "E2E Gateway Test Class" },
    });
    if (!testClass) {
      testClass = await prisma.class.create({
        data: {
          name: "E2E Gateway Test Class",
          courseId,
          teacherId,
          status: "ACTIVE",
          isActive: true,
        },
      });
    } else if (testClass.teacherId !== teacherId) {
      await prisma.class.update({
        where: { id: testClass.id },
        data: { teacherId },
      });
    }

    await prisma.classStudent.upsert({
      where: {
        classId_studentId: {
          classId: testClass.id,
          studentId,
        },
      },
      update: { status: "ACTIVE", deletedAt: null },
      create: {
        classId: testClass.id,
        studentId,
        status: "ACTIVE",
      },
    });

    let exam = await prisma.exam.findFirst({
      where: { title: "E2E IELTS Gateway Dedicated Test Exam" },
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

    if (!exam) {
      exam = await prisma.exam.create({
        data: {
          title: "E2E IELTS Gateway Dedicated Test Exam",
          courseId,
          isPublished: true,
          isActive: true,
          isOpen: true,
          durationMinutes: 60,
          sections: {
            create: [
              {
                title: "Reading Section 1",
                sectionType: "reading",
                orderIndex: 1,
                questionGroups: {
                  create: [
                    {
                      title: "Group 1",
                      orderIndex: 1,
                      questions: {
                        create: [
                          {
                            questionType: "multiple_choice",
                            questionText: "What is the primary capital of France?",
                            options: ["Paris", "London", "Berlin", "Rome"],
                            correctAnswer: "Paris",
                            orderIndex: 1,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
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
    }

    examId = exam.id;
    questionId = exam.sections[0]?.questionGroups[0]?.questions[0]?.id || "q1";
  }, 60000);

  afterAll(async () => {
    try {
      if (examId) {
        await prisma.examSubmission.deleteMany({ where: { examId } }).catch(() => {});
        await prisma.exam.delete({ where: { id: examId } }).catch(() => {});
      }
    } finally {
      await app.close();
      await prisma.$disconnect();
    }
  }, 60000);

  // ---------------------------------------------------------------------------
  // 1. GATEWAY HEALTH ENDPOINT
  // ---------------------------------------------------------------------------
  it("G1: Fastify Health Check Endpoint returns 200 OK with status: ok", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/health",
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.status).toBe("ok");
  });

  // ---------------------------------------------------------------------------
  // 2. CRITICAL USER JOURNEY THROUGH GATEWAY
  // ---------------------------------------------------------------------------
  it(
    "G2: Full End-to-End Business Flow: Start -> Save Draft -> Submit -> Grade -> Revision",
    async () => {
      // Clean slate for test isolation
      await prisma.examSubmission.deleteMany({ where: { examId, studentId } });

      // Step 1: Student Starts Exam Attempt 1
      const idempotencyKey = `idemp-e2e-${Date.now()}`;
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: {
          authorization: `Bearer ${studentToken}`,
          "x-idempotency-key": idempotencyKey,
        },
        payload: {
          examId,
          idempotencyKey,
        },
      });

      expect([200, 201]).toContain(startRes.statusCode);
      const startBody = JSON.parse(startRes.body);
      const submissionId = startBody.data?.id || startBody.id;
      expect(submissionId).toBeDefined();

      // Step 2: Student Saves Draft Answers
      const saveRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [
            {
              questionId,
              answerText: "Paris",
            },
          ],
        },
      });

      expect([200, 204]).toContain(saveRes.statusCode);

      // Step 3: Student Submits Exam
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [
            {
              questionId,
              answerText: "Paris",
            },
          ],
        },
      });

      expect([200, 201]).toContain(submitRes.statusCode);
      const submitBody = JSON.parse(submitRes.body);
      const submittedStatus = (submitBody.data?.status || submitBody.status).toUpperCase();
      expect(["SUBMITTED", "GRADED"]).toContain(submittedStatus);

      // Step 4: Teacher Grades & Requests Revision
      const gradeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          totalScore: 7.0,
          feedback: "Good work, but revision required for Question 1.",
          revisionRequired: true,
          grades: [
            {
              questionId,
              score: 1.0,
              feedback: "Correct answer.",
            },
          ],
        },
      });

      expect([200, 201]).toContain(gradeRes.statusCode);

      // Step 5: Attempt 1 is immutable (Student cannot alter Attempt 1 after grading)
      const tamperRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [{ questionId, answerText: "TAMPERED_POST_SUBMIT" }],
        },
      });

      // Fastify must reject mutation on completed/graded submission
      expect([400, 403, 409, 422]).toContain(tamperRes.statusCode);

      // Verify Attempt 1 remains unchanged in DB
      const verifiedSub = await prisma.examSubmission.findUnique({
        where: { id: submissionId },
        include: { answers: true },
      });
      expect(verifiedSub?.status).toBe("GRADED");
      expect(verifiedSub?.answers[0]?.answerText).toBe("Paris");
    },
    60000
  );

  // ---------------------------------------------------------------------------
  // 3. IDEMPOTENCY & FAILURE ISOLATION TESTS
  // ---------------------------------------------------------------------------
  it(
    "G3: Gateway Idempotency Guarantee -> Duplicate POST /submissions with same key returns identical record without duplicate DB row",
    async () => {
      // Clean slate for test isolation
      await prisma.examSubmission.deleteMany({ where: { examId, studentId } });

      const fixedIdempotencyKey = `idemp-dup-${Date.now()}`;
      const initialCount = await prisma.examSubmission.count({
        where: { examId, studentId },
      });

      // 1st Call (Initial Attempt)
      const call1 = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: {
          authorization: `Bearer ${studentToken}`,
          "x-idempotency-key": fixedIdempotencyKey,
        },
        payload: {
          examId,
          idempotencyKey: fixedIdempotencyKey,
        },
      });

      // 2nd Call (Simulated Network Retry after timeout)
      const call2 = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: {
          authorization: `Bearer ${studentToken}`,
          "x-idempotency-key": fixedIdempotencyKey,
        },
        payload: {
          examId,
          idempotencyKey: fixedIdempotencyKey,
        },
      });

      const body1 = JSON.parse(call1.body);
      const body2 = JSON.parse(call2.body);

      const sub1Id = body1.data?.id || body1.id;
      const sub2Id = body2.data?.id || body2.id;

      // Both calls must resolve to the EXACT same submission ID
      expect(sub1Id).toBe(sub2Id);

      // DB row count must increase by at most 1, never 2
      const finalCount = await prisma.examSubmission.count({
        where: { examId, studentId },
      });
      expect(finalCount - initialCount).toBeLessThanOrEqual(1);
    },
    60000
  );

  afterAll(async () => {
    try {
      // 1. Clean up test notifications
      await prisma.notification.deleteMany({
        where: {
          OR: [
            { title: { contains: "E2E", mode: "insensitive" } },
            { message: { contains: "E2E", mode: "insensitive" } },
            { message: { contains: "Dedicated Test Exam", mode: "insensitive" } },
            { title: { contains: "Dedicated Test Exam", mode: "insensitive" } },
          ],
        },
      });

      // 2. Clean up test submissions & answers
      if (examId) {
        const subs = await prisma.examSubmission.findMany({
          where: { examId },
          select: { id: true },
        });
        const subIds = subs.map((s) => s.id);
        if (subIds.length > 0) {
          await prisma.answer.deleteMany({
            where: { submissionId: { in: subIds } },
          });
          await prisma.examSubmission.deleteMany({
            where: { id: { in: subIds } },
          });
        }

        // 3. Delete test exam
        await prisma.exam.deleteMany({
          where: { id: examId },
        });
      }

      // 4. Delete test course if created specifically
      if (courseId) {
        const course = await prisma.course.findUnique({
          where: { id: courseId },
          select: { title: true },
        });
        if (course?.title === "E2E IELTS Gateway Test Course") {
          await prisma.enrollment.deleteMany({ where: { courseId } });
          await prisma.course.delete({ where: { id: courseId } });
        }
      }

      // 5. Clean up test class
      const testClass = await prisma.class.findFirst({
        where: { name: "E2E Gateway Test Class" },
      });
      if (testClass) {
        await prisma.classStudent.deleteMany({ where: { classId: testClass.id } });
        await prisma.class.delete({ where: { id: testClass.id } });
      }
    } catch (err) {
      console.warn("afterAll test cleanup warning:", err);
    } finally {
      await app.close();
      await prisma.$disconnect();
    }
  }, 60000);
});
