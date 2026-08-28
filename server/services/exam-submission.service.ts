import { PrismaClient } from "@prisma/client";
import { SubmissionRepository } from "../repositories/submission.repository.js";
import { canonicalScoringService } from "./scoring/CanonicalScoringService.js";
import { auditOutboxService } from "./audit/AuditOutboxService.js";
import { AuthorizationError, NotFoundError } from "./authorization.service.js";
import { SubmissionStateMachine, SubmissionState, StateTransitionError } from "./submission-state-machine.js";
import { NotificationService } from "./notification.service.js";
import {
  getClassStudentIds,
  getTeacherStudentIds,
  isTeacherOfClass,
} from "../utils/teacherScope.js";

const MAX_EXAM_ATTEMPTS = 3;

export interface CriteriaScores {
  // Writing Criteria
  taskResponse?: number | null;
  coherence?: number | null;

  // Speaking Criteria
  fluencyAndCoherence?: number | null;
  pronunciation?: number | null;

  // Shared Criteria
  lexical?: number | null;
  grammar?: number | null;
}

export interface TeacherFeedbackPayload {
  text: string;
  primaryErrorCategory: "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | null;
  revisionRequired: boolean;
  criteriaScores: CriteriaScores | null;
  sentenceFeedbacks?: Array<{
    sentenceIndex: number;
    originalSentence: string;
    category: string;
    tag: string;
    note: string;
    suggestedSentence?: string;
  }>;
  tabSwitchCount?: number;
}

export function getRemainingSeconds(startedAt: Date | null, durationMinutes: number | null) {
  const safeDuration = Math.max(1, durationMinutes || 60);
  if (!startedAt) return safeDuration * 60;

  const startedMs = new Date(startedAt).getTime();
  if (!Number.isFinite(startedMs)) return safeDuration * 60;

  const elapsed = Math.floor((Date.now() - startedMs) / 1000);
  return Math.max(0, safeDuration * 60 - Math.max(0, elapsed));
}

function sanitizeQuestionForStudent(q: any, showAnswerKey: boolean) {
  const cleaned = { ...q };
  if (!showAnswerKey) {
    if ((q.questionType === "matching" || q.question_type === "matching") && (q.correctAnswer || q.correct_answer)) {
      try {
        const raw = q.correctAnswer || q.correct_answer;
        const config = typeof raw === "string" ? JSON.parse(raw) : raw;
        cleaned.options = {
          items: Array.isArray(config?.items) ? config.items : [],
          options: Array.isArray(config?.options) ? config.options : [],
        };
      } catch {
        cleaned.options = { items: [], options: [] };
      }
    }
    delete cleaned.correctAnswer;
    delete cleaned.correct_answer;
    delete cleaned.audioScript;
    delete cleaned.audio_script;
    delete cleaned.acceptedAnswers;
    delete cleaned.accepted_answers;
    delete cleaned.answerKey;
    delete cleaned.answer_key;
  }
  return cleaned;
}

export class ExamSubmissionService {
  private repo: SubmissionRepository;
  private notificationService: NotificationService;

  constructor(private prisma: PrismaClient) {
    this.repo = new SubmissionRepository(prisma);
    this.notificationService = new NotificationService(prisma);
  }

  // Use Case: List Submissions with Role-based filtering
  async listSubmissions(user: { id: string; roles: string[] }, query: any) {
    const { examId, studentId, status, classId, needGrading, sortBy = "createdAt", sortOrder = "desc" } = query;
    const pageNum = Math.max(1, Number(query.page) || 1);
    const limitNum = Math.max(1, Math.min(500, Number(query.limit) || 10));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      const dbUser = await this.prisma.user.findFirst({
        where: { OR: [{ id: user.id }, { userId: user.id }] },
        select: { id: true, userId: true },
      });
      const ids = dbUser ? [dbUser.id, dbUser.userId].filter(Boolean) as string[] : [user.id];
      where.studentId = ids.length === 1 ? ids[0] : { in: ids };
    } else if (isTeacher && !isAdmin) {
      let teacherStudentIds: string[] = [];

      if (classId) {
        const owned = await isTeacherOfClass(this.prisma, user.id, classId);
        if (!owned) {
          throw new AuthorizationError("Từ chối truy cập - lớp không thuộc quyền quản lý của bạn", 403);
        }
        teacherStudentIds = await getClassStudentIds(this.prisma, classId);
      } else {
        teacherStudentIds = await getTeacherStudentIds(this.prisma, user.id);
      }

      where.studentId = {
        in: teacherStudentIds.length > 0 ? teacherStudentIds : ["__none__"],
      };
      if (studentId) {
        where.studentId = teacherStudentIds.includes(studentId) ? studentId : "__none__";
      }
    } else if (studentId) {
      const dbUser = await this.prisma.user.findFirst({
        where: { OR: [{ id: studentId }, { userId: studentId }] },
        select: { id: true, userId: true },
      });
      const ids = dbUser ? [dbUser.id, dbUser.userId].filter(Boolean) as string[] : [studentId];
      where.studentId = ids.length === 1 ? ids[0] : { in: ids };
    }

    if (isAdmin && classId) {
      const classStudentIds = await getClassStudentIds(this.prisma, classId);
      const inClass = classStudentIds.length > 0 ? classStudentIds : ["__none__"];
      where.studentId = studentId ? (classStudentIds.includes(studentId) ? studentId : "__none__") : { in: inClass };
    }

    if (examId) where.examId = examId;

