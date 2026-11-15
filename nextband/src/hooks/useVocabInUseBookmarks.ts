import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { AuthContext } from "./useAuth";
import {
  vocabInUseApi,
  VocabInUseBookmarkPayload,
  VocabInUseBookmarkRecord,
} from "@/lib/api/domains/vocab-in-use.api";
import { LexiconItem } from "@/data/vocabInUse/types";

const LOCAL_STORAGE_KEY = "nb_vocab_in_use_bookmarks_v1";

export interface LocalBookmarkPayload extends VocabInUseBookmarkPayload {
  savedAt: string;
}

export function useVocabInUseBookmarks(activeUnitId?: number) {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ?? false;
  const isAuthLoading = authContext?.isLoading ?? false;
  const [bookmarkedKeys, setBookmarkedKeys] = useState<string[]>([]);
  const [serverBookmarks, setServerBookmarks] = useState<
    VocabInUseBookmarkRecord[]
  >([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [dueReviewItems, setDueReviewItems] = useState<
    VocabInUseBookmarkRecord[]
  >([]);
  const [isLoadingDue, setIsLoadingDue] = useState<boolean>(false);

  const hasMergedRef = useRef<boolean>(false);

  // 1. Đọc dữ liệu local ban đầu (cho khách)
  const getLocalBookmarks = useCallback((): LocalBookmarkPayload[] => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const saveLocalBookmarks = useCallback(
    (items: LocalBookmarkPayload[]) => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch (err: any) {
        setSyncError("Bộ nhớ trình duyệt đầy, không thể lưu thêm từ.");
      }
    },
    []
  );

  // 2. Khởi tạo danh sách phím bookmarks khi chưa đăng nhập
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      const locals = getLocalBookmarks();
      const keys = locals.map((l) => `${l.unitId}:${l.lexiconId}`);
      setBookmarkedKeys(keys);
    }
  }, [isAuthenticated, isAuthLoading, getLocalBookmarks]);

  // 3. Khi đăng nhập: Đồng bộ gộp (Merged State) từ Local -> Server
  useEffect(() => {
    if (!isAuthenticated || isAuthLoading || hasMergedRef.current) return;

    let isMounted = true;
    const mergeLocalToServer = async () => {
      setIsSyncing(true);
      setSyncError(null);
      try {
        const localItems = getLocalBookmarks();
        let currentServerList: VocabInUseBookmarkRecord[] = [];

        if (localItems.length > 0) {
          // Gửi dữ liệu khách lên để gộp vào tài khoản
          const payload: VocabInUseBookmarkPayload[] = localItems.map((l) => ({
            unitId: l.unitId,
            lexiconId: l.lexiconId,
            word: l.word,
            ipa: l.ipa,
            pos: l.pos,
            meaningVi: l.meaningVi,
            meaningEn: l.meaningEn,
            nuanceTip: l.nuanceTip,
            example: l.example,
            registerNote: l.registerNote,
            exampleSource: l.exampleSource,
            ieltsUse: l.ieltsUse,
            usageFlag: l.usageFlag,
          }));

          currentServerList = await vocabInUseApi.syncBookmarks(payload);

          // CHỈ XÓA LOCALSTORAGE KHI SERVER ĐÃ XÁC NHẬN THÀNH CÔNG
          try {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          } catch {
            // ignore
          }
        } else {
          // Không có dữ liệu local, tải danh sách từ server
          currentServerList = await vocabInUseApi.getBookmarks();
        }

        if (isMounted) {
          setServerBookmarks(currentServerList);
          setBookmarkedKeys(
            currentServerList.map((b) => `${b.unitId}:${b.lexiconId}`)
          );
          hasMergedRef.current = true;
        }
      } catch (err: any) {
        if (isMounted) {
          // Giữ nguyên localStorage, báo lỗi minh bạch
          setSyncError(
            err.message ||
              "Không thể đồng bộ Sổ từ lên máy chủ. Dữ liệu đang được lưu tạm trên thiết bị này."
          );
        }
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    mergeLocalToServer();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, isAuthLoading, getLocalBookmarks]);

  // 4. Tải danh sách từ đến hạn ôn tập (Spaced Repetition)
  const fetchDueReview = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoadingDue(true);
    try {
      const items = await vocabInUseApi.getDueReview();
      setDueReviewItems(items);
    } catch (err: any) {
      console.warn("Lỗi khi tải danh sách ôn tập:", err.message);
    } finally {
      setIsLoadingDue(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDueReview();
    }
  }, [isAuthenticated, fetchDueReview]);

  // 5. Toggle bookmark (Lưu / Bỏ lưu từ)
  const toggleBookmark = useCallback(
    async (unitId: number, lexicon: LexiconItem) => {
      const key = `${unitId}:${lexicon.id}`;
      setSyncError(null);

      const payload: VocabInUseBookmarkPayload = {
        unitId,
        lexiconId: lexicon.id,
        word: lexicon.word,
        ipa: lexicon.ipa,
        pos: lexicon.pos,
        meaningVi: lexicon.meaningVi,
        meaningEn: lexicon.meaningEn,
        nuanceTip: lexicon.nuanceTip,
        example: lexicon.example,
        registerNote: lexicon.registerNote,
        exampleSource: lexicon.exampleSource,
        ieltsUse: lexicon.ieltsUse,
        usageFlag: lexicon.usageFlag,
      };

      if (!isAuthenticated) {
        // Chế độ khách: ghi vào localStorage
        const locals = getLocalBookmarks();
        const exists = locals.some(
          (l) => l.unitId === unitId && l.lexiconId === lexicon.id
        );
        let next: LocalBookmarkPayload[];
        if (exists) {
          next = locals.filter(
            (l) => !(l.unitId === unitId && l.lexiconId === lexicon.id)
          );
          setBookmarkedKeys((prev) => prev.filter((k) => k !== key));
        } else {
          next = [...locals, { ...payload, savedAt: new Date().toISOString() }];
          setBookmarkedKeys((prev) => [...prev, key]);
        }
        saveLocalBookmarks(next);
        return;
      }

      // Đã đăng nhập: gọi API lưu lên server
      setIsSyncing(true);
      try {
        const res = await vocabInUseApi.toggleBookmark(payload);
        if (res.action === "removed") {
          setBookmarkedKeys((prev) => prev.filter((k) => k !== key));
          setServerBookmarks((prev) =>
            prev.filter(
              (b) => !(b.unitId === unitId && b.lexiconId === lexicon.id)
            )
          );
        } else if (res.action === "added" && res.data) {
          setBookmarkedKeys((prev) => [...prev, key]);
          setServerBookmarks((prev) => [res.data, ...prev]);
        }
      } catch (err: any) {
        setSyncError(
          err.message || "Không thể cập nhật Sổ từ. Vui lòng thử lại."
        );
      } finally {
        setIsSyncing(false);
      }
    },
    [isAuthenticated, getLocalBookmarks, saveLocalBookmarks]
  );

  // 6. Gửi kết quả ôn tập flashcard (SM-2)
  const submitReview = useCallback(
    async (bookmarkId: string, isCorrect: boolean, latencyMs?: number) => {
      if (!isAuthenticated) return;
      try {
        const updated = await vocabInUseApi.submitReview(
          bookmarkId,
          isCorrect,
          latencyMs
        );
        // Cập nhật danh sách ôn tập
        setDueReviewItems((prev) => prev.filter((item) => item.id !== bookmarkId));
        // Cập nhật server bookmarks
        setServerBookmarks((prev) =>
          prev.map((item) => (item.id === bookmarkId ? updated : item))
        );
      } catch (err: any) {
        setSyncError(err.message || "Không thể lưu kết quả ôn tập");
        throw err;
      }
    },
    [isAuthenticated]
  );

  const isLexiconBookmarked = useCallback(
    (unitId: number, lexiconId: string) => {
      return bookmarkedKeys.includes(`${unitId}:${lexiconId}`);
    },
    [bookmarkedKeys]
  );

  return {
    bookmarkedKeys,
    serverBookmarks,
    isSyncing,
    syncError,
    dueReviewItems,
    isLoadingDue,
    fetchDueReview,
    toggleBookmark,
    submitReview,
    isLexiconBookmarked,
    totalBookmarked: bookmarkedKeys.length,
  };
}
