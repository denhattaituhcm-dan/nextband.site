import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ArenaRoomService } from "../../services/arena-room.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";

const prisma = new PrismaClient();

describe("🚫 PHASE 6: STRICT LATE-JOIN POLICY SPEC SUITE", () => {
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

  describe("1. Enforce Late-Join Invariant", () => {
    it("cho phép học sinh tham gia khi phòng đang ở Sảnh chờ (LOBBY)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const res = await roomService.joinRoom({
        pin: room.pin,
        nickname: "Học Sinh Đúng Giờ",
      });

      expect(res.participantId).toBeDefined();
      expect(res.nickname).toBe("Học Sinh Đúng Giờ");
      expect(res.roomStatus).toBe("LOBBY");
    });

    it("chặn tuyệt đối học sinh tham gia khi phòng đã bắt đầu thi đấu (QUESTION_LIVE)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Host bắt đầu trận đấu
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      // Học sinh đến muộn cố gắng join
      await expect(
        roomService.joinRoom({
          pin: room.pin,
          nickname: "Học Sinh Đến Muộn 1",
        })
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "ROOM_NOT_IN_LOBBY",
      });
    });

    it("chặn tuyệt đối học sinh tham gia khi phòng đã khóa vòng (ROUND_LOCKED) hoặc đang công bố đáp án (ROUND_REVEAL)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Chuyển sang ROUND_LOCKED
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "LOCK_ROUND",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      await expect(
        roomService.joinRoom({
          pin: room.pin,
          nickname: "Học Sinh Đến Muộn 2",
        })
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "ROOM_NOT_IN_LOBBY",
      });
    });

    it("chặn tuyệt đối học sinh tham gia khi phòng đã kết thúc (PODIUM hoặc ENDED)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Chuyển sang PODIUM
      await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "FINISH_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      await expect(
        roomService.joinRoom({
          pin: room.pin,
          nickname: "Học Sinh Đến Sau Trận",
        })
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "ROOM_NOT_IN_LOBBY",
      });
    });
  });
});
