import { supabase } from "../../supabase";
import { API_BASE_URL } from "../client";

export const speakingForecastApi = {
  getPublicData: async () => {
    const response = await fetch(`${API_BASE_URL}/speaking-forecast`);
    if (!response.ok) throw new Error("Không thể tải dữ liệu Speaking Forecast");
    return response.json();
  },

  getAdminData: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const response = await fetch(`${API_BASE_URL}/speaking-forecast/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Không thể tải dữ liệu Speaking Forecast (Admin)");
    return response.json();
  },

  saveAdminData: async (payload: { seasons: any[]; topics: any[]; selectedSeasonId?: string }) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const response = await fetch(`${API_BASE_URL}/speaking-forecast/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Không thể lưu dữ liệu Speaking Forecast");
    return response.json();
  },
};
