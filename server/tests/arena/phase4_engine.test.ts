import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ArenaRoomService } from "../../services/arena-room.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";
import { ARENA_STANDARD_QUESTIONS } from "../../services/arena-questions.data.js";

const prisma = new PrismaClient();

describe("🎮 PHASE 4: SERVER-AUTHORITATIVE STATE MACHINE & SCORING SPEC SUITE", () => {
  const roomService = new ArenaRoomService(prisma);
  const engineService = new ArenaEngineService(prisma);
  const createdRoomIds: string[] = [];

  afterAll(async () => {
    if (createdRoomIds.length > 0) {
      await prisma.arenaAnswer.deleteMany({ where: { roomId: { in: createdRoomIds } } });
      await prisma.arenaParticipant.deleteMany({ where: { roomId: { in: createdRoomIds } } });
      await prisma.arenaRoom.deleteMany({ where: { id: { in: createdRoomIds } } });
    }
    await prisma.$disconnect();
  });

  describe("1. Host Command Idempotency & State Transition Guards", () => {
    it("chặn lệnh điều khiển nếu hostToken không hợp lệ", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      await expect(
        engineService.executeHostCommand({
          commandId: randomUUID(),
          action: "START_ARENA",
          pin: room.pin,
          hostToken: "fake_token_123",
        })
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "INVALID_HOST_TOKEN",
      });
    });

    it("chuyển trạng thái từ LOBBY sang QUESTION_LIVE khi nhận START_ARENA", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const commandId = randomUUID();
      const result = await engineService.executeHostCommand({
        commandId,
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      expect(result.idempotent).toBe(false);
      expect(result.status).toBe("QUESTION_LIVE");
      expect(result.currentRound).toBe(0);
      expect(result.question?.id).toBe(ARENA_STANDARD_QUESTIONS[0].id);

      // Thử gửi lại cùng commandId (mô phỏng retry mạng) -> Phải idempotent
      const retryResult = await engineService.executeHostCommand({
        commandId,
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      expect(retryResult.idempotent).toBe(true);
      expect(retryResult.status).toBe("QUESTION_LIVE");
    });

    it("từ chối START_ARENA lần thứ hai nếu phòng đã không còn ở LOBBY", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Lần 1: Thành công
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      // Lần 2 với commandId mới: Phải báo lỗi INVALID_STATE_TRANSITION
      await expect(
        engineService.executeHostCommand({
          commandId: randomUUID(),
          action: "START_ARENA",
          pin: room.pin,
          hostToken: room.hostToken,
        })
      ).rejects.toMatchObject({
        statusCode: 409,
        code: "INVALID_STATE_TRANSITION",
      });
    });
  });

  describe("2. Server-Authoritative Scoring & Deadline Guards", () => {
    it("cho phép học sinh hợp lệ nộp bài và server tính điểm chính xác", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Học sinh tham gia
      const p1 = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Minh Triết",
      });

      // Bắt đầu game
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      const q0 = ARENA_STANDARD_QUESTIONS[0];

      // Học sinh nộp đáp án ĐÚNG
      const submitResult = await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p1.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: q0.correctOptionId,
      });

      expect(submitResult.isCorrect).toBe(true);
      expect(submitResult.scoreAwarded).toBeGreaterThanOrEqual(100);
      expect(submitResult.totalScore).toBe(submitResult.scoreAwarded);

      // Kiểm tra DB participant score
      const participantInDb = await prisma.arenaParticipant.findUnique({
        where: { id: p1.participantId },
      });
      expect(participantInDb?.totalScore).toBe(submitResult.scoreAwarded);
    });

    it("chặn nộp bài kép (Duplicate submission rejection)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const p1 = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Ngọc Lan",
      });

      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      const q0 = ARENA_STANDARD_QUESTIONS[0];

      // Lần 1: Thành công
      await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p1.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: q0.correctOptionId,
      });

      // Lần 2: Phải nhận lỗi ALREADY_SUBMITTED
      await expect(
        engineService.submitAnswer({
          roomId: room.roomId,
          playerSessionToken: p1.playerSessionToken,
          questionId: q0.id,
          roundIndex: 0,
          selectedOptionId: q0.options[0].id,
        })
      ).rejects.toMatchObject({
        statusCode: 409,
        code: "ALREADY_SUBMITTED",
      });
    });

    it("từ chối bài nộp khi đã quá thời hạn (EXPIRED_SUBMISSION)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const p1 = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Huy Hoàng",
      });

      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      // Cố tình chỉnh deadline trong DB về quá khứ (cách đây 2 giây, vượt quá grace period 800ms)
      await prisma.arenaRoom.update({
        where: { id: room.roomId },
        data: {
          roundDeadlineAt: new Date(Date.now() - 2000),
        },
      });

      const q0 = ARENA_STANDARD_QUESTIONS[0];

      await expect(
        engineService.submitAnswer({
          roomId: room.roomId,
          playerSessionToken: p1.playerSessionToken,
          questionId: q0.id,
          roundIndex: 0,
          selectedOptionId: q0.correctOptionId,
        })
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "EXPIRED_SUBMISSION",
      });
    });

    it("nhân đôi điểm (x2) chính xác cho câu cuối cùng ở chế độ CLASSIC", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const p1 = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Thanh Hằng",
      });

      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
        gameMode: "CLASSIC",
      });

      const totalQuestions = ARENA_STANDARD_QUESTIONS.length;
      const lastIndex = totalQuestions - 1;
      const lastQ = ARENA_STANDARD_QUESTIONS[lastIndex];

      // Đặt phòng sang câu hỏi cuối cùng
      await prisma.arenaRoom.update({
        where: { id: room.roomId },
        data: {
          currentRound: lastIndex,
          currentQuestionId: lastQ.id,
          roundDeadlineAt: new Date(Date.now() + 15000),
        },
      });

      const submitResult = await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p1.playerSessionToken,
        questionId: lastQ.id,
        roundIndex: lastIndex,
        selectedOptionId: lastQ.correctOptionId,
      });

      expect(submitResult.isCorrect).toBe(true);
      // Base score tối thiểu 100, nhân đôi x2 phải >= 200
      expect(submitResult.scoreAwarded).toBeGreaterThanOrEqual(200);
      expect(submitResult.totalScore).toBe(submitResult.scoreAwarded);
    });

    it("KHÔNG nhân đôi điểm câu cuối khi ở chế độ GOLD_QUEST", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const p1 = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Quốc Anh",
      });

      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
        gameMode: "GOLD_QUEST",
      });

      const totalQuestions = ARENA_STANDARD_QUESTIONS.length;
      const lastIndex = totalQuestions - 1;
      const lastQ = ARENA_STANDARD_QUESTIONS[lastIndex];

      // Đặt phòng sang câu hỏi cuối cùng với 1s còn lại để baseScore ~ 110
      await prisma.arenaRoom.update({
        where: { id: room.roomId },
        data: {
          currentRound: lastIndex,
          currentQuestionId: lastQ.id,
          roundDeadlineAt: new Date(Date.now() + 1000),
        },
      });

      const submitResult = await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p1.playerSessionToken,
        questionId: lastQ.id,
        roundIndex: lastIndex,
        selectedOptionId: lastQ.correctOptionId,
      });

      expect(submitResult.isCorrect).toBe(true);
      // Base score khi còn 1s là 110. Vì GOLD_QUEST không x2 nên scoreAwarded < 150
      expect(submitResult.scoreAwarded).toBeLessThan(150);
    });
  });
});
