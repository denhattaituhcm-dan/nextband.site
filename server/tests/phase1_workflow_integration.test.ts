import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app.js";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";

describe("🌊 PHASE 1 WORKFLOW & SYSTEM PIPELINE INTEGRATION E2E TEST", () => {
  let app: FastifyInstance;
  let prisma: PrismaClient;

  let adminUserId: string;
  let adminToken: string;
  let studentUserId: string;
  let studentToken: string;
  let testCourseId: string;
  let testClassId: string;

  beforeAll(async () => {
    prisma = new PrismaClient();
    app = await buildApp({ testing: true });
    await app.ready();

    // 1. Create Admin User via Postgres function
    const adminEmail = `admin_p1_${Date.now()}@example.com`;
    const adminResult: any = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        $2::text,
        $3::text,
        NULL::text,
        'admin'::text,
        $4::text,
        NULL::text,
        NULL::text,
        NULL::date
      ) as result;
    `, adminEmail, "Phase 1 Admin", `0912${Math.floor(100000 + Math.random() * 900000)}`, "Password123!");
    adminUserId = adminResult?.[0]?.result?.user_id || adminResult?.[0]?.result?.id;

    adminToken = app.jwt.sign({
      sub: adminUserId,
      id: adminUserId,
      email: adminEmail,
      user_metadata: { role: "admin" },
      app_metadata: { roles: ["admin"] },
    });

    // 2. Create Student User via Postgres function
    const studentEmail = `student_p1_${Date.now()}@example.com`;
    const studentResult: any = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        $2::text,
        $3::text,
        NULL::text,
        'student'::text,
        $4::text,
        NULL::text,
        NULL::text,
        NULL::date
      ) as result;
    `, studentEmail, "Phase 1 Student", `0911${Math.floor(100000 + Math.random() * 900000)}`, "Password123!");
    studentUserId = studentResult?.[0]?.result?.user_id || studentResult?.[0]?.result?.id;

    studentToken = app.jwt.sign({
      sub: studentUserId,
      id: studentUserId,
      email: studentEmail,
      user_metadata: { role: "student" },
      app_metadata: { roles: ["student"] },
    });

    // 3. Create Test Course & Class
    const course = await prisma.course.create({
      data: {
        title: `P1 IELTS Intensive ${Date.now()}`,
        description: "Course for P1 testing",
        price: 5000000,
        isPublished: true,
        isActive: true,
      },
    });
    testCourseId = course.id;

    const testClass = await prisma.class.create({
      data: {
        name: `P1-Class-${Date.now()}`,
        courseId: testCourseId,
        isActive: true,
        status: "ACTIVE",
      },
    });
    testClassId = testClass.id;

    // Ensure student_milestone_claims table exists
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS public.student_milestone_claims (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        milestone_key VARCHAR(255) NOT NULL,
        claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT uq_student_milestone_key UNIQUE (student_id, milestone_key)
      )
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_student_milestone_claims_student_id ON public.student_milestone_claims(student_id)
    `);
  }, 60000);

  afterAll(async () => {
    try {
      if (studentUserId) {
        await prisma.studentMilestoneClaim.deleteMany({ where: { studentId: studentUserId } });
        await prisma.examSubmission.deleteMany({ where: { studentId: studentUserId } });
      }
      if (testClassId) {
        await prisma.enrollmentAuditLog.deleteMany({ where: { classId: testClassId } });
        await prisma.classStudent.deleteMany({ where: { classId: testClassId } });
        await prisma.class.deleteMany({ where: { id: testClassId } });
      }
      if (testCourseId) {
        await prisma.exam.deleteMany({ where: { courseId: testCourseId } });
        await prisma.enrollment.deleteMany({ where: { courseId: testCourseId } });
        await prisma.course.deleteMany({ where: { id: testCourseId } });
      }
      if (studentUserId) {
        await prisma.userRole.deleteMany({ where: { userId: studentUserId } });
        await prisma.user.deleteMany({ where: { userId: studentUserId } });
      }
      if (adminUserId) {
        await prisma.userRole.deleteMany({ where: { userId: adminUserId } });
        await prisma.user.deleteMany({ where: { userId: adminUserId } });
      }
    } catch (e) {
      console.warn("Cleanup warning:", e);
    } finally {
      await prisma.$disconnect();
      await app.close();
    }
  }, 40000);

  // =========================================================================
  // SUITE 1: SPEAKING FORECAST PIPELINE
  // =========================================================================
  describe("🎙️ P1.1: Speaking Forecast End-to-End Pipeline", () => {
    it("Admin can update forecast topics and seasons", async () => {
      const forecastPayload = {
        seasons: [
          {
            id: "season-2026-q3",
            name: "Q3 / 2026",
            year: 2026,
            quarter: 3,
            isCurrent: true,
            isPublished: true,
          },
        ],
        topics: [
          {
            id: "topic-ai-technology",
            seasonId: "season-2026-q3",
            topicName: "Artificial Intelligence in Education",
            category: "Technology",
            part: "Part 3",
            type: "New",
            status: "Published",
            slug: "artificial-intelligence-in-education",
            sampleAnswers: {
              band65: "AI is becoming very popular in classrooms today.",
              band75: "Artificial intelligence is fundamentally revolutionizing contemporary pedagogical methodologies.",
            },
            keyVocabulary: [
              { id: "v1", word: "Pedagogical", meaning: "Relating to teaching", example: "Pedagogical approaches." },
            ],
            ideas: "Efficiency, Personalized Learning",
          },
          {
            id: "topic-draft-secret",
            seasonId: "season-2026-q3",
            topicName: "Draft Secret Topic",
            category: "General",
            part: "Part 1",
            type: "New",
            status: "Draft", // Should not appear on public API
            slug: "draft-secret-topic",
          },
        ],
        selectedSeasonId: "season-2026-q3",
      };

      const putRes = await app.inject({
        method: "PUT",
        url: "/api/v1/speaking-forecast/admin",
        headers: {
          authorization: `Bearer ${adminToken}`,
          "content-type": "application/json",
        },
        payload: forecastPayload,
      });

      expect([200, 201]).toContain(putRes.statusCode);
      const putBody = JSON.parse(putRes.body);
      expect(putBody.success).toBe(true);
    });

    it("Public endpoint retrieves only published topics and seasons without leaking draft topics", async () => {
      const publicRes = await app.inject({
        method: "GET",
        url: "/api/v1/speaking-forecast",
      });

      expect(publicRes.statusCode).toBe(200);
      const data = JSON.parse(publicRes.body);

      expect(Array.isArray(data.seasons)).toBe(true);
      expect(data.seasons.length).toBeGreaterThan(0);
      expect(data.seasons[0].name).toBe("Q3 / 2026");

      expect(Array.isArray(data.topics)).toBe(true);
      // Only "Published" topics should be returned
      const publishedTopic = data.topics.find((t: any) => t.id === "topic-ai-technology");
      expect(publishedTopic).toBeDefined();
      expect(publishedTopic.topicName).toBe("Artificial Intelligence in Education");

      // Draft topic should be excluded
      const draftTopic = data.topics.find((t: any) => t.id === "topic-draft-secret");
      expect(draftTopic).toBeUndefined();
    });
  });

  // =========================================================================
  // SUITE 2: COURSE <-> CLASS ENROLLMENT CASCADE (2-CHIỀU)
  // =========================================================================
  describe("🔄 P1.2: Course ↔ Class Enrollment Cascade (Bi-directional)", () => {
    it("Step 1: Adding a student to a class automatically creates & activates Course Enrollment + Audit Log", async () => {
      // Ensure student is NOT enrolled initially
      const preEnrollment = await prisma.enrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: testCourseId,
            studentId: studentUserId,
          },
        },
      });
      expect(preEnrollment).toBeNull();

      // Add student to class
      const addRes = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${testClassId}/students`,
        headers: {
          authorization: `Bearer ${adminToken}`,
          "content-type": "application/json",
        },
        payload: {
          studentId: studentUserId,
        },
      });

      expect([200, 201]).toContain(addRes.statusCode);

      // Verify ClassStudent record is ACTIVE
      const classStudent = await prisma.classStudent.findUnique({
        where: {
          classId_studentId: {
            classId: testClassId,
            studentId: studentUserId,
          },
        },
      });
      expect(classStudent).not.toBeNull();
      expect(classStudent?.status).toBe("ACTIVE");

      // Verify Course Enrollment was automatically created
      const postEnrollment = await prisma.enrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: testCourseId,
            studentId: studentUserId,
          },
        },
      });
      expect(postEnrollment).not.toBeNull();

      // Verify EnrollmentAuditLog recorded the cascade
      const auditLog = await prisma.enrollmentAuditLog.findFirst({
        where: {
          studentId: studentUserId,
          classId: testClassId,
          action: "CLASS_PLACEMENT_CASCADE",
        },
      });
      expect(auditLog).not.toBeNull();
      expect(auditLog?.toStatus).toBe("ACTIVE");
    });

    it("Step 2: Student can access their enrolled courses via GET /api/v1/enrollments", async () => {
      const getRes = await app.inject({
        method: "GET",
        url: "/api/v1/enrollments",
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      });

      expect(getRes.statusCode).toBe(200);
      const resBody = JSON.parse(getRes.body);
      const enrollments = resBody.data;
      expect(Array.isArray(enrollments)).toBe(true);

      const match = enrollments.find((e: any) => e.courseId === testCourseId);
      expect(match).toBeDefined();
    });

    it("Step 3: Removing student from class automatically revokes Course Enrollment when no other active classes exist", async () => {
      const removeRes = await app.inject({
        method: "DELETE",
        url: `/api/v1/classes/${testClassId}/students/${studentUserId}`,
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(removeRes.statusCode).toBe(200);

      // Verify ClassStudent record is marked DROPPED and deletedAt set
      const classStudent = await prisma.classStudent.findUnique({
        where: {
          classId_studentId: {
            classId: testClassId,
            studentId: studentUserId,
          },
        },
      });
      expect(classStudent?.status).toBe("DROPPED");
      expect(classStudent?.deletedAt).not.toBeNull();

      // Verify Course Enrollment is revoked (deleted)
      const postRemoveEnrollment = await prisma.enrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: testCourseId,
            studentId: studentUserId,
          },
        },
      });
      expect(postRemoveEnrollment).toBeNull();

      // Verify EnrollmentAuditLog recorded the removal cascade
      const removalAuditLog = await prisma.enrollmentAuditLog.findFirst({
        where: {
          studentId: studentUserId,
          classId: testClassId,
          action: "STUDENT_REMOVAL_CASCADE",
        },
      });
      expect(removalAuditLog).not.toBeNull();
      expect(removalAuditLog?.toStatus).toBe("DROPPED");
    });
  });

  // =========================================================================
  // SUITE 3: REAL EXAM ASSESSMENT & MILESTONE SYNCHRONIZATION (P1.4)
  // =========================================================================
  describe("🏆 P1.4: Student Milestones & Real Progress Synchronization", () => {
    let exam1Id: string;
    let exam2Id: string;

    beforeAll(async () => {
      // Re-enroll student into the course
      await prisma.enrollment.upsert({
        where: {
          courseId_studentId: {
            courseId: testCourseId,
            studentId: studentUserId,
          },
        },
        create: {
          courseId: testCourseId,
          studentId: studentUserId,
          progressPercent: 0,
        },
        update: {
          progressPercent: 0,
        },
      });

      // Create 2 test exams belonging to testCourseId
      const e1 = await prisma.exam.create({
        data: {
          title: "Course Test 1: Diagnostic Listening",
          courseId: testCourseId,
          examType: "LISTENING",
          durationMinutes: 30,
          isPublished: true,
          isActive: true,
          sections: {
            create: {
              title: "Section 1",
              sectionType: "listening",
              orderIndex: 1,
              questionGroups: {
                create: {
                  orderIndex: 1,
                  questions: {
                    create: {
                      orderIndex: 1,
                      questionType: "multiple_choice",
                      questionText: "What is the capital of France?",
                      correctAnswer: "Paris",
                      points: 1,
                    },
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
                include: { questions: true },
              },
            },
          },
        },
      });
      exam1Id = e1.id;

      const e2 = await prisma.exam.create({
        data: {
          title: "Course Test 2: Final Reading",
          courseId: testCourseId,
          examType: "READING",
          durationMinutes: 30,
          isPublished: true,
          isActive: true,
          sections: {
            create: {
              title: "Section 1",
              sectionType: "reading",
              orderIndex: 1,
              questionGroups: {
                create: {
                  orderIndex: 1,
                  questions: {
                    create: {
                      orderIndex: 1,
                      questionType: "multiple_choice",
                      questionText: "Water boils at how many degrees Celsius?",
                      correctAnswer: "100",
                      points: 1,
                    },
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
                include: { questions: true },
              },
            },
          },
        },
      });
      exam2Id = e2.id;
    });

    it("Step 1: Completing 1 of 2 exams automatically syncs course progress to 50% and claims 25% & 50% milestones", async () => {
      // 1. Student starts Exam 1
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: {
          authorization: `Bearer ${studentToken}`,
          "content-type": "application/json",
        },
        payload: {
          examId: exam1Id,
        },
      });
      expect(startRes.statusCode).toBe(201);
      const submission1 = JSON.parse(startRes.body);

      // Get question ID
      const exam1 = await prisma.exam.findUnique({
        where: { id: exam1Id },
        include: { sections: { include: { questionGroups: { include: { questions: true } } } } },
      });
      const q1Id = exam1!.sections[0].questionGroups[0].questions[0].id;

      // 2. Student submits Exam 1
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submission1.id}/submit`,
        headers: {
          authorization: `Bearer ${studentToken}`,
          "content-type": "application/json",
        },
        payload: {
          answers: [
            {
              questionId: q1Id,
              answerText: "Paris",
            },
          ],
        },
      });
      expect(submitRes.statusCode).toBe(200);

      // Verify Enrollment progress is now 50% (1 of 2 exams completed)
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: testCourseId,
            studentId: studentUserId,
          },
        },
      });
      expect(enrollment?.progressPercent).toBe(50);

      // Verify Milestone Claims: 25% and 50% milestones exist
      const claims = await prisma.studentMilestoneClaim.findMany({
        where: { studentId: studentUserId },
      });
      const claimKeys = claims.map((c) => c.milestoneKey);
      expect(claimKeys).toContain("MILESTONE_25_PERCENT");
      expect(claimKeys).toContain("MILESTONE_50_PERCENT");
    }, 60000);

    it("Step 2: Completing all exams syncs progress to 100% and claims Grand Graduation milestone", async () => {
      // 1. Student starts Exam 2
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: {
          authorization: `Bearer ${studentToken}`,
          "content-type": "application/json",
        },
        payload: {
          examId: exam2Id,
        },
      });
      expect(startRes.statusCode).toBe(201);
      const submission2 = JSON.parse(startRes.body);

      // Get question ID
      const exam2 = await prisma.exam.findUnique({
        where: { id: exam2Id },
        include: { sections: { include: { questionGroups: { include: { questions: true } } } } },
      });
      const q2Id = exam2!.sections[0].questionGroups[0].questions[0].id;

      // 2. Student submits Exam 2
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submission2.id}/submit`,
        headers: {
          authorization: `Bearer ${studentToken}`,
          "content-type": "application/json",
        },
        payload: {
          answers: [
            {
              questionId: q2Id,
              answerText: "100",
            },
          ],
        },
      });
      expect(submitRes.statusCode).toBe(200);

      // Verify Enrollment progress is now 100%
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: testCourseId,
            studentId: studentUserId,
          },
        },
      });
      expect(enrollment?.progressPercent).toBe(100);

      // Verify Milestone Claims: 75% and Grand Graduation exist
      const claims = await prisma.studentMilestoneClaim.findMany({
        where: { studentId: studentUserId },
      });
      const claimKeys = claims.map((c) => c.milestoneKey);
      expect(claimKeys).toContain("MILESTONE_75_PERCENT");
      expect(claimKeys).toContain("MILESTONE_GRAND_GRADUATION");

      // Verify Student Claims Endpoint
      const claimsRes = await app.inject({
        method: "GET",
        url: "/api/v1/milestones/claims",
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
      });
      expect(claimsRes.statusCode).toBe(200);
      const resClaims = JSON.parse(claimsRes.body).data;
      expect(resClaims).toContain("MILESTONE_GRAND_GRADUATION");
    }, 60000);
  });
});

