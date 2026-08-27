import { describe, it, expect, vi } from "vitest";
import {
  doTimeIntervalsOverlap,
  timeToMinutes,
  minutesToTimeString,
  formatDateKey,
  RoomCollisionService,
} from "../services/room-collision.service.js";

describe("🎯 OP-GAP-03: ROOM DOUBLE-BOOKING & COLLISION PREVENTION SUITE", () => {
  describe("Mathematical Interval Overlap Invariants", () => {
    it("detects exact overlapping intervals", () => {
      // 18:00 (1080) - 20:00 (1200) vs 19:00 (1140) - 21:00 (1260)
      expect(doTimeIntervalsOverlap(1080, 1200, 1140, 1260)).toBe(true);
      expect(doTimeIntervalsOverlap(1140, 1260, 1080, 1200)).toBe(true);
    });

    it("detects complete enclosure intervals", () => {
      // 17:30 (1050) - 21:30 (1290) vs 18:00 (1080) - 20:00 (1200)
      expect(doTimeIntervalsOverlap(1050, 1290, 1080, 1200)).toBe(true);
      expect(doTimeIntervalsOverlap(1080, 1200, 1050, 1290)).toBe(true);
    });

    it("allows back-to-back non-overlapping intervals (boundary touch)", () => {
      // 16:00 (960) - 18:00 (1080) vs 18:00 (1080) - 20:00 (1200)
      expect(doTimeIntervalsOverlap(960, 1080, 1080, 1200)).toBe(false);
      expect(doTimeIntervalsOverlap(1080, 1200, 960, 1080)).toBe(false);
    });

    it("allows completely separate intervals", () => {
      // 08:00 (480) - 10:00 (600) vs 18:00 (1080) - 20:00 (1200)
      expect(doTimeIntervalsOverlap(480, 600, 1080, 1200)).toBe(false);
    });
  });

  describe("Time and Date Parsing & Normalization", () => {
    it("converts HH:mm strings and Date objects to minutes from midnight", () => {
      expect(timeToMinutes("18:00")).toBe(1080);
      expect(timeToMinutes("18:30")).toBe(1110);
      expect(timeToMinutes("00:00")).toBe(0);

      const d = new Date("1970-01-01T19:45:00.000Z");
      expect(timeToMinutes(d)).toBe(19 * 60 + 45);
    });

    it("formats minutes back to HH:mm string", () => {
      expect(minutesToTimeString(1080)).toBe("18:00");
      expect(minutesToTimeString(1110)).toBe("18:30");
      expect(minutesToTimeString(485)).toBe("08:05");
    });

    it("normalizes date to YYYY-MM-DD", () => {
      expect(formatDateKey(new Date("2026-09-01T00:00:00.000Z"))).toBe("2026-09-01");
      expect(formatDateKey("2026-09-01T18:00:00")).toBe("2026-09-01");
      expect(formatDateKey("2026-09-01")).toBe("2026-09-01");
    });
  });

  describe("RoomCollisionService Database Conflict Checking", () => {
    it("detects conflict when an active class already has a session in the same room on the same date and overlapping time", async () => {
      const mockPrisma: any = {
        room: {
          findUnique: vi.fn().mockResolvedValue({
            id: "room-101",
            name: "Phòng 101",
            branch: { id: "branch-q3", name: "Cơ sở Quận 3" },
          }),
        },
        classSession: {
          findMany: vi.fn().mockResolvedValue([
            {
              id: "sess-existing-1",
              plannedDate: new Date("2026-09-05T00:00:00.000Z"),
              startTime: new Date("1970-01-01T18:00:00.000Z"),
              endTime: new Date("1970-01-01T20:00:00.000Z"),
              status: "PLANNED",
              class: {
                id: "class-existing-a",
                name: "IELTS Master 01",
                course: { title: "IELTS Master 7.5+" },
              },
            },
          ]),
        },
      };

      const requestedSessions = [
        {
          plannedDate: "2026-09-05",
          startTime: "19:00",
          endTime: "21:00",
        },
      ];

      const result = await RoomCollisionService.checkRoomConflictForSessions(
        mockPrisma,
        {
          roomId: "room-101",
          sessions: requestedSessions,
          excludeClassId: "class-new-b",
        }
      );

      expect(result.hasConflict).toBe(true);
      expect(result.conflicts.length).toBe(1);
      expect(result.conflicts[0].conflictingClassName).toBe("IELTS Master 01");
      expect(result.conflicts[0].date).toBe("2026-09-05");
      expect(result.message).toContain("Xung đột phòng học");
      expect(result.message).toContain("Phòng 101");
      expect(result.message).toContain("IELTS Master 01");
    });

    it("allows scheduling when target room has back-to-back non-overlapping sessions on the same date", async () => {
      const mockPrisma: any = {
        room: {
          findUnique: vi.fn().mockResolvedValue({
            id: "room-101",
            name: "Phòng 101",
            branch: { id: "branch-q3", name: "Cơ sở Quận 3" },
          }),
        },
        classSession: {
          findMany: vi.fn().mockResolvedValue([
            {
              id: "sess-existing-1",
              plannedDate: new Date("2026-09-05T00:00:00.000Z"),
              startTime: new Date("1970-01-01T16:00:00.000Z"),
              endTime: new Date("1970-01-01T18:00:00.000Z"),
              status: "PLANNED",
              class: {
                id: "class-existing-a",
                name: "IELTS Foundation 01",
                course: { title: "IELTS Foundation" },
              },
            },
          ]),
        },
      };

      const requestedSessions = [
        {
          plannedDate: "2026-09-05",
          startTime: "18:00",
          endTime: "20:00",
        },
      ];

      const result = await RoomCollisionService.checkRoomConflictForSessions(
        mockPrisma,
        {
          roomId: "room-101",
          sessions: requestedSessions,
          excludeClassId: "class-new-b",
        }
      );

      expect(result.hasConflict).toBe(false);
      expect(result.conflicts.length).toBe(0);
    });

    it("allows scheduling when no existing sessions exist for the room on the requested dates", async () => {
      const mockPrisma: any = {
        room: {
          findUnique: vi.fn().mockResolvedValue({
            id: "room-102",
            name: "Phòng 102",
            branch: { id: "branch-q3", name: "Cơ sở Quận 3" },
          }),
        },
        classSession: {
          findMany: vi.fn().mockResolvedValue([]),
        },
      };

      const requestedSessions = [
        {
          plannedDate: "2026-09-05",
          startTime: "18:00",
          endTime: "20:00",
        },
      ];

      const result = await RoomCollisionService.checkRoomConflictForSessions(
        mockPrisma,
        {
          roomId: "room-102",
          sessions: requestedSessions,
          excludeClassId: "class-new-b",
        }
      );

      expect(result.hasConflict).toBe(false);
      expect(result.conflicts.length).toBe(0);
    });
  });
});
