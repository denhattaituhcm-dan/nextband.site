import { API_BASE_URL, getAuthToken, handleApiResponse } from "../client";

export type EvcBookmarkSourceContext =
  | "glossary"
  | "stage_1"
  | "stage_2"
  | "stage_3"
  | "stage_4";

export interface EvcBookmarkPayload {
  bookId: "evc-1" | "evc-2" | "evc-3" | "evc-4" | "evc-5" | "evc-6";
  unitId: string;
  entryId: string;
  senseNumber?: number;
  headword: string;
  pos: string;
  ipa?: string;
  meaningVi: string;
  definitionEn: string;
  exampleEn: string;
  inflectionsText?: string;
  sourceContext?: EvcBookmarkSourceContext;
}

export interface EvcBookmarkRecord extends EvcBookmarkPayload {
  id: string;
  userId: string;
  senseNumber: number;
  sourceContext: EvcBookmarkSourceContext;
  masteryState: number;
  masteryScore: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewAt: string;
  totalReviews: number;
  failedReviews: number;
  history: Array<{
    date: string;
    result: "PASS" | "FAIL";
    rating?: "AGAIN" | "HARD" | "GOOD" | "EASY";
    latencyMs?: number | null;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface EvcUnitProgressRecord {
  id: string;
  userId: string;
  bookId: string;
  unitId: string;
  contentVersion: number;
  stage1MaxScore: number;
  stage2MaxScore: number;
  stage3MaxScore: number;
  stage4MaxScore: number;
  totalMaxScore: number;
  bestStage1Score: number | null;
  bestStage2Score: number | null;
  bestStage3Score: number | null;
  bestStage4Score: number | null;
  bestTotalScore: number;
  bestAccuracyPct: number;
  latestStage1Score: number | null;
  latestStage2Score: number | null;
  latestStage3Score: number | null;
  latestStage4Score: number | null;
  latestTotalScore: number;
  latestAccuracyPct: number;
  completedStagesMask: number;
  attemptsCount: number;
  needsRevalidation: boolean;
  firstCompletedAt: string | null;
  lastPracticedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvcAttemptAnswerSnapshot {
  itemId: string;
  submittedValue: string | number;
  isCorrect: boolean;
  matchTier?: string;
  canonicalAnswer: string;
}

export interface EvcAttemptRecord {
  id: string;
  progressId: string;
  userId: string;
  bookId: string;
  unitId: string;
  contentVersion: number;
  stage: 1 | 2 | 3 | 4;
  mode: "assisted" | "hard";
  score: number;
  maxScore: number;
  accuracyPct: number;
  durationSec: number;
  answersSnapshot: EvcAttemptAnswerSnapshot[];
  wrongEntryIds: string[];
  clientAttemptKey?: string | null;
  submittedAt: string;
}

export interface SubmitEvcAttemptPayload {
  bookId: "evc-1" | "evc-2" | "evc-3" | "evc-4" | "evc-5" | "evc-6";
  unitId: string;
  contentVersion: number;
  stage: 1 | 2 | 3 | 4;
  mode: "assisted" | "hard";
  score: number;
  maxScore: number;
  stageMaxScores: {
    stage1: number;
    stage2: number;
    stage3: number;
    stage4: number;
  };
  durationSec: number;
  clientAttemptKey?: string;
  answersSnapshot: EvcAttemptAnswerSnapshot[];
  wrongEntryIds: string[];
}

export interface EvcBookProgressSummary {
  bookId: string;
  startedUnitsCount: number;
  completedUnitsCount: number;
  totalBestScore: number;
  totalMaxPossible: number;
  overallBestAccuracyPct: number;
}

export const essentialVocabularyApi = {
  async getBookProgress(bookId = "evc-5"): Promise<{
    units: EvcUnitProgressRecord[];
    recentAttempts: EvcAttemptRecord[];
    summary: EvcBookProgressSummary;
  }> {
    const token = await getAuthToken();
    if (!token) {
      return {
        units: [],
        recentAttempts: [],
        summary: {
          bookId,
          startedUnitsCount: 0,
          completedUnitsCount: 0,
          totalBestScore: 0,
          totalMaxPossible: 0,
          overallBestAccuracyPct: 0,
        },
      };
    }

    const res = await fetch(
      `${API_BASE_URL}/essential-vocabulary/progress?bookId=${encodeURIComponent(bookId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await handleApiResponse<{
      status: string;
      data: {
        units: EvcUnitProgressRecord[];
        recentAttempts: EvcAttemptRecord[];
        summary: EvcBookProgressSummary;
      };
    }>(res, "Không thể tải tiến độ học Essential Vocabulary");
    return json.data;
  },

  async getUnitProgress(
    unitId: string,
    limit = 20
  ): Promise<{
    progress: EvcUnitProgressRecord | null;
    attempts: EvcAttemptRecord[];
  }> {
    const token = await getAuthToken();
    if (!token) return { progress: null, attempts: [] };

    const res = await fetch(
      `${API_BASE_URL}/essential-vocabulary/progress/${encodeURIComponent(unitId)}?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await handleApiResponse<{
      status: string;
      data: {
        progress: EvcUnitProgressRecord | null;
        attempts: EvcAttemptRecord[];
      };
    }>(res, "Không thể tải lịch sử làm bài của Unit");
    return json.data;
  },

  async submitAttempt(payload: SubmitEvcAttemptPayload): Promise<{
    progress: EvcUnitProgressRecord;
    attempt: EvcAttemptRecord;
  }> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");

    const res = await fetch(`${API_BASE_URL}/essential-vocabulary/attempts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const json = await handleApiResponse<{
      status: string;
      data: {
        progress: EvcUnitProgressRecord;
        attempt: EvcAttemptRecord;
      };
    }>(res, "Không thể lưu kết quả bài tập lên máy chủ");
    return json.data;
  },

  async getBookmarks(params?: {
    bookId?: string;
    unitId?: string;
    dueOnly?: boolean;
  }): Promise<EvcBookmarkRecord[]> {
    const token = await getAuthToken();
    if (!token) return [];

    const search = new URLSearchParams();
    if (params?.bookId) search.set("bookId", params.bookId);
    if (params?.unitId) search.set("unitId", params.unitId);
    if (params?.dueOnly) search.set("dueOnly", "true");
    const qs = search.toString() ? `?${search.toString()}` : "";

    const res = await fetch(
      `${API_BASE_URL}/essential-vocabulary/bookmarks${qs}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await handleApiResponse<{
      status: string;
      data: { items: EvcBookmarkRecord[]; count: number };
    }>(res, "Không thể tải Sổ từ Essential Vocabulary");
    return json.data.items;
  },

  async toggleBookmark(item: EvcBookmarkPayload): Promise<{
    action: "added" | "removed";
    data?: EvcBookmarkRecord | { id: string; unitId: string; entryId: string; senseNumber: number };
  }> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");

    const res = await fetch(
      `${API_BASE_URL}/essential-vocabulary/bookmarks/toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      }
    );
    const json = await handleApiResponse<{
      status: string;
      action: "added" | "removed";
      data?: any;
    }>(res, "Không thể cập nhật trạng thái lưu từ");
    return { action: json.action, data: json.data };
  },

  async submitReview(
    bookmarkId: string,
    rating: "AGAIN" | "HARD" | "GOOD" | "EASY",
    latencyMs?: number
  ): Promise<EvcBookmarkRecord> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");

    const res = await fetch(
      `${API_BASE_URL}/essential-vocabulary/bookmarks/${encodeURIComponent(bookmarkId)}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          isCorrect: rating !== "AGAIN",
          latencyMs,
        }),
      }
    );
    const json = await handleApiResponse<{
      status: string;
      data: EvcBookmarkRecord;
    }>(res, "Không thể ghi nhận kết quả ôn tập");
    return json.data;
  },

  async syncGuestData(payload: {
    bookmarks: EvcBookmarkPayload[];
    attempts: SubmitEvcAttemptPayload[];
  }): Promise<{ syncedBookmarks: number; syncedAttempts: number }> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");

    const res = await fetch(`${API_BASE_URL}/essential-vocabulary/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const json = await handleApiResponse<{
      status: string;
      data: { syncedBookmarks: number; syncedAttempts: number };
    }>(res, "Không thể đồng bộ dữ liệu học tập lên tài khoản");
    return json.data;
  },
};
