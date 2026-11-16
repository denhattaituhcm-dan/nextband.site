import type { EvcStage4Blank } from "../../data/essentialVocab/schema";

export type OpenClozeMatchTier =
  | "CORRECT_CANONICAL"
  | "CORRECT_VARIANT"
  | "CORRECT_VERIFIED_ALT"
  | "INCORRECT_NEAR_MISS"
  | "INCORRECT";

export interface OpenClozeEvaluationResult {
  isCorrect: boolean;
  matchTier: OpenClozeMatchTier;
  normalizedInput: string;
  canonicalAnswer: string;
  feedbackMessage: string;
}

/**
 * Deterministic token normalizer for Essential Vocabulary Open Cloze answers.
 * Preserves internal hyphens (e.g. "high-heeled", "tight-fitting") unless a non-hyphenated
 * form is explicitly listed in acceptedGrammaticalVariants.
 */
export function normalizeEvcToken(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ");
}

/**
 * Evaluates a learner's Open Cloze input against the 4-tier answer specification:
 * 1. Canonical Answer (1.0 pt)
 * 2. Accepted Grammatical / Orthographic Variants (1.0 pt)
 * 3. Human-Verified Contextual Alternatives (1.0 pt)
 * 4. Unverified / Morphological Near-Misses (0.0 pt + targeted feedback)
 */
export function evaluateOpenClozeBlank(
  rawInput: string,
  blank: EvcStage4Blank
): OpenClozeEvaluationResult {
  const normalized = normalizeEvcToken(rawInput || "");
  const canonicalNorm = normalizeEvcToken(blank.canonicalAnswer);

  if (!normalized) {
    return {
      isCorrect: false,
      matchTier: "INCORRECT",
      normalizedInput: "",
      canonicalAnswer: blank.canonicalAnswer,
      feedbackMessage: `Chưa điền đáp án. Đáp án chuẩn: "${blank.canonicalAnswer}".`,
    };
  }

  if (normalized === canonicalNorm) {
    return {
      isCorrect: true,
      matchTier: "CORRECT_CANONICAL",
      normalizedInput: normalized,
      canonicalAnswer: blank.canonicalAnswer,
      feedbackMessage: `Chính xác! "${blank.canonicalAnswer}" là đáp án chuẩn của bài.`,
    };
  }

  const variantMatches = blank.acceptedGrammaticalVariants.map(normalizeEvcToken);
  if (variantMatches.includes(normalized)) {
    return {
      isCorrect: true,
      matchTier: "CORRECT_VARIANT",
      normalizedInput: normalized,
      canonicalAnswer: blank.canonicalAnswer,
      feedbackMessage: `Chính xác! "${rawInput.trim()}" là biến thể chính tả/ngữ pháp hợp lệ của "${blank.canonicalAnswer}".`,
    };
  }

  const altMatches = blank.verifiedContextualAlternatives.map(normalizeEvcToken);
  if (altMatches.includes(normalized)) {
    return {
      isCorrect: true,
      matchTier: "CORRECT_VERIFIED_ALT",
      normalizedInput: normalized,
      canonicalAnswer: blank.canonicalAnswer,
      feedbackMessage: `Hợp lệ theo ngữ cảnh! Đáp án gợi ý chính của sách là "${blank.canonicalAnswer}".`,
    };
  }

  const nearMiss = blank.unverifiedSuggestedAnswers.find(
    (item) => normalizeEvcToken(item.value) === normalized
  );
  if (nearMiss) {
    return {
      isCorrect: false,
      matchTier: "INCORRECT_NEAR_MISS",
      normalizedInput: normalized,
      canonicalAnswer: blank.canonicalAnswer,
      feedbackMessage: nearMiss.feedbackReason,
    };
  }

  return {
    isCorrect: false,
    matchTier: "INCORRECT",
    normalizedInput: normalized,
    canonicalAnswer: blank.canonicalAnswer,
    feedbackMessage:
      blank.explanationVi || blank.explanationEn,
  };
}
