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
