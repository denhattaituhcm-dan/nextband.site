import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { NotificationService } from '../services/notification.service.js';

const reEnrollmentRequestSchema = z.object({
  token: z.string().optional(),
  classId: z.string().optional(),
  studentId: z.string().optional(),
  parentPhone: z.string().optional(),
  scholarshipAmount: z.number().optional().default(500000),
});

const reEnrollmentRoutes: FastifyPluginAsync = async (fastify) => {
  const prisma = fastify.prisma;
  const notificationService = new NotificationService(prisma);

  fastify.post('/public/re-enrollment/request', async (request: any, reply: any) => {
    const parseResult = reEnrollmentRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: 'Dữ liệu yêu cầu không hợp lệ',
      });
    }

    const { token, classId, studentId, parentPhone, scholarshipAmount } = parseResult.data;

    try {
      let enrollment;
      if (token) {
        enrollment = await prisma.classStudent.findUnique({
          where: { parentToken: token },
          include: {
            class: true,
            student: true,
          },
        });
      } else if (classId && studentId) {
        enrollment = await prisma.classStudent.findUnique({
          where: {
            classId_studentId: { classId, studentId },
          },
          include: {
            class: true,
            student: true,
          },
        });
      }

      if (!enrollment) {
        return reply.status(404).send({
          success: false,
          error: 'Không tìm thấy thông tin học viên để tái tục.',
        });
      }

      const student = enrollment.student;
      const cls = enrollment.class;
      const phoneToContact = parentPhone || student.parentPhone || student.phone || '0900000000';
      const formattedAmount = `${scholarshipAmount.toLocaleString('vi-VN')}đ`;

      // 1. Record Lead in CRM (contact_leads)
      const lead = await prisma.contactLead.create({
        data: {
          fullName: student.fullName || 'Học viên NextBand',
          phone: phoneToContact,
          source: 'RE_ENROLLMENT_HUB',
          status: 'NEW',
          notes: `[TÁI TỤC PARENT HUB] Yêu cầu bảo lưu Học bổng Kỷ luật ${formattedAmount} của em ${student.fullName} (Lớp ${cls.name}) để đăng ký khóa học kế tiếp.`,
        },
      });

      // 2. Dispatch notifications to all Admins and the class Teacher
      const admins = await prisma.userRole.findMany({
        where: { role: 'admin' },
        select: { userId: true },
      });

      const recipientUserIds = new Set<string>();
      admins.forEach((a) => recipientUserIds.add(a.userId));
      if (cls.teacherId) {
        recipientUserIds.add(cls.teacherId);
      }

      if (recipientUserIds.size > 0) {
        await notificationService.createBatchNotifications(
          prisma,
          Array.from(recipientUserIds).map((userId) => ({
            userId,
            type: 'RE_ENROLLMENT_INTENT',
            title: '🎯 Yêu cầu Tái tục Khóa học mới!',
            message: `Phụ huynh em ${student.fullName} (Lớp ${cls.name}) vừa bấm bảo lưu Học bổng ${formattedAmount} để đăng ký khóa mới.`,
            link: '/admin/leads',
            entityType: 'RE_ENROLLMENT_LEAD',
            entityId: lead.id,
          }))
        );
      }

      // 3. Build Zalo Direct Chat Deep-link
      const hotlinePhone = process.env.VITE_HOTLINE_ZALO_PHONE || '0981977797';
      const prefilledText = `Chào Thầy/Cô NextBand, tôi là phụ huynh em ${student.fullName} (Lớp ${cls.name}). Tôi muốn đăng ký giữ chỗ khóa tiếp theo và áp dụng Học bổng Kỷ luật ${formattedAmount} của con ạ.`;
      const zaloDeepLink = `https://zalo.me/${hotlinePhone}?text=${encodeURIComponent(prefilledText)}`;

      return reply.send({
        success: true,
        message: 'Đã tiếp nhận yêu cầu tái tục thành công!',
        data: {
          leadId: lead.id,
          hotlinePhone,
          zaloDeepLink,
          prefilledText,
        },
      });
    } catch (err: any) {
      fastify.log.error(err, 'Failed to process re-enrollment request');
      return reply.status(500).send({
        success: false,
        error: 'Lỗi hệ thống khi gửi yêu cầu tái tục: ' + err.message,
      });
    }
  });
};

export default reEnrollmentRoutes;
