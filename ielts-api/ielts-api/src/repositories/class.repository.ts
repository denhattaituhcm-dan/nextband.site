import { PrismaClient, Prisma } from "@prisma/client";

export class ClassRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string, include?: any) {
    return this.prisma.class.findUnique({
      where: { id },
      include: include || {
        course: true,
        teacher: {
          select: { id: true, fullName: true, email: true },
        },
        students: {
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { joinedAt: "desc" },
        },
      },
    });
  }

  async findMany(where: any, skip?: number, take?: number, orderBy?: any) {
    return this.prisma.class.findMany({
      where,
      skip,
      take,
      orderBy: orderBy || { createdAt: "desc" },
      include: {
        teacher: {
          select: { id: true, fullName: true, email: true },
        },
        _count: {
          select: { students: true },
        },
      },
    });
  }

  async count(where: any) {
    return this.prisma.class.count({ where });
  }

  async create(data: Prisma.ClassCreateInput) {
    return this.prisma.class.create({ data });
  }

  async update(id: string, data: Prisma.ClassUpdateInput) {
    return this.prisma.class.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.class.delete({
      where: { id },
    });
  }

  async isTeacherOfClass(classId: string, teacherId: string): Promise<boolean> {
    const cls = await this.prisma.class.findFirst({
      where: { id: classId, teacherId },
    });
    return !!cls;
  }

  async isStudentInClass(classId: string, studentId: string): Promise<boolean> {
    const cs = await this.prisma.classStudent.findFirst({
      where: { classId, studentId, deletedAt: null },
    });
    return !!cs;
  }

  async addStudent(classId: string, studentId: string) {
    return this.prisma.classStudent.create({
      data: { classId, studentId },
    });
  }

  async addStudentToClass(classId: string, studentId: string) {
    return this.addStudent(classId, studentId);
  }

  async removeStudent(classId: string, studentId: string) {
    return this.prisma.classStudent.update({
      where: {
        classId_studentId: { classId, studentId },
      },
      data: { deletedAt: new Date() },
    });
  }

  async removeStudentFromClass(classId: string, studentId: string) {
    return this.removeStudent(classId, studentId);
  }

  async getSchedule(classId: string) {
    return this.prisma.classSchedule.findMany({
      where: { classId, isActive: true },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  }

  async updateSchedule(classId: string, schedules: Array<{ dayOfWeek: number; startTime: string; durationMinutes: number }>) {
    return this.prisma.$transaction(async (tx) => {
      await tx.classSchedule.deleteMany({ where: { classId } });
      return tx.classSchedule.createMany({
        data: schedules.map((s) => ({ ...s, classId })),
      });
    });
  }

  async getAttendanceMatrix(classId: string, startDate?: Date, endDate?: Date) {
    const where: any = { session: { classId } };
    if (startDate || endDate) {
      where.session.sessionDate = {};
      if (startDate) where.session.sessionDate.gte = startDate;
      if (endDate) where.session.sessionDate.lte = endDate;
    }
    return this.prisma.classAttendance.findMany({
      where,
      orderBy: { createdAt: "asc" },
      include: {
        student: {
          select: { id: true, fullName: true, email: true },
        },
        session: true,
      },
    });
  }

  async getClassesForStudent(studentId: string) {
    return this.prisma.classStudent.findMany({
      where: {
        studentId,
        status: "ACTIVE",
        deletedAt: null,
      },
      include: {
        class: {
          include: {
            course: {
              select: { id: true, title: true, description: true },
            },
            teacher: {
              select: { id: true, fullName: true },
            },
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    });
  }

  async recordAttendance(data: {
    sessionId: string;
    studentId: string;
    teacherId: string;
    status: any;
    note?: string;
  }) {
    return this.prisma.classAttendance.upsert({
      where: {
        sessionId_studentId: {
          sessionId: data.sessionId,
          studentId: data.studentId,
        },
      },
      update: {
        status: data.status,
        note: data.note,
      },
      create: data,
    });
  }
}
