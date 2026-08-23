import { PrismaClient } from "@prisma/client";
import { AuthorizationError, NotFoundError } from "./authorization.service.js";

export interface CreateRoomInput {
  branchId: string;
  name: string;
  capacity?: number;
}

export interface UpdateRoomInput {
  name?: string;
  capacity?: number;
  isActive?: boolean;
}

export class RoomService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Lấy danh sách phòng học theo chi nhánh
   */
  async listRooms(branchId?: string) {
    const where: any = { isActive: true };
    if (branchId && branchId !== "ALL" && branchId !== "all") {
      where.branchId = branchId;
    }

    return this.prisma.room.findMany({
      where,
      include: {
        branch: {
          select: { id: true, name: true, code: true },
        },
        _count: {
          select: {
            classes: { where: { isActive: true } },
          },
        },
      },
      orderBy: [{ branch: { name: "asc" } }, { name: "asc" }],
    });
  }

  /**
   * Tạo phòng học mới
   */
  async createRoom(input: CreateRoomInput) {
    const branch = await this.prisma.branch.findUnique({
      where: { id: input.branchId },
    });
    if (!branch) {
      throw new NotFoundError("Chi nhánh không tồn tại.");
    }

    const trimmedName = input.name.trim();
    const existing = await this.prisma.room.findFirst({
      where: {
        branchId: input.branchId,
        name: trimmedName,
      },
    });

    if (existing) {
      throw new AuthorizationError(`Phòng '${trimmedName}' đã tồn tại trong chi nhánh này.`);
    }

    return this.prisma.room.create({
      data: {
        branchId: input.branchId,
        name: trimmedName,
        capacity: input.capacity && input.capacity > 0 ? input.capacity : 15,
        isActive: true,
      },
    });
  }

  /**
   * Cập nhật thông tin phòng học
   */
  async updateRoom(id: string, input: UpdateRoomInput) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) {
      throw new NotFoundError("Phòng học không tồn tại.");
    }

    return this.prisma.room.update({
      where: { id },
      data: {
        name: input.name !== undefined ? input.name.trim() : undefined,
        capacity: input.capacity !== undefined ? input.capacity : undefined,
        isActive: input.isActive !== undefined ? input.isActive : undefined,
      },
    });
  }
}
