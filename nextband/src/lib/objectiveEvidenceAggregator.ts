export interface QuestionTypeMetadata {
  typeKey: string;
  labelVi: string;
  skill: "Reading" | "Listening" | "Reading / Listening";
  descriptionVi: string;
  remediationAdvice: string;
}

export interface QuestionTypeStat {
  questionType: string;
  labelVi: string;
  skill: string;
  descriptionVi: string;
  remediationAdvice: string;
  total: number;
  correct: number;
  incorrect: number;
  accuracyPercent: number;
  status: "CRITICAL_WEAKNESS" | "NEEDS_IMPROVEMENT" | "STRONG_MASTERY";
  incorrectQuestionIds: string[];
}

export interface DeterministicErrorItem {
  questionId: string;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  errorType: "WORD_LIMIT_BREACH" | "SPELLING_ERROR";
  labelVi: string;
  explanation: string;
}

export interface ObjectiveBattleDebrief {
  totalQuestions: number;
  totalCorrect: number;
  overallAccuracyPercent: number;
  weakestType: QuestionTypeStat | null;
  typeStats: QuestionTypeStat[];
  criticalWeaknesses: QuestionTypeStat[];
  strengths: QuestionTypeStat[];
  deterministicErrors: DeterministicErrorItem[];
}

export const QUESTION_TYPE_METADATA: Record<string, QuestionTypeMetadata> = {
  true_false_not_given: {
    typeKey: "true_false_not_given",
    labelVi: "True / False / Not Given",
    skill: "Reading",
    descriptionVi: "Xác định tính chính xác của thông tin so với nội dung văn bản.",
    remediationAdvice: "Lưu ý phân biệt rõ giữa FALSE (thông tin trái ngược bài đọc) và NOT GIVEN (bài đọc không đề cập).",
  },
  yes_no_not_given: {
    typeKey: "yes_no_not_given",
    labelVi: "Yes / No / Not Given",
    skill: "Reading",
    descriptionVi: "Xác định quan điểm, thái độ hoặc lập luận của tác giả bài viết.",
    remediationAdvice: "Tập trung tìm kiếm các từ khóa chỉ quan điểm (believes, argues, claims) thay vì chỉ nhìn thông tin khách quan.",
  },
  matching_headings: {
    typeKey: "matching_headings",
    labelVi: "Nối tiêu đề đoạn văn (Matching Headings)",
    skill: "Reading",
    descriptionVi: "Nắm bắt ý chính (Main Idea) và cấu trúc triển khai của từng đoạn văn.",
    remediationAdvice: "Đọc câu đầu, câu cuối và quét nhanh toàn đoạn để hiểu ý bao quát, tránh bị bẫy bởi từ khóa chi tiết.",
  },
  matching: {
    typeKey: "matching",
    labelVi: "Nối thông tin / Đặc điểm (Matching)",
    skill: "Reading / Listening",
    descriptionVi: "Đối chiếu thông tin cụ thể (tên người, địa điểm, sự kiện) với các nhận định tương ứng.",
    remediationAdvice: "Gạch chân tên riêng hoặc từ khóa mốc để scan vị trí xuất hiện trong bài đọc trước khi ghép nối.",
  },
  multiple_choice: {
    typeKey: "multiple_choice",
    labelVi: "Trắc nghiệm nhiều lựa chọn (Multiple Choice)",
    skill: "Reading / Listening",
    descriptionVi: "Phân tích và lựa chọn đáp án chính xác nhất giữa các phương án gây nhiễu (distractors).",
    remediationAdvice: "Dùng phương pháp loại trừ: Gạch bỏ các phương án có từ tuyệt đối (always, completely) hoặc bị bóp méo ngữ cảnh.",
  },
  fill_blank: {
    typeKey: "fill_blank",
    labelVi: "Điền từ vào chỗ trống (Completion)",
    skill: "Reading / Listening",
    descriptionVi: "Điền từ vào đoạn tóm tắt, câu đơn hoặc sơ đồ/bảng biểu.",
    remediationAdvice: "Luôn kiểm tra giới hạn số từ (NO MORE THAN X WORDS) và dạng từ (danh/tính/động, số ít/số nhiều) cần điền.",
  },
  short_answer: {
    typeKey: "short_answer",
    labelVi: "Trả lời câu hỏi ngắn (Short Answer)",
    skill: "Reading / Listening",
    descriptionVi: "Trả lời câu hỏi bằng thông tin trực tiếp lấy từ bài đọc/bài nghe.",
    remediationAdvice: "Lấy chính xác từ ngữ trong văn bản, không tự ý thay đổi dạng từ nếu không được yêu cầu.",
  },
  listening: {
    typeKey: "listening",
    labelVi: "Trắc nghiệm / Điền từ bài Nghe (Listening)",
    skill: "Listening",
    descriptionVi: "Xử lý thông tin và nhận diện bẫy nói trong đoạn audio.",
    remediationAdvice: "Đọc trước câu hỏi để dự đoán loại thông tin cần nghe (con số, tên người, danh từ hay động từ).",
  },
};

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,      // deletion
          dp[i][j - 1] + 1,      // insertion
          dp[i - 1][j - 1] + 1   // substitution
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * Evaluates whether a question is answered correctly based on score or string match
 */
