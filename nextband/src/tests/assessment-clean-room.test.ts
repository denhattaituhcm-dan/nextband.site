import { describe, it, expect } from "vitest";
import { canonicalPlacementTestPayload } from "../../../server/data/placement-test/questions.js";
import { authoritativePlacementAnswerKeys } from "../../../server/data/placement-test/answerKeys.js";
import {
  AssessmentService,
  mapRawScoreToArisLevel,
} from "../../../server/services/assessment.service.js";
import { getArisDiagnosticLevel } from "../features/assessment/domain/diagnostic.rules";

// Mock minimal Prisma client for testing
const createMockPrisma = () => ({
  contactLead: {
    create: async () => ({ id: "mock_lead_1" }),
    updateMany: async () => ({ count: 1 }),
  },
  assessmentSession: {
    create: async () => ({ id: "mock_session_1" }),
    findUnique: async () => null,
    update: async () => ({ id: "mock_session_1" }),
  },
});

describe("ARIS Clean-Room Assessment Engine Test Suite", () => {
  const service = new AssessmentService(createMockPrisma() as any);

  // Test 1: Zero Secret Leak in Client Question Payload
  it("Test 1: Sanitized Client Payload must NOT contain any answer keys or secret fields", () => {
    const payload = canonicalPlacementTestPayload;
    expect(payload).toBeDefined();
    expect(payload.testId).toBe("cce291f7-d88b-4976-8ed3-cc21daca7023");

    // Check listening questions
    payload.skills.listening.questions.forEach((q) => {
      expect((q as any).correctAnswer).toBeUndefined();
      expect((q as any).answerKey).toBeUndefined();
      expect((q as any).acceptedAnswers).toBeUndefined();
    });

    // Check reading questions
    payload.skills.reading.questions.forEach((q) => {
      expect((q as any).correctAnswer).toBeUndefined();
      expect((q as any).answerKey).toBeUndefined();
      expect((q as any).acceptedAnswers).toBeUndefined();
    });

    // Check grammar questions
    payload.skills.grammar.questions.forEach((q) => {
      expect((q as any).correctAnswer).toBeUndefined();
      expect((q as any).answerKey).toBeUndefined();
      expect((q as any).acceptedAnswers).toBeUndefined();
    });
  });

  // Test 2: Validation of Candidate Full Name & Phone
  it("Test 2: Creating session requires valid Name (>=2 chars) and Phone (>=9 digits)", async () => {
    // Empty name
    await expect(
      service.createAssessmentSession({
        fullName: "",
        phone: "0901234567",
      }),
    ).rejects.toThrow("Họ và tên thí sinh phải có ít nhất 2 ký tự");

    // Invalid phone
    await expect(
      service.createAssessmentSession({
        fullName: "Nguyễn Văn A",
        phone: "123",
      }),
    ).rejects.toThrow("Số điện thoại không hợp lệ (tối thiểu 9 chữ số)");

    // Valid session
    const validSession = await service.createAssessmentSession({
      fullName: "Nguyễn Văn An",
      phone: "0908123456",
      targetBand: "IELTS 6.5",
    });

    expect(validSession).toBeDefined();
    expect(validSession.id).toBeDefined();
    expect(validSession.status).toBe("ACTIVE");
    expect(validSession.candidateName).toBe("Nguyễn Văn An");
    expect(validSession.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  // Test 3: Session Expiration Enforcement
  it("Test 3: Expired sessions are rejected with 403 status on test fetch and submit", async () => {
    const session = await service.createAssessmentSession({
      fullName: "Trần Thị B",
      phone: "0912345678",
    });

    // Manually expire session
    session.expiresAt = new Date(Date.now() - 10000);

    await expect(service.getTestPayloadForSession(session.id)).rejects.toThrow(
      "Phiên làm bài đã hết hạn",
    );

    await expect(service.autosaveAnswers(session.id, { L1: "Thứ Ba" })).rejects.toThrow(
      "Phiên làm bài đã hết hạn",
    );
  });

  // Test 4: Canonical Server-side Scoring against Authoritative Secret Keys
  it("Test 4: Server correctly evaluates objective answers against secret answer keys", async () => {
    const session = await service.createAssessmentSession({
      fullName: "Lê Văn C",
      phone: "0987654321",
      targetBand: "IELTS 7.0",
    });

    // Submit correct answers for Listening, Reading, Grammar with canonical UUIDs
    const studentAnswers: Record<string, any> = {
      "43907def-1f78-4839-8751-ff1079fdee91": {
        0: "choose",
        1: "private",
        2: "20%",
        3: "healthy",
        4: "bones",
      },
      "c0d8e9bd-f426-42c3-b051-4c15df13543a": {
        0: "update",
        1: "environment",
        2: "captain",
        3: "films",
      },
      "e6084ef6-30d7-421b-9935-c15e506d4049": "FALSE",
      "de50e60b-f74c-4948-905f-03f5ba2c0b6d": "NOT GIVEN",
      "7b3cc213-6fbc-4e41-8ed7-9420773fd55a": "goes",
      "5ba28972-e776-4953-b05e-41d6a862c4ed": "have read",
      "afd8852d-5f56-413d-99ef-73cd89c969d4": "will be sent",
      "59739e98-711b-4d4b-8927-e5f97c0d3a32": "much",
      writing_response: "I strongly believe that higher education should be supported by government subsidies...",
      speaking_completed: true,
    };

    const report = await service.submitAssessment(session.id, studentAnswers);

    expect(report).toBeDefined();
    expect(report.sessionId).toBe(session.id);
    expect(report.objectiveBreakdown.listening.correct).toBeGreaterThanOrEqual(3);
    expect(report.objectiveBreakdown.reading.correct).toBeGreaterThanOrEqual(4);
    expect(report.objectiveBreakdown.grammar.correct).toBeGreaterThanOrEqual(4);
    expect(report.objectiveBreakdown.rawScore).toBeGreaterThanOrEqual(11);
    expect(report.subjectiveEvaluation.status).toBe("PENDING_REVIEW");
    expect(report.subjectiveEvaluation.hasWritingSubmission).toBe(true);
  });

  // Test 5: Anti-Double Submit Protection
  it("Test 5: Submitting a session twice is rejected with 409 Conflict", async () => {
    const session = await service.createAssessmentSession({
      fullName: "Phạm Văn D",
      phone: "0933112233",
    });

    // First submit succeeds
    await service.submitAssessment(session.id, { L1: "Thứ Ba & Thứ Năm" });

    // Second submit must fail
    await expect(
      service.submitAssessment(session.id, { L1: "Thứ Ba & Thứ Năm" }),
    ).rejects.toThrow("Bài khảo thí này đã được nộp trước đó");
  });

  // Test 6: ARIS Diagnostic Scale & Estimated IELTS Range Mapping
  it("Test 6: Raw scores map accurately to ARIS Diagnostic Level 1 through Level 6", () => {
    const level1 = mapRawScoreToArisLevel(5, 35); // ~14%
    expect(level1.levelNumber).toBe(1);
    expect(level1.estimatedIeltsRange).toBe("Band 2.5 – 3.5");

    const level2 = mapRawScoreToArisLevel(12, 35); // ~34%
    expect(level2.levelNumber).toBe(2);
    expect(level2.estimatedIeltsRange).toBe("Band 3.5 – 4.5");

    const level3 = mapRawScoreToArisLevel(19, 35); // ~54%
    expect(level3.levelNumber).toBe(3);
    expect(level3.estimatedIeltsRange).toBe("Band 5.0 – 5.5");

    const level4 = mapRawScoreToArisLevel(26, 35); // ~74%
    expect(level4.levelNumber).toBe(4);
    expect(level4.estimatedIeltsRange).toBe("Band 6.0 – 6.5");

    const level5 = mapRawScoreToArisLevel(30, 35); // ~85%
    expect(level5.levelNumber).toBe(5);
    expect(level5.estimatedIeltsRange).toBe("Band 7.0 – 7.5");

    const level6 = mapRawScoreToArisLevel(34, 35); // ~97%
    expect(level6.levelNumber).toBe(6);
    expect(level6.estimatedIeltsRange).toBe("Band 8.0 – 8.5+");
  });

  // Test 7: Client Diagnostic Rule Consistency with Server Mapping
  it("Test 7: Client domain diagnostic rules perfectly match server diagnostic mapper", () => {
    const clientL3 = getArisDiagnosticLevel(19, 35);
    const serverL3 = mapRawScoreToArisLevel(19, 35);

    expect(clientL3.levelNumber).toBe(serverL3.levelNumber);
    expect(clientL3.estimatedIeltsRange).toBe(serverL3.estimatedIeltsRange);
    expect(clientL3.recommendedCourse.slug).toBe(serverL3.recommendedCourse.slug);
  });
});
