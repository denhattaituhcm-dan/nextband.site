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

describe("🧬 STUDENT ERROR EPISODE LIFECYCLE (ACADEMIC EVIDENCE SYSTEM)", () => {
  let app: FastifyInstance;

  const teacherId = "tch-evidence-001";
  const studentId = "std-evidence-001";
  const classId = "cls-evidence-001";
  const examId = "exam-writing-evidence-01";
  const questionId = "q-writing-evidence-01";

  let teacherToken: string;
  let studentToken: string;

  let attempt1SubId: string;
  let attempt1AnswerId: string;
  let attempt2SubId: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    teacherToken = app.jwt.sign({ id: teacherId, email: "teacher@evidence.com", roles: ["teacher"] });
    studentToken = app.jwt.sign({ id: studentId, email: "student@evidence.com", roles: ["student"] });

    // Seed mock database
    mockPrisma.users.push(
      { id: teacherId, email: "teacher@evidence.com", fullName: "Dr. Academic Teacher", roles: ["teacher"] },
      { id: studentId, email: "student@evidence.com", fullName: "Student Learner", roles: ["student"] }
    );

    mockPrisma.classes.push({
      id: classId,
      name: "IELTS Mastery Elite",
      teacherId,
      isActive: true,
    });

    mockPrisma.classStudents.push({
      id: "cs-evidence-1",
      classId,
      studentId,
      deletedAt: null,
    });

    mockPrisma.exams.push({
      id: examId,
      title: "Writing Task 2: Urbanization",
      isOpen: true,
      durationMinutes: 60,
      sections: [
        {
          id: "sec-ev-1",
          examId,
          title: "Writing Section",
          sectionType: "writing",
          questionGroups: [
            {
              id: "grp-ev-1",
              title: "Task 2 Prompt",
              questions: [
                {
                  id: questionId,
                  questionType: "essay",
                  questionText: "Discuss the advantages and disadvantages of rapid urbanization.",
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

  it("Step 1: Student submits Attempt 1 essay with Subject-Verb Agreement error", async () => {
    const startRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: { examId },
    });
    expect(startRes.statusCode).toBe(201);
    const startData = JSON.parse(startRes.payload);
    attempt1SubId = startData.id;

    // Student submits Attempt 1
    const submitRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt1SubId}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId,
            answerText: "The expansion of modern cities create numerous employment opportunities for young citizens.",
          },
        ],
      },
    });
    expect(submitRes.statusCode).toBe(200);

    // Retrieve answerId
    const subDetailRes = await app.inject({
      method: "GET",
      url: `/api/v1/submissions/${attempt1SubId}`,
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const subDetail = JSON.parse(subDetailRes.payload);
    attempt1AnswerId = subDetail.answers[0].id;
  });

  it("Step 2: Teacher spots error, tags sentence, and marks revisionRequired=true -> Episode created with REVISION_REQUESTED", async () => {
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
            feedback: "Chú ý chủ ngữ số ít/nhiều 'expansion' cần chia động từ 'creates'.",
            primaryErrorCategory: "GRAMMAR",
            revisionRequired: true,
            sentenceFeedbacks: [
              {
                sentenceIndex: 0,
                category: "GRAMMAR",
                tag: "Subject-Verb Agreement",
                originalSentence: "The expansion of modern cities create numerous employment opportunities for young citizens.",
                note: "Chủ ngữ là 'The expansion' (danh từ số ít), động từ phải chia là 'creates'.",
                suggestedSentence: "The expansion of modern cities creates numerous employment opportunities for young citizens.",
              },
            ],
          },
        ],
        primaryErrorCategory: "GRAMMAR",
        revisionRequired: true,
      },
    });

    expect(gradeRes.statusCode).toBe(200);

    // Invariant Check: Verify StudentErrorEpisode was created in DB with REVISION_REQUESTED
    const episodes = mockPrisma.studentErrorEpisodes.filter((ep: any) => ep.studentId === studentId);
    expect(episodes.length).toBeGreaterThan(0);

    const svaEpisode = episodes.find((ep: any) => ep.errorTag === "Subject-Verb Agreement");
    expect(svaEpisode).toBeDefined();
    expect(svaEpisode.status).toBe("REVISION_REQUESTED");
    expect(svaEpisode.category).toBe("GRAMMAR");
    expect(svaEpisode.sourceSubmissionId).toBe(attempt1SubId);
    expect(svaEpisode.correctedAt).toBeNull();
    expect(svaEpisode.revisionSubmissionId).toBeNull();
    expect(svaEpisode.initialSentence).toContain("The expansion of modern cities create");
  });

  it("Step 3: Idempotency Guard - Teacher re-grades Attempt 1 without creating duplicate episodes", async () => {
    const initialCount = mockPrisma.studentErrorEpisodes.length;

    // Regrade Attempt 1 with same tag
    const regradeRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt1SubId}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 5.5,
        grades: [
          {
            answerId: attempt1AnswerId,
            score: 5.5,
            feedback: "Đã cập nhật nhận xét chi tiết hơn.",
            primaryErrorCategory: "GRAMMAR",
            revisionRequired: true,
            sentenceFeedbacks: [
              {
                sentenceIndex: 0,
                category: "GRAMMAR",
                tag: "Subject-Verb Agreement",
                originalSentence: "The expansion of modern cities create numerous employment opportunities for young citizens.",
                note: "Chủ ngữ là 'The expansion' (số ít) -> 'creates'.",
              },
            ],
          },
        ],
        primaryErrorCategory: "GRAMMAR",
        revisionRequired: true,
      },
    });

    expect(regradeRes.statusCode).toBe(200);
    // Count must not increase
    expect(mockPrisma.studentErrorEpisodes.length).toBe(initialCount);
  });

  it("Step 4: Student starts Attempt 2 revision, fixes the sentence, and submits", async () => {
    const revStartRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions/revision",
      headers: { authorization: `Bearer ${studentToken}` },
      payload: { examId, clonePreviousAnswers: true },
    });
    expect(revStartRes.statusCode).toBe(201);
    const revData = JSON.parse(revStartRes.payload);
    attempt2SubId = revData.id;

    // Student submits Attempt 2 with correct grammar
    const submitRevRes = await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${attempt2SubId}/submit`,
      headers: { authorization: `Bearer ${studentToken}` },
      payload: {
        answers: [
          {
            questionId,
            answerText: "The expansion of modern cities creates numerous employment opportunities for young citizens.",
          },
        ],
      },
    });
    expect(submitRevRes.statusCode).toBe(200);
  });

  it("Step 5: Teacher approves revision (revisionRequired=false) -> Episode transitions to CORRECTED", async () => {
    // Get attempt 2 answerId
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
            feedback: "Rất tốt! Lỗi chia động từ đã được sửa chuẩn xác.",
          },
        ],
        feedback: "Rất tốt! Lỗi chia động từ đã được sửa chuẩn xác.",
        primaryErrorCategory: null,
        revisionRequired: false,
      },
    });

    expect(grade2Res.statusCode).toBe(200);

    // Invariant Check: Verify Episode status transitioned to CORRECTED
    const svaEpisode = mockPrisma.studentErrorEpisodes.find(
      (ep: any) => ep.studentId === studentId && ep.errorTag === "Subject-Verb Agreement"
    );
    expect(svaEpisode).toBeDefined();
    expect(svaEpisode.status).toBe("CORRECTED");
    expect(svaEpisode.revisionSubmissionId).toBe(attempt2SubId);
    expect(svaEpisode.correctedAt).not.toBeNull();
  });

  it("Step 6: Academic Evidence KPI - Recovery Rate is accurately calculated as 100%", async () => {
    const { ErrorEpisodeService } = await import("../services/error-episode.service.js");
    const episodeService = new ErrorEpisodeService(mockPrisma as any);
    const stats = await episodeService.getStudentRecoveryStats(studentId);

    expect(stats.studentId).toBe(studentId);
    expect(stats.totalDetected).toBe(1);
    expect(stats.totalRevisionRequested).toBe(1);
    expect(stats.totalCorrected).toBe(1);
    expect(stats.recoveryRate).toBe(100);
  });

  it("Step 7: Student B has error in Attempt 2 and teacher keeps revisionRequired=true -> status stays REVISION_REQUESTED", async () => {
    const studentBId = "std-evidence-002";
    mockPrisma.users.push({
      id: studentBId,
      email: "studentB@evidence.com",
      fullName: "Student B",
      roles: ["student"],
    });
    mockPrisma.classStudents.push({
      id: "cs-evidence-2",
      classId,
      studentId: studentBId,
      deletedAt: null,
    });

    const studentBToken = app.jwt.sign({ id: studentBId, email: "studentB@evidence.com", roles: ["student"] });

    // Attempt 1: Start & Submit
    const s1Res = await app.inject({
      method: "POST",
      url: "/api/v1/submissions",
      headers: { authorization: `Bearer ${studentBToken}` },
      payload: { examId },
    });
    const subB1Id = JSON.parse(s1Res.payload).id;

    await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${subB1Id}/submit`,
      headers: { authorization: `Bearer ${studentBToken}` },
      payload: { answers: [{ questionId, answerText: "She go to work by bus every single morning." }] },
    });

    const b1Detail = JSON.parse((await app.inject({
      method: "GET",
      url: `/api/v1/submissions/${subB1Id}`,
      headers: { authorization: `Bearer ${studentBToken}` },
    })).payload);

    // Grade Attempt 1 with revisionRequired
    await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${subB1Id}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 5.0,
        grades: [{
          answerId: b1Detail.answers[0].id,
          score: 5.0,
          sentenceFeedbacks: [{
            sentenceIndex: 0,
            category: "GRAMMAR",
            tag: "Tense / Aspect",
            originalSentence: "She go to work by bus every single morning.",
            note: "Phải dùng goes",
          }],
          revisionRequired: true,
        }],
        revisionRequired: true,
      },
    });

    // Attempt 2: Start & Submit
    const revBRes = await app.inject({
      method: "POST",
      url: "/api/v1/submissions/revision",
      headers: { authorization: `Bearer ${studentBToken}` },
      payload: { examId },
    });
    const subB2Id = JSON.parse(revBRes.payload).id;

    await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${subB2Id}/submit`,
      headers: { authorization: `Bearer ${studentBToken}` },
      payload: { answers: [{ questionId, answerText: "She went to work by bus every single morning." }] },
    });

    const b2Detail = JSON.parse((await app.inject({
      method: "GET",
      url: `/api/v1/submissions/${subB2Id}`,
      headers: { authorization: `Bearer ${studentBToken}` },
    })).payload);

    // Grade Attempt 2: Teacher says STILL NOT FIXED (revisionRequired=true)
    await app.inject({
      method: "POST",
      url: `/api/v1/submissions/${subB2Id}/grade`,
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: {
        totalScore: 5.0,
        grades: [{
          answerId: b2Detail.answers[0].id,
          score: 5.0,
          feedback: "Vẫn chưa đúng thì hiện tại đơn (goes).",
          revisionRequired: true,
        }],
        revisionRequired: true,
      },
    });

    // Invariant Check: Episode for student B remains REVISION_REQUESTED
    const epB = mockPrisma.studentErrorEpisodes.find(
      (ep: any) => ep.studentId === studentBId && ep.errorTag === "Tense / Aspect"
    );
    expect(epB).toBeDefined();
    expect(epB.status).toBe("REVISION_REQUESTED");
    expect(epB.correctedAt).toBeNull();

    // KPI check for student B: 0% recovery
    const { ErrorEpisodeService } = await import("../services/error-episode.service.js");
    const episodeService = new ErrorEpisodeService(mockPrisma as any);
    const statsB = await episodeService.getStudentRecoveryStats(studentBId);
    expect(statsB.totalCorrected).toBe(0);
    expect(statsB.recoveryRate).toBe(0);
  });

  describe("🔄 PHASE 2: ERROR RETENTION & RECURRENCE DETECTION SUITE", () => {
    const exam2Id = "exam-writing-evidence-02";
    const q2Id = "q-writing-evidence-02";
    const exam3Id = "exam-writing-evidence-03";
    const q3Id = "q-writing-evidence-03";
    const exam4Id = "exam-writing-evidence-04";
    const q4Id = "q-writing-evidence-04";

    beforeAll(() => {
      // Seed exams 2, 3, 4
      [
        { id: exam2Id, qId: q2Id, title: "Writing Task 2: Artificial Intelligence" },
        { id: exam3Id, qId: q3Id, title: "Writing Task 2: Climate Change" },
        { id: exam4Id, qId: q4Id, title: "Writing Task 2: Space Exploration" },
      ].forEach((e) => {
        mockPrisma.exams.push({
          id: e.id,
          title: e.title,
          isOpen: true,
          durationMinutes: 60,
          sections: [
            {
              id: `sec-${e.id}`,
              examId: e.id,
              title: "Writing Section",
              sectionType: "writing",
              questionGroups: [
                {
                  id: `grp-${e.id}`,
                  title: "Prompt",
                  questions: [{ id: e.qId, questionType: "essay", questionText: e.title, points: 9.0 }],
                },
              ],
            },
          ],
        });
      });
    });

    it("Step 8: Independent Exam 2 - Student writes clean essay -> Episode enters MONITORING (cleanStreak = 1)", async () => {
      // Start & Submit Exam 2
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: exam2Id },
      });
      const sub2Id = JSON.parse(startRes.payload).id;

      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub2Id}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { answers: [{ questionId: q2Id, answerText: "Artificial intelligence empowers numerous industries effectively." }] },
      });

      const sub2Detail = JSON.parse((await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${sub2Id}`,
        headers: { authorization: `Bearer ${studentToken}` },
      })).payload);

      // Teacher grades Exam 2 without Subject-Verb Agreement error
      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub2Id}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          totalScore: 7.0,
          grades: [{
            answerId: sub2Detail.answers[0].id,
            score: 7.0,
            feedback: "Bài viết rất tốt, ngữ pháp chuẩn xác.",
          }],
          revisionRequired: false,
        },
      });

      // Verify: Episode status is MONITORING with cleanStreakCount = 1
      const svaEpisode = mockPrisma.studentErrorEpisodes.find(
        (ep: any) => ep.studentId === studentId && ep.errorTag === "Subject-Verb Agreement"
      );
      expect(svaEpisode).toBeDefined();
      expect(svaEpisode.status).toBe("MONITORING");
      expect(svaEpisode.cleanStreakCount).toBe(1);
      expect(svaEpisode.retainedAt).toBeUndefined();
    });

    it("Step 9: Independent Exam 3 - Second clean essay in a row -> Episode achieves RETAINED (cleanStreak = 2)", async () => {
      // Start & Submit Exam 3
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: exam3Id },
      });
      const sub3Id = JSON.parse(startRes.payload).id;

      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub3Id}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { answers: [{ questionId: q3Id, answerText: "Global warming poses catastrophic threats to humanity." }] },
      });

      const sub3Detail = JSON.parse((await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${sub3Id}`,
        headers: { authorization: `Bearer ${studentToken}` },
      })).payload);

      // Teacher grades Exam 3 without Subject-Verb Agreement error
      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub3Id}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          totalScore: 7.5,
          grades: [{
            answerId: sub3Detail.answers[0].id,
            score: 7.5,
            feedback: "Xuất sắc! Lập luận chặt chẽ và chuẩn xác.",
          }],
          revisionRequired: false,
        },
      });

      // Verify: Episode status is RETAINED with cleanStreakCount = 2
      const svaEpisode = mockPrisma.studentErrorEpisodes.find(
        (ep: any) => ep.studentId === studentId && ep.errorTag === "Subject-Verb Agreement"
      );
      expect(svaEpisode).toBeDefined();
      expect(svaEpisode.status).toBe("RETAINED");
      expect(svaEpisode.cleanStreakCount).toBe(2);
      expect(svaEpisode.retainedAt).not.toBeNull();

      // Verify Academic Evidence Stats: Retention Rate = 100%
      const { ErrorEpisodeService } = await import("../services/error-episode.service.js");
      const episodeService = new ErrorEpisodeService(mockPrisma as any);
      const evidenceStats = await episodeService.getStudentAcademicEvidenceStats(studentId);

      expect(evidenceStats.totalCorrected).toBe(1);
      expect(evidenceStats.totalRetained).toBe(1);
      expect(evidenceStats.retentionRate).toBe(100);
      expect(evidenceStats.episodes.retained.length).toBe(1);
      expect(evidenceStats.episodes.retained[0].errorTag).toBe("Subject-Verb Agreement");
    });

    it("Step 10: Independent Exam 4 - Error recurs -> Episode transitions to RECURRED (recurrenceCount = 1, streak reset to 0)", async () => {
      // Start & Submit Exam 4 with repeated Subject-Verb Agreement mistake
      const startRes = await app.inject({
        method: "POST",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { examId: exam4Id },
      });
      const sub4Id = JSON.parse(startRes.payload).id;

      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub4Id}/submit`,
        headers: { authorization: `Bearer ${studentToken}` },
        payload: { answers: [{ questionId: q4Id, answerText: "The exploration of outer planets require astronomical budgets." }] },
      });

      const sub4Detail = JSON.parse((await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${sub4Id}`,
        headers: { authorization: `Bearer ${studentToken}` },
      })).payload);

      // Teacher catches the recurring error
      await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${sub4Id}/grade`,
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          totalScore: 6.0,
          grades: [{
            answerId: sub4Detail.answers[0].id,
            score: 6.0,
            sentenceFeedbacks: [{
              sentenceIndex: 0,
              category: "GRAMMAR",
              tag: "Subject-Verb Agreement",
              originalSentence: "The exploration of outer planets require astronomical budgets.",
              note: "Chủ ngữ 'The exploration' số ít -> requires.",
            }],
          }],
          revisionRequired: false,
        },
      });

      // Verify: Episode status transitioned to RECURRED
      const svaEpisode = mockPrisma.studentErrorEpisodes.find(
        (ep: any) => ep.studentId === studentId && ep.errorTag === "Subject-Verb Agreement"
      );
      expect(svaEpisode).toBeDefined();
      expect(svaEpisode.status).toBe("RECURRED");
      expect(svaEpisode.recurrenceCount).toBe(1);
      expect(svaEpisode.cleanStreakCount).toBe(0);

      // Verify Academic Evidence Stats: Retention Rate drops to 0%
      const { ErrorEpisodeService } = await import("../services/error-episode.service.js");
      const episodeService = new ErrorEpisodeService(mockPrisma as any);
      const evidenceStats = await episodeService.getStudentAcademicEvidenceStats(studentId);

      expect(evidenceStats.totalRecurred).toBe(1);
      expect(evidenceStats.totalRetained).toBe(0);
      expect(evidenceStats.retentionRate).toBe(0);
      expect(evidenceStats.episodes.recurred.length).toBe(1);
      expect(evidenceStats.episodes.recurred[0].errorTag).toBe("Subject-Verb Agreement");
    });
  });
});
