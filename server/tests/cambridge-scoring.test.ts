import { describe, it, expect } from "vitest";
import * as S from "../services/cambridge-scoring.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "../data/cambridge");
const items = JSON.parse(fs.readFileSync(path.join(dataDir, "items.json"), "utf8")).items;
const answers = JSON.parse(fs.readFileSync(path.join(dataDir, "answers.json"), "utf8"));
const rules = JSON.parse(fs.readFileSync(path.join(dataDir, "rules.json"), "utf8"));

describe("Cambridge Scoring Reference Tests (All 14 Acceptance Tests)", () => {
  it("data: 73 items, answers for every item", () => {
    expect(items.length).toBe(73);
    items.forEach((i: any) => expect(answers[i.id]).toBeDefined());
  });

  it("data: gate sizes 22 / 11", () => {
    expect(rules.gate.coreK).toBe(22);
    expect(rules.gate.coreKplus).toBe(11);
  });

  it("bandResult thresholds", () => {
    expect(S.bandResult(7, 10)).toBe("pass");
    expect(S.bandResult(6, 10)).toBe("partial");
    expect(S.bandResult(5, 10)).toBe("fail");

    expect(S.bandResult(2, 3)).toBe("pass");
    expect(S.bandResult(1, 3)).toBe("partial");
    expect(S.bandResult(0, 3)).toBe("fail");

    expect(S.bandResult(2, 2)).toBe("pass");
    expect(S.bandResult(1, 2)).toBe("partial");
  });

  it("gap-fill normalisation", () => {
    const a = answers["LS-12"];
    const it = items.find((i: any) => i.id === "LS-12");
    ["10.45", "10:45", " Quarter to eleven ", "A quarter to eleven."].forEach((r) => {
      expect(S.markItem(it, a, r)).toBe(1);
    });
    expect(S.markItem(it, a, "11.30")).toBe(0);
    expect(S.markItem(items.find((i: any) => i.id === "LS-13"), answers["LS-13"], "sohatu")).toBe(1);
    expect(S.markItem(items.find((i: any) => i.id === "LS-13"), answers["LS-13"], "Sohato")).toBe(0);
  });

  it("receptive codes", () => {
    const R = (F: any, K?: any, Kp?: any, Pm?: any, P?: any) => ({ F, K, "K+": Kp, "P-": Pm, P });
    expect(S.receptiveCode(R("fail"), false)).toBe(0);
    expect(S.receptiveCode(R("pass", "fail"), false)).toBe(1);
    expect(S.receptiveCode(R("pass", "partial"), false)).toBe(1.5);
    expect(S.receptiveCode(R("pass", "pass", "fail"), false)).toBe(2);
    expect(S.receptiveCode(R("pass", "pass", "pass"), false)).toBe(3);
    expect(S.receptiveCode(R("pass", "pass", "pass", "partial"), true)).toBe(3.5);
    expect(S.receptiveCode(R("pass", "pass", "pass", "pass", "fail"), true)).toBe(4);
    expect(S.receptiveCode(R("pass", "pass", "pass", "pass", "pass"), true)).toBe(5);

    expect(S.hasInversion(R("pass", "pass", "fail", "pass", "fail"), true)).toBe(true);
    expect(S.hasInversion(R("pass", "pass", "pass", "fail", "fail"), true)).toBe(false);
  });

  it("writing codes", () => {
    const w1 = { content: 3, language: 2 };
    expect(S.writingCode({ content: 1, language: 1 }, { content: 3, organisation: 3, language: 3 }, null)).toBe(0);
    expect(S.writingCode(w1, { content: 1, organisation: 1, language: 1 }, null)).toBe(1);
    expect(S.writingCode(w1, { content: 2, organisation: 2, language: 1 }, null)).toBe(1.5);
    expect(S.writingCode(w1, { content: 2, organisation: 2, language: 2 }, null)).toBe(2);
    expect(S.writingCode(w1, { content: 3, organisation: 2, language: 3 }, null)).toBe(3);
    expect(
      S.writingCode(w1, { content: 3, organisation: 2, language: 3 }, { content: 2, register: 1, organisation: 1, language: 2 })
    ).toBe(3.5);
    expect(
      S.writingCode(w1, { content: 3, organisation: 2, language: 3 }, { content: 3, register: 2, organisation: 1, language: 2 })
    ).toBe(4);
    expect(
      S.writingCode(w1, { content: 3, organisation: 3, language: 3 }, { content: 3, register: 3, organisation: 2, language: 2 })
    ).toBe(5);
  });

  it("speaking codes", () => {
    const P = "pass", Q = "partial", F = "fail", N = "not_asked";
    expect(S.speakingCode({ s1: F, s2: N, s3: N, s4: N, s5: N })).toBe(0);
    expect(S.speakingCode({ s1: P, s2: F, s3: N, s4: N, s5: N })).toBe(1);
    expect(S.speakingCode({ s1: P, s2: Q, s3: N, s4: N, s5: N })).toBe(1.5);
    expect(S.speakingCode({ s1: P, s2: P, s3: F, s4: N, s5: N })).toBe(2);
    expect(S.speakingCode({ s1: P, s2: P, s3: P, s4: F, s5: N })).toBe(3);
    expect(S.speakingCode({ s1: P, s2: P, s3: P, s4: Q, s5: N })).toBe(3.5);
    expect(S.speakingCode({ s1: P, s2: P, s3: P, s4: P, s5: N })).toBe(4);
    expect(S.speakingCode({ s1: P, s2: P, s3: P, s4: P, s5: P })).toBe(5);
  });

  it("Example A: Flyers/KET borderline -> Flyers (no extension)", () => {
    expect(S.gate(6 + 4 + 3, 3 + 1 + 1)).toBe(false);
    const bands = (F: any, K: any, Kp: any) =>
      S.bandResults({
        F: { correct: F[0], n: F[1] },
        K: { correct: K[0], n: K[1] },
        "K+": { correct: Kp[0], n: Kp[1] },
      });
    const uoe = S.receptiveCode(bands([7, 8], [6, 10], [1, 4]), false);
    const rd = S.receptiveCode(bands([3, 3], [4, 6], [1, 3]), false);
    const ls = S.receptiveCode(bands([5, 5], [3, 6], [1, 4]), false);
    const wr = S.writingCode({ content: 3, language: 2 }, { content: 2, organisation: 2, language: 1 }, null);
    const sp = S.speakingCode({ s1: "pass", s2: "partial", s3: "not_asked", s4: "not_asked", s5: "not_asked" });

    expect([uoe, rd, ls, wr, sp]).toEqual([1.5, 2, 1.5, 1.5, 1.5]);
    const p = S.placement({ use_of_english: uoe, reading: rd, listening: ls, writing: wr, speaking: sp });
    expect(p.median).toBe(1.5);
    expect(p.level).toBe("Flyers");
    expect(p.borderline).toBe("A");
    expect(p.reviewRequired).toBe(true);
  });

  it("Example B: KET/PET borderline -> PET", () => {
    expect(S.gate(9 + 5 + 5, 4 + 3 + 3)).toBe(true);
    const mk = (c: any) =>
      S.bandResults(Object.fromEntries(Object.entries(c).map(([b, [x, n]]: any) => [b, { correct: x, n }])));
    const uoe = S.receptiveCode(mk({ F: [8, 8], K: [9, 10], "K+": [4, 4], "P-": [3, 6], P: [2, 6] }), true);
    const rd = S.receptiveCode(mk({ F: [3, 3], K: [5, 6], "K+": [3, 3], "P-": [1, 3], P: [0, 3] }), true);
    const ls = S.receptiveCode(mk({ F: [5, 5], K: [5, 6], "K+": [3, 4], "P-": [2, 3], P: [1, 3] }), true);
    const wr = S.writingCode(
      { content: 3, language: 3 },
      { content: 3, organisation: 2, language: 3 },
      { content: 2, register: 2, organisation: 1, language: 1 }
    );
    const sp = S.speakingCode({ s1: "pass", s2: "pass", s3: "pass", s4: "partial", s5: "not_asked" });

    expect([uoe, rd, ls, wr, sp]).toEqual([3.5, 3.5, 4, 3.5, 3.5]);
    const p = S.placement({ use_of_english: uoe, reading: rd, listening: ls, writing: wr, speaking: sp });
    expect(p.median).toBe(3.5);
    expect(p.level).toBe("PET");
    expect(p.borderline).toBe("B");
    expect(p.needsSupport.sort()).toEqual(["reading", "speaking", "use_of_english", "writing"].sort());
  });

  it("Example C: lopsided skills -> KET kept, V2 + spread flag", () => {
    const p = S.placement({ use_of_english: 3, reading: 4, listening: 3, writing: 1.5, speaking: 1.5 });
    expect(p.median).toBe(3);
    expect(p.level).toBe("KET");
    expect(p.vetoes.includes("V2_productive")).toBe(true);
    expect(p.flags.includes("F2_spread")).toBe(true);
    expect(p.reviewRequired).toBe(true);
  });

  it("Example D: foundation veto PET -> KET", () => {
    const p = S.placement({ use_of_english: 1.5, reading: 4, listening: 4, writing: 3, speaking: 4 });
    expect(p.median).toBe(4);
    expect(p.vetoes.includes("V1_foundation")).toBe(true);
    expect(p.level).toBe("KET");
  });

  it("ceiling: all 5 -> PET + F4", () => {
    const p = S.placement({ use_of_english: 5, reading: 5, listening: 5, writing: 5, speaking: 5 });
    expect(p.level).toBe("PET");
    expect(p.flags.includes("F4_ceiling")).toBe(true);
    expect(p.vetoes.includes("V3_ceiling")).toBe(true);
  });

  it("floor: all 0 -> Flyers + F3", () => {
    const p = S.placement({ use_of_english: 0, reading: 0, listening: 0, writing: 0, speaking: 0 });
    expect(p.level).toBe("Flyers");
    expect(p.flags.includes("F3_below_floor")).toBe(true);
  });

  it("perfect receptive student marks 1 on every item", () => {
    items.forEach((i: any) => {
      const a = answers[i.id];
      const r = a.correct ?? a.accepted[0];
      expect(S.markItem(i, a, r)).toBe(1);
    });
  });
});
