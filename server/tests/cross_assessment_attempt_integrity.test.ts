import { describe, it, expect, beforeEach, afterEach, beforeAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { ExamSubmissionService } from "../services/exam-submission.service.js";

describe("Cross-Assessment Attempt & Submission Integrity Invariants", () => {
  const prisma = new PrismaClient();
  const service = new ExamSubmissionService(prisma);

  let testStudent: { id: string; roles: string[] };
  let testCourseId: string;
  let testExamId: string;
  let createdSubmissionIds: string[] = [];

  beforeAll(async () => {
    const existingUser = await prisma.user.findFirst({
      where: { email: { contains: "@" } }
    });
    if (!existingUser) throw new Error("No existing user found in DB for testing");

    testStudent = {
      id: existingUser.userId || existingUser.id,
      roles: ["student"],
    };
  });

  beforeEach(async () => {
    const course = await prisma.course.create({
      data: {
        title: "Test Course Integrity " + Date.now(),
      },
    });
    testCourseId = course.id;

    const exam = await prisma.exam.create({
      data: {
        title: "WEEK 1 - DAY 1 - WRITING TEST INTEGRITY",
        durationMinutes: 60,
        examType: "ielts",
        isOpen: true,
        courseId: testCourseId,
      },
    });
    testExamId = exam.id;
  });

  afterEach(async () => {
    if (createdSubmissionIds.length > 0) {
      await prisma.answer.deleteMany({
        where: { submissionId: { in: createdSubmissionIds } },
      });
      await prisma.examSubmission.deleteMany({
        where: { id: { in: createdSubmissionIds } },
      });
      createdSubmissionIds = [];
    }
    if (testExamId) {
      await prisma.exam.delete({
        where: { id: testExamId },
      });
    }
    if (testCourseId) {
      await prisma.course.delete({
        where: { id: testCourseId },
      });
    }
  });

  it("Invariant 1: Student opens exam for first time -> Creates IN_PROGRESS attempt", async () => {
    const res = await service.startAttempt(testStudent, testExamId);
    expect(res.isNew).toBe(true);
    expect(res.submission.status).toBe("IN_PROGRESS");
    expect(res.submission.examId).toBe(testExamId);
    createdSubmissionIds.push(res.submission.id);
  });

  it("Invariant 2: Student refreshes/reopens active exam -> Resumes same IN_PROGRESS attempt without duplicate", async () => {
    const res1 = await service.startAttempt(testStudent, testExamId);
    createdSubmissionIds.push(res1.submission.id);

    const res2 = await service.startAttempt(testStudent, testExamId);
    expect(res2.isNew).toBe(false);
    expect(res2.submission.id).toBe(res1.submission.id);
    expect(res2.submission.isResumed).toBe(true);
  });

  it("Invariant 3: Student submits exam -> Status becomes finalized (SUBMITTED or GRADED)", async () => {
    const startRes = await service.startAttempt(testStudent, testExamId);
    createdSubmissionIds.push(startRes.submission.id);

    const submitRes = await service.submitExam(testStudent, startRes.submission.id, {
      answers: [],
    });
    expect(["SUBMITTED", "GRADED"]).toContain(submitRes.status);
  });

  it("Invariant 4 (Crucial Canary Fix): Student reopens exam after SUBMITTED/GRADED -> Returns existing finalized submission instead of creating blank attempt", async () => {
    const startRes = await service.startAttempt(testStudent, testExamId);
    createdSubmissionIds.push(startRes.submission.id);

    const submitRes = await service.submitExam(testStudent, startRes.submission.id, {
      answers: [],
    });

    // Student navigates to /exam/:id again
    const reopenRes = await service.startAttempt(testStudent, testExamId);
    expect(reopenRes.isNew).toBe(false);
    expect(reopenRes.submission.id).toBe(startRes.submission.id);
    expect(["SUBMITTED", "GRADED"]).toContain(reopenRes.submission.status);
    expect(reopenRes.submission.alreadyFinalized).toBe(true);
  });

  it("Invariant 5: Explicit retake request -> Creates new attempt only when allowRetake is true", async () => {
    const startRes = await service.startAttempt(testStudent, testExamId);
    createdSubmissionIds.push(startRes.submission.id);

    await service.submitExam(testStudent, startRes.submission.id, {
      answers: [],
    });

    // Explicit retake
    const retakeRes = await service.startAttempt(testStudent, testExamId, { allowRetake: true });
    expect(retakeRes.isNew).toBe(true);
    expect(retakeRes.submission.id).not.toBe(startRes.submission.id);
    expect(retakeRes.submission.status).toBe("IN_PROGRESS");
    createdSubmissionIds.push(retakeRes.submission.id);
  });

  it("Invariant 6: Idempotent submit -> Submitting twice returns the same finalized submission", async () => {
    const startRes = await service.startAttempt(testStudent, testExamId);
    createdSubmissionIds.push(startRes.submission.id);

    const submit1 = await service.submitExam(testStudent, startRes.submission.id, {
      answers: [],
    });
    const submit2 = await service.submitExam(testStudent, startRes.submission.id, {
      answers: [],
    });

    expect(["SUBMITTED", "GRADED"]).toContain(submit1.status);
    expect(["SUBMITTED", "GRADED"]).toContain(submit2.status);
    expect(submit1.id).toBe(submit2.id);
  });
});
