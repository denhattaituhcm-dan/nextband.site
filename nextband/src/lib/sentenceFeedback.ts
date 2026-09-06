export type ErrorCategory = "CONCEPT" | "STRUCTURE" | "EXPRESSION" | "GRAMMAR" | "OTHER" | "PRAISE";

export type DiagnosticScope = "SENTENCE" | "PARAGRAPH" | "ESSAY";
export type DiagnosticSeverity = "CRITICAL" | "MAJOR" | "MODERATE" | "MINOR" | "PRAISE";

// ── TIER 1: SENTENCE LEVEL DIAGNOSIS ──────────────────────────────────────────
export type SentenceDiagnosticTag =
  // Grammar & Syntax (GRA)
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
  // Lexical & Expression (LR)
  | "SPELLING_TYPO"
  | "WORD_CHOICE"
  | "COLLOCATION"
  | "REPETITION"
  | "AWKWARD_PHRASING"
  | "INFORMAL_REGISTER"
  // Praise & Strength
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
  // Coherence & Cohesion (CC)
  | "MISSING_TRANSITION"
  | "OVERUSED_MECHANICAL_LINKERS"
  | "COHESION_BREAK"
  | "TOPIC_SENTENCE_UNCLEAR"
  | "PARAGRAPH_UNITY"
  // Argumentation & Task (TR)
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

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING 4–3–1 DIAGNOSTIC SYSTEM TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** 4 IELTS Speaking Criteria */
export type SpeakingCriterion = "FC" | "LR" | "GRA" | "PR";

/**
 * Specific diagnostic error categories per criterion.
 * MUST keep criterion ≠ category — criterion is the IELTS dimension,
 * category is the specific error type within that dimension.
 *
 * Mapping:
 *   FC  → HESITATION | REPETITION | SELF_CORRECTION | FILLER_WORD |
 *          TOPIC_DEVELOPMENT | LINKING_IDEAS | PACING
 *   LR  → WORD_CHOICE | COLLOCATION | PARAPHRASE | TOPIC_VOCABULARY |
 *          IDIOM_MISUSE | REPETITION_VOCAB | WORD_FORM
 *   GRA → TENSE | SUBJECT_VERB_AGREEMENT | ARTICLE | PREPOSITION |
 *          SENTENCE_STRUCTURE | WORD_ORDER | CONDITIONAL |
 *          RELATIVE_CLAUSE | PLURAL_FORM
 *   PR  → WORD_STRESS | SENTENCE_STRESS | ENDING_SOUND |
 *          CONNECTED_SPEECH | INDIVIDUAL_SOUNDS | INTONATION | SYLLABLE_COUNT
 */
export type SpeakingDiagnosticCategory =
  // FC — Fluency & Coherence
  | "HESITATION"
  | "REPETITION"
  | "SELF_CORRECTION"
  | "FILLER_WORD"
  | "TOPIC_DEVELOPMENT"
  | "LINKING_IDEAS"
  | "PACING"
  // LR — Lexical Resource
  | "WORD_CHOICE"
  | "COLLOCATION"
  | "PARAPHRASE"
  | "TOPIC_VOCABULARY"
  | "IDIOM_MISUSE"
  | "REPETITION_VOCAB"
  | "WORD_FORM"
  // GRA — Grammatical Range & Accuracy
  | "TENSE"
  | "SUBJECT_VERB_AGREEMENT"
  | "ARTICLE"
  | "PREPOSITION"
  | "SENTENCE_STRUCTURE"
  | "WORD_ORDER"
  | "CONDITIONAL"
  | "RELATIVE_CLAUSE"
  | "PLURAL_FORM"
  // PR — Pronunciation
  | "WORD_STRESS"
  | "SENTENCE_STRESS"
  | "ENDING_SOUND"
  | "CONNECTED_SPEECH"
  | "INDIVIDUAL_SOUNDS"
  | "INTONATION"
  | "SYLLABLE_COUNT";

