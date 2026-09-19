import { PrismaClient, ArenaRoomStatus } from "@prisma/client";
import { ArenaPinService } from "./arena-pin.service.js";
import { ARENA_STANDARD_QUESTIONS, ArenaQuestion } from "./arena-questions.data.js";

export type HostCommandAction =
  | "START_ARENA"
  | "LOCK_ROUND"
  | "REVEAL_DISTRIBUTION"
  | "REVEAL_PERSONAL"
  | "SHOW_LEADERBOARD"
  | "NEXT_ROUND"
  | "FINISH_ARENA"
  | "RESTART_ARENA";

export interface ExecuteCommandInput {
  commandId: string;
  action: HostCommandAction;
  pin: string;
  hostToken: string;
}

export interface SubmitAnswerInput {
  roomId: string;
  playerSessionToken: string;
  questionId: string;
  roundIndex: number;
  selectedOptionId: string;
  clientTelemetryTime?: string;
}

export class ArenaEngineService {
  private pinService: ArenaPinService;

  constructor(private prisma: PrismaClient) {
    this.pinService = new ArenaPinService(prisma);
  }

  /**
   * Authoritative Host Command Dispatcher with Idempotency Guard
   */
  public async executeHostCommand(input: ExecuteCommandInput) {
    const { commandId, action, pin, hostToken } = input;

    if (!commandId || !action || !pin || !hostToken) {
      const err: any = new Error("Thiếu tham số bắt buộc để thực thi lệnh.");
      err.statusCode = 400;
      err.code = "BAD_REQUEST";
      throw err;
    }

    // 1. Tìm phòng và thẩm định Host Token
    const room = await this.prisma.arenaRoom.findFirst({
      where: {
        pin,
        status: { not: "ENDED" },
      },
    });

    if (!room) {
      const err: any = new Error("Phòng thi đấu không tồn tại hoặc đã kết thúc.");
      err.statusCode = 404;
      err.code = "ROOM_NOT_FOUND";
      throw err;
    }

    const isTokenValid = this.pinService.verifyHostToken(hostToken, room.hostTokenHash);
    if (!isTokenValid) {
      const err: any = new Error("Host Token không hợp lệ. Bạn không có quyền điều khiển phòng này.");
      err.statusCode = 403;
      err.code = "INVALID_HOST_TOKEN";
      throw err;
    }

    // 2. Idempotency Check: Nếu lệnh này đã được xử lý thành công trước đó (do mạng retry)
    if (room.lastCommandId === commandId) {
      return {
        idempotent: true,
        roomId: room.id,
        pin: room.pin,
        status: room.status,
        currentRound: room.currentRound,
        roundDeadlineAt: room.roundDeadlineAt,
      };
    }

    // 3. State Machine Transition & Commit-First Pattern
    const now = new Date();
    let nextStatus: ArenaRoomStatus = room.status;
    let nextRound = room.currentRound;
    let deadlineAt: Date | null = room.roundDeadlineAt;
    let activeQuestionId: string | null = room.currentQuestionId;

    switch (action) {
      case "START_ARENA": {
        if (room.status !== "LOBBY") {
          const err: any = new Error("Chỉ có thể bấm Bắt đầu khi đang ở Sảnh chờ (LOBBY).");
          err.statusCode = 409;
          err.code = "INVALID_STATE_TRANSITION";
          throw err;
        }
        nextStatus = "QUESTION_LIVE";
        nextRound = 0;
        activeQuestionId = ARENA_STANDARD_QUESTIONS[0]?.id || "q_0";
        deadlineAt = new Date(now.getTime() + 15 * 1000); // 15 giây chuẩn
        break;
      }

      case "LOCK_ROUND": {
        if (room.status !== "QUESTION_LIVE") {
          const err: any = new Error("Chỉ có thể khóa khi câu hỏi đang LIVE.");
          err.statusCode = 409;
          err.code = "INVALID_STATE_TRANSITION";
          throw err;
        }
        nextStatus = "ROUND_LOCKED";
        break;
      }

      case "REVEAL_DISTRIBUTION": {
        if (room.status !== "ROUND_LOCKED") {
          const err: any = new Error("Chỉ có thể xem phân bổ khi vòng đã khóa.");
          err.statusCode = 409;
          err.code = "INVALID_STATE_TRANSITION";
          throw err;
        }
        nextStatus = "ROUND_REVEAL";
        break;
      }

      case "REVEAL_PERSONAL": {
        nextStatus = "ROUND_REVEAL";
        break;
      }

      case "SHOW_LEADERBOARD": {
        nextStatus = "LEADERBOARD";
        break;
      }

      case "NEXT_ROUND": {
        const total = ARENA_STANDARD_QUESTIONS.length;
        if (room.currentRound >= total - 1) {
          nextStatus = "PODIUM";
        } else {
          nextStatus = "QUESTION_LIVE";
          nextRound = room.currentRound + 1;
          activeQuestionId = ARENA_STANDARD_QUESTIONS[nextRound]?.id || null;
          deadlineAt = new Date(now.getTime() + 15 * 1000);
        }
        break;
      }

      case "FINISH_ARENA": {
        nextStatus = "PODIUM";
        break;
      }

      case "RESTART_ARENA": {
        nextStatus = "LOBBY";
        nextRound = 0;
        activeQuestionId = null;
        deadlineAt = null;
        break;
      }

      default: {
        const err: any = new Error(`Lệnh không hợp lệ: ${action}`);
        err.statusCode = 400;
        err.code = "UNKNOWN_COMMAND";
        throw err;
      }
    }

    // Ghi nhận Database an toàn trước khi trả kết quả
    const updatedRoom = await this.prisma.arenaRoom.update({
      where: { id: room.id },
      data: {
        status: nextStatus,
        currentRound: nextRound,
        currentQuestionId: activeQuestionId,
        roundStartedAt: nextStatus === "QUESTION_LIVE" ? now : room.roundStartedAt,
        roundDeadlineAt: deadlineAt,
        lastCommandId: commandId,
      },
    });

    return {
      idempotent: false,
      roomId: updatedRoom.id,
      pin: updatedRoom.pin,
      status: updatedRoom.status,
      currentRound: updatedRoom.currentRound,
      roundDeadlineAt: updatedRoom.roundDeadlineAt,
      question: ARENA_STANDARD_QUESTIONS[updatedRoom.currentRound] || null,
      totalQuestions: ARENA_STANDARD_QUESTIONS.length,
    };
  }

