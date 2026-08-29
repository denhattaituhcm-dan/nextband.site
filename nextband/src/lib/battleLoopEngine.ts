import { ClassPeerRank } from "./classDataMapper";
import { ActionQueueItem } from "./homeworkStatusHelper";

export type BattleMode =
  | "LEADER"          // Đang đứng top 1 (👑 Giữ ngai vàng)
  | "CHALLENGE_TOP3"  // Đang ở hạng #4 (⚔ Bứt phá vào Top 3)
  | "CHALLENGE_RIVAL" // Đang ở hạng #N (⚔ Vượt đối thủ liền kề #N-1)
  | "TIED_RIVAL"      // Đang bằng điểm/bài với người phía trên (Cần 1 bài để vượt)
  | "EMPTY_OR_UNRANKED"; // Chưa có bài hoặc chưa có rank

export interface BattleLoopState {
  battleMode: BattleMode;
  myStudent: ClassPeerRank | null;
  studentAbove: ClassPeerRank | null;
  studentBehind: ClassPeerRank | null;
  gapToRival: number; // Số bài hoặc điểm cần để vượt đối thủ phía trên
  gapFromChaser: number; // Khoảng cách với người đuổi theo phía sau (dành cho Top 1)
  top3: ClassPeerRank[];
  showEllipsis: boolean;
  headline: string;
  subHeadline: string;
  ctaLabel: string;
  targetExamId?: string;
  targetExamTitle?: string;
}

export interface CalculateBattleLoopInput {
  students: ClassPeerRank[];
  myRank: number | null | undefined;
  myCompletedCount: number;
  totalHomeworks: number;
  topMission?: ActionQueueItem | null;
}

/**
 * Tính toán trạng thái Vòng lặp Chiến đấu (Battle Loop Engine)
 * Trả về danh sách Smart Focus và thông điệp khiêu chiến mục tiêu.
 */
