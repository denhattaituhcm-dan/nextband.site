/**
 * Pure Milestone Decision Engine
 * Single Source of Truth for Learning Progression Calculations
 * 
 * Invariants:
 * 1. Zero network I/O, zero database access, zero localStorage, zero React dependency.
 * 2. Driven by Semantic Classification (REGULAR, BONUS, FINAL_TEST) - NO hardcoded lesson numbers.
 * 3. Copywriting tone: Viện Trưởng Huyền Cơ Lão Nhân.
 */

export type LessonSemanticType = "REGULAR" | "BONUS" | "FINAL_TEST";

export interface CourseLessonItem {
  id: string;
  title: string;
  semanticType: LessonSemanticType;
  weekGroup: number; // 1, 2, 3...
  orderInWeek: number; // 1, 2, 3
  isCompleted: boolean;
}

export interface MilestoneEvaluationInput {
  courseId: string;
  courseTitle?: string;
  lessons: CourseLessonItem[];
  currentExamId?: string; // The exam just submitted/graded (if in primary trigger flow)
}

export type MilestoneTier = "MICRO" | "MACRO" | "EPIC";

export interface DecisionMilestone {
  key: string; // Canonical Unique Key: e.g., "MILESTONE_WEEK_1_STARTER", "MILESTONE_50_PERCENT"
  tier: MilestoneTier;
  badge: {
    title: string;
    subtitle: string;
    icon: "sparkles" | "flame" | "target" | "trophy" | "crown";
    accentColor: string;
  };
  copywriting: {
    huanCoGreeting: string;
    huanCoSpeech: string;
    proverb: string;
  };
  stats: {
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    weekCompleted?: number;
  };
  soundType: "chime_micro" | "chime_macro" | "chime_epic";
}

/**
 * Infer semantic classification of a lesson from title or explicit metadata
 */
export function inferLessonSemanticType(title: string, orderIndex: number, totalLessons: number): LessonSemanticType {
  const upper = (title || "").toUpperCase();
  if (upper.includes("FINAL") || upper.includes("TỐNG DUYỆT") || upper.includes("GRADUATION")) {
    return "FINAL_TEST";
  }
  if (upper.includes("BONUS") || upper.includes("LÀM THÊM") || upper.includes("EXTRA")) {
    return "BONUS";
  }
  return "REGULAR";
}

/**
 * Pure decision engine: evaluate all achieved milestones based on canonical course structure and completion
 */