export function isQuestionAnswerCorrect(
  score: number | null | undefined,
  studentAnswer: string | null | undefined,
  correctAnswer: string | null | undefined
): boolean {
  if (score != null && !isNaN(score)) {
    return score > 0;
  }
  if (!studentAnswer || !correctAnswer) return false;

  const normalize = (s: string) => s.trim().toLowerCase();
  const std = normalize(studentAnswer);
  const alternatives = correctAnswer
    .split("|")
    .map(normalize)
    .filter(Boolean);

  return alternatives.includes(std);
}

/**
 * Aggregates objective performance grouped by Question Type for Reading/Listening
 */
export function aggregateObjectiveBattleDebrief(
  questions: Array<{
    id: string;
    questionType: string;
    questionText?: string;
    correctAnswer?: string | null;
  }>,
  answersMap: Record<string, { answerText?: string | null; score?: number | null }>
): ObjectiveBattleDebrief {
  const typeMap: Record<string, { total: number; correct: number; incorrectIds: string[] }> = {};
  const deterministicErrors: DeterministicErrorItem[] = [];

  let totalQuestions = 0;
  let totalCorrect = 0;

  for (const q of questions) {
    const qType = q.questionType || "multiple_choice";
    const answer = answersMap[q.id];
    const stdAns = answer?.answerText || "";
    const isCorrect = isQuestionAnswerCorrect(answer?.score, stdAns, q.correctAnswer);

    totalQuestions++;
    if (isCorrect) totalCorrect++;

    if (!typeMap[qType]) {
      typeMap[qType] = { total: 0, correct: 0, incorrectIds: [] };
    }
    typeMap[qType].total++;

    if (isCorrect) {
      typeMap[qType].correct++;
    } else {
      typeMap[qType].incorrectIds.push(q.id);

      // Check for deterministic fill-in-the-blank errors
      if (qType === "fill_blank" || qType === "short_answer") {
        const studentWords = stdAns.trim().split(/\s+/).filter(Boolean);
        const correctAlternatives = (q.correctAnswer || "").split("|").map((s) => s.trim());
        const primaryCorrect = correctAlternatives[0] || "";
        const correctWords = primaryCorrect.split(/\s+/).filter(Boolean);

        // 1. Word Limit Breach Check: student wrote more words than the longest correct alternative
        const maxExpectedWords = Math.max(...correctAlternatives.map((c) => c.split(/\s+/).length), 1);
        if (studentWords.length > maxExpectedWords) {
          deterministicErrors.push({
            questionId: q.id,
            questionText: q.questionText || "Câu hỏi điền từ",
            studentAnswer: stdAns,
            correctAnswer: primaryCorrect,
            errorType: "WORD_LIMIT_BREACH",
            labelVi: "Vượt quá số từ quy định",
            explanation: `Bạn đã viết ${studentWords.length} từ trong khi đáp án chỉ cho phép tối đa ${maxExpectedWords} từ.`,
          });
        }
        // 2. Spelling Error Check: word count matches, but edit distance is 1-2
        else if (stdAns.length > 3 && primaryCorrect.length > 3) {
          const minDistance = Math.min(
            ...correctAlternatives.map((c) => levenshteinDistance(stdAns.toLowerCase(), c.toLowerCase()))
          );
          if (minDistance >= 1 && minDistance <= 2) {
            deterministicErrors.push({
              questionId: q.id,
              questionText: q.questionText || "Câu hỏi điền từ",
              studentAnswer: stdAns,
              correctAnswer: primaryCorrect,
              errorType: "SPELLING_ERROR",
              labelVi: "Lỗi chính tả (Gần đúng)",
              explanation: `Bạn gõ '${stdAns}', đáp án chuẩn xác là '${primaryCorrect}' (lệch ${minDistance} ký tự).`,
            });
          }
        }
      }
    }
  }

  const typeStats: QuestionTypeStat[] = Object.entries(typeMap).map(([typeKey, data]) => {
    const meta = QUESTION_TYPE_METADATA[typeKey] || {
      typeKey,
      labelVi: typeKey.replace(/_/g, " ").toUpperCase(),
      skill: "Reading / Listening",
      descriptionVi: "Dạng bài trắc nghiệm khách quan.",
      remediationAdvice: "Rèn luyện thêm các kỹ thuật đọc quét và định vị thông tin.",
    };

    const accuracyPercent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    const incorrect = data.total - data.correct;

    let status: "CRITICAL_WEAKNESS" | "NEEDS_IMPROVEMENT" | "STRONG_MASTERY" = "NEEDS_IMPROVEMENT";
    if (accuracyPercent < 50 && incorrect > 0) {
      status = "CRITICAL_WEAKNESS";
    } else if (accuracyPercent >= 75) {
      status = "STRONG_MASTERY";
    }

    return {
      questionType: typeKey,
      labelVi: meta.labelVi,
      skill: meta.skill,
      descriptionVi: meta.descriptionVi,
      remediationAdvice: meta.remediationAdvice,
      total: data.total,
      correct: data.correct,
      incorrect,
      accuracyPercent,
      status,
      incorrectQuestionIds: data.incorrectIds,
    };
  });

  // Sort: lowest accuracy first
  typeStats.sort((a, b) => a.accuracyPercent - b.accuracyPercent);

  const criticalWeaknesses = typeStats.filter((t) => t.status === "CRITICAL_WEAKNESS");
  const strengths = typeStats.filter((t) => t.status === "STRONG_MASTERY");
  const weakestType = typeStats.find((t) => t.incorrect > 0) || null;

  const overallAccuracyPercent =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    totalCorrect,
    overallAccuracyPercent,
    weakestType,
    typeStats,
    criticalWeaknesses,
    strengths,
    deterministicErrors,
  };
}
