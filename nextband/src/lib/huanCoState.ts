import { ActionQueueItem } from "./homeworkStatusHelper";
import { routes } from "./routes";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HUYỀN CƠ DECISION ENGINE (V2)
 * ─────────────────────────────────────────────────────────────────────────────
 * Philosophy:
 * 1. Huyền Cơ không nói nhiều.
 * 2. Chỉ xuất hiện khi dữ liệu cho thấy lời nói có giá trị.
 * 3. Mỗi lần xuất hiện dẫn tới 1 hành động (Actionable) hoặc 1 nhận thức (Insight).
 * 4. Tách bạch hoàn toàn: Domain State (Tại sao xuất hiện) vs Presentation (Hiển thị thế nào).
 * 5. Tỷ lệ ngôn ngữ: 80% tự nhiên/sư phạm + 20% thần thoại/tiến hóa.
 */

// 15 Canonical Domain States categorized into 5 Strategic Groups
export type HuyenCoDomainState =
  // A. Navigation (Dẫn đường)
  | "WELCOME"
  | "NEXT_ACTION"
  | "COURSE_PROGRESS"
  | "FINISHING_STRETCH"
  | "ALL_CLEARED"
  // B. Learning Feedback (Phản hồi học thuật)
  | "REVISION_REQUIRED"
  | "REVISION_SUCCESS"
  | "SKILL_IMPROVEMENT"
  | "REPEATED_ERROR"
  | "MASTERY_SIGNAL"
  // C. Intervention (Can thiệp & Kỷ luật)
  | "OVERLOAD"
  | "OVERDUE"
  | "STAGNATION"
  | "RETURN_AFTER_ABSENCE"
  // D. Progression (Đột phá & Thăng tiến)
  | "BREAKTHROUGH"
  | "LEVEL_UP"
  // System Neutral / Silent
  | "SILENT";

// Legacy MascotEventType alias to maintain 100% backward compatibility
export type MascotEventType =
  | HuyenCoDomainState
  | "PERSONAL_BEST"
  | "STREAK_MILESTONE"
  | "SUBMISSION_SUCCESS"
  | "DUE_SOON"
  | "GUIDE"
  | "IDLE";

export type MascotState = "IDLE" | "WELCOME" | "GUIDE" | "CELEBRATE" | "MENTOR" | "ALERT";

export type VisualLevel = "ambient" | "subtle" | "celebration" | "ceremony" | "concerned";

export type HuanCoUrgency = "RED" | "ORANGE" | "YELLOW" | "BLUE" | "GREEN" | "GRAY";

export interface RealmConfig {
  academicRank: string;
  realmName: string;
}

export const REALM_MAP: Record<string, RealmConfig> = {
  "3.0": { academicRank: "Học Đồ", realmName: "Sơ kỳ (Phase I)" },
  "3.5": { academicRank: "Học Đồ", realmName: "Đỉnh phong (Apex)" },
  "4.0": { academicRank: "Học Sĩ", realmName: "Sơ kỳ (Phase I)" },
  "4.5": { academicRank: "Học Sĩ", realmName: "Đỉnh phong (Apex)" },
  "5.0": { academicRank: "Học Sư", realmName: "Sơ kỳ (Phase I)" },
  "5.5": { academicRank: "Học Sư", realmName: "Đỉnh phong (Apex)" },
  "6.0": { academicRank: "Học Giả", realmName: "Sơ kỳ (Phase I)" },
  "6.5": { academicRank: "Học Giả", realmName: "Đỉnh phong (Apex)" },
  "7.0": { academicRank: "Học Bá", realmName: "Sơ kỳ (Phase I)" },
  "7.5": { academicRank: "Học Bá", realmName: "Đỉnh phong (Apex)" },
  "8.0": { academicRank: "Học Tôn", realmName: "Sơ kỳ (Phase I)" },
  "8.5": { academicRank: "Học Tôn", realmName: "Đỉnh phong (Apex)" },
  "9.0": { academicRank: "Học Đế", realmName: "Đỉnh cao Học thuật" },
};

