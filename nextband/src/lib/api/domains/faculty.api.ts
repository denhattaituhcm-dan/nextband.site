import { API_BASE_URL, authenticatedFetch, fetchWithResilience, handleApiResponse } from "../client";

export const facultyApi = {
  getPublic: async (): Promise<any[]> => {
    const res = await fetchWithResilience(`${API_BASE_URL}/faculty`);
    const json = await handleApiResponse<{ success: boolean; data: any[] }>(
      res,
      "Không thể tải danh sách giảng viên"
    );
    return json.data || [];
  },

  getAll: async (): Promise<any[]> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/faculty/all`);
    const json = await handleApiResponse<{ success: boolean; data: any[] }>(
      res,
      "Không thể tải danh sách toàn bộ giảng viên"
    );
    return json.data || [];
  },

  save: async (profile: any): Promise<any> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/faculty`, {
      method: "POST",
      body: JSON.stringify(profile),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể lưu hồ sơ giảng viên"
    );
    return json.data;
  },

  togglePublish: async (id: string, isPublished: boolean): Promise<any> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/faculty/${id}/toggle-publish`, {
      method: "PATCH",
      body: JSON.stringify({ isPublished }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể cập nhật trạng thái giảng viên"
    );
    return json.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/faculty/${id}`, {
      method: "DELETE",
    });
    await handleApiResponse<{ success: boolean }>(res, "Không thể xóa giảng viên");
    return true;
  },
};
