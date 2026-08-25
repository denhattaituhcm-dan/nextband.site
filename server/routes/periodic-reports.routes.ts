import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

const savePeriodicReportSchema = z.object({
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  strengths: z.string().optional().nullable(),
  weaknesses: z.string().optional().nullable(),
  recommendations: z.string().optional().nullable(),
  nextPeriodGoals: z.array(z.string()).optional().default([]),
});

const periodicReportsRoutes: FastifyPluginAsync = async (fastify: any) => {
  const prisma = fastify.prisma;

  /**
   * GET /classes/:classId/students/:studentId/periodic-reports/latest
   * Retrieves the most recent periodic report for a student in a class
   */
  fastify.get(
    "/classes/:classId/students/:studentId/periodic-reports/latest",
    { preHandler: [authenticate] },
    async (request: any, reply: any) => {
      const { classId, studentId } = request.params;
      const user = request.user;

      try {
        const report = await prisma.studentPeriodicReport.findFirst({
          where: {
            classId,
            studentId,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            teacher: {
              select: { id: true, fullName: true, email: true },
            },
          },
        });

        return reply.send({
          success: true,
          data: report,
        });
      } catch (err: any) {
        fastify.log.error(err, "Failed to get latest periodic report");
        return reply.status(500).send({
          error: "InternalServerError",
          message: "Không thể tải báo cáo định kỳ: " + err.message,
        });
      }
    }
  );

  /**
   * POST /classes/:classId/students/:studentId/periodic-reports
   * Saves or updates a periodic report evaluated by the teacher
   */
  fastify.post(
    "/classes/:classId/students/:studentId/periodic-reports",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request: any, reply: any) => {
      const { classId, studentId } = request.params;
      const teacherId = request.user.id || request.user.userId;
      const body = savePeriodicReportSchema.parse(request.body);

      const now = new Date();
      const defaultStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const periodStart = body.periodStart ? new Date(body.periodStart) : defaultStart;
      const periodEnd = body.periodEnd ? new Date(body.periodEnd) : now;

      try {
        // Upsert periodic report by [classId, studentId, periodStart, periodEnd]
        const existing = await prisma.studentPeriodicReport.findFirst({
          where: {
            classId,
            studentId,
            periodStart,
            periodEnd,
          },
        });

        let savedReport;
        if (existing) {
          savedReport = await prisma.studentPeriodicReport.update({
            where: { id: existing.id },
            data: {
              teacherId,
              strengths: body.strengths,
              weaknesses: body.weaknesses,
              recommendations: body.recommendations,
              nextPeriodGoals: body.nextPeriodGoals,
              updatedAt: now,
            },
          });
        } else {
          savedReport = await prisma.studentPeriodicReport.create({
            data: {
              classId,
              studentId,
              teacherId,
              periodStart,
              periodEnd,
              strengths: body.strengths,
              weaknesses: body.weaknesses,
              recommendations: body.recommendations,
              nextPeriodGoals: body.nextPeriodGoals,
            },
          });
        }

        return reply.send({
          success: true,
          data: savedReport,
        });
      } catch (err: any) {
        fastify.log.error(err, "Failed to save periodic report");
        return reply.status(500).send({
          error: "InternalServerError",
          message: "Không thể lưu báo cáo định kỳ: " + err.message,
        });
      }
    }
  );
};

export default periodicReportsRoutes;