export function getRealmFromBand(band?: number): RealmConfig {
  if (!band || band < 3.0) return { academicRank: "Học Đồ", realmName: "Sơ kỳ (Phase I)" };
  if (band >= 9.0) return { academicRank: "Học Đế", realmName: "Đỉnh cao Học thuật" };
  const rounded = (Math.floor(band * 2) / 2).toFixed(1);
  return REALM_MAP[rounded] || { academicRank: "Học Sĩ", realmName: "Sơ kỳ (Phase I)" };
}

export interface HuanCoRecentTrigger {
  type:
    | "LEVEL_UP"
    | "BREAKTHROUGH"
    | "PERSONAL_BEST"
    | "STREAK_MILESTONE"
    | "SUBMISSION_SUCCESS"
    | "REVISION_SUCCESS"
    | "SKILL_IMPROVEMENT"
    | "MASTERY_SIGNAL";
  title?: string;
  score?: string | number;
  xpEarned?: number;
  skillName?: string;
}

export interface HuanCoInput {
  actionQueue: ActionQueueItem[];
  submittedCount?: number;
  gradedCount?: number;
  pendingCount?: number;
  totalAssignedCount?: number;
  enrolledClassName?: string;
  courseTitle?: string;
  courseProgressPercent?: number;
  streakDays?: number;
  currentBand?: number;
  daysSinceLastActivity?: number;
  stagnationSignal?: { skill: string; practiceCount: number; accuracy: number };
  repeatedErrorSignal?: { tag: string; count: number; recommendation: string };
  recentTrigger?: HuanCoRecentTrigger;
}

