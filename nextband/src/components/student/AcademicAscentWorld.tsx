import React from "react";
import type { AscentLessonNode } from "./spatial/types";
import { SpatialCurriculumPath } from "./spatial/SpatialCurriculumPath";

export type { AscentLessonNode };

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
