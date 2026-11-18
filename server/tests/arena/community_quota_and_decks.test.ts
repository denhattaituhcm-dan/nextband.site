import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import {
  ArenaRoomService,
  MAX_CONCURRENT_COMMUNITY_ROOMS,
  MAX_COMMUNITY_PLAYERS_PER_ROOM,
} from "../../services/arena-room.service.js";
import { ArenaBankService } from "../../services/arena-bank.service.js";
import { ArenaEngineService } from "../../services/arena-engine.service.js";
import { ARENA_STANDARD_QUESTIONS } from "../../services/arena-questions.data.js";

const prisma = new PrismaClient();

describe("🌐 COMMUNITY ARENA QUOTA, VIP LANE, EXPIRY & TOPIC DECKS SPEC SUITE", () => {
  const roomService = new ArenaRoomService(prisma);
  const bankService = new ArenaBankService(prisma);
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

  describe("1. Topic Decks & Deterministic Seeding", () => {
    it("giữ tương thích ngược 5 câu chuẩn khi không truyền topicKey", async () => {
      const questions = await bankService.getQuestionsForRoom(null, "111222");
      expect(questions.length).toBe(ARENA_STANDARD_QUESTIONS.length);
      expect(questions[0].id).toBe(ARENA_STANDARD_QUESTIONS[0].id);
    });

    it("sinh đúng 10 câu không trùng lặp và tất định theo mã PIN cho cả 4 chủ đề", async () => {
      const topics = ["RANDOM_MIX", "COLLOCATION", "FOUNDATION_DOER", "MASTER_ACADEMIC"] as const;

      for (const topic of topics) {
        const deckA1 = await bankService.getQuestionsForRoom(null, "445566", topic);
        const deckA2 = await bankService.getQuestionsForRoom(null, "445566", topic);
        const deckB = await bankService.getQuestionsForRoom(null, "778899", topic);

        expect(deckA1.length).toBe(10);
        expect(deckA1.map((q) => q.roundIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // Deterministic cho cùng mã PIN
        expect(deckA1.map((q) => q.id)).toEqual(deckA2.map((q) => q.id));

        // Không trùng prompt trong cùng ván đấu
        const uniquePrompts = new Set(deckA1.map((q) => q.prompt.trim().toLowerCase()));
        expect(uniquePrompts.size).toBe(10);

        // Khác PIN -> khác bộ đề/trật tự
        const sameOrder = deckA1.every((q, idx) => q.id === deckB[idx]?.id);
        expect(sameOrder).toBe(false);
      }
    });

    it("engine nạp đúng bộ 10 câu của topicKey khi tạo phòng Cộng đồng và chạy lệnh START_ARENA", async () => {
      const room = await roomService.createRoom({
        clientIp: "198.51.100.10",
        isCommunityRoom: true,
        config: {
          roomTitle: "Phòng Collocation Test",
          hostNickname: "Minh",
          topicKey: "COLLOCATION",
          isPublic: false,
        },
      });
      createdRoomIds.push(room.roomId);

      // Không rò rỉ creatorIp ra ngoài
      expect((room.config as any).creatorIp).toBeUndefined();

      const startRes = await engineService.executeHostCommand({
        commandId: randomUUID(),
        action: "START_ARENA",
        pin: room.pin,
        hostToken: room.hostToken,
      });

      expect(startRes.totalQuestions).toBe(10);
      expect(startRes.question).not.toBeNull();
    });
  });

  describe("2. Community Player Cap & Public Lobby", () => {
    it("chặn người chơi vượt quá maxPlayers của phòng (403 ROOM_FULL) và không liệt kê phòng kín lên sảnh công khai", async () => {
      const privateRoom = await roomService.createRoom({
        clientIp: "198.51.100.20",
        isCommunityRoom: true,
        config: {
          roomTitle: "Phòng Kín 2 Người",
          hostNickname: "HostK",
          isPublic: false,
          maxPlayers: 2,
        },
      });
      createdRoomIds.push(privateRoom.roomId);

      const publicRoom = await roomService.createRoom({
        clientIp: "198.51.100.21",
        isCommunityRoom: true,
        config: {
          roomTitle: "Phòng Công Khai Test",
          hostNickname: "HostP",
          isPublic: true,
          topicKey: "RANDOM_MIX",
          maxPlayers: 20,
        },
      });
      createdRoomIds.push(publicRoom.roomId);

      // Kiểm tra sảnh công khai chỉ thấy publicRoom, không thấy privateRoom
      const lobby = await roomService.getPublicLobbyRooms();
      expect(lobby.rooms.some((r) => r.pin === publicRoom.pin)).toBe(true);
      expect(lobby.rooms.some((r) => r.pin === privateRoom.pin)).toBe(false);

      // Tham gia 2 người vào phòng maxPlayers=2
      await roomService.joinRoom({ pin: privateRoom.pin, nickname: "Người 1" });
      await roomService.joinRoom({ pin: privateRoom.pin, nickname: "Người 2" });

      // Trùng tên vẫn trả 409
      await expect(
        roomService.joinRoom({ pin: privateRoom.pin, nickname: "Người 1" })
      ).rejects.toMatchObject({ statusCode: 409, code: "DUPLICATE_NICKNAME" });

      // Người thứ 3 bị chặn 403 ROOM_FULL
      await expect(
        roomService.joinRoom({ pin: privateRoom.pin, nickname: "Người 3" })
      ).rejects.toMatchObject({ statusCode: 403, code: "ROOM_FULL" });

      // Đóng cả 2 phòng để giải phóng slot
      await roomService.closeRoom({ pin: privateRoom.pin, hostToken: privateRoom.hostToken });
      await roomService.closeRoom({ pin: publicRoom.pin, hostToken: publicRoom.hostToken });
    });

    it("tự động đóng phòng cũ nếu cùng 1 clientIp tạo phòng mới (1 user/IP = 1 phòng)", async () => {
      const ip = "198.51.100.30";
      const room1 = await roomService.createRoom({
        clientIp: ip,
        isCommunityRoom: true,
        config: { roomTitle: "Phòng 1", isPublic: false },
      });
      createdRoomIds.push(room1.roomId);

      const room2 = await roomService.createRoom({
        clientIp: ip,
        isCommunityRoom: true,
        config: { roomTitle: "Phòng 2", isPublic: false },
      });
      createdRoomIds.push(room2.roomId);

      // Phòng 1 phải đã bị tự động đóng thành ENDED
      const storedRoom1 = await prisma.arenaRoom.findUnique({ where: { id: room1.roomId } });
      expect(storedRoom1?.status).toBe("ENDED");

      // Phòng 2 vẫn active
      const storedRoom2 = await prisma.arenaRoom.findUnique({ where: { id: room2.roomId } });
      expect(storedRoom2?.status).toBe("LOBBY");

      await roomService.closeRoom({ pin: room2.pin, hostToken: room2.hostToken });
    });

    it("từ chối closeRoom nếu sai hostToken và đóng phòng hợp lệ khi đúng hostToken", async () => {
      const room = await roomService.createRoom({
        clientIp: "198.51.100.31",
        isCommunityRoom: true,
        config: { isPublic: false },
      });
      createdRoomIds.push(room.roomId);

      await expect(
        roomService.closeRoom({ pin: room.pin, hostToken: "invalid_token" })
      ).rejects.toMatchObject({ statusCode: 403, code: "INVALID_HOST_TOKEN" });

      const closed = await roomService.closeRoom({ pin: room.pin, hostToken: room.hostToken });
      expect(closed.success).toBe(true);
      expect(closed.status).toBe("ENDED");
    });
  });

  describe("3. 20-Room Community Quota, VIP Priority Lane & Lazy Expiry Sweep", () => {
    it("chặn khi chạm trần 20 phòng Cộng đồng (429), ưu tiên VIP Giáo viên vẫn mở được, và giải phóng slot sau khi hết hạn/đóng phòng", async () => {
      const initialLobby = await roomService.getPublicLobbyRooms();
      const slotsToFill = initialLobby.capacity.availableCommunitySlots;
      const batchRooms: Array<{ roomId: string; pin: string; hostToken: string }> = [];

      // Lấp đầy tới trần 20 phòng cộng đồng
      for (let i = 0; i < slotsToFill; i++) {
        const r = await roomService.createRoom({
          clientIp: `203.0.113.${i + 1}`,
          isCommunityRoom: true,
          config: {
            roomTitle: `Quota Test #${i + 1}`,
            isPublic: false,
            maxPlayers: MAX_COMMUNITY_PLAYERS_PER_ROOM,
          },
        });
        createdRoomIds.push(r.roomId);
        batchRooms.push({ roomId: r.roomId, pin: r.pin, hostToken: r.hostToken });
      }

      const fullLobby = await roomService.getPublicLobbyRooms();
      expect(fullLobby.capacity.activeCommunityRooms).toBe(MAX_CONCURRENT_COMMUNITY_ROOMS);
      expect(fullLobby.capacity.availableCommunitySlots).toBe(0);

      // Phòng cộng đồng thứ 21 phải bị chặn 429 ARENA_CAPACITY_REACHED
      await expect(
        roomService.createRoom({
          clientIp: "203.0.113.250",
          isCommunityRoom: true,
          config: { isPublic: false },
        })
      ).rejects.toMatchObject({
        statusCode: 429,
        code: "ARENA_CAPACITY_REACHED",
      });

      // Luồng VIP (Giáo viên / Admin) KHÔNG bị chặn dù sảnh cộng đồng đã 20/20
      const vipRoom = await roomService.createRoom({
        hostRoles: ["teacher"],
        config: { roomTitle: "Lớp IELTS VIP" },
      });
      createdRoomIds.push(vipRoom.roomId);
      expect(vipRoom.pin).toMatch(/^\d{6}$/);
      expect((vipRoom.config as any).isVipRoom).toBe(true);

      // Giả lập 1 phòng cộng đồng hết hạn -> Lazy sweep tự thu hồi slot cho người chơi mới
      if (batchRooms.length > 0) {
        const expiredTarget = batchRooms[0];
        await prisma.arenaRoom.update({
          where: { id: expiredTarget.roomId },
          data: { expiresAt: new Date(Date.now() - 60_000) },
        });

        const reclaimedRoom = await roomService.createRoom({
          clientIp: "203.0.113.251",
          isCommunityRoom: true,
          config: { isPublic: false },
        });
        createdRoomIds.push(reclaimedRoom.roomId);
        expect(reclaimedRoom.pin).toMatch(/^\d{6}$/);

        // Dọn dẹp nhanh các phòng trong batch
        await prisma.arenaRoom.updateMany({
          where: { id: { in: [reclaimedRoom.roomId, vipRoom.roomId, ...batchRooms.map((b) => b.roomId)] } },
          data: { status: "ENDED" },
        });
      }
    }, 60000);
  });
});
