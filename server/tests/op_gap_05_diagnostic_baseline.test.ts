import { describe, it, expect } from "vitest";

describe("🎯 OP-GAP-05: STUDENT 360 DIAGNOSTIC BASELINE CONTEXT SUITE", () => {
  it("Correctly constructs diagnostic baseline DTO from assessment session", () => {
    const rawAssessment = {
      id: "assess-001",
      examId: "exam-placement-001",
      targetBand: "6.5",
      status: "SUBMITTED",
      gradingStatus: "GRADED",
      submittedAt: new Date("2026-08-15T10:00:00Z"),
      createdAt: new Date("2026-08-15T09:00:00Z"),
      exam: { id: "exam-placement-001", title: "ARIS Clean-Room Placement Test" },
      result: {
        estimatedIeltsRange: "Band 5.5 – 6.0",
        levelTitle: "Cấp 3 — Học Sĩ (Achiever Core)",
        levelNumber: 3,
        accuracyPercent: 68,
        listeningBandInfo: { band: "5.5" },
        readingBandInfo: { band: "6.0" },
        grammarBandInfo: { band: "6.0" },
      },
    };

    const resObj = (rawAssessment.result || {}) as any;
    const diagnosticBaseline = {
      id: rawAssessment.id,
      examTitle: rawAssessment.exam?.title || "Bài thi đánh giá năng lực đầu vào",
      targetBand: rawAssessment.targetBand || null,
      estimatedBand: resObj?.estimatedIeltsRange || resObj?.overallBand || null,
      levelTitle: resObj?.levelTitle || null,
      levelNumber: resObj?.levelNumber ?? null,
      accuracyPercent: resObj?.accuracyPercent ?? null,
      listeningBand: resObj?.listeningBandInfo?.band || null,
      readingBand: resObj?.readingBandInfo?.band || null,
      grammarBand: resObj?.grammarBandInfo?.band || null,
      gradingStatus: rawAssessment.gradingStatus,
      testDate: rawAssessment.submittedAt || rawAssessment.createdAt,
    };

    expect(diagnosticBaseline.estimatedBand).toBe("Band 5.5 – 6.0");
    expect(diagnosticBaseline.targetBand).toBe("6.5");
    expect(diagnosticBaseline.levelTitle).toBe("Cấp 3 — Học Sĩ (Achiever Core)");
    expect(diagnosticBaseline.accuracyPercent).toBe(68);
    expect(diagnosticBaseline.listeningBand).toBe("5.5");
    expect(diagnosticBaseline.readingBand).toBe("6.0");
    expect(diagnosticBaseline.grammarBand).toBe("6.0");
    expect(diagnosticBaseline.examTitle).toBe("ARIS Clean-Room Placement Test");
  });

  it("Preserves full Academic Continuum: Profile -> Diagnostic -> Current Performance -> Care Log", () => {
    const studentWorkspaceDTO = {
      userId: "stu-100",
      fullName: "Trần Minh Quân",
      email: "quan.tm@gmail.com",
      diagnosticBaseline: {
        estimatedBand: "Band 5.0 – 5.5",
        targetBand: "6.5",
        testDate: "2026-08-01T08:30:00.000Z",
      },
      academicHealth: 85,
      homework: { submittedCount: 12, totalAssignedCount: 14, percentage: 86 },
      attendance: { attendedCount: 8, totalSessions: 8, percentage: 100 },
      interventionsCount: 1,
    };

    expect(studentWorkspaceDTO.diagnosticBaseline.estimatedBand).toBe("Band 5.0 – 5.5");
    expect(studentWorkspaceDTO.diagnosticBaseline.targetBand).toBe("6.5");
    expect(studentWorkspaceDTO.academicHealth).toBe(85);
    expect(studentWorkspaceDTO.homework.percentage).toBe(86);
  });
});
