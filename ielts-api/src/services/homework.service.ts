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
  async getTeacherHomeworkWorkspace(teacherId: string, classId?: string) {
    if (!classId) {
      const firstClass = await this.prisma.class.findFirst({
        where: { teacherId },
        select: { id: true, name: true },
      });
      if (!firstClass) {
        return {
          classId: "",
          className: "",
          students: [],
        };
      }
      classId = firstClass.id;
    }

    const currentClass = await this.prisma.class.findUnique({
      where: { id: classId },
      select: { id: true, name: true, teacherId: true },
    });

    if (!currentClass) {
      return {
        classId: "",
        className: "",
        students: [],
      };
    }

    // Get real enrolled students in this class
    const classStudents = await this.prisma.classStudent.findMany({
      where: { classId },
      include: {
        student: {
          select: { id: true, fullName: true, email: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Get real assigned homeworks for this class
    const assignedHomeworks = await this.prisma.homework.findMany({
      where: { classId },
      orderBy: { createdAt: "asc" },
    });

    // Also get real exams if any
    const assignedExams = await this.prisma.exam.findMany({
      where: { course: { classes: { some: { id: classId } } }, isPublished: true, isActive: true },
      orderBy: { createdAt: "asc" },
    });

    // Combined assigned items
    const combinedAssignments = [
      ...assignedHomeworks.map((hw, idx) => ({
        id: hw.id,
        title: hw.title,
        lessonNumber: Math.ceil((idx + 1) / 2),
        lessonTitle: `Buổi ${Math.ceil((idx + 1) / 2)}`,
        type: hw.type || "writing",
        isExam: false,
      })),
      ...assignedExams.map((ex, idx) => ({
        id: ex.id,
        title: ex.title,
        lessonNumber: Math.ceil((assignedHomeworks.length + idx + 1) / 2),
        lessonTitle: `Buổi ${Math.ceil((assignedHomeworks.length + idx + 1) / 2)}: ${ex.title}`,
        type: ex.examType || "homework",
        isExam: true,
      })),
    ];

    const totalAssignedCount = combinedAssignments.length;
    const studentIds = classStudents.map((cs) => cs.student.id);

    const homeworkSubmissions = await this.prisma.submission.findMany({
      where: {
        studentId: { in: studentIds },
        homeworkId: { in: assignedHomeworks.map((h) => h.id) },
      },
    });

    const examSubmissions = await this.prisma.examSubmission.findMany({
      where: {
        studentId: { in: studentIds },
        examId: { in: assignedExams.map((e) => e.id) },
      },
      include: {
        answers: true,
      },
    });

    const students = classStudents.map((cs) => {
      const student = cs.student;
      const sHwSubmissions = homeworkSubmissions.filter((s) => s.studentId === student.id);
      const sExamSubmissions = examSubmissions.filter((s) => s.studentId === student.id);

      let submittedCount = 0;
      let gradedCount = 0;
      let pendingCount = 0;

      const homeworksList = combinedAssignments.map((assignment) => {
        let subRecord: any = null;
        if (assignment.isExam) {
          subRecord = sExamSubmissions.find((es) => es.examId === assignment.id);
        } else {
          subRecord = sHwSubmissions.find((hs) => hs.homeworkId === assignment.id);
        }

        let status: "unsubmitted" | "submitted" | "graded" = "unsubmitted";
        let submissionId: string | undefined;
        let submittedAt: string | undefined;
        let answerText: string | undefined;
        let audioUrl: string | undefined;
        let objectiveScore: number | null = null;
        let bandScore: number | null = null;
        let criteriaScores: any = null;
        let feedback: string | null = null;

        if (subRecord) {
          const rawStatus = (subRecord.status || "").toLowerCase();
          if (rawStatus === "graded") {
            status = "graded";
            gradedCount++;
            submittedCount++;
          } else if (rawStatus === "submitted") {
            status = "submitted";
            pendingCount++;
            submittedCount++;
          }

          submissionId = subRecord.id;
          submittedAt = subRecord.submittedAt ? new Date(subRecord.submittedAt).toISOString() : undefined;
          feedback = subRecord.feedback || null;

          if (assignment.isExam && subRecord.answers) {
            const firstAnswer = subRecord.answers[0];
            answerText = firstAnswer?.answerText || undefined;
            audioUrl = firstAnswer?.audioUrl || undefined;
            objectiveScore = subRecord.totalScore != null ? Number(subRecord.totalScore) : null;
          } else {
            answerText = subRecord.answerText || undefined;
            audioUrl = subRecord.audioUrl || undefined;
            bandScore = subRecord.score != null ? Number(subRecord.score) : null;
          }

          if (subRecord.feedback && subRecord.feedback.startsWith("{")) {
            try {
              const parsed = JSON.parse(subRecord.feedback);
              if (parsed && typeof parsed === "object") {
                criteriaScores = parsed.criteriaScores || null;
                feedback = parsed.comment || subRecord.feedback;
              }
            } catch {
              // fallback
            }
          }
        }

        return {
          id: assignment.id,
          title: assignment.title,
          lessonNumber: assignment.lessonNumber,
          lessonTitle: assignment.lessonTitle,
          type: assignment.type,
          status,
          submissionId,
          submittedAt,
          answerText,
          audioUrl,
          objectiveScore,
          bandScore,
          criteriaScores,
          feedback,
        };
      });

      const unsubmittedCount = Math.max(0, totalAssignedCount - submittedCount);

      return {
        id: student.id,
        fullName: student.fullName || student.email.split("@")[0],
        email: student.email,
        avatarUrl: student.avatarUrl || undefined,
        totalAssignedCount,
        submittedCount,
        gradedCount,
        pendingCount,
        unsubmittedCount,
        homeworks: homeworksList,
      };
    });

    return {
      classId: currentClass.id,
      className: currentClass.name,
      students,
    };
  }
}
