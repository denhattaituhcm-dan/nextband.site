import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import fp from "fastify-plugin";
import { createMockPrisma } from "./mockPrisma.js";

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

import { buildApp } from "../app.js";
import { FastifyInstance } from "fastify";

describe("P0 Security Regression: /api/v1/faculty and /api/v1/evidence isolation", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    // Seed some mock data: 1 published, 1 draft faculty; 1 fully valid evidence, 1 draft, 1 unconsented
    await mockPrisma.facultyProfile.create({
      data: { name: "Teacher A", role: "IELTS Specialist", isPublished: true },
    });
    await mockPrisma.facultyProfile.create({
      data: { name: "Teacher B Draft", role: "Draft Teacher", isPublished: false },
    });

    await mockPrisma.studentEvidence.create({
      data: { studentName: "Student A Valid", overallScore: "8.0", published: true, consentConfirmed: true },
    });
    await mockPrisma.studentEvidence.create({
      data: { studentName: "Student B Draft", overallScore: "7.0", published: false, consentConfirmed: true },
    });
    await mockPrisma.studentEvidence.create({
      data: { studentName: "Student C Unconsented", overallScore: "7.5", published: true, consentConfirmed: false },
    });

    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/v1/faculty - unauthenticated request only gets published faculty", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/faculty",
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    // Ensure no unpublished faculty is ever returned
    const hasUnpublished = body.data.some((f: any) => f.isPublished === false);
    expect(hasUnpublished).toBe(false);
  });

  it("GET /api/v1/faculty - arbitrary or fake Authorization header does NOT leak draft faculty", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/faculty",
      headers: {
        authorization: "Bearer fake_token_forged_by_attacker",
      },
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);
    const hasUnpublished = body.data.some((f: any) => f.isPublished === false);
    expect(hasUnpublished).toBe(false);
  });

  it("GET /api/v1/faculty/all - protected endpoint rejects unauthenticated or invalid tokens", async () => {
    const resNoAuth = await app.inject({
      method: "GET",
      url: "/api/v1/faculty/all",
    });
    expect(resNoAuth.statusCode).toBe(401);

    const resFakeAuth = await app.inject({
      method: "GET",
      url: "/api/v1/faculty/all",
      headers: {
        authorization: "Bearer fake_token",
      },
    });
    expect(resFakeAuth.statusCode).toBe(401);
  });

  it("GET /api/v1/evidence - unauthenticated request only gets published AND consent-confirmed evidence", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/evidence",
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);

    // Invariant: MUST have published=true AND consentConfirmed=true
    const hasInvalid = body.data.some(
      (e: any) => e.published === false || e.consentConfirmed === false
    );
    expect(hasInvalid).toBe(false);
  });

  it("GET /api/v1/evidence - arbitrary or fake Authorization header does NOT leak unconsented or draft evidence", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/evidence",
      headers: {
        authorization: "Bearer fake_token_forged_by_student",
      },
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);

    const hasInvalid = body.data.some(
      (e: any) => e.published === false || e.consentConfirmed === false
    );
    expect(hasInvalid).toBe(false);
  });

  it("GET /api/v1/evidence/all - protected endpoint rejects unauthenticated or invalid tokens", async () => {
    const resNoAuth = await app.inject({
      method: "GET",
      url: "/api/v1/evidence/all",
    });
    expect(resNoAuth.statusCode).toBe(401);

    const resFakeAuth = await app.inject({
      method: "GET",
      url: "/api/v1/evidence/all",
      headers: {
        authorization: "Bearer fake_token",
      },
    });
    expect(resFakeAuth.statusCode).toBe(401);
  });
});
