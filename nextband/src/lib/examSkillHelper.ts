/**
 * Exam Skill & Auto-Grading Helper
 * Accurately detects exam skills and determines if an exam is auto-graded (objective) vs manual graded (subjective).
 */

export type ExamSkillType =
  | "reading"
  | "listening"
  | "reading_listening"
  | "writing"
  | "speaking"
  | "grammar"
  | "objective";

export interface SkillBadgeConfig {
  skill: ExamSkillType;
  label: string;
  shortLabel: string;
  badgeClass: string;
  iconType: "book" | "headphones" | "mic" | "pen" | "check";
}

/**
 * Question types that strictly require manual teacher scoring & rubric evaluation.
 */
const SUBJECTIVE_QUESTION_TYPES = new Set([
  "essay",
  "writing",
  "speaking",
  "ielts_writing_task1",
  "ielts_writing_task2",
  "ielts_speaking_part1",
  "ielts_speaking_part2",
  "ielts_speaking_part3",
  "manual_grade",
  "open_question",
]);

/**
 * Normalizes string for keyword matching
 */
function normalizeText(text?: string | null): string {
  if (!text) return "";
  return text.toLowerCase().trim();
}

/**
 * Checks if a title or string matches Speaking patterns (full words or codes: SPK, speaking, nói, etc.)
 */
export function isSpeakingMatch(text?: string | null): boolean {
  if (!text) return false;
  const clean = text.toLowerCase();
  return (
    /\b(spk|speaking|talk|khẩu ngữ|nói)\b/i.test(clean) ||
    /(?:^|[\s\-_])spk(?:[\s\-_]|$)/i.test(clean) ||
    clean.includes("speaking") ||
    clean.includes("nói")
  );
}

/**
 * Checks if a title or string matches Writing patterns (full words or codes: WRI, WR, writing, viết, etc.)
 */
export function isWritingMatch(text?: string | null): boolean {
  if (!text) return false;
  const clean = text.toLowerCase();
  return (
    /\b(wri|wr|writing|essay|viết|tự luận)\b/i.test(clean) ||
    /(?:^|[\s\-_])(wri|wr)(?:[\s\-_]|$)/i.test(clean) ||
    /\btask\s*[12]\b/i.test(clean) ||
    clean.includes("writing") ||
    clean.includes("viết") ||
    clean.includes("essay")
  );
}

/**
 * Checks if a title or string matches Listening patterns (full words or codes: LIS, listening, nghe, etc.)
 */
export function isListeningMatch(text?: string | null): boolean {
  if (!text) return false;
  const clean = text.toLowerCase();
  return (
    /\b(lis|listening|nghe)\b/i.test(clean) ||
    /(?:^|[\s\-_])lis(?:[\s\-_]|$)/i.test(clean) ||
    clean.includes("listening") ||
    clean.includes("nghe")
  );
}

/**
 * Checks if a title or string matches Reading patterns (full words or codes: REA, reading, đọc, etc.)
 */
export function isReadingMatch(text?: string | null): boolean {
  if (!text) return false;
  const clean = text.toLowerCase();
  return (
    /\b(rea|read|reading|đọc)\b/i.test(clean) ||
    /(?:^|[\s\-_])rea(?:[\s\-_]|$)/i.test(clean) ||
    clean.includes("reading") ||
    clean.includes("đọc")
  );
}

/**
 * Checks if a title or string matches Grammar / Vocab patterns (GRA, VOCAB, grammar, từ vựng, etc.)
 */
export function isGrammarMatch(text?: string | null): boolean {
  if (!text) return false;
  const clean = text.toLowerCase();
  return (
    /\b(gra|grammar|vocab|vocabulary|ngữ pháp|từ vựng)\b/i.test(clean) ||
    /(?:^|[\s\-_])(gra|vocab)(?:[\s\-_]|$)/i.test(clean) ||
    clean.includes("grammar") ||
    clean.includes("vocab") ||
    clean.includes("ngữ pháp") ||
    clean.includes("từ vựng")
  );
}

