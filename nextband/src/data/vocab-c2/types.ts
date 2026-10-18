export type ImageSchemaTag =
  | "FORCE_COLLISION"
  | "CONTAINER_BOUNDARY"
  | "VERTICAL_HIERARCHY"
  | "BALANCE_SHIFT"
  | "PATH_TRAJECTORY";

export interface SchemaVisionItem {
  id: string;
  word: string;
  ipa: string;
  pos: "n." | "v." | "adj." | "adv." | "phr.";
  definitionEn: string;
  definitionVi: string;
  exampleSentence: string;
  imageSchemaTag: ImageSchemaTag;
  visualMetaphor: string;
  contrastWord: string;
  contrastDefinitionEn: string;
  contrastVisualMetaphor: string;
  simulationConfig: {
    primaryColor: string;
    secondaryColor: string;
    velocityFactor: number;
    particleCount: number;
    vectorPattern: "converge" | "diverge" | "ascend" | "descend" | "breach" | "oscillate" | "collide";
  };
}

export interface CollocationPairItem {
  id: string;
  columnA: string;
  columnB: string;
  fullCollocation: string;
  meaningEn: string;
  meaningVi: string;
  example: string;
  imageSchemaTag: ImageSchemaTag;
}

export interface DomainSortItem {
  id: string;
  term: string;
  domain: string;
  meaningVi: string;
  clueEn: string;
}

export interface MorphologicalFamily {
  id: string;
  rootWord: string;
  meaningVi: string;
  imageSchemaTag: ImageSchemaTag;
  forms: {
    noun?: string[];
    verb?: string[];
    adjective?: string[];
    adverb?: string[];
  };
  transformationPrompt: string;
  targetAnswer: string;
  targetPos: string;
  explanationVi: string;
}

export interface TriLockPuzzle {
  id: string;
  targetWord: string;
  rootHint: string;
  ipa: string;
  meaningVi: string;
  imageSchemaTag: ImageSchemaTag;
  sentences: [string, string, string]; // Use ___ for the blank in all 3 sentences
  nuanceNotes: [string, string, string];
}

export interface PersonaCard {
  id: string;
  word: string;
  ipa: string;
  archetypeTitle: string;
  meaningEn: string;
  meaningVi: string;
  imageSchemaTag: ImageSchemaTag;
  powerStat: number; // 70 - 99
  precisionStat: number;
  semanticOpposite: string;
  oppositeMeaningEn: string;
  distractors: [string, string, string];
  battleScenario: string;
  counterExplanationVi: string;
}

export interface BinaryPrecisionItem {
  id: string;
  wordA: string;
  wordB: string;
  contextSentence: string; // ___ for blank
  correctWord: string;
  distinctionVi: string;
}

export interface NarrativeChoice {
  word: string;
  isCorrect: boolean;
  consequenceTitle: string;
  whatIfFeedbackEn: string;
  nuanceExplanationVi: string;
}

export interface NarrativeSegment {
  id: string;
  chapterLabel: string;
  speakerOrMood: string;
  promptTextBefore: string;
  promptTextAfter: string;
  correctWord: string;
  imageSchemaTag: ImageSchemaTag;
  choices: [NarrativeChoice, NarrativeChoice, NarrativeChoice, NarrativeChoice];
}

export interface NarrativeChronicle {
  title: string;
  subtitleVi: string;
  settingDescription: string;
  segments: NarrativeSegment[];
}

export interface SemanticGradientAxis {
  axisName: string;
  poleA: string; // e.g. "Warm & Intimate (0)"
  poleB: string; // e.g. "Aloof & Detached (100)"
  targetValue: number; // 0 to 100
  tolerance: number; // e.g. 15
  hintVi: string;
}

export interface SemanticGradientItem {
  id: string;
  word: string;
  ipa: string;
  pos: string;
  definitionEn: string;
  definitionVi: string;
  axes: [SemanticGradientAxis, SemanticGradientAxis, SemanticGradientAxis];
  cognitiveAnalysisVi: string;
}

export interface FrameElement {
  role: "Agent" | "Target" | "Trigger" | "Institution" | "Consequence";
  term: string;
  meaningVi: string;
  sentenceUsage: string;
}

export interface FrameSemanticWeb {
  id: string;
  frameName: string;
  frameConceptVi: string;
  anchorCollocation: string;
  elements: FrameElement[];
  academicSynthesisParagraph: string;
}

export interface C2UnitData {
  unitNumber: number;
  unitCode: string;
  titleEn: string;
  titleVi: string;
  themeSummaryVi: string;
  pdfPages: string;
  isFullVerticalSlice: boolean;
  availableDomains: string[];
  schemaItems: SchemaVisionItem[];
  collocationPairs: CollocationPairItem[];
  domainSortItems: DomainSortItem[];
  triLockPuzzles: TriLockPuzzle[];
  morphologicalFamilies: MorphologicalFamily[];
  personaCards: PersonaCard[];
  binaryPrecisionPairs: BinaryPrecisionItem[];
  narrativeChronicle: NarrativeChronicle;
  semanticGradients?: SemanticGradientItem[];
  frameWebs?: FrameSemanticWeb[];
}
