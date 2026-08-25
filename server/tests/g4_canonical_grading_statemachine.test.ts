import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../app.js";
import { IeltsBandCalculator } from "../services/scoring/IeltsBandCalculator.js";
import { defaultTextNormalizer } from "../services/scoring/TextNormalizer.js";

const mockPrisma = createMockPrisma();
vi.mock("../plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" }
    ),
  };
});

describe("🏛️ GATE G4: CANONICAL GRADING AUTHORITY + SUBMISSION STATE MACHINE + REGRADE AUDITING", () => {
  let app: FastifyInstance;

  // Personas
  const adminId = "adm-g4-1111-2222-3333-444444444444";
  const teacherAId = "tch-g4-aaaa-2222-3333-444444444444";
  const teacherBId = "tch-g4-bbbb-2222-3333-444444444444";
  const student1Id = "std-g4-1111-2222-3333-444444444444";
  const student2Id = "std-g4-2222-2222-3333-444444444444";

  let adminToken: string;
  let teacherAToken: string;
  let teacherBToken: string;
  let student1Token: string;
  let student2Token: string;

  const classAId = "cls-g4-aaaa-2222-3333-444444444444";
  const classBId = "cls-g4-bbbb-2222-3333-444444444444";
  const courseId = "crs-g4-0000-2222-3333-444444444444";

  const objectiveExamId = "exm-g4-objective-1";
  const manualExamId = "exm-g4-manual-1";

  const q1Id = "q-g4-single-1";
  const q2Id = "q-g4-multi-2";
  const q3Id = "q-g4-fill-3";
  const qEssayId = "q-g4-essay-4";

  let activeSubId: string;
  let manualSubId: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    adminToken = app.jwt.sign({ id: adminId, roles: ["admin"], email: "admin.g4@test.com" });
    teacherAToken = app.jwt.sign({ id: teacherAId, roles: ["teacher"], email: "teacher.a.g4@test.com" });
    teacherBToken = app.jwt.sign({ id: teacherBId, roles: ["teacher"], email: "teacher.b.g4@test.com" });
    student1Token = app.jwt.sign({ id: student1Id, roles: ["student"], email: "student1.g4@test.com" });
    student2Token = app.jwt.sign({ id: student2Id, roles: ["student"], email: "student2.g4@test.com" });

    // Seed users
    mockPrisma.users.push(
      { id: adminId, email: "admin.g4@test.com", fullName: "Admin G4" },
      { id: teacherAId, email: "teacher.a.g4@test.com", fullName: "Teacher A G4" },
      { id: teacherBId, email: "teacher.b.g4@test.com", fullName: "Teacher B G4" },
      { id: student1Id, email: "student1.g4@test.com", fullName: "Student 1 G4" },
      { id: student2Id, email: "student2.g4@test.com", fullName: "Student 2 G4" }
    );

    // Seed classes: Teacher A manages Class A (Student 1 enrolled); Teacher B manages Class B (Student 2 enrolled)
    mockPrisma.classes.push(
      { id: classAId, name: "IELTS Intensive A", teacherId: teacherAId, courseId, isActive: true },
      { id: classBId, name: "IELTS Intensive B", teacherId: teacherBId, courseId, isActive: true }
    );

    mockPrisma.classStudents.push(
      { id: "cs-g4-1", classId: classAId, studentId: student1Id, deletedAt: null },
      { id: "cs-g4-2", classId: classBId, studentId: student2Id, deletedAt: null }
    );

    // Seed Objective Exam (100% auto-graded)
    mockPrisma.exams.push({
      id: objectiveExamId,
      courseId,
      title: "G4 Objective Canonical Exam",
      isPublished: true,
      isActive: true,
      isOpen: true,
      durationMinutes: 60,
      sections: [
        {
          id: "sec-g4-1",
          examId: objectiveExamId,
          title: "Reading Section",
          sectionType: "reading",
          audioScript: "SECRET_TRANSCRIPT_G4",
          questionGroups: [
            {
              id: "grp-g4-1",
              title: "Questions 1-3",
              questions: [
                {
                  id: q1Id,
                  questionType: "multiple_choice",
                  questionText: "What is the capital of Australia?",
                  options: ["Canberra", "Sydney", "Melbourne"],
                  correctAnswer: "Canberra",
                  points: 1,
                },
                {
                  id: q2Id,
                  questionType: "multiple_choice",
                  isMultiChoice: true,
                  questionText: "Choose TWO renewable energy sources:",
                  options: ["Solar", "Wind", "Coal", "Oil"],
                  correctAnswer: "Solar | Wind",
                  points: 2,
                },
                {
                  id: q3Id,
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
    });

    // Seed Manual Exam (Essay / Writing)
    mockPrisma.exams.push({
      id: manualExamId,
      courseId,
      title: "G4 Writing Task 2 Exam",
      isPublished: true,
      isActive: true,
      isOpen: true,
      durationMinutes: 40,
      sections: [
        {
          id: "sec-g4-2",
          examId: manualExamId,
          title: "Writing Section",
          sectionType: "writing",
          questionGroups: [
            {
              id: "grp-g4-2",
              title: "Task 2",
              questions: [
                {
                  id: qEssayId,
                  questionType: "essay",
                  questionText: "Discuss both views and give your opinion.",
                  points: 9,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  // =========================================================================
  // 1. CANONICAL GRADING AUTHORITY & SCORE INJECTION RESISTANCE
  // =========================================================================
  describe("1. Canonical Grading Authority & Anti-Injection Protection", () => {
    it("1.1. Student starts attempt -> status is IN_PROGRESS and answers are masked", async () => {
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { examId: objectiveExamId },
      });

      expect(startRes.statusCode).toBe(201);
      const json = JSON.parse(startRes.body);
      activeSubId = json.id;
      expect(json.status).toBe("IN_PROGRESS");
      expect(json.totalScore).toBeNull();

      // Ensure zero answer key leakage in IN_PROGRESS
      const getRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${activeSubId}`,
        headers: { authorization: `Bearer ${student1Token}` },
      });
      const subDetail = JSON.parse(getRes.body);
      const q1 = subDetail.exam.sections[0].questionGroups[0].questions[0];
      expect(Object.hasOwn(q1, "correctAnswer")).toBe(false);
      expect(Object.hasOwn(subDetail.exam.sections[0], "audioScript")).toBe(false);
    });

    it("1.2. 🛡️ SCORE INJECTION RESISTANCE: Server completely ignores client fake scores and computes real score", async () => {
      // Student submits with wrong answers BUT attempts to inject perfect scores
      const fakeScorePayload = {
        answers: [
          { questionId: q1Id, answerText: "Sydney" }, // WRONG (Correct: Canberra)
          { questionId: q2Id, answerText: ["Coal", "Oil"] }, // WRONG (Correct: Solar, Wind)
          { questionId: q3Id, answerText: ["12:00 PM", "Room 999"] }, // WRONG
        ],
        // MALICIOUS INJECTION FIELDS:
        score: 9.0,
        bandScore: 9.0,
        totalScore: 5.0,
        correctAnswers: 5,
        isCorrect: true,
        status: "GRADED",
      };

      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/submit`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: fakeScorePayload,
      });

      expect(submitRes.statusCode).toBe(200);
      const json = JSON.parse(submitRes.body);

      // Server MUST calculate 0 points (0 correct) regardless of malicious client payload
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(0);
      expect(json.correctAnswers).toBe(0);
      expect(json.bandScore).toBe(0);
    });

    it("1.3. Normalization Rules: Case, Whitespace, and Alternative Answers are evaluated accurately", async () => {
      // Start another attempt for Student 2
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${student2Token}` },
        payload: { examId: objectiveExamId },
      });
      const sub2Id = JSON.parse(startRes.body).id;

      // Student 2 submits with messy formatting: lowercase, extra whitespace
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub2Id}/submit`,
        headers: { authorization: `Bearer ${student2Token}` },
        payload: {
          answers: [
            { questionId: q1Id, answerText: "   canberra   " }, // Correct with trimming & case-insensitivity
            { questionId: q2Id, answerText: ["wind", "SOLAR"] }, // Correct in different order & casing
            { questionId: q3Id, answerText: ["9:00 am", "room 101"] }, // Correct fill blank
          ],
        },
      });

      expect(submitRes.statusCode).toBe(200);
      const json = JSON.parse(submitRes.body);

      // 100% correct answers (1 + 2 + 2 = 5 points)
      expect(json.status).toBe("GRADED");
      expect(json.correctAnswers).toBe(5);
      expect(json.totalScore).toBe(5);
    });
  });

  // =========================================================================
  // 2. SUBMISSION STATE MACHINE & IMMUTABILITY INVARIANTS
  // =========================================================================
  describe("2. Submission State Machine & Immutability Invariants", () => {
    it("2.1. GRADED submission is IMMUTABLE: Delayed autosave (PUT) is rejected with 409 Conflict", async () => {
      const putRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${activeSubId}`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { answers: [{ questionId: q1Id, answerText: "Canberra" }] },
      });

      expect(putRes.statusCode).toBe(409);
      const json = JSON.parse(putRes.body);
      expect(json.error).toMatch(/SUBMISSION_ALREADY_FINALIZED|StateTransitionError/i);
    });

    it("2.2. Re-submit of GRADED submission is idempotent (returns existing score without modification)", async () => {
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/submit`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {
          answers: [{ questionId: q1Id, answerText: "Canberra" }],
        },
      });

      expect(submitRes.statusCode).toBe(200);
      const json = JSON.parse(submitRes.body);
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(0); // Kept original score
    });

    it("2.3. Manual Exam State Flow: IN_PROGRESS -> SUBMITTED (pending teacher grade)", async () => {
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { examId: manualExamId },
      });
      manualSubId = JSON.parse(startRes.body).id;

      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${manualSubId}/submit`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: {
          answers: [{ questionId: qEssayId, answerText: "This is a detailed IELTS essay..." }],
        },
      });

      expect(submitRes.statusCode).toBe(200);
      const json = JSON.parse(submitRes.body);
      // Because it contains essay, target status is SUBMITTED
      expect(json.status).toBe("SUBMITTED");
      expect(json.gradedAt).toBeNull();
    });
  });

  // =========================================================================
  // 3. AUTHORIZED REGRADING & AUDIT TRAIL ENGINE
  // =========================================================================
  describe("3. Authorized Regrading & Audit Trail Engine", () => {
    it("3.1. 🔒 Unauthorized Regrade: Student CANNOT call regrade endpoint (Returns 403)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/regrade`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { reason: "I want a higher score" },
      });

      expect(res.statusCode).toBe(403);
    });

    it("3.2. 🔒 Scope Isolation: Teacher B (not managing Class A) CANNOT regrade Student 1 (Returns 403)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/regrade`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { reason: "Teacher B attempting unauthorized grade adjustment" },
      });

      expect(res.statusCode).toBe(403);
      const json = JSON.parse(res.body);
      expect(json.error).toMatch(/Học viên không thuộc lớp/i);
    });

    it("3.3. Missing Reason: Regrade without reason is rejected with 400 Bad Request", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/regrade`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { reason: " " },
      });

      expect(res.statusCode).toBe(400);
    });

    it("3.4. ✅ Authorized Regrade (Teacher A): Successfully updates score & writes Audit Outbox Event", async () => {
      // Find the answer ID for q1 in activeSubId
      const answerRecord = mockPrisma.answers.find(
        (a) => a.submissionId === activeSubId && a.questionId === q1Id
      );
      expect(answerRecord).toBeDefined();

      const regradeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/regrade`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          reason: "Phúc khảo: Chấp nhận đáp án thay thế của học viên cho câu hỏi 1",
          grades: [
            {
              answerId: answerRecord!.id,
              score: 1.0,
              feedback: "Đáp án được duyệt lại sau phúc khảo",
            },
          ],
        },
      });

      expect(regradeRes.statusCode).toBe(200);
      const json = JSON.parse(regradeRes.body);
      expect(json.totalScore).toBe(1.0);
      expect(json.previousScore).toBe(0.0);
      expect(json.regradeReason).toMatch(/Phúc khảo: Chấp nhận đáp án thay thế/);

      // Verify Audit Outbox record was created
      const auditLog = mockPrisma.auditOutboxList.find(
        (a) => a.eventType === "SUBMISSION_REGRADED" && a.submissionId === activeSubId && a.actorId === teacherAId
      );
      expect(auditLog).toBeDefined();
      expect(auditLog!.actorId).toBe(teacherAId);
      expect(auditLog!.actorRole).toBe("teacher");
    });

    it("3.5. ✅ Admin Regrade All: Admin can trigger full automated regrade on modified answer keys", async () => {
      const regradeAllRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${activeSubId}/regrade`,
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          reason: "Admin system-wide automated regrade against canonical engine",
          regradeAll: true,
        },
      });

      expect(regradeAllRes.statusCode).toBe(200);
      const json = JSON.parse(regradeAllRes.body);
      expect(json.status).toBe("GRADED");
    });
  });

  // =========================================================================
  // 4. IELTS BAND SCORE CALCULATOR UNIT VERIFICATION
  // =========================================================================
  describe("4. IELTS Band Score Calculator Verification", () => {
    it("4.1. Listening Band conversions match official standards", () => {
      expect(IeltsBandCalculator.calculateBandScore(40, "listening")).toBe(9.0);
      expect(IeltsBandCalculator.calculateBandScore(39, "listening")).toBe(9.0);
      expect(IeltsBandCalculator.calculateBandScore(37, "listening")).toBe(8.5);
      expect(IeltsBandCalculator.calculateBandScore(35, "listening")).toBe(8.0);
      expect(IeltsBandCalculator.calculateBandScore(30, "listening")).toBe(7.0);
      expect(IeltsBandCalculator.calculateBandScore(23, "listening")).toBe(6.0);
      expect(IeltsBandCalculator.calculateBandScore(16, "listening")).toBe(5.0);
      expect(IeltsBandCalculator.calculateBandScore(0, "listening")).toBe(0.0);
    });

    it("4.2. Reading Academic Band conversions match official standards", () => {
      expect(IeltsBandCalculator.calculateBandScore(40, "reading_academic")).toBe(9.0);
      expect(IeltsBandCalculator.calculateBandScore(37, "reading_academic")).toBe(8.5);
      expect(IeltsBandCalculator.calculateBandScore(30, "reading_academic")).toBe(7.0);
      expect(IeltsBandCalculator.calculateBandScore(23, "reading_academic")).toBe(6.0);
      expect(IeltsBandCalculator.calculateBandScore(15, "reading_academic")).toBe(5.0);
    });

    it("4.3. Text Normalizer handles unicode, punctuation, and multiple spaces", () => {
      expect(defaultTextNormalizer.normalizeText("  HeLLo,   WoRLD!  ")).toBe("hello, world");
      expect(defaultTextNormalizer.areEquivalent("colour", "color | colour")).toBe(true);
      expect(defaultTextNormalizer.areEquivalent("9:00 am", "9:00 AM")).toBe(true);
    });
  });
});
