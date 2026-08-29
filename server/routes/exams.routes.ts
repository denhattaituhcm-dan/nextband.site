import { FastifyPluginAsync } from "fastify";
import { paginationSchema } from "../schemas/common.schema.js";
import {
  createExamSchema,
  updateExamSchema,
  createSectionSchema,
} from "../schemas/exam.schema.js";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { handleValidation } from "../utils/validation.js";
import { toFileUrl } from "../utils/file.js";
import { AuthorizationService } from "../services/authorization.service.js";

const examsRoutes: FastifyPluginAsync = async (fastify) => {
  const cleanQuestionData = (q: any, isAdminOrTeacher: boolean) => {
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

    if (isAdminOrTeacher) {
      return {
        ...q,
        selectionMode,
        maxSelections,
        isMultiChoice: selectionMode === "multiple",
      };
    }

    // 2. Student Safe DTO: Strip 100% of secret fields
    const cleaned = { ...q };
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

    cleaned.selectionMode = selectionMode;
    cleaned.maxSelections = maxSelections;
    cleaned.isMultiChoice = selectionMode === "multiple";

    return cleaned;
  };

  // GET /exams - List all exams
  fastify.get("/", { preHandler: authenticate }, async (request, reply) => {
    const query = paginationSchema.safeParse(request.query);
    const { courseId, isPublished, isActive } = request.query as any;

    if (!query.success) {
      return reply.status(400).send({ error: "Tham số truy vấn không hợp lệ" });
    }

    const { page, limit, search, sortBy = "createdAt", sortOrder } = query.data;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Teacher: only see exams from courses they teach
    const user = request.user;
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (isTeacher && !isAdmin) {
      where.course = { teacherId: user.id };
    } else if (!isAdmin && !isTeacher) {
      // Student: see exams from enrolled courses OR open exams
      where.OR = [
        {
          course: {
            enrollments: { some: { studentId: user.id } },
          },
        },
        { isOpen: true },
      ];
      where.isPublished = true;
      where.isActive = true;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (isPublished !== undefined) {
      where.isPublished = isPublished === "true";
    }

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    const sortFieldMap: Record<string, string> = {
      newest: "createdAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      name: "title",
      title: "title",
      duration: "durationMinutes",
      durationMinutes: "durationMinutes",
      type: "examType",
      examType: "examType",
      week: "week",
    };
    const orderField = (sortBy && sortFieldMap[sortBy]) ? sortFieldMap[sortBy] : "createdAt";

    const [data, total] = await Promise.all([
      fastify.prisma.exam.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderField]: sortOrder },
        include: {
          course: {
            select: { id: true, title: true },
          },
          _count: {
            select: { sections: true, submissions: true },
          },
        },
      }),
      fastify.prisma.exam.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  });

  // GET /exams/:id - Get exam with sections
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params;

      const exam = await fastify.prisma.exam.findUnique({
        where: { id },
        include: {
          course: { select: { id: true, title: true } },
          sections: {
            orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
            include: {
              questionGroups: {
                orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
                include: {
                  questions: { orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }] },
                },
              },
            },
          },
        },
      });

      if (!exam) {
        return reply.status(404).send({ error: "Không tìm thấy bài thi" });
      }

      const user = request.user;
      const isAdmin = user.roles.includes("admin");
      const isTeacher = user.roles.includes("teacher");

      // IDOR Check
      if (!isAdmin && !isTeacher) {
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
            .send({ error: "Bạn chưa đăng ký khóa học hoặc lớp học này để xem bài thi" });
        }

        if (!exam.isPublished || !exam.isActive) {
          return reply.status(403).send({ error: "bài tập hiện không còn khả dụng" });
        }
      }

      // Format lại liên kết file trong các section và question
      const shouldShowTranscript = isAdmin || isTeacher;
      const formattedSections = exam.sections.map((section) => ({
        ...section,
        audioUrl: toFileUrl(section.audioUrl),
        audioScript: shouldShowTranscript ? section.audioScript : undefined,
        questionGroups: section.questionGroups.map((group) => ({
          ...group,
          audioUrl: toFileUrl(group.audioUrl),
          questions: group.questions.map((question) => {
            const formatted = {
              ...question,
              audioUrl: toFileUrl(question.audioUrl),
            };
            return cleanQuestionData(formatted, isAdmin || isTeacher);
          }),
        })),
      }));

      return {
        ...exam,
        sections: formattedSections,
      };
    },
  );

  // POST /exams - Create exam
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const data = handleValidation(
        createExamSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;
      const { template, ...safeData } = data as any;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireCourseAuthoringAccess(
          data.courseId,
          request.user.id,
          request.user.roles,
        );
      } catch (err: any) {
        if (err.statusCode) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        throw err;
      }

      const exam = await fastify.prisma.exam.create({
        data: safeData as any,
      });

      // Modular Section Auto-initialization
      let defaultSections: Array<{ sectionType: any; title: string; orderIndex: number }> = [];

      if (template === "full_ielts_mock") {
        defaultSections = [
          { sectionType: "listening", title: "Listening", orderIndex: 0 },
          { sectionType: "reading", title: "Reading", orderIndex: 1 },
          { sectionType: "writing", title: "Writing", orderIndex: 2 },
          { sectionType: "speaking", title: "Speaking", orderIndex: 3 },
          { sectionType: "general", title: "Grammar", orderIndex: 4 },
        ];
      } else if (template === "single_speaking") {
        defaultSections = [{ sectionType: "speaking", title: "Speaking", orderIndex: 0 }];
      } else if (template === "single_writing") {
        defaultSections = [{ sectionType: "writing", title: "Writing", orderIndex: 0 }];
      } else if (template === "single_listening") {
        defaultSections = [{ sectionType: "listening", title: "Listening", orderIndex: 0 }];
      } else if (template === "single_reading") {
        defaultSections = [{ sectionType: "reading", title: "Reading", orderIndex: 0 }];
      } else if (template === "single_grammar") {
        defaultSections = [{ sectionType: "general", title: "Grammar", orderIndex: 0 }];
      } else if (template === "blank") {
        defaultSections = [];
      } else {
        // Fallback: title/semantics inference
        const title = safeData.title || "";
        if (/- SPK\b|SPEAKING/i.test(title)) {
          defaultSections = [{ sectionType: "speaking", title: "Speaking", orderIndex: 0 }];
        } else if (/- WRI\b|WRITING/i.test(title)) {
          defaultSections = [{ sectionType: "writing", title: "Writing", orderIndex: 0 }];
        } else if (/- LIS\b|LISTENING/i.test(title)) {
          defaultSections = [{ sectionType: "listening", title: "Listening", orderIndex: 0 }];
        } else if (/- REA\b|READING/i.test(title)) {
          defaultSections = [{ sectionType: "reading", title: "Reading", orderIndex: 0 }];
        } else if (/VOCAB/i.test(title)) {
          defaultSections = [{ sectionType: "general", title: "Grammar", orderIndex: 0 }];
        } else if (/MOCK|PLACEMENT/i.test(title)) {
          defaultSections = [
            { sectionType: "listening", title: "Listening", orderIndex: 0 },
            { sectionType: "reading", title: "Reading", orderIndex: 1 },
            { sectionType: "writing", title: "Writing", orderIndex: 2 },
            { sectionType: "speaking", title: "Speaking", orderIndex: 3 },
            { sectionType: "general", title: "Grammar", orderIndex: 4 },
          ];
        }
      }

      if (defaultSections.length > 0) {
        await fastify.prisma.examSection.createMany({
          data: defaultSections.map((s) => ({
            examId: exam.id,
            ...s,
          })),
        });
      }

      // Return exam with sections
      const examWithSections = await fastify.prisma.exam.findUnique({
        where: { id: exam.id },
        include: {
          sections: { orderBy: { orderIndex: "asc" } },
        },
      });

      return reply.status(201).send(examWithSections);
    },
  );

  // PUT /exams/:id - Update exam
  fastify.put<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;
      const data = handleValidation(
        updateExamSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;
      const { template, ...safeData } = data as any;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireExamAuthoringAccess(
          id,
          request.user.id,
          request.user.roles,
        );
      } catch (err: any) {
        if (err.statusCode) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        throw err;
      }

      const existing = await fastify.prisma.exam.findUnique({
        where: { id },
        select: { id: true, isActive: true, isLocked: true },
      });
      if (!existing) {
        return reply.status(404).send({ error: "Không tìm thấy bài thi" });
      }

      const isAdmin = request.user.roles.includes("admin");

      // Nếu bài thi đã lưu trữ (isActive === false) và không phải đang kích hoạt lại
      if (existing.isActive === false && safeData.isActive !== true) {
        return reply.status(409).send({
          error: "EXAM_ARCHIVED_IMMUTABLE",
          message: "Đề thi đã lưu trữ, không thể cập nhật thông tin.",
        });
      }

      // Nếu bài thi đang bị khóa, chỉ cho phép admin hoặc tác vụ mở khóa (isLocked === false)
      if (existing.isLocked === true && !isAdmin && safeData.isLocked !== false) {
        return reply.status(409).send({
          error: "EXAM_LOCKED_IMMUTABLE",
          message: "Đề thi đang bị khóa, hãy mở khóa trước khi chỉnh sửa nội dung.",
        });
      }

      // Publishing Invariant: Đề thi phải có ít nhất 1 section trước khi kích hoạt / xuất bản
      if (safeData.isPublished === true) {
        const sectionCount = await fastify.prisma.examSection.count({
          where: { examId: id },
        });
        if (sectionCount === 0) {
          return reply.status(400).send({
            error: "EXAM_SECTIONS_REQUIRED",
            message: "Đề thi phải có ít nhất 1 phần thi (section) trước khi xuất bản.",
          });
        }
      }

      const updatedExam = await fastify.prisma.exam.update({
        where: { id },
        data: safeData,
      });

      return updatedExam;
    },
  );

  // POST /exams/:examId/sections - Domain-scoped section creation
  fastify.post<{ Params: { examId: string } }>(
    "/:examId/sections",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { examId } = request.params;
      const data = handleValidation(
        createSectionSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireExamAuthoringAccess(
          examId,
          request.user.id,
          request.user.roles,
        );
      } catch (err: any) {
        if (err.statusCode) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        throw err;
      }

      const exam = await fastify.prisma.exam.findUnique({
        where: { id: examId },
        select: { id: true, isActive: true, isLocked: true },
      });
      if (!exam) {
        return reply.status(404).send({ error: "Không tìm thấy bài thi" });
      }

      const isAdmin = request.user.roles.includes("admin");
      if (exam.isActive === false || (exam.isLocked === true && !isAdmin)) {
        return reply.status(409).send({
          error: "EXAM_LOCKED_IMMUTABLE",
          message: "Đề thi đang bị khóa hoặc đã lưu trữ, không thể thêm phần thi.",
        });
      }

      let orderIndex = data.orderIndex;
      if (orderIndex === undefined) {
        const lastSection = await fastify.prisma.examSection.findFirst({
          where: { examId },
          orderBy: { orderIndex: "desc" },
          select: { orderIndex: true },
        });
        orderIndex = (lastSection?.orderIndex ?? -1) + 1;
      }

      const section = await fastify.prisma.examSection.create({
        data: {
          examId,
          sectionType: data.sectionType,
          title: data.title,
          instructions: data.instructions,
          content: data.content,
          audioUrl: data.audioUrl,
          audioScript: data.audioScript,
          durationMinutes: data.durationMinutes,
          orderIndex,
        },
      });

      return reply.status(201).send(section);
    },
  );

  // DELETE /exams/:examId/sections/:sectionId - Domain-scoped section deletion
  fastify.delete<{ Params: { examId: string; sectionId: string } }>(
    "/:examId/sections/:sectionId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { examId, sectionId } = request.params;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireExamAuthoringAccess(
          examId,
          request.user.id,
          request.user.roles,
        );
      } catch (err: any) {
        if (err.statusCode) {
          return reply.status(err.statusCode).send({ error: err.message });
        }
        throw err;
      }

      const exam = await fastify.prisma.exam.findUnique({
        where: { id: examId },
        select: { id: true, isActive: true, isLocked: true },
      });
      if (!exam) {
        return reply.status(404).send({ error: "Không tìm thấy bài thi" });
      }

      const isAdmin = request.user.roles.includes("admin");
      if (exam.isActive === false || (exam.isLocked === true && !isAdmin)) {
        return reply.status(409).send({
          error: "EXAM_LOCKED_IMMUTABLE",
          message: "Đề thi đang bị khóa hoặc đã lưu trữ, không thể xóa phần thi.",
        });
      }

      // Check student submissions protection
      const submissionCount = await fastify.prisma.examSubmission.count({
        where: { examId },
      });
      if (submissionCount > 0) {
        return reply.status(409).send({
          error: "EXAM_HAS_SUBMISSIONS",
          message: "Không thể xóa phần thi khi bài thi đã có lượt làm bài của học viên.",
        });
      }

      const section = await fastify.prisma.examSection.findFirst({
        where: { id: sectionId, examId },
      });
      if (!section) {
        return reply.status(404).send({ error: "Không tìm thấy phần thi trong bài thi này" });
      }

      await fastify.prisma.examSection.delete({
        where: { id: sectionId },
      });

      return reply.send({
        success: true,
        message: "Đã xóa phần thi thành công.",
      });
    },
  );


  // DELETE /exams/:id (T1-B Historical Data Protection)
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { id } = request.params;
      const { password } = (request.body || {}) as { password?: string };

      const actor = await fastify.prisma.user.findFirst({
        where: {
          OR: [
            { userId: request.user.id },
            { id: request.user.id },
          ],
        },
      });
      if (!actor) {
        return reply.status(401).send({ error: "Không thể xác thực người dùng" });
      }

      const existing = await fastify.prisma.exam.findUnique({
        where: { id },
        select: { id: true, isActive: true, isLocked: true },
      });
      if (!existing) {
        return reply.status(404).send({ error: "Không tìm thấy bài thi" });
      }

      if (existing.isActive === false) {
        return reply.status(409).send({
          success: false,
          action: "already_archived",
          errorCode: "EXAM_ALREADY_ARCHIVED",
          message: "Đề thi này đã ở trong kho lưu trữ (Archived).",
        });
      }

      // T1-B: Transactional Historical Protection & Usage Guard
      const submissionCount = await fastify.prisma.examSubmission.count({
        where: { examId: id },
      });

      if (submissionCount > 0) {
        // Atomic Safe Archive Transaction
        await fastify.prisma.$transaction(async (tx) => {
          await tx.exam.update({
            where: { id },
            data: {
              isPublished: false,
              isActive: false,
              isOpen: false,
              isLocked: true,
            },
          });
        });

        return reply.status(409).send({
          success: false,
          action: "archived",
          errorCode: "CANNOT_HARD_DELETE_EXAM_WITH_SUBMISSIONS",
          message:
            "Đề thi đã có bài làm của học viên. Hệ thống đã tự động chuyển sang chế độ Lưu trữ (Archived) để bảo toàn 100% lịch sử.",
          submissionCount,
        });
      }

      await fastify.prisma.exam.delete({ where: { id } });
      return {
        success: true,
        action: "hard_deleted",
        message: "Đã xóa bài thi chưa sử dụng thành công",
      };
    },
  );
};

export default examsRoutes;
