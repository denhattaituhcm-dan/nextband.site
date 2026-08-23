import { FastifyPluginAsync } from 'fastify';
import { NotificationService } from '../services/notification.service.js';
import { requireRoles } from '../middlewares/auth.middleware.js';
import { NotificationType } from '@prisma/client';

const notificationsRoutes: FastifyPluginAsync = async (fastify) => {
  const notificationService = new NotificationService(fastify.prisma);

  // GET /notifications — Danh sách notifications của user đang đăng nhập (N3-C: Backend enforces ownership)
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const { page, limit } = (request.query || {}) as { page?: string; limit?: string };

    const result = await notificationService.listNotifications({
      userId: user.id,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
    const unreadCount = await notificationService.getUnreadCount(user.id);

    return reply.send({
      success: true,
      data: result.items,
      unreadCount,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
      },
    });
  });

  // GET /notifications/unread-count — Đếm số lượng chưa đọc
  fastify.get('/unread-count', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const count = await notificationService.getUnreadCount(user.id);
    return reply.send({ success: true, count });
  });

  // PATCH /notifications/:id/read — Đánh dấu đã đọc (N3-C: Object-level authorization)
  fastify.patch<{ Params: { id: string } }>(
    '/:id/read',
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = request.user as { id: string };
      const updated = await notificationService.markAsRead(request.params.id, user.id);

      if (!updated) {
        return reply.status(404).send({ success: false, error: 'Notification not found.' });
      }
      return reply.send({ success: true });
    }
  );

  // PATCH /notifications/read-all — Đánh dấu tất cả thông báo của user hiện tại là đã đọc
  fastify.patch('/read-all', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const user = request.user as { id: string };
    const markedCount = await notificationService.markAllAsRead(user.id);
    return reply.send({ success: true, markedCount });
  });

  // ==========================================
  // ADMIN ROUTES (Quản trị viên phát & quản lý thông báo)
  // ==========================================

  // GET /notifications/admin/broadcasts — Danh sách các đợt phát thông báo
  fastify.get(
    '/admin/broadcasts',
    { preHandler: [fastify.authenticate, requireRoles('admin')] },
    async (request, reply) => {
      const { page, limit, search, type } = (request.query || {}) as {
        page?: string;
        limit?: string;
        search?: string;
        type?: string;
      };

      const result = await notificationService.listAdminBroadcasts({
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
        search,
        type,
      });

      return reply.send({
        success: true,
        data: result.items,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      });
    }
  );

  // GET /notifications/admin/broadcasts/:broadcastId/recipients — Danh sách người nhận của một đợt phát (có phân trang & lọc)
  fastify.get<{
    Params: { broadcastId: string };
    Querystring: { page?: string; limit?: string; search?: string; status?: 'ALL' | 'READ' | 'UNREAD' };
  }>(
    '/admin/broadcasts/:broadcastId/recipients',
    { preHandler: [fastify.authenticate, requireRoles('admin')] },
    async (request, reply) => {
      const { broadcastId } = request.params;
      const { page, limit, search, status } = request.query || {};

      const result = await notificationService.getBroadcastRecipients({
        broadcastId,
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
        search,
        status,
      });

      return reply.send({
        success: true,
        data: result.items,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      });
    }
  );

  // POST /notifications/admin/broadcast — Phát thông báo tới nhóm đối tượng
  fastify.post<{
    Body: {
      title: string;
      message: string;
      type?: NotificationType;
      targetType: 'ALL' | 'STUDENTS' | 'TEACHERS' | 'CLASS';
      targetClassId?: string;
      link?: string;
      expiresAt?: string;
    };
  }>(
    '/admin/broadcast',
    { preHandler: [fastify.authenticate, requireRoles('admin')] },
    async (request, reply) => {
      const user = request.user as { id: string };
      const { title, message, type, targetType, targetClassId, link, expiresAt } = request.body || {};

      if (!title || !title.trim()) {
        return reply.status(400).send({ success: false, error: 'Tiêu đề thông báo không được để trống.' });
      }
      if (!message || !message.trim()) {
        return reply.status(400).send({ success: false, error: 'Nội dung thông báo không được để trống.' });
      }
      if (!targetType || !['ALL', 'STUDENTS', 'TEACHERS', 'CLASS'].includes(targetType)) {
        return reply.status(400).send({ success: false, error: 'Vui lòng chọn đối tượng nhận thông báo hợp lệ (ALL, STUDENTS, TEACHERS, CLASS).' });
      }
      if (targetType === 'CLASS' && !targetClassId) {
        return reply.status(400).send({ success: false, error: 'Vui lòng chọn lớp học nhận thông báo.' });
      }

      try {
        const result = await notificationService.broadcastAnnouncement({
          title: title.trim(),
          message: message.trim(),
          type: type || NotificationType.ANNOUNCEMENT,
          targetType,
          targetClassId,
          link: link?.trim() || null,
          createdBy: user.id,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        });

        return reply.status(201).send({
          success: true,
          broadcastId: result.broadcastId,
          recipientCount: result.recipientCount,
          message: `Đã phát thông báo thành công tới ${result.recipientCount} người nhận.`,
        });
      } catch (err: any) {
        return reply.status(500).send({
          success: false,
          error: err?.message || 'Không thể phát thông báo.',
        });
      }
    }
  );

  // DELETE /notifications/admin/broadcasts/:broadcastId — Soft-delete đợt phát thông báo
  fastify.delete<{ Params: { broadcastId: string } }>(
    '/admin/broadcasts/:broadcastId',
    { preHandler: [fastify.authenticate, requireRoles('admin')] },
    async (request, reply) => {
      const { broadcastId } = request.params;
      const success = await notificationService.deleteBroadcast(broadcastId);
      if (!success) {
        return reply.status(404).send({ success: false, error: 'Thông báo không tồn tại hoặc đã bị xóa.' });
      }
      return reply.send({
        success: true,
        message: 'Đã lưu trữ và xóa thông báo khỏi danh sách quản trị.',
      });
    }
  );

  // POST /notifications/maintenance/cleanup — Dọn dẹp notifications đã đọc cũ hơn 60 ngày
  fastify.post(
    '/maintenance/cleanup',
    { preHandler: [fastify.authenticate, requireRoles('admin')] },
    async (request, reply) => {
      const { days } = (request.body || {}) as { days?: number };
      const retentionDays = Number(days) > 0 ? Number(days) : 60;
      const purgedCount = await notificationService.purgeOldReadNotifications(retentionDays);

      return reply.send({
        success: true,
        message: `Đã dọn dẹp ${purgedCount} thông báo đã đọc cũ hơn ${retentionDays} ngày.`,
        purgedCount,
        retentionDays,
      });
    }
  );
};

export default notificationsRoutes;
