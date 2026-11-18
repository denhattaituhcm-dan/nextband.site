import { PrismaClient, ArenaRoomStatus } from "@prisma/client";
import { ArenaPinService } from "./arena-pin.service.js";

export const MAX_CONCURRENT_COMMUNITY_ROOMS = 20;
export const MAX_COMMUNITY_PLAYERS_PER_ROOM = 20;
export const MAX_VIP_PLAYERS_PER_ROOM = 60;
export const COMMUNITY_LOBBY_TTL_MS = 20 * 60 * 1000;
export const VIP_ROOM_TTL_MS = 4 * 60 * 60 * 1000;

export interface CreateArenaRoomInput {
  hostUserId?: string;
  hostRole?: string;
  hostRoles?: string[];
  clientIp?: string;
  isCommunityRoom?: boolean;
  examId?: string;
  config?: any;
}

export interface CreateArenaRoomResult {
  roomId: string;
  pin: string;
  hostToken: string; // Plaintext token returned ONCE to the host
  status: ArenaRoomStatus;
  createdAt: Date;
  expiresAt: Date | null;
  config: Record<string, any>;
}

export function sanitizePublicArenaConfig(rawConfig: any): Record<string, any> {
  if (!rawConfig || typeof rawConfig !== "object") {
    return {};
  }
  const { creatorIp: _ignored, ...safeConfig } = rawConfig as Record<string, any>;
  return safeConfig;
}

export class ArenaRoomService {
  private pinService: ArenaPinService;

  constructor(private prisma: PrismaClient) {
    this.pinService = new ArenaPinService(prisma);
  }

  /**
   * Lazy garbage collector: marks expired non-ENDED rooms as ENDED so stale lobby slots are reclaimed.
   */
  public async sweepExpiredRooms(): Promise<number> {
    const res = await this.prisma.arenaRoom.updateMany({
      where: {
        status: { not: "ENDED" },
        expiresAt: { lte: new Date() },
      },
      data: {
        status: "ENDED",
      },
    });
    return res.count;
  }

