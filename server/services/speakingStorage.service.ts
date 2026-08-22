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
   * Đảm bảo Bucket speaking-recordings tồn tại và được cấu hình Private
   */
  async ensureBucketExists(): Promise<void> {
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets();
      const exists = buckets?.some((b) => b.name === SPEAKING_BUCKET);
      if (!exists) {
        await this.supabase.storage.createBucket(SPEAKING_BUCKET, {
          public: false,
          fileSizeLimit: 15 * 1024 * 1024,
          allowedMimeTypes: ["audio/webm", "audio/ogg", "audio/mp4", "audio/wav"],
        });
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
   * Tạo Signed URL có thời hạn (1 giờ) sau khi kiểm tra quyền
   */
  async getSignedPlaybackUrl(storagePath: string, expiresInSeconds: number = 3600): Promise<string | null> {
    if (!storagePath) return null;
    const cleanPath = storagePath.replace(/^speaking-recordings\//, "").replace(/^\/+/, "");
    
    const { data, error } = await this.supabase.storage
      .from(SPEAKING_BUCKET)
      .createSignedUrl(cleanPath, expiresInSeconds);

    if (error || !data?.signedUrl) {
      throw new Error(error?.message || "Không thể tạo liên kết phát âm thanh");
    }

    return data.signedUrl;
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
          const cleanPath = asset.storagePath.replace(/^speaking-recordings\//, "").replace(/^\/+/, "");
          const { error } = await this.supabase.storage.from(SPEAKING_BUCKET).remove([cleanPath]);
          
          if (error && !error.message?.includes("not found") && !error.message?.includes("404")) {
            throw error;
          }
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
