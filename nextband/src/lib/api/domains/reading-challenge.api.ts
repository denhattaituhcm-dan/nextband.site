import { API_BASE_URL, authenticatedFetch, ApiError } from "../client";

export interface ReadingChallengeProgressRecord {
  id: string;
  userId: string;
  unitNumber: number;
  currentStepIndex: number;
  completedSteps: string[];
  stepAnswers: Record<string, any>;
  readingWpm?: number | null;
  readingSeconds?: number | null;
  scores: Record<string, number>;
  writingDraft?: string | null;
  isUnitCompleted: boolean;
  completedAt?: string | null;
  lastPracticedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingChallengeSummary {
  startedUnitsCount: number;
  completedUnitsCount: number;
  averageWpm: number | null;
  totalUnits: number;
}

export interface SaveUnitProgressPayload {
  unitNumber: number;
  currentStepIndex?: number;
  completedSteps?: string[];
  stepAnswers?: Record<string, any>;
  readingWpm?: number | null;
  readingSeconds?: number | null;
  scores?: Record<string, number>;
  writingDraft?: string | null;
  isUnitCompleted?: boolean;
}

export const readingChallengeApi = {
  /**
   * Fetch all reading challenge unit progress records for the signed-in user.
   */
  getAllProgress: async (): Promise<{
    units: ReadingChallengeProgressRecord[];
    summary: ReadingChallengeSummary;
  }> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/reading-challenge/progress`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(err.message || "Không thể tải tiến độ Thử thách đọc hiểu", res.status);
    }
    const json = await res.json();
    return json.data;
  },

  /**
   * Fetch single unit progress for the signed-in user.
   */
  getUnitProgress: async (unitNumber: number): Promise<ReadingChallengeProgressRecord | null> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/reading-challenge/progress/${unitNumber}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(err.message || `Không thể tải tiến độ Unit ${unitNumber}`, res.status);
    }
    const json = await res.json();
    return json.data;
  },

  /**
   * Save or update unit progress non-destructively on the server.
   */
  saveUnitProgress: async (
    unitNumber: number,
    payload: SaveUnitProgressPayload
  ): Promise<ReadingChallengeProgressRecord> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/reading-challenge/progress/${unitNumber}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(err.message || `Không thể lưu tiến độ Unit ${unitNumber}`, res.status);
    }
    const json = await res.json();
    return json.data;
  },

  /**
   * Batch synchronize guest progress records from localStorage to user account.
   */
  syncGuestProgress: async (
    units: SaveUnitProgressPayload[]
  ): Promise<{
    units: ReadingChallengeProgressRecord[];
    summary: ReadingChallengeSummary;
  }> => {
    const res = await authenticatedFetch(`${API_BASE_URL}/reading-challenge/sync`, {
      method: "POST",
      body: JSON.stringify({ units }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new ApiError(err.message || "Không thể đồng bộ tiến độ khách lên máy chủ", res.status);
    }
    const json = await res.json();
    return json.data;
  },
};
