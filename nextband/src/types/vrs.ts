export type VRSSkill = 'writing' | 'reading' | 'speaking';
export type VRSCourse = 'dreamer' | 'builder' | 'master' | 'leader';

export interface VRSVisualLesson {
  id: string;
  courseId: VRSCourse;
  week: number;
  day: 1 | 2 | 3;
  skill: VRSSkill;
  title: string;
  subtitle: string;
  coreCompetency: string;
  bridgeToHomework: {
    promptText: string;
    targetExamId?: string;
  };
  stages: VRSStage[];
}

export type VRSStageType = 
  | 'warm_up'
  | 'productive_failure'
  | 'progressive_reveal'
  | 'syntax_anatomy'
  | 'verification_scale'
  | 'blueprint_builder'
  | 'transfer_test';

export interface VRSStage {
  stageNumber: number;
  stageType: VRSStageType;
  title: string;
  pedagogicalObjective: string;
  interactionModel: VRSInteractionModel;
}

export type VRSInteractionModel = 
  | VRSRevealInteraction
  | VRSSlotSnapInteraction
  | VRSScaleInteraction
  | VRSTransferInteraction;

export interface VRSRevealInteraction {
  type: 'progressive_reveal';
  prompt: string;
  cards: Array<{
    step: number;
    label: string;
    cognitiveFunction: string;
    content: string;
    pedagogyNote: string;
    branchOptions?: Array<{
      branchName: string;
      content: string;
      note: string;
    }>;
  >;
  fullMosaicSummary: string;
}

export interface VRSSlotSnapInteraction {
  type: 'slot_snap';
  prompt: string;
  mode: 'build' | 'break_and_repair' | 'collocation_snap';
  tokens: Array<{
    id: string;
    text: string;
    role: 'subject' | 'fv_core' | 'object' | 'complement' | 'modifier' | 'preposition' | 'bare_infinitive';
    colorClass: 'green' | 'orange' | 'blue' | 'red' | 'gray';
  >;
  slots?: Array<{
    slotId: string;
    acceptedRoles: string[];
    label: string;
  }>;
  collisionTarget?: {
    conflictingTokenIds: [string, string];
    errorMessage: string;
    repairOptions: Array<{
      id: string;
      action: 'delete' | 'morph' | 'merge';
      targetTokenId: string;
      resultText: string;
      explanation: string;
    }>;
  };
}

export interface VRSScaleInteraction {
  type: 'verification_scale';
  prompt: string;
  statement: {
    rawText: string;
    deconstructedVariables: Array<{
      name: 'subject' | 'relation' | 'scope_condition';
      text: string;
      isTrapWord?: boolean;
    >;
  };
  passageEvidence: {
    rawText: string;
    targetVariables: Array<{
      matchingName: 'subject' | 'relation' | 'scope_condition';
      text: string;
    >;
  };
  expectedRelation: 'match' | 'contradiction' | 'no_evidence';
  verdict: 'TRUE' | 'FALSE' | 'NOT GIVEN';
  pedagogicalInsight: string;
}

export interface VRSTransferInteraction {
  type: 'transfer_test';
  prompt: string;
  challengeSentence: string;
  task: 'fix_error' | 'verify_tfng' | 'categorize_block';
  solution: any;
  beforeAfterComparison: {
    oldHabitBand3: string;
    newCompetencyBand4: string;
  };
}
