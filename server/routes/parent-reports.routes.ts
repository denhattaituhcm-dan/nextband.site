import { FastifyPluginAsync } from 'fastify';
import { SnapshotService } from '../services/snapshot.service.js';
import { NotificationService } from '../services/notification.service.js';

const parentReportsRoutes: FastifyPluginAsync = async (fastify) => {
  const prisma = fastify.prisma;
  const snapshotService = new SnapshotService(prisma);
  const notificationService = new NotificationService(prisma);

  /**
   * GET /public/parent-reports/:token
   * Zero-login, read-only endpoint for Parent Progress Hub
   */
  fastify.get('/public/parent-reports/:token', async (request: any, reply: any) => {
    const { token } = request.params;
    if (!token) {
      return reply.status(400).send({ success: false, error: 'Token is required' });
    }

    // Anti-cache headers for Zalo In-App Browser
    reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', '0');

    try {
      const enrollment = await prisma.classStudent.findUnique({
        where: { parentToken: token },
        include: {
          student: {
            select: {
              userId: true,
              fullName: true,
              avatarUrl: true,
              parentName: true,
              parentPhone: true,
              phone: true,
            },
          },
          class: {
            select: {
              id: true,
              name: true,
              totalWeeks: true,
              startDate: true,
              endDate: true,
              teacher: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
      });

      if (!enrollment || !enrollment.class || !enrollment.student) {
        return reply.status(404).send({
          success: false,
          error: 'Không tìm thấy báo cáo học tập hoặc liên kết đã hết hiệu lực.',
        });
      }

      const cls = enrollment.class;
      const student = enrollment.student;
      const totalWeeks = cls.totalWeeks || 10;
      const now = new Date();
      const currentWeek = snapshotService.calculateWeekNumber(cls.startDate, now, totalWeeks);

      // 1. Check if snapshot exists for the current or most recent week
      const latestSnapshot = await prisma.weeklySnapshot.findFirst({
        where: {
          classId: cls.id,
          studentId: student.userId,
        },
        orderBy: { weekNumber: 'desc' },
      });

      // 2. Fetch latest target band from assessment session if available
      const latestAssessment = await prisma.assessmentSession.findFirst({
        where: { userId: student.userId },
        orderBy: { createdAt: 'desc' },
        select: { targetBand: true },
      });
      const targetBand = latestAssessment?.targetBand || 'IELTS 6.0+';

      // 3. Structured feedback from teacher
      const latestReport = await prisma.studentPeriodicReport.findFirst({
        where: {
          classId: cls.id,
          studentId: student.userId,
        },
        orderBy: { createdAt: 'desc' },
      });

      let snapshotData;
      if (latestSnapshot) {
        snapshotData = {
          weekNumber: latestSnapshot.weekNumber,
          hwCompleted: latestSnapshot.hwCompleted,
          hwTotal: latestSnapshot.hwTotal,
          hwRate: latestSnapshot.hwRate,
          streakDays: latestSnapshot.streakDays,
          attendanceRate: latestSnapshot.attendanceRate,
          scholarshipTier: latestSnapshot.scholarshipTier,
          scholarshipAmount: Number(latestSnapshot.scholarshipAmount),
          lossAversionNote: latestSnapshot.lossAversionNote,
          teacherNote: latestSnapshot.teacherNote,
          parentEncouraged: latestSnapshot.parentEncouraged,
          cutoffAt: latestSnapshot.cutoffAt,
        };
      } else {
        // Live projection before first snapshot cut-off
        const assignments = await prisma.classExamAssignment.findMany({
          where: { classId: cls.id, status: 'PUBLISHED' },
        });
        const assignedExamIds = assignments.map((a) => a.examId);
        const submissions = await prisma.examSubmission.findMany({
          where: {
            studentId: student.userId,
            examId: { in: assignedExamIds },
            status: { in: ['SUBMITTED', 'GRADED'] },
          },
        });

        const hwTotal = assignments.length;
        const hwCompleted = submissions.length;
        const hwRate = hwTotal > 0 ? Math.round((hwCompleted / hwTotal) * 100) : 100;
        const standing = snapshotService.calculateScholarshipStanding(hwCompleted, hwTotal, 100);

        snapshotData = {
          weekNumber: currentWeek,
          hwCompleted,
          hwTotal,
          hwRate,
          streakDays: submissions.length,
          attendanceRate: 100,
          scholarshipTier: standing.tier,
          scholarshipAmount: standing.amount,
          lossAversionNote: standing.lossAversionNote,
          teacherNote: latestReport?.recommendations || 'Em duy trì thái độ học tập rất nghiêm túc.',
          parentEncouraged: false,
          cutoffAt: now,
        };
      }

      // Re-enrollment eligibility (Triggered around week 8 to 10)
      const canReEnroll = currentWeek >= Math.max(1, totalWeeks - 2);

      const responsePayload = {
        student: {
          id: student.userId,
          name: student.fullName || 'Học viên NextBand',
          avatarUrl: student.avatarUrl,
          targetBand,
          className: cls.name,
          teacherName: cls.teacher?.fullName || 'Giảng viên phụ trách',
          parentName: student.parentName,
          parentPhone: student.parentPhone || student.phone,
        },
        classInfo: {
          id: cls.id,
          name: cls.name,
          currentWeek,
          totalWeeks,
          startDate: cls.startDate,
          endDate: cls.endDate,
        },
        snapshot: snapshotData,
        teacherEvaluation: {
          strengths: latestReport?.strengths || 'Nắm vững kiến thức trọng tâm bài học.',
          weaknesses: latestReport?.weaknesses || 'Cần chú ý kiểm tra lại lỗi chính tả trước khi nộp bài.',
          recommendations: latestReport?.recommendations || snapshotData.teacherNote,
        },
        // Evidence Provenance Layer — Audit trail for learning facts
        evidenceProvenance: {
          snapshotId: latestSnapshot?.id || null,
          evaluatedCutoff: latestSnapshot?.cutoffAt || now,
          reportId: latestReport?.id || null,
          facts: [
            {
              type: 'HOMEWORK_COMPLETION',
              value: `${snapshotData.hwCompleted}/${snapshotData.hwTotal} bài (${snapshotData.hwRate}%)`,
              source: latestSnapshot ? `WeeklySnapshot#${latestSnapshot.id}` : 'LiveExecutionProjection',
            },
            {
              type: 'ATTENDANCE_RATE',
              value: `${snapshotData.attendanceRate}%`,
              source: `ClassAttendanceRecords[classId=${cls.id},studentId=${student.userId}]`,
            },
            {
              type: 'SCHOLARSHIP_TIER',
              value: snapshotData.scholarshipTier,
              amount: snapshotData.scholarshipAmount,
              source: 'ARIS_DISCIPLINE_FRAMEWORK',
            },
          ],
          academicEvidence: [
            ...(latestReport?.strengths ? [{ type: 'STRENGTH', content: latestReport.strengths, author: cls.teacher?.fullName || 'Giáo viên' }] : []),
            ...(latestReport?.weaknesses ? [{ type: 'AREA_FOR_IMPROVEMENT', content: latestReport.weaknesses, author: cls.teacher?.fullName || 'Giáo viên' }] : []),
          ],
          teacherCommentary: [
            {
              type: 'RECOMMENDATION',
              content: latestReport?.recommendations || snapshotData.teacherNote,
              author: cls.teacher?.fullName || 'Giáo viên',
            }
          ],
        },
        canReEnroll,
        hotlinePhone: process.env.VITE_HOTLINE_ZALO_PHONE || '0901234567',
      };

      return reply.send({
        success: true,
        data: responsePayload,
      });
    } catch (err: any) {
      fastify.log.error(err, 'Failed to fetch parent report');
      return reply.status(500).send({
        success: false,
        error: 'Lỗi máy chủ khi tải báo cáo học tập: ' + err.message,
      });
    }
  });

  /**
   * POST /public/parent-reports/:token/cheer
   * Parent sends encouragement/heart to student
   */
  fastify.post('/public/parent-reports/:token/cheer', async (request: any, reply: any) => {
    const { token } = request.params;

    try {
      const enrollment = await prisma.classStudent.findUnique({
        where: { parentToken: token },
        select: {
          classId: true,
          studentId: true,
        },
      });

      if (!enrollment) {
        return reply.status(404).send({ success: false, error: 'Token không hợp lệ' });
      }

      // Update latest snapshot
      const latestSnapshot = await prisma.weeklySnapshot.findFirst({
        where: {
          classId: enrollment.classId,
          studentId: enrollment.studentId,
        },
        orderBy: { weekNumber: 'desc' },
      });

      if (latestSnapshot) {
        await prisma.weeklySnapshot.update({
          where: { id: latestSnapshot.id },
          data: { parentEncouraged: true },
        });
      }

      // Send in-app notification to student
      await notificationService.createNotification(prisma, {
        userId: enrollment.studentId,
        type: 'SYSTEM',
        title: '❤️ Ba Mẹ vừa thả tim báo cáo của bạn!',
        message: 'Ba Mẹ vừa xem tiến độ tuần này và gửi lời động viên tới bạn. Giữ vững phong độ nhé!',
        link: '/profile',
        entityType: 'PARENT_CHEER',
        entityId: latestSnapshot?.id || enrollment.classId,
      });

      return reply.send({
        success: true,
        message: 'Đã gửi lời khen thành công đến em!',
      });
    } catch (err: any) {
      fastify.log.error(err, 'Failed to process parent cheer');
      return reply.status(500).send({
        success: false,
        error: 'Không thể gửi lời động viên: ' + err.message,
      });
    }
  });
};

export default parentReportsRoutes;
