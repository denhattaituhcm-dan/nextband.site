import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { paginationSchema } from "../schemas/common.schema.js";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { handleValidation } from "../utils/validation.js";
import { toFileUrl } from "../utils/file.js";
import {
  getClassStudentIds,
  getTeacherStudentIds,
  isStudentInTeacherClasses,
  isTeacherOfClass,
} from "../utils/teacherScope.js";
import { canonicalScoringService } from "../services/scoring/CanonicalScoringService.js";
import { idempotencyService } from "../services/idempotency/IdempotencyService.js";
import { auditOutboxService } from "../services/audit/AuditOutboxService.js";
import { AuthorizationService } from "../services/authorization.service.js";

const submissionStatusEnum = z.enum(["in_progress", "submitted", "graded"], {
  errorMap: () => ({ message: "Trạng thái bài nộp không hợp lệ" }),
});

const OBJECTIVE_TYPES = new Set([
  "multiple_choice",
  "fill_blank",
  "matching",
  "listening",
  "reading",
]);

const MANUAL_TYPES = new Set(["essay", "speaking"]);
const MAX_EXAM_ATTEMPTS = 3;

function convertOptionValToIndex(val: any): number | null {
  if (val === null || val === undefined) return null;
  const str = String(val).trim().toUpperCase();
  if (!str) return null;
  if (/^\d+$/.test(str)) {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
  }
  if (/^[A-Z]$/.test(str)) {
    return str.charCodeAt(0) - 65;
  }
  const romanMap: Record<string, number> = {
    I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6, VIII: 7, IX: 8, X: 9, XI: 10, XII: 11
  };
  return romanMap[str] !== undefined ? romanMap[str] : null;
}

function getRemainingSeconds(startedAt: Date | null, durationMinutes: number | null) {
  const safeDuration = Math.max(1, durationMinutes || 60);
  if (!startedAt) return safeDuration * 60;

  const startedMs = new Date(startedAt).getTime();
  if (!Number.isFinite(startedMs)) return safeDuration * 60;

  const elapsed = Math.floor((Date.now() - startedMs) / 1000);
  return Math.max(0, safeDuration * 60 - Math.max(0, elapsed));
}

