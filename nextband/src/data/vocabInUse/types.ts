export type ExerciseKind = "gap_fill" | "classifier" | "sentence_upgrade";

export interface LexiconItem {
  id: string;
  word: string;
  ipa: string;
  pos: string;
  meaningEn: string;
  meaningVi: string;
  registerNote?: string;
  nuanceTip: string;
  example: string;
  /** Provenance of `example`: "book" = quoted/adapted from the source book or its Key; "aris" = written by ARIS. Omit when unverified. */
  exampleSource?: "book" | "aris";
  /** ARIS editorial suggestion: "productive" = worth using in speaking/writing; "receptive" = recognition only. */
  ieltsUse?: "productive" | "receptive";
  /** Register / variety / sensitivity caution shown to learners. */
  usageFlag?: "informal" | "uk-only" | "sensitive";
}

export interface PassageToken {
  text: string;
  lexiconId?: string;
}

export interface TheoryBullet {
  label: string;
  detail: string;
  example?: string;
}

export interface TheorySection {
  key: "A" | "B" | "C" | "D";
  title: string;
  subtitle: string;
  items: TheoryBullet[];
}

export interface GapFillQuestion {
  id: string;
  promptBefore: string;
  promptAfter: string;
  answer: string;
  acceptedAnswers?: string[];
  hint?: string;
  explanationVi: string;
}

export interface GapFillExercise {
  id: string;
  kind: "gap_fill";
  title: string;
  instruction: string;
  sourceNote: string;
  wordBank?: string[];
  questions: GapFillQuestion[];
}

export interface ClassifierCategory {
  key: string;
  label: string;
  description: string;
}

export interface ClassifierQuestion {
  id: string;
  prompt: string;
  highlightWord: string;
  correctCategory: string;
  subPrompt?: string;
  subCorrectAnswer?: string;
  subAcceptedAnswers?: string[];
  explanationVi: string;
}

export interface ClassifierExercise {
  id: string;
  kind: "classifier";
  title: string;
  instruction: string;
  sourceNote: string;
  categories: ClassifierCategory[];
  questions: ClassifierQuestion[];
}

export interface SentenceUpgradeQuestion {
  id: string;
  originalSentence: string;
  promptCue?: string;
  options: string[];
  correctOption: string;
  explanationVi: string;
}

export interface SentenceUpgradeExercise {
  id: string;
  kind: "sentence_upgrade";
  title: string;
  instruction: string;
  sourceNote: string;
  questions: SentenceUpgradeQuestion[];
}

export type ExerciseBlock =
  | GapFillExercise
  | ClassifierExercise
  | SentenceUpgradeExercise;

export interface VocabInUseUnit {
  unitId: number;
  chapterTitle: string;
  titleEn: string;
  titleVi: string;
  cefr: string;
  estimatedMinutes: number;
  summaryVi: string;
  passageTitle: string;
  passageSubtitle: string;
  passageParagraphs: PassageToken[][];
  lexicon: LexiconItem[];
  theorySections: TheorySection[];
  exercises: ExerciseBlock[];
}

export interface RoadmapChapter {
  chapterNumber: number;
  titleEn: string;
  titleVi: string;
  unitRange: string;
  sampleTopics: string[];
  status: "live" | "upcoming";
}
