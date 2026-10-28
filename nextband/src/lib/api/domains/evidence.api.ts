import { API_BASE_URL, authenticatedFetch, fetchWithResilience, handleApiResponse } from "../client";

export const evidenceApi = {
  getPublished: async (): Promise<any[]> => {
    const res = await fetchWithResilience(`${API_BASE_URL}/evidence`);
    const json = await handleApiResponse<{ success: boolean; data: any[] }>(
      res,
      "Không thể tải danh sách vinh danh"
    );
    return json.data || [];
  },

  getAll: async (): Promise<any[]> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/evidence/all`);
    const json = await handleApiResponse<{ success: boolean; data: any[] }>(
      res,
      "Không thể tải toàn bộ danh sách vinh danh"
    );
    return json.data || [];
  },

  save: async (item: any): Promise<any> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/evidence`, {
      method: "POST",
      body: JSON.stringify(item),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể lưu vinh danh"
    );
    return json.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/evidence/${id}`, {
      method: "DELETE",
    });
    await handleApiResponse<{ success: boolean }>(res, "Không thể xóa vinh danh");
    return true;
  },
};
