import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { authenticate, requireRoles } from '../middlewares/auth.middleware.js';
import { z } from 'zod';

const markAttendanceSchema = z.object({
  items: z.array(
    z.object({
      studentId: z.string().uuid(),
      status: z.enum(['UNMARKED', 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
      note: z.string().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
  ),
});

const attendanceRoutes: FastifyPluginAsync = async (fastify) => {
  // Helper: check if teacher is class owner or user is admin
  const isTeacherOrAdmin = async (userId: string, roles: string[], classId: string) => {
    if (roles.includes('admin')) return true;
    if (!roles.includes('teacher')) return false;
    const cls = await fastify.prisma.class.findUnique({
      where: { id: classId },
      select: { teacherId: true },
    });
    return cls?.teacherId === userId;
  };

  // Helper: check if student belongs to class
  const isStudentInClass = async (studentId: string, classId: string) => {
    const rec = await fastify.prisma.classStudent.findFirst({
      where: { classId, studentId },
    });
    return !!rec;
  };

  // 1. GET /classes/:classId/sessions/:sessionId/attendance
  fastify.get<{ Params: { classId: string; sessionId: string } }>(
    '/classes/:classId/sessions/:sessionId/attendance',
    { preHandler: [authenticate] },
    async (request, reply) => {
      const user = request.user as { id: string; roles: string[] };
      const { classId, sessionId } = request.params;

      const cls = await fastify.prisma.class.findUnique({
        where: { id: classId },
        select: { id: true, name: true, teacherId: true },
      });
      if (!cls) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });

      const session = await fastify.prisma.classSession.findUnique({
        where: { id: sessionId },
      });
      if (!session || session.classId !== classId) {
        return reply.status(404).send({ error: 'Buổi học không hợp lệ hoặc không thuộc lớp này.' });
      }

      const isAdmin = user.roles.includes('admin');
      const isClassTeacher = user.roles.includes('teacher') && cls.teacherId === user.id;
      const isOtherTeacher = user.roles.includes('teacher') && cls.teacherId !== user.id;

      if (isOtherTeacher && !isAdmin) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const isStudent = !isAdmin && !isClassTeacher;
      if (isStudent) {
        const enrolled = await isStudentInClass(user.id, classId);
        if (!enrolled) {
          return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không thuộc danh sách học viên của lớp này.' });
        }

        const studentRecord = await fastify.prisma.classAttendance.findUnique({
          where: {
            sessionId_studentId: {
              sessionId,
              studentId: user.id,
            },
          },
        });

        const studentUser = await fastify.prisma.user.findUnique({
          where: { id: user.id },
          select: { id: true, fullName: true, email: true, avatarUrl: true },
        });

        return reply.send({
          success: true,
          data: {
            classId,
            className: cls.name,
            sessionId,
            sessionNumber: session.sessionNumber,
            sessionTitle: session.title,
            sessionDate: session.sessionDate,
            status: session.status,
            completedAt: session.completedAt,
            summary: null,
            students: [
              {
                studentId: user.id,
                studentName: studentUser?.fullName || studentUser?.email || '',
                avatarUrl: studentUser?.avatarUrl || null,
                status: studentRecord ? studentRecord.status : 'UNMARKED',
                note: studentRecord?.note || null,
              },
            ],
          },
        });
      }

      // Admin & Class Teacher
      const classStudents = await fastify.prisma.classStudent.findMany({
        where: { classId },
        include: { student: true },
      });

      const attendanceRecords = await fastify.prisma.classAttendance.findMany({
        where: { sessionId },
      });

      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;
      let excusedCount = 0;
      let unmarkedCount = 0;

      const studentsAttendance = classStudents.map((cs) => {
        const record = attendanceRecords.find((r) => r.studentId === cs.studentId);
        const status = record ? record.status : 'UNMARKED';

        if (status === 'PRESENT') presentCount++;
        else if (status === 'ABSENT') absentCount++;
        else if (status === 'LATE') lateCount++;
        else if (status === 'EXCUSED') excusedCount++;
        else unmarkedCount++;

        return {
          studentId: cs.studentId,
          studentName: cs.student?.fullName || cs.student?.email || '',
          avatarUrl: cs.student?.avatarUrl || null,
          status,
          note: record?.note || null,
        };
      });

      return reply.send({
        success: true,
        data: {
          classId,
          className: cls.name,
          sessionId,
          sessionNumber: session.sessionNumber,
          sessionTitle: session.title,
          sessionDate: session.sessionDate,
          status: session.status,
          completedAt: session.completedAt,
          summary: {
            total: classStudents.length,
            present: presentCount,
            absent: absentCount,
            late: lateCount,
            excused: excusedCount,
            unmarked: unmarkedCount,
          },
          students: studentsAttendance,
        },
      });
    },
  );

  // 2. POST /classes/:classId/sessions/:sessionId/attendance (Guard 1: Active Enrollment + Session Lock)
  fastify.post<{ Params: { classId: string; sessionId: string } }>(
    '/classes/:classId/sessions/:sessionId/attendance',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request, reply) => {
      const user = request.user as { id: string; roles: string[] };
      const { classId, sessionId } = request.params;
      const body = markAttendanceSchema.parse(request.body);

      const cls = await fastify.prisma.class.findUnique({
        where: { id: classId },
        select: { teacherId: true },
      });
      if (!cls) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });

      const isAdmin = user.roles.includes('admin');
      const isOwner = cls.teacherId === user.id;
      if (!isAdmin && !isOwner) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const session = await fastify.prisma.classSession.findUnique({
        where: { id: sessionId },
      });
      if (!session || session.classId !== classId) {
        return reply.status(404).send({ error: 'Buổi học không hợp lệ hoặc không thuộc lớp này.' });
      }

      if (session.status === 'COMPLETED' && !isAdmin) {
        return reply.status(403).send({
          error: 'SESSION_ALREADY_COMPLETED',
          message: 'Buổi học đã chốt điểm danh (COMPLETED). Bạn không có quyền chỉnh sửa ngoại trừ Admin.',
        });
      }

      // Guard 1: Active Enrollment Validation (ALL students in items must be enrolled in class)
      const requestedStudentIds = [...new Set(body.items.map((i) => i.studentId))];
      const activeClassStudents = await fastify.prisma.classStudent.findMany({
        where: {
          classId,
          studentId: { in: requestedStudentIds },
        },
        select: { studentId: true },
      });

      const activeSet = new Set(activeClassStudents.map((cs) => cs.studentId));
      const invalidStudentIds = requestedStudentIds.filter((id) => !activeSet.has(id));

      if (invalidStudentIds.length > 0) {
        return reply.status(400).send({
          error: 'INVALID_ENROLLMENT_STUDENT',
          message: `Phát hiện học viên (${invalidStudentIds.join(', ')}) không thuộc danh sách học viên của lớp học này.`,
        });
      }

      // Atomic Transaction: Only executed when ALL items are valid
      await fastify.prisma.$transaction(
        body.items.map((item) => {
          const itemNote = item.note || item.notes || null;
          return fastify.prisma.classAttendance.upsert({
            where: {
              sessionId_studentId: {
                sessionId,
                studentId: item.studentId,
              },
            },
            update: {
              status: item.status as any,
              teacherId: user.id,
              note: itemNote,
            },
            create: {
              sessionId,
              studentId: item.studentId,
              teacherId: user.id,
              status: item.status as any,
              note: itemNote,
            },
          });
        }),
      );

      return reply.send({ success: true, message: `Đã lưu điểm danh cho ${body.items.length} học viên.` });
    },
  );

  // 3. POST /classes/:classId/sessions/:sessionId/complete
  fastify.post<{ Params: { classId: string; sessionId: string } }>(
    '/classes/:classId/sessions/:sessionId/complete',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request, reply) => {
      const user = request.user as { id: string; roles: string[] };
      const { classId, sessionId } = request.params;

      const cls = await fastify.prisma.class.findUnique({
        where: { id: classId },
        select: { teacherId: true },
      });
      if (!cls) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });

      const isAdmin = user.roles.includes('admin');
      const isOwner = cls.teacherId === user.id;
      if (!isAdmin && !isOwner) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const session = await fastify.prisma.classSession.findUnique({
        where: { id: sessionId },
      });
      if (!session || session.classId !== classId) {
        return reply.status(404).send({ error: 'Buổi học không hợp lệ hoặc không thuộc lớp này.' });
      }

      const activeStudents = await fastify.prisma.classStudent.findMany({
        where: { classId },
        select: { studentId: true },
      });

      const attendanceRecords = await fastify.prisma.classAttendance.findMany({
        where: { sessionId },
      });

      const unmarkedStudentIds = activeStudents
        .map((s) => s.studentId)
        .filter((sId) => {
          const rec = attendanceRecords.find((r) => r.studentId === sId);
          return !rec || rec.status === 'UNMARKED';
        });

      if (unmarkedStudentIds.length > 0) {
        return reply.status(400).send({
          error: `Không thể chốt buổi học: Còn ${unmarkedStudentIds.length} học viên chưa được điểm danh.`,
        });
      }

      const updatedSession = await fastify.prisma.classSession.update({
        where: { id: sessionId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          completedBy: user.id,
        },
      });

      return reply.send({ success: true, message: 'Đã chốt thành công buổi học.', session: updatedSession });
    },
  );

  // 4. GET /classes/:classId/attendance-matrix (Object-Level Authorization)
  fastify.get<{ Params: { classId: string } }>(
    '/classes/:classId/attendance-matrix',
    { preHandler: [authenticate] },
    async (request, reply) => {
      const user = request.user as { id: string; roles: string[] };
      const { classId } = request.params;

      const cls = await fastify.prisma.class.findUnique({
        where: { id: classId },
        select: { id: true, name: true, teacherId: true },
      });
      if (!cls) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });

      const isAdmin = user.roles.includes('admin');
      const isClassTeacher = user.roles.includes('teacher') && cls.teacherId === user.id;
      const isOtherTeacher = user.roles.includes('teacher') && cls.teacherId !== user.id;

      if (isOtherTeacher && !isAdmin) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const isStudent = !isAdmin && !isClassTeacher;
      if (isStudent) {
        const enrolled = await isStudentInClass(user.id, classId);
        if (!enrolled) {
          return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không thuộc lớp học này.' });
        }
      }

      const sessions = await fastify.prisma.classSession.findMany({
        where: { classId },
        orderBy: { sessionNumber: 'asc' },
      });

      const classStudents = await fastify.prisma.classStudent.findMany({
        where: {
          classId,
          ...(isStudent ? { studentId: user.id } : {}),
        },
        include: { student: true },
        orderBy: { joinedAt: 'asc' },
      });

      const sessionIds = sessions.map((s) => s.id);
      const allAttendance = await fastify.prisma.classAttendance.findMany({
        where: {
          sessionId: { in: sessionIds },
          ...(isStudent ? { studentId: user.id } : {}),
        },
      });

      const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');
      const completedSessionIds = new Set(completedSessions.map((s) => s.id));

      const matrix = classStudents.map((cs) => {
        const studentId = cs.studentId;
        const studentAttendance = allAttendance.filter((a) => a.studentId === studentId);

        let presentCount = 0;
        let lateCount = 0;
        let absentCount = 0;
        let excusedCount = 0;

        studentAttendance.forEach((att) => {
          if (completedSessionIds.has(att.sessionId)) {
            if (att.status === 'PRESENT') presentCount++;
            else if (att.status === 'LATE') lateCount++;
            else if (att.status === 'ABSENT') absentCount++;
            else if (att.status === 'EXCUSED') excusedCount++;
          }
        });

        const eligibleSessions = Math.max(0, completedSessions.length - excusedCount);
        const attendedCount = presentCount + lateCount;
        const attendanceRate =
          eligibleSessions > 0 ? Math.round((attendedCount / eligibleSessions) * 1000) / 10 : 100;

        const sessionRecords = sessions.map((s) => {
          const att = studentAttendance.find((a) => a.sessionId === s.id);
          return {
            sessionId: s.id,
            sessionNumber: s.sessionNumber,
            sessionDate: s.sessionDate,
            status: s.status,
            attendanceStatus: att ? att.status : 'UNMARKED',
            note: att?.note || null,
          };
        });

        return {
          studentId,
          studentName: cs.student?.fullName || cs.student?.email || '',
          avatarUrl: cs.student?.avatarUrl || null,
          email: cs.student?.email || '',
          presentCount,
          lateCount,
          absentCount,
          excusedCount,
          eligibleSessions,
          attendanceRate,
          sessions: sessionRecords,
        };
      });

      return reply.send({
        success: true,
        data: {
          classId,
          className: cls.name,
          totalSessions: sessions.length,
          completedSessions: completedSessions.length,
          sessions: sessions.map((s) => ({
            id: s.id,
            sessionNumber: s.sessionNumber,
            sessionDate: s.sessionDate,
            title: s.title,
            status: s.status,
          })),
          students: matrix,
        },
      });
    },
  );
};

export default fp(attendanceRoutes);
