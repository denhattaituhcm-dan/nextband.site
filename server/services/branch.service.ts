import { PrismaClient } from "@prisma/client";
import { AuthorizedBranchScope, AuthorizationError, NotFoundError } from "./authorization.service.js";

// ─── Custom Error ────────────────────────────────────────────────────────────
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// ─── Input Interfaces ────────────────────────────────────────────────────────
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
}

// ─── BranchService ───────────────────────────────────────────────────────────
export class BranchService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Lấy danh sách chi nhánh theo AuthorizedBranchScope.
   * Mặc định chỉ trả về active branches.
   * @param includeInactive - nếu true, trả về cả inactive (dùng cho trang Settings).
   */
  async listBranches(scope?: AuthorizedBranchScope, includeInactive = false) {
    const activeFilter = includeInactive ? {} : { isActive: true };

    if (!scope || scope.type === "all") {
      return this.prisma.branch.findMany({
        where: activeFilter,
        include: {
          _count: {
            select: {
              rooms: { where: { isActive: true } },
              classes: { where: { isActive: true } },
              leads: true,
            },
          },
        },
        orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
      });
    }

    if (scope.type === "branch") {
      return this.prisma.branch.findMany({
        where: { id: scope.branchId, ...activeFilter },
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
        where: { id: { in: scope.branchIds }, ...activeFilter },
        include: {
          _count: {
            select: {
              rooms: { where: { isActive: true } },
              classes: { where: { isActive: true } },
              leads: true,
            },
          },
        },
        orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
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
   * Lấy Cơ sở chính (isPrimary = true, isActive = true).
   * Dùng cho frontend auto-select khi chỉ có 1 cơ sở hoặc cần default.
   */
  async getPrimaryBranch() {
    return this.prisma.branch.findFirst({
      where: { isPrimary: true, isActive: true },
    });
  }

  /**
   * Tạo chi nhánh mới (Admin only).
   * Nếu là chi nhánh đầu tiên trong hệ thống → tự động set isPrimary = true.
   */
  async createBranch(input: CreateBranchInput) {
    const normalizedCode = input.code.trim().toUpperCase().replace(/\s+/g, "_");
    const existing = await this.prisma.branch.findUnique({
      where: { code: normalizedCode },
    });

    if (existing) {
      throw new AuthorizationError(`Mã chi nhánh '${normalizedCode}' đã tồn tại.`);
    }

    // Nếu đây là chi nhánh đầu tiên → tự động là Cơ sở chính
    const branchCount = await this.prisma.branch.count();
    const isPrimary = branchCount === 0;

    return this.prisma.branch.create({
      data: {
        code: normalizedCode,
        name: input.name.trim(),
        address: input.address.trim(),
        phone: input.phone?.trim() || null,
        isActive: true,
        isPrimary,
      },
    });
  }

  /**
   * Cập nhật thông tin cơ bản của chi nhánh (tên, địa chỉ, hotline).
   * Không dùng để thay đổi isPrimary hoặc isActive (có method riêng).
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
      },
    });
  }

  /**
   * Đặt chi nhánh này làm Cơ sở chính.
   *
   * Invariant: Tại mọi thời điểm, tối đa 1 active Branch có isPrimary = true.
   * Được enforce bởi transaction + unique partial index ở DB.
   */
  async setPrimaryBranch(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) {
      throw new NotFoundError("Chi nhánh không tồn tại.");
    }
    if (!branch.isActive) {
      throw new ValidationError("Không thể đặt chi nhánh đang ngừng hoạt động làm Cơ sở chính.");
    }

    return this.prisma.$transaction(async (tx) => {
      // Unset tất cả primary hiện tại
      await tx.branch.updateMany({
        where: { isPrimary: true },
        data: { isPrimary: false },
      });
      // Set chi nhánh mới làm primary
      return tx.branch.update({
        where: { id },
        data: { isPrimary: true },
      });
    });
  }

  /**
   * Ngừng hoạt động chi nhánh (soft-delete).
   * KHÔNG cho phép ngừng Cơ sở chính — phải chọn Primary mới trước.
   */
  async deactivateBranch(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) {
      throw new NotFoundError("Chi nhánh không tồn tại.");
    }
    if (branch.isPrimary) {
      throw new ValidationError(
        "Không thể ngừng hoạt động Cơ sở chính. Vui lòng đặt cơ sở khác làm Cơ sở chính trước."
      );
    }

    return this.prisma.branch.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * Kích hoạt lại chi nhánh đang inactive.
   */
  async activateBranch(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) {
      throw new NotFoundError("Chi nhánh không tồn tại.");
    }

    return this.prisma.branch.update({
      where: { id },
      data: { isActive: true },
    });
  }

  /**
   * Gán nhân sự vào chi nhánh.
   * MVP Note: UserBranch hiện được giữ lại cho tương lai nhưng không ảnh hưởng
   * đến quyền truy cập của Teacher/Student trong MVP này.
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
   * Xóa nhân sự khỏi chi nhánh.
   */
  async removeUserFromBranch(userId: string, branchId: string) {
    return this.prisma.userBranch.deleteMany({
      where: { userId, branchId },
    });
  }
}
