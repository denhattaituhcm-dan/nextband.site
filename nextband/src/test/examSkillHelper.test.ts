import { describe, it, expect } from "vitest";
import {
  detectExamSkill,
  isAutoGradedExam,
  getSkillBadgeConfig,
} from "@/lib/examSkillHelper";

describe("examSkillHelper", () => {
  it("correctly identifies Reading & Listening combo exams", () => {
    const exam = {
      title: "WEEK 1 - DAY 2 - READING & LISTENING",
      examType: "ielts",
    };
    expect(detectExamSkill(exam)).toBe("reading_listening");
    expect(isAutoGradedExam(exam)).toBe(true);

    const badge = getSkillBadgeConfig("reading_listening");
    expect(badge.label).toBe("📖 Reading & Listening");
    expect(badge.shortLabel).toBe("READING & LISTENING");
  });

  it("correctly identifies pure Reading exams", () => {
    const exam = {
      title: "IELTS Reading Practice Test 01",
      examType: "reading",
    };
    expect(detectExamSkill(exam)).toBe("reading");
    expect(isAutoGradedExam(exam)).toBe(true);

    const badge = getSkillBadgeConfig("reading");
    expect(badge.label).toBe("📖 Reading");
  });

  it("correctly identifies pure Listening exams", () => {
    const exam = {
      title: "Cambridge IELTS 18 Listening Test 2",
      examType: "listening",
    };
    expect(detectExamSkill(exam)).toBe("listening");
    expect(isAutoGradedExam(exam)).toBe(true);

    const badge = getSkillBadgeConfig("listening");
    expect(badge.label).toBe("🎧 Listening");
  });

  it("correctly identifies Writing exams and marks as manual grading", () => {
    const exam = {
      title: "WEEK 2 - DAY 1 - WRITING TASK 1",
      examType: "writing",
      sections: [
        {
          sectionType: "writing",
          questionGroups: [
            {
              questions: [
                {
                  id: "q1",
                  questionType: "ielts_writing_task1",
                  questionText: "The graph below shows...",
                },
              ],
            },
          ],
        },
      ],
    };
    expect(detectExamSkill(exam)).toBe("writing");
    expect(isAutoGradedExam(exam)).toBe(false);

    const badge = getSkillBadgeConfig("writing");
    expect(badge.label).toBe("✍️ Writing");
  });

  it("correctly identifies Speaking exams and marks as manual grading", () => {
    const exam = {
      title: "IELTS Speaking Part 1 & 2 Practice",
      examType: "speaking",
      sections: [
        {
          sectionType: "speaking",
          questionGroups: [
            {
              questions: [
                {
                  id: "sq1",
                  questionType: "ielts_speaking_part1",
                  questionText: "Describe your hometown.",
                },
              ],
            },
          ],
        },
      ],
    };
    expect(detectExamSkill(exam)).toBe("speaking");
    expect(isAutoGradedExam(exam)).toBe(false);

    const badge = getSkillBadgeConfig("speaking");
    expect(badge.label).toBe("🎙️ Speaking");
  });

  it("marks exams with objective question types as auto-graded", () => {
    const exam = {
      title: "Unit 3 Review Quiz",
      examType: "ielts",
      sections: [
        {
          sectionType: "reading",
          questionGroups: [
            {
              questions: [
                { id: "q1", questionType: "multiple_choice" },
                { id: "q2", questionType: "fill_blank" },
                { id: "q3", questionType: "matching" },
                { id: "q4", questionType: "true_false_not_given" },
              ],
            },
          ],
        },
      ],
    };
    expect(isAutoGradedExam(exam)).toBe(true);
  });
});
