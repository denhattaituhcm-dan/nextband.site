import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { calculateSm2Transition } from "../services/srs/sm2Calculator";
import { reconcileStageAttempt } from "../services/essentialVocab/progressReconciler";

const bookIdSchema = z.enum(["evc-1", "evc-2", "evc-3", "evc-4", "evc-5", "evc-6"]);

const bookmarkToggleSchema = z.object({
  bookId: bookIdSchema.default("evc-5"),
  unitId: z.string().min(1).max(32),
  entryId: z.string().min(1).max(64),
  senseNumber: z.number().int().min(1).max(10).default(1),
  headword: z.string().min(1).max(120),
  pos: z.string().min(1).max(64),
  ipa: z.string().max(120).optional(),
  meaningVi: z.string().min(1),
  definitionEn: z.string().min(1),
  exampleEn: z.string().min(1),
  inflectionsText: z.string().optional(),
  sourceContext: z
    .enum(["glossary", "stage_1", "stage_2", "stage_3", "stage_4"])
    .default("glossary"),
});

const reviewSubmitSchema = z.object({
  rating: z.enum(["AGAIN", "HARD", "GOOD", "EASY"]).optional(),
  isCorrect: z.boolean().optional(),
  latencyMs: z.number().int().nonnegative().optional(),
});

const submitAttemptSchema = z.object({
  bookId: bookIdSchema.default("evc-5"),
  unitId: z.string().min(1).max(32),
  contentVersion: z.number().int().min(1).default(1),
  stage: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  mode: z.enum(["assisted", "hard"]).default("assisted"),
  score: z.number().int().min(0).max(50),
  maxScore: z.number().int().min(1).max(50),
  stageMaxScores: z
    .object({
      stage1: z.number().int().min(1).max(20).default(10),
      stage2: z.number().int().min(1).max(20).default(5),
      stage3: z.number().int().min(1).max(20).default(5),
      stage4: z.number().int().min(1).max(20).default(10),
    })
    .default({ stage1: 10, stage2: 5, stage3: 5, stage4: 10 }),
  durationSec: z.number().int().min(0).default(0),
  clientAttemptKey: z.string().min(4).max(128).optional(),
  answersSnapshot: z
    .array(
      z.object({
        itemId: z.string().min(1),
        submittedValue: z.union([z.string(), z.number()]),
        isCorrect: z.boolean(),
        matchTier: z.string().optional(),
        canonicalAnswer: z.string(),
      })
    )
    .default([]),
  wrongEntryIds: z.array(z.string()).default([]),
});

const syncGuestDataSchema = z.object({
  bookmarks: z.array(bookmarkToggleSchema).max(500).default([]),
  attempts: z.array(submitAttemptSchema).max(200).default([]),
});

const essentialVocabularyRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * 1. GET /api/v1/essential-vocabulary/progress
   * Fetch all unit progress records and book summary for the authenticated user.
   */
  fastify.get(
    "/progress",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const query = request.query as { bookId?: string };
      const bookId = query?.bookId || "evc-5";

      const units = await fastify.prisma.essentialVocabUnitProgress.findMany({
        where: { userId, bookId },
        orderBy: { updatedAt: "desc" },
      });

      const recentAttempts = await fastify.prisma.essentialVocabAttempt.findMany({
        where: { userId, bookId },
        orderBy: { submittedAt: "desc" },
        take: 25,
      });

      const completedUnitsCount = units.filter(
        (u) => (u.completedStagesMask & 15) === 15
      ).length;
      const startedUnitsCount = units.length;
      const totalBestScore = units.reduce((acc, u) => acc + u.bestTotalScore, 0);
      const totalMaxPossible = units.reduce((acc, u) => acc + u.totalMaxScore, 0);
      const overallBestAccuracyPct =
        totalMaxPossible > 0
          ? Math.round((totalBestScore / totalMaxPossible) * 1000) / 10
          : 0;

      return reply.send({
        status: "success",
        data: {
          units,
          recentAttempts,
          summary: {
            bookId,
            startedUnitsCount,
            completedUnitsCount,
            totalBestScore,
            totalMaxPossible,
            overallBestAccuracyPct,
          },
        },
      });
    }
  );

  /**
   * 2. GET /api/v1/essential-vocabulary/progress/:unitId
   * Fetch detailed progress and attempt history for a specific unit.
   */
  fastify.get(
    "/progress/:unitId",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const { unitId } = request.params as { unitId: string };
      const query = request.query as { limit?: string };
      const limit = Math.min(50, Math.max(1, Number(query?.limit) || 20));

      const progress = await fastify.prisma.essentialVocabUnitProgress.findUnique({
        where: {
          userId_unitId: { userId, unitId },
        },
      });

      const attempts = await fastify.prisma.essentialVocabAttempt.findMany({
        where: { userId, unitId },
        orderBy: { submittedAt: "desc" },
        take: limit,
      });

      return reply.send({
        status: "success",
        data: {
          progress,
          attempts,
        },
      });
    }
  );

  /**
   * 3. POST /api/v1/essential-vocabulary/attempts
   * Record a Stage 1-4 attempt and update best vs. latest unit scores non-destructively.
   */
  fastify.post(
    "/attempts",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parsed = submitAttemptSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          error: "VALIDATION_ERROR",
          message: "Dữ liệu nộp bài không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const payload = parsed.data;

      // Idempotency guard if clientAttemptKey was already recorded
      if (payload.clientAttemptKey) {
        const existingAttempt =
          await fastify.prisma.essentialVocabAttempt.findUnique({
            where: { clientAttemptKey: payload.clientAttemptKey },
            include: { progress: true },
          });

        if (existingAttempt && existingAttempt.userId === userId) {
          return reply.send({
            status: "success",
            data: {
              progress: existingAttempt.progress,
              attempt: existingAttempt,
              deduplicated: true,
            },
          });
        }
      }

      const result = await fastify.prisma.$transaction(async (tx) => {
        const existingProgress =
          await tx.essentialVocabUnitProgress.findUnique({
            where: {
              userId_unitId: { userId, unitId: payload.unitId },
            },
          });

        const reconciled = reconcileStageAttempt(existingProgress, {
          stage: payload.stage,
          score: payload.score,
          maxScore: payload.maxScore,
          contentVersion: payload.contentVersion,
          stageMaxScores: {
            stage1: payload.stageMaxScores?.stage1 ?? 10,
            stage2: payload.stageMaxScores?.stage2 ?? 5,
            stage3: payload.stageMaxScores?.stage3 ?? 5,
            stage4: payload.stageMaxScores?.stage4 ?? 10,
          },
        });

        const progress = existingProgress
          ? await tx.essentialVocabUnitProgress.update({
              where: { id: existingProgress.id },
              data: reconciled,
            })
          : await tx.essentialVocabUnitProgress.create({
              data: {
                userId,
                bookId: payload.bookId,
                unitId: payload.unitId,
                ...reconciled,
              },
            });

        const accuracyPct =
          payload.maxScore > 0
            ? Math.round((payload.score / payload.maxScore) * 1000) / 10
            : 0;

        const attempt = await tx.essentialVocabAttempt.create({
          data: {
            progressId: progress.id,
            userId,
            bookId: payload.bookId,
            unitId: payload.unitId,
            contentVersion: payload.contentVersion,
            stage: payload.stage,
            mode: payload.mode,
            score: payload.score,
            maxScore: payload.maxScore,
            accuracyPct,
            durationSec: payload.durationSec,
            answersSnapshot: payload.answersSnapshot as any,
            wrongEntryIds: payload.wrongEntryIds as any,
            clientAttemptKey: payload.clientAttemptKey,
          },
        });

        return { progress, attempt };
      });

      return reply.send({
        status: "success",
        data: result,
      });
    }
  );

  /**
   * 4. GET /api/v1/essential-vocabulary/bookmarks
   * List EVC bookmarks and SM-2 state for the authenticated user.
   */
  fastify.get(
    "/bookmarks",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const query = request.query as {
        bookId?: string;
        unitId?: string;
        dueOnly?: string;
      };

      const items = await fastify.prisma.essentialVocabBookmark.findMany({
        where: {
          userId,
          ...(query?.bookId ? { bookId: query.bookId } : {}),
          ...(query?.unitId ? { unitId: query.unitId } : {}),
          ...(query?.dueOnly === "true"
            ? { nextReviewAt: { lte: new Date() } }
            : {}),
        },
        orderBy: [{ nextReviewAt: "asc" }, { updatedAt: "desc" }],
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
   * 5. POST /api/v1/essential-vocabulary/bookmarks/toggle
   * Toggle a vocabulary sense bookmark for SM-2 review.
   */
  fastify.post(
    "/bookmarks/toggle",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parsed = bookmarkToggleSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          error: "VALIDATION_ERROR",
          message: "Dữ liệu từ vựng không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const item = parsed.data;

      const existing =
        await fastify.prisma.essentialVocabBookmark.findUnique({
          where: {
            userId_unitId_entryId_senseNumber: {
              userId,
              unitId: item.unitId,
              entryId: item.entryId,
              senseNumber: item.senseNumber,
            },
          },
        });

      if (existing) {
        await fastify.prisma.essentialVocabBookmark.delete({
          where: { id: existing.id },
        });

        return reply.send({
          status: "success",
          action: "removed",
          data: {
            id: existing.id,
            unitId: item.unitId,
            entryId: item.entryId,
            senseNumber: item.senseNumber,
          },
        });
      }

      const created = await fastify.prisma.essentialVocabBookmark.create({
        data: {
          userId,
          bookId: item.bookId,
          unitId: item.unitId,
          entryId: item.entryId,
          senseNumber: item.senseNumber,
          headword: item.headword,
          pos: item.pos,
          ipa: item.ipa,
          meaningVi: item.meaningVi,
          definitionEn: item.definitionEn,
          exampleEn: item.exampleEn,
          inflectionsText: item.inflectionsText,
          sourceContext: item.sourceContext,
          masteryState: 0,
          masteryScore: 0.1,
          intervalDays: 1,
          easeFactor: 2.5,
          nextReviewAt: new Date(),
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
   * 6. POST /api/v1/essential-vocabulary/bookmarks/:id/review
   * Submit SM-2 spaced repetition review rating (AGAIN | HARD | GOOD | EASY).
   */
  fastify.post(
    "/bookmarks/:id/review",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const { id } = request.params as { id: string };

      const parsed = reviewSubmitSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          error: "VALIDATION_ERROR",
          message: "Dữ liệu ôn tập không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const record = await fastify.prisma.essentialVocabBookmark.findFirst({
        where: { id, userId },
      });

      if (!record) {
        return reply.status(404).send({
          status: "error",
          message: "Không tìm thấy từ vựng cần ôn tập",
        });
      }

      const nextSm2 = calculateSm2Transition(
        {
          intervalDays: record.intervalDays,
          easeFactor: record.easeFactor,
          masteryState: record.masteryState,
          masteryScore: record.masteryScore,
          totalReviews: record.totalReviews,
          failedReviews: record.failedReviews,
          history: record.history,
        },
        {
          rating: parsed.data.rating,
          isCorrect: parsed.data.isCorrect,
          latencyMs: parsed.data.latencyMs,
        }
      );

      const updated = await fastify.prisma.essentialVocabBookmark.update({
        where: { id: record.id },
        data: {
          intervalDays: nextSm2.intervalDays,
          easeFactor: nextSm2.easeFactor,
          masteryState: nextSm2.masteryState,
          masteryScore: nextSm2.masteryScore,
          nextReviewAt: nextSm2.nextReviewAt,
          totalReviews: nextSm2.totalReviews,
          failedReviews: nextSm2.failedReviews,
          history: nextSm2.history as any,
        },
      });

      return reply.send({
        status: "success",
        data: updated,
      });
    }
  );

  /**
   * 7. POST /api/v1/essential-vocabulary/sync
   * Idempotent migration of guest localStorage bookmarks & attempts on login.
   */
  fastify.post(
    "/sync",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parsed = syncGuestDataSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          error: "VALIDATION_ERROR",
          message: "Dữ liệu đồng bộ không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const { bookmarks, attempts } = parsed.data;
      let syncedBookmarks = 0;
      let syncedAttempts = 0;

      await fastify.prisma.$transaction(async (tx) => {
        for (const item of bookmarks) {
          const existing = await tx.essentialVocabBookmark.findUnique({
            where: {
              userId_unitId_entryId_senseNumber: {
                userId,
                unitId: item.unitId,
                entryId: item.entryId,
                senseNumber: item.senseNumber,
              },
            },
          });

          if (!existing) {
            await tx.essentialVocabBookmark.create({
              data: {
                userId,
                bookId: item.bookId,
                unitId: item.unitId,
                entryId: item.entryId,
                senseNumber: item.senseNumber,
                headword: item.headword,
                pos: item.pos,
                ipa: item.ipa,
                meaningVi: item.meaningVi,
                definitionEn: item.definitionEn,
                exampleEn: item.exampleEn,
                inflectionsText: item.inflectionsText,
                sourceContext: item.sourceContext,
                masteryState: 0,
                masteryScore: 0.1,
                intervalDays: 1,
                easeFactor: 2.5,
                nextReviewAt: new Date(),
                totalReviews: 0,
                failedReviews: 0,
                history: [],
              },
            });
            syncedBookmarks++;
          }
        }

        for (const att of attempts) {
          if (att.clientAttemptKey) {
            const dup = await tx.essentialVocabAttempt.findUnique({
              where: { clientAttemptKey: att.clientAttemptKey },
            });
            if (dup) continue;
          }

          const existingProgress =
            await tx.essentialVocabUnitProgress.findUnique({
              where: {
                userId_unitId: { userId, unitId: att.unitId },
              },
            });

          const reconciled = reconcileStageAttempt(existingProgress, {
            stage: att.stage,
            score: att.score,
            maxScore: att.maxScore,
            contentVersion: att.contentVersion,
            stageMaxScores: {
              stage1: att.stageMaxScores?.stage1 ?? 10,
              stage2: att.stageMaxScores?.stage2 ?? 5,
              stage3: att.stageMaxScores?.stage3 ?? 5,
              stage4: att.stageMaxScores?.stage4 ?? 10,
            },
          });

          const progress = existingProgress
            ? await tx.essentialVocabUnitProgress.update({
                where: { id: existingProgress.id },
                data: reconciled,
              })
            : await tx.essentialVocabUnitProgress.create({
                data: {
                  userId,
                  bookId: att.bookId,
                  unitId: att.unitId,
                  ...reconciled,
                },
              });

          const accuracyPct =
            att.maxScore > 0
              ? Math.round((att.score / att.maxScore) * 1000) / 10
              : 0;

          await tx.essentialVocabAttempt.create({
            data: {
              progressId: progress.id,
              userId,
              bookId: att.bookId,
              unitId: att.unitId,
              contentVersion: att.contentVersion,
              stage: att.stage,
              mode: att.mode,
              score: att.score,
              maxScore: att.maxScore,
              accuracyPct,
              durationSec: att.durationSec,
              answersSnapshot: att.answersSnapshot as any,
              wrongEntryIds: att.wrongEntryIds as any,
              clientAttemptKey: att.clientAttemptKey,
            },
          });
          syncedAttempts++;
        }
      });

      return reply.send({
        status: "success",
        data: {
          syncedBookmarks,
          syncedAttempts,
        },
      });
    }
  );
};

export default essentialVocabularyRoutes;
