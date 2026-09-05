import { describe, it, expect } from "vitest";
import { detectVRSCourse } from "@/pages/VisualReconstructionPage";

describe("VRS Course Allocation & Class Code Detection", () => {
  describe("detectVRSCourse pure mapping", () => {
    it("identifies Dreamer course from class code 'D01 07.2026'", () => {
      const result = detectVRSCourse({
        className: "D01 07.2026",
        courseTitle: "DREAMER",
      });
      expect(result).toBe("dreamer");
    });

    it("identifies Dreamer course from courseSlug 'dreamer'", () => {
      const result = detectVRSCourse({
        className: "Class Alpha",
        courseTitle: "General English",
        courseSlug: "dreamer",
      });
      expect(result).toBe("dreamer");
    });

    it("identifies Builder course from class code 'B01 07.2026'", () => {
      const result = detectVRSCourse({
        className: "B01 07.2026",
        courseTitle: "BUILDER",
      });
      expect(result).toBe("builder");
    });

    it("identifies Builder course from courseSlug 'builder'", () => {
      const result = detectVRSCourse({
        className: "Class Beta",
        courseTitle: "Khóa Học IELTS",
        courseSlug: "builder",
      });
      expect(result).toBe("builder");
    });

    it("identifies Dreamer course from Vietnamese rank title 'Học Sĩ'", () => {
      const result = detectVRSCourse({
        className: "Lớp Tối 2-4-6",
        courseTitle: "Khóa Học Sĩ IELTS",
      });
      expect(result).toBe("dreamer");
    });

    it("identifies Builder course from Vietnamese rank title 'Học Sư'", () => {
      const result = detectVRSCourse({
        className: "Lớp Tối 3-5-7",
        courseTitle: "Khóa Học Sư IELTS",
      });
      expect(result).toBe("builder");
    });

    it("returns null for empty or unknown enrollments", () => {
      expect(detectVRSCourse(null)).toBeNull();
      expect(detectVRSCourse(undefined)).toBeNull();
      expect(
        detectVRSCourse({
          className: "Random Class",
          courseTitle: "Random Title",
        })
      ).toBeNull();
    });
  });

  describe("Student Isolation: denhattaituhcm@gmail.com in D01 07.2026", () => {
    it("locks denhattaituhcm@gmail.com strictly into Dreamer course", () => {
      const studentEnrollment = {
        id: "ba6d9646-9247-4155-8d76-aebc9e5ecba5",
        classId: "0defcb78-0eca-490e-8e41-476eedffe353",
        className: "D01 07.2026",
        courseId: "605d3bec-7a80-4cb7-ba7f-ecc74e77e1ab",
        courseTitle: "DREAMER",
        courseSlug: "dreamer",
        teacherName: "Teacher Dan",
        isActive: true,
        membershipStatus: "ACTIVE",
        joinedAt: "2026-08-14T06:10:48.248Z",
      };

      const detected = detectVRSCourse(studentEnrollment);
      expect(detected).toBe("dreamer");
      expect(detected).not.toBe("builder");
    });
  });
});
