import { FastifyPluginAsync } from "fastify";
import { LeadService } from "../services/lead.service.js";
import {
  createLeadSchema,
  updateLeadSchema,
  listLeadsQuerySchema,
} from "../schemas/lead.schema.js";
import { handleValidation } from "../utils/validation.js";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

const leadRoutes: FastifyPluginAsync = async (fastify) => {
  const leadService = new LeadService(fastify.prisma);

  // POST /leads - Public endpoint for prospective students submitting consultation requests
  fastify.post(
    "/",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "10 minutes",
        },
      },
    },
    async (request, reply) => {
    const validatedData = handleValidation(
      createLeadSchema.safeParse(request.body),
      request,
      reply
    );
    if (!validatedData) return;

    try {
      const lead = await leadService.createLead(validatedData);

      return reply.status(201).send({
        success: true,
        message: "Gửi yêu cầu tư vấn thành công! Ban Học Thuật ARIS đã tiếp nhận thông tin.",
        data: {
          id: lead.id,
          fullName: lead.fullName,
          phone: lead.phone,
          createdAt: lead.createdAt,
        },
      });
    } catch (err: any) {
      request.log.error(err, "Failed to create consultation lead");
      return reply.status(500).send({
        success: false,
        error: "Không thể xử lý yêu cầu lúc này. Vui lòng liên hệ Hotline 0933.319.693.",
        details: err?.message || String(err),
      });
    }
  });

  // GET /leads/check-phone - Check duplicate leads by phone number (for UI warnings)
  fastify.get(
    "/check-phone",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const { phone } = request.query as any;
      if (!phone || typeof phone !== "string") {
        return reply.send({ success: true, duplicates: [] });
      }

      const duplicates = await leadService.checkDuplicatePhone(phone);
      return reply.send({
        success: true,
        duplicates,
      });
    }
  );

  // POST /leads/manual - Authenticated endpoint for Admin/Teacher/Staff to record offline/hotline leads
  fastify.post(
    "/manual",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const validatedData = handleValidation(
        createLeadSchema.safeParse(request.body),
        request,
        reply
      );
      if (!validatedData) return;

      try {
        const lead = await leadService.createLead({
          ...validatedData,
          source: validatedData.source || "offline_walkin",
          createdByUserId: request.user.id,
        });

        return reply.status(201).send({
          success: true,
          message: "Tiếp nhận thông tin khách tư vấn thành công.",
          data: lead,
        });
      } catch (err: any) {
        request.log.error(err, "Failed to create manual consultation lead");
        return reply.status(500).send({
          success: false,
          error: "Không thể lưu thông tin tư vấn lúc này.",
        });
      }
    }
  );

  // POST /leads/:id/convert - Atomic Conversion: Lead -> Student User + UserBranch + Link Lead
  fastify.post<{ Params: { id: string } }>(
    "/:id/convert",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const { id } = request.params;
      const { convertLeadSchema } = await import("../schemas/lead.schema.js");
      const validatedData = handleValidation(
        convertLeadSchema.safeParse(request.body),
        request,
        reply
      );
      if (!validatedData) return;

      try {
        const result = await leadService.convertLeadToStudent(id, validatedData, request.user.id);
        return reply.status(200).send({
          success: true,
          message: "Chuyển đổi khách tư vấn thành học viên thành công.",
          data: result,
        });
      } catch (err: any) {
        request.log.error(err, "Failed to convert lead to student");
        return reply.status(400).send({
          success: false,
          error: err?.message || "Không thể chuyển đổi khách tư vấn thành học viên",
        });
      }
    }
  );

  // GET /leads/assignable-staff - Fetch all staff/admin users usable as lead owners
  fastify.get(
    "/assignable-staff",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const { branchId } = (request.query || {}) as { branchId?: string };

      // Get all active staff, admin, and teacher users with lead count and branches
      const staffWithLeads = await fastify.prisma.user.findMany({
        where: {
          isActive: true,
          roles: { some: { role: { in: ["staff", "admin", "teacher"] } } },
        },
        select: {
          id: true,
          userId: true,
          fullName: true,
          email: true,
          avatarUrl: true,
          phone: true,
          roles: { select: { role: true } },
          userBranches: {
            select: {
              branchId: true,
              branch: { select: { id: true, name: true, code: true } },
            },
          },
          _count: {
            select: {
              assignedLeads: {
                where: { status: { notIn: ["ENROLLED", "CANCELLED", "ARCHIVED"] } },
              },
            },
          },
        },
        orderBy: { fullName: "asc" },
      });

      const formatted = staffWithLeads.map((u) => {
        const roles = u.roles.map((r) => r.role);
        const branches = (u.userBranches || []).map((ub) => ub.branch).filter(Boolean);
        const isMatchBranch = branchId && branchId !== "ALL" ? branches.some((b) => b.id === branchId) : true;
        const isStaff = roles.includes("staff");

        return {
          id: u.id,
          userId: u.userId,
          fullName: u.fullName || u.email?.split("@")[0] || "Nhân viên",
          email: u.email,
          avatarUrl: u.avatarUrl,
          phone: u.phone,
          roles,
          branches,
          isMatchBranch,
          isStaff,
          activeLeadCount: u._count.assignedLeads,
        };
      });

      // Sort priority: matching branch -> staff role -> least active leads
      formatted.sort((a, b) => {
        if (branchId && branchId !== "ALL") {
          if (a.isMatchBranch && !b.isMatchBranch) return -1;
          if (!a.isMatchBranch && b.isMatchBranch) return 1;
        }
        if (a.isStaff && !b.isStaff) return -1;
        if (!a.isStaff && b.isStaff) return 1;
        return a.activeLeadCount - b.activeLeadCount;
      });

      return reply.send({
        success: true,
        data: formatted,
      });
    }
  );

  // GET /leads - Admin/Staff list leads with pagination & RBAC
  fastify.get(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const validatedQuery = handleValidation(
        listLeadsQuerySchema.safeParse(request.query),
        request,
        reply
      );
      if (!validatedQuery) return;

      const userRoles = request.user.roles || [];
      const isAdmin = userRoles.includes("admin");
      const isStaffOnly = userRoles.includes("staff") && !isAdmin;

      // RBAC Constraint: Staff can ONLY see their assigned leads
      if (isStaffOnly) {
        (validatedQuery as any).assignedToUserId = request.user.id;
      } else if ((validatedQuery as any).assignedToUserId === "me") {
        (validatedQuery as any).assignedToUserId = request.user.id;
      }

      const result = await leadService.listLeads(validatedQuery);
      return reply.send({
        success: true,
        data: result.items,
        pagination: result.pagination,
      });
    }
  );

  // GET /leads/:id - Admin/Staff get single lead details
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const { id } = request.params;
      const lead = await leadService.getLeadById(id);

      if (!lead) {
        return reply.status(404).send({
          success: false,
          error: "Không tìm thấy thông tin tư vấn",
        });
      }

      const userRoles = request.user.roles || [];
      const isAdmin = userRoles.includes("admin");
      const isStaffOnly = userRoles.includes("staff") && !isAdmin;
      if (isStaffOnly && lead.assignedToUserId !== request.user.id) {
        return reply.status(403).send({
          success: false,
          error: "Bạn không có quyền xem thông tin khách tư vấn này",
        });
      }

      return reply.send({
        success: true,
        data: lead,
      });
    }
  );

  // PATCH /leads/:id - Admin/Staff update status or notes
  fastify.patch<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "staff")] },
    async (request, reply) => {
      const { id } = request.params;
      const validatedData = handleValidation(
        updateLeadSchema.safeParse(request.body),
        request,
        reply
      );
      if (!validatedData) return;

      const userRoles = request.user.roles || [];
      const isAdmin = userRoles.includes("admin");
      const isStaffOnly = userRoles.includes("staff") && !isAdmin;

      // If staff, ensure they don't reassign lead unless they are admin
      if (isStaffOnly && validatedData.assignedToUserId && validatedData.assignedToUserId !== request.user.id) {
        return reply.status(403).send({
          success: false,
          error: "Chỉ Quản trị viên mới có quyền chuyển giao người phụ trách lead",
        });
      }

      try {
        const updated = await leadService.updateLead(id, validatedData);
        return reply.send({
          success: true,
          data: updated,
        });
      } catch (err: any) {
        return reply.status(404).send({
          success: false,
          error: "Không tìm thấy lead hoặc không thể cập nhật",
        });
      }
    }
  );

  // DELETE /leads/:id - Admin only delete lead
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { id } = request.params;
      try {
        await leadService.deleteLead(id);
        return reply.send({
          success: true,
          message: "Đã xóa lead thành công",
        });
      } catch (err: any) {
        return reply.status(404).send({
          success: false,
          error: "Không tìm thấy lead",
        });
      }
    }
  );
};

export default leadRoutes;
