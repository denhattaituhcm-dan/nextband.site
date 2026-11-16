import { useEffect, useState } from "react";
import {
  getEvcUnitSummary,
  loadEvcUnit,
  resolveEvcUnitId,
} from "../data/essentialVocab/registry";
import type {
  EvcBookId,
  EvcUnitData,
  EvcUnitSummary,
} from "../data/essentialVocab/schema";

export function useEssentialVocabUnit(
  rawUnitSlug: string | undefined,
  bookId: EvcBookId = "evc-5"
) {
  const canonicalUnitId = resolveEvcUnitId(rawUnitSlug, bookId);
  const unitSummary: EvcUnitSummary | undefined = getEvcUnitSummary(
    canonicalUnitId,
    bookId
  );

  const [unitData, setUnitData] = useState<EvcUnitData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    loadEvcUnit(canonicalUnitId, bookId)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setUnitData(null);
          setError("Nội dung Unit này đang được số hóa và sẽ sớm ra mắt.");
        } else {
          setUnitData(data);
        }
      })
      .catch((err: any) => {
        if (cancelled) return;
        setUnitData(null);
        setError(err?.message || "Không thể tải dữ liệu bài học.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [canonicalUnitId, bookId]);

  return {
    canonicalUnitId,
    unitSummary,
    unitData,
    isLoading,
    error,
  };
}
