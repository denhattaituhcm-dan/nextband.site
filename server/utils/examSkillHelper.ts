/**
 * Exam Skill & Manual Grading Utility (Backend SSOT)
 * Mirroring nextband/src/lib/examSkillHelper.ts to ensure identical pending grading counts.
 */

function normalizeText(text?: string | null): string {
  if (!text) return "";
  return text.toLowerCase().trim();
}

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

export function isAutoGradedExam(examOrItem: any): boolean {
  if (!examOrItem) return true;

  const rawExamType = normalizeText(examOrItem.examType || examOrItem.exam_type || examOrItem.type);
  const rawTitle = normalizeText(
    examOrItem.title ||
    examOrItem.homeworkTitle ||
    examOrItem.homework_title ||
    examOrItem.homework?.title ||
    examOrItem.name
  );

  // 1. Explicit examType checks
  if (rawExamType === "speaking" || rawExamType === "spk") return false;
  if (rawExamType === "writing" || rawExamType === "wri") return false;

  // 2. Pattern matching on title
  if (isSpeakingMatch(rawTitle) || isWritingMatch(rawTitle)) {
    return false;
  }

  // 3. Check sections if populated
  const sections = examOrItem.sections || examOrItem.exam_sections || examOrItem.exam?.sections || [];
  for (const sec of sections) {
    const secType = normalizeText(sec.sectionType || sec.section_type);
    if (secType === "speaking" || secType === "writing") {
      return false;
    }
  }

  return true;
}

/**
 * Checks whether a submission requires manual grading from a teacher.
 */
export function isManualGradingRequired(submission: any): boolean {
  if (!submission) return false;

  const isAuto = isAutoGradedExam(
    submission.exam || {
      title: submission.title || submission.homework_title || submission.homework?.title,
      examType: submission.examType || submission.exam_type || submission.type,
      sections: submission.exam?.sections,
    }
  );

  return !isAuto;
}
