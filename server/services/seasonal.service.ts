import { PrismaClient } from "@prisma/client";

export interface SeasonalUIConfig {
  showBlossom: boolean;
  showEnvelopes: boolean;
  showModal: boolean;
  showPetals: boolean;
  playChime: boolean;
  bannerTitle?: string;
  bannerSubtitle?: string;
}

export const DEFAULT_TET_UI_CONFIG: SeasonalUIConfig = {
  showBlossom: true,
  showEnvelopes: true,
  showModal: true,
  showPetals: false, // Default off for smooth performance
  playChime: true,
  bannerTitle: "Khai Bút Đầu Xuân — Mở Lộc Tri Thức",
  bannerSubtitle: "Hoàn thành bài tập đạt chuẩn để khai bút đầu năm và hái lộc may mắn!",
};

export class SeasonalService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Seed default Vietnamese Seasonal Events if none exist
   */
  async ensureDefaultEvents() {
    const defaultEvents = [
      {
        code: "TET_2027",
        name: "Tết Nguyên Đán 2027",
        type: "TET",
        isActive: false,
        startAt: new Date("2027-01-25"),
        endAt: new Date("2027-02-15"),
        budgetCap: 800000,
        totalSlots: 60,
        uiConfig: DEFAULT_TET_UI_CONFIG as any,
        pools: [
          { tier: "SMALL", amount: 5000, totalSlots: 40, order: 1 },
          { tier: "MEDIUM", amount: 10000, totalSlots: 15, order: 2 },
          { tier: "LARGE", amount: 25000, totalSlots: 4, order: 3 },
          { tier: "SPECIAL", amount: 100000, totalSlots: 1, order: 4 },
        ],
      },
      {
        code: "BACK_TO_SCHOOL",
        name: "Khai Giảng — Khởi Hành Năm Học",
        type: "BACK_TO_SCHOOL",
        isActive: false,
        startAt: new Date("2026-08-15"),
        endAt: new Date("2026-09-15"),
        budgetCap: 500000,
        totalSlots: 50,
        uiConfig: {
          showBlossom: false,
          showEnvelopes: true,
          showModal: true,
          showPetals: false,
          playChime: true,
          bannerTitle: "Khởi Hành Năm Học — Bứt Phá Band",
          bannerSubtitle: "Thiết lập kỷ luật ngay từ ngày đầu tựu trường để bứt phá band điểm IELTS!",
        } as any,
        pools: [
          { tier: "SMALL", amount: 5000, totalSlots: 30, order: 1 },
          { tier: "MEDIUM", amount: 10000, totalSlots: 15, order: 2 },
          { tier: "LARGE", amount: 20000, totalSlots: 5, order: 3 },
        ],
      },
      {
        code: "TEACHERS_DAY",
        name: "20/11 — Một Lời Tri Ân",
        type: "TEACHERS_DAY",
        isActive: false,
        startAt: new Date("2026-11-01"),
        endAt: new Date("2026-11-25"),
        budgetCap: 500000,
        totalSlots: 50,
        uiConfig: {
          showBlossom: false,
          showEnvelopes: true,
          showModal: true,
          showPetals: false,
          playChime: true,
          bannerTitle: "Một Lời Tri Ân — Một Bước Trưởng Thành",
          bannerSubtitle: "Điều em học được hôm nay sẽ trở thành điều em có thể dạy lại ngày mai.",
        } as any,
        pools: [
          { tier: "SMALL", amount: 5000, totalSlots: 35, order: 1 },
          { tier: "MEDIUM", amount: 10000, totalSlots: 12, order: 2 },
          { tier: "LARGE", amount: 25000, totalSlots: 3, order: 3 },
        ],
      },
      {
        code: "MID_AUTUMN",
        name: "Tết Trung Thu — Đêm Trăng Học Tập",
        type: "MID_AUTUMN",
        isActive: false,
        startAt: new Date("2026-09-20"),
        endAt: new Date("2026-10-05"),
        budgetCap: 400000,
        totalSlots: 40,
        uiConfig: {
          showBlossom: false,
          showEnvelopes: true,
          showModal: true,
          showPetals: false,
          playChime: true,
          bannerTitle: "Đêm Trăng Học Tập — Vượt Chặng Đèn Lồng",
          bannerSubtitle: "Cùng ARIS thắp sáng ước mơ IELTS dưới ánh trăng rằm tháng 8.",
        } as any,
        pools: [
          { tier: "SMALL", amount: 5000, totalSlots: 25, order: 1 },
          { tier: "MEDIUM", amount: 10000, totalSlots: 12, order: 2 },
          { tier: "LARGE", amount: 20000, totalSlots: 3, order: 3 },
        ],
      },
    ];

    for (const evt of defaultEvents) {
      const existing = await this.prisma.seasonalEvent.findUnique({
        where: { code: evt.code },
      });
      if (!existing) {
        await this.prisma.seasonalEvent.create({
          data: {
            code: evt.code,
            name: evt.name,
            type: evt.type,
            isActive: evt.isActive,
            startAt: evt.startAt,
            endAt: evt.endAt,
            budgetCap: evt.budgetCap,
            totalSlots: evt.totalSlots,
            uiConfig: evt.uiConfig,
            rewardPool: {
              create: evt.pools,
            },
          },
        });
      }
    }
  }

  /**
   * Get the current active seasonal event
   */
  async getActiveEvent() {
    await this.ensureDefaultEvents();

    const event = await this.prisma.seasonalEvent.findFirst({
      where: { isActive: true },
      include: {
        rewardPool: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { claims: true },
        },
      },
    });

    if (!event) return null;

    let totalSlots = 0;
    let claimedSlots = 0;
    let totalCashBudget = 0;
    let spentCashBudget = 0;

    for (const pool of event.rewardPool) {
      totalSlots += pool.totalSlots;
      claimedSlots += pool.claimedSlots;
      totalCashBudget += pool.amount * pool.totalSlots;
      spentCashBudget += pool.amount * pool.claimedSlots;
    }

    return {
      id: event.id,
      code: event.code,
      name: event.name,
      type: event.type,
      isActive: event.isActive,
      startAt: event.startAt,
      endAt: event.endAt,
      budgetCap: event.budgetCap,
      totalSlots,
      claimedSlots,
      remainingSlots: Math.max(0, totalSlots - claimedSlots),
      totalCashBudget,
      spentCashBudget,
      remainingCashBudget: Math.max(0, totalCashBudget - spentCashBudget),
      uiConfig: (event.uiConfig as unknown as SeasonalUIConfig) || DEFAULT_TET_UI_CONFIG,
    };
  }

  /**
   * Get student's progress for the active seasonal event
   */
  async getStudentProgress(studentId: string, eventId?: string) {
    let targetEventId = eventId;
    if (!targetEventId) {
      const active = await this.getActiveEvent();
      if (!active) {
        return {
          claimedExamIds: [],
          totalCashEarned: 0,
          totalHonorXp: 0,
          claimsCount: 0,
          history: [],
        };
      }
      targetEventId = active.id;
    }

    const claims = await this.prisma.seasonalRewardClaim.findMany({
      where: {
        eventId: targetEventId,
        studentId,
      },
      orderBy: { claimedAt: "asc" },
    });

    let totalCashEarned = 0;
    let totalHonorXp = 0;
    const claimedExamIds: string[] = [];

    claims.forEach((claim) => {
      claimedExamIds.push(claim.homeworkId);
      if (claim.rewardType === "CASH") {
        totalCashEarned += claim.amount;
      } else if (claim.rewardType === "HONOR_XP") {
        totalHonorXp += claim.amount;
      }
    });

    return {
      claimedExamIds,
      totalCashEarned,
      totalHonorXp,
      claimsCount: claims.length,
      history: claims.map((c) => ({
        id: c.id,
        homeworkId: c.homeworkId,
        rewardType: c.rewardType,
        amount: c.amount,
        claimedAt: c.claimedAt,
      })),
    };
  }

  /**
   * Atomically claim a seasonal reward for a completed homework
   */
  async claimReward(studentId: string, homeworkId: string) {
    const activeEvent = await this.getActiveEvent();
    if (!activeEvent) {
      throw new Error("Không có sự kiện lễ/Tết nào đang kích hoạt");
    }

    // Run within interactive atomic transaction to avoid race conditions
    return await this.prisma.$transaction(async (tx) => {
      // 1. Check idempotency: unique (eventId, studentId, homeworkId)
      const existingClaim = await tx.seasonalRewardClaim.findUnique({
        where: {
          eventId_studentId_homeworkId: {
            eventId: activeEvent.id,
            studentId,
            homeworkId,
          },
        },
      });

      if (existingClaim) {
        return {
          isFirstClaim: false,
          claim: existingClaim,
          message: "Bài tập này đã được nhận lộc trước đó",
        };
      }

      // 2. Check academic quality gate (Student must have completed the exam)
      const submission = await tx.examSubmission.findFirst({
        where: {
          examId: homeworkId,
          studentId,
          status: { in: ["SUBMITTED", "GRADED"] },
        },
      });

      if (!submission) {
        throw new Error("Chưa hoàn thành bài tập hoặc bài nộp chưa đạt chuẩn để mở lộc");
      }

      // 3. Find available reward pool slot
      const availablePools = await tx.seasonalRewardPool.findMany({
        where: {
          eventId: activeEvent.id,
          claimedSlots: { lt: tx.seasonalRewardPool.fields.totalSlots },
        },
        orderBy: { order: "asc" },
      });

      let chosenPool = null;
      let rewardType = "CASH";
      let rewardAmount = 8888; // Default auspicious amount if custom

      if (availablePools.length > 0) {
        // Distribute from smallest available tier first or weighted
        chosenPool = availablePools[0];
        rewardAmount = chosenPool.amount;

        // Atomically increment claimed slots
        await tx.seasonalRewardPool.update({
          where: { id: chosenPool.id },
          data: { claimedSlots: { increment: 1 } },
        });
      } else {
        // Pool is exhausted -> Fallback to Honor Reward
        rewardType = "HONOR_XP";
        rewardAmount = 200; // 200 XP Khai Bút
      }

      // 4. Create Claim Record
      const newClaim = await tx.seasonalRewardClaim.create({
        data: {
          eventId: activeEvent.id,
          studentId,
          homeworkId,
          rewardType,
          amount: rewardAmount,
        },
      });

      // 5. Get updated student total
      const allStudentClaims = await tx.seasonalRewardClaim.findMany({
        where: { eventId: activeEvent.id, studentId },
      });

      const totalCash = allStudentClaims
        .filter((c) => c.rewardType === "CASH")
        .reduce((sum, c) => sum + c.amount, 0);

      const totalXp = allStudentClaims
        .filter((c) => c.rewardType === "HONOR_XP")
        .reduce((sum, c) => sum + c.amount, 0);

      return {
        isFirstClaim: true,
        claim: newClaim,
        rewardType,
        amount: rewardAmount,
        totalCashEarned: totalCash,
        totalHonorXp: totalXp,
        isPoolExhausted: availablePools.length === 0,
      };
    });
  }

  /**
   * Admin: Get all seasonal events with their management status
   */
  async getAdminEvents() {
    await this.ensureDefaultEvents();

    const events = await this.prisma.seasonalEvent.findMany({
      include: {
        rewardPool: { orderBy: { order: "asc" } },
        _count: { select: { claims: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return events.map((event) => {
      let totalSlots = 0;
      let claimedSlots = 0;
      let totalCashBudget = 0;
      let spentCashBudget = 0;

      for (const pool of event.rewardPool) {
        totalSlots += pool.totalSlots;
        claimedSlots += pool.claimedSlots;
        totalCashBudget += pool.amount * pool.totalSlots;
        spentCashBudget += pool.amount * pool.claimedSlots;
      }

      return {
        id: event.id,
        code: event.code,
        name: event.name,
        type: event.type,
        isActive: event.isActive,
        startAt: event.startAt,
        endAt: event.endAt,
        budgetCap: event.budgetCap,
        totalSlots,
        claimedSlots,
        remainingSlots: Math.max(0, totalSlots - claimedSlots),
        totalCashBudget,
        spentCashBudget,
        remainingCashBudget: Math.max(0, totalCashBudget - spentCashBudget),
        uiConfig: (event.uiConfig as unknown as SeasonalUIConfig) || DEFAULT_TET_UI_CONFIG,
        pools: event.rewardPool,
      };
    });
  }

  /**
   * Admin: Update seasonal event settings (toggle, dates, UI checkboxes, budget)
   */
  async updateEvent(
    id: string,
    data: {
      isActive?: boolean;
      startAt?: Date | string | null;
      endAt?: Date | string | null;
      budgetCap?: number;
      totalSlots?: number;
      uiConfig?: Partial<SeasonalUIConfig>;
    }
  ) {
    const existing = await this.prisma.seasonalEvent.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new Error("Không tìm thấy sự kiện");
    }

    // If activating this event, deactivate other events so only one is active at a time
    if (data.isActive) {
      await this.prisma.seasonalEvent.updateMany({
        where: { id: { not: id } },
        data: { isActive: false },
      });
    }

    const mergedUIConfig = {
      ...(existing.uiConfig as any || DEFAULT_TET_UI_CONFIG),
      ...(data.uiConfig || {}),
    };

    return await this.prisma.seasonalEvent.update({
      where: { id },
      data: {
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        ...(data.startAt !== undefined ? { startAt: data.startAt ? new Date(data.startAt) : null } : {}),
        ...(data.endAt !== undefined ? { endAt: data.endAt ? new Date(data.endAt) : null } : {}),
        ...(data.budgetCap !== undefined ? { budgetCap: data.budgetCap } : {}),
        ...(data.totalSlots !== undefined ? { totalSlots: data.totalSlots } : {}),
        uiConfig: mergedUIConfig,
      },
      include: {
        rewardPool: { orderBy: { order: "asc" } },
      },
    });
  }
}
