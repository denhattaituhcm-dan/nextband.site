import { describe, it, expect } from "vitest";
import { MASTER_ARENA_LESSON_QUESTIONS, matchMasterLessonKey } from "../../services/master-questions-bank.data.js";

describe("MASTER Arena Question Bank Quality & Integrity Tests", () => {
  const expectedLessons = [
    "WEEK 1 – DAY 1",
    "WEEK 1 – DAY 2",
    "WEEK 1 – DAY 3",
    "WEEK 2 – DAY 1",
    "WEEK 2 – DAY 2",
    "WEEK 2 – DAY 3",
  ];

  it("chứa đầy đủ các bài học đợt 1 của khóa MASTER (60 câu hỏi chuẩn hóa)", () => {
    for (const key of expectedLessons) {
      expect(MASTER_ARENA_LESSON_QUESTIONS[key]).toBeDefined();
      expect(MASTER_ARENA_LESSON_QUESTIONS[key].length).toBe(10);
    }
  });

  it("mỗi câu hỏi đều có đúng 4 options A, B, C, D và đáp án đúng hợp lệ", () => {
    for (const key of expectedLessons) {
      const questions = MASTER_ARENA_LESSON_QUESTIONS[key];
      questions.forEach((q, idx) => {
        expect(q.options.length).toBe(4);
        const optionIds = q.options.map(o => o.id);
        expect(optionIds).toContain(q.correctOptionId);

        // Kiểm tra không có dấu ngoặc lộ đáp án tiếng Việt
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

  it("matchMasterLessonKey nhận diện chính xác các định dạng tên bài học của MASTER", () => {
    expect(matchMasterLessonKey("WEEK 1 - DAY 1 - WRITING")).toBe("WEEK 1 – DAY 1");
    expect(matchMasterLessonKey("W1 - D2: Scanning technique")).toBe("WEEK 1 – DAY 2");
    expect(matchMasterLessonKey("WEEK 2 - DAY 3 - SPEAKING")).toBe("WEEK 2 – DAY 3");
  });
});
