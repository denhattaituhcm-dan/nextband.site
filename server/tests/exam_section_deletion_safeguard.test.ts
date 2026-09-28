import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => {
  process.env.NODE_ENV = "test";
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/nextband_test?schema=public";
  process.env.DIRECT_URL = "postgresql://postgres:postgres@localhost:5433/nextband_test?schema=public";
  process.env.JWT_SECRET = "test_jwt_secret_min_32_characters_for_isolated_testing_only";

  return {
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    user: {
      findFirst: vi.fn(),
    },
    exam: {
      findUnique: vi.fn(),
    },
    examSection: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      delete: vi.fn(),
    },
    questionGroup: {
      findUnique: vi.fn().mockResolvedValue(null),
      delete: vi.fn(),
    },
    question: {
      findUnique: vi.fn().mockResolvedValue(null),
      delete: vi.fn(),
    },
    answer: {
      count: vi.fn(),
    },
    highlight: {
      count: vi.fn(),
    },
  };
});

vi.mock("../plugins/prisma.js", async () => {
  const fp = (await import("fastify-plugin")).default;
  return {
    default: fp(
      async (fastify: any) => {
        fastify.decorate("prisma", mockPrisma);
      },
      { name: "prisma" },
    ),
  };
});

import { FastifyInstance } from "fastify";
import { buildApp } from "../app.js";

describe("Exam Section Deletion Safeguard Test Suite", () => {
  let app: FastifyInstance;
  let adminToken: string;
  const adminId = "adm-0000-1111-2222-333333333333";

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    adminToken = app.jwt.sign({ id: adminId, roles: ["admin"], email: "admin@test.com" });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("blocks deleting a section if it contains student answers", async () => {
    mockPrisma.examSection.findUnique.mockResolvedValueOnce({
      id: "sec-with-answers",
      examId: "exam-1",
      exam: { id: "exam-1", isActive: true, isLocked: false },
    });
    mockPrisma.answer.count.mockResolvedValueOnce(5); // 5 student answers exist
    mockPrisma.highlight.count.mockResolvedValueOnce(0);

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/sections/sec-with-answers",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(409);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("SECTION_HAS_SUBMISSIONS");
    expect(body.message).toContain("Không thể xóa phần thi khi đã có học viên");
    expect(mockPrisma.examSection.delete).not.toHaveBeenCalled();
  });

  it("blocks deleting a section if it contains student highlights", async () => {
    mockPrisma.examSection.findUnique.mockResolvedValueOnce({
      id: "sec-with-highlights",
      examId: "exam-1",
      exam: { id: "exam-1", isActive: true, isLocked: false },
    });
    mockPrisma.answer.count.mockResolvedValueOnce(0);
    mockPrisma.highlight.count.mockResolvedValueOnce(2); // 2 highlights exist

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/sections/sec-with-highlights",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(409);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("SECTION_HAS_SUBMISSIONS");
    expect(mockPrisma.examSection.delete).not.toHaveBeenCalled();
  });

  it("allows deleting an empty section even when other sections in the exam have submissions", async () => {
    mockPrisma.examSection.findUnique.mockResolvedValueOnce({
      id: "sec-empty-grammar",
      examId: "exam-1",
      exam: { id: "exam-1", isActive: true, isLocked: false },
    });
    mockPrisma.answer.count.mockResolvedValueOnce(0); // 0 answers in this section
    mockPrisma.highlight.count.mockResolvedValueOnce(0); // 0 highlights
    mockPrisma.examSection.delete.mockResolvedValueOnce({ id: "sec-empty-grammar" });

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/sections/sec-empty-grammar",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(mockPrisma.examSection.delete).toHaveBeenCalledWith({
      where: { id: "sec-empty-grammar" },
    });
  });

  it("blocks deleting a question group if it contains student answers", async () => {
    mockPrisma.answer.count.mockResolvedValueOnce(3); // 3 answers in group

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/questions/groups/grp-with-answers",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(409);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("GROUP_HAS_SUBMISSIONS");
    expect(mockPrisma.questionGroup.delete).not.toHaveBeenCalled();
  });

  it("blocks deleting a question if it contains student answers", async () => {
    mockPrisma.answer.count.mockResolvedValueOnce(1); // 1 answer for question

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/questions/q-with-answer",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(409);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("QUESTION_HAS_SUBMISSIONS");
    expect(mockPrisma.question.delete).not.toHaveBeenCalled();
  });

  it("blocks deleting a section via /exams/:examId/sections/:sectionId if it has answers", async () => {
    mockPrisma.exam.findUnique.mockResolvedValueOnce({
      id: "exam-1",
      isActive: true,
      isLocked: false,
    });
    mockPrisma.examSection.findFirst.mockResolvedValueOnce({
      id: "sec-with-answers",
      examId: "exam-1",
    });
    mockPrisma.answer.count.mockResolvedValueOnce(4);
    mockPrisma.highlight.count.mockResolvedValueOnce(0);

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/exams/exam-1/sections/sec-with-answers",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(409);
    const body = JSON.parse(res.payload);
    expect(body.error).toBe("SECTION_HAS_SUBMISSIONS");
    expect(mockPrisma.examSection.delete).not.toHaveBeenCalled();
  });

  it("allows deleting an empty section via /exams/:examId/sections/:sectionId even when exam has submissions", async () => {
    mockPrisma.exam.findUnique.mockResolvedValueOnce({
      id: "exam-1",
      isActive: true,
      isLocked: false,
    });
    mockPrisma.examSection.findFirst.mockResolvedValueOnce({
      id: "sec-empty",
      examId: "exam-1",
    });
    mockPrisma.answer.count.mockResolvedValueOnce(0);
    mockPrisma.highlight.count.mockResolvedValueOnce(0);
    mockPrisma.examSection.delete.mockResolvedValueOnce({ id: "sec-empty" });

    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/exams/exam-1/sections/sec-empty",
      headers: {
        authorization: `Bearer ${adminToken}`,
      },
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.success).toBe(true);
    expect(mockPrisma.examSection.delete).toHaveBeenCalledWith({
      where: { id: "sec-empty" },
    });
  });
});
