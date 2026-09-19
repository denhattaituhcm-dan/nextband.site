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

  // POST /arena/rooms/join - Bắt tay đăng ký học sinh vào phòng đấu (Pre-join Verification)
  fastify.post<{
    Body: {
      pin: string;
      nickname: string;
      avatarId?: number;
    };
  }>(
    "/rooms/join",
    async (request, reply) => {
      try {
        const result = await roomService.joinRoom(request.body || ({} as any));
        return reply.code(200).send({
          success: true,
          data: result,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Lỗi khi tham gia phòng đấu.",
          code: err?.code || "INTERNAL_ERROR",
        });
      }
    }
  );
  // POST /arena/rooms/:id/command - Thực thi lệnh Host (Server-Authoritative State Machine)
  fastify.post<{
    Params: { id: string };
    Body: {
      commandId: string;
      action: any;
      pin: string;
      hostToken: string;
    };
  }>(
    "/rooms/:id/command",
    async (request, reply) => {
      try {
        const { commandId, action, pin, hostToken } = request.body || {};
        const engineService = new (await import("../services/arena-engine.service.js")).ArenaEngineService(fastify.prisma);
        const result = await engineService.executeHostCommand({
          commandId,
          action,
          pin,
          hostToken,
        });
        return reply.code(200).send({
          success: true,
          data: result,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Lỗi khi thực thi lệnh Host.",
          code: err?.code || "INTERNAL_ERROR",
        });
      }
    }
  );

  // POST /arena/rooms/:id/answers - Học sinh nộp đáp án (Server-Side Scoring & Deadline Check)
  fastify.post<{
    Params: { id: string };
    Body: {
      playerSessionToken: string;
      questionId: string;
      roundIndex: number;
      selectedOptionId: string;
      clientTelemetryTime?: string;
    };
  }>(
    "/rooms/:id/answers",
    async (request, reply) => {
      try {
        const { id: roomId } = request.params;
        const { playerSessionToken, questionId, roundIndex, selectedOptionId, clientTelemetryTime } = request.body || {};
        const engineService = new (await import("../services/arena-engine.service.js")).ArenaEngineService(fastify.prisma);
        const result = await engineService.submitAnswer({
          roomId,
          playerSessionToken,
          questionId,
          roundIndex,
          selectedOptionId,
          clientTelemetryTime,
        });
        return reply.code(200).send({
          success: true,
          data: result,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Lỗi khi nộp đáp án.",
          code: err?.code || "INTERNAL_ERROR",
        });
      }
    }
  );
}

