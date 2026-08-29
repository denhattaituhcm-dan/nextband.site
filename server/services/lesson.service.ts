import { PrismaClient } from '@prisma/client';
import { ClassRepository } from '../repositories/class.repository.js';
import { AuthorizationService, AuthorizationError, NotFoundError } from './authorization.service.js';
import { resolveEffectiveDeadline, calculateSubmissionTiming, compareHomeworkOrder, DeadlineSource } from '../utils/deadline.util.js';

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
    deadlineSource?: DeadlineSource;
    submissionTiming?: {
      isLate: boolean;
      lateDays: number;
    };
    status: string;
    score: number | null;
  } | null;
  submission: any | null;
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
  private authService: AuthorizationService;

  constructor(private prisma: PrismaClient) {
    this.classRepo = new ClassRepository(prisma);
    this.authService = new AuthorizationService(prisma);
  }

  // Projection: GET /classes/:classId/lessons
  async getClassLessonProjection(classId: string, userId: string, userRoles: string[]): Promise<ClassLessonProjectionContract> {
    const isTeacherOrAdmin = userRoles.includes('admin') || userRoles.includes('teacher');

    // 1. Authorization Check: Must be enrolled student or managing teacher/admin
    // Targeted query for class metadata + specific student enrollment (avoids full relation over-fetching)
    const classData = await this.prisma.class.findUnique({
      where: { id: classId },
      select: {
        id: true,
        name: true,
        courseId: true,
        teacherId: true,
        startDate: true,
        createdAt: true,
        course: {
          select: { title: true },
        },
        students: !isTeacherOrAdmin
          ? {
              where: { studentId: userId },
              select: { id: true, status: true },
            }
          : false,
      },
    });

    if (!classData) {
      throw new NotFoundError('Lớp học không tồn tại.');
    }

    if (!isTeacherOrAdmin) {
      const isEnrolled = classData.students && classData.students.length > 0;
      if (!isEnrolled) {
        throw new AuthorizationError('Bạn không có quyền truy cập lộ trình lớp học này.', 403);
      }
    } else if (userRoles.includes('teacher') && !userRoles.includes('admin')) {
      if (classData.teacherId !== userId) {
        throw new AuthorizationError('Bạn không có quyền quản lý lớp học này.', 403);
      }
    }

    // 2. Parallel Fetch: Course Exams, Student Submissions, Manual Homework overrides & Class Sessions
    const courseId = classData.courseId;
    let exams: any[] = [];
    let submissions: any[] = [];
    let manualHomeworks: any[] = [];
    let sessions: any[] = [];

    if (courseId) {
      let submissionWhere: any;
      if (!isTeacherOrAdmin) {
        submissionWhere = {
          studentId: userId,
          exam: { courseId },
        };
      } else {
        const classStudents = await this.prisma.classStudent.findMany({
          where: { classId, deletedAt: null, status: 'ACTIVE' },
          select: { studentId: true },
        });
        const studentIds = classStudents.map((cs) => cs.studentId);
        submissionWhere = {
          studentId: { in: studentIds.length > 0 ? studentIds : ['__none__'] },
          exam: { courseId },
        };
      }

      const [fetchedExams, fetchedSubmissions, fetchedAssignments, fetchedSessions] = await Promise.all([
        this.prisma.exam.findMany({
          where: { courseId, isPublished: true },
          orderBy: { week: 'asc' },
          include: { sections: true },
        }),
        this.prisma.examSubmission.findMany({
          where: submissionWhere,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.classExamAssignment.findMany({
          where: { classId },
        }),
        this.prisma.classSession.findMany({
          where: { classId },
          orderBy: { sessionNumber: 'asc' },
        }),
      ]);
      exams = [...fetchedExams].sort(compareHomeworkOrder);
      submissions = fetchedSubmissions;
      manualHomeworks = fetchedAssignments;
      sessions = fetchedSessions;
    }

    let completedCount = 0;

    const lessonsProjection: StudentLessonItemDTO[] = exams.map((exam: any, idx: number) => {
      const lessonSubs = isTeacherOrAdmin
        ? submissions.filter((s: any) => s.examId === exam.id)
        : [submissions.find((s: any) => s.examId === exam.id)].filter(Boolean);

      const sub = lessonSubs[0] || null;
      const isGraded = lessonSubs.some((s: any) => s.status === 'GRADED' || s.status === 'graded');
      const isSubmitted = lessonSubs.some(
        (s: any) => s.status === 'SUBMITTED' || s.status === 'submitted' || s.status === 'GRADED' || s.status === 'graded'
      );

      if (isGraded || isSubmitted) completedCount++;

      const lessonOrder = idx + 1;
      const lessonWeek = exam.week || Math.ceil((idx + 1) / 3);
      const customAssignment = manualHomeworks.find((h: any) => h.examId === exam.id);
      const matchingSession = sessions.find((s: any) => s.sessionNumber === lessonOrder);
      const sessionDate = matchingSession?.plannedDate || null;

      const { effectiveDeadline, deadlineSource } = resolveEffectiveDeadline({
        classStartDate: classData.startDate || classData.createdAt,
        sessionDate,
        lessonWeek,
        manualDeadline: customAssignment?.deadline,
        defaultOffsetDays: 7,
      });

      const submissionTiming = sub
        ? calculateSubmissionTiming(sub.submittedAt || sub.createdAt, effectiveDeadline)
        : { isLate: false, lateDays: 0 };

      return {
        id: exam.id,
        title: exam.title,
        description: exam.description || null,
        lessonOrder,
        estimatedMinutes: exam.durationMinutes || 60,
        status: exam.isPublished ? 'PUBLISHED' : 'DRAFT',
        sessionDate,
        sessionNumber: matchingSession?.sessionNumber || lessonOrder,
        resources: [],
        sections: exam.sections || [],
        exam_sections: exam.sections || [],
        homework: {
          id: exam.id,
          title: exam.title,
          deadline: effectiveDeadline,
          deadlineSource,
          submissionTiming,
          status: sub ? String(sub.status).toUpperCase() : 'NOT_STARTED',
          score: sub?.totalScore != null ? Number(sub.totalScore) : null,
        },
        submission: sub || null,
        progress: {
          sessionCompleted: true,
          homeworkSubmitted: isSubmitted,
          homeworkGraded: isGraded,
          lessonCompleted: isGraded,
        },
      };
    });


    const totalLessons = exams.length;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return {
      classId: classData.id,
      className: classData.name,
      courseTitle: (classData as any).course?.title || classData.name,
      progress: {
        completedLessons: completedCount,
        totalLessons,
        percentage,
      },
      lessons: lessonsProjection,
    };
  }

  // Projection: GET /classes/:classId/progress
  async getClassProgressProjection(classId: string, userId: string, userRoles: string[]) {
    const projection = await this.getClassLessonProjection(classId, userId, userRoles);
    return {
      classId: projection.classId,
      className: projection.className,
      courseTitle: projection.courseTitle,
      progress: projection.progress,
    };
  }
}
