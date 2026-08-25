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
      { name: "prisma" }
    ),
  };
});

describe("🔁 P1-B: CANONICAL REVISION WORKFLOW & ATTEMPT ISOLATION TEST", () => {
  let app: FastifyInstance;

  const teacherId = "tch-p1-aaaa-2222-3333-444444444444";
  const studentId = "std-p1-1111-2222-3333-444444444444";
  const classId = "cls-p1-1111-2222-3333-444444444444";

  let teacherToken: string;
  let studentToken: string;

  const examId = "exm-p1-essay-1";
  const questionId = "q-p1-essay-1";
  let attempt1SubId: string;
  let attempt1AnswerId: string;
  let attempt2SubId: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    teacherToken = app.jwt.sign({ id: teacherId, email: "teacher@p1.com", roles: ["teacher"] });
    studentToken = app.jwt.sign({ id: studentId, email: "student@p1.com", roles: ["student"] });

    // Seed mock users
    mockPrisma.users.push(
      { id: teacherId, email: "teacher@p1.com", fullName: "Teacher P1", roles: ["teacher"] },
      { id: studentId, email: "student@p1.com", fullName: "Student P1", roles: ["student"] }
    );

    mockPrisma.classes.push({
      id: classId,
      name: "IELTS Master Class",
      teacherId,
      isActive: true,
    });

    mockPrisma.classStudents.push({
      id: "cs-p1-1",
      classId,
      studentId,
      deletedAt: null,
    });

    mockPrisma.exams.push({
      id: examId,
      title: "IELTS Writing Task 2 - Technology",
      isOpen: true,
      durationMinutes: 60,
      sections: [
        {
          id: "sec-p1-1",
          examId,
          title: "Writing Section",
          sectionType: "writing",
          questionGroups: [
            {
              id: "grp-p1-1",
              title: "Task 2 Prompt",
              questions: [
                {
                  id: questionId,
                  questionType: "essay",
                  questionText: "Some people believe that technology causes more problems than it solves. Discuss both views.",
                  points: 9.0,
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

  it("Step 1: Student starts Attempt 1, writes initial draft, and submits", async () => {
    const startRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: { examId },
    });

    expect(startRes.statusCode).toBe(201);
    const startData = JSON.parse(startRes.payload);
    attempt1SubId = startData.id;
    expect(attempt1SubId).toBeDefined();

    // Student submits essay
    const submitRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt1SubId}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId,
            answerText: "Technology has many benefits but also some drawbacks in modern education.",
          },
        ],
      },
    });

    if (submitRes.statusCode !== 200) {
      console.error("SUBMIT ERROR PAYLOAD:", submitRes.payload);
    }
    expect(submitRes.statusCode).toBe(200);
    const submitData = JSON.parse(submitRes.payload);
    expect(submitData.status).toBe("SUBMITTED");

    // Retrieve answer ID
    const subDetailRes = await app.inject({
      method: "GET",
      url: `/api/v1/submissions/${attempt1SubId}`,
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const subDetail = JSON.parse(subDetailRes.payload);
    expect(subDetail.answers.length).toBe(1);
    attempt1AnswerId = subDetail.answers[0].id;
  });

  it("Step 2: Teacher reviews Attempt 1, assigns Band 5.5, marks revisionRequired=true and category=STRUCTURE", async () => {
    const gradeRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt1SubId}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 5.5,
        grades: [
          {
            answerId: attempt1AnswerId,
            score: 5.5,
            feedback: "Cần bổ sung luận điểm đối lập và cải thiện Cohesion & Coherence ở thân bài 2.",
          },
        ],
        feedback: "Cần bổ sung luận điểm đối lập và cải thiện Cohesion & Coherence ở thân bài 2.",
        primaryErrorCategory: "STRUCTURE",
        revisionRequired: true,
      },
    });

    expect(gradeRes.statusCode).toBe(200);
    const gradeData = JSON.parse(gradeRes.payload);
    expect(gradeData.status).toBe("GRADED");
    expect(Number(gradeData.totalScore)).toBe(5.5);

    // Verify structured feedback was preserved in the answer
    const answerFeedback = gradeData.answers[0].feedback;
    expect(answerFeedback).toContain("STRUCTURE");
    expect(answerFeedback).toContain("revisionRequired");
  });

  it("Step 3: Student calls POST /api/v1/submissions/revision -> Attempt 2 is created while Attempt 1 is 100% frozen", async () => {
    const revRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions/revision",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        examId,
        clonePreviousAnswers: true,
      },
    });

    expect(revRes.statusCode).toBe(201);
    const revData = JSON.parse(revRes.payload);
    attempt2SubId = revData.id;
    expect(attempt2SubId).toBeDefined();
    expect(attempt2SubId).not.toBe(attempt1SubId);
    expect(revData.status).toBe("IN_PROGRESS");

    // Invariant Check: Verify Attempt 1 remains GRADED with score 5.5 in mockPrisma
    const prevSub = mockPrisma.examSubmissions.find((s: any) => s.id === attempt1SubId);
    expect(prevSub.status).toBe("GRADED");
    expect(Number(prevSub.totalScore)).toBe(5.5);

    // Verify answers isolation: Attempt 1 answer is distinct from Attempt 2 answer
    const prevAnswer = mockPrisma.answers.find((a: any) => a.submissionId === attempt1SubId);
    expect(prevAnswer).toBeDefined();
    expect(prevAnswer.score).toBe(5.5);
  });

  it("Step 4 [Idempotency Guard]: Double-clicking start revision returns the same active session", async () => {
    const doubleClickRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions/revision",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        examId,
      },
    });

    expect(doubleClickRes.statusCode).toBe(200); // 200 instead of 201
    const doubleClickData = JSON.parse(doubleClickRes.payload);
    expect(doubleClickData.id).toBe(attempt2SubId); // Same session ID
  });

  it("Step 5: Student submits revised essay (Attempt 2) with improved body paragraphs", async () => {
    const submitRevRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt2SubId}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId,
            answerText: "Technology undeniably transforms education by enhancing accessibility; however, over-reliance on digital tools presents significant pedagogical challenges.",
          },
        ],
      },
    });

    expect(submitRevRes.statusCode).toBe(200);
    const submitRevData = JSON.parse(submitRevRes.payload);
    expect(submitRevData.status).toBe("SUBMITTED");
  });

  it("Step 6: Teacher reviews Attempt 2, approves revision with Band 7.0, and marks revisionRequired=false", async () => {
    // Get attempt 2 answer ID
    const sub2DetailRes = await app.inject({
      method: "GET",
      url: `/api/v1/submissions/${attempt2SubId}`,
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const sub2Detail = JSON.parse(sub2DetailRes.payload);
    const attempt2AnswerId = sub2Detail.answers[0].id;

    const grade2Res = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt2SubId}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 7.0,
        grades: [
          {
            answerId: attempt2AnswerId,
            score: 7.0,
            feedback: "Cấu trúc bài viết đã hoàn thiện rất tốt. Luận điểm rõ ràng và Cohesion tự nhiên.",
          },
        ],
        feedback: "Cấu trúc bài viết đã hoàn thiện rất tốt. Luận điểm rõ ràng và Cohesion tự nhiên.",
        primaryErrorCategory: null,
        revisionRequired: false,
      },
    });

    expect(grade2Res.statusCode).toBe(200);
    const grade2Data = JSON.parse(grade2Res.payload);
    expect(grade2Data.status).toBe("GRADED");
    expect(Number(grade2Data.totalScore)).toBe(7.0);

    // Final Invariant Check: Both attempts exist concurrently in DB with complete history
    const allSubs = mockPrisma.examSubmissions.filter((s: any) => s.examId === examId && s.studentId === studentId);
    expect(allSubs.length).toBe(2);

    const sub1InDb = allSubs.find((s: any) => s.id === attempt1SubId);
    const sub2InDb = allSubs.find((s: any) => s.id === attempt2SubId);

    expect(sub1InDb.status).toBe("GRADED");
    expect(Number(sub1InDb.totalScore)).toBe(5.5);

    expect(sub2InDb.status).toBe("GRADED");
    expect(Number(sub2InDb.totalScore)).toBe(7.0);
  });

  describe("🔒 P1-D: SECURITY, IDOR, IDEMPOTENCY & INVALID TRANSITIONS SUITE", () => {
    const studentBId = "std-p1-bbbb-2222-3333-444444444444";
    const teacherBId = "tch-p1-bbbb-2222-3333-444444444444"; // Teacher not assigned to class
    let studentBToken: string;
    let teacherBToken: string;

    beforeAll(() => {
      studentBToken = app.jwt.sign({ id: studentBId, email: "studentB@p1.com", roles: ["student"] });
      teacherBToken = app.jwt.sign({ id: teacherBId, email: "teacherB@p1.com", roles: ["teacher"] });

      mockPrisma.users.push(
        { id: studentBId, email: "studentB@p1.com", fullName: "Student B", roles: ["student"] },
        { id: teacherBId, email: "teacherB@p1.com", fullName: "Teacher B", roles: ["teacher"] }
      );
    });

    it("Gate 1 [IDOR Defense]: Student B cannot read Student A's submission", async () => {
      const getRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${attempt1SubId}`,
        headers: { authorization: `Bearer ${studentBToken}` },
      });

      // Must be 403 Forbidden
      expect(getRes.statusCode).toBe(403);
    });

    it("Gate 2 [IDOR Defense]: Student B cannot submit answers to Student A's submission", async () => {
      const hijackRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${attempt2SubId}/submit`,
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: {
          answers: [{ questionId, answerText: "Hijacked content" }],
        },
      });

      expect(hijackRes.statusCode).toBe(403);
    });

    it("Gate 3 [IDOR Defense]: Teacher B (not in class) cannot grade Student A's submission", async () => {
      const unauthGradeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${attempt1SubId}/grade`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: {
          totalScore: 9.0,
          grades: [{ answerId: attempt1AnswerId, score: 9.0 }],
        },
      });

      expect(unauthGradeRes.statusCode).toBe(403);
    });

    it("Gate 4 [Invalid Transition Defense]: Cannot edit or resubmit an already GRADED attempt", async () => {
      const mutateGradedRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${attempt1SubId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [{ questionId, answerText: "Attempting to change finalized submission" }],
        },
      });

      expect([400, 403, 409]).toContain(mutateGradedRes.statusCode);
    });

    it("Gate 5 [Invalid Transition Defense]: Cannot start Revision when teacher did NOT require revision (revisionRequired=false)", async () => {
      // Attempt 2 was graded with revisionRequired=false
      const unneededRevRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions/revision",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          examId,
        },
      });

      expect(unneededRevRes.statusCode).toBe(400);
      const errData = JSON.parse(unneededRevRes.payload);
      expect(errData.error).toMatch(/không có yêu cầu|đã đạt yêu cầu/i);
    });

    it("Gate 6 [Idempotency Guard]: Concurrent / Repeated Submissions with Idempotency Key return cached 200 without side effects", async () => {
      // Start a fresh submission for Student B
      mockPrisma.classStudents.push({
        id: "cs-p1-student-b",
        classId,
        studentId: studentBId,
        deletedAt: null,
      });

      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: { examId },
      });
      expect(startRes.statusCode).toBe(201);
      const subBId = JSON.parse(startRes.payload).id;

      const idemKey = "idem-p1-test-key-999";
      const submitPayload = {
        answers: [{ questionId, answerText: "Student B essay content" }],
        idempotencyKey: idemKey,
      };

      // Call 1
      const res1 = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subBId}/submit`,
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: submitPayload,
      });
      expect(res1.statusCode).toBe(200);

      // Call 2 (Immediate Retry / Double Click)
      const res2 = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subBId}/submit`,
        headers: { authorization: `Bearer ${studentBToken}` },
        payload: submitPayload,
      });
      expect(res2.statusCode).toBe(200);

      // Invariant: Submissions count for Student B remains exactly 1
      const studentBSubs = mockPrisma.examSubmissions.filter((s: any) => s.studentId === studentBId && s.examId === examId);
      expect(studentBSubs.length).toBe(1);
      expect(studentBSubs[0].status).toBe("SUBMITTED");
    });
  });
});
