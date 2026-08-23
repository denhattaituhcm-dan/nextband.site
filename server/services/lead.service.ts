import { PrismaClient, LeadStatus } from "@prisma/client";
import { CreateLeadInput, UpdateLeadInput, ListLeadsQuery } from "../schemas/lead.schema.js";
import { leadNotificationService } from "./leadNotification.service.js";

export class LeadService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Create a new contact lead and trigger instant notification
   */
  async createLead(input: CreateLeadInput) {
    // Idempotency: Prevent duplicate lead creation on double click / retry within 5 minutes
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

    const lead = await this.prisma.contactLead.create({
      data: {
        fullName: input.fullName,
        phone: input.phone,
        email: input.email && input.email.length > 0 ? input.email : null,
        goal: input.goal && input.goal.length > 0 ? input.goal : null,
        source: input.source || "contact_page",
        preferredBranchId: input.preferredBranchId || null,
        status: LeadStatus.NEW,
      },
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
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
          message: `Khách hàng ${lead.fullName} (${lead.phone}) vừa để lại thông tin tư vấn.`,
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

    return this.prisma.contactLead.update({
      where: { id },
      data,
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
      },
    });
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
