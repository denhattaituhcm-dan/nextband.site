/**
 * CANONICAL CLASS & STUDENT DATA MAPPER
 * 
 * Boundary adapter to convert raw heterogeneous backend responses (Fastify Prisma relations,
 * Supabase direct queries, legacy flattened structures) into a single unified domain model.
 */

export type { ClassPeerRank } from "../types/domain.types";
export type StudentStatus = "ACTIVE" | "SUSPENDED" | "DROPPED";

export interface CanonicalStudent {
  id: string;             // ClassStudent PK or student id
  studentId: string;      // User / Profile ID (Foreign key)
  fullName: string;       // Non-optional normalized display name
  email: string;          // Student email
  avatarUrl?: string;     // Profile avatar URL
  phone?: string;         // Student phone number
  status: StudentStatus;  // ACTIVE | SUSPENDED | DROPPED
  isActive: boolean;      // Quick boolean active flag
  joinedAt?: string;      // Timestamp when student joined class
}

export interface CanonicalClass {
  id: string;
  name: string;
  description: string;
  courseId?: string;
  branchId?: string;
  roomId?: string;
  teacherId?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  isActive: boolean;
  teacher?: {
    id: string;
    fullName: string;
    avatarUrl?: string;
    email?: string;
  } | null;
  course?: {
    id: string;
    title: string;
    description?: string;
    level?: string;
  } | null;
  branch?: {
    id: string;
    name: string;
    code?: string;
  } | null;
  room?: {
    id: string;
    name: string;
    capacity?: number;
  } | null;
  students: CanonicalStudent[];
  activeStudents: CanonicalStudent[];
  studentCount: number;
  _count?: {
    students: number;
  };
  [key: string]: any;
}

/**
 * Normalizes any raw student record into a CanonicalStudent.
 * Handles:
 * 1. Fastify / Prisma nested relation: { id, studentId, student: { id, userId, fullName, email, avatarUrl } }
 * 2. Legacy flattened payload: { id, studentId, fullName, email, avatarUrl }
 * 3. Supabase snake_case payload: { id, student_id, full_name, avatar_url, is_active }
 */
export function toCanonicalStudent(raw: any): CanonicalStudent {
  if (!raw || typeof raw !== "object") {
    return {
      id: "",
      studentId: "",
      fullName: "Học viên",
      email: "",
      avatarUrl: undefined,
      phone: undefined,
      status: "ACTIVE",
      isActive: true,
      joinedAt: undefined,
    };
  }

  const studentObj = raw.student || {};

  // Extract student ID with deep cascade
  const studentId = String(
    raw.studentId ||
    raw.student_id ||
    studentObj.userId ||
    studentObj.user_id ||
    studentObj.id ||
    raw.userId ||
    raw.user_id ||
    raw.id ||
    ""
  );

  const id = String(raw.id || studentId);

  // Extract display name with mandatory fallback chain
  const rawFullName =
    studentObj.fullName ||
    studentObj.full_name ||
    raw.fullName ||
    raw.full_name ||
    studentObj.name ||
    raw.name ||
    studentObj.email ||
    raw.email;

  const fullName = rawFullName && String(rawFullName).trim().length > 0
    ? String(rawFullName).trim()
    : "Học viên";

  // Extract email
  const rawEmail = studentObj.email || raw.email || "";
  const email = String(rawEmail).trim();

  // Extract avatar URL
  const rawAvatar =
    studentObj.avatarUrl ||
    studentObj.avatar_url ||
    raw.avatarUrl ||
    raw.avatar_url;
  const avatarUrl = rawAvatar ? String(rawAvatar) : undefined;

  // Extract phone
  const rawPhone = studentObj.phone || raw.phone;
  const phone = rawPhone ? String(rawPhone) : undefined;

  // Extract & normalize Status
  const rawStatus = String(
    raw.status || studentObj.status || (raw.isActive === false || raw.is_active === false ? "SUSPENDED" : "ACTIVE")
  ).toUpperCase();

  let status: StudentStatus = "ACTIVE";
  if (
    rawStatus === "SUSPENDED" ||
    rawStatus === "INACTIVE" ||
    raw.isReserved === true ||
    raw.isActive === false ||
    raw.is_active === false
  ) {
    status = "SUSPENDED";
  } else if (rawStatus === "DROPPED" || rawStatus === "DELETED" || rawStatus === "LEFT") {
    status = "DROPPED";
  } else {
    status = "ACTIVE";
  }

  const isActive = status === "ACTIVE";

  // Extract joined date
  const joinedAt = raw.joinedAt || raw.joined_at || raw.createdAt || raw.created_at || undefined;

  return {
    id,
    studentId,
    fullName,
    email,
    avatarUrl,
    phone,
    status,
    isActive,
    joinedAt: joinedAt ? String(joinedAt) : undefined,
  };
}

