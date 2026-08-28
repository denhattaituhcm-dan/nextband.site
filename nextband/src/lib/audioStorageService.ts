import { supabase } from "@/lib/supabase";

export interface AudioMetadata {
  isAudio: boolean;
  bucket: "speaking-recordings" | "exam-assets" | "external" | null;
  storagePath: string | null;
  rawUrl: string;
}

interface CachedSignedUrl {
  signedUrl: string;
  expiresAtMs: number;
}

// In-memory TTL Cache cho Signed URLs (Tránh spam API Supabase & giật lag trình phát)
const signedUrlCache = new Map<string, CachedSignedUrl>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export class AudioStorageService {
  private static readonly AUDIO_EXTENSIONS = new Set(["webm", "mp3", "wav", "ogg", "m4a", "aac"]);

  /**
   * Kiểm tra xem giá trị có phải là đường dẫn / URL âm thanh hợp lệ không
   */
  public static isAudio(val?: string | null): boolean {
    if (!val || typeof val !== "string") return false;
    const clean = val.trim().toLowerCase();
    if (
      clean.startsWith("http://") ||
      clean.startsWith("https://") ||
      clean.startsWith("blob:") ||
      clean.startsWith("data:audio") ||
      clean.startsWith("/uploads/") ||
      clean.startsWith("speaking-recordings/") ||
      clean.startsWith("exam-assets/") ||
      clean.includes("speaking-recordings/") ||
      clean.includes("exam-assets/") ||
      clean.includes("/audio/")
    ) {
      return true;
    }
    const ext = clean.split(".").pop()?.split("?")[0] || "";
    return this.AUDIO_EXTENSIONS.has(ext);
  }

  /**
   * Phân tách thông tin bucket và storage path
   */
  public static parse(raw?: string | null): AudioMetadata {
    if (!raw || !this.isAudio(raw)) {
      return { isAudio: false, bucket: null, storagePath: null, rawUrl: raw || "" };
    }
    const clean = raw.trim();
    if (clean.startsWith("speaking-recordings/")) {
      return {
        isAudio: true,
        bucket: "speaking-recordings",
        storagePath: clean.replace(/^speaking-recordings\//, ""),
        rawUrl: clean,
      };
    }
    if (clean.startsWith("exam-assets/")) {
      return {
        isAudio: true,
        bucket: "exam-assets",
        storagePath: clean.replace(/^exam-assets\//, ""),
        rawUrl: clean,
      };
    }
    return {
      isAudio: true,
      bucket: "external",
      storagePath: null,
      rawUrl: clean,
    };
  }

  /**
   * Lấy URL phát âm thanh với cơ chế Cache Signed URL 2h cho Supabase Storage private buckets
   */
  public static async resolvePlayableUrl(raw?: string | null): Promise<string> {
    const meta = this.parse(raw);
    if (!meta.isAudio || !meta.rawUrl) return "";

    // Nếu là direct URL hoặc blob -> dùng trực tiếp
    if (
      meta.bucket === "external" ||
      meta.rawUrl.startsWith("http://") ||
      meta.rawUrl.startsWith("https://") ||
      meta.rawUrl.startsWith("blob:") ||
      meta.rawUrl.startsWith("data:")
    ) {
      return meta.rawUrl;
    }

    const cacheKey = `${meta.bucket}:${meta.storagePath}`;
    const now = Date.now();
    const cached = signedUrlCache.get(cacheKey);
    if (cached && cached.expiresAtMs > now + 60000) {
      return cached.signedUrl;
    }

    try {
      if (meta.bucket && meta.storagePath) {
        const { data, error } = await supabase.storage
          .from(meta.bucket)
          .createSignedUrl(meta.storagePath, 7200);

        if (!error && data?.signedUrl) {
          signedUrlCache.set(cacheKey, {
            signedUrl: data.signedUrl,
            expiresAtMs: now + CACHE_TTL_MS,
          });
          return data.signedUrl;
        }
      }
    } catch (e) {
      console.warn("[AudioStorageService] Fallback to public URL due to signed URL error:", e);
    }

    // Fallback public url
    if (meta.bucket && meta.storagePath) {
      const { data } = supabase.storage.from(meta.bucket).getPublicUrl(meta.storagePath);
      return data.publicUrl;
    }
    return meta.rawUrl;
  }
}
