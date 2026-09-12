/**
 * ARENA DOMAIN CONTRACT & TYPES
 * Tuân thủ Hiến pháp Kiến trúc Điều 7 (Pure Engine) và Điều 35 (Knowledge-Free).
 */

export type ArenaState =
  | 'LOBBY'
  | 'READY_CHECK'
  | 'COUNTDOWN'
  | 'QUESTION_LIVE'
  | 'ANSWER_LOCKED'
  | 'REVEAL_DISTRIBUTION'
  | 'REVEAL_PERSONAL'
  | 'TEACHER_DEBRIEF'
  | 'LEADERBOARD'
  | 'PODIUM';

export interface ArenaQuestionOption {
  id: string;
  label: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface ArenaQuestionPayload {
  id: string;
  roundIndex: number;
  totalRounds: number;
  prompt: string;
  options: ArenaQuestionOption[];
  timeLimitSeconds: number;
  startedAt: number; // Server epoch ms
  deadlineAt: number; // Server epoch ms
  sequence: number;
}

export interface ArenaQuestionResolution {
  questionId: string;
  correctOptionId: string;
  explanation: string;
  misconceptionTag?: string;
  misconceptionSummary?: string;
  distribution: Record<string, number>; // optionId -> percentage (0-100)
}

export interface PlayerPublicRank {
  rank: number;
  playerId: string;
  nickname: string;
  totalScore: number;
  isClimber?: boolean;
}

export interface PlayerPersonalResult {
  playerId: string;
  isCorrect: boolean;
  selectedOptionId: string;
  scoreAwarded: number;
  totalScore: number;
  currentRank: number;
  rankDelta: number; // e.g. +2, 0, -1
  gapToTopFive: number; // 0 if already in top 5
  streak: number;
}

// Commands from Client -> Server Authority
export interface SubmitAnswerCommand {
  arenaId: string;
  roundId: string;
  questionId: string;
  answerId: string;
  clientSubmissionId: string; // UUIDv4 idempotency key
  clientSentAt: number;
}

export type SubmissionStatus = 'ACCEPTED' | 'LATE_REJECTED' | 'DUPLICATE_IGNORED';

export interface SubmitAnswerResult {
  submissionId: string;
  status: SubmissionStatus;
  receivedAt: number;
}

// Commands from Teacher Host -> Server Authority
export type HostCommandType =
  | 'START_ARENA'
  | 'START_ROUND'
  | 'LOCK_ROUND'
  | 'REVEAL_DISTRIBUTION'
  | 'REVEAL_PERSONAL'
  | 'START_DEBRIEF'
  | 'SHOW_LEADERBOARD'
  | 'NEXT_ROUND'
  | 'FINISH_ARENA';

export interface HostCommand {
  arenaId: string;
  type: HostCommandType;
  expectedSequence: number;
}

// Server Realtime Broadcast Events (Payload gọn nhẹ < 500 bytes)
export type ArenaEventType =
  | 'ARENA_STATE_CHANGED'
  | 'ROUND_STARTED'
  | 'ROUND_LOCKED'
  | 'DISTRIBUTION_REVEALED'
  | 'RESULTS_REVEALED'
  | 'DEBRIEF_STARTED'
  | 'LEADERBOARD_UPDATED'
  | 'ARENA_FINISHED';

export interface ArenaBaseEvent {
  arenaId: string;
  type: ArenaEventType;
  state: ArenaState;
  sequence: number;
  serverTimestamp: number;
}

export interface RoundStartedEvent extends ArenaBaseEvent {
  type: 'ROUND_STARTED';
  question: ArenaQuestionPayload;
}

export interface DistributionRevealedEvent extends ArenaBaseEvent {
  type: 'DISTRIBUTION_REVEALED';
  distribution: Record<string, number>;
  totalResponses: number;
}

export interface ResultsRevealedEvent extends ArenaBaseEvent {
  type: 'RESULTS_REVEALED';
  correctOptionId: string;
  misconceptionTag?: string;
}

export interface LeaderboardUpdatedEvent extends ArenaBaseEvent {
  type: 'LEADERBOARD_UPDATED';
  topFive: PlayerPublicRank[];
  biggestClimber?: PlayerPublicRank;
}

// Snapshot khi Reconnect
export interface ArenaSyncSnapshot {
  arenaId: string;
  pinCode: string;
  state: ArenaState;
  currentRoundIndex: number;
  totalRounds: number;
  sequence: number;
  serverTime: number;
  currentQuestion?: ArenaQuestionPayload;
  hasSubmittedCurrentRound: boolean;
  playerRank?: PlayerPersonalResult;
  topFive?: PlayerPublicRank[];
}
