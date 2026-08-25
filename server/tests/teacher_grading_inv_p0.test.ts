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

describe("🎯 TEACHER GRADING P0 INVARIANTS (INV-1 to INV-4) & LEARNING LOOP TEST", () => {
  let app: FastifyInstance;

  const teacherId = "tch-p0-inv-1111-2222-3333-444444444444";
  const studentId = "std-p0-inv-1111-2222-3333-444444444444";
  const classId = "cls-p0-inv-1111-2222-3333-444444444444";

  let teacherToken: string;
  let studentToken: string;

  const examId = "exm-p0-writing-task2";
  const questionId = "q-p0-writing-task2";
  let submissionId: string;
  let answerId: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    teacherToken = app.jwt.sign({ id: teacherId, email: "teacher@p0.com", roles: ["teacher"] });
    studentToken = app.jwt.sign({ id: studentId, email: "student@p0.com", roles: ["student"] });

    // Seed mock data
    mockPrisma.users.push(
      { id: teacherId, email: "teacher@p0.com", fullName: "Teacher P0", roles: ["teacher"] },
      { id: studentId, email: "student@p0.com", fullName: "Student P0", roles: ["student"] }
    );

    mockPrisma.classes.push({
      id: classId,
      name: "IELTS Intensive Writing",
      teacherId,
      isActive: true,
    });

    mockPrisma.classStudents.push({
      id: "cs-p0-1",
      classId,
      studentId,
      deletedAt: null,
    });

    mockPrisma.exams.push({
      id: examId,
      title: "Writing Task 2: Education Essay",
      durationMinutes: 40,
      isPublished: true,
      isActive: true,
      isOpen: true,
      sections: [
        {
          id: "sec-p0-1",
          examId,
          title: "Writing Section",
          sectionType: "writing",
          questionGroups: [
            {
              id: "grp-p0-1",
              title: "Task 2 Prompt",
              questions: [
                {
                  id: questionId,
                  questionType: "essay",
                  questionText: "Some people believe that university education should be free for everyone. To what extent do you agree or disagree?",
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
    if (app) await app.close();
  });

  it("Step 1: Student starts attempt, autosaves draft and submits writing homework", async () => {
    // 1. Start attempt
    const startRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: { examId },
    });
    expect(startRes.statusCode).toBe(201);
    const startData = JSON.parse(startRes.payload);
    submissionId = startData.id;

    // 2. Submit essay
    const studentEssay = "In modern society, higher education plays a pivotal role in personal and economic development...";
    const submitRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${submissionId}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId,
            answerText: studentEssay,
          },
        ],
        idempotencyKey: "p0-inv-sub-1",
      },
    });

    expect(submitRes.statusCode).toBe(200);
    const submitData = JSON.parse(submitRes.payload);
    expect(submitData.status).toBe("SUBMITTED");
    expect(submitData.answers.length).toBe(1);
    answerId = submitData.answers[0].id;
    expect(answerId).toBeDefined();
    expect(answerId).not.toBe(submissionId); // Invariant INV-1 check: answerId is distinct from submissionId
  });

  it("Step 2: INV-1 & INV-2 [Teacher Workspace Projection]: listSubmissions returns answers with answerText & correct answer.id", async () => {
    const listRes = await app.inject({
      method: "GET",
      url: `/api/v1/submissions?classId=${classId}`,
      headers: { authorization: `Bearer ${teacherToken}` },
    });

    expect(listRes.statusCode).toBe(200);
    const listData = JSON.parse(listRes.payload);
    expect(listData.data.length).toBeGreaterThan(0);

    const sub = listData.data.find((s: any) => s.id === submissionId);
    expect(sub).toBeDefined();
    expect(sub.answers).toBeDefined();
    expect(sub.answers.length).toBe(1);

    // INV-1: Answer Identity
    expect(sub.answers[0].id).toBe(answerId);
    expect(sub.answers[0].id).not.toBe(sub.id);

    // INV-2: Work Visibility
    expect(sub.answers[0].answerText).toContain("higher education plays a pivotal role");
    expect(sub.answers[0].questionId).toBe(questionId);
  });

  it("Step 3: INV-3 & INV-4 [Teacher Grading]: Teacher grades 4 IELTS criteria (TR 6.5, CC 6.0, LR 7.0, GR 6.5) -> persists structured feedback", async () => {
    const gradeRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${submissionId}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 6.5,
        grades: [
          {
            answerId,
            score: 6.5,
            feedback: "Well-structured essay with strong vocabulary.",
          },
        ],
        feedback: "Well-structured essay with strong vocabulary. Needs improvement in cohesive devices.",
        primaryErrorCategory: "STRUCTURE",
        revisionRequired: true,
        criteriaScores: {
          taskResponse: 6.5,
          coherence: 6.0,
          lexical: 7.0,
          grammar: 6.5,
        },
      },
    });

    expect(gradeRes.statusCode).toBe(200);
    const gradeData = JSON.parse(gradeRes.payload);
    expect(gradeData.status).toBe("GRADED");
    expect(Number(gradeData.totalScore)).toBe(6.5);

    // Verify DB Answer record
    const ansInDb = mockPrisma.answers.find((a: any) => a.id === answerId);
    expect(ansInDb).toBeDefined();
    expect(Number(ansInDb.score)).toBe(6.5);

    // INV-3: Four Criteria Persistence in JSON feedback
    const parsedFeedback = JSON.parse(ansInDb.feedback);
    expect(parsedFeedback.criteriaScores).toEqual({
      taskResponse: 6.5,
      coherence: 6.0,
      lexical: 7.0,
      grammar: 6.5,
    });
    expect(parsedFeedback.primaryErrorCategory).toBe("STRUCTURE");
    expect(parsedFeedback.revisionRequired).toBe(true);
  });

  it("Step 4: [Reload Persistence]: getById and listSubmissions return the persisted criteriaScores and revisionRequired", async () => {
    const getRes = await app.inject({
      method: "GET",
      url: `/api/v1/submissions/${submissionId}`,
      headers: { authorization: `Bearer ${teacherToken}` },
    });

    expect(getRes.statusCode).toBe(200);
    const getData = JSON.parse(getRes.payload);
    expect(getData.status).toBe("GRADED");

    const answer = getData.answers[0];
    const parsedAnsFeedback = JSON.parse(answer.feedback);
    expect(parsedAnsFeedback.criteriaScores.taskResponse).toBe(6.5);
    expect(parsedAnsFeedback.criteriaScores.coherence).toBe(6.0);
    expect(parsedAnsFeedback.criteriaScores.lexical).toBe(7.0);
    expect(parsedAnsFeedback.criteriaScores.grammar).toBe(6.5);
    expect(parsedAnsFeedback.revisionRequired).toBe(true);
  });

  it("Step 5: [Learning Loop]: Student initiates revision (Attempt 2) and previous answers are cloned", async () => {
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
    expect(revData.id).not.toBe(submissionId);
    expect(revData.status).toBe("IN_PROGRESS");
    expect(revData.answers.length).toBe(1);
    expect(revData.answers[0].answerText).toContain("higher education plays a pivotal role");
  });
});
