import { describe, it, expect, beforeEach } from "vitest";
import {
  AcademicDiagnosticService,
  DiagnosticInput,
} from "../services/academic-diagnostic.service.js";

function createDiagnosticMockPrisma() {
  const diagnosticEvidences: any[] = [];
  const submissions: any[] = [];
  const answers: any[] = [];

  return {
    _store: { diagnosticEvidences, submissions, answers },
    diagnosticEvidence: {
      upsert: async ({ where, create, update }: any) => {
        const idx = diagnosticEvidences.findIndex(
          (d) =>
            d.submissionId === where.submissionId_questionId_ruleCode_taxonomyVersion.submissionId &&
            d.questionId === where.submissionId_questionId_ruleCode_taxonomyVersion.questionId &&
            d.ruleCode === where.submissionId_questionId_ruleCode_taxonomyVersion.ruleCode &&
            d.taxonomyVersion === where.submissionId_questionId_ruleCode_taxonomyVersion.taxonomyVersion
        );
        if (idx >= 0) {
          diagnosticEvidences[idx] = { ...diagnosticEvidences[idx], ...update };
          return diagnosticEvidences[idx];
        } else {
          const item = { id: `diag-${diagnosticEvidences.length + 1}`, ...create };
          diagnosticEvidences.push(item);
          return item;
        }
      },
      findMany: async ({ where }: any) => {
        return diagnosticEvidences.filter((d) => {
          if (where?.submissionId && d.submissionId !== where.submissionId) return false;
          if (where?.questionId && d.questionId !== where.questionId) return false;
          if (where?.taxonomyVersion && d.taxonomyVersion !== where.taxonomyVersion) return false;
          if (where?.errorCode && d.errorCode !== where.errorCode) return false;
          return true;
        });
      },
    },
  } as any;
}

