import { describe, it, expect } from "vitest";
import { routes } from "../routes";
import { submissionKeys, assessmentKeys } from "../queryKeys";
import { parseFillBlankCorrectAnswers, getFillBlankBlankCount } from "../fillBlank";

describe("Canonical Assessment Architecture & Route Contract", () => {
  it("generates consistent canonical routes for student submissions", () => {
    expect(routes.student.submission("sub-123")).toBe("/app/submissions/sub-123");
    expect(routes.student.submissions()).toBe("/app/submissions");
    expect(routes.student.profile()).toBe("/app/profile");
    expect(routes.student.course("ielts-intensive")).toBe("/app/courses/ielts-intensive");
  });

  it("generates consistent canonical routes for exams & learning loop reviews", () => {
    expect(routes.exam.take("exam-456")).toBe("/exam/exam-456");
    expect(routes.exam.take("exam-456", { submissionId: "sub-789", isRevision: true })).toBe(
      "/exam/exam-456?submissionId=sub-789&isRevision=true"
    );
    expect(routes.exam.review("exam-456", "sub-789")).toBe(
      "/exam/exam-456/review?submissionId=sub-789"
    );
  });

  it("generates consistent canonical routes for diagnostic assessment", () => {
    expect(routes.assessment.home()).toBe("/assessment");
    expect(routes.assessment.take("session-abc")).toBe("/assessment/take/session-abc");
    expect(routes.assessment.result("session-abc")).toBe("/assessment/result/session-abc");
  });

  it("generates consistent canonical routes for admin grading", () => {
    expect(routes.admin.checkAttempt()).toBe("/admin/check-attempt");
    expect(routes.admin.grade("sub-123")).toBe("/admin/submission/sub-123/grade");
  });
});

describe("Hierarchical Query Key Factory", () => {
  it("produces prefix-matching query keys for systematic cache invalidation", () => {
    expect(submissionKeys.all).toEqual(["submissions"]);
    expect(submissionKeys.details()).toEqual(["submissions", "detail"]);
    expect(submissionKeys.detail("sub-123")).toEqual(["submissions", "detail", "sub-123"]);
    expect(submissionKeys.siblings("exam-1", "std-2")).toEqual(["submissions", "siblings", "exam-1", "std-2"]);
    expect(submissionKeys.kpis("std-2")).toEqual(["submissions", "kpis", "std-2"]);

    // Invalidation of submissionKeys.all will invalidate all children keys
    const rootKey = submissionKeys.all[0];
    expect(submissionKeys.detail("sub-123")[0]).toBe(rootKey);
    expect(submissionKeys.kpis("std-2")[0]).toBe(rootKey);
    expect(submissionKeys.siblings("exam-1", "std-2")[0]).toBe(rootKey);
  });
});

describe("FillBlank Parser & Evaluation Invariants (BUG-04 Deep Reproduction)", () => {
  it("correctly parses single blank answers separated by |", () => {
    const singleBlank = "apple|apples";
    const parsed = parseFillBlankCorrectAnswers(singleBlank);
    expect(parsed).toEqual(["apple", "apples"]);
    expect(getFillBlankBlankCount(singleBlank)).toBe(2);
  });

  it("correctly parses multiple blanks serialized as JSON array or string map", () => {
    const multiBlankJson = JSON.stringify(["water", "oxygen|air"]);
    const parsed = parseFillBlankCorrectAnswers(multiBlankJson);
    expect(parsed).toEqual(["water", "oxygen|air"]);
    expect(getFillBlankBlankCount(multiBlankJson)).toBe(2);
  });

  it("correctly parses multiple blanks serialized as indexed object", () => {
    const objectJson = JSON.stringify({ "0": "carbon", "1": "dioxide" });
    const parsed = parseFillBlankCorrectAnswers(objectJson);
    expect(parsed).toEqual(["carbon", "dioxide"]);
    expect(getFillBlankBlankCount(objectJson)).toBe(2);
  });
});
