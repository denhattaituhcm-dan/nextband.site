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
  private static readonly AUDIO_EXTENSIONS = new Set([
    "webm",
    "mp3",
    "wav",
    "ogg",
    "m4a",
    "aac",
    "flac",
    "opus",
  ]);

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
      clean.startsWith("uploads/") ||
      clean.startsWith("/speaking-recordings/") ||
      clean.startsWith("speaking-recordings/") ||
      clean.startsWith("/exam-assets/") ||
      clean.startsWith("exam-assets/") ||
      clean.includes("speaking-recordings/") ||
      clean.includes("exam-assets/") ||
      clean.includes("/audio/") ||
      clean.includes("uploads/audio")
    ) {
      return true;
    }
    const ext = clean.split(".").pop()?.split("?")[0] || "";
    return this.AUDIO_EXTENSIONS.has(ext);
  }

  /**
   * Phân tách thông tin bucket và storage path từ nhiều định dạng URL / path khác nhau
   */
  public static parse(raw?: string | null): AudioMetadata {
    if (!raw || !this.isAudio(raw)) {
      return { isAudio: false, bucket: null, storagePath: null, rawUrl: raw || "" };
    }
    const clean = raw.trim();

    // 1. Kiểm tra xem có phải là Supabase Storage URL đầy đủ không
    // e.g. https://xyz.supabase.co/storage/v1/object/(public|authenticated|sign)/<bucket>/<path>
    const supabaseUrlMatch = clean.match(
      /\/storage\/v1\/object\/(?:public|authenticated|sign)\/([^/?#]+)\/(.+?)(?:\?.*)?$/i
    );
    if (supabaseUrlMatch) {
      const matchedBucket = supabaseUrlMatch[1];
      const matchedPath = decodeURIComponent(supabaseUrlMatch[2]);
      if (matchedBucket === "speaking-recordings" || matchedBucket === "exam-assets") {
        return {
          isAudio: true,
          bucket: matchedBucket,
          storagePath: matchedPath,
          rawUrl: clean,
        };
      }
    }

    // 2. Bỏ dấu gạch chéo đầu nếu có để chuẩn hóa path tương đối
    const normalizedPath = clean.startsWith("/") ? clean.slice(1) : clean;

    if (normalizedPath.startsWith("speaking-recordings/")) {
      return {
        isAudio: true,
        bucket: "speaking-recordings",
        storagePath: normalizedPath.replace(/^speaking-recordings\//, ""),
        rawUrl: clean,
      };
    }

    if (normalizedPath.startsWith("exam-assets/")) {
      return {
        isAudio: true,
        bucket: "exam-assets",
        storagePath: normalizedPath.replace(/^exam-assets\//, ""),
        rawUrl: clean,
      };
    }

    if (normalizedPath.startsWith("uploads/audio/") || normalizedPath.startsWith("uploads/")) {
      return {
        isAudio: true,
        bucket: "exam-assets",
        storagePath: normalizedPath,
        rawUrl: clean,
      };
    }

    // 3. Nếu là file đơn lẻ có đuôi âm thanh không chứa slash
    if (!normalizedPath.includes("/") && !normalizedPath.startsWith("http")) {
      return {
        isAudio: true,
        bucket: "speaking-recordings",
        storagePath: normalizedPath,
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
  public static async resolvePlayableUrl(
    raw?: string | null,
    forceRefresh: boolean = false
  ): Promise<string> {
    const meta = this.parse(raw);
    if (!meta.isAudio || !meta.rawUrl) return "";

    // Nếu là blob URL hoặc data URL -> dùng trực tiếp
    if (meta.rawUrl.startsWith("blob:") || meta.rawUrl.startsWith("data:")) {
      return meta.rawUrl;
    }

    // Nếu không phải bucket Supabase mà là link external http/https thông thường
    if (meta.bucket === "external" && (meta.rawUrl.startsWith("http://") || meta.rawUrl.startsWith("https://"))) {
      return meta.rawUrl;
    }

    const cacheKey = `${meta.bucket}:${meta.storagePath}`;
    const now = Date.now();

    if (!forceRefresh) {
      const cached = signedUrlCache.get(cacheKey);
      if (cached && cached.expiresAtMs > now + 60000) {
        return cached.signedUrl;
      }
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
      if (data?.publicUrl) {
        return data.publicUrl;
      }
    }

    return meta.rawUrl;
  }

  /**
   * Xóa cache URL để buộc tải lại
   */
  public static clearCache(): void {
    signedUrlCache.clear();
  }
}
