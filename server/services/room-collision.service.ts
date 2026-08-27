import { PrismaClient } from "@prisma/client";

export interface SessionTimeSlot {
  plannedDate: string | Date;
  startTime: string | Date;
  endTime: string | Date;
}

export interface RoomConflictDetail {
  date: string;
  requestedTime: string;
  conflictingClassId: string;
  conflictingClassName: string;
  conflictingTime: string;
  roomName: string;
}

export interface RoomConflictCheckResult {
  hasConflict: boolean;
  conflicts: RoomConflictDetail[];
  message?: string;
}

/**
 * Converts a time representation (Date or "HH:mm" string) to minutes from midnight (0..1439).
 */
export function timeToMinutes(time: string | Date): number {
  if (time instanceof Date) {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    return hours * 60 + minutes;
  }

  if (typeof time === "string") {
    if (time.includes("T")) {
      const d = new Date(time);
      if (!isNaN(d.getTime())) {
        return d.getUTCHours() * 60 + d.getUTCMinutes();
      }
    }
    const parts = time.split(":").map(Number);
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
  }

  return 0;
}

/**
 * Formats minutes from midnight to "HH:mm".
 */
export function minutesToTimeString(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Evaluates whether two temporal intervals [S1, E1] and [S2, E2] strictly overlap.
 * Invariant: Max(S1, S2) < Min(E1, E2) <=> (S1 < E2 AND S2 < E1)
 */
export function doTimeIntervalsOverlap(
  start1: number,
  end1: number,
  start2: number,
  end2: number
): boolean {
  return start1 < end2 && start2 < end1;
}

/**
 * Normalizes a date to YYYY-MM-DD string.
 */
export function formatDateKey(date: string | Date): string {
  if (date instanceof Date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(date).split("T")[0];
}

export class RoomCollisionService {
  /**
   * Validates whether a set of planned sessions in a specified room collides with any
   * existing active sessions from other classes.
   */
  static async checkRoomConflictForSessions(
    prisma: PrismaClient,
    params: {
      roomId: string;
      sessions: SessionTimeSlot[];
      excludeClassId?: string;
    }
  ): Promise<RoomConflictCheckResult> {
    const { roomId, sessions, excludeClassId } = params;

    if (!roomId || !sessions || sessions.length === 0) {
      return { hasConflict: false, conflicts: [] };
    }

    // 1. Fetch Room metadata
    const targetRoom = await prisma.room.findUnique({
      where: { id: roomId },
      select: { id: true, name: true, branch: { select: { id: true, name: true } } },
    });

    if (!targetRoom) {
      return { hasConflict: false, conflicts: [] };
    }

    // 2. Collect unique dates to query
    const dateKeys = Array.from(
      new Set(sessions.map((s) => formatDateKey(s.plannedDate)))
    );

    // Convert date keys to Date objects for Prisma @db.Date matching
    const dateObjects = dateKeys.map((k) => new Date(`${k}T00:00:00.000Z`));

    // 3. Find existing active sessions in the target room on these dates across other active classes
    const existingSessions = await prisma.classSession.findMany({
      where: {
        class: {
          roomId: roomId,
          id: excludeClassId ? { not: excludeClassId } : undefined,
          isActive: true,
          status: { notIn: ["CLOSED", "ARCHIVED"] },
        },
        status: { not: "CANCELLED" },
        plannedDate: { in: dateObjects },
      },
      select: {
        id: true,
        plannedDate: true,
        startTime: true,
        endTime: true,
        status: true,
        class: {
          select: {
            id: true,
            name: true,
            course: { select: { title: true } },
          },
        },
      },
    });

    if (existingSessions.length === 0) {
      return { hasConflict: false, conflicts: [] };
    }

    // Index existing sessions by Date string key for O(1) lookup
    const existingByDate = new Map<string, typeof existingSessions>();
    for (const s of existingSessions) {
      const k = formatDateKey(s.plannedDate);
      if (!existingByDate.has(k)) {
        existingByDate.set(k, []);
      }
      existingByDate.get(k)!.push(s);
    }

    const conflicts: RoomConflictDetail[] = [];

    // 4. Test each requested session against existing sessions on that date
    for (const req of sessions) {
      const dateKey = formatDateKey(req.plannedDate);
      const candidates = existingByDate.get(dateKey);
      if (!candidates || candidates.length === 0) continue;

      const reqStartMin = timeToMinutes(req.startTime);
      const reqEndMin = timeToMinutes(req.endTime);

      for (const ex of candidates) {
        const exStartMin = timeToMinutes(ex.startTime);
        const exEndMin = timeToMinutes(ex.endTime);

        if (doTimeIntervalsOverlap(reqStartMin, reqEndMin, exStartMin, exEndMin)) {
          conflicts.push({
            date: dateKey,
            requestedTime: `${minutesToTimeString(reqStartMin)} - ${minutesToTimeString(reqEndMin)}`,
            conflictingClassId: ex.class.id,
            conflictingClassName: ex.class.name,
            conflictingTime: `${minutesToTimeString(exStartMin)} - ${minutesToTimeString(exEndMin)}`,
            roomName: targetRoom.name,
          });
        }
      }
    }

    if (conflicts.length > 0) {
      const first = conflicts[0];
      const summaryMsg = `Xung đột phòng học: Phòng "${first.roomName}" đã có lớp "${first.conflictingClassName}" học vào ngày ${first.date} (${first.conflictingTime}). Không thể xếp lịch trùng vào khung giờ ${first.requestedTime}.`;
      return {
        hasConflict: true,
        conflicts,
        message: summaryMsg,
      };
    }

    return { hasConflict: false, conflicts: [] };
  }
}
