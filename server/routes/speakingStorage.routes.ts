import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { handleValidation } from "../utils/validation.js";
import { optionalAuthenticate, authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { SpeakingStorageService } from "../services/speakingStorage.service.js";
import { whisperSttService } from "../services/whisperStt.service.js";

const registerDraftSchema = z.object({
  id: z.string().uuid("ID phải là UUID hợp lệ"),
  referenceType: z.string().min(1, "referenceType là bắt buộc"),
  referenceId: z.string().min(1, "referenceId là bắt buộc"),
  questionId: z.string().optional(),
});

const confirmUploadSchema = z.object({
  id: z.string().uuid("ID phải là UUID hợp lệ"),
  storagePath: z.string().min(1, "storagePath là bắt buộc"),
  mimeType: z.string().optional(),
  sizeBytes: z.number().int().optional(),
  durationMs: z.number().int().optional(),
});

const playbackUrlSchema = z.object({
  storagePath: z.string().min(1, "storagePath là bắt buộc"),
});

const transcribeSchema = z.object({
  submissionId: z.string().optional(),
  answerId: z.string().optional(),
  questionId: z.string().optional(),
  storagePath: z.string().optional(),
});

const speakingStorageRoutes: FastifyPluginAsync = async (fastify) => {
  const speakingService = new SpeakingStorageService(fastify.prisma);

  // Đảm bảo bucket tồn tại khi plugin khởi động
  speakingService.ensureBucketExists().catch(() => {});

  // POST /speaking/register-draft - Đăng ký ghi âm nháp
  fastify.post(
    "/register-draft",
    { preHandler: optionalAuthenticate },
    async (request, reply) => {
      const data = handleValidation(
        registerDraftSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const userId = (request as any).user?.id || null;
      const asset = await speakingService.registerDraftAsset({
        ...(data as any),
        uploadedBy: userId,
      });

      return reply.status(201).send(asset);
    },
  );

  // POST /speaking/confirm-upload - Xác nhận tệp đã tải lên Storage thành công
  fastify.post(
    "/confirm-upload",
    { preHandler: optionalAuthenticate },
    async (request, reply) => {
      const data = handleValidation(
        confirmUploadSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const asset = await speakingService.confirmAssetUploaded(data as any);
      return reply.send(asset);
    },
  );

  // POST /speaking/playback-url - Lấy Signed URL có thời hạn để phát âm thanh
  fastify.post(
    "/playback-url",
    { preHandler: optionalAuthenticate },
    async (request, reply) => {
      const data = handleValidation(
        playbackUrlSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      try {
        const signedUrl = await speakingService.getSignedPlaybackUrl(data.storagePath, 3600);
        return reply.send({ signedUrl, storagePath: data.storagePath, expiresInSeconds: 3600 });
      } catch (err: any) {
        return reply.status(404).send({ error: err?.message || "Không thể lấy đường dẫn phát lại" });
      }
    },
  );

  // POST /speaking/transcribe - Bóc băng Speech-to-Text (Chỉ dành riêng cho Giáo viên & Admin khi chấm bài)
  fastify.post(
    "/transcribe",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const data = handleValidation(
        transcribeSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      // 1. Tìm bản ghi answer tương ứng
      let answer: any = null;
      if (data.answerId) {
        answer = await fastify.prisma.answer.findUnique({
          where: { id: data.answerId },
        });
      } else if (data.submissionId && data.questionId) {
        answer = await fastify.prisma.answer.findUnique({
          where: {
            submissionId_questionId: {
              submissionId: data.submissionId,
              questionId: data.questionId,
            },
          },
        });
      }

      // 2. Lấy audioUrl từ Answer hoặc data.storagePath
      const audioUrl = answer?.audioUrl || data.storagePath;
      if (!audioUrl) {
        return reply.status(400).send({
          rawText: "",
          segments: [],
          status: "FAILED",
          error: "Không tìm thấy tệp âm thanh ghi âm cho câu trả lời này.",
        });
      }

      try {
        // 3. Tải buffer file âm thanh từ Storage
        const audioFile = await speakingService.downloadAudioBuffer(audioUrl);

        // 4. Chuyển đổi âm thanh sang văn bản qua STT Adapter
        const result = await whisperSttService.transcribeAudio(
          audioFile.buffer,
          audioFile.fileName,
          audioFile.mimeType,
        );

        // 5. Nếu bóc băng thành công, cập nhật answerText trong CSDL
        if (result.status === "COMPLETED" && answer?.id) {
          const payloadString = JSON.stringify({
            rawText: result.rawText,
            segments: result.segments,
          });
          await fastify.prisma.answer.update({
            where: { id: answer.id },
            data: {
              answerText: payloadString,
            },
          });
        }

        return reply.send(result);
      } catch (err: any) {
        console.error("[Transcribe Route] Error:", err);
        return reply.status(500).send({
          rawText: "",
          segments: [],
          status: "FAILED",
          error: err?.message || "Lỗi trong quá trình xử lý bóc băng âm thanh",
        });
      }
    },
  );

  // POST /speaking/maintenance/cleanup - Endpoint dọn dẹp âm thanh hết hạn (Chạy định kỳ)
  fastify.post(
    "/maintenance/cleanup",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const result = await speakingService.purgeExpiredRecordings();
      return reply.send({
        success: true,
        message: "Hoàn tất chu kỳ dọn dẹp ghi âm hết hạn",
        ...result,
      });
    },
  );
};

export default speakingStorageRoutes;
