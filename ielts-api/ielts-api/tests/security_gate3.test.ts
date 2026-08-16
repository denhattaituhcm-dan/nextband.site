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

describe("GATE 3 SECURITY TEST SUITE: SECURITY HEADERS, ERROR SANITIZATION & SECRET INTEGRITY", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    process.env.NODE_ENV = "production";
    app = await buildApp();

    // Register a test route that simulates an unhandled 500 database/server crash
    app.get("/api/v1/test-unhandled-crash", async () => {
      const err: any = new Error("PrismaClientKnownRequestError: SELECT * FROM `sensitive_users` WHERE secret_key = 'super_secret'");
      err.statusCode = 500;
      err.stack = "Error: Database connection failed at D:\\handover\\ielts\\src\\database.ts:42:15";
      throw err;
    });

    await app.ready();
  });

  afterAll(async () => {
    process.env.NODE_ENV = "test";
    await app.close();
  });

  // =========================================================================
  // 1. GATE 3A: SECURITY HEADERS VERIFICATION
  // =========================================================================
  describe("1. Security Headers Verification", () => {
    it("1.1 X-Content-Type-Options must strictly equal 'nosniff'", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/health",
      });
      expect(res.headers["x-content-type-options"]).toBe("nosniff");
    });

    it("1.2 X-Frame-Options must strictly equal 'DENY' (Clickjacking defense)", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/health",
      });
      expect(res.headers["x-frame-options"]).toBe("DENY");
    });

    it("1.3 Strict-Transport-Security must enforce HSTS with includeSubDomains", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/health",
      });
      expect(res.headers["strict-transport-security"]).toBe(
        "max-age=31536000; includeSubDomains",
      );
    });

    it("1.4 Referrer-Policy must equal 'strict-origin-when-cross-origin'", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/health",
      });
      expect(res.headers["referrer-policy"]).toBe(
        "strict-origin-when-cross-origin",
      );
    });

    it("1.5 Cross-Origin-Resource-Policy must equal 'cross-origin'", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/health",
      });
      expect(res.headers["cross-origin-resource-policy"]).toBe("cross-origin");
    });
  });

  // =========================================================================
  // 2. GATE 3B: ERROR SANITIZATION & NO INFORMATION DISCLOSURE
  // =========================================================================
  describe("2. Error Sanitization & Information Disclosure Defense", () => {
    it("2.1 500 error in production must return sanitized error and requestId without leaking stack or SQL", async () => {
      const res = await app.inject({
        method: "GET",
        url: "/api/v1/test-unhandled-crash",
      });

      expect(res.statusCode).toBe(500);
      const json = JSON.parse(res.payload);

      // Must have safe generic error and requestId for log correlation
      expect(json.error).toBe("Internal Server Error");
      expect(json.requestId).toBeDefined();
      expect(typeof json.requestId).toBe("string");

      // Critical Assertions: NO leakage of internal details
      expect(json.stack).toBeUndefined();
      expect(res.payload).not.toContain("PrismaClientKnownRequestError");
      expect(res.payload).not.toContain("SELECT * FROM");
      expect(res.payload).not.toContain("sensitive_users");
      expect(res.payload).not.toContain("D:\\handover\\ielts");
      expect(res.payload).not.toContain("database.ts:42");
    });
  });
});
