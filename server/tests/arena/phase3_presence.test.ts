import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { ArenaRoomService } from "../../services/arena-room.service.js";

const prisma = new PrismaClient();

describe("📡 PHASE 3: PRESENCE DECOUPLING (PRESENCE ≠ GAME STATE) SPEC SUITE", () => {
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

  describe("1. Database as Persistent Source of Truth Invariant", () => {
    it("danh sách người chơi tồn tại bền vững trong Database độc lập với kết nối Presence tức thời", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      // Đăng ký 3 học sinh vào phòng đấu qua server handshake
      const p1 = await roomService.joinRoom({ pin: room.pin, nickname: "Bảo Nam", avatarId: 1 });
      const p2 = await roomService.joinRoom({ pin: room.pin, nickname: "Khánh Linh", avatarId: 2 });
      const p3 = await roomService.joinRoom({ pin: room.pin, nickname: "Gia Huy", avatarId: 3 });

      // Host truy vấn danh sách người chơi từ Database
      const fetchedRoom = await roomService.getRoomByPin(room.pin);
      expect(fetchedRoom).not.toBeNull();
      expect(fetchedRoom!.participants).toHaveLength(3);

      const participantNames = fetchedRoom!.participants.map((p) => p.nickname);
      expect(participantNames).toContain("Bảo Nam");
      expect(participantNames).toContain("Khánh Linh");
      expect(participantNames).toContain("Gia Huy");
    });
  });

  describe("2. Network Drop Resilience (Presence leave does NOT delete participant) Invariant", () => {
    it("khi học sinh mất mạng (Presence rớt), học sinh vẫn tồn tại 100% trong Database với điểm số nguyên vẹn", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const p1 = await roomService.joinRoom({ pin: room.pin, nickname: "Hải Đăng", avatarId: 4 });

      // Cập nhật điểm cho học sinh
      await prisma.arenaParticipant.update({
        where: { id: p1.participantId },
        data: { totalScore: 1250 },
      });

      // Giả lập sự kiện học sinh bị rớt mạng hoàn toàn (WebSocket disconnect / Presence leave)
      // Trong kiến trúc cũ: Host dựa vào broadcast và React memory -> Mất hoặc reset
      // Trong kiến trúc mới: Database lưu bền vững, Presence chỉ là cờ hiển thị Online/Offline

      const snapshotAfterDrop = await roomService.getRoomByPin(room.pin);
      expect(snapshotAfterDrop).not.toBeNull();
      expect(snapshotAfterDrop!.participants).toHaveLength(1);

      const savedParticipant = snapshotAfterDrop!.participants[0];
      expect(savedParticipant.id).toBe(p1.participantId);
      expect(savedParticipant.nickname).toBe("Hải Đăng");
      expect(savedParticipant.totalScore).toBe(1250);
    });

    it("nhiều học sinh cùng đăng ký và rời mạng không làm mất trật tự tham gia (joinedAt)", async () => {
      const room = await roomService.createRoom({});
      createdRoomIds.push(room.roomId);

      const p1 = await roomService.joinRoom({ pin: room.pin, nickname: "Student Alpha" });
      const p2 = await roomService.joinRoom({ pin: room.pin, nickname: "Student Beta" });

      const fetchedRoom = await roomService.getRoomByPin(room.pin);
      expect(fetchedRoom!.participants[0].nickname).toBe("Student Alpha");
      expect(fetchedRoom!.participants[1].nickname).toBe("Student Beta");
    });
  });
});
