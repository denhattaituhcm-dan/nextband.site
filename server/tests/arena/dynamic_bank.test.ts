import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ArenaRoomService } from "../../services/arena-room.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";
import { ArenaBankService } from "../../services/arena-bank.service.js";
import { ARENA_STANDARD_QUESTIONS } from "../../services/arena-questions.data.js";

const prisma = new PrismaClient();

describe("📚 DYNAMIC QUESTION BANK INTEGRATION SPEC SUITE", () => {
  const roomService = new ArenaRoomService(prisma);
  const engineService = new ArenaEngineService(prisma);
  const bankService = new ArenaBankService(prisma);
  const createdRoomIds: string[] = [];
  const createdExamIds: string[] = [];
  const createdCourseIds: string[] = [];

  afterAll(async () => {
    if (createdRoomIds.length > 0) {
      await prisma.arenaAnswer.deleteMany({ where: { roomId: { in: createdRoomIds } } });
      await prisma.arenaParticipant.deleteMany({ where: { roomId: { in: createdRoomIds } } });
      await prisma.arenaRoom.deleteMany({ where: { id: { in: createdRoomIds } } });
    }
    if (createdExamIds.length > 0) {
      await prisma.question.deleteMany({ where: { group: { section: { examId: { in: createdExamIds } } } } });
      await prisma.questionGroup.deleteMany({ where: { section: { examId: { in: createdExamIds } } } });
      await prisma.examSection.deleteMany({ where: { examId: { in: createdExamIds } } });
      await prisma.exam.deleteMany({ where: { id: { in: createdExamIds } } });
    }
    if (createdCourseIds.length > 0) {
      await prisma.course.deleteMany({ where: { id: { in: createdCourseIds } } });
    }
    await prisma.$disconnect();
  });

  it("tự động fallback sang 5 câu chuẩn khi phòng không gắn examId", async () => {
    const questions = await bankService.getQuestionsForRoom(null);
    expect(questions.length).toBe(ARENA_STANDARD_QUESTIONS.length);
    expect(questions[0].id).toBe(ARENA_STANDARD_QUESTIONS[0].id);
  });

  it("trích xuất và chuẩn hóa chính xác các câu hỏi trắc nghiệm từ Đề thi trong Database", async () => {
    // 1. Tạo khóa học mẫu và đề thi mẫu trong Database
    const course = await prisma.course.create({
      data: {
        title: "IELTS TEST COURSE " + Date.now(),
        slug: "test-course-" + Date.now(),
        level: "B2",
      },
    });
    createdCourseIds.push(course.id);

    const exam = await prisma.exam.create({
      data: {
        courseId: course.id,
        title: "Buổi #3 - Vocabulary & Reading Arena",
        durationMinutes: 45,
        sections: {
          create: {
            sectionType: "reading",
            title: "Reading Section 1",
            questionGroups: {
              create: {
                title: "Vocabulary Group",
                questions: {
                  create: [
                    {
                      questionText: "<p>The government planned to <b>allocate</b> resources effectively.</p>",
                      questionType: "multiple_choice",
                      options: [
                        "A. distribute",
                        "B. collect",
                        "C. waste",
                        "D. ignore",
                      ],
                      correctAnswer: "A. distribute",
                    },
                    {
                      questionText: "The report indicates environmental changes are permanent.",
                      questionType: "true_false_not_given",
                      options: ["", "", "", ""],
                      correctAnswer: "FALSE",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    });
    createdExamIds.push(exam.id);

    // 2. Kiểm tra bankService nạp đúng 2 câu từ exam
    const dynamicQuestions = await bankService.getQuestionsForRoom(exam.id);
    expect(dynamicQuestions.length).toBe(2);

    // Câu 1: multiple_choice -> 4 options A, B, C, D
    expect(dynamicQuestions[0].options.length).toBe(4);
    expect(dynamicQuestions[0].prompt).toBe("The government planned to allocate resources effectively.");
    expect(dynamicQuestions[0].options[0].text).toBe("distribute");
    expect(dynamicQuestions[0].correctOptionId).toBe("opt_A");

    // Câu 2: true_false_not_given -> 3 options TRUE, FALSE, NOT GIVEN
    expect(dynamicQuestions[1].options.length).toBe(3);
    expect(dynamicQuestions[1].correctOptionId).toBe("opt_B"); // B là FALSE

    // 3. Khởi tạo phòng đấu gắn trực tiếp với examId này
    const room = await roomService.createRoom({ examId: exam.id });
    createdRoomIds.push(room.roomId);

    // 4. Học sinh tham gia khi phòng đang ở LOBBY
    const student = await roomService.joinRoom({
      pin: room.pin,
      nickname: "Học Sinh Chăm Chỉ",
    });

    // 5. Host bắt đầu trận đấu và xác minh Engine nạp câu hỏi của bài học
    const startResult = await engineService.executeHostCommand({
      commandId: randomUUID(),
      action: "START_ARENA",
      pin: room.pin,
      hostToken: room.hostToken,
    });

    expect(startResult.status).toBe("QUESTION_LIVE");
    expect(startResult.totalQuestions).toBe(2);
    expect(startResult.question?.prompt).toBe("The government planned to allocate resources effectively.");

    // 6. Học sinh nộp đáp án đúng cho câu hỏi của bài học
    const submitResult = await engineService.submitAnswer({
      roomId: room.roomId,
      playerSessionToken: student.playerSessionToken,
      questionId: dynamicQuestions[0].id,
      roundIndex: 0,
      selectedOptionId: "opt_A",
    });

    expect(submitResult.isCorrect).toBe(true);
    expect(submitResult.scoreAwarded).toBeGreaterThanOrEqual(100);

    // 6. Host F5 Reclaim Snapshot khôi phục đúng câu hỏi và tổng số câu của bài học
    const snapshot = await engineService.reclaimHostSnapshot(room.pin, room.hostToken);
    expect(snapshot.totalQuestions).toBe(2);
    expect(snapshot.question?.id).toBe(dynamicQuestions[0].id);
  });
});
