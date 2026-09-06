import { CanonicalSessionSchema, SessionDTO, SessionStatus } from "../contracts/session.contract";

/**
 * Converts any date or time representation into standard HH:mm string format.
 * Handles ISO strings (1970-01-01T18:00:00.000Z), HH:mm:ss, HH:mm, or Date instances.
 */
export function normalizeTimeToHHmm(val: any, fallback: string = ""): string {
  if (!val) return fallback;
  if (val instanceof Date) {
    const iso = val.toISOString();
    const m = iso.match(/T(\d{2}:\d{2})/);
    if (m) return m[1];
  }
  const s = String(val).trim();
  const isoMatch = s.match(/T(\d{2}:\d{2})/);
  if (isoMatch) return isoMatch[1];
  const plainMatch = s.match(/^(\d{2}:\d{2})/);
  if (plainMatch) return plainMatch[1];
  return fallback;
}

/**
 * Normalizes and validates raw session data into Canonical SessionDTO.
 */
export function adaptSession(raw: any): SessionDTO {
  if (!raw || typeof raw !== "object") {
    console.warn("[CONTRACT_VIOLATION] Invalid raw session payload:", raw);
    return CanonicalSessionSchema.parse({
      id: "fallback-session",
      classId: "",
      sessionNumber: 1,
      plannedDate: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      status: "SCHEDULED",
      createdAt: new Date().toISOString(),
    });
  }

  const rawDate = raw.plannedDate || raw.planned_date || raw.scheduledDate || raw.session_date;
  const plannedDate = rawDate
    ? (rawDate instanceof Date ? rawDate.toISOString().split("T")[0] : String(rawDate).split("T")[0])
    : new Date().toISOString().split("T")[0];

  const rawStatus = String(raw.status || "").trim().toUpperCase();
  const canonicalStatus: SessionStatus =
    rawStatus === "PLANNED" || rawStatus === "SCHEDULED"
      ? "SCHEDULED"
      : rawStatus === "IN_PROGRESS"
        ? "IN_PROGRESS"
        : rawStatus === "COMPLETED"
          ? "COMPLETED"
          : rawStatus === "CANCELLED"
            ? "CANCELLED"
            : rawStatus === "RESCHEDULED"
              ? "RESCHEDULED"
              : "SCHEDULED";

  const candidate = {
    id: String(raw.id || `sess-${Date.now()}`),
    classId: String(raw.classId || raw.class_id || ""),
    sessionNumber: typeof (raw.sessionNumber ?? raw.session_number) === "number" ? (raw.sessionNumber ?? raw.session_number) : 1,
    plannedDate,
    actualDate: raw.actualDate || raw.actual_date || null,
    startTime: normalizeTimeToHHmm(raw.startTime || raw.start_time),
    endTime: normalizeTimeToHHmm(raw.endTime || raw.end_time),
    status: canonicalStatus,
    rescheduleReason: raw.rescheduleReason || raw.reschedule_reason || null,
    note: raw.note ?? null,
    teacherId: raw.teacherId || raw.teacher_id || null,
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    lessonTitle: raw.lessonTitle || raw.lesson_title || null,
    lessonDescription: raw.lessonDescription || raw.lesson_description || null,
    isAttendanceLocked: Boolean(raw.isAttendanceLocked ?? raw.is_attendance_locked),
    attendanceCount: typeof raw.attendanceCount === "number" ? raw.attendanceCount : 0,
  };

  const parseResult = CanonicalSessionSchema.safeParse(candidate);
  if (!parseResult.success) {
    console.error("[CONTRACT_VIOLATION] Session schema validation failed:", parseResult.error.format());
    return candidate as SessionDTO;
  }

  return parseResult.data;
}

