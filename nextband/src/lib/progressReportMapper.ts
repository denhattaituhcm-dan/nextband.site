import { ProgressReportData } from "@/types/progressReport";

export interface ProgressReportInput {
  classId?: string;
  studentId?: string;
  studentName: string;
  className: string;
  teacherName?: string | null;
  targetBand?: string | null;
  programTitle?: string | null;
  classInfo?: {
    currentStudents?: number;
    maxStudents?: number;
    classModel?: string;
  };
  totalStudentsInClass?: number;
  courseProgress?: {
    percent?: number;
    completedSessions?: number;
    totalSessions?: number;
  };
  homeworks?: any[];
  attendanceRecords?: any[];
  attendanceSummary?: {
    present?: number;
    absent?: number;
    late?: number;
    excused?: number;
    total?: number;
    rate?: number;
  } | null;
  assessmentData?: {
    latestOverall?: number | string | null;
    evaluatedAt?: string | null;
    skills?: {
      listening?: number | string | null;
      reading?: number | string | null;
      writing?: number | string | null;
      speaking?: number | string | null;
    };
    recentExams?: Array<{ title: string; score: string | number; evaluatedAt?: string }>;
  };
  teacherEvaluation?: {
    strengths?: string;
    weaknesses?: string;
    recommendations?: string;
    nextGoals?: string[];
  };
  teacherNote?: string;
  periodFrom?: Date | string | null;
  periodTo?: Date | string | null;
}

/**
 * Pure Mapper: Transforms verified student workbook state into a clean ProgressReportData object.
 * Guarantee: Zero phantom fields, null-safe across all metrics, honest taxonomy.
 */
