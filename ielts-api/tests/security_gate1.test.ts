import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import fp from "fastify-plugin";
import { createMockPrisma } from "./mockPrisma.js";

// Mock Prisma plugin with In-Memory Mock
const mockPrisma = createMockPrisma();
vi.mock("../src/plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" },
    ),
  };
});

import { buildApp } from "../src/app.js";
import { FastifyInstance } from "fastify";

describe("GATE 1 SECURITY AUDIT & OBJECT-LEVEL AUTHORIZATION TEST SUITE", () => {
  let app: FastifyInstance;
  let prisma: any;

  // 5 Authorization Personas Tokens
  let adminToken: string;
  let teacherAToken: string;
  let teacherBToken: string;
  let student1Token: string;
  let student2Token: string;

  // Test Entities Valid UUIDs
  const adminId = "a1111111-1111-4111-8111-111111111111";
  const teacherAId = "a2222222-2222-4222-8222-222222222222";
  const teacherBId = "a3333333-3333-4333-8333-333333333333";
  const student1Id = "a4444444-4444-4444-8444-444444444444";
  const student2Id = "a5555555-5555-4555-8555-555555555555";

  const courseAId = "c1111111-1111-4111-8111-111111111111";
  const classAId = "c2222222-2222-4222-8222-222222222222";
  const classBId = "c3333333-3333-4333-8333-333333333333";
  const sessionAId = "99999999-9999-4999-8999-999999999999";
  const sessionBId = "00000000-0000-4000-8000-000000000000";
  const lessonAId = "baaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const lessonBId = "caaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const hwAId = "daaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const hwBId = "eaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    prisma = mockPrisma;

    // Clean up mock
    await prisma.submission.deleteMany();
    await prisma.homework.deleteMany();
    await prisma.classAttendance.deleteMany();
    await prisma.classSession.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.classStudent.deleteMany();
    await prisma.class.deleteMany();
    await prisma.course.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.user.deleteMany();

    // Seed 5 Personas in Mock Database
    await prisma.user.createMany({
      data: [
        { id: adminId, email: "admin_sec@example.com", password: "hash", fullName: "Admin Security" },
        { id: teacherAId, email: "teacher_a_sec@example.com", password: "hash", fullName: "Teacher A" },
        { id: teacherBId, email: "teacher_b_sec@example.com", password: "hash", fullName: "Teacher B" },
        { id: student1Id, email: "student_1_sec@example.com", password: "hash", fullName: "Student 1 in Class A" },
        { id: student2Id, email: "student_2_sec@example.com", password: "hash", fullName: "Student 2 in Class B" },
      ],
    });

    await prisma.userRole.createMany({
      data: [
        { userId: adminId, role: "admin" },
        { userId: teacherAId, role: "teacher" },
        { userId: teacherBId, role: "teacher" },
        { userId: student1Id, role: "student" },
        { userId: student2Id, role: "student" },
      ],
    });

    // Seed Course, Classes, Lessons, Sessions
    await prisma.course.create({
      data: {
        id: courseAId,
        title: "Security Test Course",
        createdBy: adminId,
        isPublished: true,
        isActive: true,
      },
    });

    await prisma.lesson.createMany({
      data: [
        { id: lessonAId, courseId: courseAId, title: "Lesson A", lessonOrder: 1 },
        { id: lessonBId, courseId: courseAId, title: "Lesson B", lessonOrder: 2 },
      ],
    });

    await prisma.class.createMany({
      data: [
        { id: classAId, courseId: courseAId, name: "Class A (Teacher A)", teacherId: teacherAId, isActive: true },
        { id: classBId, courseId: courseAId, name: "Class B (Teacher B)", teacherId: teacherBId, isActive: true },
      ],
    });

    await prisma.classStudent.createMany({
      data: [
        { classId: classAId, studentId: student1Id, status: "ACTIVE" },
        { classId: classBId, studentId: student2Id, status: "ACTIVE" },
      ],
    });

    await prisma.classSession.createMany({
      data: [
        { id: sessionAId, classId: classAId, lessonId: lessonAId, sessionNumber: 1, sessionDate: new Date("2026-08-10") },
        { id: sessionBId, classId: classBId, lessonId: lessonBId, sessionNumber: 1, sessionDate: new Date("2026-08-10") },
      ],
    });

    await prisma.homework.createMany({
      data: [
        { id: hwAId, classId: classAId, title: "Homework A", createdBy: teacherAId },
        { id: hwBId, classId: classBId, title: "Homework B", createdBy: teacherBId },
      ],
    });

    await prisma.submission.create({
      data: {
        homeworkId: hwAId,
        studentId: student1Id,
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    });

    // Sign JWT Tokens
    adminToken = (app as any).jwt.sign({ id: adminId, email: "admin_sec@example.com", roles: ["admin"] });
    teacherAToken = (app as any).jwt.sign({ id: teacherAId, email: "teacher_a_sec@example.com", roles: ["teacher"] });
    teacherBToken = (app as any).jwt.sign({ id: teacherBId, email: "teacher_b_sec@example.com", roles: ["teacher"] });
    student1Token = (app as any).jwt.sign({ id: student1Id, email: "student_1_sec@example.com", roles: ["student"] });
    student2Token = (app as any).jwt.sign({ id: student2Id, email: "student_2_sec@example.com", roles: ["student"] });
  });

  afterAll(async () => {
    await app.close();
  });

  // =========================================================================
  // 1. ABUSE TEST SUITE: PATH TRAVERSAL & DELETION AUTH ON /uploads
  // =========================================================================
  describe("Abuse Suite: Path Traversal & Boundary Check (DELETE /api/v1/uploads)", () => {
    it("1.1 Anonymous request must be rejected with 401", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        payload: { url: "/uploads/images/sample.png" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("1.2 Student persona must be rejected with 403 Forbidden", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { url: "/uploads/images/sample.png" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("1.3 Traversal payload '../package.json' must be blocked and package.json must remain intact", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/../../package.json" },
      });
      expect([400, 403]).toContain(res.statusCode);
      // Side-effect assertion: package.json must still exist!
      expect(existsSync(join(process.cwd(), "package.json"))).toBe(true);
    });

    it("1.4 Windows traversal payload '..\\..\\src/app.ts' must be blocked and app.ts must remain intact", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/..\\..\\src/app.ts" },
      });
      expect([400, 403]).toContain(res.statusCode);
      expect(existsSync(join(process.cwd(), "src/app.ts"))).toBe(true);
    });

    it("1.5 URL Encoded traversal payload '%2e%2e%2fpackage.json' must be blocked", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/%2e%2e%2fpackage.json" },
      });
      expect([400, 403]).toContain(res.statusCode);
      expect(existsSync(join(process.cwd(), "package.json"))).toBe(true);
    });

    it("1.6 Double Encoded traversal payload '%252e%252e%252fpackage.json' must be blocked", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/%252e%252e%252fpackage.json" },
      });
      expect([400, 403]).toContain(res.statusCode);
      expect(existsSync(join(process.cwd(), "package.json"))).toBe(true);
    });

    it("1.7 Absolute path outside uploads '/etc/passwd' must be blocked", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/etc/passwd" },
      });
      expect([400, 403]).toContain(res.statusCode);
    });
  });

  // =========================================================================
  // 2. BAC TEST SUITE: HOMEWORK CREATION (POST /api/v1/homeworks/create)
  // =========================================================================
  describe("BAC: Homework Creation (POST /api/v1/homeworks/create)", () => {
    it("2.1 Anonymous must be rejected with 401", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/create",
        payload: { classId: classAId, title: "Hack Homework" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("2.2 Student must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/create",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { classId: classAId, title: "Student Homework" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.3 Teacher B (Wrong Class) trying to create homework for Class A must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/create",
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { classId: classAId, title: "Teacher B intrudes Class A" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.4 Teacher A (Owner of Class A) must be allowed to create homework (201)", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/create",
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { classId: classAId, title: "Teacher A Homework Valid" },
      });
      expect(res.statusCode).toBe(201);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
      expect(json.homework.title).toBe("Teacher A Homework Valid");
    });

    it("2.5 Admin must be allowed to create homework for any class (201)", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/create",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { classId: classAId, title: "Admin Homework Valid" },
      });
      expect(res.statusCode).toBe(201);
    });
  });

  // =========================================================================
  // 3. BAC TEST SUITE: HOMEWORK GRADING (POST /api/v1/homeworks/grade)
  // =========================================================================
  describe("BAC: Homework Grading (POST /api/v1/homeworks/grade)", () => {
    it("3.1 Anonymous must be rejected with 401", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/grade",
        payload: { homeworkId: hwAId, studentId: student1Id, score: 9.0, feedback: "Great" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("3.2 Student attempting to self-grade must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/grade",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { homeworkId: hwAId, studentId: student1Id, score: 10.0, feedback: "I am genius" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("3.3 Teacher B attempting to grade Class A submission must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/grade",
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { homeworkId: hwAId, studentId: student1Id, score: 5.0, feedback: "Intrusion" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("3.4 Teacher A (Owner of Class A) grading Class A submission must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/grade",
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { homeworkId: hwAId, studentId: student1Id, score: 8.5, feedback: "Well done" },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
      expect(json.submission.status).toBe("GRADED");
    });

    it("3.5 Admin grading any submission must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/grade",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { homeworkId: hwAId, studentId: student1Id, score: 9.0, feedback: "Admin grade" },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  // =========================================================================
  // 4. BAC TEST SUITE: ATTENDANCE MUTATION & COMPLETE
  // =========================================================================
  describe("BAC: Attendance Marking & Session Complete", () => {
    it("4.1 Student attempting to mark attendance must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { items: [{ studentId: student1Id, status: "PRESENT" }] },
      });
      expect(res.statusCode).toBe(403);
    });

    it("4.2 Teacher B attempting to mark attendance for Class A must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { items: [{ studentId: student1Id, status: "PRESENT" }] },
      });
      expect(res.statusCode).toBe(403);
    });

    it("4.3 Teacher A marking attendance for Class A must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { items: [{ studentId: student1Id, status: "PRESENT", note: "On time" }] },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
    });

    it("4.4 Student attempting to complete session must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/complete`,
        headers: { authorization: `Bearer ${student1Token}` },
      });
      expect(res.statusCode).toBe(403);
    });

    it("4.5 Teacher B attempting to complete Class A session must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/complete`,
        headers: { authorization: `Bearer ${teacherBToken}` },
      });
      expect(res.statusCode).toBe(403);
    });

    it("4.6 Teacher A completing Class A session must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/complete`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  // =========================================================================
  // 5. OBJECT-LEVEL AUTHORIZATION: ATTENDANCE READ
  // =========================================================================
  describe("Object-Level Authorization: Attendance Read", () => {
    it("5.1 Anonymous read must be rejected with 401", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
      });
      expect(res.statusCode).toBe(401);
    });

    it("5.2 Teacher B (Wrong Class) reading Class A attendance must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${teacherBToken}` },
      });
      expect(res.statusCode).toBe(403);
    });

    it("5.3 Teacher A (Class Teacher) reading Class A attendance gets full summary & list (200)", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.data.summary).not.toBeNull();
      expect(json.data.students.length).toBeGreaterThan(0);
    });

    it("5.4 Student 1 (Enrolled in Class A) reading attendance gets ONLY own record and summary is null (200)", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${student1Token}` },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.data.summary).toBeNull(); // Privacy isolation
      expect(json.data.students.length).toBe(1);
      expect(json.data.students[0].studentId).toBe(student1Id);
    });

    it("5.5 Student 2 (NOT in Class A) reading Class A attendance must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${sessionAId}/attendance`,
        headers: { authorization: `Bearer ${student2Token}` },
      });
      expect(res.statusCode).toBe(403);
    });
  });

  // =========================================================================
  // 6. NEGATIVE REGRESSION: IDOR & CROSS-CLASS TAMPERING
  // =========================================================================
  describe("Negative Regression: Cross-Class Tampering & Isolation", () => {
    it("6.1 Teacher A querying teacher-workspace for Class B must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/homeworks/teacher-workspace?classId=${classBId}`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(403);
    });

    it("6.2 Student 1 attempting to submit Homework B (Class B) must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/submit",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { homeworkId: hwBId },
      });
      expect(res.statusCode).toBe(403);
    });

    it("6.3 Student attempting to generate invitation code must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(403);
    });

    it("6.4 Teacher B attempting to generate invitation code for Class A must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(403);
    });

    it("6.5 Teacher A generating invitation code for own Class A must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
      expect(json.invitation.inviteCode).toBeDefined();
    });
  });
});
