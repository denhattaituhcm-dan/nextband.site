import { describe, it, expect } from "vitest";
import {
  DISCIPLINE_TIERS,
  calculateDisciplineStanding,
  getSavedDisciplineGoal,
  saveDisciplineGoal,
} from "../disciplineScholarshipHelper";

describe("Discipline Scholarship Helper & Calculator Suite", () => {
  it("computes TIER_3 (100% completion) with full 500k scholarship", () => {
    const result = calculateDisciplineStanding({
      submittedCount: 10,
      totalHomeworks: 10,
      attendanceRate: 1.0,
      targetTier: "TIER_3",
    });

    expect(result.currentHomeworkRate).toBe(100);
    expect(result.effectiveTier?.key).toBe("TIER_3");
    expect(result.rewardAmount).toBe(500000);
    expect(result.rewardFormatted).toBe("500.000đ");
    expect(result.isMeetingTarget).toBe(true);
  });

  it("computes TIER_2 (90% completion) with 300k scholarship", () => {
    const result = calculateDisciplineStanding({
      submittedCount: 9,
      totalHomeworks: 10,
      attendanceRate: 0.95,
      targetTier: "TIER_2",
    });

    expect(result.currentHomeworkRate).toBe(90);
    expect(result.effectiveTier?.key).toBe("TIER_2");
    expect(result.rewardAmount).toBe(300000);
    expect(result.rewardFormatted).toBe("300.000đ");
    expect(result.isMeetingTarget).toBe(true);
  });

  it("computes TIER_1 (80% completion) with 200k scholarship", () => {
    const result = calculateDisciplineStanding({
      submittedCount: 8,
      totalHomeworks: 10,
      attendanceRate: 0.9,
      targetTier: "TIER_1",
    });

    expect(result.currentHomeworkRate).toBe(80);
    expect(result.effectiveTier?.key).toBe("TIER_1");
    expect(result.rewardAmount).toBe(200000);
    expect(result.rewardFormatted).toBe("200.000đ");
    expect(result.isMeetingTarget).toBe(true);
  });

  it("denies scholarship if completion is below 80%", () => {
    const result = calculateDisciplineStanding({
      submittedCount: 7,
      totalHomeworks: 10,
      attendanceRate: 1.0,
      targetTier: "TIER_1",
    });

    expect(result.currentHomeworkRate).toBe(70);
    expect(result.effectiveTier).toBeNull();
    expect(result.rewardAmount).toBe(0);
    expect(result.rewardFormatted).toBe("0đ");
    expect(result.isMeetingTarget).toBe(false);
  });

  it("denies scholarship if attendance is below 90%", () => {
    const result = calculateDisciplineStanding({
      submittedCount: 10,
      totalHomeworks: 10,
      attendanceRate: 0.85, // Below required 90% attendance
      targetTier: "TIER_3",
    });

    expect(result.effectiveTier).toBeNull();
    expect(result.rewardAmount).toBe(0);
  });
});
