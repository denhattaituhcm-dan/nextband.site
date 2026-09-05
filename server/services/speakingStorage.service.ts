import { PrismaClient, RetentionType, RecordingStatus } from "@prisma/client";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

export const SPEAKING_BUCKET = "speaking-recordings";

// Retention durations in milliseconds (Server-owned policy)
export const RETENTION_DURATIONS_MS = {
  PLACEMENT: 15 * 24 * 60 * 60 * 1000, // 15 days
  HOMEWORK: 60 * 24 * 60 * 60 * 1000,  // 60 days
  EXAM: 90 * 24 * 60 * 60 * 1000,      // 90 days
  DRAFT: 12 * 60 * 60 * 1000,          // 12 hours
} as const;

export class SpeakingStorageService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaClient) {
    const supabaseUrl = env.SUPABASE_URL || "https://gzpdlqxjggyxlkeatvvf.supabase.co";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGRscXhqZ2d5eGxrZWF0dnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyOTc3NjMsImV4cCI6MjEwMDg3Mzc2M30.M7uMAo2qJCDQtxQMP-_58VKF1LfSBdwR31gpvqcCN6I";
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Đảm bảo Bucket speaking-recordings tồn tại và được cấu hình Public
   */
  async ensureBucketExists(): Promise<void> {
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets();
      const exists = buckets?.some((b) => b.name === SPEAKING_BUCKET);
      if (!exists) {
        await this.supabase.storage.createBucket(SPEAKING_BUCKET, {
          public: true,
          fileSizeLimit: 15 * 1024 * 1024,
          allowedMimeTypes: ["audio/webm", "audio/ogg", "audio/mp4", "audio/wav"],
        });
      } else {
        await this.supabase.storage.updateBucket(SPEAKING_BUCKET, { public: true });
      }
    } catch {
      // Safe fallback
    }
  }

  /**
   * Khởi tạo bản ghi Asset ở trạng thái UPLOADING (Draft 12h)
   */
  async registerDraftAsset(params: {
    id: string;
    referenceType: string;
    referenceId: string;
    questionId?: string;
    uploadedBy?: string;
  }) {
    const expiresAt = new Date(Date.now() + RETENTION_DURATIONS_MS.DRAFT);
    return this.prisma.speakingRecordingAsset.upsert({
      where: { id: params.id },
      create: {
        id: params.id,
        referenceType: params.referenceType,
        referenceId: params.referenceId,
        questionId: params.questionId,
        retentionType: "DRAFT",
        status: "UPLOADING",
        uploadedBy: params.uploadedBy,
        expiresAt,
      },
      update: {
        referenceType: params.referenceType,
        referenceId: params.referenceId,
        questionId: params.questionId,
        expiresAt,
      },
    });
  }

  /**
   * Xác nhận tải lên thành công và kích hoạt Asset
   */
  async confirmAssetUploaded(params: {
    id: string;
    storagePath: string;
    mimeType?: string;
    sizeBytes?: number;
    durationMs?: number;
  }) {
    return this.prisma.speakingRecordingAsset.update({
      where: { id: params.id },
      data: {
        storagePath: params.storagePath,
        status: "ACTIVE",
        mimeType: params.mimeType || "audio/webm",
        sizeBytes: params.sizeBytes,
        durationMs: params.durationMs,
      },
    });
  }

  /**
   * Nâng cấp Asset khi bài thi được nộp chính thức (Server-owned Retention)
   */
  async promoteAssetOnSubmission(params: {
    referenceType: string;
    referenceId: string;
    retentionType: RetentionType;
    submittedAt?: Date;
  }) {
    const baseDate = params.submittedAt ? params.submittedAt.getTime() : Date.now();
    const durationMs = RETENTION_DURATIONS_MS[params.retentionType] || RETENTION_DURATIONS_MS.PLACEMENT;
    const expiresAt = new Date(baseDate + durationMs);

    return this.prisma.speakingRecordingAsset.updateMany({
      where: {
        referenceType: params.referenceType,
        referenceId: params.referenceId,
        status: "ACTIVE",
      },
      data: {
        retentionType: params.retentionType,
        expiresAt,
      },
    });
  }

  /**
   * Tạo Public URL (hoặc Signed URL dự phòng) để phát âm thanh
   */
  async getSignedPlaybackUrl(storagePath: string, expiresInSeconds: number = 7200): Promise<string | null> {
    if (!storagePath) return null;
    const clean = storagePath.trim();

    // 1. Kiểm tra xem có phải là Supabase Storage URL đầy đủ không
    const supabaseUrlMatch = clean.match(
      /\/storage\/v1\/object\/(?:public|authenticated|sign)\/([^/?#]+)\/(.+?)(?:\?.*)?$/i
    );
    if (supabaseUrlMatch) {
      const bucket = supabaseUrlMatch[1];
      const subPath = decodeURIComponent(supabaseUrlMatch[2]);
      const targetBucket = bucket === "speaking-recordings" ? "exam-assets" : bucket;
      const targetPath = bucket === "speaking-recordings" ? `speaking-recordings/${subPath}` : subPath;
      const { data } = this.supabase.storage.from(targetBucket).getPublicUrl(targetPath);
      if (data?.publicUrl) return data.publicUrl;
    }

    if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("blob:") || clean.startsWith("data:")) {
      return clean;
    }

    let cleanPath = clean.replace(/^\/+/, "");
    // If it's a bare UUID or speaking audio filename without path
    if (!cleanPath.includes("/")) {
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(webm|mp3|wav|ogg|m4a)$/i.test(cleanPath)) {
        cleanPath = `speaking-recordings/${cleanPath}`;
      } else if (/\.(mp3|wav|ogg|webm|m4a|aac)$/i.test(cleanPath)) {
        cleanPath = `uploads/audio/${cleanPath}`;
      }
    }
    // Toàn bộ audio ghi âm và đề thi đều được lưu trữ trong bucket exam-assets
    const assetSubPath = cleanPath.replace(/^exam-assets\//, "");
    const { data: pubData } = this.supabase.storage.from("exam-assets").getPublicUrl(assetSubPath);
    if (pubData?.publicUrl) return pubData.publicUrl;

    return null;
  }

  /**
   * Tải buffer tệp âm thanh từ Storage phục vụ STT
   */
  async downloadAudioBuffer(storagePath: string): Promise<{ buffer: Buffer; mimeType: string; fileName: string }> {
    if (!storagePath) {
      throw new Error("Đường dẫn tệp âm thanh không hợp lệ");
    }
    const clean = storagePath.trim();

    // 1. Nếu là Supabase Storage URL đầy đủ
    const supabaseUrlMatch = clean.match(
      /\/storage\/v1\/object\/(?:public|authenticated|sign)\/([^/?#]+)\/(.+?)(?:\?.*)?$/i
    );
    if (supabaseUrlMatch) {
      const bucket = supabaseUrlMatch[1];
      const subPath = decodeURIComponent(supabaseUrlMatch[2]);
      const targetBucket = bucket === "speaking-recordings" ? "exam-assets" : bucket;
      const targetPath = bucket === "speaking-recordings" ? `speaking-recordings/${subPath}` : subPath;
      const downloadRes = await this.supabase.storage.from(targetBucket).download(targetPath);
      if (!downloadRes.error && downloadRes.data) {
        const blob = downloadRes.data;
        const arrayBuf = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuf);
        const mimeType = blob.type || "audio/webm";
        const fileName = targetPath.split("/").pop() || "recording.webm";
        return { buffer, mimeType, fileName };
      }
    }

    let cleanPath = clean.replace(/^\/+/, "");
    if (!cleanPath.includes("/")) {
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(webm|mp3|wav|ogg|m4a)$/i.test(cleanPath)) {
        cleanPath = `speaking-recordings/${cleanPath}`;
      } else if (/\.(mp3|wav|ogg|webm|m4a|aac)$/i.test(cleanPath)) {
        cleanPath = `uploads/audio/${cleanPath}`;
      }
    }

    // 2. Thử tải từ exam-assets (Bucket lưu trữ chính)
    const examSubPath = cleanPath.replace(/^exam-assets\//, "");
    const examDownload = await this.supabase.storage.from("exam-assets").download(examSubPath);
    if (!examDownload.error && examDownload.data) {
      const blob = examDownload.data;
      const arrayBuf = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const mimeType = blob.type || "audio/webm";
      const fileName = examSubPath.split("/").pop() || "recording.webm";
      return { buffer, mimeType, fileName };
    }

    // 3. Dự phòng: Thử tải từ speaking-recordings nếu có
    const subCleanPath = cleanPath.replace(/^speaking-recordings\//, "");
    const downloadRes = await this.supabase.storage.from(SPEAKING_BUCKET).download(subCleanPath);
    if (!downloadRes.error && downloadRes.data) {
      const blob = downloadRes.data;
      const arrayBuf = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const mimeType = blob.type || "audio/webm";
      const fileName = subCleanPath.split("/").pop() || "recording.webm";
      return { buffer, mimeType, fileName };
    }

    // 4. Nếu là URL bên ngoài (http/https), fetch trực tiếp
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      const fetchRes = await fetch(clean);
      if (!fetchRes.ok) {
        throw new Error(`Không thể tải tệp âm thanh từ URL: ${clean}`);
      }
      const arrayBuf = await fetchRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const mimeType = fetchRes.headers.get("content-type") || "audio/webm";
      const fileName = clean.split("/").pop()?.split("?")[0] || "recording.webm";
      return { buffer, mimeType, fileName };
    }

    throw new Error(`Không tìm thấy file ghi âm trong Storage: ${storagePath}`);
  }

  /**
   * Idempotent Retention Cleanup Worker
   * Desired state: Storage object = ABSENT, DB status = PURGED
   */
  async purgeExpiredRecordings(): Promise<{ purgedCount: number; failedCount: number; orphanPurgedCount: number }> {
    let purgedCount = 0;
    let failedCount = 0;
    let orphanPurgedCount = 0;

    const now = new Date();

    const expiredAssets = await this.prisma.speakingRecordingAsset.findMany({
      where: {
        status: { in: ["ACTIVE", "EXPIRED"] },
        expiresAt: { lte: now },
      },
      take: 100,
    });

    for (const asset of expiredAssets) {
      try {
        if (asset.storagePath) {
          const cleanPath = asset.storagePath.replace(/^\/+/, "");
          const subCleanPath = cleanPath.replace(/^speaking-recordings\//, "");
          await this.supabase.storage.from("exam-assets").remove([cleanPath]);
          await this.supabase.storage.from(SPEAKING_BUCKET).remove([subCleanPath]);
        }

        await this.prisma.speakingRecordingAsset.update({
          where: { id: asset.id },
          data: {
            status: "PURGED",
            purgedAt: now,
            storagePath: null,
            lastCleanupError: null,
          },
        });
        purgedCount++;
      } catch (err: any) {
        failedCount++;
        await this.prisma.speakingRecordingAsset.update({
          where: { id: asset.id },
          data: {
            status: "EXPIRED",
            lastCleanupError: err?.message || String(err),
          },
        });
      }
    }

    const orphanCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const orphanResult = await this.prisma.speakingRecordingAsset.updateMany({
      where: {
        status: "UPLOADING",
        createdAt: { lte: orphanCutoff },
      },
      data: {
        status: "PURGED",
        purgedAt: now,
        storagePath: null,
      },
    });
    orphanPurgedCount = orphanResult.count;

    return { purgedCount, failedCount, orphanPurgedCount };
  }
}
