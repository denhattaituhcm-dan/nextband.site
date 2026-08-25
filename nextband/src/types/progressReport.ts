/**
 * Canonical Progress Report Data Types
 * Strict Contract: Every field is verified and nullable if absent in DB.
 * Zero speculative data (no fake 4-skill bands, no fake certificates).
 */

export interface ProgressReportData {
  classId?: string;
  studentId?: string;

  student: {
    name: string;
    className: string;
    teacherName: string;
    targetBand?: string | null;
    programTitle?: string | null;
  };

  period: {
    from: string; // DD/MM/YYYY
    to: string;   // DD/MM/YYYY
  };

  // Thông tin quy mô lớp học
  classInfo?: {
    currentStudents: number;
    maxStudents: number;
    classModel?: string;
  };

  // Tiến độ khóa học
  courseProgress?: {
    percent: number;
    completedSessions?: number;
    totalSessions?: number;
  };

  // Rendered ONLY if attendance records exist in the database
  attendance?: {
    present: number;
    absent: number;
    late: number;
    excused: number;
    total: number;
    rate: number; // 0 - 100%
  } | null;

  homework: {
    totalAssigned: number;
    completed: number;      // submitted + graded
    inProgress: number;     // actively working on it
    unsubmitted: number;    // not yet submitted
    overdue: number;        // past deadline
    completionRate: number; // % completed / totalAssigned
    overdueTitles: string[];

    // Chất lượng bài làm & Nguồn chấm điểm (Auto vs Teacher)
    gradedCount: number;
    averageScore: number | string | null; // e.g. "7.5/10" or "Band 6.0"
    autoGradedCount: number;              // Trắc nghiệm, Reading, Listening
    teacherGradedCount: number;           // Writing, Speaking do giáo viên chấm
    passedCount: number;                  // Số bài đạt chuẩn
    needsImprovementCount: number;        // Số bài cần sửa / cải thiện
    submitted?: number;                   // for backward compatibility
    pending?: number;                     // for backward compatibility
  };

  assessment?: {
    latestOverall?: number | string | null;
    evaluatedAt?: string | null;
    skills?: {
      listening?: number | string | null;
      reading?: number | string | null;
      writing?: number | string | null;
      speaking?: number | string | null;
    };
    recentResults: Array<{
      title: string;
      score: number | string | null;
      evaluatedAt?: string | null;
    }>;
  };

  // Backward compatibility alias
  recentResults: Array<{
    title: string;
    score: number | string | null;
  }>;

  // Structured Teacher Evaluation
  teacherEvaluation?: {
    strengths: string;
    weaknesses: string;
    recommendations: string;
    nextGoals: string[];
  };

  // Backward compatibility alias
  teacherNote?: string;
  generatedAt: string; // DD/MM/YYYY
}
