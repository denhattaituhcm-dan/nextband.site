import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { ClassController } from "../controllers/class.controller.js";

export default async function classesRoutes(fastify: FastifyInstance) {
  const controller = new ClassController(fastify);

  // GET /classes/my-classes — Danh sách lớp học của học viên đang đăng nhập
  // PHẢI được đăng ký TRƯỚC /:id để Fastify không nhầm "my-classes" là classId
  fastify.get("/my-classes", { preHandler: authenticate }, async (request, reply) => {
    return controller.getMyClasses(request, reply);
  });

  // GET /classes/league-standings - Bảng tổng sắp thi đua liên lớp toàn trung tâm
  fastify.get<{ Querystring: { branchId?: string } }>(
    "/league-standings",
    { preHandler: authenticate },
    async (request, reply) => {
      return controller.getLeagueStandings(request, reply);
    }
  );

  // GET /classes - Lấy danh sách lớp
  fastify.get("/", { preHandler: authenticate }, async (request, reply) => {
    return controller.list(request, reply);
  });

  // GET /classes/:id - Chi tiết lớp học
  fastify.get<{ Params: { id: string } }>("/:id", { preHandler: authenticate }, async (request, reply) => {
    return controller.getById(request, reply);
  });

  // GET /classes/:id/sessions - Lấy danh sách buổi học của lớp
  fastify.get<{ Params: { id: string } }>("/:id/sessions", { preHandler: authenticate }, async (request, reply) => {
    return controller.getSessions(request, reply);
  });

  // POST /classes/:id/generate-sessions - Sinh / cập nhật danh sách buổi học
  fastify.post<{
    Params: { id: string };
    Body: {
      startDate: string;
      weekdays: number[];
      totalSessions: number;
      startTime: string;
      endTime: string;
    };
  }>(
    "/:id/generate-sessions",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      return controller.generateSessions(request, reply);
    }
  );

  // POST /classes - Tạo lớp mới (Chỉ dành cho Quản trị viên / Admin)
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      return controller.create(request, reply);
    }
  );

  // PUT /classes/:id - Cập nhật thông tin lớp (Admin hoặc Teacher phụ trách lớp)
  fastify.put<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      return controller.update(request, reply);
    }
  );

  // POST /classes/:id/students - Thêm học viên vào lớp
  fastify.post<{ Params: { id: string }; Body: { studentId: string } }>(
    "/:id/students",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      return controller.addStudent(request, reply);
    }
  );

  // DELETE /classes/:id/students/:studentId - Xóa học viên khỏi lớp
  fastify.delete<{ Params: { id: string; studentId: string } }>(
    "/:id/students/:studentId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      return controller.removeStudent(request, reply);
    }
  );

  // DELETE /classes/:id - Xóa / Lưu trữ lớp học (Admin only)
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { id } = request.params;

      const existing = await fastify.prisma.class.findUnique({
        where: { id },
        select: { id: true, name: true, status: true, isActive: true },
      });

      if (!existing) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      const activeStudentCount = await fastify.prisma.classStudent.count({
        where: {
          classId: id,
          status: "ACTIVE",
          deletedAt: null,
        },
      });

      if (activeStudentCount > 0) {
        return reply.status(409).send({
          error: `Không thể xóa lớp học vì vẫn còn ${activeStudentCount} học viên đang theo học. Vui lòng chuyển hoặc cho học viên tốt nghiệp trước khi xóa.`,
        });
      }

      await fastify.prisma.class.update({
        where: { id },
        data: {
          isActive: false,
          status: "ARCHIVED",
          archivedAt: new Date(),
        },
      });

      return reply.send({ success: true, message: "Đã xóa lớp học thành công" });
    },
  );

  // POST /classes/:id/homework-deadline - Cập nhật deadline bài tập cho lớp
  fastify.post<{ Params: { id: string }; Body: { examId: string; deadline: string | null } }>(
    "/:id/homework-deadline",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      return controller.setHomeworkDeadline(request, reply);
    }
  );

  // GET /classes/:id/leaderboard - Bảng xếp hạng tiến độ thi đua của các bạn trong lớp
  fastify.get<{ Params: { id: string } }>(
    "/:id/leaderboard",
    { preHandler: authenticate },
    async (request, reply) => {
      return controller.getLeaderboard(request, reply);
    }
  );

  // GET /classes/:id/graduation-summary - Báo cáo tổng kết & vinh danh tốt nghiệp cuối khóa
  fastify.get<{ Params: { id: string } }>(
    "/:id/graduation-summary",
    { preHandler: authenticate },
    async (request, reply) => {
      return controller.getGraduationSummary(request, reply);
    }
  );

  // POST /classes/:id/close - Đóng lớp học (Thủ công bởi Teacher hoặc Admin)
  fastify.post<{ Params: { id: string } }>(
    "/:id/close",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      return controller.close(request, reply);
    }
  );

  // POST /classes/maintenance - Tác vụ bảo trì vòng đời lớp (Quét tự động đóng & xóa dọn dẹp)
  fastify.post(
    "/maintenance",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      return controller.triggerMaintenance(request, reply);
    }
  );
}
