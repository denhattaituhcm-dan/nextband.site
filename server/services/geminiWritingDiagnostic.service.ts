import {
  SentenceFeedbackItem,
  DiscourseFeedbackItem,
  EssayDiagnosticPayload,
} from "../types/diagnostic.js";
import { env } from "../config/env.js";

export interface WritingAiDiagnosisRequest {
  essayText: string;
  promptText?: string;
  taskType?: "task1" | "task2" | "general";
}

export interface WritingAiDiagnosisResponse {
  success: boolean;
  essayDiagnostic: EssayDiagnosticPayload;
  discourseFeedbacks: DiscourseFeedbackItem[];
  sentenceFeedbacks: SentenceFeedbackItem[];
  error?: string;
}

export class GeminiWritingDiagnosticService {
  private getApiKey(): string | null {
    return env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || null;
  }

  public async diagnoseEssay(req: WritingAiDiagnosisRequest): Promise<WritingAiDiagnosisResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return {
        success: false,
        essayDiagnostic: {
          bandScores: {},
          summary: {
            strengths: [],
            primaryWeakness: "GEMINI_API_KEY chưa được cấu hình trên server.",
            actionableAdvice: "Vui lòng liên hệ quản trị viên để bổ sung khóa API.",
          },
        },
        discourseFeedbacks: [],
        sentenceFeedbacks: [],
        error: "GEMINI_API_KEY is not configured.",
      };
    }

    if (!req.essayText || req.essayText.trim().length === 0) {
      return {
        success: false,
        essayDiagnostic: {
          bandScores: {},
          summary: {
            strengths: [],
            primaryWeakness: "Bài làm trống.",
            actionableAdvice: "Học sinh cần nộp bài có nội dung để thực hiện chấm bài.",
          },
        },
        discourseFeedbacks: [],
        sentenceFeedbacks: [],
        error: "Empty essay content",
      };
    }

    const systemInstruction = `
Bạn là một Giám khảo & Trợ lý Chấm bài IELTS Writing chuyên sâu (Senior IELTS Examiner Assistant).
Nhiệm vụ của bạn là CHẤM SƠ BỘ VÀ GẮN NHÃN LỖI ĐỂ HỖ TRỢ GIÁO VIÊN DUYỆT BÀI.
Bạn TUÂN THỦ NGHIÊM NGẶT KIẾN TRÚC CHẨN ĐOÁN 3 TẦNG (3-TIER WRITING DIAGNOSIS):

1. TẦNG 1: SENTENCE DIAGNOSIS (Phạm vi: Từng câu cụ thể, scope="SENTENCE")
Chỉ gắn lỗi khi câu đó thực sự có lỗi ngữ pháp, chính tả hoặc dùng từ sai. KHÔNG biến câu bình thường thành lỗi chỉ vì câu đó "chưa xuất sắc".
- category:
  + "GRAMMAR" (cho GRA: SUBJECT_VERB_AGREEMENT, TENSE_ASPECT, ARTICLE_DETERMINER, PREPOSITION, WORD_FORM, PRONOUN_REFERENCE, SENTENCE_FRAGMENT, RUN_ON_PUNCTUATION, PASSIVE_VOICE, RELATIVE_CLAUSE)
  + "EXPRESSION" (cho LR: SPELLING_TYPO, WORD_CHOICE, COLLOCATION, REPETITION, AWKWARD_PHRASING, INFORMAL_REGISTER)
  + "PRAISE" (cho câu xuất sắc: GOOD_COLLOCATION_VOCAB, COMPLEX_ACCURATE_STRUCTURE)
- tag: Phải là một trong các Enum trên.
- severity: "CRITICAL" (sai nghiêm trọng ảnh hưởng giao tiếp) | "MAJOR" | "MODERATE" | "MINOR" (lỗi nhỏ/typo) | "PRAISE".
- originalSentence: Đúng câu gốc trong bài.
- suggestedSentence: Câu sửa lại tự nhiên, chuẩn xác ngữ pháp và phong cách học thuật.
- note: Giải thích lỗi ngắn gọn bằng tiếng Việt dễ hiểu cho giáo viên và học sinh.

2. TẦNG 2: DISCOURSE DIAGNOSIS (Phạm vi: Cấp đoạn văn, scope="PARAGRAPH")
KHÔNG gắn lỗi cấp đoạn vào từng câu đơn lẻ! Đánh giá cấu trúc, tính mạch lạc và lập luận của từng đoạn (paragraphIndex bắt đầu từ 0):
- category:
  + "COHERENCE_COHESION":
    tag: MISSING_TRANSITION | OVERUSED_MECHANICAL_LINKERS | COHESION_BREAK | TOPIC_SENTENCE_UNCLEAR | PARAGRAPH_UNITY
  + "ARGUMENTATION_TASK":
    tag: WEAK_EXPLANATION | WEAK_SUPPORTING_EXAMPLE | UNDERDEVELOPED_ARGUMENT | LOGICAL_CONTRADICTION
- severity: "MAJOR" | "MODERATE" | "MINOR"
- note: Nhận xét bằng tiếng Việt chỉ rõ điểm yếu trong cách liên kết hoặc cách phát triển ý của đoạn văn.

3. TẦNG 3: ESSAY DIAGNOSIS (Phạm vi: Toàn bài viết, scope="ESSAY")
- bandScores: Đưa ra ước lượng band theo 4 tiêu chí IELTS từ 1.0 đến 9.0 (bước nhảy 0.5):
  + taskResponse (TR)
  + coherence (CC)
  + lexical (LR)
  + grammar (GRA)
  + overall: Band trung bình làm tròn theo quy tắc IELTS.
- summary:
  + strengths: Danh sách 2-3 điểm sáng lớn nhất của bài.
  + primaryWeakness: Nhược điểm cốt lõi lớn nhất cần khắc phục ngay.
  + actionableAdvice: 1 lời khuyên hành động cụ thể để cải thiện band điểm ở bài viết tiếp theo.

Ngôn ngữ trong trường note/summary: Tiếng Việt sư phạm, súc tích, mang tính xây dựng.
Bắt buộc trả về đúng định dạng JSON không bọc markdown theo cấu trúc:
{
  "essayDiagnostic": {
    "bandScores": { "taskResponse": 6.5, "coherence": 6.0, "lexical": 6.5, "grammar": 6.0, "overall": 6.0 },
    "summary": { "strengths": [...], "primaryWeakness": "...", "actionableAdvice": "..." }
  },
  "discourseFeedbacks": [
    { "scope": "PARAGRAPH", "paragraphIndex": 0, "category": "COHERENCE_COHESION", "tag": "MISSING_TRANSITION", "severity": "MODERATE", "note": "..." }
  ],
  "sentenceFeedbacks": [
    { "scope": "SENTENCE", "sentenceIndex": 0, "originalSentence": "...", "category": "GRAMMAR", "tag": "SUBJECT_VERB_AGREEMENT", "severity": "CRITICAL", "note": "...", "suggestedSentence": "..." }
  ]
}
`;

    const userPrompt = `
Đề bài (Prompt/Question):
${req.promptText || "IELTS Writing Task"}

Bài viết của học sinh (Student's Essay):
${req.essayText}
`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    };

    // Candidate models in priority order: configured model -> gemini-2.5-flash -> gemini-2.0-flash -> gemini-1.5-flash
    const candidateModels = Array.from(
      new Set(
        [
          process.env.GEMINI_MODEL,
          "gemini-2.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
        ].filter(Boolean) as string[]
      )
    );

    let lastError = "";

    for (const model of candidateModels) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          lastError = `HTTP ${response.status} (${model}): ${errorText}`;
          // If model not found (404) or bad request on model name, try next fallback model
          if (response.status === 404 || response.status === 400 || response.status === 503) {
            continue;
          }
          break;
        }

        const data: any = await response.json();
        const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawJson) {
          lastError = `Empty candidate response from Gemini (${model})`;
          continue;
        }

        const parsed = JSON.parse(rawJson);
        return {
          success: true,
          essayDiagnostic: parsed.essayDiagnostic || {
            bandScores: parsed.bandScores || {},
            summary: parsed.summary || { strengths: [], primaryWeakness: "", actionableAdvice: "" },
          },
          discourseFeedbacks: Array.isArray(parsed.discourseFeedbacks) ? parsed.discourseFeedbacks : [],
          sentenceFeedbacks: Array.isArray(parsed.sentenceFeedbacks) ? parsed.sentenceFeedbacks : [],
        };
      } catch (err: any) {
        lastError = err.message || "Unknown error";
      }
    }

    return {
      success: false,
      essayDiagnostic: {
        bandScores: {},
        summary: {
          strengths: [],
          primaryWeakness: "Lỗi xử lý khi gọi Gemini API.",
          actionableAdvice: lastError,
        },
      },
      discourseFeedbacks: [],
      sentenceFeedbacks: [],
      error: lastError || "Failed to generate diagnostic from all candidate Gemini models",
    };
  }
}
