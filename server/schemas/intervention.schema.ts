import { z } from "zod";

export const InterventionCategoryEnum = z.enum([
  "ACADEMIC_RISK",
  "ATTENDANCE",
  "HOMEWORK",
  "MOTIVATION",
  "MEDICAL",
  "TUITION",
  "OTHER",
]);

export const InterventionStatusEnum = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
]);

export const createInterventionSchema = z.object({
  studentId: z.string().min(1, "studentId là bắt buộc"),
  classId: z.string().nullable().optional(),
  category: InterventionCategoryEnum.default("ACADEMIC_RISK"),
  title: z.string().optional().nullable(),
  notes: z.string().min(1, "Nội dung trao đổi / ghi chú can thiệp không được để trống"),
  actionTaken: z.string().optional().nullable(),
  agreedPlan: z.string().optional().nullable(),
  followUpDate: z.string().optional().nullable(), // YYYY-MM-DD
  status: InterventionStatusEnum.default("OPEN"),
});

export const updateInterventionSchema = z.object({
  category: InterventionCategoryEnum.optional(),
  title: z.string().optional().nullable(),
  notes: z.string().optional(),
  actionTaken: z.string().optional().nullable(),
  agreedPlan: z.string().optional().nullable(),
  followUpDate: z.string().optional().nullable(),
  status: InterventionStatusEnum.optional(),
});

export type CreateInterventionInput = z.infer<typeof createInterventionSchema>;
export type UpdateInterventionInput = z.infer<typeof updateInterventionSchema>;
