import { API_BASE_URL, getAuthToken, handleApiResponse } from "@/lib/api";
import {
  SeasonalEventSummary,
  SeasonalStudentProgress,
  SeasonalClaimResult,
} from "./types";

export const seasonalApi = {
  /**
   * Get the active seasonal event
   */
  getActive: async (): Promise<{ isActive: boolean; event: SeasonalEventSummary | null }> => {
    try {
      const res = await fetch(`${API_BASE_URL}/seasonal/active`);
      return await handleApiResponse(res, "Không thể tải thông tin sự kiện");
    } catch {
      return { isActive: false, event: null };
    }
  },

  /**
   * Get student's seasonal progress and claims
   */
  getMyProgress: async (): Promise<{ progress: SeasonalStudentProgress }> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/my-progress`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return await handleApiResponse(res, "Không thể tải tiến độ sự kiện");
  },

  /**
   * Claim reward for a completed homework
   */
  claimReward: async (homeworkId: string): Promise<SeasonalClaimResult> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ homeworkId }),
    });
    return await handleApiResponse(res, "Không thể mở lộc");
  },

  /**
   * Admin: List all seasonal events
   */
  getAdminEvents: async (): Promise<{ events: SeasonalEventSummary[] }> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/admin/events`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return await handleApiResponse(res, "Không thể tải danh sách sự kiện quản trị");
  },

  /**
   * Admin: Update an event's toggles, dates, budget or UI config
   */
  updateAdminEvent: async (
    id: string,
    data: {
      isActive?: boolean;
      startAt?: string | null;
      endAt?: string | null;
      budgetCap?: number;
      totalSlots?: number;
      uiConfig?: any;
      pools?: Array<{ id?: string; tier?: string; amount: number; totalSlots: number; order?: number }>;
    }
  ): Promise<{ event: SeasonalEventSummary }> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/admin/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    return await handleApiResponse(res, "Không thể cập nhật cấu hình sự kiện");
  },

  /**
   * Admin: Get student payout list for an event
   */
  getPayoutList: async (id: string): Promise<{ payouts: import("./types").SeasonalPayoutItem[] }> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/admin/events/${id}/payouts`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return await handleApiResponse(res, "Không thể tải danh sách phát lộc");
  },

  /**
   * Admin: Toggle student disbursed state (đánh dấu đã lì xì / hoàn tác)
   */
  togglePayoutDisbursed: async (
    id: string,
    studentId: string,
    isDisbursed: boolean
  ): Promise<{ success: boolean; count: number; isDisbursed: boolean }> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/admin/events/${id}/payouts/${studentId}/disburse`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ isDisbursed }),
    });
    return await handleApiResponse(res, "Không thể cập nhật trạng thái phát lộc");
  },

  /**
   * Admin: Clear/reset payout list & claims for an event
   */
  clearPayoutList: async (
    id: string
  ): Promise<{ success: boolean; deletedClaims: number; resetPools: number }> => {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/seasonal/admin/events/${id}/payouts`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return await handleApiResponse(res, "Không thể xóa danh sách phát lộc");
  },
};

