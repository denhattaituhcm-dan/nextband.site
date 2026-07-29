import { FastifyPluginAsync } from 'fastify';
import { HomeworkService } from '../services/homework.service.js';
import { SubmissionService } from '../services/submission.service.js';
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

  // Teacher Workspace Projection
  fastify.get('/teacher-workspace', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const workspace = await homeworkService.getTeacherHomeworkWorkspace(user.id);
    return reply.send({ success: true, data: workspace });
  });

  // Teacher assigns homework
  fastify.post('/create', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const body = createHomeworkSchema.parse(request.body);

    const homework = await homeworkService.createHomework({
      ...body,
      createdBy: user.id
    });
    return reply.send({ success: true, homework });
  });

  // Student submits homework
  fastify.post('/submit', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const body = submitHomeworkSchema.parse(request.body);

    const submission = await submissionService.submitHomework(body.homeworkId, user.id);
    return reply.send({ success: true, submission });
  });

  // Teacher grades submission
  fastify.post('/grade', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const body = gradeSubmissionSchema.parse(request.body);

    const submission = await submissionService.gradeSubmission(body);
    return reply.send({ success: true, submission });
  });
};

export default homeworkRoutes;
