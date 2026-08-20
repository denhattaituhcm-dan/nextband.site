import { PrismaClient, Prisma, SubmissionStatus, NotificationType } from '@prisma/client';
import { HomeworkRepository } from '../repositories/homework.repository.js';
import { AuthorizationService, AuthorizationError, NotFoundError } from './authorization.service.js';
import { NotificationService } from './notification.service.js';

export class SubmissionService {
  private homeworkRepo: HomeworkRepository;
  private authService: AuthorizationService;
  private notificationService: NotificationService;

  constructor(private prisma: PrismaClient) {
    this.homeworkRepo = new HomeworkRepository(prisma);
    this.authService = new AuthorizationService(prisma);
    this.notificationService = new NotificationService(prisma);
  }

  // Use Case: Student Submits Homework (Object-level check: Student must be in class)
  async submitHomework(homeworkId: string, studentId: string) {
    const homework = await this.homeworkRepo.findById(homeworkId);
    if (!homework) {
      throw new NotFoundError('Bài tập không tồn tại.');
    }

    const isEnrolled = await this.authService.isStudentEnrolledInClass(studentId, homework.classId);
    if (!isEnrolled) {
      throw new AuthorizationError('Từ chối truy cập: Bạn không thuộc lớp học có bài tập này.', 403);
    }

    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: { fullName: true, email: true },
    });
    const studentName = student?.fullName || student?.email || 'Học viên';

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const repo = new HomeworkRepository(tx);
      const submission = await repo.upsertSubmission({
        homeworkId,
        studentId,
        status: SubmissionStatus.SUBMITTED,
        submittedAt: new Date(),
      });

      // Authoritative Recipient: Teacher assigned to class
      const teacherId = (homework as any).class?.teacherId;
      if (teacherId) {
        await this.notificationService.createNotification(tx, {
          userId: teacherId,
          type: NotificationType.NEW_SUBMISSION,
          title: `Bài nộp mới: ${homework.title}`,
          message: `Học viên ${studentName} vừa nộp bài tập "${homework.title}".`,
          link: `/admin/classes/${homework.classId}`,
          entityType: 'SUBMISSION',
          entityId: submission.id,
        });
      }

      return submission;
    });
  }

  // Use Case: Teacher Grades Submission with Score & Markdown Feedback (Authoritative Gate: Teacher must own class or Admin)
  async gradeSubmission(
    data: {
      homeworkId: string;
      studentId: string;
      score: number;
      feedback: string;
    },
    grader: {
      userId: string;
      userRoles: string[];
    }
  ) {
    // Authoritative Gate check: Teacher owns class of homework or Admin
    await this.authService.requireSubmissionTeacherOrAdmin({
      userId: grader.userId,
      userRoles: grader.userRoles,
      homeworkId: data.homeworkId,
      studentId: data.studentId,
    });

    const homework = await this.homeworkRepo.findById(data.homeworkId);

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const repo = new HomeworkRepository(tx);
      const submission = await repo.upsertSubmission({
        homeworkId: data.homeworkId,
        studentId: data.studentId,
        status: SubmissionStatus.GRADED,
        score: data.score,
        feedback: data.feedback,
        gradedAt: new Date(),
      });

      // Recipient: Student who submitted
      await this.notificationService.createNotification(tx, {
        userId: data.studentId,
        type: NotificationType.SUBMISSION_GRADED,
        title: `Bài tập đã được chấm điểm: ${homework?.title || 'Bài tập'}`,
        message: `Giáo viên đã chấm bài "${homework?.title || ''}" với điểm số ${data.score}.`,
        link: homework ? `/client/classes/${homework.classId}` : null,
        entityType: 'SUBMISSION',
        entityId: submission.id,
      });

      return submission;
    });
  }
}
