import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { extname } from "path";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { env } from "../config/env.js";

// Allowed file types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_AUDIO_TYPES];

const BUCKET_NAME = "exam-assets";

// Generate unique filename
function generateFileName(originalName: string): string {
  const ext = extname(originalName) || ".bin";
  return `${Date.now()}-${randomUUID()}${ext}`;
}

const uploadsRoutes: FastifyPluginAsync = async (fastify) => {
  const supabaseUrl = env.SUPABASE_URL || "https://gzpdlqxjggyxlkeatvvf.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || (env as any).SUPABASE_SERVICE_ROLE_KEY;

  const getSupabaseStorageClient = () => {
    if (!serviceRoleKey) {
      return null;
    }
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  };

  // POST /uploads - Upload single file to Supabase Storage
  fastify.post(
    "/",
    { preHandler: authenticate },
    async (request: FastifyRequest, reply) => {
      const supabase = getSupabaseStorageClient();
      if (!supabase) {
        return reply.status(500).send({
          statusCode: 500,
          error: "SERVICE_CONFIGURATION_ERROR",
          message: "Hệ thống chưa cấu hình SUPABASE_SERVICE_ROLE_KEY cho chức năng tải tệp lên hệ thống lưu trữ.",
        });
      }

      const data = await (request as any).file();

      if (!data) {
        return reply
          .status(400)
          .send({ error: "Không có tệp nào được tải lên" });
      }

      // Check file type
      if (!ALLOWED_TYPES.includes(data.mimetype)) {
        return reply.status(400).send({
          error: "Loại tệp không hợp lệ",
          allowedTypes: ALLOWED_TYPES,
        });
      }

      const isImage = ALLOWED_IMAGE_TYPES.includes(data.mimetype);
      const subDir = isImage ? "images" : "audio";
      const fileName = generateFileName(data.filename || `file_${Date.now()}`);
      const storagePath = `${subDir}/${fileName}`;

      try {
        const buffer = await data.toBuffer();

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, buffer, {
            contentType: data.mimetype,
            upsert: false,
          });

        if (uploadError) {
          fastify.log.error({ err: uploadError, storagePath }, "Supabase Storage persistence error");
          return reply.status(500).send({
            statusCode: 500,
            error: "PERSISTENCE_ERROR",
            message: "Tải tệp lên hệ thống lưu trữ bền vững thất bại: " + (uploadError.message || "Storage error"),
          });
        }

        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);

        return {
          url: publicUrlData.publicUrl,
          fileName,
          mimeType: data.mimetype,
          size: buffer.length,
        };
      } catch (err: any) {
        fastify.log.error(err, "Unexpected upload error");
        return reply.status(500).send({
          statusCode: 500,
          error: "PERSISTENCE_ERROR",
          message: "Lỗi hệ thống khi xử lý tải tệp: " + (err?.message || "Internal error"),
        });
      }
    },
  );

  // POST /uploads/image - Upload image specifically
  fastify.post(
    "/image",
    { preHandler: authenticate },
    async (request: FastifyRequest, reply) => {
      const supabase = getSupabaseStorageClient();
      if (!supabase) {
        return reply.status(500).send({
          statusCode: 500,
          error: "SERVICE_CONFIGURATION_ERROR",
          message: "Hệ thống chưa cấu hình SUPABASE_SERVICE_ROLE_KEY cho chức năng tải hình ảnh lên hệ thống lưu trữ.",
        });
      }

      const data = await (request as any).file();

      if (!data) {
        return reply
          .status(400)
          .send({ error: "Không có tệp nào được tải lên" });
      }

      if (!ALLOWED_IMAGE_TYPES.includes(data.mimetype)) {
        return reply.status(400).send({
          error: "Loại hình ảnh không hợp lệ",
          allowedTypes: ALLOWED_IMAGE_TYPES,
        });
      }

      const fileName = generateFileName(data.filename || `image_${Date.now()}`);
      const storagePath = `images/${fileName}`;

      try {
        const buffer = await data.toBuffer();

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, buffer, {
            contentType: data.mimetype,
            upsert: false,
          });

        if (uploadError) {
          fastify.log.error({ err: uploadError, storagePath }, "Supabase Storage image persistence error");
          return reply.status(500).send({
            statusCode: 500,
            error: "PERSISTENCE_ERROR",
            message: "Tải hình ảnh lên hệ thống lưu trữ bền vững thất bại: " + (uploadError.message || "Storage error"),
          });
        }

        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);

        return {
          url: publicUrlData.publicUrl,
          fileName,
          mimeType: data.mimetype,
          size: buffer.length,
        };
      } catch (err: any) {
        fastify.log.error(err, "Unexpected image upload error");
        return reply.status(500).send({
          statusCode: 500,
          error: "PERSISTENCE_ERROR",
          message: "Lỗi hệ thống khi xử lý tải hình ảnh: " + (err?.message || "Internal error"),
        });
      }
    },
  );

  // POST /uploads/audio - Upload audio specifically
  fastify.post(
    "/audio",
    { preHandler: authenticate },
    async (request: FastifyRequest, reply) => {
      const supabase = getSupabaseStorageClient();
      if (!supabase) {
        return reply.status(500).send({
          statusCode: 500,
          error: "SERVICE_CONFIGURATION_ERROR",
          message: "Hệ thống chưa cấu hình SUPABASE_SERVICE_ROLE_KEY cho chức năng tải âm thanh lên hệ thống lưu trữ.",
        });
      }

      const data = await (request as any).file();

      if (!data) {
        return reply
          .status(400)
          .send({ error: "Không có tệp nào được tải lên" });
      }

      if (!ALLOWED_AUDIO_TYPES.includes(data.mimetype)) {
        return reply.status(400).send({
          error: "Loại âm thanh không hợp lệ",
          allowedTypes: ALLOWED_AUDIO_TYPES,
        });
      }

      const fileName = generateFileName(data.filename || `audio_${Date.now()}`);
      const storagePath = `audio/${fileName}`;

      try {
        const buffer = await data.toBuffer();

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, buffer, {
            contentType: data.mimetype,
            upsert: false,
          });

        if (uploadError) {
          fastify.log.error({ err: uploadError, storagePath }, "Supabase Storage audio persistence error");
          return reply.status(500).send({
            statusCode: 500,
            error: "PERSISTENCE_ERROR",
            message: "Tải âm thanh lên hệ thống lưu trữ bền vững thất bại: " + (uploadError.message || "Storage error"),
          });
        }

        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);

        return {
          url: publicUrlData.publicUrl,
          fileName,
          mimeType: data.mimetype,
          size: buffer.length,
        };
      } catch (err: any) {
        fastify.log.error(err, "Unexpected audio upload error");
        return reply.status(500).send({
          statusCode: 500,
          error: "PERSISTENCE_ERROR",
          message: "Lỗi hệ thống khi xử lý tải âm thanh: " + (err?.message || "Internal error"),
        });
      }
    },
  );

  // DELETE /uploads - Delete file from Supabase Storage (admin only)
  fastify.delete(
    "/",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const supabase = getSupabaseStorageClient();
      if (!supabase) {
        return reply.status(500).send({
          statusCode: 500,
          error: "SERVICE_CONFIGURATION_ERROR",
          message: "Hệ thống chưa cấu hình SUPABASE_SERVICE_ROLE_KEY cho chức năng xóa tệp khỏi hệ thống lưu trữ.",
        });
      }

      const { url } = (request.body || {}) as { url?: string };

      if (!url || typeof url !== "string") {
        return reply.status(400).send({ error: "Yêu cầu URL tệp cần xóa" });
      }

      let decodedUrl: string;
      try {
        decodedUrl = decodeURIComponent(url);
        if (decodedUrl.includes("%")) {
          try {
            decodedUrl = decodeURIComponent(decodedUrl);
          } catch {}
        }
      } catch {
        return reply.status(400).send({ error: "URL không hợp lệ" });
      }

      if (decodedUrl.includes("..") || decodedUrl.includes(":\\") || decodedUrl.includes(":/..")) {
        return reply.status(400).send({ error: "Đường dẫn chứa ký tự không hợp lệ" });
      }

      // Extract storage path from either relative /uploads/(images|audio)/file or CDN URL
      let storagePath = "";
      const relativeMatch = decodedUrl.match(/\/uploads\/(images|audio)\/([^/?#]+)/);
      const cdnMatch = decodedUrl.match(/\/exam-assets\/(images|audio)\/([^/?#]+)/);

      if (cdnMatch) {
        storagePath = `${cdnMatch[1]}/${cdnMatch[2]}`;
      } else if (relativeMatch) {
        storagePath = `${relativeMatch[1]}/${relativeMatch[2]}`;
      } else {
        return reply.status(400).send({ error: "URL tệp không thuộc phạm vi quản lý exam-assets" });
      }

      try {
        const { error: removeError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([storagePath]);

        if (removeError) {
          fastify.log.error({ err: removeError, storagePath }, "Supabase Storage delete error");
          return reply.status(500).send({
            statusCode: 500,
            error: "PERSISTENCE_ERROR",
            message: "Xóa tệp khỏi hệ thống lưu trữ bền vững thất bại: " + removeError.message,
          });
        }

        return { success: true, message: "Đã xóa tệp khỏi hệ thống lưu trữ thành công" };
      } catch (err: any) {
        fastify.log.error(err, "Delete file unexpected error");
        return reply.status(500).send({
          statusCode: 500,
          error: "PERSISTENCE_ERROR",
          message: "Lỗi hệ thống khi xóa tệp: " + (err?.message || "Internal error"),
        });
      }
    },
  );
};

export default uploadsRoutes;

