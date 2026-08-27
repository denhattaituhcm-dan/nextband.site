import { describe, it, expect, vi } from "vitest";
import { LeadService } from "../services/lead.service.js";

describe("🎯 OP-GAP-02: INTEGRATED LEAD CONVERSION & CLASS PLACEMENT SUITE", () => {
  describe("Pre-validation and Guard Invariants", () => {
    it("Case F: Rejects conversion if lead is already converted", async () => {
      const mockPrisma: any = {
        contactLead: {
          findUnique: vi.fn().mockResolvedValue({
            id: "lead-001",
            fullName: "Nguyễn Văn Test",
            convertedUserId: "user-already-converted",
          }),
        },
      };

      const service = new LeadService(mockPrisma);
      await expect(
        service.convertLeadToStudent("lead-001", { email: "test@ielts.com" }, "operator-1")
      ).rejects.toThrow("Lead này đã được chuyển đổi thành học viên trước đó");
    });

    it("Case G: Rejects conversion if email already exists in User accounts", async () => {
      const mockPrisma: any = {
        contactLead: {
          findUnique: vi.fn().mockResolvedValue({
            id: "lead-002",
            fullName: "Trần Thị Test",
            convertedUserId: null,
          }),
        },
        user: {
          findUnique: vi.fn().mockResolvedValue({
            id: "existing-user-id",
            email: "duplicate@ielts.com",
          }),
        },
      };

      const service = new LeadService(mockPrisma);
      await expect(
        service.convertLeadToStudent("lead-002", { email: "duplicate@ielts.com" }, "operator-1")
      ).rejects.toThrow("Email duplicate@ielts.com đã tồn tại");
    });

    it("Case C: Rejects conversion if targetClassId does not exist", async () => {
      const mockPrisma: any = {
        contactLead: {
          findUnique: vi.fn().mockResolvedValue({
            id: "lead-003",
            fullName: "Lê Văn Test",
            convertedUserId: null,
          }),
        },
        user: {
          findUnique: vi.fn().mockResolvedValue(null),
        },
        class: {
          findUnique: vi.fn().mockResolvedValue(null), // Non-existent class
        },
      };

      const service = new LeadService(mockPrisma);
      await expect(
        service.convertLeadToStudent(
          "lead-003",
          { email: "fresh@ielts.com", targetClassId: "non-existent-class-id" },
          "operator-1"
        )
      ).rejects.toThrow("Lớp học mục tiêu không tồn tại");
    });

    it("Case D: Rejects conversion if targetClassId is closed or inactive", async () => {
      const mockPrisma: any = {
        contactLead: {
          findUnique: vi.fn().mockResolvedValue({
            id: "lead-004",
            fullName: "Phạm Văn Test",
            convertedUserId: null,
          }),
        },
        user: {
          findUnique: vi.fn().mockResolvedValue(null),
        },
        class: {
          findUnique: vi.fn().mockResolvedValue({
            id: "closed-class-id",
            name: "IELTS Old Cohort",
            status: "CLOSED",
            isActive: false,
          }),
        },
      };

      const service = new LeadService(mockPrisma);
      await expect(
        service.convertLeadToStudent(
          "lead-004",
          { email: "fresh@ielts.com", targetClassId: "closed-class-id" },
          "operator-1"
        )
      ).rejects.toThrow("Lớp học đã đóng hoặc không còn hoạt động");
    });
  });

  describe("Atomic Conversion Workflows", () => {
    it("Case A: Converts Lead to Student without class when targetClassId is omitted", async () => {
      const mockTx: any = {
        user: {
          findFirst: vi.fn().mockResolvedValue({
            userId: "new-student-id",
            email: "student_a@ielts.com",
            fullName: "Học Viên A",
            roles: [{ role: "student" }],
          }),
        },
        userBranch: { create: vi.fn().mockResolvedValue({}) },
        contactLead: {
          update: vi.fn().mockResolvedValue({
            id: "lead-case-a",
            fullName: "Học Viên A",
            convertedUserId: "new-student-id",
            status: "ENROLLED",
          }),
        },
      };

      const mockPrisma: any = {
        contactLead: {
          findUnique: vi.fn().mockResolvedValue({
            id: "lead-case-a",
            fullName: "Học Viên A",
            phone: "0901234567",
            email: "student_a@ielts.com",
            preferredBranchId: "branch-1",
            convertedUserId: null,
          }),
        },
        user: { findUnique: vi.fn().mockResolvedValue(null) },
        $queryRawUnsafe: vi.fn().mockResolvedValue([{ result: { user_id: "new-student-id" } }]),
        $transaction: vi.fn().mockImplementation(async (callback) => callback(mockTx)),
      };

      const service = new LeadService(mockPrisma);
      const result = await service.convertLeadToStudent(
        "lead-case-a",
        { email: "student_a@ielts.com", fullName: "Học Viên A" },
        "counselor-1"
      );

      expect(result.user.id).toBe("new-student-id");
      expect(result.lead.status).toBe("ENROLLED");
      expect(result.class).toBeNull();
    });

    it("Case B: Atomically converts Lead, creates Student, and places into ClassStudent + AuditLog", async () => {
      const mockTx: any = {
        user: {
          findFirst: vi.fn().mockResolvedValue({
            userId: "new-student-placed-id",
            email: "student_b@ielts.com",
            fullName: "Học Viên B",
            roles: [{ role: "student" }],
          }),
        },
        userBranch: { create: vi.fn().mockResolvedValue({}) },
        classStudent: {
          findUnique: vi.fn().mockResolvedValue(null),
          create: vi.fn().mockResolvedValue({
            id: "cs-001",
            classId: "class-active-1",
            studentId: "new-student-placed-id",
          }),
        },
        enrollmentAuditLog: {
          create: vi.fn().mockResolvedValue({ id: "audit-001" }),
        },
        contactLead: {
          update: vi.fn().mockResolvedValue({
            id: "lead-case-b",
            fullName: "Học Viên B",
            convertedUserId: "new-student-placed-id",
            status: "ENROLLED",
          }),
        },
      };

      const mockPrisma: any = {
        contactLead: {
          findUnique: vi.fn().mockResolvedValue({
            id: "lead-case-b",
            fullName: "Học Viên B",
            phone: "0909888777",
            preferredBranchId: "branch-q3",
            convertedUserId: null,
          }),
        },
        user: { findUnique: vi.fn().mockResolvedValue(null) },
        class: {
          findUnique: vi.fn().mockResolvedValue({
            id: "class-active-1",
            name: "IELTS Master 7.0 - Khóa Tháng 9",
            status: "ACTIVE",
            isActive: true,
            branch: { id: "branch-q3", name: "Cơ sở Quận 3" },
          }),
        },
        $queryRawUnsafe: vi.fn().mockResolvedValue([{ result: { user_id: "new-student-placed-id" } }]),
        $transaction: vi.fn().mockImplementation(async (callback) => callback(mockTx)),
      };

      const service = new LeadService(mockPrisma);
      const result = await service.convertLeadToStudent(
        "lead-case-b",
        {
          email: "student_b@ielts.com",
          fullName: "Học Viên B",
          targetClassId: "class-active-1",
        },
        "counselor-1"
      );

      expect(result.user.id).toBe("new-student-placed-id");
      expect(result.lead.status).toBe("ENROLLED");
      expect(result.class).toEqual({
        id: "class-active-1",
        name: "IELTS Master 7.0 - Khóa Tháng 9",
        branchName: "Cơ sở Quận 3",
      });

      expect(mockTx.classStudent.create).toHaveBeenCalledWith({
        data: {
          classId: "class-active-1",
          studentId: "new-student-placed-id",
          joinedAt: expect.any(Date),
        },
      });

      expect(mockTx.enrollmentAuditLog.create).toHaveBeenCalledWith({
        data: {
          operatorId: "counselor-1",
          studentId: "new-student-placed-id",
          classId: "class-active-1",
          action: "LEAD_CONVERSION_PLACEMENT",
          reason: expect.stringContaining("Xếp lớp ban đầu khi chuyển đổi"),
          toStatus: "ACTIVE",
        },
      });
    });
  });
});
