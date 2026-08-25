import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../app.js";

const mockPrisma = createMockPrisma();
vi.mock("../plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" }
    ),
  };
});

describe("🛡️ GATE G3: SECURITY BOUNDARY & OWNERSHIP ENFORCEMENT", () => {
  let app: FastifyInstance;

  const studentAId = "std-aaa-1111-2222-3333-444444444444";
  const studentBId = "std-bbb-5555-6666-7777-888888888888";
  const teacherAId = "tch-aaa-1111-2222-3333-444444444444";
  const teacherBId = "tch-bbb-5555-6666-7777-888888888888";
  const adminId = "adm-root-1111-2222-3333-444444444444";

  let studentAToken: string;
  let teacherAToken: string;
  let adminToken: string;

  const classAId = "cls-aaa-1111-2222-3333-444444444444";
  const classBId = "cls-bbb-5555-6666-7777-888888888888";
  const subAId = "sub-aaa-1111-2222-3333-444444444444";
  const subBId = "sub-bbb-5555-6666-7777-888888888888";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    studentAToken = app.jwt.sign({ id: studentAId, roles: ["student"], email: "student.a@test.com" });
    teacherAToken = app.jwt.sign({ id: teacherAId, roles: ["teacher"], email: "teacher.a@test.com" });
    adminToken = app.jwt.sign({ id: adminId, roles: ["admin"], email: "admin@test.com" });

    // Seed mock database
    mockPrisma.users.push(
      { id: studentAId, email: "student.a@test.com", fullName: "Student A" },
      { id: studentBId, email: "student.b@test.com", fullName: "Student B" },
      { id: teacherAId, email: "teacher.a@test.com", fullName: "Teacher A" },
      { id: teacherBId, email: "teacher.b@test.com", fullName: "Teacher B" },
      { id: adminId, email: "admin@test.com", fullName: "Admin" }
    );

    mockPrisma.classes.push(
      { id: classAId, name: "Class A", teacherId: teacherAId, isActive: true },
      { id: classBId, name: "Class B", teacherId: teacherBId, isActive: true }
    );

    mockPrisma.examSubmissions.push(
      {
        id: subAId,
        studentId: studentAId,
        examId: "exam-1",
        status: "GRADED",
        totalScore: 8.0,
      },
      {
        id: subBId,
        studentId: studentBId,
        examId: "exam-1",
        status: "GRADED",
        totalScore: 7.0,
      }
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe("G3-D: Submission Ownership & IDOR Protection", () => {
    it("🔒 IDOR: Student A CANNOT read Student B submission (Returns HTTP 403)", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${subBId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });

      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.body);
      expect(body.error).toMatch(/Từ chối truy cập/i);
    });

    it("✅ Student A CAN read their own submission (Returns HTTP 200)", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/submissions/${subAId}`,
        headers: { authorization: `Bearer ${studentAToken}` },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.id).toBe(subAId);
      expect(body.studentId).toBe(studentAId);
    });

    it("🔒 Student CANNOT directly mutate score via grading endpoint (Returns HTTP 403)", async () => {
      const res = await app.inject({
        method: "POST",
        url: `/api/v1/submissions/${subAId}/grade`,
        headers: { authorization: `Bearer ${studentAToken}` },
        payload: {
          grades: [{ answerId: "ans-1", score: 9.0 }],
          totalScore: 9.0,
        },
      });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("G3-D: Class Ownership & RBAC Protection", () => {
    it("🔒 IDOR: Teacher A CANNOT modify Class B managed by Teacher B (Returns HTTP 403)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/classes/${classBId}`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { name: "Hacked Class B" },
      });

      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.body);
      expect(body.error).toMatch(/bạn không có quyền sửa lớp này/i);
    });

    it("✅ Teacher A CAN modify Class A managed by them (Returns HTTP 200)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/classes/${classAId}`,
        headers: { authorization: `Bearer ${teacherAToken}` },
        payload: { name: "Class A Updated" },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.name).toBe("Class A Updated");
    });

    it("✅ Admin CAN modify any class (Returns HTTP 200)", async () => {
      const res = await app.inject({
        method: "PUT",
        url: `/api/v1/classes/${classBId}`,
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { name: "Class B Admin Modified" },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.name).toBe("Class B Admin Modified");
    });
  });

  describe("G3-E: Observability & Traceability Verification", () => {
    it("📡 Every API response MUST contain an X-Request-ID header", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/submissions",
        headers: { authorization: `Bearer ${studentAToken}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers["x-request-id"]).toBeDefined();
      expect(typeof res.headers["x-request-id"]).toBe("string");
      expect((res.headers["x-request-id"] as string).length).toBeGreaterThan(0);
    });
  });
});
