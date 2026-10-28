import { API_BASE_URL, getAuthToken } from "../client";

export const interventionsApi = {
  listByStudent: async (studentId: string) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/interventions/student/${studentId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể tải nhật ký can thiệp học vụ");
    }
    const result = await response.json();
    return result.data || [];
  },

  create: async (payload: {
    studentId: string;
    classId?: string | null;
    category?: string;
    title?: string | null;
    notes: string;
    actionTaken?: string | null;
    agreedPlan?: string | null;
    followUpDate?: string | null;
    status?: string;
    outcome?: string | null;
  }) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/interventions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể tạo ghi chú can thiệp");
    }
    const result = await response.json();
    return result.data;
  },

  update: async (id: string, payload: {
    category?: string;
    title?: string | null;
    notes?: string;
    actionTaken?: string | null;
    agreedPlan?: string | null;
    followUpDate?: string | null;
    status?: string;
    outcome?: string | null;
  }) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/interventions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể cập nhật nhật ký can thiệp");
    }
    const result = await response.json();
    return result.data;
  },

  transition: async (
    id: string,
    payload: {
      status: string;
      outcome?: string | null;
      notes?: string;
      actionTaken?: string | null;
    }
  ) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/interventions/${id}/transition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể chuyển trạng thái can thiệp");
    }
    const result = await response.json();
    return result.data;
  },

  delete: async (id: string) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/interventions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || err.message || "Không thể xóa ghi chú can thiệp");
    }
    return response.json();
  },
};
