import { FastifyRequest, FastifyReply } from "fastify";
import { ClassService } from "../services/class.service.js";
import { handleValidation } from "../utils/validation.js";
import { paginationSchema } from "../schemas/common.schema.js";
import { createClassSchema, updateClassSchema } from "../schemas/class.schema.js";

export class ClassController {
  private service: ClassService;

  constructor(fastify: any) {
    this.service = new ClassService(fastify.prisma);
  }

  async getMyClasses(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const result = await this.service.getMyClasses(user.id);
      return reply.send({ data: result });
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
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
      const result = await this.service.listClasses(user, {
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
      const classData = await this.service.getClassById(user, request.params.id);
      return reply.send(classData);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const parsed = createClassSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: "Dữ liệu không hợp lệ",
        details: parsed.error.flatten(),
      });
    }

    try {
      const user = (request as any).user;
      const result = await this.service.createClass(user, parsed.data);
      return reply.status(201).send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const parsed = updateClassSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: "Dữ liệu không hợp lệ",
        details: parsed.error.flatten(),
      });
    }

    try {
      const user = (request as any).user;
      const result = await this.service.updateClass(user, request.params.id, parsed.data);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async addStudent(request: FastifyRequest<{ Params: { id: string }; Body: { studentId: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { studentId } = request.body || {};
      if (!studentId) {
        return reply.status(400).send({ error: "studentId là bắt buộc" });
      }
      const result = await this.service.addStudent(user, request.params.id, studentId);
      return reply.status(201).send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async removeStudent(request: FastifyRequest<{ Params: { id: string; studentId: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      await this.service.removeStudent(user, request.params.id, request.params.studentId);
      return reply.send({ success: true });
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async recordAttendance(request: FastifyRequest<{ Params: { id: string }; Body: { records: any[] } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { records = [] } = request.body || {};
      const result = await this.service.recordAttendance(user, request.params.id, records);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async setHomeworkDeadline(
    request: FastifyRequest<{ Params: { id: string }; Body: { examId: string; deadline: string | null } }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const { examId, deadline } = request.body || {};
      if (!examId) {
        return reply.status(400).send({ error: "examId là bắt buộc" });
      }
      const result = await this.service.setHomeworkDeadline(user, request.params.id, examId, deadline);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async getGraduationSummary(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const result = await this.service.getGraduationSummary(request.params.id);
      return reply.send({ success: true, data: result });
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async getLeaderboard(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const result = await this.service.getClassLeaderboard(user, request.params.id);
      return reply.send({ success: true, data: result });
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async getLeagueStandings(request: FastifyRequest<{ Querystring: { branchId?: string } }>, reply: FastifyReply) {
    try {
      const { branchId } = request.query;
      const result = await this.service.getLeagueStandings(branchId);
      return reply.send({ success: true, data: result });
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async close(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const result = await this.service.closeClass(user, request.params.id);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async reopen(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const result = await this.service.reopenClass(user, request.params.id);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async triggerMaintenance(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await this.service.runClassLifecycleMaintenance();
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async getSessions(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const result = await this.service.getClassSessions(user, request.params.id);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async generateSessions(
    request: FastifyRequest<{
      Params: { id: string };
      Body: {
        startDate: string;
        weekdays: number[];
        totalSessions: number;
        startTime: string;
        endTime: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const result = await this.service.generateSessionsForClass(user, request.params.id, request.body);
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async postponeSession(
    request: FastifyRequest<{
      Params: { id: string; sessionId: string };
      Body: { reason?: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const result = await this.service.postponeSessionAndShift(
        user,
        request.params.id,
        request.params.sessionId,
        request.body || {}
      );
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async updateStudentStatus(
    request: FastifyRequest<{
      Params: { id: string; studentId: string };
      Body: { status: string; reason?: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const result = await this.service.updateStudentStatus(
        user,
        request.params.id,
        request.params.studentId,
        request.body || { status: "" }
      );
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async rescheduleSession(
    request: FastifyRequest<{
      Params: { sessionId: string };
      Body: { plannedDate: string; reason?: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const { plannedDate, reason } = request.body || {};
      if (!plannedDate) {
        return reply.status(400).send({ error: "plannedDate là bắt buộc" });
      }
      const result = await this.service.rescheduleSingleSession(
        user,
        request.params.sessionId,
        plannedDate,
        reason
      );
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }

  async updateSessionStatus(
    request: FastifyRequest<{
      Params: { sessionId: string };
      Body: { status: string; note?: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const user = (request as any).user;
      const { status: sessionStatus, note } = request.body || {};
      if (!sessionStatus) {
        return reply.status(400).send({ error: "status là bắt buộc" });
      }
      const result = await this.service.updateSessionStatus(
        user,
        request.params.sessionId,
        sessionStatus,
        note
      );
      return reply.send(result);
    } catch (err: any) {
      const status = err.statusCode || 500;
      return reply.status(status).send({ error: err.message });
    }
  }
}

