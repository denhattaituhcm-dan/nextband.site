import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { SeasonalService } from "../services/seasonal.service.js";

export default async function seasonalRoutes(fastify: FastifyInstance) {
  const service = new SeasonalService(fastify.prisma);

  // 1. GET /api/v1/seasonal/active - Get current active seasonal event
  fastify.get("/active", async (request, reply) => {
    try {
      const activeEvent = await service.getActiveEvent();
      return reply.send({
        success: true,
        isActive: !!activeEvent,
        event: activeEvent,
      });
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 2. GET /api/v1/seasonal/my-progress - Get current student's seasonal progress
  fastify.get("/my-progress", { preHandler: authenticate }, async (request: any, reply) => {
    try {
      const studentId = request.user.id;
      const progress = await service.getStudentProgress(studentId);
      return reply.send({
        success: true,
        progress,
      });
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 3. POST /api/v1/seasonal/claim - Claim a reward for a completed homework
  fastify.post<{ Body: { homeworkId: string } }>(
    "/claim",
    { preHandler: authenticate },
    async (request: any, reply) => {
      try {
        const studentId = request.user.id;
        const { homeworkId } = request.body || {};
        if (!homeworkId) {
          return reply.status(400).send({ error: "homeworkId là bắt buộc" });
        }

        const result = await service.claimReward(studentId, homeworkId);
        return reply.status(result.isFirstClaim ? 201 : 200).send({
          success: true,
          ...result,
        });
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    }
  );

  // 4. GET /api/v1/seasonal/admin/events - Admin: list all seasonal events
  fastify.get(
    "/admin/events",
    { preHandler: [authenticate, requireRoles("admin", "superadmin")] },
    async (request, reply) => {
      try {
        const events = await service.getAdminEvents();
        return reply.send({
          success: true,
          events,
        });
      } catch (err: any) {
        return reply.status(500).send({ error: err.message });
      }
    }
  );

  // 5. PUT /api/v1/seasonal/admin/events/:id - Admin: update event settings & toggles
  fastify.put<{
    Params: { id: string };
    Body: {
      isActive?: boolean;
      startAt?: string | null;
      endAt?: string | null;
      budgetCap?: number;
      totalSlots?: number;
      uiConfig?: any;
    };
  }>(
    "/admin/events/:id",
    { preHandler: [authenticate, requireRoles("admin", "superadmin")] },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const updated = await service.updateEvent(id, request.body);
        return reply.send({
          success: true,
          event: updated,
        });
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    }
  );
}
