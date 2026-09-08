/**
 * Evidence Ledger Service — Phase 0: Immutable Academic Evidence Contract
 * 
 * Invariant 1: Never overwrite academic evidence.
 * Invariant 2: Derived state (Mastery) can be 100% recomputed from raw evidence ledger.
 * Invariant 3: Clean separation — DB stores raw accumulation parameters (alpha, beta, count),
 *              while statistical heuristics (Beta mean, uncertainty) reside in domain logic.
 */

import { PrismaClient } from "@prisma/client";

export interface RecordAnswerEvidenceParams {
  submissionId: string;
  studentId: string;
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  scoreAwarded: number;
  maxScore: number;
  diagnosedError?: {
    errorCode: string;
    confidence: number;
    evidenceSnippet?: string;
    evaluatorType?: string;
  };
}

export interface RecomputedSkillState {
  skillCode: string;
  alpha: number;
  beta: number;
  totalEvidence: number;
  masteryScore: number;       // Bayesian Expected Value: alpha / (alpha + beta)
  uncertaintyScore: number;   // Variance / spread of Beta distribution
}

export class EvidenceLedgerService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Ghi nhận evidence vào Ledger sau khi chấm bài
   */
  async recordSubmissionEvidence(params: RecordAnswerEvidenceParams[]): Promise<void> {
    if (!params.length) return;

    for (const item of params) {
      // 1. Tìm các skills được tag vào câu hỏi này
      const skillTags = await this.prisma.questionSkillTag.findMany({
        where: { questionId: item.questionId },
      });

      // 2. Ghi nhận DiagnosticEvidence nếu có chẩn đoán lỗi
      if (item.diagnosedError) {
        await this.prisma.diagnosticEvidence.create({
          data: {
            submissionId: item.submissionId,
            questionId: item.questionId,
            studentId: item.studentId,
            errorCode: item.diagnosedError.errorCode,
            confidence: item.diagnosedError.confidence,
            evidenceSnippet: item.diagnosedError.evidenceSnippet || null,
            evaluatorType: item.diagnosedError.evaluatorType || "RULE_BASED",
            taxonomyVersion: "1.0.0",
          },
        });
      }

      // 3. Ghi nhận StudentSkillEvidence cho từng skill liên đới
      const outcome = item.isCorrect ? 1.0 : 0.0;
      for (const tag of skillTags) {
        await this.prisma.studentSkillEvidence.create({
          data: {
            studentId: item.studentId,
            skillCode: tag.skillCode,
            sourceType: "SUBMISSION",
            sourceId: item.answerId,
            outcome,
            evidenceWeight: tag.weight,
          },
        });
      }
    }
  }

  /**
   * Recompute: Tái tính toán toàn bộ StudentSkillMastery từ Sổ cái Evidence
   * Chứng minh tính Recomputable: Xóa toàn bộ snapshot cũ vẫn ra đúng 100%
   */
  async recomputeStudentMastery(studentId: string): Promise<RecomputedSkillState[]> {
    // 1. Lấy toàn bộ evidence gốc của học sinh
    const evidences = await this.prisma.studentSkillEvidence.findMany({
      where: { studentId },
      orderBy: { observedAt: "asc" },
    });

    // 2. Gom nhóm theo skillCode và tích lũy tham số Bayesian Beta
    const accumulatorMap = new Map<
      string,
      { alpha: number; beta: number; count: number; lastObserved: Date }
    >();

    for (const ev of evidences) {
      const current = accumulatorMap.get(ev.skillCode) || {
        alpha: 1.0, // Prior = 1.0 (Uniform Beta(1,1))
        beta: 1.0,  // Prior = 1.0
        count: 0,
        lastObserved: ev.observedAt,
      };

      // Cập nhật với trọng số bằng chứng (evidenceWeight)
      const w = ev.evidenceWeight || 1.0;
      current.alpha += ev.outcome * w;
      current.beta += (1.0 - ev.outcome) * w;
      current.count += 1;
      current.lastObserved = ev.observedAt;

      accumulatorMap.set(ev.skillCode, current);
    }

    const results: RecomputedSkillState[] = [];

    // 3. Cập nhật bảng cache snapshot StudentSkillMastery
    for (const [skillCode, acc] of accumulatorMap.entries()) {
      const masteryScore = acc.alpha / (acc.alpha + acc.beta);
      // Phương sai của phân phối Beta: Var = (alpha * beta) / ((alpha + beta)^2 * (alpha + beta + 1))
      const total = acc.alpha + acc.beta;
      const uncertainty = (acc.alpha * acc.beta) / (total * total * (total + 1));

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
          alphaSuccess: acc.alpha,
          betaFailure: acc.beta,
          totalEvidence: acc.count,
          lastObservedAt: acc.lastObserved,
          recomputedAt: new Date(),
        },
        update: {
          alphaSuccess: acc.alpha,
          betaFailure: acc.beta,
          totalEvidence: acc.count,
          lastObservedAt: acc.lastObserved,
          recomputedAt: new Date(),
        },
      });

      results.push({
        skillCode,
        alpha: acc.alpha,
        beta: acc.beta,
        totalEvidence: acc.count,
        masteryScore,
        uncertaintyScore: uncertainty,
      });
    }

    return results;
  }
}
