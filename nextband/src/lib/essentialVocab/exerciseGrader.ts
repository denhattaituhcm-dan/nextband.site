import type {
  EvcStage1Exercise,
  EvcStage2Exercise,
  EvcStage3Exercise,
  EvcStage4Exercise,
} from "../../data/essentialVocab/schema";
import {
  evaluateOpenClozeBlank,
  type OpenClozeMatchTier,
} from "./answerNormalizer";

export interface GradedStageItemResult {
  itemId: string;
  itemNumber: number;
  submittedValue: string | number;
  isCorrect: boolean;
  matchTier?: OpenClozeMatchTier;
  canonicalAnswer: string;
  canonicalDisplay: string;
  linkedEntryId: string;
  linkedSenseNumber: number;
  feedbackEn: string;
  feedbackVi?: string;
}

export interface GradedStageSummary {
  stage: 1 | 2 | 3 | 4;
  score: number;
  maxScore: number;
  accuracyPct: number;
  items: GradedStageItemResult[];
  wrongEntryIds: string[];
}

export function gradeStage1Exercise(
  exercise: EvcStage1Exercise,
  answersByQuestionId: Record<string, number | undefined>
): GradedStageSummary {
  const items: GradedStageItemResult[] = exercise.questions.map((q) => {
    const selected = answersByQuestionId[q.questionId] ?? 0;
    const isCorrect = selected === q.correctOptionNumber;
    return {
      itemId: q.questionId,
      itemNumber: q.questionNumber,
      submittedValue: selected,
      isCorrect,
      canonicalAnswer: q.canonicalAnswerText,
      canonicalDisplay: `(${q.correctOptionNumber}) ${q.canonicalAnswerText}`,
      linkedEntryId: q.linkedEntryId,
      linkedSenseNumber: q.linkedSenseNumber,
      feedbackEn: q.explanationEn,
      feedbackVi: q.explanationVi,
    };
  });

  return summarizeStageResults(1, items);
}

export function gradeStage2Exercise(
  exercise: EvcStage2Exercise,
  answersByQuestionId: Record<string, number | undefined>
): GradedStageSummary {
  const items: GradedStageItemResult[] = exercise.questions.map((q) => {
    const selected = answersByQuestionId[q.questionId] ?? 0;
    const isCorrect = selected === q.correctOptionNumber;
    return {
      itemId: q.questionId,
      itemNumber: q.questionNumber,
      submittedValue: selected,
      isCorrect,
      canonicalAnswer: q.canonicalAnswerText,
      canonicalDisplay: `(${q.correctOptionNumber}) ${q.canonicalAnswerText}`,
      linkedEntryId: q.answerLinkedEntryId,
      linkedSenseNumber: 1,
      feedbackEn: q.explanationEn,
      feedbackVi: q.explanationVi,
    };
  });

  return summarizeStageResults(2, items);
}

export function gradeStage3Exercise(
  exercise: EvcStage3Exercise,
  answersByBlankId: Record<string, string | number | undefined>
): GradedStageSummary {
  if (exercise.variant === "box_word_bank") {
    const items: GradedStageItemResult[] = exercise.blanks.map((b) => {
      const selectedLetter = String(answersByBlankId[b.blankId] ?? "")
        .trim()
        .toUpperCase();
      const isCorrect = selectedLetter === b.correctLetter;
      return {
        itemId: b.blankId,
        itemNumber: b.blankNumber,
        submittedValue: selectedLetter,
        isCorrect,
        canonicalAnswer: b.canonicalAnswerText,
        canonicalDisplay: `(${b.correctLetter}) ${b.canonicalAnswerText}`,
        linkedEntryId: b.linkedEntryId,
        linkedSenseNumber: b.linkedSenseNumber,
        feedbackEn: b.explanationEn,
        feedbackVi: b.explanationVi,
      };
    });
    return summarizeStageResults(3, items);
  }

  const items: GradedStageItemResult[] = exercise.blanks.map((b) => {
    const selectedNum = Number(answersByBlankId[b.blankId] ?? 0);
    const isCorrect = selectedNum === b.correctOptionNumber;
    return {
      itemId: b.blankId,
      itemNumber: b.blankNumber,
      submittedValue: selectedNum,
      isCorrect,
      canonicalAnswer: b.canonicalAnswerText,
      canonicalDisplay: `(${b.correctOptionNumber}) ${b.canonicalAnswerText}`,
      linkedEntryId: b.linkedEntryId,
      linkedSenseNumber: b.linkedSenseNumber,
      feedbackEn: b.explanationEn,
      feedbackVi: b.explanationVi,
    };
  });

  return summarizeStageResults(3, items);
}

export function gradeStage4Exercise(
  exercise: EvcStage4Exercise,
  answersByBlankId: Record<string, string | undefined>
): GradedStageSummary {
  const items: GradedStageItemResult[] = exercise.blanks.map((b) => {
    const raw = answersByBlankId[b.blankId] ?? "";
    const evaluation = evaluateOpenClozeBlank(raw, b);
    const alts = [
      ...b.acceptedGrammaticalVariants,
      ...b.verifiedContextualAlternatives,
    ];
    const canonicalDisplay =
      alts.length > 0
        ? `${b.canonicalAnswer} (cũng chấp nhận: ${alts.join(", ")})`
        : b.canonicalAnswer;

    return {
      itemId: b.blankId,
      itemNumber: b.blankNumber,
      submittedValue: raw.trim(),
      isCorrect: evaluation.isCorrect,
      matchTier: evaluation.matchTier,
      canonicalAnswer: b.canonicalAnswer,
      canonicalDisplay,
      linkedEntryId: b.linkedEntryId,
      linkedSenseNumber: b.linkedSenseNumber,
      feedbackEn: b.explanationEn,
      feedbackVi: evaluation.feedbackMessage,
    };
  });

  return summarizeStageResults(4, items);
}

function summarizeStageResults(
  stage: 1 | 2 | 3 | 4,
  items: GradedStageItemResult[]
): GradedStageSummary {
  const score = items.filter((i) => i.isCorrect).length;
  const maxScore = items.length;
  const accuracyPct =
    maxScore > 0 ? Math.round((score / maxScore) * 1000) / 10 : 0;
  const wrongEntryIds = Array.from(
    new Set(items.filter((i) => !i.isCorrect).map((i) => i.linkedEntryId))
  );

  return {
    stage,
    score,
    maxScore,
    accuracyPct,
    items,
    wrongEntryIds,
  };
}
