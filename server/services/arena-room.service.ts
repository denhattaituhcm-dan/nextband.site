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
      },
    });
  }
}
