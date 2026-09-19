import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ArenaRoomService } from "../../services/arena-room.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";
import { ARENA_STANDARD_QUESTIONS } from "../../services/arena-questions.data.js";

const prisma = new PrismaClient();

describe("👑 PHASE 5: HOST OWNERSHIP RECLAIM & SNAPSHOT RECOVERY SPEC SUITE", () => {
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

  describe("1. Host Ownership Verification", () => {
    it("từ chối khôi phục snapshot nếu hostToken không đúng (chống cướp quyền Host)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      await expect(
        engineService.reclaimHostSnapshot(room.pin, "wrong_attacker_token_abc")
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "INVALID_HOST_TOKEN",
      });
    });

    it("chấp nhận khôi phục snapshot nếu cung cấp đúng hostToken", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const snapshot = await engineService.reclaimHostSnapshot(room.pin, room.hostToken);

      expect(snapshot.roomId).toBe(room.roomId);
      expect(snapshot.pin).toBe(room.pin);
      expect(snapshot.status).toBe("LOBBY");
      expect(Array.isArray(snapshot.participants)).toBe(true);
      expect(snapshot.participants.length).toBe(0);
    });
  });

  describe("2. Full State Snapshot Rehydration after Refresh (F5)", () => {
    it("khôi phục chính xác vòng thi, câu hỏi hiện tại, danh sách học sinh và điểm số", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // 2 học sinh tham gia phòng
      const p1 = await roomService.joinRoom({ pin: room.pin, nickname: "Bảo Trâm" });
      const p2 = await roomService.joinRoom({ pin: room.pin, nickname: "Anh Quân" });

      // Host bấm START_ARENA
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      const q0 = ARENA_STANDARD_QUESTIONS[0];

      // P1 nộp đáp án đúng
      await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p1.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: q0.correctOptionId,
      });

      // P2 nộp đáp án sai
      const wrongOpt = q0.options.find((opt) => opt.id !== q0.correctOptionId)!.id;
      await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p2.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: wrongOpt,
      });

      // Giả lập Host bị F5 / Mất mạng và gọi Reclaim Snapshot
      const recoveredSnapshot = await engineService.reclaimHostSnapshot(room.pin, room.hostToken);

      // Xác minh State Machine & Vòng hiện tại
      expect(recoveredSnapshot.status).toBe("QUESTION_LIVE");
      expect(recoveredSnapshot.currentRound).toBe(0);
      expect(recoveredSnapshot.currentQuestionId).toBe(q0.id);

      // Xác minh danh sách học sinh đã được nạp đầy đủ điểm số từ DB
      expect(recoveredSnapshot.participants.length).toBe(2);
      const recoveredP1 = recoveredSnapshot.participants.find((p) => p.nickname === "Bảo Trâm");
      const recoveredP2 = recoveredSnapshot.participants.find((p) => p.nickname === "Anh Quân");

      expect(recoveredP1).toBeDefined();
      expect(recoveredP1!.totalScore).toBeGreaterThanOrEqual(100);
      expect(recoveredP2).toBeDefined();
      expect(recoveredP2!.totalScore).toBe(0);

      // Xác minh đáp án của vòng hiện tại được khôi phục nguyên vẹn
      expect(recoveredSnapshot.currentRoundAnswers["Bảo Trâm"]).toBeDefined();
      expect(recoveredSnapshot.currentRoundAnswers["Bảo Trâm"].isCorrect).toBe(true);
      expect(recoveredSnapshot.currentRoundAnswers["Anh Quân"]).toBeDefined();
      expect(recoveredSnapshot.currentRoundAnswers["Anh Quân"].isCorrect).toBe(false);
    });
  });
});
