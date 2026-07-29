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

  // Use Case: Student Dashboard Workspace Query (StudentWorkspaceContract)
  async getStudentHomeworkWorkspace(studentId: string) {
    const assigned = await this.homeworkRepo.findAssignedHomeworksForStudent(studentId);

    const now = new Date();
    let continueTask: any = null;
    const dueToday: any[] = [];
    const upcoming: any[] = [];
    const completed: any[] = [];

    assigned.forEach(hw => {
      const submission = hw.submissions[0] || null;
      const status = submission ? submission.status : 'NOT_STARTED';

      const taskItem = {
        id: hw.id,
        title: hw.title,
        className: hw.class.name,
        deadline: hw.deadline,
        status,
        score: submission?.score ? Number(submission.score) : null,
        feedback: submission?.feedback || null,
        actionUrl: status === 'GRADED' ? `/exam/${hw.examId || hw.id}/review` : `/exam/${hw.examId || hw.id}`
      };

      if (status === 'GRADED') {
        completed.push(taskItem);
      } else if (status === 'PENDING') {
        if (!continueTask) continueTask = taskItem;
        else upcoming.push(taskItem);
      } else if (hw.deadline && new Date(hw.deadline).toDateString() === now.toDateString()) {
        dueToday.push(taskItem);
      } else {
        if (!continueTask && status === 'NOT_STARTED') {
          continueTask = taskItem;
        } else {
          upcoming.push(taskItem);
        }
      }
    });

    return {
      continue: continueTask,
      dueToday,
      upcoming,
      completed
    };
  }

  // Use Case: Teacher Workspace Query (TeacherWorkspaceContract) - Only classes managed by teacher
  async getTeacherHomeworkWorkspace(teacherId: string) {
    // Find all homeworks created by or belonging to classes of teacher
    const homeworks = await this.prisma.homework.findMany({
      where: {
        OR: [
          { createdBy: teacherId },
          { class: { teacherId } }
        ]
      },
      include: {
        class: true,
        submissions: { include: { student: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const needGrading: any[] = [];
    const recentGraded: any[] = [];

    homeworks.forEach(hw => {
      hw.submissions.forEach(sub => {
        if (sub.status === 'SUBMITTED') {
          needGrading.push({
            homeworkId: hw.id,
            homeworkTitle: hw.title,
            className: hw.class.name,
            studentId: sub.studentId,
            studentName: sub.student.fullName || sub.student.email,
            submittedAt: sub.submittedAt,
            status: sub.status
          });
        } else if (sub.status === 'GRADED') {
          recentGraded.push({
            homeworkId: hw.id,
            homeworkTitle: hw.title,
            studentName: sub.student.fullName || sub.student.email,
            score: sub.score ? Number(sub.score) : null,
            gradedAt: sub.gradedAt
          });
        }
      });
    });

    return {
      needGrading,
      recentGraded
    };
  }
}
