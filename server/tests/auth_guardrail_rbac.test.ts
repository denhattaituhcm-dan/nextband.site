import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../app.js";

describe("Auth & RBAC Enforcement Guardrails (Fail-Fast)", () => {
  let app: any;

  beforeEach(async () => {
    app = await buildApp();
  });

  it("should return 401 Unauthorized when no Authorization header is provided on protected routes", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/users",
    });

    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("Unauthorized");
  });

  it("should reject spoofed admin email and strictly deny 403 Forbidden without database role", async () => {
    // User having student role attempting to access admin route with spoofed admin email
    const token = app.jwt.sign({
      sub: "student-uuid-test",
      email: "admin@ielts.com",
      roles: ["student"],
    });

    const res = await app.inject({
      method: "POST",
      url: "/api/v1/users",
      headers: {
        authorization: "Bearer " + token,
      },
      payload: {
        email: "new-student@ielts.com",
        fullName: "Hoc Vien Test",
        role: "student",
      },
    });

    expect(res.statusCode).toBe(403);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("Forbidden");
  });
});