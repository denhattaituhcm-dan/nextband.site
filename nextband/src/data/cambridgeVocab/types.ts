export interface MagnetOption {
  word: string;
  pos: string;
  hint: string;
  explanation: string;
}

export interface IeltsInsight {
  collocation: string;
  bandScore: string;
  synonyms: string[];
  academicTip: string;
}

export interface Stage1Magnet {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  target: string;
  options: MagnetOption[];
  ieltsInsight: IeltsInsight;
}

export interface Stage2Milestone {
  milestoneId: string;
  age: string;
  title: string;
  icon: string;
  stageTag: string;
  story: string;
  storyEn: string;
  target: string;
  targetVi: string;
  pos: string;
  candidates: string[];
  explanation: string;
}

export interface EssayParagraph {
  pIndex: number;
  type: string;
  text: string;
}

export interface MorphologyVariant {
  form: string;
  pos: string;
  label: string;
  isCorrect: boolean;
}

export interface EssayBlank {
  id: string;
  num: number;
  rootWord: string;
  category: string;
  targetForm: string;
  grammarClue: string;
  variants: MorphologyVariant[];
}

export interface WordArsenalItem {
  root: string;
  pos: string;
  vi: string;
  cat: string;
}

export interface XrayHighlights {
  thesis: string[];
  cohesion: string[];
  lexical: string[];
}

export interface Stage3Essay {
  title: string;
  prompt: string;
  paragraphs: EssayParagraph[];
  blanks: EssayBlank[];
  wordArsenal: WordArsenalItem[];
  xrayHighlights: XrayHighlights;
}

export interface LexiconEntry {
  word: string;
  ipa: string;
  pos: string;
  def_en: string;
  def_vi: string;
  collocations: string;
  example: string;
  ielts_tip: string;
}

export interface CambridgeUnitMeta {
  unit: number;
  title: string;
  subTitle: string;
  book: string;
  cefr: string;
  totalStages: number;
  speedGoalWpm?: number;
  paperSpeedMultiplier?: string;
}

export interface CambridgeUnitData {
  meta: CambridgeUnitMeta;
  stage1_magnets: Stage1Magnet[];
  stage2_timeline: Stage2Milestone[];
  stage3_essay: Stage3Essay;
  lexicon_notes: Record<string, LexiconEntry>;
}

export interface UnitOverviewItem {
  unitId: number;
  phaseId: number;
  phaseName: string;
  titleEn: string;
  titleVi: string;
  descriptionVi: string;
  targetCefr: string;
  isAvailable: boolean;
  coreCollocationsPreview: string[];
}
