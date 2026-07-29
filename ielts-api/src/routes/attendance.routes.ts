import { FastifyPluginAsync } from 'fastify';
import { AttendanceService } from '../services/attendance.service.js';
import { z } from 'zod';

const markAttendanceSchema = z.object({
  items: z.array(
    z.object({
      studentId: z.string().uuid(),
      status: z.enum(['UNMARKED', 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
      notes: z.string().optional()
    })
  )
});

const attendanceRoutes: FastifyPluginAsync = async (fastify) => {
  const attendanceService = new AttendanceService(fastify.prisma);

  // GET /api/v1/classes/:classId/sessions/:sessionId/attendance
  fastify.get('/classes/:classId/sessions/:sessionId/attendance', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId, sessionId } = request.params as { classId: string; sessionId: string };

    const data = await attendanceService.getSessionAttendance(classId, sessionId, user.id, user.roles || ['teacher']);
    return reply.send({ success: true, data });
  });

  // POST /api/v1/classes/:classId/sessions/:sessionId/attendance
  fastify.post('/classes/:classId/sessions/:sessionId/attendance', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId, sessionId } = request.params as { classId: string; sessionId: string };
    const body = markAttendanceSchema.parse(request.body);

    const result = await attendanceService.markSessionAttendance(classId, sessionId, user.id, user.roles || ['teacher'], body.items);
    return reply.send(result);
  });
};

export default attendanceRoutes;
