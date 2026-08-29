import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { readFileSync } from "fs";
import { join } from "path";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../app.js";
import { canonicalScoringService } from "../services/scoring/CanonicalScoringService.js";
import { getEvaluatorForType } from "../services/scoring/evaluators/index.js";
import { defaultTextNormalizer } from "../services/scoring/TextNormalizer.js";

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

const fixturesPath = join(__dirname, "fixtures", "golden_scoring_fixtures.json");
const goldenFixtures: any[] = JSON.parse(readFileSync(fixturesPath, "utf-8"));

describe("GATE G1: BEHAVIOR & CONTRACT BASELINE VERIFICATION", () => {
  let app: FastifyInstance;
  let studentToken: string;
  let teacherToken: string;
  let adminToken: string;

  const studentId = "std-g1-1111-2222-3333-444444444444";
  const teacherId = "tch-g1-5555-6666-7777-888888888888";
  const adminId = "adm-g1-9999-8888-7777-666666666666";
  const courseId = "crs-g1-0000-1111-2222-333333333333";
  const examId = "exm-g1-4444-5555-6666-777777777777";
  const classId = "cls-g1-8888-9999-0000-111111111111";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    studentToken = app.jwt.sign({ id: studentId, roles: ["student"], email: "student.g1@test.com" });
    teacherToken = app.jwt.sign({ id: teacherId, roles: ["teacher"], email: "teacher.g1@test.com" });
    adminToken = app.jwt.sign({ id: adminId, roles: ["admin"], email: "admin.g1@test.com" });
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // Reset database mocks
    mockPrisma.users.length = 0;
    mockPrisma.userRoles.length = 0;
    mockPrisma.courses.length = 0;
    mockPrisma.classes.length = 0;
    mockPrisma.classStudents.length = 0;
    mockPrisma.classSessions.length = 0;
    mockPrisma.classAttendances.length = 0;
    mockPrisma.exams.length = 0;
    mockPrisma.examSubmissions.length = 0;
    mockPrisma.answers.length = 0;
    mockPrisma.classExamAssignments.length = 0;
    mockPrisma.enrollments.length = 0;
    mockPrisma.idempotencyRecords.length = 0;

    // Seed test users
    mockPrisma.users.push(
      { id: studentId, email: "student.g1@test.com", fullName: "G1 Student" },
      { id: teacherId, email: "teacher.g1@test.com", fullName: "G1 Teacher" },
      { id: adminId, email: "admin.g1@test.com", fullName: "G1 Admin" },
    );

    mockPrisma.userRoles.push(
      { userId: studentId, role: "student" },
      { userId: teacherId, role: "teacher" },
      { userId: adminId, role: "admin" },
    );

    // Seed course and exam
    mockPrisma.courses.push({
      id: courseId,
      title: "IELTS Master Preparation",
      isPublished: true,
      isActive: true,
    });

    // Seed student enrollment (Required for start submission)
    mockPrisma.enrollments.push({
      id: "enr-g1-1",
      courseId,
      studentId,
      progressPercent: 0,
    });

    // Seed Class & ClassStudents for Teacher Scope
    mockPrisma.classes.push({
      id: classId,
      name: "IELTS Band 7.0 Batch A",
      teacherId,
      courseId,
      isActive: true,
    });

    mockPrisma.classStudents.push({
      classId,
      studentId,
      status: "active",
    });

    mockPrisma.exams.push({
      id: examId,
      courseId,
      title: "IELTS Baseline Mock Exam",
      durationMinutes: 60,
      isPublished: true,
      isActive: true,
      sections: [
        {
          id: "sec-1",
          title: "Section 1 - Objective",
          questionGroups: [
            {
              id: "grp-1",
              questions: [
                {
                  id: "q-mcq-1",
                  questionType: "multiple_choice",
                  questionText: "Capital of Vietnam?",
                  options: ["Hanoi", "Saigon", "Danang"],
                  correctAnswer: "Hanoi",
                  points: 1,
                },
                {
                  id: "q-fill-1",
                  questionType: "fill_blank",
                  questionText: "The sky is [blank_0] and grass is [blank_1]",
                  correctAnswer: "{\"0\": \"blue\", \"1\": \"green\"}",
                  points: 2,
                },
              ],
            },
          ],
        },
        {
          id: "sec-2",
          title: "Section 2 - Manual",
          questionGroups: [
            {
              id: "grp-2",
              questions: [
                {
                  id: "q-essay-1",
                  questionType: "essay",
                  questionText: "Discuss advantages and disadvantages of AI.",
                  correctAnswer: null,
                  points: 9,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  // =========================================================================
  // 1. DETERMINISTIC TEST VECTORS (CANONICAL SCORING ENGINE)
  // =========================================================================
  describe("1. DETERMINISTIC TEST VECTORS (Objective Scoring Rules)", () => {
    it("Evaluates all 25+ golden fixtures with 100% precision", () => {
      expect(goldenFixtures.length).toBeGreaterThanOrEqual(25);

      for (const fix of goldenFixtures) {
        const evaluator = getEvaluatorForType(fix.question.questionType);
        const res = evaluator.evaluate(fix.question, fix.studentAnswer, defaultTextNormalizer);

        expect(res.score).toBe(fix.expected.score);
        expect(res.maxScore).toBe(fix.expected.maxScore);
        expect(res.correctCount).toBe(fix.expected.correctCount);
        expect(res.itemCount).toBe(fix.expected.itemCount);
        expect(res.isCorrect).toBe(fix.expected.isCorrect);
      }
    });

    it("Applies normalization correctly: trimming, capitalization, and punctuation removal", () => {
      expect(defaultTextNormalizer.normalizeText("   PARIS.  ")).toBe("paris");
      expect(defaultTextNormalizer.normalizeText("true/false")).toBe("true/false");
      expect(defaultTextNormalizer.normalizeText("apple, orange")).toBe("apple, orange");
    });
  });

  // =========================================================================
  // 2. WORKFLOW TEST VECTORS: CRITICAL USER JOURNEYS (CUJ)
  // =========================================================================
  describe("2. WORKFLOW TEST VECTORS: CRITICAL USER JOURNEYS", () => {
    // CUJ 01: Exam Submission Flow (Start -> Autosave -> Submit -> Server Evaluates)
    it("CUJ 01: Student starts attempt -> autosaves answers -> submits -> receives server evaluation", async () => {
      // Step 1: Start Exam
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId },
      });
      expect(startRes.statusCode).toBe(201);
      const subData = JSON.parse(startRes.body);
      expect(subData.status.toLowerCase()).toBe("in_progress");
      const submissionId = subData.id;

      // Step 2: Autosave Draft
      const saveRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [
            { questionId: "q-mcq-1", answerText: "Hanoi" },
            { questionId: "q-fill-1", answerText: { "0": "blue", "1": "green" } },
          ],
        },
      });
      expect(saveRes.statusCode).toBe(200);

      // Step 3: Final Submit with Idempotency Key
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: {
          authorization: `Bearer ${studentToken}`,
          "x-idempotency-key": "idem-key-cuj-01",
        },
        payload: {
          idempotencyKey: "idem-key-cuj-01",
          answers: [
            { questionId: "q-mcq-1", answerText: "Hanoi" },
            { questionId: "q-fill-1", answerText: { "0": "blue", "1": "green" } },
            { questionId: "q-essay-1", answerText: "AI brings high productivity..." },
          ],
        },
      });
      expect(submitRes.statusCode).toBe(200);
      const submitResult = JSON.parse(submitRes.body);

      // Verify that score is computed by SERVER (not client)
      // Contains manual essay -> status: submitted (pending teacher review)
      expect(submitResult.status.toLowerCase()).toBe("submitted");
      expect(submitResult.totalScore).toBe(3); // 1 + 2 = 3 points
    });

    // CUJ 02: Teacher Grading Flow (Review Essay -> Assign Criteria Score -> Finalize)
    it("CUJ 02: Teacher grades manual submission -> assigns score -> state transitions to GRADED", async () => {
      // Prepare existing submitted exam with essay
      const subId = "sub-manual-grade-01";
      mockPrisma.examSubmissions.push({
        id: subId,
        examId,
        studentId,
        status: "submitted",
        totalScore: 3,
        createdAt: new Date(),
      });
      mockPrisma.answers.push(
        { id: "ans-1", submissionId: subId, questionId: "q-mcq-1", answerText: "Hanoi", score: 1 },
        { id: "ans-2", submissionId: subId, questionId: "q-fill-1", answerText: "{\"0\": \"blue\", \"1\": \"green\"}", score: 2 },
        { id: "ans-3", submissionId: subId, questionId: "q-essay-1", answerText: "AI essay text...", score: 0 },
      );

      const gradeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [
            { answerId: "ans-3", score: 7.5, feedback: "Good coherence and lexical resource." },
          ],
          totalScore: 10.5,
        },
      });
      expect(gradeRes.statusCode).toBe(200);

      const updatedSub = mockPrisma.examSubmissions.find((s) => s.id === subId);
      expect(updatedSub.status).toBe("GRADED");
      expect(updatedSub.totalScore).toBe(10.5);
    });

    // CUJ 03: Class Management & Attendance Matrix
    it("CUJ 03: Teacher updates class workspace and views details", async () => {
      const classRes = await app.inject({
        method: "PUT",
        url: `/api/v1/classes/${classId}`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          name: "IELTS Band 7.0 Batch A - Updated",
        },
      });
      expect(classRes.statusCode).toBe(200);
      const updatedClass = JSON.parse(classRes.body);
      expect(updatedClass.name).toBe("IELTS Band 7.0 Batch A - Updated");
    });

    // CUJ 04: Security Guard - Student cannot grade or alter scores
    it("CUJ 04: Security Guard blocks student from executing teacher grade endpoint", async () => {
      const hackRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/some-sub-id/grade`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          grades: [{ answerId: "ans-1", score: 10 }],
        },
      });
      expect(hackRes.statusCode).toBe(403);
    });
  });
});
