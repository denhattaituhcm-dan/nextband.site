import { API_BASE_URL, getAuthToken } from "../client";

export const invitationsApi = {
  joinByCode: async (payload: { code: string }) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/invitations/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ inviteCode: payload.code.trim().toUpperCase() }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || result.message || "Failed to join class");
    return result;
  },

  generate: async (payload: { classId: string; inviteCode?: string }) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/invitations/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to generate invitation");
    return result;
  },
};
