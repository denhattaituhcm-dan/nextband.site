import { PrismaClient } from '@prisma/client';
import { ClassRepository } from '../repositories/class.repository.js';

export interface StudentLessonProgressDTO {
  sessionCompleted: boolean;
  homeworkSubmitted: boolean;
  homeworkGraded: boolean;
  lessonCompleted: boolean;
}

export interface StudentLessonItemDTO {
  id: string;
  title: string;
  description: string | null;
  lessonOrder: number;
  estimatedMinutes: number | null;
  status: string;
  sessionDate: Date | null;
  sessionNumber: number | null;
  resources: Array<{
    id: string;
    title: string;
    type: string;
    url: string;
  }>;
  homework: {
    id: string;
    title: string;
    deadline: Date | null;
    status: string;
    score: number | null;
  } | null;
  progress: StudentLessonProgressDTO;
}

export interface ClassLessonProjectionContract {
  classId: string;
  className: string;
  courseTitle: string;
  progress: {
    completedLessons: number;
    totalLessons: number;
    percentage: number;
  };
  lessons: StudentLessonItemDTO[];
}

export class LessonService {
  private classRepo: ClassRepository;

  constructor(private prisma: PrismaClient) {
    this.classRepo = new ClassRepository(prisma);
  }

  // Projection: GET /api/v1/classes/:classId/lessons
  async getClassLessonProjection(classId: string, userId: string, userRoles: string[]): Promise<ClassLessonProjectionContract> {
    const isTeacherOrAdmin = userRoles.includes('admin') || userRoles.includes('teacher');

    // 1. Authorization Check: Must be enrolled student or managing teacher/admin
    const classData = await this.classRepo.findById(classId);
    if (!classData) {
      throw new Error('Lớp học không tồn tại.');
    }

    if (!isTeacherOrAdmin) {
      const isEnrolled = await this.classRepo.isStudentInClass(classId, userId);
      if (!isEnrolled) {
        throw new Error('Bạn không có quyền truy cập lộ trình lớp học này.');
      }
    } else if (userRoles.includes('teacher') && !userRoles.includes('admin')) {
      if (classData.teacherId !== userId) {
        throw new Error('Bạn không có quyền quản lý lớp học này.');
      }
    }

    // 2. Fetch Course Lessons & Class Sessions
    const courseLessons = await this.prisma.lesson.findMany({
      where: { courseId: classData.courseId, status: 'PUBLISHED' },
      orderBy: { lessonOrder: 'asc' },
      include: { resources: true }
    });

    const classSessions = await this.prisma.classSession.findMany({
      where: { classId },
      include: {
        attendance: { where: { studentId: userId } },
        homeworks: {
          include: {
            submissions: { where: { studentId: userId } }
          }
        }
      }
    });

    const now = new Date();
    let completedLessonsCount = 0;

    const lessonsProjection: StudentLessonItemDTO[] = courseLessons.map(lesson => {
      const session = classSessions.find(s => s.lessonId === lesson.id);
      const attendanceRecord = session?.attendance[0] || null;
      const homework = session?.homeworks[0] || null;
      const submission = homework?.submissions[0] || null;

      const sessionCompleted = !!(session && new Date(session.sessionDate) <= now && (attendanceRecord?.status === 'PRESENT' || !attendanceRecord));
      const homeworkSubmitted = !!(submission && (submission.status === 'SUBMITTED' || submission.status === 'GRADED'));
      const homeworkGraded = !!(submission && submission.status === 'GRADED');
      const lessonCompleted = sessionCompleted && (homework ? homeworkGraded : true);

      if (lessonCompleted) completedLessonsCount++;

      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        lessonOrder: lesson.lessonOrder,
        estimatedMinutes: lesson.estimatedMinutes,
        status: lesson.status,
        sessionDate: session?.sessionDate || null,
        sessionNumber: session?.sessionNumber || null,
        resources: lesson.resources.map(r => ({
          id: r.id,
          title: r.title,
          type: r.type,
          url: r.url
        })),
        homework: homework ? {
          id: homework.id,
          title: homework.title,
          deadline: homework.deadline,
          status: submission ? submission.status : 'NOT_STARTED',
          score: submission?.score ? Number(submission.score) : null
        } : null,
        progress: {
          sessionCompleted,
          homeworkSubmitted,
          homeworkGraded,
          lessonCompleted
        }
      };
    });

    const totalLessons = courseLessons.length;
    const percentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    return {
      classId: classData.id,
      className: classData.name,
      courseTitle: classData.course.title,
      progress: {
        completedLessons: completedLessonsCount,
        totalLessons,
        percentage
      },
      lessons: lessonsProjection
    };
  }
}
