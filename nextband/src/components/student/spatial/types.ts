import { CanonicalVisualStatus } from "@/lib/homeworkStatusHelper";

/**
 * Shared type for ARIS Spatial Learning Environment.
 * Extracted to isolate spatial component hierarchy and eliminate circular dependencies.
 */
export interface AscentLessonNode {
  id: string;
  examId: string;
  order: number; // 1 to 27
  title: string;
  description?: string;
  status: CanonicalVisualStatus;
  estimatedMinutes?: number;
  chapterIndex: 1 | 2 | 3;
  chapterTitle: string;
  isMilestone?: boolean;
  milestoneTitle?: string;
  deadlineText?: string;
  submission?: any;
}
