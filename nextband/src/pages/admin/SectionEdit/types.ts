import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  FileText,
} from "lucide-react";

export const sectionIcons = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
  general: FileText,
};

export const sectionColors = {
  listening: "bg-listening text-white",
  reading: "bg-reading text-white",
  writing: "bg-writing text-white",
  speaking: "bg-speaking text-white",
  general: "bg-primary text-primary-foreground",
};

export const ALL_QUESTION_TYPES = [
  { value: "multiple_choice", label: "Trắc nghiệm" },
  { value: "fill_blank", label: "Điền vào chỗ trống" },
  { value: "short_answer", label: "Trả lời ngắn" },
  { value: "true_false_not_given", label: "TRUE/FALSE/NOT GIVEN" },
  { value: "yes_no_not_given", label: "YES/NO/NOT GIVEN" },
  { value: "matching", label: "Nối đáp án" },
  { value: "essay", label: "Bài luận / Viết dài" },
  { value: "speaking", label: "Ghi âm (Speaking)" },
  { value: "listening", label: "Nghe hiểu (Listening)" },
];

export const SECTION_QUESTION_TYPES: Record<string, string[]> = {
  listening: [
    "multiple_choice",
    "fill_blank",
    "short_answer",
    "true_false_not_given",
    "yes_no_not_given",
    "matching",
  ],
  reading: [
    "multiple_choice",
    "fill_blank",
    "short_answer",
    "true_false_not_given",
    "yes_no_not_given",
    "matching",
    "essay",
  ],
  writing: [
    "essay",
    "fill_blank",
    "short_answer",
    "multiple_choice",
    "matching",
    "true_false_not_given",
    "yes_no_not_given",
  ],
  speaking: ["speaking"],
  general: ALL_QUESTION_TYPES.map((t) => t.value),
};

export function getQuestionTypesForSection(sectionType: string) {
  const allowed =
    SECTION_QUESTION_TYPES[sectionType] || SECTION_QUESTION_TYPES.general;
  return ALL_QUESTION_TYPES.filter((t) => allowed.includes(t.value));
}

export interface QuestionGroup {
  id: string;
  title: string | null;
  passage: string | null;
  instructions: string | null;
  audioUrl: string | null;
  orderIndex: number;
  questions: Question[];
}

export interface Question {
  id: string;
  questionText: string;
  questionType: string;
  options: string[] | null;
  correctAnswer: string | null;
  points: number;
  orderIndex?: number;
  order_index?: number;
}

// Helper to extract detailed validation error messages from API response
export function getErrorMessage(error: any, defaultMsg: string) {
  const data = error?.response?.data;
  if (!data) return error?.message || defaultMsg;
  if (data.details) {
    const messages: string[] = [];
    for (const key in data.details) {
      if (Array.isArray(data.details[key])) {
        messages.push(...data.details[key]);
      } else if (typeof data.details[key] === "string") {
        messages.push(data.details[key]);
      }
    }
    if (messages.length > 0) return messages.join(", ");
  }
  return data.error || data.message || defaultMsg;
}
