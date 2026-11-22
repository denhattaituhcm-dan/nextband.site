import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import Fastify, { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";
import tuitionRoutes from "../routes/tuition.routes.js";
import arenaRoutes from "../routes/arena.routes.js";
import readingDiscussionRoutes from "../routes/reading-discussion.routes.js";
import reEnrollmentRoutes from "../routes/re-enrollment.routes.js";
import speakingStorageRoutes from "../routes/speakingStorage.routes.js";

describe("Security Hardening Regression Suite (SEC-F01 .. SEC-F07)", () => {
  let app: FastifyInstance;
  let adminToken: string;
  let teacherToken: string;
  let studentAToken: string;

  const mockAssets = new Map<string, any>();

  const mockPrisma: any = {
    user: {
      findFirst: vi.fn(async ({ where }: any) => {
        const id = where?.OR?.[0]?.userId || where?.OR?.[1]?.id;
        if (id === "admin-uid") {
          return { id: "admin-uid", userId: "admin-uid", email: "admin@nextband.site", isActive: true, roles: [{ role: "admin" }] };
        }
        if (id === "teacher-uid") {
          return { id: "teacher-uid", userId: "teacher-uid", email: "teacher@nextband.site", isActive: true, roles: [{ role: "teacher" }] };
        }
        if (id === "student-a-uid") {
          return { id: "student-a-uid", userId: "student-a-uid", email: "studenta@nextband.site", isActive: true, roles: [{ role: "student" }] };
        }
        return null;
      }),
    },
    userRole: {
      findMany: vi.fn(async ({ where }: any) => {
        const ids: string[] = where?.userId?.in || [];
        if (ids.includes("admin-uid")) return [{ role: "admin" }];
        if (ids.includes("teacher-uid")) return [{ role: "teacher" }];
        if (ids.includes("student-a-uid")) return [{ role: "student" }];
        return [];
      }),
    },
    classStudent: {
      findMany: vi.fn(async () => []),
      findUnique: vi.fn(async ({ where }: any) => {
        if (where?.parentToken === "valid-parent-token") {
          return {
            id: "cs-1",
            classId: "class-1",
            studentId: "student-a-uid",
            student: { fullName: "Student A", phone: "0901234567" },
            class: { id: "class-1", name: "IELTS 6.5", teacherId: "teacher-uid" },
          };
        }
        if (where?.classId_studentId?.studentId === "student-a-uid") {
          return {
            id: "cs-1",
            classId: "class-1",
            studentId: "student-a-uid",
            student: { fullName: "Student A", phone: "0901234567" },
            class: { id: "class-1", name: "IELTS 6.5", teacherId: "teacher-uid" },
          };
        }
        return null;
      }),
    },
    arenaSoloRun: {
      create: vi.fn(async ({ data }: any) => ({
        id: "run-1",
        ...data,
        createdAt: new Date().toISOString(),
      })),
    },
    readingDiscussion: {
      findMany: vi.fn(async () => []),
      create: vi.fn(async ({ data }: any) => ({
        id: "disc-1",
        ...data,
        createdAt: new Date().toISOString(),
      })),
      update: vi.fn(async ({ where }: any) => ({
        id: where.id,
        upvotes: 1,
      })),
    },
    contactLead: {
      create: vi.fn(async ({ data }: any) => ({
        id: "lead-1",
        ...data,
      })),
    },
    notification: {
      createMany: vi.fn(async () => ({ count: 1 })),
    },
    speakingRecordingAsset: {
      findUnique: vi.fn(async ({ where }: any) => mockAssets.get(where.id) || null),
      upsert: vi.fn(async ({ where, create, update }: any) => {
        const existing = mockAssets.get(where.id);
        const record = existing ? { ...existing, ...update } : { ...create };
        mockAssets.set(where.id, record);
        return record;
      }),
      update: vi.fn(async ({ where, data }: any) => {
        const existing = mockAssets.get(where.id);
        const record = { ...existing, ...data };
        mockAssets.set(where.id, record);
        return record;
      }),
    },
  };

  beforeAll(async () => {
    app = Fastify();
    await app.register(jwt, { secret: "test_secret_min_32_chars_for_security_audit_suite" });
    app.decorate("prisma", mockPrisma);

    await app.register(tuitionRoutes, { prefix: "/api/v1/admin/tuition" });
    await app.register(arenaRoutes, { prefix: "/api/v1/arena" });
    await app.register(readingDiscussionRoutes, { prefix: "/api/v1/reading-discussions" });
    await app.register(reEnrollmentRoutes, { prefix: "/api/v1" });
    await app.register(speakingStorageRoutes, { prefix: "/api/v1/speaking" });
    await app.ready();

    adminToken = app.jwt.sign({ id: "admin-uid", email: "admin@nextband.site", roles: ["admin"] });
    teacherToken = app.jwt.sign({ id: "teacher-uid", email: "teacher@nextband.site", roles: ["teacher"] });
    studentAToken = app.jwt.sign({ id: "student-a-uid", email: "studenta@nextband.site", roles: ["student"] });
  });

  afterAll(async () => {
    await app.close();
  });

  it("[SEC-F01] blocks teacher from accessing or mutating admin tuition endpoints", async () => {
    const teacherGet = await app.inject({
      method: "GET",
      url: "/api/v1/admin/tuition/summary",
      headers: { authorization: `Bearer ${teacherToken}` },
    });
    expect(teacherGet.statusCode).toBe(403);

    const teacherPatch = await app.inject({
      method: "PATCH",
      url: "/api/v1/admin/tuition/students/cs-1",
      headers: { authorization: `Bearer ${teacherToken}` },
      payload: { paymentStatus: "PAID", paidAmount: 5000000 },
    });
    expect(teacherPatch.statusCode).toBe(403);

    const adminGet = await app.inject({
      method: "GET",
      url: "/api/v1/admin/tuition/summary",
      headers: { authorization: `Bearer ${adminToken}` },
    });
    expect(adminGet.statusCode).toBe(200);
  });

  it("[SEC-F02] rejects forged Arena Solo scores above theoretical maximum while accepting valid runs", async () => {
    const forgedRes = await app.inject({
      method: "POST",
      url: "/api/v1/arena/solo/runs",
      payload: {
        nickname: "Hacker",
        totalScore: 999999999,
        correctCount: 10,
        totalQuestions: 10,
      },
    });
    expect(forgedRes.statusCode).toBe(400);

    const impossibleCorrectRes = await app.inject({
      method: "POST",
      url: "/api/v1/arena/solo/runs",
      payload: {
        nickname: "Hacker",
        totalScore: 5000,
        correctCount: 12,
        totalQuestions: 10,
      },
    });
    expect(impossibleCorrectRes.statusCode).toBe(400);

    const validRes = await app.inject({
      method: "POST",
      url: "/api/v1/arena/solo/runs",
      payload: {
        nickname: "ValidPlayer",
        totalScore: 10400,
        correctCount: 8,
        totalQuestions: 10,
        maxStreak: 5,
        avgResponseMs: 3200,
      },
    });
    expect(validRes.statusCode).toBe(201);
    const body = JSON.parse(validRes.body);
    expect(body.success).toBe(true);
    expect(body.data.challengeCode).toMatch(/^DL-[A-F0-9]{6}$/);
  });

  it("[SEC-F04] prevents cross-user overwrite or confirmation of speaking recording drafts", async () => {
    const assetId = "11111111-2222-4333-8444-555555555555";

    // Student A registers draft
    const regA = await app.inject({
      method: "POST",
      url: "/api/v1/speaking/register-draft",
      headers: { authorization: `Bearer ${studentAToken}` },
      payload: {
        id: assetId,
        referenceType: "EXAM_SUBMISSION",
        referenceId: "sub-1",
        questionId: "q-1",
      },
    });
    expect(regA.statusCode).toBe(201);

    // Unauthenticated or different user attempts to confirm Student A's draft
    const hijackConfirm = await app.inject({
      method: "POST",
      url: "/api/v1/speaking/confirm-upload",
      payload: {
        id: assetId,
        storagePath: `speaking-recordings/${assetId}.webm`,
      },
    });
    expect(hijackConfirm.statusCode).toBe(403);

    // Student A confirms own draft
    const validConfirm = await app.inject({
      method: "POST",
      url: "/api/v1/speaking/confirm-upload",
      headers: { authorization: `Bearer ${studentAToken}` },
      payload: {
        id: assetId,
        storagePath: `speaking-recordings/${assetId}.webm`,
      },
    });
    expect(validConfirm.statusCode).toBe(200);

    // Re-registering an already ACTIVE asset is rejected with 409
    const overwriteActive = await app.inject({
      method: "POST",
      url: "/api/v1/speaking/register-draft",
      headers: { authorization: `Bearer ${studentAToken}` },
      payload: {
        id: assetId,
        referenceType: "EXAM_SUBMISSION",
        referenceId: "sub-1",
      },
    });
    expect(overwriteActive.statusCode).toBe(409);
  });

  it("[SEC-F05] enforces content length limit and prevents staff badge impersonation in reading discussions", async () => {
    const oversized = await app.inject({
      method: "POST",
      url: "/api/v1/reading-discussions",
      payload: {
        caseId: "case-001",
        authorName: "Spammer",
        content: "A".repeat(2500),
      },
    });
    expect(oversized.statusCode).toBe(400);

    const impersonateRes = await app.inject({
      method: "POST",
      url: "/api/v1/reading-discussions",
      payload: {
        caseId: "case-001",
        authorName: "Fake Admin",
        authorBadge: "Ban Học Thuật ARIS",
        content: "Luận điểm hợp lệ.",
      },
    });
    expect(impersonateRes.statusCode).toBe(201);
    const created = JSON.parse(impersonateRes.body).data;
    expect(created.authorBadge).toBe("Học Viên");
  });

  it("[SEC-F06] requires parentToken or matching authenticated student identity for re-enrollment requests", async () => {
    // Unauthenticated call with classId + studentId (no parentToken) must return 401
    const unauthRes = await app.inject({
      method: "POST",
      url: "/api/v1/public/re-enrollment/request",
      payload: {
        classId: "class-1",
        studentId: "student-a-uid",
        parentPhone: "0901234567",
      },
    });
    expect(unauthRes.statusCode).toBe(401);

    // Authenticated Student A trying to request re-enrollment for Student B must return 403
    const crossStudentRes = await app.inject({
      method: "POST",
      url: "/api/v1/public/re-enrollment/request",
      headers: { authorization: `Bearer ${studentAToken}` },
      payload: {
        classId: "class-1",
        studentId: "student-b-uid",
        parentPhone: "0901234567",
      },
    });
    expect(crossStudentRes.statusCode).toBe(403);

    // Authenticated Student A requesting for self succeeds
    const validStudentRes = await app.inject({
      method: "POST",
      url: "/api/v1/public/re-enrollment/request",
      headers: { authorization: `Bearer ${studentAToken}` },
      payload: {
        classId: "class-1",
        studentId: "student-a-uid",
        parentPhone: "0901234567",
      },
    });
    expect(validStudentRes.statusCode).toBe(200);
  });
});
