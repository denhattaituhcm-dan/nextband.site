import { describe, it, expect } from "vitest";
import { GRADE8_ARENA_LESSON_QUESTIONS, matchGrade8LessonKey } from "../../services/grade8-questions-bank.data.js";
import { ArenaBankService } from "../../services/arena-bank.service.js";
import { PrismaClient } from "@prisma/client";

describe("Grade 8 Arena Question Bank Quality & Integrity Tests", () => {
  const unit1Key = "UNIT 1 – LEISURE TIME";

  it("chứa đầy đủ 10 câu hỏi chuẩn hóa cho Unit 1: Leisure Time", () => {
    expect(GRADE8_ARENA_LESSON_QUESTIONS[unit1Key]).toBeDefined();
    expect(GRADE8_ARENA_LESSON_QUESTIONS[unit1Key].length).toBe(10);
  });

  it("mỗi câu hỏi đều có đúng 4 options A, B, C, D song song và đáp án đúng hợp lệ", () => {
    const questions = GRADE8_ARENA_LESSON_QUESTIONS[unit1Key];
    questions.forEach((q, idx) => {
      expect(q.options.length).toBe(4);
      const optionIds = q.options.map(o => o.id);
      expect(optionIds).toContain(q.correctOptionId);

      // Kiểm tra nhãn A, B, C, D
      expect(q.options.map(o => o.label)).toEqual(["A", "B", "C", "D"]);

      // Không chứa chú thích tiếng Việt trong options (chống lộ bài)
      q.options.forEach(opt => {
        expect(opt.text).not.toMatch(/\([a-zA-ZÀ-ỹ\s,]+\)/);
        expect(opt.text).not.toContain(" / ");
        expect(opt.text.trim().length).toBeGreaterThan(0);
      });

      // Kiểm tra giải thích
      expect(q.explanation || q.correctExplanation).toBeDefined();
      expect((q.explanation || q.correctExplanation).length).toBeGreaterThan(10);

      // Kiểm tra chuẩn hóa misconception
      expect(q.misconception).toBeDefined();
      expect(optionIds).toContain(q.misconception?.baitOptionId);
      const baitOption = q.options.find(o => o.id === q.misconception?.baitOptionId);
      expect(q.misconception?.baitOptionText).toBe(`${baitOption?.label}. ${baitOption?.text}`);
      expect(q.misconception?.diagnosticTitle).toBeDefined();
      expect(q.misconception?.diagnosticTitle?.length).toBeGreaterThan(5);
      expect(q.misconception?.explanation?.length).toBeGreaterThan(10);
    });
  });

  it("matchGrade8LessonKey nhận diện chính xác các định dạng tên bài học", () => {
    expect(matchGrade8LessonKey("Unit 1: Leisure Time")).toBe(unit1Key);
    expect(matchGrade8LessonKey("Unit 1 - Leisure Time")).toBe(unit1Key);
    expect(matchGrade8LessonKey("Unit 1")).toBe(unit1Key);
    expect(matchGrade8LessonKey("U1 - Leisure Time")).toBe(unit1Key);
    expect(matchGrade8LessonKey("U1")).toBe(unit1Key);
    expect(matchGrade8LessonKey("Đề kiểm tra Tiếng Anh 8 Unit 1")).toBe(unit1Key);
    expect(matchGrade8LessonKey("Trắc nghiệm Lớp 8 - Unit 1: Leisure Time")).toBe(unit1Key);
    expect(matchGrade8LessonKey("LEISURE TIME")).toBe(unit1Key);
    expect(matchGrade8LessonKey("Non-existent lesson")).toBeNull();
  });

  it("tích hợp thành công với ArenaBankService khi tra cứu theo examId", async () => {
    const prisma = new PrismaClient();
    try {
      const exam = await prisma.exam.findFirst({
        where: {
          title: { contains: "Unit 1", mode: "insensitive" },
          course: { title: { contains: "Lớp 8", mode: "insensitive" } }
        }
      });

      expect(exam).toBeDefined();
      if (!exam) return;

      const bankService = new ArenaBankService(prisma);

      // 1. Kiểm tra getQuestionsByLesson cho examId
      const lessonRes = await bankService.getQuestionsByLesson(null, exam.id);
      expect(lessonRes.questions.length).toBe(10);
      expect(lessonRes.lessonKey).toBe(unit1Key);

      // 2. Kiểm tra getQuestionsForRoom cho phòng thi đấu
      const roomQuestions = await bankService.getQuestionsForRoom(exam.id, "test_room_123");
      expect(roomQuestions.length).toBe(10);
      expect(roomQuestions[0].options.length).toBe(4);
      expect(roomQuestions[0].correctExplanation).toBeDefined();
    } finally {
      await prisma.$disconnect();
    }
  });
});
