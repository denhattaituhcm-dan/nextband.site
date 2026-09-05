/**
 * Radar Service — NextBand LBOS
 *
 * Kết nối Risk Engine (pure logic) với database thực tế.
 * Service này làm đúng 1 việc: query dữ liệu → chuẩn bị input → gọi evaluateStudentRisk().
 *
 * Không có cache, không có scheduler — on-demand per request.
 * Dashboard luôn có thể recalculate.
 */

import { PrismaClient } from '@prisma/client';
import {
  evaluateStudentRisk,
  isEligibleForScholarship,
  classifyPerformanceLevel,
  classifyTrajectory,
  TIER_THRESHOLDS,
  type RiskLevel,
  type PerformanceLevel,
  type Trajectory,
  type EligibleTask,
} from './risk-engine.service.js';
import { NotFoundError } from './authorization.service.js';

export interface AtRiskStudentDTO {
  studentId: string;
  studentName: string;
  studentAvatarUrl: string | null;

  // 3 trục độc lập
  riskLevel: RiskLevel;
  performanceLevel: PerformanceLevel;
  trajectory: Trajectory;

  // Chi tiết để teacher hành động
  openTaskCount: number;
  requiredAdditionalTasks: number;
  currentHwRate: number;
  worstCaseRate: number;
  currentScholarshipTier: string;

  riskReason: string | null;
  parentToken: string | null;
}

