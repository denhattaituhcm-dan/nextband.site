/**
 * Canonical React Query Keys Factory for NextBand LMS
 * Provides centralized, hierarchical query key management for predictable cache invalidation.
 */

export const submissionKeys = {
  all: ["submissions"] as const,
  lists: () => [...submissionKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...submissionKeys.lists(), filters] as const,
  details: () => [...submissionKeys.all, "detail"] as const,
  detail: (id: string) => [...submissionKeys.details(), id] as const,
  siblings: (examId?: string, studentId?: string) =>
    [...submissionKeys.all, "siblings", examId, studentId] as const,
  kpis: (studentId?: string) => [...submissionKeys.all, "kpis", studentId] as const,
  profileSubmissions: (studentId?: string) =>
    [...submissionKeys.all, "profile", studentId] as const,
  latestByExam: (examId?: string) =>
    [...submissionKeys.all, "latest-by-exam", examId] as const,
};

export const assessmentKeys = {
  all: ["assessments"] as const,
  sessions: () => [...assessmentKeys.all, "session"] as const,
  session: (id: string) => [...assessmentKeys.sessions(), id] as const,
  results: () => [...assessmentKeys.all, "result"] as const,
  result: (id: string) => [...assessmentKeys.results(), id] as const,
  adminList: (filters?: Record<string, any>) =>
    [...assessmentKeys.all, "admin-list", filters] as const,
  adminDetail: (id: string) =>
    [...assessmentKeys.all, "admin-detail", id] as const,
};

export const examKeys = {
  all: ["exams"] as const,
  detail: (id: string) => [...examKeys.all, "detail", id] as const,
  sections: (examId: string) => [...examKeys.all, "sections", examId] as const,
};
