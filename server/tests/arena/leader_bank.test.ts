import { describe, it, expect } from "vitest";
import { LEADER_ARENA_LESSON_QUESTIONS, matchLeaderLessonKey } from "../../services/leader-questions-bank.data.js";

describe("LEADER Arena Question Bank Quality & Integrity Tests", () => {
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
    "WEEK 10 – DAY 1",
    "WEEK 10 – DAY 2",
    "WEEK 10 – DAY 3",
  ];

  it("chứa đầy đủ toàn bộ 30 bài học của khóa LEADER (300 câu hỏi chuẩn hóa 10 tuần)", () => {
    expect(Object.keys(LEADER_ARENA_LESSON_QUESTIONS).length).toBe(30);
    for (const key of expectedLessons) {
      expect(LEADER_ARENA_LESSON_QUESTIONS[key]).toBeDefined();
      expect(LEADER_ARENA_LESSON_QUESTIONS[key].length).toBe(10);
    }
  });

  it("mỗi câu hỏi đều có đúng 4 options A, B, C, D và đáp án đúng hợp lệ", () => {
    for (const key of expectedLessons) {
      const questions = LEADER_ARENA_LESSON_QUESTIONS[key];
      questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        const optionIds = q.options.map((o) => o.id);
        expect(optionIds).toContain(q.correctOptionId);

        // Kiểm tra không có dấu ngoặc lộ đáp án tiếng Việt
        q.options.forEach((opt) => {
          expect(opt.text).not.toMatch(/\([a-zA-ZÀ-ỹ\s,]+\)/);
          expect(opt.text).not.toContain(" / ");
        });

        // Kiểm tra misconception
        if (q.misconception) {
          expect(optionIds).toContain(q.misconception.baitOptionId);
          const baitOption = q.options.find((o) => o.id === q.misconception?.baitOptionId);
          expect(q.misconception.baitOptionText).toBe(`${baitOption?.label}. ${baitOption?.text}`);
          expect(q.misconception.diagnosticTitle).toBeDefined();
          expect(q.misconception.diagnosticTitle?.length).toBeGreaterThan(5);
        }
      });
    }
  });

  it("matchLeaderLessonKey nhận diện chính xác các định dạng tên bài học của LEADER", () => {
    expect(matchLeaderLessonKey("WEEK 1 - DAY 1 - WRITING")).toBe("WEEK 1 – DAY 1");
    expect(matchLeaderLessonKey("W1 - D2: Acoustic Chunking")).toBe("WEEK 1 – DAY 2");
    expect(matchLeaderLessonKey("WEEK 2 - DAY 3 - READING")).toBe("WEEK 2 – DAY 3");
    expect(matchLeaderLessonKey("L70-W04-D1")).toBe("WEEK 4 – DAY 1");
    expect(matchLeaderLessonKey("W10 - D3: Final Exam Simulation")).toBe("WEEK 10 – DAY 3");
  });
});