  /**
   * Creates a new Arena room with a collision-free PIN, securely hashed host token,
   * and community concurrency quota protection (20-room cap + VIP priority lane for teachers/admins).
   */
  public async createRoom(input: CreateArenaRoomInput): Promise<CreateArenaRoomResult> {
    await this.sweepExpiredRooms();

    const now = new Date();
    const roles = Array.isArray(input.hostRoles)
      ? input.hostRoles
      : input.hostRole
      ? [input.hostRole]
      : [];
    const isVipHost = roles.includes("admin") || roles.includes("teacher");
    const isCommunity =
      !isVipHost &&
      Boolean(
        input.isCommunityRoom ||
          input.config?.isCommunityRoom ||
          input.clientIp ||
          input.hostUserId
      );

    if (isCommunity) {
      const activeRooms = await this.prisma.arenaRoom.findMany({
        where: {
          status: { not: "ENDED" },
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
        select: {
          id: true,
          hostUserId: true,
          config: true,
        },
      });

      const ownedRoomIds: string[] = [];
      for (const r of activeRooms) {
        const cfg = (r.config && typeof r.config === "object" ? r.config : {}) as Record<string, any>;
        if (cfg.isVipRoom === true) continue;

        const matchesUser = Boolean(input.hostUserId && r.hostUserId === input.hostUserId);
        const matchesIp = Boolean(
          !input.hostUserId &&
            input.clientIp &&
            input.clientIp !== "unknown" &&
            cfg.creatorIp === input.clientIp
        );

        if (matchesUser || matchesIp) {
          ownedRoomIds.push(r.id);
        }
      }

      if (ownedRoomIds.length > 0) {
        await this.prisma.arenaRoom.updateMany({
          where: { id: { in: ownedRoomIds } },
          data: { status: "ENDED", expiresAt: now },
        });
      }

      const ownedSet = new Set(ownedRoomIds);
      const activeCommunityCount = activeRooms.filter((r) => {
        if (ownedSet.has(r.id)) return false;
        const cfg = (r.config && typeof r.config === "object" ? r.config : {}) as Record<string, any>;
        return cfg.isCommunityRoom === true && cfg.isVipRoom !== true;
      }).length;

      if (activeCommunityCount >= MAX_CONCURRENT_COMMUNITY_ROOMS) {
        const err: any = new Error(
          `Hệ thống Đấu trường Cộng đồng đang đầy (${MAX_CONCURRENT_COMMUNITY_ROOMS}/${MAX_CONCURRENT_COMMUNITY_ROOMS} phòng hoạt động). Vui lòng tham gia phòng công khai đang mở hoặc thử lại sau ít phút!`
        );
        err.statusCode = 429;
        err.code = "ARENA_CAPACITY_REACHED";
        throw err;
      }
    }

    const pin = await this.pinService.generateUniqueActivePin();
    const hostToken = this.pinService.generateHostToken();
    const hostTokenHash = this.pinService.hashHostToken(hostToken);

    const rawCfg = input.config && typeof input.config === "object" ? input.config : {};
    const requestedMaxPlayers = Number(rawCfg.maxPlayers);
    const maxPlayers = isVipHost
      ? Math.min(
          100,
          Math.max(2, Number.isFinite(requestedMaxPlayers) ? requestedMaxPlayers : MAX_VIP_PLAYERS_PER_ROOM)
        )
      : Math.min(
          MAX_COMMUNITY_PLAYERS_PER_ROOM,
          Math.max(2, Number.isFinite(requestedMaxPlayers) ? requestedMaxPlayers : MAX_COMMUNITY_PLAYERS_PER_ROOM)
        );

    const storedConfig: Record<string, any> = {
      ...rawCfg,
      isVipRoom: isVipHost,
      isCommunityRoom: isCommunity,
      isPublic: isCommunity ? Boolean(rawCfg.isPublic ?? true) : Boolean(rawCfg.isPublic),
      topicKey: rawCfg.topicKey || (isCommunity ? "RANDOM_MIX" : undefined),
      gameMode: rawCfg.gameMode || "CLASSIC",
      hostMode: rawCfg.hostMode || (isCommunity ? "AUTO_PARTY" : "PROJECTOR_HOST"),
      roomTitle:
        String(rawCfg.roomTitle || "Đấu Trường IELTS Live").trim().slice(0, 60) ||
        "Đấu Trường IELTS Live",
      hostNickname:
        String(rawCfg.hostNickname || "Chủ Phòng").trim().slice(0, 30) || "Chủ Phòng",
      maxPlayers,
    };

    if (isCommunity && input.clientIp && input.clientIp !== "unknown") {
      storedConfig.creatorIp = input.clientIp;
    }

    const expiresAt = new Date(
      Date.now() + (isVipHost || !isCommunity ? VIP_ROOM_TTL_MS : COMMUNITY_LOBBY_TTL_MS)
    );

    const room = await this.prisma.arenaRoom.create({
      data: {
        pin,
        hostUserId: input.hostUserId || null,
        hostTokenHash,
        examId: input.examId || null,
        status: "LOBBY",
        currentRound: 0,
        config: storedConfig,
        expiresAt,
      },
    });

    return {
      roomId: room.id,
      pin: room.pin,
      hostToken, // Plaintext returned only once upon creation
      status: room.status,
      createdAt: room.createdAt,
      expiresAt: room.expiresAt,
      config: sanitizePublicArenaConfig(room.config),
    };
  }

  /**
   * Lists public LOBBY rooms and live community capacity telemetry.
   */
  public async getPublicLobbyRooms() {
    await this.sweepExpiredRooms();
    const now = new Date();

    const activeRooms = await this.prisma.arenaRoom.findMany({
      where: {
        status: { not: "ENDED" },
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      select: {
        id: true,
        pin: true,
        status: true,
        examId: true,
        config: true,
        createdAt: true,
        expiresAt: true,
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const activeCommunityRooms = activeRooms.filter((r) => {
      const cfg = (r.config && typeof r.config === "object" ? r.config : {}) as Record<string, any>;
      return cfg.isCommunityRoom === true && cfg.isVipRoom !== true;
    }).length;

    const rooms = activeRooms
      .filter((r) => {
        if (r.status !== "LOBBY") return false;
        const cfg = (r.config && typeof r.config === "object" ? r.config : {}) as Record<string, any>;
        if (cfg.isPublic !== true) return false;
        const maxPlayers = Number(cfg.maxPlayers) || MAX_COMMUNITY_PLAYERS_PER_ROOM;
        return r._count.participants < maxPlayers;
      })
      .map((r) => {
        const cfg = sanitizePublicArenaConfig(r.config);
        return {
          id: r.id,
          pin: r.pin,
          status: r.status,
          roomTitle: cfg.roomTitle || "Đấu Trường IELTS Live",
          hostNickname: cfg.hostNickname || "Chủ Phòng",
          topicKey: cfg.topicKey || "COLLOCATION",
          gameMode: cfg.gameMode || "CLASSIC",
          hostMode: cfg.hostMode || "AUTO_PARTY",
          playerCount: r._count.participants,
          maxPlayers: Number(cfg.maxPlayers) || MAX_COMMUNITY_PLAYERS_PER_ROOM,
          createdAt: r.createdAt,
          expiresAt: r.expiresAt,
        };
      });

    return {
      capacity: {
        activeCommunityRooms,
        maxCommunityRooms: MAX_CONCURRENT_COMMUNITY_ROOMS,
        availableCommunitySlots: Math.max(0, MAX_CONCURRENT_COMMUNITY_ROOMS - activeCommunityRooms),
        maxPlayersPerCommunityRoom: MAX_COMMUNITY_PLAYERS_PER_ROOM,
      },
      rooms,
    };
  }

  /**
   * Retrieves active room metadata by PIN (without leaking hostTokenHash or creatorIp)
   */
  public async getRoomByPin(pin: string) {
    await this.sweepExpiredRooms();
    const room = await this.prisma.arenaRoom.findFirst({
      where: {
        pin: pin.trim(),
        status: {
          not: "ENDED",
        },
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      select: {
        id: true,
        pin: true,
        status: true,
        currentRound: true,
        examId: true,
        config: true,
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

    if (!room) return null;

    return {
      ...room,
      config: sanitizePublicArenaConfig(room.config),
    };
  }

  /**
   * Validates room status, capacity limits, and registers a participant atomically.
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
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      select: {
        id: true,
        pin: true,
        status: true,
        config: true,
        _count: {
          select: {
            participants: true,
          },
        },
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

    // 3. Kiểm tra trùng tên trước khi kiểm tra sĩ số để giữ lỗi 409 DUPLICATE_NICKNAME chuẩn xác
    const existingByName = await this.prisma.arenaParticipant.findFirst({
      where: {
        roomId: room.id,
        normalizedNickname,
      },
      select: { id: true },
    });

    if (existingByName) {
      const err: any = new Error(
        `Tên "${cleanNickname}" đã có bạn khác trong phòng sử dụng. Vui lòng chọn một tên khác!`
      );
      err.statusCode = 409;
      err.code = "DUPLICATE_NICKNAME";
      throw err;
    }

    // 4. Kiểm tra giới hạn sĩ số phòng
    const cfg = (room.config && typeof room.config === "object" ? room.config : {}) as Record<string, any>;
    const maxPlayers =
      Number(cfg.maxPlayers) ||
      (cfg.isCommunityRoom ? MAX_COMMUNITY_PLAYERS_PER_ROOM : MAX_VIP_PLAYERS_PER_ROOM);

    if (room._count.participants >= maxPlayers) {
      const err: any = new Error(
        `Phòng thi đấu này đã đủ tối đa ${maxPlayers}/${maxPlayers} người chơi. Vui lòng chọn hoặc tạo phòng khác!`
      );
      err.statusCode = 403;
      err.code = "ROOM_FULL";
      throw err;
    }

    // 5. Tạo participant và cấp session token
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
        const err: any = new Error(
          `Tên "${cleanNickname}" đã có bạn khác trong phòng sử dụng. Vui lòng chọn một tên khác!`
        );
        err.statusCode = 409;
        err.code = "DUPLICATE_NICKNAME";
        throw err;
      }
      throw dbError;
    }
  }

  /**
   * Host explicitly closes a room to immediately release capacity slots.
   */
  public async closeRoom(input: { pin: string; hostToken: string }): Promise<{
    success: boolean;
    pin: string;
    status: ArenaRoomStatus;
  }> {
    const cleanPin = input.pin?.trim();
    if (!cleanPin || !input.hostToken) {
      const err: any = new Error("Thiếu mã PIN hoặc Host Token để đóng phòng.");
      err.statusCode = 400;
      err.code = "BAD_REQUEST";
      throw err;
    }

    const room = await this.prisma.arenaRoom.findFirst({
      where: {
        pin: cleanPin,
        status: { not: "ENDED" },
      },
    });

    if (!room) {
      const err: any = new Error("Phòng thi đấu không tồn tại hoặc đã đóng trước đó.");
      err.statusCode = 404;
      err.code = "ROOM_NOT_FOUND";
      throw err;
    }

    const isTokenValid = this.pinService.verifyHostToken(input.hostToken, room.hostTokenHash);
    if (!isTokenValid) {
      const err: any = new Error("Host Token không hợp lệ. Bạn không có quyền đóng phòng này.");
      err.statusCode = 403;
      err.code = "INVALID_HOST_TOKEN";
      throw err;
    }

    await this.prisma.arenaRoom.update({
      where: { id: room.id },
      data: {
        status: "ENDED",
        expiresAt: new Date(),
      },
    });

    return {
      success: true,
      pin: room.pin,
      status: "ENDED",
    };
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
