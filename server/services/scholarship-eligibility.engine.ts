/**
 * ARIS Scholarship Eligibility Engine
 * Pure domain logic to derive academic scholarship eligibility without administrative approval workflows.
 * 
 * Invariants:
 * 1. Eligibility is a DERIVED state, not a workflow state.
 * 2. SUBMITTED indicates technical submission validity.
 * 3. Scholarship eligibility evaluates assessment semantics:
 *    - Objective: Valid completed attempt.
 *    - Writing / Speaking: Must not be flagged with revisionRequired (re-attempt required due to AI abuse, off-topic, or below standard).
 *    - Teacher Graded: Must have passing quality (score > 0 and no revisionRequired).
 *    - Pending Teacher Review: Grace period allowed during weekly monitoring until graded.
 */

export interface ScholarshipEligibilityResult {
  isEligible: boolean;
  reasonCode:
    | "ELIGIBLE_OBJECTIVE"
    | "TEACHER_GRADED_QUALIFIED"
    | "PENDING_TEACHER_REVIEW"
    | "DRILL_COMPLETED"
    | "NO_SUBMISSION"
    | "INVALID_STATUS"
    | "REVISION_REQUIRED"
    | "ZERO_SCORE"
    | "AWAITING_TEACHER_GRADE";
  isRevisionRequired: boolean;
}

export interface EligibilityOptions {
  /**
   * If true (default in weekly monitoring), SUBMITTED subjective homework is provisionally counted
   * while awaiting teacher grading. If false (e.g. strict end-of-term audit), subjective tasks
   * must be officially GRADED by teacher without revisionRequired.
   */
  allowPendingTeacherReview?: boolean;
}

/**
 * Extracts whether a submission was marked with revisionRequired by teacher across any answer payload.
 */
export function extractRevisionRequired(submission: any): boolean {
  if (!submission) return false;
  if (submission.revisionRequired === true || submission.revision_required === true) {
    return true;
  }
  for (const ans of submission.answers || []) {
    if (ans.feedback && typeof ans.feedback === "string") {
      try {
        const parsed = JSON.parse(ans.feedback);
        if (parsed && typeof parsed === "object" && parsed.revisionRequired === true) {
          return true;
        }
      } catch {
        // ignore non-json feedback
      }
    }
  }
  return false;
}

/**
 * Pure domain evaluator for scholarship eligibility
 */
export function isScholarshipEligible(
  submission: any,
  options: EligibilityOptions = {}
): ScholarshipEligibilityResult {
  const { allowPendingTeacherReview = true } = options;

  if (!submission) {
    return { isEligible: false, reasonCode: "NO_SUBMISSION", isRevisionRequired: false };
  }

  const status = String(submission.status || "").toUpperCase();
  if (status !== "SUBMITTED" && status !== "GRADED") {
    return { isEligible: false, reasonCode: "INVALID_STATUS", isRevisionRequired: false };
  }

  const isRevision = extractRevisionRequired(submission);
  if (isRevision) {
    return { isEligible: false, reasonCode: "REVISION_REQUIRED", isRevisionRequired: true };
  }

  const examType = String(
    submission.exam?.examType ||
    submission.exam?.type ||
    submission.examType ||
    submission.type ||
    ""
  ).toLowerCase();

  const isSubjective =
    examType === "writing" ||
    examType === "speaking" ||
    examType.includes("essay");

  if (isSubjective) {
    if (status === "GRADED") {
      const totalScore = Number(submission.totalScore ?? submission.total_score ?? 0);
      if (totalScore <= 0) {
        return { isEligible: false, reasonCode: "ZERO_SCORE", isRevisionRequired: false };
      }
      return { isEligible: true, reasonCode: "TEACHER_GRADED_QUALIFIED", isRevisionRequired: false };
    }

    if (status === "SUBMITTED") {
      if (allowPendingTeacherReview) {
        return { isEligible: true, reasonCode: "PENDING_TEACHER_REVIEW", isRevisionRequired: false };
      }
      return { isEligible: false, reasonCode: "AWAITING_TEACHER_GRADE", isRevisionRequired: false };
    }
  }

  const isObjective =
    examType === "reading" ||
    examType === "listening" ||
    examType === "quiz";

  if (isObjective) {
    return { isEligible: true, reasonCode: "ELIGIBLE_OBJECTIVE", isRevisionRequired: false };
  }

  // Default: drills / practice / general homework completed
  return { isEligible: true, reasonCode: "DRILL_COMPLETED", isRevisionRequired: false };
}
