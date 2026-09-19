import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { ArenaPinService } from "../../services/arena-pin.service.js";
import { ArenaRoomService } from "../../services/arena-room.service.js";

const prisma = new PrismaClient();

describe("🔑 PHASE 1: ROOM IDENTITY & SECURE PIN/TOKEN SPEC SUITE", () => {
  const pinService = new ArenaPinService(prisma);
  const roomService = new ArenaRoomService(prisma);

  const createdRoomIds: string[] = [];

  afterAll(async () => {
    if (createdRoomIds.length > 0) {
      await prisma.arenaRoom.deleteMany({
        where: { id: { in: createdRoomIds } },
      });
    }
    await prisma.$disconnect();
  });

  describe("1. PIN Format & Collision-Free Generation Invariants", () => {
    it("sinh mã PIN 6 chữ số ngẫu nhiên hợp lệ", () => {
      for (let i = 0; i < 50; i++) {
        const rawPin = pinService.generateRawPin();
        expect(rawPin).toMatch(/^\d{6}$/);
        const num = parseInt(rawPin, 10);
        expect(num).toBeGreaterThanOrEqual(100000);
        expect(num).toBeLessThanOrEqual(999999);
      }
    });

    it("generateUniqueActivePin() sinh PIN không va chạm với bất kỳ phòng nào đang active", async () => {
      // Tạo một phòng với PIN cụ thể
      const pinnedPin = "777888";
      const room = await prisma.arenaRoom.create({
        data: {
          pin: pinnedPin,
          hostTokenHash: "mock_hash_pin_collision",
          status: "LOBBY",
        },
      });
      createdRoomIds.push(room.id);

      // Sinh 5 mã PIN duy nhất liên tiếp -> Đảm bảo không mã nào trùng với pinnedPin
      for (let i = 0; i < 5; i++) {
        const uniquePin = await pinService.generateUniqueActivePin();
        expect(uniquePin).not.toBe(pinnedPin);
        expect(uniquePin).toMatch(/^\d{6}$/);
      }
    }, 30000);
  });

  describe("2. Host Token Security Invariants (CSPRNG, Hashing & Nonce)", () => {
    it("sinh hostToken dạng CSPRNG 64 ký tự hex ngẫu nhiên", () => {
      const token1 = pinService.generateHostToken();
      const token2 = pinService.generateHostToken();

      expect(token1).toHaveLength(64);
      expect(token2).toHaveLength(64);
      expect(token1).not.toBe(token2);
    });

    it("băm hostToken bằng SHA-256 chính xác và verify đúng bằng timing-safe check", () => {
      const token = pinService.generateHostToken();
      const hash = pinService.hashHostToken(token);

      expect(hash).toHaveLength(64);
      expect(hash).not.toBe(token);

      // Verify đúng token
      expect(pinService.verifyHostToken(token, hash)).toBe(true);

      // Verify sai token
      expect(pinService.verifyHostToken("wrong_token_value_0000000000000000000000000000000000000000000000", hash)).toBe(false);
    });
  });

  describe("3. ArenaRoomService Room Creation Invariant", () => {
    it("tạo phòng thành công: trả về plaintext hostToken duy nhất 1 lần và chỉ lưu hash vào DB", async () => {
      const result = await roomService.createRoom({
        config: { gameMode: "GOLD_QUEST" },
      });

      createdRoomIds.push(result.roomId);

      expect(result.roomId).toBeDefined();
      expect(result.pin).toMatch(/^\d{6}$/);
      expect(result.hostToken).toHaveLength(64);
      expect(result.status).toBe("LOBBY");

      // Kiểm tra trong database: KHÔNG ĐƯỢC chứa plaintext hostToken
      const storedRoom = await prisma.arenaRoom.findUnique({
        where: { id: result.roomId },
      });

      expect(storedRoom).not.toBeNull();
      expect(storedRoom!.pin).toBe(result.pin);
      expect(storedRoom!.hostTokenHash).not.toBe(result.hostToken);
      expect(storedRoom!.hostTokenHash).toHaveLength(64);

      // Hash trong DB phải tương thích với hostToken trả về
      const isValid = pinService.verifyHostToken(result.hostToken, storedRoom!.hostTokenHash);
      expect(isValid).toBe(true);
    });

    it("getRoomByPin() tìm đúng phòng active và KHÔNG rò rỉ hostTokenHash", async () => {
      const result = await roomService.createRoom({});
      createdRoomIds.push(result.roomId);

      const fetched = await roomService.getRoomByPin(result.pin);
      expect(fetched).not.toBeNull();
      expect(fetched!.id).toBe(result.roomId);
      expect(fetched!.pin).toBe(result.pin);
      expect(fetched!.status).toBe("LOBBY");
      // @ts-expect-error hostTokenHash should be omitted by select
      expect(fetched!.hostTokenHash).toBeUndefined();
    });
  });
});
