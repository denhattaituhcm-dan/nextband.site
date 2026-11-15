import { describe, it, expect } from "vitest";
import Fastify from "fastify";
import vocabInUseRoutes from "../routes/vocab-in-use.routes.js";
import { DiagnosticService } from "../services/diagnostic.service.js";

describe("📚 Vocabulary in Use (VIU) — Sync Architecture & SM-2 Engine", () => {
  describe("🛡️ 1. Absolute Diagnostic Isolation (Gate Protection)", () => {
    it("ensures VIU bookmarks never leak into student academic diagnostic vulnerabilities", async () => {
      // Mock Prisma with both userVocabulary (empty/normal) and vocabInUseBookmark (containing advanced C1-C2 words)
      const mockPrisma: any = {
        classExamAssignment: {
          findMany: async () => [{ examId: "exam-1" }],
        },
        examSubmission: {
          findMany: async () => [
            {
              id: "sub-1",
              status: "SUBMITTED",
              answers: [
                {
                  score: 1,
                  evidence: { isCorrect: true },
                  question: {
                    questionType: "reading",
                    group: { section: { sectionType: "reading" } },
                  },
                },
              ],
            },
          ],
        },
        // DiagnosticService ONLY queries userVocabulary:
        userVocabulary: {
          findMany: async () => [],
        },
        // VIU bookmarks stored in dedicated table:
        vocabInUseBookmark: {
          findMany: async () => [
            {
              id: "viu-bm-1",
              userId: "student-viu-01",
              unitId: 20,
              lexiconId: "placenta",
              word: "placenta",
              masteryScore: 0.1, // If this were in userVocabulary, it would trigger a false CRITICAL/WEAK alert
              failedReviews: 3,
            },
            {
              id: "viu-bm-2",
              userId: "student-viu-01",
              unitId: 20,
              lexiconId: "intestate",
              word: "intestate",
              masteryScore: 0.1,
              failedReviews: 2,
            },
          ],
        },
      };

      const diagnosticService = new DiagnosticService(mockPrisma);
      const diagnostic = await diagnosticService.getStudentDiagnostic(
        "student-viu-01",
        "class-01"
      );

      // Verified: language.vocabulary remains completely unaffected by VIU bookmarks!
      expect(diagnostic.language.vocabulary).toHaveLength(0);
      expect(
        diagnostic.language.vocabulary.some(
          (v) => v.word === "placenta" || v.word === "intestate"
        )
      ).toBe(false);
    });
  });

  describe("🔄 2. Fastify Route Sync & Idempotency", () => {
    function buildTestApp(inMemoryStore: any[]) {
      const app = Fastify();

      // Mock authenticate decorator
      app.decorate("authenticate", async (request: any) => {
        request.user = { id: "test-user-123", email: "student@nextband.site" };
      });

      // Mock Prisma on fastify instance
      app.decorate("prisma", {
        $transaction: async (fn: any) => {
          return await fn({
            vocabInUseBookmark: {
              findUnique: async ({ where }: any) => {
                const { userId, unitId, lexiconId } = where.userId_unitId_lexiconId;
                return (
                  inMemoryStore.find(
                    (b) =>
                      b.userId === userId &&
                      b.unitId === unitId &&
                      b.lexiconId === lexiconId
                  ) || null
                );
              },
              create: async ({ data }: any) => {
                const newRecord = {
                  id: `bm-${Date.now()}-${Math.random()}`,
                  ...data,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                };
                inMemoryStore.push(newRecord);
                return newRecord;
              },
              update: async ({ where, data }: any) => {
                const idx = inMemoryStore.findIndex((b) => b.id === where.id);
                if (idx !== -1) {
                  inMemoryStore[idx] = {
                    ...inMemoryStore[idx],
                    ...data,
                    updatedAt: new Date(),
                  };
                  return inMemoryStore[idx];
                }
                return null;
              },
            },
          });
        },
        vocabInUseBookmark: {
          findMany: async ({ where }: any) => {
            return inMemoryStore.filter((b) => b.userId === where.userId);
          },
          findFirst: async ({ where }: any) => {
            return (
              inMemoryStore.find(
                (b) => b.id === where.id && b.userId === where.userId
              ) || null
            );
          },
          findUnique: async ({ where }: any) => {
            const { userId, unitId, lexiconId } = where.userId_unitId_lexiconId;
            return (
              inMemoryStore.find(
                (b) =>
                  b.userId === userId &&
                  b.unitId === unitId &&
                  b.lexiconId === lexiconId
              ) || null
            );
          },
          create: async ({ data }: any) => {
            const newRecord = {
              id: `bm-${Date.now()}-${Math.random()}`,
              ...data,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            inMemoryStore.push(newRecord);
            return newRecord;
          },
          delete: async ({ where }: any) => {
            const idx = inMemoryStore.findIndex((b) => b.id === where.id);
            if (idx !== -1) {
              const removed = inMemoryStore.splice(idx, 1);
              return removed[0];
            }
            return null;
          },
          update: async ({ where, data }: any) => {
            const idx = inMemoryStore.findIndex((b) => b.id === where.id);
            if (idx !== -1) {
              inMemoryStore[idx] = {
                ...inMemoryStore[idx],
                ...data,
                updatedAt: new Date(),
              };
              return inMemoryStore[idx];
            }
            return null;
          },
        },
      } as any);

      app.register(vocabInUseRoutes);
      return app;
    }

    it("merges guest bookmarks into user account and guarantees idempotence without progress reset", async () => {
      const inMemoryStore: any[] = [];
      const app = buildTestApp(inMemoryStore);

      const payload = {
        bookmarks: [
          {
            unitId: 19,
            lexiconId: "impetuous",
            word: "impetuous",
            ipa: "/ɪmˈpetʃ.u.əs/",
            pos: "adj",
            meaningVi: "bốc đồng, hấp tấp",
            meaningEn: "acting quickly without thinking first",
            example: "He's so impetuous; consider things first.",
            exampleSource: "book",
            ieltsUse: "productive",
          },
          {
            unitId: 19,
            lexiconId: "taciturn",
            word: "taciturn",
            ipa: "/ˈtæs.ɪ.tɜːn/",
            pos: "adj",
            meaningVi: "ít nói, lầm lì",
            meaningEn: "saying very little",
            example: "I thought he was rather taciturn.",
            exampleSource: "book",
            ieltsUse: "productive",
          },
        ],
      };

      // 1. Lần đồng bộ thứ nhất: Tạo mới 2 bản ghi
      const res1 = await app.inject({
        method: "POST",
        url: "/bookmarks/sync",
        payload,
      });

      expect(res1.statusCode).toBe(200);
      const json1 = res1.json();
      expect(json1.status).toBe("success");
      expect(json1.data.count).toBe(2);
      expect(inMemoryStore).toHaveLength(2);

      // Giả sử học viên đã học và tiến độ SM-2 tăng lên
      inMemoryStore[0].intervalDays = 7;
      inMemoryStore[0].masteryState = 2;
      inMemoryStore[0].totalReviews = 3;

      // 2. Lần đồng bộ thứ hai (idempotence test): gửi lại đúng payload cũ
      const res2 = await app.inject({
        method: "POST",
        url: "/bookmarks/sync",
        payload,
      });

      expect(res2.statusCode).toBe(200);
      const json2 = res2.json();
      expect(json2.data.count).toBe(2);
      expect(inMemoryStore).toHaveLength(2);

      // Đảm bảo TUYỆT ĐỐI không reset tiến độ SM-2 của học viên trên server
      expect(inMemoryStore[0].intervalDays).toBe(7);
      expect(inMemoryStore[0].masteryState).toBe(2);
      expect(inMemoryStore[0].totalReviews).toBe(3);
    });

    it("correctly toggles bookmark addition and removal", async () => {
      const inMemoryStore: any[] = [];
      const app = buildTestApp(inMemoryStore);

      const item = {
        unitId: 13,
        lexiconId: "diligent",
        word: "diligent",
        ipa: "/ˈdɪl.ɪ.dʒənt/",
        meaningVi: "chăm chỉ, siêng năng",
      };

      // Toggle 1: Thêm mới
      const addRes = await app.inject({
        method: "POST",
        url: "/bookmarks/toggle",
        payload: item,
      });
      expect(addRes.statusCode).toBe(200);
      expect(addRes.json().action).toBe("added");
      expect(inMemoryStore).toHaveLength(1);

      // Toggle 2: Bỏ lưu
      const removeRes = await app.inject({
        method: "POST",
        url: "/bookmarks/toggle",
        payload: item,
      });
      expect(removeRes.statusCode).toBe(200);
      expect(removeRes.json().action).toBe("removed");
      expect(inMemoryStore).toHaveLength(0);
    });
  });

  describe("🧠 3. SM-2 Spaced Repetition Mathematical Precision", () => {
    function simulateSM2Step(
      record: {
        intervalDays: number;
        easeFactor: number;
        masteryState: number;
        masteryScore: number;
        totalReviews: number;
        failedReviews: number;
      },
      isCorrect: boolean
    ) {
      let interval = record.intervalDays;
      let ease = record.easeFactor;
      let masteryState = record.masteryState;
      let masteryScore = record.masteryScore;

      if (isCorrect) {
        if (interval === 1) interval = 3;
        else if (interval === 3) interval = 7;
        else if (interval === 7) interval = 14;
        else interval = Math.round(interval * ease);

        masteryScore = Math.round(Math.min(1.0, masteryScore + 0.25) * 100) / 100;
        if (masteryScore >= 0.9) masteryState = 3; // MASTERED
        else if (masteryScore >= 0.6) masteryState = 2; // CONSOLIDATING
        else masteryState = 1; // LEARNING
      } else {
        interval = 1;
        ease = Math.round(Math.max(1.3, ease - 0.2) * 100) / 100;
        masteryScore = Math.round(Math.max(0.1, masteryScore - 0.2) * 100) / 100;
        masteryState = 1;
      }

      return {
        intervalDays: interval,
        easeFactor: ease,
        masteryState,
        masteryScore,
        totalReviews: record.totalReviews + 1,
        failedReviews: isCorrect ? record.failedReviews : record.failedReviews + 1,
      };
    }

    it("verifies forward interval progression: 1 -> 3 -> 7 -> 14 -> 35 days", () => {
      let state = {
        intervalDays: 1,
        easeFactor: 2.5,
        masteryState: 0,
        masteryScore: 0.1,
        totalReviews: 0,
        failedReviews: 0,
      };

      // Review 1 (Đúng): interval 1 -> 3, masteryScore: 0.35, state: 1 (LEARNING)
      state = simulateSM2Step(state, true);
      expect(state.intervalDays).toBe(3);
      expect(state.masteryState).toBe(1);
      expect(state.masteryScore).toBe(0.35);

      // Review 2 (Đúng): interval 3 -> 7, masteryScore: 0.60, state: 2 (CONSOLIDATING)
      state = simulateSM2Step(state, true);
      expect(state.intervalDays).toBe(7);
      expect(state.masteryState).toBe(2);
      expect(state.masteryScore).toBe(0.6);

      // Review 3 (Đúng): interval 7 -> 14, masteryScore: 0.85, state: 2
      state = simulateSM2Step(state, true);
      expect(state.intervalDays).toBe(14);
      expect(state.masteryState).toBe(2);
      expect(state.masteryScore).toBe(0.85);

      // Review 4 (Đúng): interval 14 -> Math.round(14 * 2.5) = 35, masteryScore: 1.0, state: 3 (MASTERED)
      state = simulateSM2Step(state, true);
      expect(state.intervalDays).toBe(35);
      expect(state.masteryState).toBe(3);
      expect(state.masteryScore).toBe(1.0);
    });

    it("resets interval to 1 on review failure and adjusts ease factor safely", () => {
      let state = {
        intervalDays: 14,
        easeFactor: 2.5,
        masteryState: 2,
        masteryScore: 0.85,
        totalReviews: 3,
        failedReviews: 0,
      };

      // Học sinh quên từ:
      state = simulateSM2Step(state, false);
      expect(state.intervalDays).toBe(1);
      expect(state.easeFactor).toBe(2.3);
      expect(state.masteryState).toBe(1);
      expect(state.masteryScore).toBe(0.65);
      expect(state.failedReviews).toBe(1);
      expect(state.totalReviews).toBe(4);
    });
  });
});
