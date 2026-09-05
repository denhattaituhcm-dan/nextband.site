import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { InterventionService } from "../services/intervention.service.js";
import {
  createInterventionSchema,
  updateInterventionSchema,
  transitionInterventionSchema,
} from "../schemas/intervention.schema.js";

export default async function interventionRoutes(fastify: FastifyInstance) {
  const service = new InterventionService(fastify.prisma);

  // 1. GET /interventions/student/:studentId - Danh sách lịch sử can thiệp học vụ của học viên
  fastify.get<{ Params: { studentId: string } }>(
    "/student/:studentId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const user = (request as any).user;
      const { studentId } = request.params;
      try {
        const data = await service.listByStudent(studentId, user);
        return reply.send({ success: true, data });
      } catch (err: any) {
        const status = err.statusCode || 500;
        return reply.status(status).send({ error: err.message });
      }
    }
  );

  // 2. POST /interventions - Tạo bản ghi can thiệp học vụ mới
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const user = (request as any).user;
      const parsed = createInterventionSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu can thiệp không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      try {
        const data = await service.create(user.id, parsed.data, user);
        return reply.status(201).send({ success: true, data });
      } catch (err: any) {
        const status = err.statusCode || 500;
        return reply.status(status).send({ error: err.message });
      }
    }
  );

  // 3. PATCH /interventions/:id - Cập nhật tiến độ / trạng thái can thiệp
  fastify.patch<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const user = (request as any).user;
      const { id } = request.params;
      const parsed = updateInterventionSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu cập nhật không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      try {
        const data = await service.update(id, parsed.data, user);
        return reply.send({ success: true, data });
      } catch (err: any) {
        const status = err.statusCode || 500;
        return reply.status(status).send({ error: err.message });
      }
    }
  );

  // 4. POST /interventions/:id/transition - Chuyển trạng thái theo quy tắc State Machine
  fastify.post<{ Params: { id: string } }>(
    "/:id/transition",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const user = (request as any).user;
      const { id } = request.params;
      const parsed = transitionInterventionSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu chuyển trạng thái không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      try {
        const data = await service.transitionStatus(id, parsed.data, user);
        return reply.send({ success: true, data });
      } catch (err: any) {
        const status = err.statusCode || 500;
        return reply.status(status).send({ error: err.message });
      }
    }
  );

  // 5. DELETE /interventions/:id - Xóa bản ghi can thiệp (Chỉ Admin)
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const user = (request as any).user;
      const { id } = request.params;

      try {
        const result = await service.delete(id, user);
        return reply.send(result);
      } catch (err: any) {
        const status = err.statusCode || 500;
        return reply.status(status).send({ error: err.message });
      }
    }
  );
}
