import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { handleValidation } from "../utils/validation.js";
import { toFileUrl, withFileUrls } from "../utils/file.js";
import { AuthorizationService } from "../services/authorization.service.js";

const sectionTypeEnum = z.enum(
  ["listening", "reading", "writing", "speaking", "general"],
  {
    errorMap: () => ({
      message:
        "Loại phần thi không hợp lệ. Phải là: listening, reading, writing, speaking, general",
    }),
  },
);

const createSectionSchema = z.object({
  examId: z.string({ required_error: "ID bài tập là bắt buộc" }),
  sectionType: sectionTypeEnum,
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  instructions: z.string().max(5_000_000, "Nội dung hướng dẫn quá dài").optional(),
  content: z.any().optional(),
  audioUrl: z.string().optional(),
  audioScript: z.string().max(5_000_000, "Nội dung script quá dài").optional(),
  durationMinutes: z
    .number({ invalid_type_error: "Thời gian phải là số" })
    .int()
    .optional(),
  orderIndex: z.number().int().optional(),
});

const updateSectionSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc").optional(),
  instructions: z.string().max(5_000_000, "Nội dung hướng dẫn quá dài").optional(),
  content: z.any().optional(),
  audioUrl: z.string().optional(),
  audioScript: z.string().max(5_000_000, "Nội dung script quá dài").optional(),
  durationMinutes: z
    .number({ invalid_type_error: "Thời gian phải là số" })
    .int()
    .optional(),
  orderIndex: z.number().int().optional(),
});

const sectionsRoutes: FastifyPluginAsync = async (fastify) => {
  // Helper to clean sensitive question data for students
  const cleanQuestionData = (q: any, isAdminOrTeacher: boolean) => {
    if (isAdminOrTeacher) return q;
    const cleaned = { ...q };
    if (q.questionType === "matching" && q.correctAnswer) {
      try {
        const config = JSON.parse(q.correctAnswer);
        delete config.pairs; // Hide correct matching pairs
        cleaned.correctAnswer = JSON.stringify(config);
      } catch {
        cleaned.correctAnswer = null;
      }
    } else {
      // For all other types, hide the answer completely
      cleaned.correctAnswer = null;
    }
    return cleaned;
  };

  // GET /sections/:id
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params;

      const section = await fastify.prisma.examSection.findUnique({
        where: { id },
        include: {
          exam: { select: { id: true, courseId: true, isPublished: true, isActive: true, isOpen: true } },
          questionGroups: {
            orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
            include: {
              questions: {
                orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
              },
            },
          },
        },
      });

      if (!section) {
        return reply.status(404).send({ error: "Không tìm thấy Section" });
      }

      const user = request.user;
      const isAdmin = user.roles.includes("admin");
      const isTeacher = user.roles.includes("teacher");

      // IDOR/Enrollment Check
      if (!isAdmin && !isTeacher) {
        const authService = new AuthorizationService(fastify.prisma);
        const isAuthorized = await authService.isStudentAuthorizedForExam({
          studentId: user.id,
          examId: section.exam.id,
          courseId: section.exam.courseId,
          isOpen: section.exam.isOpen,
        });

        if (!isAuthorized) {
          return reply.status(403).send({ error: "Bạn chưa đăng ký khóa học hoặc lớp học này" });
        }
      }

      // Format audioUrls and Clean questions
      const isAdminOrTeacher = isAdmin || isTeacher;
      const formatted = {
        ...section,
        audioUrl: toFileUrl(section.audioUrl),
        audioScript: isAdminOrTeacher ? section.audioScript : undefined,
        questionGroups: section.questionGroups.map((group: any) => ({
          ...group,
          audioUrl: toFileUrl(group.audioUrl),
          questions: group.questions.map((q: any) => {
            const fq = {
              ...q,
              audioUrl: toFileUrl(q.audioUrl),
            };
            return cleanQuestionData(fq, isAdminOrTeacher);
          }),
        })),
      };

      return formatted;
    },
  );

  // POST /sections - Create section (Generic / Backward-Compatible)
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const data = handleValidation(
        createSectionSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireExamAuthoringAccess(
          data.examId,
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
        where: { id: data.examId },
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
          where: { examId: data.examId },
          orderBy: { orderIndex: "desc" },
          select: { orderIndex: true },
        });
        orderIndex = (lastSection?.orderIndex ?? -1) + 1;
      }

      const section = await fastify.prisma.examSection.create({
        data: {
          examId: data.examId,
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

  // PUT /sections/:id
  fastify.put<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;
      const data = handleValidation(
        updateSectionSchema.safeParse(request.body),
        request,
        reply,
      );
      if (!data) return;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireSectionAuthoringAccess(
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

      const existing = await fastify.prisma.examSection.findUnique({
        where: { id },
        include: { exam: { select: { isActive: true, isLocked: true } } },
      });
      if (!existing) {
        return reply.status(404).send({ error: "Không tìm thấy phần thi" });
      }
      const isAdmin = request.user.roles.includes("admin");
      if (
        existing.exam &&
        (existing.exam.isActive === false || (existing.exam.isLocked === true && !isAdmin))
      ) {
        return reply.status(409).send({
          error: "EXAM_ARCHIVED_IMMUTABLE",
          message: "Đề thi đã lưu trữ hoặc bị khóa, không thể cập nhật phần thi.",
        });
      }

      try {
        const section = await fastify.prisma.examSection.update({
          where: { id },
          data,
        });

        return withFileUrls(section, ["audioUrl"]);
      } catch (error: any) {
        if (error?.code === "P2000") {
          return reply.status(400).send({
            error: "Nội dung quá dài cho trường lưu trữ",
          });
        }
        throw error;
      }
    },
  );

  // DELETE /sections/:id - Delete section with domain protection
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;

      const authService = new AuthorizationService(fastify.prisma);
      try {
        await authService.requireSectionAuthoringAccess(
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

      const section = await fastify.prisma.examSection.findUnique({
        where: { id },
        include: { exam: { select: { id: true, isActive: true, isLocked: true } } },
      });
      if (!section) {
        return reply.status(404).send({ error: "Không tìm thấy phần thi" });
      }

      const isAdmin = request.user.roles.includes("admin");
      if (
        section.exam &&
        (section.exam.isActive === false || (section.exam.isLocked === true && !isAdmin))
      ) {
        return reply.status(409).send({
          error: "EXAM_LOCKED_IMMUTABLE",
          message: "Đề thi đang bị khóa hoặc đã lưu trữ, không thể xóa phần thi.",
        });
      }

      // Check student submissions protection
      const submissionCount = await fastify.prisma.examSubmission.count({
        where: { examId: section.examId },
      });
      if (submissionCount > 0) {
        return reply.status(409).send({
          error: "EXAM_HAS_SUBMISSIONS",
          message: "Không thể xóa phần thi khi bài thi đã có lượt làm bài của học viên.",
        });
      }

      await fastify.prisma.examSection.delete({
        where: { id },
      });

      return reply.send({
        success: true,
        message: "Đã xóa phần thi thành công.",
      });
    },
  );
};

export default sectionsRoutes;
