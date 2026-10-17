/**
 * Master GRADE 8 Arena Questions Bank
 * Aggregates questions for Grade 8 (THCS - Global Success)
 * Source: D:\ARIS IELTS\THCS\Đề kiểm tra lớp 8
 */

import { GRADE8_UNIT1_QUESTIONS } from "./grade8_bank_parts/unit1.data.js";

export interface ArenaQuestionOption {
  id: string;
  label: string;
  text: string;
}

export interface ArenaQuestionItem {
  id: string;
  roundIndex: number;
  prompt: string;
  options: ArenaQuestionOption[];
  correctOptionId: string;
  timeLimitSeconds: number;
  points: number;
  explanation: string;
  correctExplanation?: string;
  correctAnswerText?: string;
  misconception?: {
    baitOptionId?: string;
    baitOptionText?: string;
    diagnosticTitle?: string;
    explanation?: string;
  };
}

// Map each question to ensure both explanation and correctExplanation are present
function normalizeBankQuestions(bank: Record<string, any[]>): Record<string, ArenaQuestionItem[]> {
  const result: Record<string, ArenaQuestionItem[]> = {};
  for (const [key, questions] of Object.entries(bank)) {
    result[key] = questions.map((q) => ({
      ...q,
      explanation: q.explanation || q.correctExplanation || "",
      correctExplanation: q.correctExplanation || q.explanation || "",
    }));
  }
  return result;
}

export const GRADE8_ARENA_LESSON_QUESTIONS: Record<string, ArenaQuestionItem[]> = normalizeBankQuestions({
  ...GRADE8_UNIT1_QUESTIONS,
});

/**
 * Fuzzy matcher to match an exam title from LMS to the Grade 8 Question Bank key
 * e.g. "Unit 1: Leisure Time" -> "UNIT 1 – LEISURE TIME"
 * e.g. "Unit 1" -> "UNIT 1 – LEISURE TIME"
 * e.g. "U1 - Leisure Time" -> "UNIT 1 – LEISURE TIME"
 * e.g. "Đề kiểm tra Tiếng Anh 8 Unit 1" -> "UNIT 1 – LEISURE TIME"
 */
export function matchGrade8LessonKey(title: string): string | null {
  if (!title) return null;
  const upper = title.toUpperCase().trim();

  // Pattern 1: UNIT <num> or U<num>
  const unitMatch = upper.match(/(?:UNIT|U)\s*(\d{1,2})/);
  if (unitMatch) {
    const unitNum = parseInt(unitMatch[1], 10);
    for (const key of Object.keys(GRADE8_ARENA_LESSON_QUESTIONS)) {
      const keyMatch = key.toUpperCase().match(/UNIT\s*(\d{1,2})/);
      if (keyMatch && parseInt(keyMatch[1], 10) === unitNum) {
        return key;
      }
    }
  }

  // Pattern 2: Direct substring match against keys
  for (const key of Object.keys(GRADE8_ARENA_LESSON_QUESTIONS)) {
    if (upper.includes(key.toUpperCase())) return key;
  }

  // Pattern 3: Topic name match e.g. "LEISURE TIME"
  for (const key of Object.keys(GRADE8_ARENA_LESSON_QUESTIONS)) {
    const parts = key.split(/–|-/);
    if (parts.length > 1) {
      const topic = parts[1].trim().toUpperCase();
      if (topic && upper.includes(topic)) return key;
    }
  }

  return null;
}