export function evaluateAllAchievedMilestones(input: MilestoneEvaluationInput): DecisionMilestone[] {
  const { courseId, lessons } = input;
  const milestones: DecisionMilestone[] = [];

  if (!lessons || lessons.length === 0) return milestones;

  const totalCount = lessons.length;
  const completedLessons = lessons.filter((l) => l.isCompleted);
  const completedCount = completedLessons.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Group REGULAR lessons by week
  const regularLessons = lessons.filter((l) => l.semanticType === "REGULAR");
  const weeksMap: Record<number, CourseLessonItem[]> = {};

  regularLessons.forEach((item) => {
    const w = item.weekGroup || 1;
    if (!weeksMap[w]) weeksMap[w] = [];
    weeksMap[w].push(item);
  });

  // 1. Check MICRO Milestones: Every completed regular week (must have all 3 regular lessons completed)
  Object.entries(weeksMap).forEach(([weekStr, weekItems]) => {
    const weekNum = Number(weekStr);
    const allWeekCompleted = weekItems.length >= 3 && weekItems.every((item) => item.isCompleted);

    if (allWeekCompleted) {
      milestones.push({
        key: `MICRO_WEEK_${weekNum}_CLEARED_${courseId}`,
        tier: "MICRO",
        badge: {
          title: `HOÀN THÀNH TUẦN ${weekNum}`,
          subtitle: `Trọn vẹn 3 thử thách của Tuần ${weekNum}`,
          icon: "sparkles",
          accentColor: "from-slate-800 to-indigo-900",
        },
        copywriting: {
          huanCoGreeting: `Tuần ${weekNum} đã được niêm phong tròn trịa.`,
          huanCoSpeech: `Không tồn đọng bài vở, không trì hoãn. Kỷ luật trong từng tuần chính là thứ tạo nên điểm Band vững chắc ở phòng thi thật.`,
          proverb: "Nhật nhật tân, hựu nhật tân — Mỗi ngày một bước, tiến bộ rõ ràng.",
        },
        stats: {
          completedLessons: completedCount,
          totalLessons: totalCount,
          progressPercentage,
          weekCompleted: weekNum,
        },
        soundType: "chime_micro",
      });
    }
  });

  // 2. Check MACRO Milestones: 25%, 50%, 75%
  if (progressPercentage >= 25) {
    milestones.push({
      key: `MACRO_25_PERCENT_${courseId}`,
      tier: "MACRO",
      badge: {
        title: "25% LỘ TRÌNH · NHẬP MÔN THÀNH CÔNG",
        subtitle: `Hoàn tất quý đầu tiên (${completedCount}/${totalCount} bài)`,
        icon: "target",
        accentColor: "from-blue-600 to-cyan-600",
      },
      copywriting: {
        huanCoGreeting: "Bước đà vững chắc!",
        huanCoSpeech: `Giai đoạn khó nhất là xây dựng thói quen làm bài đều đặn, và ngươi đã hoàn tất 1/4 khóa học. Guồng quay đã ổn định, hãy duy trì nhịp độ này.`,
        proverb: "Vạn sự khởi đầu nan — Ngươi đã vượt qua khúc cua bỡ ngỡ nhất.",
      },
      stats: {
        completedLessons: completedCount,
        totalLessons: totalCount,
        progressPercentage,
      },
      soundType: "chime_macro",
    });
  }

  if (progressPercentage >= 50) {
    milestones.push({
      key: `MACRO_50_PERCENT_${courseId}`,
      tier: "MACRO",
      badge: {
        title: "50% LỘ TRÌNH · PHÁ VỠ GIỚI HẠN",
        subtitle: `Cán mốc nửa chặng đường (${completedCount}/${totalCount} bài)`,
        icon: "flame",
        accentColor: "from-emerald-600 to-teal-600",
      },
      copywriting: {
        huanCoGreeting: "Khá lắm! Đã đi được nửa chặng đường.",
        huanCoSpeech: `Nửa chặng đường đầu là tích lũy nền tảng ngữ pháp và phản xạ. Từ bài thứ ${completedCount + 1} trở đi, các dạng đề sẽ tăng độ phức tạp. Lão nhân tin phong độ của ngươi đang ở điểm rơi tốt nhất.`,
        proverb: "Tích tiểu thành đại — Thực lực đã bắt đầu phát tiết.",
      },
      stats: {
        completedLessons: completedCount,
        totalLessons: totalCount,
        progressPercentage,
      },
      soundType: "chime_macro",
    });
  }

  if (progressPercentage >= 75) {
    milestones.push({
      key: `MACRO_75_PERCENT_${courseId}`,
      tier: "MACRO",
      badge: {
        title: "75% HÀNH TRÌNH · CHẶNG NƯỚC RÚT",
        subtitle: `Đã vượt qua ${completedCount}/${totalCount} bài · Cửa ải cuối cùng`,
        icon: "trophy",
        accentColor: "from-indigo-600 to-purple-600",
      },
      copywriting: {
        huanCoGreeting: "Giai đoạn then chốt nhất đã đến!",
        huanCoSpeech: `Ba phần tư lộ trình đã nằm lại phía sau lưng. Đa số người học bỏ cuộc ở chặng 50-70%, nhưng ngươi vẫn giữ vững tay bút. Giữ vững kỷ luật này để tiến vào bài Tống Duyệt cuối khoá!`,
        proverb: "Hành bách lý giả bán cửu thập — Đi trăm dặm, chín mươi dặm mới tính là nửa đường.",
      },
      stats: {
        completedLessons: completedCount,
        totalLessons: totalCount,
        progressPercentage,
      },
      soundType: "chime_macro",
    });
  }

  // 3. Check EPIC Milestone: Grand Graduation
  // Requirements: All regular weeks completed AND (if final test exists, final test must be completed)
  const finalTestItem = lessons.find((l) => l.semanticType === "FINAL_TEST");
  const isFinalTestCompleted = finalTestItem ? finalTestItem.isCompleted : true;
  const is100Percent = completedCount >= totalCount;

  if (is100Percent || (finalTestItem && isFinalTestCompleted && progressPercentage >= 90)) {
    milestones.push({
      key: `EPIC_GRADUATION_${courseId}`,
      tier: "EPIC",
      badge: {
        title: "ĐẠI VIÊN MÃN HÀNH TRÌNH",
        subtitle: `Hoàn tất ${completedCount}/${totalCount} thử thách · Viện Trưởng Khắc Tên`,
        icon: "crown",
        accentColor: "from-amber-500 via-orange-500 to-yellow-400",
      },
      copywriting: {
        huanCoGreeting: "Lão nhân cung chúc đạo hữu viên mãn chặng đường!",
        huanCoSpeech: `Toàn bộ ${totalCount} bài tập cùng bài khảo hạch tối hậu đã được ngươi khuất phục. Bản lĩnh học thuật không đến từ lời khen sáo rỗng, mà được khắc nên từ từng dòng luận điểm ngươi viết suốt thời gian qua. Cảnh giới mới đã mở!`,
        proverb: "Ngọc bất trác, bất thành khí — Ngươi đã tôi luyện đủ bản lĩnh xuất quan.",
      },
      stats: {
        completedLessons: completedCount,
        totalLessons: totalCount,
        progressPercentage: 100,
      },
      soundType: "chime_epic",
    });
  }

  return milestones;
}

/**
 * Filter out already claimed milestones from canonical DB list
 * Returns the highest priority unclaimed milestone (EPIC > MACRO > MICRO)
 */
export function selectHighestPriorityPendingMilestone(
  achievedMilestones: DecisionMilestone[],
  claimedKeys: Set<string>
): DecisionMilestone | null {
  const unclaimed = achievedMilestones.filter((m) => !claimedKeys.has(m.key));
  if (unclaimed.length === 0) return null;

  // Priority: EPIC > MACRO > MICRO (newest week first)
  const epic = unclaimed.find((m) => m.tier === "EPIC");
  if (epic) return epic;

  const macros = unclaimed.filter((m) => m.tier === "MACRO");
  if (macros.length > 0) return macros[macros.length - 1]; // Highest macro

  const micros = unclaimed.filter((m) => m.tier === "MICRO");
  if (micros.length > 0) return micros[micros.length - 1]; // Latest week micro

  return unclaimed[0];
}
