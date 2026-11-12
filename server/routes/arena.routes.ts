import { FastifyInstance } from "fastify";
import { authenticate, optionalAuthenticate, requireRoles } from "../middlewares/auth.middleware.js";
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
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
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

  // POST /arena/rooms/:pin/kick - Host kick học sinh ra khỏi sảnh chờ để họ có thể tự vào lại
  fastify.post<{
    Params: { pin: string };
    Body: {
      hostToken: string;
      participantId: string;
    };
  }>(
    "/rooms/:pin/kick",
    async (request, reply) => {
      try {
        const { pin } = request.params;
        const { hostToken, participantId } = request.body || {};
        const result = await roomService.kickParticipant({
          pin,
          hostToken,
          participantId,
        });
        return reply.code(200).send({
          success: true,
          data: result,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Lỗi khi mời học sinh ra khỏi phòng.",
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
      gameMode?: string;
    };
  }>(
    "/rooms/:id/command",
    async (request, reply) => {
      try {
        const { commandId, action, pin, hostToken, gameMode } = request.body || {};
        const engineService = new (await import("../services/arena-engine.service.js")).ArenaEngineService(fastify.prisma);
        const result = await engineService.executeHostCommand({
          commandId,
          action,
          pin,
          hostToken,
          gameMode,
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
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
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
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
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
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
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

  // POST /arena/solo/runs - Lưu kết quả đấu đơn và tạo mã thách đấu
  fastify.post<{
    Body: {
      nickname: string;
      avatarId?: number;
      totalScore: number;
      correctCount: number;
      totalQuestions?: number;
      maxStreak?: number;
      avgResponseMs?: number;
      challengeCode?: string;
      questionIds?: string[];
    };
  }>(
    "/solo/runs",
    { preHandler: [optionalAuthenticate] },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user?.userId || user?.id || null;
      const body = request.body;

      if (!body || typeof body.totalScore !== "number") {
        return reply.code(400).send({ success: false, error: "Dữ liệu kết quả không hợp lệ." });
      }

      const nickname = (body.nickname || "Chiến Binh IELTS").trim().slice(0, 50);
      const avatarId = Number(body.avatarId) || 0;
      const totalScore = Math.max(0, Math.floor(body.totalScore));
      const correctCount = Math.max(0, Math.min(50, Number(body.correctCount) || 0));
      const totalQuestions = Math.max(1, Number(body.totalQuestions) || 10);
      const maxStreak = Math.max(0, Number(body.maxStreak) || 0);
      const avgResponseMs = Math.max(0, Number(body.avgResponseMs) || 0);
      const questionIds = Array.isArray(body.questionIds) ? body.questionIds.map(String) : [];

      // Sinh mã thách đấu ngẫu nhiên 6 ký tự viết hoa duy nhất (vd: DL-9X2Y)
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newChallengeCode = `DL-${randomSuffix}`;

      const run = await fastify.prisma.arenaSoloRun.create({
        data: {
          userId,
          nickname,
          avatarId,
          totalScore,
          correctCount,
          totalQuestions,
          maxStreak,
          avgResponseMs,
          challengeCode: newChallengeCode,
          questionIds,
        },
      });

      return reply.code(201).send({
        success: true,
        data: {
          id: run.id,
          challengeCode: run.challengeCode,
          totalScore: run.totalScore,
          createdAt: run.createdAt,
        },
      });
    }
  );

  // GET /arena/solo/leaderboard - Bảng xếp hạng cao thủ Đấu Trường
  fastify.get<{
    Querystring: { timeframe?: "today" | "week" | "all"; limit?: number };
  }>(
    "/solo/leaderboard",
    async (request, reply) => {
      const { timeframe = "week", limit = 15 } = request.query;
      const safeLimit = Math.min(50, Math.max(1, Number(limit) || 15));

      let dateFilter: Date | undefined;
      const now = new Date();
      if (timeframe === "today") {
        dateFilter = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (timeframe === "week") {
        dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      }

      const runs = await fastify.prisma.arenaSoloRun.findMany({
        where: dateFilter ? { createdAt: { gte: dateFilter } } : undefined,
        orderBy: [
          { totalScore: "desc" },
          { correctCount: "desc" },
          { avgResponseMs: "asc" },
          { createdAt: "asc" },
        ],
        take: safeLimit * 2,
        select: {
          id: true,
          nickname: true,
          avatarId: true,
          totalScore: true,
          correctCount: true,
          totalQuestions: true,
          maxStreak: true,
          avgResponseMs: true,
          challengeCode: true,
          createdAt: true,
        },
      });

      // Lọc trùng theo nickname để mỗi người chơi chỉ xuất hiện điểm cao nhất
      const seenNicknames = new Set<string>();
      const leaderboard: typeof runs = [];
      for (const r of runs) {
        const lower = r.nickname.toLowerCase();
        if (!seenNicknames.has(lower)) {
          seenNicknames.add(lower);
          leaderboard.push(r);
          if (leaderboard.length >= safeLimit) break;
        }
      }

      return reply.send({
        success: true,
        data: leaderboard,
      });
    }
  );

  // GET /arena/solo/challenge/:code - Lấy thông tin người thách đấu
  fastify.get<{
    Params: { code: string };
  }>(
    "/solo/challenge/:code",
    async (request, reply) => {
      const { code } = request.params;
      const run = await fastify.prisma.arenaSoloRun.findFirst({
        where: { challengeCode: code.toUpperCase() },
        select: {
          id: true,
          nickname: true,
          avatarId: true,
          totalScore: true,
          correctCount: true,
          totalQuestions: true,
          maxStreak: true,
          avgResponseMs: true,
          questionIds: true,
          createdAt: true,
        },
      });

      if (!run) {
        return reply.code(404).send({
          success: false,
          error: "Mã thách đấu không tồn tại hoặc đã hết hạn.",
          code: "CHALLENGE_NOT_FOUND",
        });
      }

      return reply.send({
        success: true,
        data: run,
      });
    }
  );
}

