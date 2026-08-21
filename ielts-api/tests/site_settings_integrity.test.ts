import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../src/app.js";

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

describe("SITE SETTINGS PERSISTENCE & RELIABILITY INTEGRITY TEST SUITE", () => {
  let app: FastifyInstance;
  let adminToken: string;
  let studentToken: string;

  const adminId = "adm-0000-1111-2222-333333333333";
  const studentId = "std-4444-5555-6666-777777777777";

  const backendRoutePath = join(process.cwd(), "src", "routes", "site-settings.routes.ts");
  const frontendApiPath = join(process.cwd(), "..", "nextband", "src", "lib", "api.ts");

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    adminToken = app.jwt.sign({ id: adminId, roles: ["admin"], email: "admin@test.com" });
    studentToken = app.jwt.sign({ id: studentId, roles: ["student"], email: "student@test.com" });
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    mockPrisma.siteSettingsList.length = 0;
    mockPrisma.users.length = 0;
    mockPrisma.userRoles.length = 0;

    mockPrisma.users.push(
      { id: adminId, email: "admin@test.com", fullName: "Admin User" },
      { id: studentId, email: "student@test.com", fullName: "Student User" },
    );
  });

  describe("1. Static Contract & Frontend API Integrity", () => {
    it("1.1. siteSettingsApi.update in api.ts must NOT swallow errors with catch-all fallback", () => {
      const content = readFileSync(frontendApiPath, "utf-8");
      expect(content).not.toContain("return normalizeSiteSettings(payload);");
    });

    it("1.2. siteSettingsApi.update must enforce response shape validation", () => {
      const content = readFileSync(frontendApiPath, "utf-8");
      expect(content).toContain("data.id");
      expect(content).toContain("Dữ liệu phản hồi từ máy chủ không hợp lệ");
    });

    it("1.3. Backend routes must include Zod strict validation to reject unknown fields", () => {
      const content = readFileSync(backendRoutePath, "utf-8");
      expect(content).toContain(".strict(");
    });

    it("1.4. Backend routes must validate and normalize zaloLink and completedLessonsStat", () => {
      const content = readFileSync(backendRoutePath, "utf-8");
      expect(content).toContain("zaloLink");
      expect(content).toContain("completedLessonsStat");
      expect(content).toContain("normalizeSettings");
    });
  });

  describe("2. Serverless Universal Handler & Vercel Rewrite URL Resolution", () => {
    it("2.1. Simulating Vercel Rewrite via x-forwarded-uri: /api/index -> /api/v1/site-settings", async () => {
      const handlerResolveUrl = (headers: Record<string, string>, rawUrl: string) => {
        let targetUrl =
          headers["x-forwarded-uri"] ||
          headers["x-matched-path"] ||
          headers["x-vercel-matched-path"] ||
          rawUrl ||
          "/";
        if (targetUrl === "/api/index" || targetUrl === "/api" || targetUrl === "/api/") {
          targetUrl = headers["x-forwarded-uri"] || rawUrl || "/";
        }
        return targetUrl;
      };

      const headers = {
        "x-forwarded-uri": "/api/v1/site-settings",
        authorization: `Bearer ${adminToken}`,
      };
      const resolved = handlerResolveUrl(headers, "/api/index");

      expect(resolved).toBe("/api/v1/site-settings");

      const res = await app.inject({
        method: "GET",
        url: resolved,
        headers,
      });

      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.payload);
      expect(data.siteName).toBeDefined();
      expect(data.id).toBeDefined();
    });

    it("2.2. Simulating Vercel Rewrite via x-matched-path: /api/index -> /api/v1/site-settings", async () => {
      const handlerResolveUrl = (headers: Record<string, string>, rawUrl: string) => {
        let targetUrl =
          headers["x-forwarded-uri"] ||
          headers["x-matched-path"] ||
          headers["x-vercel-matched-path"] ||
          rawUrl ||
          "/";
        if (targetUrl === "/api/index" || targetUrl === "/api" || targetUrl === "/api/") {
          targetUrl = headers["x-forwarded-uri"] || rawUrl || "/";
        }
        return targetUrl;
      };

      const headers = {
        "x-matched-path": "/api/v1/site-settings",
        authorization: `Bearer ${adminToken}`,
      };
      const resolved = handlerResolveUrl(headers, "/api/index");

      expect(resolved).toBe("/api/v1/site-settings");

      const res = await app.inject({
        method: "PUT",
        url: resolved,
        headers,
        payload: {
          siteName: "NextBand Vercel Rewrite Test",
          sloganText: "Slogan Rewrite OK",
        },
      });

      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.payload);
      expect(data.siteName).toBe("NextBand Vercel Rewrite Test");
      expect(data.sloganText).toBe("Slogan Rewrite OK");
    });
  });

  describe("3. Strict Zod Schema & Business Boundary Enforcement", () => {
    it("3.1. Valid numeric strings ('56', '1.2') are safely coerced without allowing invalid strings", async () => {
      const res = await app.inject({
        method: "PUT",
        url: "/api/v1/site-settings",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          sloganDesktopSize: "56" as any,
          sloganLineHeight: "1.4" as any,
          heroDescriptionDesktopSize: "32" as any,
          heroDescriptionLineHeight: "1.8" as any,
        },
      });

      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.payload);
      expect(data.sloganDesktopSize).toBe(56);
      expect(data.sloganLineHeight).toBe(1.4);
      expect(data.heroDescriptionDesktopSize).toBe(32);
      expect(data.heroDescriptionLineHeight).toBe(1.8);
    });

    it("3.2. Invalid numeric strings ('abc', '56.5' for int) are strictly rejected with HTTP 400", async () => {
      const res = await app.inject({
        method: "PUT",
        url: "/api/v1/site-settings",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          sloganDesktopSize: "abc" as any,
        },
      });

      expect(res.statusCode).toBe(400);
      const errorData = JSON.parse(res.payload);
      expect(errorData.error).toBeDefined();
    });

    it("3.3. Out of range values (e.g. sloganDesktopSize = 5 or 200) are rejected with HTTP 400", async () => {
      const res = await app.inject({
        method: "PUT",
        url: "/api/v1/site-settings",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          sloganDesktopSize: 5,
        },
      });

      expect(res.statusCode).toBe(400);
    });

    it("3.4. Unrecognized keys are strictly rejected with HTTP 400", async () => {
      const res = await app.inject({
        method: "PUT",
        url: "/api/v1/site-settings",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: {
          siteName: "Valid Name",
          unsupportedField: "hack",
        },
      });

      expect(res.statusCode).toBe(400);
      const errorData = JSON.parse(res.payload);
      expect(errorData.error).toContain("unsupportedField");
    });

    it("3.5. Non-admin users are rejected with HTTP 403", async () => {
      const res = await app.inject({
        method: "PUT",
        url: "/api/v1/site-settings",
        headers: { authorization: `Bearer ${studentToken}` },
        payload: {
          siteName: "Hacked Site",
        },
      });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("4. End-to-End Persistence Round-Trip", () => {
    it("4.1. Updating full site settings persists properly and is retrievable via GET", async () => {
      const fullUpdate = {
        siteName: "ARIS IELTS Academy",
        logoUrl: "/uploads/logo.png",
        zaloLink: "https://zalo.me/0909123456",
        completedLessonsStat: "10,000+",
        authTagline: "Chuyên sâu IELTS từ cơ bản đến 8.0+",
        authFeatureOneTitle: "Lộ trình tinh gọn",
        authFeatureOneDescription: "Học đúng trọng tâm, tiết kiệm thời gian",
        authFeatureTwoTitle: "Chấm chữa 1-1",
        authFeatureTwoDescription: "Giáo viên sửa bài chi tiết từng lỗi",
        highlightPresent: "#a7f3d0",
        highlightAbsent: "#fecaca",
        highlightInactive: "#f3f4f6",
        sloganText: "Luyện thi IELTS chuẩn quốc tế",
        sloganFontFamily: "Be Vietnam Pro",
        sloganFontWeight: "bold" as const,
        sloganDesktopSize: 60,
        sloganMobileSize: 36,
        sloganColor: "#1e293b",
        sloganAlign: "center" as const,
        sloganLineHeight: 1.3,
        heroDescriptionText: "Khóa học chất lượng cao cùng đội ngũ chuyên gia IELTS 8.5+",
        heroDescriptionFontFamily: "Be Vietnam Pro",
        heroDescriptionFontWeight: "regular" as const,
        heroDescriptionDesktopSize: 28,
        heroDescriptionMobileSize: 18,
        heroDescriptionColor: "#475569",
        heroDescriptionAlign: "center" as const,
        heroDescriptionLineHeight: 1.7,
      };

      const putRes = await app.inject({
        method: "PUT",
        url: "/api/v1/site-settings",
        headers: { authorization: `Bearer ${adminToken}` },
        payload: fullUpdate,
      });

      expect(putRes.statusCode).toBe(200);
      const putData = JSON.parse(putRes.payload);
      expect(putData.siteName).toBe("ARIS IELTS Academy");
      expect(putData.completedLessonsStat).toBe("10,000+");
      expect(putData.sloganDesktopSize).toBe(60);

      // Verify GET returns updated data
      const getRes = await app.inject({
        method: "GET",
        url: "/api/v1/site-settings",
      });

      expect(getRes.statusCode).toBe(200);
      const getData = JSON.parse(getRes.payload);
      expect(getData.siteName).toBe("ARIS IELTS Academy");
      expect(getData.completedLessonsStat).toBe("10,000+");
      expect(getData.sloganText).toBe("Luyện thi IELTS chuẩn quốc tế");
      expect(getData.sloganAlign).toBe("center");
    });
  });
});
