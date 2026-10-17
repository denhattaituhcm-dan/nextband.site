import { API_BASE_URL, getAuthToken, fetchWithResilience } from "../client";

export const milestonesApi = {
  getClaims: async (): Promise<string[]> => {
    const token = await getAuthToken();
    if (!token) return [];
    const res = await fetchWithResilience(`${API_BASE_URL}/milestones/claims`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.claimedKeys || [];
    }
    return [];
  },

  claim: async (milestoneKey: string): Promise<{ isFirstClaim: boolean; claim: any }> => {
    const token = await getAuthToken();
    if (!token) return { isFirstClaim: false, claim: null };
    const res = await fetchWithResilience(`${API_BASE_URL}/milestones/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ milestoneKey }),
    });
    if (res.ok) {
      return await res.json();
    }
    return { isFirstClaim: false, claim: null };
  },
};
