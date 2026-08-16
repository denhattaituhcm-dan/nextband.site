import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
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

describe("GATE 2 SECURITY TEST SUITE: CORS, RATE LIMITING, INVITATION BAC & ADMIN BOUNDARIES", () => {
  let app: FastifyInstance;
  let prisma: any;

  // 5 Authorization Personas Tokens
  let adminToken: string;
  let teacherAToken: string;
  let teacherBToken: string;
  let student1Token: string;

  // Test Entities Valid UUIDs
  const adminId = "11111111-1111-4111-8111-111111111111";
  const teacherAId = "22222222-2222-4222-8222-222222222222";
  const teacherBId = "33333333-3333-4333-8333-333333333333";
  const student1Id = "44444444-4444-4444-8444-444444444444";

  const courseAId = "66666666-6666-4666-8666-666666666666";
  const classAId = "77777777-7777-4777-8777-777777777777";
  const classBId = "88888888-8888-4888-8888-888888888888";
  const nonexistentClassId = "99999999-9999-4999-8999-999999999999";
  const nonexistentHwId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const nonexistentSessionId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

  beforeAll(async () => {
    // Set NODE_ENV to production for testing production CORS rules
    process.env.NODE_ENV = "production";
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
        { id: adminId, email: "admin_sec2@example.com", password: "hash", fullName: "Admin Security 2" },
        { id: teacherAId, email: "teacher_a_sec2@example.com", password: "hash", fullName: "Teacher A" },
        { id: teacherBId, email: "teacher_b_sec2@example.com", password: "hash", fullName: "Teacher B" },
        { id: student1Id, email: "student_1_sec2@example.com", password: "hash", fullName: "Student 1 in Class A" },
      ],
    });

    await prisma.userRole.createMany({
      data: [
        { userId: adminId, role: "admin" },
        { userId: teacherAId, role: "teacher" },
        { userId: teacherBId, role: "teacher" },
        { userId: student1Id, role: "student" },
      ],
    });

    // Seed Course, Classes
    await prisma.course.create({
      data: {
        id: courseAId,
        title: "Security Test Course 2",
        createdBy: adminId,
        isPublished: true,
        isActive: true,
      },
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
      ],
    });

    // Sign JWT Tokens
    adminToken = (app as any).jwt.sign({ id: adminId, email: "admin_sec2@example.com", roles: ["admin"] });
    teacherAToken = (app as any).jwt.sign({ id: teacherAId, email: "teacher_a_sec2@example.com", roles: ["teacher"] });
    teacherBToken = (app as any).jwt.sign({ id: teacherBId, email: "teacher_b_sec2@example.com", roles: ["teacher"] });
    student1Token = (app as any).jwt.sign({ id: student1Id, email: "student_1_sec2@example.com", roles: ["student"] });
  });

  afterAll(async () => {
    process.env.NODE_ENV = "test";
    await app.close();
  });

  // =========================================================================
  // 1. GATE 2A: EXACT CORS ALLOWLIST TESTS
  // =========================================================================
  describe("GATE 2A: Exact CORS Allowlist Matching", () => {
    it("1.1 Official Origin 'https://nextband.site' must be ALLOWED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://nextband.site",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBe("https://nextband.site");
    });

    it("1.2 Official WWW Origin 'https://www.nextband.site' must be ALLOWED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://www.nextband.site",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBe("https://www.nextband.site");
    });

    it("1.3 Attacker Vercel domain 'https://evil-attacker.vercel.app' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://evil-attacker.vercel.app",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.4 Random Vercel domain 'https://random-project.vercel.app' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://random-project.vercel.app",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.5 Subdomain collision 'https://nextband.site.evil.com' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://nextband.site.evil.com",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.6 Prefix spoof 'https://evil-nextband.site' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://evil-nextband.site",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.7 Subdomain not in allowlist 'https://foo.nextband.site' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://foo.nextband.site",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.8 Insecure HTTP 'http://nextband.site' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "http://nextband.site",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.9 Non-standard port 'https://nextband.site:8443' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://nextband.site:8443",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("1.10 Trailing slash malformed origin 'https://nextband.site/' must be REJECTED", async () => {
      const res = await app.inject({
        method: "OPTIONS",
        url: "/api/v1/health",
        headers: {
          origin: "https://nextband.site/",
          "access-control-request-method": "GET",
        },
      });
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });
  });

  // =========================================================================
  // 2. GATE 2B: RATE LIMITING TESTS
  // =========================================================================
  describe("GATE 2B: Auth Per-Route Rate Limiting", () => {
    it("2.1 /auth/login should allow 5 requests and reject 6th with 429 Too Many Requests", async () => {
      const clientIp = "192.168.10.50";

      // 5 allowed requests
      for (let i = 0; i < 5; i++) {
        const res = await app.inject({
          method: "POST",
          url: "/api/v1/auth/login",
          headers: { "x-forwarded-for": clientIp },
          payload: { email: "wrong@example.com", password: "wrong" },
        });
        expect([401, 400]).toContain(res.statusCode);
      }

      // 6th request must trigger Rate Limit (429)
      const blockedRes = await app.inject({
        method: "POST",
        url: "/api/v1/auth/login",
        headers: { "x-forwarded-for": clientIp },
        payload: { email: "wrong@example.com", password: "wrong" },
      });
      expect(blockedRes.statusCode).toBe(429);
      const body = JSON.parse(blockedRes.payload);
      expect(body.statusCode).toBe(429);
      expect(body.error).toBe("Too Many Requests");
      expect(body.retryAfter).toBeDefined();
    });

    it("2.2 /auth/register should trigger 429 after limit is reached", async () => {
      const clientIp = "192.168.10.60";

      for (let i = 0; i < 5; i++) {
        await app.inject({
          method: "POST",
          url: "/api/v1/auth/register",
          headers: { "x-forwarded-for": clientIp },
          payload: { email: `user_${i}@example.com`, password: "password123", fullName: "Test User" },
        });
      }

      const blockedRes = await app.inject({
        method: "POST",
        url: "/api/v1/auth/register",
        headers: { "x-forwarded-for": clientIp },
        payload: { email: "user_blocked@example.com", password: "password123", fullName: "Blocked User" },
      });
      expect(blockedRes.statusCode).toBe(429);
    });
  });

  // =========================================================================
  // 3. INVITATION CREATION FULL 5-PERSONA MATRIX
  // =========================================================================
  describe("Invitation Creation Authorization Matrix", () => {
    it("3.1 Anonymous calling /invitations/generate must be rejected with 401", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(401);
    });

    it("3.2 Student calling /invitations/generate must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${student1Token}` },
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(403);
    });

    it("3.3 Teacher B (Wrong Class) generating invite for Class A must be rejected with 403", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${teacherBToken}` },
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(403);
    });

    it("3.4 Teacher A (Owner of Class A) generating invite for Class A must succeed (200)", async () => {
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

    it("3.5 Admin generating invite for any class must succeed (200)", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { classId: classAId },
      });
      expect(res.statusCode).toBe(200);
      const json = JSON.parse(res.payload);
      expect(json.success).toBe(true);
    });
  });

  // =========================================================================
  // 4. ADMIN NEGATIVE BOUNDARY TESTS (NO EXISTENCE BYPASS)
  // =========================================================================
  describe("Admin Negative Boundaries: Resource Existence Validation", () => {
    it("4.1 Admin accessing non-existent class attendance must return 404 Not Found", async () => {
      const res = await app.inject({
        method: "GET",
        url: `/api/v1/classes/${nonexistentClassId}/sessions/${nonexistentSessionId}/attendance`,
        headers: { authorization: `Bearer ${adminToken}` },
      });
      expect(res.statusCode).toBe(404);
    });

    it("4.2 Admin grading non-existent homework submission must return 404 Not Found", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/homeworks/grade",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          homeworkId: nonexistentHwId,
          studentId: student1Id,
          score: 8.0,
          feedback: "Great work",
        },
      });
      expect(res.statusCode).toBe(404);
    });

    it("4.3 Admin generating invitation for non-existent class must return 404 Not Found", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/invitations/generate",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { classId: nonexistentClassId },
      });
      expect(res.statusCode).toBe(404);
    });
  });
});
