import { describe, it, expect } from "vitest";
import { getStudentMotivationCopy } from "../studentMotivationCopy";
import { ActionQueueItem } from "../homeworkStatusHelper";
import { ClassLeaderboardData } from "../api";

describe("Student Motivation Copy Engine: State-Driven Micro-copy", () => {
  it("State 1: OVERDUE -> 'Đừng để khoảng cách kéo dài. Hoàn thành bài còn thiếu và trở lại đường đua!'", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-1",
        title: "W1 - D1 - WRI",
        status: "OVERDUE",
        priority: 2,
      },
    ];

    const result = getStudentMotivationCopy({ actionQueue });
    expect(result.stateKey).toBe("OVERDUE");
    expect(result.copy).toBe("Đừng để khoảng cách kéo dài. Hoàn thành bài còn thiếu và trở lại đường đua!");
  });

  it("State 2: WEAK_PROGRESS (Revision required) -> 'Từng bài một. Bắt đầu từ nhiệm vụ quan trọng nhất hôm nay.'", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-2",
        title: "W1 - D2 - LIS",
        status: "REVISION_REQUIRED",
        priority: 1,
      },
    ];

    const result = getStudentMotivationCopy({ actionQueue });
    expect(result.stateKey).toBe("WEAK_PROGRESS");
    expect(result.copy).toBe("Từng bài một. Bắt đầu từ nhiệm vụ quan trọng nhất hôm nay.");
  });

  it("State 3: LEADER (Top 1) -> 'Bạn đang dẫn đầu. Hoàn thành bài hôm nay để bảo vệ vị trí!'", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-3",
        title: "W2 - D1 - SPK",
        status: "UPCOMING",
        priority: 4,
      },
    ];

    const leaderboardData: Partial<ClassLeaderboardData> = {
      myRank: 1,
      myCompletedCount: 10,
      totalStudents: 15,
      students: [
        {
          studentId: "user-1",
          fullName: "Tôi",
          completedCount: 10,
          totalHomeworks: 10,
          completionRate: 100,
          rank: 1,
          isMe: true,
        },
        {
          studentId: "user-2",
          fullName: "Bạn B",
          completedCount: 8,
          totalHomeworks: 10,
          completionRate: 80,
          rank: 2,
          isMe: false,
        },
      ],
    };

    const result = getStudentMotivationCopy({
      actionQueue,
      leaderboardData: leaderboardData as ClassLeaderboardData,
    });

    expect(result.stateKey).toBe("LEADER");
    expect(result.copy).toBe("Bạn đang dẫn đầu. Hoàn thành bài hôm nay để bảo vệ vị trí!");
  });

  it("State 4: CLOSE_TO_OVERTAKE -> 'Chỉ còn một bước nữa để vượt hạng. Hoàn thành bài và bứt lên!'", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-4",
        title: "W2 - D2 - REA",
        status: "UPCOMING",
        priority: 4,
      },
    ];

    const leaderboardData: Partial<ClassLeaderboardData> = {
      myRank: 2,
      myCompletedCount: 7,
      totalStudents: 10,
      students: [
        {
          studentId: "user-top1",
          fullName: "Thủ Khoa",
          completedCount: 8,
          totalHomeworks: 10,
          completionRate: 80,
          rank: 1,
          isMe: false,
        },
        {
          studentId: "user-me",
          fullName: "Tôi",
          completedCount: 7, // chỉ kém 1 bài
          totalHomeworks: 10,
          completionRate: 70,
          rank: 2,
          isMe: true,
        },
      ],
    };

    const result = getStudentMotivationCopy({
      actionQueue,
      leaderboardData: leaderboardData as ClassLeaderboardData,
    });

    expect(result.stateKey).toBe("CLOSE_TO_OVERTAKE");
    expect(result.copy).toBe("Chỉ còn một bước nữa để vượt hạng. Hoàn thành bài và bứt lên!");
  });

  it("State 5: ALL_DONE -> 'Phong độ đang lên. Tiếp tục hoàn thành bài để giữ đà!'", () => {
    const result = getStudentMotivationCopy({
      actionQueue: [],
      submittedCount: 5,
      gradedCount: 3,
    });

    expect(result.stateKey).toBe("ALL_DONE");
    expect(result.copy).toBe("Phong độ đang lên. Tiếp tục hoàn thành bài để giữ đà!");
  });

  it("State 6: PENDING_HOMEWORK -> 'Bài tập hôm nay đang chờ bạn. Làm ngay để giữ nhịp tiến bộ!'", () => {
    const actionQueue: ActionQueueItem[] = [
      {
        id: "hw-7",
        title: "W3 - D1 - LIS",
        status: "UPCOMING",
        priority: 4,
      },
    ];

    const result = getStudentMotivationCopy({
      actionQueue,
      submittedCount: 0,
    });

    expect(result.stateKey).toBe("PENDING_HOMEWORK");
    expect(result.copy).toBe("Bài tập hôm nay đang chờ bạn. Làm ngay để giữ nhịp tiến bộ!");
  });

  it("State 7: DEFAULT -> 'Làm bài ngay — bứt phá tiến độ, leo hạng và chinh phục mục tiêu!'", () => {
    const result = getStudentMotivationCopy({
      actionQueue: [],
      submittedCount: 0,
    });

    expect(result.stateKey).toBe("DEFAULT");
    expect(result.copy).toBe("Làm bài ngay — bứt phá tiến độ, leo hạng và chinh phục mục tiêu!");
  });
});
