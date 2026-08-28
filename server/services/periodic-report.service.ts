import { PrismaClient } from "@prisma/client";

export interface PeriodicReportQuery {
  periodType: "MONTH" | "QUARTER" | "YEAR" | "CUSTOM";
  year?: number;
  month?: number;
  quarter?: number;
  startDate?: string | Date;
  endDate?: string | Date;
  branchId?: string;
}

export function calculateDateRange(params: {
  periodType: "MONTH" | "QUARTER" | "YEAR" | "CUSTOM";
  year?: number;
  month?: number;
  quarter?: number;
  startDate?: string | Date;
  endDate?: string | Date;
}) {
  const year = params.year || new Date().getFullYear();
  let startDate: Date;
  let endDate: Date;

  if (params.periodType === "CUSTOM" && params.startDate && params.endDate) {
    if (typeof params.startDate === "string" && !params.startDate.includes("T")) {
      startDate = new Date(`${params.startDate}T00:00:00+07:00`);
    } else {
      startDate = new Date(params.startDate);
    }

    if (typeof params.endDate === "string" && !params.endDate.includes("T")) {
      endDate = new Date(`${params.endDate}T23:59:59.999+07:00`);
    } else {
      const e = new Date(params.endDate);
      endDate = new Date(e.getTime());
      if (endDate.getHours() === 0 && endDate.getMinutes() === 0) {
        endDate.setHours(23, 59, 59, 999);
      }
    }
  } else if (params.periodType === "MONTH") {
    const m = params.month && params.month >= 1 && params.month <= 12 ? params.month : 1;
    const startMonthStr = String(m).padStart(2, "0");
    const nextMonth = new Date(Date.UTC(year, m, 1));
    const lastDay = new Date(nextMonth.getTime() - 1);
    const endDayStr = String(lastDay.getUTCDate()).padStart(2, "0");

    startDate = new Date(`${year}-${startMonthStr}-01T00:00:00+07:00`);
    endDate = new Date(`${year}-${startMonthStr}-${endDayStr}T23:59:59.999+07:00`);
  } else if (params.periodType === "QUARTER") {
    const q = params.quarter && params.quarter >= 1 && params.quarter <= 4 ? params.quarter : 1;
    const startMonth = (q - 1) * 3 + 1;
    const endMonth = q * 3;
    const lastDays = [31, 30, 30, 31];
    const endDay = lastDays[q - 1];

    startDate = new Date(`${year}-${String(startMonth).padStart(2, "0")}-01T00:00:00+07:00`);
    endDate = new Date(`${year}-${String(endMonth).padStart(2, "0")}-${String(endDay).padStart(2, "0")}T23:59:59.999+07:00`);
  } else {
    // YEAR
    startDate = new Date(`${year}-01-01T00:00:00+07:00`);
    endDate = new Date(`${year}-12-31T23:59:59.999+07:00`);
  }

  return { startDate, endDate };
}

/**
 * Safe execution helper for optional/subordinate data sections
 * Returns { data, isAvailable } to maintain data provenance without false 0s.
 */
async function safeOptionalQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T,
  label: string
): Promise<{ data: T; isAvailable: boolean }> {
  try {
    const data = await queryFn();
    return { data, isAvailable: true };
  } catch (err: any) {
    console.warn(`[PeriodicReportService] Optional query "${label}" failed:`, err?.message || err);
    return { data: fallback, isAvailable: false };
  }
}

export class PeriodicReportService {
  constructor(private prisma: PrismaClient) {}

  async generateReport(query: PeriodicReportQuery) {
    const { periodType = "YEAR", year = new Date().getFullYear(), month, quarter, startDate: customStart, endDate: customEnd, branchId = "ALL" } = query;
    const { startDate, endDate } = calculateDateRange({ periodType, year, month, quarter, startDate: customStart, endDate: customEnd });

    const hasBranchFilter = branchId && branchId !== "ALL" && branchId !== "all";
    const branchFilter = hasBranchFilter ? { branchId } : {};
    const leadBranchFilter = hasBranchFilter ? { preferredBranchId: branchId } : {};
    const studentClassWhere = hasBranchFilter ? { class: { branchId } } : {};
    const academicClassWhere = hasBranchFilter ? { class: { branchId } } : {};

    // Retrieve active branch name for header
    let branchName = "Toàn bộ hệ thống";
    if (hasBranchFilter) {
      const b = await this.prisma.branch.findUnique({ where: { id: branchId }, select: { name: true } });
      if (b) branchName = b.name;
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // CRITICAL PIPELINE (Must succeed; failure throws and marks report invalid)
    // ─────────────────────────────────────────────────────────────────────────────

    // 1. TUYỂN SINH (Admissions - Core Counts)
    const [newLeadsCount, placementTestsCount, enrolledLeadsCount] = await Promise.all([
      this.prisma.contactLead.count({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          ...leadBranchFilter,
        },
      }),
      this.prisma.assessmentSession.count({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          ...(hasBranchFilter ? { branchId } : {}),
        },
      }),
      this.prisma.contactLead.count({
        where: {
          OR: [
            { convertedAt: { gte: startDate, lte: endDate } },
            {
              convertedAt: null,
              status: "ENROLLED",
              updatedAt: { gte: startDate, lte: endDate },
            },
          ],
          ...leadBranchFilter,
        },
      }),
    ]);

