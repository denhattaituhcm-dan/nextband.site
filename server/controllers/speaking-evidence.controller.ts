import { FastifyRequest, FastifyReply } from "fastify";
import { SpeakingEvidenceRepository, SyncEvidenceItem } from "../repositories/speaking-evidence.repository.js";

export class SpeakingEvidenceController {
  private repository: SpeakingEvidenceRepository;

  constructor(fastify: any) {
    this.repository = new SpeakingEvidenceRepository(fastify.prisma);
  }

  /**
   * GET /speaking/evidence-tags
   * Returns all active candidate speaking tags, grouped by criterion
   */
  async listTags(request: FastifyRequest<{ Querystring: { criterion?: string } }>, reply: FastifyReply) {
    try {
      const { criterion } = request.query || {};
      const tags = await this.repository.listActiveTags(criterion);

      // Group by criterion for convenient frontend rendering
      const grouped = {
        pr: tags.filter((t) => t.criterion === "PR"),
        fc: tags.filter((t) => t.criterion === "FC"),
        lr: tags.filter((t) => t.criterion === "LR"),
        gra: tags.filter((t) => t.criterion === "GRA"),
      };

      return reply.send({
        success: true,
        tags,
        grouped,
        total: tags.length,
      });
    } catch (err: any) {
      request.log.error(err, "Failed to list speaking evidence tags");
      return reply.status(500).send({ error: err.message });
    }
  }

  /**
   * GET /speaking/assessments/:id/evidence
   * Returns active evidence items attached to a specific speaking assessment
   */
  async getEvidenceByAssessment(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const assessmentId = request.params.id;
      if (!assessmentId) {
        return reply.status(400).send({ error: "assessmentId là bắt buộc" });
      }

      const evidence = await this.repository.getEvidenceByAssessment(assessmentId);
      return reply.send({
        success: true,
        assessmentId,
        evidence,
        total: evidence.length,
      });
    } catch (err: any) {
      request.log.error(err, "Failed to get assessment evidence");
      return reply.status(500).send({ error: err.message });
    }
  }

  /**
   * POST /speaking/assessments/:id/evidence/sync
   * Batch synchronizes active evidence items for an assessment.
   * Soft-deletes unselected items and creates/restores selected items.
   */
  async syncEvidence(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { items: SyncEvidenceItem[] };
    }>,
    reply: FastifyReply
  ) {
    try {
      const assessmentId = request.params.id;
      const { items } = request.body || {};
      const user = (request as any).user;

      if (!assessmentId) {
        return reply.status(400).send({ error: "assessmentId là bắt buộc" });
      }

      if (!Array.isArray(items)) {
        return reply.status(400).send({ error: "items phải là một mảng evidence" });
      }

      const teacherId = user?.id || user?.userId || "system";

      const synced = await this.repository.batchSyncEvidence(
        assessmentId,
        items,
        teacherId
      );

      return reply.send({
        success: true,
        assessmentId,
        evidence: synced,
        total: synced.length,
      });
    } catch (err: any) {
      request.log.error(err, "Failed to sync assessment evidence");
      return reply.status(500).send({ error: err.message });
    }
  }
}
