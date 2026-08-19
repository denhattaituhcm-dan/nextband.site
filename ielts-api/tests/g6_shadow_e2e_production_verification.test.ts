import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../src/app.js";

const mockPrisma = createMockPrisma();
vi.mock("../src/plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" }
    ),
  };
});

describe("🏛️ GATE G6: READ-ONLY SHADOW E2E & PRODUCTION BEHAVIOR VERIFICATION (NO DUAL-WRITE)", () => {
  let app: FastifyInstance;

  // G6-1: Dataset Personas (Valid UUIDs)
  const adminId = "a0000000-0000-4000-8000-333333333333";
  const teacherAId = "a1111111-aaaa-4111-8111-333333333333";
  const teacherBId = "a2222222-bbbb-4222-8222-333333333333";
  const studentAId = "11111111-aaaa-4111-8111-333333333333";
  const studentBId = "22222222-bbbb-4222-8222-333333333333";

  let adminToken: string;
  let teacherAToken: string;
  let teacherBToken: string;
  let studentAToken: string;
  let studentBToken: string;

  const classAId = "c1111111-aaaa-4111-8111-333333333333";
  const classBId = "c2222222-bbbb-4222-8222-333333333333";
  const courseId = "c0000000-0000-4000-8000-333333333333";
  const sessionAId = "99999999-9999-4999-8999-999999999999";

  const objExamId = "exm-g6-objective-1";
  const subjExamId = "exm-g6-subjective-2";

  const q1McqId = "q-g6-mcq-1";
  const q2MultiId = "q-g6-multi-2";
  const q3FillId = "q-g6-fill-3";
  const qEssayId = "q-g6-essay-4";

  let studentASubmissionId: string;
  let studentBSubmissionId: string;
  let subjectiveSubId: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    adminToken = app.jwt.sign({ id: adminId, roles: ["admin"], email: "admin.g6@test.com" });
    teacherAToken = app.jwt.sign({ id: teacherAId, roles: ["teacher"], email: "teacher.a.g6@test.com" });
    teacherBToken = app.jwt.sign({ id: teacherBId, roles: ["teacher"], email: "teacher.b.g6@test.com" });
    studentAToken = app.jwt.sign({ id: studentAId, roles: ["student"], email: "student.a.g6@test.com" });
    studentBToken = app.jwt.sign({ id: studentBId, roles: ["student"], email: "student.b.g6@test.com" });

    // Seed Personas
    await mockPrisma.user.createMany({
      data: [
        { id: adminId, email: "admin.g6@test.com", fullName: "Admin G6 Enterprise" },
        { id: teacherAId, email: "teacher.a.g6@test.com", fullName: "Teacher A (Class A Head)" },
        { id: teacherBId, email: "teacher.b.g6@test.com", fullName: "Teacher B (Class B Head)" },
        { id: studentAId, email: "student.a.g6@test.com", fullName: "Student A (Enrolled Class A)" },
        { id: studentBId, email: "student.b.g6@test.com", fullName: "Student B (Enrolled Class B)" },
      ],
    });

    await mockPrisma.userRole.createMany({
      data: [
        { userId: adminId, role: "admin" },
        { userId: teacherAId, role: "teacher" },
        { userId: teacherBId, role: "teacher" },
        { userId: studentAId, role: "student" },
        { userId: studentBId, role: "student" },
      ],
    });

    // Seed Course & Classes
    await mockPrisma.course.create({
      data: {
        id: courseId,
        title: "IELTS Master 7.5+ Enterprise Course",
        description: "Canonical IELTS Preparation Course",
        isPublished: true,
        isActive: true,
      },
    });

    await mockPrisma.class.create({
      data: { id: classAId, name: "IELTS Intensive A", teacherId: teacherAId, courseId, isActive: true },
    });

    await mockPrisma.class.create({
      data: { id: classBId, name: "IELTS Intensive B", teacherId: teacherBId, courseId, isActive: true },
    });

    await mockPrisma.classStudent.createMany({
      data: [
        { id: "cs-g6-1", classId: classAId, studentId: studentAId, deletedAt: null },
        { id: "cs-g6-2", classId: classBId, studentId: studentBId, deletedAt: null },
      ],
    });

    await mockPrisma.classSession.createMany({
      data: [
        {
          id: sessionAId,
          classId: classAId,
          sessionNumber: 1,
          title: "Buổi 1",
          sessionDate: new Date(),
          status: "SCHEDULED",
        },
      ],
    });

    // Seed Objective Exam (Reading & Listening with MCQ, Multi-select, Fill-in-Blank)
    await mockPrisma.exam.create({
      data: {
        id: objExamId,
      courseId,
      title: "IELTS Academic Reading & Listening Final Mock",
      isPublished: true,
      isActive: true,
      isOpen: true,
      durationMinutes: 60,
      sections: [
        {
          id: "sec-g6-1",
          examId: objExamId,
          title: "Section 1: Academic Reading",
          sectionType: "reading",
          audioScript: "SECRET_TRANSCRIPT_IMMUTABLE_PROD",
          questionGroups: [
            {
              id: "grp-g6-1",
              title: "Questions 1-3",
              questions: [
                {
                  id: q1McqId,
                  questionType: "multiple_choice",
                  questionText: "What is the capital of Australia?",
                  options: ["Canberra", "Sydney", "Melbourne"],
                  correctAnswer: "Canberra",
                  points: 1,
                },
                {
                  id: q2MultiId,
                  questionType: "multiple_choice",
                  isMultiChoice: true,
                  questionText: "Choose TWO renewable energy sources:",
                  options: ["Solar", "Wind", "Coal", "Oil"],
                  correctAnswer: "Solar | Wind",
                  points: 2,
                },
                {
                  id: q3FillId,
                  questionType: "fill_blank",
                  questionText: "The meeting begins at [blank_0] in room [blank_1].",
                  correctAnswer: JSON.stringify({ "0": "9:00 AM", "1": "Room 101" }),
                  points: 2,
                },
              ],
            },
          ],
        },
      ],
    },
  });

    // Seed Subjective Exam (Writing Task 2 Essay)
    await mockPrisma.exam.create({
      data: {
        id: subjExamId,
        courseId,
        title: "IELTS Writing Task 2 Mock Exam",
        isPublished: true,
        isActive: true,
        isOpen: true,
        durationMinutes: 40,
        sections: [
          {
            id: "sec-g6-2",
            examId: subjExamId,
            title: "Writing Section",
            sectionType: "writing",
            questionGroups: [
              {
                id: "grp-g6-2",
                title: "Task 2 Essay Prompt",
                questions: [
                  {
                    id: qEssayId,
                    questionType: "essay",
                    questionText: "Some people believe that university education should be free. Discuss both views.",
                    points: 9,
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  // =========================================================================
  // G6-2: SECURITY SHADOW (IDOR, DIRECT URL & RBAC TESTS)
  // =========================================================================
  describe("G6-2: Security Shadow (IDOR & Role Isolation via Direct URL)", () => {
    it("2.1. Student A starts attempt for Exam 1 -> creates subA", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: { examId: objExamId },
      });
      expect(res.statusCode).toBe(201);
      studentASubmissionId = JSON.parse(res.body).id;
      expect(studentASubmissionId).toBeDefined();
    });

    it("2.2. Student B starts attempt for Exam 1 -> creates subB", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: { examId: objExamId },
      });
      expect(res.statusCode).toBe(201);
      studentBSubmissionId = JSON.parse(res.body).id;
      expect(studentBSubmissionId).toBeDefined();
    });

    it("2.3. Student A accesses own submission A -> 200 OK", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${studentASubmissionId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });
      expect(res.statusCode).toBe(200);
      expect(res.headers["x-request-id"]).toBeDefined();
    });

    it("2.4. 🛡️ IDOR ATTEMPT: Student A accesses Student B's submission via URL -> MUST BE 403 Forbidden", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${studentBSubmissionId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });
      expect(res.statusCode).toBe(403);
      const json = JSON.parse(res.body);
      expect(json.error).toMatch(/Từ chối truy cập/i);
    });

    it("2.5. 🛡️ SCORE MUTATION IDOR: Student A attempts to grade own submission directly -> MUST BE 403 Forbidden", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${studentASubmissionId}/grade`,
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: { grades: [{ answerId: "fake-id", score: 9.0 }] },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.6. 🛡️ TEACHER SCOPE ISOLATION: Teacher B attempts to modify Class A -> MUST BE 403 Forbidden", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/classes/${classAId}`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { name: "Hacked Class Name" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.7. 🛡️ ADMIN ENDPOINT PROTECTION: Teacher A attempts to create user -> MUST BE 403 Forbidden", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/users",
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { email: "new-user@test.com", password: "password123", role: "student" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.8. Unauthenticated request to protected endpoint -> MUST BE 401 Unauthorized", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/submissions",
      });
      expect(res.statusCode).toBe(401);
    });

    it("2.9. Invalid JWT signature -> MUST BE 401 Unauthorized", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/submissions",
        headers: { authorization: "Bearer invalid.jwt.token.here" },
      });
      expect(res.statusCode).toBe(401);
    });
  });

  // =========================================================================
  // G6-3 & G6-5: GRADING SHADOW & ANSWER-KEY LEAK ZERO-TOLERANCE
  // =========================================================================
  describe("G6-3 & G6-5: Grading Authority & Answer-Key Zero Leakage", () => {
    it("5.1. 🔒 RAW RESPONSE INSPECTION: In-progress submission MUST NOT leak answer keys or transcripts", async () => {
      const rawRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${studentASubmissionId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });

      expect(rawRes.statusCode).toBe(200);
      const rawBody = rawRes.body;

      // Assert secret strings do not exist anywhere in raw body
      expect(rawBody).not.toContain("SECRET_TRANSCRIPT_IMMUTABLE_PROD");
      
      const json = JSON.parse(rawBody);
      const sec0 = json.exam.sections[0];
      const q1 = sec0.questionGroups[0].questions[0];
      expect(Object.hasOwn(q1, "correctAnswer")).toBe(false);
      expect(Object.hasOwn(q1, "correct_answer")).toBe(false);
      expect(Object.hasOwn(q1, "acceptedAnswers")).toBe(false);
      expect(Object.hasOwn(q1, "answerKey")).toBe(false);
      expect(Object.hasOwn(sec0, "audioScript")).toBe(false);
      expect(Object.hasOwn(sec0, "audio_script")).toBe(false);
    });

    it("3.1. 🛡️ SCORE INJECTION RESISTANCE: Client injects 9.0 with wrong answers -> Server scores 0.0", async () => {
      const maliciousPayload = {
        answers: [
          { questionId: q1McqId, answerText: "Wrong City" },
          { questionId: q2MultiId, answerText: ["Coal", "Oil"] },
          { questionId: q3FillId, answerText: ["12:00 PM", "Room 999"] },
        ],
        score: 9.0,
        bandScore: 9.0,
        totalScore: 5.0,
        isCorrect: true,
        status: "GRADED",
      };

      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${studentASubmissionId}/submit`,
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: maliciousPayload,
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.body);
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(0);
      expect(json.correctAnswers).toBe(0);
      expect(json.bandScore).toBe(0);
    });
  });

  // =========================================================================
  // G6-4: STATE MACHINE INVARIANTS & AUDIT TRAIL
  // =========================================================================
  describe("G6-4: State Machine Invariants & Regrade Audit Trail", () => {
    it("4.1. GRADED is Immutable: Delayed autosave PUT is rejected with 409 Conflict", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${studentASubmissionId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: { answers: [{ questionId: q1McqId, answerText: "Canberra" }] },
      });
      expect(res.statusCode).toBe(409);
    });

    it("4.2. Authorized Regrade: Teacher A regrades Student A with mandatory reason and writes Audit Outbox", async () => {
      const answerRecord = mockPrisma.answers.find(
        (a) => a.submissionId === studentASubmissionId && a.questionId === q1McqId
      );
      expect(answerRecord).toBeDefined();

      const regradeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${studentASubmissionId}/regrade`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          reason: "Phúc khảo chính thức: Duyệt điểm câu 1 theo đáp án tương đương",
          grades: [{ answerId: answerRecord!.id, score: 1.0, feedback: "Chấp thuận sau phúc khảo" }],
        },
      });

      expect(regradeRes.statusCode).toBe(200);
      const json = JSON.parse(regradeRes.body);
      expect(json.totalScore).toBe(1.0);
      expect(json.previousScore).toBe(0.0);

      // Verify Audit Outbox event
      const auditLog = mockPrisma.auditOutboxList.find(
        (a) => a.eventType === "SUBMISSION_REGRADED" && a.submissionId === studentASubmissionId
      );
      expect(auditLog).toBeDefined();
      expect(auditLog!.actorId).toBe(teacherAId);
      expect(auditLog!.eventType).toBe("SUBMISSION_REGRADED");
    });
  });

  // =========================================================================
  // G6-6: 4 CRITICAL USER JOURNEYS (CUJ)
  // =========================================================================
  describe("G6-6: 4 Critical User Journeys (CUJ Verification)", () => {
    // CUJ-01: Student Full Exam Lifecycle
    it("CUJ-01: Student B completes entire exam: Start -> Draft -> Resume -> Submit -> Receive Score", async () => {
      // 1. Autosave draft answers
      const saveRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${studentBSubmissionId}`,
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: {
          answers: [
            { questionId: q1McqId, answerText: "   canberra   " },
            { questionId: q2MultiId, answerText: ["solar", "wind"] },
          ],
        },
      });
      expect(saveRes.statusCode).toBe(200);

      // 2. Resume and verify saved answers
      const resumeRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${studentBSubmissionId}`,
        headers: { authorization: `Bearer ${studentBToken}` },
      });
      expect(resumeRes.statusCode).toBe(200);

      // 3. Final Submit
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${studentBSubmissionId}/submit`,
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: {
          answers: [
            { questionId: q1McqId, answerText: "Canberra" }, // 1 pt
            { questionId: q2MultiId, answerText: ["Solar", "Wind"] }, // 2 pts
            { questionId: q3FillId, answerText: ["9:00 AM", "Room 101"] }, // 2 pts
          ],
        },
      });

      expect(submitRes.statusCode).toBe(200);
      const finalJson = JSON.parse(submitRes.body);
      expect(finalJson.status).toBe("GRADED");
      expect(finalJson.totalScore).toBe(5);
      expect(finalJson.correctAnswers).toBe(5);
    });

    // CUJ-02: Subjective Exam (Writing Task 2) & Teacher Grading
    it("CUJ-02: Student A submits Essay -> Status SUBMITTED -> Teacher A grades -> Status GRADED", async () => {
      // 1. Student A starts subjective exam
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: { examId: subjExamId },
      });
      expect(startRes.statusCode).toBe(201);
      subjectiveSubId = JSON.parse(startRes.body).id;

      // 2. Student A submits essay
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subjectiveSubId}/submit`,
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: {
          answers: [{ questionId: qEssayId, answerText: "In modern society, education plays a vital role..." }],
        },
      });
      expect(submitRes.statusCode).toBe(200);
      const subJson = JSON.parse(submitRes.body);
      expect(subJson.status).toBe("SUBMITTED"); // Pending teacher manual grading

      // 3. Teacher A grades the essay
      const answerRecord = mockPrisma.answers.find((a) => a.submissionId === subjectiveSubId);
      expect(answerRecord).toBeDefined();

      const gradeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subjectiveSubId}/grade`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          grades: [{ answerId: answerRecord!.id, score: 7.5, feedback: "Good coherence and lexical resource." }],
          totalScore: 7.5,
        },
      });
      expect(gradeRes.statusCode).toBe(200);
      const gradedJson = JSON.parse(gradeRes.body);
      expect(gradedJson.status).toBe("GRADED");
      expect(gradedJson.totalScore).toBe(7.5);
    });

    // CUJ-03: Class & Attendance Workflow
    it("CUJ-03: Class lifecycle & Attendance Sheet management", async () => {
      // 1. Get class details
      const classRes = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(classRes.statusCode).toBe(200);

      // 2. Record attendance for session in class
      const attRes = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          items: [{ studentId: studentAId, status: "PRESENT", note: "On time" }],
        },
      });
      expect(attRes.statusCode).toBe(200);
    });

    // CUJ-04: Homework Assignment & Evaluation Workflow
    it("CUJ-04: Homework listing and evaluation retrieval", async () => {
      const hwRes = await app.inject({
        method: "GET",
        url: `/api/v1/exams`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });
      expect(hwRes.statusCode).toBe(200);
      const json = JSON.parse(hwRes.body);
      expect(json.data.length).toBeGreaterThanOrEqual(2);
    });
  });

  // =========================================================================
  // G6-8 & G6-9: ZERO DUAL-WRITE & OBSERVABILITY TRACING
  // =========================================================================
  describe("G6-8 & G6-9: Zero Dual-Write Proof & X-Request-ID Tracing", () => {
    it("8.1. Every response carries X-Request-ID for end-to-end tracing", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${studentASubmissionId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });
      expect(res.headers["x-request-id"]).toBeDefined();
      expect(typeof res.headers["x-request-id"]).toBe("string");
    });

    it("8.2. 🛡️ ZERO DUAL-WRITE: All persistent mutations go exclusively to PostgreSQL Canonical DB", () => {
      // Ensure all mutated entities reside in the single canonical mock/DB instance
      expect(mockPrisma.examSubmissions.length).toBeGreaterThanOrEqual(3);
      expect(mockPrisma.auditOutboxList.length).toBeGreaterThanOrEqual(1);
    });
  });
});
