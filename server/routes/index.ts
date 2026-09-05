import { FastifyPluginAsync } from "fastify";

import authRoutes from "./auth.routes.js";
import assessmentRoutes from "./assessment.routes.js";
import coursesRoutes from "./courses.routes.js";
import examsRoutes from "./exams.routes.js";
import sectionsRoutes from "./sections.routes.js";
import questionsRoutes from "./questions.routes.js";
import submissionsRoutes from "./submissions.routes.js";
import usersRoutes from "./users.routes.js";
import enrollmentsRoutes from "./enrollments.routes.js";
import uploadsRoutes from "./uploads.routes.js";
import classesRoutes from "./classes.routes.js";
import highlightsRoutes from "./highlights.routes.js";
import attendanceRoutes from "./attendance.routes.js";
import siteSettingsRoutes from "./site-settings.routes.js";
import invitationRoutes from "./invitation.routes.js";
import lessonRoutes from "./lesson.routes.js";
import notificationsRoutes from "./notifications.routes.js";
import leadRoutes from "./lead.routes.js";
import speakingStorageRoutes from "./speakingStorage.routes.js";
import speakingEvidenceRoutes from "./speaking-evidence.routes.js";
import speakingForecastRoutes from "./speaking-forecast.routes.js";
import branchRoutes from "./branch.routes.js";
import roomRoutes from "./room.routes.js";
import periodicReportsRoutes from "./periodic-reports.routes.js";
import reportsRoutes from "./reports.routes.js";
import adminDashboardRoutes from "./admin-dashboard.routes.js";
import interventionRoutes from "./intervention.routes.js";
import tuitionRoutes from "./tuition.routes.js";
import milestoneRoutes from "./milestone.routes.js";
import referralsRoutes from "./referrals.routes.js";
import lexiconRoutes from "./lexicon.routes.js";
import teacherProfileRoutes from "./teacher-profile.routes.js";
import cronRoutes from "./cron.routes.js";
import parentReportsRoutes from "./parent-reports.routes.js";
import reEnrollmentRoutes from "./re-enrollment.routes.js";
import radarRoutes from "./radar.routes.js";

const routes: FastifyPluginAsync = async (fastify) => {
  // Health check
  fastify.get("/health", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
  });

  // Register all routes with prefixes
  await fastify.register(authRoutes, { prefix: "/auth" });
  await fastify.register(assessmentRoutes, { prefix: "/assessment" });
  await fastify.register(coursesRoutes, { prefix: "/courses" });
  await fastify.register(examsRoutes, { prefix: "/exams" });
  await fastify.register(sectionsRoutes, { prefix: "/sections" });
  await fastify.register(questionsRoutes, { prefix: "/questions" });
  await fastify.register(submissionsRoutes, { prefix: "/submissions" });
  await fastify.register(usersRoutes, { prefix: "/users" });
  await fastify.register(enrollmentsRoutes, { prefix: "/enrollments" });
  await fastify.register(uploadsRoutes, { prefix: "/uploads" });
  await fastify.register(classesRoutes, { prefix: "/classes" });
  await fastify.register(highlightsRoutes, { prefix: "/highlights" });
  await fastify.register(attendanceRoutes);
  await fastify.register(siteSettingsRoutes, { prefix: "/site-settings" });
  await fastify.register(invitationRoutes, { prefix: "/invitations" });
  await fastify.register(notificationsRoutes, { prefix: "/notifications" });
  await fastify.register(leadRoutes, { prefix: "/leads" });
  await fastify.register(branchRoutes, { prefix: "/branches" });
  await fastify.register(roomRoutes, { prefix: "/rooms" });
  await fastify.register(speakingStorageRoutes, { prefix: "/speaking" });
  await fastify.register(speakingEvidenceRoutes, { prefix: "/speaking" });
  await fastify.register(speakingForecastRoutes, { prefix: "/speaking-forecast" });
  await fastify.register(referralsRoutes, { prefix: "/referrals" });
  await fastify.register(lessonRoutes);
  await fastify.register(periodicReportsRoutes);
  await fastify.register(adminDashboardRoutes, { prefix: "/admin" });
  await fastify.register(reportsRoutes, { prefix: "/admin/reports" });
  await fastify.register(interventionRoutes, { prefix: "/interventions" });
  await fastify.register(tuitionRoutes, { prefix: "/admin/tuition" });
  await fastify.register(milestoneRoutes, { prefix: "/milestones" });
  await fastify.register(lexiconRoutes, { prefix: "/lexicon" });
  await fastify.register(teacherProfileRoutes, { prefix: "/teacher-profile" });
  await fastify.register(cronRoutes, { prefix: "/cron" });
  await fastify.register(parentReportsRoutes);
  await fastify.register(reEnrollmentRoutes);
  await fastify.register(radarRoutes, { prefix: "/classes" });
};

export default routes;
