import { FastifyPluginAsync } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

const evidenceRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/evidence - Public: Lấy danh sách vinh danh đã xuất bản
  fastify.get("/", async (_request, reply) => {
    try {
      const items = await fastify.prisma.studentEvidence.findMany({
        where: { published: true, consentConfirmed: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      });
      return reply.send({ success: true, data: items });
    } catch (err: any) {
      fastify.log.error(err, "Failed to get evidence items");
      return reply.status(500).send({ error: "Failed to get evidence items" });
    }
  });

  // GET /api/v1/evidence/all - Admin: Lấy toàn bộ danh sách vinh danh
  fastify.get(
    "/all",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (_request, reply) => {
      try {
        const items = await fastify.prisma.studentEvidence.findMany({
          orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
        });
        return reply.send({ success: true, data: items });
      } catch (err: any) {
        fastify.log.error(err, "Failed to get all evidence items");
        return reply.status(500).send({ error: "Failed to get evidence items" });
      }
    }
  );

  // POST /api/v1/evidence - Admin: Tạo hoặc cập nhật minh chứng vinh danh
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      try {
        const body = request.body as any;
        const {
          id,
          studentName,
          studentSchool,
          title,
          imageUrl,
          story,
          scoreBefore,
          overallScore,
          listeningScore,
          readingScore,
          writingScore,
          speakingScore,
          studyDuration,
          courseName,
          featured,
          published,
          consentConfirmed,
          displayOrder,
        } = body;

        const data: any = {
          studentName: studentName || "Học viên ARIS",
          studentSchool: studentSchool || null,
          title: title || "Tiến bộ năng lực IELTS cùng ARIS",
          imageUrl: imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
          story: story || "",
          scoreBefore: scoreBefore || null,
          overallScore: overallScore || "6.5",
          listeningScore: listeningScore || null,
          readingScore: readingScore || null,
          writingScore: writingScore || null,
          speakingScore: speakingScore || null,
          studyDuration: studyDuration || "12 tuần",
          courseName: courseName || "Khóa MASTER",
          featured: Boolean(featured),
          published: Boolean(published && consentConfirmed),
          consentConfirmed: Boolean(consentConfirmed),
          displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
        };

        let result;
        if (id && !id.startsWith("evi-")) {
          result = await fastify.prisma.studentEvidence.upsert({
            where: { id },
            create: { id, ...data },
            update: data,
          });
        } else {
          result = await fastify.prisma.studentEvidence.create({
            data,
          });
        }

        return reply.status(200).send({ success: true, data: result });
      } catch (err: any) {
        fastify.log.error(err, "Failed to save evidence item");
        return reply.status(500).send({ error: "Failed to save evidence item" });
      }
    }
  );

  // DELETE /api/v1/evidence/:id - Admin: Xóa minh chứng vinh danh
  fastify.delete(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        await fastify.prisma.studentEvidence.delete({
          where: { id },
        });

        return reply.send({ success: true, message: "Evidence item deleted successfully" });
      } catch (err: any) {
        fastify.log.error(err, "Failed to delete evidence item");
        return reply.status(500).send({ error: "Failed to delete evidence item" });
      }
    }
  );
};

export default evidenceRoutes;
