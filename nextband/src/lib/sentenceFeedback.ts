export type ErrorCategory = "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | "OTHER" | "PRAISE";

export interface SentenceFeedbackItem {
  sentenceIndex: number;
  originalSentence: string;
  category: ErrorCategory;
  tag: string;
  note: string;
  suggestedSentence?: string;
}

export interface CriteriaScores {
  // Writing Criteria
  taskResponse?: number | null;
  coherence?: number | null;

  // Speaking Criteria
  fluencyAndCoherence?: number | null;
  pronunciation?: number | null;

  // Shared Criteria
  lexical?: number | null;
  grammar?: number | null;
}

export interface StructuredFeedbackPayload {
  text?: string;
  primaryErrorCategory?: ErrorCategory | null;
  revisionRequired?: boolean;
  criteriaScores?: CriteriaScores | null;
  sentenceFeedbacks?: SentenceFeedbackItem[];
  tabSwitchCount?: number;
}

export function calculateWritingBand(scores?: CriteriaScores | null): string {
  if (!scores) return "—";
  const tr = scores.taskResponse;
  const cc = scores.coherence;
  const lr = scores.lexical;
  const gr = scores.grammar;
  const valid = [tr, cc, lr, gr].filter((s): s is number => typeof s === "number" && !isNaN(s));
  if (valid.length === 0) return "—";
  const sum = valid.reduce((a, b) => a + b, 0);
  const avg = sum / valid.length;
  return (Math.round(avg * 2) / 2).toFixed(1);
}

export function calculateSpeakingBand(scores?: CriteriaScores | null): string {
  if (!scores) return "—";
  const fc = scores.fluencyAndCoherence;
  const lr = scores.lexical;
  const gr = scores.grammar;
  const pr = scores.pronunciation;
  const valid = [fc, lr, gr, pr].filter((s): s is number => typeof s === "number" && !isNaN(s));
  if (valid.length === 0) return "—";
  const sum = valid.reduce((a, b) => a + b, 0);
  const avg = sum / valid.length;
  return (Math.round(avg * 2) / 2).toFixed(1);
}

export const PRESET_ERROR_TAGS: Record<ErrorCategory, string[]> = {
  GRAMMAR: [
    "Subject-Verb Agreement",
    "Tense / Aspect",
    "Preposition / Article",
    "Word Form",
    "Punctuation / Fragment",
    "Passive Voice / Inversion",
    "Relative Clause / Pronoun",
  ],
  EXPRESSION: [
    "Word Choice / Collocation",
    "Repetition / Redundancy",
    "Academic Tone / Register",
    "Awkward Phrasing",
    "Idiomatic Usage",
    "Spelling / Typo",
  ],
  STRUCTURE: [
    "Missing Transition / Linking",
    "Paragraph Organization",
    "Topic Sentence Clarity",
    "Run-on / Choppy Flow",
    "Cohesion Break",
    "Conclusion Incomplete",
  ],
  CONCEPT: [
    "Idea Off-topic",
    "Unclear Stance",
    "Insufficient Explanation",
    "Weak Supporting Example",
    "Logic Flaw / Contradiction",
    "Underdeveloped Argument",
  ],
  OTHER: [
    "Translation / Meaning Drift",
    "Omission / Missing Details",
    "Formatting / Layout",
    "General Improvement",
    "Custom Note",
  ],
  PRAISE: [
    "Good Vocabulary / Collocation",
    "Advanced Structure",
    "Natural Flow",
    "Accurate Translation",
    "Clear Argument",
    "Well-formed Sentence",
  ],
};

export const CATEGORY_COLORS: Record<
  ErrorCategory,
  {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    highlightBg: string;
  }
> = {
  PRAISE: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-800",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    highlightBg: "bg-emerald-100/70 hover:bg-emerald-100",
  },
  GRAMMAR: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-800",
    badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
    highlightBg: "bg-rose-100/70 hover:bg-rose-100",
  },
  EXPRESSION: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-800",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    highlightBg: "bg-amber-100/70 hover:bg-amber-100",
  },
  STRUCTURE: {
    bg: "bg-sky-50 dark:bg-sky-950/30",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-300 dark:border-sky-800",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
    highlightBg: "bg-sky-100/70 hover:bg-sky-100",
  },
  CONCEPT: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-300 dark:border-purple-800",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
    highlightBg: "bg-purple-100/70 hover:bg-purple-100",
  },
  OTHER: {
    bg: "bg-slate-50 dark:bg-slate-900/30",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-300 dark:border-slate-700",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
    highlightBg: "bg-slate-100/80 hover:bg-slate-200/70",
  },
};

/**
 * Splits essay raw text into distinct sentence units using punctuation delimiters
 * (. ? ! or multiple newlines) while preserving complete readability.
 */
export function segmentEssayIntoSentences(text: string): string[] {
  if (!text || typeof text !== "string") return [];

  // Match sentences ending with . ! ? followed by space/newline or end of text
  // Also preserve paragraph breaks as separate sentences if non-empty
  const rawSegments = text
    .split(/(?<=[.?!])\s+|\n{2,}/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (rawSegments.length === 0 && text.trim().length > 0) {
    return [text.trim()];
  }

  return rawSegments;
}

/**
 * Safely parses structured feedback from raw string (plain text or JSON string)
 */
export function parseStructuredFeedback(rawFeedback: string | null | undefined): StructuredFeedbackPayload {
  if (!rawFeedback) {
    return { sentenceFeedbacks: [] };
  }

  try {
    const parsed = JSON.parse(rawFeedback);
    if (parsed && typeof parsed === "object") {
      return {
        text: typeof parsed.text === "string" ? parsed.text : (typeof parsed.feedback === "string" ? parsed.feedback : ""),
        primaryErrorCategory: parsed.primaryErrorCategory || null,
        revisionRequired: !!parsed.revisionRequired,
        criteriaScores: parsed.criteriaScores || null,
        sentenceFeedbacks: Array.isArray(parsed.sentenceFeedbacks) ? parsed.sentenceFeedbacks : [],
        tabSwitchCount: typeof parsed.tabSwitchCount === "number" ? parsed.tabSwitchCount : 0,
      };
    }
  } catch {
    // If not JSON, it is raw string text
  }

  return {
    text: rawFeedback,
    sentenceFeedbacks: [],
  };
}

/**
 * Serializes structured feedback payload to clean JSON string
 */
export function serializeStructuredFeedback(payload: StructuredFeedbackPayload): string {
  return JSON.stringify({
    text: payload.text || "",
    primaryErrorCategory: payload.primaryErrorCategory || null,
    revisionRequired: !!payload.revisionRequired,
    criteriaScores: payload.criteriaScores || null,
    sentenceFeedbacks: payload.sentenceFeedbacks || [],
    tabSwitchCount: payload.tabSwitchCount || 0,
  });
}
