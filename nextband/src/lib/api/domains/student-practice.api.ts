import { API_BASE_URL, getAuthToken, handleApiResponse } from "../client";

export const studentPracticeApi = {
  async getWeakZone(): Promise<any> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/users/me/weak-zone`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tải thông tin Weak Zone"
    );
    return json.data;
  },

  async getErrorBank(): Promise<any[]> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/users/me/error-bank`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const json = await handleApiResponse<{ success: boolean; data: any[] }>(
      res,
      "Không thể tải Error Bank"
    );
    return json.data || [];
  },

  async generateWeakZoneDrill(questionType?: string, count = 6): Promise<any> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/users/me/weak-zone/drill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ questionType, count }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tạo bài luyện tập tức thì"
    );
    return json.data;
  },

  async submitDrill(questionType: string, answers: Record<string, string>): Promise<any> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/users/me/weak-zone/drill/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ questionType, answers }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể nộp bài và chấm điểm Mini Drill"
    );
    return json.data;
  },

  async retrySingleError(questionId: string, answer: string): Promise<any> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/users/me/error-bank/${encodeURIComponent(questionId)}/retry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ answer }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể gửi câu trả lời thử lại"
    );
    return json.data;
  },
};
