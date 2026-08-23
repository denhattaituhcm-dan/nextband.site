import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { BranchService } from "../services/branch.service.js";
import { AuthorizationService } from "../services/authorization.service.js";

export default async function branchRoutes(fastify: FastifyInstance) {
  const branchService = new BranchService(fastify.prisma);
  const authService = new AuthorizationService(fastify.prisma);

  // GET /branches - Lấy danh sách chi nhánh theo quyền của user
  fastify.get("/", { preHandler: authenticate }, async (request, reply) => {
    const user = (request as any).user;
    const scope = await authService.resolveAuthorizedBranchScope({
      userId: user.id,
      userRoles: user.roles || [],
    });
    const includeInactive = (request.query as any).includeInactive === "true";
    const branches = await branchService.listBranches(scope, includeInactive);
    return reply.send({ success: true, data: branches });
  });

  // GET /branches/primary - Lấy Cơ sở chính (isPrimary = true)
  // Dùng cho frontend auto-select khi 1 cơ sở hoặc cần default value.
  fastify.get("/primary", { preHandler: authenticate }, async (_request, reply) => {
    const branch = await branchService.getPrimaryBranch();
    return reply.send({ success: true, data: branch });
  });

  // GET /branches/:id - Chi tiết chi nhánh
  fastify.get<{ Params: { id: string } }>("/:id", { preHandler: authenticate }, async (request, reply) => {
    const branch = await branchService.getBranchById(request.params.id);
    return reply.send({ success: true, data: branch });
  });

  // POST /branches - Tạo chi nhánh mới (Admin only)
  fastify.post<{
    Body: { code: string; name: string; address: string; phone?: string };
  }>("/", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    const branch = await branchService.createBranch(request.body);
    return reply.code(201).send({ success: true, data: branch });
  });

  // PUT /branches/:id - Cập nhật thông tin cơ bản chi nhánh (Admin only)
  fastify.put<{
    Params: { id: string };
    Body: { name?: string; address?: string; phone?: string };
  }>("/:id", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    const branch = await branchService.updateBranch(request.params.id, request.body);
    return reply.send({ success: true, data: branch });
  });

  // PATCH /branches/:id/set-primary - Đặt làm Cơ sở chính (Admin only)
  // Invariant: transaction đảm bảo chỉ 1 active Branch là primary tại mọi thời điểm.
  fastify.patch<{ Params: { id: string } }>(
    "/:id/set-primary",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const branch = await branchService.setPrimaryBranch(request.params.id);
      return reply.send({ success: true, data: branch });
    }
  );

  // PATCH /branches/:id/deactivate - Ngừng hoạt động chi nhánh (Admin only)
  // Soft-delete: dữ liệu lịch sử vẫn tồn tại. Không cho deactivate Cơ sở chính.
  fastify.patch<{ Params: { id: string } }>(
    "/:id/deactivate",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const branch = await branchService.deactivateBranch(request.params.id);
      return reply.send({ success: true, data: branch });
    }
  );

  // PATCH /branches/:id/activate - Kích hoạt lại chi nhánh (Admin only)
  fastify.patch<{ Params: { id: string } }>(
    "/:id/activate",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const branch = await branchService.activateBranch(request.params.id);
      return reply.send({ success: true, data: branch });
    }
  );

  // POST /branches/:id/users - Gán user vào chi nhánh (Admin only)
  // MVP Note: UserBranch giữ lại cho tương lai, không ảnh hưởng authorization hiện tại.
  fastify.post<{
    Params: { id: string };
    Body: { userId: string };
  }>("/:id/users", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    await branchService.assignUserToBranch(request.body.userId, request.params.id);
    return reply.send({ success: true, message: "Gán chi nhánh thành công" });
  });

  // DELETE /branches/:id/users/:userId - Xóa user khỏi chi nhánh (Admin only)
  fastify.delete<{
    Params: { id: string; userId: string };
  }>("/:id/users/:userId", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    await branchService.removeUserFromBranch(request.params.userId, request.params.id);
    return reply.send({ success: true, message: "Hủy gán chi nhánh thành công" });
  });
}
