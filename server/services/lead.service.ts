import { PrismaClient, LeadStatus } from "@prisma/client";
import { CreateLeadInput, UpdateLeadInput, ListLeadsQuery, ConvertLeadInput } from "../schemas/lead.schema.js";
import { leadNotificationService } from "./leadNotification.service.js";

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

    // Resolve structured referral code if provided
    let referralCode: string | null = null;
    let inviterUserId: string | null = null;

    if (input.referralCode && input.referralCode.trim().length > 0) {
      const cleanRef = input.referralCode.trim().toUpperCase();
      const inviter = await this.prisma.user.findUnique({
        where: { referralCode: cleanRef },
        select: { userId: true, phone: true, fullName: true },
      });

      // Anti-cheat: inviter must exist, and phone must not match referee phone
      if (inviter && (!inviter.phone || inviter.phone.trim() !== input.phone.trim())) {
        referralCode = cleanRef;
        inviterUserId = inviter.userId;
      }
    }

    const lead = await this.prisma.contactLead.create({
      data: {
        fullName: input.fullName,
        phone: input.phone,
        email: input.email && input.email.length > 0 ? input.email : null,
        goal: input.goal && input.goal.length > 0 ? input.goal : null,
        source: input.source || "contact_page",
        preferredBranch: input.preferredBranchId ? { connect: { id: input.preferredBranchId } } : undefined,
        referralCode,
        inviter: inviterUserId ? { connect: { userId: inviterUserId } } : undefined,
        notes: input.notes && input.notes.length > 0 ? input.notes : null,
        createdByUser: input.createdByUserId ? { connect: { userId: input.createdByUserId } } : undefined,
        assignedToUser: input.createdByUserId ? { connect: { userId: input.createdByUserId } } : undefined,
        status: LeadStatus.NEW,
      },
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
        createdByUser: { select: { id: true, userId: true, fullName: true } },
        convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
        assignedToUser: { select: { id: true, userId: true, fullName: true, avatarUrl: true } },
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
    // Filter by specific assigned user (supports "me" token resolved at route level)
    if (query.assignedToUserId) {
      where.assignedToUserId = query.assignedToUserId;
    }
    // Filter unassigned leads only
    if (query.unassigned === "true") {
      where.assignedToUserId = null;
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

    const leadInclude = {
      preferredBranch: { select: { id: true, name: true, code: true } },
      createdByUser: { select: { id: true, userId: true, fullName: true } },
      convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
      assignedToUser: { select: { id: true, userId: true, fullName: true, avatarUrl: true } },
    };

    const [total, items] = await Promise.all([
      this.prisma.contactLead.count({ where }),
      this.prisma.contactLead.findMany({
        where,
        skip,
        take: limit,
        include: leadInclude,
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
        assignedToUser: { select: { id: true, userId: true, fullName: true, avatarUrl: true } },
      },
    });
  }

  /**
   * Update lead status / notes / assigned staff (with FK ownership)
   */
  async updateLead(id: string, input: UpdateLeadInput) {
    const data: any = {};
    if (input.status !== undefined) data.status = input.status as LeadStatus;
    if (input.assignedTo !== undefined) data.assignedTo = input.assignedTo; // deprecated, keep for compat
    if (input.preferredBranchId !== undefined) data.preferredBranchId = input.preferredBranchId;
    if (input.notes !== undefined) data.notes = input.notes;
    if (input.convertedUserId !== undefined) data.convertedUserId = input.convertedUserId;

    // New FK-based assignment
    if (input.assignedToUserId !== undefined) {
      data.assignedToUserId = input.assignedToUserId;
      // Record timestamp when assignment changes (set to now if assigning, clear if unassigning)
      data.assignedAt = input.assignedToUserId ? new Date() : null;
    }

    return this.prisma.contactLead.update({
      where: { id },
      data,
      include: {
        preferredBranch: { select: { id: true, name: true, code: true } },
        createdByUser: { select: { id: true, userId: true, fullName: true } },
        convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
        assignedToUser: { select: { id: true, userId: true, fullName: true, avatarUrl: true } },
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

    const finalPassword = input.password || Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    // OP-GAP-02: Pre-validate targetClassId before creating user in Postgres
    let validatedTargetClass: any = null;
    if (input.targetClassId) {
      validatedTargetClass = await this.prisma.class.findUnique({
        where: { id: input.targetClassId },
        include: {
          branch: { select: { id: true, name: true } },
          course: { select: { id: true, title: true, price: true } },
        },
      });

      if (!validatedTargetClass) {
        throw new Error("Lớp học mục tiêu không tồn tại");
      }

      if (validatedTargetClass.status === "CLOSED" || validatedTargetClass.status === "ARCHIVED" || !validatedTargetClass.isActive) {
        throw new Error("Lớp học đã đóng hoặc không còn hoạt động, không thể xếp học viên vào lớp này");
      }
    }

    // 1. Create User via atomic PostgreSQL function
    const dbResult: any = await this.prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        $2::text,
        $3::text,
        NULL::text,
        'student'::text,
        $4::text,
        NULL::text,
        NULL::text,
        NULL::date
      ) as result;
    `, email, fullName, phone, finalPassword);

    const profileData = dbResult?.[0]?.result;
    if (!profileData) {
      throw new Error("Không thể tạo tài khoản học viên trong cơ sở dữ liệu");
    }

    const supabaseUserId = profileData.user_id || profileData.id;

    try {
      // 2. Atomic Database Transaction: Link branch, update lead, and optionally place into class
      const result = await this.prisma.$transaction(async (tx) => {
        const newUser = await tx.user.findFirst({
          where: { userId: supabaseUserId },
          include: { roles: true },
        });

        if (!newUser) {
          throw new Error("Không tìm thấy thông tin học viên sau khi tạo");
        }

        // B. Create UserBranch (if branchId provided)
        if (branchId) {
          await tx.userBranch.create({
            data: {
              userId: supabaseUserId,
              branchId,
            },
          });
        }

        // Ensure new student has a stable unique referralCode
        if (!newUser.referralCode) {
          const cleanName = (fullName || "STUDENT")
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Z]/g, "")
            .slice(0, 5)
            .padEnd(5, "X");
          const idSuffix = supabaseUserId.replace(/-/g, "").slice(-4).toUpperCase();
          const autoCode = `ARIS-${cleanName}${idSuffix}`;
          await tx.user.update({
            where: { userId: supabaseUserId },
            data: { referralCode: autoCode },
          }).catch(() => {});
        }

        // Referral Attribution & 200.000đ Tuition Discount
        let discountApplied = 0;
        let attributionRecord: any = null;
        if (lead.referralCode && lead.inviterUserId && lead.inviterUserId !== supabaseUserId) {
          discountApplied = 200000;
          try {
            attributionRecord = await tx.referralAttribution.create({
              data: {
                inviterUserId: lead.inviterUserId,
                refereeLeadId: lead.id,
                refereeUserId: supabaseUserId,
                referralCode: lead.referralCode,
                discountAmount: 200000,
                status: "CONVERTED",
              },
            });

            await tx.referralReward.create({
              data: {
                attributionId: attributionRecord.id,
                inviterUserId: lead.inviterUserId,
                rewardType: "ARIS_GIFT_BOX",
                status: "PENDING_QUALIFICATION",
                notes: `Người được mời: ${fullName} (${supabaseUserId}) đã ghi danh`,
              },
            });

            if ((tx as any).notification) {
              const { NotificationService } = await import("./notification.service.js");
              const notifService = new NotificationService(tx as any);
              await notifService.createNotification(tx, {
                userId: lead.inviterUserId,
                type: "SYSTEM" as any,
                title: "🎉 Bạn đồng hành đã hoàn tất đăng ký!",
                message: `Bạn ${fullName} đã đăng ký thành công! Bạn đang có 01 Bộ Quà Tặng ARIS chờ kích hoạt khi bạn mới hoàn tất học phí.`,
                link: "/app/profile",
                entityType: "REFERRAL",
                entityId: attributionRecord.id,
              }).catch(() => {});
            }
          } catch (refErr) {
            console.error("[LeadService] Error recording referral attribution:", refErr);
          }
        }

        // C. OP-GAP-02: Class Placement into class_students
        let placedClassInfo: any = null;
        if (input.targetClassId) {
          const existingMembership = await tx.classStudent.findUnique({
            where: {
              classId_studentId: {
                classId: input.targetClassId,
                studentId: supabaseUserId,
              },
            },
          });

          if (!existingMembership) {
            const coursePrice = Number(validatedTargetClass.course?.price || 0);
            let fee = input.tuitionFee !== undefined ? input.tuitionFee : coursePrice;
            if (discountApplied > 0 && input.tuitionFee === undefined) {
              fee = Math.max(0, fee - discountApplied);
            }
            const paid = input.paidAmount !== undefined ? input.paidAmount : 0;
            let pStatus: any = input.paymentStatus;
            if (!pStatus) {
              if (fee > 0 && paid >= fee) pStatus = "PAID";
              else if (paid > 0) pStatus = "PARTIAL";
              else pStatus = "UNPAID";
            }

            await tx.classStudent.create({
              data: {
                classId: input.targetClassId,
                studentId: supabaseUserId,
                tuitionFee: fee,
                paidAmount: paid,
                paymentStatus: pStatus,
                paymentNote: input.paymentNote || (discountApplied > 0 ? "[Ưu đãi Study Buddy] Giảm 200.000đ" : null),
                externalRef: input.externalRef || null,
                joinedAt: new Date(),
              },
            });

            // Bi-directional Cascade: Ensure Course Enrollment exists for target class course
            if (validatedTargetClass.courseId) {
              const existingEnrollment = await tx.enrollment.findUnique({
                where: {
                  courseId_studentId: {
                    courseId: validatedTargetClass.courseId,
                    studentId: supabaseUserId,
                  },
                },
              });

              if (!existingEnrollment) {
                await tx.enrollment.create({
                  data: {
                    courseId: validatedTargetClass.courseId,
                    studentId: supabaseUserId,
                    enrolledAt: new Date(),
                  },
                });
              }
            }

            if (_operatorId) {
              await tx.enrollmentAuditLog.create({
                data: {
                  operatorId: _operatorId,
                  studentId: supabaseUserId,
                  classId: input.targetClassId,
                  action: "LEAD_CONVERSION_PLACEMENT",
                  reason: `Xếp lớp ban đầu khi chuyển đổi từ Khách tư vấn #${lead.id} (${fullName})${discountApplied > 0 ? " [Đã áp dụng mã giới thiệu -200k]" : ""}`,
                  toStatus: "ACTIVE",
                },
              });
            }
          }

          placedClassInfo = {
            id: validatedTargetClass.id,
            name: validatedTargetClass.name,
            branchName: validatedTargetClass.branch?.name || null,
          };
        }

        // D. Update Lead with convertedUserId, convertedAt and Status
        const updatedLead = await tx.contactLead.update({
          where: { id: leadId },
          data: {
            convertedUserId: supabaseUserId,
            convertedAt: new Date(),
            status: (input.status as LeadStatus) || LeadStatus.ENROLLED,
          },
          include: {
            preferredBranch: { select: { id: true, name: true, code: true } },
            createdByUser: { select: { id: true, userId: true, fullName: true } },
            convertedUser: { select: { id: true, userId: true, fullName: true, email: true } },
          },
        });

        return { user: newUser, lead: updatedLead, placedClass: placedClassInfo };
      }, {
        maxWait: 10000,
        timeout: 20000,
      });

      // 3. Dispatch in-app notification & Email/Telegram notification to Admins
      (async () => {
        try {
          const { NotificationService } = await import("./notification.service.js");
          const notifService = new NotificationService(this.prisma);
          await notifService.notifyUsersByRole(["admin"], {
            type: "SYSTEM",
            title: "Khách tư vấn đã chuyển thành Học viên",
            message: `Lead ${fullName} (${phone}) đã được chuyển đổi thành học viên chính thức (${email})${result.placedClass ? ` và xếp vào lớp ${result.placedClass.name}` : ""}.`,
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
            source: result.placedClass
              ? `Chuyển đổi từ Lead -> Xếp vào lớp ${result.placedClass.name}`
              : "Chuyển đổi từ Khách tư vấn (Lead Conversion)",
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
        class: result.placedClass || null,
      };
    } catch (err: any) {
      if (supabaseUserId) {
        try {
          await this.prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE id = $1::uuid`, supabaseUserId);
        } catch (cleanupErr) {
          console.error("[LeadService] Compensation rollback failed for user:", cleanupErr);
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

