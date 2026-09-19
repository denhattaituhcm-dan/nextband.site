import { describe, it, expect, vi } from "vitest";
import {
  getTeacherStudentIds,
  getClassStudentIds,
  isStudentInTeacherClasses,
  isTeacherOfClass,
} from "../utils/teacherScope.js";

describe("Phase 2: Canonical Teacher Scope Unit Tests", () => {
  it("getTeacherStudentIds returns canonical studentIds directly from classStudent without querying User table OR id/userId branches", async () => {
    const mockPrisma: any = {
      classStudent: {
        findMany: vi.fn().mockResolvedValue([
          { studentId: "auth-uid-1" },
          { studentId: "auth-uid-2" },
          { studentId: "auth-uid-1" }, // duplicate check
        ]),
      },
      user: {
        findMany: vi.fn(),
      },
    };

    const studentIds = await getTeacherStudentIds(mockPrisma, "teacher-123");

    expect(studentIds).toEqual(["auth-uid-1", "auth-uid-2"]);
    expect(mockPrisma.classStudent.findMany).toHaveBeenCalledWith({
      where: {
        class: { teacherId: "teacher-123" },
        deletedAt: null,
      },
      select: { studentId: true },
    });
    // Strict requirement: User table must NOT be queried with dual id/userId OR cascades
    expect(mockPrisma.user.findMany).not.toHaveBeenCalled();
  });

  it("getTeacherStudentIds returns empty array when teacher has no students", async () => {
    const mockPrisma: any = {
      classStudent: {
        findMany: vi.fn().mockResolvedValue([]),
      },
      user: {
        findMany: vi.fn(),
      },
    };

    const studentIds = await getTeacherStudentIds(mockPrisma, "teacher-empty");
    expect(studentIds).toEqual([]);
    expect(mockPrisma.user.findMany).not.toHaveBeenCalled();
  });

  it("getClassStudentIds returns canonical studentIds directly from classStudent without querying User table", async () => {
    const mockPrisma: any = {
      classStudent: {
        findMany: vi.fn().mockResolvedValue([
          { studentId: "auth-uid-10" },
          { studentId: "auth-uid-20" },
        ]),
      },
      user: {
        findMany: vi.fn(),
      },
    };

    const studentIds = await getClassStudentIds(mockPrisma, "class-999");

    expect(studentIds).toEqual(["auth-uid-10", "auth-uid-20"]);
    expect(mockPrisma.classStudent.findMany).toHaveBeenCalledWith({
      where: { classId: "class-999", deletedAt: null },
      select: { studentId: true },
    });
    expect(mockPrisma.user.findMany).not.toHaveBeenCalled();
  });

  it("isStudentInTeacherClasses uses canonical studentId in count filter", async () => {
    const mockPrisma: any = {
      classStudent: {
        count: vi.fn().mockResolvedValue(1),
      },
    };

    const hasAccess = await isStudentInTeacherClasses(mockPrisma, "teacher-1", "auth-uid-1");
    expect(hasAccess).toBe(true);
    expect(mockPrisma.classStudent.count).toHaveBeenCalledWith({
      where: {
        studentId: "auth-uid-1",
        class: { teacherId: "teacher-1" },
      },
    });
  });

  it("isTeacherOfClass validates teacher ownership", async () => {
    const mockPrisma: any = {
      class: {
        findFirst: vi.fn().mockResolvedValue({ id: "class-1", teacherId: "teacher-1" }),
      },
    };

    const isOwner = await isTeacherOfClass(mockPrisma, "teacher-1", "class-1");
    expect(isOwner).toBe(true);
  });
});
