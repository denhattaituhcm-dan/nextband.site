import { describe, it, expect, beforeEach } from "vitest";
import {
  calculateAlphaBeta,
  calculatePosteriorMean,
  calculateUncertainty,
  computePosteriorMetrics,
  DEFAULT_PRIOR_ALPHA,
  DEFAULT_PRIOR_BETA,
  validateObservation,
} from "../domain/student-model/bayesian.js";
import { StudentModelService } from "../services/student-model.service.js";

// In-Memory Test Store simulating Prisma for Student Model Invariants
function createStudentModelMockPrisma() {
  let questionSkillTags: any[] = [];
  let diagnosticEvidences: any[] = [];
  let studentSkillEvidences: any[] = [];
  let studentSkillMasteries: any[] = [];

  return {
    questionSkillTag: {
      findMany: async ({ where }: any) => {
        return questionSkillTags.filter((t) => t.questionId === where.questionId);
      },
      create: async ({ data }: any) => {
        questionSkillTags.push(data);
        return data;
      },
    },
    diagnosticEvidence: {
      create: async ({ data }: any) => {
        const item = { id: `diag-${diagnosticEvidences.length + 1}`, ...data };
        diagnosticEvidences.push(item);
        return item;
      },
      findMany: async ({ where }: any) => {
        return diagnosticEvidences.filter((d) => {
          if (where?.studentId && d.studentId !== where.studentId) return false;
          if (where?.errorCode && d.errorCode !== where.errorCode) return false;
          return true;
        });
      },
      deleteMany: async () => {
        diagnosticEvidences.length = 0;
      },
    },
    studentSkillEvidence: {
      create: async ({ data }: any) => {
        const item = {
          id: `ev-${studentSkillEvidences.length + 1}`,
          observedAt: data.observedAt || new Date(),
          ...data,
        };
        studentSkillEvidences.push(item);
        return item;
      },
      findMany: async ({ where, orderBy }: any) => {
        let results = studentSkillEvidences.filter((e) => {
          if (where?.studentId && e.studentId !== where.studentId) return false;
          if (where?.skillCode && e.skillCode !== where.skillCode) return false;
          return true;
        });
        if (orderBy) {
          results = results.sort((a, b) => {
            const timeDiff = new Date(a.observedAt).getTime() - new Date(b.observedAt).getTime();
            if (timeDiff !== 0) return timeDiff;
            return a.id.localeCompare(b.id);
          });
        }
        return [...results];
      },
      count: async () => studentSkillEvidences.length,
    },
    studentSkillMastery: {
      upsert: async ({ where, create, update }: any) => {
        const studentId = where.studentId_skillCode.studentId;
        const skillCode = where.studentId_skillCode.skillCode;
        const idx = studentSkillMasteries.findIndex(
          (m) => m.studentId === studentId && m.skillCode === skillCode
        );
        if (idx >= 0) {
          studentSkillMasteries[idx] = {
            ...studentSkillMasteries[idx],
            ...update,
          };
          return studentSkillMasteries[idx];
        } else {
          const item = { ...create };
          studentSkillMasteries.push(item);
          return item;
        }
      },
      findUnique: async ({ where }: any) => {
        const studentId = where.studentId_skillCode.studentId;
        const skillCode = where.studentId_skillCode.skillCode;
        return (
          studentSkillMasteries.find(
            (m) => m.studentId === studentId && m.skillCode === skillCode
          ) || null
        );
      },
      findMany: async ({ where }: any) => {
        return studentSkillMasteries.filter((m) => {
          if (where?.studentId && m.studentId !== where.studentId) return false;
          return true;
        });
      },
      deleteMany: async () => {
        studentSkillMasteries.length = 0;
      },
    },
    _raw: {
      questionSkillTags,
      diagnosticEvidences,
      studentSkillEvidences,
      studentSkillMasteries,
    },
  } as any;
}

