import { describe, it, expect } from "vitest";

// Replicate parseInitialTranscript helper to verify logic contracts
interface TranscriptSegment {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
  editedText?: string;
}

function formatTime(ms: number): string {
  if (!Number.isFinite(ms) || isNaN(ms) || ms < 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function parseInitialTranscript(raw?: string | null): { rawText: string; segments: TranscriptSegment[] } {
  if (!raw || !raw.trim()) {
    return { rawText: "", segments: [] };
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.segments) && parsed.segments.length > 0) {
      return {
        rawText: parsed.rawText || parsed.text || "",
        segments: parsed.segments.map((s: any, idx: number) => ({
          id: s.id || `seg-${idx + 1}`,
          startMs: typeof s.startMs === "number" ? s.startMs : Math.round((s.start || 0) * 1000),
          endMs: typeof s.endMs === "number" ? s.endMs : Math.round((s.end || 0) * 1000),
          text: (s.text || "").trim(),
          editedText: s.editedText,
        })),
      };
    }
  } catch {
    // If not JSON, treat as raw plain text
  }

  return {
    rawText: raw,
    segments: [],
  };
}

describe("Teacher UI Transcript Consumption & Time Sync Verification", () => {
  const realMinhAnhTranscriptJson = JSON.stringify({
    rawText: "uh today i will talk about a person who has a big influence on me this of course is my mother she has always been there for me especially when i have I have made a decision for my future, my study.",
    segments: [
      {
        id: "seg-1",
        startMs: 960,
        endMs: 6560,
        text: "uh today i will talk about a person who has a big influence on me"
      },
      {
        id: "seg-2",
        startMs: 8080,
        endMs: 16640,
        text: "this of course is my mother she has always been there for me especially when i have"
      },
      {
        id: "seg-3",
        startMs: 16640,
        endMs: 23640,
        text: "I have made a decision for my future, my study."
      }
    ]
  });

  it("should parse DB Answer.answerText JSON into UI TranscriptSegments with exact timestamps", () => {
    const { rawText, segments } = parseInitialTranscript(realMinhAnhTranscriptJson);

    expect(rawText).toContain("this of course is my mother");
    expect(segments).toHaveLength(3);

    // Segment 1
    expect(segments[0].id).toBe("seg-1");
    expect(segments[0].startMs).toBe(960);
    expect(segments[0].endMs).toBe(6560);
    expect(formatTime(segments[0].startMs)).toBe("00:00");
    expect(formatTime(segments[0].endMs)).toBe("00:06");
    expect(segments[0].text).toBe("uh today i will talk about a person who has a big influence on me");

    // Segment 2
    expect(segments[1].id).toBe("seg-2");
    expect(segments[1].startMs).toBe(8080);
    expect(segments[1].endMs).toBe(16640);
    expect(formatTime(segments[1].startMs)).toBe("00:08");
    expect(formatTime(segments[1].endMs)).toBe("00:16");

    // Segment 3
    expect(segments[2].startMs).toBe(16640);
    expect(segments[2].endMs).toBe(23640);
    expect(formatTime(segments[2].startMs)).toBe("00:16");
    expect(formatTime(segments[2].endMs)).toBe("00:23");
  });

  it("should format time accurately for seeking up to full exam audio length (118.98s ~ 01:58)", () => {
    const endMs = 118980;
    expect(formatTime(endMs)).toBe("01:58");
  });

  it("should correctly identify audio paths vs transcript text", () => {
    const isAudioPath = (path?: string) => {
      if (!path || typeof path !== "string") return false;
      const clean = path.trim().toLowerCase();
      return (
        clean.startsWith("http://") ||
        clean.startsWith("https://") ||
        clean.startsWith("blob:") ||
        clean.startsWith("/uploads/") ||
        clean.startsWith("speaking-recordings/") ||
        clean.startsWith("exam-assets/") ||
        clean.endsWith(".webm") ||
        clean.endsWith(".mp3") ||
        clean.endsWith(".wav") ||
        clean.endsWith(".m4a") ||
        clean.endsWith(".ogg")
      );
    };

    expect(isAudioPath("speaking-recordings/b914f68e-21b9-4e4a-a090-041344261039.webm")).toBe(true);
    expect(isAudioPath("https://supabase.co/storage/v1/object/public/exam-assets/abc.webm")).toBe(true);
    expect(isAudioPath("uh today i will talk about a person who has a big influence on me")).toBe(false);
    expect(isAudioPath(realMinhAnhTranscriptJson)).toBe(false);
  });
});
