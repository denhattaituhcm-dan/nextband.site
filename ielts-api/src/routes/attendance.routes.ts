import { FastifyPluginAsync } from 'fastify';
import crypto from 'node:crypto';
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

const attendanceRoutes: FastifyPluginAsync = async (fastify: any) => {
  const prisma = fastify.prisma;

  // 1. GET /classes/:classId/sessions/:sessionId/attendance
  fastify.get(
    '/classes/:classId/sessions/:sessionId/attendance',
    { preHandler: [authenticate] },
    async (request: any, reply: any) => {
      const user = request.user;
      const { classId, sessionId } = request.params;

      const clsRows: any[] = await prisma.$queryRawUnsafe('SELECT id, name, teacher_id as teacherId FROM classes WHERE id = ?', classId);
      if (!clsRows || clsRows.length === 0) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });
      const cls = clsRows[0];

      const sessRows: any[] = await prisma.$queryRawUnsafe('SELECT id, class_id as classId, session_number as sessionNumber, title, session_date as sessionDate, status, completed_at as completedAt FROM class_sessions WHERE id = ?', sessionId);
      if (!sessRows || sessRows.length === 0 || sessRows[0].classId !== classId) {
        return reply.status(404).send({ error: 'Buổi học không hợp lệ hoặc không thuộc lớp này.' });
      }
      const session = sessRows[0];

      const isAdmin = user.roles.includes('admin');
      const isClassTeacher = user.roles.includes('teacher') && cls.teacherId === user.id;
      const isOtherTeacher = user.roles.includes('teacher') && cls.teacherId !== user.id;

      if (isOtherTeacher && !isAdmin) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const isStudent = !isAdmin && !isClassTeacher;
      if (isStudent) {
        const enrRows: any[] = await prisma.$queryRawUnsafe('SELECT id FROM class_students WHERE class_id = ? AND student_id = ?', classId, user.id);
        if (!enrRows || enrRows.length === 0) {
          return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không thuộc danh sách học viên của lớp này.' });
        }

        const attRows: any[] = await prisma.$queryRawUnsafe('SELECT status, note FROM class_attendance WHERE session_id = ? AND student_id = ?', sessionId, user.id);
        const studentRecord = attRows && attRows.length > 0 ? attRows[0] : null;

        const userRows: any[] = await prisma.$queryRawUnsafe('SELECT id, full_name as fullName, email, avatar_url as avatarUrl FROM users WHERE id = ?', user.id);
        const studentUser = userRows && userRows.length > 0 ? userRows[0] : null;

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

      const classStudents: any[] = await prisma.$queryRawUnsafe(`
        SELECT cs.student_id as studentId, u.full_name as fullName, u.email, u.avatar_url as avatarUrl
        FROM class_students cs
        LEFT JOIN users u ON cs.student_id = u.id
        WHERE cs.class_id = ?
      `, classId);

      const attendanceRecords: any[] = await prisma.$queryRawUnsafe('SELECT student_id as studentId, status, note FROM class_attendance WHERE session_id = ?', sessionId);

      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;
      let excusedCount = 0;
      let unmarkedCount = 0;

      const studentsAttendance = classStudents.map((cs: any) => {
        const record = attendanceRecords.find((r: any) => r.studentId === cs.studentId);
        const status = record ? record.status : 'UNMARKED';

        if (status === 'PRESENT') presentCount++;
        else if (status === 'ABSENT') absentCount++;
        else if (status === 'LATE') lateCount++;
        else if (status === 'EXCUSED') excusedCount++;
        else unmarkedCount++;

        return {
          studentId: cs.studentId,
          studentName: cs.fullName || cs.email || '',
          avatarUrl: cs.avatarUrl || null,
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

  // 2. POST /classes/:classId/sessions/:sessionId/attendance
  fastify.post(
    '/classes/:classId/sessions/:sessionId/attendance',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request: any, reply: any) => {
      const user = request.user;
      const { classId, sessionId } = request.params;
      const body = markAttendanceSchema.parse(request.body);

      const clsRows: any[] = await prisma.$queryRawUnsafe('SELECT id, teacher_id as teacherId FROM classes WHERE id = ?', classId);
      if (!clsRows || clsRows.length === 0) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });
      const cls = clsRows[0];

      const isAdmin = user.roles.includes('admin');
      const isOwner = cls.teacherId === user.id;
      if (!isAdmin && !isOwner) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const sessRows: any[] = await prisma.$queryRawUnsafe('SELECT id, class_id as classId, session_date as sessionDate, status FROM class_sessions WHERE id = ?', sessionId);
      if (!sessRows || sessRows.length === 0 || sessRows[0].classId !== classId) {
        return reply.status(404).send({ error: 'Buổi học không hợp lệ hoặc không thuộc lớp này.' });
      }
      const session = sessRows[0];

      if (session.status === 'COMPLETED' && !isAdmin) {
        return reply.status(403).send({
          error: 'SESSION_ALREADY_COMPLETED',
          message: 'Buổi học đã chốt điểm danh (COMPLETED). Bạn không có quyền chỉnh sửa ngoại trừ Admin.',
        });
      }

      const requestedStudentIds = [...new Set(body.items.map((i: any) => i.studentId))];
      const placeholders = requestedStudentIds.map(() => '?').join(',');
      const activeRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT student_id as studentId FROM class_students WHERE class_id = ? AND student_id IN (${placeholders})`,
        classId,
        ...requestedStudentIds
      );

      const activeSet = new Set(activeRows.map((r: any) => r.studentId));
      const invalidStudentIds = requestedStudentIds.filter((id: any) => !activeSet.has(id));

      if (invalidStudentIds.length > 0) {
        return reply.status(400).send({
          error: 'INVALID_ENROLLMENT_STUDENT',
          message: `Phát hiện học viên (${invalidStudentIds.join(', ')}) không thuộc danh sách học viên của lớp học này.`,
        });
      }

      // Atomic Transaction: Raw SQL upsert
      const sessionDate = session.sessionDate || new Date();
      await prisma.$transaction(
        body.items.map((item: any) => {
          const itemNote = item.note || item.notes || null;
          const attId = crypto.randomUUID();
          return prisma.$executeRawUnsafe(
            `INSERT INTO class_attendance (id, class_id, session_id, student_id, teacher_id, session_date, status, note, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE status = VALUES(status), teacher_id = VALUES(teacher_id), note = VALUES(note)`,
            attId,
            classId,
            sessionId,
            item.studentId,
            user.id,
            sessionDate,
            item.status,
            itemNote
          );
        })
      );

      return reply.send({ success: true, message: `Đã lưu điểm danh cho ${body.items.length} học viên.` });
    },
  );

  // 3. POST /classes/:classId/sessions/:sessionId/complete
  fastify.post(
    '/classes/:classId/sessions/:sessionId/complete',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request: any, reply: any) => {
      const user = request.user;
      const { classId, sessionId } = request.params;

      const clsRows: any[] = await prisma.$queryRawUnsafe('SELECT id, teacher_id as teacherId FROM classes WHERE id = ?', classId);
      if (!clsRows || clsRows.length === 0) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });
      const cls = clsRows[0];

      const isAdmin = user.roles.includes('admin');
      const isOwner = cls.teacherId === user.id;
      if (!isAdmin && !isOwner) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const sessRows: any[] = await prisma.$queryRawUnsafe('SELECT id, class_id as classId FROM class_sessions WHERE id = ?', sessionId);
      if (!sessRows || sessRows.length === 0 || sessRows[0].classId !== classId) {
        return reply.status(404).send({ error: 'Buổi học không hợp lệ hoặc không thuộc lớp này.' });
      }

      const activeStudents: any[] = await prisma.$queryRawUnsafe('SELECT student_id as studentId FROM class_students WHERE class_id = ?', classId);
      const attendanceRecords: any[] = await prisma.$queryRawUnsafe('SELECT student_id as studentId, status FROM class_attendance WHERE session_id = ?', sessionId);

      const unmarkedStudentIds = activeStudents
        .map((s: any) => s.studentId)
        .filter((sId: any) => {
          const rec = attendanceRecords.find((r: any) => r.studentId === sId);
          return !rec || rec.status === 'UNMARKED';
        });

      if (unmarkedStudentIds.length > 0) {
        return reply.status(400).send({
          error: `Không thể chốt buổi học: Còn ${unmarkedStudentIds.length} học viên chưa được điểm danh.`,
        });
      }

      await prisma.$executeRawUnsafe(
        'UPDATE class_sessions SET status = "COMPLETED", completed_at = NOW(), completed_by = ? WHERE id = ?',
        user.id,
        sessionId
      );

      return reply.send({ success: true, message: 'Đã chốt thành công buổi học.' });
    },
  );

  // 4. GET /classes/:classId/attendance-matrix
  fastify.get(
    '/classes/:classId/attendance-matrix',
    { preHandler: [authenticate] },
    async (request: any, reply: any) => {
      const user = request.user;
      const { classId } = request.params;

      const clsRows: any[] = await prisma.$queryRawUnsafe('SELECT id, name, teacher_id as teacherId FROM classes WHERE id = ?', classId);
      if (!clsRows || clsRows.length === 0) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });
      const cls = clsRows[0];

      const isAdmin = user.roles.includes('admin');
      const isClassTeacher = user.roles.includes('teacher') && cls.teacherId === user.id;
      const isOtherTeacher = user.roles.includes('teacher') && cls.teacherId !== user.id;

      if (isOtherTeacher && !isAdmin) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      const isStudent = !isAdmin && !isClassTeacher;
      if (isStudent) {
        const enrRows: any[] = await prisma.$queryRawUnsafe('SELECT id FROM class_students WHERE class_id = ? AND student_id = ?', classId, user.id);
        if (!enrRows || enrRows.length === 0) {
          return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không thuộc lớp học này.' });
        }
      }

      const sessions: any[] = await prisma.$queryRawUnsafe('SELECT id, session_number as sessionNumber, title, session_date as sessionDate, status FROM class_sessions WHERE class_id = ? ORDER BY session_number ASC', classId);

      const classStudents: any[] = isStudent
        ? await prisma.$queryRawUnsafe(`
            SELECT cs.student_id as studentId, u.full_name as fullName, u.email, u.avatar_url as avatarUrl
            FROM class_students cs
            LEFT JOIN users u ON cs.student_id = u.id
            WHERE cs.class_id = ? AND cs.student_id = ?
          `, classId, user.id)
        : await prisma.$queryRawUnsafe(`
            SELECT cs.student_id as studentId, u.full_name as fullName, u.email, u.avatar_url as avatarUrl
            FROM class_students cs
            LEFT JOIN users u ON cs.student_id = u.id
            WHERE cs.class_id = ?
            ORDER BY cs.joined_at ASC
          `, classId);

      const sessionIds = sessions.map((s: any) => s.id);
      let allAttendance: any[] = [];
      if (sessionIds.length > 0) {
        const sessPlaceholders = sessionIds.map(() => '?').join(',');
        allAttendance = await prisma.$queryRawUnsafe(
          `SELECT session_id as sessionId, student_id as studentId, status, note FROM class_attendance WHERE session_id IN (${sessPlaceholders})`,
          ...sessionIds
        );
      }

      const completedSessions = sessions.filter((s: any) => s.status === 'COMPLETED');
      const completedSessionIds = new Set(completedSessions.map((s: any) => s.id));

      const matrix = classStudents.map((cs: any) => {
        const studentId = cs.studentId;
        const studentAttendance = allAttendance.filter((a: any) => a.studentId === studentId);

        let presentCount = 0;
        let lateCount = 0;
        let absentCount = 0;
        let excusedCount = 0;

        studentAttendance.forEach((att: any) => {
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

        const sessionRecords = sessions.map((s: any) => {
          const att = studentAttendance.find((a: any) => a.sessionId === s.id);
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
          studentName: cs.fullName || cs.email || '',
          avatarUrl: cs.avatarUrl || null,
          email: cs.email || '',
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
          sessions: sessions.map((s: any) => ({
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

  // 5. GET /classes/:classId/sessions - Danh sách toàn bộ buổi học của lớp
  fastify.get(
    '/classes/:classId/sessions',
    { preHandler: [authenticate] },
    async (request: any, reply: any) => {
      const { classId } = request.params;
      const sessions: any[] = await prisma.$queryRawUnsafe(
        'SELECT id, class_id as classId, session_number as sessionNumber, title, session_date as sessionDate, planned_date as plannedDate, start_time as startTime, end_time as endTime, status, note, reschedule_reason as rescheduleReason, completed_at as completedAt FROM class_sessions WHERE class_id = ? ORDER BY session_number ASC',
        classId
      );
      return reply.send(sessions || []);
    }
  );

  // 6. POST /classes/:classId/sessions/:sessionId/unlock - Mở lại điểm danh buổi học đã chốt
  fastify.post(
    '/classes/:classId/sessions/:sessionId/unlock',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request: any, reply: any) => {
      const user = request.user;
      const { classId, sessionId } = request.params;

      const clsRows: any[] = await prisma.$queryRawUnsafe('SELECT id, teacher_id as teacherId FROM classes WHERE id = ?', classId);
      if (!clsRows || clsRows.length === 0) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });
      const cls = clsRows[0];

      const isAdmin = user.roles.includes('admin');
      const isOwner = cls.teacherId === user.id;
      if (!isAdmin && !isOwner) {
        return reply.status(403).send({ error: 'Từ chối truy cập: Bạn không phải giáo viên phụ trách lớp học này.' });
      }

      await prisma.$executeRawUnsafe(
        'UPDATE class_sessions SET status = "SCHEDULED", completed_at = NULL, completed_by = NULL WHERE id = ?',
        sessionId
      );

      return reply.send({ success: true, message: 'Đã mở lại điểm danh buổi học thành công.' });
    }
  );

  // 7. POST /classes/:classId/sessions/generate - Sinh hàng loạt buổi học từ lịch học
  fastify.post(
    '/classes/:classId/sessions/generate',
    { preHandler: [authenticate, requireRoles('admin', 'teacher')] },
    async (request: any, reply: any) => {
      const { classId } = request.params;
      const { startDate, weekdays = [1, 3, 5], totalSessions = 24, startTime = '18:00', endTime = '20:00' } = request.body || {};

      const clsRows: any[] = await prisma.$queryRawUnsafe('SELECT id, teacher_id as teacherId FROM classes WHERE id = ?', classId);
      if (!clsRows || clsRows.length === 0) return reply.status(404).send({ error: 'Lớp học không tồn tại.' });

      const dates: string[] = [];
      const [y, m, d] = (startDate || new Date().toISOString().slice(0, 10)).split('-').map(Number);
      const cur = new Date(y, m - 1, d);

      while (dates.length < totalSessions) {
        const dow = cur.getDay();
        if (weekdays.includes(dow)) {
          const mm = String(cur.getMonth() + 1).padStart(2, '0');
          const dd = String(cur.getDate()).padStart(2, '0');
          dates.push(`${cur.getFullYear()}-${mm}-${dd}`);
        }
        cur.setDate(cur.getDate() + 1);
      }

      const createdSessions = [];
      for (let i = 0; i < dates.length; i++) {
        const sessId = crypto.randomUUID();
        const sessionNum = i + 1;
        const sessionDate = dates[i];
        const title = `Lesson ${sessionNum}`;

        await prisma.$executeRawUnsafe(
          `INSERT INTO class_sessions (id, class_id, session_number, title, session_date, planned_date, start_time, end_time, status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'SCHEDULED', NOW(), NOW())
           ON DUPLICATE KEY UPDATE session_date = VALUES(session_date), title = VALUES(title), start_time = VALUES(start_time), end_time = VALUES(end_time)`,
          sessId, classId, sessionNum, title, sessionDate, sessionDate, startTime, endTime
        );
        createdSessions.push({ id: sessId, sessionNumber: sessionNum, sessionDate, title, status: 'SCHEDULED' });
      }

      return reply.send(createdSessions);
    }
  );
};

export default attendanceRoutes;
