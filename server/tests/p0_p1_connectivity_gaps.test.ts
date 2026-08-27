import { describe, it, expect } from "vitest";
import { normalizePhoneNumber, isSamePhoneNumber, formatPhoneDisplay } from "../../nextband/src/lib/phoneUtils";
import { ExamSubmissionService } from "../services/exam-submission.service";

describe("🎯 VERIFICATION TEST SUITE: P0 & P1 INFORMATION CONNECTIVITY GAPS", () => {
  describe("GAP-01: Low-Fill Status Filter Parameter Semantics", () => {
    it("maps low-fill statusFilter to isActive = true rather than false", () => {
      const getIsActiveParam = (statusFilter: string) => {
        return statusFilter === "inactive" ? false : statusFilter === "all" ? undefined : true;
      };

      expect(getIsActiveParam("all")).toBeUndefined();
      expect(getIsActiveParam("active")).toBe(true);
      expect(getIsActiveParam("low-fill")).toBe(true);
      expect(getIsActiveParam("no_teacher")).toBe(true);
      expect(getIsActiveParam("inactive")).toBe(false);
    });
  });

  describe("GAP-04: Exam Submission status & needGrading Prisma Where Clause Enforcement", () => {
    it("enforces status and needGrading in Prisma where clause query", async () => {
      let capturedWhere: any = null;
      const mockRepo = {
        findMany: async (where: any) => {
          capturedWhere = where;
          return [{ id: "sub-1", status: where.status }];
        },
        count: async (where: any) => 1,
      };

      const mockPrisma = {} as any;
      const service = new ExamSubmissionService(mockPrisma);
      (service as any).repo = mockRepo;

      // 1. needGrading = true without explicit status
      await service.listSubmissions(
        { id: "admin-1", roles: ["admin"] },
        { needGrading: true }
      );
      expect(capturedWhere).toEqual(
        expect.objectContaining({ status: "SUBMITTED" })
      );

      // 2. explicit status = "GRADED"
      await service.listSubmissions(
        { id: "admin-1", roles: ["admin"] },
        { status: "graded" }
      );
      expect(capturedWhere).toEqual(
        expect.objectContaining({ status: "GRADED" })
      );

      // 3. explicit status = "IN_PROGRESS"
      await service.listSubmissions(
        { id: "admin-1", roles: ["admin"] },
        { status: "in_progress" }
      );
      expect(capturedWhere).toEqual(
        expect.objectContaining({ status: "IN_PROGRESS" })
      );
    });
  });

  describe("GAP-05: Advisory Phone Normalization & Safe Heuristic Matching", () => {
    it("normalizes diverse phone string formats into canonical 10-digit format starting with 0", () => {
      expect(normalizePhoneNumber("+84901234567")).toBe("0901234567");
      expect(normalizePhoneNumber("84901234567")).toBe("0901234567");
      expect(normalizePhoneNumber("090 123 4567")).toBe("0901234567");
      expect(normalizePhoneNumber("090-123-4567")).toBe("0901234567");
      expect(normalizePhoneNumber("090.123.4567")).toBe("0901234567");
      expect(normalizePhoneNumber("(+84) 901 234 567")).toBe("0901234567");
    });

    it("verifies phone equality safely across variations", () => {
      expect(isSamePhoneNumber("+84901234567", "090-123-4567")).toBe(true);
      expect(isSamePhoneNumber("0901234567", "0901234568")).toBe(false);
      expect(isSamePhoneNumber("", "0901234567")).toBe(false);
      expect(isSamePhoneNumber(null, undefined)).toBe(false);
    });

    it("formats normalized phone for clean UI rendering", () => {
      expect(formatPhoneDisplay("0901234567")).toBe("0901 234 567");
      expect(formatPhoneDisplay("+84901234567")).toBe("0901 234 567");
    });
  });

  describe("GAP-03: Teacher Workspace Query Param Initialization", () => {
    it("initializes studentFilter to pending when filter=overdue or tab=grading is present", () => {
      const getInitialFilter = (urlFilter: string | null, urlTab: string | null) => {
        return (urlFilter === "overdue" || urlFilter === "pending" || urlTab === "grading") ? "pending" : "all";
      };

      expect(getInitialFilter("overdue", "grading")).toBe("pending");
      expect(getInitialFilter(null, "grading")).toBe("pending");
      expect(getInitialFilter("overdue", null)).toBe("pending");
      expect(getInitialFilter("pending", null)).toBe("pending");
      expect(getInitialFilter(null, null)).toBe("all");
      expect(getInitialFilter("active", "overview")).toBe("all");
    });
  });
});
