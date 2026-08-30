import React from "react";
import { CanonicalVisualStatus } from "@/lib/homeworkStatusHelper";
import { SpatialCurriculumPath } from "./spatial/SpatialCurriculumPath";

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

export interface AcademicAscentWorldProps {
  courseTitle: string;
  className: string;
  currentBand: number;
  targetBand: number;
  lessons: AscentLessonNode[];
  onSelectLesson?: (lesson: AscentLessonNode) => void;
  enrolledClassId?: string;
}

/**
 * AcademicAscentWorld
 * Main facade for the ARIS Spatial Learning Environment.
 * Encapsulates the progressive-enhancement SpatialCurriculumPath.
 */
export function AcademicAscentWorld(props: AcademicAscentWorldProps) {
  return <SpatialCurriculumPath {...props} />;
}
