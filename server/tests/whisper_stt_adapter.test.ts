import { describe, it, expect, vi, beforeEach } from "vitest";
import { WhisperSttService } from "../services/whisperStt.service.js";

describe("WhisperSttService Adapter", () => {
  let service: WhisperSttService;

  beforeEach(() => {
    service = new WhisperSttService();
  });

  it("should return FAILED status if OPENAI_API_KEY is missing", async () => {
    // When no API key
    (service as any).apiKey = null;
    const dummyBuffer = Buffer.from("fake-audio-data");

    const result = await service.transcribeAudio(dummyBuffer, "test.webm", "audio/webm");

    expect(result.status).toBe("FAILED");
    expect(result.rawText).toBe("");
    expect(result.segments).toEqual([]);
    expect(result.error).toContain("Chưa cấu hình API Key");
  });

  it("should normalize verbose_json response from Whisper API into NextBand SpeakingTranscript format", async () => {
    (service as any).apiKey = "test-api-key";

    // Mock fetch
    const mockWhisperResponse = {
      text: "I really enjoy learning English at NextBand. It helps me improve my speaking skills.",
      segments: [
        {
          id: 0,
          start: 0.0,
          end: 3.5,
          text: "I really enjoy learning English at NextBand.",
        },
        {
          id: 1,
          start: 3.6,
          end: 7.2,
          text: "It helps me improve my speaking skills.",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockWhisperResponse,
    });

    const dummyBuffer = Buffer.from("fake-audio-data");
    const result = await service.transcribeAudio(dummyBuffer, "student_recording.webm", "audio/webm");

    expect(result.status).toBe("COMPLETED");
    expect(result.rawText).toBe("I really enjoy learning English at NextBand. It helps me improve my speaking skills.");
    expect(result.segments).toHaveLength(2);
    expect(result.segments[0]).toEqual({
      id: "seg-1",
      startMs: 0,
      endMs: 3500,
      text: "I really enjoy learning English at NextBand.",
    });
    expect(result.segments[1]).toEqual({
      id: "seg-2",
      startMs: 3600,
      endMs: 7200,
      text: "It helps me improve my speaking skills.",
    });
  });

  it("should gracefully handle standard text-only response by splitting sentences", async () => {
    (service as any).apiKey = "test-api-key";

    const mockTextOnlyResponse = {
      text: "First sentence here. Second sentence follows.",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTextOnlyResponse,
    });

    const dummyBuffer = Buffer.from("fake-audio-data");
    const result = await service.transcribeAudio(dummyBuffer, "student_recording.webm", "audio/webm", 10000);

    expect(result.status).toBe("COMPLETED");
    expect(result.rawText).toBe("First sentence here. Second sentence follows.");
    expect(result.segments.length).toBeGreaterThanOrEqual(2);
  });
});
