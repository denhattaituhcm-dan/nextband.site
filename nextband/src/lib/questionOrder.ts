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

export type AssessmentMode = "OBJECTIVE" | "MANUAL_ITEM" | "HOLISTIC";
export type ScoreScope = "ITEM" | "HOLISTIC";

/**
 * Resolves the explicit assessment mode of a question.
 */
export function getAssessmentMode(question: any, sectionType?: string): AssessmentMode {
  if (question?.assessmentMode) return question.assessmentMode;
  if (question?.scoreScope === "HOLISTIC") return "HOLISTIC";

  const qType = String(question?.questionType || question?.question_type || "").toLowerCase();
  const secType = String(sectionType || question?.sectionType || "").toLowerCase();

  const isSubjective =
    qType === "essay" ||
    qType === "speaking" ||
    secType === "speaking" ||
    (secType === "writing" && !["multiple_choice", "fill_blank", "matching"].includes(qType));

  if (!isSubjective) return "OBJECTIVE";
  if (secType === "writing" || qType === "essay") return "HOLISTIC";
  return "MANUAL_ITEM";
}

/**
 * Resolves the score scope (ITEM vs HOLISTIC) of a question.
 */
export function getScoreScope(question: any, sectionType?: string): ScoreScope {
  if (question?.scoreScope) return question.scoreScope;
  const mode = getAssessmentMode(question, sectionType);
  return mode === "HOLISTIC" ? "HOLISTIC" : "ITEM";
}

/**
 * Checks whether a question is subjective (requires manual teacher evaluation/grading)
 */
export function isSubjectiveQuestion(question: any, sectionType?: string): boolean {
  if (!question) return false;
  const mode = getAssessmentMode(question, sectionType);
  return mode !== "OBJECTIVE";
}