/** Maps each category to its parent criterion */
export const CATEGORY_CRITERION_MAP: Record<SpeakingDiagnosticCategory, SpeakingCriterion> = {
  // FC
  HESITATION: "FC",
  REPETITION: "FC",
  SELF_CORRECTION: "FC",
  FILLER_WORD: "FC",
  TOPIC_DEVELOPMENT: "FC",
  LINKING_IDEAS: "FC",
  PACING: "FC",
  // LR
  WORD_CHOICE: "LR",
  COLLOCATION: "LR",
  PARAPHRASE: "LR",
  TOPIC_VOCABULARY: "LR",
  IDIOM_MISUSE: "LR",
  REPETITION_VOCAB: "LR",
  WORD_FORM: "LR",
  // GRA
  TENSE: "GRA",
  SUBJECT_VERB_AGREEMENT: "GRA",
  ARTICLE: "GRA",
  PREPOSITION: "GRA",
  SENTENCE_STRUCTURE: "GRA",
  WORD_ORDER: "GRA",
  CONDITIONAL: "GRA",
  RELATIVE_CLAUSE: "GRA",
  PLURAL_FORM: "GRA",
  // PR
  WORD_STRESS: "PR",
  SENTENCE_STRESS: "PR",
  ENDING_SOUND: "PR",
  CONNECTED_SPEECH: "PR",
  INDIVIDUAL_SOUNDS: "PR",
  INTONATION: "PR",
  SYLLABLE_COUNT: "PR",
};

/** Categories available per criterion (for UI dropdowns) */
export const CATEGORIES_BY_CRITERION: Record<SpeakingCriterion, SpeakingDiagnosticCategory[]> = {
  FC: ["HESITATION", "REPETITION", "SELF_CORRECTION", "FILLER_WORD", "TOPIC_DEVELOPMENT", "LINKING_IDEAS", "PACING"],
  LR: ["WORD_CHOICE", "COLLOCATION", "PARAPHRASE", "TOPIC_VOCABULARY", "IDIOM_MISUSE", "REPETITION_VOCAB", "WORD_FORM"],
  GRA: ["TENSE", "SUBJECT_VERB_AGREEMENT", "ARTICLE", "PREPOSITION", "SENTENCE_STRUCTURE", "WORD_ORDER", "CONDITIONAL", "RELATIVE_CLAUSE", "PLURAL_FORM"],
  PR: ["WORD_STRESS", "SENTENCE_STRESS", "ENDING_SOUND", "CONNECTED_SPEECH", "INDIVIDUAL_SOUNDS", "INTONATION", "SYLLABLE_COUNT"],
};

/** Vietnamese display labels for each diagnostic category */
export const CATEGORY_LABEL_VI: Record<SpeakingDiagnosticCategory, string> = {
  // FC
  HESITATION: "Ngập ngừng / Dừng lâu",
  REPETITION: "Lặp lại từ / cụm từ",
  SELF_CORRECTION: "Tự sửa giữa chừng",
  FILLER_WORD: "Dùng filler (uh, um, like...)",
  TOPIC_DEVELOPMENT: "Phát triển ý chưa đủ",
  LINKING_IDEAS: "Liên kết ý còn yếu",
  PACING: "Nhịp nói bất thường",
  // LR
  WORD_CHOICE: "Chọn từ chưa phù hợp",
  COLLOCATION: "Kết hợp từ sai (collocation)",
  PARAPHRASE: "Diễn đạt lại kém",
  TOPIC_VOCABULARY: "Thiếu từ vựng chủ đề",
  IDIOM_MISUSE: "Dùng thành ngữ sai",
  REPETITION_VOCAB: "Lặp từ vựng quá nhiều",
  WORD_FORM: "Sai dạng từ (word form)",
  // GRA
  TENSE: "Sai thì / thể",
  SUBJECT_VERB_AGREEMENT: "Chủ vị không nhất quán",
  ARTICLE: "Sai mạo từ (a/an/the)",
  PREPOSITION: "Sai giới từ",
  SENTENCE_STRUCTURE: "Cấu trúc câu chưa đúng",
  WORD_ORDER: "Trật tự từ sai",
  CONDITIONAL: "Sai câu điều kiện",
  RELATIVE_CLAUSE: "Sai mệnh đề quan hệ",
  PLURAL_FORM: "Sai số nhiều / số ít",
  // PR
  WORD_STRESS: "Sai trọng âm từ",
  SENTENCE_STRESS: "Sai trọng âm câu",
  ENDING_SOUND: "Nuốt âm cuối",
  CONNECTED_SPEECH: "Nối âm chưa tự nhiên",
  INDIVIDUAL_SOUNDS: "Phát âm âm đơn sai",
  INTONATION: "Ngữ điệu chưa phù hợp",
  SYLLABLE_COUNT: "Sai số âm tiết",
};

