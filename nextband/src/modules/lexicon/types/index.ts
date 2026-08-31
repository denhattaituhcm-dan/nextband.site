export interface PriorEncounterInfo {
  encounterCount: number;
  firstMetLocation?: string; // e.g. "Homework 12"
  firstMetDate?: string;     // e.g. "3 tuần trước"
}

export interface ContextualLearningPayload {
  normalizedTerm: string;
  ipa: string;
  partOfSpeech: string;
  coreMeaningEn: string;
  inContextExplanationVi: string;
  mentalModel?: string;
  ieltsPatterns: string[];
  isSaved?: boolean;
  priorEncounter?: PriorEncounterInfo;
}

export interface UnderstandRequestPayload {
  selection: string;
  contextSnippet: string;
  sourceContentRef: string;
}

export interface SaveMemoryRequestPayload {
  normalizedTerm: string;
  sourceContentRef: string;
  contextText: string;
  lexiconCacheId?: string;
}
