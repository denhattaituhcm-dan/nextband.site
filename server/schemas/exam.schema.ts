import { z } from "zod";

export const createExamSchema = z.object({
  courseId: z.string(),
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().optional(),
  week: z.number().int().min(1, "Tuần phải ít nhất là 1").default(1),
  durationMinutes: z
    .number()
    .int()
    .min(1, "Thời gian thi phải ít nhất là 1 phút")
    .default(60),
  examType: z.string().default("ielts"),
  template: z
    .enum([
      "blank",
      "single_speaking",
      "single_writing",
      "single_listening",
      "single_reading",
      "single_grammar",
      "full_ielts_mock",
    ])
    .optional(),
  isPublished: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  isLocked: z.boolean().optional().default(false),
  isOpen: z.boolean().optional().default(false),
  maxParticipants: z.number().int().positive().optional().nullable(),
});

export const updateExamSchema = createExamSchema.partial();

export const sectionTypeEnum = z.enum(
  ["listening", "reading", "writing", "speaking", "general"],
  {
    errorMap: () => ({
      message:
        "Loại phần thi không hợp lệ. Phải là: listening, reading, writing, speaking, general",
    }),
  },
);

export const createSectionSchema = z.object({
  sectionType: sectionTypeEnum,
  title: z.string().min(1, "Tiêu đề phần thi là bắt buộc"),
  instructions: z.string().max(5_000_000, "Nội dung hướng dẫn quá dài").optional(),
  content: z.any().optional(),
  audioUrl: z.string().optional(),
  audioScript: z.string().max(5_000_000, "Nội dung script quá dài").optional(),
  durationMinutes: z
    .number({ invalid_type_error: "Thời gian phải là số" })
    .int()
    .optional(),
  orderIndex: z.number().int().optional(),
});

export const updateSectionSchema = createSectionSchema.partial();

