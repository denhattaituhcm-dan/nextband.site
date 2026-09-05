/**
 * Radar Routes — Early-Warning Radar API
 *
 * GET /classes/:id/radar/at-risk
 *   → Trả về danh sách học sinh có rủi ro mất học bổng trong class.
 *   → On-demand: mỗi request tính lại từ dữ liệu thực tế.
 *   → Auth: admin hoặc teacher của class.
 */

import { FastifyInstance } from 'fastify';
import { authenticate, requireRoles } from '../middlewares/auth.middleware.js';
import { RadarService } from '../services/radar.service.js';

export default async function radarRoutes(fastify: FastifyInstance) {
  const service = new RadarService(fastify.prisma);

  /**
   * GET /classes/:id/radar/at-risk
   *
   * Response:
   * {
   *   classId: string,
   *   evaluatedAt: string,       // ISO timestamp
   *   watchCount: number,
   *   atRiskCount: number,
   *   criticalCount: number,
   *   students: AtRiskStudentDTO[]
   * }
   *
   * Label UI: "X học sinh cần chú ý" (không phải "cần can thiệp")
   * WATCH = awareness only; CRITICAL/AT_RISK = prompt intervention
   */
  fastify.get<{ Params: { id: string } }>(
    '/:id/radar/at-risk',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request, reply) => {
      const { id: classId } = request.params;
      try {
        const data = await service.getAtRiskStudents(classId);
        return reply.send({ success: true, data });
      } catch (err: any) {
        const status = err.statusCode || 500;
        return reply.status(status).send({ error: err.message });
      }
    }
  );
}
