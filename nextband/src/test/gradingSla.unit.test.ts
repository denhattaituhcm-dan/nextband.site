import { describe, it, expect } from "vitest";
import { calculateGradingSla, summarizeSlaStats, GRADING_SLA_DAYS } from "../lib/gradingSla";

describe("Grading SLA Module", () => {
  it("should calculate 7-day SLA correctly for recent submission", () => {
    const now = new Date();
    // Submitted 1 day ago -> 6 days remaining -> ON_TRACK
    const submittedAt = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();
    const result = calculateGradingSla(submittedAt, null, "SUBMITTED");

    expect(result.status).toBe("ON_TRACK");
    expect(result.isOverdue).toBe(false);
    expect(result.isApproaching).toBe(false);
    expect(result.remainingDays).toBe(6); // 7 - 1 = 6 days remaining
    expect(result.badgeText).toContain("⏱ Còn");
  });

  it("should detect APPROACHING status when <= 2 days remaining", () => {
    const now = new Date();
    // Submitted 5.5 days ago -> 1.5 days remaining -> APPROACHING
    const submittedAt = new Date(now.getTime() - 5.5 * 24 * 60 * 60 * 1000).toISOString();
    const result = calculateGradingSla(submittedAt, null, "SUBMITTED");

    expect(result.status).toBe("APPROACHING");
    expect(result.isApproaching).toBe(true);
    expect(result.isOverdue).toBe(false);
    expect(result.badgeText).toContain("⚠️ Còn");
  });

  it("should detect OVERDUE status when past 7 days", () => {
    const now = new Date();
    // Submitted 9 days ago -> 2 days overdue -> OVERDUE
    const submittedAt = new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString();
    const result = calculateGradingSla(submittedAt, null, "SUBMITTED");

    expect(result.status).toBe("OVERDUE");
    expect(result.isOverdue).toBe(true);
    expect(result.isApproaching).toBe(false);
    expect(result.badgeText).toContain("🔴 Quá hạn 2 ngày");
  });

  it("should recognize GRADED submission as GRADED with green badge", () => {
    const now = new Date();
    const submittedAt = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const gradedAt = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();
    const result = calculateGradingSla(submittedAt, gradedAt, "GRADED");

    expect(result.status).toBe("GRADED");
    expect(result.badgeVariant).toBe("emerald");
    expect(result.formattedRemaining).toBe("Đã trả bài");
  });

  it("should handle unsubmitted or null values gracefully", () => {
    const result = calculateGradingSla(null, null, null);
    expect(result.status).toBe("NOT_SUBMITTED");
    expect(result.badgeText).toBe("Chưa nộp");
  });

  it("should summarize SLA statistics correctly", () => {
    const now = new Date();
    const items = [
      { submittedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: "SUBMITTED" }, // ON_TRACK
      { submittedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(), status: "SUBMITTED" }, // APPROACHING
      { submittedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(), status: "SUBMITTED" }, // OVERDUE
      { submittedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), gradedAt: now.toISOString(), status: "GRADED" }, // GRADED
    ];

    const stats = summarizeSlaStats(items);
    expect(stats.onTrackCount).toBe(1);
    expect(stats.approachingCount).toBe(1);
    expect(stats.overdueCount).toBe(1);
    expect(stats.gradedCount).toBe(1);
    expect(stats.totalPending).toBe(3);
  });
});
