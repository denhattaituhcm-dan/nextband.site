import { API_BASE_URL, getAuthToken, handleApiResponse } from "../client";

export interface VocabInUseBookmarkPayload {
  unitId: number;
  lexiconId: string;
  word: string;
  ipa?: string;
  pos?: string;
  meaningVi: string;
  meaningEn?: string;
  nuanceTip?: string;
  example?: string;
  registerNote?: string;
  exampleSource?: "book" | "aris";
  ieltsUse?: "productive" | "receptive";
  usageFlag?: "informal" | "uk-only" | "sensitive";
}

export interface VocabInUseBookmarkRecord extends VocabInUseBookmarkPayload {
  id: string;
  userId: string;
  masteryState: number;
  masteryScore: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewAt: string;
  totalReviews: number;
  failedReviews: number;
  history: Array<{ date: string; result: "PASS" | "FAIL"; latencyMs?: number | null }>;
  createdAt: string;
  updatedAt: string;
}

export const vocabInUseApi = {
  async getBookmarks(unitId?: number): Promise<VocabInUseBookmarkRecord[]> {
    const token = await getAuthToken();
    if (!token) return [];
    const query = unitId ? `?unitId=${unitId}` : "";
    const res = await fetch(`${API_BASE_URL}/vocab-in-use/bookmarks${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await handleApiResponse<{
      status: string;
      data: { items: VocabInUseBookmarkRecord[]; count: number };
    }>(res, "Không thể tải Sổ từ Vocabulary in Use");
    return json.data.items;
  },

  async syncBookmarks(
    bookmarks: VocabInUseBookmarkPayload[]
  ): Promise<VocabInUseBookmarkRecord[]> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");
    const res = await fetch(`${API_BASE_URL}/vocab-in-use/bookmarks/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookmarks }),
    });
    const json = await handleApiResponse<{
      status: string;
      data: { items: VocabInUseBookmarkRecord[]; count: number };
    }>(res, "Không thể đồng bộ Sổ từ lên tài khoản");
    return json.data.items;
  },

  async toggleBookmark(
    item: VocabInUseBookmarkPayload
  ): Promise<{ action: "added" | "removed"; data?: any }> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");
    const res = await fetch(`${API_BASE_URL}/vocab-in-use/bookmarks/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    const json = await handleApiResponse<{
      status: string;
      action: "added" | "removed";
      data?: any;
    }>(res, "Không thể thay đổi trạng thái lưu từ");
    return { action: json.action, data: json.data };
  },

  async getDueReview(): Promise<VocabInUseBookmarkRecord[]> {
    const token = await getAuthToken();
    if (!token) return [];
    const res = await fetch(`${API_BASE_URL}/vocab-in-use/due-review`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await handleApiResponse<{
      status: string;
      data: { items: VocabInUseBookmarkRecord[]; count: number };
    }>(res, "Không thể tải danh sách ôn tập");
    return json.data.items;
  },

  async submitReview(
    bookmarkId: string,
    isCorrect: boolean,
    latencyMs?: number
  ): Promise<VocabInUseBookmarkRecord> {
    const token = await getAuthToken();
    if (!token) throw new Error("Chưa đăng nhập");
    const res = await fetch(`${API_BASE_URL}/vocab-in-use/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookmarkId, isCorrect, latencyMs }),
    });
    const json = await handleApiResponse<{
      status: string;
      data: VocabInUseBookmarkRecord;
    }>(res, "Không thể ghi nhận kết quả ôn tập");
    return json.data;
  },
};
