import { ImageSchemaTag } from "@/data/vocab-c2/types";

export interface CultivationRank {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  minXp: number;
  nextRankXp: number | null;
  auraColor: string;
  badgeText: string;
  badgeIcon: string;
  auraClass: string;
}

export const CULTIVATION_RANKS: CultivationRank[] = [
  {
    id: "LEXICAL_NOVICE",
    level: 1,
    title: "Rank I: Lexical Novice",
    subtitle: "Lexical Awakening",
    minXp: 0,
    nextRankXp: 500,
    auraColor: "#94A3B8",
    badgeText: "RANK I",
    badgeIcon: "🌱",
    auraClass: "shadow-slate-500/20",
  },
  {
    id: "SEMANTIC_ADEPT",
    level: 2,
    title: "Rank II: Semantic Adept",
    subtitle: "Cognitive Fluency",
    minXp: 500,
    nextRankXp: 1500,
    auraColor: "#10B981",
    badgeText: "RANK II",
    badgeIcon: "⚡",
    auraClass: "shadow-emerald-500/30",
  },
  {
    id: "SYNTACTIC_VANGUARD",
    level: 3,
    title: "Rank III: Syntactic Vanguard",
    subtitle: "Structural Dominance",
    minXp: 1500,
    nextRankXp: 3500,
    auraColor: "#00F5D4",
    badgeText: "RANK III",
    badgeIcon: "💠",
    auraClass: "shadow-cyan-400/40",
  },
  {
    id: "COLLOCATION_SOVEREIGN",
    level: 4,
    title: "Rank IV: Collocation Sovereign",
    subtitle: "Native Precision",
    minXp: 3500,
    nextRankXp: 7000,
    auraColor: "#F59E0B",
    badgeText: "RANK IV",
    badgeIcon: "👑",
    auraClass: "shadow-amber-500/40",
  },
  {
    id: "RHETORIC_GRANDMASTER",
    level: 5,
    title: "Rank V: Rhetoric Grandmaster",
    subtitle: "Stylistic Resonance",
    minXp: 7000,
    nextRankXp: 12000,
    auraColor: "#EF4444",
    badgeText: "RANK V",
    badgeIcon: "🔥",
    auraClass: "shadow-rose-500/50",
  },
  {
    id: "COGNITIVE_APEX",
    level: 6,
    title: "Rank VI: C2 Cognitive Apex",
    subtitle: "Transcendental Mastery",
    minXp: 12000,
    nextRankXp: null,
    auraColor: "#A855F7",
    badgeText: "APEX",
    badgeIcon: "🌌",
    auraClass: "shadow-purple-500/60",
  },
];

export interface LatencyEvaluation {
  tier: "NATIVE_REFLEX" | "FLUENT_RETRIEVAL" | "DELIBERATE_RECALL" | "HASTY_GUESS";
  label: string;
  xpMultiplier: number;
  color: string;
  badge: string;
  isDeliberateScholar?: boolean;
}

export function evaluateLatency(
  latencyMs: number,
  mode?: string
): LatencyEvaluation {
  // For deep nuance modes (Persona, Tri-Lock, Chronicles, Gradients): reward deep cognitive deliberation
  const isNuanceMode = mode === "persona" || mode === "trilock" || mode === "chronicles" || mode === "gradient";

  if (isNuanceMode) {
    if (latencyMs < 900) {
      return {
        tier: "HASTY_GUESS",
        label: "⚠️ Hasty Guess (Quá vội vàng)",
        xpMultiplier: 0.8,
        color: "#F43F5E",
        badge: "RUSHED",
      };
    }
    if (latencyMs >= 2000 && latencyMs <= 7000) {
      return {
        tier: "DELIBERATE_RECALL",
        label: "🧠 Scholar's Deliberation (Thẩm định Học thuật Sâu sắc)",
        xpMultiplier: 1.6,
        color: "#38BDF8",
        badge: "SCHOLAR REFLECTION",
        isDeliberateScholar: true,
      };
    }
  }

  // Standard rapid retrieval for collocations
  if (latencyMs < 1200) {
    return {
      tier: "NATIVE_REFLEX",
      label: "⚡ Native C2 Reflex!",
      xpMultiplier: 1.5,
      color: "#00F5D4",
      badge: "0.8s C2 REFLEX",
    };
  }
  if (latencyMs <= 2800) {
    return {
      tier: "FLUENT_RETRIEVAL",
      label: "🎯 Fluent C2 Retrieval",
      xpMultiplier: 1.2,
      color: "#F59E0B",
      badge: "FLUENT",
    };
  }
  return {
    tier: "DELIBERATE_RECALL",
    label: "🧠 Deliberate Processing",
    xpMultiplier: 1.0,
    color: "#94A3B8",
    badge: "DELIBERATE",
  };
}

export interface WordMasteryRecord {
  itemId: string;
  word: string;
  unitNumber: number;
  attempts: number;
  correctCount: number;
  mistakeCount: number;
  bestLatencyMs: number | null;
  lastLatencyMs: number | null;
  lastMode: string;
  heatLevel: number; // 0 = mastered, 1 = warm, 2 = hot mistake, 3+ = critical cognitive blindspot
  nextReviewTimestamp: number;
  meaningVi?: string;
  imageSchemaTag?: ImageSchemaTag;
}

export interface UserArenaState {
  totalXp: number;
  currentCombo: number;
  maxCombo: number;
  masteredWords: string[];
  records: Record<string, WordMasteryRecord>;
  unitProgress: Record<number, { completedModes: string[]; score: number }>;
}

const LOCAL_STORAGE_KEY = "lexicon_overdrive_c2_state_v2";

export function getRankForXp(xp: number): CultivationRank {
  for (let i = CULTIVATION_RANKS.length - 1; i >= 0; i--) {
    if (xp >= CULTIVATION_RANKS[i].minXp) {
      return CULTIVATION_RANKS[i];
    }
  }
  return CULTIVATION_RANKS[0];
}

export function getInitialArenaState(): UserArenaState {
  if (typeof window === "undefined") {
    return {
      totalXp: 0,
      currentCombo: 0,
      maxCombo: 0,
      masteredWords: [],
      records: {},
      unitProgress: {},
    };
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("[SpacedRetrieval] Failed to load local state:", err);
  }

  return {
    totalXp: 0,
    currentCombo: 0,
    maxCombo: 0,
    masteredWords: [],
    records: {},
    unitProgress: {},
  };
}

export function saveArenaState(state: UserArenaState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("[SpacedRetrieval] Failed to save local state:", err);
  }
}
