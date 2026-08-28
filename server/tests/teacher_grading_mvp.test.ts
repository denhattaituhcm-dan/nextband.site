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

describe("🎯 MVP TEACHER GRADING WORKFLOW: WRITING (MULTI-TASK) & SPEAKING (MULTI-PART)", () => {
  let app: FastifyInstance;

  const teacherId = "tch-mvp-1111-2222-3333-444444444444";
  const studentId = "std-mvp-1111-2222-3333-444444444444";
  const otherStudentId = "std-mvp-9999-9999-9999-999999999999";
  const classId = "cls-mvp-1111-2222-3333-444444444444";

  let teacherToken: string;
  let studentToken: string;

  // Writing Exam: Multi-task (Task 1 + Task 2)
  const writingExamId = "exm-writing-multi-task";
  const writingQ1Id = "q-writing-task1";
  const writingQ2Id = "q-writing-task2";
  let writingSubmissionId: string;
  let writingAns1Id: string;
  let writingAns2Id: string;

  // Speaking Exam: Multi-part (Part 1 + Part 2 + Part 3)
  const speakingExamId = "exm-speaking-multi-part";
  const speakingQ1Id = "q-speaking-part1";
  const speakingQ2Id = "q-speaking-part2";
  const speakingQ3Id = "q-speaking-part3";
  let speakingSubmissionId: string;
  let speakingAns1Id: string;
  let speakingAns2Id: string;
  let speakingAns3Id: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    teacherToken = app.jwt.sign({ id: teacherId, email: "teacher@mvp.com", roles: ["teacher"] });
    studentToken = app.jwt.sign({ id: studentId, email: "student@mvp.com", roles: ["student"] });

    // Seed mock database
    mockPrisma.users.push(
      { id: teacherId, email: "teacher@mvp.com", fullName: "Teacher MVP", roles: ["teacher"] },
      { id: studentId, email: "student@mvp.com", fullName: "Student MVP", roles: ["student"] }
    );

    mockPrisma.classes.push({
      id: classId,
      name: "IELTS Masterclass",
      teacherId,
      isActive: true,
    });

    mockPrisma.classStudents.push({
      id: "cs-mvp-1",
      classId,
      studentId,
      deletedAt: null,
    });

    // Seed Writing Exam (Task 1 + Task 2)
    mockPrisma.exams.push({
      id: writingExamId,
      title: "IELTS Writing Mock Test (Task 1 + Task 2)",
      examType: "writing",
      durationMinutes: 60,
      isPublished: true,
      isActive: true,
      isOpen: true,
      sections: [
        {
          id: "sec-w-1",
          examId: writingExamId,
          title: "Writing Section",
          sectionType: "writing",
          questionGroups: [
            {
              id: "grp-w-task1",
              title: "Writing Task 1: Chart Description",
              questions: [
                {
                  id: writingQ1Id,
                  questionType: "essay",
                  questionText: "The chart below shows global energy consumption. Summarise the information.",
                  points: 9.0,
                },
              ],
            },
            {
              id: "grp-w-task2",
              title: "Writing Task 2: Opinion Essay",
              questions: [
                {
                  id: writingQ2Id,
                  questionType: "essay",
                  questionText: "Some people think that technology makes life easier, while others disagree.",
                  points: 9.0,
                },
              ],
            },
          ],
        },
      ],
    });

    // Seed Speaking Exam (Part 1, Part 2, Part 3)
    mockPrisma.exams.push({
      id: speakingExamId,
      title: "IELTS Speaking Full Test",
      examType: "speaking",
      durationMinutes: 15,
      isPublished: true,
      isActive: true,
      isOpen: true,
      sections: [
        {
          id: "sec-s-1",
          examId: speakingExamId,
          title: "Speaking Section",
          sectionType: "speaking",
          questionGroups: [
            {
              id: "grp-s-part1",
              title: "Part 1: Introduction & Interview",
              questions: [
                {
                  id: speakingQ1Id,
                  questionType: "speaking",
                  questionText: "Let's talk about your hometown.",
                  points: 9.0,
                },
              ],
            },
            {
              id: "grp-s-part2",
              title: "Part 2: Long Turn (Cue Card)",
              questions: [
                {
                  id: speakingQ2Id,
                  questionType: "speaking",
                  questionText: "Describe a memorable journey you made.",
                  points: 9.0,
                },
              ],
            },
            {
              id: "grp-s-part3",
              title: "Part 3: Two-way Discussion",
              questions: [
                {
                  id: speakingQ3Id,
                  questionType: "speaking",
                  questionText: "How has travel changed in your country over recent decades?",
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

  // =========================================================================
  // 1. WRITING MULTI-TASK GRADING FLOW
  // =========================================================================
  describe("1. Writing Multi-Task: Task 1 + Task 2 Draft & Finalize Lifecycle", () => {
    it("Student submits Task 1 & Task 2 essays", async () => {
      // Start attempt
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: writingExamId },
      });
      expect(startRes.statusCode).toBe(201);
      const startBody = JSON.parse(startRes.body);
      writingSubmissionId = startBody.id;

      // Submit Draft answers
      const draftRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${writingSubmissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [
            { questionId: writingQ1Id, answerText: "This is Task 1 chart report essay with 160 words..." },
            { questionId: writingQ2Id, answerText: "This is Task 2 opinion essay discussing technological impacts..." },
          ],
        },
      });
      expect(draftRes.statusCode).toBe(200);

      // Submit Exam
      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${writingSubmissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
      });
      expect(submitRes.statusCode).toBe(200);

      const subData = JSON.parse(submitRes.body);
      expect(subData.status).toBe("SUBMITTED");
      expect(subData.answers.length).toBe(2);

      const ans1 = subData.answers.find((a: any) => a.questionId === writingQ1Id);
      const ans2 = subData.answers.find((a: any) => a.questionId === writingQ2Id);
      writingAns1Id = ans1.id;
      writingAns2Id = ans2.id;
    });

    it("Teacher grades Task 1 -> Saves Draft (finalize: false) -> student cannot see draft scores", async () => {
      const draftSaveRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${writingSubmissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [
            {
              answerId: writingAns1Id,
              questionId: writingQ1Id,
              score: 6.5,
              criteriaScores: { taskResponse: 6.5, coherence: 7.0, lexical: 6.5, grammar: 6.0 },
              sentenceFeedbacks: [
                {
                  sentenceIndex: 0,
                  originalSentence: "This is Task 1 chart report essay with 160 words...",
                  category: "GRAMMAR",
                  tag: "Preposition / Article",
                  note: "Check article usage here",
                },
              ],
              feedback: "Good overview of the chart trends in Task 1.",
            },
          ],
          options: {
            finalize: false,
          },
        },
      });
      expect(draftSaveRes.statusCode).toBe(200);

      // Check teacher can see draft
      const teacherViewRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${writingSubmissionId}`,
        headers: { authorization: `Bearer ${teacherToken}` },
      });
      const teacherSub = JSON.parse(teacherViewRes.body);
      expect(teacherSub.status).toBe("SUBMITTED"); // Still submitted

      // Check student cannot see draft scores or draft feedback
      const studentViewRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${writingSubmissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
      });
      const studentSub = JSON.parse(studentViewRes.body);
      expect(studentSub.status).toBe("SUBMITTED");
      expect(studentSub.answers[0].score).toBeNull();
      expect(studentSub.answers[0].feedback).toBeNull();
    });

    it("Teacher grades Task 2 -> Saves Draft -> reload restores both Task 1 & Task 2 drafts", async () => {
      const draftSaveRes2 = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${writingSubmissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [
            {
              answerId: writingAns1Id,
              questionId: writingQ1Id,
              score: 6.5,
              criteriaScores: { taskResponse: 6.5, coherence: 7.0, lexical: 6.5, grammar: 6.0 },
              feedback: "Good overview of the chart trends in Task 1.",
            },
            {
              answerId: writingAns2Id,
              questionId: writingQ2Id,
              score: 7.0,
              criteriaScores: { taskResponse: 7.0, coherence: 7.0, lexical: 7.5, grammar: 6.5 },
              feedback: "Strong arguments in body paragraph 1.",
              revisionRequired: true,
              primaryErrorCategory: "STRUCTURE",
            },
          ],
          options: {
            finalize: false,
            revisionRequired: true,
            primaryErrorCategory: "STRUCTURE",
          },
        },
      });
      expect(draftSaveRes2.statusCode).toBe(200);

      // Reload
      const reloadRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${writingSubmissionId}`,
        headers: { authorization: `Bearer ${teacherToken}` },
      });
      const reloadSub = JSON.parse(reloadRes.body);
      const reAns1 = reloadSub.answers.find((a: any) => a.id === writingAns1Id);
      const reAns2 = reloadSub.answers.find((a: any) => a.id === writingAns2Id);

      expect(reAns1.feedback).toContain("Task 1");
      expect(reAns2.feedback).toContain("Strong arguments");
      expect(reloadSub.status).toBe("SUBMITTED");
    });

    it("Teacher finalizes Writing submission -> status becomes GRADED and student receives authoritative Overall Band", async () => {
      const finalizeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${writingSubmissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [
            {
              answerId: writingAns1Id,
              questionId: writingQ1Id,
              score: 6.5,
              criteriaScores: { taskResponse: 6.5, coherence: 7.0, lexical: 6.5, grammar: 6.0 },
              feedback: "Good overview of the chart trends in Task 1.",
            },
            {
              answerId: writingAns2Id,
              questionId: writingQ2Id,
              score: 7.0,
              criteriaScores: { taskResponse: 7.0, coherence: 7.0, lexical: 7.5, grammar: 6.5 },
              feedback: "Strong arguments in body paragraph 1.",
              revisionRequired: true,
              primaryErrorCategory: "STRUCTURE",
            },
          ],
          options: {
            finalize: true,
            revisionRequired: true,
            primaryErrorCategory: "STRUCTURE",
          },
        },
      });
      expect(finalizeRes.statusCode).toBe(200);

      // Verify submission is now GRADED with IELTS weighted band ((6.5 + 2*7.0)/3 = 6.83 -> 7.0)
      const studentFinalRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${writingSubmissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
      });
      const finalSub = JSON.parse(studentFinalRes.body);
      expect(finalSub.status).toBe("GRADED");
      expect(finalSub.totalScore).toBe(7.0);
      expect(finalSub.answers[0].score).toBe(6.5);
      expect(finalSub.answers[1].score).toBe(7.0);
    });
  });

  // =========================================================================
  // 2. SPEAKING MULTI-PART GRADING FLOW
  // =========================================================================
  describe("2. Speaking Multi-Part: Part 1 + Part 2 + Part 3 with FC/LR/GRA/PR Rubric", () => {
    it("Student submits Speaking audio recordings for Part 1, Part 2, and Part 3", async () => {
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: speakingExamId },
      });
      expect(startRes.statusCode).toBe(201);
      speakingSubmissionId = JSON.parse(startRes.body).id;

      // Submit Audio recordings for all 3 parts
      const draftRes = await app.inject({
        method: "PUT",
        url: `/api/v1/submissions/${speakingSubmissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          answers: [
            { questionId: speakingQ1Id, audioUrl: "speaking-recordings/part1.webm" },
            { questionId: speakingQ2Id, audioUrl: "speaking-recordings/part2.webm" },
            { questionId: speakingQ3Id, audioUrl: "speaking-recordings/part3.webm" },
          ],
        },
      });
      expect(draftRes.statusCode).toBe(200);

      const submitRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${speakingSubmissionId}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
      });
      expect(submitRes.statusCode).toBe(200);

      const subData = JSON.parse(submitRes.body);
      const ans1 = subData.answers.find((a: any) => a.questionId === speakingQ1Id);
      const ans2 = subData.answers.find((a: any) => a.questionId === speakingQ2Id);
      const ans3 = subData.answers.find((a: any) => a.questionId === speakingQ3Id);
      speakingAns1Id = ans1.id;
      speakingAns2Id = ans2.id;
      speakingAns3Id = ans3.id;
    });

    it("Teacher grades Speaking parts with FC, LR, GRA, PR rubric and saves draft", async () => {
      const draftRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${speakingSubmissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [
            {
              answerId: speakingAns1Id,
              questionId: speakingQ1Id,
              criteriaScores: { fluencyAndCoherence: 6.5, lexical: 6.5, grammar: 6.0, pronunciation: 7.0 },
              feedback: "Part 1 was natural with good pronunciation.",
            },
            {
              answerId: speakingAns2Id,
              questionId: speakingQ2Id,
              criteriaScores: { fluencyAndCoherence: 6.0, lexical: 6.5, grammar: 6.0, pronunciation: 6.5 },
              feedback: "Part 2 cue card: maintain fluency and avoid pauses.",
            },
            {
              answerId: speakingAns3Id,
              questionId: speakingQ3Id,
              criteriaScores: { fluencyAndCoherence: 7.0, lexical: 7.0, grammar: 6.5, pronunciation: 7.0 },
              feedback: "Excellent complex ideas in Part 3 discussion.",
            },
          ],
          options: {
            finalize: false,
          },
        },
      });
      expect(draftRes.statusCode).toBe(200);

      // Verify draft reload
      const reloadRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${speakingSubmissionId}`,
        headers: { authorization: `Bearer ${teacherToken}` },
      });
      const reloadSub = JSON.parse(reloadRes.body);
      expect(reloadSub.status).toBe("SUBMITTED");
      expect(reloadSub.answers.length).toBe(3);
    });

    it("Teacher finalizes Speaking submission -> Overall Band computed from FC/LR/GRA/PR", async () => {
      const finalizeRes = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${speakingSubmissionId}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          grades: [
            {
              answerId: speakingAns1Id,
              questionId: speakingQ1Id,
              criteriaScores: { fluencyAndCoherence: 6.5, lexical: 6.5, grammar: 6.0, pronunciation: 7.0 },
              feedback: "Part 1 was natural.",
            },
            {
              answerId: speakingAns2Id,
              questionId: speakingQ2Id,
              criteriaScores: { fluencyAndCoherence: 6.0, lexical: 6.5, grammar: 6.0, pronunciation: 6.5 },
              feedback: "Part 2 needs more flow.",
            },
            {
              answerId: speakingAns3Id,
              questionId: speakingQ3Id,
              criteriaScores: { fluencyAndCoherence: 7.0, lexical: 7.0, grammar: 6.5, pronunciation: 7.0 },
              feedback: "Part 3 was well elaborated.",
            },
          ],
          options: {
            finalize: true,
          },
        },
      });
      expect(finalizeRes.statusCode).toBe(200);

      const studentRes = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${speakingSubmissionId}`,
        headers: { authorization: `Bearer ${studentToken}` },
      });
      const studentSub = JSON.parse(studentRes.body);
      expect(studentSub.status).toBe("GRADED");
      expect(studentSub.totalScore).toBeGreaterThanOrEqual(6.0);
    });
  });

  // =========================================================================
  // 3. ATTEMPT 2 (REVISION LEARNING LOOP)
  // =========================================================================
  describe("3. Attempt 2: Revision Attempt Creation & History Immutability", () => {
    it("Student creates Attempt 2 for Writing exam with revision required", async () => {
      const revRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions/revision",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          examId: writingExamId,
          clonePreviousAnswers: true,
        },
      });
      expect(revRes.statusCode).toBe(201);
      const revBody = JSON.parse(revRes.body);

      // New submission is IN_PROGRESS
      expect(revBody.id).not.toBe(writingSubmissionId);
      expect(revBody.status).toBe("IN_PROGRESS");

      // Verify Attempt 1 remains intact in database
      const attempt1Res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${writingSubmissionId}`,
        headers: { authorization: `Bearer ${teacherToken}` },
      });
      const attempt1Sub = JSON.parse(attempt1Res.body);
      expect(attempt1Sub.status).toBe("GRADED");
      expect(attempt1Sub.totalScore).toBe(7.0);
    });
  });
});
