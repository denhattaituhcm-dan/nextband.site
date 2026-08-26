import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { PeriodicReportService, PeriodicReportQuery } from "../services/periodic-report.service.js";

export default async function reportsRoutes(fastify: FastifyInstance) {
  const reportService = new PeriodicReportService(fastify.prisma);

  /**
   * GET /admin/reports/periodic
   * Aggregate 5 core business reporting groups across Monthly / Quarterly / Yearly periods
   */
  fastify.get(
    "/periodic",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const query = (request.query || {}) as {
        periodType?: "MONTH" | "QUARTER" | "YEAR";
        period?: "month" | "quarter" | "year";
        year?: string | number;
        month?: string | number;
        quarter?: string | number;
        branchId?: string;
      };

      const normalizedPeriodType = (
        query.periodType || (query.period ? query.period.toUpperCase() : "YEAR")
      ) as "MONTH" | "QUARTER" | "YEAR";

      const currentYear = new Date().getFullYear();
      const year = query.year ? Number(query.year) : currentYear;
      const month = query.month ? Number(query.month) : undefined;
      const quarter = query.quarter ? Number(query.quarter) : undefined;
      const branchId = query.branchId || "ALL";

      try {
        const report = await reportService.generateReport({
          periodType: normalizedPeriodType,
          year,
          month,
          quarter,
          branchId,
        });

        return reply.send({
          success: true,
          data: report,
        });
      } catch (err: any) {
        request.log.error(err, "Failed to generate periodic report");
        return reply.status(500).send({
          error: "InternalServerError",
          message: "Không thể tổng hợp báo cáo định kỳ: " + err.message,
        });
      }
    }
  );
}
