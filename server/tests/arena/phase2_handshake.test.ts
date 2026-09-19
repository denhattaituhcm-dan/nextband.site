import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { ArenaRoomService } from "../../services/arena-room.service.js";

const prisma = new PrismaClient();

describe("🤝 PHASE 2: JOIN HANDSHAKE & SESSION ISSUANCE SPEC SUITE", () => {
  const roomService = new ArenaRoomService(prisma);
  const createdRoomIds: string[] = [];

  afterAll(async () => {
    if (createdRoomIds.length > 0) {
      await prisma.arenaAnswer.deleteMany({ where: { roomId: { in: createdRoomIds } } });
      await prisma.arenaParticipant.deleteMany({ where: { roomId: { in: createdRoomIds } } });
      await prisma.arenaRoom.deleteMany({ where: { id: { in: createdRoomIds } } });
    }
    await prisma.$disconnect();
  });

  describe("1. Pre-Join Validation & Handshake Invariants", () => {
    it("chặn việc tham gia khi mã PIN không tồn tại hoặc sai định dạng", async () => {
      // 1. PIN không đủ 6 chữ số
      await expect(
        roomService.joinRoom({ pin: "123", nickname: "Bảo Nam" })
      ).rejects.toMatchObject({
        statusCode: 400,
        code: "INVALID_PIN",
      });

      // 2. PIN 6 chữ số nhưng không tồn tại trên hệ thống
      await expect(
        roomService.joinRoom({ pin: "000000", nickname: "Bảo Nam" })
      ).rejects.toMatchObject({
        statusCode: 404,
        code: "ROOM_NOT_FOUND",
      });
    });

    it("chặn việc tham gia khi nickname rỗng hoặc chỉ toàn khoảng trắng", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      await expect(
        roomService.joinRoom({ pin: room.pin, nickname: "   " })
      ).rejects.toMatchObject({
        statusCode: 400,
        code: "INVALID_NICKNAME",
      });
    });

    it("chặn việc tham gia khi phòng thi đấu không ở trạng thái LOBBY (ví dụ: QUESTION_LIVE hoặc ENDED)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Chuyển phòng sang trạng thái QUESTION_LIVE
      await prisma.arenaRoom.update({
        where: { id: room.roomId },
        data: { status: "QUESTION_LIVE" },
      });

      await expect(
        roomService.joinRoom({ pin: room.pin, nickname: "Học Viên Muộn" })
      ).rejects.toMatchObject({
        statusCode: 403,
        code: "ROOM_NOT_IN_LOBBY",
      });
    });
  });

  describe("2. Participant Registration & Session Token Invariants", () => {
    it("cho phép học sinh tham gia phòng hợp lệ, cấp session token và lưu normalized_nickname", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const result = await roomService.joinRoom({
        pin: room.pin,
        nickname: "  Minh Triết  ",
        avatarId: 3,
      });

      expect(result.participantId).toBeDefined();
      expect(result.roomId).toBe(room.roomId);
      expect(result.pin).toBe(room.pin);
      expect(result.playerSessionToken).toMatch(/^s_[0-9a-f]{48}$/);
      expect(result.nickname).toBe("Minh Triết");
      expect(result.avatarId).toBe(3);
      expect(result.roomStatus).toBe("LOBBY");

      // Đối chiếu dữ liệu thực tế trong DB
      const stored = await prisma.arenaParticipant.findUnique({
        where: { id: result.participantId },
      });
      expect(stored).not.toBeNull();
      expect(stored!.normalizedNickname).toBe("minh triết");
      expect(stored!.playerSessionToken).toBe(result.playerSessionToken);
    });

    it("chặn việc đăng ký trùng tên trong cùng một phòng và trả về lỗi 409 DUPLICATE_NICKNAME", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Học sinh 1 đăng ký thành công
      await roomService.joinRoom({
        pin: room.pin,
        nickname: "Phương Anh",
      });

      // Học sinh 2 đăng ký cùng tên (kể cả khác chữ hoa/thường hoặc thừa khoảng trắng)
      await expect(
        roomService.joinRoom({
          pin: room.pin,
          nickname: "  phương anh  ",
        })
      ).rejects.toMatchObject({
        statusCode: 409,
        code: "DUPLICATE_NICKNAME",
      });
    });
  });
});
