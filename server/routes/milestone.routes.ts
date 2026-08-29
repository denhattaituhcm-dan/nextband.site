import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middleware.js";
import { MilestoneService } from "../services/milestone.service.js";

export default async function milestoneRoutes(fastify: FastifyInstance) {
  const service = new MilestoneService(fastify.prisma);

  // GET /api/v1/milestones/claims - Get student's claimed milestone keys
  fastify.get("/claims", { preHandler: authenticate }, async (request: any, reply) => {
    try {
      const studentId = request.user.id;
      const claimedKeys = await service.getStudentClaims(studentId);
      return reply.send({ success: true, data: claimedKeys, claimedKeys });
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // POST /api/v1/milestones/claim - Atomically claim a milestone
  fastify.post<{ Body: { milestoneKey: string } }>(
    "/claim",
    { preHandler: authenticate },
    async (request: any, reply) => {
      try {
        const studentId = request.user.id;
        const { milestoneKey } = request.body || {};
        if (!milestoneKey) {
          return reply.status(400).send({ error: "milestoneKey là bắt buộc" });
        }

        const result = await service.claimMilestone(studentId, milestoneKey);
        return reply.status(result.isFirstClaim ? 201 : 200).send({
          success: true,
          isFirstClaim: result.isFirstClaim,
          claim: result.claim,
        });
      } catch (err: any) {
        return reply.status(500).send({ error: err.message });
      }
    }
  );
}