export interface HuanCoState {
  state: MascotState;
  eventType: MascotEventType;
  domainState: HuyenCoDomainState;
  urgency: HuanCoUrgency;
  badgeText: string;
  quote: string;
  advice: string;
  ctaLabel?: string;
  ctaPath?: string;
  dotColorClass: string;
  ringColorClass: string;
  visualLevel: VisualLevel;
  reward?: { xp?: number; label?: string };
  realm?: RealmConfig;
  targetItem?: ActionQueueItem;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LAYER 2 & 3: DECISION ENGINE (Candidate Detection & Priority Resolver)
 * ─────────────────────────────────────────────────────────────────────────────
 * Priority Order:
 * 1. BREAKTHROUGH / LEVEL_UP (The Golden Moment)
 * 2. REVISION_REQUIRED (Teacher explicit revision request)
 * 3. REVISION_SUCCESS (Second attempt approved)
 * 4. OVERLOAD (Intervention for >= 5 overdue items)
 * 5. RETURN_AFTER_ABSENCE (Inactivity return with unfinished work)
 * 6. STAGNATION / REPEATED_ERROR (Skill learning intervention)
 * 7. OVERDUE (1-4 overdue items)
 * 8. DUE_SOON (Urgent upcoming deadline)
 * 9. FINISHING_STRETCH (Momentum: 1-2 items left after clearing majority)
 * 10. NEXT_ACTION / GUIDE (Navigation for active queue)
 * 11. COURSE_PROGRESS (Midway milestone)
 * 12. ALL_CLEARED / WELCOME (Queue clean)
 * 13. IDLE / SILENT (Default)
 */
export function resolveHuyenCoDomainState(input: HuanCoInput): HuyenCoDomainState {
  const {
    actionQueue = [],
    submittedCount = 0,
    totalAssignedCount,
    daysSinceLastActivity = 0,
    courseProgressPercent,
    stagnationSignal,
    repeatedErrorSignal,
    recentTrigger,
  } = input;

  // 1. Golden Moment: Level up or Milestone Breakthrough
  if (recentTrigger?.type === "LEVEL_UP") return "LEVEL_UP";
  if (recentTrigger?.type === "BREAKTHROUGH") return "BREAKTHROUGH";

  // 2. Revision Required: Teacher explicit revision
  const hasRevision = actionQueue.some((i) => i.status === "REVISION_REQUIRED");
  if (hasRevision) return "REVISION_REQUIRED";

  // 3. Revision Success: Approved rewrite
  if (recentTrigger?.type === "REVISION_SUCCESS") return "REVISION_SUCCESS";

  // 4. Overload Intervention: 5 or more overdue tasks piled up
  const overdueItems = actionQueue.filter(
    (item) =>
      item.status === "OVERDUE" ||
      (item.countdown?.isOverdue && item.status !== "SUBMITTED" && item.status !== "GRADED")
  );
  if (overdueItems.length >= 5) return "OVERLOAD";

  // 5. Return after absence: >= 4 days of inactivity and has pending work
  if (daysSinceLastActivity >= 4 && actionQueue.length > 0) return "RETURN_AFTER_ABSENCE";

  // 6. Learning friction signals
  if (stagnationSignal && stagnationSignal.practiceCount >= 8) return "STAGNATION";
  if (repeatedErrorSignal && repeatedErrorSignal.count >= 3) return "REPEATED_ERROR";

  // 7. Standard Overdue (1-4 items)
  if (overdueItems.length > 0) return "OVERDUE";

  // 8. Due Soon (within 48h / priority 3)
  const hasDueSoon = actionQueue.some(
    (item) => item.priority === 3 || (item.countdown && !item.countdown.isOverdue && item.priority === 3)
  );
  if (hasDueSoon) return "NEXT_ACTION"; // Grouped under actionable navigation

  // 9. Finishing Stretch: Contextual finish line
  // Condition: Had multiple tasks (either totalAssignedCount >= 3 or submittedCount >= 2),
  // now only 1 or 2 actionable items remain.
  const activeCount = actionQueue.length;
  const isHistorySignificant = (totalAssignedCount && totalAssignedCount >= 3) || submittedCount >= 2;
  if (isHistorySignificant && (activeCount === 1 || activeCount === 2)) {
    return "FINISHING_STRETCH";
  }

  // 10. Navigation: Next Action
  if (actionQueue.length > 0) return "NEXT_ACTION";

  // 11. Mid-course milestone
  if (courseProgressPercent && courseProgressPercent >= 40 && courseProgressPercent <= 60) {
    return "COURSE_PROGRESS";
  }

  // 12. All Cleared / Queue empty
  if (submittedCount > 0) return "ALL_CLEARED";

  // 13. System Idle
  return "SILENT";
}

/**
 * Backward-compatible resolver for legacy tests and interfaces
 */
export function resolveMascotEvent(input: HuanCoInput): MascotEventType {
  if (input.recentTrigger?.type === "LEVEL_UP") return "LEVEL_UP";
  if (input.recentTrigger?.type === "PERSONAL_BEST") return "PERSONAL_BEST";
  if (input.recentTrigger?.type === "STREAK_MILESTONE") return "STREAK_MILESTONE";
  if (input.recentTrigger?.type === "SUBMISSION_SUCCESS") return "SUBMISSION_SUCCESS";

  const domain = resolveHuyenCoDomainState(input);
  if (domain === "NEXT_ACTION") {
    const hasDueSoon = input.actionQueue?.some(
      (item) => item.priority === 3 || (item.countdown && !item.countdown.isOverdue && item.priority === 3)
    );
    return hasDueSoon ? "DUE_SOON" : "GUIDE";
  }
  if (domain === "ALL_CLEARED") return "WELCOME";
  if (domain === "SILENT") return "IDLE";
  return domain;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LAYER 4: PRESENTATION & MESSAGE MAPPER (80% Direct + 20% Lore)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function getMascotPresentation(input: HuanCoInput): HuanCoState {
  const {
    actionQueue = [],
    submittedCount = 0,
    gradedCount = 0,
    currentBand,
    streakDays,
    recentTrigger,
    stagnationSignal,
    repeatedErrorSignal,
  } = input;

  const domainState = resolveHuyenCoDomainState(input);
  const realm = getRealmFromBand(currentBand);

  // Handle legacy triggers that directly map to celebration presentation
  if (recentTrigger?.type === "PERSONAL_BEST") {
    return {
      state: "CELEBRATE",
      eventType: "PERSONAL_BEST",
      domainState: "BREAKTHROUGH",
      urgency: "GREEN",
      badgeText: "Kỷ Lục Mới",
      quote: `Band điểm đã nhích lên${
        recentTrigger.score ? ` (${recentTrigger.score})` : ""
      }. Bạn đã vượt qua kỷ lục của chính mình. Tiếp tục giữ cách học này.`,
      advice: "Sự kiên trì đang mang lại kết quả rõ rệt.",
      ctaLabel: "Xem chi tiết bài làm",
      ctaPath: routes.student.submissions(),
      dotColorClass: "bg-emerald-400",
      ringColorClass: "ring-emerald-400/40 border-emerald-400",
      visualLevel: "celebration",
      reward: { xp: recentTrigger.xpEarned || 100, label: "Kỷ lục cá nhân" },
      realm,
    };
  }

  if (recentTrigger?.type === "STREAK_MILESTONE") {
    return {
      state: "CELEBRATE",
      eventType: "STREAK_MILESTONE",
      domainState: "COURSE_PROGRESS",
      urgency: "GREEN",
      badgeText: `Chuỗi ${streakDays || 7} Ngày`,
      quote: `${streakDays || 7} ngày liên tục không trễ bài. Đây mới là cách Band tăng bền vững.`,
      advice: "Kỷ luật đều đặn chính là chìa khóa bứt phá.",
      ctaLabel: "Tiếp tục rèn luyện",
      ctaPath: routes.student.submissions(),
      dotColorClass: "bg-amber-500",
      ringColorClass: "ring-amber-500/40 border-amber-500",
      visualLevel: "celebration",
      reward: { xp: recentTrigger.xpEarned || 50, label: "Duy trì rèn luyện" },
      realm,
    };
  }

  if (recentTrigger?.type === "SUBMISSION_SUCCESS") {
    return {
      state: "CELEBRATE",
      eventType: "SUBMISSION_SUCCESS",
      domainState: "COURSE_PROGRESS",
      urgency: "GREEN",
      badgeText: "Đã Hoàn Thành",
      quote: "Rất tốt. Một nhiệm vụ nữa đã được giải quyết trọn vẹn.",
      advice: "Nghỉ ngơi một chút rồi xem lại lời giải chi tiết và nhận xét nhé.",
      ctaLabel: "Xem bài đã nộp",
      ctaPath: routes.student.submissions(),
      dotColorClass: "bg-emerald-500",
      ringColorClass: "ring-emerald-500/30 border-emerald-500",
      visualLevel: "subtle",
      reward: { xp: recentTrigger.xpEarned || 50, label: "Tiến độ học tập" },
      realm,
    };
  }

  switch (domainState) {
    // 1. LEVEL_UP (The Official Band Elevation)
    case "LEVEL_UP":
      return {
        state: "CELEBRATE",
        eventType: "LEVEL_UP",
        domainState,
        urgency: "GREEN",
        badgeText: "Đột Phá Cảnh Giới",
        quote: `Căn cơ đã vững. Đã chạm mốc ${realm.academicRank}. Một tầng kiến thức mới đã mở ra.`,
        advice: "Tiếp tục giữ vững phong độ này trong các bài học tiếp theo.",
        ctaLabel: "Xem lộ trình tiếp theo",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-amber-400",
        ringColorClass: "ring-amber-400/40 border-amber-400",
        visualLevel: "ceremony",
        reward: { xp: recentTrigger?.xpEarned || 200, label: "Đột phá cảnh giới" },
        realm,
      };

    // 2. BREAKTHROUGH (Skill or Course breakthrough)
    case "BREAKTHROUGH":
      return {
        state: "CELEBRATE",
        eventType: "BREAKTHROUGH",
        domainState,
        urgency: "GREEN",
        badgeText: "Đột Phá Kỹ Năng",
        quote: `Điểm nghẽn ở phần ${recentTrigger?.skillName || "rèn luyện"} đã được khai thông. Năng lực xử lý đã nâng lên rõ rệt.`,
        advice: "Áp dụng kỹ thuật này vào các bài thực hành tiếp theo.",
        ctaLabel: "Xem phân tích tiến bộ",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-emerald-400",
        ringColorClass: "ring-emerald-400/40 border-emerald-400",
        visualLevel: "celebration",
        reward: { xp: recentTrigger?.xpEarned || 150, label: "Đột phá kỹ năng" },
        realm,
      };

    // 3. REVISION_REQUIRED (Teacher requested re-work)
    case "REVISION_REQUIRED": {
      const target = actionQueue.find((item) => item.status === "REVISION_REQUIRED") || actionQueue[0];
      const targetPath = target.submission?.id
        ? routes.student.submission(target.submission.id)
        : routes.exam.take(target.examId || target.id);

      return {
        state: "MENTOR",
        eventType: "REVISION_REQUIRED",
        domainState,
        urgency: "ORANGE",
        badgeText: "Cần Mài Giũa",
        quote: "Bài này còn vài điểm cần mài giũa thêm một lần nữa.",
        advice: `Xem nhận xét của giáo viên và hoàn thiện bài "${target.title}".`,
        ctaLabel: `Sửa bài: ${target.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-amber-500",
        ringColorClass: "ring-amber-500/30 border-amber-500",
        visualLevel: "subtle",
        targetItem: target,
        realm,
      };
    }

    // 4. REVISION_SUCCESS (Second attempt approved)
    case "REVISION_SUCCESS":
      return {
        state: "CELEBRATE",
        eventType: "REVISION_SUCCESS",
        domainState,
        urgency: "GREEN",
        badgeText: "Vượt Chướng Ngại",
        quote: "Chính sự kiên nhẫn mài giũa bài sửa đã giúp bạn vá lại lỗ hổng kiến thức này.",
        advice: "Bài làm lại đã được giáo viên phê duyệt. Sẵn sàng cho chặng tiếp theo.",
        ctaLabel: "Xem bài đã duyệt",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-emerald-500",
        ringColorClass: "ring-emerald-500/40 border-emerald-500",
        visualLevel: "subtle",
        reward: { xp: 80, label: "Mài giũa thành công" },
        realm,
      };

    // 5. OVERLOAD (Intervention: 5+ overdue items)
    case "OVERLOAD": {
      const overdueList = actionQueue.filter(
        (item) => item.status === "OVERDUE" || (item.countdown?.isOverdue && item.status !== "SUBMITTED")
      );
      const prioritizedTask = overdueList[0] || actionQueue[0];
      const targetPath = routes.exam.take(prioritizedTask.examId || prioritizedTask.id);

      return {
        state: "ALERT",
        eventType: "OVERLOAD",
        domainState,
        urgency: "RED",
        badgeText: "Cần Cắt Tỉa",
        quote: `Hàng đợi đang dồn ${overdueList.length} bài. Đừng cố giải quyết tất cả cùng lúc.`,
        advice: `Hôm nay chỉ tập trung xử lý dứt điểm bài "${prioritizedTask.title}". Các bài khác tạm gác lại.`,
        ctaLabel: `Ưu tiên làm: ${prioritizedTask.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-rose-500",
        ringColorClass: "ring-rose-500/30 border-rose-500",
        visualLevel: "concerned",
        targetItem: prioritizedTask,
        realm,
      };
    }

    // 6. RETURN_AFTER_ABSENCE (Inactivity threshold reached)
    case "RETURN_AFTER_ABSENCE": {
      const target = actionQueue[0];
      const targetPath = routes.exam.take(target.examId || target.id);

      return {
        state: "GUIDE",
        eventType: "RETURN_AFTER_ABSENCE",
        domainState,
        urgency: "BLUE",
        badgeText: "Tái Khởi Nhịp",
        quote: "Đường học vẫn ở đây. Đừng nhìn cả danh sách bài dồn, hãy chọn một bài và lấy lại nhịp.",
        advice: `Bắt đầu nhẹ nhàng với bài "${target.title}". Hoàn thành bài này là đã lấy lại đà học.`,
        ctaLabel: `Bắt đầu lại: ${target.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-sky-500",
        ringColorClass: "ring-sky-500/30 border-sky-500",
        visualLevel: "subtle",
        targetItem: target,
        realm,
      };
    }

    // 7. STAGNATION (Practicing a lot without accuracy increase)
    case "STAGNATION":
      return {
        state: "ALERT",
        eventType: "STAGNATION",
        domainState,
        urgency: "YELLOW",
        badgeText: "Xem Lại Lối Đi",
        quote: `Bạn đang luyện nhiều ở phần ${stagnationSignal?.skill || "này"}, nhưng độ chính xác chưa nhích lên. Vấn đề không nằm ở số lượng.`,
        advice: "Hãy dừng việc làm thêm đề mới. Dành thời gian xem lại các lỗi sai lặp lại trong sổ tay.",
        ctaLabel: "Xem phân tích lỗi sai",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-amber-400",
        ringColorClass: "ring-amber-400/30 border-amber-400",
        visualLevel: "concerned",
        realm,
      };

    // 8. REPEATED_ERROR (Specific recurring error tag)
    case "REPEATED_ERROR":
      return {
        state: "MENTOR",
        eventType: "REPEATED_ERROR",
        domainState,
        urgency: "ORANGE",
        badgeText: "Điểm Nghẽn Lặp Lại",
        quote: `Lỗi "${repeatedErrorSignal?.tag || "cấu trúc"}" đã lặp lại lần thứ ${repeatedErrorSignal?.count || 3}. Đây chính là chướng ngại then chốt.`,
        advice: repeatedErrorSignal?.recommendation || "Đừng sửa ngọn. Hãy tập trung luyện dứt điểm dạng bài này trước.",
        ctaLabel: "Xem bài tập gợi ý",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-amber-500",
        ringColorClass: "ring-amber-500/30 border-amber-500",
        visualLevel: "subtle",
        realm,
      };

    // 9. OVERDUE (1-4 overdue items)
    case "OVERDUE": {
      const overdueItems = actionQueue.filter(
        (item) =>
          item.status === "OVERDUE" ||
          (item.countdown?.isOverdue && item.status !== "SUBMITTED" && item.status !== "GRADED")
      );
      const target = overdueItems[0] || actionQueue[0];
      const targetPath = routes.exam.take(target.examId || target.id);

      return {
        state: "ALERT",
        eventType: "OVERDUE",
        domainState,
        urgency: "RED",
        badgeText: "Cần Xử Lý",
        quote: "Đừng lo, chúng ta giải quyết từng bài một là ổn ngay. Đừng để bài cũ kéo chậm chặng hiện tại.",
        advice: `Ưu tiên hoàn thành bài "${target.title}" để giữ nhịp học.`,
        ctaLabel: `Xử lý nhiệm vụ: ${target.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-rose-500",
        ringColorClass: "ring-rose-500/20 border-rose-400/60",
        visualLevel: "concerned",
        targetItem: target,
        realm,
      };
    }

    // 10. FINISHING_STRETCH (1-2 items left to clear the queue)
    case "FINISHING_STRETCH": {
      const target = actionQueue[0];
      const targetPath = routes.exam.take(target.examId || target.id);
      const remaining = actionQueue.length;

      return {
        state: "GUIDE",
        eventType: "FINISHING_STRETCH",
        domainState,
        urgency: "GREEN",
        badgeText: "Chặng Cuối",
        quote:
          remaining === 1
            ? "Chỉ còn 1 bài nữa. Hoàn thành nó là bạn đã dọn sạch toàn bộ hàng đợi hôm nay."
            : "Chỉ còn 2 bài cuối cùng trước khi hoàn tất chặng. Giữ vững nhịp độ nào.",
        advice: `Nhiệm vụ tiếp theo: "${target.title}".`,
        ctaLabel: `Hoàn tất: ${target.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-emerald-500",
        ringColorClass: "ring-emerald-500/30 border-emerald-500",
        visualLevel: "subtle",
        targetItem: target,
        realm,
      };
    }

    // 11. NEXT_ACTION (Active assignment navigation)
    case "NEXT_ACTION": {
      const hasDueSoon = actionQueue.some(
        (item) => item.priority === 3 || (item.countdown && !item.countdown.isOverdue && item.priority === 3)
      );
      const target = actionQueue[0];
      const targetPath = routes.exam.take(target.examId || target.id);

      if (hasDueSoon) {
        const countdownText = target.countdown?.text ? ` (${target.countdown.text})` : "";
        return {
          state: "GUIDE",
          eventType: "DUE_SOON",
          domainState,
          urgency: "YELLOW",
          badgeText: "Sắp Đến Hạn",
          quote: "Bài tập này sắp đến hạn, làm sớm để giữ nhịp học chủ động nhé.",
          advice: `Bài "${target.title}"${countdownText} nên được ưu tiên hoàn thành trước.`,
          ctaLabel: `Làm bài: ${target.title}`,
          ctaPath: targetPath,
          dotColorClass: "bg-amber-400",
          ringColorClass: "ring-amber-400/30 border-amber-400",
          visualLevel: "subtle",
          targetItem: target,
          realm,
        };
      }

      return {
        state: "GUIDE",
        eventType: "GUIDE",
        domainState,
        urgency: "BLUE",
        badgeText: "Nhiệm Vụ Mới",
        quote:
          actionQueue.length > 1
            ? `Hàng đợi có ${actionQueue.length} nhiệm vụ. Đừng làm dàn trải, hãy bắt đầu với bài này trước.`
            : "Có nhiệm vụ học tập mới đang chờ bạn.",
        advice: `Hãy bắt đầu ngay với bài "${target.title}".`,
        ctaLabel: `Làm bài: ${target.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-primary",
        ringColorClass: "ring-primary/30 border-primary",
        visualLevel: "subtle",
        targetItem: target,
        realm,
      };
    }

    // 12. COURSE_PROGRESS (Midway progression)
    case "COURSE_PROGRESS":
      return {
        state: "GUIDE",
        eventType: "COURSE_PROGRESS",
        domainState,
        urgency: "BLUE",
        badgeText: "Tiến Độ Khóa Học",
        quote: "Bạn đã vượt qua nửa chặng đường của khóa. Căn cơ đang ngày càng hoàn thiện.",
        advice: "Tiếp tục duy trì tính kỷ luật trong các bài tập phía trước.",
        ctaLabel: "Xem tổng quan lộ trình",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-sky-500",
        ringColorClass: "ring-sky-500/30 border-sky-500",
        visualLevel: "subtle",
        realm,
      };

    // 13. ALL_CLEARED (No pending assignments)
    case "ALL_CLEARED":
      return {
        state: "WELCOME",
        eventType: "WELCOME",
        domainState,
        urgency: "GREEN",
        badgeText: "Tiến Triển Tốt",
        quote: "Bàn học đã phong quang. Bạn đã hoàn tất mọi bài tập được giao.",
        advice:
          gradedCount > 0
            ? `Đã có ${gradedCount} bài được giáo viên chấm nhận xét. Xem lại để củng cố kiến thức.`
            : "Nghỉ ngơi lấy lại năng lượng trước khi bài học mới được mở ra nhé.",
        ctaLabel: "Xem lịch sử nộp bài",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-emerald-500",
        ringColorClass: "ring-emerald-500/30 border-emerald-500",
        visualLevel: "ambient",
        realm,
      };

    // 14. SILENT / IDLE (Default quiet state)
    case "SILENT":
    default:
      return {
        state: "IDLE",
        eventType: "IDLE",
        domainState: "SILENT",
        urgency: "GRAY",
        badgeText: "Đang Thảnh Thơi",
        quote: "Hiện tại chưa có bài tập mới. Bạn có thể ôn lại bài cũ hoặc đọc thêm tài liệu.",
        advice: "Khi giáo viên giao bài mới, Huyền Cơ sẽ chỉ dẫn ngay.",
        dotColorClass: "bg-muted-foreground",
        ringColorClass: "ring-border border-border",
        visualLevel: "ambient",
        realm,
      };
  }
}

/**
 * Backward-compatible entrypoint
 */
export function getHuanCoState(input: HuanCoInput): HuanCoState {
  return getMascotPresentation(input);
}

