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

  // POST /arena/rooms/:pin/reclaim - Khôi phục quyền Host và Snapshot sau khi F5/disconnect
  fastify.post<{
    Params: { pin: string };
    Body: {
      hostToken: string;
    };
  }>(
    "/rooms/:pin/reclaim",
    async (request, reply) => {
      try {
        const { pin } = request.params;
        const { hostToken } = request.body || {};
        const engineService = new (await import("../services/arena-engine.service.js")).ArenaEngineService(fastify.prisma);
        const snapshot = await engineService.reclaimHostSnapshot(pin, hostToken);
        return reply.code(200).send({
          success: true,
          data: snapshot,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Lỗi khi khôi phục snapshot Host.",
          code: err?.code || "INTERNAL_ERROR",
        });
      }
    }
  );

  // GET /arena/questions - Xem bộ câu hỏi của bài học (tùy chỉnh hoặc mặc định)
  fastify.get<{
    Querystring: { examId?: string; lessonKey?: string };
  }>(
    "/questions",
    { preHandler: [authenticate] },
    async (request, reply) => {
      try {
        const { examId, lessonKey } = request.query;
        const { ArenaBankService } = await import("../services/arena-bank.service.js");
        const bankService = new ArenaBankService(fastify.prisma);
        const data = await bankService.getQuestionsByLesson(lessonKey, examId);
        return reply.send({
          success: true,
          data,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Không thể tải bộ câu hỏi.",
        });
      }
    }
  );

  // PUT /arena/questions - Admin lưu lại chỉnh sửa bộ câu hỏi
  fastify.put<{
    Body: {
      examId?: string;
      lessonKey?: string;
      questions: any[];
    };
  }>(
    "/questions",
    { preHandler: [authenticate] },
    async (request, reply) => {
      try {
        const { examId, lessonKey, questions } = request.body || {};
        if (!Array.isArray(questions) || questions.length === 0) {
          return reply.code(400).send({
            success: false,
            error: "Danh sách câu hỏi không được để trống.",
          });
        }

        const { ArenaBankService } = await import("../services/arena-bank.service.js");
        const bankService = new ArenaBankService(fastify.prisma);
        await bankService.saveCustomQuestions({
          lessonKey,
          examId,
          questions,
        });

        return reply.send({
          success: true,
          message: "Đã lưu bộ câu hỏi thành công!",
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Không thể lưu bộ câu hỏi.",
        });
      }
    }
  );

  // DELETE /arena/questions - Khôi phục về bộ câu hỏi mặc định của giáo trình
  fastify.delete<{
    Querystring: { examId?: string; lessonKey?: string };
  }>(
    "/questions",
    { preHandler: [authenticate] },
    async (request, reply) => {
      try {
        const { examId, lessonKey } = request.query;
        const { ArenaBankService } = await import("../services/arena-bank.service.js");
        const bankService = new ArenaBankService(fastify.prisma);
        await bankService.resetCustomQuestions(lessonKey, examId);
        return reply.send({
          success: true,
          message: "Đã khôi phục bộ câu hỏi gốc của giáo trình thành công!",
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Không thể khôi phục bộ câu hỏi.",
        });
      }
    }
  );
}

