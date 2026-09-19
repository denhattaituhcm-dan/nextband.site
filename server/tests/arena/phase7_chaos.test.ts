import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ArenaRoomService } from "../../services/arena-room.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";
import { ARENA_STANDARD_QUESTIONS } from "../../services/arena-questions.data.js";

const prisma = new PrismaClient();

describe("🌪️ PHASE 7: CONCURRENCY & CHAOS SPEC SUITE", () => {
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

  describe("1. Burst Concurrent Joins (Race Condition on Nickname & Slots)", () => {
    it("chấp nhận đúng 1 học sinh khi 5 request đồng thời gửi cùng 1 nickname trong cùng 1 tick", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const targetNickname = "Thần Đồng IELTS";

      // 5 concurrent join requests cùng 1 nickname
      const promises = Array.from({ length: 5 }).map(() =>
        roomService.joinRoom({
          pin: room.pin,
          nickname: targetNickname,
        }).then(
          (res) => ({ success: true, data: res }),
          (err) => ({ success: false, code: err.code, statusCode: err.statusCode })
        )
      );

      const results: any[] = await Promise.all(promises);

      const successes = results.filter((r) => r.success);
      const conflicts = results.filter((r) => !r.success && r.code === "DUPLICATE_NICKNAME");

      // Invariant: Đúng 1 request thắng, 4 request còn lại nhận 409 DUPLICATE_NICKNAME
      expect(successes.length).toBe(1);
      expect(conflicts.length).toBe(4);

      // Invariant: Trong DB chỉ có đúng 1 record
      const count = await prisma.arenaParticipant.count({
        where: { roomId: room.roomId, normalizedNickname: targetNickname.toLowerCase() },
      });
      expect(count).toBe(1);
    });
  });

  describe("2. Simultaneous Submissions & Duplicate Submissions Chaos", () => {
    it("xử lý an toàn khi 1 học sinh bấm nộp bài dồn dập (Burst Submissions) cùng 1 lúc", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const player = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Nguyễn Văn Chớp Nhoáng",
      });

      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      const q0 = ARENA_STANDARD_QUESTIONS[0];

      // Gửi 5 lượt nộp cùng lúc với cùng 1 session token
      const answerPromises = Array.from({ length: 5 }).map(() =>
        engineService.submitAnswer({
          roomId: room.roomId,
          playerSessionToken: player.playerSessionToken,
          questionId: q0.id,
          roundIndex: 0,
          selectedOptionId: q0.correctOptionId,
        }).then(
          (res) => ({ success: true, data: res }),
          (err) => ({ success: false, code: err.code, statusCode: err.statusCode })
        )
      );

      const answerResults: any[] = await Promise.all(answerPromises);

      const accepted = answerResults.filter((r) => r.success);
      const rejected = answerResults.filter((r) => !r.success && r.code === "ALREADY_SUBMITTED");

      // Invariant: Chỉ 1 lượt nộp được ghi nhận vào DB
      expect(accepted.length).toBe(1);
      expect(rejected.length).toBe(4);

      // Điểm học sinh chỉ được cộng đúng 1 lần
      const participantInDb = await prisma.arenaParticipant.findUnique({
        where: { id: player.participantId },
      });
      expect(participantInDb?.totalScore).toBe(accepted[0].data.scoreAwarded);
    });
  });

  describe("3. Host Disconnect & Reconnect Continuity (Chaos Recovery)", () => {
    it("giữ nguyên toàn vẹn dữ liệu điểm số khi Host disconnect và reconnect giữa trận", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // 3 học sinh tham gia
      const p1 = await roomService.joinRoom({ pin: room.pin, nickname: "Học Viên A" });
      const p2 = await roomService.joinRoom({ pin: room.pin, nickname: "Học Viên B" });
      const p3 = await roomService.joinRoom({ pin: room.pin, nickname: "Học Viên C" });

      // Host start
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      const q0 = ARENA_STANDARD_QUESTIONS[0];

      // Cả 3 học sinh nộp bài
      await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p1.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: q0.correctOptionId,
      });
      await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p2.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: q0.correctOptionId,
      });
      await engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p3.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: q0.options.find((o) => o.id !== q0.correctOptionId)!.id,
      });

      // Giả lập Host mất mạng trong 5 giây (Host disconnect)
      // Khi Host bật lại trình duyệt và gọi reclaimHostSnapshot:
      const snapshot = await engineService.reclaimHostSnapshot(room.pin, room.hostToken);

      expect(snapshot.status).toBe("QUESTION_LIVE");
      expect(snapshot.participants.length).toBe(3);
      expect(Object.keys(snapshot.currentRoundAnswers).length).toBe(3);
      expect(snapshot.currentRoundAnswers["Học Viên A"].isCorrect).toBe(true);
      expect(snapshot.currentRoundAnswers["Học Viên B"].isCorrect).toBe(true);
      expect(snapshot.currentRoundAnswers["Học Viên C"].isCorrect).toBe(false);
    });
  });
});
