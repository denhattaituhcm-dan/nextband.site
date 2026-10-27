/**
 * Master MASTER Arena Questions Bank
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: Band 6.0 | Performance 6.0–6.5
 */

import { MASTER_WEEK_1_QUESTIONS } from "./master_bank_parts/week1.data.js";
import { MASTER_WEEK_2_QUESTIONS } from "./master_bank_parts/week2.data.js";
import { MASTER_WEEK_3_QUESTIONS } from "./master_bank_parts/week3.data.js";
import { MASTER_WEEK_4_QUESTIONS } from "./master_bank_parts/week4.data.js";
import { MASTER_WEEK_5_QUESTIONS } from "./master_bank_parts/week5.data.js";
import { MASTER_WEEK_6_QUESTIONS } from "./master_bank_parts/week6.data.js";
import { MASTER_WEEK_7_QUESTIONS } from "./master_bank_parts/week7.data.js";
import { MASTER_WEEK_8_QUESTIONS } from "./master_bank_parts/week8.data.js";
import { MASTER_WEEK_9_QUESTIONS } from "./master_bank_parts/week9.data.js";
import { ArenaQuestionItem } from "./doer-questions-bank.data.js";

export const MASTER_ARENA_LESSON_QUESTIONS: Record<string, ArenaQuestionItem[]> = {
  ...MASTER_WEEK_1_QUESTIONS,
  ...MASTER_WEEK_2_QUESTIONS,
  ...MASTER_WEEK_3_QUESTIONS,
  ...MASTER_WEEK_4_QUESTIONS,
  ...MASTER_WEEK_5_QUESTIONS,
  ...MASTER_WEEK_6_QUESTIONS,
  ...MASTER_WEEK_7_QUESTIONS,
  ...MASTER_WEEK_8_QUESTIONS,
  ...MASTER_WEEK_9_QUESTIONS,
};

/**
 * Fuzzy matcher for MASTER course exams
 * e.g. "WEEK 1 - DAY 1 - WRITING" -> "WEEK 1 – DAY 1"
 * e.g. "W1 - D1: Basic sentence structure" -> "WEEK 1 – DAY 1"
 * e.g. "WEEK 2 - DAY 2 - READING" -> "WEEK 2 – DAY 2"
 */
export function matchMasterLessonKey(title: string): string | null {
  if (!title) return null;
  const upper = title.toUpperCase().trim();

  // Pattern 1: W<week> - D<day> or W<week>D<day> or W<week> - DAY <day>
  const wMatch = upper.match(/W(?:EEK)?\s*(\d{1,2})\s*[-_–—\s]?\s*D(?:AY)?\s*(\d)/);
  if (wMatch) {
    const w = parseInt(wMatch[1], 10);
    const d = parseInt(wMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (MASTER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 2: WEEK <week> ... DAY <day>
  const weekDayMatch = upper.match(/WEEK\s*(\d{1,2}).*?DAY\s*(\d)/);
  if (weekDayMatch) {
    const w = parseInt(weekDayMatch[1], 10);
    const d = parseInt(weekDayMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (MASTER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  return null;
}
