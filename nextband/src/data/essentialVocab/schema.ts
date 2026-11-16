import { z } from "zod";

export const EvcBookIdSchema = z.enum([
  "evc-1",
  "evc-2",
  "evc-3",
  "evc-4",
  "evc-5",
  "evc-6",
]);
export type EvcBookId = z.infer<typeof EvcBookIdSchema>;

export const EvcPartOfSpeechSchema = z.enum([
  "noun",
  "plural noun",
  "verb",
  "adjective",
  "adverb",
  "phrasal verb",
  "phrase",
  "preposition",
  "conjunction",
  "noun and adjective",
  "noun and verb",
  "adjective and adverb",
]);
export type EvcPartOfSpeech = z.infer<typeof EvcPartOfSpeechSchema>;

export const EvcContentProvenanceSchema = z.object({
  sourceBookId: EvcBookIdSchema,
  sourceBookTitle: z.string().min(1),
  sourceUnitNumber: z.number().int().min(1).max(20),
  sourceBookPages: z.tuple([
    z.number().int().positive(),
    z.number().int().positive(),
  ]),
  sourcePdfPages: z.tuple([
    z.number().int().positive(),
    z.number().int().positive(),
  ]),
  answerKeyBookPage: z.number().int().positive(),
  verifiedBy: z.string().min(1),
  verifiedAtIso: z.string().datetime(),
  licenseStatus: z.enum([
    "public_access",
    "internal_pilot_only",
    "licensed_production",
    "restricted",
  ]),
});
export type EvcContentProvenance = z.infer<typeof EvcContentProvenanceSchema>;

export const EvcInflectionGroupSchema = z.object({
  rawText: z.string().min(1),
  forms: z.array(z.string().min(1)).min(1),
});
export type EvcInflectionGroup = z.infer<typeof EvcInflectionGroupSchema>;

export const EvcWordSenseSchema = z.object({
  senseNumber: z.number().int().min(1),
  pos: EvcPartOfSpeechSchema,
  usageConstraint: z.string().optional(),
  inflections: EvcInflectionGroupSchema.optional(),
  definitionEn: z.string().min(1),
  meaningVi: z.string().min(1),
  examplesEn: z.array(z.string().min(1)).min(1),
  collocations: z.array(z.string().min(1)).default([]),
});
export type EvcWordSense = z.infer<typeof EvcWordSenseSchema>;

export const EvcGlossaryEntrySchema = z.object({
  entryId: z.string().regex(/^evc[1-6]-u\d{2}-w\d{2}$/),
  unitId: z.string().regex(/^evc[1-6]-u\d{2}$/),
  displayHeadword: z.string().min(1),
  primaryHeadword: z.string().min(1),
  alternateHeadwords: z.array(z.string().min(1)).default([]),
  ipa: z.string().optional(),
  senses: z.array(EvcWordSenseSchema).min(1),
  testedInStages: z.array(z.number().int().min(1).max(4)).default([]),
});
export type EvcGlossaryEntry = z.infer<typeof EvcGlossaryEntrySchema>;

export const EvcMcqOptionSchema = z.object({
  optionNumber: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  text: z.string().min(1),
});
export type EvcMcqOption = z.infer<typeof EvcMcqOptionSchema>;

export const EvcStage1QuestionSchema = z.object({
  questionId: z.string().min(1),
  questionNumber: z.number().int().min(1).max(10),
  promptWithBlank: z.string().includes("___"),
  options: z.tuple([
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
  ]),
  correctOptionNumber: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  canonicalAnswerText: z.string().min(1),
  linkedEntryId: z.string().min(1),
  linkedSenseNumber: z.number().int().min(1).default(1),
  explanationEn: z.string().min(1),
  explanationVi: z.string().optional(),
});
export type EvcStage1Question = z.infer<typeof EvcStage1QuestionSchema>;

export const EvcStage1ExerciseSchema = z.object({
  stage: z.literal(1),
  exerciseType: z.literal("contextual_mcq"),
  instructions: z.string().min(1),
  questions: z.array(EvcStage1QuestionSchema).length(10),
});
export type EvcStage1Exercise = z.infer<typeof EvcStage1ExerciseSchema>;

export const EvcStage2VariantSchema = z.enum([
  "synonym_replacement",
  "verb_to_noun_collocation",
  "noun_to_verb_collocation",
]);
export type EvcStage2Variant = z.infer<typeof EvcStage2VariantSchema>;

export const EvcStage2QuestionSchema = z.object({
  questionId: z.string().min(1),
  questionNumber: z.number().int().min(1).max(5),
  variant: EvcStage2VariantSchema,
  sentenceContext: z.string().optional(),
  targetWordOrPhrase: z.string().min(1),
  options: z.tuple([
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
  ]),
  correctOptionNumber: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  canonicalAnswerText: z.string().min(1),
  targetLinkedEntryId: z.string().optional(),
  answerLinkedEntryId: z.string().min(1),
  explanationEn: z.string().min(1),
  explanationVi: z.string().optional(),
});
export type EvcStage2Question = z.infer<typeof EvcStage2QuestionSchema>;

export const EvcStage2ExerciseSchema = z.object({
  stage: z.literal(2),
  exerciseType: z.literal("lexical_relation_mcq"),
  variant: EvcStage2VariantSchema,
  instructions: z.string().min(1),
  questions: z.array(EvcStage2QuestionSchema).length(5),
});
export type EvcStage2Exercise = z.infer<typeof EvcStage2ExerciseSchema>;

