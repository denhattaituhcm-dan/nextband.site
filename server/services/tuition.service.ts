import { PrismaClient, PaymentStatus } from "@prisma/client";

export interface UpdateClassStudentTuitionInput {
  tuitionFee?: number;
  paidAmount?: number;
  paymentStatus?: PaymentStatus;
  paymentNote?: string | null;
  externalRef?: string | null;
}

export class TuitionService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Tổng hợp báo cáo học phí vận hành & danh sách công nợ
   */
  async getTuitionSummary(branchId?: string) {
    const hasBranchFilter = branchId && branchId !== "ALL" && branchId !== "all";
    const classBranchFilter = hasBranchFilter ? { branchId } : {};

    // 1. Lấy tất cả enrollment của các lớp đang hoạt động
    const activeClassStudents = await this.prisma.classStudent.findMany({
      where: {
        deletedAt: null,
        class: {
          isActive: true,
          ...classBranchFilter,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            userId: true,
            fullName: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            branchId: true,
            branch: { select: { id: true, name: true, code: true } },
            course: { select: { id: true, title: true, price: true } },
            teacher: { select: { id: true, fullName: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    let totalExpectedTuition = 0;
    let totalCollectedTuition = 0;
    let totalOutstandingTuition = 0;
    let fullyPaidCount = 0;
    let partialPaidCount = 0;
    let unpaidCount = 0;

    const outstandingReceivables: any[] = [];
    const classFinancialMap = new Map<string, any>();

    activeClassStudents.forEach((cs) => {
      const standardFee = Number(cs.class?.course?.price || 0);
      const tuitionFee = cs.tuitionFee !== null && Number(cs.tuitionFee) > 0 ? Number(cs.tuitionFee) : standardFee;
      const paidAmount = Number(cs.paidAmount || 0);
      const outstanding = Math.max(0, tuitionFee - paidAmount);

      totalExpectedTuition += tuitionFee;
      totalCollectedTuition += paidAmount;
      totalOutstandingTuition += outstanding;

      const status = cs.paymentStatus || (paidAmount >= tuitionFee && tuitionFee > 0 ? "PAID" : paidAmount > 0 ? "PARTIAL" : "UNPAID");

      if (status === "PAID" || (tuitionFee > 0 && paidAmount >= tuitionFee)) {
        fullyPaidCount++;
      } else if (status === "PARTIAL" || paidAmount > 0) {
        partialPaidCount++;
      } else {
        unpaidCount++;
      }

      // Danh sách cần thu / còn nợ
      if (status === "UNPAID" || status === "PARTIAL" || outstanding > 0) {
        outstandingReceivables.push({
          id: cs.id,
          studentId: cs.studentId,
          studentName: cs.student?.fullName || cs.student?.email || "Học viên",
          studentEmail: cs.student?.email,
          studentPhone: cs.student?.phone,
          avatarUrl: cs.student?.avatarUrl,
          classId: cs.classId,
          className: cs.class?.name || "Lớp học",
          courseTitle: cs.class?.course?.title || "Khóa học",
          branchName: cs.class?.branch?.name || null,
          tuitionFee,
          paidAmount,
          outstandingAmount: outstanding,
          paymentStatus: status,
          paymentNote: cs.paymentNote,
          externalRef: cs.externalRef,
          joinedAt: cs.joinedAt,
        });
      }

      // Tổng hợp theo lớp
      const clId = cs.classId;
      if (!classFinancialMap.has(clId)) {
        classFinancialMap.set(clId, {
          classId: clId,
          className: cs.class?.name || "Lớp học",
          courseTitle: cs.class?.course?.title || "Khóa học",
          teacherName: cs.class?.teacher?.fullName || "Chưa phân công",
          branchName: cs.class?.branch?.name || null,
          totalStudents: 0,
          totalExpected: 0,
          totalCollected: 0,
          totalOutstanding: 0,
          paidStudentsCount: 0,
          unpaidStudentsCount: 0,
        });
      }

      const clSummary = classFinancialMap.get(clId);
      clSummary.totalStudents += 1;
      clSummary.totalExpected += tuitionFee;
      clSummary.totalCollected += paidAmount;
      clSummary.totalOutstanding += outstanding;
      if (outstanding === 0 && tuitionFee > 0) {
        clSummary.paidStudentsCount += 1;
      } else {
        clSummary.unpaidStudentsCount += 1;
      }
    });

    const classBreakdown = Array.from(classFinancialMap.values()).map((c) => ({
      ...c,
      collectionRate: c.totalExpected > 0 ? Math.round((c.totalCollected / c.totalExpected) * 100) : 100,
    }));

    return {
      kpis: {
        totalExpectedTuition,
        totalCollectedTuition,
        totalOutstandingTuition,
        totalStudentsCount: activeClassStudents.length,
        fullyPaidCount,
        partialPaidCount,
        unpaidCount,
        collectionRate: totalExpectedTuition > 0 ? Math.round((totalCollectedTuition / totalExpectedTuition) * 100) : 100,
      },
      outstandingReceivables,
      classBreakdown,
    };
  }

  /**
   * Cập nhật thông tin học phí của 1 học viên trong lớp
   */
  async updateStudentTuition(classStudentId: string, input: UpdateClassStudentTuitionInput) {
    const existing = await this.prisma.classStudent.findUnique({
      where: { id: classStudentId },
    });

    if (!existing) {
      throw new Error("Không tìm thấy thông tin ghi danh lớp học");
    }

    const data: any = {};
    if (input.tuitionFee !== undefined) data.tuitionFee = input.tuitionFee;
    if (input.paidAmount !== undefined) data.paidAmount = input.paidAmount;
    if (input.paymentStatus !== undefined) data.paymentStatus = input.paymentStatus;
    if (input.paymentNote !== undefined) data.paymentNote = input.paymentNote;
    if (input.externalRef !== undefined) data.externalRef = input.externalRef;

    // Tự động tính toán status nếu không truyền explicitly
    if (input.paymentStatus === undefined && (input.tuitionFee !== undefined || input.paidAmount !== undefined)) {
      const fee = input.tuitionFee !== undefined ? Number(input.tuitionFee) : Number(existing.tuitionFee || 0);
      const paid = input.paidAmount !== undefined ? Number(input.paidAmount) : Number(existing.paidAmount || 0);

      if (fee > 0 && paid >= fee) {
        data.paymentStatus = PaymentStatus.PAID;
      } else if (paid > 0) {
        data.paymentStatus = PaymentStatus.PARTIAL;
      } else {
        data.paymentStatus = PaymentStatus.UNPAID;
      }
    }

    const updated = await this.prisma.classStudent.update({
      where: { id: classStudentId },
      data,
      include: {
        student: { select: { id: true, userId: true, fullName: true, email: true } },
        class: { select: { id: true, name: true } },
      },
    });

    return updated;
  }
}
