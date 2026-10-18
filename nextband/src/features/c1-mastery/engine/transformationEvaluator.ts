import { TransformationItem, EvaluationResult } from '../types/mastery.types';

/**
 * Strips punctuation around a token while keeping letters/numbers/apostrophes.
 * E.g., "got," -> "got", "(got)" -> "got", "got." -> "got".
 */
function stripTokenPunctuation(token: string): string {
  return token.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g, '');
}

/**
 * Normalizes input text:
 * - Trims leading/trailing whitespace
 * - Replaces multiple whitespace with single space
 * - Normalizes smart quotes/curly apostrophes to standard straight apostrophe
 * - Collapses spaces around apostrophes (e.g., "airline 's" -> "airline's")
 */
export function normalizeLearnerInput(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .replace(/[\u2018\u2019\u201B\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s+'\s*/g, "'");
}

/**
 * Counts words by whitespace separation after stripping isolated punctuation tokens.
 */
export function countWords(normalized: string): number {
  if (!normalized) return 0;
  return normalized.split(/\s+/).filter(Boolean).length;
}

/**
 * Calculates Levenshtein Distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Checks if the keyword appears as an autonomous word token in the input.
 * Handles surrounding punctuation (e.g., "got," or "(got)"), but rejects substrings inside larger words ("forgot", "gots").
 */
export function hasExactKeywordToken(normalized: string, keyword: string): boolean {
  if (!normalized || !keyword) return false;
  const keywordLower = keyword.trim().toLowerCase();
  const rawTokens = normalized.split(/\s+/).filter(Boolean);

  return rawTokens.some((t) => {
    const stripped = stripTokenPunctuation(t).toLowerCase();
    return stripped === keywordLower;
  });
}

/**
 * Evaluates a learner's transformation answer against a predefined item specification.
 *
 * Pedagogical Priority Pipeline:
 * 1. String Sanitization
 * 2. Keyword check (Ensure keyword is used without mutation)
 * 3. Exact Whitelist Matching (Case-insensitive comparison with acceptedAnswers)
 * 4. Explicit Near-Miss Pattern Checks (Intercept conceptual misconceptions immediately,
 *    EVEN IF word count is incomplete! E.g. catching "had suffered" before dumb word count check!)
 * 5. Word Count Check (Only flags word length if the student's idea is not a specific pedagogical near-miss)
 * 6. Low-distance Typo Check (Only 1 edit distance on non-keyword token, length >= 12)
 * 7. Unrecognized Fallback (Neutral, non-presumptuous notification)
 */
export function evaluateTransformation(
  rawInput: string,
  item: TransformationItem
): EvaluationResult {
  const normalized = normalizeLearnerInput(rawInput);
  const wordCount = countWords(normalized);

  if (!normalized) {
    return {
      verdict: 'CONSTRAINT_VIOLATION',
      feedbackVi: 'Vui lòng nhập câu trả lời của bạn vào chỗ trống.',
      normalizedInput: '',
      wordCount: 0,
    };
  }

  // 1. Check Keyword Presence and Immutability (handles surrounding punctuation properly)
  const keywordFound = hasExactKeywordToken(normalized, item.keyword);

  if (!keywordFound) {
    return {
      verdict: 'CONSTRAINT_VIOLATION',
      feedbackVi: `Vi phạm quy tắc: Bắt buộc sử dụng từ khóa in hoa "${item.keyword}" và không được thay đổi hình thái của từ này.`,
      normalizedInput: normalized,
      wordCount,
      diagnosticCode: 'KEYWORD_MUTATED',
    };
  }

  // 2. Exact Whitelist Matching (instant pass)
  const lowerInput = normalized.toLowerCase();
  for (const accepted of item.acceptedAnswers) {
    const normalizedAccepted = normalizeLearnerInput(accepted).toLowerCase();
    if (lowerInput === normalizedAccepted) {
      return {
        verdict: 'EXACT_MATCH',
        feedbackVi: 'Chính xác! Cấu trúc câu và biến đổi ngữ pháp hoàn toàn chuẩn xác.',
        normalizedInput: normalized,
        wordCount,
        matchedAcceptedAnswer: accepted,
      };
    }
  }

  // 3. PRIORITY: Explicit Near-Miss Rules (Catch conceptual/structural misconceptions FIRST)
  // This allows diagnosing "had suffered" or "got an external auditor inspect" right away
  // without frustrating the user with a generic "wrong word count" alert!
  for (const rule of item.nearMissRules) {
    if (rule.pattern.test(normalized)) {
      return {
        verdict: 'NEAR_MISS',
        feedbackVi: rule.feedbackVi,
        normalizedInput: normalized,
        wordCount,
        diagnosticCode: rule.diagnosticCode,
      };
    }
  }

  // 4. Word Count Constraints Check (Only check bounds if not a known pedagogical near-miss)
  if (wordCount < item.minWords || wordCount > item.maxWords) {
    return {
      verdict: 'CONSTRAINT_VIOLATION',
      feedbackVi: `Độ dài chưa phù hợp: Yêu cầu điền từ ${item.minWords} đến ${item.maxWords} từ (câu trả lời hiện tại có ${wordCount} từ). Hãy xem lại gợi ý khung cấu trúc bên dưới.`,
      normalizedInput: normalized,
      wordCount,
    };
  }

  // 5. Typo Slip Check (Single Edit Distance on Whitelisted Answers)
  for (const accepted of item.acceptedAnswers) {
    const acceptedLower = normalizeLearnerInput(accepted).toLowerCase();
    const distance = levenshteinDistance(lowerInput, acceptedLower);

    // If edit distance is 1 (and length is >= 12 chars to avoid short token accidental matches)
    if (distance === 1 && lowerInput.length >= 12) {
      return {
        verdict: 'TYPO_SLIP',
        feedbackVi: 'Gần chính xác! Có một lỗi chính tả nhỏ ở từ phụ. Hãy rà soát lại từng từ trước khi nộp.',
        normalizedInput: normalized,
        wordCount,
      };
    }
  }

  // 6. Unrecognized Fallback (Neutral, non-presumptuous)
  return {
    verdict: 'UNRECOGNIZED',
    feedbackVi: 'Hệ thống chưa nhận diện được cách diễn đạt này trong danh sách đáp án mẫu đã kiểm duyệt của bài tập. Vui lòng kiểm tra lại cấu trúc ngữ pháp trọng tâm hoặc nhấn "💡 Gợi ý khung câu".',
    normalizedInput: normalized,
    wordCount,
  };
}
