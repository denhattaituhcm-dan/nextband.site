/**
 * Academic Diagnostic Service — Phase 2: Deterministic Diagnostic Engine
 * 
 * INVARIANTS:
 * 1. Raw Academic Evidence Is Immutable (Never modify Submission or Answer).
 * 2. Diagnostic Is a Hypothesis (explicit confidence, ruleCode, evidenceSnippet).
 * 3. 100% Deterministic — No LLM / Generative AI at this phase.
 * 4. NO_DIAGNOSIS is a valid and protective outcome.
 * 5. Idempotent persistence — duplicate execution produces ZERO extra records.
 * 6. Historical preservation — distinct taxonomy versions coexist without overwrite.
 */

import { PrismaClient } from "@prisma/client";

export interface DiagnosticInput {
  submissionId: string;
  questionId: string;
  studentId: string;

  questionType: string;

  studentAnswer: string;
  correctAnswer: string;

  questionText?: string;
  passageText?: string;

  options?: Array<{ key: string; text: string }>;
  maxWordsAllowed?: number;

  isCorrect: boolean;
  evaluationEvidence?: unknown;
}

export interface DiagnosticHypothesis {
  errorCode: string;
  confidence: number;
  evidenceSnippet?: string;
  ruleCode: string;
  evaluatorType: "RULE_BASED";
}

export interface DiagnosticRule {
  ruleCode: string;
  evaluate(input: DiagnosticInput): DiagnosticHypothesis | null;
}

// =========================================================================
// RULE CONFIGURATION (Centralized & Auditable, NOT hard-coded scattered)
// =========================================================================

export const EXTREME_QUALIFIERS_CONFIG = [
  "always",
  "never",
  "all",
  "none",
  "completely",
  "only",
  "must",
  "every",
  "entirely",
  "impossible",
  "invariably",
] as const;

export const RELATIVE_QUALIFIERS_CONFIG = [
  "often",
  "partly",
  "some",
  "sometimes",
  "usually",
  "rarely",
  "frequently",
  "unlikely",
  "may",
  "might",
  "can",
  "generally",
] as const;

// Helper: Normalize word count strictly handling whitespace, punctuation, contractions
export function countWordsStrict(text: string): number {
  if (!text) return 0;
  // Bỏ dấu câu đầu cuối từ, giữ lại các từ có nghĩa
  const cleaned = text
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, " ")
    .replace(/\s+/g, " ");
  if (!cleaned) return 0;
  return cleaned.split(" ").filter(Boolean).length;
}

// =========================================================================
// 3 DETERMINISTIC RULES
// =========================================================================

/**
 * RULE 001: WORD MATCHING TRAP
 * Điều kiện kích hoạt:
 * - Học sinh làm sai (isCorrect === false).
 * - Học sinh chọn một phương án gây nhiễu (distractor option) hoặc câu trả lời
 *   chứa từ vựng trùng khớp y hệt trong bài đọc (lexical overlap >= 2 từ có nghĩa),
 *   nhưng đáp án đúng lại là phương án khác hoặc ý nghĩa trong đoạn văn bị lái sang hướng khác.
 */
export class WordMatchingTrapRule implements DiagnosticRule {
  ruleCode = "RULE_001_WORD_MATCHING";

