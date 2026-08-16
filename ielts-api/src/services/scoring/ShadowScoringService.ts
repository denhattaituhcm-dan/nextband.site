import { SubmissionGradingSummary } from "./types.js";
import { canonicalScoringService } from "./CanonicalScoringService.js";

export interface ShadowDivergenceLog {
  submissionId: string;
  examId: string;
  timestamp: string;
  primarySummary: SubmissionGradingSummary;
  legacyScore?: number | null;
  divergenceDetected: boolean;
  notes?: string;
}

export class ShadowScoringService {
  private divergenceLogs: ShadowDivergenceLog[] = [];

  /**
   * Executes non-blocking shadow scoring comparison
   */
  public async logShadowComparison(
    submissionId: string,
    exam: any,
    studentAnswers: any[],
    legacyScore?: number,
  ): Promise<void> {
    try {
      const canonicalSummary = canonicalScoringService.evaluateExamAttempt(exam, studentAnswers);
      const isDivergent =
        legacyScore !== undefined &&
        legacyScore !== null &&
        Math.abs(canonicalSummary.totalScore - legacyScore) > 0.001;

      const record: ShadowDivergenceLog = {
        submissionId,
        examId: exam?.id || "unknown",
        timestamp: new Date().toISOString(),
        primarySummary: canonicalSummary,
        legacyScore,
        divergenceDetected: isDivergent,
        notes: isDivergent ? "Divergence between Canonical and Legacy baseline" : "Parity matched",
      };

      this.divergenceLogs.push(record);
      if (isDivergent) {
        console.warn(
          `[SHADOW SCORING DIVERGENCE] Submission: ${submissionId}, Canonical: ${canonicalSummary.totalScore}, Legacy: ${legacyScore}`,
        );
      }
    } catch (err) {
      // Fail-safe: Shadow logging never interrupts the primary request
      console.error("[SHADOW SCORING ERROR]", err);
    }
  }

  public getDivergenceLogs(): ShadowDivergenceLog[] {
    return [...this.divergenceLogs];
  }

  public clearLogs(): void {
    this.divergenceLogs = [];
  }
}

export const shadowScoringService = new ShadowScoringService();
