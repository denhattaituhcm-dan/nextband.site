import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import fp from "fastify-plugin";
import { createMockPrisma } from "./mockPrisma.js";

// Mock Prisma plugin with In-Memory Mock
const mockPrisma = createMockPrisma();
vi.mock("../plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" },
    ),
  };
});

import { buildApp } from "../app.js";
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
  const subA1Id = "sub-11111111-1111-4111-8111-111111111111";

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
    const examAId = "faaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
    const examBId = "fbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
    const subA1Id = "sub-11111111-1111-4111-8111-111111111111";

    await prisma.course.create({
      data: {
        id: courseAId,
        title: "Course A (Teacher A)",
        createdBy: teacherAId,
        teacherId: teacherAId,
        isPublished: true,
        isActive: true,
      },
    });

    await prisma.exam.create({
      data: {
        id: examAId,
        courseId: courseAId,
        title: "Exam A",
        durationMinutes: 60,
        isActive: true,
        isPublished: true,
      },
    });

    await prisma.examSubmission.create({
      data: {
        id: subA1Id,
        examId: examAId,
        studentId: student1Id,
        status: "SUBMITTED",
        submittedAt: new Date(),
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
  // 1. PATH TRAVERSAL ATTACK SUITE (DELETE /api/v1/uploads)
  // =========================================================================
  describe("Path Traversal Attacks on /api/v1/uploads", () => {
    it("1.1 Non-admin trying to delete upload must be rejected with 403", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { url: "/uploads/images/sample.png" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("1.2 Relative path traversal '../' payload must be blocked", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/../../../etc/passwd" },
      });
      expect([400, 403]).toContain(res.statusCode);
    });

    it("1.3 Traversal attempting to delete backend source code must be blocked", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/../../src/app.ts" },
      });
      expect([400, 403]).toContain(res.statusCode);
    });

    it("1.4 Dot-slash self referencing '/./' traversal must be blocked or safely normalized", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/./././secret.env" },
      });
      expect([400, 403, 404]).toContain(res.statusCode);
    });

    it("1.5 URL Encoded traversal payload '%2e%2e%2fpackage.json' must be blocked", async () => {
      const res = await app.inject({
        method: "DELETE",
        url: "/api/v1/uploads",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { url: "/uploads/images/%2e%2e%2fpackage.json" },
      });
      expect([400, 403]).toContain(res.statusCode);
    });
  });

  // =========================================================================
  // 2. BAC TEST SUITE: CANONICAL EXAM AUTHORING IDOR (PUT /api/v1/exams/:id)
  // =========================================================================
  describe("BAC: Exam Authoring IDOR Protection (PUT /api/v1/exams/:id)", () => {
    const examAId = "faaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

    it("2.1 Anonymous must be rejected with 401", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/exams/${examAId}`,
        payload: { title: "Hack Exam Title" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("2.2 Student must be rejected with 403", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/exams/${examAId}`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { title: "Student Modifies Exam" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.3 Teacher B (Does NOT own Course A) modifying Exam A must be rejected with 403", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/exams/${examAId}`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { title: "Teacher B intrudes Exam A" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("2.4 Teacher A (Owner of Course A) modifying Exam A must succeed (200)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/exams/${examAId}`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { title: "Teacher A Valid Update" },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.title).toBe("Teacher A Valid Update");
    });

    it("2.5 Admin modifying any exam must succeed (200)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/exams/${examAId}`,
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { title: "Admin Valid Update" },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  // =========================================================================
  // 3. BAC TEST SUITE: CANONICAL SUBMISSION GRADING (POST /api/v1/submissions/:id/grade)
  // =========================================================================
  describe("BAC: Canonical Exam Submission Grading (POST /api/v1/submissions/:id/grade)", () => {
    const subA1Id = "sub-11111111-1111-4111-8111-111111111111";

    it("3.1 Anonymous must be rejected with 401", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subA1Id}/grade`,
        payload: { grades: [], totalScore: 9.0, feedback: "Great" },
      });
      expect(res.statusCode).toBe(401);
    });

    it("3.2 Student attempting to grade must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subA1Id}/grade`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { grades: [], totalScore: 10.0, feedback: "I am genius" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("3.3 Teacher B (Student 1 not in Teacher B's class) attempting to grade must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subA1Id}/grade`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { grades: [], totalScore: 5.0, feedback: "Intrusion" },
      });
      expect(res.statusCode).toBe(403);
    });

    it("3.4 Teacher A (Managing Student 1's Class A) grading submission must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subA1Id}/grade`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { grades: [], totalScore: 8.5, feedback: "Well done" },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.status).toBe("GRADED");
    });

    it("3.5 Admin grading any submission must succeed (200)", async () => {
      const adminSubId = "sub-22222222-2222-4222-8222-222222222222";
      await prisma.examSubmission.create({
        data: {
          id: adminSubId,
          examId: "faaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
          studentId: student2Id,
          status: "SUBMITTED",
        },
      });

      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${adminSubId}/grade`,
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { grades: [], totalScore: 9.0, feedback: "Admin grade" },
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
    it("6.1 Teacher A querying submissions for Class B must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions?classId=${classBId}`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(403);
    });

    it("6.2 Student 2 attempting to read Student 1's submission must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${subA1Id}`,
        headers: { authorization: `Bearer ${student2Token}` },
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
