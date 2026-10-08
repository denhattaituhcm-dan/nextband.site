import { FastifyPluginAsync } from "fastify";
import "../plugins/prisma.js";

const readingDiscussionRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /reading-discussions/:caseId - Lấy danh sách bình luận / luận điểm theo caseId
  fastify.get("/:caseId", async (request, reply) => {
    const { caseId } = request.params as { caseId: string };

    try {
      const discussions = await fastify.prisma.readingDiscussion.findMany({
        where: { caseId },
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
  fastify.post("/", async (request, reply) => {
    const body = request.body as {
      caseId: string;
      authorName: string;
      authorBadge?: string;
      content: string;
      type?: string;
    };

    if (!body.caseId || !body.content || !body.authorName) {
      return reply.status(400).send({
        success: false,
        error: "Thiếu thông tin caseId, authorName hoặc nội dung luận điểm",
      });
    }

    try {
      const newDiscussion = await fastify.prisma.readingDiscussion.create({
        data: {
          caseId: body.caseId,
          authorName: body.authorName.trim().slice(0, 80),
          authorBadge: body.authorBadge?.trim() || "Học Viên",
          content: body.content.trim(),
          type: body.type || "THESIS_IDEA",
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
  });

  // POST /reading-discussions/:id/upvote - Tăng upvote cho luận điểm hay
  fastify.post("/:id/upvote", async (request, reply) => {
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
  });
};

export default readingDiscussionRoutes;
