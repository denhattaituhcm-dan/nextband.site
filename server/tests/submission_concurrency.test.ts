import { describe, it, expect, vi } from "vitest";
import { ExamSubmissionService } from "../services/exam-submission.service.js";
import { SubmissionRepository } from "../repositories/submission.repository.js";

describe("Phase 3: Database Concurrency Lock & Idempotent StartAttempt", () => {
  it("idempotently returns the existing IN_PROGRESS submission if a concurrent request creates it right before create()", async () => {
    const existingActive = {
      id: "sub-concurrent-winner",
      examId: "exam-1",
      studentId: "student-1",
      status: "IN_PROGRESS",
      startedAt: new Date(),
      answers: [],
      version: 1,
    };

    const mockPrisma: any = {
      exam: {
        findUnique: vi.fn().mockResolvedValue({
          id: "exam-1",
          durationMinutes: 60,
          sections: [],
          isOpen: true,
        }),
      },
      examSubmission: {
        count: vi.fn().mockResolvedValue(0),
        findFirst: vi
          .fn()
          .mockResolvedValueOnce(null) // first check: no inProgress
          .mockResolvedValueOnce(null) // recentConcurrent: null
          .mockResolvedValueOnce(null) // existingSubmitted: null
          .mockResolvedValueOnce(existingActive), // concurrent recheck upon conflict / race: returns winning attempt
        create: vi.fn().mockRejectedValue({
          code: "P2002",
          meta: { target: ["exam_id", "student_id", "status"] },
        }),
      },
      $transaction: vi.fn().mockImplementation(async (callback) => {
        return callback(mockPrisma);
      }),
    };

    const service = new ExamSubmissionService(mockPrisma);

    const result = await service.startAttempt(
      { id: "student-1", roles: ["student"] },
      "exam-1"
    );

    expect(result.isNew).toBe(false);
    expect(result.submission.id).toBe("sub-concurrent-winner");
    expect(result.submission.isResumed).toBe(true);
  });
});
