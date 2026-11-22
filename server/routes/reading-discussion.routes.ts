import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import "../plugins/prisma.js";
import { optionalAuthenticate } from "../middlewares/auth.middleware.js";

const createDiscussionSchema = z.object({
  caseId: z.string().trim().min(1, "Thiếu thông tin caseId").max(60, "caseId quá dài"),
  authorName: z.string().trim().min(1, "Vui lòng nhập tên hiển thị").max(80, "Tên hiển thị tối đa 80 ký tự"),
  authorBadge: z.string().trim().max(40, "Danh xưng tối đa 40 ký tự").optional(),
  content: z
    .string()
    .trim()
    .min(1, "Nội dung luận điểm không được để trống")
    .max(2000, "Nội dung luận điểm không được vượt quá 2000 ký tự"),
  type: z.enum(["THESIS_IDEA", "COUNTER_ARG", "VOCAB_QUESTION"]).optional().default("THESIS_IDEA"),
});

const RESERVED_STAFF_BADGE_PATTERN = /\b(admin|quản\s*trị|giáo\s*viên|giảng\s*viên|ban\s*học\s*thuật|aris\s*staff|moderator)\b/i;

const readingDiscussionRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /reading-discussions/:caseId - Lấy danh sách bình luận / luận điểm theo caseId
  fastify.get("/:caseId", async (request, reply) => {
    const { caseId } = request.params as { caseId: string };

    try {
      const discussions = await fastify.prisma.readingDiscussion.findMany({
        where: { caseId: String(caseId).slice(0, 60) },
        orderBy: [
          { upvotes: "desc" },
          { createdAt: "desc" },
        ],
        take: 50,
      });

      return reply.send({
        success: true,
        data: discussions,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        success: false,
        error: "Failed to fetch discussions",
      });
    }
  });

  // POST /reading-discussions - Đăng một luận điểm mới
  fastify.post(
    "/",
    {
      preHandler: [optionalAuthenticate],
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "10 minutes",
        },
      },
    },
    async (request, reply) => {
      const parsed = createDiscussionSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: parsed.error.issues[0]?.message || "Thiếu thông tin caseId, authorName hoặc nội dung luận điểm",
        });
      }

      const { caseId, authorName, authorBadge, content, type } = parsed.data;
      const userRoles: string[] = Array.isArray((request as any).user?.roles)
        ? (request as any).user.roles
        : [];
      const isPrivilegedStaff = userRoles.includes("admin") || userRoles.includes("teacher");

      let safeAuthorName = authorName;
      let safeAuthorBadge = authorBadge || "Học Viên";

      if (!isPrivilegedStaff) {
        if (RESERVED_STAFF_BADGE_PATTERN.test(safeAuthorBadge)) {
          safeAuthorBadge = "Học Viên";
        }
        if (RESERVED_STAFF_BADGE_PATTERN.test(safeAuthorName)) {
          safeAuthorName = safeAuthorName.replace(RESERVED_STAFF_BADGE_PATTERN, "Học Viên").trim() || "Học Viên";
        }
      }

      try {
        const newDiscussion = await fastify.prisma.readingDiscussion.create({
          data: {
            caseId,
            authorName: safeAuthorName,
            authorBadge: safeAuthorBadge,
            content,
            type,
            upvotes: 0,
          },
        });

        return reply.status(201).send({
          success: true,
          data: newDiscussion,
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          success: false,
          error: "Failed to create discussion",
        });
      }
    },
  );

  // POST /reading-discussions/:id/upvote - Tăng upvote cho luận điểm hay
  fastify.post(
    "/:id/upvote",
    {
      config: {
        rateLimit: {
          max: 20,
          timeWindow: "10 minutes",
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        const updated = await fastify.prisma.readingDiscussion.update({
          where: { id },
          data: {
            upvotes: { increment: 1 },
          },
        });

        return reply.send({
          success: true,
          data: updated,
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({
          success: false,
          error: "Failed to upvote discussion",
        });
      }
    },
  );
};

export default readingDiscussionRoutes;
