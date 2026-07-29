import { PrismaClient, AttendanceStatus } from '@prisma/client';
import { ClassRepository } from '../repositories/class.repository.js';

export interface MarkAttendanceItemDTO {
  studentId: string;
  status: AttendanceStatus;
  notes?: string;
}

export class AttendanceService {
  private classRepo: ClassRepository;

  constructor(private prisma: PrismaClient) {
    this.classRepo = new ClassRepository(prisma);
  }

  // 1. Fetch Session Attendance & Summary Projection
  async getSessionAttendance(classId: string, sessionId: string, userId: string, userRoles: string[]) {
    const isTeacherOrAdmin = userRoles.includes('admin') || userRoles.includes('teacher');
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
      where: { classId },
      include: { student: true }
    });

    const attendanceRecords = await this.prisma.classAttendance.findMany({
      where: { classSessionId: sessionId }
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
        notes: record?.notes || null
      };
    });

    return {
      classId,
      className: classData.name,
      sessionId,
      sessionTitle: session.title || session.lesson.title,
      sessionDate: session.sessionDate,
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

  // 2. Mark Session Attendance (Bulk Upsert Transaction + Strict Authorization Guard)
  async markSessionAttendance(classId: string, sessionId: string, teacherId: string, userRoles: string[], items: MarkAttendanceItemDTO[]) {
    const isTeacherOrAdmin = userRoles.includes('admin') || userRoles.includes('teacher');
    const classData = await this.classRepo.findById(classId);
    if (!classData) throw new Error('Lớp học không tồn tại.');

    // Strict Authorization Guard: Only managing Teacher or Admin can mark attendance
    if (userRoles.includes('teacher') && !userRoles.includes('admin') && classData.teacherId !== teacherId) {
      throw new Error('Bạn không có quyền lưu điểm danh cho lớp học này.');
    }

    await this.prisma.$transaction(
      items.map(item =>
        this.prisma.classAttendance.upsert({
          where: {
            classSessionId_studentId: {
              classSessionId: sessionId,
              studentId: item.studentId
            }
          },
          update: {
            status: item.status,
            markedBy: teacherId,
            notes: item.notes
          },
          create: {
            classSessionId: sessionId,
            studentId: item.studentId,
            markedBy: teacherId,
            status: item.status,
            notes: item.notes
          }
        })
      )
    );

    return { success: true, message: `Đã lưu điểm danh cho ${items.length} học viên.` };
  }
}
