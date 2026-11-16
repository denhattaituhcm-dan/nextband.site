import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { AuthContext } from "./useAuth";
import {
  essentialVocabularyApi,
  type EvcBookmarkPayload,
  type EvcBookmarkRecord,
  type EvcBookmarkSourceContext,
} from "../lib/api/domains/essential-vocabulary.api";
import type { EvcGlossaryEntry } from "../data/essentialVocab/schema";
import {
  calculateClientSm2Transition,
  type Sm2ReviewRating,
} from "../lib/essentialVocab/sm2Client";

const LOCAL_BOOKMARKS_KEY = "nextband_evc_bookmarks_v1";

function readLocalBookmarks(): EvcBookmarkRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalBookmarks(items: EvcBookmarkRecord[]): void {
  try {
    localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors in guest mode
  }
}

export function makeEvcBookmarkKey(
  unitId: string,
  entryId: string,
  senseNumber = 1
): string {
  return `${unitId}:${entryId}:${senseNumber}`;
}

export function useEssentialVocabBookmarks(activeUnitId?: string) {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ?? false;
  const isAuthLoading = authContext?.isLoading ?? false;
  const userId = authContext?.user?.id ?? "guest";

  const [bookmarks, setBookmarks] = useState<EvcBookmarkRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasMigratedRef = useRef<boolean>(false);

  const loadBookmarks = useCallback(async () => {
    if (isAuthLoading) return;
    setIsLoading(true);
    setError(null);

    if (!isAuthenticated) {
      const localItems = readLocalBookmarks();
      setBookmarks(
        activeUnitId
          ? localItems.filter((item) => item.unitId === activeUnitId)
          : localItems
      );
      setIsLoading(false);
      return;
    }

    try {
      const migrationFlagKey = `nextband_evc_bm_migrated_v1_${userId}`;
      const localItems = readLocalBookmarks();
      if (
        !hasMigratedRef.current &&
        localItems.length > 0 &&
        !localStorage.getItem(migrationFlagKey)
      ) {
        hasMigratedRef.current = true;
        await essentialVocabularyApi.syncGuestData({
          bookmarks: localItems.map((b) => ({
            bookId: b.bookId,
            unitId: b.unitId,
            entryId: b.entryId,
            senseNumber: b.senseNumber,
            headword: b.headword,
            pos: b.pos,
            ipa: b.ipa,
            meaningVi: b.meaningVi,
            definitionEn: b.definitionEn,
            exampleEn: b.exampleEn,
            inflectionsText: b.inflectionsText,
            sourceContext: b.sourceContext,
          })),
          attempts: [],
        });
        localStorage.setItem(migrationFlagKey, "1");
      }

      const remoteItems = await essentialVocabularyApi.getBookmarks({
        unitId: activeUnitId,
      });
      setBookmarks(remoteItems);
    } catch (err: any) {
      setError(err?.message || "Không thể tải danh sách từ đã lưu.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, isAuthLoading, userId, activeUnitId]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const isBookmarked = useCallback(
    (unitId: string, entryId: string, senseNumber = 1): boolean => {
      return bookmarks.some(
        (b) =>
          b.unitId === unitId &&
          b.entryId === entryId &&
          b.senseNumber === senseNumber
      );
    },
    [bookmarks]
  );

  const toggleEntrySenseBookmark = useCallback(
    async (
      entry: EvcGlossaryEntry,
      senseNumber = 1,
      sourceContext: EvcBookmarkSourceContext = "glossary"
    ) => {
      const sense =
        entry.senses.find((s) => s.senseNumber === senseNumber) ??
        entry.senses[0];
      if (!sense) return;

      const payload: EvcBookmarkPayload = {
        bookId: "evc-5",
        unitId: entry.unitId,
        entryId: entry.entryId,
        senseNumber: sense.senseNumber,
        headword: entry.displayHeadword,
        pos: sense.pos,
        ipa: entry.ipa,
        meaningVi: sense.meaningVi,
        definitionEn: sense.definitionEn,
        exampleEn: sense.examplesEn[0] || "",
        inflectionsText: sense.inflections?.rawText,
        sourceContext,
      };

      if (!isAuthenticated) {
        const allLocal = readLocalBookmarks();
        const existingIdx = allLocal.findIndex(
          (b) =>
            b.unitId === payload.unitId &&
            b.entryId === payload.entryId &&
            b.senseNumber === payload.senseNumber
        );

        let updatedAll: EvcBookmarkRecord[];
        if (existingIdx >= 0) {
          updatedAll = allLocal.filter((_, idx) => idx !== existingIdx);
        } else {
          const nowIso = new Date().toISOString();
          const newRecord: EvcBookmarkRecord = {
            ...payload,
            id: `local-${payload.unitId}-${payload.entryId}-${payload.senseNumber}`,
            userId: "guest",
            senseNumber: sense.senseNumber,
            sourceContext,
            masteryState: 0,
            masteryScore: 0.1,
            intervalDays: 1,
            easeFactor: 2.5,
            nextReviewAt: nowIso,
            totalReviews: 0,
            failedReviews: 0,
            history: [],
            createdAt: nowIso,
            updatedAt: nowIso,
          };
          updatedAll = [newRecord, ...allLocal];
        }

        writeLocalBookmarks(updatedAll);
        setBookmarks(
          activeUnitId
            ? updatedAll.filter((b) => b.unitId === activeUnitId)
            : updatedAll
        );
        return;
      }

      try {
        setError(null);
        await essentialVocabularyApi.toggleBookmark(payload);
        await loadBookmarks();
      } catch (err: any) {
        setError(err?.message || "Không thể lưu từ vựng.");
        throw err;
      }
    },
    [isAuthenticated, activeUnitId, loadBookmarks]
  );

  const bookmarkMissedEntries = useCallback(
    async (
      entries: EvcGlossaryEntry[],
      sourceContext: EvcBookmarkSourceContext
    ): Promise<number> => {
      let addedCount = 0;
      for (const entry of entries) {
        if (!isBookmarked(entry.unitId, entry.entryId, 1)) {
          await toggleEntrySenseBookmark(entry, 1, sourceContext);
          addedCount++;
        }
      }
      return addedCount;
    },
    [isBookmarked, toggleEntrySenseBookmark]
  );

  const submitBookmarkReview = useCallback(
    async (
      bookmarkId: string,
      rating: Sm2ReviewRating,
      latencyMs?: number
    ): Promise<EvcBookmarkRecord | null> => {
      if (!isAuthenticated) {
        const allLocal = readLocalBookmarks();
        const target = allLocal.find((b) => b.id === bookmarkId);
        if (!target) return null;

        const nextSm2 = calculateClientSm2Transition(
          {
            intervalDays: target.intervalDays,
            easeFactor: target.easeFactor,
            masteryState: target.masteryState,
            masteryScore: target.masteryScore,
            nextReviewAt: target.nextReviewAt,
            totalReviews: target.totalReviews,
            failedReviews: target.failedReviews,
            history: (target.history || []).map((h) => ({
              date: h.date,
              result: h.result,
              rating: h.rating ?? (h.result === "PASS" ? "GOOD" : "AGAIN"),
              latencyMs: h.latencyMs ?? null,
            })),
          },
          rating,
          latencyMs
        );

        const updatedRecord: EvcBookmarkRecord = {
          ...target,
          ...nextSm2,
          updatedAt: new Date().toISOString(),
        };

        const updatedAll = allLocal.map((b) =>
          b.id === bookmarkId ? updatedRecord : b
        );
        writeLocalBookmarks(updatedAll);
        setBookmarks(
          activeUnitId
            ? updatedAll.filter((b) => b.unitId === activeUnitId)
            : updatedAll
        );
        return updatedRecord;
      }

      const updated = await essentialVocabularyApi.submitReview(
        bookmarkId,
        rating,
        latencyMs
      );
      setBookmarks((prev) =>
        prev.map((b) => (b.id === bookmarkId ? updated : b))
      );
      return updated;
    },
    [isAuthenticated, activeUnitId]
  );

  const dueBookmarks = bookmarks.filter(
    (b) => new Date(b.nextReviewAt).getTime() <= Date.now()
  );

  return {
    bookmarks,
    dueBookmarks,
    isLoading,
    error,
    isBookmarked,
    toggleEntrySenseBookmark,
    bookmarkMissedEntries,
    submitBookmarkReview,
    refreshBookmarks: loadBookmarks,
  };
}
