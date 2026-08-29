import { FastifyPluginAsync } from "fastify";
import { SpeakingEvidenceController } from "../controllers/speaking-evidence.controller.js";
import { optionalAuthenticate, authenticate, requireRoles } from "../middlewares/auth.middleware.js";

const speakingEvidenceRoutes: FastifyPluginAsync = async (fastify) => {
  const controller = new SpeakingEvidenceController(fastify);

  /**
   * GET /speaking/evidence-tags
   * Returns candidate speaking evidence tags (Public / Authenticated)
   */
  fastify.get(
    "/evidence-tags",
    { preHandler: optionalAuthenticate },
    async (request, reply) => {
      return controller.listTags(request as any, reply);
    }
  );

  /**
   * GET /speaking/assessments/:id/evidence
   * Returns active evidence items attached to a speaking assessment
   */
  fastify.get(
    "/assessments/:id/evidence",
    { preHandler: authenticate },
    async (request, reply) => {
      return controller.getEvidenceByAssessment(request as any, reply);
    }
  );

  /**
   * POST /speaking/assessments/:id/evidence/sync
   * Batch synchronizes active evidence items (Teachers & Admins)
   */
  fastify.post(
    "/assessments/:id/evidence/sync",
    {
      preHandler: [
        authenticate,
        requireRoles("teacher", "admin", "super_admin", "staff"),
      ],
    },
    async (request, reply) => {
      return controller.syncEvidence(request as any, reply);
    }
  );
};

export default speakingEvidenceRoutes;