const submissionsRoutes: FastifyPluginAsync = async (fastify) => {
  const manualQuestionCountCache = new Map<string, number>();

  const getManualQuestionCount = async (examId: string) => {
    if (manualQuestionCountCache.has(examId)) {
      return manualQuestionCountCache.get(examId)!;
    }

    const count = await fastify.prisma.question.count({
      where: {
        group: {
          section: {
            examId,
          },
        },
        questionType: { in: Array.from(MANUAL_TYPES) as any },
      },
    });
    manualQuestionCountCache.set(examId, count);
    return count;
  };

  const normalizeSubmissionStatus = async (submission: any) => {
    if (!submission || (submission.status !== "submitted" && submission.status !== "SUBMITTED") || !submission.examId) {
      return submission;
    }

    const manualCount = await getManualQuestionCount(submission.examId);
    if (manualCount > 0) {
      return submission;
    }

    const gradedAt = submission.gradedAt ?? new Date();

    await fastify.prisma.examSubmission.update({
      where: { id: submission.id },
      data: {
        status: "GRADED" as any,
        gradedAt,
      },
    });

    return {
      ...submission,
      status: "GRADED",
      gradedAt,
    };
  };

  const cleanQuestionData = (q: any, isAdminOrTeacher: boolean, isGradedReview: boolean = false) => {
    // 1. Calculate safe metadata for UI rendering without leaking the answer strings
    let selectionMode: "single" | "multiple" = "single";
    let maxSelections = 1;

    if (q.questionType === "multiple_choice") {
      if (q.correctAnswer && typeof q.correctAnswer === "string") {
        const answers = q.correctAnswer.split("|").map((s: string) => s.trim()).filter(Boolean);
        if (answers.length > 1) {
          selectionMode = "multiple";
          maxSelections = answers.length;
        }
      }
    }

    if (isAdminOrTeacher || isGradedReview) {
      return {
        ...q,
        selectionMode,
        maxSelections,
        isMultiChoice: selectionMode === "multiple",
      };
    }

    // 2. Student Safe DTO (In-progress or awaiting grading)
    const cleaned = { ...q };
    if (q.questionType === "matching" && q.correctAnswer) {
      try {
        const config = JSON.parse(q.correctAnswer);
        delete config.pairs;
        if (!cleaned.options || typeof cleaned.options !== "object") {
          cleaned.options = { items: config.items || [], options: config.options || [] };
        }
      } catch {}
    }

    delete cleaned.correctAnswer;
    delete cleaned.correct_answer;
    delete cleaned.audioScript;
    delete cleaned.audio_script;
    delete cleaned.acceptedAnswers;
    delete cleaned.answerKey;
    delete cleaned.answer_key;

    cleaned.correctAnswer = null;
    cleaned.audioScript = null;
    cleaned.selectionMode = selectionMode;
    cleaned.maxSelections = maxSelections;
    cleaned.isMultiChoice = selectionMode === "multiple";

    return cleaned;
  };

  // GET /submissions - List submissions (for current user or all for admin/teacher)
  fastify.get("/", { preHandler: authenticate }, async (request, reply) => {
    const dataQuery = handleValidation(
      paginationSchema.safeParse(request.query),
      request,
      reply,
    );
    if (!dataQuery) return;

    const { examId, studentId, status, classId, needGrading } = request.query as any;
    const { page, limit, sortBy = "createdAt", sortOrder } = dataQuery;
    const skip = (page - 1) * limit;
    const user = request.user;

    const where: any = {};

    // Role-based filtering
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      // Students only see their own submissions
      where.studentId = user.id;
    } else if (isTeacher && !isAdmin) {
      // Teacher: only see submissions from students in their classes
      let teacherStudentIds: string[] = [];

      if (classId) {
        const owned = await isTeacherOfClass(fastify.prisma, user.id, classId);
        if (!owned) {
          return reply
            .status(403)
            .send({
              error: "Từ chối truy cập - lớp không thuộc quyền quản lý của bạn",
            });
        }
        teacherStudentIds = await getClassStudentIds(fastify.prisma, classId);
      } else {
        teacherStudentIds = await getTeacherStudentIds(fastify.prisma, user.id);
      }

      where.studentId = {
        in: teacherStudentIds.length > 0 ? teacherStudentIds : ["__none__"],
      };
      if (studentId) {
        // Further filter by specific student if requested
        where.studentId = teacherStudentIds.includes(studentId)
          ? studentId
          : "__none__";
      }
    } else if (studentId) {
      // Admin with student filter
      where.studentId = studentId;
    }

    if (isAdmin && classId) {
      const classStudentIds = await getClassStudentIds(fastify.prisma, classId);
      const inClass = classStudentIds.length > 0 ? classStudentIds : ["__none__"];

      if (studentId) {
        where.studentId = classStudentIds.includes(studentId)
          ? studentId
          : "__none__";
      } else {
        where.studentId = { in: inClass };
      }
    }

    if (examId) where.examId = examId;
    if (needGrading) {
      where.status = "submitted";
      where.submittedAt = { not: null };
      where.exam = {
        sections: {
          some: {
            questionGroups: {
              some: {
                questions: {
                  some: {
                    questionType: { in: Array.from(MANUAL_TYPES) as any },
                  },
                },
              },
            },
          },
        },
      };
    } else if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      fastify.prisma.examSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          exam: { select: { id: true, title: true, examType: true, course: { select: { id: true, title: true } } } },
          student: { select: { id: true, fullName: true, email: true } },
          grader: { select: { id: true, fullName: true } },
          _count: { select: { answers: true } },
        },
      }),
      fastify.prisma.examSubmission.count({ where }),
    ]);

    const normalizedData = await Promise.all(
      data.map((submission) => normalizeSubmissionStatus(submission)),
    );

    return {
      data: normalizedData,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  });

  // GET /submissions/latest/:examId - Latest completed submission for current user by exam
  fastify.get<{ Params: { examId: string } }>(
    "/latest/:examId",
    { preHandler: authenticate },
    async (request, reply) => {
      const { examId } = request.params;
      const user = request.user;

      if (!examId) {
        return reply.status(400).send({ error: "Yêu cầu examId" });
      }

      const latestSubmission = await fastify.prisma.examSubmission.findFirst({
        where: {
          examId,
          studentId: user.id,
          status: { in: ["SUBMITTED", "GRADED"] as any },
        },
        orderBy: [{ submittedAt: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          examId: true,
          status: true,
          submittedAt: true,
          totalScore: true,
          correctAnswers: true,
          totalQuestions: true,
        },
      });

      const normalizedLatest = latestSubmission
        ? await normalizeSubmissionStatus(latestSubmission)
        : null;

      return { data: normalizedLatest ?? null };
    },
  );

  // GET /submissions/:id - Get submission with answers
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const user = request.user;

      const rawSubmission = await fastify.prisma.examSubmission.findUnique({
        where: { id },
        include: {
          exam: {
            include: {
              course: true,
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
          student: { select: { id: true, fullName: true, email: true } },
          grader: { select: { id: true, fullName: true } },
          answers: {
            include: {
              question: true,
            },
          },
        },
      });

      if (!rawSubmission) {
        return reply.status(404).send({ error: "Không tìm thấy bài nộp" });
      }

      const submission = await normalizeSubmissionStatus(rawSubmission);

      // Check access permission
      const isAdmin = user.roles.includes("admin");
      const isTeacher = user.roles.includes("teacher");

      if (isTeacher && !isAdmin) {
        // Teacher: check if student belongs to their classes
        const hasAccess = await isStudentInTeacherClasses(
          fastify.prisma,
          user.id,
          submission.studentId,
        );
        if (!hasAccess) {
          return reply
            .status(403)
            .send({
              error:
                "Từ chối truy cập - học sinh không thuộc lớp bạn phụ trách",
            });
        }
      } else if (!isAdmin && submission.studentId !== user.id) {
        return reply.status(403).send({ error: "Từ chối truy cập" });
      }

      // Format audioUrl in answers
      const formattedAnswers = submission.answers.map((answer: any) => ({
        ...answer,
        audioUrl: toFileUrl(answer.audioUrl),
      }));

      // Format question data to hide answers if user is a student
      const isAdminOrTeacher = isAdmin || isTeacher;
      const isGradedReview = String(submission.status).toUpperCase() === "GRADED";

      const canShowTranscript = isAdminOrTeacher && submission.status !== "in_progress";
      const formattedExam = {
        ...submission.exam,
        sections: submission.exam.sections.map((section: any) => ({
          ...section,
          audioUrl: toFileUrl(section.audioUrl),
          audioScript: canShowTranscript ? section.audioScript : undefined,
          questionGroups: section.questionGroups.map((group: any) => ({
            ...group,
            audioUrl: toFileUrl(group.audioUrl),
            questions: group.questions.map((q: any) => {
              const formatted = {
                ...q,
                audioUrl: toFileUrl(q.audioUrl),
              };
              return cleanQuestionData(formatted, isAdminOrTeacher, isGradedReview);
            }),
          })),
        })),
      };

      const formattedAnswersFinal = formattedAnswers.map((answer: any) => {
        if (!answer.question) return answer;
        return {
          ...answer,
          question: cleanQuestionData(answer.question, isAdminOrTeacher, isGradedReview),
        };
      });

      return {
        ...submission,
        exam: formattedExam,
        answers: formattedAnswersFinal,
      };
    },
  );

  // POST /submissions - Start new exam submission
  fastify.post("/", { preHandler: authenticate }, async (request, reply) => {
    const { examId } = request.body as any;
    const user = request.user;

    if (!examId) {
      return reply.status(400).send({ error: "Yêu cầu examId" });
    }

    // Check if exam exists and is published
    const exam = await fastify.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      return reply.status(404).send({ error: "Không tìm thấy bài thi" });
    }

    if (!exam.isPublished) {
      return reply.status(400).send({ error: "Bài tập chưa được xuất bản" });
    }

    // IDOR Check: Students must be enrolled unless exam is open
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      if (!exam.isActive) {
        return reply.status(403).send({ error: "Bài tập hiện đang bị khóa" });
      }

      const authService = new AuthorizationService(fastify.prisma);
      const isAuthorized = await authService.isStudentAuthorizedForExam({
        studentId: user.id,
        examId: exam.id,
        courseId: exam.courseId,
        isOpen: exam.isOpen,
      });

      if (!isAuthorized) {
        return reply
          .status(403)
          .send({ error: "Bạn chưa đăng ký khóa học hoặc lớp học này để bắt đầu bài thi" });
      }
    }

    // Check if user already has an in-progress submission
    const existing = await fastify.prisma.examSubmission.findFirst({
      where: {
        examId,
        studentId: user.id,
        status: "IN_PROGRESS" as any,
      },
    });

    if (existing) {
      const remainingSeconds = getRemainingSeconds(
        existing.startedAt,
        exam.durationMinutes,
      );

      if (remainingSeconds > 0) {
        return {
          ...existing,
          remainingSeconds,
          serverTime: new Date().toISOString(),
        };
      }

      const existingAnswerCount = await fastify.prisma.answer.count({
        where: { submissionId: existing.id },
      });
      if (existingAnswerCount === 0) {
        const resetSubmission = await fastify.prisma.examSubmission.update({
          where: { id: existing.id },
          data: { startedAt: new Date() },
        });
        return {
          ...resetSubmission,
          remainingSeconds: Math.max(1, (exam.durationMinutes || 60) * 60),
          serverTime: new Date().toISOString(),
        };
      }

      // Expired stale attempt: close it to avoid immediate auto-submit loop on client
      await fastify.prisma.examSubmission.update({
        where: { id: existing.id },
        data: {
          status: "SUBMITTED" as any,
          submittedAt: new Date(),
        },
      });
    }

    const attemptCount = await fastify.prisma.examSubmission.count({
      where: {
        examId,
        studentId: user.id,
      },
    });

    const isPrivileged = user.roles.includes("admin") || user.roles.includes("teacher");
    if (!isPrivileged && attemptCount >= MAX_EXAM_ATTEMPTS) {
      return reply.status(409).send({
        error: `Bạn đã sử dụng hết ${MAX_EXAM_ATTEMPTS} lượt làm bài cho bài thi này`,
        maxAttempts: MAX_EXAM_ATTEMPTS,
        attemptCount,
        remainingAttempts: 0,
      });
    }

    // Open exam participant quota + refresh spam protection.
    // Count a user only once per exam (first time they ever start/submit).
    const hadAnySubmissionBefore = await fastify.prisma.examSubmission.findFirst({
      where: {
        examId,
        studentId: user.id,
      },
      select: { id: true },
    });

    try {
      const submission = await fastify.prisma.$transaction(async (tx) => {
        const inProgress = await tx.examSubmission.findFirst({
          where: {
            examId,
            studentId: user.id,
            status: "IN_PROGRESS" as any,
          },
        });
        if (inProgress) {
          const remainingSeconds = getRemainingSeconds(
            inProgress.startedAt,
            exam.durationMinutes,
          );
          if (remainingSeconds > 0) {
            return {
              ...inProgress,
              remainingSeconds,
              serverTime: new Date().toISOString(),
            };
          }

          const inProgressAnswerCount = await tx.answer.count({
            where: { submissionId: inProgress.id },
          });
          if (inProgressAnswerCount === 0) {
            const resetSubmission = await tx.examSubmission.update({
              where: { id: inProgress.id },
              data: { startedAt: new Date() },
            });
            return {
              ...resetSubmission,
              remainingSeconds: Math.max(1, (exam.durationMinutes || 60) * 60),
              serverTime: new Date().toISOString(),
            };
          }

          await tx.examSubmission.update({
            where: { id: inProgress.id },
            data: {
              status: "SUBMITTED" as any,
              submittedAt: new Date(),
            },
          });
        }

        if (
          exam.isOpen &&
          exam.maxParticipants !== null &&
          !hadAnySubmissionBefore
        ) {
          const updated = await tx.exam.updateMany({
            where: {
              id: exam.id,
              currentParticipants: { lt: exam.maxParticipants },
            },
            data: {
              currentParticipants: { increment: 1 },
            },
          });

          if (updated.count === 0) {
            throw new Error("OPEN_EXAM_FULL");
          }
        }

        const created = await tx.examSubmission.create({
          data: {
            examId,
            studentId: user.id,
            status: "IN_PROGRESS" as any,
            startedAt: new Date(),
          },
        });

        return {
          ...created,
          remainingSeconds: Math.max(1, (exam.durationMinutes || 60) * 60),
          serverTime: new Date().toISOString(),
          attemptCount: attemptCount + 1,
          maxAttempts: MAX_EXAM_ATTEMPTS,
          remainingAttempts: Math.max(0, MAX_EXAM_ATTEMPTS - (attemptCount + 1)),
        };
      });

      return reply.status(201).send(submission);
    } catch (error: any) {
      if (error?.message === "OPEN_EXAM_FULL") {
        return reply.status(409).send({
          error: "Bài tập mở đã đạt giới hạn người tham gia",
        });
      }
      throw error;
    }

  });

  const handleAuthoritativeSubmit = async (
    submissionId: string,
    userId: string,
    answers: any[],
    reply: any,
    options: { idempotencyKey?: string; clientVersion?: number; requestId?: string } = {},
  ) => {
    const { idempotencyKey, requestId } = options;
    const payloadHash = idempotencyService.computePayloadHash(answers);

    // 1. Idempotency Check (Database-backed)
    if (idempotencyKey) {
      try {
        const existingRecord = await fastify.prisma.idempotencyRecord.findUnique({
          where: {
            submissionId_key: {
              submissionId,
              key: idempotencyKey,
            },
          },
        });

        const check = idempotencyService.verifyIdempotency(existingRecord, payloadHash);
        if (check.isMatch) {
          return reply.status(200).send(check.cachedResponse);
        }
        if (check.isConflict) {
          return reply.status(409).send({
            error: "IDEMPOTENCY_CONFLICT",
            message: "Idempotency key này đã được sử dụng với nội dung nộp bài khác.",
          });
        }
      } catch {}
    }

    const submission = await fastify.prisma.examSubmission.findUnique({
      where: { id: submissionId },
      include: {
        exam: {
          select: { id: true, durationMinutes: true },
        },
      },
    });

    if (!submission) {
      return reply.status(404).send({ error: "Không tìm thấy bài nộp" });
    }

    if (submission.studentId !== userId) {
      return reply.status(403).send({ error: "Từ chối truy cập" });
    }

    const isStatusInProgress = String(submission.status).toUpperCase() === "IN_PROGRESS";
    if (!isStatusInProgress) {
      // Idempotent return for already-committed submission
      const existingResponse = {
        id: submission.id,
        status: submission.status,
        submittedAt: submission.submittedAt,
        correctAnswers: submission.correctAnswers,
        totalQuestions: submission.totalQuestions,
        totalScore: submission.totalScore,
      };

      if (idempotencyKey) {
        try {
          await fastify.prisma.idempotencyRecord.upsert({
            where: {
              submissionId_key: {
                submissionId,
                key: idempotencyKey,
              },
            },
            update: { responsePayload: existingResponse },
            create: {
              key: idempotencyKey,
              submissionId,
              payloadHash,
              responsePayload: existingResponse,
              status: "COMMITTED",
            },
          });
        } catch {}
      }

      return reply.send(existingResponse);
    }

    // Server-Side Exam Time Limit Enforcement (T1-A)
    const durationMinutes = submission.exam?.durationMinutes;
    let isOverdue = false;
    let cappedSubmittedAt = new Date();

    if (durationMinutes && durationMinutes > 0) {
      const allowedSeconds = durationMinutes * 60;
      const GRACE_PERIOD_SECONDS = 120;
      const startedMs = submission.startedAt
        ? new Date(submission.startedAt).getTime()
        : (submission.createdAt ? new Date(submission.createdAt).getTime() : Date.now());
      const elapsedSeconds = Math.floor((Date.now() - startedMs) / 1000);

      if (elapsedSeconds > (allowedSeconds + GRACE_PERIOD_SECONDS)) {
        isOverdue = true;
        cappedSubmittedAt = new Date(startedMs + (allowedSeconds * 1000));
      }
    }

    // Execute submission updates, auto-grading, and audit outbox inside a SINGLE Prisma Transaction
    const clientResponse = await fastify.prisma.$transaction(async (tx) => {
      // 1. Save final answers batch if provided
      if (!isOverdue && answers && Array.isArray(answers)) {
        for (const answer of answers) {
          if (!answer || !answer.questionId) continue;
          const serializedText =
            answer.answerText !== undefined
              ? answer.answerText !== null
                ? typeof answer.answerText === "object"
                  ? JSON.stringify(answer.answerText)
                  : String(answer.answerText)
                : null
              : undefined;

          await tx.answer.upsert({
            where: {
              submissionId_questionId: {
                submissionId,
                questionId: answer.questionId,
              },
            },
            update: {
              answerText: serializedText,
              audioUrl: answer.audioUrl !== undefined ? (answer.audioUrl !== null ? String(answer.audioUrl) : null) : undefined,
            },
            create: {
              submissionId,
              questionId: answer.questionId,
              answerText: serializedText !== undefined ? serializedText : null,
              audioUrl: answer.audioUrl !== null && answer.audioUrl !== undefined ? String(answer.audioUrl) : null,
            },
          });
        }
      }

      // 2. Authoritative Canonical Evaluation inside Transaction
      const examWithQuestions = await tx.exam.findUnique({
        where: { id: submission.examId },
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
      });

      const submittedAnswers = await tx.answer.findMany({
        where: { submissionId },
      });

      const summary = canonicalScoringService.evaluateExamAttempt(
        examWithQuestions || submission.exam,
        submittedAnswers,
      );

      // Persist individual evaluated answer scores
      for (const evalRes of summary.evaluatedAnswers) {
        const answerRecord = submittedAnswers.find((a) => a.questionId === evalRes.questionId);
        if (answerRecord) {
          await tx.answer.update({
            where: { id: answerRecord.id },
            data: {
              score: evalRes.isManual ? null : evalRes.score,
            },
          });
        }
      }

      const nextVersion = ((submission as any).version || 1) + 1;
      const finalSubmittedAt = isOverdue ? cappedSubmittedAt : new Date();

      const updatedSubmission = await tx.examSubmission.update({
        where: { id: submissionId },
        data: {
          status: summary.status as any,
          submittedAt: finalSubmittedAt,
          correctAnswers: summary.correctAnswers,
          totalQuestions: summary.totalQuestions,
          totalScore: summary.totalScore,
          version: nextVersion,
          ...(summary.status === "GRADED" && { gradedAt: new Date() }),
        },
      });

      const responseDto = {
        id: updatedSubmission.id,
        status: updatedSubmission.status,
        submittedAt: updatedSubmission.submittedAt,
        correctAnswers: updatedSubmission.correctAnswers,
        totalQuestions: updatedSubmission.totalQuestions,
        totalScore: updatedSubmission.totalScore,
        percentage: summary.percentage,
        hasManualQuestions: summary.hasManualQuestions,
      };

      // 3. Save Idempotency Record within same transaction
      if (idempotencyKey && tx.idempotencyRecord) {
        try {
          await tx.idempotencyRecord.upsert({
            where: {
              submissionId_key: {
                submissionId,
                key: idempotencyKey,
              },
            },
            update: { responsePayload: responseDto },
            create: {
              key: idempotencyKey,
              submissionId,
              payloadHash,
              responsePayload: responseDto,
              status: "COMMITTED",
            },
          });
        } catch {}
      }

      // 4. Save Sanitized Audit Outbox Event within same transaction
      if (tx.auditOutbox) {
        try {
          const auditEvent = auditOutboxService.buildSanitizedEvent({
            eventType: "SUBMISSION_FINALIZED",
            actorId: userId,
            actorRole: "student",
            submissionId,
            examId: submission.examId,
            requestId,
            idempotencyKey,
            oldState: {
              status: submission.status,
              totalScore: submission.totalScore,
              version: (submission as any).version || 1,
            },
            newState: {
              status: summary.status,
              totalScore: summary.totalScore,
              version: nextVersion,
            },
            resultSummary: {
              totalScore: summary.totalScore,
              maxScore: summary.maxScore,
              correctAnswers: summary.correctAnswers,
              totalQuestions: summary.totalQuestions,
              percentage: summary.percentage,
              hasManualQuestions: summary.hasManualQuestions,
            },
          });

          await tx.auditOutbox.create({
            data: auditEvent,
          });
        } catch {}
      }

      return responseDto;
    });

    // Update enrollment progress
    try {
      const exam = await fastify.prisma.exam.findUnique({
        where: { id: submission.examId },
        select: { courseId: true },
      });

      if (exam) {
        const enrollment = await fastify.prisma.enrollment.findFirst({
          where: {
            courseId: exam.courseId,
            studentId: userId,
          },
        });

        if (enrollment) {
          const totalExams = await fastify.prisma.exam.count({
            where: {
              courseId: exam.courseId,
              isPublished: true,
              isActive: true,
            },
          });

          const uniqueSubmissions = await fastify.prisma.examSubmission.groupBy({
            by: ["examId"],
            where: {
              studentId: userId,
              status: { in: ["SUBMITTED", "GRADED"] as any },
              exam: {
                courseId: exam.courseId,
                isPublished: true,
                isActive: true,
              },
            },
          });

          const completedExamsCount = uniqueSubmissions.length;
          const progressPercent =
            totalExams > 0
              ? Math.round((completedExamsCount / totalExams) * 100)
              : 0;

          await fastify.prisma.enrollment.update({
            where: { id: enrollment.id },
            data: { progressPercent },
          });
        }
      }
    } catch {}

    return reply.send(clientResponse);
  };

  // PUT /submissions/:id - Autosave answers in-progress with Conditional Write & Versioning
  fastify.put<{ Params: { id: string } }>(
    "/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const { answers, submit, version, idempotencyKey } = (request.body || {}) as any;
      const user = request.user;
      const headerIdempotency = request.headers["x-idempotency-key"] as string | undefined;
      const finalIdempotencyKey = idempotencyKey || headerIdempotency;

      if (submit) {
        return handleAuthoritativeSubmit(id, user.id, answers, reply, {
          idempotencyKey: finalIdempotencyKey,
          clientVersion: version,
        });
      }

      const submission = await fastify.prisma.examSubmission.findUnique({
        where: { id },
        include: {
          exam: {
            select: { durationMinutes: true },
          },
        },
      });

      if (!submission) {
        return reply.status(404).send({ error: "Không tìm thấy bài nộp" });
      }

      if (submission.studentId !== user.id) {
        return reply.status(403).send({ error: "Từ chối truy cập" });
      }

      // Conditional Write: Block autosave if submission is already final
      const isStatusInProgress = String(submission.status).toUpperCase() === "IN_PROGRESS";
      if (!isStatusInProgress) {
        return reply.status(409).send({
          error: "SUBMISSION_ALREADY_FINALIZED",
          message: "Bài tập đã được nộp hoặc chấm điểm, không thể cập nhật bản nháp.",
        });
      }

      // Optimistic Versioning check
      const currentVersion = (submission as any).version || 1;
      if (typeof version === "number" && version < currentVersion) {
        return reply.status(409).send({
          error: "STALE_VERSION_CONFLICT",
          message: "Bản nháp gửi lên đã cũ hơn phiên bản hiện tại trên máy chủ.",
          currentVersion,
        });
      }

      // Check time limit
      const durationMinutes = submission.exam?.durationMinutes;
      if (durationMinutes && durationMinutes > 0) {
        const allowedSeconds = durationMinutes * 60;
        const GRACE_PERIOD_SECONDS = 120;
        const startedMs = submission.startedAt
          ? new Date(submission.startedAt).getTime()
          : (submission.createdAt ? new Date(submission.createdAt).getTime() : Date.now());
        const elapsedSeconds = Math.floor((Date.now() - startedMs) / 1000);

        if (elapsedSeconds > (allowedSeconds + GRACE_PERIOD_SECONDS)) {
          return reply.status(400).send({
            error: "EXAM_TIME_EXPIRED",
            message: "Thời gian làm bài đã kết thúc. Không thể lưu thêm câu trả lời.",
            remainingSeconds: 0,
          });
        }
      }

      // Save/upsert answers atomically and bump version
      const newVersion = currentVersion + 1;
      let savedCount = 0;

      if (answers && Array.isArray(answers)) {
        for (const answer of answers) {
          if (!answer || !answer.questionId) continue;
          const serializedText =
            answer.answerText !== undefined
              ? answer.answerText !== null
                ? typeof answer.answerText === "object"
                  ? JSON.stringify(answer.answerText)
                  : String(answer.answerText)
                : null
              : undefined;

          await fastify.prisma.answer.upsert({
            where: {
              submissionId_questionId: {
                submissionId: id,
                questionId: answer.questionId,
              },
            },
            update: {
              answerText: serializedText,
              audioUrl: answer.audioUrl !== undefined ? (answer.audioUrl !== null ? String(answer.audioUrl) : null) : undefined,
            },
            create: {
              submissionId: id,
              questionId: answer.questionId,
              answerText: serializedText !== undefined ? serializedText : null,
              audioUrl: answer.audioUrl !== null && answer.audioUrl !== undefined ? String(answer.audioUrl) : null,
            },
          });
          savedCount++;
        }
      }

      await fastify.prisma.examSubmission.update({
        where: { id },
        data: { version: newVersion },
      });

      return reply.send({
        id: submission.id,
        status: submission.status,
        savedCount,
        version: newVersion,
        updatedAt: new Date().toISOString(),
      });
    },
  );

  // POST /submissions/:id/submit - Final Authoritative Submit & Scoring (with Idempotency & Audit Outbox)
  fastify.post<{ Params: { id: string } }>(
    "/:id/submit",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const { answers, idempotencyKey, version } = (request.body || {}) as any;
      const user = request.user;
      const headerIdempotency = request.headers["x-idempotency-key"] as string | undefined;
      const finalIdempotencyKey = idempotencyKey || headerIdempotency;

      return handleAuthoritativeSubmit(id, user.id, answers, reply, {
        idempotencyKey: finalIdempotencyKey,
        clientVersion: version,
        requestId: request.id,
      });
    },
  );

  // POST /submissions/:id/grade - Grade submission (admin/teacher only)
  fastify.post<{ Params: { id: string } }>(
    "/:id/grade",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;
      const { grades, totalScore } = request.body as any;
      const user = request.user;

      const submission = await fastify.prisma.examSubmission.findUnique({
        where: { id },
      });

      if (!submission) {
        return reply.status(404).send({ error: "Không tìm thấy bài nộp" });
      }

      // Teacher: check if student belongs to their classes
      const isAdmin = user.roles.includes("admin");
      const isTeacher = user.roles.includes("teacher");
      if (isTeacher && !isAdmin) {
        const hasAccess = await isStudentInTeacherClasses(
          fastify.prisma,
          user.id,
          submission.studentId,
        );
        if (!hasAccess) {
          return reply
            .status(403)
            .send({
              error:
                "Từ chối truy cập - học sinh không thuộc lớp bạn phụ trách",
            });
        }
      }

      const isStillInProgress = String(submission.status).toUpperCase() === "IN_PROGRESS";
      if (isStillInProgress) {
        return reply
          .status(400)
          .send({ error: "Bài tập vẫn đang trong quá trình thực hiện" });
      }

      // Execute teacher grading and audit outbox within a single Transaction
      const updated = await fastify.prisma.$transaction(async (tx) => {
        // 1. Update individual answer grades
        if (grades && Array.isArray(grades)) {
          for (const grade of grades) {
            if (!grade || !grade.answerId) continue;
            await tx.answer.update({
              where: { id: grade.answerId },
              data: {
                score: typeof grade.score === "number" ? grade.score : null,
                feedback: grade.feedback ? String(grade.feedback) : null,
              },
            });
          }
        }

        // 2. Canonical Total Score Recalculation across all answers (Objective + Subjective)
        const allAnswers = await tx.answer.findMany({
          where: { submissionId: id },
        });

        let calculatedTotal = 0;
        let calculatedCorrectCount = 0;

        for (const a of allAnswers) {
          if (typeof a.score === "number" && a.score > 0) {
            calculatedTotal += a.score;
            calculatedCorrectCount++;
          }
        }

        const finalTotalScore =
          typeof totalScore === "number" && totalScore >= 0
            ? totalScore
            : Math.round(calculatedTotal * 100) / 100;

        // 3. Update submission status and locked official score
        const updatedSub = await tx.examSubmission.update({
          where: { id },
          data: {
            status: "GRADED" as any,
            totalScore: finalTotalScore,
            correctAnswers: submission.correctAnswers || calculatedCorrectCount,
            gradedBy: user.id,
            gradedAt: new Date(),
          },
          include: {
            answers: true,
            student: { select: { id: true, fullName: true, email: true } },
          },
        });

        // 4. Save Sanitized Audit Outbox Event
        if (tx.auditOutbox && typeof tx.auditOutbox.create === "function") {
          try {
            const auditEvent = auditOutboxService.buildSanitizedEvent({
              eventType: "TEACHER_REGRADED",
              actorId: user.id,
              actorRole: user.roles?.[0] || "teacher",
              submissionId: id,
              examId: submission.examId,
              requestId: request.id,
              oldState: {
                status: submission.status,
                totalScore: submission.totalScore,
              },
              newState: {
                status: "GRADED",
                totalScore: finalTotalScore,
                gradedBy: user.id,
              },
              resultSummary: {
                totalScore: finalTotalScore,
                correctAnswers: submission.correctAnswers || calculatedCorrectCount,
                totalQuestions: submission.totalQuestions,
              },
            });

            await tx.auditOutbox.create({
              data: auditEvent,
            });
          } catch {}
        }

        return updatedSub;
      });

      const formattedAnswers = ((updated as any).answers || []).map((answer: any) => ({
        ...answer,
        audioUrl: toFileUrl(answer.audioUrl),
      }));

      return {
        ...updated,
        answers: formattedAnswers,
      };
    },
  );
};

export default submissionsRoutes;
