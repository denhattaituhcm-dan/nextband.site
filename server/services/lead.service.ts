import { PrismaClient, LeadStatus } from "@prisma/client";
import { CreateLeadInput, UpdateLeadInput, ListLeadsQuery, ConvertLeadInput } from "../schemas/lead.schema.js";
import { leadNotificationService } from "./leadNotification.service.js";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

export class LeadService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Check if phone number already exists in contact leads (Duplicate Detection)
   */
  async checkDuplicatePhone(phone: string) {
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    if (!cleanPhone || cleanPhone.length < 5) return [];

    return this.prisma.contactLead.findMany({
      where: {
        phone: { contains: cleanPhone },
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        status: true,
        source: true,
        createdAt: true,
        preferredBranch: { select: { id: true, name: true, code: true } },
        convertedUserId: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  }

  /**
   * Create a new contact lead and trigger instant notification
   */
  async createLead(input: CreateLeadInput) {
    // If not manual intake by staff, apply 5-minute idempotency check
    if (!input.createdByUserId) {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const existingRecentLead = await this.prisma.contactLead.findFirst({
        where: {
          phone: input.phone,
          createdAt: { gte: fiveMinutesAgo },
        },
      });

      if (existingRecentLead) {
        return existingRecentLead;
      }
    }

    const lead = await this.prisma.contactLead.create({
      data: {
        fullName: input.fullName,
        phone: input.phone,
        email: input.email && input.email.length > 0 ? input.email : null,
        goal: input.goal && input.goal.length > 0 ? input.goal : null,
        source: input.source || "contact_page",
        preferredBranchId: input.preferredBranchId || null,
        notes: input.notes && input.notes.length > 0 ? input.notes : null,
        createdByUserId: input.createdByUserId || null,
        status: LeadStatus.NEW,
      },
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
        createdByUser: { select: { id: true, userId: true, fullName: true } },
        convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
      },
    });

    // Asynchronously dispatch instant email notification (won't block HTTP response)
    leadNotificationService.notifyNewLead({
      id: lead.id,
      fullName: lead.fullName,
      phone: lead.phone,
      email: lead.email,
      goal: lead.goal,
      source: lead.source,
      createdAt: lead.createdAt,
    }).catch((err) => {
      console.error("[LeadService] Notification trigger error:", err);
    });

    // In-app notifications for Admins (non-blocking)
    (async () => {
      try {
        const { NotificationService } = await import("./notification.service.js");
        const notifService = new NotificationService(this.prisma);
        await notifService.notifyUsersByRole(["admin"], {
          type: "SYSTEM",
          title: "Có Lead mới đăng ký tư vấn",
          message: `Khách hàng ${lead.fullName} (${lead.phone}) vừa được tiếp nhận từ nguồn ${lead.source}.`,
          link: "/admin/leads",
          entityType: "LEAD",
          entityId: lead.id,
        });
      } catch (inAppErr) {
        console.error("[LeadService] In-app notification error:", inAppErr);
      }
    })();

    return lead;
  }

  /**
   * List leads with pagination and search filters
   */
  async listLeads(query: ListLeadsQuery) {
    const { page, limit, status, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (query.preferredBranchId && query.preferredBranchId !== "ALL" && query.preferredBranchId !== "all") {
      where.preferredBranchId = query.preferredBranchId;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { goal: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
        { source: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.contactLead.count({ where }),
      this.prisma.contactLead.findMany({
        where,
        skip,
        take: limit,
        include: {
          preferredBranch: { select: { id: true, name: true, code: true } },
          createdByUser: { select: { id: true, userId: true, fullName: true } },
          convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * Get single lead by ID
   */
  async getLeadById(id: string) {
    return this.prisma.contactLead.findUnique({
      where: { id },
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
        createdByUser: { select: { id: true, userId: true, fullName: true } },
        convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
      },
    });
  }

  /**
   * Update lead status / notes / assigned staff
   */
  async updateLead(id: string, input: UpdateLeadInput) {
    const data: any = {};
    if (input.status !== undefined) data.status = input.status as LeadStatus;
    if (input.assignedTo !== undefined) data.assignedTo = input.assignedTo;
    if (input.preferredBranchId !== undefined) data.preferredBranchId = input.preferredBranchId;
    if (input.notes !== undefined) data.notes = input.notes;
    if (input.convertedUserId !== undefined) data.convertedUserId = input.convertedUserId;

    return this.prisma.contactLead.update({
      where: { id },
      data,
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
        createdByUser: { select: { id: true, userId: true, fullName: true } },
        convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
      },
    });
  }

  /**
   * Atomic Conversion Flow: Convert Lead -> Student User + UserBranch + Link Lead
   */
  async convertLeadToStudent(leadId: string, input: ConvertLeadInput, _operatorId: string) {
    const lead = await this.prisma.contactLead.findUnique({
      where: { id: leadId },
      include: { preferredBranch: true },
    });

    if (!lead) {
      throw new Error("Không tìm thấy thông tin Lead");
    }

    if (lead.convertedUserId) {
      throw new Error("Lead này đã được chuyển đổi thành học viên trước đó");
    }

    const email = input.email.trim().toLowerCase();
    const fullName = input.fullName?.trim() || lead.fullName;
    const phone = input.phone?.trim() || lead.phone;
    const branchId = input.branchId !== undefined ? input.branchId : lead.preferredBranchId;

    // Check if email already exists in User
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error(`Email ${email} đã tồn tại trên hệ thống`);
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || (env as any).SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      throw new Error("Hệ thống chưa cấu hình SUPABASE_SERVICE_ROLE_KEY cho chức năng tạo tài khoản");
    }

    const finalPassword = input.password || Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    const supabaseAdmin = createClient(env.SUPABASE_URL, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1. Create Supabase Auth User
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: finalPassword,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (authError || !authData.user) {
      if (authError?.message?.toLowerCase().includes("already") || authError?.status === 422) {
        throw new Error("Email đã tồn tại trong hệ thống xác thực Supabase");
      }
      throw new Error(authError?.message || "Không thể tạo tài khoản xác thực");
    }

    const supabaseUserId = authData.user.id;

    try {
      // 2. Atomic Database Transaction
      const result = await this.prisma.$transaction(async (tx) => {
        // A. Create User Profile
        const newUser = await tx.user.create({
          data: {
            userId: supabaseUserId,
            email,
            fullName,
            phone,
            roles: {
              create: { role: "student" },
            },
          },
          include: { roles: true },
        });

        // B. Create UserBranch (if branchId provided)
        if (branchId) {
          await tx.userBranch.create({
            data: {
              userId: supabaseUserId,
              branchId,
            },
          });
        }

        // C. Update Lead with convertedUserId and Status
        const updatedLead = await tx.contactLead.update({
          where: { id: leadId },
          data: {
            convertedUserId: supabaseUserId,
            status: (input.status as LeadStatus) || LeadStatus.ENROLLED,
          },
          include: {
            preferredBranch: { select: { id: true, name: true, code: true } },
            createdByUser: { select: { id: true, userId: true, fullName: true } },
            convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
          },
        });

        return { user: newUser, lead: updatedLead };
      });

      // 3. Dispatch in-app notification & Email/Telegram notification to Admins
      (async () => {
        try {
          const { NotificationService } = await import("./notification.service.js");
          const notifService = new NotificationService(this.prisma);
          await notifService.notifyUsersByRole(["admin"], {
            type: "SYSTEM",
            title: "Khách tư vấn đã chuyển thành Học viên",
            message: `Lead ${fullName} (${phone}) đã được chuyển đổi thành học viên chính thức (${email}).`,
            link: "/admin/users",
            entityType: "USER",
            entityId: supabaseUserId,
          });

          const { leadNotificationService } = await import("./leadNotification.service.js");
          await leadNotificationService.notifyNewStudent({
            id: supabaseUserId,
            fullName,
            email,
            phone,
            branchName: lead.preferredBranch?.name,
            source: "Chuyển đổi từ Khách tư vấn (Lead Conversion)",
          });
        } catch (notifErr) {
          console.error("[LeadService] Conversion notification error:", notifErr);
        }
      })();

      return {
        user: {
          id: result.user.userId,
          email: result.user.email,
          fullName: result.user.fullName,
          phone: result.user.phone,
          roles: result.user.roles.map((r: any) => r.role),
          branchId,
        },
        lead: result.lead,
      };
    } catch (err: any) {
      // 4. Compensation Rollback: Delete Supabase Auth User if DB transaction fails
      if (supabaseUserId) {
        try {
          await supabaseAdmin.auth.admin.deleteUser(supabaseUserId);
        } catch (cleanupErr) {
          console.error("[LeadService] Compensation rollback failed for supabase user:", cleanupErr);
        }
      }
      throw err;
    }
  }

  /**
   * Delete lead
   */
  async deleteLead(id: string) {
    return this.prisma.contactLead.delete({
      where: { id },
    });
  }
}

