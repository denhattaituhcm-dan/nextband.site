import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("🔒 PHASE 0: ARENA DATABASE DOMAIN & CONSTRAINTS SPEC SUITE", () => {
  const TEST_PIN = "998877";
  const TEST_ROOM_ID_1 = "00000000-0000-0000-0000-0000000000a1";
  const TEST_ROOM_ID_2 = "00000000-0000-0000-0000-0000000000a2";
  const TEST_ROOM_ID_3 = "00000000-0000-0000-0000-0000000000a3";

  // Dọn dẹp trước và sau khi test
  async function cleanupTestData() {
    try {
      await prisma.$executeRawUnsafe(`
        DELETE FROM "arena_answers" WHERE "room_id" IN ('${TEST_ROOM_ID_1}', '${TEST_ROOM_ID_2}', '${TEST_ROOM_ID_3}');
        DELETE FROM "arena_participants" WHERE "room_id" IN ('${TEST_ROOM_ID_1}', '${TEST_ROOM_ID_2}', '${TEST_ROOM_ID_3}');
        DELETE FROM "arena_rooms" WHERE "id" IN ('${TEST_ROOM_ID_1}', '${TEST_ROOM_ID_2}', '${TEST_ROOM_ID_3}');
      `);
    } catch {}
  }

  beforeAll(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe("1. Partial Unique PIN Constraint Invariant (WHERE status != 'ENDED')", () => {
    it("chặn việc tạo 2 phòng cùng mã PIN khi cả hai đều đang ACTIVE (status = 'LOBBY' hoặc 'PODIUM')", async () => {
      // Tạo phòng 1 ở trạng thái LOBBY
      await prisma.$executeRawUnsafe(`
        INSERT INTO "arena_rooms" ("id", "pin", "host_token_hash", "status")
        VALUES ('${TEST_ROOM_ID_1}', '${TEST_PIN}', 'mock_hash_1', 'LOBBY');
      `);

      // Cố tình tạo phòng 2 cùng PIN khi phòng 1 đang LOBBY
      let errorThrown = false;
      try {
        await prisma.$executeRawUnsafe(`
          INSERT INTO "arena_rooms" ("id", "pin", "host_token_hash", "status")
          VALUES ('${TEST_ROOM_ID_2}', '${TEST_PIN}', 'mock_hash_2', 'LOBBY');
        `);
      } catch (err: any) {
        errorThrown = true;
        // Mã lỗi vi phạm Unique Constraint trong Postgres: 23505
        expect(err.message).toMatch(/idx_arena_rooms_active_pin|23505/);
      }

      expect(errorThrown).toBe(true);
    });

    it("cho phép tái sử dụng cùng mã PIN khi phòng cũ đã chuyển sang trạng thái 'ENDED'", async () => {
      // Chuyển phòng 1 sang trạng thái ENDED
      await prisma.$executeRawUnsafe(`
        UPDATE "arena_rooms" SET "status" = 'ENDED' WHERE "id" = '${TEST_ROOM_ID_1}';
      `);

      // Bây giờ tạo phòng 2 với cùng mã PIN -> Phải thành công mỹ mãn
      await prisma.$executeRawUnsafe(`
        INSERT INTO "arena_rooms" ("id", "pin", "host_token_hash", "status")
        VALUES ('${TEST_ROOM_ID_2}', '${TEST_PIN}', 'mock_hash_2', 'LOBBY');
      `);

      const res: any = await prisma.$queryRawUnsafe(`
        SELECT "id", "pin", "status" FROM "arena_rooms" WHERE "id" = '${TEST_ROOM_ID_2}';
      `);
      expect(res.length).toBe(1);
      expect(res[0].pin).toBe(TEST_PIN);
      expect(res[0].status).toBe("LOBBY");
    });
  });

  describe("2. Participant Nickname Unique Constraint Invariant (room_id, normalized_nickname)", () => {
    const P1_ID = "00000000-0000-0000-0000-0000000000b1";
    const P2_ID = "00000000-0000-0000-0000-0000000000b2";

    it("cho phép thêm học sinh với normalized_nickname duy nhất trong phòng", async () => {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "arena_participants" ("id", "room_id", "player_session_token", "nickname", "normalized_nickname")
        VALUES ('${P1_ID}', '${TEST_ROOM_ID_2}', 'token_student_1', 'Bảo Nam', 'bao nam');
      `);

      const res: any = await prisma.$queryRawUnsafe(`
        SELECT "id", "nickname", "normalized_nickname" FROM "arena_participants" WHERE "id" = '${P1_ID}';
      `);
      expect(res.length).toBe(1);
      expect(res[0].nickname).toBe("Bảo Nam");
      expect(res[0].normalized_nickname).toBe("bao nam");
    });

    it("chặn việc thêm học sinh thứ 2 có cùng normalized_nickname trong cùng 1 phòng (Race condition / Duplicate)", async () => {
      let duplicateError = false;
      try {
        await prisma.$executeRawUnsafe(`
          INSERT INTO "arena_participants" ("id", "room_id", "player_session_token", "nickname", "normalized_nickname")
          VALUES ('${P2_ID}', '${TEST_ROOM_ID_2}', 'token_student_2', 'bảo nam ', 'bao nam');
        `);
      } catch (err: any) {
        duplicateError = true;
        expect(err.message).toMatch(/arena_participants_room_id_normalized_nickname_key|23505/);
      }

      expect(duplicateError).toBe(true);
    });

    it("cho phép cùng normalized_nickname nhưng ở 2 phòng KHÁC NHAU", async () => {
      // Tạo phòng 3 ở trạng thái LOBBY với PIN khác
      await prisma.$executeRawUnsafe(`
        INSERT INTO "arena_rooms" ("id", "pin", "host_token_hash", "status")
        VALUES ('${TEST_ROOM_ID_3}', '123456', 'mock_hash_3', 'LOBBY');
      `);

      // Thêm học sinh cùng tên 'bao nam' vào phòng 3 -> Hoàn toàn hợp lệ
      const P3_ID = "00000000-0000-0000-0000-0000000000b3";
      await prisma.$executeRawUnsafe(`
        INSERT INTO "arena_participants" ("id", "room_id", "player_session_token", "nickname", "normalized_nickname")
        VALUES ('${P3_ID}', '${TEST_ROOM_ID_3}', 'token_student_3', 'Bảo Nam', 'bao nam');
      `);

      const res: any = await prisma.$queryRawUnsafe(`
        SELECT "id" FROM "arena_participants" WHERE "id" = '${P3_ID}';
      `);
      expect(res.length).toBe(1);
    });
  });

  describe("3. Answer Idempotency Invariant (participant_id, question_id)", () => {
    const P1_ID = "00000000-0000-0000-0000-0000000000b1";
    const QUESTION_ID = "00000000-0000-0000-0000-0000000000q1";
    const ANS_1_ID = "00000000-0000-0000-0000-0000000000c1";
    const ANS_2_ID = "00000000-0000-0000-0000-0000000000c2";

    it("chặn việc 1 học sinh gửi đáp án 2 lần cho cùng một câu hỏi", async () => {
      // Lần nộp 1
      await prisma.$executeRawUnsafe(`
        INSERT INTO "arena_answers" ("id", "room_id", "participant_id", "question_id", "round_index", "selected_option_id", "is_correct", "score_awarded")
        VALUES ('${ANS_1_ID}', '${TEST_ROOM_ID_2}', '${P1_ID}', '${QUESTION_ID}', 0, 'opt_a', true, 100);
      `);

      // Lần nộp 2 cùng participant_id và question_id
      let submitDuplicateError = false;
      try {
        await prisma.$executeRawUnsafe(`
          INSERT INTO "arena_answers" ("id", "room_id", "participant_id", "question_id", "round_index", "selected_option_id", "is_correct", "score_awarded")
          VALUES ('${ANS_2_ID}', '${TEST_ROOM_ID_2}', '${P1_ID}', '${QUESTION_ID}', 0, 'opt_b', false, 0);
        `);
      } catch (err: any) {
        submitDuplicateError = true;
        expect(err.message).toMatch(/arena_answers_participant_id_question_id_key|23505/);
      }

      expect(submitDuplicateError).toBe(true);
    });
  });
});
