import { FastifyInstance } from "fastify";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";

export default async function adminDashboardRoutes(fastify: FastifyInstance) {
  // GET /admin/dashboard-summary - Aggregated management KPIs & Action Items
  fastify.get(
    "/dashboard-summary",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { branchId = "ALL" } = (request.query || {}) as { branchId?: string };

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const hasBranchFilter = branchId && branchId !== "ALL";
      const classBranchFilter = hasBranchFilter ? { branchId } : {};
      const leadBranchFilter = hasBranchFilter ? { preferredBranchId: branchId } : {};
      const assessmentBranchFilter = hasBranchFilter ? { branchId } : {};

      try {
        const [
          activeStudentsCount,
          reservedStudentsCount,
          newLeadsCount,
          overdueLeadsCount,
          unassignedLeadsCount,
          enrolledLeadsCount,
          placementTestsCount,
          activeClasses,
          pendingGradingCount,
          overdueGradingCount,
          overdueInterventionsCount,
          dueSuspensionsCount,
          recentAbsents,
          teachersData,
        ] = await Promise.all([
          // 1. Học viên đang theo học (ACTIVE)
          fastify.prisma.classStudent.count({
            where: {
              status: "ACTIVE",
              deletedAt: null,
              class: { isActive: true, ...classBranchFilter },
            },
          }),

          // 2. Học viên đang bảo lưu (SUSPENDED)
          fastify.prisma.classStudent.count({
            where: {
              status: "SUSPENDED",
              deletedAt: null,
              class: { isActive: true, ...classBranchFilter },
            },
          }),

          // 3. Lead mới trong 7 ngày
          fastify.prisma.contactLead.count({
            where: {
              createdAt: { gte: sevenDaysAgo },
              ...leadBranchFilter,
            },
          }),

          // 4. Lead mới tồn đọng quá 24h chưa liên hệ (status = NEW)
          fastify.prisma.contactLead.count({
            where: {
              status: "NEW",
              createdAt: { lte: oneDayAgo },
              ...leadBranchFilter,
            },
          }),

          // 4b. Lead chưa phân bổ tư vấn viên (assignedToUserId = null)
          fastify.prisma.contactLead.count({
            where: {
              assignedToUserId: null,
              status: { notIn: ["ENROLLED", "CANCELLED", "ARCHIVED"] },
              ...leadBranchFilter,
            },
          }),

          // 5. Lead chốt nhập học trong 7 ngày
          fastify.prisma.contactLead.count({
            where: {
              status: "ENROLLED",
              updatedAt: { gte: sevenDaysAgo },
              ...leadBranchFilter,
            },
          }),

          // 6. Số lượt test đầu vào trong 7 ngày
          fastify.prisma.assessmentSession.count({
            where: {
              createdAt: { gte: sevenDaysAgo },
              ...assessmentBranchFilter,
            },
          }),

          // 7. Lớp học đang chạy kèm sức chứa phòng
          fastify.prisma.class.findMany({
            where: {
              isActive: true,
              ...classBranchFilter,
            },
            select: {
              id: true,
              name: true,
              startDate: true,
              endDate: true,
              room: {
                select: {
                  capacity: true,
                },
              },
              _count: {
                select: {
                  students: {
                    where: { status: "ACTIVE", deletedAt: null },
                  },
                },
              },
            },
          }),

          // 8. Tổng số bài chờ chấm trên toàn hệ thống
          fastify.prisma.examSubmission.count({
            where: { status: "SUBMITTED" },
          }),

          // 9. Số bài nộp chờ chấm quá hạn 48h (SLA vi phạm)
          fastify.prisma.examSubmission.count({
            where: {
              status: "SUBMITTED",
              submittedAt: { lte: twoDaysAgo },
            },
          }),

          // 9b. GAP 1: Ca can thiệp học vụ đến hạn/quá hạn follow-up (followUpDate <= now)
          fastify.prisma.studentInterventionLog.count({
            where: {
              status: { in: ["OPEN", "IN_PROGRESS"] },
              followUpDate: { lte: now },
            },
          }),

          // 9c. GAP 2: Học viên bảo lưu sắp đến / quá hạn quay lại học (expectedReturnDate <= now + 7 ngày)
          fastify.prisma.classStudent.count({
            where: {
              status: "SUSPENDED",
              deletedAt: null,
              expectedReturnDate: { lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
              class: { isActive: true, ...classBranchFilter },
            },
          }),

          // 10. Danh sách các lượt vắng trong 30 ngày để phát hiện học viên At-Risk
          fastify.prisma.classAttendance.findMany({
            where: {
              status: { in: ["ABSENT", "absent"] },
              sessionDate: { gte: thirtyDaysAgo },
              ...(hasBranchFilter ? { class: { branchId } } : {}),
            },
            select: {
              studentId: true,
            },
          }),

          // 11. Danh sách giáo viên đang hoạt động kèm thống kê tải công việc
          fastify.prisma.user.findMany({
            where: {
              roles: { some: { role: "teacher" } },
              isActive: true,
            },
            select: {
              userId: true,
              fullName: true,
              email: true,
              avatarUrl: true,
              classesAsTeacher: {
                where: { isActive: true, ...classBranchFilter },
                select: {
                  id: true,
                  name: true,
                  _count: {
                    select: {
                      students: { where: { status: "ACTIVE", deletedAt: null } },
                    },
                  },
                  homeworks: {
                    select: {
                      id: true,
                      submissions: {
                        where: { status: "SUBMITTED" },
                        select: { id: true, submittedAt: true },
                      },
                    },
                  },
                },
              },
            },
          }),
        ]);

        // Tính toán danh sách học viên At-Risk (vắng >= 2 buổi)
        const absentCountByStudent = new Map<string, number>();
        recentAbsents.forEach((record) => {
          absentCountByStudent.set(
            record.studentId,
            (absentCountByStudent.get(record.studentId) || 0) + 1
          );
        });
        let atRiskStudentsCount = 0;
        absentCountByStudent.forEach((absentCount) => {
          if (absentCount >= 2) atRiskStudentsCount++;
        });

        // Tính tỷ lệ lấp đầy lớp (Class Fill Rate)
        let totalStudentsInClasses = 0;
        let totalRoomCapacity = 0;
        let lowFillClassesCount = 0;

        activeClasses.forEach((cls) => {
          const studentCount = cls._count.students;
          const capacity = cls.room?.capacity || 15;
          totalStudentsInClasses += studentCount;
          totalRoomCapacity += capacity;
          if (capacity > 0 && studentCount / capacity < 0.5) {
            lowFillClassesCount++;
          }
        });

        const averageFillRate =
          totalRoomCapacity > 0
            ? Math.round((totalStudentsInClasses / totalRoomCapacity) * 100)
            : 0;

        // Tính toán thông số giáo viên
        const teachersSummary = teachersData.map((t) => {
          const classesCount = t.classesAsTeacher.length;
          const totalStudents = t.classesAsTeacher.reduce(
            (sum, cl) => sum + cl._count.students,
            0
          );

          let pendingCount = 0;
          let overdueCount = 0;

          t.classesAsTeacher.forEach((cl) => {
            cl.homeworks.forEach((hw) => {
              hw.submissions.forEach((sub) => {
                pendingCount++;
                if (sub.submittedAt && new Date(sub.submittedAt) <= twoDaysAgo) {
                  overdueCount++;
                }
              });
            });
          });

          return {
            id: t.userId,
            name: t.fullName || t.email?.split("@")[0] || "Giáo viên",
            email: t.email,
            avatarUrl: t.avatarUrl,
            activeClassesCount: classesCount,
            totalStudents,
            pendingGrading: pendingCount,
            overdueGrading: overdueCount,
          };
        });

        const conversionRate =
          newLeadsCount > 0
            ? Math.round((enrolledLeadsCount / newLeadsCount) * 100)
            : 0;

        return reply.send({
          success: true,
          data: {
            kpis: {
              activeStudents: activeStudentsCount,
              newLeads: newLeadsCount,
              activeClasses: activeClasses.length,
              averageFillRate,
            },
            actionItems: [
              {
                key: "at_risk_students",
                label: "Học viên có nguy cơ bỏ học (Vắng ≥ 2 buổi gần đây)",
                count: atRiskStudentsCount,
                severity: "HIGH",
                link: "/admin/users?role=student&status=at-risk",
              },
              {
                key: "overdue_interventions",
                label: "Can thiệp học vụ đến hạn/quá hạn follow-up",
                count: overdueInterventionsCount,
                severity: "HIGH",
                link: "/admin/users?role=student&tab=interventions&filter=due",
              },
              {
                key: "due_suspensions",
                label: "Học viên bảo lưu sắp đến/quá hạn quay lại học",
                count: dueSuspensionsCount,
                severity: "HIGH",
                link: "/admin/users?role=student&status=suspended",
              },
              {
                key: "unassigned_leads",
                label: "Lead chưa phân bổ người phụ trách tư vấn",
                count: unassignedLeadsCount,
                severity: "HIGH",
                link: "/admin/leads?owner=UNASSIGNED",
              },
              {
                key: "overdue_leads",
                label: "Lead mới chưa liên hệ quá 24h",
                count: overdueLeadsCount,
                severity: "HIGH",
                link: "/admin/leads?status=NEW",
              },
              {
                key: "low_fill_classes",
                label: "Lớp học có sĩ số thấp (< 50% sức chứa phòng)",
                count: lowFillClassesCount,
                severity: "MEDIUM",
                link: "/admin/classes?filter=low-fill",
              },
              {
                key: "overdue_grading",
                label: "Bài nộp chờ chấm quá hạn 48h (SLA vi phạm)",
                count: overdueGradingCount,
                severity: "MEDIUM",
                link: "/admin/teacher-workspace?tab=grading&filter=overdue",
              },
            ],
            funnel: {
              leads: {
                new: newLeadsCount,
                tested: placementTestsCount,
                enrolled: enrolledLeadsCount,
                conversionRate,
              },
              students: {
                active: activeStudentsCount,
                atRisk: atRiskStudentsCount,
                reserved: reservedStudentsCount,
              },
            },
            teachers: teachersSummary,
          },
        });
      } catch (err: any) {
        request.log.error(err, "Failed to compute admin dashboard summary");
        return reply.status(500).send({
          success: false,
          error: "Không thể tổng hợp báo cáo điều hành lúc này.",
        });
      }
    }
  );
}
