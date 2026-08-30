import { describe, it, expect } from "vitest";
import {
  getHuanCoState,
  getMascotPresentation,
  resolveMascotEvent,
  getRealmFromBand,
  ActionQueueItem,
} from "../huanCoState";

describe("HUYEN CO LAO NHAN V2: Lean Companion Architecture Tests", () => {
  it("Invariant 1: Event Priority - LEVEL_UP takes highest precedence over OVERDUE", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-1",
        examId: "exam-reading-01",
        title: "Reading Unit 1",
        status: "OVERDUE",
        priority: 2,
      },
    ];

    const result = getMascotPresentation({
      actionQueue,
      currentBand: 6.0,
      recentTrigger: {
        type: "LEVEL_UP",
        xpEarned: 200,
      },
    });

    expect(result.state).toBe("CELEBRATE");
    expect(result.eventType).toBe("LEVEL_UP");
    expect(result.visualLevel).toBe("ceremony");
    expect(result.badgeText).toBe("Đột Phá Cảnh Giới");
    expect(result.quote).toContain("Học Giả");
    expect(result.reward?.xp).toBe(200);
  });

  it("Invariant 2: PERSONAL_BEST & SUBMISSION_SUCCESS - celebration instead of nagging", () => {
    const result = getMascotPresentation({
      actionQueue: [],
      recentTrigger: {
        type: "PERSONAL_BEST",
        score: "Reading 8.0",
        xpEarned: 100,
      },
    });

    expect(result.state).toBe("CELEBRATE");
    expect(result.eventType).toBe("PERSONAL_BEST");
    expect(result.visualLevel).toBe("celebration");
    expect(result.badgeText).toBe("Kỷ Lục Mới");
    expect(result.quote).toContain("vượt qua kỷ lục của chính mình");
    expect(result.reward?.xp).toBe(100);
  });

  it("Invariant 3: REVISION_REQUIRED (MENTOR) - Supportive teacher tone, no shaming", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-2",
        examId: "exam-writing-01",
        title: "Writing Task 2",
        status: "REVISION_REQUIRED",
        priority: 1,
        submission: { id: "sub-999" },
      },
    ];

    const result = getHuanCoState({
      actionQueue,
      submittedCount: 1,
      gradedCount: 1,
    });

    expect(result.state).toBe("MENTOR");
    expect(result.eventType).toBe("REVISION_REQUIRED");
    expect(result.urgency).toBe("ORANGE");
    expect(result.badgeText).toBe("Cần Mài Giũa");
    expect(result.quote).toContain("mài giũa");
    expect(result.quote).not.toContain("nợ");
    expect(result.ctaLabel).toBe("Sửa bài: Writing Task 2");
    expect(result.ctaPath).toBe("/app/submissions/sub-999");
  });

  it("Invariant 4: OVERDUE (ALERT) - Non-toxic companion tone ('Xử lý nhiệm vụ', not 'Làm bù bài nợ')", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-1",
        examId: "exam-reading-01",
        title: "Reading Unit 1",
        status: "OVERDUE",
        priority: 2,
      },
      {
        id: "hw-2",
        examId: "exam-writing-01",
        title: "Writing Task 2",
        status: "OVERDUE",
        priority: 2,
      },
    ];

    const result = getHuanCoState({
      actionQueue,
      submittedCount: 2,
      gradedCount: 1,
    });

    expect(result.state).toBe("ALERT");
    expect(result.eventType).toBe("OVERDUE");
    expect(result.urgency).toBe("RED");
    expect(result.badgeText).toBe("Cần Xử Lý");
    expect(result.visualLevel).toBe("concerned");
    expect(result.quote).toContain("Đừng lo, chúng ta giải quyết từng bài một là ổn ngay");
    expect(result.quote).not.toContain("đang nợ");
    expect(result.quote).not.toContain("Đừng nhìn ta");
    expect(result.ctaLabel).toBe("Xử lý nhiệm vụ: Reading Unit 1");
    expect(result.ctaPath).toBe("/exam/exam-reading-01");
  });

  it("Invariant 5: GUIDE - Guides student clearly to next assignment", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-4",
        examId: "exam-vocab-01",
        title: "Vocab Unit 3",
        status: "UPCOMING",
        priority: 4,
      },
    ];

    const result = getHuanCoState({
      actionQueue,
      submittedCount: 1,
      gradedCount: 1,
    });

    expect(result.state).toBe("GUIDE");
    expect(result.eventType).toBe("GUIDE");
    expect(result.urgency).toBe("BLUE");
    expect(result.badgeText).toBe("Nhiệm Vụ Mới");
    expect(result.ctaLabel).toBe("Làm bài: Vocab Unit 3");
    expect(result.ctaPath).toBe("/exam/exam-vocab-01");
  });

  it("Invariant 6: WELCOME & IDLE - Peaceful ambient states when no tasks remain", () => {
    const welcomeResult = getHuanCoState({
      actionQueue: [],
      submittedCount: 4,
      gradedCount: 2,
    });

    expect(welcomeResult.state).toBe("WELCOME");
    expect(welcomeResult.visualLevel).toBe("ambient");
    expect(welcomeResult.badgeText).toBe("Tiến Triển Tốt");

    const idleResult = getHuanCoState({
      actionQueue: [],
      submittedCount: 0,
      gradedCount: 0,
    });

    expect(idleResult.state).toBe("IDLE");
    expect(idleResult.visualLevel).toBe("ambient");
    expect(idleResult.badgeText).toBe("Đang Thảnh Thơi");
  });

  it("Narrative Realm mapping reflects Band correctly according to canonical ARIS-7", () => {
    expect(getRealmFromBand(3.5)).toEqual({ academicRank: "Học Đồ", realmName: "Đỉnh phong (Apex)" });
    expect(getRealmFromBand(4.0)).toEqual({ academicRank: "Học Sĩ", realmName: "Sơ kỳ (Phase I)" });
    expect(getRealmFromBand(5.5)).toEqual({ academicRank: "Học Sư", realmName: "Đỉnh phong (Apex)" });
    expect(getRealmFromBand(6.0)).toEqual({ academicRank: "Học Giả", realmName: "Sơ kỳ (Phase I)" });
    expect(getRealmFromBand(7.0)).toEqual({ academicRank: "Học Bá", realmName: "Sơ kỳ (Phase I)" });
    expect(getRealmFromBand(8.5)).toEqual({ academicRank: "Học Tôn", realmName: "Đỉnh phong (Apex)" });
    expect(getRealmFromBand(9.0)).toEqual({ academicRank: "Học Đế", realmName: "Đỉnh cao Học thuật" });
  });
});

