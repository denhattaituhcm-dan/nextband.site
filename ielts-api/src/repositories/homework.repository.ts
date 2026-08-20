import { PrismaClient, Prisma, SubmissionStatus } from '@prisma/client';

export class HomeworkRepository {
  constructor(private prisma: PrismaClient | Prisma.TransactionClient) {}

  async findById(id: string) {
    return this.prisma.homework.findUnique({
      where: { id },
      include: {
        class: true,
        lesson: true,
        exam: true,
        submissions: { include: { student: true } }
      }
    });
  }

  async findAssignedHomeworksForStudent(studentId: string) {
    // Lấy tất cả Homework của các Lớp mà Student đang tham gia
    return this.prisma.homework.findMany({
      where: {
        class: {
          students: { some: { studentId } }
        },
        status: 'PUBLISHED'
      },
      orderBy: { deadline: 'asc' },
      include: {
        class: true,
        submissions: { where: { studentId } }
      }
    });
  }

  async createHomework(data: Prisma.HomeworkCreateInput) {
    return this.prisma.homework.create({ data });
  }

  async upsertSubmission(data: {
    homeworkId: string;
    studentId: string;
    status: SubmissionStatus;
    submittedAt?: Date;
    gradedAt?: Date;
    score?: Prisma.Decimal | number;
    feedback?: string;
  }) {
    return this.prisma.submission.upsert({
      where: { homeworkId_studentId: { homeworkId: data.homeworkId, studentId: data.studentId } },
      update: {
        status: data.status,
        submittedAt: data.submittedAt,
        gradedAt: data.gradedAt,
        score: data.score,
        feedback: data.feedback
      },
      create: {
        homeworkId: data.homeworkId,
        studentId: data.studentId,
        status: data.status,
        submittedAt: data.submittedAt,
        gradedAt: data.gradedAt,
        score: data.score,
        feedback: data.feedback
      }
    });
  }
}
