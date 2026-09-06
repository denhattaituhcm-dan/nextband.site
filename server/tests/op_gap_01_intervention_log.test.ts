import { describe, it, expect, vi } from "vitest";
import { InterventionService } from "../services/intervention.service.js";

describe("🎯 OP-GAP-01: STUDENT CARE & INTERVENTION LOG SUITE", () => {
  describe("InterventionService Authorization & Access Control", () => {
    it("rejects unauthorized roles from viewing intervention logs", async () => {
      const mockPrisma: any = {};
      const service = new InterventionService(mockPrisma);

      await expect(
        service.listByStudent("student-123", { id: "user-stu", roles: ["student"] })
      ).rejects.toThrow("Chỉ quản trị viên và giáo viên mới có quyền");
    });

    it("rejects unauthorized roles from creating intervention logs", async () => {
      const mockPrisma: any = {};
      const service = new InterventionService(mockPrisma);

      await expect(
        service.create(
          "user-stu",
          { studentId: "student-123", notes: "Test note", category: "ATTENDANCE", status: "OPEN" },
          { id: "user-stu", roles: ["student"] }
        )
      ).rejects.toThrow("Chỉ quản trị viên và giáo viên mới có quyền");
    });
  });

  describe("InterventionService.create Workflow", () => {
    it("successfully creates an intervention log with structured follow-up data", async () => {
      const mockPrisma: any = {
        user: {
          findFirst: vi.fn()
            .mockResolvedValueOnce({ id: "student-uuid", userId: "student-user-id" }) // student
            .mockResolvedValueOnce({ id: "teacher-uuid", userId: "teacher-user-id" }), // author
        },
        studentInterventionLog: {
          create: vi.fn().mockImplementation(({ data }) => ({
            id: "int-001",
            ...data,
            createdAt: new Date("2026-08-27T10:00:00.000Z"),
            updatedAt: new Date("2026-08-27T10:00:00.000Z"),
          })),
        },
      };

      const service = new InterventionService(mockPrisma);
      const result = await service.create(
        "teacher-user-id",
        {
          studentId: "student-user-id",
          classId: "class-ielts-1",
          category: "ATTENDANCE",
          title: "Vắng 2 buổi liên tiếp",
          notes: "Đã gọi điện cho phụ huynh. Học viên bị sốt xuất huyết nằm viện.",
          actionTaken: "Gọi Zalo phụ huynh lúc 09:30, gửi tài liệu buổi học qua email",
          agreedPlan: "Học bù vào Thứ Bảy và nộp bù bài Writing Task 1",
          followUpDate: "2026-09-02",
          status: "CONTACTED",
        },
        { id: "teacher-user-id", roles: ["teacher"] }
      );

      expect(result.id).toBe("int-001");
      expect(result.studentId).toBe("student-user-id");
      expect(result.category).toBe("ATTENDANCE");
      expect(result.status).toBe("CONTACTED");
      expect(result.followUpDate).toEqual(new Date("2026-09-02T00:00:00.000Z"));
    });
  });

  describe("InterventionService.update Status Transitions", () => {
    it("stamps resolvedAt timestamp when transitioning to RESOLVED", async () => {
      const mockPrisma: any = {
        studentInterventionLog: {
          findUnique: vi.fn().mockResolvedValue({
            id: "int-001",
            status: "IN_PROGRESS",
            resolvedAt: null,
          }),
          update: vi.fn().mockImplementation(({ data }) => ({
            id: "int-001",
            status: data.status,
            resolvedAt: data.resolvedAt,
          })),
        },
      };

      const service = new InterventionService(mockPrisma);
      const updated = await service.update(
        "int-001",
        { status: "RESOLVED" },
        { id: "teacher-user-id", roles: ["teacher"] }
      );

      expect(updated.status).toBe("RESOLVED");
      expect(updated.resolvedAt).toBeInstanceOf(Date);
    });

    it("clears resolvedAt timestamp when reopening a RESOLVED intervention", async () => {
      const mockPrisma: any = {
        studentInterventionLog: {
          findUnique: vi.fn().mockResolvedValue({
            id: "int-001",
            status: "RESOLVED",
            resolvedAt: new Date("2026-08-25T10:00:00.000Z"),
          }),
          update: vi.fn().mockImplementation(({ data }) => ({
            id: "int-001",
            status: data.status,
            resolvedAt: data.resolvedAt,
          })),
        },
      };

      const service = new InterventionService(mockPrisma);
      const updated = await service.update(
        "int-001",
        { status: "CONTACTED" },
        { id: "teacher-user-id", roles: ["teacher"] }
      );

      expect(updated.status).toBe("CONTACTED");
      expect(updated.resolvedAt).toBeNull();
    });
  });

  describe("InterventionService.listByStudent", () => {
    it("returns formatted intervention history sorted by date descending", async () => {
      const mockPrisma: any = {
        user: {
          findFirst: vi.fn().mockResolvedValue({ id: "student-uuid", userId: "student-user-id", fullName: "Nguyễn Văn A" }),
        },
        studentInterventionLog: {
          findMany: vi.fn().mockResolvedValue([
            {
              id: "int-002",
              studentId: "student-user-id",
              classId: "class-1",
              authorId: "teacher-1",
              category: "HOMEWORK",
              title: "Nợ 3 bài Writing",
              notes: "Đã trao đổi trực tiếp sau giờ học.",
              actionTaken: "Kèm 1-1 tại phòng tự học",
              agreedPlan: "Nộp trước 30/08",
              followUpDate: new Date("2026-08-30T00:00:00.000Z"),
              status: "RESOLVED",
              resolvedAt: new Date("2026-08-29T15:00:00.000Z"),
              createdAt: new Date("2026-08-26T10:00:00.000Z"),
              updatedAt: new Date("2026-08-29T15:00:00.000Z"),
              author: { id: "t-1", userId: "teacher-1", fullName: "Trần Thị Mai", email: "mai@test.com", avatarUrl: null },
              class: { id: "class-1", name: "IELTS Intensive 01", course: { id: "c-1", title: "IELTS Intensive" } },
            },
          ]),
        },
      };

      const service = new InterventionService(mockPrisma);
      const list = await service.listByStudent("student-user-id", { id: "admin-1", roles: ["admin"] });

      expect(list.length).toBe(1);
      expect(list[0].id).toBe("int-002");
      expect(list[0].authorName).toBe("Trần Thị Mai");
      expect(list[0].className).toBe("IELTS Intensive 01");
      expect(list[0].followUpDate).toBe("2026-08-30");
      expect(list[0].status).toBe("RESOLVED");
    });
  });
});
