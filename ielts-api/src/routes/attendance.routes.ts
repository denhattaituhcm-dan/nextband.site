import { FastifyPluginAsync } from 'fastify';
import { AttendanceService } from '../services/attendance.service.js';
import { AuthorizationError, NotFoundError } from '../services/authorization.service.js';
import { requireRoles } from '../middlewares/auth.middleware.js';
import { z } from 'zod';

const markAttendanceSchema = z.object({
  items: z.array(
    z.object({
      studentId: z.string().uuid(),
      status: z.enum(['UNMARKED', 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
      note: z.string().optional().nullable(),
      notes: z.string().optional().nullable()
    })
  )
});

const attendanceRoutes: FastifyPluginAsync = async (fastify) => {
  const attendanceService = new AttendanceService(fastify.prisma);

  // 1. GET /classes/:classId/sessions/:sessionId/attendance (Admin, Teacher, or Enrolled Student)
  fastify.get('/classes/:classId/sessions/:sessionId/attendance', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId, sessionId } = request.params as { classId: string; sessionId: string };

    try {
      const data = await attendanceService.getSessionAttendance(classId, sessionId, user.id, user.roles || ['student']);
      return reply.send({ success: true, data });
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

  // 2. POST /classes/:classId/sessions/:sessionId/attendance (Admin or Class Teacher only)
  fastify.post(
    '/classes/:classId/sessions/:sessionId/attendance',
    { preHandler: [fastify.authenticate, requireRoles('admin', 'teacher')] },
    async (request, reply) => {
      const user = request.user as { id: string; roles: string[] };
      const { classId, sessionId } = request.params as { classId: string; sessionId: string };
      const body = markAttendanceSchema.parse(request.body);

      try {
        const result = await attendanceService.markSessionAttendance(
          classId,
          sessionId,
          user.id,
          user.roles || ['teacher'],
          body.items
        );
        return reply.send(result);
      } catch (err: any) {
        if (err instanceof AuthorizationError) {
          const isEnrollmentError = err.message.startsWith('INVALID_ENROLLMENT_STUDENT');
          const isSessionCompleted = err.message.startsWith('SESSION_ALREADY_COMPLETED');
          const errorCode = isEnrollmentError
            ? 'INVALID_ENROLLMENT_STUDENT'
            : isSessionCompleted
            ? 'SESSION_ALREADY_COMPLETED'
            : undefined;

          return reply.status(err.statusCode).send({
            error: errorCode || err.message,
            message: err.message,
          });
        }
        if (err instanceof NotFoundError) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        throw err;
      }
    }
  );

  // 3. POST /classes/:classId/sessions/:sessionId/complete (Admin or Class Teacher only)
  fastify.post(
    '/classes/:classId/sessions/:sessionId/complete',
    { preHandler: [fastify.authenticate, requireRoles('admin', 'teacher')] },
    async (request, reply) => {
      const user = request.user as { id: string; roles: string[] };
      const { classId, sessionId } = request.params as { classId: string; sessionId: string };

      try {
        const result = await attendanceService.completeSession(
          classId,
          sessionId,
          user.id,
          user.roles || ['teacher']
        );
        return reply.send(result);
      } catch (err: any) {
        if (err instanceof AuthorizationError) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        if (err instanceof NotFoundError) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        throw err;
      }
    }
  );

  // 4. GET /classes/:classId/attendance-matrix (Object-Level Authorization)
  fastify.get('/classes/:classId/attendance-matrix', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId } = request.params as { classId: string };

    try {
      const data = await attendanceService.getAttendanceMatrix(classId, user.id, user.roles || ['student']);
      return reply.send({ success: true, data });
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

export default attendanceRoutes;
