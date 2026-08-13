import { PrismaClient, AttendanceStatus, ClassSessionStatus } from '@prisma/client';
import { ClassRepository } from '../repositories/class.repository.js';

export interface MarkAttendanceItemDTO {
  studentId: string;
  status: AttendanceStatus;
  note?: string;
  notes?: string;
}

export class AttendanceService {
  private classRepo: ClassRepository;

  constructor(private prisma: PrismaClient) {
    this.classRepo = new ClassRepository(prisma);
  }

  // 1. Fetch Session Attendance & Summary Projection
  async getSessionAttendance(classId: string, sessionId: string, userId: string, userRoles: string[]) {
    const classData = await this.classRepo.findById(classId);
    if (!classData) throw new Error('Lớp học không tồn tại.');

    if (userRoles.includes('teacher') && !userRoles.includes('admin') && classData.teacherId !== userId) {
      throw new Error('Bạn không có quyền điểm danh lớp học này.');
    }

    const session = await this.prisma.classSession.findUnique({
      where: { id: sessionId },
      include: { lesson: true }
    });
    if (!session || session.classId !== classId) throw new Error('Buổi học không hợp lệ.');

    const classStudents = await this.prisma.classStudent.findMany({
      where: { classId, deletedAt: null },
      include: { student: true }
    });

    const attendanceRecords = await this.prisma.classAttendance.findMany({
      where: { sessionId }
    });

    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let excusedCount = 0;
    let unmarkedCount = 0;

    const studentsAttendance = classStudents.map(cs => {
      const record = attendanceRecords.find(r => r.studentId === cs.studentId);
      const status: AttendanceStatus = record ? record.status : 'UNMARKED';

      if (status === 'PRESENT') presentCount++;
      else if (status === 'ABSENT') absentCount++;
      else if (status === 'LATE') lateCount++;
      else if (status === 'EXCUSED') excusedCount++;
      else unmarkedCount++;

      return {
        studentId: cs.studentId,
        studentName: cs.student.fullName || cs.student.email,
        avatarUrl: cs.student.avatarUrl,
        status,
        note: record?.note || null
      };
    });

    return {
      classId,
      className: classData.name,
      sessionId,
      sessionNumber: session.sessionNumber,
      sessionTitle: session.title || session.lesson.title,
      sessionDate: session.sessionDate,
      status: session.status,
      completedAt: session.completedAt,
      summary: {
        total: classStudents.length,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        excused: excusedCount,
        unmarked: unmarkedCount
      },
      students: studentsAttendance
    };
  }

  // 2. Mark Session Attendance (Bulk Upsert Transaction + Strict Authorization Guard + Read-only Guard for COMPLETED sessions)
  async markSessionAttendance(classId: string, sessionId: string, teacherId: string, userRoles: string[], items: MarkAttendanceItemDTO[]) {
    const classData = await this.classRepo.findById(classId);
    if (!classData) throw new Error('Lớp học không tồn tại.');

    const isAdmin = userRoles.includes('admin');
    if (userRoles.includes('teacher') && !isAdmin && classData.teacherId !== teacherId) {
      throw new Error('Bạn không có quyền lưu điểm danh cho lớp học này.');
    }

    const session = await this.prisma.classSession.findUnique({ where: { id: sessionId } });
    if (!session || session.classId !== classId) throw new Error('Buổi học không hợp lệ.');

    // Immutability Guard: If session is already COMPLETED, only Admin can edit
    if (session.status === ClassSessionStatus.COMPLETED && !isAdmin) {
      throw new Error('Buổi học đã chốt điểm danh (COMPLETED). Bạn không có quyền chỉnh sửa ngoại trừ Admin.');
    }

    await this.prisma.$transaction(
      items.map(item => {
        const itemNote = item.note || item.notes || null;
        return this.prisma.classAttendance.upsert({
          where: {
            sessionId_studentId: {
              sessionId: sessionId,
              studentId: item.studentId
            }
          },
          update: {
            status: item.status,
            teacherId: teacherId,
            note: itemNote
          },
          create: {
            sessionId: sessionId,
            studentId: item.studentId,
            teacherId: teacherId,
            status: item.status,
            note: itemNote
          }
        });
      })
    );

    return { success: true, message: `Đã lưu điểm danh cho ${items.length} học viên.` };
  }

