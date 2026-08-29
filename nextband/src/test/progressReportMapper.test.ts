import { describe, it, expect } from "vitest";
import { mapToProgressReportData } from "@/lib/progressReportMapper";

describe("Academic Progress Report Mapper - Unit Tests", () => {
  it("Scenario 1 (The User Reported Case): 0 completed, 29 unsubmitted, 10 sessions attendance (9 present, 1 absent)", () => {
    const homeworks = Array.from({ length: 29 }, (_, i) => ({
      id: `hw-${i + 1}`,
      title: `Bài tập ${String(i + 1).padStart(2, "0")}`,
      status: "unsubmitted",
      isOverdue: false,
    }));

    const attendanceRecords = [
      ...Array.from({ length: 9 }, () => ({ status: "PRESENT" })),
      { status: "ABSENT" },
    ];

    const result = mapToProgressReportData({
      studentName: "Nguyễn Hoàng Mai",
      className: "D01 07.2026",
      teacherName: "Lưu Văn Đang",
      homeworks,
      attendanceRecords,
    });

    // 1. Student Info
    expect(result.student.name).toBe("Nguyễn Hoàng Mai");
    expect(result.student.className).toBe("D01 07.2026");
    expect(result.student.teacherName).toBe("Lưu Văn Đang");

    // 2. Attendance
    expect(result.attendance).not.toBeNull();
    expect(result.attendance?.total).toBe(10);
    expect(result.attendance?.present).toBe(9);
    expect(result.attendance?.absent).toBe(1);
    expect(result.attendance?.late).toBe(0);
    expect(result.attendance?.excused).toBe(0);
    expect(result.attendance?.rate).toBe(90);

    // 3. Homework Taxonomy (Must be honest: 0 completed, 29 unsubmitted)
    expect(result.homework.totalAssigned).toBe(29);
    expect(result.homework.completed).toBe(0);
    expect(result.homework.unsubmitted).toBe(29);
    expect(result.homework.inProgress).toBe(0);
    expect(result.homework.overdue).toBe(0);
    expect(result.homework.completionRate).toBe(0);

    // 4. Recent results empty fallback
    expect(result.recentResults.length).toBe(0);
  });

  it("Scenario 2: Detailed Attendance with Late and Excused sessions", () => {
    const attendanceRecords = [
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "PRESENT" },
      { status: "LATE" },
      { status: "ABSENT" },
      { status: "EXCUSED" },
    ];

    const result = mapToProgressReportData({
      studentName: "Trần Văn A",
      className: "IELTS Fighter",
      attendanceRecords,
    });

    expect(result.attendance?.total).toBe(10);
    expect(result.attendance?.present).toBe(7);
    expect(result.attendance?.late).toBe(1);
    expect(result.attendance?.absent).toBe(1);
    expect(result.attendance?.excused).toBe(1);
    // eligible = 10 - 1 = 9 sessions. (7 + 1) / 9 = 88.88% -> 89%
    expect(result.attendance?.rate).toBe(89);
  });

  it("Scenario 3: Overdue assignments are listed explicitly", () => {
    const homeworks = [
      { id: "1", title: "Writing Task 1 Bar Chart", status: "graded", bandScore: 6.0 },
      { id: "2", title: "Reading Passage 1", status: "submitted" },
      { id: "3", title: "Writing Task 2 Opinion", status: "in_progress" },
      { id: "4", title: "Speaking Part 2 Cue Card", status: "overdue", isOverdue: true },
      { id: "5", title: "Listening Section 3", status: "unsubmitted" },
    ];

    const result = mapToProgressReportData({
      studentName: "Lê Thị B",
      className: "Class B",
      homeworks,
    });

    expect(result.homework.totalAssigned).toBe(5);
    expect(result.homework.completed).toBe(2); // graded + submitted
    expect(result.homework.inProgress).toBe(1);
    expect(result.homework.overdue).toBe(1);
    expect(result.homework.unsubmitted).toBe(1);
    expect(result.homework.completionRate).toBe(40); // 2/5 = 40%
    expect(result.homework.overdueTitles).toContain("Speaking Part 2 Cue Card");

    // Graded homework appears in recent results with band
    expect(result.recentResults.length).toBe(1);
    expect(result.recentResults[0].title).toBe("Writing Task 1 Bar Chart");
    expect(result.recentResults[0].score).toBe("Band 6");
  });

  it("Scenario 4: Structured Teacher Evaluation and Goals mapping", () => {
    const result = mapToProgressReportData({
      studentName: "Nguyễn Hoàng Mai",
      className: "D01 07.2026",
      teacherEvaluation: {
        strengths: "Học từ vựng rất nhanh, tự tin phản xạ",
        weaknesses: "Cần cải thiện thì quá khứ hoàn thành",
        recommendations: "Làm thêm 2 bài Writing mỗi tuần",
        nextGoals: ["Chuyên cần 100%", "Writing lên 6.5"],
      },
    });

    expect(result.teacherEvaluation?.strengths).toBe("Học từ vựng rất nhanh, tự tin phản xạ");
    expect(result.teacherEvaluation?.weaknesses).toBe("Cần cải thiện thì quá khứ hoàn thành");
    expect(result.teacherEvaluation?.recommendations).toBe("Làm thêm 2 bài Writing mỗi tuần");
    expect(result.teacherEvaluation?.nextGoals).toEqual(["Chuyên cần 100%", "Writing lên 6.5"]);
  });

  it("Scenario 5: Class Size & 3-Layer Homework Grading (Auto vs Teacher Grading)", () => {
    // 10 auto-graded reading/listening items (score 8.0)
    const autoHws = Array.from({ length: 10 }, (_, i) => ({
      id: `auto-${i + 1}`,
      title: `Reading Exercise ${i + 1}`,
      type: "reading",
      status: "graded",
      score: 8.0,
    }));

    // 8 teacher-graded writing/speaking items (5 passed with 7.5, 3 need revision/improvement with 4.5)
    const teacherHws = [
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `teach-pass-${i + 1}`,
        title: `Writing Task 1 #${i + 1}`,
        type: "writing",
        status: "graded",
        bandScore: 7.5,
        feedback: "Tốt",
      })),
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `teach-fail-${i + 1}`,
        title: `Writing Task 2 #${i + 1}`,
        type: "writing",
        status: "graded",
        bandScore: 4.5,
        revisionRequired: true,
        feedback: "Cần sửa lại ngữ pháp",
      })),
    ];

    // 1 in progress, 1 unsubmitted -> Total 20 assigned
    const otherHws = [
      { id: "in-prog", title: "Speaking Mock 1", type: "speaking", status: "in_progress" },
      { id: "unsub", title: "Grammar Quiz 5", type: "homework", status: "unsubmitted" },
    ];

    const allHws = [...autoHws, ...teacherHws, ...otherHws];

    const result = mapToProgressReportData({
      studentName: "Trần Minh Quân",
      className: "D01 · DREAMER",
      teacherName: "Lưu Văn Đang",
      classInfo: {
        currentStudents: 6,
        maxStudents: 10,
      },
      homeworks: allHws,
    });

    // 1. Class Size & Learning Environment
    expect(result.classInfo).toBeDefined();
    expect(result.classInfo?.currentStudents).toBe(6);
    expect(result.classInfo?.maxStudents).toBe(10);

    // 2. Homework Layer 1: Mức độ hoàn thành
    expect(result.homework.totalAssigned).toBe(20);
    expect(result.homework.completed).toBe(18);
    expect(result.homework.inProgress).toBe(1);
    expect(result.homework.unsubmitted).toBe(1);
    expect(result.homework.overdue).toBe(0);
    expect(result.homework.completionRate).toBe(90);

    // 3. Homework Layer 2: Chất lượng & Điểm TB
    // Sum: 10*8.0 (80) + 5*7.5 (37.5) + 3*4.5 (13.5) = 131 / 18 = 7.27 -> "7.3/10"
    expect(result.homework.gradedCount).toBe(18);
    expect(result.homework.averageScore).toBe("7.3/10");
    expect(result.homework.passedCount).toBe(15); // 10 auto + 5 passed
    expect(result.homework.needsImprovementCount).toBe(3); // 3 low score/revision

    // 4. Homework Layer 3: Nguồn chấm
    expect(result.homework.autoGradedCount).toBe(10);
    expect(result.homework.teacherGradedCount).toBe(8);

    // 5. Skill Averages: Writing (5x7.5 + 3x4.5) / 8 = 6.375 -> "6.5"
    expect(result.homework.skillAverages?.writing).toBeDefined();
    expect(result.homework.skillAverages?.writing?.count).toBe(8);
    expect(result.homework.skillAverages?.writing?.averageBand).toBe("6.5");
    expect(result.homework.skillAverages?.speaking).toBeNull();
  });

  it("Scenario 6: Target Band extraction and flexible fallback resolution", () => {
    // 6a: Explicit targetBand
    const res1 = mapToProgressReportData({
      studentName: "Nguyễn Hoàng Mai",
      className: "D01 07.2026",
      targetBand: "IELTS 7.0+",
    });
    expect(res1.student.targetBand).toBe("IELTS 7.0+");

    // 6b: Fallback from student object targetBand
    const res2 = mapToProgressReportData({
      studentName: "Lê Văn C",
      className: "D02 08.2026",
      student: { targetBand: "IELTS 6.5+" } as any,
    });
    expect(res2.student.targetBand).toBe("IELTS 6.5+");

    // 6c: Fallback from snake_case target_band
    const res3 = mapToProgressReportData({
      studentName: "Phạm Văn D",
      className: "D03 09.2026",
      target_band: "IELTS 6.0+",
    } as any);
    expect(res3.student.targetBand).toBe("IELTS 6.0+");
  });

  it("Scenario 7: Default Period covers from class start date (or first session) to report date", () => {
    const startDate = new Date(2026, 6, 1); // 01/07/2026
    const reportDate = new Date(2026, 7, 25); // 25/08/2026

    const res = mapToProgressReportData({
      studentName: "Nguyễn Văn A",
      className: "IELTS Intensive",
      periodFrom: startDate,
      periodTo: reportDate,
    });

    expect(res.period.from).toBe("01/07/2026");
    expect(res.period.to).toBe("25/08/2026");
  });

  it("Scenario 8: Speaking & Writing course averages (5.0, 5.5, 5.5, 6.0 -> 5.5 and 5.0, 5.0, 5.5, 6.0 -> 5.5)", () => {
    const homeworks = [
      // 4 Speaking sessions
      { id: "s1", title: "Speaking Mock 1", type: "speaking", status: "graded", bandScore: 5.0 },
      { id: "s2", title: "Speaking Mock 2", type: "speaking", status: "graded", bandScore: 5.5 },
      { id: "s3", title: "Speaking Mock 3", type: "speaking", status: "graded", bandScore: 5.5 },
      { id: "s4", title: "Speaking Mock 4", type: "speaking", status: "graded", bandScore: 6.0 },

      // 4 Writing sessions
      { id: "w1", title: "Writing Task 1 Essay", type: "writing", status: "graded", bandScore: 5.0 },
      { id: "w2", title: "Writing Task 2 Essay", type: "writing", status: "graded", bandScore: 5.0 },
      { id: "w3", title: "Writing Task 1 Chart", type: "writing", status: "graded", bandScore: 5.5 },
      { id: "w4", title: "Writing Task 2 Opinion", type: "writing", status: "graded", bandScore: 6.0 },
    ];

    const result = mapToProgressReportData({
      studentName: "Học Viên A",
      className: "M01 07.2026",
      homeworks,
    });

    // Speaking: (5.0 + 5.5 + 5.5 + 6.0) / 4 = 22.0 / 4 = 5.5
    expect(result.homework.skillAverages?.speaking).toEqual({
      averageBand: "5.5",
      count: 4,
    });

    // Writing: (5.0 + 5.0 + 5.5 + 6.0) / 4 = 21.5 / 4 = 5.375 -> rounded to 5.5
    expect(result.homework.skillAverages?.writing).toEqual({
      averageBand: "5.5",
      count: 4,
    });
  });

  it("Scenario 9: Duration & Time Spent Metrics aggregation", () => {
    const homeworks = [
      { id: "h1", title: "Writing Task 1", type: "writing", status: "submitted", timeSpentMinutes: 30 },
      { id: "h2", title: "Speaking Part 2", type: "speaking", status: "graded", timeSpentSeconds: 1200 }, // 20m
      {
        id: "h3",
        title: "Reading Test",
        type: "reading",
        status: "graded",
        startedAt: "2026-08-20T10:00:00Z",
        submittedAt: "2026-08-20T10:25:00Z", // 25m
      },
      { id: "h4", title: "Listening Test", type: "listening", status: "unsubmitted" },
    ];

    const result = mapToProgressReportData({
      studentName: "Nguyễn Văn B",
      className: "M01 07.2026",
      homeworks,
    });

    // 30 + 20 + 25 = 75 minutes. 3 tasks with time -> avg = 25m
    expect(result.homework.totalTimeSpentMinutes).toBe(75);
    expect(result.homework.avgTimeSpentMinutes).toBe(25);
  });
});



