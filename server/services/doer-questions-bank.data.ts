/**
 * Master DOER Arena Questions Bank
 * Aggregates all 9 weeks (27 lessons x 10 questions = 270 questions)
 * Source: Giáo trình DOER 2027 - Đã soát lỗi.docx
 */

import { WEEK_1_QUESTIONS } from "./bank_parts/week1.data.js";
import { WEEK_2_QUESTIONS } from "./bank_parts/week2.data.js";
import { WEEK_3_QUESTIONS } from "./bank_parts/week3.data.js";
import { WEEK_4_QUESTIONS } from "./bank_parts/week4.data.js";
import { WEEK_5_QUESTIONS } from "./bank_parts/week5.data.js";
import { WEEK_6_QUESTIONS } from "./bank_parts/week6.data.js";
import { WEEK_7_QUESTIONS } from "./bank_parts/week7.data.js";
import { WEEK_8_QUESTIONS } from "./bank_parts/week8.data.js";
import { WEEK_9_QUESTIONS } from "./bank_parts/week9.data.js";

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
}

export const DOER_ARENA_LESSON_QUESTIONS: Record<string, ArenaQuestionItem[]> = {
  ...WEEK_1_QUESTIONS,
  ...WEEK_2_QUESTIONS,
  ...WEEK_3_QUESTIONS,
  ...WEEK_4_QUESTIONS,
  ...WEEK_5_QUESTIONS,
  ...WEEK_6_QUESTIONS,
  ...WEEK_7_QUESTIONS,
  ...WEEK_8_QUESTIONS,
  ...WEEK_9_QUESTIONS,
};

/**
 * Fuzzy / pattern matcher to match an exam title from LMS to the DOER Question Bank key
 * e.g. "W1 - D1: Grammar Foundation" -> "WEEK 1 – DAY 1"
 * e.g. "Buổi 1 Final Test" -> "WEEK 1 – DAY 1"
 * e.g. "Week 4 Day 2" -> "WEEK 4 – DAY 2"
 */
export function matchDoerLessonKey(title: string): string | null {
  if (!title) return null;
  const upper = title.toUpperCase().trim();

  // Pattern 1: W<week> - D<day> or W<week>D<day> or W<week> - DAY <day>
  const wMatch = upper.match(/W(\d{1,2})\s*[-_–—\s]?\s*D(?:AY)?\s*(\d)/);
  if (wMatch) {
    const w = parseInt(wMatch[1], 10);
    const d = parseInt(wMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (DOER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 2: WEEK <week> ... DAY <day>
  const weekDayMatch = upper.match(/WEEK\s*(\d{1,2}).*?DAY\s*(\d)/);
  if (weekDayMatch) {
    const w = parseInt(weekDayMatch[1], 10);
    const d = parseInt(weekDayMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (DOER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 3: BUỔI / BUOI <num> -> Convert sequential lesson number (1-27)
  const sessionMatch = upper.match(/(?:BUỔI|BUOI)\s*(\d{1,2})/);
  if (sessionMatch) {
    const sessionNum = parseInt(sessionMatch[1], 10);
    if (sessionNum >= 1 && sessionNum <= 27) {
      const w = Math.floor((sessionNum - 1) / 3) + 1;
      const d = ((sessionNum - 1) % 3) + 1;
      const key = `WEEK ${w} – DAY ${d}`;
      if (DOER_ARENA_LESSON_QUESTIONS[key]) return key;
    }
  }

  // Direct check against known keys
  for (const key of Object.keys(DOER_ARENA_LESSON_QUESTIONS)) {
    if (upper.includes(key)) return key;
  }

  return null;
}