describe("Student Model — Phase 3: Bayesian Evidence Accumulation & Recomputation Matrix", () => {
  let mockPrisma: any;
  let service: StudentModelService;

  beforeEach(() => {
    mockPrisma = createStudentModelMockPrisma();
    service = new StudentModelService(mockPrisma);
  });

  // A. Empty evidence -> baseline / prior result only
  it("Test A: Empty evidence produces exact baseline prior distribution", () => {
    const res = calculateAlphaBeta([]);
    expect(res.alpha).toBe(DEFAULT_PRIOR_ALPHA); // 1.0
    expect(res.beta).toBe(DEFAULT_PRIOR_BETA);   // 1.0
    expect(res.totalEvidence).toBe(0);

    const metrics = computePosteriorMetrics(res.alpha, res.beta, res.totalEvidence);
    expect(metrics.posteriorMean).toBe(0.5); // Beta(1,1) uniform expected mean = 0.5
    // Var(Beta(1,1)) = (1*1) / (2^2 * 3) = 1/12 ≈ 0.083333
    expect(metrics.uncertaintyVariance).toBeCloseTo(1 / 12, 5);
  });

  // B. One successful observation -> expected alpha / beta
  it("Test B: One successful observation updates alpha correctly", () => {
    const res = calculateAlphaBeta([{ outcome: 1.0, evidenceWeight: 1.0 }]);
    expect(res.alpha).toBe(2.0); // 1.0 + 1.0
    expect(res.beta).toBe(1.0);  // 1.0 + 0.0
    expect(res.totalEvidence).toBe(1);

    const mean = calculatePosteriorMean(res.alpha, res.beta);
    expect(mean).toBeCloseTo(2 / 3, 5); // 0.66667
  });

  // C. One failed observation -> expected alpha / beta
  it("Test C: One failed observation updates beta correctly", () => {
    const res = calculateAlphaBeta([{ outcome: 0.0, evidenceWeight: 1.0 }]);
    expect(res.alpha).toBe(1.0); // 1.0 + 0.0
    expect(res.beta).toBe(2.0);  // 1.0 + 1.0
    expect(res.totalEvidence).toBe(1);

    const mean = calculatePosteriorMean(res.alpha, res.beta);
    expect(mean).toBeCloseTo(1 / 3, 5); // 0.33333
  });

  // D. Weighted evidence -> verify QuestionSkillTag / evidenceWeight handling
  it("Test D: Weighted evidence correctly scales alpha and beta contributions", () => {
    const res = calculateAlphaBeta([
      { outcome: 1.0, evidenceWeight: 0.8 },
      { outcome: 0.0, evidenceWeight: 0.5 },
    ]);
    // alpha = 1.0 + 1.0*0.8 = 1.8
    // beta  = 1.0 + (1-0)*0.5 = 1.5
    expect(res.alpha).toBeCloseTo(1.8, 5);
    expect(res.beta).toBeCloseTo(1.5, 5);
    expect(res.totalEvidence).toBe(2);
  });

  // E. Multiple evidence rows -> exact accumulation
  it("Test E: Multiple evidence rows accumulate deterministically", () => {
    const observations = [
      { outcome: 1.0, evidenceWeight: 1.0 },
      { outcome: 1.0, evidenceWeight: 1.0 },
      { outcome: 0.0, evidenceWeight: 1.0 },
      { outcome: 1.0, evidenceWeight: 1.0 },
      { outcome: 0.5, evidenceWeight: 1.0 }, // Partial credit
    ];
    const res = calculateAlphaBeta(observations);
    // alpha = 1.0 + 1 + 1 + 0 + 1 + 0.5 = 4.5
    // beta  = 1.0 + 0 + 0 + 1 + 0 + 0.5 = 2.5
    expect(res.alpha).toBeCloseTo(4.5, 5);
    expect(res.beta).toBeCloseTo(2.5, 5);
    expect(res.totalEvidence).toBe(5);
  });

  // F. Multi-skill student -> skills remain independently calculated
  it("Test F: Multiple skills for a student remain strictly independent", async () => {
    // Skill 1: R_MS_QUALIFIER_SENSITIVITY (2 successes)
    // Skill 2: R_MS_PARAPHRASE_DISCRIMINATION (1 failure)
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-01",
        skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        sourceType: "SUBMISSION",
        sourceId: "ANS-1",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-01",
        skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        sourceType: "SUBMISSION",
        sourceId: "ANS-2",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-01",
        skillCode: "R_MS_PARAPHRASE_DISCRIMINATION",
        sourceType: "SUBMISSION",
        sourceId: "ANS-3",
        outcome: 0.0,
        evidenceWeight: 1.0,
      },
    });

    const results = await service.recomputeStudentMastery("STU-01");
    expect(results).toHaveLength(2);

    const s1 = results.find((r) => r.skillCode === "R_MS_QUALIFIER_SENSITIVITY");
    const s2 = results.find((r) => r.skillCode === "R_MS_PARAPHRASE_DISCRIMINATION");

    expect(s1?.alpha).toBe(3.0); // 1 + 2
    expect(s1?.beta).toBe(1.0);  // 1 + 0
    expect(s1?.totalEvidence).toBe(2);

    expect(s2?.alpha).toBe(1.0); // 1 + 0
    expect(s2?.beta).toBe(2.0);  // 1 + 1
    expect(s2?.totalEvidence).toBe(1);
  });

  // G. Deterministic recompute -> same evidence produces byte-for-byte equivalent output
  it("Test G: Recompute is 100% deterministic across consecutive runs", async () => {
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-DET",
        skillCode: "R_MS_SCANNING_ANCHORS",
        sourceType: "SUBMISSION",
        sourceId: "ANS-A",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-DET",
        skillCode: "R_MS_SCANNING_ANCHORS",
        sourceType: "SUBMISSION",
        sourceId: "ANS-B",
        outcome: 0.0,
        evidenceWeight: 1.0,
      },
    });

    const run1 = await service.recomputeStudentMastery("STU-DET");
    const run2 = await service.recomputeStudentMastery("STU-DET");

    expect(run1).toEqual(run2);
  });

  // H. Drop-and-recompute test:
  // 1. Compute mastery, 2. Save snapshot, 3. DELETE StudentSkillMastery, 4. Recompute, 5. Compare -> EXACT MATCH
  it("Test H: Drop-and-recompute restores exact state byte-for-byte from evidence", async () => {
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-DROP",
        skillCode: "R_MS_TOPIC_SENTENCE_FILTER",
        sourceType: "SUBMISSION",
        sourceId: "A1",
        outcome: 1.0,
        evidenceWeight: 0.9,
      },
    });
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-DROP",
        skillCode: "R_MS_TOPIC_SENTENCE_FILTER",
        sourceType: "SUBMISSION",
        sourceId: "A2",
        outcome: 0.0,
        evidenceWeight: 0.9,
      },
    });

    // Step 1 & 2: First compute & save snapshot
    const snapshot1 = await service.recomputeStudentMastery("STU-DROP");
    const dbSnapshot1 = await mockPrisma.studentSkillMastery.findMany({
      where: { studentId: "STU-DROP" },
    });
    expect(dbSnapshot1).toHaveLength(1);

    // Step 3: DELETE StudentSkillMastery entirely
    await mockPrisma.studentSkillMastery.deleteMany();
    const dbEmpty = await mockPrisma.studentSkillMastery.findMany({
      where: { studentId: "STU-DROP" },
    });
    expect(dbEmpty).toHaveLength(0);

    // Step 4: Recompute exclusively from StudentSkillEvidence
    const snapshot2 = await service.recomputeStudentMastery("STU-DROP");
    const dbSnapshot2 = await mockPrisma.studentSkillMastery.findMany({
      where: { studentId: "STU-DROP" },
    });

    // Step 5: Exact match validation
    expect(snapshot2[0].alpha).toBe(snapshot1[0].alpha);
    expect(snapshot2[0].beta).toBe(snapshot1[0].beta);
    expect(snapshot2[0].totalEvidence).toBe(snapshot1[0].totalEvidence);
    expect(snapshot2[0].posteriorMean).toBe(snapshot1[0].posteriorMean);
    expect(snapshot2[0].uncertaintyVariance).toBe(snapshot1[0].uncertaintyVariance);

    expect(dbSnapshot2[0].alphaSuccess).toBe(dbSnapshot1[0].alphaSuccess);
    expect(dbSnapshot2[0].betaFailure).toBe(dbSnapshot1[0].betaFailure);
    expect(dbSnapshot2[0].totalEvidence).toBe(dbSnapshot1[0].totalEvidence);
  });

  // I & Section 11: Critical Adversarial Failure Test — Corrupted Mastery Snapshot
  it("Test I (Critical Adversarial Failure Test): Deliberately corrupting StudentSkillMastery is completely wiped and repaired by recompute", async () => {
    // Legitimate evidence: 1 success, 1 failure
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-ADVERSARY",
        skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        sourceType: "SUBMISSION",
        sourceId: "A-GENUINE-1",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-ADVERSARY",
        skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        sourceType: "SUBMISSION",
        sourceId: "A-GENUINE-2",
        outcome: 0.0,
        evidenceWeight: 1.0,
      },
    });

    // Run normal recompute first
    await service.recomputeStudentMastery("STU-ADVERSARY");

    // ADVERSARIAL ACTION: Attacker/Bug manually injects fake 999.0 mastery score and corrupts DB row
    await mockPrisma.studentSkillMastery.upsert({
      where: {
        studentId_skillCode: {
          studentId: "STU-ADVERSARY",
          skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        },
      },
      create: {
        studentId: "STU-ADVERSARY",
        skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        alphaSuccess: 9999.0, // FAKE
        betaFailure: 0.001,   // FAKE
        totalEvidence: 10000, // FAKE
      },
      update: {
        alphaSuccess: 9999.0, // FAKE
        betaFailure: 0.001,   // FAKE
        totalEvidence: 10000, // FAKE
      },
    });

    const corruptedRow = await mockPrisma.studentSkillMastery.findUnique({
      where: {
        studentId_skillCode: {
          studentId: "STU-ADVERSARY",
          skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        },
      },
    });
    expect(corruptedRow.alphaSuccess).toBe(9999.0);

    // RUN RECOMPUTE: Must NEVER read corrupted mastery. Must overwrite with truth from evidence.
    const repaired = await service.recomputeStudentMastery("STU-ADVERSARY");
    expect(repaired[0].alpha).toBe(2.0); // 1 (prior) + 1.0 (genuine)
    expect(repaired[0].beta).toBe(2.0);  // 1 (prior) + 1.0 (genuine)
    expect(repaired[0].totalEvidence).toBe(2);

    const fixedRowInDb = await mockPrisma.studentSkillMastery.findUnique({
      where: {
        studentId_skillCode: {
          studentId: "STU-ADVERSARY",
          skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        },
      },
    });
    expect(fixedRowInDb.alphaSuccess).toBe(2.0);
    expect(fixedRowInDb.betaFailure).toBe(2.0);
    expect(fixedRowInDb.totalEvidence).toBe(2);
  });

  // J. Evidence immutability -> recompute must not modify StudentSkillEvidence
  it("Test J: Recompute never modifies existing StudentSkillEvidence rows", async () => {
    const originalRow = await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-IMMUTABLE",
        skillCode: "R_MS_QUALIFIER_SENSITIVITY",
        sourceType: "SUBMISSION",
        sourceId: "ANS-ORIGINAL",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });

    await service.recomputeStudentMastery("STU-IMMUTABLE");

    const rowsAfter = await mockPrisma.studentSkillEvidence.findMany({
      where: { studentId: "STU-IMMUTABLE" },
    });
    expect(rowsAfter).toHaveLength(1);
    expect(rowsAfter[0].id).toBe(originalRow.id);
    expect(rowsAfter[0].outcome).toBe(1.0);
    expect(rowsAfter[0].evidenceWeight).toBe(1.0);
    expect(rowsAfter[0].sourceId).toBe("ANS-ORIGINAL");
  });

  // K. Diagnostic separation -> DiagnosticEvidence is an explanation hypothesis, NOT student outcome
  it("Test K: Removing or altering DiagnosticEvidence does not alter StudentSkillEvidence or recompute", async () => {
    await mockPrisma.diagnosticEvidence.create({
      data: {
        submissionId: "SUB-1",
        questionId: "Q1",
        studentId: "STU-K",
        errorCode: "ERR_WORD_MATCHING_TRAP",
        confidence: 0.99, // High hypothesis confidence
      },
    });

    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-K",
        skillCode: "R_MS_PARAPHRASE_DISCRIMINATION",
        sourceType: "SUBMISSION",
        sourceId: "ANS-K",
        outcome: 0.0,
        evidenceWeight: 1.0,
      },
    });

    const res1 = await service.recomputeStudentMastery("STU-K");

    // Clear all diagnostic evidences
    await mockPrisma.diagnosticEvidence.deleteMany();

    const res2 = await service.recomputeStudentMastery("STU-K");

    // Math must remain completely untouched
    expect(res1).toEqual(res2);
  });

  // L. No phantom evidence -> recompute must never create new StudentSkillEvidence rows
  it("Test L: Recompute never fabricates phantom evidence", async () => {
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-PHANTOM",
        skillCode: "R_MS_SCANNING_ANCHORS",
        sourceType: "SUBMISSION",
        sourceId: "ANS-P",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });

    const initialCount = await mockPrisma.studentSkillEvidence.count();
    await service.recomputeStudentMastery("STU-PHANTOM");
    const countAfter = await mockPrisma.studentSkillEvidence.count();

    expect(countAfter).toBe(initialCount);
  });

  // M. Chronology -> Different insertion order of same evidence produces same math
  it("Test M: Order of observation insertion produces identical mathematical outcomes", () => {
    const obs1 = [
      { outcome: 1.0, evidenceWeight: 0.5 },
      { outcome: 0.0, evidenceWeight: 1.0 },
      { outcome: 1.0, evidenceWeight: 0.8 },
    ];
    const obs2 = [
      { outcome: 1.0, evidenceWeight: 0.8 },
      { outcome: 1.0, evidenceWeight: 0.5 },
      { outcome: 0.0, evidenceWeight: 1.0 },
    ];

    const r1 = calculateAlphaBeta(obs1);
    const r2 = calculateAlphaBeta(obs2);

    expect(r1.alpha).toBeCloseTo(r2.alpha, 8);
    expect(r1.beta).toBeCloseTo(r2.beta, 8);
    expect(r1.totalEvidence).toBe(r2.totalEvidence);
  });

  // N. Provenance -> Every contribution is auditable to its sourceType / sourceId
  it("Test N: Provenance helper explains exact contributing evidence chain", async () => {
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-AUDIT",
        skillCode: "R_MS_TOPIC_SENTENCE_FILTER",
        sourceType: "SUBMISSION",
        sourceId: "ANS-PROV-1",
        outcome: 1.0,
        evidenceWeight: 1.0,
      },
    });
    await mockPrisma.studentSkillEvidence.create({
      data: {
        studentId: "STU-AUDIT",
        skillCode: "R_MS_TOPIC_SENTENCE_FILTER",
        sourceType: "SUBMISSION",
        sourceId: "ANS-PROV-2",
        outcome: 0.0,
        evidenceWeight: 0.75,
      },
    });

    await service.recomputeStudentMastery("STU-AUDIT");
    const audit = await service.getSkillMasteryProvenance("STU-AUDIT", "R_MS_TOPIC_SENTENCE_FILTER");

    expect(audit.provenance.totalEvidenceRows).toBe(2);
    expect(audit.provenance.calculatedAlpha).toBe(2.0); // 1 + 1.0
    expect(audit.provenance.calculatedBeta).toBe(1.75); // 1 + 0.75
    expect(audit.provenance.contributions[0].sourceId).toBe("ANS-PROV-1");
    expect(audit.provenance.contributions[1].sourceId).toBe("ANS-PROV-2");
  });

  // Section 12: Fail Loudly on Corrupted Historical Evidence
  it("Test 12: Fails loudly if an invalid outcome or negative weight is encountered in evidence", () => {
    expect(() => validateObservation({ outcome: 1.5 })).toThrow(/out of range/);
    expect(() => validateObservation({ outcome: -0.1 })).toThrow(/out of range/);
    expect(() => validateObservation({ outcome: 1.0, evidenceWeight: -1.0 })).toThrow(/Invalid evidenceWeight/);
    expect(() => validateObservation({ outcome: 1.0, evidenceWeight: 0 })).toThrow(/Invalid evidenceWeight/);
    expect(() => validateObservation({ outcome: NaN as any })).toThrow(/Invalid outcome/);
  });

  // Section 16: Final Gate Question — 50 observations over 3 months
  it("Final Gate Question: 50 observations over 3 months can be dropped and restored identically", async () => {
    const studentId = "STU-GATE-50";
    const skillCode = "R_MS_QUALIFIER_SENSITIVITY";

    // Simulate 50 learning observations spread across 3 months
    const baseDate = new Date("2026-01-01T08:00:00Z");
    for (let i = 0; i < 50; i++) {
      const observationDate = new Date(baseDate.getTime() + i * 1.8 * 24 * 3600 * 1000); // spread over ~90 days
      const isSuccess = i % 3 !== 0; // 33 successes, 17 failures
      const weight = (i % 5 === 0) ? 0.8 : 1.0;

      await mockPrisma.studentSkillEvidence.create({
        data: {
          studentId,
          skillCode,
          sourceType: "SUBMISSION",
          sourceId: `ANSWER-ROW-${i + 1}`,
          outcome: isSuccess ? 1.0 : 0.0,
          evidenceWeight: weight,
          observedAt: observationDate,
        },
      });
    }

    // Step 1: Compute initial mastery from the 50 observations
    const originalMastery = await service.recomputeStudentMastery(studentId);
    expect(originalMastery).toHaveLength(1);
    expect(originalMastery[0].totalEvidence).toBe(50);
    expect(originalMastery[0].evidenceIds).toHaveLength(50);

    const originalAlpha = originalMastery[0].alpha;
    const originalBeta = originalMastery[0].beta;
    const originalMean = originalMastery[0].posteriorMean;

    // Step 2: Delete the ENTIRE StudentSkillMastery table
    await mockPrisma.studentSkillMastery.deleteMany();
    const emptyCheck = await mockPrisma.studentSkillMastery.findMany({ where: { studentId } });
    expect(emptyCheck).toHaveLength(0);

    // Step 3: Reconstruct student's profile exclusively from StudentSkillEvidence
    const reconstructedMastery = await service.recomputeStudentMastery(studentId);
    expect(reconstructedMastery).toHaveLength(1);

    // Step 4: Validate 1:1 mathematical identity and observation explanation
    expect(reconstructedMastery[0].alpha).toBe(originalAlpha);
    expect(reconstructedMastery[0].beta).toBe(originalBeta);
    expect(reconstructedMastery[0].posteriorMean).toBe(originalMean);
    expect(reconstructedMastery[0].totalEvidence).toBe(50);

    // Step 5: Audit provenance for all 50 observations
    const audit = await service.getSkillMasteryProvenance(studentId, skillCode);
    expect(audit.provenance.totalEvidenceRows).toBe(50);
    expect(audit.provenance.calculatedAlpha).toBe(originalAlpha);
    expect(audit.provenance.calculatedBeta).toBe(originalBeta);
    expect(audit.provenance.contributions).toHaveLength(50);
    expect(audit.provenance.contributions[0].sourceId).toBe("ANSWER-ROW-1");
    expect(audit.provenance.contributions[49].sourceId).toBe("ANSWER-ROW-50");
  });
});
