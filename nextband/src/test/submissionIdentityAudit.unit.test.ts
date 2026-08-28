import { describe, it, expect } from "vitest";
import {
  selectCanonicalSubmission,
  filterCanonicalSubmissionsForHomework,
  compareHomeworkOrder,
  parseWeekAndDay,
} from "@/lib/homeworkStatusHelper";

describe("SYSTEM-WIDE AUDIT: Submission Identity & Homework Ordering", () => {
  describe("PHẦN 3 & 9: Submission Identity Matching & Bug Reproduction", () => {
    it("Reproduces bug: Anti-pattern `s.exam_id === lesson.exam_id` falsely matches when both are undefined", () => {
      // Real production-shaped lesson DTO (from examsApi.list or Prisma exam model)
      // Note: `lesson` has `id`, but DOES NOT have `exam_id` (so lesson.exam_id is undefined)
      const lessonW4D3 = {
        id: "exam-uuid-w4d3",
        title: "WEEK 4 - DAY 3 - SPEAKING",
        week: 4,
        lessonOrder: 12,
        // lesson.exam_id is undefined!
      };

      // Real production-shaped submission DTO (from submissionsApi.list / ExamSubmission Prisma model)
      // Student submitted for Week 1 Day 1 (id: "exam-uuid-w1d1")
      // Note: submission has `examId`, but DOES NOT have `exam_id` (so s.exam_id is undefined)
      const submissionW1D1 = {
        id: "sub-uuid-001",
        studentId: "student-uuid-01",
        examId: "exam-uuid-w1d1", // Different exam!
        status: "SUBMITTED",
        // s.exam_id is undefined!
      };

      // BUGGY FILTER CONDITION FROM HomeworkTab.tsx (lines 34-43):
      const buggyMatch = (s: any, lesson: any) =>
        s.examId === lesson.exam_id ||
        s.examId === lesson.id ||
        s.exam_id === lesson.exam_id || // <-- BUG: undefined === undefined evaluates to TRUE!
        s.exam_id === lesson.id ||
        s.homework_id === lesson.id ||
        s.lesson_id === lesson.id;

      // Demonstrating that the buggy condition evaluates to TRUE even though exam IDs do not match!
      expect((submissionW1D1 as any).exam_id).toBeUndefined();
      expect((lessonW4D3 as any).exam_id).toBeUndefined();
      expect((submissionW1D1 as any).exam_id === (lessonW4D3 as any).exam_id).toBe(true);
      expect(buggyMatch(submissionW1D1, lessonW4D3)).toBe(true); // Falsely matches!

      // CANONICAL SAFE MATCHING:
      const canonicalMatch = (s: any, lesson: any) => {
        if (!lesson?.id) return false;
        const targetId =
          s.examId ||
          s.exam_id ||
          s.homework_id ||
          s.homeworkId ||
          s.lesson_id ||
          s.lessonId ||
          s.exam?.id;
        return !!targetId && targetId === lesson.id;
      };

      // Demonstrating that canonical matching correctly returns FALSE
      expect(canonicalMatch(submissionW1D1, lessonW4D3)).toBe(false);
    });

    it("PHẦN 9 Expected Regression: 4 homeworks (W1D1, W1D2, W1D3, W2D1), student with 2 submissions (W1D1, W1D3)", () => {
      const lessons = [
        { id: "exam-w1d1", title: "WEEK 1 - DAY 1 - WRITING", week: 1 },
        { id: "exam-w1d2", title: "WEEK 1 - DAY 2 - READING", week: 1 },
        { id: "exam-w1d3", title: "WEEK 1 - DAY 3 - SPEAKING", week: 1 },
        { id: "exam-w2d1", title: "WEEK 2 - DAY 1 - WRITING", week: 2 },
      ];

      // Student submitted only W1D1 and W1D3
      const submissions = [
        {
          id: "sub-1",
          studentId: "student-1",
          examId: "exam-w1d1",
          status: "SUBMITTED",
          submittedAt: "2026-08-28T08:00:00.000Z",
        },
        {
          id: "sub-2",
          studentId: "student-1",
          examId: "exam-w1d3",
          status: "SUBMITTED",
          submittedAt: "2026-08-28T09:00:00.000Z",
        },
      ];

      const canonicalMatch = (s: any, lessonId: string) => {
        if (!lessonId) return false;
        const targetId =
          s.examId ||
          s.exam_id ||
          s.homework_id ||
          s.homeworkId ||
          s.lesson_id ||
          s.lessonId ||
          s.exam?.id;
        return !!targetId && targetId === lessonId;
      };

      const result = lessons.map((lesson) => {
        const matchingSubs = submissions.filter((s) => canonicalMatch(s, lesson.id));
        return {
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          submissionCount: matchingSubs.length,
        };
      });

      expect(result).toEqual([
        { lessonTitle: "WEEK 1 - DAY 1 - WRITING", lessonId: "exam-w1d1", submissionCount: 1 },
        { lessonTitle: "WEEK 1 - DAY 2 - READING", lessonId: "exam-w1d2", submissionCount: 0 },
        { lessonTitle: "WEEK 1 - DAY 3 - SPEAKING", lessonId: "exam-w1d3", submissionCount: 1 },
        { lessonTitle: "WEEK 2 - DAY 1 - WRITING", lessonId: "exam-w2d1", submissionCount: 0 },
      ]);
    });

    it("Handles diverse DTO shapes (snake_case, camelCase, nested exam.id, null, undefined) without false collisions", () => {
      const lesson = { id: "canonical-exam-id-01", title: "WEEK 1 - DAY 1" };

      const subCamel = { id: "s1", examId: "canonical-exam-id-01" };
      const subSnake = { id: "s2", exam_id: "canonical-exam-id-01" };
      const subNested = { id: "s3", exam: { id: "canonical-exam-id-01" } };
      const subUnrelated = { id: "s4", examId: "unrelated-id-99" };
      const subNull = { id: "s5", examId: null, exam_id: null };
      const subUndefined = { id: "s6" };

      const getSubmissionExamId = (s: any): string | null => {
        return (
          s.examId ||
          s.exam_id ||
          s.homework_id ||
          s.homeworkId ||
          s.lesson_id ||
          s.lessonId ||
          s.exam?.id ||
          null
        );
      };

      const isMatch = (s: any, targetLessonId: string) => {
        const id = getSubmissionExamId(s);
        return !!targetLessonId && !!id && id === targetLessonId;
      };

      expect(isMatch(subCamel, lesson.id)).toBe(true);
      expect(isMatch(subSnake, lesson.id)).toBe(true);
      expect(isMatch(subNested, lesson.id)).toBe(true);
      expect(isMatch(subUnrelated, lesson.id)).toBe(false);
      expect(isMatch(subNull, lesson.id)).toBe(false);
      expect(isMatch(subUndefined, lesson.id)).toBe(false);
    });

    it("filterCanonicalSubmissionsForHomework and selectCanonicalSubmission return empty/null on falsy examId", () => {
      const sampleSubs = [
        { id: "sub-1", examId: "exam-1", status: "SUBMITTED" },
        { id: "sub-2", examId: "exam-2", status: "SUBMITTED" },
      ];

      // Undefined or null or empty exam ID must NEVER match any submission
      expect(selectCanonicalSubmission(sampleSubs, undefined)).toBeNull();
      expect(selectCanonicalSubmission(sampleSubs, null)).toBeNull();
      expect(selectCanonicalSubmission(sampleSubs, "")).toBeNull();
      expect(selectCanonicalSubmission([], "exam-1")).toBeNull();
      expect(selectCanonicalSubmission(null, "exam-1")).toBeNull();

      // filterCanonicalSubmissionsForHomework must return [] on falsy examId
      expect(filterCanonicalSubmissionsForHomework(sampleSubs, undefined)).toEqual([]);
      expect(filterCanonicalSubmissionsForHomework(sampleSubs, null)).toEqual([]);
      expect(filterCanonicalSubmissionsForHomework(sampleSubs, "")).toEqual([]);
      expect(filterCanonicalSubmissionsForHomework([], "exam-1")).toEqual([]);
      expect(filterCanonicalSubmissionsForHomework(sampleSubs, "exam-1")).toHaveLength(1);
      expect(filterCanonicalSubmissionsForHomework(sampleSubs, "exam-1")[0].id).toBe("sub-1");
    });
  });

  describe("PHẦN 5 & 10: Homework Ordering Regression", () => {
    it("Orders exams strictly by Curriculum Order (Week 1 -> Week 7, Day 1 -> Day 3) regardless of insertion order", () => {
      // In the database, records might have been inserted or updated randomly
      const unorderedExams = [
        { id: "e-w4d3", title: "WEEK 4 - DAY 3 - SPEAKING", week: 4, createdAt: "2026-08-01" },
        { id: "e-w7d3", title: "WEEK 7 - DAY 3 - SPEAKING", week: 7, createdAt: "2026-08-02" },
        { id: "e-w2d1", title: "WEEK 2 - DAY 1 - READING", week: 2, createdAt: "2026-08-03" },
        { id: "e-w7d2", title: "WEEK 7 - DAY 2 - READING", week: 7, createdAt: "2026-08-04" },
        { id: "e-w5d3", title: "WEEK 5 - DAY 3 - SPEAKING", week: 5, createdAt: "2026-08-05" },
        { id: "e-w1d1", title: "WEEK 1 - DAY 1 - WRITING", week: 1, createdAt: "2026-08-06" },
        { id: "e-w1d2", title: "WEEK 1 - DAY 2 - READING & LISTENING", week: 1, createdAt: "2026-08-07" },
        { id: "e-w1d3", title: "WEEK 1 - DAY 3 - SPEAKING", week: 1, createdAt: "2026-08-08" },
      ];

      const ordered = [...unorderedExams].sort(compareHomeworkOrder);

      expect(ordered.map((e) => e.id)).toEqual([
        "e-w1d1",
        "e-w1d2",
        "e-w1d3",
        "e-w2d1",
        "e-w4d3",
        "e-w5d3",
        "e-w7d2",
        "e-w7d3",
      ]);
    });
  });
});