export class RadarService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Đánh giá tất cả học sinh đang ACTIVE trong class và trả về danh sách có rủi ro.
   * Chỉ trả về học sinh có riskLevel WATCH / AT_RISK / CRITICAL.
   */
  async getAtRiskStudents(classId: string): Promise<{
    classId: string;
    evaluatedAt: string;
    watchCount: number;
    atRiskCount: number;
    criticalCount: number;
    students: AtRiskStudentDTO[];
  }> {
    // 1. Verify class exists
    const cls = await this.prisma.class.findUnique({
      where: { id: classId },
      select: {
        id: true,
        name: true,
        startDate: true,
        totalWeeks: true,
        status: true,
      },
    });

    if (!cls) throw new NotFoundError('Lớp học không tồn tại.');

    const now = new Date();

    // Cut-off window: class.startDate → current Sunday 18:15
    // Dùng snapshot service logic để tính weekDeadline đúng
    const weekDeadline = calculateCurrentCutoff(now);
    const windowStart = cls.startDate ?? new Date(0);
    const windowContext = { windowStart, windowEnd: weekDeadline };

    // 2. Lấy active students + parent token
    const enrollments = await this.prisma.classStudent.findMany({
      where: { classId, status: 'ACTIVE' },
      include: {
        student: {
          select: {
            userId: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (enrollments.length === 0) {
      return emptyResult(classId);
    }

    // 3. Lấy tất cả assignments của class (PUBLISHED)
    const allAssignments = await this.prisma.classExamAssignment.findMany({
      where: { classId, status: 'PUBLISHED' },
      select: { id: true, examId: true, deadline: true },
    });

    // Lọc eligible tasks một lần cho toàn class
    const eligibleTasks: EligibleTask[] = allAssignments
      .filter((a) => isEligibleForScholarship(a, windowContext))
      .map((a) => ({
        assignmentId: a.id,
        examId: a.examId,
        deadline: a.deadline,
      }));

    const eligibleExamIds = eligibleTasks.map((t) => t.examId);

    // 4. Lấy submissions của tất cả student trong class (batch — 1 query)
    const allSubmissions =
      eligibleExamIds.length > 0
        ? await this.prisma.examSubmission.findMany({
            where: {
              examId: { in: eligibleExamIds },
              studentId: { in: enrollments.map((e) => e.studentId) },
              status: { in: ['SUBMITTED', 'GRADED'] },
              submittedAt: { lte: weekDeadline },
            },
            select: { studentId: true, examId: true },
          })
        : [];

    // 5. Lấy latest WeeklySnapshot để tính trajectory (batch)
    const latestSnapshots = await this.prisma.weeklySnapshot.findMany({
      where: {
        classId,
        studentId: { in: enrollments.map((e) => e.studentId) },
      },
      orderBy: { weekNumber: 'desc' },
      distinct: ['studentId'],
      select: {
        studentId: true,
        hwRate: true,
        weekNumber: true,
        scholarshipTier: true,
      },
    });

    // Lấy snapshot của tuần trước để so sánh trajectory
    const prevWeekNumbers = latestSnapshots.map((s) => s.weekNumber - 1).filter((w) => w > 0);
    const prevSnapshots =
      prevWeekNumbers.length > 0
        ? await this.prisma.weeklySnapshot.findMany({
            where: {
              classId,
              studentId: { in: enrollments.map((e) => e.studentId) },
              weekNumber: { in: prevWeekNumbers },
            },
            select: { studentId: true, hwRate: true, weekNumber: true },
          })
        : [];

    // Build lookup maps
    const submissionsByStudent = new Map<string, Set<string>>();
    for (const sub of allSubmissions) {
      if (!submissionsByStudent.has(sub.studentId)) {
        submissionsByStudent.set(sub.studentId, new Set());
      }
      submissionsByStudent.get(sub.studentId)!.add(sub.examId);
    }

    const latestSnapshotByStudent = new Map(latestSnapshots.map((s) => [s.studentId, s]));
    const prevSnapshotByStudent = new Map(
      prevSnapshots.map((s) => [`${s.studentId}-${s.weekNumber}`, s])
    );

    // 6. Evaluate risk per student
    const atRiskStudents: AtRiskStudentDTO[] = [];

    for (const enrollment of enrollments) {
      const studentId = enrollment.studentId;
      const completedExamIds = submissionsByStudent.get(studentId) ?? new Set<string>();

      const latestSnap = latestSnapshotByStudent.get(studentId);
      const currentTier = latestSnap?.scholarshipTier ?? 'NONE';
      const currentTierThreshold = TIER_THRESHOLDS[currentTier] ?? 0;

      // Current hw rate (từ snapshot hoặc tính trực tiếp)
      const completedCount = eligibleTasks.filter((t) => completedExamIds.has(t.examId)).length;
      const currentHwRate =
        eligibleTasks.length > 0 ? (completedCount / eligibleTasks.length) * 100 : 100;

      // Trajectory so với tuần trước
      const prevSnapKey = latestSnap
        ? `${studentId}-${latestSnap.weekNumber - 1}`
        : null;
      const prevSnap = prevSnapKey ? prevSnapshotByStudent.get(prevSnapKey) : null;
      const trajectory = classifyTrajectory(currentHwRate, prevSnap?.hwRate ?? null);

      const performanceLevel = classifyPerformanceLevel(currentHwRate);

      const riskResult = evaluateStudentRisk({
        eligibleTasks,
        completedTaskExamIds: completedExamIds,
        currentTierThreshold,
        now,
        weekDeadline,
      });

      // Chỉ đưa vào radar nếu có risk
      if (riskResult.riskLevel === 'NONE') continue;

      atRiskStudents.push({
        studentId,
        studentName: enrollment.student.fullName ?? 'Học viên',
        studentAvatarUrl: enrollment.student.avatarUrl ?? null,
        riskLevel: riskResult.riskLevel,
        performanceLevel,
        trajectory,
        openTaskCount: riskResult.openTasks.length,
        requiredAdditionalTasks: riskResult.requiredAdditionalTasks,
        currentHwRate: Math.round(currentHwRate),
        worstCaseRate: Math.round(riskResult.worstCaseRate),
        currentScholarshipTier: currentTier,
        riskReason: riskResult.riskReason,
        parentToken: enrollment.parentToken ?? null,
      });
    }

    // Sắp xếp: CRITICAL trước, AT_RISK, WATCH
    const RISK_ORDER: Record<string, number> = { CRITICAL: 0, AT_RISK: 1, WATCH: 2 };
    atRiskStudents.sort(
      (a, b) => (RISK_ORDER[a.riskLevel] ?? 3) - (RISK_ORDER[b.riskLevel] ?? 3)
    );

    return {
      classId,
      evaluatedAt: now.toISOString(),
      watchCount: atRiskStudents.filter((s) => s.riskLevel === 'WATCH').length,
      atRiskCount: atRiskStudents.filter((s) => s.riskLevel === 'AT_RISK').length,
      criticalCount: atRiskStudents.filter((s) => s.riskLevel === 'CRITICAL').length,
      students: atRiskStudents,
    };
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function emptyResult(classId: string) {
  return {
    classId,
    evaluatedAt: new Date().toISOString(),
    watchCount: 0,
    atRiskCount: 0,
    criticalCount: 0,
    students: [],
  };
}

/**
 * Tính cut-off hiện tại: Sunday gần nhất (quá khứ hoặc hiện tại) lúc 18:15.
 * Mirror của SnapshotService.calculateCutoffTime() — không import để tránh circular dep.
 */
function calculateCurrentCutoff(now: Date): Date {
  const d = new Date(now);
  const day = d.getDay(); // 0 = Sunday
  const cutoff = new Date(d);
  cutoff.setDate(d.getDate() - (day === 0 ? 0 : day));
  cutoff.setHours(18, 15, 0, 0);
  return cutoff;
}
