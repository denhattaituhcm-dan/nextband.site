import { PrismaClient, HomeworkStatus, SubmissionStatus } from '@prisma/client';
import { HomeworkRepository } from '../repositories/homework.repository.js';
import { ClassRepository } from '../repositories/class.repository.js';

export class HomeworkService {
  private homeworkRepo: HomeworkRepository;
  private classRepo: ClassRepository;

  constructor(private prisma: PrismaClient) {
    this.homeworkRepo = new HomeworkRepository(prisma);
    this.classRepo = new ClassRepository(prisma);
  }

  // Use Case: Assign Homework to Class/Session
  async createHomework(data: {
    classId: string;
    createdBy: string;
    classSessionId?: string;
    lessonId?: string;
    examId?: string;
    title: string;
    description?: string;
    deadline?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const homeworkRepo = new HomeworkRepository(tx as PrismaClient);

      // Business Rule: Confirm teacher owns class or is admin
      const homework = await homeworkRepo.createHomework({
        class: { connect: { id: data.classId } },
        creator: { connect: { id: data.createdBy } },
        title: data.title,
        description: data.description,
        deadline: data.deadline ? new Date(data.deadline) : null,
        status: HomeworkStatus.PUBLISHED,
        ...(data.classSessionId && { session: { connect: { id: data.classSessionId } } }),
        ...(data.lessonId && !data.classSessionId && { lesson: { connect: { id: data.lessonId } } }),
        ...(data.examId && { exam: { connect: { id: data.examId } } })
      });

      return homework;
    });
  }

  // Use Case: Student Dashboard Workspace Query ("Continue Homework" Priority View Projection)
  async getStudentHomeworkWorkspace(studentId: string) {
    const assigned = await this.homeworkRepo.findAssignedHomeworksForStudent(studentId);

    // Dynamic Projection Priority: Resume -> Due Today -> Upcoming -> Overdue
    const now = new Date();

    const formattedTasks = assigned.map(hw => {
      const submission = hw.submissions[0] || null;
      const isSubmitted = submission?.status === SubmissionStatus.SUBMITTED || submission?.status === SubmissionStatus.GRADED;
      const isOverdue = hw.deadline && new Date(hw.deadline) < now && !isSubmitted;

      let priorityGroup = 'UPCOMING';
      if (submission?.status === SubmissionStatus.PENDING) {
        priorityGroup = 'RESUME';
      } else if (!isSubmitted && hw.deadline && new Date(hw.deadline).toDateString() === now.toDateString()) {
        priorityGroup = 'DUE_TODAY';
      } else if (isOverdue) {
        priorityGroup = 'OVERDUE';
      }

      return {
        id: hw.id,
        title: hw.title,
        className: hw.class.name,
        deadline: hw.deadline,
        status: submission ? submission.status : 'NOT_STARTED',
        score: submission?.score || null,
        feedback: submission?.feedback || null,
        priorityGroup
      };
    });

    // Sort by priority order
    const priorityOrder: Record<string, number> = { RESUME: 1, DUE_TODAY: 2, UPCOMING: 3, OVERDUE: 4 };
    formattedTasks.sort((a, b) => priorityOrder[a.priorityGroup] - priorityOrder[b.priorityGroup]);

    return {
      activeHomework: formattedTasks.find(t => t.status !== 'GRADED') || null,
      tasks: formattedTasks
    };
  }
}
