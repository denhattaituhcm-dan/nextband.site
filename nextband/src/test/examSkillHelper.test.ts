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
    expect(badge.label).toBe("📖 Trắc nghiệm Reading & Listening");
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
    expect(badge.label).toBe("📖 Trắc nghiệm Reading");
  });

  it("correctly identifies pure Listening exams", () => {
    const exam = {
      title: "Cambridge IELTS 18 Listening Test 2",
      examType: "listening",
    };
    expect(detectExamSkill(exam)).toBe("listening");
    expect(isAutoGradedExam(exam)).toBe(true);

    const badge = getSkillBadgeConfig("listening");
    expect(badge.label).toBe("🎧 Trắc nghiệm Listening");
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
    expect(badge.label).toBe("✍️ Tự luận Writing");
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
    expect(badge.label).toBe("🎙️ Tự luận Speaking");
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

  it("correctly identifies standard course abbreviation titles (W1-D3-SPK, W1-D1-WRI, etc.)", () => {
    // W1 - D3 - SPK (Speaking: Tự luận)
    const spkExam = { title: "W1 - D3 - SPK", examType: "ielts" };
    expect(detectExamSkill(spkExam)).toBe("speaking");
    expect(isAutoGradedExam(spkExam)).toBe(false);
    expect(getSkillBadgeConfig("speaking").label).toContain("Tự luận Speaking");

    // W1 - D1 - WRI (Writing: Tự luận)
    const wriExam = { title: "W1 - D1 - WRI", examType: "ielts" };
    expect(detectExamSkill(wriExam)).toBe("writing");
    expect(isAutoGradedExam(wriExam)).toBe(false);
    expect(getSkillBadgeConfig("writing").label).toContain("Tự luận Writing");

    // W1 - D2 - LIS (Listening: Trắc nghiệm)
    const lisExam = { title: "W1 - D2 - LIS", examType: "ielts" };
    expect(detectExamSkill(lisExam)).toBe("listening");
    expect(isAutoGradedExam(lisExam)).toBe(true);
    expect(getSkillBadgeConfig("listening").label).toContain("Trắc nghiệm Listening");

    // W4 - D3 - REA (Reading: Trắc nghiệm)
    const reaExam = { title: "W4 - D3 - REA", examType: "ielts" };
    expect(detectExamSkill(reaExam)).toBe("reading");
    expect(isAutoGradedExam(reaExam)).toBe(true);
    expect(getSkillBadgeConfig("reading").label).toContain("Trắc nghiệm Reading");

    // W1 - D3 - VOCAB (Grammar/Vocab: Trắc nghiệm)
    const vocabExam = { title: "W1 - D3 - VOCAB", examType: "ielts" };
    expect(detectExamSkill(vocabExam)).toBe("grammar");
    expect(isAutoGradedExam(vocabExam)).toBe(true);
    expect(getSkillBadgeConfig("grammar").label).toContain("Trắc nghiệm Grammar");
  });
});
