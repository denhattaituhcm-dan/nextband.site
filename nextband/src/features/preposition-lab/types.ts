/**
 * Preposition Lab: Data Contracts & Types
 * Derived from Seth Lindstromberg (2010), Chapter 1 & Chapter 4.
 */

export type PrepositionId =
  | 'in'
  | 'on'
  | 'under'
  | 'above'
  | 'over'
  | 'behind'
  | 'out_of'
  | 'at';

export type AssessmentFit = 'canonical' | 'nuanced' | 'misconception';

export interface PrepositionOption {
  id: PrepositionId;
  label: string;
  fit: AssessmentFit;
  explanation: {
    en: string;
    vi: string;
  };
  simulationEffect?: string;
}

export interface PuzzleScenario {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  sourceReference: {
    chapter: number;
    printedPages: string;
    topic: string;
  };
  sentencePrompt: {
    lead: string;
    targetLandmark: string;
    exampleFullSentence: string;
  };
  subjectName: string;
  landmarkName: string;
  options: PrepositionOption[];
  initialSnapZone?: 'table' | 'rim' | 'cavity';
  hint: {
    en: string;
    vi: string;
  };
  pedagogicalTakeaway: {
    en: string;
    vi: string;
    principleName: string;
  };
}

export type SceneActionState =
  | 'idle'
  | 'manipulated'
  | 'revealed';

export interface UserSessionState {
  currentPuzzleIndex: number;
  selectedPreposition: PrepositionId | null;
  actionState: SceneActionState;
  hasTestedPrediction: boolean;
  showViInsight: boolean;
  showHint: boolean;
  completedPuzzleIds: string[];
}
