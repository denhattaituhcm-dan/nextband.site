/**
 * Student Model Service — Phase 3: Evidence Accumulation & Full Recomputation
 * 
 * INVARIANTS:
 * 1. Single Source of Truth: StudentSkillEvidence is the ONLY authoritative source for Student Model.
 * 2. Derived Cache: StudentSkillMastery is purely derived state. recompute() NEVER reads StudentSkillMastery.
 * 3. Evidence Provenance: Every observation maps to a specific submission/answer with sourceType and sourceId.
 * 4. Deterministic Mapping: QuestionSkillTag provides the explicit question -> skill mapping.
 * 5. Diagnostic Separation: DiagnosticEvidence is an explanation hypothesis, NOT an academic outcome.
 * 6. Auditability: Explains every contributing observation in recomputation logs/traces.
 * 7. Fail Loudly: Invalid historical evidence throws error, never silently repaired.
 */

import { PrismaClient } from "@prisma/client";
import {
  calculateAlphaBeta,
  computePosteriorMetrics,
  DEFAULT_PRIOR_ALPHA,
  DEFAULT_PRIOR_BETA,
  LearningObservationInput,
  PosteriorMetrics,
} from "../domain/student-model/bayesian.js";

export interface StudentSkillEvidenceRecord {
  id: string;
  studentId: string;
  skillCode: string;
  sourceType: string;
  sourceId: string;
  outcome: number;
  evidenceWeight: number;
  observedAt: Date;
}

export interface RecomputedMasteryResult extends PosteriorMetrics {
  studentId: string;
  skillCode: string;
  lastObservedAt: Date | null;
  contributingEvidenceCount: number;
  evidenceIds: string[];
}

export interface AnswerSkillObservation {
  submissionId: string;
  studentId: string;
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  scoreAwarded?: number;
  maxScore?: number;
  observedAt?: Date;
}

