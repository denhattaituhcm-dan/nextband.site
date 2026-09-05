import { IQuestionEvaluator } from "../types.js";
import { MultipleChoiceEvaluator } from "./MultipleChoiceEvaluator.js";
import { FillBlankEvaluator } from "./FillBlankEvaluator.js";
import { MatchingEvaluator } from "./MatchingEvaluator.js";
import { TFNG_Evaluator } from "./TFNG_Evaluator.js";
import { ManualEvaluator } from "./ManualEvaluator.js";

export const EVALUATORS: IQuestionEvaluator[] = [
  new MultipleChoiceEvaluator(),
  new FillBlankEvaluator(),
  new MatchingEvaluator(),
  new TFNG_Evaluator(),
  new ManualEvaluator(),
];

const fallbackEvaluator = new FillBlankEvaluator();

export function getEvaluatorForType(questionType: string): IQuestionEvaluator {
  const normalizedType = (questionType || "").toLowerCase();
  for (const evaluator of EVALUATORS) {
    if (evaluator.canEvaluate(normalizedType)) {
      return evaluator;
    }
  }
  // If the question type sounds like speaking or writing, evaluate manually
  if (
    normalizedType.includes("speak") ||
    normalizedType.includes("write") ||
    normalizedType.includes("essay") ||
    normalizedType.includes("audio") ||
    normalizedType.includes("record")
  ) {
    return new ManualEvaluator();
  }
  return fallbackEvaluator;
}

export {
  MultipleChoiceEvaluator,
  FillBlankEvaluator,
  MatchingEvaluator,
  TFNG_Evaluator,
  ManualEvaluator,
};
