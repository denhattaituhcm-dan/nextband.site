/**
 * Cambridge Placement Test - Scoring & Placement Domain Logic
 * Ported 1:1 from ARIS Reference Implementation (`src/scoring.js`).
 * Pure functions, zero I/O, strict compliance with SPEC.md.
 */

export const BANDS = ['F', 'K', 'K+', 'P-', 'P'] as const;
export type BandType = typeof BANDS[number];

export const SKILLS = ['use_of_english', 'reading', 'listening', 'writing', 'speaking'] as const;
export type SkillType = typeof SKILLS[number];

export type BandEvaluation = 'pass' | 'partial' | 'fail';
export type SpeakingPartResult = 'pass' | 'partial' | 'fail' | 'not_asked';
export type PlacementLevel = 'Flyers' | 'KET' | 'PET';

export interface BandCounts {
  correct: number;
  n: number;
}

export type SkillBandCounts = Record<BandType, BandCounts>;

export interface WritingScores {
  w1: { content: number; language: number };
  w2: { content: number; organisation: number; language: number };
  w3: { content: number; register: number; organisation: number; language: number } | null;
}

export interface SpeakingPartScores {
  s1: SpeakingPartResult;
  s2: SpeakingPartResult;
  s3: SpeakingPartResult;
  s4: SpeakingPartResult;
  s5: SpeakingPartResult;
}

export interface SpeakingCriteriaScores {
  grammar_vocabulary?: number;
  pronunciation?: number;
  interaction?: number;
  fluency_discourse?: number;
}

export interface PlacementExtra {
  inversion?: boolean;
  behaviourFlag?: boolean;
}

export interface PlacementResult {
  median: number;
  level: PlacementLevel;
  borderline: 'A' | 'B' | null;
  flags: string[];
  vetoes: string[];
  criticalWeakness: string[];
  needsSupport: string[];
  skillsToStrengthenBeforeNextLevel: string[];
  reviewRequired: boolean;
}

// ---------- auto-marking ----------
export function normalise(s: any): string {
  return String(s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9.: ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[.:]+|[.:]+$/g, '')
    .trim();
}

/** item: from items.json, ans: from answers.json, response: student's answer */
export function markItem(item: any, ans: any, response: any): number {
  if (response == null || response === '') return 0;
  if (ans.correct) return String(response).toUpperCase() === ans.correct ? 1 : 0;
  if (ans.accepted && Array.isArray(ans.accepted)) {
    return ans.accepted.map(normalise).includes(normalise(response)) ? 1 : 0;
  }
  return 0;
}

// ---------- band results ----------
/** correct = number correct in the band, n = number of items in the band. Returns 'pass' | 'partial' | 'fail' */
export function bandResult(correct: number, n: number): BandEvaluation | null {
  if (n === 0) return null;
  const pass = Math.ceil((2 * n) / 3);
  if (correct >= pass) return 'pass';
  if (pass - 1 >= 1 && correct === pass - 1) return 'partial';
  return 'fail';
}

/** counts = { F:{correct,n}, K:{...}, 'K+':{...}, 'P-':{...}, P:{...} } -> {F:'pass',...} */
export function bandResults(counts: Record<string, BandCounts | undefined>): Record<BandType, BandEvaluation | null> {
  const r: Record<string, BandEvaluation | null> = {};
  for (const b of BANDS) {
    const c = counts[b];
    r[b] = c ? bandResult(c.correct, c.n) : null;
  }
  return r as Record<BandType, BandEvaluation | null>;
}

// ---------- gate ----------
export function gate(
  coreK: number,
  coreKplus: number,
  rules: { minK: number; minKplus: number } = { minK: 15, minKplus: 6 }
): boolean {
  return coreK >= rules.minK && coreKplus >= rules.minKplus;
}

// ---------- skill codes ----------
/** Use of English / Reading / Listening. res = bandResults(...). extensionDone = boolean */
export function receptiveCode(
  res: Record<BandType, BandEvaluation | null>,
  extensionDone: boolean
): number {
  if (res.F !== 'pass') return 0;
  if (res.K !== 'pass') return res.K === 'partial' ? 1.5 : 1;
  if (res['K+'] !== 'pass') return 2;
  if (!extensionDone) return 3;
  if (res['P-'] !== 'pass') return res['P-'] === 'partial' ? 3.5 : 3;
  if (res.P !== 'pass') return 4;
  return 5;
}

/** inversion flag: a higher band passed while a lower band did not */
export function hasInversion(
  res: Record<BandType, BandEvaluation | null>,
  extensionDone: boolean
): boolean {
  const order: readonly BandType[] = extensionDone ? BANDS : ['F', 'K', 'K+'];
  for (let i = 0; i < order.length; i++) {
    for (let j = i + 1; j < order.length; j++) {
      if (res[order[i]] && res[order[i]] !== 'pass' && res[order[j]] === 'pass') {
        return true;
      }
    }
  }
  return false;
}

