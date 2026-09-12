/**
 * ARENA STATE MACHINE (PURE DOMAIN REDUCER)
 * Tuân thủ Hiến pháp Kiến trúc Điều 7 (Pure Function), Điều 35 (Knowledge-Free)
 * và 5 Nguyên tắc Kỹ thuật Sống còn của Class Arena.
 */

import { ArenaState, HostCommandType } from './types';

export interface ArenaStateContext {
  arenaId: string;
  state: ArenaState;
  sequence: number;
  currentRoundIndex: number;
  totalRounds: number;
  activeQuestionId: string | null;
  startedAt: number | null;
  deadlineAt: number | null;
  serverTimestamp: number;
}

export type ArenaAction =
  | { type: 'HOST_COMMAND'; command: HostCommandType; timestamp: number; payload?: any }
  | { type: 'ROUND_DEADLINE_REACHED'; timestamp: number }
  | { type: 'TICK_READY_CHECK_COMPLETE'; timestamp: number; questionId: string; deadlineAt: number };

export interface TransitionResult {
  nextContext: ArenaStateContext;
  isValid: boolean;
  error?: string;
  emittedEvent?: string;
}

/**
 * Pure transition function: nhận (context cũ, action) -> trả về context mới
 * Không có side effect, không gọi Supabase, không sờ vào DOM/localStorage.
 */
export function transitionArenaState(
  ctx: ArenaStateContext,
  action: ArenaAction
): TransitionResult {
  const currentSequence = ctx.sequence;

  switch (ctx.state) {
    case 'LOBBY': {
      if (action.type === 'HOST_COMMAND' && action.command === 'START_ARENA') {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'READY_CHECK',
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'ARENA_READY',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể START_ARENA từ LOBBY' };
    }

    case 'READY_CHECK': {
      if (action.type === 'TICK_READY_CHECK_COMPLETE') {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'QUESTION_LIVE',
            activeQuestionId: action.questionId,
            startedAt: action.timestamp,
            deadlineAt: action.deadlineAt,
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'ROUND_STARTED',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chờ bộ đếm READY_CHECK hoàn tất' };
    }

    case 'QUESTION_LIVE': {
      const isManualLock = action.type === 'HOST_COMMAND' && action.command === 'LOCK_ROUND';
      const isTimeout = action.type === 'ROUND_DEADLINE_REACHED';

      if (isManualLock || isTimeout) {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'ANSWER_LOCKED',
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'ROUND_LOCKED',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể LOCK_ROUND hoặc timeout trong QUESTION_LIVE' };
    }

    case 'ANSWER_LOCKED': {
      if (action.type === 'HOST_COMMAND' && action.command === 'REVEAL_DISTRIBUTION') {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'REVEAL_DISTRIBUTION',
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'DISTRIBUTION_REVEALED',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể REVEAL_DISTRIBUTION từ ANSWER_LOCKED' };
    }

    case 'REVEAL_DISTRIBUTION': {
      if (action.type === 'HOST_COMMAND' && action.command === 'REVEAL_PERSONAL') {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'REVEAL_PERSONAL',
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'RESULTS_REVEALED',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể REVEAL_PERSONAL từ REVEAL_DISTRIBUTION' };
    }

    case 'REVEAL_PERSONAL': {
      if (action.type === 'HOST_COMMAND' && action.command === 'START_DEBRIEF') {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'TEACHER_DEBRIEF',
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'DEBRIEF_STARTED',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể START_DEBRIEF từ REVEAL_PERSONAL' };
    }

    case 'TEACHER_DEBRIEF': {
      if (action.type === 'HOST_COMMAND' && action.command === 'SHOW_LEADERBOARD') {
        return {
          isValid: true,
          nextContext: {
            ...ctx,
            state: 'LEADERBOARD',
            sequence: currentSequence + 1,
            serverTimestamp: action.timestamp,
          },
          emittedEvent: 'LEADERBOARD_UPDATED',
        };
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể SHOW_LEADERBOARD từ TEACHER_DEBRIEF' };
    }

    case 'LEADERBOARD': {
      if (action.type === 'HOST_COMMAND') {
        if (action.command === 'NEXT_ROUND') {
          const nextRound = ctx.currentRoundIndex + 1;
          if (nextRound > ctx.totalRounds) {
            return {
              isValid: true,
              nextContext: {
                ...ctx,
                state: 'PODIUM',
                sequence: currentSequence + 1,
                serverTimestamp: action.timestamp,
              },
              emittedEvent: 'ARENA_FINISHED',
            };
          }
          return {
            isValid: true,
            nextContext: {
              ...ctx,
              state: 'READY_CHECK',
              currentRoundIndex: nextRound,
              activeQuestionId: null,
              startedAt: null,
              deadlineAt: null,
              sequence: currentSequence + 1,
              serverTimestamp: action.timestamp,
            },
            emittedEvent: 'NEXT_ROUND_READY',
          };
        }

        if (action.command === 'FINISH_ARENA') {
          return {
            isValid: true,
            nextContext: {
              ...ctx,
              state: 'PODIUM',
              sequence: currentSequence + 1,
              serverTimestamp: action.timestamp,
            },
            emittedEvent: 'ARENA_FINISHED',
          };
        }
      }
      return { isValid: false, nextContext: ctx, error: 'Chỉ có thể NEXT_ROUND hoặc FINISH_ARENA từ LEADERBOARD' };
    }

    case 'PODIUM': {
      return { isValid: false, nextContext: ctx, error: 'Trận đấu đã hoàn tất, không thể nhận thêm command' };
    }

    default:
      return { isValid: false, nextContext: ctx, error: `Trạng thái không xác định: ${ctx.state}` };
  }
}
