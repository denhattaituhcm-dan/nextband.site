import { API_BASE_URL, getAuthToken } from "./api";

export interface WordFormation {
  prefix?: string;
  root?: string;
  suffix?: string;
  confidence?: number;
}

export interface CognitiveWord {
  id?: string;
  word: string;
  ipa?: string | null;
  audioUrl?: string | null;
  coreIdea: string;
  wordFormation?: WordFormation | null;
  collocations: string[];
  cefrLevel?: string | null;
  sourceContext?: string;
}

export interface UserVocabRecord {
  id: string;
  userId: string;
  wordId: string;
  sourceContext: string;
  sourceLessonId?: string | null;
  masteryState: number;
  masteryScore: number;
  intervalDays: number;
  nextReviewAt: string;
  totalReviews: number;
  failedReviews: number;
  history: Array<{ date: string; result: "PASS" | "FAIL"; latencyMs?: number }>;
  word: CognitiveWord;
  createdAt: string;
  updatedAt: string;
}

export const lexiconApi = {
  /**
   * 1-Click Tra từ tại chỗ
   */
  async lookup(word: string, context?: string): Promise<CognitiveWord> {
    const params = new URLSearchParams({ word });
    if (context) params.append("context", context);

    const res = await fetch(`${API_BASE_URL}/lexicon/lookup?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to lookup word: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  },

  /**
   * Lưu từ vào Sổ từ cá nhân
   */
  async save(payload: {
    word: string;
    sourceContext: string;
    wordId?: string;
    sourceLessonId?: string;
  }): Promise<UserVocabRecord> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/lexicon/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Failed to save vocabulary: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  },

  /**
   * Lấy danh sách 5 từ cần ôn hôm nay
   */
  async getDueReview(): Promise<{ count: number; items: UserVocabRecord[] }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/lexicon/due-review`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch due reviews: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  },

  /**
   * Nộp kết quả ôn tập
   */
  async submitReview(userVocabId: string, isCorrect: boolean, latencyMs?: number): Promise<UserVocabRecord> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/lexicon/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ userVocabId, isCorrect, latencyMs }),
    });

    if (!res.ok) {
      throw new Error(`Failed to submit review: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  },

  /**
   * Lấy toàn bộ Sổ từ của tôi
   */
  async getMyLexicon(): Promise<{
    stats: { total: number; learning: number; consolidating: number; mastered: number };
    items: UserVocabRecord[];
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/lexicon/my-lexicon`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch my lexicon: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  },
};