export class StudentModelService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Evidence Mapping Policy:
   * Maps an evaluated answer to StudentSkillEvidence rows based on QuestionSkillTag.
   *
   * Explicit Rules:
   * 1. Reads authoritative question -> skill mapping from QuestionSkillTag.
   * 2. If a question has NO tags, NO evidence is created (never invent phantom evidence).
   * 3. Outcome is derived strictly from answer correctness: isCorrect ? 1.0 : 0.0
   *    (or scoreAwarded / maxScore if partial credit enabled).
   * 4. Evidence weight is taken directly from QuestionSkillTag.weight (never altered by diagnostic confidence).
   * 5. Persists immutable StudentSkillEvidence rows.
   */
  async recordAnswerToSkillEvidence(
    inputs: AnswerSkillObservation[]
  ): Promise<StudentSkillEvidenceRecord[]> {
    if (!inputs.length) return [];

    const createdRecords: StudentSkillEvidenceRecord[] = [];

    for (const item of inputs) {
      // 1. Fetch explicit question-to-skill tags
      const tags = await this.prisma.questionSkillTag.findMany({
        where: { questionId: item.questionId },
      });

      if (!tags.length) {
        // Strict policy: If no skill mapping exists, record NO evidence rather than guessing
        continue;
      }

      // 2. Determine outcome: 1.0 (success) or 0.0 (failure)
      let outcome = item.isCorrect ? 1.0 : 0.0;
      if (
        item.scoreAwarded !== undefined &&
        item.maxScore !== undefined &&
        item.maxScore > 0
      ) {
        outcome = Math.max(0.0, Math.min(1.0, item.scoreAwarded / item.maxScore));
      }

      // 3. For each mapped skill, write immutable learning observation
      for (const tag of tags) {
        const record = await this.prisma.studentSkillEvidence.create({
          data: {
            studentId: item.studentId,
            skillCode: tag.skillCode,
            sourceType: "SUBMISSION",
            sourceId: item.answerId,
            outcome,
            evidenceWeight: tag.weight,
            observedAt: item.observedAt || new Date(),
          },
        });

        createdRecords.push({
          id: record.id,
          studentId: record.studentId,
          skillCode: record.skillCode,
          sourceType: record.sourceType,
          sourceId: record.sourceId,
          outcome: record.outcome,
          evidenceWeight: record.evidenceWeight,
          observedAt: record.observedAt,
        });
      }
    }

    return createdRecords;
  }

  /**
   * Full Recompute Contract:
   * Recomputes student mastery exclusively from the immutable StudentSkillEvidence ledger.
   *
   * Invariant:
   * - NEVER reads existing StudentSkillMastery.
   * - Deterministic sorting by `observedAt ASC, id ASC`.
   * - Uses pure domain Bayesian mathematics.
   * - Upserts the derived snapshot into StudentSkillMastery.
   * - Returns explainable and auditable results with contributing evidence IDs.
   */
  async recomputeStudentMastery(
    studentId: string,
    priorAlpha: number = DEFAULT_PRIOR_ALPHA,
    priorBeta: number = DEFAULT_PRIOR_BETA
  ): Promise<RecomputedMasteryResult[]> {
    if (!studentId) {
      throw new Error("[StudentModelService] studentId is required for recomputation.");
    }

    // 1. Fetch ALL evidence for this student, ordered deterministically
    const rawEvidences = await this.prisma.studentSkillEvidence.findMany({
      where: { studentId },
      orderBy: [
        { observedAt: "asc" },
        { id: "asc" },
      ],
    });

    // 2. Group evidence by skillCode
    const evidenceBySkill = new Map<string, typeof rawEvidences>();
    for (const ev of rawEvidences) {
      const list = evidenceBySkill.get(ev.skillCode) || [];
      list.push(ev);
      evidenceBySkill.set(ev.skillCode, list);
    }

    const recomputedResults: RecomputedMasteryResult[] = [];

    // 3. Recompute each skill independently using pure domain math
    for (const [skillCode, evidences] of evidenceBySkill.entries()) {
      // Map DB rows to pure domain inputs
      const domainObservations: LearningObservationInput[] = evidences.map((e) => ({
        outcome: e.outcome,
        evidenceWeight: e.evidenceWeight,
        observedAt: e.observedAt,
      }));

      // Pure domain accumulation (will throw loudly if any row is corrupted)
      const accumulated = calculateAlphaBeta(domainObservations, priorAlpha, priorBeta);
      const metrics = computePosteriorMetrics(
        accumulated.alpha,
        accumulated.beta,
        accumulated.totalEvidence
      );

      const lastObservedAt = evidences.length > 0 ? evidences[evidences.length - 1].observedAt : null;
      const evidenceIds = evidences.map((e) => e.id);

      // 4. Update the derived snapshot in DB (cache only)
      await this.prisma.studentSkillMastery.upsert({
        where: {
          studentId_skillCode: {
            studentId,
            skillCode,
          },
        },
        create: {
          studentId,
          skillCode,
          alphaSuccess: accumulated.alpha,
          betaFailure: accumulated.beta,
          totalEvidence: accumulated.totalEvidence,
          lastObservedAt,
          recomputedAt: new Date(),
        },
        update: {
          alphaSuccess: accumulated.alpha,
          betaFailure: accumulated.beta,
          totalEvidence: accumulated.totalEvidence,
          lastObservedAt,
          recomputedAt: new Date(),
        },
      });

      recomputedResults.push({
        studentId,
        skillCode,
        ...metrics,
        lastObservedAt,
        contributingEvidenceCount: accumulated.totalEvidence,
        evidenceIds,
      });
    }

    // Sort results deterministically by skillCode
    return recomputedResults.sort((a, b) => a.skillCode.localeCompare(b.skillCode));
  }

  /**
   * Audit / Provenance Helper:
   * Returns complete contributing evidence chain explaining why a student has their current parameters.
   */
  async getSkillMasteryProvenance(studentId: string, skillCode: string) {
    const masterySnapshot = await this.prisma.studentSkillMastery.findUnique({
      where: {
        studentId_skillCode: {
          studentId,
          skillCode,
        },
      },
    });

    const contributingEvidence = await this.prisma.studentSkillEvidence.findMany({
      where: { studentId, skillCode },
      orderBy: [{ observedAt: "asc" }, { id: "asc" }],
    });

    const domainObservations: LearningObservationInput[] = contributingEvidence.map((e) => ({
      outcome: e.outcome,
      evidenceWeight: e.evidenceWeight,
    }));

    const calculated = calculateAlphaBeta(domainObservations);

    return {
      studentId,
      skillCode,
      snapshot: masterySnapshot,
      provenance: {
        totalEvidenceRows: contributingEvidence.length,
        calculatedAlpha: calculated.alpha,
        calculatedBeta: calculated.beta,
        contributions: contributingEvidence.map((e) => ({
          evidenceId: e.id,
          sourceType: e.sourceType,
          sourceId: e.sourceId,
          outcome: e.outcome,
          weight: e.evidenceWeight,
          observedAt: e.observedAt,
        })),
      },
    };
  }
}
