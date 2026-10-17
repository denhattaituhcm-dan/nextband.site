/**
 * Master BUILDER Arena Questions Bank
 * Aggregates all weeks of the BUILDER course
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 */

import { BUILDER_WEEK_1_QUESTIONS } from "./builder_bank_parts/week1.data.js";
import { BUILDER_WEEK_2_QUESTIONS } from "./builder_bank_parts/week2.data.js";
import { BUILDER_WEEK_3_QUESTIONS } from "./builder_bank_parts/week3.data.js";
import { BUILDER_WEEK_4_QUESTIONS } from "./builder_bank_parts/week4.data.js";
import { BUILDER_WEEK_5_QUESTIONS } from "./builder_bank_parts/week5.data.js";
import { BUILDER_WEEK_6_QUESTIONS } from "./builder_bank_parts/week6.data.js";
import { BUILDER_WEEK_7_QUESTIONS } from "./builder_bank_parts/week7.data.js";
import { BUILDER_WEEK_8_QUESTIONS } from "./builder_bank_parts/week8.data.js";
import { BUILDER_WEEK_9_QUESTIONS } from "./builder_bank_parts/week9.data.js";

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
  misconception?: {
    baitOptionId?: string;
    baitOptionText?: string;
    diagnosticTitle?: string;
    explanation?: string;
  };
}

export const BUILDER_ARENA_LESSON_QUESTIONS: Record<string, ArenaQuestionItem[]> = {
  ...BUILDER_WEEK_1_QUESTIONS,
  ...BUILDER_WEEK_2_QUESTIONS,
  ...BUILDER_WEEK_3_QUESTIONS,
  ...BUILDER_WEEK_4_QUESTIONS,
  ...BUILDER_WEEK_5_QUESTIONS,
  ...BUILDER_WEEK_6_QUESTIONS,
  ...BUILDER_WEEK_7_QUESTIONS,
  ...BUILDER_WEEK_8_QUESTIONS,
  ...BUILDER_WEEK_9_QUESTIONS,
};

/**
 * Fuzzy / pattern matcher to match an exam title from LMS to the BUILDER Question Bank key
 * e.g. "W1 - D1: 01 câu có bao nhiêu mệnh đề" -> "WEEK 1 – DAY 1"
 * e.g. "W1 - D1 - WRI" -> "WEEK 1 – DAY 1"
 * e.g. "Week 2 Day 2" -> "WEEK 2 – DAY 2"
 * e.g. "Buổi 1: Writing" -> "WEEK 1 – DAY 1"
 */
export function matchBuilderLessonKey(title: string): string | null {
  if (!title) return null;
  const upper = title.toUpperCase().trim();

  // Pattern 1: W<week> - D<day> or W<week>D<day> or W<week> - DAY <day>
  const wMatch = upper.match(/W(\d{1,2})\s*[-_–—\s]?\s*D(?:AY)?\s*(\d)/);
  if (wMatch) {
    const w = parseInt(wMatch[1], 10);
    const d = parseInt(wMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (BUILDER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 2: WEEK <week> ... DAY <day>
  const weekDayMatch = upper.match(/WEEK\s*(\d{1,2}).*?DAY\s*(\d)/);
  if (weekDayMatch) {
    const w = parseInt(weekDayMatch[1], 10);
    const d = parseInt(weekDayMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (BUILDER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 3: BUỔI / BUOI <num> -> Convert sequential lesson number (1-27)
  const sessionMatch = upper.match(/(?:BUỔI|BUOI)\s*(\d{1,2})/);
  if (sessionMatch) {
    const sessionNum = parseInt(sessionMatch[1], 10);
    if (sessionNum >= 1 && sessionNum <= 27) {
      const w = Math.floor((sessionNum - 1) / 3) + 1;
      const d = ((sessionNum - 1) % 3) + 1;
      const key = `WEEK ${w} – DAY ${d}`;
      if (BUILDER_ARENA_LESSON_QUESTIONS[key]) return key;
    }
  }

  // Direct check against known keys
  for (const key of Object.keys(BUILDER_ARENA_LESSON_QUESTIONS)) {
    if (upper.includes(key)) return key;
  }

  return null;
}
