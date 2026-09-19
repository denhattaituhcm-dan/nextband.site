import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middleware.js";
import { ArenaRoomService } from "../services/arena-room.service.js";

export default async function arenaRoutes(fastify: FastifyInstance) {
  const roomService = new ArenaRoomService(fastify.prisma);

  // POST /arena/rooms - Giáo viên tạo phòng thi đấu mới
  fastify.post<{
    Body: {
      examId?: string;
      config?: any;
    };
  }>(
    "/rooms",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const hostUserId = user?.userId || user?.id;

      const room = await roomService.createRoom({
        hostUserId,
        examId: request.body?.examId,
        config: request.body?.config,
      });

      return reply.code(201).send({
        success: true,
        data: room,
      });
    }
  );

  // GET /arena/rooms/:pin - Lấy thông tin phòng qua mã PIN (Active only)
  fastify.get<{
    Params: { pin: string };
  }>(
    "/rooms/:pin",
    async (request, reply) => {
      const { pin } = request.params;
      const room = await roomService.getRoomByPin(pin);

      if (!room) {
        return reply.code(404).send({
          success: false,
          error: "Phòng thi đấu không tồn tại hoặc đã kết thúc.",
          code: "ROOM_NOT_FOUND",
        });
      }

      return reply.send({
        success: true,
        data: room,
      });
    }
  );
}