/** Priority levels for 4–3–1 system */
export type SpeakingPriority = "P1" | "P2" | "P3";

/** Display config for each priority */
export const PRIORITY_CONFIG: Record<SpeakingPriority, { labelVi: string; color: string; description: string }> = {
  P1: {
    labelVi: "Fix First — Cần sửa ngay",
    color: "rose",
    description: "Lỗi quan trọng nhất, ảnh hưởng trực tiếp đến band score",
  },
  P2: {
    labelVi: "Improve — Cần cải thiện",
    color: "amber",
    description: "Lỗi cần cải thiện để nâng band score tiếp theo",
  },
  P3: {
    labelVi: "Refine — Cần tinh chỉnh",
    color: "sky",
    description: "Lỗi nhỏ, tinh chỉnh để nói tự nhiên hơn",
  },
};

/**
 * A single priority error diagnosed by the teacher.
 * criterion + category are SEPARATE — criterion is the IELTS dimension,
 * category is the specific error type within that dimension.
 */
export interface SpeakingCorrectionItem {
  id: string;
  priority: SpeakingPriority;
  criterion: SpeakingCriterion;
  category: SpeakingDiagnosticCategory;
  timestamp?: { start: number; end: number };
  segmentId?: string;
  studentSaid: string;
  correction: string;
  note?: string;
}

/**
 * Competency Strength Tag — must map to an IELTS criterion for analytics.
 * These are ISSUE/STRENGTH evidence, not free text.
 */
export interface SpeakingStrengthTag {
  id: string;
  criterion: SpeakingCriterion;
  labelVi: string;
}

/** Preset strength tags available for teacher quick-select */
export const PRESET_STRENGTH_TAGS: SpeakingStrengthTag[] = [
  // PR strengths
  { id: "pr_ending_sound", criterion: "PR", labelVi: "Phát âm âm cuối rõ" },
  { id: "pr_connected_speech", criterion: "PR", labelVi: "Nối âm tự nhiên" },
  { id: "pr_word_stress", criterion: "PR", labelVi: "Nhấn trọng âm đúng" },
  { id: "pr_intonation", criterion: "PR", labelVi: "Ngữ điệu phong phú" },
  // FC strengths
  { id: "fc_fluent", criterion: "FC", labelVi: "Duy trì nhịp nói tốt" },
  { id: "fc_linking", criterion: "FC", labelVi: "Liên kết ý mạch lạc" },
  { id: "fc_development", criterion: "FC", labelVi: "Phát triển ý đầy đủ" },
  // LR strengths
  { id: "lr_diverse_vocab", criterion: "LR", labelVi: "Dùng từ đa dạng" },
  { id: "lr_collocation", criterion: "LR", labelVi: "Collocation tự nhiên" },
  { id: "lr_topic_vocab", criterion: "LR", labelVi: "Vốn từ chủ đề phong phú" },
  { id: "lr_paraphrase", criterion: "LR", labelVi: "Diễn đạt lại linh hoạt" },
  // GRA strengths
  { id: "gra_complex_sent", criterion: "GRA", labelVi: "Câu phức đa dạng" },
  { id: "gra_accurate", criterion: "GRA", labelVi: "Ít lỗi ngữ pháp" },
  { id: "gra_tense", criterion: "GRA", labelVi: "Dùng thì chính xác" },
];

/** Teacher-guided summary (replaces free textarea) */
export interface SpeakingTeacherSummary {
  strongestPoint?: string;
  mainArea?: string;
  nextTarget?: string;
  teacherNote?: string; // Optional free text ≤ 300 chars
}

/** Retry mission — auto-populated from P1 correction */
export interface SpeakingRetryMission {
  originalSentence: string;
  targetSentence: string;
  missionPrompt?: string;
  /** Track if student fixed this in their next attempt */
  fixedInRetry?: boolean;
  relatedAttemptAnswerId?: string;
}

// ── Sentence-Level Diagnostic Annotation ───────────────────────────────────────
export interface SpeakingSentenceAnnotation {
  id: string;
  segmentId: string;
  startMs: number;
  endMs: number;
  text: string;
  kind: "STRENGTH" | "ISSUE";
  criterion: SpeakingCriterion;
  category: string; // Diagnostic category or strength tag
  correction?: string;
  note?: string;
}

