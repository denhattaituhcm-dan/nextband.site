/**
 * Canonical Question & Section Ordering Helper
 * Guarantees identical, deterministic sorting order across Exam Interface,
 * Admin Section Edit, Student Submission Detail, and Teacher Grading views.
 */

export function compareCanonicalOrder(a: any, b: any): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  // 1. Primary sort: orderIndex (numeric)
  const orderA = typeof (a.orderIndex ?? a.order_index) === "number" ? Number(a.orderIndex ?? a.order_index) : 0;
  const orderB = typeof (b.orderIndex ?? b.order_index) === "number" ? Number(b.orderIndex ?? b.order_index) : 0;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  // 2. Secondary sort: createdAt timestamp
  const rawA = a.createdAt ?? a.created_at;
  const rawB = b.createdAt ?? b.created_at;
  const timeA = rawA ? new Date(rawA).getTime() : 0;
  const timeB = rawB ? new Date(rawB).getTime() : 0;
  const validTimeA = Number.isFinite(timeA) ? timeA : 0;
  const validTimeB = Number.isFinite(timeB) ? timeB : 0;
  if (validTimeA !== validTimeB) {
    return validTimeA - validTimeB;
  }

  // 3. Tertiary tie-breaker: ID string comparison
  return String(a.id || "").localeCompare(String(b.id || ""));
}

/**
 * Checks whether a question is subjective (requires manual teacher evaluation/grading)
 */
export function isSubjectiveQuestion(question: any, sectionType?: string): boolean {
  if (!question) return false;
  const qType = String(question.questionType || question.question_type || "").toLowerCase();
  const secType = String(sectionType || question.sectionType || "").toLowerCase();

  if (qType === "essay" || qType === "speaking") return true;
  if (secType === "speaking") return true;
  if (secType === "writing" && qType !== "multiple_choice" && qType !== "matching" && qType !== "fill_blank") {
    return true;
  }
  // Short answer without an answer key is subjective translation/essay
  if (qType === "short_answer") {
    const hasAnswerKey = Boolean(question.correctAnswer || question.correct_answer);
    if (!hasAnswerKey) return true;
  }
  return false;
}
