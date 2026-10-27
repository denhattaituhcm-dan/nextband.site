/**
 * Leader LEADER Arena Questions Bank
 * Source: Giáo trình LEADER 2027 - Đã soát lỗi.docx & Giáo án Leader 2028 (Teacher Guide)
 * Target: Band 6.5 | Training 7.0–7.5
 */

import { LEADER_WEEK_1_QUESTIONS } from "./leader_bank_parts/week1.data.js";
import { LEADER_WEEK_2_QUESTIONS } from "./leader_bank_parts/week2.data.js";
import { LEADER_WEEK_3_QUESTIONS } from "./leader_bank_parts/week3.data.js";
import { LEADER_WEEK_4_QUESTIONS } from "./leader_bank_parts/week4.data.js";
import { LEADER_WEEK_5_QUESTIONS } from "./leader_bank_parts/week5.data.js";
import { LEADER_WEEK_6_QUESTIONS } from "./leader_bank_parts/week6.data.js";
import { LEADER_WEEK_7_QUESTIONS } from "./leader_bank_parts/week7.data.js";
import { LEADER_WEEK_8_QUESTIONS } from "./leader_bank_parts/week8.data.js";
import { LEADER_WEEK_9_QUESTIONS } from "./leader_bank_parts/week9.data.js";
import { LEADER_WEEK_10_QUESTIONS } from "./leader_bank_parts/week10.data.js";
import { ArenaQuestionItem } from "./doer-questions-bank.data.js";

function toArenaQuestionItem(q: any, idx: number): ArenaQuestionItem {
  const options = (q.options || []).map((opt: any, oIdx: number) => {
    const label = opt.label || opt.id.replace("opt_", "") || ["A", "B", "C", "D"][oIdx];
    const id = opt.id.startsWith("opt_") ? opt.id : `opt_${label}`;
    return {
      id,
      label,
      text: opt.text,
    };
  });

  const correctOptionId = q.correctOptionId.startsWith("opt_")
    ? q.correctOptionId
    : `opt_${q.correctOptionId}`;

  let misconception = undefined;
  if (q.misconception) {
    const baitId = q.misconception.baitOptionId.startsWith("opt_")
      ? q.misconception.baitOptionId
      : `opt_${q.misconception.baitOptionId}`;
    misconception = {
      baitOptionId: baitId,
      baitOptionText: q.misconception.baitOptionText,
      diagnosticTitle: q.misconception.diagnosticTitle,
      explanation: q.misconception.explanation,
    };
  }

  return {
    id: q.id,
    roundIndex: typeof q.roundIndex === "number" ? q.roundIndex : idx,
    prompt: q.prompt,
    options,
    correctOptionId,
    timeLimitSeconds: q.timeLimitSeconds || 20,
    points: q.points || 1000,
    explanation: q.correctExplanation || q.explanation || "",
    misconception,
  };
}

const lessonsMap: Record<string, ArenaQuestionItem[]> = {};

// Weeks 1, 2, 3 are Record<string, any[]>
[LEADER_WEEK_1_QUESTIONS, LEADER_WEEK_2_QUESTIONS, LEADER_WEEK_3_QUESTIONS].forEach((wkRecord) => {
  for (const [lessonKey, qList] of Object.entries(wkRecord)) {
    lessonsMap[lessonKey] = qList.map((q: any, idx: number) => toArenaQuestionItem(q, idx));
  }
});

// Weeks 4 to 10 are ArenaQuestion[]
[
  LEADER_WEEK_4_QUESTIONS,
  LEADER_WEEK_5_QUESTIONS,
  LEADER_WEEK_6_QUESTIONS,
  LEADER_WEEK_7_QUESTIONS,
  LEADER_WEEK_8_QUESTIONS,
  LEADER_WEEK_9_QUESTIONS,
  LEADER_WEEK_10_QUESTIONS,
].forEach((wkArr) => {
  wkArr.forEach((q: any) => {
    const lessonKey = q.lesson.trim();
    if (!lessonsMap[lessonKey]) {
      lessonsMap[lessonKey] = [];
    }
    lessonsMap[lessonKey].push(toArenaQuestionItem(q, lessonsMap[lessonKey].length));
  });
});

export const LEADER_ARENA_LESSON_QUESTIONS: Record<string, ArenaQuestionItem[]> = lessonsMap;

/**
 * Fuzzy matcher for LEADER course exams
 * e.g. "LEADER - WEEK 1 – DAY 1" -> "WEEK 1 – DAY 1"
 * e.g. "W1 - D1: Essay Structure" -> "WEEK 1 – DAY 1"
 * e.g. "L70-W04-D2" -> "WEEK 4 – DAY 2"
 */
export function matchLeaderLessonKey(title: string): string | null {
  if (!title) return null;
  const upper = title.toUpperCase().trim();

  // Pattern 0: L70-W01-D1 or L70-W1-D1
  const l70Match = upper.match(/L70[-_]W0?(\d{1,2})[-_]D0?(\d)/);
  if (l70Match) {
    const w = parseInt(l70Match[1], 10);
    const d = parseInt(l70Match[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (LEADER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 1: W<week> - D<day> or W<week>D<day> or W<week> - DAY <day>
  const wMatch = upper.match(/W(?:EEK)?\s*0?(\d{1,2})\s*[-_–—\s]?\s*D(?:AY)?\s*0?(\d)/);
  if (wMatch) {
    const w = parseInt(wMatch[1], 10);
    const d = parseInt(wMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (LEADER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  // Pattern 2: WEEK <week> ... DAY <day>
  const weekDayMatch = upper.match(/WEEK\s*0?(\d{1,2}).*?DAY\s*0?(\d)/);
  if (weekDayMatch) {
    const w = parseInt(weekDayMatch[1], 10);
    const d = parseInt(weekDayMatch[2], 10);
    const key = `WEEK ${w} – DAY ${d}`;
    if (LEADER_ARENA_LESSON_QUESTIONS[key]) return key;
  }

  return null;
}
