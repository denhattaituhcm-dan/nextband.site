import { FastifyPluginAsync } from 'fastify';
import { AttendanceService } from '../services/attendance.service.js';
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

  // 1. GET /classes/:classId/sessions/:sessionId/attendance
  fastify.get('/classes/:classId/sessions/:sessionId/attendance', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId, sessionId } = request.params as { classId: string; sessionId: string };

    const data = await attendanceService.getSessionAttendance(classId, sessionId, user.id, user.roles || ['teacher']);
    return reply.send({ success: true, data });
  });

  // 2. POST /classes/:classId/sessions/:sessionId/attendance
  fastify.post('/classes/:classId/sessions/:sessionId/attendance', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId, sessionId } = request.params as { classId: string; sessionId: string };
    const body = markAttendanceSchema.parse(request.body);

    const result = await attendanceService.markSessionAttendance(classId, sessionId, user.id, user.roles || ['teacher'], body.items);
    return reply.send(result);
  });

  // 3. POST /classes/:classId/sessions/:sessionId/complete (Chốt buổi học)
  fastify.post('/classes/:classId/sessions/:sessionId/complete', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string; roles: string[] };
    const { classId, sessionId } = request.params as { classId: string; sessionId: string };

    const result = await attendanceService.completeSession(classId, sessionId, user.id, user.roles || ['teacher']);
    return reply.send(result);
  });

  // 4. GET /classes/:classId/attendance-matrix (Ma trận chuyên cần & Backend Attendance Rate)
  fastify.get('/classes/:classId/attendance-matrix', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { classId } = request.params as { classId: string };

    const data = await attendanceService.getAttendanceMatrix(classId);
    return reply.send({ success: true, data });
  });
};

export default attendanceRoutes;

