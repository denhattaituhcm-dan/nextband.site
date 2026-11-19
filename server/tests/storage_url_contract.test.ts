import { describe, it, expect } from "vitest";
import { toFileUrl, withFileUrls } from "../utils/file.js";

const SUPABASE_BASE = process.env.SUPABASE_URL || "https://qxtpbonwjmxmogriyfox.supabase.co";

describe("Storage URL Contract & Normalization (PR-02)", () => {
  describe("toFileUrl() backend normalization", () => {
    it("returns null for falsy inputs", () => {
      expect(toFileUrl(null)).toBeNull();
      expect(toFileUrl(undefined)).toBeNull();
      expect(toFileUrl("")).toBeNull();
    });

    it("maps legacy api.nextband.site and nextband.site URLs to canonical Supabase Storage", () => {
      const legacyCourseThumb = "https://api.nextband.site/uploads/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png";
      expect(toFileUrl(legacyCourseThumb)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png`
      );

      const legacyAudio = "https://api.nextband.site/uploads/audio/test-audio.mp3";
      expect(toFileUrl(legacyAudio)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/audio/test-audio.mp3`
      );

      const legacyApex = "https://nextband.site/uploads/images/sample.png";
      expect(toFileUrl(legacyApex)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/sample.png`
      );
    });

    it("maps relative /uploads/images/ and uploads/images/ to canonical exam-assets/images/", () => {
      const relative1 = "/uploads/images/1773376560244-1189f3a8-9bd9-492d-9e04-1a0d0523ac0e.png";
      expect(toFileUrl(relative1)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/1773376560244-1189f3a8-9bd9-492d-9e04-1a0d0523ac0e.png`
      );

      const relative2 = "uploads/images/sample.png";
      expect(toFileUrl(relative2)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/sample.png`
      );
    });

    it("maps relative /uploads/audio/ and uploads/audio/ to canonical exam-assets/audio/", () => {
      const relativeAudio = "/uploads/audio/1773767189919-e4deb7ad-30fb-4b36-b407-1bbd2472cf1e.mp3";
      expect(toFileUrl(relativeAudio)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/audio/1773767189919-e4deb7ad-30fb-4b36-b407-1bbd2472cf1e.mp3`
      );

      const bareRelativeAudio = "uploads/audio/sample.mp3";
      expect(toFileUrl(bareRelativeAudio)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/audio/sample.mp3`
      );
    });

    it("maps direct exam-assets paths to canonical Supabase Storage URL", () => {
      const examAsset = "exam-assets/images/sample.png";
      expect(toFileUrl(examAsset)).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/sample.png`
      );
    });

    it("preserves valid full Supabase CDN URLs untouched", () => {
      const canonicalCdn = `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/canonical.png`;
      expect(toFileUrl(canonicalCdn)).toBe(canonicalCdn);
    });

    it("falls back non-asset relative paths to API base URL", () => {
      const otherPath = "/documents/terms.pdf";
      const result = toFileUrl(otherPath);
      expect(result).toMatch(/\/documents\/terms\.pdf$/);
      expect(result).not.toContain("exam-assets");
    });

    it("works correctly with withFileUrls helper", () => {
      const course = {
        id: "course-1",
        title: "IELTS Master",
        thumbnailUrl: "https://api.nextband.site/uploads/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png",
      };

      const transformed = withFileUrls(course, ["thumbnailUrl"]);
      expect(transformed.thumbnailUrl).toBe(
        `${SUPABASE_BASE}/storage/v1/object/public/exam-assets/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png`
      );
    });
  });
});
