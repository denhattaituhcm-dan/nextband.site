import { describe, it, expect } from "vitest";
import { isAutoGradedExam, isManualGradingRequired } from "../utils/examSkillHelper.js";

describe("examSkillHelper utility (Backend)", () => {
  it("should classify Reading & Listening as auto-graded", () => {
    const exam = { title: "WEEK 1 - DAY 2 - READING & LISTENING", examType: "ielts" };
    expect(isAutoGradedExam(exam)).toBe(true);
    expect(isManualGradingRequired({ exam })).toBe(false);
  });

  it("should classify Reading (REA) as auto-graded", () => {
    const exam = { title: "W4 - D3 - REA", examType: "ielts" };
    expect(isAutoGradedExam(exam)).toBe(true);
    expect(isManualGradingRequired({ exam })).toBe(false);
  });

  it("should classify Listening (LIS) as auto-graded", () => {
    const exam = { title: "W1 - D2 - LIS", examType: "ielts" };
    expect(isAutoGradedExam(exam)).toBe(true);
    expect(isManualGradingRequired({ exam })).toBe(false);
  });

  it("should classify Writing (WRI) as requiring manual grading", () => {
    const exam = { title: "WEEK 2 - DAY 1 - WRITING", examType: "ielts" };
    expect(isAutoGradedExam(exam)).toBe(false);
    expect(isManualGradingRequired({ exam })).toBe(true);
  });

  it("should classify Speaking (SPK) as requiring manual grading", () => {
    const exam = { title: "WEEK 1 - DAY 3 - SPEAKING", examType: "ielts" };
    expect(isAutoGradedExam(exam)).toBe(false);
    expect(isManualGradingRequired({ exam })).toBe(true);
  });

  it("should recognize sections with speaking or writing as requiring manual grading", () => {
    const exam = {
      title: "Midterm Test",
      examType: "ielts",
      sections: [{ sectionType: "speaking" }]
    };
    expect(isAutoGradedExam(exam)).toBe(false);
    expect(isManualGradingRequired({ exam })).toBe(true);
  });
});
