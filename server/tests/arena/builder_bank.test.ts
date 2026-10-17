import { describe, it, expect } from "vitest";
import { BUILDER_ARENA_LESSON_QUESTIONS, matchBuilderLessonKey } from "../../services/builder-questions-bank.data.js";

describe("BUILDER Arena Question Bank Quality & Integrity Tests", () => {
  const expectedLessons = [
    "WEEK 1 – DAY 1",
    "WEEK 1 – DAY 2",
    "WEEK 1 – DAY 3",
    "WEEK 2 – DAY 1",
    "WEEK 2 – DAY 2",
    "WEEK 2 – DAY 3",
    "WEEK 3 – DAY 1",
    "WEEK 3 – DAY 2",
    "WEEK 3 – DAY 3",
    "WEEK 4 – DAY 1",
    "WEEK 4 – DAY 2",
    "WEEK 4 – DAY 3",
    "WEEK 5 – DAY 1",
    "WEEK 5 – DAY 2",
    "WEEK 5 – DAY 3",
    "WEEK 6 – DAY 1",
    "WEEK 6 – DAY 2",
    "WEEK 6 – DAY 3",
    "WEEK 7 – DAY 1",
    "WEEK 7 – DAY 2",
    "WEEK 7 – DAY 3",
    "WEEK 8 – DAY 1",
    "WEEK 8 – DAY 2",
    "WEEK 8 – DAY 3",
    "WEEK 9 – DAY 1",
    "WEEK 9 – DAY 2",
    "WEEK 9 – DAY 3",
  ];

  it("chứa đầy đủ trọn vẹn 27 bài học của khóa BUILDER (270 câu hỏi chuẩn hóa)", () => {
    for (const key of expectedLessons) {
      expect(BUILDER_ARENA_LESSON_QUESTIONS[key]).toBeDefined();
      expect(BUILDER_ARENA_LESSON_QUESTIONS[key].length).toBe(10);
    }
  });

  it("mỗi câu hỏi đều có đúng 4 options A, B, C, D và đáp án đúng hợp lệ", () => {
    for (const key of expectedLessons) {
      const questions = BUILDER_ARENA_LESSON_QUESTIONS[key];
      questions.forEach((q, idx) => {
        expect(q.options.length).toBe(4);
        const optionIds = q.options.map(o => o.id);
        expect(optionIds).toContain(q.correctOptionId);

        // Kiểm tra không có chú thích tiếng Việt trong options (ngăn ngừa lộ bài như DOER)
        q.options.forEach(opt => {
          expect(opt.text).not.toMatch(/\([a-zA-ZÀ-ỹ\s,]+\)/);
          expect(opt.text).not.toContain(" / ");
        });

        // Kiểm tra misconception
        if (q.misconception) {
          expect(optionIds).toContain(q.misconception.baitOptionId);
          const baitOption = q.options.find(o => o.id === q.misconception?.baitOptionId);
          expect(q.misconception.baitOptionText).toBe(`${baitOption?.label}. ${baitOption?.text}`);
          expect(q.misconception.diagnosticTitle).toBeDefined();
          expect(q.misconception.diagnosticTitle?.length).toBeGreaterThan(5);
        }
      });
    }
  });

  it("matchBuilderLessonKey nhận diện chính xác các định dạng tên bài học", () => {
    expect(matchBuilderLessonKey("W1 - D1 - WRI")).toBe("WEEK 1 – DAY 1");
    expect(matchBuilderLessonKey("W1 - D2 - WRI")).toBe("WEEK 1 – DAY 2");
    expect(matchBuilderLessonKey("W1 - D3 - SPK")).toBe("WEEK 1 – DAY 3");
    expect(matchBuilderLessonKey("W2 - D1 - WRI")).toBe("WEEK 2 – DAY 1");
    expect(matchBuilderLessonKey("W2 - D2 - REA")).toBe("WEEK 2 – DAY 2");
    expect(matchBuilderLessonKey("W2 - D3 - SPK")).toBe("WEEK 2 – DAY 3");
    expect(matchBuilderLessonKey("W3 - D1 - WRI")).toBe("WEEK 3 – DAY 1");
    expect(matchBuilderLessonKey("W3 - D2 - REA")).toBe("WEEK 3 – DAY 2");
    expect(matchBuilderLessonKey("W3 - D3 - SPK")).toBe("WEEK 3 – DAY 3");
    expect(matchBuilderLessonKey("W4 - D1 - WRI")).toBe("WEEK 4 – DAY 1");
    expect(matchBuilderLessonKey("W6 - D2 - REA")).toBe("WEEK 6 – DAY 2");
    expect(matchBuilderLessonKey("W7 - D3 - SPK")).toBe("WEEK 7 – DAY 3");
    expect(matchBuilderLessonKey("W9 - D1 - WRI")).toBe("WEEK 9 – DAY 1");
    expect(matchBuilderLessonKey("W9 - D3 - SPK")).toBe("WEEK 9 – DAY 3");
    expect(matchBuilderLessonKey("Buổi 1: Writing Foundation")).toBe("WEEK 1 – DAY 1");
    expect(matchBuilderLessonKey("Buổi 6: Healthy lifestyle")).toBe("WEEK 2 – DAY 3");
    expect(matchBuilderLessonKey("Buổi 27: Personal achievement")).toBe("WEEK 9 – DAY 3");
  });

  it("mỗi bài học đều chứa đúng 10 câu hỏi hợp lệ trong BUILDER_ARENA_LESSON_QUESTIONS", () => {
    // Test that resolving by lesson name returns 10 questions
    for (const key of expectedLessons) {
      const questions = BUILDER_ARENA_LESSON_QUESTIONS[key];
      expect(questions).toBeDefined();
      expect(questions.length).toBe(10);
    }
  });
});
