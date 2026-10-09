import { FastifyPluginAsync } from "fastify";
import { CambridgePlacementService } from "../services/cambridge-placement.service.js";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const cambridgeRoutesFile = fileURLToPath(import.meta.url);
const cambridgeRoutesDir = path.dirname(cambridgeRoutesFile);
const audioDir = path.resolve(cambridgeRoutesDir, "../data/cambridge/audio");

const cambridgeRoutes: FastifyPluginAsync = async (fastify) => {
  const service = new CambridgePlacementService(fastify.prisma);

  // ==========================================
  // 1. PUBLIC / ROOM & STUDENT ENDPOINTS
  // ==========================================

  /**
   * Lấy thông tin phòng thi (Public - Học sinh mở link tham gia)
   */
  fastify.get<{ Params: { roomCode: string } }>(
    "/rooms/:roomCode",
    async (request, reply) => {
      try {
        const { roomCode } = request.params;
        const room = await service.getRoomInfo(roomCode);
        return reply.send({ success: true, data: room });
      } catch (err: any) {
        return reply.status(404).send({ error: "NotFound", message: err.message });
      }
    }
  );

  /**
   * Học sinh nhập họ tên và vào làm bài thi trong phòng
   */
  fastify.post<{
    Params: { roomCode: string };
    Body: { candidateName: string; candidateGrade?: string; existingTestCode?: string };
  }>(
    "/rooms/:roomCode/join",
    async (request, reply) => {
      try {
        const { roomCode } = request.params;
        const { candidateName, candidateGrade, existingTestCode } = request.body;
        const session = await service.joinRoom({
          roomCode,
          candidateName,
          candidateGrade,
          existingTestCode,
        });
        return reply.send({ success: true, data: session });
      } catch (err: any) {
        return reply.status(400).send({ error: "JoinError", message: err.message });
      }
    }
  );

  /**
   * Lấy đề thi cho học sinh theo testCode (Không có đáp án)
   */
  fastify.get<{ Params: { testCode: string } }>(
    "/student/:testCode",
    async (request, reply) => {
      try {
        const { testCode } = request.params;
        const data = await service.getStudentSession(testCode);
        return reply.send({ success: true, data });
      } catch (err: any) {
        return reply.status(400).send({ error: "NotFound", message: err.message });
      }
    }
  );

  /**
   * Học sinh lưu nháp câu trả lời
   */
  fastify.post<{ Params: { testCode: string }; Body: { answers: Record<string, any> } }>(
    "/student/:testCode/answers",
    async (request, reply) => {
      try {
        const { testCode } = request.params;
        const { answers } = request.body;
        const result = await service.saveAnswers(testCode, answers);
        return reply.send({ success: true, answers: result.answers });
      } catch (err: any) {
        return reply.status(400).send({ error: "SaveError", message: err.message });
      }
    }
  );

  /**
   * Học sinh hoàn thành Core -> Kiểm tra Gate (Tự động chuyển Extension nếu pass)
   */
  fastify.post<{ Params: { testCode: string } }>(
    "/student/:testCode/evaluate-gate",
    async (request, reply) => {
      try {
        const { testCode } = request.params;
        const gateResult = await service.evaluateCoreGate(testCode);
        return reply.send({ success: true, data: gateResult });
      } catch (err: any) {
        return reply.status(400).send({ error: "GateEvaluationError", message: err.message });
      }
    }
  );

  /**
   * Học sinh nộp bài thi cuối cùng
   */
  fastify.post<{ Params: { testCode: string }; Body: { answers?: Record<string, any> } }>(
    "/student/:testCode/submit",
    async (request, reply) => {
      try {
        const { testCode } = request.params;
        const { answers } = request.body || {};
        const submitted = await service.submitSession(testCode, answers);
        return reply.send({
          success: true,
          message: "Nộp bài thành công!",
          status: submitted.status,
          submittedAt: submitted.submittedAt,
        });
      } catch (err: any) {
        return reply.status(400).send({ error: "SubmitError", message: err.message });
      }
    }
  );

  /**
   * Phát file Audio cho học sinh làm bài Listening
   * Endpoint stream audio an toàn
   */
  fastify.get<{ Params: { filename: string } }>(
    "/audio/:filename",
    async (request, reply) => {
      const { filename } = request.params;
      const audioMap: Record<string, string> = {
        "AUD-T1": "Task 1.mp3",
        "AUD-T2": "Task 2.mp3",
        "AUD-T3": "Task 3.mp3",
        "AUD-T4": "Task 4.mp3",
        "AUD-T5": "Task 5.mp3",
        "task1.mp3": "Task 1.mp3",
        "task2.mp3": "Task 2.mp3",
        "task3.mp3": "Task 3.mp3",
        "task4.mp3": "Task 4.mp3",
        "task5.mp3": "Task 5.mp3",
      };
      const actualFilename = audioMap[filename] || filename;
      const safeFilename = path.basename(actualFilename);
      const filePath = path.join(audioDir, safeFilename);

      if (!fs.existsSync(filePath)) {
        return reply.status(404).send({ error: "NotFound", message: "Audio file not found: " + safeFilename });
      }

      const stat = fs.statSync(filePath);
      reply.header("Content-Type", "audio/mpeg");
      reply.header("Content-Length", stat.size);
      reply.header("Accept-Ranges", "bytes");

      const stream = fs.createReadStream(filePath);
      return reply.send(stream);
    }
  );

  // ==========================================
  // 2. TEACHER & ADMIN ROOM ENDPOINTS
  // ==========================================

  /**
   * Tạo phòng thi mới (Giáo viên)
   */
  fastify.post<{
    Body: {
      title: string;
      groupName?: string;
      teacherName?: string;
      durationMinutes?: number | null;
    };
  }>(
    "/admin/rooms",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const user = (request as any).user;
        const room = await service.createRoom({
          ...request.body,
          createdById: user?.id,
        });
        return reply.send({ success: true, data: room });
      } catch (err: any) {
        return reply.status(400).send({ error: "CreateRoomError", message: err.message });
      }
    }
  );

  /**
   * Danh sách phòng thi của giáo viên
   */
  fastify.get(
    "/admin/rooms",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const user = (request as any).user;
        const rooms = await service.listRooms(user?.id);
        return reply.send({ success: true, data: rooms });
      } catch (err: any) {
        return reply.status(500).send({ error: "ServerError", message: err.message });
      }
    }
  );

  /**
   * Chi tiết phòng thi & danh sách học sinh tham gia
   */
  fastify.get<{ Params: { roomId: string } }>(
    "/admin/rooms/:roomId",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const { roomId } = request.params;
        const room = await service.getRoomDetail(roomId);
        return reply.send({ success: true, data: room });
      } catch (err: any) {
        return reply.status(404).send({ error: "NotFound", message: err.message });
      }
    }
  );

  /**
   * Đóng phòng thi (Ngừng nhận học sinh mới)
   */
  fastify.post<{ Params: { roomId: string } }>(
    "/admin/rooms/:roomId/close",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const { roomId } = request.params;
        const closed = await service.closeRoom(roomId);
        return reply.send({ success: true, data: closed });
      } catch (err: any) {
        return reply.status(400).send({ error: "CloseRoomError", message: err.message });
      }
    }
  );

  // ==========================================
  // 3. TEACHER & ADMIN SESSION ENDPOINTS
  // ==========================================

  /**
   * Danh sách các phiên thi Cambridge
   */
  fastify.get<{
    Querystring: { status?: string; gradingStatus?: string; search?: string; limit?: number; offset?: number };
  }>(
    "/admin/sessions",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const result = await service.listSessions(request.query);
        return reply.send({ success: true, data: result.items, total: result.total });
      } catch (err: any) {
        return reply.status(500).send({ error: "ServerError", message: err.message });
      }
    }
  );

  /**
   * Tạo phiên thi mới cho học sinh
   */
  fastify.post<{
    Body: {
      candidateName: string;
      candidateGrade?: string;
      candidatePhone?: string;
      targetLevel?: string;
    };
  }>(
    "/admin/sessions",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const user = (request as any).user;
        const session = await service.createSession({
          ...request.body,
          createdById: user?.id,
        });
        return reply.send({ success: true, data: session });
      } catch (err: any) {
        return reply.status(400).send({ error: "CreateError", message: err.message });
      }
    }
  );

  /**
   * Xem chi tiết phiên thi (kèm bài làm học sinh, phân tích xếp lớp)
   */
  fastify.get<{ Params: { id: string } }>(
    "/admin/sessions/:id",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const detail = await service.getAdminSessionDetail(id);
        return reply.send({ success: true, data: detail });
      } catch (err: any) {
        return reply.status(404).send({ error: "NotFound", message: err.message });
      }
    }
  );

  /**
   * Giáo viên chấm điểm Writing, Speaking và duyệt xếp lớp
   */
  fastify.post<{
    Params: { id: string };
    Body: {
      writingScores?: any;
      speakingScores?: any;
      teacherNotes?: string;
      finalLevel?: "Flyers" | "KET" | "PET";
      adjustmentReason?: string;
    };
  }>(
    "/admin/sessions/:id/grade",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const user = (request as any).user;
        const updated = await service.gradeSession({
          sessionId: id,
          teacherId: user?.id,
          ...request.body,
        });
        return reply.send({ success: true, data: updated });
      } catch (err: any) {
        return reply.status(400).send({ error: "GradeError", message: err.message });
      }
    }
  );

  /**
   * Giáo viên cho phép học sinh vào Extension khi chưa đạt Gate (kèm lý do bắt buộc)
   */
  fastify.post<{ Params: { id: string }; Body: { reason: string } }>(
    "/admin/sessions/:id/override-gate",
    {
      preHandler: [authenticate, requireRoles("admin", "teacher")],
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const user = (request as any).user;
        const { reason } = request.body;
        const updated = await service.teacherOverrideGate(id, user?.id, reason);
        return reply.send({ success: true, data: updated });
      } catch (err: any) {
        return reply.status(400).send({ error: "OverrideError", message: err.message });
      }
    }
  );
};

export default cambridgeRoutes;
