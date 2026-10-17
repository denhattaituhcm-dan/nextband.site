import { FastifyPluginAsync } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

const facultyRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/faculty - Public: Lấy danh sách giảng viên đã xuất bản
  fastify.get("/", async (_request, reply) => {
    try {
      const items = await fastify.prisma.facultyProfile.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "asc" },
      });
      return reply.send({ success: true, data: items });
    } catch (err: any) {
      fastify.log.error(err, "Failed to get faculty profiles");
      return reply.status(500).send({ error: "Failed to get faculty profiles" });
    }
  });

  // GET /api/v1/faculty/all - Admin: Lấy toàn bộ giảng viên (bao gồm bản nháp)
  fastify.get(
    "/all",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (_request, reply) => {
      try {
        const items = await fastify.prisma.facultyProfile.findMany({
          orderBy: { createdAt: "asc" },
        });
        return reply.send({ success: true, data: items });
      } catch (err: any) {
        fastify.log.error(err, "Failed to get all faculty profiles");
        return reply.status(500).send({ error: "Failed to get faculty profiles" });
      }
    }
  );

  // POST /api/v1/faculty - Admin: Tạo hoặc cập nhật hồ sơ giảng viên
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      try {
        const body = request.body as any;
        const {
          id,
          name,
          role,
          avatar_url,
          avatarUrl,
          ielts_badge,
          ieltsBadge,
          ielts_badge_sub,
          ieltsBadgeSub,
          achievements,
          trf_image_url,
          trfImageUrl,
          is_published,
          isPublished,
        } = body;

        const data: any = {
          name: name || "Giảng viên ARIS",
          role: role || "IELTS Instructor",
          avatarUrl: avatarUrl !== undefined ? avatarUrl : (avatar_url !== undefined ? avatar_url : null),
          ieltsBadge: ieltsBadge !== undefined ? ieltsBadge : (ielts_badge || "8.0"),
          ieltsBadgeSub: ieltsBadgeSub !== undefined ? ieltsBadgeSub : (ielts_badge_sub || null),
          achievements: Array.isArray(achievements) ? achievements : [],
          trfImageUrl: trfImageUrl !== undefined ? trfImageUrl : (trf_image_url !== undefined ? trf_image_url : null),
          isPublished: isPublished !== undefined ? Boolean(isPublished) : (is_published !== undefined ? Boolean(is_published) : true),
        };

        let result;
        if (id && id !== "luu-van-dang") {
          result = await fastify.prisma.facultyProfile.upsert({
            where: { id },
            create: { id, ...data },
            update: data,
          });
        } else {
          result = await fastify.prisma.facultyProfile.create({
            data,
          });
        }

        return reply.status(200).send({ success: true, data: result });
      } catch (err: any) {
        fastify.log.error(err, "Failed to save faculty profile");
        return reply.status(500).send({ error: "Failed to save faculty profile" });
      }
    }
  );

  // PATCH /api/v1/faculty/:id/toggle-publish - Admin: Bật/tắt trạng thái xuất bản
  fastify.patch(
    "/:id/toggle-publish",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const { isPublished, is_published } = request.body as any;
        const targetState = isPublished !== undefined ? Boolean(isPublished) : Boolean(is_published);

        const updated = await fastify.prisma.facultyProfile.update({
          where: { id },
          data: { isPublished: targetState },
        });

        return reply.send({ success: true, data: updated });
      } catch (err: any) {
        fastify.log.error(err, "Failed to toggle faculty publish state");
        return reply.status(500).send({ error: "Failed to toggle publish status" });
      }
    }
  );

  // DELETE /api/v1/faculty/:id - Admin: Xóa hồ sơ giảng viên
  fastify.delete(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        if (id === "luu-van-dang") {
          // Xóa fallback seed theo tên nếu tồn tại
          await fastify.prisma.facultyProfile.deleteMany({
            where: { name: "Lưu Văn Đang" },
          });
          return reply.send({ success: true, message: "Faculty deleted successfully" });
        }

        await fastify.prisma.facultyProfile.delete({
          where: { id },
        });

        return reply.send({ success: true, message: "Faculty deleted successfully" });
      } catch (err: any) {
        fastify.log.error(err, "Failed to delete faculty profile");
        return reply.status(500).send({ error: "Failed to delete faculty profile" });
      }
    }
  );
};

export default facultyRoutes;