export const EvcBoxLetterSchema = z.enum([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
]);
export type EvcBoxLetter = z.infer<typeof EvcBoxLetterSchema>;

export const EvcWordBankItemSchema = z.object({
  letter: EvcBoxLetterSchema,
  word: z.string().min(1),
  isDistractor: z.boolean(),
});
export type EvcWordBankItem = z.infer<typeof EvcWordBankItemSchema>;

export const EvcStage3BoxBlankSchema = z.object({
  blankId: z.string().min(1),
  blankNumber: z.number().int().min(1).max(5),
  correctLetter: EvcBoxLetterSchema,
  canonicalAnswerText: z.string().min(1),
  linkedEntryId: z.string().min(1),
  linkedSenseNumber: z.number().int().min(1).default(1),
  explanationEn: z.string().min(1),
  explanationVi: z.string().optional(),
});
export type EvcStage3BoxBlank = z.infer<typeof EvcStage3BoxBlankSchema>;

export const EvcStage3InlineBlankSchema = z.object({
  blankId: z.string().min(1),
  blankNumber: z.number().int().min(1).max(5),
  options: z.tuple([
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
    EvcMcqOptionSchema,
  ]),
  correctOptionNumber: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  canonicalAnswerText: z.string().min(1),
  linkedEntryId: z.string().min(1),
  linkedSenseNumber: z.number().int().min(1).default(1),
  explanationEn: z.string().min(1),
  explanationVi: z.string().optional(),
});
export type EvcStage3InlineBlank = z.infer<typeof EvcStage3InlineBlankSchema>;

export const EvcStage3ExerciseSchema = z.discriminatedUnion("variant", [
  z.object({
    stage: z.literal(3),
    exerciseType: z.literal("guided_passage_cloze"),
    variant: z.literal("box_word_bank"),
    instructions: z.string().min(1),
    passageTitle: z.string().optional(),
    passageTemplate: z.string().includes("{{1}}"),
    wordBank: z.array(EvcWordBankItemSchema).length(10),
    blanks: z.array(EvcStage3BoxBlankSchema).length(5),
  }),
  z.object({
    stage: z.literal(3),
    exerciseType: z.literal("guided_passage_cloze"),
    variant: z.literal("inline_four_option"),
    instructions: z.string().min(1),
    passageTitle: z.string().optional(),
    passageTemplate: z.string().includes("{{1}}"),
    blanks: z.array(EvcStage3InlineBlankSchema).length(5),
  }),
]);
export type EvcStage3Exercise = z.infer<typeof EvcStage3ExerciseSchema>;

export const EvcStage4BlankSchema = z.object({
  blankId: z.string().min(1),
  blankNumber: z.number().int().min(1).max(10),
  canonicalAnswer: z.string().min(1),
  acceptedGrammaticalVariants: z.array(z.string().min(1)).default([]),
  verifiedContextualAlternatives: z.array(z.string().min(1)).default([]),
  unverifiedSuggestedAnswers: z
    .array(
      z.object({
        value: z.string().min(1),
        feedbackReason: z.string().min(1),
      })
    )
    .default([]),
  linkedEntryId: z.string().min(1),
  linkedSenseNumber: z.number().int().min(1).default(1),
  grammaticalHint: z.string().min(1),
  explanationEn: z.string().min(1),
  explanationVi: z.string().optional(),
});
export type EvcStage4Blank = z.infer<typeof EvcStage4BlankSchema>;

export const EvcStage4ExerciseSchema = z.object({
  stage: z.literal(4),
  exerciseType: z.literal("open_cloze_passage"),
  instructions: z.string().min(1),
  passageTitle: z.string().optional(),
  passageTemplate: z.string().includes("{{1}}"),
  blanks: z.array(EvcStage4BlankSchema).min(5).max(10),
});
export type EvcStage4Exercise = z.infer<typeof EvcStage4ExerciseSchema>;

export const EvcUnitDataSchema = z.object({
  unitId: z.string().regex(/^evc[1-6]-u\d{2}$/),
  bookId: EvcBookIdSchema,
  unitNumber: z.number().int().min(1).max(20),
  title: z.string().min(1),
  subtitleVi: z.string().min(1),
  themeCategory: z.string().min(1),
  contentVersion: z.number().int().min(1),
  provenance: EvcContentProvenanceSchema,
  glossary: z.array(EvcGlossaryEntrySchema).min(20),
  exercises: z.object({
    stage1: EvcStage1ExerciseSchema,
    stage2: EvcStage2ExerciseSchema,
    stage3: EvcStage3ExerciseSchema,
    stage4: EvcStage4ExerciseSchema,
  }),
});
export type EvcUnitData = z.infer<typeof EvcUnitDataSchema>;

export interface EvcUnitSummary {
  unitId: string;
  bookId: EvcBookId;
  unitNumber: number;
  title: string;
  subtitleVi: string;
  themeCategory: string;
  bookPageStart: number;
  glossaryEntryCount: number;
  headwordCount: number;
  stageMaxScores: {
    stage1: number;
    stage2: number;
    stage3: number;
    stage4: number;
  };
  totalQuestions: number;
  contentVersion: number;
  isAvailable: boolean;
}

export interface EvcBookMeta {
  bookId: EvcBookId;
  title: string;
  subtitle: string;
  cefrBand: string;
  ieltsTargetBand: string;
  totalUnits: number;
  units: EvcUnitSummary[];
}