  // 3. Complete Session Guard: Chốt buổi học (Khóa 100% điểm danh)
  async completeSession(classId: string, sessionId: string, userId: string, userRoles: string[]) {
    const classData = await this.classRepo.findById(classId);
    if (!classData) throw new Error('Lớp học không tồn tại.');

    const isAdmin = userRoles.includes('admin');
    if (userRoles.includes('teacher') && !isAdmin && classData.teacherId !== userId) {
      throw new Error('Bạn không có quyền chốt buổi học này.');
    }

    const session = await this.prisma.classSession.findUnique({ where: { id: sessionId } });
    if (!session || session.classId !== classId) throw new Error('Buổi học không hợp lệ.');

    // Check active class students
    const activeStudents = await this.prisma.classStudent.findMany({
      where: { classId, deletedAt: null },
      select: { studentId: true }
    });

    const attendanceRecords = await this.prisma.classAttendance.findMany({
      where: { sessionId }
    });

    const unmarkedStudentIds = activeStudents
      .map(s => s.studentId)
      .filter(sId => {
        const rec = attendanceRecords.find(r => r.studentId === sId);
        return !rec || rec.status === 'UNMARKED';
      });

    if (unmarkedStudentIds.length > 0) {
      throw new Error(`Không thể chốt buổi học: Còn ${unmarkedStudentIds.length} học viên chưa được điểm danh.`);
    }

    const updatedSession = await this.prisma.classSession.update({
      where: { id: sessionId },
      data: {
        status: ClassSessionStatus.COMPLETED,
        completedAt: new Date(),
        completedBy: userId
      }
    });

    return { success: true, message: 'Đã chốt thành công buổi học.', session: updatedSession };
  }

  // 4. Get Attendance Matrix & Backend Calculated Attendance Rate
  async getAttendanceMatrix(classId: string) {
    const classData = await this.classRepo.findById(classId);
    if (!classData) throw new Error('Lớp học không tồn tại.');

    const sessions = await this.prisma.classSession.findMany({
      where: { classId },
      include: { lesson: true },
      orderBy: { sessionNumber: 'asc' }
    });

    const classStudents = await this.prisma.classStudent.findMany({
      where: { classId, deletedAt: null },
      include: { student: true },
      orderBy: { joinedAt: 'asc' }
    });

    const sessionIds = sessions.map(s => s.id);
    const allAttendance = await this.prisma.classAttendance.findMany({
      where: { sessionId: { in: sessionIds } }
    });

    const completedSessions = sessions.filter(s => s.status === ClassSessionStatus.COMPLETED);
    const completedSessionIds = new Set(completedSessions.map(s => s.id));

    const matrix = classStudents.map(cs => {
      const studentId = cs.studentId;
      const studentAttendance = allAttendance.filter(a => a.studentId === studentId);

      let presentCount = 0;
      let lateCount = 0;
      let absentCount = 0;
      let excusedCount = 0;

      // Only calculate for COMPLETED sessions
      studentAttendance.forEach(att => {
        if (completedSessionIds.has(att.sessionId)) {
          if (att.status === 'PRESENT') presentCount++;
          else if (att.status === 'LATE') lateCount++;
          else if (att.status === 'ABSENT') absentCount++;
          else if (att.status === 'EXCUSED') excusedCount++;
        }
      });

      const eligibleSessions = Math.max(0, completedSessions.length - excusedCount);
      const attendedCount = presentCount + lateCount;
      const attendanceRate = eligibleSessions > 0 ? Math.round((attendedCount / eligibleSessions) * 1000) / 10 : 100;

      const sessionRecords = sessions.map(s => {
        const att = studentAttendance.find(a => a.sessionId === s.id);
        return {
          sessionId: s.id,
          sessionNumber: s.sessionNumber,
          sessionDate: s.sessionDate,
          status: s.status,
          attendanceStatus: att ? att.status : 'UNMARKED',
          note: att?.note || null
        };
      });

      return {
        studentId,
        studentName: cs.student.fullName || cs.student.email,
        avatarUrl: cs.student.avatarUrl,
        email: cs.student.email,
        presentCount,
        lateCount,
        absentCount,
        excusedCount,
        eligibleSessions,
        attendanceRate,
        sessions: sessionRecords
      };
    });

    const attendanceCoverage = sessions.length > 0 ? Math.round((completedSessions.length / sessions.length) * 1000) / 10 : 0;

    return {
      classId,
      className: classData.name,
      totalSessions: sessions.length,
      completedSessions: completedSessions.length,
      attendanceCoverage,
      sessions: sessions.map(s => ({
        id: s.id,
        sessionNumber: s.sessionNumber,
        sessionDate: s.sessionDate,
        lessonTitle: s.lesson.title,
        status: s.status
      })),
      students: matrix
    };
  }
}