/**
 * Diagnostic Aggregator Engine:
 * Aggregates fine-grained sentence annotations into the 4–3–1 diagnostic summary.
 */
export function aggregateSpeakingAnnotations(annotations: SpeakingSentenceAnnotation[]): {
  speakingCorrections: SpeakingCorrectionItem[];
  speakingStrengths: string[];
  speakingSummary: SpeakingTeacherSummary;
  speakingRetryMission?: SpeakingRetryMission;
} {
  const issues = annotations.filter((a) => a.kind === "ISSUE");
  const strengths = annotations.filter((a) => a.kind === "STRENGTH");

  // Map strengths to unique tag IDs
  const speakingStrengths = Array.from(new Set(strengths.map((s) => s.category)));

  // Top 3 issues become P1, P2, P3
  // Prioritize issues that have a concrete correction
  const sortedIssues = [...issues].sort((a, b) => {
    if (a.correction && !b.correction) return -1;
    if (!a.correction && b.correction) return 1;
    return 0;
  });

  const priorities: SpeakingPriority[] = ["P1", "P2", "P3"];
  const speakingCorrections: SpeakingCorrectionItem[] = sortedIssues.slice(0, 3).map((iss, idx) => ({
    id: iss.id,
    priority: priorities[idx],
    criterion: iss.criterion,
    category: iss.category as SpeakingDiagnosticCategory,
    timestamp: { start: iss.startMs, end: iss.endMs },
    segmentId: iss.segmentId,
    studentSaid: iss.text,
    correction: iss.correction || "",
    note: iss.note,
  }));

  // Auto-generate Retry Mission from P1 (if P1 has correction or text)
  let speakingRetryMission: SpeakingRetryMission | undefined = undefined;
  const p1 = speakingCorrections[0];
  if (p1 && p1.studentSaid) {
    speakingRetryMission = {
      originalSentence: p1.studentSaid,
      targetSentence: p1.correction || p1.studentSaid,
      missionPrompt: `Nói lại câu này chuẩn xác (${CATEGORY_LABEL_VI[p1.category] || p1.category})`,
    };
  }

  // Auto-generate summary
  const strengthLabels = strengths.map((s) => {
    const preset = PRESET_STRENGTH_TAGS.find((t) => t.id === s.category);
    return preset ? preset.labelVi : s.category;
  });
  const strongestPoint = strengthLabels.length > 0
    ? `Học viên thể hiện tốt ở: ${Array.from(new Set(strengthLabels)).slice(0, 2).join(", ")}.`
    : undefined;

  const mainArea = p1
    ? `Trọng tâm cần khắc phục ngay (${p1.criterion}): ${CATEGORY_LABEL_VI[p1.category] || p1.category}.`
    : undefined;

  const nextTarget = p1 && p1.correction
    ? `Luyện phát âm/nói lại cấu trúc: "${p1.correction}".`
    : p1
    ? `Chú ý kiểm soát lỗi ${CATEGORY_LABEL_VI[p1.category] || p1.category} khi triển khai ý.`
    : undefined;

  const speakingSummary: SpeakingTeacherSummary = {
    strongestPoint,
    mainArea,
    nextTarget,
  };

  return {
    speakingCorrections,
    speakingStrengths,
    speakingSummary,
    speakingRetryMission,
  };
}

export interface StructuredFeedbackPayload {
  text?: string;
  primaryErrorCategory?: ErrorCategory | null;
  revisionRequired?: boolean;
  criteriaScores?: CriteriaScores | null;
  sentenceFeedbacks?: SentenceFeedbackItem[];
  tabSwitchCount?: number;
  // ── Writing 3-Tier Diagnostic Fields ───────────────────────────────────────
  discourseFeedbacks?: DiscourseFeedbackItem[];
  essayDiagnostic?: EssayDiagnosticPayload;
  // ── Speaking 4–3–1 Diagnostic Fields ──────────────────────────────────────
  speakingAnnotations?: SpeakingSentenceAnnotation[];
  speakingCorrections?: SpeakingCorrectionItem[];
  speakingStrengths?: string[]; // Array of SpeakingStrengthTag.id
  speakingSummary?: SpeakingTeacherSummary;
  speakingRetryMission?: SpeakingRetryMission;
}


