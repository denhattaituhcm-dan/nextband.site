import { FastifyPluginAsync } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { AcademicIntelligenceController } from "../controllers/academic-intelligence.controller.js";

const academicIntelligenceRoutes: FastifyPluginAsync = async (fastify) => {
  const controller = new AcademicIntelligenceController(fastify);

  // All Academic Intelligence endpoints require authentication and admin/academic authority
  fastify.addHook("preHandler", authenticate);
  fastify.addHook("preHandler", requireRoles("admin"));

  fastify.get("/overview", controller.getOverview.bind(controller));
  fastify.get("/students", controller.getStudents.bind(controller));
  fastify.get("/students/:studentId/submissions", controller.getStudentSubmissions.bind(controller));
  fastify.get("/submissions/:submissionId/provenance", controller.getSubmissionProvenance.bind(controller));
};

export default academicIntelligenceRoutes;
