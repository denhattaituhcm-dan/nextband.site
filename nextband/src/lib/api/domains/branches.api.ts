import { API_BASE_URL, getAuthToken, authenticatedFetch } from "../client";

import type { Room } from "./rooms.api";
export type { Room };

export interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  phone?: string | null;
  isActive: boolean;
  /** isPrimary: true = đây là Cơ sở chính của hệ thống. Tối đa 1 active Branch có giá trị này. */
  isPrimary: boolean;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    rooms: number;
    classes: number;
    leads: number;
  };
  rooms?: Room[];
}

export const branchesApi = {
  /** Lấy danh sách chi nhánh active. includeInactive=true dùng cho trang Settings. */
  list: async (includeInactive = false): Promise<Branch[]> => {
    const token = await getAuthToken();
    const query = includeInactive ? "?includeInactive=true" : "";
    const res = await fetch(`${API_BASE_URL}/branches${query}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Không thể tải danh sách chi nhánh");
    const json = await res.json();
    return json.data || [];
  },

  /** Lấy Cơ sở chính (isPrimary = true). Dùng cho auto-select trên form. */
  getPrimary: async (): Promise<Branch | null> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/branches/primary`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  },

  getById: async (id: string): Promise<Branch> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/branches/${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Không thể tải thông tin chi nhánh");
    const json = await res.json();
    return json.data;
  },

  create: async (data: { code: string; name: string; address: string; phone?: string }): Promise<Branch> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/branches`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể tạo chi nhánh");
    }
    const json = await res.json();
    return json.data;
  },

  update: async (id: string, data: { name?: string; address?: string; phone?: string }): Promise<Branch> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/branches/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể cập nhật chi nhánh");
    }
    const json = await res.json();
    return json.data;
  },

  /** Đặt chi nhánh này làm Cơ sở chính. Admin only. Transaction đảm bảo chỉ 1 primary. */
  setPrimary: async (id: string): Promise<Branch> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/branches/${id}/set-primary`, {
      method: "PATCH",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể đặt làm cơ sở chính");
    }
    const json = await res.json();
    return json.data;
  },

  /** Ngừng hoạt động chi nhánh (soft-delete). Không được áp dụng cho Cơ sở chính. Admin only. */
  deactivate: async (id: string): Promise<Branch> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/branches/${id}/deactivate`, {
      method: "PATCH",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể ngừng hoạt động chi nhánh");
    }
    const json = await res.json();
    return json.data;
  },

  /** Kích hoạt lại chi nhánh đang inactive. Admin only. */
  activate: async (id: string): Promise<Branch> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/branches/${id}/activate`, {
      method: "PATCH",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể kích hoạt chi nhánh");
    }
    const json = await res.json();
    return json.data;
  },
};
