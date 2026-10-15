export type StepType =
  | 'pre_reading'
  | 'vocab_preview'
  | 'reading_passage'
  | 'comprehension'
  | 'idioms'
  | 'summary'
  | 'listening_dictation'
  | 'grammar_inline'
  | 'guided_writing'
  | 'review_quiz';

export interface PreReadingQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  hint?: string;
}

export interface PredictivePollClaim {
  id: string;
  claim: string;
  isTrueInPassage: boolean; // True or False fact about the text
  explanation: string;
}

export interface PreReadingConfig {
  introPrompt: string;
  questions: PreReadingQuestion[];
  predictivePoll?: PredictivePollClaim[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface VocabPreviewMatchingItem {
  id: string;
  sentenceWithUnderline: string; // e.g. "It is freezing cold outside in winter."
  underlinedWord: string; // "freezing"
  correctDefinitionLetter: string; // "c"
  vietnameseMeaning?: string;
}

export interface VocabDefinitionOption {
  letter: string; // 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
  text: string;   // 'great', 'different', etc.
}

export interface VocabPreviewConfig {
  instruction: string;
  items: VocabPreviewMatchingItem[];
  definitions: VocabDefinitionOption[];
}

export interface GlossaryItem {
  line: number;
  word: string;
  definition: string;
  vietnameseMeaning: string;
}

export interface PassageNumberedLine {
  lineNumber?: number; // 5, 10, 15, 20
  text: string;
}

export interface ReadingComprehensionOption {
  key: string; // 'a' | 'b' | 'c' | 'd'
  text: string;
}

export interface ReadingComprehensionQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: ReadingComprehensionOption[];
  correctAnswer: string; // 'a' | 'b' | 'c' | 'd'
  explanation: string;
}

export interface IdiomItem {
  id: string;
  idiom: string;
  definition: string;
  bookExample: string;
  sentencePrompt: string; // e.g. "Did John [BLANK] at the front desk this morning?"
  correctAnswer: string;  // "check in"
  acceptableAnswers?: string[];
  explanation: string;
}

export interface SummaryConfig {
  instruction: string;
  wordBank: string[];
  passageTemplate: string; // contains [BLANK_0], [BLANK_1], ...
  correctAnswers: string[];
  vietnameseTranslation?: string;
}

export interface ListeningDialogueLine {
  speaker: string;
  text: string;
}

export interface ListeningComprehensionQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
}

export interface ListeningDictationConfig {
  dialogTitle: string;
  audioUrl: string;
  trackNumber: number;
  speakers: {
    speaker: string;
    lines: { text: string }[];
  }[];
  fullTranscript: string;
  questions: ListeningComprehensionQuestion[];
}

export interface GrammarInlineChoice {
  id: string;
  sentenceBefore: string;
  options: [string, string]; // e.g. ["Is", "Are"]
  correctAnswer: string;
  sentenceAfter: string;
  explanation: string;
}

export interface GrammarConfig {
  title: string;
  ruleExplanation: string;
  sampleSentences: string[];
  questions: GrammarInlineChoice[];
}

export interface GuidedWritingConfig {
  title: string;
  promptQuestions: string[];
  exampleText: string;
  suggestedAnswers: {
    question: string;
    sample: string;
  }[];
  minWords: number;
}

export interface ReviewQuizQuestion {
  id: string;
  part: 'A' | 'B'; // Part A = Vocab & Idiom (1-7), Part B = Word Form (8-10)
  questionNumber: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface UnitConfig {
  unitNumber: number;
  slug: string;
  title: string;
  category: string; // e.g. "Arts and Leisure", "Culture and History"
  audioReadingUrl: string;
  audioListeningUrl: string;
  wordCount: number; // e.g. 223 words
  passageNumberedLines: PassageNumberedLine[];
  glossary: GlossaryItem[];
  passageParagraphs: string[];
  preReading: PreReadingConfig;
  vocabPreview: VocabPreviewConfig;
  readingComprehension: ReadingComprehensionQuestion[];
  idioms: IdiomItem[];
  summary: SummaryConfig;
  listeningDictation: ListeningDictationConfig;
  grammar: GrammarConfig;
  guidedWriting: GuidedWritingConfig;
  reviewQuiz: ReviewQuizQuestion[];
}

export interface UnitProgressState {
  currentStepIndex: number;
  completedSteps: StepType[];
  stepAnswers: Record<string, any>;
  readingWpm?: number;
  readingSeconds?: number;
  scores: {
    vocabPreviewScore?: number;
    comprehensionScore?: number;
    idiomsScore?: number;
    summaryScore?: number;
    listeningScore?: number;
    dictationAccuracy?: number;
    grammarScore?: number;
    reviewQuizScore?: number;
  };
  writingDraft?: string;
  isUnitCompleted: boolean;
  lastUpdated: string;
}