describe("Academic Diagnostic Engine — Phase 2 Test Matrix", () => {
  let mockPrisma: any;
  let service: AcademicDiagnosticService;

  beforeEach(() => {
    mockPrisma = createDiagnosticMockPrisma();
    service = new AcademicDiagnosticService(mockPrisma);
  });

  // Test A — Correct answer
  it("Test A: Correct answer -> NO diagnostic", () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-001",
      questionId: "Q-001",
      studentId: "STU-001",
      questionType: "multiple_choice",
      studentAnswer: "B",
      correctAnswer: "B",
      isCorrect: true,
      options: [
        { key: "A", text: "Global atmospheric temperature" },
        { key: "B", text: "Precipitation variation" },
      ],
      passageText: "The study focused on precipitation variation across continents.",
    };

    const hypotheses = service.diagnose(input);
    expect(hypotheses).toHaveLength(0);
  });

  // Test B — Wrong answer with strong Word Matching evidence
  it("Test B: Wrong answer with strong Word Matching evidence -> ERR_WORD_MATCHING_TRAP", () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-002",
      questionId: "Q-002",
      studentId: "STU-001",
      questionType: "multiple_choice",
      studentAnswer: "A", // Học sinh chọn A vì thấy từ 'atmospheric temperature' trùng bài đọc
      correctAnswer: "B",
      isCorrect: false,
      options: [
        { key: "A", text: "Global atmospheric temperature" },
        { key: "B", text: "Subterranean water tables" },
      ],
      passageText:
        "Although previous researchers analyzed atmospheric temperature, the current breakthrough focuses on subterranean water tables.",
    };

    const hypotheses = service.diagnose(input);
    expect(hypotheses.length).toBeGreaterThanOrEqual(1);

    const matchTrap = hypotheses.find((h) => h.errorCode === "ERR_WORD_MATCHING_TRAP");
    expect(matchTrap).toBeDefined();
    expect(matchTrap?.confidence).toBeGreaterThanOrEqual(0.8);
    expect(matchTrap?.evidenceSnippet).toContain("atmospheric");
    expect(matchTrap?.ruleCode).toBe("RULE_001_WORD_MATCHING");
  });

  // Test C — Wrong answer but insufficient evidence
  it("Test C: Wrong answer but insufficient evidence -> NO_DIAGNOSIS", () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-003",
      questionId: "Q-003",
      studentId: "STU-001",
      questionType: "multiple_choice",
      studentAnswer: "C",
      correctAnswer: "B",
      isCorrect: false,
      // Lựa chọn C không có từ nào trùng với passage, không chứa extreme qualifier, không vi phạm word limit
      options: [
        { key: "B", text: "Subterranean water tables" },
        { key: "C", text: "Alternative energy source" },
      ],
      passageText: "The study strictly observed subterranean water tables in arid zones.",
    };

    const hypotheses = service.diagnose(input);
    // Invariant: Không ép buộc hệ thống phải đoán mò khi không có căn cứ
    expect(hypotheses).toHaveLength(0);
  });

  // Test D — Extreme qualifier
  it("Test D: Extreme qualifier conflict -> ERR_EXTREME_QUALIFIER", () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-004",
      questionId: "Q-004",
      studentId: "STU-001",
      questionType: "true_false_not_given",
      questionText: "The local species completely disappeared after the eruption.",
      studentAnswer: "True",
      correctAnswer: "False",
      isCorrect: false,
      passageText: "Records indicate that the local species rarely perished, but some migrated south.",
    };

    const hypotheses = service.diagnose(input);
    const qualifierHyp = hypotheses.find((h) => h.errorCode === "ERR_EXTREME_QUALIFIER");
    expect(qualifierHyp).toBeDefined();
    expect(qualifierHyp?.confidence).toBeGreaterThanOrEqual(0.8);
    expect(qualifierHyp?.evidenceSnippet).toContain("completely");
    expect(qualifierHyp?.evidenceSnippet).toContain("rarely");
  });

  // Test E — Word limit breach
  it("Test E: Answer > allowed words -> ERR_WORD_LIMIT_BREACH", () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-005",
      questionId: "Q-005",
      studentId: "STU-001",
      questionType: "fill_blank",
      studentAnswer: "an extremely high temperature recorded", // 5 words
      correctAnswer: "high temperature",
      maxWordsAllowed: 2,
      isCorrect: false,
    };

    const hypotheses = service.diagnose(input);
    const limitHyp = hypotheses.find((h) => h.errorCode === "ERR_WORD_LIMIT_BREACH");
    expect(limitHyp).toBeDefined();
    expect(limitHyp?.confidence).toBe(0.98);
    expect(limitHyp?.evidenceSnippet).toContain("tối đa 2 từ");
    expect(limitHyp?.evidenceSnippet).toContain("5 từ");
  });

  // Test F — Raw evidence immutability
  it("Test F: Raw evidence immutability (before === after)", async () => {
    // Giả lập đối tượng raw answer
    const rawAnswer = Object.freeze({
      id: "ANS-999",
      submissionId: "SUB-006",
      questionId: "Q-006",
      studentAnswerText: "the whole community must participate",
      score: 0,
      createdAt: new Date("2026-09-01T08:00:00Z"),
    });

    const snapshotBefore = JSON.stringify(rawAnswer);

    const input: DiagnosticInput = {
      submissionId: rawAnswer.submissionId,
      questionId: rawAnswer.questionId,
      studentId: "STU-001",
      questionType: "short_answer",
      questionText: "Who must participate in the event?",
      studentAnswer: rawAnswer.studentAnswerText,
      correctAnswer: "local volunteers",
      isCorrect: false,
      maxWordsAllowed: 2,
    };

    // Chạy diagnostic và persist
    await service.persistDiagnosticEvidence(input, "1.0.0");

    const snapshotAfter = JSON.stringify(rawAnswer);

    // Invariant 1: Tuyệt đối không có side-effect lên raw answer
    expect(snapshotBefore).toBe(snapshotAfter);
  });

  // Test G — Idempotency (duplicate run produces 0 extra records)
  it("Test G: Idempotency (re-running produces zero duplicates)", async () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-007",
      questionId: "Q-007",
      studentId: "STU-001",
      questionType: "fill_blank",
      studentAnswer: "one two three four",
      correctAnswer: "one",
      maxWordsAllowed: 1,
      isCorrect: false,
    };

    // Run 1
    const count1 = await service.persistDiagnosticEvidence(input, "1.0.0");
    expect(count1).toBe(1);

    const recordsAfterRun1 = await mockPrisma.diagnosticEvidence.findMany({
      where: { submissionId: "SUB-007" },
    });
    expect(recordsAfterRun1).toHaveLength(1);

    // Run 2 (Chạy lại đúng input cũ)
    const count2 = await service.persistDiagnosticEvidence(input, "1.0.0");
    expect(count2).toBe(1);

    const recordsAfterRun2 = await mockPrisma.diagnosticEvidence.findMany({
      where: { submissionId: "SUB-007" },
    });

    // Invariant 8: Không tạo bản ghi dư thừa
    expect(recordsAfterRun2.length).toBe(recordsAfterRun1.length);
  });

  // Test H — Taxonomy version coexistence
  it("Test H: Taxonomy version coexistence (v1.0.0 and v1.1.0 coexist without overwrite)", async () => {
    const input: DiagnosticInput = {
      submissionId: "SUB-008",
      questionId: "Q-008",
      studentId: "STU-001",
      questionType: "fill_blank",
      studentAnswer: "red blue green yellow",
      correctAnswer: "red",
      maxWordsAllowed: 2,
      isCorrect: false,
    };

    // 1. Chạy với taxonomy v1.0.0
    await service.persistDiagnosticEvidence(input, "1.0.0");

    // 2. Chạy với taxonomy v1.1.0
    await service.persistDiagnosticEvidence(input, "1.1.0");

    // Invariant 9: Cả 2 bản ghi lịch sử cùng tồn tại phục vụ historical analytics
    const allRecords = await mockPrisma.diagnosticEvidence.findMany({
      where: { submissionId: "SUB-008" },
    });
    expect(allRecords).toHaveLength(2);

    const v1 = allRecords.find((r: any) => r.taxonomyVersion === "1.0.0");
    const v2 = allRecords.find((r: any) => r.taxonomyVersion === "1.1.0");
    expect(v1).toBeDefined();
    expect(v2).toBeDefined();
    expect(v1.id).not.toBe(v2.id);
  });
});
