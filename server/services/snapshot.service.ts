import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import {
  classifyPerformanceLevel,
  classifyTrajectory,
  evaluateStudentRisk,
  isEligibleForScholarship,
  TIER_THRESHOLDS,
  type EligibleTask,
} from './risk-engine.service.js';

export interface SnapshotExecutionResult {
  classesProcessed: number;
  studentsProcessed: number;
  snapshotsCreated: number;
  cutoffTime: Date;
}

export class SnapshotService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Generates a random unique parent access token
   */
  generateParentToken(): string {
    return `nb_p_${randomBytes(8).toString('hex')}`;
  }

  /**
   * Calculates the weekly snapshot cut-off point.
   * Default: Current or most recent Sunday at 18:00 (with 15-min grace period -> 18:15).
   */
  calculateCutoffTime(targetDate: Date = new Date()): Date {
    const d = new Date(targetDate);
    const day = d.getDay(); // 0 is Sunday
    
    // Set to target Sunday
    const cutoff = new Date(d);
    cutoff.setDate(d.getDate() - (day === 0 ? 0 : day));
    cutoff.setHours(18, 15, 0, 0); // 18:15 cut-off with 15min grace period
    return cutoff;
  }

  /**
   * Determines current week number for a cohort/class
   */
  calculateWeekNumber(startDate: Date | null, cutoffDate: Date, totalWeeks: number = 10): number {
    if (!startDate) return 1;
    const diffMs = cutoffDate.getTime() - startDate.getTime();
    if (diffMs <= 0) return 1;
    const week = Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000));
    return Math.max(1, Math.min(totalWeeks, week));
  }

  /**
   * Calculates ARIS scholarship tier & loss aversion note
   */
  calculateScholarshipStanding(
    hwCompleted: number,
    hwTotal: number,
    attendanceRate: number = 100
  ): {
    tier: 'TIER_1' | 'TIER_2' | 'TIER_3' | 'TIER_4' | 'NONE';
    amount: number;
    lossAversionNote: string;
  } {
    const rate = hwTotal > 0 ? (hwCompleted / hwTotal) * 100 : 100;
    const missed = Math.max(0, hwTotal - hwCompleted);

    if (attendanceRate >= 90) {
      if (rate >= 90) {
        const maxMissesTier4 = Math.floor(hwTotal * 0.1);
        const remaining = Math.max(0, maxMissesTier4 - missed);
        const note =
          remaining > 0
            ? `Phong độ xuất sắc! Còn được phép trễ tối đa ${remaining} bài để bảo toàn mốc 500.000đ.`
            : `Đang giữ mốc 500.000đ ở ngưỡng giới hạn. Không được trễ thêm bài nào!`;
        return { tier: 'TIER_4', amount: 500000, lossAversionNote: note };
      }

      if (rate >= 80) {
        const maxMissesTier3 = Math.floor(hwTotal * 0.2);
        const remaining = Math.max(0, maxMissesTier3 - missed);
        const note =
          remaining > 0
            ? `Đang giữ 400.000đ. Còn được phép thiếu ${remaining} bài nữa trước khi tụt xuống Cấp 2 (300k).`
            : `Nguy cơ tụt học bổng xuống 300k nếu không nộp đủ bài tiếp theo!`;
        return { tier: 'TIER_3', amount: 400000, lossAversionNote: note };
      }

      if (rate >= 70) {
        return {
          tier: 'TIER_2',
          amount: 300000,
          lossAversionNote: `Đang giữ 300.000đ. Nỗ lực nộp đủ các bài tới để nâng hạng lên Cấp 3 (400.000đ)!`,
        };
      }

      if (rate >= 50) {
        return {
          tier: 'TIER_1',
          amount: 200000,
          lossAversionNote: `Đang giữ 200.000đ. Cần nộp thêm bài đúng hạn để vươn lên mốc 300k - 500k.`,
        };
      }
    }

    return {
      tier: 'NONE',
      amount: 0,
      lossAversionNote: `Hiện đạt ${Math.round(rate)}% BTVN. Cần đạt tối thiểu 50% để mở khóa Học bổng Kỷ luật 200k.`,
    };
  }

  /**
   * Executes weekly snapshot freezing for all active classes
   */
  async executeWeeklySnapshot(options?: {
    targetDate?: Date;
    classId?: string;
  }): Promise<SnapshotExecutionResult> {
    const cutoffTime = options?.targetDate ? new Date(options.targetDate) : this.calculateCutoffTime();

    // Query active classes
    const classes = await this.prisma.class.findMany({
      where: {
        status: 'ACTIVE',
        ...(options?.classId ? { id: options.classId } : {}),
      },
      include: {
        assignments: {
          where: {
            status: 'PUBLISHED',
            createdAt: { lte: cutoffTime },
          },
          include: {
            exam: true,
          },
        },
        students: {
          where: {
            status: 'ACTIVE',
          },
          include: {
            student: true,
          },
        },
      },
    });

    let studentsProcessed = 0;
    let snapshotsCreated = 0;

    for (const cls of classes) {
      const totalWeeks = cls.totalWeeks || 10;
      const weekNumber = this.calculateWeekNumber(cls.startDate, cutoffTime, totalWeeks);
      const assignedExams = cls.assignments;
      const assignedExamIds = assignedExams.map((a) => a.examId);
      const hwTotal = assignedExams.length;

      for (const enrollment of cls.students) {
        studentsProcessed++;

        // Ensure parentToken exists on enrollment
        let parentToken = enrollment.parentToken;
        if (!parentToken) {
          parentToken = this.generateParentToken();
          await this.prisma.classStudent.update({
            where: { id: enrollment.id },
            data: { parentToken },
          });
        }

        // 1. Get student submissions submitted before cut-off
        let hwCompleted = 0;
        let streakDays = 0;

        if (assignedExamIds.length > 0) {
          const submissions = await this.prisma.examSubmission.findMany({
            where: {
              studentId: enrollment.studentId,
              examId: { in: assignedExamIds },
              submittedAt: { lte: cutoffTime },
              status: { in: ['SUBMITTED', 'GRADED'] },
            },
            orderBy: { submittedAt: 'desc' },
          });

          hwCompleted = submissions.length;
          streakDays = submissions.length; // Consecutive valid completed submissions
        }

        const hwRate = hwTotal > 0 ? Math.min(100, Math.round((hwCompleted / hwTotal) * 100)) : 100;

        // 2. Attendance rate up to cutoff
        const attendanceRecords = await this.prisma.classAttendance.findMany({
          where: {
            classId: cls.id,
            studentId: enrollment.studentId,
            sessionDate: { lte: cutoffTime },
          },
        });

        let attendanceRate = 100.0;
        if (attendanceRecords.length > 0) {
          const presentOrLate = attendanceRecords.filter(
            (a) => a.status === 'PRESENT' || a.status === 'LATE'
          ).length;
          attendanceRate = Math.round((presentOrLate / attendanceRecords.length) * 100);
        }

        // 3. Scholarship Standing calculation
        const scholarship = this.calculateScholarshipStanding(hwCompleted, hwTotal, attendanceRate);

        // 4. Fetch latest teacher periodic review note if available
        const latestReport = await this.prisma.studentPeriodicReport.findFirst({
          where: {
            classId: cls.id,
            studentId: enrollment.studentId,
          },
          orderBy: { createdAt: 'desc' },
        });

        const teacherNote =
          latestReport?.recommendations ||
          latestReport?.strengths ||
          'Em học tập chăm chỉ và có tinh thần tự giác cao trong tuần.';

        // 5. Calculate 3-axis indicators (Performance, Trajectory, Risk)
        const performanceLevel = classifyPerformanceLevel(hwRate);

        // Fetch previous snapshot to determine trajectory
        const prevSnapshot = weekNumber > 1 ? await this.prisma.weeklySnapshot.findUnique({
          where: {
            classId_studentId_weekNumber: {
              classId: cls.id,
              studentId: enrollment.studentId,
              weekNumber: weekNumber - 1,
            },
          },
          select: { hwRate: true },
        }) : null;
        const trajectory = classifyTrajectory(hwRate, prevSnapshot?.hwRate ?? null);

        // Filter eligible tasks
        const windowContext = {
          windowStart: cls.startDate ?? new Date(0),
          windowEnd: cutoffTime,
        };
        const eligibleTasks: EligibleTask[] = assignedExams
          .filter((a) => isEligibleForScholarship(a, windowContext))
          .map((a) => ({
            assignmentId: a.id,
            examId: a.examId,
            deadline: a.deadline,
          }));

        const completedTaskExamIds = new Set(
          (await this.prisma.examSubmission.findMany({
            where: {
              studentId: enrollment.studentId,
              examId: { in: eligibleTasks.map((t) => t.examId) },
              submittedAt: { lte: cutoffTime },
              status: { in: ['SUBMITTED', 'GRADED'] },
            },
            select: { examId: true },
          })).map((s) => s.examId)
        );

        const currentTierThreshold = TIER_THRESHOLDS[scholarship.tier] ?? 0;
        const riskResult = evaluateStudentRisk({
          eligibleTasks,
          completedTaskExamIds,
          currentTierThreshold,
          now: cutoffTime,
          weekDeadline: cutoffTime,
        });

        // 6. Upsert WeeklySnapshot
        await this.prisma.weeklySnapshot.upsert({
          where: {
            classId_studentId_weekNumber: {
              classId: cls.id,
              studentId: enrollment.studentId,
              weekNumber,
            },
          },
          update: {
            cutoffAt: cutoffTime,
            hwCompleted,
            hwTotal,
            hwRate,
            streakDays,
            attendanceRate,
            scholarshipTier: scholarship.tier,
            scholarshipAmount: scholarship.amount,
            lossAversionNote: scholarship.lossAversionNote,
            performanceLevel,
            trajectory,
            riskLevel: riskResult.riskLevel,
            riskReason: riskResult.riskReason,
            teacherNote,
          },
          create: {
            classId: cls.id,
            studentId: enrollment.studentId,
            weekNumber,
            cutoffAt: cutoffTime,
            hwCompleted,
            hwTotal,
            hwRate,
            streakDays,
            attendanceRate,
            scholarshipTier: scholarship.tier,
            scholarshipAmount: scholarship.amount,
            lossAversionNote: scholarship.lossAversionNote,
            performanceLevel,
            trajectory,
            riskLevel: riskResult.riskLevel,
            riskReason: riskResult.riskReason,
            teacherNote,
          },
        });

        snapshotsCreated++;
      }
    }

    return {
      classesProcessed: classes.length,
      studentsProcessed,
      snapshotsCreated,
      cutoffTime,
    };
  }
}