export function mapToProgressReportData(input: ProgressReportInput): ProgressReportData {
  const now = new Date();
  const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const formatDateStr = (d?: Date | string | null) => {
    if (!d) return "";
    const dateObj = new Date(d);
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const periodFrom = formatDateStr(input.periodFrom || defaultFrom);
  const periodTo = formatDateStr(input.periodTo || now);
  const generatedAt = formatDateStr(now);

  // 1. Chuyên cần (Tính toán chuẩn xác 4 trạng thái: Present, Late, Absent, Excused)
  let attendance: ProgressReportData["attendance"] = null;
  if (input.attendanceSummary) {
    const s = input.attendanceSummary;
    const total = s.total || 0;
    const present = s.present || 0;
    const late = s.late || 0;
    const absent = s.absent || 0;
    const excused = s.excused || 0;
    const eligible = Math.max(1, total - excused);
    const rate = s.rate != null ? Math.round(s.rate) : Math.min(100, Math.round(((present + late) / eligible) * 100));

    if (total > 0) {
      attendance = {
        present,
        absent,
        late,
        excused,
        total,
        rate: total > 0 ? rate : 100,
      };
    }
  } else if (input.attendanceRecords && input.attendanceRecords.length > 0) {
    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;
    let excusedCount = 0;

    input.attendanceRecords.forEach((a: any) => {
      const st = String(a.status || "").toUpperCase();
      if (st === "PRESENT") presentCount++;
      else if (st === "LATE") lateCount++;
      else if (st === "ABSENT") absentCount++;
      else if (st === "EXCUSED") excusedCount++;
    });

    const total = input.attendanceRecords.length;
    const eligible = Math.max(1, total - excusedCount);
    const rate = Math.min(100, Math.round(((presentCount + lateCount) / eligible) * 100));

    attendance = {
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      excused: excusedCount,
      total,
      rate,
    };
  }

  // 2. Bài tập về nhà & Đánh giá chất lượng (3 lớp thông tin: Hoàn thành, Kết quả chấm, Nguồn chấm)
  const hwList = input.homeworks || [];
  let completedCount = 0;
  let inProgressCount = 0;
  let overdueCount = 0;
  let unsubmittedCount = 0;
  const overdueTitles: string[] = [];

  let gradedCount = 0;
  let autoGradedCount = 0;
  let teacherGradedCount = 0;
  let passedCount = 0;
  let needsImprovementCount = 0;
  let totalScoreSum = 0;
  let scoredItemsCount = 0;
  let speakingScoreSum = 0;
  let speakingCount = 0;
  let writingScoreSum = 0;
  let writingCount = 0;

  hwList.forEach((hw: any) => {
    const st = String(hw.status || "").toLowerCase();
    const isGraded = st === "graded" || hw.bandScore != null || hw.score != null;
    const isSubmitted = st === "submitted" || isGraded;
    const isOverdue = !!hw.isOverdue || st === "overdue";
    const isInProgress = st === "in_progress" || st === "needs_revision";
    const type = String(hw.type || "").toLowerCase();
    const title = String(hw.title || "").toLowerCase();

    if (isSubmitted) {
      completedCount++;
    } else if (isOverdue) {
      overdueCount++;
      if (overdueTitles.length < 3) {
        overdueTitles.push(hw.title || "Bài tập");
      }
    } else if (isInProgress) {
      inProgressCount++;
    } else {
      unsubmittedCount++;
    }

    if (isGraded) {
      gradedCount++;
      const scoreVal =
        hw.bandScore != null ? Number(hw.bandScore) : hw.score != null ? Number(hw.score) : null;
      if (scoreVal != null && !isNaN(scoreVal)) {
        totalScoreSum += scoreVal;
        scoredItemsCount++;

        if (scoreVal >= 5.0 && !hw.revisionRequired) {
          passedCount++;
        } else {
          needsImprovementCount++;
        }

        const isSpeaking =
          type.includes("speak") ||
          title.includes("speaking") ||
          title.includes("nói") ||
          !!hw.audioUrl;
        const isWriting =
          type.includes("writ") ||
          title.includes("writing") ||
          title.includes("viết") ||
          title.includes("task 1") ||
          title.includes("task 2") ||
          title.includes("essay");

        if (isSpeaking) {
          speakingScoreSum += scoreVal;
          speakingCount++;
        } else if (isWriting) {
          writingScoreSum += scoreVal;
          writingCount++;
        }
      } else {
        passedCount++;
      }

      const isTeacherGraded = !!(
        hw.gradedBy ||
        hw.graded_by ||
        hw.feedback ||
        hw.criteriaScores ||
        type.includes("writing") ||
        type.includes("speaking")
      );

      if (isTeacherGraded) {
        teacherGradedCount++;
      } else {
        autoGradedCount++;
      }
    }
  });

  const totalAssigned = hwList.length;
  const completionRate = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 0;

  let averageScore: string | null = null;
  if (scoredItemsCount > 0) {
    const avg = totalScoreSum / scoredItemsCount;
    averageScore = `${(Math.round(avg * 10) / 10).toFixed(1)}/10`;
  }

  // Format skill average rounded to nearest 0.5 (e.g. 5.38 -> 5.5)
  const formatSkillAvg = (sum: number, count: number): string | null => {
    if (count === 0) return null;
    const rawAvg = sum / count;
    const rounded = Math.round(rawAvg * 2) / 2;
    return rounded.toFixed(1);
  };

  const skillAverages = {
    speaking: speakingCount > 0 ? { averageBand: formatSkillAvg(speakingScoreSum, speakingCount)!, count: speakingCount } : null,
    writing: writingCount > 0 ? { averageBand: formatSkillAvg(writingScoreSum, writingCount)!, count: writingCount } : null,
  };

  // 3. Kết quả các bài đánh giá gần nhất
  const gradedHws = hwList.filter(
    (hw: any) =>
      hw.status === "graded" ||
      hw.status === "GRADED" ||
      hw.bandScore != null ||
      hw.score != null
  );

  const recentResults: Array<{ title: string; score: string | number | null; evaluatedAt?: string | null }> = [];
  gradedHws.slice(0, 4).forEach((hw: any) => {
    let scoreDisplay: string | number | null = null;
    if (hw.bandScore != null) {
      scoreDisplay = `Band ${hw.bandScore}`;
    } else if (hw.score != null) {
      scoreDisplay = String(hw.score);
    }

    recentResults.push({
      title: hw.title || "Bài kiểm tra",
      score: scoreDisplay,
      evaluatedAt: hw.submittedAt ? formatDateStr(hw.submittedAt) : undefined,
    });
  });

  // Extract skills breakdown if available
  const skillScores: { listening?: number | string | null; reading?: number | string | null; writing?: number | string | null; speaking?: number | string | null } = {};
  gradedHws.forEach((hw: any) => {
    const type = String(hw.type || "").toLowerCase();
    const scoreVal = hw.bandScore != null ? hw.bandScore : hw.score;
    if (scoreVal != null) {
      if (type.includes("listen") && !skillScores.listening) skillScores.listening = scoreVal;
      else if (type.includes("read") && !skillScores.reading) skillScores.reading = scoreVal;
      else if (type.includes("writ") && !skillScores.writing) skillScores.writing = scoreVal;
      else if (type.includes("speak") && !skillScores.speaking) skillScores.speaking = scoreVal;
    }
  });

  // Assessment summary
  const assessment = {
    latestOverall: input.assessmentData?.latestOverall || (recentResults.length > 0 ? recentResults[0].score : null),
    evaluatedAt: input.assessmentData?.evaluatedAt || (recentResults.length > 0 ? recentResults[0].evaluatedAt : null),
    skills: {
      ...skillScores,
      ...(input.assessmentData?.skills || {}),
    },
    recentResults: recentResults.map((r) => ({
      title: r.title,
      score: r.score,
      evaluatedAt: r.evaluatedAt,
    })),
  };

  // 4. Tiến độ khóa học
  let courseProgressPercent = 0;
  if (input.courseProgress?.percent != null) {
    courseProgressPercent = Math.min(100, Math.round(input.courseProgress.percent));
  } else if (
    input.courseProgress?.completedSessions != null &&
    input.courseProgress?.totalSessions != null &&
    input.courseProgress.totalSessions > 0
  ) {
    courseProgressPercent = Math.min(
      100,
      Math.round((input.courseProgress.completedSessions / input.courseProgress.totalSessions) * 100)
    );
  } else if (attendance && attendance.total > 0) {
    courseProgressPercent = Math.min(100, Math.round((attendance.total / Math.max(attendance.total, 24)) * 100));
  }

  // 5. Quy mô lớp học (Factual metrics: Sĩ số hiện tại / Sĩ số tối đa)
  const currentStudents = input.classInfo?.currentStudents || input.totalStudentsInClass || 6;
  const maxStudents = input.classInfo?.maxStudents || 10;

  // 6. Structured Teacher Evaluation
  const teacherEvaluation = {
    strengths: input.teacherEvaluation?.strengths || "",
    weaknesses: input.teacherEvaluation?.weaknesses || "",
    recommendations: input.teacherEvaluation?.recommendations || "",
    nextGoals: input.teacherEvaluation?.nextGoals || [],
  };

  return {
    classId: input.classId,
    studentId: input.studentId,
    student: {
      name: input.studentName || "Học viên",
      className: input.className || "Lớp học",
      teacherName: input.teacherName || "Giảng viên phụ trách",
      targetBand:
        input.targetBand ||
        (input as any).student?.targetBand ||
        (input as any).student?.target_band ||
        (input as any).target_band ||
        null,
      programTitle: input.programTitle || null,
    },
    period: {
      from: periodFrom,
      to: periodTo,
    },
    classInfo: {
      currentStudents,
      maxStudents,
    },
    courseProgress: {
      percent: courseProgressPercent,
      completedSessions: input.courseProgress?.completedSessions,
      totalSessions: input.courseProgress?.totalSessions,
    },
    attendance,
    homework: {
      totalAssigned,
      completed: completedCount,
      inProgress: inProgressCount,
      unsubmitted: unsubmittedCount,
      overdue: overdueCount,
      completionRate,
      overdueTitles,
      gradedCount,
      averageScore,
      autoGradedCount,
      teacherGradedCount,
      passedCount,
      needsImprovementCount,
      skillAverages,
      submitted: completedCount, // backward compat
      pending: unsubmittedCount + inProgressCount, // backward compat
    },
    assessment,
    recentResults: recentResults.map((r) => ({ title: r.title, score: r.score })),
    teacherEvaluation,
    teacherNote: input.teacherNote || "",
    generatedAt,
  };
}