    const leadConversionRate = newLeadsCount > 0
      ? Number(((enrolledLeadsCount / newLeadsCount) * 100).toFixed(1))
      : 0;

    // 2. LỚP HỌC (Classes - Core Lifecycle & Size)
    // Q6 fix: Match both CLOSED and COMPLETED, checking closedAt, endDate and updatedAt
    const [openedClassesCount, completedClassesCount, runningClassesCount, classesForSize] = await Promise.all([
      this.prisma.class.count({
        where: {
          startDate: { gte: startDate, lte: endDate },
          ...branchFilter,
        },
      }),
      this.prisma.class.count({
        where: {
          OR: [
            { closedAt: { gte: startDate, lte: endDate } },
            { endDate: { gte: startDate, lte: endDate }, status: { in: ["CLOSED", "COMPLETED"] } },
            { status: { in: ["CLOSED", "COMPLETED"] }, updatedAt: { gte: startDate, lte: endDate } },
          ],
          ...branchFilter,
        },
      }),
      this.prisma.class.count({
        where: {
          isActive: true,
          createdAt: { lte: endDate },
          ...branchFilter,
        },
      }),
      this.prisma.class.findMany({
        where: {
          createdAt: { lte: endDate },
          OR: [
            { closedAt: null },
            { closedAt: { gte: startDate } },
          ],
          ...branchFilter,
        },
        select: {
          _count: {
            select: {
              students: { where: { deletedAt: null } },
            },
          },
        },
      }),
    ]);

    const totalStudentsInClasses = classesForSize.reduce((acc, c) => acc + (c._count?.students || 0), 0);
    const avgClassSize = classesForSize.length > 0
      ? Number((totalStudentsInClasses / classesForSize.length).toFixed(1))
      : 0;

    // 3. HỌC VIÊN (Students Lifecycle - Core Metrics)
    const [newEnrollmentsCount, activeStudentsCount, graduatedStudentsCount, reservedStudentsCount] = await Promise.all([
      this.prisma.classStudent.count({
        where: {
          joinedAt: { gte: startDate, lte: endDate },
          ...studentClassWhere,
        },
      }),
      this.prisma.classStudent.count({
        where: {
          status: "ACTIVE",
          deletedAt: null,
          joinedAt: { lte: endDate },
          ...studentClassWhere,
        },
      }),
      this.prisma.classStudent.count({
        where: {
          OR: [
            { completedAt: { gte: startDate, lte: endDate } },
            { status: "COMPLETED", joinedAt: { lte: endDate } },
          ],
          ...studentClassWhere,
        },
      }),
      this.prisma.classStudent.count({
        where: {
          status: "SUSPENDED",
          deletedAt: null,
          ...studentClassWhere,
        },
      }),
    ]);

    // 4. GIÁO VIÊN (Teachers - Lifecycle in Period)
    const teacherBaseFilter = { roles: { some: { role: "teacher" as const } } };
    const [startTeachers, newTeachers, resignedTeachers, endTeachers] = await Promise.all([
      this.prisma.user.count({
        where: {
          ...teacherBaseFilter,
          OR: [
            { joinedAt: { lt: startDate } },
            { joinedAt: null, createdAt: { lt: startDate } },
          ],
          AND: [
            {
              OR: [
                { resignedAt: null },
                { resignedAt: { gte: startDate } },
              ],
            },
          ],
        },
      }),
      this.prisma.user.count({
        where: {
          ...teacherBaseFilter,
          OR: [
            { joinedAt: { gte: startDate, lte: endDate } },
            { joinedAt: null, createdAt: { gte: startDate, lte: endDate } },
          ],
        },
      }),
      this.prisma.user.count({
        where: {
          ...teacherBaseFilter,
          resignedAt: { gte: startDate, lte: endDate },
        },
      }),
      this.prisma.user.count({
        where: {
          ...teacherBaseFilter,
          OR: [
            { joinedAt: { lte: endDate } },
            { joinedAt: null, createdAt: { lte: endDate } },
          ],
          AND: [
            {
              OR: [
                { resignedAt: null },
                { resignedAt: { gt: endDate } },
              ],
            },
          ],
        },
      }),
    ]);

