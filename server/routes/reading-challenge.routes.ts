import { FastifyPluginAsync } from "fastify";
import { z } from "zod";

const unitProgressPayloadSchema = z.object({
  unitNumber: z.number().int().min(1).max(20),
  currentStepIndex: z.number().int().min(0).max(9).default(0),
  completedSteps: z.array(z.string()).default([]),
  stepAnswers: z.record(z.any()).default({}),
  readingWpm: z.number().int().positive().nullable().optional(),
  readingSeconds: z.number().int().nonnegative().nullable().optional(),
  scores: z.record(z.number()).default({}),
  writingDraft: z.string().nullable().optional(),
  isUnitCompleted: z.boolean().default(false),
  lastPracticedAt: z.string().optional(),
});

const batchSyncSchema = z.object({
  units: z.array(unitProgressPayloadSchema).max(50),
});

export function mergeStepAnswers(existing: Record<string, any>, incoming: Record<string, any>): Record<string, any> {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    if (value !== undefined && value !== null) {
      if (typeof value === "object" && !Array.isArray(value)) {
        merged[key] = { ...(merged[key] || {}), ...value };
      } else {
        merged[key] = value;
      }
    }
  }
  return merged;
}

export function mergeScores(existing: Record<string, number>, incoming: Record<string, number>): Record<string, number> {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    if (typeof value === "number") {
      merged[key] = Math.max(merged[key] ?? 0, value);
    }
  }
  return merged;
}

export function mergeCompletedSteps(existing: string[], incoming: string[]): string[] {
  return Array.from(new Set([...existing, ...incoming]));
}

const readingChallengeRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * 1. GET /api/v1/reading-challenge/progress
   * Fetch all unit progress records and summary for the authenticated user.
   */
  fastify.get(
    "/progress",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const units = await fastify.prisma.readingChallengeUnitProgress.findMany({
        where: { userId },
        orderBy: { unitNumber: "asc" },
      });

      const completedUnitsCount = units.filter((u) => u.isUnitCompleted).length;
      const startedUnitsCount = units.length;
      
      const wpmRecords = units.map((u) => u.readingWpm).filter((w): w is number => typeof w === "number" && w > 0);
      const averageWpm = wpmRecords.length > 0
        ? Math.round(wpmRecords.reduce((acc, curr) => acc + curr, 0) / wpmRecords.length)
        : null;

      return reply.send({
        status: "success",
        data: {
          units,
          summary: {
            startedUnitsCount,
            completedUnitsCount,
            averageWpm,
            totalUnits: 20,
          },
        },
      });
    }
  );

  /**
   * 2. GET /api/v1/reading-challenge/progress/:unitNumber
   * Fetch single unit progress for the authenticated user.
   */
  fastify.get(
    "/progress/:unitNumber",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const { unitNumber } = request.params as { unitNumber: string };
      const parsedUnitNumber = parseInt(unitNumber, 10);

      if (isNaN(parsedUnitNumber) || parsedUnitNumber < 1 || parsedUnitNumber > 20) {
        return reply.status(400).send({
          status: "error",
          message: "Unit number không hợp lệ (1-20)",
        });
      }

      const progress = await fastify.prisma.readingChallengeUnitProgress.findUnique({
        where: {
          userId_unitNumber: {
            userId,
            unitNumber: parsedUnitNumber,
          },
        },
      });

      return reply.send({
        status: "success",
        data: progress,
      });
    }
  );

  /**
   * 3. POST /api/v1/reading-challenge/progress/:unitNumber
   * Upsert single unit progress non-destructively.
   */
  fastify.post(
    "/progress/:unitNumber",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;
      const { unitNumber } = request.params as { unitNumber: string };
      const parsedUnitNumber = parseInt(unitNumber, 10);

      if (isNaN(parsedUnitNumber) || parsedUnitNumber < 1 || parsedUnitNumber > 20) {
        return reply.status(400).send({
          status: "error",
          message: "Unit number không hợp lệ (1-20)",
        });
      }

      const parsed = unitProgressPayloadSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          error: "VALIDATION_ERROR",
          message: "Dữ liệu tiến độ không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const payload = parsed.data;
      const now = new Date();

      const existing = await fastify.prisma.readingChallengeUnitProgress.findUnique({
        where: {
          userId_unitNumber: {
            userId,
            unitNumber: parsedUnitNumber,
          },
        },
      });

      const existingCompletedSteps = (existing?.completedSteps as string[]) || [];
      const existingStepAnswers = (existing?.stepAnswers as Record<string, any>) || {};
      const existingScores = (existing?.scores as Record<string, number>) || {};

      const mergedCompletedSteps = mergeCompletedSteps(existingCompletedSteps, payload.completedSteps);
      const mergedStepAnswers = mergeStepAnswers(existingStepAnswers, payload.stepAnswers);
      const mergedScores = mergeScores(existingScores, payload.scores);

      const isCompleted = existing?.isUnitCompleted || payload.isUnitCompleted || mergedCompletedSteps.length >= 10;
      const completedAt = isCompleted
        ? existing?.completedAt || now
        : null;

      const record = await fastify.prisma.readingChallengeUnitProgress.upsert({
        where: {
          userId_unitNumber: {
            userId,
            unitNumber: parsedUnitNumber,
          },
        },
        create: {
          userId,
          unitNumber: parsedUnitNumber,
          currentStepIndex: payload.currentStepIndex,
          completedSteps: mergedCompletedSteps,
          stepAnswers: mergedStepAnswers,
          readingWpm: payload.readingWpm ?? null,
          readingSeconds: payload.readingSeconds ?? null,
          scores: mergedScores,
          writingDraft: payload.writingDraft ?? null,
          isUnitCompleted: isCompleted,
          completedAt,
          lastPracticedAt: now,
        },
        update: {
          currentStepIndex: payload.currentStepIndex,
          completedSteps: mergedCompletedSteps,
          stepAnswers: mergedStepAnswers,
          readingWpm: payload.readingWpm ?? existing?.readingWpm ?? null,
          readingSeconds: payload.readingSeconds ?? existing?.readingSeconds ?? null,
          scores: mergedScores,
          writingDraft: payload.writingDraft ?? existing?.writingDraft ?? null,
          isUnitCompleted: isCompleted,
          completedAt,
          lastPracticedAt: now,
        },
      });

      return reply.send({
        status: "success",
        data: record,
      });
    }
  );

  /**
   * 4. POST /api/v1/reading-challenge/sync
   * Reconcile & batch-migrate guest localStorage units to user account on login.
   */
  fastify.post(
    "/sync",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user.userId || user.id;

      const parsed = batchSyncSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          status: "error",
          error: "VALIDATION_ERROR",
          message: "Dữ liệu đồng bộ không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const { units } = parsed.data;
      const now = new Date();

      await fastify.prisma.$transaction(async (tx) => {
        for (const item of units) {
          const existing = await tx.readingChallengeUnitProgress.findUnique({
            where: {
              userId_unitNumber: {
                userId,
                unitNumber: item.unitNumber,
              },
            },
          });

          const existingCompletedSteps = (existing?.completedSteps as string[]) || [];
          const existingStepAnswers = (existing?.stepAnswers as Record<string, any>) || {};
          const existingScores = (existing?.scores as Record<string, number>) || {};

          const mergedCompletedSteps = mergeCompletedSteps(existingCompletedSteps, item.completedSteps);
          const mergedStepAnswers = mergeStepAnswers(existingStepAnswers, item.stepAnswers);
          const mergedScores = mergeScores(existingScores, item.scores);

          const isCompleted = existing?.isUnitCompleted || item.isUnitCompleted || mergedCompletedSteps.length >= 10;
          const completedAt = isCompleted ? (existing?.completedAt || now) : null;

          await tx.readingChallengeUnitProgress.upsert({
            where: {
              userId_unitNumber: {
                userId,
                unitNumber: item.unitNumber,
              },
            },
            create: {
              userId,
              unitNumber: item.unitNumber,
              currentStepIndex: item.currentStepIndex,
              completedSteps: mergedCompletedSteps,
              stepAnswers: mergedStepAnswers,
              readingWpm: item.readingWpm ?? null,
              readingSeconds: item.readingSeconds ?? null,
              scores: mergedScores,
              writingDraft: item.writingDraft ?? null,
              isUnitCompleted: isCompleted,
              completedAt,
              lastPracticedAt: now,
            },
            update: {
              currentStepIndex: Math.max(existing?.currentStepIndex ?? 0, item.currentStepIndex),
              completedSteps: mergedCompletedSteps,
              stepAnswers: mergedStepAnswers,
              readingWpm: item.readingWpm ?? existing?.readingWpm ?? null,
              readingSeconds: item.readingSeconds ?? existing?.readingSeconds ?? null,
              scores: mergedScores,
              writingDraft: item.writingDraft || existing?.writingDraft || null,
              isUnitCompleted: isCompleted,
              completedAt,
              lastPracticedAt: now,
            },
          });
        }
      });

      // Fetch all refreshed units
      const allUnits = await fastify.prisma.readingChallengeUnitProgress.findMany({
        where: { userId },
        orderBy: { unitNumber: "asc" },
      });

      const completedUnitsCount = allUnits.filter((u) => u.isUnitCompleted).length;
      const startedUnitsCount = allUnits.length;
      const wpmRecords = allUnits.map((u) => u.readingWpm).filter((w): w is number => typeof w === "number" && w > 0);
      const averageWpm = wpmRecords.length > 0
        ? Math.round(wpmRecords.reduce((acc, curr) => acc + curr, 0) / wpmRecords.length)
        : null;

      return reply.send({
        status: "success",
        data: {
          units: allUnits,
          summary: {
            startedUnitsCount,
            completedUnitsCount,
            averageWpm,
            totalUnits: 20,
          },
        },
      });
    }
  );
};

export default readingChallengeRoutes;
