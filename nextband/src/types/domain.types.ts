/**
 * Shared domain interfaces to break circular dependencies between API client and data mappers.
 */
export interface ClassPeerRank {
  studentId: string;
  fullName: string;
  avatarUrl?: string | null;
  completedCount: number;
  totalHomeworks: number;
  completionRate: number;
  rank: number;
  isMe: boolean;
}

export interface MyClassEnrollment {
  id: string;
  classId: string;
  className: string;
  courseId: string;
  courseTitle: string;
  courseSlug?: string | null;
  teacherName: string | null;
  isActive: boolean;
  membershipStatus: string;
  joinedAt: string;
}

