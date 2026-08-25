import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fp from "fastify-plugin";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../app.js";
import { FastifyInstance } from "fastify";

const mockPrisma = createMockPrisma();
vi.mock("../plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" },
    ),
  };
});

describe("GATE A, B, C: P0 SECURITY FREEZE & ANSWER KEY PROTECTION TEST SUITE", () => {
  let app: FastifyInstance;
  let prisma: any;

  // Personas
  let adminToken: string;
  let teacherToken: string;
  let student1Token: string;
  let student2Token: string;

  const adminId = "11111111-1111-4111-8111-111111111111";
  const teacherId = "22222222-2222-4222-8222-222222222222";
  const student1Id = "33333333-3333-4333-8333-333333333333";
  const student2Id = "44444444-4444-4444-8444-444444444444";

  const courseId = "55555555-5555-4555-8555-555555555555";
  const examId = "66666666-6666-4666-8666-666666666666";
  const sectionId = "77777777-7777-4777-8777-777777777777";
  const groupId = "88888888-8888-4888-8888-888888888888";
  const qSingleId = "99999999-9999-4999-8999-999999999991";
  const qMultiId = "99999999-9999-4999-8999-999999999992";
  const qFillId = "99999999-9999-4999-8999-999999999993";

  let submission1Id: string;

  const FORBIDDEN_FIELDS = [
    "correctAnswer",
    "correct_answer",
    "audioScript",
    "audio_script",
    "acceptedAnswers",
    "answerKey",
    "answer_key",
  ];

  function scanForbiddenFields(obj: any, path = ""): string[] {
    const leaks: string[] = [];
    if (!obj || typeof obj !== "object") return leaks;

    for (const key of Object.keys(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      const val = obj[key];

      if (FORBIDDEN_FIELDS.includes(key) && val !== null && val !== undefined) {
        leaks.push(`${currentPath} = ${JSON.stringify(val)}`);
      }

      if (typeof val === "object" && val !== null) {
        leaks.push(...scanForbiddenFields(val, currentPath));
      }
    }
    return leaks;
  }

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    prisma = mockPrisma;

    // Clean mock
    await prisma.userRole.deleteMany();
    await prisma.user.deleteMany();

    // 1. Seed Users
    await prisma.user.createMany({
      data: [
        { id: adminId, email: "admin@test.com", password: "hash", fullName: "Admin P0" },
        { id: teacherId, email: "teacher@test.com", password: "hash", fullName: "Teacher P0" },
        { id: student1Id, email: "student1@test.com", password: "hash", fullName: "Student 1 P0" },
        { id: student2Id, email: "student2@test.com", password: "hash", fullName: "Student 2 P0" },
      ],
    });

    await prisma.userRole.createMany({
      data: [
        { userId: adminId, role: "admin" },
        { userId: teacherId, role: "teacher" },
        { userId: student1Id, role: "student" },
        { userId: student2Id, role: "student" },
      ],
    });

    // Mock Exam & Questions in Prisma
    const examData = {
      id: examId,
      courseId,
      title: "IELTS P0 Security Audit Exam",
      isPublished: true,
      isActive: true,
      isOpen: true,
      durationMinutes: 60,
      sections: [
        {
          id: sectionId,
          examId,
          title: "Listening & Reading Section",
          sectionType: "listening",
          orderIndex: 1,
          audioUrl: "/audio/test.mp3",
          audioScript: "SECRET_TRANSCRIPT_DO_NOT_LEAK",
          questionGroups: [
            {
              id: groupId,
              sectionId,
              title: "Part 1 Questions",
              orderIndex: 1,
              questions: [
                {
                  id: qSingleId,
                  groupId,
                  questionType: "multiple_choice",
                  questionText: "What is the capital of France?",
                  options: ["Paris", "London", "Berlin", "Rome"],
                  correctAnswer: "Paris",
                  points: 1,
                  orderIndex: 1,
                },
                {
                  id: qMultiId,
                  groupId,
                  questionType: "multiple_choice",
                  questionText: "Choose TWO benefits of exercise.",
                  options: ["Weight loss", "Better sleep", "More stress", "Poor memory"],
                  correctAnswer: "Weight loss | Better sleep",
                  points: 2,
                  orderIndex: 2,
                },
                {
                  id: qFillId,
                  groupId,
                  questionType: "fill_blank",
                  questionText: "The meeting is at [blank_0] in room [blank_1].",
                  options: [],
                  correctAnswer: JSON.stringify({ "0": "10am|10:00", "1": "304" }),
                  points: 2,
                  orderIndex: 3,
                },
              ],
            },
          ],
        },
      ],
    };

    // Seed Exam in mock Prisma
    await prisma.exam.deleteMany();
    await prisma.examSubmission.deleteMany();
    await prisma.answer.deleteMany();
    await prisma.exam.create({ data: examData });

    // Generate JWT Tokens
    adminToken = app.jwt.sign({ id: adminId, email: "admin@test.com", roles: ["admin"] });
    teacherToken = app.jwt.sign({ id: teacherId, email: "teacher@test.com", roles: ["teacher"] });
    student1Token = app.jwt.sign({ id: student1Id, email: "student1@test.com", roles: ["student"] });
    student2Token = app.jwt.sign({ id: student2Id, email: "student2@test.com", roles: ["student"] });
  });

  afterAll(async () => {
    await app.close();
  });

  // =========================================================================
  // GATE A: SECURITY VERIFICATION
  // =========================================================================
  describe("GATE A: Security Verification", () => {
    it("A1. P0.1 - Student CANNOT elevate role or mutate user_roles (Denied + DB Verified)", async () => {
      // 1. Attempt to call admin endpoints or mutate role
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/users",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { email: "hacked@test.com", role: "admin" },
      });
      expect(res.statusCode).toBe(403);

      // 2. Physical DB check: Verify student1 has NOT been promoted in database
      const roles = await prisma.userRole.findMany({ where: { userId: student1Id } });
      expect(roles.map((r: any) => r.role)).toEqual(["student"]);
      expect(roles.some((r: any) => r.role === "admin")).toBe(false);
    });

    it("A2. P0.2 - Student GET /exams/:id MUST NOT leak answer keys or audio script (Zero Secret Leaks)", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/exams/${examId}`,
        headers: { authorization: `Bearer ${student1Token}` },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);

      // Recursive scan of entire JSON payload for secret keywords
      const leaks = scanForbiddenFields(json);
      expect(leaks).toEqual([]);

      // Explicit assertions on question DTOs
      const questions = json.sections[0].questionGroups[0].questions;
      expect(questions[0].correctAnswer).toBeNull();
      expect(questions[1].correctAnswer).toBeNull();
      expect(questions[2].correctAnswer).toBeNull();
      expect(json.sections[0].audioScript).toBeUndefined();
    });

    it("A3. P0.2 - Safe Metadata: Multiple Choice exposes selectionMode & maxSelections WITHOUT leaking answers", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/exams/${examId}`,
        headers: { authorization: `Bearer ${student1Token}` },
      });

      const json = JSON.parse(res.payload);
      const questions = json.sections[0].questionGroups[0].questions;

      // Single select question
      expect(questions[0].selectionMode).toBe("single");
      expect(questions[0].maxSelections).toBe(1);
      expect(questions[0].isMultiChoice).toBe(false);

      // Multi select question
      expect(questions[1].selectionMode).toBe("multiple");
      expect(questions[1].maxSelections).toBe(2);
      expect(questions[1].isMultiChoice).toBe(true);
    });

    it("A4. P0.3 - Student starting attempt sets status=IN_PROGRESS and scores are strictly NULL in DB", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { examId },
      });

      if (res.statusCode !== 201) {
        console.error("POST /submissions payload:", res.payload);
      }
      expect(res.statusCode).toBe(201);
      const json = JSON.parse(res.payload);
      submission1Id = json.id;

      expect(json.status).toBe("IN_PROGRESS");
      expect(json.totalScore).toBeNull();
      expect(json.correctAnswers).toBeNull();

      // Database verification
      const subInDb = await prisma.examSubmission.findUnique({ where: { id: submission1Id } });
      expect(subInDb.status).toBe("IN_PROGRESS");
      expect(subInDb.totalScore).toBeNull();
    });

    it("A5. P0.3 - Student CANNOT mutate total_score or force status=GRADED on PUT /submissions/:id (DB Verified)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submission1Id}`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {
          answers: [{ questionId: qSingleId, answerText: "Paris" }],
          totalScore: 9.0,
          correctAnswers: 40,
          status: "GRADED",
        },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.status).toBe("IN_PROGRESS");

      // Critical DB Check: Server must ignore totalScore and status injection
      const subInDb = await prisma.examSubmission.findUnique({ where: { id: submission1Id } });
      expect(subInDb.status).toBe("IN_PROGRESS");
      expect(subInDb.totalScore).toBeNull();
      expect(subInDb.correctAnswers).toBeNull();
    });
  });

  // =========================================================================
  // GATE B: ARCHITECTURE & AUTHORITATIVE SCORING
  // =========================================================================
  describe("GATE B: Architecture & Endpoint Separation", () => {
    it("B1. P0.5 - PUT /submissions/:id is strictly Autosave (Answers only, no status modification)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submission1Id}`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {
          answers: [
            { questionId: qSingleId, answerText: "Paris" },
            { questionId: qMultiId, answerText: JSON.stringify(["Weight loss", "Better sleep"]) },
            { questionId: qFillId, answerText: JSON.stringify({ "0": "10am", "1": "304" }) },
          ],
        },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.status).toBe("IN_PROGRESS");
      expect(json.savedCount).toBe(3);
    });

    it("B2. P0.5 - POST /submissions/:id/submit is the Authoritative Final Submit (Scores computed & locked in DB)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submission1Id}/submit`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {
          answers: [],
        },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);

      expect(json.status).toBe("GRADED");
      expect(json.submittedAt).toBeDefined();
      expect(json.correctAnswers).toBe(5); // 1 single + 2 multi-choices + 2 blanks = 5
      expect(json.totalScore).toBe(5); // 1 + 2 + 2 = 5 points

      // Response MUST NOT contain unmasked secret fields
      const leaks = scanForbiddenFields(json);
      expect(leaks).toEqual([]);

      // Database verification: status & score are locked in DB
      const subInDb = await prisma.examSubmission.findUnique({ where: { id: submission1Id } });
      expect(subInDb.status).toBe("GRADED");
      expect(subInDb.totalScore).toBe(5);
      expect(subInDb.correctAnswers).toBe(5);
    });

    it("B3. P0.5 - Double-submit is Idempotent (Returns saved result without re-modifying score)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submission1Id}/submit`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {},
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(5);
    });

    it("B4. P0.5 - Editing a GRADED submission is strictly REJECTED (400 or 409 Conflict)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submission1Id}`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {
          answers: [{ questionId: qSingleId, answerText: "London" }],
        },
      });

      expect([400, 409]).toContain(res.statusCode);
    });
  });

  // =========================================================================
  // GATE C: REGRESSION & IDOR ISOLATION
  // =========================================================================
  describe("GATE C: Regression & Student Isolation", () => {
    it("C1. Student 2 CANNOT access or submit Student 1's submission (403 Forbidden)", async () => {
      // Student 2 tries to autosave Student 1's submission
      const putRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submission1Id}`,
        headers: { authorization: `Bearer ${student2Token}` },
        payload: { answers: [{ questionId: qSingleId, answerText: "London" }] },
      });
      expect(putRes.statusCode).toBe(403);

      // Student 2 tries to submit Student 1's submission
      const postRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submission1Id}/submit`,
        headers: { authorization: `Bearer ${student2Token}` },
        payload: {},
      });
      expect(postRes.statusCode).toBe(403);
    });

    it("C2. Student 1 reviewing own GRADED submission receives questions and answers safely", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${submission1Id}`,
        headers: { authorization: `Bearer ${student1Token}` },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.id).toBe(submission1Id);
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(5);
      expect(json.answers.length).toBe(3);
    });
  });
});
