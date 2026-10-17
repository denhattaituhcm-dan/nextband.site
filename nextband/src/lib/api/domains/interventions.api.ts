import { supabase } from "../../supabase";
import { API_BASE_URL } from "../client";

export const interventionsApi = {
  listByStudent: async (studentId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const response = await fetch(`${API_BASE_URL}/interventions/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || "Không thể tải nhật ký can thiệp học vụ");
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
  }) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const response = await fetch(`${API_BASE_URL}/interventions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || "Không thể tạo ghi chú can thiệp");
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
  }) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const response = await fetch(`${API_BASE_URL}/interventions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || "Không thể cập nhật nhật ký can thiệp");
    }
    const result = await response.json();
    return result.data;
  },

  delete: async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const response = await fetch(`${API_BASE_URL}/interventions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || "Không thể xóa ghi chú can thiệp");
    }
    return response.json();
  },
};
