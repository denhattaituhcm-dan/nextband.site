import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("SITE SETTINGS PERSISTENCE & RELIABILITY INTEGRITY TEST SUITE", () => {
  const backendRoutePath = join(process.cwd(), "src", "routes", "site-settings.routes.ts");
  const frontendApiPath = join(process.cwd(), "..", "nextband", "src", "lib", "api.ts");
  const migrationPath = join(
    process.cwd(),
    "prisma",
    "migrations",
    "20260818120000_add_zalo_and_social_proof_to_site_settings",
    "migration.sql",
  );

  describe("1. Client API Reliability & Zero Fake-Success", () => {
    it("1.1. siteSettingsApi.update in api.ts must NOT swallow errors with catch-all fallback", () => {
      const content = readFileSync(frontendApiPath, "utf-8");
      expect(content).not.toContain("return normalizeSiteSettings(payload);");
    });

    it("1.2. siteSettingsApi.update must enforce response shape validation", () => {
      const content = readFileSync(frontendApiPath, "utf-8");
      expect(content).toContain("data.id");
      expect(content).toContain("Dữ liệu phản hồi từ máy chủ không hợp lệ");
    });
  });

  describe("2. Backend Strict DTO & Persistence Mapping", () => {
    it("2.1. Backend routes must include Zod strict validation to reject unknown fields", () => {
      const content = readFileSync(backendRoutePath, "utf-8");
      expect(content).toContain(".strict(");
      expect(content).toContain("Trường không được hỗ trợ:");
    });

    it("2.2. Backend routes must map and select zalo_link and completed_lessons_stat", () => {
      const content = readFileSync(backendRoutePath, "utf-8");
      expect(content).toContain("zaloLink: \"zalo_link\"");
      expect(content).toContain("`zalo_link` AS zaloLink");
      expect(content).toContain("`completed_lessons_stat` AS completedLessonsStat");
    });
  });

  describe("3. Database Migration Integrity", () => {
    it("3.1. Migration file must exist and contain ALTER TABLE for zalo_link and completed_lessons_stat", () => {
      const content = readFileSync(migrationPath, "utf-8");
      expect(content).toContain("ALTER TABLE `site_settings`");
      expect(content).toContain("`zalo_link` VARCHAR(500)");
      expect(content).toContain("`completed_lessons_stat` VARCHAR(50)");
    });
  });
});