  /**
   * Server-Authoritative Answer Submission and Scoring
   */
  public async submitAnswer(input: SubmitAnswerInput) {
    const { roomId, playerSessionToken, questionId, roundIndex, selectedOptionId, clientTelemetryTime } = input;
    const serverReceivedAt = new Date();

    if (!roomId || !playerSessionToken || !questionId || selectedOptionId === undefined) {
      const err: any = new Error("Thiếu dữ liệu nộp bài.");
      err.statusCode = 400;
      err.code = "BAD_REQUEST";
      throw err;
    }

    // 1. Thẩm định học sinh qua playerSessionToken
    const participant = await this.prisma.arenaParticipant.findFirst({
      where: {
        roomId,
        playerSessionToken,
      },
    });

    if (!participant) {
      const err: any = new Error("Phiên học sinh không hợp lệ hoặc đã hết hạn.");
      err.statusCode = 403;
      err.code = "UNAUTHORIZED_PARTICIPANT";
      throw err;
    }

    // 2. Thẩm định phòng đấu và thời hạn vòng thi
    const room = await this.prisma.arenaRoom.findUnique({
      where: { id: roomId },
    });

    if (!room || room.status !== "QUESTION_LIVE") {
      const err: any = new Error("Vòng thi không mở hoặc đã bị khóa.");
      err.statusCode = 403;
      err.code = "ROUND_NOT_LIVE";
      throw err;
    }

    if (room.currentRound !== roundIndex) {
      const err: any = new Error("Câu hỏi nộp không khớp với vòng hiện tại của phòng.");
      err.statusCode = 409;
      err.code = "ROUND_MISMATCH";
      throw err;
    }

    // Server-side Deadline check: Cho phép grace period 800ms bù độ trễ mạng Internet
    const GRACE_PERIOD_MS = 800;
    if (room.roundDeadlineAt) {
      const deadlineWithGrace = room.roundDeadlineAt.getTime() + GRACE_PERIOD_MS;
      if (serverReceivedAt.getTime() > deadlineWithGrace) {
        const err: any = new Error("Đã hết thời gian nộp câu trả lời.");
        err.statusCode = 403;
        err.code = "EXPIRED_SUBMISSION";
        throw err;
      }
    }

    // 3. Server tính điểm: Tuyệt đối không dùng điểm số do Client gửi lên
    const question = ARENA_STANDARD_QUESTIONS[roundIndex];
    const isCorrect = question ? question.correctOptionId === selectedOptionId : false;

    let scoreAwarded = 0;
    if (isCorrect) {
      const timeLeftSeconds = room.roundDeadlineAt
        ? Math.max(0, Math.ceil((room.roundDeadlineAt.getTime() - serverReceivedAt.getTime()) / 1000))
        : 1;
      // Công thức Kahoot chuẩn: 100 điểm cơ bản + 10 điểm cho mỗi giây còn lại
      scoreAwarded = 100 + timeLeftSeconds * 10;
    }

    // 4. Transaction ghi nhận vào DB: Chống nộp kép bằng Unique Constraint
    try {
      const [answerRecord, updatedParticipant] = await this.prisma.$transaction([
        this.prisma.arenaAnswer.create({
          data: {
            roomId: room.id,
            participantId: participant.id,
            questionId,
            roundIndex,
            selectedOptionId,
            isCorrect,
            scoreAwarded,
            submittedAt: serverReceivedAt,
            clientTelemetryTime: clientTelemetryTime ? new Date(clientTelemetryTime) : null,
          },
        }),
        this.prisma.arenaParticipant.update({
          where: { id: participant.id },
          data: {
            totalScore: { increment: scoreAwarded },
          },
        }),
      ]);

      return {
        answerId: answerRecord.id,
        isCorrect: answerRecord.isCorrect,
        scoreAwarded: answerRecord.scoreAwarded,
        totalScore: updatedParticipant.totalScore,
        submittedAt: answerRecord.submittedAt,
      };
    } catch (dbErr: any) {
      if (
        dbErr?.code === "P2002" ||
        dbErr?.message?.includes("participant_id_question_id") ||
        dbErr?.message?.includes("23505")
      ) {
        const err: any = new Error("Bạn đã nộp đáp án cho câu hỏi này rồi.");
        err.statusCode = 409;
        err.code = "ALREADY_SUBMITTED";
        throw err;
      }
      throw dbErr;
    }
  }
}
