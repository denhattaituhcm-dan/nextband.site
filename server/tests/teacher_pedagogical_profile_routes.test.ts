import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../app.js";

describe("Teacher Pedagogical Profile Route Security & Authorization", () => {
  let app: any;

  beforeEach(async () => {
    app = await buildApp();
  });

  it("Gate 1: Should strictly reject unauthenticated calls with 401 Unauthorized", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/teachers/students/any-student-id/pedagogical-profile",
    });

    expect(response.statusCode).toBe(401);
    const body = JSON.parse(response.payload);
    expect(body.error).toBe("Unauthorized");
  });

  it("Gate 2: Should strictly reject student role with 403 Forbidden", async () => {
    const studentToken = app.jwt.sign({
      sub: "student-uuid-test",
      email: "student@nextband.site",
      roles: ["student"],
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/teachers/students/any-student-id/pedagogical-profile",
      headers: {
        authorization: `Bearer ${studentToken}`,
      },
    });

    expect(response.statusCode).toBe(403);
    const body = JSON.parse(response.payload);
    expect(body.error).toBe("Forbidden");
  });

  it("Gate 3: Should allow teacher role through authorization barrier", async () => {
    const teacherToken = app.jwt.sign({
      sub: "a0000000-0000-0000-0000-000000000001",
      email: "teacher@nextband.site",
      roles: ["teacher"],
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/teachers/students/b0000000-0000-0000-0000-000000000002/pedagogical-profile",
      headers: {
        authorization: `Bearer ${teacherToken}`,
      },
    });

    // Should pass role barrier; 404 is expected because dummy UUID is not in DB
    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.payload);
    expect(body.error).toBe("NotFound");
  });

  it("Gate 4: Should allow admin role through authorization barrier", async () => {
    const adminToken = app.jwt.sign({
      sub: "c0000000-0000-0000-0000-000000000003",
      email: "admin@nextband.site",
      roles: ["admin"],
    });

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/teachers/students/b0000000-0000-0000-0000-000000000002/pedagogical-profile",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    // Should pass role barrier; 404 is expected because dummy UUID is not in DB
    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.payload);
    expect(body.error).toBe("NotFound");
  });
});
