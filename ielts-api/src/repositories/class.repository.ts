import { PrismaClient, Prisma, AttendanceStatus } from '@prisma/client';

export class ClassRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.class.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: true,
        students: { include: { student: true } },
        sessions: {
          orderBy: { sessionDate: 'asc' },
          include: { lesson: true, attendance: true }
        }
      }
    });
  }

  async findClassesByStudentId(studentId: string) {
    return this.prisma.classStudent.findMany({
      where: { studentId },
      include: {
        class: {
          include: {
            course: true,
            teacher: true,
            sessions: {
              orderBy: { sessionDate: 'asc' },
              include: { lesson: true }
            }
          }
        }
      }
    });
  }

  async create(data: Prisma.ClassCreateInput) {
    return this.prisma.class.create({ data });
  }

  async addStudentToClass(classId: string, studentId: string) {
    return this.prisma.classStudent.create({
      data: { classId, studentId }
    });
  }

  async isStudentInClass(classId: string, studentId: string) {
    const record = await this.prisma.classStudent.findUnique({
      where: { classId_studentId: { classId, studentId } }
    });
    return !!record;
  }

  async createSession(data: Prisma.ClassSessionCreateInput) {
    return this.prisma.classSession.create({ data, include: { lesson: true } });
  }

  async recordAttendance(data: { sessionId: string; studentId: string; teacherId: string; status: AttendanceStatus; note?: string }) {
    return this.prisma.classAttendance.upsert({
      where: { sessionId_studentId: { sessionId: data.sessionId, studentId: data.studentId } },
      update: { status: data.status, note: data.note, teacherId: data.teacherId },
      create: data
    });
  }
}
