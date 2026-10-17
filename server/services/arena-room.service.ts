import { PrismaClient, ArenaRoomStatus } from "@prisma/client";
import { ArenaPinService } from "./arena-pin.service.js";

export interface CreateArenaRoomInput {
  hostUserId?: string;
  examId?: string;
  config?: any;
}

export interface CreateArenaRoomResult {
  roomId: string;
  pin: string;
  hostToken: string; // Plaintext token returned ONCE to the host
  status: ArenaRoomStatus;
  createdAt: Date;
}

export class ArenaRoomService {
  private pinService: ArenaPinService;

  constructor(private prisma: PrismaClient) {
    this.pinService = new ArenaPinService(prisma);
  }

  /**
   * Creates a new Arena room with a collision-free PIN and securely hashed host token.
   */
  public async createRoom(input: CreateArenaRoomInput): Promise<CreateArenaRoomResult> {
    const pin = await this.pinService.generateUniqueActivePin();
    const hostToken = this.pinService.generateHostToken();
    const hostTokenHash = this.pinService.hashHostToken(hostToken);

    // Default TTL: 4 hours from creation
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

    const room = await this.prisma.arenaRoom.create({
      data: {
        pin,
        hostUserId: input.hostUserId || null,
        hostTokenHash,
        examId: input.examId || null,
        status: "LOBBY",
        currentRound: 0,
        config: input.config || {},
        expiresAt,
      },
    });

    return {
      roomId: room.id,
      pin: room.pin,
      hostToken, // Plaintext returned only once upon creation
      status: room.status,
      createdAt: room.createdAt,
    };
  }

  /**
   * Retrieves active room metadata by PIN (without leaking hostTokenHash)
   */
  public async getRoomByPin(pin: string) {
    return this.prisma.arenaRoom.findFirst({
      where: {
        pin,
        status: {
          not: "ENDED",
        },
      },
      select: {
        id: true,
        pin: true,
        status: true,
        currentRound: true,
        examId: true,
        createdAt: true,
        expiresAt: true,
        participants: {
          select: {
            id: true,
            nickname: true,
            avatarId: true,
            totalScore: true,
            totalGold: true,
            joinedAt: true,
          },
          orderBy: {
            joinedAt: "asc",
          },
        },
      },
    });
  }

  /**
   * Validates room status and registers a participant atomically.
   */
  public async joinRoom(input: { pin: string; nickname: string; avatarId?: number }): Promise<{
    participantId: string;
    roomId: string;
    pin: string;
    playerSessionToken: string;
    nickname: string;
    avatarId: number;
    roomStatus: ArenaRoomStatus;
  }> {
    const cleanPin = input.pin?.trim();
    const cleanNickname = input.nickname?.trim();
    const avatarId = Number.isInteger(input.avatarId) ? Number(input.avatarId) : 0;

    if (!cleanPin || cleanPin.length !== 6) {
      const err: any = new Error("Mã PIN phải gồm đúng 6 chữ số.");
      err.statusCode = 400;
      err.code = "INVALID_PIN";
      throw err;
    }

    if (!cleanNickname) {
      const err: any = new Error("Vui lòng nhập tên / biệt danh của bạn.");
      err.statusCode = 400;
      err.code = "INVALID_NICKNAME";
      throw err;
    }

    const normalizedNickname = cleanNickname.toLowerCase().normalize("NFC");

    // 1. Kiểm tra phòng tồn tại và đang active
    const room = await this.prisma.arenaRoom.findFirst({
      where: {
        pin: cleanPin,
        status: {
          not: "ENDED",
        },
      },
      select: {
        id: true,
        pin: true,
        status: true,
      },
    });

    if (!room) {
      const err: any = new Error("Mã PIN không tồn tại hoặc phòng thi đấu đã kết thúc.");
      err.statusCode = 404;
      err.code = "ROOM_NOT_FOUND";
      throw err;
    }

    // 2. Kiểm tra phòng có đang ở sảnh chờ LOBBY không
    if (room.status !== "LOBBY") {
      const err: any = new Error("Trận đấu đã diễn ra hoặc đã đóng sảnh chờ. Không thể tham gia lúc này.");
      err.statusCode = 403;
      err.code = "ROOM_NOT_IN_LOBBY";
      throw err;
    }

    // 3. Tạo participant và cấp session token
    const playerSessionToken = this.pinService.generatePlayerSessionToken();

    try {
      const participant = await this.prisma.arenaParticipant.create({
        data: {
          roomId: room.id,
          playerSessionToken,
          nickname: cleanNickname,
          normalizedNickname,
          avatarId,
          totalScore: 0,
          totalGold: 0,
        },
      });

      return {
        participantId: participant.id,
        roomId: room.id,
        pin: room.pin,
        playerSessionToken: participant.playerSessionToken,
        nickname: participant.nickname,
        avatarId: participant.avatarId,
        roomStatus: room.status,
      };
    } catch (dbError: any) {
      // Bắt lỗi Unique Constraint (room_id, normalized_nickname)
      if (
        dbError?.code === "P2002" ||
        dbError?.message?.includes("normalized_nickname") ||
        dbError?.message?.includes("23505")
      ) {
        const err: any = new Error(`Tên "${cleanNickname}" đã có bạn khác trong phòng sử dụng. Vui lòng chọn một tên khác!`);
        err.statusCode = 409;
        err.code = "DUPLICATE_NICKNAME";
        throw err;
      }
      throw dbError;
    }
  }

  /**
   * Kicks a participant from the lobby, removing them from ArenaParticipant
   * so their nickname is freed and they can rejoin cleanly.
   */
  public async kickParticipant(input: {
    pin: string;
    hostToken: string;
    participantId: string;
  }): Promise<{
    success: boolean;
    kickedParticipantId: string;
    nickname: string;
  }> {
    const { pin, hostToken, participantId } = input;

    // 1. Kiểm tra phòng tồn tại
    const room = await this.prisma.arenaRoom.findFirst({
      where: {
        pin: pin.trim(),
        status: { not: "ENDED" },
      },
    });

    if (!room) {
      const err: any = new Error("Phòng thi đấu không tồn tại hoặc đã kết thúc.");
      err.statusCode = 404;
      err.code = "ROOM_NOT_FOUND";
      throw err;
    }

    // 2. Xác thực Host Token
    const isTokenValid = this.pinService.verifyHostToken(hostToken, room.hostTokenHash);
    if (!isTokenValid) {
      const err: any = new Error("Host Token không hợp lệ. Bạn không có quyền mời học sinh ra khỏi phòng.");
      err.statusCode = 403;
      err.code = "INVALID_HOST_TOKEN";
      throw err;
    }

    // 3. Tìm thông tin participant trong phòng
    const participant = await this.prisma.arenaParticipant.findFirst({
      where: {
        id: participantId,
        roomId: room.id,
      },
    });

    if (!participant) {
      const err: any = new Error("Học sinh không tồn tại trong phòng thi đấu này.");
      err.statusCode = 404;
      err.code = "PARTICIPANT_NOT_FOUND";
      throw err;
    }

    // 4. Xóa bản ghi participant để giải phóng nickname và slot
    await this.prisma.arenaParticipant.delete({
      where: { id: participant.id },
    });

    return {
      success: true,
      kickedParticipantId: participant.id,
      nickname: participant.nickname,
    };
  }
}

