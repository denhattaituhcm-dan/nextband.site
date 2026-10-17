import { PrismaClient } from "@prisma/client";
import { ARENA_STANDARD_QUESTIONS, ArenaQuestion, ArenaQuestionOption } from "./arena-questions.data.js";
import { DOER_ARENA_LESSON_QUESTIONS, matchDoerLessonKey } from "./doer-questions-bank.data.js";

/**
 * Strips HTML tags and decodes common HTML entities for crisp text display in Arena HUD
 */
function cleanHtml(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Deterministic string hash for seeded shuffling
 */
export function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Shuffles question options evenly across A, B, C, D using a seeded pseudo-random shuffle.
 * Guarantees correct answer and misconception bait options are correctly updated.
 */
export function shuffleQuestionOptions(question: ArenaQuestion, seedStr?: string): ArenaQuestion {
  if (!question.options || question.options.length < 2) {
    return question;
  }

  // Find original correct option and original bait option
  const originalCorrect = question.options.find((o) => o.id === question.correctOptionId) || question.options[0];
  const originalBait = question.misconception
    ? question.options.find((o) => o.id === question.misconception?.baitOptionId)
    : null;

  // Pseudo-random seeded Fisher-Yates shuffle
  const seedNum = hashSeed(seedStr || question.id || "arena_shuffle");
  const shuffled = [...question.options];
  let curSeed = seedNum;

  for (let i = shuffled.length - 1; i > 0; i--) {
    curSeed = (curSeed * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((curSeed / 4294967296) * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const labels: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
  const newOptions: ArenaQuestionOption[] = shuffled.map((opt, idx) => ({
    id: `opt_${labels[idx]}`,
    label: labels[idx],
    text: opt.text,
  }));

  // Identify new correct option
  const newCorrectIdx = shuffled.findIndex((opt) => opt.text === originalCorrect.text);
  const correctIdxSafe = newCorrectIdx >= 0 ? newCorrectIdx : 0;
  const newCorrectOptionId = newOptions[correctIdxSafe].id;
  const newCorrectAnswerText = `${newOptions[correctIdxSafe].label}. ${newOptions[correctIdxSafe].text}`;

  // Identify new bait option if misconception is defined
  let newMisconception = question.misconception;
  if (originalBait && question.misconception) {
    const newBaitIdx = shuffled.findIndex((opt) => opt.text === originalBait.text);
    if (newBaitIdx >= 0) {
      newMisconception = {
        ...question.misconception,
        baitOptionId: newOptions[newBaitIdx].id,
        baitOptionText: `${newOptions[newBaitIdx].label}. ${newOptions[newBaitIdx].text}`,
      };
    }
  }

  return {
    ...question,
    options: newOptions,
    correctOptionId: newCorrectOptionId,
    correctAnswerText: newCorrectAnswerText,
    misconception: newMisconception,
  };
}

export class ArenaBankService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Loads and normalizes playable Arena questions from a specific Exam in DB.
   * If exam has no multiple choice questions or examId is null, fallbacks to ARENA_STANDARD_QUESTIONS.
   * Options are shuffled deterministically per room/seed so correct answers are not predictably 'A'.
   */
  public async getQuestionsForRoom(examId?: string | null, seed?: string): Promise<ArenaQuestion[]> {
    if (!examId) {
      return ARENA_STANDARD_QUESTIONS;
    }

    try {
      const exam = await this.prisma.exam.findUnique({
        where: { id: examId },
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

      if (!exam || !exam.sections || exam.sections.length === 0) {
        return ARENA_STANDARD_QUESTIONS;
      }

      const allDbQuestions: any[] = [];
      for (const section of exam.sections) {
        for (const group of section.questionGroups) {
          for (const q of group.questions) {
            allDbQuestions.push(q);
          }
        }
      }

      // Filter and convert questions that fit the Arena format
      const playableQuestions: ArenaQuestion[] = [];
      let roundIndex = 0;

      for (const q of allDbQuestions) {
        const qText = cleanHtml(q.questionText || "");
        if (!qText) continue;

        const qType = (q.questionType || "").toLowerCase();
        let parsedOptions: ArenaQuestionOption[] = [];
        let correctOptId = "opt_A";
        let correctAnswerDisplay = "";

        // 1. True/False/Not Given or Yes/No/Not Given
        if (qType === "true_false_not_given" || qType === "yes_no_not_given") {
          const isYesNo = qType === "yes_no_not_given";
          const labels: Array<"A" | "B" | "C"> = ["A", "B", "C"];
          const texts = isYesNo ? ["YES", "NO", "NOT GIVEN"] : ["TRUE", "FALSE", "NOT GIVEN"];

          parsedOptions = texts.map((t, idx) => ({
            id: `opt_${labels[idx]}`,
            label: labels[idx] as "A" | "B" | "C",
            text: t,
          }));

          const cleanCorrect = cleanHtml(q.correctAnswer || "").toUpperCase();
          const targetIdx = texts.findIndex((t) => cleanCorrect.includes(t));
          if (targetIdx >= 0) {
            correctOptId = parsedOptions[targetIdx].id;
            correctAnswerDisplay = `${parsedOptions[targetIdx].label}. ${texts[targetIdx]}`;
          } else {
            correctOptId = parsedOptions[0].id;
            correctAnswerDisplay = `${parsedOptions[0].label}. ${texts[0]}`;
          }
        } else if (qType === "multiple_choice" || (Array.isArray(q.options) && q.options.length >= 2)) {
          // 2. Multiple Choice Questions
          let rawOptions: string[] = [];
          if (Array.isArray(q.options)) {
            rawOptions = q.options
              .map((o: any) => cleanHtml(typeof o === "string" ? o : o.text || ""))
              .filter((text) => text.length > 0);
          }

          if (rawOptions.length >= 2) {
            const labels: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
            parsedOptions = rawOptions.slice(0, 4).map((text, idx) => ({
              id: `opt_${labels[idx]}`,
              label: labels[idx],
              text: text.replace(/^[A-D][.\s\t]+/, "").trim(), // Strip leading 'A. ', 'B. ' if present
            }));

            // Match correct answer
            const cleanCorrect = cleanHtml(q.correctAnswer || "");
            const foundIdx = rawOptions.findIndex((optText, i) => {
              const stripped = optText.replace(/^[A-D][.\s\t]+/, "").trim().toLowerCase();
              return (
                optText.toLowerCase() === cleanCorrect.toLowerCase() ||
                stripped === cleanCorrect.toLowerCase() ||
                labels[i]?.toLowerCase() === cleanCorrect.toLowerCase()
              );
            });

            if (foundIdx >= 0 && foundIdx < parsedOptions.length) {
              correctOptId = parsedOptions[foundIdx].id;
              correctAnswerDisplay = `${parsedOptions[foundIdx].label}. ${parsedOptions[foundIdx].text}`;
            } else {
              correctOptId = parsedOptions[0].id;
              correctAnswerDisplay = `${parsedOptions[0].label}. ${parsedOptions[0].text}`;
            }
          }
        }

        if (parsedOptions.length >= 2) {
          playableQuestions.push({
            id: q.id,
            roundIndex,
            prompt: qText,
            options: parsedOptions,
            correctOptionId: correctOptId,
            correctAnswerText: correctAnswerDisplay,
            correctExplanation: `Đáp án chính xác: ${correctAnswerDisplay}`,
          });
          roundIndex++;
        }
      }

      if (playableQuestions.length > 0) {
        return playableQuestions;
      }

      // Check DOER Coursebook questions bank matching exam.title
      if (exam && exam.title) {
        const doerKey = matchDoerLessonKey(exam.title);
        if (doerKey && DOER_ARENA_LESSON_QUESTIONS[doerKey]) {
          const bankQuestions = DOER_ARENA_LESSON_QUESTIONS[doerKey];
          return bankQuestions.map((bq, idx) => {
            const correctOpt = bq.options.find((o) => o.id === bq.correctOptionId) || bq.options[0];
            const rawQ: ArenaQuestion = {
              id: bq.id,
              roundIndex: idx,
              prompt: bq.prompt,
              options: bq.options as ArenaQuestionOption[],
              correctOptionId: bq.correctOptionId,
              correctAnswerText: `${correctOpt.label}. ${correctOpt.text}`,
              correctExplanation: bq.explanation,
              misconception: bq.misconception,
            };
            return shuffleQuestionOptions(rawQ, seed ? `${seed}_${bq.id}` : bq.id);
          });
        }
      }

      // Fallback if exam has only open essay/recording questions and no DOER bank match
      return ARENA_STANDARD_QUESTIONS;
    } catch (err) {
      console.warn("[ArenaBankService] Lỗi nạp câu hỏi từ examId:", examId, err);
      return ARENA_STANDARD_QUESTIONS;
    }
  }
}
