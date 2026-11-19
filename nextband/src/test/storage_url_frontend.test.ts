import { describe, it, expect, vi } from "vitest";
import { formatStorageUrl, normalizeCourseData } from "../lib/api";

describe("Frontend Storage URL Contract & Normalization (PR-02)", () => {
  it("formats legacy api.nextband.site URLs to Supabase CDN", () => {
    const legacyUrl = "https://api.nextband.site/uploads/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png";
    const formatted = formatStorageUrl(legacyUrl);
    expect(formatted).toContain("supabase.co/storage/v1/object/public/exam-assets/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png");
    expect(formatted).not.toContain("api.nextband.site");
  });

  it("formats relative /uploads/images/ and /uploads/audio/ without duplicate 'uploads' prefix", () => {
    const imgUrl = formatStorageUrl("/uploads/images/test.png");
    expect(imgUrl).toContain("/exam-assets/images/test.png");
    expect(imgUrl).not.toContain("/exam-assets/uploads/images/");

    const audioUrl = formatStorageUrl("/uploads/audio/test.mp3");
    expect(audioUrl).toContain("/exam-assets/audio/test.mp3");
    expect(audioUrl).not.toContain("/exam-assets/uploads/audio/");
  });

  it("formats bare filenames canonically", () => {
    const bareImg = formatStorageUrl("sample.png");
    expect(bareImg).toContain("/exam-assets/images/sample.png");

    const bareAudio = formatStorageUrl("sample.mp3");
    expect(bareAudio).toContain("/exam-assets/audio/sample.mp3");

    const bareUuidAudio = formatStorageUrl("12345678-1234-1234-1234-123456789abc.webm");
    expect(bareUuidAudio).toContain("/exam-assets/speaking-recordings/12345678-1234-1234-1234-123456789abc.webm");
  });

  it("preserves external and blob URLs as-is", () => {
    expect(formatStorageUrl("blob:http://localhost/abc")).toBe("blob:http://localhost/abc");
    expect(formatStorageUrl("data:image/png;base64,123")).toBe("data:image/png;base64,123");
    expect(formatStorageUrl("https://images.unsplash.com/photo-123")).toBe("https://images.unsplash.com/photo-123");
  });

  it("normalizes course thumbnail_url when raw data comes from legacy database records", () => {
    const rawCourse = {
      id: "course-builder",
      title: "BUILDER",
      thumbnail_url: "https://api.nextband.site/uploads/images/1772691209886-2d101112-476d-4777-9ef1-7055aa8125d5.png",
    };

    const normalized = normalizeCourseData(rawCourse);
    expect(normalized.thumbnailUrl).toContain("supabase.co/storage/v1/object/public/exam-assets/images/1772691209886-2d101112-476d-4777-9ef1-7055aa8125d5.png");
    expect(normalized.thumbnailUrl).not.toContain("api.nextband.site");
  });
});
