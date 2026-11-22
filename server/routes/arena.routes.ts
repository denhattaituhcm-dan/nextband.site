import { FastifyInstance } from "fastify";
import { randomBytes } from "crypto";
import { authenticate, optionalAuthenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { ArenaRoomService } from "../services/arena-room.service.js";

const MAX_SOLO_QUESTIONS = 50;
const MAX_POINTS_PER_SOLO_QUESTION = 2600; // (1000 base + 15s * 20 time bonus) * 2.0 max streak multiplier

export default async function arenaRoutes(fastify: FastifyInstance) {
  const roomService = new ArenaRoomService(fastify.prisma);

  // POST /arena/rooms - Tạo phòng thi đấu mới (Mở cho cộng đồng có quota 20 phòng + Luồng VIP Giáo viên/Admin)
  fastify.post<{
    Body: {
      examId?: string;
      config?: any;
    };
  }>(
    "/rooms",
    { preHandler: [optionalAuthenticate] },
    async (request, reply) => {
      try {
        const user = request.user as any;
        const hostUserId = user?.userId || user?.id || undefined;
        const hostRoles: string[] = Array.isArray(user?.roles)
          ? user.roles
          : user?.role
          ? [user.role]
          : [];
        const isVip = hostRoles.includes("admin") || hostRoles.includes("teacher");
        const forwarded = request.headers["x-forwarded-for"];
        const clientIp =
          (Array.isArray(forwarded) ? forwarded[0] : forwarded)
            ?.split(",")[0]
            ?.trim() ||
          request.ip ||
          "unknown";

        const room = await roomService.createRoom({
          hostUserId,
          hostRoles,
          clientIp,
          isCommunityRoom: !isVip,
          examId: request.body?.examId,
          config: request.body?.config,
        });

        return reply.code(201).send({
          success: true,
          data: room,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Không thể khởi tạo phòng thi đấu.",
          code: err?.code || "INTERNAL_ERROR",
        });
      }
    }
  );

  // GET /arena/rooms/public - Lấy danh sách phòng công khai đang ở sảnh chờ & trạng thái quota
  fastify.get("/rooms/public", async (_request, reply) => {
    try {
      const data = await roomService.getPublicLobbyRooms();
      return reply.send({
        success: true,
        data,
      });
    } catch (err: any) {
      const statusCode = err?.statusCode || 500;
      return reply.code(statusCode).send({
        success: false,
        error: err?.message || "Không thể tải danh sách phòng công khai.",
        code: err?.code || "INTERNAL_ERROR",
      });
    }
  });

  // POST /arena/rooms/:pin/close - Chủ phòng chủ động đóng phòng để giải phóng slot
  fastify.post<{
    Params: { pin: string };
    Body: { hostToken: string };
  }>(
    "/rooms/:pin/close",
    async (request, reply) => {
      try {
        const result = await roomService.closeRoom({
          pin: request.params.pin,
          hostToken: request.body?.hostToken,
        });
        return reply.code(200).send({
          success: true,
          data: result,
        });
      } catch (err: any) {
        const statusCode = err?.statusCode || 500;
        return reply.code(statusCode).send({
          success: false,
          error: err?.message || "Không thể đóng phòng thi đấu.",
          code: err?.code || "INTERNAL_ERROR",
        });
      }
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
    {
      preHandler: [optionalAuthenticate],
      config: {
        rateLimit: {
          max: 15,
          timeWindow: "5 minutes",
        },
      },
    },
    async (request, reply) => {
      const user = request.user as any;
      const userId = user?.userId || user?.id || null;
      const body = request.body;

      if (
        !body ||
        typeof body.totalScore !== "number" ||
        !Number.isFinite(body.totalScore) ||
        typeof body.correctCount !== "number" ||
        !Number.isFinite(body.correctCount)
      ) {
        return reply.code(400).send({ success: false, error: "Dữ liệu kết quả không hợp lệ." });
      }

      const rawTotalQuestions = body.totalQuestions !== undefined ? Number(body.totalQuestions) : 10;
      if (
        !Number.isInteger(rawTotalQuestions) ||
        rawTotalQuestions < 1 ||
        rawTotalQuestions > MAX_SOLO_QUESTIONS
      ) {
        return reply.code(400).send({
          success: false,
          error: `Tổng số câu hỏi không hợp lệ (1 - ${MAX_SOLO_QUESTIONS}).`,
        });
      }

      const rawCorrectCount = Math.floor(body.correctCount);
      if (rawCorrectCount < 0 || rawCorrectCount > rawTotalQuestions) {
        return reply.code(400).send({
          success: false,
          error: "Số câu trả lời đúng không hợp lệ.",
        });
      }

      const rawTotalScore = Math.floor(body.totalScore);
      const maxAllowedScore = rawCorrectCount * MAX_POINTS_PER_SOLO_QUESTION;
      if (rawTotalScore < 0 || rawTotalScore > maxAllowedScore) {
        return reply.code(400).send({
          success: false,
          error: "Điểm số vượt quá ngưỡng hợp lệ của hệ thống chấm điểm Đấu Trường.",
        });
      }

      const nickname = (body.nickname || "Chiến Binh IELTS").trim().slice(0, 50) || "Chiến Binh IELTS";
      const avatarId = Math.max(0, Math.min(100, Math.floor(Number(body.avatarId) || 0)));
      const totalScore = rawTotalScore;
      const correctCount = rawCorrectCount;
      const totalQuestions = rawTotalQuestions;
      const maxStreak = Math.max(0, Math.min(correctCount, Math.floor(Number(body.maxStreak) || 0)));
      const avgResponseMs = Math.max(0, Math.min(60000, Math.floor(Number(body.avgResponseMs) || 0)));
      const questionIds = Array.isArray(body.questionIds)
        ? body.questionIds.slice(0, MAX_SOLO_QUESTIONS).map((id) => String(id).slice(0, 100))
        : [];

      // Sinh mã thách đấu ngẫu nhiên 6 ký tự viết hoa duy nhất bằng CSPRNG (vd: DL-9X2Y8A)
      const randomSuffix = randomBytes(4).toString("hex").slice(0, 6).toUpperCase();
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

