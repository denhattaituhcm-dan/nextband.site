import { API_BASE_URL, authenticatedFetch, fetchWithResilience } from "../client";

export interface ParentReportData {
  student: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    targetBand?: string | null;
    className: string;
    teacherName: string;
    parentName?: string | null;
    parentPhone?: string | null;
  };
  classInfo: {
    id: string;
    name: string;
    currentWeek: number;
    totalWeeks: number;
    startDate?: string | null;
    endDate?: string | null;
  };
  snapshot: {
    weekNumber: number;
    hwCompleted: number;
    hwTotal: number;
    hwRate: number;
    streakDays: number;
    attendanceRate: number;
    scholarshipTier: string;
    scholarshipAmount: number;
    lossAversionNote?: string | null;
    teacherNote?: string | null;
    parentEncouraged: boolean;
    cutoffAt: string;
  };
  teacherEvaluation: {
    strengths: string;
    weaknesses: string;
    recommendations: string;
  };
  canReEnroll: boolean;
  hotlinePhone: string;
  academicDiagnostic?: {
    overall: {
      evidenceCount: number;
      confidence: string;
      primaryVulnerability?: string;
      primaryStrength?: string;
    };
    listening: {
      skill: string;
      overallAccuracy: number;
      totalQuestions: number;
      confidence: string;
      vulnerabilities: Array<{
        questionType: string;
        label: string;
        accuracy: number;
        evidenceCount: number;
        severity: string;
        diagnosisVi: string;
        trend?: {
          previousAccuracy: number;
          currentAccuracy: number;
          delta: number;
          direction: string;
        };
      }>;
      strengths: Array<{
        questionType: string;
        label: string;
        accuracy: number;
        evidenceCount: number;
        severity: string;
      }>;
    };
    reading: {
      skill: string;
      overallAccuracy: number;
      totalQuestions: number;
      confidence: string;
      vulnerabilities: Array<{
        questionType: string;
        label: string;
        accuracy: number;
        evidenceCount: number;
        severity: string;
        diagnosisVi: string;
        trend?: {
          previousAccuracy: number;
          currentAccuracy: number;
          delta: number;
          direction: string;
        };
      }>;
      strengths: Array<{
        questionType: string;
        label: string;
        accuracy: number;
        evidenceCount: number;
        severity: string;
      }>;
    };
    language?: {
      vocabulary: Array<{
        word: string;
        coreIdea: string;
        failedReviews: number;
        masteryScore: number;
        severity: string;
      }>;
      grammarNotes: string[];
    };
  } | null;
}

export const parentHubApi = {
  async getParentReport(token: string): Promise<ParentReportData> {
    const res = await fetchWithResilience(`${API_BASE_URL}/public/parent-reports/${token}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể tải báo cáo phụ huynh");
    }
    const json = await res.json();
    return json.data;
  },

  async cheerStudent(token: string): Promise<{ success: boolean; message: string }> {
    const res = await fetchWithResilience(`${API_BASE_URL}/public/parent-reports/${token}/cheer`, {
      method: "POST",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể gửi lời động viên");
    }
    return res.json();
  },

  async requestReEnrollment(payload: {
    token?: string;
    classId?: string;
    studentId?: string;
    parentPhone?: string;
    scholarshipAmount?: number;
  }): Promise<{
    leadId: string;
    hotlinePhone: string;
    zaloDeepLink: string;
    prefilledText: string;
  }> {
    const res = await fetchWithResilience(`${API_BASE_URL}/public/re-enrollment/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể gửi yêu cầu tái tục");
    }
    const json = await res.json();
    return json.data;
  },

  async regenerateParentToken(classId: string, studentId: string): Promise<string> {
    const res = await authenticatedFetch(
      `${API_BASE_URL}/classes/${classId}/students/${studentId}/parent-token/regenerate`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể cấp lại token");
    }
    const json = await res.json();
    return json.data.parentToken;
  },
};