  evaluate(input: DiagnosticInput): DiagnosticHypothesis | null {
    if (input.isCorrect) return null;
    if (!input.studentAnswer || !input.passageText) return null;

    const studentAnsClean = input.studentAnswer.trim().toLowerCase();
    const correctAnsClean = input.correctAnswer.trim().toLowerCase();

    // 1. Kiểm tra nếu là bài Multiple Choice có options
    if (input.options && input.options.length > 0) {
      const selectedOption = input.options.find(
        (o) => o.key.toLowerCase() === studentAnsClean || o.text.toLowerCase() === studentAnsClean
      );
      const correctOption = input.options.find(
        (o) => o.key.toLowerCase() === correctAnsClean || o.text.toLowerCase() === correctAnsClean
      );

      if (selectedOption && correctOption && selectedOption.key !== correctOption.key) {
        // Tách các từ có ý nghĩa (độ dài >= 4 chữ cái để tránh giới từ / mạo từ)
        const optionWords = selectedOption.text
          .toLowerCase()
          .split(/[\s,.]+/)
          .filter((w) => w.length >= 4);

        const passageLower = input.passageText.toLowerCase();
        const matchedWords = optionWords.filter((w) => passageLower.includes(w));

        // Nếu option của học sinh trùng từ trực tiếp trong passage từ 2 từ trở lên,
        // trong khi đây là distractor (không phải đáp án đúng)
        if (matchedWords.length >= 2) {
          return {
            errorCode: "ERR_WORD_MATCHING_TRAP",
            confidence: 0.85,
            evidenceSnippet: `Lựa chọn '${selectedOption.key}' chứa các từ trùng mặt chữ với bài đọc [${matchedWords.join(
              ", "
            )}] nhưng là phương án gây nhiễu.`,
            ruleCode: this.ruleCode,
            evaluatorType: "RULE_BASED",
          };
        }
      }
    }

    // 2. Kiểm tra nếu là dạng True / False / Not Given
    // Nếu câu hỏi chứa từ vựng giống hệt passage nhưng học sinh vội chọn True trong khi đáp án là False/Not Given
    if (input.questionText && (studentAnsClean === "true" || studentAnsClean === "t")) {
      const qWords = input.questionText
        .toLowerCase()
        .split(/[\s,.]+/)
        .filter((w) => w.length >= 5);
      const passageLower = input.passageText.toLowerCase();
      const matched = qWords.filter((w) => passageLower.includes(w));

      if (matched.length >= 3 && correctAnsClean !== "true" && correctAnsClean !== "t") {
        return {
          errorCode: "ERR_WORD_MATCHING_TRAP",
          confidence: 0.82,
          evidenceSnippet: `Học sinh chọn True do thấy các từ khóa [${matched.slice(0, 3).join(
            ", "
          )}] trùng lặp trực tiếp trong văn bản, dù quan điểm thực tế là ${input.correctAnswer}.`,
          ruleCode: this.ruleCode,
          evaluatorType: "RULE_BASED",
        };
      }
    }

    return null; // Không đủ bằng chứng -> NO_DIAGNOSIS
  }
}

/**
 * RULE 002: EXTREME QUALIFIER MISJUDGMENT
 * Điều kiện kích hoạt:
 * - Học sinh làm sai.
 * - Câu hỏi chứa từ hạn định mang tính tuyệt đối (EXTREME: always, never, completely, etc.)
 *   trong khi văn bản hoặc phương án đúng chỉ mang tính tương đối (often, partly, sometimes, etc.),
 *   dẫn đến việc học sinh đánh giá sai tính logic.
 */
export class ExtremeQualifierRule implements DiagnosticRule {
  ruleCode = "RULE_002_EXTREME_QUALIFIER";

  evaluate(input: DiagnosticInput): DiagnosticHypothesis | null {
    if (input.isCorrect) return null;
    if (!input.questionText) return null;

    const qTextLower = input.questionText.toLowerCase();
    const qTokens = qTextLower.split(/[\s,.;:!?()]+/).filter(Boolean);

    // Tìm xem câu hỏi có chứa extreme qualifier nào không
    const detectedExtreme = EXTREME_QUALIFIERS_CONFIG.find((ex) => qTokens.includes(ex));
    if (!detectedExtreme) return null;

    // Kiểm tra xem bài đọc có chứa relative qualifier tương phản không
    if (input.passageText) {
      const pTextLower = input.passageText.toLowerCase();
      const pTokens = pTextLower.split(/[\s,.;:!?()]+/).filter(Boolean);
      // Tìm từ relative xuất hiện đầu tiên trong passage theo thứ tự văn bản
      const detectedRelative = pTokens.find((token) =>
        (RELATIVE_QUALIFIERS_CONFIG as readonly string[]).includes(token)
      );

      if (detectedRelative) {
        return {
          errorCode: "ERR_EXTREME_QUALIFIER",
          confidence: 0.88,
          evidenceSnippet: `Câu hỏi chứa từ tuyệt đối '${detectedExtreme}' trong khi bài đọc chỉ xác định ở mức độ '${detectedRelative}'.`,
          ruleCode: this.ruleCode,
          evaluatorType: "RULE_BASED",
        };
      }
    }

    // Trường hợp True/False/Not Given: Câu hỏi dùng extreme qualifier nhưng đáp án là False/Not Given
    const correctAnsLower = input.correctAnswer.toLowerCase();
    if (correctAnsLower === "false" || correctAnsLower === "not given") {
      return {
        errorCode: "ERR_EXTREME_QUALIFIER",
        confidence: 0.80,
        evidenceSnippet: `Câu hỏi bị tuyệt đối hóa bởi từ '${detectedExtreme}', dẫn đến kết luận sai so với đáp án '${input.correctAnswer}'.`,
        ruleCode: this.ruleCode,
        evaluatorType: "RULE_BASED",
      };
    }

    return null; // Không đủ tương phản logic -> NO_DIAGNOSIS
  }
}

