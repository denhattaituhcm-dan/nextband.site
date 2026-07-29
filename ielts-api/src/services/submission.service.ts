import { PrismaClient, SubmissionStatus } from '@prisma/client';
import { HomeworkRepository } from '../repositories/homework.repository.js';

export class SubmissionService {
  private homeworkRepo: HomeworkRepository;

  constructor(private prisma: PrismaClient) {
    this.homeworkRepo = new HomeworkRepository(prisma);
  }

  // Use Case: Student Submits Homework
  async submitHomework(homeworkId: string, studentId: string) {
    const homework = await this.homeworkRepo.findById(homeworkId);
    if (!homework) {
      throw new Error('Bài tập không tồn tại.');
    }

    return this.homeworkRepo.upsertSubmission({
      homeworkId,
      studentId,
      status: SubmissionStatus.SUBMITTED,
      submittedAt: new Date()
    });
  }

  // Use Case: Teacher Grades Submission with Score & Markdown Feedback
  async gradeSubmission(data: {
    homeworkId: string;
    studentId: string;
    score: number;
    feedback: string;
  }) {
    const submission = await this.homeworkRepo.findSubmission(data.homeworkId, data.studentId);
    if (!submission) {
      throw new Error('Không tìm thấy bài nộp của học viên.');
    }

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
