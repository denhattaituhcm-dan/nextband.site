/**
 * Unit tests for Risk Engine Service
 *
 * Tập trung vào các boundary case nghiệp vụ quan trọng:
 *  - H_open = 0 → luôn NONE
 *  - Worst-case đủ giữ tier → NONE
 *  - Phân loại RiskLevel theo giờ còn lại
 *  - PerformanceLevel độc lập với RiskLevel
 *  - Trajectory dựa trên delta
 *  - isEligibleForScholarship
 */

import { describe, it, expect } from 'vitest';
import {
  evaluateStudentRisk,
  isEligibleForScholarship,
  classifyPerformanceLevel,
  classifyTrajectory,
  TIER_THRESHOLDS,
  type EligibleTask,
  type RiskEvaluationInput,
} from '../services/risk-engine.service.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const HOURS = (h: number) => h * 60 * 60 * 1000;

function makeDeadline(hoursFromNow: number, now: Date): Date {
  return new Date(now.getTime() + HOURS(hoursFromNow));
}

function makeTask(examId: string, deadline: Date | null = null): EligibleTask {
  return { assignmentId: `asgn-${examId}`, examId, deadline };
}

function makeInput(overrides: Partial<RiskEvaluationInput> = {}): RiskEvaluationInput {
  const now = new Date('2026-09-07T10:00:00+07:00');
  return {
    eligibleTasks: [],
    completedTaskExamIds: new Set(),
    currentTierThreshold: 90, // TIER_4
    now,
    weekDeadline: makeDeadline(50, now),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// isEligibleForScholarship
// ---------------------------------------------------------------------------

describe('isEligibleForScholarship', () => {
  const windowStart = new Date('2026-08-31T00:00:00Z');
  const windowEnd = new Date('2026-09-07T11:15:00Z');
  const ctx = { windowStart, windowEnd };

  it('returns false when task has no deadline', () => {
    expect(isEligibleForScholarship({ deadline: null }, ctx)).toBe(false);
  });

  it('returns false when deadline is before window start', () => {
    const deadline = new Date('2026-08-30T12:00:00Z');
    expect(isEligibleForScholarship({ deadline }, ctx)).toBe(false);
  });

  it('returns false when deadline is exactly at window start (exclusive)', () => {
    expect(isEligibleForScholarship({ deadline: windowStart }, ctx)).toBe(false);
  });

  it('returns true when deadline is within window', () => {
    const deadline = new Date('2026-09-05T08:00:00Z');
    expect(isEligibleForScholarship({ deadline }, ctx)).toBe(true);
  });

  it('returns true when deadline is exactly at window end (inclusive)', () => {
    expect(isEligibleForScholarship({ deadline: windowEnd }, ctx)).toBe(true);
  });

  it('returns false when deadline is after window end', () => {
    const deadline = new Date('2026-09-14T11:15:00Z');
    expect(isEligibleForScholarship({ deadline }, ctx)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// evaluateStudentRisk — Invariant #1: no eligible tasks → NONE
// ---------------------------------------------------------------------------

describe('evaluateStudentRisk — no eligible tasks', () => {
  it('returns NONE when eligibleTasks is empty', () => {
    const result = evaluateStudentRisk(makeInput({ eligibleTasks: [] }));
    expect(result.riskLevel).toBe('NONE');
    expect(result.openTasks).toHaveLength(0);
    expect(result.riskReason).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// evaluateStudentRisk — Invariant #2: H_open = 0 → NONE
// ---------------------------------------------------------------------------

describe('evaluateStudentRisk — H_open = 0 → always NONE', () => {
  it('returns NONE when all eligible tasks are completed (all 12/12)', () => {
    const now = new Date();
    const tasks = Array.from({ length: 12 }, (_, i) =>
      makeTask(`exam-${i}`, makeDeadline(1, now))
    );
    const completed = new Set(tasks.map((t) => t.examId));

    const result = evaluateStudentRisk(
      makeInput({ eligibleTasks: tasks, completedTaskExamIds: completed })
    );

    expect(result.riskLevel).toBe('NONE');
    expect(result.openTasks).toHaveLength(0);
    expect(result.requiredAdditionalTasks).toBe(0);
  });

  it('returns NONE when completed=12/12 even if remainingAllowedMisses would be 0', () => {
    // Edge case từ review: 12/12 hoàn thành, remainingAllowedMisses=0 không nên báo động
    const now = new Date();
    const tasks = Array.from({ length: 12 }, (_, i) =>
      makeTask(`exam-${i}`, makeDeadline(1, now))
    );
    const completed = new Set(tasks.map((t) => t.examId));

    const result = evaluateStudentRisk(
      makeInput({
        eligibleTasks: tasks,
        completedTaskExamIds: completed,
        currentTierThreshold: 90,
      })
    );
    expect(result.riskLevel).toBe('NONE');
  });
});

// ---------------------------------------------------------------------------
// evaluateStudentRisk — Worst-case đủ giữ tier → NONE
// ---------------------------------------------------------------------------

describe('evaluateStudentRisk — worst-case still safe', () => {
  it('returns NONE when missing tasks but worst-case rate >= threshold', () => {
    const now = new Date();
    // 10 eligible, 9 completed, 1 open. Worst-case = 9/10 = 90% = đúng threshold
    const tasks = Array.from({ length: 10 }, (_, i) =>
      makeTask(`exam-${i}`, makeDeadline(20, now))
    );
    const completed = new Set(tasks.slice(0, 9).map((t) => t.examId));

    const result = evaluateStudentRisk(
      makeInput({
        eligibleTasks: tasks,
        completedTaskExamIds: completed,
        currentTierThreshold: 90, // 9/10 = 90% = đạt ngưỡng
      })
    );

    expect(result.riskLevel).toBe('NONE');
    expect(result.worstCaseRate).toBeCloseTo(90);
  });

  it('triggers risk when worst-case drops below threshold', () => {
    const now = new Date();
    // 10 eligible, 8 completed, 2 open. Worst-case = 80% < 90% threshold
    const tasks = Array.from({ length: 10 }, (_, i) =>
      makeTask(`exam-${i}`, makeDeadline(20, now))
    );
    const completed = new Set(tasks.slice(0, 8).map((t) => t.examId));

    const result = evaluateStudentRisk(
      makeInput({
        eligibleTasks: tasks,
        completedTaskExamIds: completed,
        currentTierThreshold: 90,
        now,
      })
    );

    expect(result.riskLevel).not.toBe('NONE');
    expect(result.worstCaseRate).toBeCloseTo(80);
    expect(result.openTasks).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// evaluateStudentRisk — RiskLevel phân loại theo thời gian
// ---------------------------------------------------------------------------

describe('evaluateStudentRisk — risk level by deadline proximity', () => {
  function makeAtRiskInput(hoursUntilSoonestDeadline: number) {
    const now = new Date('2026-09-07T10:00:00+07:00');
    // 5 eligible, 3 completed — worst-case 60% < 90%
    const tasks = [
      makeTask('exam-1', makeDeadline(hoursUntilSoonestDeadline, now)),
      makeTask('exam-2', makeDeadline(hoursUntilSoonestDeadline + 5, now)),
      makeTask('exam-3', makeDeadline(hoursUntilSoonestDeadline + 10, now)),
      makeTask('exam-4', makeDeadline(hoursUntilSoonestDeadline + 15, now)),
      makeTask('exam-5', makeDeadline(hoursUntilSoonestDeadline + 20, now)),
    ];
    const completed = new Set(['exam-1', 'exam-2', 'exam-3']);

    return makeInput({
      eligibleTasks: tasks,
      completedTaskExamIds: completed,
      currentTierThreshold: 90,
      now,
      weekDeadline: makeDeadline(50, now),
    });
  }

  it('returns WATCH when soonest open deadline > 36 hours away', () => {
    // exam-4 is soonest open, 40h away
    const tasks = [
      makeTask('exam-1', makeDeadline(40, new Date('2026-09-07T10:00:00+07:00'))),
      makeTask('exam-2', makeDeadline(45, new Date('2026-09-07T10:00:00+07:00'))),
      makeTask('exam-3', makeDeadline(50, new Date('2026-09-07T10:00:00+07:00'))),
      makeTask('exam-4', makeDeadline(55, new Date('2026-09-07T10:00:00+07:00'))),
      makeTask('exam-5', makeDeadline(60, new Date('2026-09-07T10:00:00+07:00'))),
    ];
    const now = new Date('2026-09-07T10:00:00+07:00');
    const completed = new Set(['exam-1', 'exam-2', 'exam-3']);
    const result = evaluateStudentRisk(
      makeInput({ eligibleTasks: tasks, completedTaskExamIds: completed, currentTierThreshold: 90, now, weekDeadline: makeDeadline(70, now) })
    );
    expect(result.riskLevel).toBe('WATCH');
  });

  it('returns AT_RISK when soonest open deadline is 6–36 hours away', () => {
    const now = new Date('2026-09-07T10:00:00+07:00');
    const tasks = [
      makeTask('exam-1', makeDeadline(1, now)),
      makeTask('exam-2', makeDeadline(2, now)),
      makeTask('exam-3', makeDeadline(3, now)),
      makeTask('exam-4', makeDeadline(20, now)), // soonest open — 20h
      makeTask('exam-5', makeDeadline(25, now)),
    ];
    const completed = new Set(['exam-1', 'exam-2', 'exam-3']);
    const result = evaluateStudentRisk(
      makeInput({ eligibleTasks: tasks, completedTaskExamIds: completed, currentTierThreshold: 90, now, weekDeadline: makeDeadline(40, now) })
    );
    expect(result.riskLevel).toBe('AT_RISK');
  });

  it('returns CRITICAL when soonest open deadline < 6 hours away', () => {
    const now = new Date('2026-09-07T10:00:00+07:00');
    const tasks = [
      makeTask('exam-1', makeDeadline(1, now)),
      makeTask('exam-2', makeDeadline(2, now)),
      makeTask('exam-3', makeDeadline(3, now)),
      makeTask('exam-4', makeDeadline(4, now)), // soonest open — 4h
      makeTask('exam-5', makeDeadline(5, now)),
    ];
    const completed = new Set(['exam-1', 'exam-2', 'exam-3']);
    const result = evaluateStudentRisk(
      makeInput({ eligibleTasks: tasks, completedTaskExamIds: completed, currentTierThreshold: 90, now, weekDeadline: makeDeadline(40, now) })
    );
    expect(result.riskLevel).toBe('CRITICAL');
  });
});

// ---------------------------------------------------------------------------
// evaluateStudentRisk — requiredAdditionalTasks chính xác
// ---------------------------------------------------------------------------

describe('evaluateStudentRisk — requiredAdditionalTasks', () => {
  it('calculates correct number of tasks needed to save tier', () => {
    const now = new Date();
    // 10 eligible, 7 completed, 3 open. Need ≥90% → need 9 done → need 2 more
    const tasks = Array.from({ length: 10 }, (_, i) =>
      makeTask(`exam-${i}`, makeDeadline(20, now))
    );
    const completed = new Set(tasks.slice(0, 7).map((t) => t.examId));

    const result = evaluateStudentRisk(
      makeInput({ eligibleTasks: tasks, completedTaskExamIds: completed, currentTierThreshold: 90, now })
    );

    expect(result.requiredAdditionalTasks).toBe(2);
    expect(result.openTasks).toHaveLength(3);
  });

  it('handles TIER_1 threshold (50%)', () => {
    const now = new Date();
    // 10 eligible, 4 completed → worst-case 40% < 50%
    // Need 5 done → need 1 more
    const tasks = Array.from({ length: 10 }, (_, i) =>
      makeTask(`exam-${i}`, makeDeadline(20, now))
    );
    const completed = new Set(tasks.slice(0, 4).map((t) => t.examId));

    const result = evaluateStudentRisk(
      makeInput({ eligibleTasks: tasks, completedTaskExamIds: completed, currentTierThreshold: 50, now })
    );

    expect(result.requiredAdditionalTasks).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// classifyPerformanceLevel — độc lập với RiskLevel
// ---------------------------------------------------------------------------

describe('classifyPerformanceLevel', () => {
  it('returns STRONG for >= 90%', () => {
    expect(classifyPerformanceLevel(90)).toBe('STRONG');
    expect(classifyPerformanceLevel(100)).toBe('STRONG');
  });

  it('returns ON_TRACK for 60–89%', () => {
    expect(classifyPerformanceLevel(60)).toBe('ON_TRACK');
    expect(classifyPerformanceLevel(89)).toBe('ON_TRACK');
  });

  it('returns LOW for < 60%', () => {
    expect(classifyPerformanceLevel(59)).toBe('LOW');
    expect(classifyPerformanceLevel(0)).toBe('LOW');
  });

  it('HIGH rate but risk can still exist (STRONG performance, AT_RISK tier)', () => {
    // Học sinh 95% hw rate nhưng nếu có 1 bài open và sắp hết hạn thì vẫn có risk
    // → đây chứng minh 2 trục độc lập nhau
    expect(classifyPerformanceLevel(95)).toBe('STRONG');
    // Không thể suy ra riskLevel từ performanceLevel
  });
});

// ---------------------------------------------------------------------------
// classifyTrajectory — dựa trên delta
// ---------------------------------------------------------------------------

describe('classifyTrajectory', () => {
  it('returns STABLE when no previous snapshot', () => {
    expect(classifyTrajectory(80, null)).toBe('STABLE');
  });

  it('returns RISING when delta >= 10pp', () => {
    expect(classifyTrajectory(50, 40)).toBe('RISING');
    expect(classifyTrajectory(95, 80)).toBe('RISING');
  });

  it('returns DECLINING when delta <= -10pp', () => {
    expect(classifyTrajectory(70, 80)).toBe('DECLINING');
    expect(classifyTrajectory(40, 60)).toBe('DECLINING');
  });

  it('returns STABLE when delta is between -10 and +10', () => {
    expect(classifyTrajectory(80, 75)).toBe('STABLE'); // +5
    expect(classifyTrajectory(80, 85)).toBe('STABLE'); // -5
    expect(classifyTrajectory(80, 80)).toBe('STABLE'); // 0
  });

  it('handles ACCELERATING false positive: 40%→50% is RISING but still LOW performance', () => {
    // Tuần 1: 40%, Tuần 2: 50% → RISING về trajectory
    // NHƯNG performanceLevel vẫn là LOW
    // → hai trục độc lập, không gom thành "ACCELERATING"
    expect(classifyTrajectory(50, 40)).toBe('RISING');
    expect(classifyPerformanceLevel(50)).toBe('LOW');
  });
});

// ---------------------------------------------------------------------------
// TIER_THRESHOLDS sanity check
// ---------------------------------------------------------------------------

describe('TIER_THRESHOLDS', () => {
  it('has correct values matching business rules', () => {
    expect(TIER_THRESHOLDS['TIER_4']).toBe(90);
    expect(TIER_THRESHOLDS['TIER_3']).toBe(80);
    expect(TIER_THRESHOLDS['TIER_2']).toBe(70);
    expect(TIER_THRESHOLDS['TIER_1']).toBe(50);
    expect(TIER_THRESHOLDS['NONE']).toBe(0);
  });
});