/**
 * Determines whether an exam/homework item contains subjective questions that require manual teacher grading.
 */
export function isAutoGradedExam(examOrItem: any): boolean {
  if (!examOrItem) return true;

  const skill = detectExamSkill(examOrItem);
  // Speaking and Writing are ALWAYS manual-graded subjective tests!
  if (skill === "speaking" || skill === "writing") {
    return false;
  }

  // Check sections and questions if available
  const sections = examOrItem.sections || examOrItem.exam?.sections || [];
  for (const sec of sections) {
    const secType = normalizeText(sec.sectionType || sec.section_type);
    if (secType === "speaking" || secType === "writing") {
      return false;
    }

    const groups = sec.questionGroups || sec.question_groups || [];
    for (const grp of groups) {
      const questions = grp.questions || [];
      for (const q of questions) {
        const qType = normalizeText(q.questionType || q.question_type);
        if (SUBJECTIVE_QUESTION_TYPES.has(qType)) {
          return false;
        }
      }
    }
  }

  // Check if answers have audio
  const answers = examOrItem.answers || examOrItem.submission?.answers || [];
  const hasAudioAnswer = answers.some(
    (a: any) =>
      (a.audioUrl && a.audioUrl.trim().length > 0) ||
      (typeof a.answerText === "string" && a.answerText.includes("speaking-recordings/"))
  );
  if (hasAudioAnswer) {
    return false;
  }

  // Fallback: If examType or skill is pure objective
  if (["reading", "listening", "reading_listening", "grammar", "quiz", "objective"].includes(skill)) {
    return true;
  }

  return true;
}

/**
 * Detects the dominant skill type of an exam / homework item.
 */
