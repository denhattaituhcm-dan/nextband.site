import { PrismaClient } from "@prisma/client";
import { AuthorizedBranchScope, AuthorizationError, NotFoundError } from "./authorization.service.js";

export interface CreateBranchInput {
  code: string;
  name: string;
  address: string;
  phone?: string;
}

export interface UpdateBranchInput {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
}

export class BranchService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Lấy danh sách chi nhánh theo AuthorizedBranchScope
   */
  async listBranches(scope?: AuthorizedBranchScope) {
    if (!scope || scope.type === "all") {
      return this.prisma.branch.findMany({
        where: { isActive: true },
        include: {
          _count: {
            select: {
              rooms: { where: { isActive: true } },
              classes: { where: { isActive: true } },
              leads: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });
    }

    if (scope.type === "branch") {
      return this.prisma.branch.findMany({
        where: { id: scope.branchId, isActive: true },
        include: {
          _count: {
            select: {
              rooms: { where: { isActive: true } },
              classes: { where: { isActive: true } },
              leads: true,
            },
          },
        },
      });
    }

    if (scope.type === "branches") {
      return this.prisma.branch.findMany({
        where: { id: { in: scope.branchIds }, isActive: true },
        include: {
          _count: {
            select: {
              rooms: { where: { isActive: true } },
              classes: { where: { isActive: true } },
              leads: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });
    }

    return [];
  }

  /**
   * Lấy chi tiết chi nhánh kèm danh sách phòng học
   */
  async getBranchById(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      include: {
        rooms: {
          where: { isActive: true },
          orderBy: { name: "asc" },
        },
        _count: {
          select: {
            classes: { where: { isActive: true } },
            leads: true,
          },
        },
      },
    });

    if (!branch) {
      throw new NotFoundError("Chi nhánh không tồn tại.");
    }

    return branch;
  }

  /**
   * Tạo chi nhánh mới (Super Admin)
   */
  async createBranch(input: CreateBranchInput) {
    const normalizedCode = input.code.trim().toUpperCase().replace(/\s+/g, "_");
    const existing = await this.prisma.branch.findUnique({
      where: { code: normalizedCode },
    });

    if (existing) {
      throw new AuthorizationError(`Mã chi nhánh '${normalizedCode}' đã tồn tại.`);
    }

    return this.prisma.branch.create({
      data: {
        code: normalizedCode,
        name: input.name.trim(),
        address: input.address.trim(),
        phone: input.phone?.trim() || null,
        isActive: true,
      },
    });
  }

  /**
   * Cập nhật thông tin chi nhánh
   */
  async updateBranch(id: string, input: UpdateBranchInput) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) {
      throw new NotFoundError("Chi nhánh không tồn tại.");
    }

    return this.prisma.branch.update({
      where: { id },
      data: {
        name: input.name !== undefined ? input.name.trim() : undefined,
        address: input.address !== undefined ? input.address.trim() : undefined,
        phone: input.phone !== undefined ? input.phone.trim() : undefined,
        isActive: input.isActive !== undefined ? input.isActive : undefined,
      },
    });
  }

  /**
   * Gán nhân sự vào chi nhánh
   */
  async assignUserToBranch(userId: string, branchId: string) {
    return this.prisma.userBranch.upsert({
      where: {
        userId_branchId: { userId, branchId },
      },
      create: { userId, branchId },
      update: {},
    });
  }

  /**
   * Xóa nhân sự khỏi chi nhánh
   */
  async removeUserFromBranch(userId: string, branchId: string) {
    return this.prisma.userBranch.deleteMany({
      where: { userId, branchId },
    });
  }
}
