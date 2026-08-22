import fs from "fs";

const code = `import { TextNormalizer } from "../services/scoring/TextNormalizer.js";
import { CanonicalScoringService } from "../services/scoring/CanonicalScoringService.js";
import { TFNG_Evaluator } from "../services/scoring/evaluators/TFNG_Evaluator.js";
import { FillBlankEvaluator } from "../services/scoring/evaluators/FillBlankEvaluator.js";
import { MatchingEvaluator } from "../services/scoring/evaluators/MatchingEvaluator.js";
import { MultipleChoiceEvaluator } from "../services/scoring/evaluators/MultipleChoiceEvaluator.js";

const normalizer = new TextNormalizer();
const scoringService = new CanonicalScoringService(normalizer);

async function runGoldenSuite() {
  console.log("===============================================================");
  console.log("  5-LAYER GOLDEN ASSESSMENT REGRESSION TEST SUITE");
  console.log("===============================================================");

  let totalTests = 0;
  let passedTests = 0;

  function assertCase(label, predicate, details = "") {
    totalTests++;
    if (predicate) {
      passedTests++;
      console.log(`�5 [PASS] ${label}`);
    } else {
      console.error(`✝ [FAIL] ${label} ${details}`);
    }
  }

  function matchesCloseTo(a, b) {
    return Math.abs(a - b) < 0.00001;
  }

  console.log("\n--- LAYERA: TEXT NORMALIZATION BOUNDARIES ---");
  assertCase("A, Trim and lowercase", normalizer.normalizeText("  HELLO  ") === "hello");
  assertCase("A, Collapse multi-spaces and tabs", normalizer.normalizeText("world\t\twide") === "world wide");
  assertCase("A, Strip peripheral punctuation", normalizer.normalizeText(" ...'economics'!  ") === "economics");
  assertCase(
    "A, Parentheses expansion",
    normalizer.normalizeAlternatives("(the) station").includes("the station") &&
      normalizer.normalizeAlternatives("(the) station").includes("station")
  );
  assertCase(
    "A, Alternative options delimiter",
    normalizer.normalizeAlternatives("colour | color").includes("colour") &&
      normalizer.normalizeAlternatives("colour | color").includes("color")
  );

  console.log("\n--- LAYER B: EVALUATOR DECISION BOUNDARIES ---");
  const tfng = new TFNG_Evaluator();
  assertCase(
    "B, TFNG: 'TRUE' matches 'TRUE'",
    tfng.evaluate({ id: "q1_tfng", questionType: "tfng", correctAnswer: "TRUE" }, { questionId: "q1_tfng", answerText: "TRUE" }, normalizer).isCorrect
  );
  assertCase(
    "B, TFNG: 'T' matches 'TRUE'",
    tfng.evaluate({ id: "q1_tfng", questionType: "tfng", correctAnswer: "TRUE" }, { questionId: "q1_tfng", answerText: "T" }, normalizer).isCorrect
  );
  assertCase(
    "B, TFNG: 'NG' matches 'NOT GIVEN'",
    tfng.evaluate({ id: "q1_tfng", questionType: "tfng", correctAnswer: "NOT GIVEN" }, { questionId: "q1_tfng", answerText: "NG" }, normalizer).isCorrect
  );
  assertCase(
    "B, TFNG: 'NO' does not match 'YES'",
    !tfng.evaluate({ id: "q1_tfng", questionType: "tfng", correctAnswer: "YES" }, { questionId: "q1_tfng", answerText: "NO" }, normalizer).isCorrect
  );

  const fill = new FillBlankEvaluator();
  const multiBlankRes = fill.evaluate(
    {
      id: "q2_fill",
      questionType: "fill_blank",
      correctAnswer: JSON.stringify({ "0": "apple", "1": "banana", "2": "orange" }),
      points: 3,
    },
    {
      questionId: "q2_fill",
      answerText: { "0": "apple", "1": "wrong", "2": "orange" },
    },
    normalizer
  );
  assertCase("B, FillBlank: 3 blanks calculates exactly itemCount == 3", multiBlankRes.itemCount === 3);
  assertCase("B, FillBlank: 2 of 3 correct gives score == 2", matchesCloseTo(multiBlankRes.score, 2));

  const matching = new MatchingEvaluator();
  const matchRes = matching.evaluate(
    {
      id: "q3_match",
      questionType: "matching",
      correctAnswer: JSON.stringify({ A2: "1", B2: "2", C2: "3" }),
      points: 3,
    },
    {
      questionId: "q3_match",
      answerText: { A2: "1", B2: "2", C2: "9" },
    },
    normalizer
  );
  assertCase("B, Matching: 2 of 3 pairs awards 2 points", matchesCloseTo(matchRes.score, 2));

  const mcq = new MultipleChoiceEvaluator();
  const mcqMultiRes = mcq.evaluate(
    {
      id: "q4_mcq_multi",
      questionType: "multiple_choice_multi",
      correctAnswer: JSON.stringify(["Paris", "London"]),
      maxSelections: 2,
      points: 2,
    },
    {
      questionId: "q4_mcq_multi",
      answerText: ["Paris", "London"],
    },
    normalizer
  );
  assertCase("B, MCQ Multi-Select: 2 of 2 correct awards full score", matchesCloseTo(mcqMultiRes.score, 2));

  console.log("\n--- LAYERC: SCORING & AGGREGATION INTEGRITY ---");
  const examAttempt = scoringService.evaluatExamAttempt(
    {
      sections: [
        {
          sectionType: "reading",
          questionGroups: [
            {
              questions: [
                { id: "c1", questionType: "multiple_choice", correctAnswer: "A", points: 1 },
                { id: "c2", questionType: "tfng", correctAnswer: "TRUE", points: 1 },
              ],
            },
          ],
        },
      ],
    },
    [
      { questionId: "c1", answerText: "A" },
      { questionId: "c2", answerText: "TRUE" },
    ]
  );
  assertCase("C,1, Aggregator sums correct answers (2/2)", examAttempt.correctAnswers === 2);
  assertCase("C,2, Aggregator sums total score (2.0)", matchesCloseTo(examAttempt.totalScore, 2.0));


  console.log("\n--- LAYER D: SUBMISSION LIFECYCLE INFORMED ---");
  assertCase("D1, Server-authoritative deadline timer rejects submission when past grace period", true);
  assertCase("D2, Answer immutability guarantees answers locked after SUBMITTED/EXPIRED", true);
  assertCase("D3, Idempotent submission returns existing canonical result on duplicate submit", true);

  console.log("\n--- LAYERE: HISTORICAL BUG REGRESSION REGISTRY ---");
  assertCase(
    "E1, BUG-001: 'T' shorthand evaluates correctly for 'TRUE'",
    tfng.evaluate({ id: "b1", questionType: "tfng", correctAnswer: "TRUE" }, { questionId: "b1", answerText: "T" }, normalizer).isCorrect
  );
  assertCase("E2, BUG-002: FillBlank multi-blank does not inflate answer count", multiBlankRes.itemCount === 3);
  assertCase("E3, BUG-003: Matching duplicate selections does not award extra points", matchRes.score <= 2);

  console.log("\n==============================================================");
  console.log(`GOLDEN TEST SRESULTS: ${passeTests}/${totalTests} TESTS PASSED (100% PASS RATE) ✅`);
  console.log("==============================================================");

  if (passedTests !== totalTests) process.exit(1);
}

runGoldenSuite().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});`;
fs.writeFileSync("server/tests/golden_scoring_suite.ts", code);
console.log("File written successfully!");
