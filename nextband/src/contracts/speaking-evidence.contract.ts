export type SpeakingCriterion = "PR" | "FC" | "LR" | "GRA";
export type EvidencePolarity = "ISSUE" | "STRENGTH";

export interface SpeakingEvidenceTagDTO {
  id: string;
  criterion: SpeakingCriterion;
  polarity: EvidencePolarity;
  labelVi: string;
  descriptionVi: string;
  inclusionRule: string;
  exclusionRule: string;
  displayOrder: number;
  version: string;
  isActive: boolean;
}

export interface SpeakingEvidenceGroupedDTO {
  pr: SpeakingEvidenceTagDTO[];
  fc: SpeakingEvidenceTagDTO[];
  lr: SpeakingEvidenceTagDTO[];
  gra: SpeakingEvidenceTagDTO[];
}

export interface SpeakingAssessmentEvidenceDTO {
  id: string;
  assessmentId: string;
  criterion: SpeakingCriterion;
  tagId: string;
  evidenceNote?: string | null;
  createdBy: string;
  createdAt: string;
  removedBy?: string | null;
  removedAt?: string | null;
  tag?: SpeakingEvidenceTagDTO;
}

export interface SyncSpeakingEvidenceItem {
  tagId: string;
  criterion: SpeakingCriterion;
  evidenceNote?: string;
}
