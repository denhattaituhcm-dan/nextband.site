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
   * Tra từ với cơ chế Lazy Caching (DB -> Gemini API -> Open Dictionary API fallback)
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

    if (cached) {
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

    // 2. Nếu chưa có trong Cache: Gọi AI Engine (Gemini / LLM) để phân tích tri nhận chuẩn học thuật
    let analysisResult: CognitiveWordResult | null = null;
    if (env.GEMINI_API_KEY || process.env.GEMINI_API_KEY) {
      try {
        analysisResult = await this.analyzeWithGemini(word, contextSentence);
      } catch (err) {
        console.error("Gemini Cognitive Analysis failed, falling back to open dictionary:", err);
      }
    }

    // 3. Fallback sang Open Dictionary API nếu không có Gemini hoặc API lỗi
    if (!analysisResult) {
      analysisResult = await this.fallbackOpenDictionary(word, contextSentence);
    }

    // 4. Tự động lưu vào Cache (Database) để lần sau truy vấn trong 0.01s
    try {
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
    } catch (saveErr: any) {
      // Bỏ qua lỗi duplicate key race condition nếu 2 request cùng lưu
      const existing = await this.prisma.cognitiveWord.findUnique({ where: { word } });
      if (existing) {
        analysisResult.id = existing.id;
      }
    }

    return analysisResult;
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
1. "coreIdea": Exactly 1 short, crisp sentence in Vietnamese explaining the fundamental essence/underlying mental schema of the word (DO NOT write verbose philosophical paragraphs).
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
  "coreIdea": "bản chất cốt lõi ngắn gọn (1 câu tiếng Việt)",
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
   * Fallback sang Free Dictionary API khi không có AI
   */
  private async fallbackOpenDictionary(word: string, contextSentence?: string): Promise<CognitiveWordResult> {
    let ipa: string | null = null;
    let audioUrl: string | null = null;
    let definition = "Thuật ngữ học thuật trong ngữ cảnh.";

    try {
      const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (resp.ok) {
        const data = (await resp.json()) as any;
        if (Array.isArray(data) && data.length > 0) {
          const entry = data[0];
          ipa = entry.phonetic || entry.phonetics?.[0]?.text || null;
          const foundAudio = entry.phonetics?.find((p: any) => p.audio && p.audio.length > 0);
          audioUrl = foundAudio ? foundAudio.audio : null;
          const firstDef = entry.meanings?.[0]?.definitions?.[0]?.definition;
          if (firstDef) {
            definition = firstDef;
          }
        }
      }
    } catch {}

    return {
      word,
      ipa,
      audioUrl,
      coreIdea: definition,
      wordFormation: null,
      collocations: [],
      cefrLevel: "B2",
      sourceContext: contextSentence,
    };
  }
}
