import { API_BASE_URL, getAuthToken } from "../client";

export const speakingForecastApi = {
  getPublicData: async () => {
    const response = await fetch(`${API_BASE_URL}/speaking-forecast`);
    if (!response.ok) throw new Error("Không thể tải dữ liệu Speaking Forecast");
    return response.json();
  },

  getAdminData: async () => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/speaking-forecast/admin`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) throw new Error("Không thể tải dữ liệu Speaking Forecast (Admin)");
    return response.json();
  },

  saveAdminData: async (payload: { seasons: any[]; topics: any[]; selectedSeasonId?: string }) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/speaking-forecast/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Không thể lưu dữ liệu Speaking Forecast");
    return response.json();
  },
};
