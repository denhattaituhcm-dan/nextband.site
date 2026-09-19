import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ArenaRoomService } from "../../services/arena-room.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";
import { ARENA_STANDARD_QUESTIONS } from "../../services/arena-questions.data.js";

const prisma = new PrismaClient();

describe("🏆 PHASE 8: 20-STUDENT FULL END-TO-END SIMULATION SPEC SUITE", () => {
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

  it("mô phỏng trọn vẹn vòng đời lớp học 20 học sinh: Mở phòng -> 20 HS tham gia -> Bắt đầu -> Nộp bài -> Bảng xếp hạng", async () => {
    // 1. Giáo viên mở phòng (LOBBY)
    const room = await roomService.createRoom({});
    createdRoomIds.push(room.roomId);

    expect(room.pin).toMatch(/^\d{6}$/);
    expect(room.status).toBe("LOBBY");

    // 2. 20 học sinh tuần tự/đồng thời bắt tay tham gia phòng
    const STUDENT_COUNT = 20;
    const studentNames = Array.from({ length: STUDENT_COUNT }, (_, i) => `Học Viên ${i + 1}`);

    const joinPromises = studentNames.map((name, i) =>
      roomService.joinRoom({
        pin: room.pin,
        nickname: name,
        avatarId: i % 10,
      })
    );

    const joinedParticipants = await Promise.all(joinPromises);

    // Xác minh toàn bộ 20 học sinh đều nhận session token hợp lệ
    expect(joinedParticipants.length).toBe(STUDENT_COUNT);
    joinedParticipants.forEach((p, idx) => {
      expect(p.nickname).toBe(studentNames[idx]);
      expect(p.playerSessionToken).toMatch(/^s_[a-f0-9]{48}$/);
      expect(p.roomStatus).toBe("LOBBY");
    });

    // Xác minh DB lưu trữ chính xác 20 participants
    const dbParticipantsCount = await prisma.arenaParticipant.count({
      where: { roomId: room.roomId },
    });
    expect(dbParticipantsCount).toBe(STUDENT_COUNT);

    // 3. Giáo viên bấm START_ARENA
    const startResult = await engineService.executeHostCommand({
      commandId: randomUUID(),
      action: "START_ARENA",
      pin: room.pin,
      hostToken: room.hostToken,
    });

    expect(startResult.status).toBe("QUESTION_LIVE");
    expect(startResult.currentRound).toBe(0);

    const q0 = ARENA_STANDARD_QUESTIONS[0];

    // 4. 20 học sinh đồng loạt nộp bài trong thời gian quy định
    // Trong đó: 15 học sinh chọn ĐÚNG, 5 học sinh chọn SAI
    const submitPromises = joinedParticipants.map((p, idx) => {
      const isPickCorrect = idx < 15;
      const chosenOptionId = isPickCorrect
        ? q0.correctOptionId
        : q0.options.find((o) => o.id !== q0.correctOptionId)!.id;

      return engineService.submitAnswer({
        roomId: room.roomId,
        playerSessionToken: p.playerSessionToken,
        questionId: q0.id,
        roundIndex: 0,
        selectedOptionId: chosenOptionId,
      });
    });

    const submitResults = await Promise.all(submitPromises);
    expect(submitResults.length).toBe(STUDENT_COUNT);

    const correctCount = submitResults.filter((r) => r.isCorrect).length;
    const wrongCount = submitResults.filter((r) => !r.isCorrect).length;

    expect(correctCount).toBe(15);
    expect(wrongCount).toBe(5);

    // 5. Giáo viên khóa vòng thi (LOCK_ROUND)
    const lockResult = await engineService.executeHostCommand({
      commandId: randomUUID(),
      action: "LOCK_ROUND",
      pin: room.pin,
      hostToken: room.hostToken,
    });
    expect(lockResult.status).toBe("ROUND_LOCKED");

    // 6. Giáo viên công bố đáp án (REVEAL_DISTRIBUTION)
    const revealResult = await engineService.executeHostCommand({
      commandId: randomUUID(),
      action: "REVEAL_DISTRIBUTION",
      pin: room.pin,
      hostToken: room.hostToken,
    });
    expect(revealResult.status).toBe("ROUND_REVEAL");

    // 7. Giáo viên mở Bảng xếp hạng (SHOW_LEADERBOARD)
    const leaderboardResult = await engineService.executeHostCommand({
      commandId: randomUUID(),
      action: "SHOW_LEADERBOARD",
      pin: room.pin,
      hostToken: room.hostToken,
    });
    expect(leaderboardResult.status).toBe("LEADERBOARD");

    // 8. Thẩm định Snapshot Bảng xếp hạng của Host
    const snapshot = await engineService.reclaimHostSnapshot(room.pin, room.hostToken);
    expect(snapshot.status).toBe("LEADERBOARD");
    expect(snapshot.participants.length).toBe(20);

    // 15 học sinh điểm > 0 được xếp trên top, 5 học sinh điểm 0 ở phía dưới
    const topScorers = snapshot.participants.filter((p) => p.totalScore > 0);
    const zeroScorers = snapshot.participants.filter((p) => p.totalScore === 0);

    expect(topScorers.length).toBe(15);
    expect(zeroScorers.length).toBe(5);

    // 9. Giáo viên trao giải và kết thúc trận (FINISH_ARENA)
    const finishResult = await engineService.executeHostCommand({
      commandId: randomUUID(),
      action: "FINISH_ARENA",
      pin: room.pin,
      hostToken: room.hostToken,
    });
    expect(finishResult.status).toBe("PODIUM");
  });
});
