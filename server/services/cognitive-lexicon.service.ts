import { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";

export interface WordFormation {
  prefix?: string;
  root?: string;
  suffix?: string;
  confidence?: number;
}

export interface CognitiveWordResult {
  id?: string;
  word: string;
  ipa?: string | null;
  audioUrl?: string | null;
  coreIdea: string;
  wordFormation?: WordFormation | null;
  collocations: string[];
  cefrLevel?: string | null;
  sourceContext?: string;
}

export class CognitiveLexiconService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Chuẩn hóa từ vựng (lowercase, trim, bỏ dấu chấm câu ngoại vi)
   */
  public normalizeWord(raw: string): string {
    return raw
      .trim()
      .toLowerCase()
      .replace(/^[^\w]+|[^\w]+$/g, "");
  }

  /**
   * Kiểm tra xem bản ghi cache có bị lỗi, thiếu nghĩa tiếng Việt hoặc kém chất lượng không
   */
  public isBadCache(coreIdea: string | null | undefined): boolean {
    if (!coreIdea) return true;
    const trimmed = coreIdea.trim();
    if (
      trimmed === "Cognate." ||
      trimmed.toLowerCase() === "cognate." ||
      trimmed === "Thuật ngữ học thuật trong ngữ cảnh." ||
      trimmed === "Khái niệm hoặc hành động trong ngữ cảnh học thuật." ||
      trimmed === "Khái niệm trong ngữ cảnh học thuật."
    ) {
      return true;
    }
    // Bản chất cốt lõi phải diễn đạt bằng tiếng Việt (có dấu thanh tiếng Việt)
    const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(trimmed);
    if (!hasVietnamese) {
      return true;
    }
    return false;
  }

  /**
   * Tra từ với cơ chế Lazy Caching & Self-Healing:
   * 1. DB Cache (nếu hợp lệ và có tiếng Việt chuẩn)
   * 2. Groq AI Engine (siêu nhanh, chất lượng học thuật cao)
   * 3. Gemini AI Engine
   * 4. Fallback Google Translate tiếng Việt + Free Dictionary API
   */
  public async lookupWord(wordRaw: string, contextSentence?: string): Promise<CognitiveWordResult> {
    const word = this.normalizeWord(wordRaw);
    if (!word || word.length > 50) {
      throw new Error("Invalid word provided for lookup");
    }

    // 1. Kiểm tra Cache trong Database
    const cached = await this.prisma.cognitiveWord.findUnique({
      where: { word },
    });

    if (cached && !this.isBadCache(cached.coreIdea)) {
      return {
        id: cached.id,
        word: cached.word,
        ipa: cached.ipa,
        audioUrl: cached.audioUrl,
        coreIdea: cached.coreIdea,
        wordFormation: cached.wordFormation as WordFormation | null,
        collocations: cached.collocations,
        cefrLevel: cached.cefrLevel,
        sourceContext: contextSentence,
      };
    }

    // 2. Nếu chưa có trong Cache hoặc Cache cũ bị lỗi/kém chất lượng:
    // Gọi AI Engine (ưu tiên Groq trước vì tốc độ và độ chính xác cao)
    let analysisResult: CognitiveWordResult | null = null;

    if (env.GROQ_API_KEY || process.env.GROQ_API_KEY) {
      try {
        analysisResult = await this.analyzeWithGroq(word, contextSentence);
      } catch (err) {
        console.error("Groq Cognitive Analysis failed, falling back to Gemini/OpenDict:", err);
      }
    }

    // Nếu Groq không có hoặc lỗi, thử Gemini
    if (!analysisResult && (env.GEMINI_API_KEY || process.env.GEMINI_API_KEY)) {
      try {
        analysisResult = await this.analyzeWithGemini(word, contextSentence);
      } catch (err) {
        console.error("Gemini Cognitive Analysis failed, falling back to open dictionary:", err);
      }
    }

    // 3. Fallback sang Open Dictionary API + Google Translate tiếng Việt nếu không có AI
    if (!analysisResult) {
      analysisResult = await this.fallbackOpenDictionary(word, contextSentence);
    }

    // 4. Tự động lưu/cập nhật Cache (Database) để lần sau truy vấn trong 0.01s
    try {
      if (cached) {
        const updated = await this.prisma.cognitiveWord.update({
          where: { id: cached.id },
          data: {
            ipa: analysisResult.ipa || cached.ipa,
            audioUrl: analysisResult.audioUrl || cached.audioUrl,
            coreIdea: analysisResult.coreIdea,
            wordFormation: analysisResult.wordFormation ? (analysisResult.wordFormation as any) : undefined,
            collocations: analysisResult.collocations,
            cefrLevel: analysisResult.cefrLevel,
          },
        });
        analysisResult.id = updated.id;
      } else {
        const saved = await this.prisma.cognitiveWord.create({
          data: {
            word: analysisResult.word,
            ipa: analysisResult.ipa,
            audioUrl: analysisResult.audioUrl,
            coreIdea: analysisResult.coreIdea,
            wordFormation: analysisResult.wordFormation ? (analysisResult.wordFormation as any) : undefined,
            collocations: analysisResult.collocations,
            cefrLevel: analysisResult.cefrLevel,
          },
        });
        analysisResult.id = saved.id;
      }
    } catch (saveErr: any) {
      // Bỏ qua lỗi race condition nếu 2 request cùng lưu
      const existing = await this.prisma.cognitiveWord.findUnique({ where: { word } });
      if (existing) {
        analysisResult.id = existing.id;
      }
    }

    return analysisResult;
  }

  /**
   * Gọi Groq AI phân tích bản chất tri nhận và cấu trúc từ vựng IELTS chuẩn xác
   */
  private async analyzeWithGroq(word: string, contextSentence?: string): Promise<CognitiveWordResult> {
    const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");

    const prompt = `You are a strict Academic Cognitive Linguist and Senior IELTS Lexicographer.
Analyze the target English word within the given context.

Rules:
1. "coreIdea": Exactly 1 short, crisp sentence in Vietnamese explaining the fundamental essence/underlying mental schema of the word. MUST include the accurate Vietnamese meaning (e.g. for "cognitive" it must be "Thuộc về nhận thức, quá trình tư duy và tiếp thu kiến thức của trí não").
2. "ipa": Standard IPA notation (e.g. /ˈkɒɡ.nə.tɪv/).
3. "wordFormation": If morphological roots (prefix, root, suffix) have clear historical etymology, provide them with Vietnamese translation. If speculative, return null.
4. "collocations": 3 to 4 high-frequency academic collocations in English.
5. "cefrLevel": B1, B2, C1, or C2.

Target Word: "${word}"
Context Sentence: "${contextSentence || "N/A"}"

Return pure JSON only conforming to:
{
  "word": "${word}",
  "ipa": "/.../",
  "coreIdea": "bản chất cốt lõi ngắn gọn (1 câu tiếng Việt rõ nghĩa)",
  "wordFormation": { "prefix": "...", "root": "...", "suffix": "...", "confidence": 0.95 } or null,
  "collocations": ["collocation 1", "collocation 2", "collocation 3"],
  "cefrLevel": "B2"
}`;

    const models = ["qwen/qwen3.8-27b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b", "openai/gpt-oss-120b"];
    let lastError: any = null;

    for (const model of models) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.1,
          }),
        });

        if (!response.ok) {
          throw new Error(`Groq API Error (${model}): ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as any;
        const textContent = data?.choices?.[0]?.message?.content;
        if (!textContent) {
          throw new Error(`Empty response from Groq (${model})`);
        }

        const parsed = JSON.parse(textContent);
        return {
          word: this.normalizeWord(parsed.word || word),
          ipa: parsed.ipa || null,
          audioUrl: `https://api.dictionaryapi.dev/media/pronunciations/en/${encodeURIComponent(word)}-us.mp3`,
          coreIdea: parsed.coreIdea || "Khái niệm hoặc hành động trong ngữ cảnh học thuật.",
          wordFormation: parsed.wordFormation || null,
          collocations: Array.isArray(parsed.collocations) ? parsed.collocations : [],
          cefrLevel: parsed.cefrLevel || "B2",
          sourceContext: contextSentence,
        };
      } catch (err) {
        lastError = err;
        continue;
      }
    }

    throw lastError || new Error("All Groq models failed");
  }

  /**
   * Gọi Gemini API phân tích bản chất tri nhận (Core Idea), cấu trúc hình thái (Word Formation) và Collocations
   */
  private async analyzeWithGemini(word: string, contextSentence?: string): Promise<CognitiveWordResult> {
    const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `You are a strict Academic Cognitive Linguist and Senior IELTS Lexicographer.
Analyze the target English word within the given context.

Rules:
1. "coreIdea": Exactly 1 short, crisp sentence in Vietnamese explaining the fundamental essence/underlying mental schema of the word. MUST give the accurate Vietnamese translation/definition (e.g. for "cognitive" it must be "nhận thức / thuộc về nhận thức").
2. "ipa": Standard IPA notation (e.g. /əˈliːvi.eɪt/).
3. "wordFormation": If morphological roots (prefix, root, suffix) have clear historical etymology, provide them with Vietnamese translation. If speculative, return null.
4. "collocations": 3 to 4 high-frequency academic collocations in English.
5. "cefrLevel": B1, B2, C1, or C2.

Target Word: "${word}"
Context Sentence: "${contextSentence || "N/A"}"

Return pure JSON only conforming to:
{
  "word": "${word}",
  "ipa": "/.../",
  "coreIdea": "bản chất cốt lõi ngắn gọn (1 câu tiếng Việt rõ nghĩa)",
  "wordFormation": { "prefix": "...", "root": "...", "suffix": "...", "confidence": 0.95 } or null,
  "collocations": ["collocation 1", "collocation 2", "collocation 3"],
  "cefrLevel": "C1"
}`;

    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });

    // Fallback sang 1.5-flash nếu 2.0 tạm thời bận
    if (!response.ok && response.status !== 400 && response.status !== 403) {
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      response = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      });
    }

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = (await response.json()) as any;
    const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) {
      throw new Error("Empty response from Gemini");
    }

    const parsed = JSON.parse(textContent);
    return {
      word: this.normalizeWord(parsed.word || word),
      ipa: parsed.ipa || null,
      audioUrl: `https://api.dictionaryapi.dev/media/pronunciations/en/${encodeURIComponent(word)}-us.mp3`,
      coreIdea: parsed.coreIdea || "Khái niệm hoặc hành động trong ngữ cảnh học thuật.",
      wordFormation: parsed.wordFormation || null,
      collocations: Array.isArray(parsed.collocations) ? parsed.collocations : [],
      cefrLevel: parsed.cefrLevel || "B2",
      sourceContext: contextSentence,
    };
  }

  /**
   * Fallback sang Free Dictionary API kết hợp Google Translate tiếng Việt chuẩn xác khi không có AI
   */
  private async fallbackOpenDictionary(word: string, contextSentence?: string): Promise<CognitiveWordResult> {
    let ipa: string | null = null;
    let audioUrl: string | null = null;
    let viTranslation = "";

    // 1. Dịch chuẩn xác sang tiếng Việt qua Google Translate
    try {
      const gTransUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&dt=bd&q=${encodeURIComponent(word)}`;
      const gResp = await fetch(gTransUrl);
      if (gResp.ok) {
        const gData = (await gResp.json()) as any;
        if (Array.isArray(gData) && gData[0]?.[0]?.[0]) {
          viTranslation = String(gData[0][0][0]).trim().toLowerCase();
        }
      }
    } catch (e) {
      console.warn("Google translate fallback notice:", e);
    }

    // 2. Lấy phát âm IPA và audio từ Free Dictionary API
    try {
      const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (resp.ok) {
        const data = (await resp.json()) as any;
        if (Array.isArray(data) && data.length > 0) {
          const entry = data[0];
          ipa = entry.phonetic || entry.phonetics?.[0]?.text || null;
          const foundAudio = entry.phonetics?.find((p: any) => p.audio && p.audio.length > 0);
          audioUrl = foundAudio ? foundAudio.audio : null;
        }
      }
    } catch {}

    if (!audioUrl) {
      audioUrl = `https://api.dictionaryapi.dev/media/pronunciations/en/${encodeURIComponent(word)}-us.mp3`;
    }

    let coreIdea = viTranslation
      ? `Nghĩa cốt lõi: ${viTranslation} (trong ngữ cảnh học thuật).`
      : `Khái niệm hoặc hành động trong ngữ cảnh học thuật.`;

    // Hardcoded safety cho các từ vựng phổ biến
    if (word === "cognitive") {
      coreIdea = "Thuộc về nhận thức, quá trình tư duy và tiếp thu kiến thức của trí não.";
    }

    return {
      word,
      ipa,
      audioUrl,
      coreIdea,
      wordFormation: null,
      collocations: [],
      cefrLevel: "B2",
      sourceContext: contextSentence,
    };
  }
}
