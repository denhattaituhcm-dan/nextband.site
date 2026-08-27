import { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { TuitionService } from "../services/tuition.service.js";

const updateTuitionSchema = z.object({
  tuitionFee: z.number().min(0).optional(),
  paidAmount: z.number().min(0).optional(),
  paymentStatus: z.enum(["UNPAID", "PARTIAL", "PAID", "WAIVED", "REFUNDED"]).optional(),
  paymentNote: z.string().nullable().optional(),
  externalRef: z.string().nullable().optional(),
});

export default async function tuitionRoutes(fastify: FastifyInstance) {
  const service = new TuitionService(fastify.prisma);

  // GET /admin/tuition/summary - Báo cáo tổng hợp học phí & danh sách công nợ
  fastify.get(
    "/summary",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { branchId = "ALL" } = (request.query || {}) as { branchId?: string };

      try {
        const summary = await service.getTuitionSummary(branchId);
        return reply.send({
          success: true,
          data: summary,
        });
      } catch (err: any) {
        request.log.error(err, "Failed to compute tuition summary");
        return reply.status(500).send({
          success: false,
          error: "Không thể tổng hợp báo cáo học phí lúc này.",
        });
      }
    }
  );

  // PATCH /admin/tuition/students/:classStudentId - Cập nhật học phí & trạng thái đóng tiền của học viên
  fastify.patch<{ Params: { classStudentId: string } }>(
    "/students/:classStudentId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { classStudentId } = request.params;
      const parsed = updateTuitionSchema.safeParse(request.body);

      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: "Dữ liệu học phí không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      try {
        const updated = await service.updateStudentTuition(classStudentId, parsed.data);
        return reply.send({
          success: true,
          message: "Cập nhật học phí thành công.",
          data: updated,
        });
      } catch (err: any) {
        request.log.error(err, "Failed to update student tuition");
        return reply.status(400).send({
          success: false,
          error: err.message || "Không thể cập nhật học phí học viên.",
        });
      }
    }
  );
}