// ─────────────────────────────────────────────────────────────────────────────
// IELTS BAND SCORE CALCULATORS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculates a single skill band (Speaking / Writing) from its 4 component criteria.
 * RULE: When averaging the 4 criteria of a single skill, the score is ROUNDED DOWN
 * (truncated to nearest 0.5): Math.floor(avg * 2) / 2.
 * E.g.: avg = 6.25 -> 6.0, avg = 6.75 -> 6.5.
 */
export function calculateSkillBand(avgOrScores: number | number[]): number {
  let avg: number;
  if (Array.isArray(avgOrScores)) {
    const valid = avgOrScores.filter((s): s is number => typeof s === "number" && !isNaN(s));
    if (valid.length === 0) return 0;
    avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  } else {
    avg = avgOrScores;
  }
  return Math.floor(avg * 2) / 2;
}

export function calculateWritingBand(scores?: CriteriaScores | null): string {
  if (!scores) return "—";
  const tr = scores.taskResponse;
  const cc = scores.coherence;
  const lr = scores.lexical;
  const gr = scores.grammar;
  const valid = [tr, cc, lr, gr].filter((s): s is number => typeof s === "number" && !isNaN(s));
  if (valid.length === 0) return "—";
  return calculateSkillBand(valid).toFixed(1);
}

export function calculateSpeakingBand(scores?: CriteriaScores | null): string {
  if (!scores) return "—";
  const fc = scores.fluencyAndCoherence;
  const lr = scores.lexical;
  const gr = scores.grammar;
  const pr = scores.pronunciation;
  const valid = [fc, lr, gr, pr].filter((s): s is number => typeof s === "number" && !isNaN(s));
  if (valid.length === 0) return "—";
  return calculateSkillBand(valid).toFixed(1);
}

/**
 * Calculates IELTS OVERALL Band from the 4 distinct skills (Listening, Reading, Writing, Speaking).
 * RULE: The official IELTS overall exam score rounds UP at the .25 and .75 boundaries:
 *   fraction < 0.25  → round down to nearest whole
 *   0.25 ≤ fraction < 0.75 → round to .5
 *   fraction ≥ 0.75 → round up to nearest whole
 *
 * NOTE: This applies ONLY to the overall average of the 4 test skills, NOT within a single skill!
 *
 * @example
 *   calculateIELTSOverall([6, 6, 6, 6])   → 6.0  (avg=6.0)
 *   calculateIELTSOverall([6, 6, 6.5, 6]) → 6.0  (avg=6.125, fraction=0.125 < 0.25)
 *   calculateIELTSOverall([6, 6.5, 6.5, 6.5]) → 6.5 (avg=6.375, fraction=0.375)
 *   calculateIELTSOverall([7, 7, 6.5, 7]) → 7.0  (avg=6.875, fraction=0.875 ≥ 0.75)
 */
export function calculateIELTSOverall(avgOrScores: number | number[]): number {
  let avg: number;
  if (Array.isArray(avgOrScores)) {
    const valid = avgOrScores.filter((s): s is number => typeof s === "number" && !isNaN(s));
    if (valid.length === 0) return 0;
    avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  } else {
    avg = avgOrScores;
  }

  const whole = Math.floor(avg);
  const fraction = avg - whole;

  if (fraction < 0.25) return whole;
  if (fraction < 0.75) return whole + 0.5;
  return whole + 1;
}


// ─────────────────────────────────────────────────────────────────────────────
// WRITING PRESET ERROR TAGS (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

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

export interface ParagraphSentenceGroup {
  text: string;
  globalIndex: number;
}

export interface SegmentedParagraphsResult {
  paragraphs: ParagraphSentenceGroup[][];
  sentences: string[];
}

/**
 * Splits essay raw text into paragraph blocks and distinct sentence units,
 * preventing list index markers (e.g., "1.", "2)", "a.") and abbreviations
 * from being isolated or breaking onto wrong lines.
 */
