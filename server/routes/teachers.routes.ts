import { FastifyPluginAsync } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { interpretStudentMastery } from "../domain/student-model/pedagogical-interpreter.js";

const teachersRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * GET /api/v1/teachers/students/:studentId/pedagogical-profile
   * Returns deterministic pedagogical profile for a student.
   * Access: teacher, admin only. Rejects student (403), rejects unauthenticated (401).
   */
  fastify.get(
    "/students/:studentId/pedagogical-profile",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { studentId } = request.params as { studentId: string };

      try {
        // 1. Verify student existence
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(studentId);
        const student = await fastify.prisma.user.findFirst({
          where: isUuid
            ? { OR: [{ userId: studentId }, { id: studentId }] }
            : { userId: studentId },
          select: {
            id: true,
            userId: true,
            fullName: true,
            email: true,
          },
        });

        if (!student) {
          return reply.status(404).send({
            error: "NotFound",
            message: `Học sinh với mã ${studentId} không tồn tại.`,
          });
        }

        const canonicalStudentId = student.userId || student.id;

        // 2. Query StudentSkillMastery & SkillNode
        const masteries = await fastify.prisma.studentSkillMastery.findMany({
          where: { studentId: canonicalStudentId },
          include: {
            skillNode: true,
          },
          orderBy: { skillCode: "asc" },
        });

        // 3. Query recent DiagnosticEvidence for this student
        const rawDiagnostics = await fastify.prisma.diagnosticEvidence.findMany({
          where: {
            submission: {
              studentId: canonicalStudentId,
            },
          },
          include: {
            errorDef: true,
          },
          orderBy: { observedAt: "desc" },
          take: 10,
        });

        // 4. Map into domain inputs
        const skillsInput = masteries.map((m) => {
          const totalEvidence = m.totalEvidence;
          // Derived approximation of correct outcomes from alpha
          // (alpha - 1) represents positive evidence in Beta(1 + sum(y), 1 + sum(1-y))
          const correctCount = Math.max(0, m.alphaSuccess - 1.0);
          const total = m.alphaSuccess + m.betaFailure;
          const posteriorMean = total > 0 ? m.alphaSuccess / total : 0.5;

          return {
            skillId: m.skillCode,
            skillName: m.skillNode?.name || m.skillCode,
            macroSkill: m.skillNode?.macroSkill || "GENERAL",
            totalEvidence,
            correctCount,
            posteriorMean,
          };
        });

        const diagnosticsInput = rawDiagnostics.map((d) => ({
          errorCode: d.errorCode,
          errorName: d.errorDef?.name || d.errorCode,
          errorDescription: d.errorDef?.description || "Phát hiện thói quen làm bài cần chú ý.",
          hypothesisConfidence: d.confidence,
          snippet: d.evidenceSnippet,
          ruleCode: d.ruleCode,
        }));

        // 5. Run Pure Domain Pedagogical Interpreter
        const profile = interpretStudentMastery({
          studentId: canonicalStudentId,
          skills: skillsInput,
          diagnostics: diagnosticsInput,
        });

        return reply.status(200).send({
          status: "success",
          data: {
            student: {
              id: student.id,
              userId: canonicalStudentId,
              fullName: student.fullName,
              email: student.email,
            },
            profile,
          },
        });
      } catch (error: any) {
        request.log.error(error, "[teachersRoutes] getPedagogicalProfile error");
        return reply.status(500).send({
          error: "InternalServerError",
          message: "Lỗi hệ thống khi tạo hồ sơ sư phạm của học sinh.",
        });
      }
    }
  );
};

export default teachersRoutes;