export function detectExamSkill(examOrItem: any): ExamSkillType {
  if (!examOrItem) return "objective";

  const rawExamType = normalizeText(examOrItem.examType || examOrItem.exam_type || examOrItem.type);
  const rawTitle = normalizeText(
    examOrItem.title ||
    examOrItem.homeworkTitle ||
    examOrItem.homework_title ||
    examOrItem.homework?.title ||
    examOrItem.name
  );

  // 1. Inspect questions and sections if available (deepest ground truth)
  const sections = examOrItem.sections || examOrItem.exam?.sections || [];
  const sectionTypes = new Set<string>();
  const activeSectionTypes = new Set<string>();
  let hasSpeakingQuestion = false;
  let hasWritingQuestion = false;

  sections.forEach((sec: any) => {
    const st = normalizeText(sec.sectionType || sec.section_type);
    const title = normalizeText(sec.title);
    if (st) sectionTypes.add(st);
    if (title.includes("grammar")) sectionTypes.add("grammar");

    const groups = sec.questionGroups || sec.question_groups || [];
    let qCount = 0;
    groups.forEach((grp: any) => {
      const questions = grp.questions || [];
      qCount += questions.length;
      questions.forEach((q: any) => {
        const qt = normalizeText(q.questionType || q.question_type);
        if (qt === "speaking" || qt.startsWith("ielts_speaking")) {
          hasSpeakingQuestion = true;
        }
        if (qt === "writing" || (qt === "essay" && (st === "writing" || title.includes("writing")))) {
          hasWritingQuestion = true;
        }
      });
    });

    if (qCount > 0) {
      if (title.includes("grammar") || st === "general") {
        activeSectionTypes.add("grammar");
      } else if (st) {
        activeSectionTypes.add(st);
      }
    }
  });

  const answers = examOrItem.answers || examOrItem.submission?.answers || [];
  const hasAudioAnswer = answers.some(
    (a: any) =>
      (a.audioUrl && a.audioUrl.trim().length > 0) ||
      (typeof a.answerText === "string" && a.answerText.includes("speaking-recordings/"))
  );

  if (hasSpeakingQuestion || hasAudioAnswer) {
    return "speaking";
  }
  if (hasWritingQuestion) {
    return "writing";
  }

  // If we have distinct active sections with questions:
  if (activeSectionTypes.size === 1) {
    if (activeSectionTypes.has("grammar")) return "grammar";
    if (activeSectionTypes.has("listening")) return "listening";
    if (activeSectionTypes.has("reading")) return "reading";
    if (activeSectionTypes.has("speaking")) return "speaking";
    if (activeSectionTypes.has("writing")) return "writing";
  } else if (activeSectionTypes.has("reading") && activeSectionTypes.has("listening")) {
    return "reading_listening";
  }

  // If a section is specifically titled Grammar and is the only active or explicitly typed section
  if (sectionTypes.has("grammar") && !sectionTypes.has("writing") && !sectionTypes.has("speaking")) {
    return "grammar";
  }

  // 2. Explicit examType check
  if (rawExamType === "speaking" || rawExamType === "spk") return "speaking";
  if (rawExamType === "writing" || rawExamType === "wri") return "writing";
  if (
    rawExamType === "reading_listening" ||
    rawExamType === "reading-listening" ||
    rawExamType === "reading & listening"
  ) {
    return "reading_listening";
  }
  if (rawExamType === "reading" || rawExamType === "rea") return "reading";
  if (rawExamType === "listening" || rawExamType === "lis") return "listening";
  if (rawExamType === "grammar" || rawExamType === "vocab") return "grammar";

  // 3. Pattern matching on Title (supports codes: SPK, WRI, WR, LIS, REA, VOCAB, GRA)
  const hasReadingTitle = isReadingMatch(rawTitle);
  const hasListeningTitle = isListeningMatch(rawTitle);
  const hasSpeakingTitle = isSpeakingMatch(rawTitle);
  const hasWritingTitle = isWritingMatch(rawTitle);
  const hasGrammarTitle = isGrammarMatch(rawTitle);

  // If title is WRI / WR but the section is Grammar with no writing questions, it's grammar!
  if (sectionTypes.has("grammar") && (hasWritingTitle || hasGrammarTitle)) {
    return "grammar";
  }

  // Combo Reading & Listening
  if (
    (hasReadingTitle && hasListeningTitle) ||
    (sectionTypes.has("reading") && sectionTypes.has("listening"))
  ) {
    return "reading_listening";
  }

  // Speaking (Tự luận nói)
  if (hasSpeakingTitle || sectionTypes.has("speaking")) {
    return "speaking";
  }

  // Writing (Tự luận viết)
  if (hasWritingTitle || sectionTypes.has("writing")) {
    return "writing";
  }

  // Pure Reading (Trắc nghiệm đọc)
  if (hasReadingTitle || sectionTypes.has("reading")) {
    return "reading";
  }

  // Pure Listening (Trắc nghiệm nghe)
  if (hasListeningTitle || sectionTypes.has("listening")) {
    return "listening";
  }

  // Grammar / Vocab (Trắc nghiệm ngữ pháp / từ vựng)
  if (hasGrammarTitle || sectionTypes.has("grammar")) {
    return "grammar";
  }

  return "objective";
}

/**
 * Returns badge styling and label for the given skill.
 */
export function getSkillBadgeConfig(skill: ExamSkillType): SkillBadgeConfig {
  switch (skill) {
    case "reading_listening":
      return {
        skill: "reading_listening",
        label: "📖 Trắc nghiệm Reading & Listening",
        shortLabel: "READING & LISTENING",
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800",
        iconType: "book",
      };
    case "reading":
      return {
        skill: "reading",
        label: "📖 Trắc nghiệm Reading",
        shortLabel: "READING",
        badgeClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
        iconType: "book",
      };
    case "listening":
      return {
        skill: "listening",
        label: "🎧 Trắc nghiệm Listening",
        shortLabel: "LISTENING",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
        iconType: "headphones",
      };
    case "speaking":
      return {
        skill: "speaking",
        label: "🎙️ Tự luận Speaking",
        shortLabel: "SPEAKING",
        badgeClass: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
        iconType: "mic",
      };
    case "writing":
      return {
        skill: "writing",
        label: "✍️ Tự luận Writing",
        shortLabel: "WRITING",
        badgeClass: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
        iconType: "pen",
      };
    case "grammar":
      return {
        skill: "grammar",
        label: "📝 Trắc nghiệm Grammar",
        shortLabel: "GRAMMAR",
        badgeClass: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800",
        iconType: "check",
      };
    case "objective":
    default:
      return {
        skill: "objective",
        label: "📝 Trắc nghiệm",
        shortLabel: "TRẮC NGHIỆM",
        badgeClass: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",
        iconType: "check",
      };
  }
}

