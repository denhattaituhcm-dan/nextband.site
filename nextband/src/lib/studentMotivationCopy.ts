import { ActionQueueItem } from "./homeworkStatusHelper";
import { ClassLeaderboardData } from "./api";

export interface StudentMotivationInput {
  actionQueue: ActionQueueItem[];
  leaderboardData?: ClassLeaderboardData | null;
  submittedCount?: number;
  gradedCount?: number;
  pendingCount?: number;
}

export type StudentMotivationStateKey =
  | "OVERDUE"
  | "WEAK_PROGRESS"
  | "LEADER"
  | "CLOSE_TO_OVERTAKE"
  | "ALL_DONE"
  | "PENDING_HOMEWORK"
  | "DEFAULT";

export interface StudentMotivationResult {
  stateKey: StudentMotivationStateKey;
  copy: string;
  tag: string;
}

/**
 * Deterministic rule engine for student motivational micro-copy.
 * Priority hierarchy:
 * 1. Hành động ngay (Có bài quá hạn) -> Kéo học sinh trở lại đường đua
 * 2. Giảm áp lực & Tiến bộ (Nhiều bài nợ / Attempt 2 cần sửa) -> Tập trung từng bài
 * 3. Bảo vệ vị trí (Đang đứng đầu lớp) -> Giữ vững ngôi đầu
 * 4. Bứt phá vượt hạng (Đang áp sát bạn phía trên) -> Kích hoạt thi đua
 * 5. Duy trì phong độ (Đã hoàn thành hết bài được giao) -> Giữ nhịp
 * 6. Nhiệm vụ hôm nay (Có bài tập đang chờ) -> Làm ngay để giữ nhịp
 * 7. Mặc định -> Kích hoạt hành vi học tập
 */
export function getStudentMotivationCopy(input: StudentMotivationInput): StudentMotivationResult {
  const { actionQueue = [], leaderboardData, submittedCount = 0 } = input;

  // 1. Có bài quá hạn -> kéo học sinh trở lại đường đua
  const hasOverdue = actionQueue.some(
    (item) =>
      item.status === "OVERDUE" ||
      (item.countdown?.isOverdue && item.status !== "SUBMITTED" && item.status !== "GRADED")
  );

  if (hasOverdue) {
    return {
      stateKey: "OVERDUE",
      copy: "Đừng để khoảng cách kéo dài. Hoàn thành bài còn thiếu và trở lại đường đua!",
      tag: "Trở lại đường đua",
    };
  }

  // 2. Tiến độ yếu / Cần sửa bài attempt 2 -> hạ nhiệt áp lực, tập trung bài quan trọng nhất
  const hasRevision = actionQueue.some((item) => item.status === "REVISION_REQUIRED");
  const isHeavyQueue = actionQueue.length >= 4;

  if (hasRevision || isHeavyQueue) {
    return {
      stateKey: "WEAK_PROGRESS",
      copy: "Từng bài một. Bắt đầu từ nhiệm vụ quan trọng nhất hôm nay.",
      tag: "Từng bước một",
    };
  }

  // Thông tin Leaderboard
  const myRank = leaderboardData?.myRank;
  const students = leaderboardData?.students || [];
  const myStudent = students.find((s) => s.isMe);
  const myCompletedCount = leaderboardData?.myCompletedCount ?? (myStudent?.completedCount || 0);

  // 3. Đang đứng đầu (Top 1)
  if (myRank === 1 && students.length > 1) {
    return {
      stateKey: "LEADER",
      copy: "Bạn đang dẫn đầu. Hoàn thành bài hôm nay để bảo vệ vị trí!",
      tag: "Bảo vệ vị trí",
    };
  }

  // 4. Đang gần vượt bạn phía trên (cách bạn liền kề <= 1 bài)
  if (myRank && myRank > 1) {
    const studentAbove = students.find((s) => s.rank === myRank - 1);
    if (studentAbove) {
      const diff = studentAbove.completedCount - myCompletedCount;
      if (diff >= 0 && diff <= 1) {
        return {
          stateKey: "CLOSE_TO_OVERTAKE",
          copy: "Chỉ còn một bước nữa để vượt hạng. Hoàn thành bài và bứt lên!",
          tag: "Sắp vượt hạng",
        };
      }
    }
  }

  // 5. Hoàn thành tốt (không còn bài tồn đọng trong queue và đã có bài nộp)
  if (actionQueue.length === 0 && submittedCount > 0) {
    return {
      stateKey: "ALL_DONE",
      copy: "Phong độ đang lên. Tiếp tục hoàn thành bài để giữ đà!",
      tag: "Giữ vững phong độ",
    };
  }

  // 6. Có bài tập đang chờ làm hôm nay
  if (actionQueue.length > 0) {
    return {
      stateKey: "PENDING_HOMEWORK",
      copy: "Bài tập hôm nay đang chờ bạn. Làm ngay để giữ nhịp tiến bộ!",
      tag: "Giữ nhịp tiến bộ",
    };
  }

  // 7. Mặc định
  return {
    stateKey: "DEFAULT",
    copy: "Làm bài ngay — bứt phá tiến độ, leo hạng và chinh phục mục tiêu!",
    tag: "Chinh phục mục tiêu",
  };
}