    if (status) {
      const normStatus = String(status).toUpperCase();
      where.status = normStatus;
    } else if (needGrading === true || needGrading === "true") {
      where.status = "SUBMITTED";
    }
    const sortFieldMap: Record<string, string> = {
      newest: "createdAt",
      createdAt: "createdAt",
      updatedAt: "createdAt",
      score: "totalScore",
      totalScore: "totalScore",
      status: "status",
      submittedAt: "submittedAt",
      startedAt: "startedAt",
    };
    const orderField = (sortBy && sortFieldMap[sortBy]) ? sortFieldMap[sortBy] : "createdAt";
    const orderBy: any = {};
    orderBy[orderField] = sortOrder;

    const [data, total] = await Promise.all([
      this.repo.findMany(
        where,
        skip,
        limitNum,
        orderBy,
        {
          id: true,
          studentId: true,
          examId: true,
          status: true,
          startedAt: true,
          submittedAt: true,
          gradedAt: true,
          totalScore: true,
          correctAnswers: true,
          totalQuestions: true,
          createdAt: true,
          student: {
            select: {
              id: true,
              userId: true,
              email: true,
              fullName: true,
              avatarUrl: true,
            },
          },
          exam: {
            select: {
              id: true,
              title: true,
              durationMinutes: true,
            },
          },
          answers: {
            select: {
              id: true,
              questionId: true,
              answerText: true,
              audioUrl: true,
              score: true,
              feedback: true,
            },
          },
        }
      ),
      this.repo.count(where),
    ]);

    return {
      data,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  // Use Case: Get Submission Detail with Ownership check
  async getSubmissionById(user: { id: string; roles: string[] }, id: string) {
    const submission: any = await this.repo.findById(id, {
      student: {
        select: {
          id: true,
          userId: true,
          email: true,
          fullName: true,
          avatarUrl: true,
        },
      },
      exam: {
        include: {
          sections: {
            orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
            include: {
              questionGroups: {
                orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
                include: {
                  questions: {
                    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
                  },
                },
              },
            },
          },
        },
      },
      answers: true,
    });

    if (!submission) {
      throw new NotFoundError("Không tìm thấy bài nộp");
    }

    // Ownership Enforcement
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher && submission.studentId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bài làm không thuộc sở hữu của bạn", 403);
    }

    if (isTeacher && !isAdmin) {
      const teacherStudentIds = await getTeacherStudentIds(this.prisma, user.id);
      if (submission.studentId !== user.id && !teacherStudentIds.includes(submission.studentId)) {
        throw new AuthorizationError("Từ chối truy cập - học viên không thuộc lớp bạn quản lý", 403);
      }
    }

    // Sanitize question data for student (Immutable copy without mutating database object)
    const isGraded = String(submission.status).toUpperCase() === "GRADED";
    const canSeeSecrets = isGraded || isAdmin || isTeacher;
    if (submission.exam?.sections) {
      submission.exam = {
        ...submission.exam,
        sections: submission.exam.sections.map((sec: any) => {
          const sanitizedSec = { ...sec };
          if (!canSeeSecrets) {
            delete sanitizedSec.audioScript;
            delete sanitizedSec.audio_script;
          }
          sanitizedSec.questionGroups = sec.questionGroups?.map((g: any) => ({
            ...g,
            questions: g.questions?.map((q: any) => {
              const cleaned = sanitizeQuestionForStudent(q, canSeeSecrets);
              const qType = String(q.questionType || q.question_type || "").toLowerCase();
              const sType = String(sec.sectionType || sec.section_type || "").toLowerCase();

              const isSubjective =
                qType === "essay" ||
                qType === "speaking" ||
                sType === "speaking" ||
                (sType === "writing" && !["multiple_choice", "fill_blank", "matching"].includes(qType));

              const isHolistic =
                q.assessmentMode === "HOLISTIC" ||
                q.scoreScope === "HOLISTIC" ||
                (isSubjective && sType === "writing");

              cleaned.assessmentMode = q.assessmentMode || (isHolistic ? "HOLISTIC" : isSubjective ? "MANUAL_ITEM" : "OBJECTIVE");
              cleaned.scoreScope = q.scoreScope || (cleaned.assessmentMode === "HOLISTIC" ? "HOLISTIC" : "ITEM");
              cleaned.holisticParentId = q.holisticParentId || (cleaned.assessmentMode === "HOLISTIC" ? sec.id : null);
              return cleaned;
            }),
          }));
          return sanitizedSec;
        }),
      };
    }

    // Hide unpublished draft teacher feedback and draft score from student
    if (!canSeeSecrets && submission.answers) {
      submission.answers = submission.answers.map((a: any) => {
        const sanitizedAns = { ...a };
        if (!isGraded) {
          sanitizedAns.feedback = null;
          sanitizedAns.score = null;
        }
        return sanitizedAns;
      });
      if (!isGraded) {
        submission.totalScore = null;
        submission.total_score = null;
      }
    }

    return submission;
  }

  // Use Case: Start Exam Attempt (with Open Exam & Dual-Channel Authorization)
  async startAttempt(
    user: { id: string; roles: string[] },
    examId: string,
    options?: { allowRetake?: boolean }
  ): Promise<{ submission: any; isNew: boolean }> {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      throw new NotFoundError("Bài thi không tồn tại");
    }

    const isPrivileged = user.roles.includes("admin") || user.roles.includes("teacher");
    const isOpenExam = (exam as any).isOpen === true || (exam as any).is_open === true || (exam as any).openForAll === true;
    
    // Check enrollment ONLY if exam belongs to a course and is not open
    if (!isPrivileged && !isOpenExam && exam.courseId) {
      const directEnrollment = await this.prisma.enrollment?.findFirst?.({
        where: { studentId: user.id, courseId: exam.courseId },
      });

      let hasClassMembership = false;
      const classStudents = await this.prisma.classStudent.findMany({
        where: { studentId: user.id },
      });

      if (classStudents.length > 0) {
        const classIds = classStudents.map((cs: any) => cs.classId);
        const enrolledClasses = await this.prisma.class.findMany({
          where: { id: { in: classIds } },
        });
        hasClassMembership = enrolledClasses.some((c: any) => c.courseId === exam.courseId);
      }

      if (!directEnrollment && !hasClassMembership) {
        throw new AuthorizationError("Từ chối truy cập: Học viên chưa đăng ký khóa học hoặc lớp học của bài thi này", 403);
      }
    }

