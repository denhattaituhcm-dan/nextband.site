import { API_BASE_URL, getAuthToken } from "../client";

export const referralsApi = {
  validateCode: async (code: string) => {
    const url = `${API_BASE_URL}/referrals/validate-code/${encodeURIComponent(code)}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.message || "Mã giới thiệu không hợp lệ");
    }
    return res.json();
  },

  getMyReferrals: async () => {
    const token = await getAuthToken();
    const url = `${API_BASE_URL}/referrals/my-referrals`;
    const res = await fetch(url, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || err?.message || "Không thể tải danh sách giới thiệu");
    }

    return res.json();
  },
};
