import { API_BASE_URL, getAuthToken, handleApiResponse } from "../client";

export const teachersApi = {
  async getStudentPedagogicalProfile(studentId: string): Promise<{
    student: {
      id: string;
      userId: string;
      fullName: string;
      email: string;
    };
    profile: {
      studentId: string;
      overallStatus: "NEEDS_ATTENTION" | "ON_TRACK" | "INSUFFICIENT_DATA";
      overallSummary: string;
      skillsRequiringAttention: Array<{
        skillId: string;
        skillName: string;
        macroSkill: string;
        status: string;
        statusLabel: string;
        accuracyText: string;
        evidenceCount: number;
        isStableObservation: boolean;
        frequentMistake?: string;
        actionTip?: string;
      }>;
      progressingSkills: Array<{
        skillId: string;
        skillName: string;
        macroSkill: string;
        status: string;
        statusLabel: string;
        accuracyText: string;
        evidenceCount: number;
        isStableObservation: boolean;
        frequentMistake?: string;
        actionTip?: string;
      }>;
      insufficientDataSkills: Array<{
        skillId: string;
        skillName: string;
        macroSkill: string;
        status: string;
        statusLabel: string;
        accuracyText: string;
        evidenceCount: number;
        isStableObservation: boolean;
      }>;
      recentMistakes: Array<{
        errorCode: string;
        errorName: string;
        description: string;
        evidenceSnippet?: string | null;
      }>;
      generatedAt: string;
    };
  }> {
    const token = await getAuthToken();
    const res = await fetch(
      `${API_BASE_URL}/teachers/students/${encodeURIComponent(studentId)}/pedagogical-profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const json = await handleApiResponse<{ status: string; data: any }>(
      res,
      "Không thể tải hồ sơ nhận định sư phạm của học sinh"
    );
    return json.data;
  },
};
