import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../app.js";

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

describe("GATE G2.6: FORENSIC MANUAL REGRADING & HISTORICAL DATA IMMUTABILITY", () => {
  let app: FastifyInstance;

  let teacherToken: string;
  let studentToken: string;

  const teacherId = "teacher-2222-4222-8222-222222222222";
  const studentId = "student-3333-4333-8333-333333333333";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    teacherToken = app.jwt.sign({ id: teacherId, roles: ["teacher"], email: "teacher@test.com" });
    studentToken = app.jwt.sign({ id: studentId, roles: ["student"], email: "student@test.com" });
  });

  afterAll(async () => {
    await app.close();
  });

  describe("1. Teacher Manual Regrading & Holistic Total Score Recalculation", () => {
    it("Recalculates exam_submissions.total_score when teacher grades subjective writing/speaking", async () => {
      const examId = "exam-mixed-1";
      const submissionId = "sub-mixed-1";

      const qObjectiveId = "q-mcq-1";
      const qWritingId = "q-writing-1";
      const qSpeakingId = "q-speaking-1";

      const ansObjectiveId = "ans-obj-1";
      const ansWritingId = "ans-wri-1";
      const ansSpeakingId = "ans-spk-1";

      const classId = "class-test-1";

      // Seed database
      mockPrisma.users.push({
        id: teacherId,
        email: "teacher@test.com",
        fullName: "Teacher John",
      });

      mockPrisma.userRoles.push({
        id: "ur-teacher-1",
        userId: teacherId,
        role: "teacher",
      });

      mockPrisma.users.push({
        id: studentId,
        email: "student@test.com",
        fullName: "Student Jane",
      });

      mockPrisma.userRoles.push({
        id: "ur-student-1",
        userId: studentId,
        role: "student",
      });

      mockPrisma.classes.push({
        id: classId,
        teacherId: teacherId,
        name: "IELTS Advanced",
      });

      mockPrisma.classStudents.push({
        id: "cs-1",
        classId: classId,
        studentId: studentId,
      });

      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "SUBMITTED", // Awaiting teacher manual grading
        totalScore: 1.0, // Initial score from auto-graded objective part
        correctAnswers: 1,
        totalQuestions: 3,
        submittedAt: new Date("2026-08-15T10:00:00Z"),
        gradedBy: null,
        gradedAt: null,
      });

      mockPrisma.answers.push(
        {
          id: ansObjectiveId,
          submissionId,
          questionId: qObjectiveId,
          answerText: "Paris",
          score: 1.0,
          isCorrect: true,
          feedback: null,
        },
        {
          id: ansWritingId,
          submissionId,
          questionId: qWritingId,
          answerText: "In modern society, education plays a vital role...",
          score: null, // Unscored initial
          isCorrect: null,
          feedback: null,
        },
        {
          id: ansSpeakingId,
          submissionId,
          questionId: qSpeakingId,
          audioUrl: "/uploads/student_speaking.mp3",
          score: null, // Unscored initial
          isCorrect: null,
          feedback: null,
        },
      );

      // Teacher submits grades for Writing and Speaking
      const gradePayload = {
        grades: [
          {
            answerId: ansWritingId,
            score: 6.5,
            feedback: "Strong coherence and lexical resource, minor grammatical slips.",
          },
          {
            answerId: ansSpeakingId,
            score: 7.0,
            feedback: "Fluent pronunciation and natural intonation.",
          },
        ],
      };

      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/grade`,
        headers: {
          authorization: `Bearer ${teacherToken}`,
        },
        payload: gradePayload,
      });

      expect(res.statusCode).toBe(200);

      // Physical DB assertions: Individual answers updated
      const wriAnsInDb = mockPrisma.answers.find((a) => a.id === ansWritingId);
      expect(wriAnsInDb.score).toBe(6.5);
      expect(wriAnsInDb.feedback).toBe("Strong coherence and lexical resource, minor grammatical slips.");

      const spkAnsInDb = mockPrisma.answers.find((a) => a.id === ansSpeakingId);
      expect(spkAnsInDb.score).toBe(7.0);
      expect(spkAnsInDb.feedback).toBe("Fluent pronunciation and natural intonation.");

      // Physical DB assertions: exam_submissions authoritative recalculation
      const subInDb = mockPrisma.examSubmissions.find((s) => s.id === submissionId);
      expect(subInDb.status).toBe("GRADED");
      expect(subInDb.gradedBy).toBe(teacherId);
      expect(subInDb.gradedAt).toBeDefined();
      // Total score MUST be: 1.0 (Objective) + 6.5 (Writing) + 7.0 (Speaking) = 14.5
      expect(subInDb.totalScore).toBe(14.5);
    });
  });

  describe("2. Historical Data Immutability", () => {
    it("Historical completed submissions cannot be overwritten by client submit", async () => {
      const examId = "exam-hist-1";
      const submissionId = "sub-hist-1";

      const historicalDate = new Date("2026-01-01T08:00:00Z");

      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "GRADED",
        totalScore: 8.5,
        correctAnswers: 35,
        totalQuestions: 40,
        submittedAt: historicalDate,
      });

      // Attempt to re-submit
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: {
          authorization: `Bearer ${studentToken}`,
        },
        payload: {
          answers: [{ questionId: "q-1", answerText: "Hacked Answer" }],
        },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.body);

      // Score and status remain strictly identical to historical record
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(8.5);
      expect(json.correctAnswers).toBe(35);
      expect(json.totalQuestions).toBe(40);

      // DB state unchanged
      const subInDb = mockPrisma.examSubmissions.find((s) => s.id === submissionId);
      expect(subInDb.totalScore).toBe(8.5);
      expect(subInDb.submittedAt.toISOString()).toBe(historicalDate.toISOString());
    });
  });
});
