import { PrismaClient, EnrollmentStatus } from '@prisma/client';
import { HomeworkService } from './homework.service.js';

export class WorkspaceService {
  private homeworkService: HomeworkService;

  constructor(private prisma: PrismaClient) {
    this.homeworkService = new HomeworkService(prisma);
  }

  async getStudentWorkspace(studentId: string) {
    // 1. Fetch Student Profile
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
      },
    });

    if (!student) {
      throw new Error('Học viên không tồn tại.');
    }

    // 2. Fetch Class Enrollments (excluding soft-deleted)
    const classStudents = await this.prisma.classStudent.findMany({
      where: {
        studentId,
        deletedAt: null,
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            description: true,
            courseId: true,
            teacherId: true,
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    // Case 1: No Class Enrollments at all
    if (classStudents.length === 0) {
      return {
        state: 'NO_ENROLLMENT',
        student,
        classes: [],
        nextAction: null,
        announcements: [],
        notifications: [],
      };
    }

    // Map formatted classes with status
    const formattedClasses = classStudents.map((cs) => ({
      id: cs.class.id,
      name: cs.class.name,
      description: cs.class.description,
      courseTitle: cs.class.course?.title || '',
      status: cs.status as EnrollmentStatus,
      joinedAt: cs.joinedAt,
    }));

    const activeClasses = classStudents.filter(
      (cs) => (cs.status as string) === 'ACTIVE'
    );
    const suspendedClasses = classStudents.filter(
      (cs) => (cs.status as string) === 'SUSPENDED'
    );

    // Case 2: Has classes but none are ACTIVE
    if (activeClasses.length === 0) {
      const state =
        suspendedClasses.length > 0
          ? 'SUSPENDED_STUDENT'
          : 'PENDING_ACTIVATION';

      return {
        state,
        student,
        classes: formattedClasses,
        nextAction: null,
        announcements: [],
        notifications: [],
      };
    }

    // Case 3: Has ACTIVE class(es) -> Determine priority nextAction
    let nextAction: {
      type: 'HOMEWORK' | 'LESSON' | 'EXAM';
      targetId: string;
      title: string;
      classId: string;
      deadline?: string | null;
    } | null = null;

    try {
      const homeworkWorkspace =
        await this.homeworkService.getStudentHomeworkWorkspace(studentId);
      if (homeworkWorkspace.continue) {
        nextAction = {
          type: 'HOMEWORK',
          targetId: homeworkWorkspace.continue.homework.id,
          title: homeworkWorkspace.continue.homework.title,
          classId: homeworkWorkspace.continue.homework.classId,
          deadline: homeworkWorkspace.continue.homework.deadline
            ? new Date(
                homeworkWorkspace.continue.homework.deadline
              ).toISOString()
            : null,
        };
      }
    } catch {
      // Fallback gracefully if no continue task
    }

    // Fallback nextAction if no active homework task found: link to primary active class lesson viewer
    if (!nextAction && activeClasses.length > 0) {
      nextAction = {
        type: 'LESSON',
        targetId: activeClasses[0].classId,
        title: `Vào lớp ${activeClasses[0].class.name}`,
        classId: activeClasses[0].classId,
      };
    }

    return {
      state: 'ACTIVE_STUDENT',
      student,
      classes: formattedClasses,
      nextAction,
      announcements: [],
      notifications: [],
    };
  }
}
