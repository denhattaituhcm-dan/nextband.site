import { describe, it, expect, vi } from "vitest";
import { ClassService } from "../services/class.service.js";
import { ClassRepository } from "../repositories/class.repository.js";

describe("Việc 5: Student Identity & Class Enrollment Scoping Tests", () => {
  describe("ClassService.addStudentsBatch & Identity Resolution", () => {
    it("should resolve existing user with case-insensitive email lookup", async () => {
      const mockPrisma: any = {
        class: {
          findUnique: vi.fn().mockResolvedValue({
            id: "class-123",
            name: "IELTS 6.5",
            status: "ACTIVE",
            isActive: true,
            teacherId: "teacher-123",
            courseId: "course-123",
          }),
        },
        user: {
          findFirst: vi.fn().mockImplementation(({ where }) => {
            if (where?.email?.mode === "insensitive" && where?.email?.equals === "test.student@domain.com") {
              return Promise.resolve({ userId: "canonical-uid-456" });
            }
            return Promise.resolve(null);
          }),
          findUnique: vi.fn().mockResolvedValue({ userId: "canonical-uid-456" }),
        },
        classStudent: {
          upsert: vi.fn().mockResolvedValue({
            id: "cs-1",
            classId: "class-123",
            studentId: "canonical-uid-456",
            status: "ACTIVE",
          }),
        },
        enrollment: {
          findUnique: vi.fn().mockResolvedValue(null),
          create: vi.fn().mockResolvedValue({ id: "en-1" }),
        },
        enrollmentAuditLog: {
          create: vi.fn().mockResolvedValue({ id: "log-1" }),
        },
        $transaction: vi.fn().mockImplementation(async (callback) => {
          return callback(mockPrisma);
        }),
      };

      const classService = new ClassService(mockPrisma);

      // Call addStudentsBatch with mixed-casing email
      const result = await classService.addStudentsBatch(
        { id: "admin-123", roles: ["admin"] },
        "class-123",
        { emails: ["Test.Student@domain.com"] }
      );

      expect(result.success).toBe(true);
      expect(result.addedCount).toBe(1);
      expect(result.students[0].studentId).toBe("canonical-uid-456");

      // Verify findFirst called with insensitive mode
      expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: { equals: "test.student@domain.com", mode: "insensitive" } },
        select: { userId: true },
      });
    });

    it("should fallback to query created user from DB if admin_create_user result format is non-standard", async () => {
      const mockPrisma: any = {
        class: {
          findUnique: vi.fn().mockResolvedValue({
            id: "class-123",
            name: "IELTS 6.5",
            status: "ACTIVE",
            isActive: true,
            teacherId: "teacher-123",
            courseId: null,
          }),
        },
        user: {
          findFirst: vi
            .fn()
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({ userId: "created-fallback-uid" }),
          findUnique: vi.fn().mockResolvedValue({ userId: "created-fallback-uid" }),
        },
        $queryRawUnsafe: vi.fn().mockResolvedValue([
          { result: { status: "created_successfully" } },
        ]),
        classStudent: {
          upsert: vi.fn().mockResolvedValue({
            id: "cs-2",
            classId: "class-123",
            studentId: "created-fallback-uid",
            status: "ACTIVE",
          }),
        },
        enrollmentAuditLog: {
          create: vi.fn().mockResolvedValue({ id: "log-2" }),
        },
        $transaction: vi.fn().mockImplementation(async (callback) => {
          return callback(mockPrisma);
        }),
      };

      const classService = new ClassService(mockPrisma);

      const result = await classService.addStudentsBatch(
        { id: "admin-123", roles: ["admin"] },
        "class-123",
        { emails: ["brandnew.student@domain.com"] }
      );

      expect(result.success).toBe(true);
      expect(result.students[0].studentId).toBe("created-fallback-uid");
      expect(mockPrisma.user.findFirst).toHaveBeenCalledTimes(2);
    });
  });

  describe("ClassRepository & ClassService.getMyClasses Scoping", () => {
    it("should filter out DROPPED and soft-deleted memberships in getClassesForStudent", async () => {
      const mockPrisma: any = {
        classStudent: {
          findMany: vi.fn().mockResolvedValue([]),
        },
      };

      const repo = new ClassRepository(mockPrisma);
      await repo.getClassesForStudent("student-test-uid");

      expect(mockPrisma.classStudent.findMany).toHaveBeenCalledWith({
        where: {
          studentId: "student-test-uid",
          deletedAt: null,
          status: { not: "DROPPED" },
        },
        include: expect.any(Object),
        orderBy: { createdAt: "desc" },
      });
    });

    it("should reflect actual membership status in getMyClasses", async () => {
      const mockPrisma: any = {
        classStudent: {
          findMany: vi.fn().mockResolvedValue([
            {
              id: "cs-active",
              studentId: "student-1",
              status: "ACTIVE",
              createdAt: new Date(),
              class: {
                id: "c-1",
                name: "Class 1",
                courseId: "course-1",
                isActive: true,
                course: { title: "IELTS Prep", slug: "ielts-prep" },
                teacher: { fullName: "Teacher A" },
              },
            },
            {
              id: "cs-suspended",
              studentId: "student-1",
              status: "SUSPENDED",
              createdAt: new Date(),
              class: {
                id: "c-2",
                name: "Class 2",
                courseId: "course-2",
                isActive: true,
                course: { title: "IELTS Advanced", slug: "ielts-adv" },
                teacher: { fullName: "Teacher B" },
              },
            },
          ]),
        },
      };

      const classService = new ClassService(mockPrisma);
      const myClasses = await classService.getMyClasses("student-1");

      expect(myClasses).toHaveLength(2);
      expect(myClasses[0].membershipStatus).toBe("ACTIVE");
      expect(myClasses[1].membershipStatus).toBe("SUSPENDED");
    });
  });
});
