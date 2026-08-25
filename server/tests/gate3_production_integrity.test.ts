import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
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

describe("GATE 3: PRODUCTION INTEGRITY & OPERATIONAL HARDENING TEST SUITE", () => {
  let app: FastifyInstance;

  let studentToken: string;
  let teacherToken: string;

  const studentId = "std-1111-2222-3333-444444444444";
  const teacherId = "tch-5555-6666-7777-888888888888";
  const courseId = "crs-9999-0000-1111-222222222222";
  const examId = "exm-3333-4444-5555-666666666666";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    studentToken = app.jwt.sign({ id: studentId, roles: ["student"], email: "student@test.com" });
    teacherToken = app.jwt.sign({ id: teacherId, roles: ["teacher"], email: "teacher@test.com" });
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // Reset DB mock arrays
    mockPrisma.examSubmissions.length = 0;
    mockPrisma.answers.length = 0;
    mockPrisma.idempotencyRecords.length = 0;
    mockPrisma.auditOutboxList.length = 0;
    mockPrisma.exams.length = 0;
    mockPrisma.enrollments.length = 0;
    mockPrisma.users.length = 0;
    mockPrisma.userRoles.length = 0;
    mockPrisma.classes.length = 0;
    mockPrisma.classStudents.length = 0;

    // Seed test fixtures
    mockPrisma.users.push(
      { id: studentId, email: "student@test.com", fullName: "Student User" },
      { id: teacherId, email: "teacher@test.com", fullName: "Teacher User" },
    );

    mockPrisma.userRoles.push(
      { userId: studentId, role: "student" },
      { userId: teacherId, role: "teacher" },
    );

    mockPrisma.exams.push({
      id: examId,
      courseId,
      title: "IELTS Hardened Mock Exam",
      durationMinutes: 60,
      isPublished: true,
      isActive: true,
      sections: [
        {
          id: "sec-1",
          title: "Section 1",
          questionGroups: [
            {
              id: "grp-1",
              questions: [
                {
                  id: "q-1",
                  questionType: "multiple_choice",
                  questionText: "What is the capital of UK?",
                  options: ["London", "Paris"],
                  correctAnswer: "London",
                  points: 1,
                },
                {
                  id: "q-2",
                  questionType: "fill_blank",
                  questionText: "Fill in: [blank_0], [blank_1]",
                  correctAnswer: "{\"0\": \"apple\", \"1\": \"orange\"}",
                  points: 2,
                },
              ],
            },
          ],
        },
      ],
    });

    mockPrisma.enrollments.push({
      id: "enr-1",
      courseId,
      studentId,
      progressPercent: 0,
    });
  });

  // =========================================================================
  // GATE A: ATOMICITY & TRANSACTION INTEGRITY
  // =========================================================================
  describe("Gate A — Atomicity & Transaction Integrity", () => {
    it("A1. Single Prisma transaction atomically updates answers, scores, submission status, and audit outbox", async () => {
      const submissionId = "sub-atomic-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 1,
        startedAt: new Date(),
        createdAt: new Date(),
      });

      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          idempotencyKey: "idem-key-atomic-1",
          answers: [
            { questionId: "q-1", answerText: "London" },
            { questionId: "q-2", answerText: { "0": "apple", "1": "orange" } },
          ],
        },
      });

      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.body);

      // Verify returned state
      expect(json.status).toBe("GRADED");
      expect(json.totalScore).toBe(3); // 1 + 2 = 3
      expect(json.correctAnswers).toBe(3); // 1 single + 2 blanks = 3
      expect(json.totalQuestions).toBe(3);

      // Physical DB assertions: Single ACID commit
      const subInDb = mockPrisma.examSubmissions.find((s) => s.id === submissionId);
      expect(subInDb.status).toBe("GRADED");
      expect(subInDb.totalScore).toBe(3);
      expect(subInDb.version).toBe(2);

      // Verify Audit Outbox event persisted in same transaction
      expect(mockPrisma.auditOutboxList.length).toBe(1);
      expect(mockPrisma.auditOutboxList[0].eventType).toBe("SUBMISSION_FINALIZED");
      expect(mockPrisma.auditOutboxList[0].submissionId).toBe(submissionId);

      // Verify Idempotency record persisted in same transaction
      expect(mockPrisma.idempotencyRecords.length).toBe(1);
      expect(mockPrisma.idempotencyRecords[0].key).toBe("idem-key-atomic-1");
    });
  });

  // =========================================================================
  // GATE B: CONCURRENCY & IDEMPOTENCY
  // =========================================================================
  describe("Gate B — Concurrency & Database-backed Idempotency", () => {
    it("B1. 10 simultaneous submit requests with same idempotencyKey return identical cached result without race condition", async () => {
      const submissionId = "sub-concurrent-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 1,
        startedAt: new Date(),
        createdAt: new Date(),
      });

      const payload = {
        idempotencyKey: "idem-concurrent-10",
        answers: [
          { questionId: "q-1", answerText: "London" },
          { questionId: "q-2", answerText: { "0": "apple", "1": "orange" } },
        ],
      };

      // Fire 10 parallel submit requests
      const requests = Array.from({ length: 10 }).map(() =>
        app.inject({
          method: "POST",
          url: `/api/v1/submissions/${submissionId}/submit`,
          headers: { authorization: `Bearer ${studentToken}` },
          payload,
        }),
      );

      const responses = await Promise.all(requests);

      // 100% of responses must succeed with 200 OK
      for (const res of responses) {
        expect(res.statusCode).toBe(200);
        const json = JSON.parse(res.body);
        expect(json.status).toBe("GRADED");
        expect(json.totalScore).toBe(3);
        expect(json.correctAnswers).toBe(3);
      }

      // Exactly 1 audit record and 1 idempotency record created
      expect(mockPrisma.auditOutboxList.length).toBe(1);
      expect(mockPrisma.idempotencyRecords.length).toBe(1);
    });

    it("B2. Same idempotencyKey with different payload triggers 409 Conflict", async () => {
      const submissionId = "sub-conflict-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 1,
        startedAt: new Date(),
        createdAt: new Date(),
      });

      const idempotencyKey = "idem-key-conflict-test";

      // 1. First Submit Request
      const res1 = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          idempotencyKey,
          answers: [{ questionId: "q-1", answerText: "London" }],
        },
      });
      expect(res1.statusCode).toBe(200);

      // 2. Second Submit Request with SAME key but DIFFERENT payload
      const res2 = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          idempotencyKey,
          answers: [{ questionId: "q-1", answerText: "Paris" }], // Altered payload!
        },
      });

      expect(res2.statusCode).toBe(409);
      const json2 = JSON.parse(res2.body);
      expect(json2.error).toBe("IDEMPOTENCY_CONFLICT");
    });

    it("B3. Network lost response recovery: Retry with same idempotencyKey returns committed result without re-scoring", async () => {
      const submissionId = "sub-lost-response-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 1,
        startedAt: new Date(),
        createdAt: new Date(),
      });

      const idempotencyKey = "idem-lost-response-key";
      const payload = {
        idempotencyKey,
        answers: [{ questionId: "q-1", answerText: "London" }],
      };

      // 1. Initial submission (server commits)
      const res1 = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload,
      });
      expect(res1.statusCode).toBe(200);
      const initialJson = JSON.parse(res1.body);

      // 2. Client simulates retry after network timeout
      const resRetry = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload,
      });

      expect(resRetry.statusCode).toBe(200);
      const retryJson = JSON.parse(resRetry.body);
      expect(retryJson).toEqual(initialJson);
    });

    it("B4. Autosave arriving after finalization is rejected with 409 Conflict and cannot overwrite final state", async () => {
      const submissionId = "sub-race-autosave-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 1,
        startedAt: new Date(),
        createdAt: new Date(),
      });

      // 1. Final Submit executed
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          idempotencyKey: "idem-race-1",
          answers: [{ questionId: "q-1", answerText: "London" }],
        },
      });
      expect(submitRes.statusCode).toBe(200);

      // 2. Delayed autosave packet arrives late
      const autosaveRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          version: 1,
          answers: [{ questionId: "q-1", answerText: "Delayed Stale Answer" }],
        },
      });

      expect(autosaveRes.statusCode).toBe(409);
      const json = JSON.parse(autosaveRes.body);
      expect(json.error).toBe("SUBMISSION_ALREADY_FINALIZED");

      // Verify DB answer was NOT corrupted by delayed autosave
      const ansInDb = mockPrisma.answers.find((a) => a.questionId === "q-1");
      expect(ansInDb.answerText).toBe("London");
    });

    it("B5. Stale version autosave from a slow multi-tab is rejected with 409 Stale Version Conflict", async () => {
      const submissionId = "sub-multitab-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 5, // Server has version 5
        startedAt: new Date(),
        createdAt: new Date(),
      });

      // Slow tab sends version 3
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          version: 3, // Stale version!
          answers: [{ questionId: "q-1", answerText: "Old Tab Text" }],
        },
      });

      expect(res.statusCode).toBe(409);
      const json = JSON.parse(res.body);
      expect(json.error).toBe("STALE_VERSION_CONFLICT");
    });
  });

  // =========================================================================
  // GATE C: AUDITABILITY & SANITIZED SCHEMA
  // =========================================================================
  describe("Gate C — Auditability & Zero-Secret Audit Trail", () => {
    it("C1. Audit outbox contains sanitized state and 0 secret fields (no correctAnswer, no audioScript, no raw essays)", async () => {
      const submissionId = "sub-audit-verify-1";
      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "IN_PROGRESS",
        version: 1,
        startedAt: new Date(),
        createdAt: new Date(),
      });

      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          idempotencyKey: "idem-audit-1",
          answers: [{ questionId: "q-1", answerText: "London" }],
        },
      });

      expect(mockPrisma.auditOutboxList.length).toBe(1);
      const auditRecord = mockPrisma.auditOutboxList[0];

      expect(auditRecord.eventType).toBe("SUBMISSION_FINALIZED");
      expect(auditRecord.actorId).toBe(studentId);
      expect(auditRecord.submissionId).toBe(submissionId);
      expect(auditRecord.idempotencyKeyHash).toBeDefined();

      // Check serialized fields do NOT contain secret keys (correct_answer, audioScript, raw essay)
      const fullAuditDump = JSON.stringify(auditRecord);
      expect(fullAuditDump.includes('"correctAnswer":')).toBe(false);
      expect(fullAuditDump.includes('"correct_answer":')).toBe(false);
      expect(fullAuditDump.includes('"audioScript":')).toBe(false);
      expect(fullAuditDump.includes('"audio_script":')).toBe(false);
      expect(fullAuditDump.includes('"answerKey":')).toBe(false);
    });

    it("C2. Teacher manual regrade records TEACHER_REGRADED event with old and new total scores", async () => {
      const submissionId = "sub-teacher-audit-1";
      const classId = "class-audit-1";

      mockPrisma.classes.push({ id: classId, teacherId, name: "IELTS Class" });
      mockPrisma.classStudents.push({ id: "cs-1", classId, studentId });

      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "SUBMITTED",
        totalScore: 2.0,
        correctAnswers: 2,
        totalQuestions: 4,
        submittedAt: new Date(),
      });

      mockPrisma.answers.push({
        id: "ans-manual-1",
        submissionId,
        questionId: "q-writing-audit",
        score: null,
        feedback: null,
      });

      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [{ answerId: "ans-manual-1", score: 7.0, feedback: "Excellent writing" }],
        },
      });

      expect(res.statusCode).toBe(200);

      // Verify Audit Outbox event
      const gradeEvent = mockPrisma.auditOutboxList.find((e) => e.eventType === "TEACHER_REGRADED");
      expect(gradeEvent).toBeDefined();
      expect(gradeEvent.actorId).toBe(teacherId);

      const parsedOld = JSON.parse(gradeEvent.oldState);
      const parsedNew = JSON.parse(gradeEvent.newState);

      expect(parsedOld.totalScore).toBe(2.0);
      expect(parsedNew.totalScore).toBe(7.0);
      expect(parsedNew.status).toBe("GRADED");
    });
  });

  // =========================================================================
  // GATE D: RECOVERY & IMMUTABILITY
  // =========================================================================
  describe("Gate D — Recovery & State Immutability", () => {
    it("D1. Finalized submission status cannot be overwritten by client PUT or POST", async () => {
      const submissionId = "sub-immutable-1";
      const submittedDate = new Date("2026-05-01T10:00:00Z");

      mockPrisma.examSubmissions.push({
        id: submissionId,
        studentId,
        examId,
        status: "GRADED",
        totalScore: 9.0,
        correctAnswers: 40,
        totalQuestions: 40,
        submittedAt: submittedDate,
      });

      // 1. Attempt PUT autosave
      const putRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${submissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { answers: [{ questionId: "q-1", answerText: "Hacked" }] },
      });
      expect(putRes.statusCode).toBe(409);

      // 2. Attempt POST submit
      const postRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${submissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { answers: [{ questionId: "q-1", answerText: "Hacked" }] },
      });
      expect(postRes.statusCode).toBe(200);
      const json = JSON.parse(postRes.body);

      // Score strictly preserved
      expect(json.totalScore).toBe(9.0);
      expect(json.status).toBe("GRADED");

      const subInDb = mockPrisma.examSubmissions.find((s) => s.id === submissionId);
      expect(subInDb.totalScore).toBe(9.0);
      expect(subInDb.status).toBe("GRADED");
    });

    it("D2. Stale expired attempt with 0 answers is safely recovered and timer reset", async () => {
      const staleExamId = "exm-stale-empty";
      const pastStartedAt = new Date(Date.now() - 3600 * 1000 * 24); // 24 hours ago

      mockPrisma.exams.push({
        id: staleExamId,
        courseId,
        title: "Stale Empty Exam",
        isPublished: true,
        isActive: true,
        isOpen: true,
        durationMinutes: 60,
      });

      const staleSub = {
        id: "sub-stale-empty-1",
        studentId,
        examId: staleExamId,
        status: "IN_PROGRESS",
        startedAt: pastStartedAt,
      };
      mockPrisma.examSubmissions.push(staleSub);

      // 0 answers in DB for this submission
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: staleExamId },
      });

      expect(startRes.statusCode).toBe(200);
      const json = JSON.parse(startRes.body);
      expect(json.id).toBe("sub-stale-empty-1");
      expect(json.remainingSeconds).toBe(3600); // Reset full 60 minutes
    });

    it("D3. Stale expired attempt with existing answers is finalized as SUBMITTED and new attempt created", async () => {
      const staleExamId = "exm-stale-with-answers";
      const pastStartedAt = new Date(Date.now() - 3600 * 1000 * 24); // 24 hours ago

      mockPrisma.exams.push({
        id: staleExamId,
        courseId,
        title: "Stale With Answers Exam",
        isPublished: true,
        isActive: true,
        isOpen: true,
        durationMinutes: 60,
      });

      const staleSub = {
        id: "sub-stale-ans-1",
        studentId,
        examId: staleExamId,
        status: "IN_PROGRESS",
        startedAt: pastStartedAt,
      };
      mockPrisma.examSubmissions.push(staleSub);

      // Add existing answer to this submission
      mockPrisma.answers.push({
        id: "ans-stale-1",
        submissionId: "sub-stale-ans-1",
        questionId: "q-1",
        answerText: "Previous answer",
      });

      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: staleExamId },
      });

      expect(startRes.statusCode).toBe(201);
      const json = JSON.parse(startRes.body);
      expect(json.id).not.toBe("sub-stale-ans-1"); // New attempt created
      expect(json.status).toBe("IN_PROGRESS");

      // Old attempt was auto-finalized
      expect(staleSub.status).toBe("SUBMITTED");
    });
  });

  // =========================================================================
  // GATE E: DUAL-CHANNEL ENROLLMENT AUTHORIZATION
  // =========================================================================
  describe("Gate E — Dual-Channel Course & Class Membership Authorization", () => {
    it("E1. Student enrolled via ClassStudent (without direct Enrollment row) is authorized to start exam", async () => {
      const classId = "cls-alpha-1";
      const newExamId = "exm-dual-1";
      const newCourseId = "crs-dual-1";

      mockPrisma.exams.push({
        id: newExamId,
        courseId: newCourseId,
        title: "W1 - D1 - WRI Class Exam",
        isPublished: true,
        isActive: true,
        isOpen: false,
        durationMinutes: 60,
      });

      mockPrisma.classes.push({
        id: classId,
        courseId: newCourseId,
        name: "IELTS Class Alpha",
        isActive: true,
      });

      mockPrisma.classStudents.push({
        id: "cs-1",
        classId,
        studentId,
        deletedAt: null,
      });

      // Student has NO row in enrollments table
      const directEnrollment = mockPrisma.enrollments.find(
        (e) => e.courseId === newCourseId && e.studentId === studentId,
      );
      expect(directEnrollment).toBeUndefined();

      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: newExamId },
      });

      expect(startRes.statusCode).toBe(201);
      const json = JSON.parse(startRes.body);
      expect(json.examId).toBe(newExamId);
      expect(json.studentId).toBe(studentId);
      expect(json.status).toBe("IN_PROGRESS");
    });

    it("E2. Unenrolled student (neither in Course nor Class) is strictly rejected with 403", async () => {
      const foreignExamId = "exm-foreign-1";
      const foreignCourseId = "crs-foreign-1";

      mockPrisma.exams.push({
        id: foreignExamId,
        courseId: foreignCourseId,
        title: "Locked Exam",
        isPublished: true,
        isActive: true,
        isOpen: false,
        durationMinutes: 60,
      });

      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: foreignExamId },
      });

      expect(startRes.statusCode).toBe(403);
      const json = JSON.parse(startRes.body);
      expect(json.error).toContain("chưa đăng ký khóa học hoặc lớp học");
    });
  });
});
