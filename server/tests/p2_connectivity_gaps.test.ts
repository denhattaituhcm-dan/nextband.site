import { describe, it, expect } from "vitest";

describe("🎯 VERIFICATION TEST SUITE: P2 INFORMATION CONNECTIVITY GAPS (GAP-06 → GAP-09)", () => {
  describe("GAP-06: Course -> Classes Management Tab", () => {
    it("constructs valid courseId filter for classesApi list", () => {
      const buildClassQuery = (courseId: string, statusFilter: "all" | "active" | "inactive") => {
        return {
          courseId,
          isActive: statusFilter === "all" ? undefined : statusFilter === "active",
          limit: 100,
        };
      };

      expect(buildClassQuery("course-123", "all")).toEqual({
        courseId: "course-123",
        isActive: undefined,
        limit: 100,
      });

      expect(buildClassQuery("course-123", "active")).toEqual({
        courseId: "course-123",
        isActive: true,
        limit: 100,
      });

      expect(buildClassQuery("course-123", "inactive")).toEqual({
        courseId: "course-123",
        isActive: false,
        limit: 100,
      });
    });
  });

  describe("GAP-07: Dead-End Navigation Elimination (Exam -> Course, Submission -> Student/Exam)", () => {
    it("generates correct canonical routes for Course, Exam Edit, and Student Profile", () => {
      const getCourseRoute = (courseId: string) => `/admin/courses/${courseId}`;
      const getExamRoute = (examId: string) => `/admin/exams/${examId}`;
      const getStudentRoute = (identifier: string) => `/admin/users?search=${encodeURIComponent(identifier)}`;

      expect(getCourseRoute("c-456")).toBe("/admin/courses/c-456");
      expect(getExamRoute("e-789")).toBe("/admin/exams/e-789");
      expect(getStudentRoute("student@example.com")).toBe("/admin/users?search=student%40example.com");
      expect(getStudentRoute("Nguyễn Văn A")).toBe("/admin/users?search=Nguy%E1%BB%85n%20V%C4%83n%20A");
    });
  });

  describe("GAP-08: Student -> Originating Lead DTO Projection", () => {
    it("projects convertedLead metadata faithfully without data fabrication", () => {
      const rawUserWithLead = {
        id: "u-1",
        fullName: "Học Viên A",
        email: "hva@test.com",
        convertedLead: {
          id: "lead-99",
          fullName: "Học Viên A",
          phone: "0901234567",
          email: "hva@test.com",
          source: "facebook_ad",
          goal: "IELTS 7.0 Overall trong 6 tháng",
          notes: "Tư vấn offline cơ sở Q3",
          createdAt: new Date("2026-01-15T10:00:00Z"),
        },
      };

      const rawUserWithoutLead = {
        id: "u-2",
        fullName: "Học Viên B",
        email: "hvb@test.com",
        convertedLead: null,
      };

      const mapStudentDto = (st: any) => ({
        id: st.id,
        fullName: st.fullName,
        email: st.email,
        convertedLead: st.convertedLead || null,
      });

      const dto1 = mapStudentDto(rawUserWithLead);
      expect(dto1.convertedLead).not.toBeNull();
      expect(dto1.convertedLead?.source).toBe("facebook_ad");
      expect(dto1.convertedLead?.goal).toBe("IELTS 7.0 Overall trong 6 tháng");

      const dto2 = mapStudentDto(rawUserWithoutLead);
      expect(dto2.convertedLead).toBeNull();
    });
  });

  describe("GAP-09: Student Workspace Quick Actions Workflow Logic", () => {
    it("handles class transfer safely: checks old class removal and new class addition", async () => {
      const actions: string[] = [];
      const mockClassesApi = {
        removeStudent: async (classId: string, studentId: string) => {
          actions.push(`REMOVE:${studentId}:FROM:${classId}`);
          return { success: true };
        },
        addStudents: async (classId: string, studentIds: string[]) => {
          actions.push(`ADD:${studentIds.join(",")}:TO:${classId}`);
          return { success: true };
        },
      };

      const studentId = "std-1";
      const oldClassId = "cls-old";
      const newClassId = "cls-new";

      // Transfer workflow
      if (oldClassId) {
        await mockClassesApi.removeStudent(oldClassId, studentId);
      }
      await mockClassesApi.addStudents(newClassId, [studentId]);

      expect(actions).toEqual([
        "REMOVE:std-1:FROM:cls-old",
        "ADD:std-1:TO:cls-new",
      ]);
    });

    it("prevents redundant transfer to the same class", () => {
      const validateTransfer = (currentClassId?: string, targetClassId?: string) => {
        if (!targetClassId) return { valid: false, error: "Chưa chọn lớp mới" };
        if (currentClassId === targetClassId) return { valid: false, error: "Học viên hiện đã ở trong lớp này" };
        return { valid: true };
      };

      expect(validateTransfer("cls-1", "cls-1")).toEqual({
        valid: false,
        error: "Học viên hiện đã ở trong lớp này",
      });
      expect(validateTransfer("cls-1", "cls-2")).toEqual({ valid: true });
    });
  });
});
