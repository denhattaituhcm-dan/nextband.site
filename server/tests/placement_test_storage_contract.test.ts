import { describe, it, expect } from "vitest";
import { canonicalPlacementTestPayload } from "../data/placement-test/questions.js";

describe("Placement Test Storage Contract (PR-01 Regression)", () => {
  it("uses official qxtpbonwjmxmogriyfox Supabase Storage public URL for listening audio", () => {
    expect(canonicalPlacementTestPayload.skills.listening.audioUrl).toBe(
      "https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/audio/1787423782098-cambridge-ielts-13-academic-listening-1-audio-1.mp3"
    );
  });

  it("contains zero dead/legacy domains or relative /uploads/ paths in canonical payload", () => {
    const serialized = JSON.stringify(canonicalPlacementTestPayload);
    expect(serialized).not.toContain("gzpdlqxjggyxlkeatvvf.supabase.co");
    expect(serialized).not.toContain("dmamqxiukfiyhfbbcqsq.supabase.co");
    expect(serialized).not.toContain("api.nextband.site");
    expect(serialized).not.toContain("http://localhost");
    expect(serialized).not.toMatch(/["']\/uploads\//);
  });
});
