/**
 * Centralized Route Registry & Contract for NextBand LMS
 * Prevents route string drift and eliminates broken singular/plural URL inconsistencies.
 */

export const routes = {
  // Student Portal Routes
  student: {
    dashboard: () => "/app",
    analytics: () => "/app/analytics",
    submissions: () => "/app/submissions",
    submission: (id: string) => `/app/submissions/${encodeURIComponent(id)}`,
    profile: () => "/app/profile",
    reconstruction: () => "/app/reconstruction",
    course: (slug: string) => `/app/courses/${encodeURIComponent(slug)}`,
    lesson: (classId: string, lessonId?: string) =>
      lessonId
        ? `/app/classes/${encodeURIComponent(classId)}/lessons/${encodeURIComponent(lessonId)}`
        : `/app/classes/${encodeURIComponent(classId)}/lessons`,
  },

  // Live Exam / Learning Loop Routes
  exam: {
    take: (examId: string, options?: { submissionId?: string; isRevision?: boolean }) => {
      const base = `/exam/${encodeURIComponent(examId)}`;
      const params = new URLSearchParams();
      if (options?.submissionId) params.set("submissionId", options.submissionId);
      if (options?.isRevision) params.set("isRevision", "true");
      const qs = params.toString();
      return qs ? `${base}?${qs}` : base;
    },
    review: (examId: string, submissionId: string) =>
      `/exam/${encodeURIComponent(examId)}/review?submissionId=${encodeURIComponent(submissionId)}`,
  },

  // Diagnostic Assessment & Referral (ARIS) Routes
  assessment: {
    home: () => "/assessment",
    take: (sessionId: string) => `/assessment/take/${encodeURIComponent(sessionId)}`,
    result: (sessionId: string) => `/assessment/result/${encodeURIComponent(sessionId)}`,
  },
  buddy: (ref?: string) => (ref ? `/buddy?ref=${encodeURIComponent(ref)}` : "/buddy"),

  // Teacher & Admin Management Routes
  admin: {
    dashboard: () => "/admin",
    checkAttempt: () => "/admin/check-attempt",
    grade: (submissionId: string) => `/admin/submission/${encodeURIComponent(submissionId)}/grade`,
    assessments: () => "/admin/assessments",
    classes: () => "/admin/classes",
    courses: () => "/admin/courses",
  },
} as const;
