import { API_BASE_URL, getAuthToken } from "../client";

export const tuitionApi = {
  getSummary: async (params?: { branchId?: string }) => {
    const token = await getAuthToken();
    const queryParams = new URLSearchParams();
    if (params?.branchId && params.branchId !== "ALL") queryParams.set("branchId", params.branchId);

    const url = `${API_BASE_URL}/admin/tuition/summary${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || err?.message || "Không thể tải dữ liệu học phí");
    }

    const json = await res.json();
    return json.data || json;
  },

  updateStudentTuition: async (
    classStudentId: string,
    payload: {
      tuitionFee?: number;
      paidAmount?: number;
      paymentStatus?: string;
      paymentNote?: string | null;
      externalRef?: string | null;
    }
  ) => {
    const token = await getAuthToken();
    const url = `${API_BASE_URL}/admin/tuition/students/${classStudentId}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || err?.message || "Không thể cập nhật học phí");
    }

    const json = await res.json();
    return json.data || json;
  },
};
