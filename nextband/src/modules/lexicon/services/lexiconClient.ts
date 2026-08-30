import { API_BASE_URL, getAuthToken, fetchWithResilience } from "@/lib/api";
import {
  UnderstandRequestPayload,
  ContextualLearningPayload,
  SaveMemoryRequestPayload,
} from "../types";

export const lexiconApi = {
  understand: async (
    payload: UnderstandRequestPayload
  ): Promise<ContextualLearningPayload> => {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetchWithResilience(
      `${API_BASE_URL}/lexicon/understand`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        timeoutMs: 15000,
      }
    );

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(
        errorJson.message || "Không thể phân tích từ vựng vào lúc này."
      );
    }

    return res.json();
  },

  saveMemory: async (
    payload: SaveMemoryRequestPayload
  ): Promise<{ success: boolean; memoryId: string }> => {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetchWithResilience(`${API_BASE_URL}/lexicon/save`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || "Không thể lưu vào bộ nhớ học tập.");
    }

    return res.json();
  },
};
