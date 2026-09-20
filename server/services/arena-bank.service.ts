import { PrismaClient } from "@prisma/client";
import { ARENA_STANDARD_QUESTIONS, ArenaQuestion, ArenaQuestionOption } from "./arena-questions.data.js";

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

export class ArenaBankService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Loads and normalizes playable Arena questions from a specific Exam in DB.
   * If exam has no multiple choice questions or examId is null, fallbacks to ARENA_STANDARD_QUESTIONS.
   */
  public async getQuestionsForRoom(examId?: string | null): Promise<ArenaQuestion[]> {
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

      // Fallback if exam has only open essay/recording questions
      return ARENA_STANDARD_QUESTIONS;
    } catch (err) {
      console.warn("[ArenaBankService] Lỗi nạp câu hỏi từ examId:", examId, err);
      return ARENA_STANDARD_QUESTIONS;
    }
  }
}
