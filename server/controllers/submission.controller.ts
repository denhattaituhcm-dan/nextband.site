import { FastifyRequest, FastifyReply } from "fastify";
import { ExamSubmissionService } from "../services/exam-submission.service.js";
import { handleValidation } from "../utils/validation.js";
import { paginationSchema } from "../schemas/common.schema.js";

export class SubmissionController {
  private service: ExamSubmissionService;

  constructor(fastify: any) {
    this.service = new ExamSubmissionService(fastify.prisma);
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const dataQuery = handleValidation(
      paginationSchema.safeParse(request.query),
      request,
      reply
    );
    if (!dataQuery) return;

    try {
      const user = (request as any).user;
      const result = await this.service.listSubmissions(user, {
        ...dataQuery,
        ...(request.query as any),
      });
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const submission = await this.service.getSubmissionById(user, request.params.id);
      return reply.send(submission);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async start(request: FastifyRequest<{ Body: { examId: string; allowRetake?: boolean } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { examId, allowRetake } = request.body || {};
      if (!examId) {
        return reply.status(400).send({ error: "examId là bắt buộc" });
      }

      const { submission, isNew } = await this.service.startAttempt(user, examId, { allowRetake });
      return reply.status(isNew ? 201 : 200).send(submission);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async saveDraft(request: FastifyRequest<{ Params: { id: string }; Body: { answers: any[]; version?: number } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { answers, version } = request.body || {};
      const result = await this.service.saveDraft(user, request.params.id, answers || [], version);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async submit(request: FastifyRequest<{ Params: { id: string }; Body: { answers: any[]; idempotencyKey?: string; version?: number } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const payload = request.body || { answers: [] };
      const result = await this.service.submitExam(user, request.params.id, payload);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async startRevision(request: FastifyRequest<{ Body: { examId: string; clonePreviousAnswers?: boolean } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { examId, clonePreviousAnswers } = request.body || {};
      if (!examId) {
        return reply.status(400).send({ error: "examId là bắt buộc" });
      }

      const { submission, isNew } = await this.service.startRevision(user, examId, { clonePreviousAnswers });
      return reply.status(isNew ? 201 : 200).send(submission);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async grade(
    request: FastifyRequest<{
      Params: { id: string };
      Body: {
        grades: any[];
        totalScore?: number;
        feedback?: string;
        primaryErrorCategory?: "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | null;
        revisionRequired?: boolean;
        criteriaScores?: any;
        sentenceFeedbacks?: any[];
        tabSwitchCount?: number;
        finalize?: boolean;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const body = request.body || {};
      const {
        grades = [],
        totalScore,
        feedback,
        primaryErrorCategory,
        revisionRequired,
        criteriaScores,
        sentenceFeedbacks,
        tabSwitchCount,
      } = body;
      const finalize =
        body.options?.finalize !== undefined
          ? !!body.options.finalize
          : body.finalize !== undefined
          ? !!body.finalize
          : true;

      const result = await this.service.gradeManualSubmission(user, request.params.id, grades, totalScore, {
        feedback: body.options?.feedback ?? feedback,
        primaryErrorCategory: body.options?.primaryErrorCategory ?? primaryErrorCategory,
        revisionRequired: body.options?.revisionRequired ?? revisionRequired,
        criteriaScores: body.options?.criteriaScores ?? criteriaScores,
        sentenceFeedbacks: body.options?.sentenceFeedbacks ?? sentenceFeedbacks,
        tabSwitchCount: body.options?.tabSwitchCount ?? tabSwitchCount,
        finalize,
      });
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async regrade(request: FastifyRequest<{ Params: { id: string }; Body: { reason: string; grades?: any[]; regradeAll?: boolean } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const result = await this.service.regradeSubmission(user, request.params.id, request.body || { reason: "" });
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }
}
