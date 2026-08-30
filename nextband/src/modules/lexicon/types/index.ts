export interface ContextualLearningPayload {
  normalizedTerm: string;
  ipa: string;
  partOfSpeech: string;
  coreMeaningEn: string;
  inContextExplanationVi: string;
  mentalModel?: string;
  ieltsPatterns: string[];
  isSaved?: boolean;
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
