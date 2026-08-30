import { genAI } from "@google/genai";

export interface ContextInferenceInput {
  normalizedTerm: string;
  contextText: string;
  analysisVersion: string;
}

export interface ContextualLearningPayload {
  normalizedTerm: string;
  ipa: string;
  partOfSpeech: string;
  coreMeaningEn: string;
  inContextExplanationVi: string;
  mentalModel?: string;
  ieltsPatterns: string[];
}

export interface ContextInferenceProvider {
  understand(input: ContextInferenceInput): Promise<ContextualLearningPayload>;
}

export class GeminiInferenceProvider implements ContextInferenceProvider {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || "";
  }

  async understand(input: ContextInferenceInput): Promise<ContextualLearningPayload> {
    if (!this.apiKey) {
      // Fallback response if API key is not configured yet
      return {
        normalizedTerm: input.normalizedTerm,
        ipa: "/.../",
        partOfSpeech: "verb",
        coreMeaningEn: "gradually weaken or diminish",
        inContextExplanationVi: `Trong ngữ cảnh này, "${input.normalizedTerm}" mang ý nghĩa tác động hoặc làm suy giảm dần tính chất/hiệu quả.`,
        mentalModel: "Hãy tưởng tượng đào xới lớp đất móng bên dưới làm mất đi độ bền nền tảng.",
        ieltsPatterns: [`${input.normalizedTerm} confidence`, `${input.normalizedTerm} public trust`],
      };
    }

    const prompt = `
    You are an expert Cognitive Linguist and IELTS 9.0 Master Instructor.
    Analyze the target expression "${input.normalizedTerm}" within this exact context sentence:
    "${input.contextText}"

    Output strict JSON adhering to this schema:
    {
      "normalizedTerm": "${input.normalizedTerm}",
      "ipa": "/IPA_PHONETIC/",
      "partOfSpeech": "verb/noun/adjective/adverb/phrase",
      "coreMeaningEn": "Brief core definition in under 10 English words",
      "inContextExplanationVi": "Explain the exact nuanced meaning in this specific sentence in 1-2 Vietnamese sentences",
      "mentalModel": "A vivid cognitive image/metaphor explaining WHY the word has this meaning (in Vietnamese)",
      "ieltsPatterns": ["Only 2-4 natural, established collocations actually relevant to this word sense. Do NOT manufacture items."]
    }
    `;

    try {
      // Call Gemini Flash via standard HTTP or SDK
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error ${response.status}`);
      }

      const resJson = await response.json();
      const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Empty Gemini response");
      }

      const parsed = JSON.parse(text);
      return {
        normalizedTerm: parsed.normalizedTerm || input.normalizedTerm,
        ipa: parsed.ipa || "",
        partOfSpeech: parsed.partOfSpeech || "",
        coreMeaningEn: parsed.coreMeaningEn || "",
        inContextExplanationVi: parsed.inContextExplanationVi || "",
        mentalModel: parsed.mentalModel || "",
        ieltsPatterns: Array.isArray(parsed.ieltsPatterns) ? parsed.ieltsPatterns : [],
      };
    } catch (err: any) {
      console.warn("[LexiconInference] Provider fallback engaged:", err.message);
      return {
        normalizedTerm: input.normalizedTerm,
        ipa: "/.../",
        partOfSpeech: "expression",
        coreMeaningEn: "meaning in context",
        inContextExplanationVi: `Nghĩa của cụm "${input.normalizedTerm}" trong ngữ cảnh này: ${input.contextText}`,
        mentalModel: "Sơ đồ tư duy liên quan đến ngữ cảnh bài đọc.",
        ieltsPatterns: [],
      };
    }
  }
}
