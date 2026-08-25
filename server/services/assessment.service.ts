import { PrismaClient } from "@prisma/client";
import { canonicalPlacementTestPayload, SanitizedPlacementTestPayload, SanitizedQuestion } from "../data/placement-test/questions.js";
import { authoritativePlacementAnswerKeys, AuthoritativeAnswerKey } from "../data/placement-test/answerKeys.js";
import { toFileUrl } from "../utils/file.js";

// Rate limiting in-memory trackers
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const phoneRateLimitMap = new Map<string, { count: number; resetAt: number }>();

// In-memory session cache for speed & resilience
const inMemoryAssessmentSessions = new Map<string, AssessmentSessionRecord>();

export interface AssessmentSessionRecord {
  id: string;
  examId?: string | null;
  candidateName: string;
  phone: string;
  targetBand: string;
  status: "ACTIVE" | "SUBMITTED" | "EXPIRED";
  answers: Record<string, any>;
  objectiveScore?: {
    rawCorrect: number;
    totalQuestions: number;
    accuracyPercent: number;
    listeningCorrect: number;
    listeningTotal: number;
    readingCorrect: number;
    readingTotal: number;
    grammarCorrect: number;
    grammarTotal: number;
  } | null;
  subjectiveStatus: "NONE" | "PENDING_REVIEW" | "REVIEWED";
  result?: DiagnosticReport | null;
  startedAt: Date;
  expiresAt: Date;
  submittedAt?: Date | null;
  ipAddress?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillScoreReportItem {
  correct: number;
  total: number;
  scorePercent: number;
  estimatedBand?: string;
  level?: string;
  feedback: string;
}

export interface DiagnosticReport {
  sessionId: string;
  candidateName: string;
  phone: string;
  targetBand: string;
  arisLevel: {
    levelNumber: number;
    levelTitle: string;
    estimatedIeltsRange: string;
    description: string;
    recommendedCourse: {
      slug: string;
      title: string;
      targetBand: string;
      level: string;
      summary: string;
    };
  };
  objectiveBreakdown: {
    rawScore: number;
    totalQuestions: number;
    accuracyPercent: number;
    preliminaryRange?: string;
    listening: SkillScoreReportItem;
    reading: SkillScoreReportItem;
    grammar: SkillScoreReportItem;
  };
  subjectiveEvaluation: {
    status: "NONE" | "PENDING_REVIEW" | "REVIEWED";
    hasWritingSubmission: boolean;
    hasSpeakingRecording: boolean;
    writing?: {
      submitted: boolean;
      status: string;
      message: string;
    };
    speaking?: {
      submitted: boolean;
      status: string;
      message: string;
    };
    note: string;
  };
  strengths: string[];
  weaknesses: string[];
  diagnosticEngineVersion?: string;
  scoringVersion?: string;
  questionSetVersion?: string;
  diagnosticRubricVersion?: string;
  submittedAt: string;
}

export function calculateEstimatedSkillBand(correct: number, total: number): { band: string; level: string } {
  if (total <= 0) return { band: "≈ 3.0", level: "Foundation (Cơ bản)" };

  // For Grammar (15 questions)
  if (total === 15) {
    if (correct >= 11) return { band: "Advanced", level: "Advanced (Nâng cao)" };
    if (correct >= 6) return { band: "Intermediate", level: "Intermediate (Trung cấp)" };
    return { band: "Foundation", level: "Foundation (Cơ bản)" };
  }

  // For Listening & Reading (10 questions each)
  if (correct >= 9) return { band: "≈ 6.5+", level: "Advanced (Nâng cao)" };
  if (correct >= 7) return { band: "≈ 6.0", level: "Upper-Intermediate (Khá - Giỏi)" };
  if (correct >= 5) return { band: "≈ 5.0", level: "Intermediate (Trung cấp)" };
  if (correct >= 3) return { band: "≈ 4.0", level: "Elementary (Sơ cấp)" };
  return { band: "≈ 3.0", level: "Foundation (Khởi nền)" };
}

/**
 * Derive preliminary receptive skills profile range directly from Listening & Reading estimates
 */
export function derivePreliminaryProfileRange(
  listeningBandStr?: string,
  readingBandStr?: string,
  hasAttemptedData: boolean = true
): string {
  if (!hasAttemptedData) return "Chưa đủ dữ liệu";

  const parseBandNum = (str?: string): number | null => {
    if (!str) return null;
    const match = str.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
  };

  const lNum = parseBandNum(listeningBandStr);
  const rNum = parseBandNum(readingBandStr);

  if (lNum == null && rNum == null) return "5.0 – 6.0";
  if (lNum != null && rNum == null) return `${lNum.toFixed(1)}${lNum >= 6.5 ? "+" : ""}`;
  if (lNum == null && rNum != null) return `${rNum.toFixed(1)}${rNum >= 6.5 ? "+" : ""}`;

  const min = Math.min(lNum!, rNum!);
  const max = Math.max(lNum!, rNum!);

  if (min === max) {
    return `${min.toFixed(1)}${min >= 6.5 ? "+" : ""}`;
  }

  const maxSuffix = max >= 6.5 ? "+" : "";
  return `${min.toFixed(1)} – ${max.toFixed(1)}${maxSuffix}`;
}

export function mapRawScoreToArisLevel(correctCount: number, totalQuestions: number = 35) {
  const percentage = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);

  if (percentage < 25) {
    return {
      levelNumber: 1,
      levelTitle: "Cấp 1 — Khởi Nền (Starter)",
      estimatedIeltsRange: "Band 2.5 – 3.5",
      description: "Thí sinh có vốn từ vựng ban đầu, cần củng cố lại phương pháp xây nền ngữ âm IPA và cấu trúc câu đơn hoàn chỉnh trước khi luyện đề.",
      recommendedCourse: {
        slug: "starter",
        title: "Khóa STARTER (Xây Nền 44 Âm IPA & Câu Đơn)",
        targetBand: "Mục tiêu: Đạt chuẩn 3.5+",
        level: "Beginner",
        summary: "Huấn luyện chuẩn xác 44 âm IPA, làm chủ cấu trúc câu đơn và 800 từ vựng cốt lõi theo phương pháp The ARIS Way.",
      },
    };
  }
  if (percentage < 45) {
    return {
      levelNumber: 2,
      levelTitle: "Cấp 2 — Tập Sự (Dreamer)",
      estimatedIeltsRange: "Band 3.5 – 4.5",
      description: "Đã có phản xạ nghe và hiểu các hội thoại quen thuộc. Cần mở rộng câu ghép, mệnh đề quan hệ và củng cố ngữ pháp trung cấp.",
      recommendedCourse: {
        slug: "dreamer",
        title: "Khóa DREAMER (Mở Rộng Từ Vựng & Phản Xạ Nghe)",
        targetBand: "Mục tiêu: Đạt chuẩn 4.5 – 5.0",
        level: "Elementary",
        summary: "Làm chủ các thì hoàn thành, mệnh đề quan hệ và xây dựng phản xạ nghe - nói qua các ngữ cảnh thực tế.",
      },
    };
  }
  if (percentage < 65) {
    return {
      levelNumber: 3,
      levelTitle: "Cấp 3 — Học Sĩ (Builder)",
      estimatedIeltsRange: "Band 5.0 – 5.5",
      description: "Nền tảng từ vựng và ngữ pháp khá vững. Cần chuyên sâu rèn luyện câu phức nhiều mệnh đề, các dạng bài suy luận logic IELTS và collocations học thuật.",
      recommendedCourse: {
        slug: "builder",
        title: "Khóa BUILDER (Làm Chủ Câu Phức & Đọc Hiểu Học Thuật)",
        targetBand: "Mục tiêu: Đạt chuẩn 5.5 – 6.0",
        level: "Intermediate",
        summary: "Huấn luyện kỹ thuật Scanning, Skimming chuyên sâu và bóc tách các bài đọc học thuật Cambridge nâng cao.",
      },
    };
  }
  if (percentage < 82) {
    return {
      levelNumber: 4,
      levelTitle: "Cấp 4 — Học Sư (Master)",
      estimatedIeltsRange: "Band 6.0 – 6.5",
      description: "Kỹ năng xử lý bài đọc và bài nghe rất tốt. Cần rèn luyện tư duy lập luận phản biện, bứt phá bài viết Task 2 và nói chuyên sâu Part 2-3.",
      recommendedCourse: {
        slug: "master",
        title: "Khóa MASTER (Bứt Phá Writing Task 2 & Speaking)",
        targetBand: "Mục tiêu: Đạt chuẩn 6.5 – 7.0",
        level: "Upper-Intermediate",
        summary: "Rèn luyện tư duy phản biện theo phương pháp The ARIS Way, tối ưu hóa điểm Lexical Resource và Coherence.",
      },
    };
  }
  if (percentage < 92) {
    return {
      levelNumber: 5,
      levelTitle: "Cấp 5 — Học Bá (Achiever)",
      estimatedIeltsRange: "Band 7.0 – 7.5",
      description: "Trình độ tiếng Anh học thuật xuất sắc. Phản xạ tự nhiên và độ chính xác ngữ pháp cao. Đề xuất luyện chiến thuật tối ưu hóa điểm số tuyệt đối.",
      recommendedCourse: {
        slug: "leader",
        title: "Khóa LEADER (Tối Ưu Điểm Số & Độ Nhạy Học Thuật)",
        targetBand: "Mục tiêu: Bứt phá 7.5 – 8.0+",
        level: "Advanced",
        summary: "Huấn luyện chuyên sâu cùng Giảng viên 8.5+ IELTS, tinh chỉnh collocations cao cấp và chiến thuật phòng thi đỉnh cao.",
      },
    };
  }
  return {
    levelNumber: 6,
    levelTitle: "Cấp 6 — Học Tôn (Scholar)",
    estimatedIeltsRange: "Band 8.0 – 8.5+",
    description: "Khả năng ngôn ngữ và độ chính xác ở mức chuyên gia. Xử lý các câu hỏi bẫy và từ vựng học thuật phức tạp một cách thuần thục.",
    recommendedCourse: {
      slug: "leader",
      title: "Khóa LEADER (Chuyên Đề Cao Cấp 8.0+)",
      targetBand: "Mục tiêu: Duy trì & Tối ưu 8.5+",
      level: "Advanced / Master",
      summary: "Huấn luyện 1-1 chuyên đề nâng cao về học thuật và ứng dụng xuất sắc.",
    },
  };
}

