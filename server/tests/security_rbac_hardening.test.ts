import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Fastify, { FastifyInstance } from "fastify";
import jwtPlugin from "@fastify/jwt";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

describe("🛡️ SEC-02 RBAC Hardening: user_metadata Privilege Escalation Prevention", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify({ logger: false });
    await app.register(jwtPlugin, {
      secret: "test_jwt_secret_min_32_characters_for_rbac_testing_only",
    });

    // Mock Prisma on fastify instance for unit test
    app.decorate("prisma", {
      user: {
        findFirst: async ({ where }: any) => {
          // If query is for legitimate student registered in DB
          if (where.OR?.some((o: any) => o.userId === "legit-student-uuid" || o.email === "student@example.com")) {
            return {
              id: "legit-student-uuid",
              userId: "legit-student-uuid",
              email: "student@example.com",
              isActive: true,
              roles: [{ role: "student" }],
            };
          }
          // If query is for deactivated user
          if (where.OR?.some((o: any) => o.userId === "deactivated-uuid")) {
            return {
              id: "deactivated-uuid",
              userId: "deactivated-uuid",
              email: "banned@example.com",
              isActive: false,
              roles: [{ role: "student" }],
            };
          }
          return null;
        },
      },
      userRole: {
        findMany: async () => [],
      },
    });

    // Register admin-protected route
    app.get(
      "/test/admin-only",
      { preHandler: [authenticate, requireRoles("admin")] },
      async () => ({ success: true, message: "Welcome Admin" })
    );

    // Register student-protected route
    app.get(
      "/test/student-only",
      { preHandler: [authenticate, requireRoles("student")] },
      async () => ({ success: true, message: "Welcome Student" })
    );

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("1. REJECTS admin access when user_metadata contains role='admin' but DB has role='student'", async () => {
    const maliciousToken = (app as any).jwt.sign({
      sub: "legit-student-uuid",
      email: "student@example.com",
      user_metadata: { role: "admin", roles: ["admin", "superadmin"] },
    });

    const res = await app.inject({
      method: "GET",
      url: "/test/admin-only",
      headers: {
        authorization: `Bearer ${maliciousToken}`,
      },
    });

    expect(res.statusCode).toBe(403);
    const body = res.json();
    expect(body.error).toBe("Forbidden");
    expect(body.message).toContain("Required roles: admin");
  });

  it("2. ALLOWS student access to student route when DB has role='student' regardless of user_metadata", async () => {
    const validStudentToken = (app as any).jwt.sign({
      sub: "legit-student-uuid",
      email: "student@example.com",
      user_metadata: { role: "admin" },
    });

    const res = await app.inject({
      method: "GET",
      url: "/test/student-only",
      headers: {
        authorization: `Bearer ${validStudentToken}`,
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json().success).toBe(true);
  });

  it("3. BLOCKS deactivated user immediately (fail closed)", async () => {
    const deactivatedToken = (app as any).jwt.sign({
      sub: "deactivated-uuid",
      email: "banned@example.com",
    });

    const res = await app.inject({
      method: "GET",
      url: "/test/student-only",
      headers: {
        authorization: `Bearer ${deactivatedToken}`,
      },
    });

    expect(res.statusCode).toBe(401);
  });

  it("4. BLOCKS unauthenticated request completely", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/test/admin-only",
    });

    expect(res.statusCode).toBe(401);
  });
});
