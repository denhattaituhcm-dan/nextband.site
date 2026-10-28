import { API_BASE_URL, getAuthToken } from "../client";

export interface AtRiskStudent {
  studentId: string;
  studentName: string;
  studentAvatarUrl: string | null;
  riskLevel: 'NONE' | 'WATCH' | 'AT_RISK' | 'CRITICAL';
  performanceLevel: 'LOW' | 'ON_TRACK' | 'STRONG';
  trajectory: 'RISING' | 'STABLE' | 'DECLINING';
  openTaskCount: number;
  requiredAdditionalTasks: number;
  currentHwRate: number;
  worstCaseRate: number;
  currentScholarshipTier: string;
  riskReason: string | null;
  parentToken: string | null;
}

export interface RadarData {
  classId: string;
  evaluatedAt: string;
  watchCount: number;
  atRiskCount: number;
  criticalCount: number;
  students: AtRiskStudent[];
}

export const radarApi = {
  async getAtRiskStudents(classId: string): Promise<RadarData> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/classes/${classId}/radar/at-risk`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể tải danh sách cảnh báo");
    }
    const json = await res.json();
    return json.data;
  },
};
