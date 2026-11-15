import { FastifyPluginAsync } from "fastify";
import { z } from "zod";

const bookmarkItemSchema = z.object({
  unitId: z.number().int().min(1),
  lexiconId: z.string().min(1).max(100),
  word: z.string().min(1).max(100),
  ipa: z.string().max(100).optional(),
  pos: z.string().max(50).optional(),
  meaningVi: z.string().min(1),
  meaningEn: z.string().optional(),
  nuanceTip: z.string().optional(),
  example: z.string().optional(),
  registerNote: z.string().optional(),
  exampleSource: z.enum(["book", "aris"]).optional(),
  ieltsUse: z.enum(["productive", "receptive"]).optional(),
  usageFlag: z.enum(["informal", "uk-only", "sensitive"]).optional(),
});

const syncBookmarksSchema = z.object({
  bookmarks: z.array(bookmarkItemSchema).max(500),
});

const reviewSubmitSchema = z.object({
  bookmarkId: z.string().uuid(),
  isCorrect: z.boolean(),
  latencyMs: z.number().optional(),
});

const vocabInUseRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * 1. GET /api/v1/vocab-in-use/bookmarks
   * Lấy danh sách từ đã lưu trong Sổ từ VIU của học viên
   */
  fastify.get(
    "/bookmarks",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const query = request.query as any;
      const unitId = query?.unitId ? Number(query.unitId) : undefined;

      const items = await fastify.prisma.vocabInUseBookmark.findMany({
        where: {
          userId,
          ...(unitId ? { unitId } : {}),
        },
        orderBy: { updatedAt: "desc" },
      });

      return reply.send({
        status: "success",
        data: {
          items,
          count: items.length,
        },
      });
    }
  );

  /**
   * 2. POST /api/v1/vocab-in-use/bookmarks/sync
   * Đồng bộ và gộp Sổ từ từ thiết bị khách lên tài khoản
   * Đảm bảo tính Idempotent: tuyệt đối không ghi đè tiến độ review nếu từ đã tồn tại trên server.
   */
  fastify.post(
    "/bookmarks/sync",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parseResult = syncBookmarksSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          status: "error",
          message: "Dữ liệu bookmark không hợp lệ",
          errors: parseResult.error.flatten(),
        });
      }

      const { bookmarks } = parseResult.data;

      await fastify.prisma.$transaction(async (tx) => {
        for (const item of bookmarks) {
          const existing = await tx.vocabInUseBookmark.findUnique({
            where: {
              userId_unitId_lexiconId: {
                userId,
                unitId: item.unitId,
                lexiconId: item.lexiconId,
              },
            },
          });

          if (!existing) {
            // Tạo mới từ local vào server
            await tx.vocabInUseBookmark.create({
              data: {
                userId,
                unitId: item.unitId,
                lexiconId: item.lexiconId,
                word: item.word,
                ipa: item.ipa,
                pos: item.pos,
                meaningVi: item.meaningVi,
                meaningEn: item.meaningEn,
                nuanceTip: item.nuanceTip,
                example: item.example,
                registerNote: item.registerNote,
                exampleSource: item.exampleSource,
                ieltsUse: item.ieltsUse,
                usageFlag: item.usageFlag,
                masteryState: 0,
                masteryScore: 0.1,
                intervalDays: 1,
                easeFactor: 2.5,
                nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                totalReviews: 0,
                failedReviews: 0,
                history: [],
              },
            });
          } else {
            // Từ đã có trên server: giữ nguyên 100% tiến độ review, chỉ cập nhật snapshot thông tin nếu có
            await tx.vocabInUseBookmark.update({
              where: { id: existing.id },
              data: {
                word: item.word,
                ipa: item.ipa ?? existing.ipa,
                pos: item.pos ?? existing.pos,
                meaningVi: item.meaningVi ?? existing.meaningVi,
                meaningEn: item.meaningEn ?? existing.meaningEn,
                nuanceTip: item.nuanceTip ?? existing.nuanceTip,
                example: item.example ?? existing.example,
                registerNote: item.registerNote ?? existing.registerNote,
                exampleSource: item.exampleSource ?? existing.exampleSource,
                ieltsUse: item.ieltsUse ?? existing.ieltsUse,
                usageFlag: item.usageFlag ?? existing.usageFlag,
              },
            });
          }
        }
      });

      // Lấy toàn bộ danh sách hợp nhất (merged state)
      const allBookmarks = await fastify.prisma.vocabInUseBookmark.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });

      return reply.send({
        status: "success",
        message: "Đồng bộ Sổ từ thành công",
        data: {
          items: allBookmarks,
          count: allBookmarks.length,
        },
      });
    }
  );

  /**
   * 3. POST /api/v1/vocab-in-use/bookmarks/toggle
   * Bật/tắt lưu từ đơn lẻ khi đang học trên web
   */
  fastify.post(
    "/bookmarks/toggle",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parseResult = bookmarkItemSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          status: "error",
          message: "Dữ liệu từ vựng không hợp lệ",
          errors: parseResult.error.flatten(),
        });
      }

      const item = parseResult.data;

      const existing = await fastify.prisma.vocabInUseBookmark.findUnique({
        where: {
          userId_unitId_lexiconId: {
            userId,
            unitId: item.unitId,
            lexiconId: item.lexiconId,
          },
        },
      });

      if (existing) {
        await fastify.prisma.vocabInUseBookmark.delete({
          where: { id: existing.id },
        });

        return reply.send({
          status: "success",
          action: "removed",
          data: {
            unitId: item.unitId,
            lexiconId: item.lexiconId,
          },
        });
      }

      const created = await fastify.prisma.vocabInUseBookmark.create({
        data: {
          userId,
          unitId: item.unitId,
          lexiconId: item.lexiconId,
          word: item.word,
          ipa: item.ipa,
          pos: item.pos,
          meaningVi: item.meaningVi,
          meaningEn: item.meaningEn,
          nuanceTip: item.nuanceTip,
          example: item.example,
          registerNote: item.registerNote,
          exampleSource: item.exampleSource,
          ieltsUse: item.ieltsUse,
          usageFlag: item.usageFlag,
          masteryState: 0,
          masteryScore: 0.1,
          intervalDays: 1,
          easeFactor: 2.5,
          nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          totalReviews: 0,
          failedReviews: 0,
          history: [],
        },
      });

      return reply.send({
        status: "success",
        action: "added",
        data: created,
      });
    }
  );

  /**
   * 4. GET /api/v1/vocab-in-use/due-review
   * Lấy danh sách từ đến hạn ôn tập theo thuật toán Spaced Repetition SM-2
   */
  fastify.get(
    "/due-review",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const dueWords = await fastify.prisma.vocabInUseBookmark.findMany({
        where: {
          userId,
          nextReviewAt: {
            lte: new Date(),
          },
        },
        orderBy: [
          { failedReviews: "desc" },
          { nextReviewAt: "asc" },
        ],
        take: 10,
      });

      return reply.send({
        status: "success",
        data: {
          count: dueWords.length,
          items: dueWords,
        },
      });
    }
  );

  /**
   * 5. POST /api/v1/vocab-in-use/review
   * Ghi nhận kết quả ôn tập flashcard / quiz (Chuẩn thuật toán SM-2)
   */
  fastify.post(
    "/review",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parseResult = reviewSubmitSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          status: "error",
          message: "Dữ liệu ôn tập không hợp lệ",
          errors: parseResult.error.flatten(),
        });
      }

      const body = parseResult.data;

      const record = await fastify.prisma.vocabInUseBookmark.findFirst({
        where: { id: body.bookmarkId, userId },
      });

      if (!record) {
        return reply.status(404).send({
          status: "error",
          message: "Không tìm thấy bản ghi từ vựng cần ôn tập",
        });
      }

      let interval = record.intervalDays;
      let ease = record.easeFactor;
      let masteryState = record.masteryState;
      let masteryScore = record.masteryScore;

      if (body.isCorrect) {
        // Đúng: Giãn cách chu kỳ SM-2 (1 -> 3 -> 7 -> 14 -> interval * ease)
        if (interval === 1) interval = 3;
        else if (interval === 3) interval = 7;
        else if (interval === 7) interval = 14;
        else interval = Math.round(interval * ease);

        masteryScore = Math.round(Math.min(1.0, masteryScore + 0.25) * 100) / 100;
        if (masteryScore >= 0.9) masteryState = 3; // MASTERED
        else if (masteryScore >= 0.6) masteryState = 2; // CONSOLIDATING
        else masteryState = 1; // LEARNING
      } else {
        // Sai: Reset chu kỳ về 1 ngày, giảm ease factor và mastery score
        interval = 1;
        ease = Math.round(Math.max(1.3, ease - 0.2) * 100) / 100;
        masteryScore = Math.round(Math.max(0.1, masteryScore - 0.2) * 100) / 100;
        masteryState = 1; // LEARNING
      }

      const nextReviewAt = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

      const currentHistory = Array.isArray(record.history) ? record.history : [];
      const newHistoryEntry = {
        date: new Date().toISOString(),
        result: body.isCorrect ? "PASS" : "FAIL",
        latencyMs: body.latencyMs || null,
      };

      const updated = await fastify.prisma.vocabInUseBookmark.update({
        where: { id: record.id },
        data: {
          intervalDays: interval,
          easeFactor: ease,
          masteryState,
          masteryScore,
          nextReviewAt,
          totalReviews: record.totalReviews + 1,
          failedReviews: body.isCorrect ? record.failedReviews : record.failedReviews + 1,
          history: [...currentHistory, newHistoryEntry],
        },
      });

      return reply.send({
        status: "success",
        data: updated,
      });
    }
  );
};

export default vocabInUseRoutes;