export function segmentEssayIntoParagraphs(text: string): SegmentedParagraphsResult {
  if (!text || typeof text !== "string") {
    return { paragraphs: [], sentences: [] };
  }

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!normalized) {
    return { paragraphs: [], sentences: [] };
  }

  const rawLines = normalized.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const paragraphs: ParagraphSentenceGroup[][] = [];
  const sentences: string[] = [];
  let globalIndex = 0;

  const isListMarkerOrIncomplete = (str: string) => {
    const s = str.trim();
    if (!s) return true;
    if (/^\(?\d+[\.\)]?$/.test(s)) return true;
    if (/^\(?[a-zA-Z][\.\)]$/.test(s)) return true;
    if (/^[-*•]+$/.test(s)) return true;
    if (/\b(mr|mrs|ms|dr|prof|sr|jr|vs|etc|e\.g|i\.e|no|approx)\.$/i.test(s)) return true;
    if (!/[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9]/.test(s)) return true;
    return false;
  };

  for (const line of rawLines) {
    const rawSegments = line
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const merged: string[] = [];
    for (let i = 0; i < rawSegments.length; i++) {
      const seg = rawSegments[i];
      if (merged.length > 0 && isListMarkerOrIncomplete(merged[merged.length - 1])) {
        merged[merged.length - 1] = merged[merged.length - 1] + " " + seg;
      } else {
        merged.push(seg);
      }
    }

    if (merged.length > 1 && isListMarkerOrIncomplete(merged[merged.length - 1])) {
      const last = merged.pop()!;
      merged[merged.length - 1] = merged[merged.length - 1] + " " + last;
    }

    const paraSentences: ParagraphSentenceGroup[] = [];
    for (const s of merged) {
      const trimmed = s.trim();
      if (trimmed.length > 0) {
        paraSentences.push({
          text: trimmed,
          globalIndex: globalIndex++,
        });
        sentences.push(trimmed);
      }
    }

    if (paraSentences.length > 0) {
      paragraphs.push(paraSentences);
    }
  }

  if (sentences.length === 0 && text.trim().length > 0) {
    const single = text.trim();
    sentences.push(single);
    paragraphs.push([{ text: single, globalIndex: 0 }]);
  }

  return { paragraphs, sentences };
}

/**
 * Splits essay raw text into distinct sentence units using punctuation delimiters
 * while preserving list markers, abbreviations, and sentence readability.
 */
export function segmentEssayIntoSentences(text: string): string[] {
  return segmentEssayIntoParagraphs(text).sentences;
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
        // Writing 3-Tier diagnostic fields
        discourseFeedbacks: Array.isArray(parsed.discourseFeedbacks) ? parsed.discourseFeedbacks : undefined,
        essayDiagnostic: parsed.essayDiagnostic && typeof parsed.essayDiagnostic === "object" ? parsed.essayDiagnostic : undefined,
        // Speaking 4–3–1 fields
        speakingAnnotations: Array.isArray(parsed.speakingAnnotations) ? parsed.speakingAnnotations : undefined,
        speakingCorrections: Array.isArray(parsed.speakingCorrections) ? parsed.speakingCorrections : undefined,
        speakingStrengths: Array.isArray(parsed.speakingStrengths) ? parsed.speakingStrengths : undefined,
        speakingSummary: parsed.speakingSummary && typeof parsed.speakingSummary === "object" ? parsed.speakingSummary : undefined,
        speakingRetryMission: parsed.speakingRetryMission && typeof parsed.speakingRetryMission === "object" ? parsed.speakingRetryMission : undefined,
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
    // Writing 3-Tier fields (omit undefined to keep JSON clean)
    ...(payload.discourseFeedbacks !== undefined && { discourseFeedbacks: payload.discourseFeedbacks }),
    ...(payload.essayDiagnostic !== undefined && { essayDiagnostic: payload.essayDiagnostic }),
    // Speaking 4–3–1 fields (omit undefined to keep JSON clean)
    ...(payload.speakingAnnotations !== undefined && { speakingAnnotations: payload.speakingAnnotations }),
    ...(payload.speakingCorrections !== undefined && { speakingCorrections: payload.speakingCorrections }),
    ...(payload.speakingStrengths !== undefined && { speakingStrengths: payload.speakingStrengths }),
    ...(payload.speakingSummary !== undefined && { speakingSummary: payload.speakingSummary }),
    ...(payload.speakingRetryMission !== undefined && { speakingRetryMission: payload.speakingRetryMission }),
  });
}

