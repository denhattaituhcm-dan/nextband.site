import { PrismaClient, Prisma, NotificationType, Notification } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface CreateNotificationDTO {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string | null;
  entityType?: string | null;
  entityId?: string | null;
}

export class NotificationService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Tạo 1 notification trong transaction hoặc direct client context.
   * Nếu vi phạm unique constraint (P2002) do retry cùng business event -> skip an toàn (Idempotency).
   */
  async createNotification(
    tx: Prisma.TransactionClient | PrismaClient,
    data: CreateNotificationDTO
  ): Promise<void> {
    // Use createMany with skipDuplicates: true so Prisma generates
    // INSERT ... ON CONFLICT DO NOTHING at the PostgreSQL level.
    // This prevents a duplicate from aborting the enclosing $transaction —
    // the fix for BUG-P1-TX-02.
    await tx.notification.createMany({
      data: [
        {
          userId: data.userId,
          type: data.type,
          title: data.title,
          message: data.message,
          link: data.link || null,
          entityType: data.entityType || null,
          entityId: data.entityId || null,
        },
      ],
      skipDuplicates: true,
    });
  }

  /**
   * Tạo batch notifications cho nhiều người nhận bằng 1 single query (createMany).
   * Dùng skipDuplicates: true để bỏ qua các bản ghi trùng lặp.
   */
  async createBatchNotifications(
    tx: Prisma.TransactionClient | PrismaClient,
    items: CreateNotificationDTO[]
  ): Promise<void> {
    if (items.length === 0) return;

    await tx.notification.createMany({
      data: items.map((item) => ({
        userId: item.userId,
        type: item.type,
        title: item.title,
        message: item.message,
        link: item.link || null,
        entityType: item.entityType || null,
        entityId: item.entityId || null,
      })),
      skipDuplicates: true,
    });
  }

  /**
   * Lấy danh sách notifications của một user cụ thể (có phân trang).
   * Backend xác định ownership, không cho phép query user khác.
   */
  async listNotifications(params: {
    userId: string;
    page?: number;
    limit?: number;
  }): Promise<{
    items: Notification[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? Math.min(params.limit, 50) : 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId: params.userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({
        where: { userId: params.userId },
      }),
    ]);

    return { items, total, page, limit };
  }

  /**
   * Đếm số lượng thông báo chưa đọc của user.
   */
  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Đánh dấu 1 thông báo là đã đọc.
   * Áp dụng Object-level authorization: chỉ cập nhật nếu bản ghi thuộc đúng userId.
   */
  async markAsRead(id: string, userId: string): Promise<boolean> {
    const result = await this.prisma.notification.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return result.count > 0;
  }

  /**
   * Đánh dấu tất cả thông báo chưa đọc của user là đã đọc.
   */
  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return result.count;
  }

  /**
   * ADMIN: Phát thông báo tới nhóm đối tượng (Toàn hệ thống, Học viên, Giáo viên, hoặc Lớp học).
   * Transaction + Backend-resolved DISTINCT recipients + UNIQUE constraint chống duplicate.
   */
  async broadcastAnnouncement(data: {
    title: string;
    message: string;
    type?: NotificationType;
    targetType: 'ALL' | 'STUDENTS' | 'TEACHERS' | 'CLASS';
    targetClassId?: string;
    link?: string | null;
    createdBy?: string | null;
    publishedAt?: Date;
    expiresAt?: Date | null;
  }): Promise<{ broadcastId: string; recipientCount: number }> {
    let targetIds: string[] = [];

    if (data.targetType === 'ALL') {
      const users = await this.prisma.user.findMany({
        where: { isActive: true },
        select: { userId: true },
      });
      targetIds = users.map((u) => u.userId);
    } else if (data.targetType === 'STUDENTS') {
      const studentRoles = await this.prisma.userRole.findMany({
        where: { role: 'student', user: { isActive: true } },
        select: { userId: true },
      });
      targetIds = studentRoles.map((r) => r.userId);
    } else if (data.targetType === 'TEACHERS') {
      const teacherRoles = await this.prisma.userRole.findMany({
        where: { role: 'teacher', user: { isActive: true } },
        select: { userId: true },
      });
      targetIds = teacherRoles.map((r) => r.userId);
    } else if (data.targetType === 'CLASS') {
      if (!data.targetClassId) {
        throw new Error('targetClassId is required for class broadcast');
      }
      const classStudents = await this.prisma.classStudent.findMany({
        where: { classId: data.targetClassId, status: 'ACTIVE', deletedAt: null },
        select: { studentId: true },
      });
      const cls = await this.prisma.class.findUnique({
        where: { id: data.targetClassId },
        select: { teacherId: true },
      });
      const ids = new Set<string>(classStudents.map((cs) => cs.studentId));
      if (cls?.teacherId) ids.add(cls.teacherId);
      targetIds = Array.from(ids);
    }

    const distinctUserIds = Array.from(new Set(targetIds.filter(Boolean)));
    if (distinctUserIds.length === 0) {
      return { broadcastId: '', recipientCount: 0 };
    }

    const notifType = data.type || NotificationType.ANNOUNCEMENT;

    return await this.prisma.$transaction(async (tx) => {
      const broadcast = await tx.notificationBroadcast.create({
        data: {
          title: data.title,
          message: data.message,
          type: notifType,
          targetType: data.targetType,
          targetClassId: data.targetClassId || null,
          link: data.link || null,
          createdBy: data.createdBy || null,
          publishedAt: data.publishedAt || new Date(),
          expiresAt: data.expiresAt || null,
        },
      });

      const notifItems = distinctUserIds.map((userId) => ({
        broadcastId: broadcast.id,
        userId,
        type: notifType,
        title: data.title,
        message: data.message,
        link: data.link || null,
        entityType: 'ADMIN_ANNOUNCEMENT',
        entityId: broadcast.id,
      }));

      await tx.notification.createMany({
        data: notifItems,
        skipDuplicates: true,
      });

      return {
        broadcastId: broadcast.id,
        recipientCount: distinctUserIds.length,
      };
    });
  }

  /**
   * ADMIN: Lấy danh sách các đợt phát thông báo kèm thống kê số người nhận & đã đọc.
   */
  async listAdminBroadcasts(params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }): Promise<{
    items: Array<{
      id: string;
      broadcastId: string;
      title: string;
      message: string;
      type: NotificationType;
      targetType: string;
      targetClassId?: string | null;
      link?: string | null;
      createdBy?: string | null;
      createdAt: Date;
      publishedAt: Date;
      expiresAt?: Date | null;
      totalRecipients: number;
      readCount: number;
      readRate: number;
    }>;
    total: number;
    page: number;
    limit: number;
  }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? Math.min(params.limit, 50) : 20;
    const skip = (page - 1) * limit;

    const where: Prisma.NotificationBroadcastWhereInput = {
      deletedAt: null,
      ...(params.search
        ? {
            OR: [
              { title: { contains: params.search, mode: 'insensitive' } },
              { message: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(params.type ? { type: params.type as NotificationType } : {}),
    };

    const [broadcasts, total] = await Promise.all([
      this.prisma.notificationBroadcast.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: {
          _count: {
            select: { notifications: true },
          },
        },
      }),
      this.prisma.notificationBroadcast.count({ where }),
    ]);

    const items = await Promise.all(
      broadcasts.map(async (b) => {
        const totalRecipients = b._count.notifications;
        const readCount = await this.prisma.notification.count({
          where: {
            broadcastId: b.id,
            isRead: true,
          },
        });
        const readRate = totalRecipients > 0 ? Math.round((readCount / totalRecipients) * 1000) / 10 : 0;
        return {
          id: b.id,
          broadcastId: b.id,
          title: b.title,
          message: b.message,
          type: b.type,
          targetType: b.targetType,
          targetClassId: b.targetClassId,
          link: b.link,
          createdBy: b.createdBy,
          createdAt: b.createdAt,
          publishedAt: b.publishedAt,
          expiresAt: b.expiresAt,
          totalRecipients,
          readCount,
          readRate,
        };
      })
    );

    return { items, total, page, limit };
  }

  /**
   * ADMIN: Lấy danh sách chi tiết người nhận của 1 đợt phát thông báo (có phân trang, tìm kiếm và lọc).
   */
  async getBroadcastRecipients(params: {
    broadcastId: string;
    page?: number;
    limit?: number;
    search?: string;
    status?: 'ALL' | 'READ' | 'UNREAD';
  }): Promise<{
    items: Array<{
      id: string;
      userId: string;
      userName: string;
      userEmail: string;
      userAvatar?: string | null;
      userRoles: string[];
      isRead: boolean;
      readAt?: Date | null;
      createdAt: Date;
    }>;
    total: number;
    page: number;
    limit: number;
  }> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? Math.min(params.limit, 100) : 50;
    const skip = (page - 1) * limit;

    const where: Prisma.NotificationWhereInput = {
      broadcastId: params.broadcastId,
      ...(params.status === 'READ'
        ? { isRead: true }
        : params.status === 'UNREAD'
        ? { isRead: false }
        : {}),
      ...(params.search
        ? {
            user: {
              OR: [
                { fullName: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } },
              ],
            },
          }
        : {}),
    };

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        include: {
          user: {
            select: {
              userId: true,
              fullName: true,
              email: true,
              avatarUrl: true,
              roles: {
                select: { role: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({ where }),
    ]);

    const items = notifications.map((n) => ({
      id: n.id,
      userId: n.userId,
      userName: n.user?.fullName || 'Người dùng',
      userEmail: n.user?.email || '',
      userAvatar: n.user?.avatarUrl || null,
      userRoles: n.user?.roles?.map((r) => r.role) || [],
      isRead: n.isRead,
      readAt: n.readAt,
      createdAt: n.createdAt,
    }));

    return { items, total, page, limit };
  }

  /**
   * ADMIN: Soft-delete một đợt phát thông báo theo broadcastId (bảo toàn lịch sử notification cho audit).
   */
  async deleteBroadcast(broadcastId: string): Promise<boolean> {
    const result = await this.prisma.notificationBroadcast.updateMany({
      where: {
        id: broadcastId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return result.count > 0;
  }

  /**
   * Dọn dẹp các thông báo đã đọc cũ hơn X ngày (mặc định 60 ngày).
   * Tuyệt đối không xóa các thông báo chưa đọc.
   */
  async purgeOldReadNotifications(days: number = 60): Promise<number> {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const result = await this.prisma.notification.deleteMany({
      where: {
        isRead: true,
        createdAt: { lte: cutoffDate },
      },
    });
    return result.count;
  }

  /**
   * Gửi thông báo tới tất cả người dùng có role chỉ định (ví dụ: 'admin' hoặc 'teacher').
   * Thiết kế an toàn, không block luồng gọi chính.
   */
  async notifyUsersByRole(
    roles: ('admin' | 'teacher' | 'student')[],
    payload: {
      type: NotificationType;
      title: string;
      message: string;
      link?: string | null;
      entityType?: string | null;
      entityId?: string | null;
    }
  ): Promise<number> {
    try {
      const userRoles = await this.prisma.userRole.findMany({
        where: {
          role: { in: roles },
          user: { isActive: true },
        },
        select: { userId: true },
      });

      const uniqueUserIds = Array.from(new Set(userRoles.map((r) => r.userId).filter(Boolean)));
      if (uniqueUserIds.length === 0) return 0;

      await this.prisma.notification.createMany({
        data: uniqueUserIds.map((userId) => ({
          userId,
          type: payload.type,
          title: payload.title,
          message: payload.message,
          link: payload.link || null,
          entityType: payload.entityType || 'SYSTEM',
          entityId: payload.entityId || 'GLOBAL',
        })),
        skipDuplicates: true,
      });

      return uniqueUserIds.length;
    } catch (err) {
      console.error('[NotificationService] notifyUsersByRole error:', err);
      return 0;
    }
  }
}