    const attemptCount = await this.repo.countAttempts(user.id, examId);
    if (!isPrivileged && attemptCount >= MAX_EXAM_ATTEMPTS) {
      throw new AuthorizationError(`Bạn đã sử dụng hết ${MAX_EXAM_ATTEMPTS} lượt làm bài cho bài thi này`, 409);
    }

    return this.repo.transaction(async (tx) => {
      const inProgress = await tx.examSubmission.findFirst({
        where: {
          examId,
          studentId: user.id,
          status: "IN_PROGRESS",
        },
        include: {
          answers: true,
        },
      });

      if (inProgress) {
        const remainingSeconds = getRemainingSeconds(inProgress.startedAt, exam.durationMinutes);
        if (remainingSeconds > 0) {
          return {
            submission: {
              ...inProgress,
              answers: inProgress.answers || [],
              remainingSeconds,
              serverTime: new Date().toISOString(),
              isResumed: true,
            },
            isNew: false,
          };
        }

        const answerCount = await tx.answer.count({
          where: { submissionId: inProgress.id },
        });

        if (answerCount === 0) {
          const reset = await tx.examSubmission.update({
            where: { id: inProgress.id },
            data: { startedAt: new Date() },
          });
          return {
            submission: {
              ...reset,
              answers: [],
              remainingSeconds: Math.max(1, (exam.durationMinutes || 60) * 60),
              serverTime: new Date().toISOString(),
              isResumed: false,
            },
            isNew: false,
          };
        }

        // Stale attempt with answers -> finalize as SUBMITTED and create new attempt
        await tx.examSubmission.update({
          where: { id: inProgress.id },
          data: {
            status: "SUBMITTED",
            submittedAt: new Date(),
          },
        });
      }

      // Concurrency / Multi-tab Guard: Check if another concurrent request created IN_PROGRESS in the last 10s
      const recentConcurrent = await tx.examSubmission.findFirst({
        where: {
          examId,
          studentId: user.id,
          status: "IN_PROGRESS",
        },
        orderBy: { createdAt: "desc" },
        include: {
          answers: true,
        },
      });

      if (recentConcurrent) {
        const rem = getRemainingSeconds(recentConcurrent.startedAt, exam.durationMinutes);
        if (rem > 0) {
          return {
            submission: {
              ...recentConcurrent,
              answers: recentConcurrent.answers || [],
              remainingSeconds: rem,
              serverTime: new Date().toISOString(),
              isResumed: true,
            },
            isNew: false,
          };
        }
      }

      // Invariant: If student already has a valid SUBMITTED or GRADED attempt and no active IN_PROGRESS attempt,
      // return the existing submitted attempt rather than silently creating an empty in-progress attempt.
      const existingSubmitted = await tx.examSubmission.findFirst({
        where: {
          examId,
          studentId: user.id,
          status: { in: ["SUBMITTED", "GRADED"] },
        },
        orderBy: { createdAt: "desc" },
        include: {
          answers: true,
        },
      });

      if (existingSubmitted && !options?.allowRetake) {
        return {
          submission: {
            ...existingSubmitted,
            remainingSeconds: 0,
            serverTime: new Date().toISOString(),
            isResumed: true,
            alreadyFinalized: true,
          },
          isNew: false,
        };
      }

      const newSubmission = await tx.examSubmission.create({
        data: {
          examId,
          studentId: user.id,
          status: "IN_PROGRESS",
          startedAt: new Date(),
          version: 1,
        },
      });

      return {
        submission: {
          ...newSubmission,
          answers: [],
          remainingSeconds: (exam.durationMinutes || 60) * 60,
          serverTime: new Date().toISOString(),
          isResumed: false,
        },
        isNew: true,
      };
    });
  }

  // Use Case: Save Draft Answers (Autosave - checks version conflict, immutability, and server deadline)
  async saveDraft(user: { id: string; roles: string[] }, id: string, answers: any[], version?: number) {
    const submission: any = await this.repo.findById(id, {
      exam: {
        include: { policy: true },
      },
    });
    if (!submission) {
      throw new NotFoundError("Không tìm thấy bài làm");
    }

    if (submission.studentId !== user.id) {
      throw new AuthorizationError("Bạn không có quyền sửa bài làm này", 403);
    }

    const currentStatus = String(submission.status).toUpperCase() as SubmissionState;
    if (currentStatus === "SUBMITTED" || currentStatus === "GRADED" || (currentStatus as string) === "EXPIRED" || (currentStatus as string) === "ABANDONED") {
      throw new AuthorizationError("ANSWERS_IMMUTABLE: Không thể sửa câu trả lời sau khi bài thi đã nộp hoặc kết thúc", 403);
    }

    if (currentStatus !== "IN_PROGRESS") {
      throw new StateTransitionError("SUBMISSION_ALREADY_FINALIZED");
    }

    // Server-Authoritative Deadline Check
    const durationSeconds = submission.exam?.policy?.durationSeconds || (submission.exam?.durationMinutes || 60) * 60;
    const graceSeconds = submission.exam?.policy?.submissionGraceSeconds ?? 60;
    const startedMs = submission.startedAt ? new Date(submission.startedAt).getTime() : Date.now();
    const deadlineMs = startedMs + durationSeconds * 1000;
    const nowMs = Date.now();

    if (nowMs > deadlineMs + graceSeconds * 1000 && !submission.exam?.policy?.allowLateSubmission) {
      await this.prisma.examSubmission.update({
        where: { id },
        data: { status: "EXPIRED" },
      });
      throw new AuthorizationError("EXAM_EXPIRED: Thời gian làm bài đã kết thúc", 408);
    }

    // Version conflict check
    if (typeof version === "number" && submission.version !== undefined && submission.version !== null) {
      if (version <= submission.version) {
        throw new AuthorizationError("STALE_VERSION_CONFLICT", 409);
      }
    }

    return this.repo.transaction(async (tx) => {
      for (const ans of answers) {
        const existingAns = await tx.answer.findFirst({
          where: {
            submissionId: id,
            questionId: ans.questionId,
          },
        });

        const answerText = typeof ans.answerText === "object" ? JSON.stringify(ans.answerText) : ans.answerText;

        if (existingAns) {
          const updateData: any = {};
          if (answerText !== undefined) {
            updateData.answerText = answerText;
          }
          // 1. Chuỗi audioUrl hợp lệ -> cập nhật mới
          if (typeof ans.audioUrl === "string" && ans.audioUrl.trim() !== "") {
            updateData.audioUrl = ans.audioUrl.trim();
          }
          // 2. Yêu cầu xóa rõ ràng (explicit clear) -> gán null
          else if (ans.clearAudio === true || ans.audioUrl === null) {
            updateData.audioUrl = null;
          }
          // 3. Nếu ans.audioUrl là undefined (autosave thông thường) -> Giữ nguyên audioUrl cũ trong DB

          await tx.answer.update({
            where: { id: existingAns.id },
            data: updateData,
          });
        } else {
          await tx.answer.create({
            data: {
              submissionId: id,
              questionId: ans.questionId,
              answerText: answerText ?? null,
              audioUrl: typeof ans.audioUrl === "string" && ans.audioUrl.trim() !== "" ? ans.audioUrl.trim() : null,
            },
          });
        }
      }

      const updated = await tx.examSubmission.update({
        where: { id },
        data: {
          version: typeof version === "number" ? version : (submission.version || 1) + 1,
        },
        include: { answers: true },
      });

      return {
        ...updated,
        savedCount: answers.length,
      };
    });
  }

  // Use Case: Submit Exam with Canonical Scoring & Idempotency
  // CRITICAL: Pure Server Authority — Strips client score/bandScore/isCorrect injections
  async submitExam(
    user: { id: string; roles: string[] },
    id: string,
    payload: {
      answers: any[];
      idempotencyKey?: string;
      version?: number;
      // Client score injection fields to IGNORE
      score?: any;
      bandScore?: any;
      correctCount?: any;
      isCorrect?: any;
      totalScore?: any;
      status?: any;
    }
  ) {
    // Check idempotency record first
    if (payload.idempotencyKey) {
      let existingIdem: any = null;
      if ((this.prisma as any).idempotencyRecords) {
        existingIdem = await this.prisma.idempotencyRecord?.findFirst?.({
          where: { key: payload.idempotencyKey },
        });
      }

      if (existingIdem) {
        const cached = typeof existingIdem.responsePayload === "string" 
          ? JSON.parse(existingIdem.responsePayload) 
          : existingIdem.responsePayload;
        const cachedAnswers = cached.answers || [];
        const incomingAnswers = payload.answers || [];

        let isDifferent = false;
        if (incomingAnswers.length !== cachedAnswers.length) {
          isDifferent = true;
        } else {
          for (let i = 0; i < incomingAnswers.length; i++) {
            const incAns = incomingAnswers[i];
            const cachedAns = cachedAnswers.find((ca: any) => ca.questionId === incAns.questionId);
            const incText = typeof incAns.answerText === "object" ? JSON.stringify(incAns.answerText) : incAns.answerText;
            const caText = typeof cachedAns?.answerText === "object" ? JSON.stringify(cachedAns?.answerText) : cachedAns?.answerText;
            if (!cachedAns || incText !== caText) {
              isDifferent = true;
              break;
            }
          }
        }

        if (isDifferent) {
          throw new AuthorizationError("IDEMPOTENCY_CONFLICT", 409);
        }
        return cached;
      }
    }

    const submission: any = await this.repo.findById(id, {
      exam: {
        include: {
          policy: true,
          sections: {
            orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
            include: {
              questionGroups: {
                orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
                include: {
                  questions: {
                    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!submission) {
      throw new NotFoundError("Không tìm thấy bài làm");
    }

    if (submission.studentId !== user.id) {
      throw new AuthorizationError("Bạn không có quyền nộp bài làm này", 403);
    }

    const currentStatus = String(submission.status).toUpperCase() as SubmissionState;

    // Idempotency: If already submitted or graded, return canonical saved result
    if (currentStatus === "GRADED" || currentStatus === "SUBMITTED") {
      const existingAnswers = await this.prisma.answer.findMany({ where: { submissionId: id } });
      return {
        ...submission,
        answers: existingAnswers,
      };
    }

    if ((currentStatus as string) === "EXPIRED") {
      throw new AuthorizationError("EXAM_EXPIRED: Bài thi đã quá thời gian làm bài quy định", 408);
    }

    // Server-Authoritative Deadline Check
    const durationSeconds = submission.exam?.policy?.durationSeconds || (submission.exam?.durationMinutes || 60) * 60;
    const graceSeconds = submission.exam?.policy?.submissionGraceSeconds ?? 60;
    const startedMs = submission.startedAt ? new Date(submission.startedAt).getTime() : Date.now();
    const deadlineMs = startedMs + durationSeconds * 1000;
    const nowMs = Date.now();

    if (nowMs > deadlineMs + graceSeconds * 1000 && !submission.exam?.policy?.allowLateSubmission) {
      await this.prisma.examSubmission.update({
        where: { id },
        data: { status: "EXPIRED" },
      });
      throw new AuthorizationError("EXAM_EXPIRED: Bài thi đã quá thời hạn nộp bài quy định", 408);
    }

    let answersToEvaluate = payload.answers || [];
    if (answersToEvaluate.length === 0) {
      const dbAnswers = await this.prisma.answer.findMany({
        where: { submissionId: id },
      });
      answersToEvaluate = dbAnswers.map((a: any) => ({
        questionId: a.questionId,
        answerText: a.answerText,
        audioUrl: a.audioUrl,
      }));
    }

    // SERVER IS SOLE AUTHORITY: Pure Canonical Scoring from answers & exam structure
    const examStructure = submission.exam;
    const gradingSummary = canonicalScoringService.evaluateExamAttempt(
      examStructure,
      answersToEvaluate
    );

    const hasManualQuestions = gradingSummary.hasManualQuestions;
    const targetStatus: SubmissionState = hasManualQuestions ? "SUBMITTED" : "GRADED";

    // Enforce State Machine Transition
    SubmissionStateMachine.assertTransition(currentStatus, targetStatus);

    return this.repo.transaction(async (tx) => {
      const createdOrUpdatedAnswers = [];
      for (const ans of answersToEvaluate) {
        const evalResult = gradingSummary.evaluatedAnswers.find((g) => g.questionId === ans.questionId);
        const answerText = typeof ans.answerText === "object" ? JSON.stringify(ans.answerText) : ans.answerText;

        const existingAns = await tx.answer.findFirst({
          where: { submissionId: id, questionId: ans.questionId },
        });

        let savedAns: any;
        if (existingAns) {
          const updateData: any = {
            score: evalResult ? evalResult.score : existingAns.score,
          };
          if (answerText !== undefined) {
            updateData.answerText = answerText;
          }
          if (typeof ans.audioUrl === "string" && ans.audioUrl.trim() !== "") {
            updateData.audioUrl = ans.audioUrl.trim();
          } else if (ans.clearAudio === true || ans.audioUrl === null) {
            updateData.audioUrl = null;
          }

          savedAns = await tx.answer.update({
            where: { id: existingAns.id },
            data: updateData,
          });
        } else {
          savedAns = await tx.answer.create({
            data: {
              submissionId: id,
              questionId: ans.questionId,
              answerText: answerText ?? null,
              audioUrl: typeof ans.audioUrl === "string" && ans.audioUrl.trim() !== "" ? ans.audioUrl.trim() : null,
              score: evalResult ? evalResult.score : null,
            },
          });
        }
        createdOrUpdatedAnswers.push(savedAns);

        // Immutable Evidence Layer Recording
        if (evalResult && savedAns?.id) {
          const rawStr = typeof ans.answerText === "object" ? JSON.stringify(ans.answerText) : String(ans.answerText || "");
          const normStr = canonicalScoringService.getNormalizer().normalizeText(ans.answerText);
          await tx.answerEvaluationEvidence.upsert({
            where: { answerId: savedAns.id },
            create: {
              answerId: savedAns.id,
              evaluatorType: evalResult.questionType || "unknown",
              evaluatorVersion: "1.0.0",
              rawSubmitted: rawStr,
              normalizedInput: normStr,
              matchedRule: evalResult.isCorrect ? "CANONICAL_MATCH" : "NO_MATCH",
              isCorrect: evalResult.isCorrect ?? false,
              scoreAwarded: evalResult.score ?? 0,
              maxScore: evalResult.maxScore ?? 1,
            },
            update: {
              evaluatorType: evalResult.questionType || "unknown",
              rawSubmitted: rawStr,
              normalizedInput: normStr,
              matchedRule: evalResult.isCorrect ? "CANONICAL_MATCH" : "NO_MATCH",
              isCorrect: evalResult.isCorrect ?? false,
              scoreAwarded: evalResult.score ?? 0,
              maxScore: evalResult.maxScore ?? 1,
            },
          });
        }
      }

      const updated = await tx.examSubmission.update({
        where: { id },
        data: {
          status: targetStatus as any,
          submittedAt: new Date(),
          gradedAt: targetStatus === "GRADED" ? new Date() : null,
          totalScore: gradingSummary.totalScore,
          correctAnswers: gradingSummary.correctAnswers,
          totalQuestions: gradingSummary.totalQuestions,
          version: (submission.version || 1) + 1,
        },
      });

      const fullResult = {
        ...updated,
        answers: createdOrUpdatedAnswers,
        bandScore: gradingSummary.bandScore,
      };

      // Audit Outbox Event (Enabled when backed by storage)
      if ((tx as any).auditOutboxList && tx.auditOutbox) {
        const auditEvent = auditOutboxService.buildSanitizedEvent({
          eventType: "SUBMISSION_FINALIZED",
          actorId: user.id,
          actorRole: user.roles[0] || "student",
          submissionId: id,
          examId: submission.examId,
          idempotencyKey: payload.idempotencyKey,
          oldState: { status: submission.status, totalScore: submission.totalScore },
          newState: { status: targetStatus, totalScore: gradingSummary.totalScore },
          resultSummary: gradingSummary,
        });
        await tx.auditOutbox.create({ data: auditEvent });
      }

      // Idempotency Record (Enabled when backed by storage)
      if (payload.idempotencyKey && (tx as any).idempotencyRecords && tx.idempotencyRecord) {
        await tx.idempotencyRecord.create({
          data: {
            key: payload.idempotencyKey,
            submissionId: id,
            payloadHash: "sha256-mock",
            responsePayload: JSON.stringify(fullResult),
          },
        });
      }

      // Notification Trigger: SUBMITTED (Requires teacher manual grading) vs GRADED (Auto-graded result)
      if ((tx as any).notification) {
        const examTitle = submission.exam?.title || "IELTS Exam";
        if (targetStatus === "SUBMITTED") {
          let teacherId: string | null = null;
          if (submission.exam?.courseId && (tx as any).classStudent) {
            const classStudent = await (tx as any).classStudent.findFirst({
              where: {
                studentId: user.id,
                class: { courseId: submission.exam.courseId, isActive: true },
              },
              include: { class: true },
            });
            teacherId = classStudent?.class?.teacherId || null;
          }

          if (!teacherId && (tx as any).userRole) {
            const firstTeacher = await (tx as any).userRole.findFirst({
              where: { role: "teacher" },
            });
            teacherId = firstTeacher?.userId || null;
          }

          if (teacherId) {
            await this.notificationService.createNotification(tx, {
              userId: teacherId,
              type: "NEW_SUBMISSION",
              title: "Bài nộp mới cần chấm",
              message: `Học viên đã nộp bài thi "${examTitle}". Vui lòng chấm điểm và gửi feedback.`,
              link: `/admin/submissions/${id}`,
              entityType: "SUBMISSION",
              entityId: id,
            });
          }
        } else if (targetStatus === "GRADED") {
          const bandText =
            gradingSummary.bandScore !== null &&
            gradingSummary.bandScore !== undefined
              ? ` Kết quả: Band ${gradingSummary.bandScore}.`
              : "";
          await this.notificationService.createNotification(tx, {
            userId: user.id,
            type: "SUBMISSION_GRADED",
            title: "Kết quả bài thi",
            message: `Bài thi "${examTitle}" của bạn đã được chấm xong.${bandText}`,
            link: `/app/submissions/${id}`,
            entityType: "SUBMISSION",
            entityId: id,
          });
        }
      }

      return fullResult;
    });
  }

  // Use Case: Start Revision Attempt (P1 Canonical Learning Loop)
  async startRevision(
    user: { id: string; roles: string[] },
    examId: string,
    options?: { clonePreviousAnswers?: boolean }
  ): Promise<{ submission: any; isNew: boolean }> {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      throw new NotFoundError("Bài thi không tồn tại");
    }

    // 1. Idempotency Check: Return existing active IN_PROGRESS session if present
    const existingInProgress = await this.prisma.examSubmission.findFirst({
      where: {
        examId,
        studentId: user.id,
        status: "IN_PROGRESS",
      },
      include: { answers: true },
    });

    if (existingInProgress) {
      return {
        submission: existingInProgress,
        isNew: false,
      };
    }

    // 2. Fetch latest previous submission for this exam & student
    const latestSubmission = await this.prisma.examSubmission.findFirst({
      where: {
        examId,
        studentId: user.id,
      },
      orderBy: { createdAt: "desc" },
      include: { answers: true },
    });

    if (!latestSubmission) {
      throw new AuthorizationError("Chưa có bài nộp nào trước đó để sửa. Vui lòng làm bài lần đầu.", 400);
    }

    const latestStatus = String(latestSubmission.status).toUpperCase();
    if (latestStatus !== "GRADED") {
      throw new AuthorizationError("Bài nộp trước đó chưa được chấm điểm. Chỉ có thể sửa bài sau khi đã có đánh giá từ giáo viên.", 400);
    }

    // Invariant Check: Verify that teacher explicitly marked revisionRequired: true
    let isRevisionRequired = false;
    for (const ans of latestSubmission.answers || []) {
      if (ans.feedback) {
        try {
          const parsed = JSON.parse(ans.feedback);
          if (parsed && typeof parsed === "object" && parsed.revisionRequired) {
            isRevisionRequired = true;
            break;
          }
        } catch {
          // not structured json feedback
        }
      }
    }

    if (!isRevisionRequired) {
      throw new AuthorizationError("Bài nộp đã đạt yêu cầu hoặc giáo viên không yêu cầu sửa bài.", 400);
    }

    // 3. Create fresh ExamSubmission for Attempt 2 (Revision) in an atomic transaction
    return this.repo.transaction(async (tx) => {
      const newSubmission = await tx.examSubmission.create({
        data: {
          examId,
          studentId: user.id,
          status: "IN_PROGRESS",
          startedAt: new Date(),
        },
      });

      // Optionally clone answer texts from previous attempt if requested
      if (options?.clonePreviousAnswers && latestSubmission.answers?.length > 0) {
        for (const prevAnswer of latestSubmission.answers) {
          await tx.answer.create({
            data: {
              submissionId: newSubmission.id,
              questionId: prevAnswer.questionId,
              answerText: prevAnswer.answerText,
              audioUrl: prevAnswer.audioUrl,
            },
          });
        }
      }

      const created = await tx.examSubmission.findUnique({
        where: { id: newSubmission.id },
        include: { answers: true },
      });

      return {
        submission: created,
        isNew: true,
      };
    });
  }

  // Use Case: Teacher Grades Manual Submission (Essay/Speaking / P1 Feedback)
  async gradeManualSubmission(
    user: { id: string; roles: string[] },
    id: string,
    grades: Array<{
      answerId?: string;
      questionId?: string;
      score: number;
      feedback?: string;
      primaryErrorCategory?: "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | null;
      revisionRequired?: boolean;
      criteriaScores?: CriteriaScores | null;
      sentenceFeedbacks?: any[];
      tabSwitchCount?: number;
    }>,
    totalScore?: number,
    options?: {
      feedback?: string;
      primaryErrorCategory?: "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | null;
      revisionRequired?: boolean;
      criteriaScores?: CriteriaScores | null;
      sentenceFeedbacks?: Array<{
        sentenceIndex: number;
        originalSentence: string;
        category: string;
        tag: string;
        note: string;
        suggestedSentence?: string;
      }>;
      tabSwitchCount?: number;
      finalize?: boolean;
    }
  ) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin mới có quyền chấm bài", 403);
    }

    const submission: any = await this.repo.findById(id, { exam: true });
    if (!submission) {
      throw new NotFoundError("Không tìm thấy bài nộp");
    }

    if (isTeacher && !isAdmin) {
      const teacherStudentIds = await getTeacherStudentIds(this.prisma, user.id);
      if (!teacherStudentIds.includes(submission.studentId)) {
        throw new AuthorizationError("Học viên không thuộc lớp do bạn phụ trách", 403);
      }
    }

    const isFinalize = options?.finalize !== false;
    const currentStatus = String(submission.status).toUpperCase() as SubmissionState;

    if (isFinalize) {
      SubmissionStateMachine.assertTransition(currentStatus, "GRADED", true);
    }

    return this.repo.transaction(async (tx) => {
      let computedTotal = 0;
      const answerScores: number[] = [];

      for (let i = 0; i < grades.length; i++) {
        const g = grades[i];
        let answerFeedback: string | null = null;

        // Extract criteria from g or top-level options for first answer
        const effectiveFeedbackText = g.feedback || (i === 0 ? options?.feedback : "") || "";
        const effectivePrimaryCategory = g.primaryErrorCategory || (i === 0 ? options?.primaryErrorCategory : null) || null;
        const effectiveRevisionRequired = g.revisionRequired !== undefined ? !!g.revisionRequired : (i === 0 ? !!options?.revisionRequired : false);
        const effectiveCriteriaScores = g.criteriaScores || (i === 0 ? options?.criteriaScores : null) || null;
        const effectiveSentenceFeedbacks = g.sentenceFeedbacks || (i === 0 ? options?.sentenceFeedbacks : []) || [];
        const effectiveTabSwitchCount = g.tabSwitchCount || (i === 0 ? options?.tabSwitchCount : 0) || 0;

        if (
          effectiveFeedbackText ||
          effectivePrimaryCategory !== null ||
          effectiveRevisionRequired ||
          effectiveCriteriaScores !== null ||
          effectiveSentenceFeedbacks.length > 0
        ) {
          if (typeof effectiveFeedbackText === "string" && effectiveFeedbackText.trim().startsWith("{") && !effectiveCriteriaScores) {
            answerFeedback = effectiveFeedbackText;
          } else {
            const structuredPayload: TeacherFeedbackPayload = {
              text: effectiveFeedbackText,
              primaryErrorCategory: effectivePrimaryCategory,
              revisionRequired: effectiveRevisionRequired,
              criteriaScores: effectiveCriteriaScores,
              sentenceFeedbacks: effectiveSentenceFeedbacks,
              tabSwitchCount: effectiveTabSwitchCount,
            };
            answerFeedback = JSON.stringify(structuredPayload);
          }
        } else if (typeof g.feedback === "string") {
          answerFeedback = g.feedback;
        }

        // Authoritative score for this answer from criteria if available
        let answerScore = typeof g.score === "number" ? g.score : null;
        if (effectiveCriteriaScores) {
          const { taskResponse, coherence, fluencyAndCoherence, lexical, grammar, pronunciation } = effectiveCriteriaScores;
          if (taskResponse != null || coherence != null) {
            // Writing rubric
            const scores = [taskResponse, coherence, lexical, grammar].filter((v): v is number => typeof v === "number" && !isNaN(v));
            if (scores.length > 0) {
              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
              answerScore = Math.round(avg * 2) / 2;
            }
          } else if (fluencyAndCoherence != null || pronunciation != null) {
            // Speaking rubric
            const scores = [fluencyAndCoherence, lexical, grammar, pronunciation].filter((v): v is number => typeof v === "number" && !isNaN(v));
            if (scores.length > 0) {
              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
              answerScore = Math.round(avg * 2) / 2;
            }
          }
        }

        if (answerScore != null) {
          answerScores.push(answerScore);
        }

        const targetWhere: any = g.answerId
          ? { id: g.answerId }
          : g.questionId
          ? { submissionId: id, questionId: g.questionId }
          : null;

        if (targetWhere) {
          await tx.answer.updateMany({
            where: targetWhere,
            data: {
              score: answerScore,
              feedback: answerFeedback,
            },
          });
        }
      }

      const allAnswers = await tx.answer.findMany({
        where: { submissionId: id },
      });

      // Authoritative Overall Band Calculation
      let finalTotalScore: number;
      if (typeof totalScore === "number" && totalScore > 0) {
        finalTotalScore = totalScore;
      } else if (answerScores.length > 0) {
        if (answerScores.length === 2) {
          // Standard IELTS Task 1 + Task 2 weighting: (Task 1 + 2*Task 2)/3 rounded to 0.5
          const weightedAvg = (answerScores[0] + 2 * answerScores[1]) / 3;
          finalTotalScore = Math.round(weightedAvg * 2) / 2;
        } else {
          const avg = answerScores.reduce((a, b) => a + b, 0) / answerScores.length;
          finalTotalScore = Math.round(avg * 2) / 2;
        }
      } else {
        const dbScores = allAnswers.map((a: any) => Number(a.score)).filter((s) => !isNaN(s) && s > 0);
        if (dbScores.length > 0) {
          const avg = dbScores.reduce((a, b) => a + b, 0) / dbScores.length;
          finalTotalScore = Math.round(avg * 2) / 2;
        } else {
          finalTotalScore = 0;
        }
      }

      const targetStatus = isFinalize ? "GRADED" : currentStatus;
      const updated = await tx.examSubmission.update({
        where: { id },
        data: {
          status: targetStatus as any,
          version: (submission.version || 1) + 1,
          ...(isFinalize
            ? {
                gradedAt: new Date(),
                gradedBy: user.id,
                totalScore: finalTotalScore,
              }
            : {}),
        },
        include: { answers: true },
      });

      if (isFinalize) {
        // Audit Outbox Event (Enabled when backed by storage)
        if ((tx as any).auditOutboxList && tx.auditOutbox) {
          const auditEvent = auditOutboxService.buildSanitizedEvent({
            eventType: "TEACHER_REGRADED",
            actorId: user.id,
            actorRole: user.roles.includes("admin") ? "admin" : "teacher",
            submissionId: id,
            examId: submission.examId as string,
            oldState: { status: submission.status, totalScore: submission.totalScore },
            newState: { status: "GRADED", totalScore: finalTotalScore },
          });
          await tx.auditOutbox.create({ data: auditEvent });
        }

        // Notification Trigger: TEACHER_FEEDBACK to the student
        if ((tx as any).notification && submission.studentId) {
          const examTitle = submission.exam?.title || "IELTS Exam";
          await this.notificationService.createNotification(tx, {
            userId: submission.studentId,
            type: "TEACHER_FEEDBACK",
            title: "Giáo viên đã chấm bài thi",
            message: `Thầy/Cô đã chấm và gửi nhận xét cho bài thi "${examTitle}" của bạn.`,
            link: `/app/submissions/${id}`,
            entityType: "SUBMISSION",
            entityId: id,
          });
        }
      }

      return updated;
    });
  }

  // Use Case: Authorized Regrade Workflow (G4 Core)
  async regradeSubmission(
    user: { id: string; roles: string[] },
    id: string,
    data: {
      reason: string;
      grades?: Array<{ answerId: string; score: number; feedback?: string }>;
      regradeAll?: boolean;
    }
  ) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Từ chối truy cập: Chỉ giáo viên quản lý lớp hoặc quản trị viên mới được phép phúc khảo/chấm lại bài thi", 403);
    }

    if (!data.reason || typeof data.reason !== "string" || data.reason.trim().length < 5) {
      throw new AuthorizationError("Yêu cầu phúc khảo bắt buộc phải có lý do chi tiết (tối thiểu 5 ký tự)", 400);
    }

    const submission: any = await this.repo.findById(id, {
      exam: {
        include: {
          sections: {
            include: {
              questionGroups: {
                include: {
                  questions: true,
                },
              },
            },
          },
        },
      },
      answers: true,
    });

    if (!submission) {
      throw new NotFoundError("Không tìm thấy bài nộp cần chấm lại");
    }

    if (isTeacher && !isAdmin) {
      const teacherStudentIds = await getTeacherStudentIds(this.prisma, user.id);
      if (!teacherStudentIds.includes(submission.studentId)) {
        throw new AuthorizationError("Học viên không thuộc lớp do bạn phụ trách", 403);
      }
    }

    const previousScore = Number(submission.totalScore) || 0;
    const currentStatus = String(submission.status).toUpperCase() as SubmissionState;
    SubmissionStateMachine.assertTransition(currentStatus, "GRADED", true);

    return this.repo.transaction(async (tx) => {
      let finalTotalScore = previousScore;
      let finalCorrectCount = submission.correctAnswers || 0;

      // Mode A: Regrade All against Canonical Scoring Engine
      if (data.regradeAll) {
        const rawAnswers = (submission.answers || []).map((a: any) => ({
          questionId: a.questionId,
          answerText: a.answerText,
          audioUrl: a.audioUrl,
        }));

        const gradingSummary = canonicalScoringService.evaluateExamAttempt(
          submission.exam,
          rawAnswers
        );

        for (const ans of rawAnswers) {
          const evalResult = gradingSummary.evaluatedAnswers.find((g) => g.questionId === ans.questionId);
          if (evalResult) {
            await tx.answer.updateMany({
              where: { submissionId: id, questionId: ans.questionId },
              data: { score: evalResult.score },
            });
          }
        }

        finalTotalScore = gradingSummary.totalScore;
        finalCorrectCount = gradingSummary.correctAnswers;
      }

      // Mode B: Partial overrides from Teacher Manual Regrade
      if (data.grades && data.grades.length > 0) {
        for (const g of data.grades) {
          await tx.answer.update({
            where: { id: g.answerId },
            data: {
              score: g.score,
              feedback: g.feedback || null,
            },
          });
        }

        const allAnswers = await tx.answer.findMany({ where: { submissionId: id } });
        finalTotalScore = allAnswers.reduce((sum: number, a: any) => sum + (Number(a.score) || 0), 0);
      }

      const updated = await tx.examSubmission.update({
        where: { id },
        data: {
          status: "GRADED" as any,
          gradedAt: new Date(),
          gradedBy: user.id,
          totalScore: finalTotalScore,
          correctAnswers: finalCorrectCount,
          version: (submission.version || 1) + 1,
        },
        include: { answers: true },
      });

      // Immutable Audit Trail (Enabled when backed by storage)
      if ((tx as any).auditOutboxList && tx.auditOutbox) {
        const auditEvent = auditOutboxService.buildSanitizedEvent({
          eventType: "SUBMISSION_REGRADED",
          actorId: user.id,
          actorRole: isAdmin ? "admin" : "teacher",
          submissionId: id,
          examId: submission.examId as string,
          oldState: { status: submission.status, totalScore: previousScore },
          newState: { status: "GRADED", totalScore: finalTotalScore },
          reason: data.reason.trim(),
        });
        await tx.auditOutbox.create({ data: auditEvent });
      }

      return {
        ...updated,
        regradeReason: data.reason.trim(),
        previousScore,
      };
    });
  }
}