export function calculateBattleLoopState(input: CalculateBattleLoopInput): BattleLoopState {
  const { students = [], myRank, myCompletedCount, totalHomeworks, topMission } = input;

  const myStudent = students.find((s) => s.isMe) || null;
  const top3 = students.slice(0, 3);
  const targetExamId = topMission?.examId || topMission?.id;
  const targetExamTitle = topMission?.title;

  if (!myRank || students.length === 0 || totalHomeworks === 0) {
    return {
      battleMode: "EMPTY_OR_UNRANKED",
      myStudent,
      studentAbove: null,
      studentBehind: null,
      gapToRival: 0,
      gapFromChaser: 0,
      top3,
      showEllipsis: false,
      headline: "Đấu Trường Lớp Học Sẵn Sàng",
      subHeadline: "Bắt đầu làm bài tập để kích hoạt thứ hạng và leo bảng vinh danh!",
      ctaLabel: targetExamId ? "Làm bài ngay" : "Khám phá lớp",
      targetExamId,
      targetExamTitle,
    };
  }

  // 1. TOP 1 (Ngôi vương)
  if (myRank === 1) {
    const studentBehind = students.length > 1 ? students[1] : null;
    const gapFromChaser = studentBehind
      ? Math.max(0, myCompletedCount - studentBehind.completedCount)
      : 0;

    return {
      battleMode: "LEADER",
      myStudent,
      studentAbove: null,
      studentBehind,
      gapToRival: 0,
      gapFromChaser,
      top3,
      showEllipsis: false,
      headline: "👑 BẠN ĐANG DẪN ĐẦU LỚP!",
      subHeadline: studentBehind
        ? `Hơn ${studentBehind.fullName} +${gapFromChaser} bài. Giữ vững ngai vàng!`
        : "Độc chiếm bảng xếp hạng. Tiếp tục duy trì phong độ xuất sắc!",
      ctaLabel: targetExamId ? "Bảo vệ ngôi vương" : "Duy trì phong độ",
      targetExamId,
      targetExamTitle,
    };
  }

  // 2. TÌM ĐỐI THỦ LIỀN KỀ PHÍA TRÊN (Student Above: Rank myRank - 1)
  const studentAbove = students.find((s) => s.rank === myRank - 1) || students[myRank - 2] || null;
  const rawGap = studentAbove
    ? studentAbove.completedCount - myCompletedCount
    : 0;
  // Để vượt người phía trên thì cần làm số bài chênh lệch + 1 (nếu bằng thì làm 1 bài là vượt)
  const gapToRival = Math.max(1, rawGap + (rawGap === 0 ? 1 : 0));

  // Kiểm tra có cần hiển thị dấu ngăn cách "..." không
  // Dấu "..." hiển thị nếu học sinh từ hạng 5 trở xuống, hoặc hạng 4 nhưng studentAbove không nằm trong top 3
  const isMeInTop3 = myRank <= 3;
  const isAboveInTop3 = studentAbove ? studentAbove.rank <= 3 : false;
  const showEllipsis = !isMeInTop3 && !isAboveInTop3;

  // 3. HẠNG #4 - ÁP SÁT TOP 3
  if (myRank === 4 && studentAbove) {
    return {
      battleMode: "CHALLENGE_TOP3",
      myStudent,
      studentAbove,
      studentBehind: null,
      gapToRival,
      gapFromChaser: 0,
      top3,
      showEllipsis: false,
      headline: `⚔ BỨT PHÁ VÀO TOP 3 (${studentAbove.fullName})`,
      subHeadline: `Chỉ còn ${gapToRival} bài nữa để chiếm lấy vị trí Top 3 vinh danh!`,
      ctaLabel: "Đột phá Top 3",
      targetExamId,
      targetExamTitle,
    };
  }

  // 4. BẰNG ĐIỂM / BÀI VỚI ĐỐI THỦ PHÍA TRÊN
  if (rawGap === 0 && studentAbove) {
    return {
      battleMode: "TIED_RIVAL",
      myStudent,
      studentAbove,
      studentBehind: null,
      gapToRival: 1,
      gapFromChaser: 0,
      top3,
      showEllipsis,
      headline: `⚔ ĐANG BÁM SÁT: #${studentAbove.rank} ${studentAbove.fullName}`,
      subHeadline: `Chỉ cần hoàn thành thêm 1 bài để chính thức vượt qua ${studentAbove.fullName}!`,
      ctaLabel: "Chiến ngay",
      targetExamId,
      targetExamTitle,
    };
  }

  // 5. HẠNG #N (> 4) - KHIÊU CHIẾN ĐỐI THỦ LIỀN KỀ
  return {
    battleMode: "CHALLENGE_RIVAL",
    myStudent,
    studentAbove,
    studentBehind: null,
    gapToRival,
    gapFromChaser: 0,
    top3,
    showEllipsis,
    headline: `⚔ MỤC TIÊU TIẾP THEO: #${studentAbove ? studentAbove.rank : myRank - 1} ${studentAbove ? studentAbove.fullName : "Đối thủ"}`,
    subHeadline: studentAbove
      ? `Khoảng cách: ${gapToRival} bài tập. Nộp bài ngay để thu hẹp và leo hạng!`
      : `Làm thêm ${gapToRival} bài để cải thiện thứ hạng!`,
    ctaLabel: "Khiêu chiến ngay",
    targetExamId,
    targetExamTitle,
  };
}

/**
 * Định nghĩa trọng số Competition Score chuẩn cho tương lai:
 * - Homework Completion: 40%
 * - Quality / Accuracy: 30%
 * - Consistency / Streak: 15%
 * - Revision Completion: 15%
 */
export interface CompetitionScoreWeights {
  homeworkWeight: number; // 0.40
  qualityWeight: number;  // 0.30
  streakWeight: number;   // 0.15
  revisionWeight: number; // 0.15
}

export function computeCompetitionScore(params: {
  completionRate: number; // 0..100
  accuracyRate?: number;  // 0..100
  streakDays?: number;    // số ngày liên tiếp
  revisionRate?: number;  // 0..100
  weights?: Partial<CompetitionScoreWeights>;
}): number {
  const w = {
    homeworkWeight: params.weights?.homeworkWeight ?? 0.4,
    qualityWeight: params.weights?.qualityWeight ?? 0.3,
    streakWeight: params.weights?.streakWeight ?? 0.15,
    revisionWeight: params.weights?.revisionWeight ?? 0.15,
  };

  const streakScore = Math.min(100, (params.streakDays || 0) * 10);
  const accuracyScore = params.accuracyRate ?? params.completionRate;
  const revisionScore = params.revisionRate ?? 100;

  const total =
    params.completionRate * w.homeworkWeight +
    accuracyScore * w.qualityWeight +
    streakScore * w.streakWeight +
    revisionScore * w.revisionWeight;

  return Math.round(total);
}
