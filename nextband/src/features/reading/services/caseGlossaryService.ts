import { CaseGlossaryItem, ReadingCase, VocabularyTerm } from "../types";
import {
  CASE_DICTIONARIES,
  MULTI_WORD_PHRASES,
  getCaseDictionaryMap,
  lookupWord,
} from "./readingDictionary";

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Builds a Unicode-aware boundary RegExp supporting morphological variants for single words.
 */
export function buildMorphologicalPattern(term: string): RegExp {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return /(?!)/giu;
  }

  if (normalized.includes(" ") || normalized.includes("-")) {
    const escaped = escapeRegExp(normalized);
    return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "giu");
  }

  const variants = new Set<string>([normalized]);
  variants.add(`${normalized}s`);
  variants.add(`${normalized}es`);
  variants.add(`${normalized}ed`);
  variants.add(`${normalized}d`);
  variants.add(`${normalized}ing`);

  if (normalized.endsWith("e") && normalized.length > 2) {
    const stem = normalized.slice(0, -1);
    variants.add(`${stem}ing`);
    variants.add(`${stem}ed`);
  }

  if (normalized.endsWith("y") && normalized.length > 2 && !/[aeiou]y$/.test(normalized)) {
    const stem = normalized.slice(0, -1);
    variants.add(`${stem}ies`);
    variants.add(`${stem}ied`);
  }

  if (normalized.length >= 3 && /[aeiou][b-df-hj-np-tv-z]$/.test(normalized)) {
    const lastChar = normalized.slice(-1);
    if (!/[wxy]/.test(lastChar)) {
      variants.add(`${normalized}${lastChar}ed`);
      variants.add(`${normalized}${lastChar}ing`);
    }
  }

  const alternation = Array.from(variants)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");

  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${alternation})(?![\\p{L}\\p{N}])`, "giu");
}

export interface CompiledPhraseMatcher {
  phrase: string;
  regex: RegExp;
}

const COMPILED_PHRASES_CACHE = new Map<string, CompiledPhraseMatcher[]>();

/**
 * Compiles phrase matchers once per caseId so sentence rendering avoids rebuilding RegExps.
 */
export function getCompiledCasePhrases(readingCase: ReadingCase): CompiledPhraseMatcher[] {
  const cached = COMPILED_PHRASES_CACHE.get(readingCase.id);
  if (cached) return cached;

  const caseDict = CASE_DICTIONARIES[readingCase.id] || {};
  const phraseSet = new Set<string>();

  for (const phrase of MULTI_WORD_PHRASES) {
    phraseSet.add(phrase.toLowerCase());
  }

  for (const entry of Object.values(caseDict)) {
    const termLower = entry.term.trim().toLowerCase();
    if (termLower.includes(" ")) {
      phraseSet.add(termLower);
    }
  }

  const orderedPhrases = Array.from(phraseSet).sort((a, b) => b.length - a.length);
  const fullCaseText = readingCase.sources
    .flatMap((src) => src.paragraphs.map((p) => p.text))
    .join("\n")
    .toLowerCase();

  // Keep only multi-word phrases that actually appear (even loosely) in this case to keep sentence matching fast
  const relevantMatchers: CompiledPhraseMatcher[] = [];
  for (const phrase of orderedPhrases) {
    const firstWord = phrase.split(/\s+/)[0];
    if (firstWord && !fullCaseText.includes(firstWord)) {
      continue;
    }
    relevantMatchers.push({
      phrase,
      regex: new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "gi"),
    });
  }

  COMPILED_PHRASES_CACHE.set(readingCase.id, relevantMatchers);
  return relevantMatchers;
}

function classifyGlossaryTier(termData: VocabularyTerm): CaseGlossaryItem["tier"] {
  if (
    termData.collocation_pattern ||
    termData.why_it_matters ||
    termData.learning_value_score
  ) {
    return "chunk";
  }
  if (
    termData.depth === "deep" ||
    Boolean(termData.cognitive) ||
    Boolean(termData.humanized) ||
    termData.term.trim().includes(" ")
  ) {
    return "deep";
  }
  return "academic";
}

export interface ExtractedCaseGlossary {
  curated: CaseGlossaryItem[];
  allMatched: CaseGlossaryItem[];
  paragraphNumberMap: Record<string, number>;
}

const GLOSSARY_CACHE = new Map<string, ExtractedCaseGlossary>();

/**
 * Extracts matched vocabulary and multi-word lexical chunks appearing in a reading case,
 * annotated with 1-based paragraph numbering for bidirectional Reading <-> Glossary sync.
 */
export function extractCaseGlossary(readingCase: ReadingCase): ExtractedCaseGlossary {
  const cached = GLOSSARY_CACHE.get(readingCase.id);
  if (cached) return cached;

  const paragraphNumberMap: Record<string, number> = {};
  const orderedParagraphs: Array<{ sourceId: string; id: string; text: string; number: number }> = [];

  let counter = 1;
  for (const src of readingCase.sources) {
    for (const p of src.paragraphs) {
      paragraphNumberMap[p.id] = counter;
      orderedParagraphs.push({
        sourceId: src.id,
        id: p.id,
        text: p.text,
        number: counter,
      });
      counter += 1;
    }
  }

  const caseDictMap = getCaseDictionaryMap(readingCase.id);
  const candidateMap = new Map<string, VocabularyTerm>();

  for (const [dictKey, entry] of Object.entries(caseDictMap)) {
    const canonicalKey = (entry.term || dictKey).trim().toLowerCase();
    if (!canonicalKey || canonicalKey.length < 3) continue;
    const existing = candidateMap.get(canonicalKey);
    if (!existing) {
      candidateMap.set(canonicalKey, entry);
    } else {
      const existingScore =
        (existing.collocation_pattern ? 4 : 0) +
        (existing.depth === "deep" ? 3 : 0) +
        (existing.cognitive ? 2 : 0);
      const newScore =
        (entry.collocation_pattern ? 4 : 0) +
        (entry.depth === "deep" ? 3 : 0) +
        (entry.cognitive ? 2 : 0);
      if (newScore > existingScore) {
        candidateMap.set(canonicalKey, entry);
      }
    }
  }

  for (const phrase of MULTI_WORD_PHRASES) {
    const cleanPhrase = phrase.trim().toLowerCase();
    if (!cleanPhrase || candidateMap.has(cleanPhrase)) continue;
    const looked = lookupWord(phrase, readingCase.id);
    if (looked && looked.meaning_vi && looked.meaning_vi.toLowerCase() !== cleanPhrase) {
      candidateMap.set(cleanPhrase, looked);
    }
  }

  const matchedItems: CaseGlossaryItem[] = [];
  const seenKeys = new Set<string>();

  // Sort candidates so richer multi-word chunks and deeper items are evaluated cleanly
  const sortedCandidates = Array.from(candidateMap.entries()).sort((a, b) => {
    const tierOrder = { chunk: 0, deep: 1, academic: 2 };
    const tA = tierOrder[classifyGlossaryTier(a[1])];
    const tB = tierOrder[classifyGlossaryTier(b[1])];
    if (tA !== tB) return tA - tB;
    return b[0].length - a[0].length;
  });

  for (const [canonicalKey, rawEntry] of sortedCandidates) {
    if (seenKeys.has(canonicalKey)) continue;

    // Quick pre-check before building morphological regex
    const stemPrefix = canonicalKey.split(/\s+/)[0].slice(0, Math.max(3, canonicalKey.split(/\s+/)[0].length - 2));
    let foundPara: (typeof orderedParagraphs)[number] | null = null;
    let matchedForm = rawEntry.term;

    const pattern = buildMorphologicalPattern(canonicalKey);
    for (const para of orderedParagraphs) {
      if (!para.text.toLowerCase().includes(stemPrefix)) continue;
      pattern.lastIndex = 0;
      const m = pattern.exec(para.text);
      if (m) {
        foundPara = para;
        matchedForm = m[0];
        break;
      }
    }

    if (!foundPara) continue;
    seenKeys.add(canonicalKey);

    const enriched = lookupWord(rawEntry.term, readingCase.id, foundPara.text) || rawEntry;
    const tier = classifyGlossaryTier(enriched);

    matchedItems.push({
      id: `${readingCase.id}-${foundPara.id}-${canonicalKey.replace(/[^a-z0-9]+/g, "-")}`,
      key: canonicalKey,
      term: rawEntry.term,
      matchedForm,
      paragraphId: foundPara.id,
      paragraphNumber: foundPara.number,
      sourceId: foundPara.sourceId,
      termData: enriched,
      isCuratedChunk: tier === "chunk",
      tier,
    });
  }

  // Sort allMatched by paragraph appearance order, then tier importance
  const tierWeight = { chunk: 0, deep: 1, academic: 2 };
  matchedItems.sort((a, b) => {
    if (a.paragraphNumber !== b.paragraphNumber) {
      return a.paragraphNumber - b.paragraphNumber;
    }
    if (tierWeight[a.tier] !== tierWeight[b.tier]) {
      return tierWeight[a.tier] - tierWeight[b.tier];
    }
    return b.term.length - a.term.length;
  });

  const priorityItems = matchedItems.filter((item) => item.tier === "chunk" || item.tier === "deep");
  const academicItems = matchedItems
    .filter((item) => item.tier === "academic" && item.term.length >= 6)
    .sort((a, b) => {
      const lenDiff = b.term.length - a.term.length;
      if (lenDiff !== 0) return lenDiff;
      return a.paragraphNumber - b.paragraphNumber;
    });

  const curatedSelected: CaseGlossaryItem[] = [...priorityItems.slice(0, 36)];
  if (curatedSelected.length < 18) {
    const curatedKeys = new Set(curatedSelected.map((i) => i.key));
    for (const acad of academicItems) {
      if (curatedSelected.length >= 20) break;
      if (!curatedKeys.has(acad.key)) {
        curatedSelected.push(acad);
        curatedKeys.add(acad.key);
      }
    }
  }

  curatedSelected.sort((a, b) => a.paragraphNumber - b.paragraphNumber);

  const result: ExtractedCaseGlossary = {
    curated: curatedSelected,
    allMatched: matchedItems,
    paragraphNumberMap,
  };

  GLOSSARY_CACHE.set(readingCase.id, result);
  return result;
}
