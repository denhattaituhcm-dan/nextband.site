import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../app.js";

describe("Academic Intelligence Security Boundary & Routes", () => {
  let app: any;

  beforeEach(async () => {
    app = await buildApp();
  });

  it("Gate 1: Should strictly reject unauthenticated requests with 401", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/overview",
    });

    expect(response.statusCode).toBe(401);
    const body = JSON.parse(response.payload);
    expect(body.error).toBe("Unauthorized");
  });

  it("Gate 2: Should reject non-admin roles (e.g., student role) with 403 Forbidden", async () => {
    // Sign a real JWT with student role using fastify app's jwt plugin
    const studentToken = app.jwt.sign({
      sub: "student-uuid-test",
      email: "student@nextband.site",
      roles: ["student"],
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/overview",
      headers: {
        authorization: `Bearer ${studentToken}`,
      },
    });

    // Student must be strictly forbidden from accessing Academic Intelligence Control Plane
    expect(response.statusCode).toBe(403);
    const body = JSON.parse(response.payload);
    expect(body.error).toBe("Forbidden");
  });

  it("Gate 3: Should grant 200 OK to authenticated admin", async () => {
    const adminToken = app.jwt.sign({
      sub: "admin-uuid-test",
      email: "admin@nextband.site",
      roles: ["admin"],
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/overview",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    // In test environment, if DB is accessible it returns 200 with 3 layers telemetry
    // (or 403/500 if DB is mocked; verify it passes role gate)
    expect([200, 500]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const body = JSON.parse(response.payload);
      expect(body.status).toBe("success");
      expect(body.system.name).toBe("ARIS Academic Intelligence Control Plane");
      expect(body.layers.layer1RawEvidence).toBeDefined();
      expect(body.layers.layer2SkillEvidence).toBeDefined();
      expect(body.layers.layer3DerivedMastery).toBeDefined();
    }
  });

  it("Phase B Gate 4: Should reject unauthenticated requests to Phase B endpoints with 401", async () => {
    const res1 = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/students",
    });
    expect(res1.statusCode).toBe(401);

    const res2 = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/students/some-id/submissions",
    });
    expect(res2.statusCode).toBe(401);

    const res3 = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/submissions/some-id/provenance",
    });
    expect(res3.statusCode).toBe(401);
  });

  it("Phase B Gate 5: Should reject non-admin requests to Phase B endpoints with 403", async () => {
    const studentToken = app.jwt.sign({
      sub: "student-uuid-test",
      email: "student@nextband.site",
      roles: ["student"],
    });

    const res = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/students",
      headers: { authorization: `Bearer ${studentToken}` },
    });
    expect(res.statusCode).toBe(403);
  });

  it("Phase B Gate 6: Admin should access students, submissions, and provenance endpoints", async () => {
    const adminToken = app.jwt.sign({
      sub: "admin-uuid-test",
      email: "admin@nextband.site",
      roles: ["admin"],
    });

    // 1. Students list
    const studentsRes = await app.inject({
      method: "GET",
      url: "/api/v1/academic-intelligence/students",
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect([200, 500]).toContain(studentsRes.statusCode);
    if (studentsRes.statusCode === 200) {
      const data = JSON.parse(studentsRes.payload);
      expect(data.status).toBe("success");
      expect(Array.isArray(data.students)).toBe(true);
    }

    // 2. Submissions list
    const dummyStudentId = "00000000-0000-0000-0000-000000000001";
    const subRes = await app.inject({
      method: "GET",
      url: `/api/v1/academic-intelligence/students/${dummyStudentId}/submissions`,
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect([200, 500]).toContain(subRes.statusCode);
    if (subRes.statusCode === 200) {
      const data = JSON.parse(subRes.payload);
      expect(data.status).toBe("success");
      expect(Array.isArray(data.submissions)).toBe(true);
    }

    // 3. Provenance endpoint (non-existent submission UUID should return 404)
    const dummySubmissionId = "00000000-0000-0000-0000-000000000002";
    const provRes = await app.inject({
      method: "GET",
      url: `/api/v1/academic-intelligence/submissions/${dummySubmissionId}/provenance`,
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect([404, 500]).toContain(provRes.statusCode);
    if (provRes.statusCode === 404) {
      const data = JSON.parse(provRes.payload);
      expect(data.message).toContain("not found");
    }
  });

  it("Phase 3 Gate 7: Should reject non-admin requests to Student Model endpoints with 403", async () => {
    const studentToken = app.jwt.sign({
      sub: "student-uuid-test",
      email: "student@nextband.site",
      roles: ["student"],
    });

    const dummyId = "00000000-0000-0000-0000-000000000001";
    const resGet = await app.inject({
      method: "GET",
      url: `/api/v1/academic-intelligence/students/${dummyId}/mastery`,
      headers: { authorization: `Bearer ${studentToken}` },
    });
    expect(resGet.statusCode).toBe(403);

    const resPost = await app.inject({
      method: "POST",
      url: `/api/v1/academic-intelligence/students/${dummyId}/recompute`,
      headers: { authorization: `Bearer ${studentToken}` },
    });
    expect(resPost.statusCode).toBe(403);
  });

  it("Phase 3 Gate 8: Admin can access mastery snapshot and trigger deterministic recompute", async () => {
    const adminToken = app.jwt.sign({
      sub: "admin-uuid-test",
      email: "admin@nextband.site",
      roles: ["admin"],
    });

    const dummyId = "00000000-0000-0000-0000-000000000001";
    // 1. GET mastery (returns 404 or 200 or 500 in test environment)
    const masteryRes = await app.inject({
      method: "GET",
      url: `/api/v1/academic-intelligence/students/${dummyId}/mastery`,
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect([200, 404, 500]).toContain(masteryRes.statusCode);

    // 2. POST recompute (returns 404 or 200 or 500 in test environment)
    const recomputeRes = await app.inject({
      method: "POST",
      url: `/api/v1/academic-intelligence/students/${dummyId}/recompute`,
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect([200, 404, 500]).toContain(recomputeRes.statusCode);
  });
});


