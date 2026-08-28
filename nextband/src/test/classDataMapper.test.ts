import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  toCanonicalStudent,
  toCanonicalClass,
  CanonicalStudent,
  CanonicalClass,
} from "../lib/classDataMapper";
import { classesApi } from "../lib/api";

describe("Canonical Student & Class Data Mapper Contract Tests", () => {
  describe("toCanonicalStudent", () => {
    it("Test 1: Normalizes nested Fastify/Prisma student payload into canonical model", () => {
      const fastifyPrismaPayload = {
        id: "cs-100",
        classId: "class-1",
        studentId: "user-uuid-1",
        status: "ACTIVE",
        joinedAt: "2026-08-01T00:00:00.000Z",
        student: {
          id: "profile-1",
          userId: "user-uuid-1",
          fullName: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          avatarUrl: "https://example.com/avatar.jpg",
          phone: "0901234567",
        },
      };

      const canonical = toCanonicalStudent(fastifyPrismaPayload);

      expect(canonical.id).toBe("cs-100");
      expect(canonical.studentId).toBe("user-uuid-1");
      expect(canonical.fullName).toBe("Nguyễn Văn A");
      expect(canonical.email).toBe("nguyenvana@example.com");
      expect(canonical.avatarUrl).toBe("https://example.com/avatar.jpg");
      expect(canonical.phone).toBe("0901234567");
      expect(canonical.status).toBe("ACTIVE");
      expect(canonical.isActive).toBe(true);
      expect(canonical.joinedAt).toBe("2026-08-01T00:00:00.000Z");
    });

    it("Test 2: Normalizes legacy flattened payload preserving all fields", () => {
      const legacyPayload = {
        id: "cs-200",
        studentId: "user-uuid-2",
        fullName: "Trần Thị B",
        email: "tranthib@example.com",
        avatarUrl: "https://example.com/b.jpg",
        status: "ACTIVE",
        isActive: true,
      };

      const canonical = toCanonicalStudent(legacyPayload);

      expect(canonical.id).toBe("cs-200");
      expect(canonical.studentId).toBe("user-uuid-2");
      expect(canonical.fullName).toBe("Trần Thị B");
      expect(canonical.email).toBe("tranthib@example.com");
      expect(canonical.avatarUrl).toBe("https://example.com/b.jpg");
      expect(canonical.status).toBe("ACTIVE");
      expect(canonical.isActive).toBe(true);
    });

    it("Test 3: Normalizes Supabase snake_case payload into camelCase canonical model", () => {
      const supabasePayload = {
        id: "cs-300",
        student_id: "user-uuid-3",
        full_name: "Lê Văn C",
        avatar_url: "https://example.com/c.png",
        is_active: true,
        created_at: "2026-08-10T10:00:00.000Z",
      };

      const canonical = toCanonicalStudent(supabasePayload);

      expect(canonical.id).toBe("cs-300");
      expect(canonical.studentId).toBe("user-uuid-3");
      expect(canonical.fullName).toBe("Lê Văn C");
      expect(canonical.avatarUrl).toBe("https://example.com/c.png");
      expect(canonical.isActive).toBe(true);
      expect(canonical.status).toBe("ACTIVE");
      expect(canonical.joinedAt).toBe("2026-08-10T10:00:00.000Z");
    });

    it("Test 4: Fallback chain when fullName is empty or whitespace only", () => {
      // Case 4a: Fallback to email
      const withOnlyEmail = {
        id: "cs-401",
        studentId: "user-401",
        student: {
          email: "student401@ielts.vn",
        },
      };
      expect(toCanonicalStudent(withOnlyEmail).fullName).toBe("student401@ielts.vn");

      // Case 4b: Fallback to default "Học viên" when no name or email
      const emptyPayload = {
        id: "cs-402",
        studentId: "user-402",
      };
      expect(toCanonicalStudent(emptyPayload).fullName).toBe("Học viên");
    });

    it("Test 5: Correctly normalizes student status (ACTIVE, SUSPENDED, DROPPED)", () => {
      const activeStudent = toCanonicalStudent({ status: "ACTIVE" });
      expect(activeStudent.status).toBe("ACTIVE");
      expect(activeStudent.isActive).toBe(true);

      const suspendedStudent = toCanonicalStudent({ status: "SUSPENDED" });
      expect(suspendedStudent.status).toBe("SUSPENDED");
      expect(suspendedStudent.isActive).toBe(false);

      const reservedStudent = toCanonicalStudent({ isReserved: true });
      expect(reservedStudent.status).toBe("SUSPENDED");
      expect(reservedStudent.isActive).toBe(false);

      const droppedStudent = toCanonicalStudent({ status: "DROPPED" });
      expect(droppedStudent.status).toBe("DROPPED");
      expect(droppedStudent.isActive).toBe(false);
    });
  });

  describe("toCanonicalClass", () => {
    it("Test 6: Normalizes full class object and categorizes activeStudents", () => {
      const rawClass = {
        id: "class-101",
        name: "IELTS Intensive 6.5+",
        description: "Lớp học mục tiêu 6.5+",
        course_id: "course-1",
        branch_id: "branch-1",
        room_id: "room-1",
        start_date: "2026-09-01",
        end_date: "2026-12-01",
        is_active: true,
        teacher: {
          user_id: "teacher-1",
          full_name: "Thầy John Doe",
          avatar_url: "https://example.com/teacher.jpg",
        },
        course: {
          id: "course-1",
          title: "IELTS Master 6.5",
        },
        students: [
          {
            id: "cs-1",
            studentId: "u-1",
            status: "ACTIVE",
            student: { fullName: "Học viên 1", email: "hv1@test.com" },
          },
          {
            id: "cs-2",
            studentId: "u-2",
            status: "SUSPENDED",
            student: { fullName: "Học viên 2 (Bảo lưu)", email: "hv2@test.com" },
          },
        ],
      };

      const canonical = toCanonicalClass(rawClass);

      expect(canonical.id).toBe("class-101");
      expect(canonical.name).toBe("IELTS Intensive 6.5+");
      expect(canonical.teacher?.fullName).toBe("Thầy John Doe");
      expect(canonical.course?.title).toBe("IELTS Master 6.5");
      expect(canonical.students.length).toBe(2);
      expect(canonical.activeStudents.length).toBe(1);
      expect(canonical.activeStudents[0].fullName).toBe("Học viên 1");
      expect(canonical.studentCount).toBe(1);
    });
  });

  describe("classesApi.getById boundary contract", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("Test 7: Fastify REST API response passes through canonical mapper producing non-empty student.fullName", async () => {
      const mockFastifyClass = {
        id: "class-m0107",
        name: "M0107.2026",
        students: [
          {
            id: "cs-m1",
            classId: "class-m0107",
            studentId: "student-uuid-1",
            status: "ACTIVE",
            student: {
              id: "profile-1",
              userId: "student-uuid-1",
              fullName: "Phạm Hoàng Long",
              email: "long.pham@gmail.com",
              avatarUrl: null,
            },
          },
          {
            id: "cs-m2",
            classId: "class-m0107",
            studentId: "student-uuid-2",
            status: "ACTIVE",
            student: {
              id: "profile-2",
              userId: "student-uuid-2",
              fullName: "Vũ Mai Anh",
              email: "maianh.vu@gmail.com",
              avatarUrl: "https://example.com/maianh.jpg",
            },
          },
        ],
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockFastifyClass,
      } as any);

      const result = await classesApi.getById("class-m0107");

      expect(result.id).toBe("class-m0107");
      expect(result.students.length).toBe(2);
      expect(result.activeStudents.length).toBe(2);

      // Verify that student.fullName is strictly defined and matches nested source
      expect(result.activeStudents[0].fullName).toBe("Phạm Hoàng Long");
      expect(result.activeStudents[0].email).toBe("long.pham@gmail.com");
      expect(result.activeStudents[1].fullName).toBe("Vũ Mai Anh");
      expect(result.activeStudents[1].avatarUrl).toBe("https://example.com/maianh.jpg");
    });
  });
});
