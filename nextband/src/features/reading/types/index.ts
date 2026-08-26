export type RealmLevel = "HOC_DO" | "HOC_GIA" | "HOC_SI" | "HOC_SU" | "HOC_BA" | "HOC_TON" | "HOC_DE";

export interface VocabularyTerm {
  term: string;
  pronunciation: string;
  pos: string;
  meaning_en: string;
  meaning_vi: string;
  context_note: string;
}

export interface Paragraph {
  id: string;
  text: string;
}

export interface DossierSource {
  id: string;
  type: "incident_log" | "witness_statement" | "digital_audit" | "article" | "scientific_report";
  title: string;
  subtitle?: string;
  paragraphs: Paragraph[];
}

export type TaskType = "FIND" | "MATCH" | "INFER" | "PROVE";

export interface TaskOption {
  id: string;
  text: string;
}

export interface BaseTask {
  id: string;
  type: TaskType;
  question?: string;
  instruction?: string;
}

export interface MultipleChoiceTask extends BaseTask {
  type: "FIND" | "MATCH" | "INFER";
  question: string;
  options: TaskOption[];
  answer: string;
  evidence_paragraph_id?: string;
  evidence_paragraph_ids?: string[];
}

export interface ProveTask extends BaseTask {
  type: "PROVE";
  instruction: string;
  target_paragraph_id: string;
  target_sentence: string;
}

export type ReadingTask = MultipleChoiceTask | ProveTask;

export interface EvidenceItem {
  id: string;
  paragraph_id: string;
  label: string;
}

export interface FinalDeduction {
  question: string;
  options: TaskOption[];
  correct_hypothesis: string;
  required_evidence_pool: EvidenceItem[];
  correct_evidence_ids: string[];
}

export interface AutopsyTrap {
  type: "OVER_INFERENCE" | "PARAPHRASE_PRECISION" | "WORD_MATCHING" | "EXTREME_GENERALIZATION";
  description: string;
}

export interface ReadingCase {
  id: string;
  title: string;
  level: {
    realm: RealmLevel;
    realm_name_vi: string;
    ielts_band: number;
    difficulty: 1 | 2 | 3 | 4; // 1: Sơ kỳ, 2: Trung kỳ, 3: Hậu kỳ, 4: Đỉnh phong
  };
  universe: {
    type: "CASE_FILES" | "GREAT_STORIES" | "REAL_WORLD" | "IELTS_CHALLENGE";
    name: string;
  };
  estimated_minutes: number;
  sources: DossierSource[];
  vocabulary: VocabularyTerm[];
  tasks: ReadingTask[];
  final_deduction: FinalDeduction;
  autopsy: {
    traps: AutopsyTrap[];
    takeaways: string[];
  };
}