/** w1 = {content, language}; w2 = {content, organisation, language}; w3 = {content, register, organisation, language} | null */
export function writingCode(
  w1: { content: number; language: number },
  w2: { content: number; organisation: number; language: number },
  w3: { content: number; register: number; organisation: number; language: number } | null
): number {
  const s = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);
  const t1 = s(w1);
  const t2 = s(w2);
  if (!(t1 >= 4 && w1.content >= 2)) return 0;
  if (t2 <= 3) return 1;
  if (t2 < 6 || w2.content < 2) return 1.5;
  if (t2 < 8) return 2;
  if (!w3) return 3;
  const t3 = s(w3);
  if (t3 >= 9 && w3.content >= 2 && w3.language >= 2) return 5;
  if (t3 >= 7 && w3.content >= 2 && w3.language >= 2) return 4;
  if (t3 >= 5) return 3.5;
  return 3;
}

/** each of s1..s5: 'pass' | 'partial' | 'fail' | 'not_asked' */
export function speakingCode({
  s1,
  s2,
  s3,
  s4,
  s5,
}: {
  s1: SpeakingPartResult;
  s2: SpeakingPartResult;
  s3: SpeakingPartResult;
  s4: SpeakingPartResult;
  s5: SpeakingPartResult;
}): number {
  if (s1 !== 'pass') return 0;
  if (s2 !== 'pass') return s2 === 'partial' ? 1.5 : 1;
  if (s3 !== 'pass') return 2;
  if (s4 !== 'pass') return s4 === 'partial' ? 3.5 : 3;
  return s5 === 'pass' ? 5 : 4;
}

// ---------- placement ----------
const BASELINE: Record<PlacementLevel, number> = { Flyers: 1, KET: 2, PET: 4 };
const DOWN: Record<PlacementLevel, PlacementLevel> = { PET: 'KET', KET: 'Flyers', Flyers: 'Flyers' };

export function median5(codes: Record<SkillType, number>): number {
  const a = SKILLS.map((k) => codes[k]).sort((x, y) => x - y);
  return a[2];
}

/** codes = {use_of_english, reading, listening, writing, speaking}; extra = {inversion:boolean, behaviourFlag:boolean} */
export function placement(
  codes: Record<SkillType, number>,
  extra: PlacementExtra = {}
): PlacementResult {
  const c = codes;
  const vals = SKILLS.map((k) => c[k]);
  const median = median5(c);
  const flags: string[] = [];

  if (extra.inversion) flags.push('F1_inversion');
  if (Math.max(...vals) - Math.min(...vals) >= 2) flags.push('F2_spread');
  if (vals.some((v) => v === 0)) flags.push('F3_below_floor');
  if (vals.every((v) => v === 5)) flags.push('F4_ceiling');
  if (extra.behaviourFlag) flags.push('F6_behaviour');

  let level: PlacementLevel;
  let borderline: 'A' | 'B' | null = null;

  if (median <= 1) {
    level = 'Flyers';
  } else if (median === 1.5) {
    borderline = 'A';
    level =
      (c.use_of_english >= 2 || c.reading >= 2) && (c.writing >= 2 || c.speaking >= 2)
        ? 'KET'
        : 'Flyers';
  } else if (median <= 3) {
    level = 'KET';
  } else if (median === 3.5) {
    borderline = 'B';
    level =
      c.use_of_english >= 3.5 &&
      c.reading >= 3.5 &&
      (c.writing >= 3 || c.speaking >= 3.5) &&
      Math.min(...vals) > 2
        ? 'PET'
        : 'KET';
  } else {
    level = 'PET';
  }

  if (borderline) flags.push('F5_borderline');

  const vetoes: string[] = [];
  if (Math.min(c.use_of_english, c.reading) <= median - 1.5) {
    vetoes.push('V1_foundation');
    level = DOWN[level];
  }
  if (c.writing <= median - 1.5 && c.speaking <= median - 1.5) {
    vetoes.push('V2_productive');
    if (level === 'PET') level = 'KET';
  }
  if (flags.includes('F4_ceiling')) {
    vetoes.push('V3_ceiling');
  }

  const base = BASELINE[level];
  const needsSupport: string[] = [];
  const critical: string[] = [];
  for (const k of SKILLS) {
    const diff = base - c[k];
    if (diff >= 1) critical.push(k);
    else if (diff >= 0.5) needsSupport.push(k);
  }

  let beforeNext: string[] = [];
  if (level === 'Flyers') beforeNext = SKILLS.filter((k) => c[k] < 2);
  else if (level === 'KET') beforeNext = SKILLS.filter((k) => c[k] < 3.5);

  return {
    median,
    level,
    borderline,
    flags,
    vetoes,
    criticalWeakness: critical,
    needsSupport,
    skillsToStrengthenBeforeNextLevel: beforeNext,
    reviewRequired: flags.length > 0 || vetoes.length > 0 || borderline !== null,
  };
}
