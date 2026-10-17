import { API_BASE_URL, authenticatedFetch } from "../client";

export interface Room {
  id: string;
  branchId: string;
  name: string;
  capacity: number;
  isActive: boolean;
  createdAt?: string;
  branch?: { id: string; name: string; code: string };
  _count?: { classes: number };
}

export const roomsApi = {
  list: async (branchId?: string): Promise<Room[]> => {
    const query = branchId && branchId !== "ALL" ? `?branchId=${branchId}` : "";
    const res = await authenticatedFetch(`${API_BASE_URL}/rooms${query}`);
    if (!res.ok) throw new Error("Không thể tải danh sách phòng học");
    const json = await res.json();
    return json.data || [];
  },
  create: async (data: { branchId: string; name: string; capacity?: number }): Promise<Room> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể tạo phòng");
    }
    const json = await res.json();
    return json.data;
  },
  update: async (id: string, data: { name?: string; capacity?: number; isActive?: boolean }): Promise<Room> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || "Không thể cập nhật phòng");
    }
    const json = await res.json();
    return json.data;
  },
};