/**
 * Normalizes any raw class record into a CanonicalClass.
 * Handles both Fastify relation embeds and Supabase manual enrichments.
 */
export function toCanonicalClass(raw: any, extras?: {
  teacher?: any;
  course?: any;
  branch?: any;
  room?: any;
}): CanonicalClass {
  if (!raw || typeof raw !== "object") {
    return {
      id: "",
      name: "Lớp học",
      description: "",
      status: "ACTIVE",
      isActive: true,
      students: [],
      activeStudents: [],
      studentCount: 0,
    };
  }

  const rawStudents = raw.students || raw.class_students || [];
  const students: CanonicalStudent[] = Array.isArray(rawStudents)
    ? rawStudents.map(toCanonicalStudent)
    : [];

  const activeStudents = students.filter((s) => s.isActive);

  // Normalize Teacher Profile
  const rawTeacher = raw.teacher || extras?.teacher;
  let teacher = null;
  if (rawTeacher) {
    const teacherName =
      rawTeacher.fullName ||
      rawTeacher.full_name ||
      rawTeacher.name ||
      rawTeacher.email ||
      "Giáo viên";
    teacher = {
      id: String(rawTeacher.id || rawTeacher.user_id || rawTeacher.userId || raw.teacherId || raw.teacher_id || ""),
      fullName: String(teacherName).trim(),
      avatarUrl: rawTeacher.avatarUrl || rawTeacher.avatar_url || undefined,
      email: rawTeacher.email || undefined,
    };
  }

  // Normalize Course
  const rawCourse = raw.course || extras?.course;
  let course = null;
  if (rawCourse) {
    course = {
      id: String(rawCourse.id || raw.courseId || raw.course_id || ""),
      title: String(rawCourse.title || rawCourse.name || "Khóa học").trim(),
      description: rawCourse.description || undefined,
      level: rawCourse.level || undefined,
    };
  }

  // Normalize Branch
  const rawBranch = raw.branch || extras?.branch;
  let branch = null;
  if (rawBranch) {
    branch = {
      id: String(rawBranch.id || raw.branchId || raw.branch_id || ""),
      name: String(rawBranch.name || "Cơ sở").trim(),
      code: rawBranch.code || undefined,
    };
  }

  // Normalize Room
  const rawRoom = raw.room || extras?.room;
  let room = null;
  if (rawRoom) {
    room = {
      id: String(rawRoom.id || raw.roomId || raw.room_id || ""),
      name: String(rawRoom.name || "Phòng học").trim(),
      capacity: rawRoom.capacity ? Number(rawRoom.capacity) : undefined,
    };
  }

  const id = String(raw.id || "");
  const name = String(raw.name || "").trim();
  const description = String(raw.description || "");
  const courseId = raw.courseId || raw.course_id || course?.id || undefined;
  const branchId = raw.branchId || raw.branch_id || branch?.id || undefined;
  const roomId = raw.roomId || raw.room_id || room?.id || undefined;
  const teacherId = raw.teacherId || raw.teacher_id || teacher?.id || undefined;
  const startDate = raw.startDate || raw.start_date || undefined;
  const endDate = raw.endDate || raw.end_date || undefined;
  const isActive = raw.isActive ?? raw.is_active ?? true;
  const status = raw.status || (isActive ? "ACTIVE" : "CLOSED");

  return {
    ...raw,
    id,
    name,
    description,
    courseId,
    branchId,
    roomId,
    teacherId,
    startDate,
    endDate,
    status,
    isActive,
    teacher,
    course,
    branch,
    room,
    students,
    activeStudents,
    studentCount: activeStudents.length,
    _count: {
      students: activeStudents.length,
    },
  };
}
