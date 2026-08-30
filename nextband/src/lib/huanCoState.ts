import { ActionQueueItem } from "./homeworkStatusHelper";
import { routes } from "./routes";

export type MascotState = "IDLE" | "WELCOME" | "GUIDE" | "CELEBRATE" | "MENTOR" | "ALERT";

export type MascotEventType =
  | "LEVEL_UP"
  | "PERSONAL_BEST"
  | "STREAK_MILESTONE"
  | "SUBMISSION_SUCCESS"
  | "REVISION_REQUIRED"
  | "OVERDUE"
  | "DUE_SOON"
  | "GUIDE"
  | "WELCOME"
  | "IDLE";

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
  type: "LEVEL_UP" | "PERSONAL_BEST" | "STREAK_MILESTONE" | "SUBMISSION_SUCCESS";
  title?: string;
  score?: string | number;
  xpEarned?: number;
}

export interface HuanCoInput {
  actionQueue: ActionQueueItem[];
  submittedCount?: number;
  gradedCount?: number;
  pendingCount?: number;
  enrolledClassName?: string;
  courseTitle?: string;
  streakDays?: number;
  currentBand?: number;
  recentTrigger?: HuanCoRecentTrigger;
}

export interface HuanCoState {
  state: MascotState;
  eventType: MascotEventType;
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
 * 1. RESOLVER: Deterministic event resolver according to strict invariant priority:
 * LEVEL_UP > PERSONAL_BEST > STREAK_MILESTONE > SUBMISSION_SUCCESS > REVISION_REQUIRED > OVERDUE > DUE_SOON > GUIDE > WELCOME > IDLE
 */
export function resolveMascotEvent(input: HuanCoInput): MascotEventType {
  // 1. Level up (Ceremony)
  if (input.recentTrigger?.type === "LEVEL_UP") return "LEVEL_UP";

  // 2. Personal best (Celebration)
  if (input.recentTrigger?.type === "PERSONAL_BEST") return "PERSONAL_BEST";

  // 3. Streak milestone (Celebration)
  if (input.recentTrigger?.type === "STREAK_MILESTONE") return "STREAK_MILESTONE";

  // 4. Submission success (Subtle)
  if (input.recentTrigger?.type === "SUBMISSION_SUCCESS") return "SUBMISSION_SUCCESS";

  const actionQueue = input.actionQueue || [];

  // 5. Revision required (Attempt 2)
  const hasRevision = actionQueue.some((i) => i.status === "REVISION_REQUIRED");
  if (hasRevision) return "REVISION_REQUIRED";

  // 6. Overdue (Alert)
  const hasOverdue = actionQueue.some(
    (item) =>
      item.status === "OVERDUE" ||
      (item.countdown?.isOverdue && item.status !== "SUBMITTED" && item.status !== "GRADED")
  );
  if (hasOverdue) return "OVERDUE";

  // 7. Due soon items (within 48h / priority 3)
  const hasDueSoon = actionQueue.some(
    (item) => item.priority === 3 || (item.countdown && !item.countdown.isOverdue && item.priority === 3)
  );
  if (hasDueSoon) return "DUE_SOON";

  // 8. Normal upcoming / pending items
  if (actionQueue.length > 0) return "GUIDE";

  // 9. All submitted / positive
  if ((input.submittedCount || 0) > 0) return "WELCOME";

  // 10. Idle
  return "IDLE";
}

/**
 * 2. PRESENTATION MAPPER: Transforms canonical learner state and event into clean presentation
 */
export function getMascotPresentation(input: HuanCoInput): HuanCoState {
  const { actionQueue = [], submittedCount = 0, gradedCount = 0, currentBand, streakDays } = input;
  const eventType = resolveMascotEvent(input);
  const realm = getRealmFromBand(currentBand);

  switch (eventType) {
    case "LEVEL_UP":
      return {
        state: "CELEBRATE",
        eventType,
        urgency: "GREEN",
        badgeText: "Đột Phá Cảnh Giới",
        quote: `Căn cơ đã vững. Đã chạm mốc ${realm.academicRank}. Một tầng kiến thức mới đã mở ra.`,
        advice: "Tiếp tục giữ vững phong độ này trong các bài học tiếp theo.",
        ctaLabel: "Xem lộ trình tiếp theo",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-amber-400",
        ringColorClass: "ring-amber-400/40 border-amber-400",
        visualLevel: "ceremony",
        reward: { xp: input.recentTrigger?.xpEarned || 200, label: "Đột phá cảnh giới" },
        realm,
      };

    case "PERSONAL_BEST":
      return {
        state: "CELEBRATE",
        eventType,
        urgency: "GREEN",
        badgeText: "Kỷ Lục Mới",
        quote: `Band điểm đã nhích lên${
          input.recentTrigger?.score ? ` (${input.recentTrigger.score})` : ""
        }. Bạn đã vượt qua kỷ lục của chính mình. Tiếp tục giữ cách học này.`,
        advice: "Sự kiên trì đang mang lại kết quả rõ rệt.",
        ctaLabel: "Xem chi tiết bài làm",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-emerald-400",
        ringColorClass: "ring-emerald-400/40 border-emerald-400",
        visualLevel: "celebration",
        reward: { xp: input.recentTrigger?.xpEarned || 100, label: "Kỷ lục cá nhân" },
        realm,
      };

    case "STREAK_MILESTONE":
      return {
        state: "CELEBRATE",
        eventType,
        urgency: "GREEN",
        badgeText: `Chuỗi ${streakDays || 7} Ngày`,
        quote: `${streakDays || 7} ngày liên tục không trễ bài. Đây mới là cách Band tăng bền vững.`,
        advice: "Kỷ luật đều đặn chính là chìa khóa bứt phá.",
        ctaLabel: "Tiếp tục rèn luyện",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-amber-500",
        ringColorClass: "ring-amber-500/40 border-amber-500",
        visualLevel: "celebration",
        reward: { xp: input.recentTrigger?.xpEarned || 50, label: "Duy trì rèn luyện" },
        realm,
      };

    case "SUBMISSION_SUCCESS":
      return {
        state: "CELEBRATE",
        eventType,
        urgency: "GREEN",
        badgeText: "Đã Hoàn Thành",
        quote: "Rất tốt. Một nhiệm vụ nữa đã được giải quyết trọn vẹn.",
        advice: "Nghỉ ngơi một chút rồi xem lại lời giải chi tiết và nhận xét nhé.",
        ctaLabel: "Xem bài đã nộp",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-emerald-500",
        ringColorClass: "ring-emerald-500/30 border-emerald-500",
        visualLevel: "subtle",
        reward: { xp: input.recentTrigger?.xpEarned || 50, label: "Tiến độ học tập" },
        realm,
      };

    case "REVISION_REQUIRED": {
      const target = actionQueue.find((item) => item.status === "REVISION_REQUIRED") || actionQueue[0];
      const targetPath = target.submission?.id
        ? routes.student.submission(target.submission.id)
        : routes.exam.take(target.examId || target.id);

      return {
        state: "MENTOR",
        eventType,
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
        eventType,
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

    case "DUE_SOON": {
      const dueSoonItems = actionQueue.filter(
        (item) => item.priority === 3 || (item.countdown && !item.countdown.isOverdue && item.priority === 3)
      );
      const target = dueSoonItems[0] || actionQueue[0];
      const targetPath = routes.exam.take(target.examId || target.id);
      const countdownText = target.countdown?.text ? ` (${target.countdown.text})` : "";

      return {
        state: "GUIDE",
        eventType,
        urgency: "YELLOW",
        badgeText: "Sắp Đến Hạn",
        quote: "Bài tập này sắp đến hạn, tranh thủ làm sớm để giữ tiến độ nhé.",
        advice: `Bài "${target.title}"${countdownText} cần hoàn thành sớm kẻo dồn việc.`,
        ctaLabel: `Làm bài: ${target.title}`,
        ctaPath: targetPath,
        dotColorClass: "bg-amber-400",
        ringColorClass: "ring-amber-400/30 border-amber-400",
        visualLevel: "subtle",
        targetItem: target,
        realm,
      };
    }

    case "GUIDE": {
      const target = actionQueue[0];
      const targetPath = routes.exam.take(target.examId || target.id);
      const totalPending = actionQueue.length;

      return {
        state: "GUIDE",
        eventType,
        urgency: "BLUE",
        badgeText: "Nhiệm Vụ Mới",
        quote:
          totalPending > 1
            ? `Hành trình phía trước có ${totalPending} bài tập rèn luyện. Từng bước tiến lên nào.`
            : `Có nhiệm vụ mới đang chờ em hoàn thành.`,
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

    case "WELCOME":
      return {
        state: "WELCOME",
        eventType,
        urgency: "GREEN",
        badgeText: "Tiến Triển Tốt",
        quote: "Hôm nay em giữ nhịp rất tốt. Không có bài quá hạn.",
        advice:
          gradedCount > 0
            ? `Đã có ${gradedCount} bài được chấm nhận xét. Xem lại để củng cố kiến thức.`
            : `Bài nộp đang trong hàng đợi chấm, tranh thủ xem lại bài cũ nhé.`,
        ctaLabel: "Xem lịch sử nộp bài",
        ctaPath: routes.student.submissions(),
        dotColorClass: "bg-emerald-500",
        ringColorClass: "ring-emerald-500/30 border-emerald-500",
        visualLevel: "ambient",
        realm,
      };

    case "IDLE":
    default:
      return {
        state: "IDLE",
        eventType: "IDLE",
        urgency: "GRAY",
        badgeText: "Đang Thảnh Thơi",
        quote: "Hiện tại chưa có bài tập mới. Em có thể ôn lại bài cũ hoặc đọc thêm bài đọc.",
        advice: "Khi giáo viên giao bài mới, thầy sẽ nhắc em ngay.",
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

