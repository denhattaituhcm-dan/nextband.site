import { describe, it, expect, beforeEach } from "vitest";
import { EvidenceLedgerService } from "../services/evidence-ledger.service.js";

// Khởi tạo Mock Prisma in-memory thuần túy để kiểm thử hợp đồng Evidence
function createEvidenceMockPrisma() {
  const questionSkillTags: any[] = [];
  const diagnosticEvidences: any[] = [];
  const studentSkillEvidences: any[] = [];
  const studentSkillMasteries: any[] = [];

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
    },
    studentSkillEvidence: {
      create: async ({ data }: any) => {
        const item = {
          id: `ev-${studentSkillEvidences.length + 1}`,
          observedAt: new Date(),
          ...data,
        };
        studentSkillEvidences.push(item);
        return item;
      },
      findMany: async ({ where }: any) => {
        return studentSkillEvidences
          .filter((e) => !where?.studentId || e.studentId === where.studentId)
          .sort((a, b) => a.observedAt.getTime() - b.observedAt.getTime());
      },
    },
    studentSkillMastery: {
      upsert: async ({ where, create, update }: any) => {
        const idx = studentSkillMasteries.findIndex(
          (m) =>
            m.studentId === where.studentId_skillCode.studentId &&
            m.skillCode === where.studentId_skillCode.skillCode
        );
        if (idx >= 0) {
          studentSkillMasteries[idx] = { ...studentSkillMasteries[idx], ...update };
          return studentSkillMasteries[idx];
        } else {
          const item = { ...create };
          studentSkillMasteries.push(item);
          return item;
        }
      },
      findUnique: async ({ where }: any) => {
        return (
          studentSkillMasteries.find(
            (m) =>
              m.studentId === where.studentId_skillCode.studentId &&
              m.skillCode === where.studentId_skillCode.skillCode
          ) || null
        );
      },
      deleteMany: async () => {
        studentSkillMasteries.length = 0;
      },
    },
  } as any;
}

describe("Evidence Ledger & Recomputability Contract (Phase 0 Verification)", () => {
  let mockPrisma: any;
  let service: EvidenceLedgerService;

  beforeEach(async () => {
    mockPrisma = createEvidenceMockPrisma();
    service = new EvidenceLedgerService(mockPrisma);

    // Setup ontology mappings:
    // Q1 -> R_MS_QUALIFIER_SENSITIVITY (weight 1.0)
    // Q2 -> R_MS_QUALIFIER_SENSITIVITY (weight 1.0) & R_MS_PARAPHRASE_DISCRIMINATION (weight 0.8)
    await mockPrisma.questionSkillTag.create({
      data: { questionId: "Q1", skillCode: "R_MS_QUALIFIER_SENSITIVITY", weight: 1.0 },
    });
    await mockPrisma.questionSkillTag.create({
      data: { questionId: "Q2", skillCode: "R_MS_QUALIFIER_SENSITIVITY", weight: 1.0 },
    });
    await mockPrisma.questionSkillTag.create({
      data: { questionId: "Q2", skillCode: "R_MS_PARAPHRASE_DISCRIMINATION", weight: 0.8 },
    });
  });

  it("Question 1: Ta có thể truy nguyên mọi kết luận về đúng evidence gốc không?", async () => {
    // Học sinh nộp bài: Q1 sai (dính bẫy ERR_WORD_MATCHING_TRAP), Q2 đúng
    await service.recordSubmissionEvidence([
      {
        submissionId: "SUB-101",
        studentId: "STUDENT-A",
        questionId: "Q1",
        answerId: "ANS-1",
        isCorrect: false,
        scoreAwarded: 0,
        maxScore: 1,
        diagnosedError: {
          errorCode: "ERR_WORD_MATCHING_TRAP",
          confidence: 0.85,
          evidenceSnippet: "Học sinh chọn True vì thấy từ 'unprecedented' trùng bài đọc",
        },
      },
      {
        submissionId: "SUB-101",
        studentId: "STUDENT-A",
        questionId: "Q2",
        answerId: "ANS-2",
        isCorrect: true,
        scoreAwarded: 1,
        maxScore: 1,
      },
    ]);

    // Kiểm tra tính truy nguyên:
    const diag = await mockPrisma.diagnosticEvidence.findMany({
      where: { studentId: "STUDENT-A", errorCode: "ERR_WORD_MATCHING_TRAP" },
    });
    expect(diag).toHaveLength(1);
    expect(diag[0].submissionId).toBe("SUB-101");
    expect(diag[0].questionId).toBe("Q1");
    expect(diag[0].evidenceSnippet).toContain("unprecedented");

    const skillEvs = await mockPrisma.studentSkillEvidence.findMany({
      where: { studentId: "STUDENT-A" },
    });
    // Q1 sinh ra 1 evidence, Q2 sinh ra 2 evidences (cho 2 skills)
    expect(skillEvs).toHaveLength(3);

    const q1Ev = skillEvs.find((e: any) => e.sourceId === "ANS-1");
    expect(q1Ev.outcome).toBe(0.0);
    expect(q1Ev.skillCode).toBe("R_MS_QUALIFIER_SENSITIVITY");
  });

  it("Question 3: Xóa toàn bộ derived state rồi recompute có ra đúng kết quả cũ không?", async () => {
    // Học sinh làm 3 câu liên quan đến R_MS_QUALIFIER_SENSITIVITY: 1 sai, 2 đúng
    await service.recordSubmissionEvidence([
      {
        submissionId: "SUB-1",
        studentId: "STUDENT-B",
        questionId: "Q1",
        answerId: "ANS-1",
        isCorrect: false, // outcome 0.0
        scoreAwarded: 0,
        maxScore: 1,
      },
      {
        submissionId: "SUB-2",
        studentId: "STUDENT-B",
        questionId: "Q1",
        answerId: "ANS-2",
        isCorrect: true, // outcome 1.0
        scoreAwarded: 1,
        maxScore: 1,
      },
      {
        submissionId: "SUB-3",
        studentId: "STUDENT-B",
        questionId: "Q2",
        answerId: "ANS-3",
        isCorrect: true, // outcome 1.0
        scoreAwarded: 1,
        maxScore: 1,
      },
    ]);

    // 1. Tính lần 1
    const run1 = await service.recomputeStudentMastery("STUDENT-B");
    const qualifierRun1 = run1.find((r) => r.skillCode === "R_MS_QUALIFIER_SENSITIVITY");
    // Prior: alpha=1, beta=1. Thêm 2 đúng (alpha + 2), 1 sai (beta + 1) => alpha = 3.0, beta = 2.0
    expect(qualifierRun1?.alpha).toBe(3.0);
    expect(qualifierRun1?.beta).toBe(2.0);
    expect(qualifierRun1?.totalEvidence).toBe(3);
    expect(qualifierRun1?.masteryScore).toBeCloseTo(3.0 / 5.0, 4); // 0.60

    // 2. GIẢ LẬP SỰ CỐ: Xóa toàn bộ bảng StudentSkillMastery
    await mockPrisma.studentSkillMastery.deleteMany();

    // 3. Tái tính toán lần 2 hoàn toàn từ Evidence Ledger
    const run2 = await service.recomputeStudentMastery("STUDENT-B");
    const qualifierRun2 = run2.find((r) => r.skillCode === "R_MS_QUALIFIER_SENSITIVITY");

    // Xác nhận tính Bất Biến 1:1
    expect(qualifierRun2).toEqual(qualifierRun1);
  });
});
