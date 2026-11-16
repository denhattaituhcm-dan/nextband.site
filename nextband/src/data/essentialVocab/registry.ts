import {
  EvcUnitDataSchema,
  type EvcBookId,
  type EvcBookMeta,
  type EvcUnitData,
  type EvcUnitSummary,
} from "./schema";
import { EVC5_BOOK_META } from "./books/evc5/meta";

const BOOKS_REGISTRY: Record<string, EvcBookMeta> = {
  "evc-5": EVC5_BOOK_META,
};

const UNIT_LOADERS: Record<string, () => Promise<EvcUnitData>> = {
  "evc5-u01": async () => {
    const mod = await import("./books/evc5/unit01.looking-good");
    return EvcUnitDataSchema.parse(mod.EVC5_UNIT01_DATA);
  },
};

export function getEvcBookMeta(bookId: EvcBookId = "evc-5"): EvcBookMeta {
  return BOOKS_REGISTRY[bookId] ?? EVC5_BOOK_META;
}

/**
 * Resolves flexible route slugs ("1", "u1", "evc5-u1", "evc5-u01") to canonical unitId ("evc5-u01").
 */
export function resolveEvcUnitId(
  rawSlug: string | undefined,
  defaultBookId: EvcBookId = "evc-5"
): string {
  if (!rawSlug) return "evc5-u01";
  const cleaned = rawSlug.trim().toLowerCase();

  if (/^evc[1-6]-u\d{2}$/.test(cleaned)) {
    return cleaned;
  }

  const shortBookMatch = cleaned.match(/^evc([1-6])-u(\d{1,2})$/);
  if (shortBookMatch) {
    const bookNum = shortBookMatch[1];
    const unitNum = String(Number(shortBookMatch[2])).padStart(2, "0");
    return `evc${bookNum}-u${unitNum}`;
  }

  const numericMatch = cleaned.match(/^(?:unit-?|u)?(\d{1,2})$/);
  if (numericMatch) {
    const bookNum = defaultBookId.replace("evc-", "");
    const unitNum = String(Number(numericMatch[1])).padStart(2, "0");
    return `evc${bookNum}-u${unitNum}`;
  }

  return cleaned;
}

export function getEvcUnitSummary(
  rawSlug: string | undefined,
  bookId: EvcBookId = "evc-5"
): EvcUnitSummary | undefined {
  const canonicalId = resolveEvcUnitId(rawSlug, bookId);
  const book = getEvcBookMeta(bookId);
  return book.units.find((u) => u.unitId === canonicalId);
}

export async function loadEvcUnit(
  rawSlug: string | undefined,
  bookId: EvcBookId = "evc-5"
): Promise<EvcUnitData | null> {
  const canonicalId = resolveEvcUnitId(rawSlug, bookId);
  const loader = UNIT_LOADERS[canonicalId];
  if (!loader) {
    return null;
  }
  return loader();
}
