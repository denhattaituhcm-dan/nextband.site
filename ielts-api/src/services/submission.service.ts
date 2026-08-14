import { PrismaClient, SubmissionStatus } from '@prisma/client';
import { HomeworkRepository } from '../repositories/homework.repository.js';
import { AuthorizationService, AuthorizationError, NotFoundError } from './authorization.service.js';

export class SubmissionService {
  private homeworkRepo: HomeworkRepository;
  private authService: AuthorizationService;

  constructor(private prisma: PrismaClient) {
    this.homeworkRepo = new HomeworkRepository(prisma);
    this.authService = new AuthorizationService(prisma);
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

    return this.homeworkRepo.upsertSubmission({
      homeworkId,
      studentId,
      status: SubmissionStatus.SUBMITTED,
      submittedAt: new Date()
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

    return this.homeworkRepo.upsertSubmission({
      homeworkId: data.homeworkId,
      studentId: data.studentId,
      status: SubmissionStatus.GRADED,
      score: data.score,
      feedback: data.feedback,
      gradedAt: new Date()
    });
  }
}
