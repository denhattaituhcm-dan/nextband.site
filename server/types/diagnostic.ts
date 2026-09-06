export type ErrorCategory = "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | "OTHER" | "PRAISE";

export type DiagnosticScope = "SENTENCE" | "PARAGRAPH" | "ESSAY";
export type DiagnosticSeverity = "CRITICAL" | "MAJOR" | "MODERATE" | "MINOR" | "PRAISE";

// ── TIER 1: SENTENCE LEVEL DIAGNOSIS ──────────────────────────────────────────
export type SentenceDiagnosticTag =
  | "SUBJECT_VERB_AGREEMENT"
  | "TENSE_ASPECT"
  | "ARTICLE_DETERMINER"
  | "PREPOSITION"
  | "WORD_FORM"
  | "PRONOUN_REFERENCE"
  | "SENTENCE_FRAGMENT"
  | "RUN_ON_PUNCTUATION"
  | "PASSIVE_VOICE"
  | "RELATIVE_CLAUSE"
  | "SPELLING_TYPO"
  | "WORD_CHOICE"
  | "COLLOCATION"
  | "REPETITION"
  | "AWKWARD_PHRASING"
  | "INFORMAL_REGISTER"
  | "GOOD_COLLOCATION_VOCAB"
  | "COMPLEX_ACCURATE_STRUCTURE";

export interface SentenceFeedbackItem {
  sentenceIndex: number;
  originalSentence: string;
  category: ErrorCategory;
  tag: string | SentenceDiagnosticTag;
  note: string;
  suggestedSentence?: string;
  scope?: "SENTENCE";
  severity?: DiagnosticSeverity;
}

// ── TIER 2: DISCOURSE / PARAGRAPH LEVEL DIAGNOSIS ────────────────────────────
export type DiscourseDiagnosticCategory = "COHERENCE_COHESION" | "ARGUMENTATION_TASK";

export type DiscourseDiagnosticTag =
  | "MISSING_TRANSITION"
  | "OVERUSED_MECHANICAL_LINKERS"
  | "COHESION_BREAK"
  | "TOPIC_SENTENCE_UNCLEAR"
  | "PARAGRAPH_UNITY"
  | "WEAK_EXPLANATION"
  | "WEAK_SUPPORTING_EXAMPLE"
  | "UNDERDEVELOPED_ARGUMENT"
  | "LOGICAL_CONTRADICTION";

export interface DiscourseFeedbackItem {
  id?: string;
  scope: "PARAGRAPH";
  paragraphIndex: number;
  category: DiscourseDiagnosticCategory;
  tag: DiscourseDiagnosticTag;
  severity: DiagnosticSeverity;
  note: string;
  quoteOrContext?: string;
}

// ── TIER 3: ESSAY LEVEL DIAGNOSIS ────────────────────────────────────────────
export interface CriteriaScores {
  taskResponse?: number | null;
  coherence?: number | null;
  fluencyAndCoherence?: number | null;
  pronunciation?: number | null;
  lexical?: number | null;
  grammar?: number | null;
}

export interface EssayEvaluationSummary {
  strengths: string[];
  primaryWeakness: string;
  actionableAdvice: string;
  examinerNotes?: string;
}

export interface EssayDiagnosticPayload {
  bandScores: CriteriaScores & { overall?: number | null };
  summary: EssayEvaluationSummary;
}