export class AssessmentService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Rate limiting check
   */
  private checkRateLimits(ip: string, phone: string) {
    const now = Date.now();

    if (ip) {
      const ipRec = ipRateLimitMap.get(ip);
      if (ipRec && ipRec.resetAt > now) {
        if (ipRec.count >= 15) {
          const err = new Error("Quá nhiều yêu cầu từ IP này. Vui lòng thử lại sau 1 phút.");
          (err as any).statusCode = 429;
          throw err;
        }
        ipRec.count++;
      } else {
        ipRateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
      }
    }

    if (phone) {
      const phoneRec = phoneRateLimitMap.get(phone);
      if (phoneRec && phoneRec.resetAt > now) {
        if (phoneRec.count >= 5) {
          const err = new Error("Số điện thoại này đã tạo quá nhiều lượt khảo thí. Vui lòng thử lại sau 10 phút.");
          (err as any).statusCode = 429;
          throw err;
        }
        phoneRec.count++;
      } else {
        phoneRateLimitMap.set(phone, { count: 1, resetAt: now + 600000 });
      }
    }
  }

  /**
   * Helper: Find designated entrance test from Database
   */
  private async findDesignatedEntranceExam(): Promise<any | null> {
    try {
      let exam = await this.prisma.exam.findFirst({
        where: {
          OR: [
            { id: "cce291f7-d88b-4976-8ed3-cc21daca7023" },
            { allowGuestAssessment: true, isActive: true, isPublished: true },
            { title: { contains: "ENTRANCE TEST", mode: "insensitive" }, isActive: true, isPublished: true },
            { course: { slug: { contains: "placement", mode: "insensitive" } }, isActive: true, isPublished: true },
          ],
        },
        orderBy: [
          { allowGuestAssessment: "desc" },
          { updatedAt: "desc" },
        ],
        include: {
          sections: {
            orderBy: { orderIndex: "asc" },
            include: {
              questionGroups: {
                orderBy: { orderIndex: "asc" },
                include: {
                  questions: {
                    orderBy: { orderIndex: "asc" },
                  },
                },
              },
            },
          },
        },
      });

      // Verify that the found exam actually has questions in its sections
      if (exam && exam.sections) {
        const totalQs = exam.sections.reduce(
          (sum: number, s: any) => sum + (s.questionGroups?.reduce((gsum: number, g: any) => gsum + (g.questions?.length || 0), 0) || 0),
          0
        );
        if (totalQs > 0) {
          return exam;
        }
      }

      // Direct lookup for authoritative entrance exam cce291f7-d88b-4976-8ed3-cc21daca7023
      exam = await this.prisma.exam.findUnique({
        where: { id: "cce291f7-d88b-4976-8ed3-cc21daca7023" },
        include: {
          sections: {
            orderBy: { orderIndex: "asc" },
            include: {
              questionGroups: {
                orderBy: { orderIndex: "asc" },
                include: {
                  questions: {
                    orderBy: { orderIndex: "asc" },
                  },
                },
              },
            },
          },
        },
      });
      if (exam) return exam;

      return null;
    } catch (err) {
      console.warn("[AssessmentService] findDesignatedEntranceExam notice:", err);
      return null;
    }
  }

  /**
   * Helper: Transform a Database Exam model into SanitizedPlacementTestPayload (Zero Answer Leak)
   */
  public transformDbExamToPayload(exam: any): SanitizedPlacementTestPayload {
    const sections: any[] = exam?.sections || [];

    const listeningSec = sections.find((s) => s.sectionType === "listening");
    const readingSec = sections.find((s) => s.sectionType === "reading");
    const grammarSec = sections.find((s) => s.sectionType === "general");
    const writingSec = sections.find((s) => s.sectionType === "writing");
    const speakingSec = sections.find((s) => s.sectionType === "speaking");

    let questionCursor = 1;

    // Helper: Map Question to SanitizedQuestion
    const mapQuestion = (
      q: any,
      skill: "listening" | "reading" | "grammar",
      defaultSectionTitle: string,
    ): SanitizedQuestion => {
      let options: string[] | undefined = undefined;

      if (q.questionType === "true_false_not_given") {
        options = ["TRUE", "FALSE", "NOT GIVEN"];
      } else if (q.options) {
        if (Array.isArray(q.options)) {
          options = q.options
            .filter((o: any) => typeof o === "string" && o.trim().length > 0)
            .map((o: string) => o.replace(/<\/?font[^>]*>/gi, "").trim());
          if (options.length === 0) options = undefined;
        } else if (typeof q.options === "object") {
          try {
            options = Object.values(q.options)
              .filter((o: any) => typeof o === "string" && o.trim().length > 0)
              .map((o: any) => String(o).replace(/<\/?font[^>]*>/gi, "").trim()) as string[];
            if (options.length === 0) options = undefined;
          } catch {}
        }
      }

      let blankCount = 1;
      if (q.questionType === "fill_blank") {
        if (q.correctAnswer && typeof q.correctAnswer === "string" && q.correctAnswer.trim().startsWith("[")) {
          try {
            const arr = JSON.parse(q.correctAnswer);
            if (Array.isArray(arr) && arr.length > 0) blankCount = arr.length;
          } catch {}
        } else if (q.questionText) {
          const m = q.questionText.match(/(?:\[BLANK(?:_\d+)?\]|\[\d+\])/gi);
          if (m && m.length > 0) blankCount = m.length;
        }
      }

      const cleanPrompt = (q.questionText || "")
        .replace(/<font\s+color=["']?([^"'>]+)["']?>/gi, '<span style="color: $1">')
        .replace(/<\/font>/gi, "</span>")
        .replace(/font-family:[^;"]*;?/gi, "")
        .trim();

      return {
        id: q.id,
        skill,
        sectionTitle: q.group?.title || defaultSectionTitle,
        questionType: q.questionType,
        prompt: cleanPrompt,
        audioUrl: toFileUrl(q.audioUrl) || undefined,
        options,
        placeholder: q.questionType === "fill_blank" ? "Nhập câu trả lời..." : undefined,
        orderIndex: (typeof q.orderIndex === "number" && q.orderIndex > 0)
          ? q.orderIndex
          : (typeof q.order_index === "number" && q.order_index > 0)
          ? q.order_index
          : questionCursor++,
        blankCount,
      };
    };

    // 1. Listening Questions
    const listeningQuestions: SanitizedQuestion[] = [];
    const listeningAudio =
      toFileUrl(listeningSec?.audioUrl) ||
      toFileUrl(listeningSec?.questionGroups?.[0]?.audioUrl) ||
      "https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3";

    let listeningCursor = 1;
    const listeningGroups = [...(listeningSec?.questionGroups || [])].sort((a: any, b: any) => {
      const orderA = a.orderIndex ?? a.order_index ?? 0;
      const orderB = b.orderIndex ?? b.order_index ?? 0;
      return orderA - orderB;
    });

    listeningGroups.forEach((g: any) => {
      const groupQs = [...(g.questions || [])].sort((a: any, b: any) => {
        const orderA = a.orderIndex ?? a.order_index ?? 0;
        const orderB = b.orderIndex ?? b.order_index ?? 0;
        return orderA - orderB;
      });

      groupQs.forEach((q: any) => {
        const mapped = mapQuestion({ ...q, group: g }, "listening", "Kỹ năng Nghe (Listening)");
        mapped.orderIndex = listeningCursor;
        listeningQuestions.push(mapped);
        listeningCursor += mapped.blankCount && mapped.blankCount > 1 ? mapped.blankCount : 1;
      });
    });

    // 2. Reading Questions & Passage
    const readingQuestions: SanitizedQuestion[] = [];
    const readingPassage =
      readingSec?.questionGroups
        ?.map((g: any) => g.passage)
        .filter((p: any) => p && typeof p === "string" && p.trim().length > 0)
        .join("\n\n") ||
      readingSec?.instructions ||
      "";

    let readingCursor = 1;
    const readingGroups = [...(readingSec?.questionGroups || [])].sort((a: any, b: any) => {
      const orderA = a.orderIndex ?? a.order_index ?? 0;
      const orderB = b.orderIndex ?? b.order_index ?? 0;
      return orderA - orderB;
    });

    readingGroups.forEach((g: any) => {
      const groupQs = [...(g.questions || [])].sort((a: any, b: any) => {
        const orderA = a.orderIndex ?? a.order_index ?? 0;
        const orderB = b.orderIndex ?? b.order_index ?? 0;
        return orderA - orderB;
      });

      groupQs.forEach((q: any) => {
        const mapped = mapQuestion({ ...q, group: g }, "reading", "Kỹ năng Đọc hiểu (Reading)");
        mapped.orderIndex = readingCursor;
        readingQuestions.push(mapped);
        readingCursor += mapped.blankCount && mapped.blankCount > 1 ? mapped.blankCount : 1;
      });
    });

    // 3. Grammar Questions
    const grammarQuestions: SanitizedQuestion[] = [];
    let grammarCursor = 1;
    const grammarGroups = [...(grammarSec?.questionGroups || [])].sort((a: any, b: any) => {
      const orderA = a.orderIndex ?? a.order_index ?? 0;
      const orderB = b.orderIndex ?? b.order_index ?? 0;
      return orderA - orderB;
    });

    grammarGroups.forEach((g: any) => {
      const groupQs = [...(g.questions || [])].sort((a: any, b: any) => {
        const orderA = a.orderIndex ?? a.order_index ?? 0;
        const orderB = b.orderIndex ?? b.order_index ?? 0;
        return orderA - orderB;
      });

      groupQs.forEach((q: any) => {
        const mapped = mapQuestion({ ...q, group: g }, "grammar", "Ngữ pháp & Từ vựng (Grammar)");
        mapped.orderIndex = grammarCursor;
        grammarQuestions.push(mapped);
        grammarCursor += mapped.blankCount && mapped.blankCount > 1 ? mapped.blankCount : 1;
      });
    });

    // 4. Writing
    const writingQ = writingSec?.questionGroups?.[0]?.questions?.[0];
    const rawWritingPrompt =
      writingQ?.questionText ||
      writingSec?.questionGroups?.[0]?.passage ||
      canonicalPlacementTestPayload.skills.writing.prompt;
    const writingPrompt = (rawWritingPrompt || "")
      .replace(/<font\s+color=["']?([^"'>]+)["']?>/gi, '<span style="color: $1">')
      .replace(/<\/font>/gi, "</span>")
      .trim();

    // 5. Speaking
    const speakingQuestions = speakingSec?.questionGroups?.[0]?.questions || [];
    const part1Qs = speakingQuestions.slice(0, 2).map((q: any) => q.questionText).filter(Boolean);
    const part2Topic = speakingQuestions[2]?.questionText || canonicalPlacementTestPayload.skills.speaking.part2Topic;

    // Calculate total effective objective questions + writing + speaking
    let totalObjCount = 0;
    [...listeningQuestions, ...readingQuestions, ...grammarQuestions].forEach((q) => {
      totalObjCount += q.blankCount && q.blankCount > 1 ? q.blankCount : 1;
    });

    return {
      testId: exam.id || "aris-placement-v1",
      title: exam.title ? `ARIS Diagnostic Assessment — ${exam.title}` : canonicalPlacementTestPayload.title,
      durationMinutes: exam.durationMinutes || 60,
      totalQuestions: totalObjCount + 2,
      skills: {
        listening: {
          title: listeningSec?.title || canonicalPlacementTestPayload.skills.listening.title,
          audioUrl: listeningAudio,
          questions: listeningQuestions.length > 0 ? listeningQuestions : canonicalPlacementTestPayload.skills.listening.questions,
        },
        reading: {
          title: readingSec?.title || canonicalPlacementTestPayload.skills.reading.title,
          passage: readingPassage || canonicalPlacementTestPayload.skills.reading.passage,
          questions: readingQuestions.length > 0 ? readingQuestions : canonicalPlacementTestPayload.skills.reading.questions,
        },
        grammar: {
          title: grammarSec?.title || canonicalPlacementTestPayload.skills.grammar.title,
          questions: grammarQuestions.length > 0 ? grammarQuestions : canonicalPlacementTestPayload.skills.grammar.questions,
        },
        writing: {
          title: writingSec?.title || canonicalPlacementTestPayload.skills.writing.title,
          prompt: writingPrompt,
          guidelines: canonicalPlacementTestPayload.skills.writing.guidelines,
          minWords: 80,
        },
        speaking: {
          title: speakingSec?.title || canonicalPlacementTestPayload.skills.speaking.title,
          part1Questions: part1Qs.length > 0 ? part1Qs : canonicalPlacementTestPayload.skills.speaking.part1Questions,
          part2Topic,
          part2Cues: canonicalPlacementTestPayload.skills.speaking.part2Cues,
        },
      },
    };
  }

  /**
   * 1. Create a dedicated Assessment Session
   */
  public async createAssessmentSession(params: {
    fullName: string;
    phone: string;
    targetBand?: string;
    ipAddress?: string;
  }): Promise<AssessmentSessionRecord> {
    const cleanName = params.fullName?.trim();
    const cleanPhone = params.phone?.trim().replace(/\s+/g, "");

    if (!cleanName || cleanName.length < 2) {
      const err = new Error("Họ và tên thí sinh phải có ít nhất 2 ký tự");
      (err as any).statusCode = 400;
      throw err;
    }

    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 9) {
      const err = new Error("Số điện thoại không hợp lệ (tối thiểu 9 chữ số)");
      (err as any).statusCode = 400;
      throw err;
    }

    this.checkRateLimits(params.ipAddress || "", cleanPhone);

    const now = new Date();
    // 60 minutes total exam duration
    const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
    const sessionId = crypto.randomUUID();

    // Look up designated Entrance Test from DB
    let examId: string = "cce291f7-d88b-4976-8ed3-cc21daca7023"; // default fallback
    try {
      const designatedExam = await this.findDesignatedEntranceExam();
      if (designatedExam) {
        examId = designatedExam.id;
      }
    } catch (e) {
      console.warn("[AssessmentService] Exam lookup notice:", e);
    }

    const session: AssessmentSessionRecord = {
      id: sessionId,
      examId,
      candidateName: cleanName,
      phone: cleanPhone,
      targetBand: params.targetBand || "Chưa xác định",
      status: "ACTIVE",
      answers: {},
      objectiveScore: null,
      subjectiveStatus: "NONE",
      result: null,
      startedAt: now,
      expiresAt,
      submittedAt: null,
      ipAddress: params.ipAddress || null,
      createdAt: now,
      updatedAt: now,
    };

    // Store in PostgreSQL AssessmentSession if table exists
    try {
      if ((this.prisma as any).assessmentSession) {
        await (this.prisma as any).assessmentSession.create({
          data: {
            id: session.id,
            examId: session.examId || examId,
            fullName: session.candidateName,
            phone: session.phone,
            targetBand: session.targetBand,
            status: session.status,
            answers: session.answers,
            startedAt: session.startedAt,
            expiresAt: session.expiresAt,
            ipAddress: session.ipAddress,
          },
        });
      }
    } catch (dbErr) {
      console.warn("[AssessmentService] DB Session create notice:", dbErr);
    }

    // Fast-lookup memory store
    inMemoryAssessmentSessions.set(sessionId, session);

    // Record Lead to CRM for Admissions Team
    try {
      await this.prisma.contactLead.create({
        data: {
          fullName: cleanName,
          phone: cleanPhone,
          goal: `Khảo thí chẩn đoán ARIS | Mục tiêu: ${session.targetBand}`,
          source: "aris_diagnostic_test",
          notes: `Session: ${sessionId} | Exam: ${examId}`,
        },
      });
    } catch (leadErr) {
      console.warn("[AssessmentService] Lead create notice:", leadErr);
    }

    return session;
  }

  /**
   * Helper: Ensure or Revive session across server reloads/restarts
   */
  public async ensureOrReviveSession(
    sessionId: string,
    fallbackData?: {
      candidateName?: string;
      phone?: string;
      targetBand?: string;
      answers?: Record<string, any>;
    }
  ): Promise<AssessmentSessionRecord> {
    let session = await this.getSessionById(sessionId);
    if (session) return session;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);

    let examId: string = "cce291f7-d88b-4976-8ed3-cc21daca7023";
    try {
      const designatedExam = await this.findDesignatedEntranceExam();
      if (designatedExam) {
        examId = designatedExam.id;
      }
    } catch {}

    let candidateName = fallbackData?.candidateName;
    let phone = fallbackData?.phone;
    let targetBand = fallbackData?.targetBand;

    try {
      const lead = await this.prisma.contactLead.findFirst({
        where: {
          OR: [
            { notes: { contains: sessionId } },
            { notes: { contains: sessionId.toLowerCase() } },
            { notes: { contains: sessionId.toUpperCase() } },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
      if (lead) {
        if (!candidateName || candidateName === "Thí sinh ARIS") candidateName = lead.fullName;
        if (!phone || phone === "0900000000") phone = lead.phone;
        if (!targetBand || targetBand === "7.0+" || targetBand === "Chưa xác định") {
          const match = lead.goal?.match(/Mục tiêu:\s*([^\n|]+)/i);
          if (match && match[1]) targetBand = match[1].trim();
        }
      }
    } catch {}

    session = {
      id: sessionId,
      examId,
      candidateName: candidateName || "Thí sinh ARIS",
      phone: phone || "0900000000",
      targetBand: targetBand || "Chưa xác định",
      status: "ACTIVE",
      answers: fallbackData?.answers || {},
      objectiveScore: null,
      subjectiveStatus: "NONE",
      result: null,
      startedAt: now,
      expiresAt,
      submittedAt: null,
      ipAddress: null,
      createdAt: now,
      updatedAt: now,
    };

    inMemoryAssessmentSessions.set(sessionId, session);

    try {
      if ((this.prisma as any).assessmentSession && examId) {
        await (this.prisma as any).assessmentSession.upsert({
          where: { id: sessionId },
          create: {
            id: session.id,
            examId,
            fullName: session.candidateName,
            phone: session.phone,
            targetBand: session.targetBand,
            status: session.status,
            answers: session.answers,
            startedAt: session.startedAt,
            expiresAt: session.expiresAt,
          },
          update: {
            fullName: session.candidateName,
            phone: session.phone,
            targetBand: session.targetBand,
            answers: session.answers,
          },
        });
      }
    } catch (dbErr) {
      console.warn("[AssessmentService] Session revive DB notice:", dbErr);
    }

    return session;
  }

  /**
   * 2. Find existing session by ID
   */
  public async getSessionById(sessionId: string): Promise<AssessmentSessionRecord | null> {
    if (!sessionId) return null;

    const mem = inMemoryAssessmentSessions.get(sessionId);
    if (mem && mem.candidateName && mem.candidateName !== "Thí sinh ARIS" && mem.phone !== "0900000000") {
      return mem;
    }

    try {
      if ((this.prisma as any).assessmentSession) {
        const db = await (this.prisma as any).assessmentSession.findUnique({
          where: { id: sessionId },
        });
        if (db) {
          let cName = db.fullName || db.candidateName || "Thí sinh ARIS";
          let cPhone = db.phone || "0900000000";
          let cTargetBand = db.targetBand || "Chưa xác định";

          if (cName === "Thí sinh ARIS" || cPhone === "0900000000") {
            try {
              const lead = await this.prisma.contactLead.findFirst({
                where: {
                  OR: [
                    { notes: { contains: sessionId } },
                    { notes: { contains: sessionId.toLowerCase() } },
                    { notes: { contains: sessionId.toUpperCase() } },
                  ],
                },
                orderBy: { createdAt: "desc" },
              });
              if (lead) {
                if (lead.fullName) cName = lead.fullName;
                if (lead.phone) cPhone = lead.phone;
                if (lead.goal) {
                  const match = lead.goal.match(/Mục tiêu:\s*([^\n|]+)/i);
                  if (match && match[1]) cTargetBand = match[1].trim();
                }
                await (this.prisma as any).assessmentSession.update({
                  where: { id: sessionId },
                  data: { fullName: cName, phone: cPhone, targetBand: cTargetBand },
                });
              }
            } catch {}
          }

          const rec: AssessmentSessionRecord = {
            id: db.id,
            examId: db.examId,
            candidateName: cName,
            phone: cPhone,
            targetBand: cTargetBand,
            status: db.status,
            answers: db.answers || {},
            objectiveScore: (db.result as any)?.objectiveBreakdown || null,
            subjectiveStatus: (db.result as any)?.subjectiveEvaluation?.status || "NONE",
            result: db.result as any,
            startedAt: db.startedAt || db.createdAt,
            expiresAt: db.expiresAt,
            submittedAt: db.submittedAt,
            ipAddress: db.ipAddress,
            createdAt: db.createdAt,
            updatedAt: db.updatedAt,
          };
          inMemoryAssessmentSessions.set(sessionId, rec);
          return rec;
        }
      }
    } catch (err) {
      console.warn("[AssessmentService] Fetch session error:", err);
    }

    return null;
  }

  /**
   * 3. Get Sanitized Test Payload (ZERO answer keys in client response)
   */
  public async getTestPayloadForSession(sessionId: string): Promise<{
    session: {
      id: string;
      candidateName: string;
      phone: string;
      targetBand: string;
      status: string;
      remainingSeconds: number;
      answers: Record<string, any>;
    };
    test: SanitizedPlacementTestPayload;
  }> {
    let session = await this.getSessionById(sessionId);
    if (!session) {
      session = await this.ensureOrReviveSession(sessionId);
    }

    if (session.status === "SUBMITTED") {
      const err = new Error("Bài khảo thí này đã được nộp. Bạn có thể xem lại kết quả.");
      (err as any).statusCode = 409;
      throw err;
    }

    const remainingSec = Math.max(0, Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000));
    if (remainingSec <= 0) {
      session.status = "EXPIRED";
      const err = new Error("Phiên làm bài đã hết hạn");
      (err as any).statusCode = 403;
      throw err;
    }

    // Attempt to load dynamic exam payload from DB
    let testPayload = canonicalPlacementTestPayload;
    const targetExamId = session.examId || "cce291f7-d88b-4976-8ed3-cc21daca7023";

    try {
      const dbExam = await this.prisma.exam.findUnique({
        where: { id: targetExamId },
        include: {
          sections: {
            orderBy: { orderIndex: "asc" },
            include: {
              questionGroups: {
                orderBy: { orderIndex: "asc" },
                include: {
                  questions: {
                    orderBy: { orderIndex: "asc" },
                  },
                },
              },
            },
          },
        },
      });

      if (dbExam && dbExam.sections && dbExam.sections.length > 0) {
        testPayload = this.transformDbExamToPayload(dbExam);
      }
    } catch (err) {
      console.warn("[AssessmentService] Dynamic test payload generation fallback notice:", err);
    }

    return {
      session: {
        id: session.id,
        candidateName: session.candidateName,
        phone: session.phone,
        targetBand: session.targetBand,
        status: session.status,
        remainingSeconds: remainingSec,
        answers: session.answers || {},
      },
      test: testPayload,
    };
  }

  /**
   * 4. Debounced autosave
   */
  public async autosaveAnswers(sessionId: string, answers: Record<string, any>) {
    let session = await this.getSessionById(sessionId);
    if (!session) {
      session = await this.ensureOrReviveSession(sessionId, { answers });
    }

    if (session.status === "SUBMITTED") {
      const err = new Error("Bài thi đã được nộp. Không thể lưu thêm thay đổi.");
      (err as any).statusCode = 409;
      throw err;
    }

    if (new Date(session.expiresAt).getTime() < Date.now()) {
      session.status = "EXPIRED";
      const err = new Error("Phiên làm bài đã hết hạn");
      (err as any).statusCode = 403;
      throw err;
    }

    // Anti-spam & buffer protection: limit writing response to 4000 characters
    if (typeof answers["writing_response"] === "string") {
      answers["writing_response"] = answers["writing_response"].slice(0, 4000);
    }

    session.answers = { ...session.answers, ...answers };
    session.updatedAt = new Date();
    inMemoryAssessmentSessions.set(sessionId, session);

    try {
      if ((this.prisma as any).assessmentSession) {
        // Enforce DB-level guard: never overwrite a SUBMITTED session
        await (this.prisma as any).assessmentSession.updateMany({
          where: {
            id: sessionId,
            status: { not: "SUBMITTED" },
          },
          data: {
            answers: session.answers,
            updatedAt: session.updatedAt,
          },
        });
      }
    } catch (dbErr) {
      console.warn("[AssessmentService] DB Autosave notice:", dbErr);
    }

    return { success: true, savedAt: session.updatedAt.toISOString() };
  }

  /**
   * 5. Submit and Grade Objective Sections + Enqueue Subjective Review
   */
  public async submitAssessment(
    sessionId: string,
    answersPayload: Record<string, any>,
    options: { allowIdempotentRetry?: boolean } = {}
  ): Promise<DiagnosticReport> {
    let session = await this.getSessionById(sessionId);
    if (!session) {
      session = await this.ensureOrReviveSession(sessionId, { answers: answersPayload });
    }

    if (session.status === "SUBMITTED") {
      if (options.allowIdempotentRetry && session.result) {
        return session.result;
      }
      const err = new Error("Bài khảo thí này đã được nộp trước đó");
      (err as any).statusCode = 409;
      throw err;
    }

    // 1-minute grace period for network latency
    if (new Date(session.expiresAt).getTime() < Date.now() - 60000) {
      session.status = "EXPIRED";
      const err = new Error("Phiên làm bài đã hết hạn. Không thể nộp bài.");
      (err as any).statusCode = 403;
      throw err;
    }

    const answers = { ...(session.answers || {}), ...(answersPayload || {}) };
    if (typeof answers["writing_response"] === "string") {
      answers["writing_response"] = answers["writing_response"].slice(0, 4000);
    }

    let listeningCorrect = 0;
    let listeningTotal = 0;
    let readingCorrect = 0;
    let readingTotal = 0;
    let grammarCorrect = 0;
    let grammarTotal = 0;

    const normalizeText = (s: any) =>
      String(s || "")
        .trim()
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ");

    let dbExamQuestions: any[] = [];
    const targetExamId = session.examId || "cce291f7-d88b-4976-8ed3-cc21daca7023";
    try {
      dbExamQuestions = await this.prisma.question.findMany({
        where: {
          group: {
            section: {
              examId: targetExamId,
            },
          },
        },
        include: {
          group: {
            include: {
              section: true,
            },
          },
        },
      });
    } catch (dbErr) {
      console.warn("[AssessmentService] DB questions fetch error:", dbErr);
    }

    if (dbExamQuestions.length > 0) {
      // Dynamic Database Auto-grading for custom exam questions
      for (const q of dbExamQuestions) {
        const secType = q.group?.section?.sectionType;
        const isListening = secType === "listening";
        const isReading = secType === "reading";
        const isGrammar = secType === "general";

        if (!isListening && !isReading && !isGrammar) continue;

        const studentAns = answers[q.id];
        const rawCorrect = q.correctAnswer;
        if (!rawCorrect) continue;

        let parsedKeys: string[] | null = null;
        try {
          if (typeof rawCorrect === "string" && rawCorrect.trim().startsWith("[")) {
            const arr = JSON.parse(rawCorrect);
            if (Array.isArray(arr) && arr.length > 0) parsedKeys = arr;
          }
        } catch {}

        if (parsedKeys && parsedKeys.length > 0) {
          // Multi-blank question
          parsedKeys.forEach((keyVal, idx) => {
            if (isListening) listeningTotal++;
            else if (isReading) readingTotal++;
            else if (isGrammar) grammarTotal++;

            let sVal: any = undefined;
            if (studentAns && typeof studentAns === "object") {
              sVal = studentAns[idx] ?? studentAns[String(idx)];
            } else if (Array.isArray(studentAns)) {
              sVal = studentAns[idx];
            } else if (typeof studentAns === "string" && idx === 0) {
              sVal = studentAns;
            }

            if (sVal != null && String(sVal).trim() !== "") {
              const normStudent = normalizeText(sVal);
              const alternatives = String(keyVal).split("|").map((s) => normalizeText(s));
              const isMatch = alternatives.some((alt) => alt === normStudent);
              if (isMatch) {
                if (isListening) listeningCorrect++;
                else if (isReading) readingCorrect++;
                else if (isGrammar) grammarCorrect++;
              }
            }
          });
        } else {
          // Single-item question
          if (isListening) listeningTotal++;
          else if (isReading) readingTotal++;
          else if (isGrammar) grammarTotal++;

          if (studentAns != null && String(studentAns).trim() !== "") {
            const normStudent = normalizeText(studentAns);
            const alternatives = String(rawCorrect).split("|").map((s) => normalizeText(s));
            const isMatch = alternatives.some((alt) => alt === normStudent);
            if (isMatch) {
              if (isListening) listeningCorrect++;
              else if (isReading) readingCorrect++;
              else if (isGrammar) grammarCorrect++;
            }
          }
        }
      }
    } else {
      // Authoritative Clean-room Diagnostic Auto-grading
      Object.entries(authoritativePlacementAnswerKeys).forEach(([qId, key]) => {
        const isListening = key.skill === "listening";
        const isReading = key.skill === "reading";
        const isGrammar = key.skill === "grammar";

        const studentAns = answers[qId];
        const rawCorrect = key.correctAnswer;

        let parsedKeys: string[] | null = null;
        try {
          if (typeof rawCorrect === "string" && rawCorrect.trim().startsWith("[")) {
            const arr = JSON.parse(rawCorrect);
            if (Array.isArray(arr) && arr.length > 0) parsedKeys = arr;
          }
        } catch {}

        if (parsedKeys && parsedKeys.length > 0) {
          parsedKeys.forEach((keyVal, idx) => {
            if (isListening) listeningTotal++;
            else if (isReading) readingTotal++;
            else if (isGrammar) grammarTotal++;

            let sVal: any = undefined;
            if (studentAns && typeof studentAns === "object") {
              sVal = studentAns[idx] ?? studentAns[String(idx)];
            } else if (Array.isArray(studentAns)) {
              sVal = studentAns[idx];
            } else if (typeof studentAns === "string" && idx === 0) {
              sVal = studentAns;
            }

            if (sVal != null && String(sVal).trim() !== "") {
              const normStudent = normalizeText(sVal);
              const alternatives = String(keyVal).split("|").map((s) => normalizeText(s));
              const isMatch = alternatives.some((alt) => alt === normStudent);
              if (isMatch) {
                if (isListening) listeningCorrect++;
                else if (isReading) readingCorrect++;
                else if (isGrammar) grammarCorrect++;
              }
            }
          });
        } else {
          if (isListening) listeningTotal++;
          else if (isReading) readingTotal++;
          else if (isGrammar) grammarTotal++;

          if (studentAns != null && String(studentAns).trim() !== "") {
            let rawAns = studentAns;
            if (typeof studentAns === "object" && !Array.isArray(studentAns)) {
              const values = Object.values(studentAns).filter(Boolean);
              if (values.length > 0) rawAns = values.join(" ");
            }

            const normStudent = normalizeText(rawAns);
            const normCorrect = normalizeText(key.correctAnswer);

            let isMatch = normStudent === normCorrect;
            if (!isMatch && key.acceptedAnswers && key.acceptedAnswers.length > 0) {
              isMatch = key.acceptedAnswers.some((acc) => normalizeText(acc) === normStudent);
            }

            if (!isMatch) {
              const stripAccents = (str: string) =>
                str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              const studentStripped = stripAccents(normStudent);
              const correctStripped = stripAccents(normCorrect);
              isMatch = studentStripped === correctStripped;
              if (!isMatch && key.acceptedAnswers) {
                isMatch = key.acceptedAnswers.some(
                  (acc) => stripAccents(normalizeText(acc)) === studentStripped
                );
              }
            }

            if (isMatch) {
              if (key.skill === "listening") listeningCorrect++;
              else if (key.skill === "reading") readingCorrect++;
              else if (key.skill === "grammar") grammarCorrect++;
            }
          }
        }
      });
    }

    const totalQuestions = listeningTotal + readingTotal + grammarTotal;
    const rawCorrect = listeningCorrect + readingCorrect + grammarCorrect;
    const accuracyPercent = Math.round((rawCorrect / Math.max(1, totalQuestions)) * 100);

    const listeningPct = Math.round((listeningCorrect / Math.max(1, listeningTotal)) * 100);
    const readingPct = Math.round((readingCorrect / Math.max(1, readingTotal)) * 100);
    const grammarPct = Math.round((grammarCorrect / Math.max(1, grammarTotal)) * 100);

    const listeningBandInfo = calculateEstimatedSkillBand(listeningCorrect, listeningTotal);
    const readingBandInfo = calculateEstimatedSkillBand(readingCorrect, readingTotal);
    const grammarBandInfo = calculateEstimatedSkillBand(grammarCorrect, grammarTotal);

    // Map to ARIS Diagnostic Level & Estimated IELTS Range
    const arisInfo = mapRawScoreToArisLevel(rawCorrect, totalQuestions);

    // Subjective check (Writing & Speaking)
    const hasWriting = typeof answers["writing_response"] === "string" && answers["writing_response"].trim().length > 0;
    const hasSpeaking =
      !!answers["speaking_part1_audio_url"] ||
      !!answers["speaking_part2_audio_url"] ||
      !!answers["speaking_audio_url"] || // backward compat
      !!answers["speaking_completed"]; // backward compat
    const subjectiveStatus = (hasWriting || hasSpeaking) ? "PENDING_REVIEW" : "NONE";

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    const hasAttemptedAnswers = Object.keys(answers).some(
      (k) => k !== "writing_response" && !k.startsWith("speaking") && answers[k] != null && String(answers[k]).trim() !== ""
    );

    if (!hasAttemptedAnswers || rawCorrect === 0) {
      strengths.push("Chưa đủ dữ liệu câu trả lời hợp lệ để xác nhận điểm mạnh của thí sinh.");
      weaknesses.push("Chưa có đủ dữ liệu câu trả lời để bóc tách điểm nghẽn chi tiết.");
    } else {
      if (readingPct >= 70) {
        strengths.push("Khả năng quét và định vị thông tin học thuật (Scanning & Skimming) rất nhanh và chính xác.");
      } else if (readingPct < 40) {
        weaknesses.push("Tốc độ đọc còn chậm và dễ bị bẫy ở các câu hỏi suy luận logic True/False/Not Given.");
      }

      if (listeningPct >= 70) {
        strengths.push("Phản xạ nghe hiểu tốt, bắt kịp tốc độ các đoạn hội thoại và độc thoại học thuật.");
      } else if (listeningPct < 40) {
        weaknesses.push("Còn gặp khó khăn khi nghe các từ nối âm và thông tin số liệu/địa chỉ trong bài nghe.");
      }

      if (grammarPct >= 70) {
        strengths.push("Nắm vững cấu trúc câu phức, đảo ngữ và các collocations học thuật thông dụng.");
      } else if (grammarPct < 50) {
        weaknesses.push("Cần củng cố thêm các thì hoàn thành, mệnh đề quan hệ và trật tự từ trong câu phức.");
      }

      if (strengths.length === 0) {
        strengths.push("Đã hoàn thành các phần thi trắc nghiệm chẩn đoán.");
      }
      if (weaknesses.length === 0) {
        weaknesses.push("Tiếp tục duy trì luyện tập các đề đọc hiểu độ khó cao để tối ưu tốc độ làm bài.");
      }
    }

    const report: DiagnosticReport = {
      sessionId,
      candidateName: session.candidateName,
      phone: session.phone,
      targetBand: session.targetBand,
      arisLevel: {
        levelNumber: arisInfo.levelNumber,
        levelTitle: arisInfo.levelTitle,
        estimatedIeltsRange: arisInfo.estimatedIeltsRange,
        description: arisInfo.description,
        recommendedCourse: arisInfo.recommendedCourse,
      },
      objectiveBreakdown: {
        rawScore: rawCorrect,
        totalQuestions,
        accuracyPercent,
        preliminaryRange: derivePreliminaryProfileRange(
          listeningBandInfo.band,
          readingBandInfo.band,
          hasAttemptedAnswers && rawCorrect > 0
        ),
        listening: {
          correct: listeningCorrect,
          total: listeningTotal,
          scorePercent: listeningPct,
          estimatedBand: listeningBandInfo.band,
          level: listeningBandInfo.level,
          feedback: !hasAttemptedAnswers || listeningTotal === 0
            ? "Chưa có dữ liệu bài làm."
            : listeningPct >= 70
            ? "Phản xạ nghe hiểu tốt các ngữ cảnh thông dụng & học thuật."
            : listeningPct >= 40
            ? "Nắm được thông tin cơ bản, cần rèn thêm kỹ thuật bắt từ khóa (Keyword tracking)."
            : "Cần xây dựng lại phản xạ nghe từ vựng và ngữ âm IPA cơ bản.",
        },
        reading: {
          correct: readingCorrect,
          total: readingTotal,
          scorePercent: readingPct,
          estimatedBand: readingBandInfo.band,
          level: readingBandInfo.level,
          feedback: !hasAttemptedAnswers || readingTotal === 0
            ? "Chưa có dữ liệu bài làm."
            : readingPct >= 70
            ? "Đọc hiểu nhanh, định vị thông tin chính xác (Scanning & Skimming tốt)."
            : readingPct >= 40
            ? "Hiểu ý chính của đoạn văn, cần chú ý bẫy từ đồng nghĩa và True/False/Not Given."
            : "Tốc độ đọc còn chậm, cần củng cố vốn từ vựng học thuật cốt lõi.",
        },
        grammar: {
          correct: grammarCorrect,
          total: grammarTotal,
          scorePercent: grammarPct,
          level: grammarBandInfo.level,
          feedback: !hasAttemptedAnswers || grammarTotal === 0
            ? "Chưa có dữ liệu bài làm."
            : grammarPct >= 70
            ? "Làm chủ cấu trúc câu phức, mệnh đề quan hệ và từ vựng học thuật."
            : grammarPct >= 40
            ? "Nắm được ngữ pháp thông dụng, cần rèn luyện thêm câu ghép và collocations."
            : "Cần củng cố ngữ pháp căn bản, trật tự từ và các thì cơ bản.",
        },
      },
      subjectiveEvaluation: {
        status: subjectiveStatus,
        hasWritingSubmission: hasWriting,
        hasSpeakingRecording: hasSpeaking,
        writing: {
          submitted: hasWriting,
          status: hasWriting ? "Đang chờ Giảng viên chấm" : "Chưa nộp bài",
          message: hasWriting
            ? "Bài viết tự luận Task 2 của bạn đã được ghi nhận. Giảng viên ARIS sẽ chấm chi tiết theo 4 tiêu chí chuẩn IELTS (TR, CC, LR, GRA) và gửi kết quả kèm bài sửa qua Zalo/SĐT trong vòng 24h."
            : "Chưa có bài viết gửi kèm (chưa đủ dữ liệu để đánh giá).",
        },
        speaking: {
          submitted: hasSpeaking,
          status: hasSpeaking ? "Đang chờ Giảng viên chấm" : "Chưa thu âm",
          message: hasSpeaking
            ? "2 bản ghi âm (Part 1 & Part 2) đã được niêm phong an toàn. Giảng viên chuyên môn sẽ chấm phát âm (Pronunciation), độ trôi chảy & từ vựng và gửi kết quả chi tiết sau."
            : "Chưa có bản ghi âm gửi kèm (chưa đủ dữ liệu để đánh giá).",
        },
        note: hasWriting || hasSpeaking
          ? "Phần thi Tự luận (Nói & Viết) đã được gửi đến Hội đồng Giảng viên ARIS thẩm định chi tiết."
          : "Thí sinh chưa nộp phần thi Tự luận (Nói & Viết) nên chưa thể đánh giá 2 kỹ năng này.",
      },
      strengths,
      weaknesses,
      diagnosticEngineVersion: "2026.08.1",
      scoringVersion: "2026.08.1",
      questionSetVersion: "1.0.0",
      diagnosticRubricVersion: "2026.08.1",
      submittedAt: new Date().toISOString(),
    };

    session.status = "SUBMITTED";
    session.submittedAt = new Date();
    session.answers = answers;
    session.objectiveScore = {
      rawCorrect,
      totalQuestions,
      accuracyPercent,
      listeningCorrect,
      listeningTotal,
      readingCorrect,
      readingTotal,
      grammarCorrect,
      grammarTotal,
    };
    session.subjectiveStatus = subjectiveStatus;
    session.result = report;

    inMemoryAssessmentSessions.set(sessionId, session);

    try {
      if ((this.prisma as any).assessmentSession) {
        await (this.prisma as any).assessmentSession.update({
          where: { id: sessionId },
          data: {
            status: "SUBMITTED",
            gradingStatus: "PENDING",
            submittedAt: session.submittedAt,
            answers: session.answers,
            result: report,
          },
        });
      }
    } catch (dbErr) {
      console.warn("[AssessmentService] DB Submit update notice:", dbErr);
    }

    // Update Contact Lead
    try {
      await this.prisma.contactLead.updateMany({
        where: { notes: { contains: sessionId } },
        data: {
          notes: `Session: ${sessionId} | ${arisInfo.levelTitle} (${arisInfo.estimatedIeltsRange}) | Điểm: ${rawCorrect}/${totalQuestions}`,
        },
      });
    } catch (leadUpdateErr) {
      console.warn("[AssessmentService] Lead update notice:", leadUpdateErr);
    }

    // Promote speaking recordings to PLACEMENT retention class (15 days)
    try {
      const { SpeakingStorageService } = await import("./speakingStorage.service.js");
      const speakingService = new SpeakingStorageService(this.prisma);
      await speakingService.promoteAssetOnSubmission({
        referenceType: "PLACEMENT_SESSION",
        referenceId: sessionId,
        retentionType: "PLACEMENT",
        submittedAt: session.submittedAt,
      });
    } catch (speakingErr) {
      console.warn("[AssessmentService] Speaking promotion notice:", speakingErr);
    }

    // Asynchronously dispatch in-app notifications for Teachers & Admins (non-blocking)
    (async () => {
      try {
        const { NotificationService } = await import("./notification.service.js");
        const notifService = new NotificationService(this.prisma);
        const candidateDisplayName = session.candidateName || "Học viên";
        await notifService.notifyUsersByRole(["teacher", "admin"], {
          type: "NEW_SUBMISSION",
          title: "Có bài kiểm tra đầu vào mới",
          message: `Thí sinh ${candidateDisplayName} (${session.phone}) vừa nộp bài test. Cần chấm phần thi Tự luận (Writing & Speaking).`,
          link: `/admin/assessments/${sessionId}`,
          entityType: "ASSESSMENT_SESSION",
          entityId: sessionId,
        });
      } catch (inAppErr) {
        console.error("[AssessmentService] In-app notification error:", inAppErr);
      }
    })();

    return report;
  }

  /**
   * 6. Admin: List all assessment sessions with pagination, search, and status filter
   */
  public async listAdminAssessmentSessions(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    gradingStatus?: string;
  }): Promise<{
    items: any[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params.limit) || 20));
    const skip = (page - 1) * limit;

    let dbItems: any[] = [];
    let totalCount = 0;

    try {
      if ((this.prisma as any).assessmentSession) {
        const whereClause: any = {};
        if (params.status && params.status !== "ALL") {
          whereClause.status = params.status;
        }
        if (params.gradingStatus && params.gradingStatus !== "ALL") {
          whereClause.gradingStatus = params.gradingStatus;
        }
        if (params.search && params.search.trim()) {
          const q = params.search.trim();
          whereClause.OR = [
            { fullName: { contains: q, mode: "insensitive" } },
            { phone: { contains: q, mode: "insensitive" } },
            { id: { contains: q, mode: "insensitive" } },
          ];
        }

        totalCount = await (this.prisma as any).assessmentSession.count({ where: whereClause });
        dbItems = await (this.prisma as any).assessmentSession.findMany({
          where: whereClause,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        });
      }
    } catch (err) {
      console.warn("[AssessmentService] listAdminAssessmentSessions DB fetch notice:", err);
    }

    // Merge with in-memory sessions if DB is empty or during offline fallback
    if (dbItems.length === 0 && inMemoryAssessmentSessions.size > 0) {
      const allMem = Array.from(inMemoryAssessmentSessions.values()).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      const filtered = allMem.filter((item) => {
        if (params.status && params.status !== "ALL" && item.status !== params.status) return false;
        if (params.search && params.search.trim()) {
          const q = params.search.trim().toLowerCase();
          const matchName = item.candidateName.toLowerCase().includes(q);
          const matchPhone = item.phone.toLowerCase().includes(q);
          const matchId = item.id.toLowerCase().includes(q);
          if (!matchName && !matchPhone && !matchId) return false;
        }
        return true;
      });

      totalCount = filtered.length;
      dbItems = filtered.slice(skip, skip + limit).map((m) => ({
        id: m.id,
        examId: m.examId,
        fullName: m.candidateName,
        phone: m.phone,
        targetBand: m.targetBand,
        status: m.status,
        answers: m.answers,
        result: m.result,
        startedAt: m.startedAt,
        submittedAt: m.submittedAt,
        expiresAt: m.expiresAt,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      }));
    }

    // Enrich candidate info from ContactLead if placeholder detected
    for (const db of dbItems) {
      if (!db.fullName || db.fullName === "Thí sinh ARIS" || db.phone === "0900000000") {
        try {
          const lead = await this.prisma.contactLead.findFirst({
            where: {
              OR: [
                { notes: { contains: db.id } },
                { notes: { contains: db.id.toLowerCase() } },
                { notes: { contains: db.id.toUpperCase() } },
              ],
            },
            orderBy: { createdAt: "desc" },
          });
          if (lead) {
            if (lead.fullName) db.fullName = lead.fullName;
            if (lead.phone) db.phone = lead.phone;
            if (lead.goal) {
              const match = lead.goal.match(/Mục tiêu:\s*([^\n|]+)/i);
              if (match && match[1]) db.targetBand = match[1].trim();
            }
          }
        } catch {}
      }
    }

    const items = dbItems.map((db) => {
      const res = db.result || {};
      const answers = db.answers || {};
      const teacherReview = res.teacherReview || {};

      const hasWriting =
        typeof answers["writing_response"] === "string" &&
        answers["writing_response"].trim().length >= 10;
      const writingLength = typeof answers["writing_response"] === "string" ? answers["writing_response"].trim().length : 0;
      const hasSpeaking =
        !!answers["speaking_part1_audio_url"] ||
        !!answers["speaking_part2_audio_url"] ||
        !!answers["speaking_audio_url"] || // backward compat
        !!answers["speaking_completed"]; // backward compat

      let gradingStatus = teacherReview.gradingStatus;
      if (!gradingStatus) {
        gradingStatus = db.status === "SUBMITTED" ? "PENDING" : "IN_PROGRESS";
      }

      return {
        id: db.id,
        examId: db.examId,
        candidateName: db.fullName || db.candidateName,
        phone: db.phone,
        targetBand: db.targetBand || "Chưa xác định",
        status: db.status,
        objectiveScore: res.objectiveBreakdown || null,
        arisLevel: res.arisLevel || null,
        hasWriting,
        writingLength,
        hasSpeaking,
        gradingStatus,
        assignedTeacher: teacherReview.assignedTeacher || null,
        teacherNotes: teacherReview.teacherNotes || null,
        zaloDraftFeedback: teacherReview.zaloDraftFeedback || null,
        startedAt: db.startedAt || db.createdAt,
        submittedAt: db.submittedAt || null,
        createdAt: db.createdAt,
        updatedAt: db.updatedAt,
      };
    });

    let finalItems = items;
    if (params.gradingStatus && params.gradingStatus !== "ALL") {
      finalItems = items.filter((i) => i.gradingStatus === params.gradingStatus);
    }

    return {
      items: finalItems,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
    };
  }

  /**
   * 7. Admin: Get full submission details including raw answers, question breakdown, and audio recordings
   */
  public async getAdminAssessmentSessionDetail(sessionId: string): Promise<any | null> {
    const session = await this.getSessionById(sessionId);
    if (!session) return null;

    let testPayload: SanitizedPlacementTestPayload | null = null;
    let targetExamId = session.examId || "cce291f7-d88b-4976-8ed3-cc21daca7023";
    let dbExam: any = null;

    try {
      dbExam = await this.prisma.exam.findUnique({
        where: { id: targetExamId },
        include: {
          sections: {
            orderBy: { orderIndex: "asc" },
            include: {
              questionGroups: {
                orderBy: { orderIndex: "asc" },
                include: {
                  questions: {
                    orderBy: { orderIndex: "asc" },
                  },
                },
              },
            },
          },
        },
      });

      const totalExamQs = dbExam?.sections?.reduce(
        (sum: number, s: any) => sum + (s.questionGroups?.reduce((gsum: number, g: any) => gsum + (g.questions?.length || 0), 0) || 0),
        0
      ) || 0;

      if (!dbExam || totalExamQs === 0) {
        targetExamId = "cce291f7-d88b-4976-8ed3-cc21daca7023";
        dbExam = await this.prisma.exam.findUnique({
          where: { id: targetExamId },
          include: {
            sections: {
              orderBy: { orderIndex: "asc" },
              include: {
                questionGroups: {
                  orderBy: { orderIndex: "asc" },
                  include: {
                    questions: {
                      orderBy: { orderIndex: "asc" },
                    },
                  },
                },
              },
            },
          },
        });
      }

      if (dbExam && dbExam.sections && dbExam.sections.length > 0) {
        testPayload = this.transformDbExamToPayload(dbExam);
      }
    } catch (err) {
      console.warn("[AssessmentService] getAdminAssessmentSessionDetail DB exam lookup:", err);
    }

    if (!testPayload) {
      testPayload = canonicalPlacementTestPayload;
    }

    // Build question answer keys map from DB
    const dbAnswerKeys: Record<string, { correctAnswer: string; acceptedAnswers?: string[] }> = {};
    if (dbExam && dbExam.sections) {
      dbExam.sections.forEach((s: any) => {
        s.questionGroups?.forEach((g: any) => {
          g.questions?.forEach((q: any) => {
            if (q.correctAnswer) {
              dbAnswerKeys[q.id] = {
                correctAnswer: q.correctAnswer,
                acceptedAnswers: q.acceptedAnswers || [],
              };
            }
          });
        });
      });
    }

    const answers = session.answers || {};
    const res = (session.result || {}) as any;
    const teacherReview = res.teacherReview || {};

    const normalizeText = (s: any) =>
      String(s || "")
        .trim()
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ");

    const questionBreakdown: any[] = [];
    if (testPayload) {
      const allObjectiveQuestions = [
        ...testPayload.skills.listening.questions.map((q) => ({ ...q, skill: "listening" })),
        ...testPayload.skills.reading.questions.map((q) => ({ ...q, skill: "reading" })),
        ...testPayload.skills.grammar.questions.map((q) => ({ ...q, skill: "grammar" })),
      ];

      allObjectiveQuestions.forEach((q) => {
        const studentAns = answers[q.id];
        const key = dbAnswerKeys[q.id] || (authoritativePlacementAnswerKeys as any)[q.id];
        const rawCorrectAnswer = key?.correctAnswer || "Chưa có đáp án mẫu";

        // Check if multi-blank question
        let parsedKeys: string[] | null = null;
        try {
          if (typeof rawCorrectAnswer === "string" && rawCorrectAnswer.trim().startsWith("[")) {
            const arr = JSON.parse(rawCorrectAnswer);
            if (Array.isArray(arr) && arr.length > 0) parsedKeys = arr;
          }
        } catch {}

        if (parsedKeys && parsedKeys.length > 0) {
          parsedKeys.forEach((keyVal, bIdx) => {
            let sVal: any = undefined;
            if (studentAns && typeof studentAns === "object") {
              sVal = studentAns[bIdx] ?? studentAns[String(bIdx)];
            } else if (Array.isArray(studentAns)) {
              sVal = studentAns[bIdx];
            } else if (typeof studentAns === "string" && bIdx === 0) {
              sVal = studentAns;
            }

            let isCorrect = false;
            if (sVal != null && String(sVal).trim() !== "") {
              const normStudent = normalizeText(sVal);
              const alternatives = String(keyVal)
                .split("|")
                .map((s) => normalizeText(s));
              isCorrect = alternatives.some((alt) => alt === normStudent);
            }

            questionBreakdown.push({
              id: `${q.id}_blank_${bIdx}`,
              parentQuestionId: q.id,
              blankIndex: bIdx,
              skill: q.skill,
              sectionTitle: q.sectionTitle,
              questionType: "fill_blank",
              prompt: q.prompt,
              blankLabel: `Chỗ trống (${bIdx + 1})`,
              studentAnswer: sVal != null && String(sVal).trim() !== "" ? String(sVal).trim() : null,
              correctAnswer: String(keyVal),
              isCorrect,
            });
          });
        } else {
          let formattedStudentAns: string | null = null;
          if (studentAns != null && typeof studentAns === "object" && !Array.isArray(studentAns)) {
            const vals = Object.values(studentAns).filter(Boolean);
            formattedStudentAns = vals.length > 0 ? vals.join(" ") : null;
          } else if (studentAns != null) {
            formattedStudentAns = String(studentAns).trim();
          }

          let isCorrect = false;
          if (formattedStudentAns != null && formattedStudentAns !== "" && key) {
            const normStudent = normalizeText(formattedStudentAns);
            const alternatives = String(key.correctAnswer)
              .split("|")
              .map((s) => normalizeText(s));
            isCorrect = alternatives.some((alt) => alt === normStudent);
            if (!isCorrect && key.acceptedAnswers) {
              isCorrect = key.acceptedAnswers.some((acc: any) => normalizeText(acc) === normStudent);
            }
          }

          questionBreakdown.push({
            id: q.id,
            skill: q.skill,
            sectionTitle: q.sectionTitle,
            questionType: q.questionType,
            prompt: q.prompt,
            options: q.options,
            studentAnswer: formattedStudentAns && formattedStudentAns.length > 0 ? formattedStudentAns : null,
            correctAnswer: rawCorrectAnswer,
            isCorrect,
          });
        }
      });
    }

    return {
      session: {
        id: session.id,
        examId: session.examId,
        candidateName: session.candidateName,
        phone: session.phone,
        targetBand: session.targetBand,
        status: session.status,
        startedAt: session.startedAt,
        submittedAt: session.submittedAt,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
      answers,
      result: res,
      testPayload,
      dbAnswerKeys,
      questionBreakdown,
      teacherReview: {
        gradingStatus: teacherReview.gradingStatus || (session.status === "SUBMITTED" ? "PENDING" : "IN_PROGRESS"),
        assignedTeacher: teacherReview.assignedTeacher || "",
        teacherNotes: teacherReview.teacherNotes || "",
        zaloDraftFeedback: teacherReview.zaloDraftFeedback || "",
        reviewedAt: teacherReview.reviewedAt || null,
      },
    };
  }

  /**
   * 8. Admin: Update teacher grading status, assigned staff, and notes
   */
  public async updateAdminAssessmentSession(
    sessionId: string,
    updateData: {
      gradingStatus?: "PENDING" | "IN_PROGRESS" | "GRADED_SENT_ZALO";
      assignedTeacher?: string;
      teacherNotes?: string;
      zaloDraftFeedback?: string;
    }
  ): Promise<any> {
    const session = await this.getSessionById(sessionId);
    if (!session) {
      const err = new Error("Phiên khảo thí không tồn tại");
      (err as any).statusCode = 404;
      throw err;
    }

    const currentResult = (session.result || {}) as any;
    const currentReview = currentResult.teacherReview || {};

    const updatedReview = {
      ...currentReview,
      gradingStatus: updateData.gradingStatus || currentReview.gradingStatus || "PENDING",
      assignedTeacher: updateData.assignedTeacher !== undefined ? updateData.assignedTeacher : currentReview.assignedTeacher,
      teacherNotes: updateData.teacherNotes !== undefined ? updateData.teacherNotes : currentReview.teacherNotes,
      zaloDraftFeedback: updateData.zaloDraftFeedback !== undefined ? updateData.zaloDraftFeedback : currentReview.zaloDraftFeedback,
      reviewedAt: new Date().toISOString(),
    };

    const newResult = {
      ...currentResult,
      teacherReview: updatedReview,
    };

    session.result = newResult;
    session.updatedAt = new Date();
    inMemoryAssessmentSessions.set(sessionId, session);

    try {
      if ((this.prisma as any).assessmentSession) {
        const updatePayload: any = {
          result: newResult,
          updatedAt: session.updatedAt,
        };
        if (updateData.gradingStatus) {
          updatePayload.gradingStatus = updateData.gradingStatus;
          if (updateData.gradingStatus === "GRADED_SENT_ZALO") {
            updatePayload.gradedAt = new Date();
            updatePayload.sentAt = new Date();
          }
        }
        if (updateData.teacherNotes !== undefined) {
          updatePayload.teacherNotes = updateData.teacherNotes;
        }
        await (this.prisma as any).assessmentSession.update({
          where: { id: sessionId },
          data: updatePayload,
        });
      }
    } catch (err) {
      console.warn("[AssessmentService] Update session DB error:", err);
    }

    return {
      success: true,
      sessionId,
      teacherReview: updatedReview,
      updatedAt: session.updatedAt.toISOString(),
    };
  }
}