/**
 * RULE 003: WORD LIMIT BREACH
 * Điều kiện kích hoạt:
 * - Câu trả lời vượt quá số từ tối đa cho phép (maxWordsAllowed).
 * - Hoàn toàn deterministic và độc lập với ngữ nghĩa.
 */
export class WordLimitBreachRule implements DiagnosticRule {
  ruleCode = "RULE_003_WORD_LIMIT";

  evaluate(input: DiagnosticInput): DiagnosticHypothesis | null {
    if (input.isCorrect) return null; // Nếu làm đúng theo regex/chấm điểm thì không bắt lỗi này
    if (!input.maxWordsAllowed || input.maxWordsAllowed <= 0) return null;

    const actualWords = countWordsStrict(input.studentAnswer);
    if (actualWords > input.maxWordsAllowed) {
      return {
        errorCode: "ERR_WORD_LIMIT_BREACH",
        confidence: 0.98, // Deterministic counting
        evidenceSnippet: `Yêu cầu tối đa ${input.maxWordsAllowed} từ, nhưng học sinh điền ${actualWords} từ: "${input.studentAnswer.trim()}".`,
        ruleCode: this.ruleCode,
        evaluatorType: "RULE_BASED",
      };
    }

    return null;
  }
}

// =========================================================================
// ACADEMIC DIAGNOSTIC SERVICE (Orchestrator & Persistence Guard)
// =========================================================================

export class AcademicDiagnosticService {
  private rules: DiagnosticRule[] = [];

  constructor(private prisma: PrismaClient) {
    // Đăng ký 3 rules cơ sở
    this.rules = [
      new WordMatchingTrapRule(),
      new ExtremeQualifierRule(),
      new WordLimitBreachRule(),
    ];
  }

  /**
   * Chạy chẩn đoán trên một input chuẩn hóa và trả về các giả thuyết
   * PURE FUNCTION: Không chạm vào DB, có thể unit test độc lập
   */
  diagnose(input: DiagnosticInput): DiagnosticHypothesis[] {
    if (input.isCorrect) {
      return []; // Invariant: Trả lời đúng không sinh chẩn đoán lỗi
    }

    const hypotheses: DiagnosticHypothesis[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(input);
      if (result) {
        hypotheses.push(result);
      }
    }

    return hypotheses;
  }

  /**
   * Ghi nhận các chẩn đoán vào DiagnosticEvidence với tính Idempotent tuyệt đối
   * Invariant 1: Không sửa/chạm vào ExamSubmission hay Answer.
   * Invariant 8: Chạy lại n lần không tạo duplicate records.
   * Invariant 9: Khác taxonomyVersion sẽ tồn tại song song, không ghi đè version cũ.
   */
  async persistDiagnosticEvidence(
    input: DiagnosticInput,
    taxonomyVersion: string = "1.0.0"
  ): Promise<number> {
    const hypotheses = this.diagnose(input);
    if (hypotheses.length === 0) {
      return 0; // NO_DIAGNOSIS
    }

    let persistedCount = 0;
    for (const hyp of hypotheses) {
      // Sử dụng Upsert với Unique Constraint: [submissionId, questionId, ruleCode, taxonomyVersion]
      await this.prisma.diagnosticEvidence.upsert({
        where: {
          submissionId_questionId_ruleCode_taxonomyVersion: {
            submissionId: input.submissionId,
            questionId: input.questionId,
            ruleCode: hyp.ruleCode,
            taxonomyVersion,
          },
        },
        create: {
          submissionId: input.submissionId,
          questionId: input.questionId,
          studentId: input.studentId,
          errorCode: hyp.errorCode,
          confidence: hyp.confidence,
          evidenceSnippet: hyp.evidenceSnippet || null,
          evaluatorType: hyp.evaluatorType,
          ruleCode: hyp.ruleCode,
          taxonomyVersion,
        },
        update: {
          // Idempotent: Giữ nguyên bằng chứng, chỉ refresh snippet/confidence nếu rule được tinh chỉnh
          errorCode: hyp.errorCode,
          confidence: hyp.confidence,
          evidenceSnippet: hyp.evidenceSnippet || null,
        },
      });
      persistedCount++;
    }

    return persistedCount;
  }
}
