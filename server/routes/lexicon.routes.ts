import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { CognitiveLexiconService } from "../services/cognitive-lexicon.service.js";

const lookupQuerySchema = z.object({
  word: z.string().min(1).max(50),
  context: z.string().optional(),
});

const saveWordSchema = z.object({
  wordId: z.string().uuid().optional(),
  word: z.string().min(1).max(50),
  sourceContext: z.string().min(1),
  sourceLessonId: z.string().optional(),
});

const reviewSubmitSchema = z.object({
  userVocabId: z.string().uuid(),
  isCorrect: z.boolean(),
  latencyMs: z.number().optional(),
});

const lexiconRoutes: FastifyPluginAsync = async (fastify) => {
  const service = new CognitiveLexiconService(fastify.prisma);

  /**
   * 1. Tra từ tại chỗ (In-situ 1-Click Lookup)
   * GET /api/v1/lexicon/lookup?word=alleviate&context=...
   */
  fastify.get("/lookup", async (request, reply) => {
    const parseResult = lookupQuerySchema.safeParse(request.query);
    if (!parseResult.success) {
      return reply.status(400).send({
        status: "error",
        message: "Invalid word query parameter",
        errors: parseResult.error.flatten(),
      });
    }

    try {
      const result = await service.lookupWord(
        parseResult.data.word,
        parseResult.data.context
      );
      return reply.send({
        status: "success",
        data: result,
      });
    } catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({
        status: "error",
        message: err.message || "Failed to lookup word",
      });
    }
  });

  /**
   * 2. Lưu từ vào Sổ từ cá nhân (My Lexicon)
   * POST /api/v1/lexicon/save
   * Yêu cầu xác thực học viên
   */
  fastify.post("/save", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as any;
    const body = saveWordSchema.parse(request.body);

    // Lấy hoặc tạo CognitiveWord
    let wordId = body.wordId;
    if (!wordId) {
      const cognitiveEntry = await service.lookupWord(body.word, body.sourceContext);
      wordId = cognitiveEntry.id;
    }

    if (!wordId) {
      return reply.status(400).send({
        status: "error",
        message: "Could not associate word record",
      });
    }

    // Upsert vào Sổ từ của học viên
    const saved = await fastify.prisma.userVocabulary.upsert({
      where: {
        userId_wordId: {
          userId: user.userId || user.id,
          wordId: wordId,
        },
      },
      create: {
        userId: user.userId || user.id,
        wordId: wordId,
        sourceContext: body.sourceContext,
        sourceLessonId: body.sourceLessonId,
        masteryState: 0, // Encountered
        masteryScore: 0.1,
        intervalDays: 1,
        easeFactor: 2.5,
        nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 ngày sau ôn lại
      },
      update: {
        sourceContext: body.sourceContext,
        sourceLessonId: body.sourceLessonId || undefined,
      },
      include: {
        word: true,
      },
    });

    return reply.send({
      status: "success",
      message: "Đã lưu vào Sổ từ",
      data: saved,
    });
  });

  /**
   * 3. Lấy danh sách từ cần ôn tập hôm nay (Smart Review: Spaced Repetition + Memory Risk)
   * GET /api/v1/lexicon/due-review
   */
  fastify.get("/due-review", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as any;
    const userId = user.userId || user.id;

    // Lấy tối đa 5 từ có nguy cơ quên cao nhất (ưu tiên từ đã quá hạn hoặc có tỷ lệ sai nhiều)
    const dueWords = await fastify.prisma.userVocabulary.findMany({
      where: {
        userId,
        nextReviewAt: {
          lte: new Date(),
        },
      },
      include: {
        word: true,
      },
      orderBy: [
        { failedReviews: "desc" },
        { nextReviewAt: "asc" },
      ],
      take: 5,
    });

    return reply.send({
      status: "success",
      data: {
        count: dueWords.length,
        items: dueWords,
      },
    });
  });

  /**
   * 4. Ghi nhận kết quả ôn tập (Cập nhật Spaced Repetition SM-2 & Memory Arc)
   * POST /api/v1/lexicon/review
   */
  fastify.post("/review", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as any;
    const userId = user.userId || user.id;
    const body = reviewSubmitSchema.parse(request.body);

    const record = await fastify.prisma.userVocabulary.findFirst({
      where: { id: body.userVocabId, userId },
      include: { word: true },
    });

    if (!record) {
      return reply.status(404).send({
        status: "error",
        message: "Vocabulary record not found",
      });
    }

    let interval = record.intervalDays;
    let ease = record.easeFactor;
    let masteryState = record.masteryState;
    let masteryScore = record.masteryScore;

    if (body.isCorrect) {
      // Ôn đúng: Giãn cách ngày ôn theo thuật toán SM-2
      if (interval === 1) interval = 3;
      else if (interval === 3) interval = 7;
      else if (interval === 7) interval = 14;
      else interval = Math.round(interval * ease);

      masteryScore = Math.min(1.0, masteryScore + 0.25);
      if (masteryScore >= 0.9) masteryState = 3; // MASTERED
      else if (masteryScore >= 0.6) masteryState = 2; // CONSOLIDATING
      else masteryState = 1; // LEARNING
    } else {
      // Ôn sai: Reset chu kỳ ôn về 1 ngày
      interval = 1;
      ease = Math.max(1.3, ease - 0.2);
      masteryScore = Math.max(0.1, masteryScore - 0.2);
      masteryState = 1; // Giáng cấp xuống LEARNING
    }

    const nextReviewAt = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    // Cập nhật History cho Memory Arc
    const currentHistory = Array.isArray(record.history) ? record.history : [];
    const newHistoryEntry = {
      date: new Date().toISOString(),
      result: body.isCorrect ? "PASS" : "FAIL",
      latencyMs: body.latencyMs || null,
    };

    const updated = await fastify.prisma.userVocabulary.update({
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
      include: {
        word: true,
      },
    });

    return reply.send({
      status: "success",
      data: updated,
    });
  });

  /**
   * 5. Danh sách Sổ từ cá nhân (My Lexicon)
   * GET /api/v1/lexicon/my-lexicon
   */
  fastify.get("/my-lexicon", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as any;
    const userId = user.userId || user.id;

    const list = await fastify.prisma.userVocabulary.findMany({
      where: { userId },
      include: { word: true },
      orderBy: { updatedAt: "desc" },
    });

    const stats = {
      total: list.length,
      learning: list.filter((i) => i.masteryState <= 1).length,
      consolidating: list.filter((i) => i.masteryState === 2).length,
      mastered: list.filter((i) => i.masteryState === 3).length,
    };

    return reply.send({
      status: "success",
      data: {
        stats,
        items: list,
      },
    });
  });
};

export default lexiconRoutes;
