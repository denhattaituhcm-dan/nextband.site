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
 * Determines whether an exam/homework item contains subjective questions that require manual teacher grading.
 */
export function isAutoGradedExam(examOrItem: any): boolean {
  if (!examOrItem) return true;

  const rawExamType = normalizeText(examOrItem.examType || examOrItem.exam_type || examOrItem.type);
  const rawTitle = normalizeText(examOrItem.title || examOrItem.homeworkTitle || examOrItem.homework_title || examOrItem.homework?.title || examOrItem.name);

  // If explicitly speaking or writing examType
  if (rawExamType === "speaking" || rawExamType === "writing") {
    return false;
  }

  // Check sections and questions if available
  const sections = examOrItem.sections || examOrItem.exam?.sections || [];
  let foundQuestions = false;
  let hasSubjective = false;

  for (const sec of sections) {
    const secType = normalizeText(sec.sectionType || sec.section_type);
    if (secType === "speaking" || secType === "writing") {
      return false;
    }

    const groups = sec.questionGroups || sec.question_groups || [];
    for (const grp of groups) {
      const questions = grp.questions || [];
      for (const q of questions) {
        foundQuestions = true;
        const qType = normalizeText(q.questionType || q.question_type);
        if (SUBJECTIVE_QUESTION_TYPES.has(qType)) {
          hasSubjective = true;
          return false;
        }
      }
    }
  }

  // If questions were inspected and none are subjective -> auto-graded
  if (foundQuestions) {
    return !hasSubjective;
  }

  // If title explicitly mentions pure reading or listening or grammar
  const hasReading = rawTitle.includes("reading") || rawTitle.includes("đọc");
  const hasListening = rawTitle.includes("listening") || rawTitle.includes("nghe");
  const hasWriting = rawTitle.includes("writing") || rawTitle.includes("viết") || rawTitle.includes("essay");
  const hasSpeaking = rawTitle.includes("speaking") || rawTitle.includes("nói") || rawTitle.includes("khẩu ngữ");

  if (hasSpeaking || hasWriting) {
    return false;
  }

  if (hasReading || hasListening || rawTitle.includes("grammar") || rawTitle.includes("trắc nghiệm") || rawTitle.includes("quiz")) {
    return true;
  }

  // Fallback: If examType is reading, listening, grammar, quiz
  if (["reading", "listening", "reading_listening", "grammar", "quiz", "objective"].includes(rawExamType)) {
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
  const rawTitle = normalizeText(examOrItem.title || examOrItem.homeworkTitle || examOrItem.name);

  const hasReadingTitle = rawTitle.includes("reading") || rawTitle.includes("đọc");
  const hasListeningTitle = rawTitle.includes("listening") || rawTitle.includes("nghe");
  const hasSpeakingTitle = rawTitle.includes("speaking") || rawTitle.includes("nói");
  const hasWritingTitle = rawTitle.includes("writing") || rawTitle.includes("viết") || rawTitle.includes("essay");

  // Check section types
  const sections = examOrItem.sections || examOrItem.exam?.sections || [];
  const sectionTypes = new Set<string>();
  sections.forEach((sec: any) => {
    const st = normalizeText(sec.sectionType || sec.section_type);
    if (st) sectionTypes.add(st);
  });

  // Combo Reading & Listening
  if (
    (hasReadingTitle && hasListeningTitle) ||
    (sectionTypes.has("reading") && sectionTypes.has("listening")) ||
    rawExamType === "reading_listening" ||
    rawExamType === "reading-listening" ||
    rawExamType === "reading & listening"
  ) {
    return "reading_listening";
  }

  // Speaking
  if (hasSpeakingTitle || sectionTypes.has("speaking") || rawExamType === "speaking") {
    return "speaking";
  }

  // Writing
  if (hasWritingTitle || sectionTypes.has("writing") || rawExamType === "writing") {
    return "writing";
  }

  // Pure Reading
  if (hasReadingTitle || sectionTypes.has("reading") || rawExamType === "reading") {
    return "reading";
  }

  // Pure Listening
  if (hasListeningTitle || sectionTypes.has("listening") || rawExamType === "listening") {
    return "listening";
  }

  // Grammar
  if (rawTitle.includes("grammar") || sectionTypes.has("grammar") || rawExamType === "grammar") {
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
        label: "📖 Reading & Listening",
        shortLabel: "READING & LISTENING",
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800",
        iconType: "book",
      };
    case "reading":
      return {
        skill: "reading",
        label: "📖 Reading",
        shortLabel: "READING",
        badgeClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
        iconType: "book",
      };
    case "listening":
      return {
        skill: "listening",
        label: "🎧 Listening",
        shortLabel: "LISTENING",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
        iconType: "headphones",
      };
    case "speaking":
      return {
        skill: "speaking",
        label: "🎙️ Speaking",
        shortLabel: "SPEAKING",
        badgeClass: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
        iconType: "mic",
      };
    case "writing":
      return {
        skill: "writing",
        label: "✍️ Writing",
        shortLabel: "WRITING",
        badgeClass: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
        iconType: "pen",
      };
    case "grammar":
      return {
        skill: "grammar",
        label: "📝 Grammar & Vocab",
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
