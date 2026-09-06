import { describe, it, expect, beforeAll, vi } from "vitest";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createMockPrisma } from "./mockPrisma.js";
import { buildApp } from "../app.js";

const mockPrisma = createMockPrisma();
vi.mock("../plugins/prisma.js", () => {
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" }
    ),
  };
});

describe("🤖 AI WRITING 3-TIER PRE-GRADING DIAGNOSTIC ENDPOINT", () => {
  let app: FastifyInstance;
  const teacherId = "tch-ai-diag-1111";
  let teacherToken: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();

    teacherToken = app.jwt.sign({ id: teacherId, email: "teacher@test.com", roles: ["teacher"] });
    mockPrisma.users.push({
      id: teacherId,
      email: "teacher@test.com",
      fullName: "Teacher Tester",
      roles: ["teacher"],
    });
  });

  it("POST /api/v1/submissions/diagnose-writing returns 3-Tier diagnostic successfully with mocked Gemini response", async () => {
    const mockGeminiResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: JSON.stringify({
                  essayDiagnostic: {
                    bandScores: {
                      taskResponse: 6.5,
                      coherence: 6.0,
                      lexical: 6.5,
                      grammar: 6.0,
                      overall: 6.0,
                    },
                    summary: {
                      strengths: ["Phát triển ý bài bản", "Đa dạng từ vựng"],
                      primaryWeakness: "Thiếu liên kết chuyển ý giữa đoạn 1 và 2",
                      actionableAdvice: "Bổ sung linking phrases phản ánh quan hệ logic đối lập.",
                    },
                  },
                  discourseFeedbacks: [
                    {
                      scope: "PARAGRAPH",
                      paragraphIndex: 1,
                      category: "COHERENCE_COHESION",
                      tag: "MISSING_TRANSITION",
                      severity: "MODERATE",
                      note: "Đoạn 2 mở đầu đột ngột, chưa có liên từ nối.",
                    },
                  ],
                  sentenceFeedbacks: [
                    {
                      scope: "SENTENCE",
                      sentenceIndex: 0,
                      originalSentence: "The government have to invest more money.",
                      category: "GRAMMAR",
                      tag: "SUBJECT_VERB_AGREEMENT",
                      severity: "CRITICAL",
                      note: "'government' là số ít.",
                      suggestedSentence: "The government has to invest more money.",
                    },
                  ],
                }),
              },
            ],
          },
        },
      ],
    };

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockGeminiResponse,
    });

    try {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/submissions/diagnose-writing",
        headers: { authorization: `Bearer ${teacherToken}` },
        payload: {
          essayText: "The government have to invest more money in public education.",
          promptText: "Should the government invest in education?",
          taskType: "task2",
        },
      });

      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.body);

      expect(data.success).toBe(true);
      expect(data.essayDiagnostic.bandScores.overall).toBe(6.0);
      expect(data.discourseFeedbacks).toHaveLength(1);
      expect(data.discourseFeedbacks[0].tag).toBe("MISSING_TRANSITION");
      expect(data.sentenceFeedbacks).toHaveLength(1);
      expect(data.sentenceFeedbacks[0].tag).toBe("SUBJECT_VERB_AGREEMENT");
    } finally {
      global.fetch = originalFetch;
    }
  });

  it("POST /api/v1/submissions/diagnose-writing rejects unauthenticated requests", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/submissions/diagnose-writing",
      payload: {
        essayText: "Test essay",
      },
    });
    expect(res.statusCode).toBe(401);
  });
});
