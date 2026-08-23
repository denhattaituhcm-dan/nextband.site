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
    const branches = await branchService.listBranches(scope);
    return reply.send({ success: true, data: branches });
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

  // PUT /branches/:id - Cập nhật chi nhánh (Admin only)
  fastify.put<{
    Params: { id: string };
    Body: { name?: string; address?: string; phone?: string; isActive?: boolean };
  }>("/:id", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    const branch = await branchService.updateBranch(request.params.id, request.body);
    return reply.send({ success: true, data: branch });
  });

  // POST /branches/:id/users - Gán user vào chi nhánh
  fastify.post<{
    Params: { id: string };
    Body: { userId: string };
  }>("/:id/users", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    await branchService.assignUserToBranch(request.body.userId, request.params.id);
    return reply.send({ success: true, message: "Gán chi nhánh thành công" });
  });

  // DELETE /branches/:id/users/:userId - Xóa user khỏi chi nhánh
  fastify.delete<{
    Params: { id: string; userId: string };
  }>("/:id/users/:userId", { preHandler: [authenticate, requireRoles("admin")] }, async (request, reply) => {
    await branchService.removeUserFromBranch(request.params.userId, request.params.id);
    return reply.send({ success: true, message: "Hủy gán chi nhánh thành công" });
  });
}
