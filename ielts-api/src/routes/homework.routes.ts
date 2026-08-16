import { FastifyPluginAsync } from 'fastify';
import { HomeworkService } from '../services/homework.service.js';
import { SubmissionService } from '../services/submission.service.js';
import { AuthorizationError, NotFoundError } from '../services/authorization.service.js';
import { requireRoles } from '../middlewares/auth.middleware.js';
import { createHomeworkSchema, submitHomeworkSchema, gradeSubmissionSchema } from '../validations/schemas.js';

const homeworkRoutes: FastifyPluginAsync = async (fastify) => {
  const homeworkService = new HomeworkService(fastify.prisma);
  const submissionService = new SubmissionService(fastify.prisma);

  // Student Workspace Projection ("Continue Homework" priority view)
  fastify.get('/workspace', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const workspace = await homeworkService.getStudentHomeworkWorkspace(user.id);
    return reply.send({ success: true, data: workspace });
  });

  // Teacher Workspace Projection (Teacher / Admin only with Class Isolation)
  fastify.get('/teacher-workspace', { preHandler: [fastify.authenticate, requireRoles("admin", "teacher")] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId } = (request.query || {}) as { classId?: string };

    try {
      const workspace = await homeworkService.getTeacherHomeworkWorkspace(user.id, user.roles, classId);
      return reply.send({ success: true, data: workspace });
    } catch (err: any) {
      if (err instanceof AuthorizationError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      if (err instanceof NotFoundError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      throw err;
    }
  });

  // Teacher assigns homework (Admin / Teacher owner of class)
  fastify.post('/create', { preHandler: [fastify.authenticate, requireRoles("admin", "teacher")] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const body = createHomeworkSchema.parse(request.body);

    try {
      const homework = await homeworkService.createHomework({
        ...body,
        createdBy: user.id,
        userRoles: user.roles || ['teacher'],
      });
      return reply.status(201).send({ success: true, homework });
    } catch (err: any) {
      if (err instanceof AuthorizationError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      if (err instanceof NotFoundError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      throw err;
    }
  });

  // Student submits homework (Must be enrolled in class)
  fastify.post('/submit', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const body = submitHomeworkSchema.parse(request.body);

    try {
      const submission = await submissionService.submitHomework(body.homeworkId, user.id);
      return reply.send({ success: true, submission });
    } catch (err: any) {
      if (err instanceof AuthorizationError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      if (err instanceof NotFoundError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      throw err;
    }
  });

  // Teacher grades submission (Admin / Teacher owner of class only)
  fastify.post('/grade', { preHandler: [fastify.authenticate, requireRoles("admin", "teacher")] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const body = gradeSubmissionSchema.parse(request.body);

    try {
      const submission = await submissionService.gradeSubmission(body, {
        userId: user.id,
        userRoles: user.roles || ['teacher'],
      });
      return reply.send({ success: true, submission });
    } catch (err: any) {
      if (err instanceof AuthorizationError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      if (err instanceof NotFoundError) {
        return reply.status(err.statusCode).send({ error: err.message });
      }
      throw err;
    }
  });
};

export default homeworkRoutes;