    // 5. HOẠT ĐỘNG HỌC THUẬT (Academic Activity - Core Counts)
    const [totalSessionsCount, attendanceRecords, homeworksAssignedCount, homeworksSubmittedCount] = await Promise.all([
      this.prisma.classSession.count({
        where: {
          plannedDate: { gte: startDate, lte: endDate },
          status: { not: "CANCELLED" },
          ...academicClassWhere,
        },
      }),
      this.prisma.classAttendance.findMany({
        where: {
          sessionDate: { gte: startDate, lte: endDate },
          ...academicClassWhere,
        },
        select: {
          status: true,
        },
      }),
      this.prisma.exam.count({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          isPublished: true,
          isActive: true,
        },
      }),
      this.prisma.examSubmission.count({
        where: {
          submittedAt: { gte: startDate, lte: endDate },
          status: { in: ["SUBMITTED", "GRADED"] },
        },
      }),
    ]);

    const totalAttendanceCount = attendanceRecords.length;
    const presentAttendanceCount = attendanceRecords.filter(
      (r) => r.status === "PRESENT" || r.status === "EXCUSED"
    ).length;
    const attendanceRate = totalAttendanceCount > 0
      ? Number(((presentAttendanceCount / totalAttendanceCount) * 100).toFixed(1))
      : 0;

    const submissionRate = homeworksAssignedCount > 0 && totalStudentsInClasses > 0
      ? Number(((homeworksSubmittedCount / Math.max(1, homeworksAssignedCount * (totalStudentsInClasses / Math.max(1, classesForSize.length)))) * 100).toFixed(1))
      : homeworksSubmittedCount > 0 ? 100 : 0;

    // ─────────────────────────────────────────────────────────────────────────────
    // DEGRADED / OPTIONAL PIPELINE (Isolated with provenance tracking)
    // ─────────────────────────────────────────────────────────────────────────────

    // Optional 1: Dropped Students (Soft-delete deletedAt and status DROPPED)
    const droppedStudentsQueryResult = await safeOptionalQuery(
      () =>
        this.prisma.classStudent.count({
          where: {
            OR: [
              { deletedAt: { gte: startDate, lte: endDate } },
              { status: "DROPPED", deletedAt: { not: null } },
            ],
            ...studentClassWhere,
          },
        }),
      null,
      "droppedStudentsCount"
    );

    // Optional 2: Lead breakdown by source
    const rawLeadsBySourceResult = await safeOptionalQuery(
      () =>
        this.prisma.contactLead.findMany({
          where: {
            createdAt: { gte: startDate, lte: endDate },
            ...leadBranchFilter,
          },
          select: {
            source: true,
            status: true,
            convertedUserId: true,
          },
        }),
      [],
      "rawLeadsBySource"
    );

    const sourceMap = new Map<string, { leads: number; enrolled: number }>();
    (rawLeadsBySourceResult.data || []).forEach((item) => {
      const src = item.source || "Khác";
      const curr = sourceMap.get(src) || { leads: 0, enrolled: 0 };
      curr.leads += 1;
      if (item.status === "ENROLLED" || item.convertedUserId) {
        curr.enrolled += 1;
      }
      sourceMap.set(src, curr);
    });

    const bySource = Array.from(sourceMap.entries()).map(([source, data]) => ({
      source,
      leads: data.leads,
      enrolled: data.enrolled,
      conversionRate: data.leads > 0 ? Number(((data.enrolled / data.leads) * 100).toFixed(1)) : 0,
    })).sort((a, b) => b.leads - a.leads);

    // Optional 3: Branches room capacity & fill rate breakdown
    const branchesDataResult = await safeOptionalQuery(
      () =>
        this.prisma.branch.findMany({
          where: { isActive: true },
          select: {
            id: true,
            code: true,
            name: true,
            address: true,
            rooms: {
              where: { isActive: true },
              select: { id: true, name: true, capacity: true },
            },
            classes: {
              where: {
                createdAt: { lte: endDate },
                OR: [{ closedAt: null }, { closedAt: { gte: startDate } }],
              },
              select: {
                id: true,
                _count: {
                  select: {
                    students: { where: { deletedAt: null } },
                  },
                },
              },
            },
          },
        }),
      [],
      "branchesBreakdown"
    );

    const branchesBreakdown = (branchesDataResult.data || []).map((b) => {
      const branchClassesCount = b.classes.length;
      const branchStudentsCount = b.classes.reduce((acc, c) => acc + (c._count?.students || 0), 0);
      const totalRoomCapacity = b.rooms.reduce((acc, r) => acc + r.capacity, 0);
      const fillRate = totalRoomCapacity > 0
        ? Number(((branchStudentsCount / totalRoomCapacity) * 100).toFixed(1))
        : 0;

      return {
        id: b.id,
        code: b.code,
        name: b.name,
        roomsCount: b.rooms.length,
        classesCount: branchClassesCount,
        studentsCount: branchStudentsCount,
        fillRate,
      };
    });

    // ─────────────────────────────────────────────────────────────────────────────
    // EXECUTIVE SUMMARY FORMATTING
    // ─────────────────────────────────────────────────────────────────────────────
    const periodLabel = periodType === "CUSTOM"
      ? `GIAI ĐOẠN ${startDate.toLocaleDateString("vi-VN")} – ${endDate.toLocaleDateString("vi-VN")}`
      : periodType === "YEAR"
      ? `NĂM ${year}`
      : periodType === "QUARTER"
      ? `QUÝ ${quarter}/${year}`
      : `THÁNG ${month}/${year}`;

    const droppedStudentsDisplay = droppedStudentsQueryResult.isAvailable
      ? `${droppedStudentsQueryResult.data} học viên`
      : "Chưa có dữ liệu";

    const summaryText = `BÁO CÁO TỔNG KẾT KẾT QUẢ HOẠT ĐỘNG ${periodLabel}
Phạm vi: ${branchName}
Khoảng thời gian: ${startDate.toLocaleDateString("vi-VN")} – ${endDate.toLocaleDateString("vi-VN")}

1. Quy mô & Đào tạo:
- Số lớp mở mới: ${openedClassesCount} lớp. Lớp hoàn thành/đóng: ${completedClassesCount} lớp. Số lớp đang vận hành cuối kỳ: ${runningClassesCount} lớp.
- Sĩ số lớp trung bình: ${avgClassSize} học viên/lớp.
- Tổng lượt học viên đăng ký mới: ${newEnrollmentsCount} học viên. Học viên hoàn thành khóa: ${graduatedStudentsCount} học viên. Học viên đang học cuối kỳ: ${activeStudentsCount} học viên. Học viên bảo lưu: ${reservedStudentsCount} học viên. Học viên thôi học: ${droppedStudentsDisplay}.

2. Tuyển sinh & Phát triển:
- Tiếp nhận tổng cộng ${newLeadsCount} khách hàng tiềm năng; tổ chức ${placementTestsCount} lượt khảo thí chẩn đoán đầu vào.
- Số học viên chốt đăng ký thành công: ${enrolledLeadsCount} học viên (Tỷ lệ chuyển đổi đạt ${leadConversionRate}%).
${bySource.length > 0 ? `- Nguồn tiếp cận chính: ${bySource.slice(0, 3).map((s) => `${s.source} (${s.leads} leads, ${s.enrolled} chốt)`).join("; ")}.` : ""}

3. Đội ngũ Giảng viên:
- Đầu kỳ: ${startTeachers} giáo viên. Tuyển mới trong kỳ: ${newTeachers} giáo viên. Nghỉ/ngừng dạy: ${resignedTeachers} giáo viên.
- Tổng số giáo viên đang hoạt động cuối kỳ: ${endTeachers} giáo viên.

4. Hoạt động Học thuật:
- Tổ chức ${totalSessionsCount} buổi học; tổng lượt điểm danh: ${totalAttendanceCount} lượt.
- Tỷ lệ chuyên cần bình quân đạt ${attendanceRate}%.
- Tổng số bài tập giao: ${homeworksAssignedCount} bài; bài nộp hoàn thành: ${homeworksSubmittedCount} bài (Tỷ lệ nộp bài đạt ${submissionRate}%).
`;

    return {
      period: {
        type: periodType,
        year,
        month: month || null,
        quarter: quarter || null,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        branchId,
        branchName,
        periodLabel,
      },
      summaryText,
      admissions: {
        newLeads: newLeadsCount,
        placementTests: placementTestsCount,
        enrolled: enrolledLeadsCount,
        conversionRate: leadConversionRate,
        bySource,
      },
      classes: {
        opened: openedClassesCount,
        completed: completedClassesCount,
        runningAtEnd: runningClassesCount,
        avgClassSize,
      },
      students: {
        newEnrollments: newEnrollmentsCount,
        activeAtEnd: activeStudentsCount,
        graduated: graduatedStudentsCount,
        reserved: reservedStudentsCount,
        dropped: droppedStudentsQueryResult.data,
        isDroppedAvailable: droppedStudentsQueryResult.isAvailable,
      },
      teachers: {
        startOfPeriod: startTeachers,
        newlyRecruited: newTeachers,
        resigned: resignedTeachers,
        endOfPeriod: endTeachers,
      },
      academic: {
        totalSessions: totalSessionsCount,
        totalAttendances: totalAttendanceCount,
        attendanceRate,
        homeworkAssigned: homeworksAssignedCount,
        homeworkSubmitted: homeworksSubmittedCount,
        submissionRate,
      },
      branches: branchesBreakdown,
    };
  }
}
