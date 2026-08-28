import { env } from "../config/env.js";

export interface TranscriptSegment {
  id?: string;
  startMs: number;
  endMs: number;
  text: string;
}

export interface SpeakingTranscript {
  rawText: string;
  segments: TranscriptSegment[];
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  error?: string;
}

/**
 * Split plain text into sentence segments if provider does not return segment-level timestamps
 */
function splitTextIntoDefaultSegments(text: string, totalDurationMs: number = 60000): TranscriptSegment[] {
  if (!text || text.trim() === "") return [];

  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return [{ id: "seg-1", startMs: 0, endMs: totalDurationMs || 10000, text }];
  }

  const avgDurationMs = Math.max(2000, Math.floor((totalDurationMs || 60000) / sentences.length));
  return sentences.map((sentence, idx) => ({
    id: `seg-${idx + 1}`,
    startMs: idx * avgDurationMs,
    endMs: (idx + 1) * avgDurationMs,
    text: sentence,
  }));
}

export class WhisperSttService {
  private apiKey: string | null;
  private apiUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || process.env.WHISPER_API_KEY || null;
    this.apiUrl = process.env.WHISPER_API_URL || "https://api.openai.com/v1/audio/transcriptions";
    this.model = process.env.WHISPER_MODEL || "whisper-1";
  }

  /**
   * Transcribes an audio buffer into normalized NextBand SpeakingTranscript contract
   */
  async transcribeAudio(
    audioBuffer: Buffer,
    fileName: string = "audio.webm",
    mimeType: string = "audio/webm",
    totalDurationMs?: number,
  ): Promise<SpeakingTranscript> {
    const apiKey = process.env.OPENAI_API_KEY || process.env.WHISPER_API_KEY || this.apiKey;
    const apiUrl = process.env.WHISPER_API_URL || this.apiUrl;
    const model = process.env.WHISPER_MODEL || this.model;

    if (!apiKey) {
      return {
        rawText: "",
        segments: [],
        status: "FAILED",
        error: "Chưa cấu hình API Key cho Speech-to-Text (Vui lòng thiết lập OPENAI_API_KEY trong file môi trường .env).",
      };
    }

    try {
      const formData = new FormData();
      const uint8Array = new Uint8Array(audioBuffer);
      const audioBlob = new Blob([uint8Array], { type: mimeType });
      formData.append("file", audioBlob, fileName);
      formData.append("model", model);
      formData.append("response_format", "verbose_json");
      formData.append("language", "en"); // IELTS speaking standard is English

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        let errorDetails = "";
        try {
          const errJson = await response.json();
          errorDetails = errJson?.error?.message || JSON.stringify(errJson);
        } catch {
          errorDetails = await response.text();
        }
        console.error(`[WhisperSttService] HTTP Error ${response.status}:`, errorDetails);
        return {
          rawText: "",
          segments: [],
          status: "FAILED",
          error: `Lỗi từ nhà cung cấp STT (${response.status}): ${errorDetails || "Không thể xử lý âm thanh"}`,
        };
      }

      const data: any = await response.json();
      const rawText: string = (data.text || "").trim();

      // Normalize segments into NextBand contract
      let normalizedSegments: TranscriptSegment[] = [];

      if (Array.isArray(data.segments) && data.segments.length > 0) {
        normalizedSegments = data.segments.map((seg: any, idx: number) => {
          const startSeconds = typeof seg.start === "number" ? seg.start : 0;
          const endSeconds = typeof seg.end === "number" ? seg.end : startSeconds + 2;
          return {
            id: `seg-${idx + 1}`,
            startMs: Math.round(startSeconds * 1000),
            endMs: Math.round(endSeconds * 1000),
            text: (seg.text || "").trim(),
          };
        }).filter((s: TranscriptSegment) => s.text.length > 0);
      } else if (rawText) {
        normalizedSegments = splitTextIntoDefaultSegments(rawText, totalDurationMs || (data.duration ? Math.round(data.duration * 1000) : 60000));
      }

      return {
        rawText,
        segments: normalizedSegments,
        status: "COMPLETED",
      };
    } catch (err: any) {
      console.error("[WhisperSttService] Execution error:", err);
      return {
        rawText: "",
        segments: [],
        status: "FAILED",
        error: err?.message || "Lỗi bất ngờ trong quá trình nhận dạng âm thanh",
      };
    }
  }
}

export const whisperSttService = new WhisperSttService();