/**
 * Checks if a skill is an objective skill (1 point per question, auto-graded).
 */
export function isObjectiveSkill(skill: ExamSkillType): boolean {
  return skill === "grammar" || skill === "listening" || skill === "reading" || skill === "reading_listening" || skill === "objective";
}

/**
 * Formats score display according to the 2 grading models:
 * 1. Objective (Grammar, Listening, Reading): "X/Y câu" (1 point per question)
 * 2. Subjective (Writing, Speaking): "Band X.X" or "Chờ chấm"
 */
export function formatSkillScoreDisplay(
  skill: ExamSkillType,
  submission: any
): {
  scoreText: string;
  subText: string;
  isGraded: boolean;
  isPending: boolean;
} {
  if (!submission) {
    return {
      scoreText: "Chưa làm",
      subText: isObjectiveSkill(skill) ? "1 câu = 1 điểm" : "Chấm theo Band IELTS",
      isGraded: false,
      isPending: false,
    };
  }

  const rawStatus = String(submission.status || "").toUpperCase();
  const isGraded = rawStatus === "GRADED";
  const isSubmitted = rawStatus === "SUBMITTED" || rawStatus === "GRADING";

  // Case 1: Objective Skills (Grammar, Listening, Reading)
  if (isObjectiveSkill(skill)) {
    if (submission.correctAnswers != null && submission.totalQuestions != null) {
      const correct = Number(submission.correctAnswers);
      const total = Number(submission.totalQuestions);
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
      return {
        scoreText: `${correct}/${total} câu`,
        subText: `${pct}% chính xác (${correct} điểm)`,
        isGraded: true,
        isPending: false,
      };
    }
    if (submission.score != null || submission.totalScore != null) {
      const scoreVal = Number(submission.score ?? submission.totalScore);
      return {
        scoreText: `${scoreVal} điểm`,
        subText: "Trắc nghiệm tự động chấm",
        isGraded: true,
        isPending: false,
      };
    }
    if (isSubmitted) {
      return {
        scoreText: "Đã nộp",
        subText: "Đang tính điểm",
        isGraded: false,
        isPending: true,
      };
    }
  }

  // Case 2: Subjective Skills (Writing, Speaking)
  if (skill === "writing" || skill === "speaking") {
    if (isGraded && (submission.totalScore != null || submission.score != null)) {
      const band = Number(submission.totalScore ?? submission.score);
      return {
        scoreText: `Band ${band}`,
        subText: "Đã có nhận xét chi tiết của GV",
        isGraded: true,
        isPending: false,
      };
    }
    if (isSubmitted) {
      return {
        scoreText: "Chờ GV chấm",
        subText: "SLA tối đa 7 ngày",
        isGraded: false,
        isPending: true,
      };
    }
  }

  // Fallback
  if (isGraded && (submission.totalScore != null || submission.score != null)) {
    const val = Number(submission.totalScore ?? submission.score);
    return {
      scoreText: isObjectiveSkill(skill) ? `${val} điểm` : `Band ${val}`,
      subText: "Đã hoàn tất",
      isGraded: true,
      isPending: false,
    };
  }

  return {
    scoreText: isSubmitted ? "Đã nộp bài" : "Chưa hoàn tất",
    subText: isObjectiveSkill(skill) ? "1 câu = 1 điểm" : "Chấm theo Band IELTS",
    isGraded: false,
    isPending: isSubmitted,
  };
}

