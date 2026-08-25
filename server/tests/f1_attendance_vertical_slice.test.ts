import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
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

describe("BASELINE F1: ATTENDANCE VERTICAL SLICE (Session -> Attendance -> Complete -> Matrix)", () => {
  let app: FastifyInstance;
  let prisma: any;

  // Personas Tokens
  let adminToken: string;
  let teacherAToken: string;
  let teacherBToken: string;
  let student1Token: string;
  let student2Token: string;
  let student3Token: string;

  // Test UUIDs
  const adminId = "11111111-1111-4111-8111-111111111111";
  const teacherAId = "22222222-2222-4222-8222-222222222222";
  const teacherBId = "33333333-3333-4333-8333-333333333333";
  const student1Id = "44444444-4444-4444-8444-444444444444";
  const student2Id = "55555555-5555-4555-8555-555555555555";
  const student3Id = "66666666-6666-4666-8666-666666666666";
  const foreignStudentId = "77777777-7777-4777-8777-777777777777";

  const courseId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const classAId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const classBId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
  const lesson1Id = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
  const lesson2Id = "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee";
  const session1Id = "12121212-1212-4212-8212-121212121212";
  const session2Id = "34343434-3434-4434-8434-343434343434";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    prisma = mockPrisma;

    // Reset database collections
    await prisma.classAttendance.deleteMany();
    await prisma.classSession.deleteMany();
    await prisma.classStudent.deleteMany();
    await prisma.class.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.user.deleteMany();

    // 1. Seed Personas
    await prisma.user.createMany({
      data: [
        { id: adminId, email: "admin@f1.test", password: "hash", fullName: "Admin Supervisor" },
        { id: teacherAId, email: "teacher_a@f1.test", password: "hash", fullName: "Teacher Alpha" },
        { id: teacherBId, email: "teacher_b@f1.test", password: "hash", fullName: "Teacher Beta" },
        { id: student1Id, email: "student1@f1.test", password: "hash", fullName: "Student One" },
        { id: student2Id, email: "student2@f1.test", password: "hash", fullName: "Student Two" },
        { id: student3Id, email: "student3@f1.test", password: "hash", fullName: "Student Three" },
        { id: foreignStudentId, email: "foreign@f1.test", password: "hash", fullName: "Foreign Student" },
      ],
    });

    await prisma.userRole.createMany({
      data: [
        { userId: adminId, role: "admin" },
        { userId: teacherAId, role: "teacher" },
        { userId: teacherBId, role: "teacher" },
        { userId: student1Id, role: "student" },
        { userId: student2Id, role: "student" },
        { userId: student3Id, role: "student" },
        { userId: foreignStudentId, role: "student" },
      ],
    });

    // 2. Seed Course & Lessons
    await prisma.course.create({
      data: {
        id: courseId,
        title: "IELTS Intensive F1",
        createdBy: adminId,
        isPublished: true,
        isActive: true,
      },
    });

    await prisma.lesson.createMany({
      data: [
        { id: lesson1Id, courseId, title: "Lesson 1: Overview", lessonOrder: 1 },
        { id: lesson2Id, courseId, title: "Lesson 2: Listening Practice", lessonOrder: 2 },
      ],
    });

    // 3. Seed Classes
    await prisma.class.createMany({
      data: [
        { id: classAId, courseId, name: "Class Alpha", teacherId: teacherAId, isActive: true },
        { id: classBId, courseId, name: "Class Beta", teacherId: teacherBId, isActive: true },
      ],
    });

    // 4. Enroll Students (Student 1 & 2 in Class A; Student 3 in Class B)
    await prisma.classStudent.createMany({
      data: [
        { classId: classAId, studentId: student1Id, status: "ACTIVE" },
        { classId: classAId, studentId: student2Id, status: "ACTIVE" },
        { classId: classBId, studentId: student3Id, status: "ACTIVE" },
      ],
    });

    // 5. Seed Sessions for Class A
    await prisma.classSession.createMany({
      data: [
        { id: session1Id, classId: classAId, lessonId: lesson1Id, sessionNumber: 1, plannedDate: new Date("2026-08-01"), status: "SCHEDULED" },
        { id: session2Id, classId: classAId, lessonId: lesson2Id, sessionNumber: 2, plannedDate: new Date("2026-08-03"), status: "SCHEDULED" },
      ],
    });

    // Generate JWT Tokens
    adminToken = (app as any).jwt.sign({ id: adminId, email: "admin@f1.test", roles: ["admin"] });
    teacherAToken = (app as any).jwt.sign({ id: teacherAId, email: "teacher_a@f1.test", roles: ["teacher"] });
    teacherBToken = (app as any).jwt.sign({ id: teacherBId, email: "teacher_b@f1.test", roles: ["teacher"] });
    student1Token = (app as any).jwt.sign({ id: student1Id, email: "student1@f1.test", roles: ["student"] });
    student2Token = (app as any).jwt.sign({ id: student2Id, email: "student2@f1.test", roles: ["student"] });
    student3Token = (app as any).jwt.sign({ id: student3Id, email: "student3@f1.test", roles: ["student"] });
  });

  afterAll(async () => {
    await app.close();
  });

  // =========================================================================
  // 1. MARK ATTENDANCE & BAC CHECKS
  // =========================================================================
  describe("F1-A1: Attendance Marking & Authorization Guards", () => {
    it("1.1 Student attempting to mark attendance must be rejected with 403 Forbidden", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { items: [{ studentId: student1Id, status: "PRESENT" }] },
      });
      expect(res.statusCode).toBe(403);
    });

    it("1.2 Teacher B (Not Teacher of Class A) attempting to mark attendance must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { items: [{ studentId: student1Id, status: "PRESENT" }] },
      });
      expect(res.statusCode).toBe(403);
    });

    it("1.3 Teacher A marking attendance for invalid/foreign student must be rejected with 400 INVALID_ENROLLMENT_STUDENT", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          items: [
            { studentId: student1Id, status: "PRESENT" },
            { studentId: foreignStudentId, status: "PRESENT" },
          ],
        },
      });
      expect(res.statusCode).toBe(400);
      const json = JSON.parse(res.payload);
      expect(json.error).toBe("INVALID_ENROLLMENT_STUDENT");
    });

    it("1.4 Teacher A marking attendance for Student 1 and Student 2 must succeed (200) and create DB rows", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          items: [
            { studentId: student1Id, status: "PRESENT", note: "On time" },
            { studentId: student2Id, status: "PRESENT", note: "On time" },
          ],
        },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);

      // Verify records in database
      const att1 = await prisma.classAttendance.findUnique({
        where: { classId_studentId_sessionDate: { classId: classAId, studentId: student1Id, sessionDate: new Date("2026-08-01") } },
      });
      expect(att1).not.toBeNull();
      expect(att1.status).toBe("PRESENT");
      expect(att1.note).toBe("On time");

      const att2 = await prisma.classAttendance.findUnique({
        where: { classId_studentId_sessionDate: { classId: classAId, studentId: student2Id, sessionDate: new Date("2026-08-01") } },
      });
      expect(att2).not.toBeNull();
      expect(att2.status).toBe("PRESENT");
    });

    it("1.5 Teacher A marking same attendance again updates records idempotently", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          items: [
            { studentId: student1Id, status: "EXCUSED", note: "Medical leave" },
          ],
        },
      });
      expect(res.statusCode).toBe(200);

      const att1 = await prisma.classAttendance.findUnique({
        where: { classId_studentId_sessionDate: { classId: classAId, studentId: student1Id, sessionDate: new Date("2026-08-01") } },
      });
      expect(att1.status).toBe("EXCUSED");
      expect(att1.note).toBe("Medical leave");
    });
  });

  // =========================================================================
  // 2. COMPLETE SESSION & IMMUTABILITY GUARD
  // =========================================================================
  describe("F1-A2: Session Completion & Immutability Guard", () => {
    it("2.1 Completing session when active students are UNMARKED must be rejected with 400", async () => {
      // Session 2 currently has NO attendance marked for student 1 & 2
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session2Id}/complete`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(400);
      const json = JSON.parse(res.payload);
      expect(json.error).toContain("chưa được điểm danh");
    });

    it("2.2 Teacher A completing Session 1 (100% marked) must succeed (200) and set status to COMPLETED", async () => {
      // Re-mark student 1 as PRESENT
      await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          items: [
            { studentId: student1Id, status: "PRESENT", note: "Present" },
            { studentId: student2Id, status: "PRESENT", note: "Present" },
          ],
        },
      });

      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/complete`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(200);

      const sess = await prisma.classSession.findUnique({ where: { id: session1Id } });
      expect(sess.status).toBe("COMPLETED");
      expect(sess.completedAt).not.toBeNull();
    });

    it("2.3 Teacher A attempting to edit attendance on COMPLETED session must be rejected with 403 SESSION_ALREADY_COMPLETED", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: {
          items: [{ studentId: student1Id, status: "ABSENT" }],
        },
      });
      expect(res.statusCode).toBe(403);
      const json = JSON.parse(res.payload);
      expect(json.error).toBe("SESSION_ALREADY_COMPLETED");
    });

    it("2.4 Admin editing attendance on COMPLETED session must succeed (Admin Override)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          items: [{ studentId: student1Id, status: "PRESENT", note: "Admin verified" }],
        },
      });
      expect(res.statusCode).toBe(200);

      const att1 = await prisma.classAttendance.findUnique({
        where: { classId_studentId_sessionDate: { classId: classAId, studentId: student1Id, sessionDate: new Date("2026-08-01") } },
      });
      expect(att1.note).toBe("Admin verified");
    });
  });

  // =========================================================================
  // 3. READ ATTENDANCE & PRIVACY ISOLATION
  // =========================================================================
  describe("F1-A3: Attendance Read & Privacy Boundary", () => {
    it("3.1 Student 1 reading Session 1 attendance gets ONLY own record and summary is null (Privacy Isolation)", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${student1Token}` },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
      expect(json.data.summary).toBeNull();
      expect(json.data.students.length).toBe(1);
      expect(json.data.students[0].studentId).toBe(student1Id);
      expect(json.data.students[0].status).toBe("PRESENT");
    });

    it("3.2 Teacher A reading Session 1 attendance gets full class summary and all students", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
      expect(json.data.summary).not.toBeNull();
      expect(json.data.summary.total).toBe(2);
      expect(json.data.summary.present).toBe(2);
      expect(json.data.students.length).toBe(2);
    });

    it("3.3 Student 3 (Enrolled in Class B, not Class A) reading Class A attendance must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/sessions/${session1Id}/attendance`,
        headers: { authorization: `Bearer ${student3Token}` },
      });
      expect(res.statusCode).toBe(403);
    });
  });

  // =========================================================================
  // 4. ATTENDANCE MATRIX & COVERAGE CALCULATION
  // =========================================================================
  describe("F1-A4: Attendance Matrix Calculation & Projection", () => {
    it("4.1 Teacher A requesting Attendance Matrix gets accurate coverage, rates, and session breakdown", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/attendance-matrix`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
      expect(json.data.classId).toBe(classAId);
      expect(json.data.totalSessions).toBe(2);
      expect(json.data.completedSessions).toBe(1);
      expect(json.data.sessionCoverage).toBe(50); // 1 of 2 completed = 50%
      expect(json.data.sessions.length).toBe(2);
      expect(json.data.sessions[0].lessonTitle).toBeDefined();
      expect(json.data.sessions[0].title).toBeDefined();

      // Check student rows
      expect(json.data.students.length).toBe(2);
      const s1 = json.data.students.find((s: any) => s.studentId === student1Id);
      expect(s1).toBeDefined();
      expect(s1.presentCount).toBe(1);
      expect(s1.attendanceRate).toBe(100);
      expect(s1.sessions.length).toBe(2);
      expect(s1.sessions[0].attendanceStatus).toBe("PRESENT");
      expect(s1.sessions[1].attendanceStatus).toBe("UNMARKED");
    });

    it("4.2 Student 1 requesting Attendance Matrix receives only their own row", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/attendance-matrix`,
        headers: { authorization: `Bearer ${student1Token}` },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.data.students.length).toBe(1);
      expect(json.data.students[0].studentId).toBe(student1Id);
    });

    it("4.3 Student 3 (not in Class A) requesting Class A matrix must be rejected with 403", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${classAId}/attendance-matrix`,
        headers: { authorization: `Bearer ${student3Token}` },
      });
      expect(res.statusCode).toBe(403);
    });

    it("4.4 Querying non-existent class matrix returns 404 Not Found", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/99999999-9999-4999-8999-999999999999/attendance-matrix`,
        headers: { authorization: `Bearer ${teacherAToken}` },
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
