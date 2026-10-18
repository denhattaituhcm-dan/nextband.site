/**
 * Core Type Definitions for C1/C2 Mastery Lab
 * Focus: Causative & Experiential Have/Get and Key-Word Transformation.
 */

export type MasteryVerdictType =
  | 'EXACT_MATCH'          // Whitelisted accepted answer matched
  | 'NEAR_MISS'            // Known grammar or register pitfall matched with dedicated feedback
  | 'CONSTRAINT_VIOLATION' // Violated exercise bounds (word count out of range, keyword missing or mutated)
  | 'TYPO_SLIP'            // 1 edit distance typo on a non-keyword token
  | 'UNRECOGNIZED';        // Answer not recognized by whitelist or known near-miss rules

export type NearMissCode =
  | 'MISSING_TO'
  | 'EXTRA_TO'
  | 'WRONG_PARTICIPLE'
  | 'KEYWORD_MUTATED'
  | 'WORD_ORDER'
  | 'AGENT_OBJECT_CONFUSION'
  | 'REPEATED_SOURCE_VERB'
  | 'INCORRECT_TENSE';

export interface NearMissRule {
  pattern: RegExp;
  feedbackVi: string;
  diagnosticCode: NearMissCode;
}

export interface TransformationItem {
  id: string;
  title: string;
  sourceSentence: string;
  targetPrefix: string;
  targetSuffix: string;
  keyword: string;
  minWords: number;
  maxWords: number;
  acceptedAnswers: string[];
  nearMissRules: NearMissRule[];
  explanationVi: string;
  pedagogicalNote?: string;
  structuralBlueprint: string; // e.g. "HAD + [Tân ngữ chịu tổn hại] + severely damaged"
  hintText: string;             // Scaffolded hint when user is stuck
}

export interface ContrastivePair {
  id: string;
  axisTitle: string;
  formulaA: string;
  formulaB: string;
  sentenceA: {
    rawText: string;
    prefix: string;
    verbTrigger: string;
    agentOrObject: string;
    verbAction: string;
    suffix: string;
    roleTag: string;
    nuanceVi: string;
  };
  sentenceB: {
    rawText: string;
    prefix: string;
    verbTrigger: string;
    agentOrObject: string;
    verbAction: string;
    suffix: string;
    roleTag: string;
    nuanceVi: string;
  };
  checkQuestion: {
    promptVi: string;
    options: {
      id: string;
      labelVi: string;
      isCorrect: boolean;
      rationaleVi: string;
    }[];
  };
  takeawayFormulaVi: string;
}

export interface DiagnosticItem {
  id: string;
  sentencePrompt: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanationVi: string;
  whyProbe?: {
    questionVi: string;
    options: {
      id: string;
      labelVi: string;
      isCorrect: boolean;
      feedbackVi: string;
    }[];
  };
}

export interface MasteryTopicUnit {
  id: string;
  code: string;
  title: string;
  subtitleVi: string;
  level: 'C1' | 'C2';
  curriculumCategory: 'Causative Structures' | 'Inversion' | 'Cleft Sentences' | 'Advanced Comparatives';
  contrastivePairs: ContrastivePair[];
  diagnosticItems: DiagnosticItem[];
  transformationItems: TransformationItem[];
}

export interface EvaluationResult {
  verdict: MasteryVerdictType;
  feedbackVi: string;
  normalizedInput: string;
  wordCount: number;
  diagnosticCode?: NearMissCode;
  matchedAcceptedAnswer?: string;
}
