import { describe, it, expect } from 'vitest';
import { transitionArenaState, ArenaStateContext } from '../arenaStateMachine';
import { evaluateSubmissionScore } from '../arenaScoreEngine';

describe('ArenaStateMachine (Classroom Protocol)', () => {
  const initialContext: ArenaStateContext = {
    arenaId: 'test-arena-01',
    state: 'LOBBY',
    sequence: 1,
    currentRoundIndex: 1,
    totalRounds: 3,
    activeQuestionId: null,
    startedAt: null,
    deadlineAt: null,
    serverTimestamp: 1000,
  };

  it('chuyển hợp lệ từ LOBBY sang READY_CHECK khi Host phát lệnh START_ARENA', () => {
    const res = transitionArenaState(initialContext, {
      type: 'HOST_COMMAND',
      command: 'START_ARENA',
      timestamp: 2000,
    });

    expect(res.isValid).toBe(true);
    expect(res.nextContext.state).toBe('READY_CHECK');
    expect(res.nextContext.sequence).toBe(2);
    expect(res.nextContext.serverTimestamp).toBe(2000);
  });

  it('từ chối lệnh sai trạng thái (ví dụ REVEAL từ LOBBY)', () => {
    const res = transitionArenaState(initialContext, {
      type: 'HOST_COMMAND',
      command: 'REVEAL_DISTRIBUTION',
      timestamp: 2000,
    });

    expect(res.isValid).toBe(false);
    expect(res.nextContext.state).toBe('LOBBY');
    expect(res.nextContext.sequence).toBe(1);
  });

  it('chạy trọn vẹn 1 vòng thi đấu: LOBBY -> READY -> LIVE -> LOCKED -> REVEAL -> DEBRIEF -> LEADERBOARD', () => {
    let ctx = initialContext;

    // 1. Host Start
    ctx = transitionArenaState(ctx, { type: 'HOST_COMMAND', command: 'START_ARENA', timestamp: 1000 }).nextContext;
    expect(ctx.state).toBe('READY_CHECK');

    // 2. Ready Complete -> Live
    ctx = transitionArenaState(ctx, {
      type: 'TICK_READY_CHECK_COMPLETE',
      timestamp: 4000,
      questionId: 'q_01',
      deadlineAt: 19000,
    }).nextContext;
    expect(ctx.state).toBe('QUESTION_LIVE');
    expect(ctx.activeQuestionId).toBe('q_01');

    // 3. Deadline reached -> Lock
    ctx = transitionArenaState(ctx, { type: 'ROUND_DEADLINE_REACHED', timestamp: 19000 }).nextContext;
    expect(ctx.state).toBe('ANSWER_LOCKED');

    // 4. Host Reveal Distribution
    ctx = transitionArenaState(ctx, { type: 'HOST_COMMAND', command: 'REVEAL_DISTRIBUTION', timestamp: 20000 }).nextContext;
    expect(ctx.state).toBe('REVEAL_DISTRIBUTION');

    // 5. Host Reveal Personal
    ctx = transitionArenaState(ctx, { type: 'HOST_COMMAND', command: 'REVEAL_PERSONAL', timestamp: 22000 }).nextContext;
    expect(ctx.state).toBe('REVEAL_PERSONAL');

    // 6. Host Start Debrief
    ctx = transitionArenaState(ctx, { type: 'HOST_COMMAND', command: 'START_DEBRIEF', timestamp: 25000 }).nextContext;
    expect(ctx.state).toBe('TEACHER_DEBRIEF');

    // 7. Host Show Leaderboard
    ctx = transitionArenaState(ctx, { type: 'HOST_COMMAND', command: 'SHOW_LEADERBOARD', timestamp: 35000 }).nextContext;
    expect(ctx.state).toBe('LEADERBOARD');
    expect(ctx.sequence).toBe(8);
  });
});

describe('ArenaScoreEngine (Accuracy First)', () => {
  it('trả về 0 điểm và reset streak khi đáp án sai', () => {
    const res = evaluateSubmissionScore({
      isCorrect: false,
      timeSpentMs: 2000,
      totalTimeAllowedMs: 15000,
      currentStreak: 4,
    });

    expect(res.scoreAwarded).toBe(0);
    expect(res.nextStreak).toBe(0);
  });

  it('cộng trần điểm tốc độ (+15) khi nộp trong 25% thời gian đầu', () => {
    const res = evaluateSubmissionScore({
      isCorrect: true,
      timeSpentMs: 2000, // Còn 13s / 15s = 86% thời gian
      totalTimeAllowedMs: 15000,
      currentStreak: 0,
    });

    expect(res.baseScore).toBe(100);
    expect(res.speedBonus).toBe(15);
    expect(res.streakBonus).toBe(0);
    expect(res.scoreAwarded).toBe(115);
    expect(res.nextStreak).toBe(1);
  });

  it('cộng điểm streak bậc thang chính xác khi đạt mốc 3, 5, 7 câu đúng', () => {
    // Đang có streak 2, đúng câu này -> streak 3 (+10)
    const resStreak3 = evaluateSubmissionScore({
      isCorrect: true,
      timeSpentMs: 10000,
      totalTimeAllowedMs: 15000, // 33% thời gian còn lại -> speedBonus = 5
      currentStreak: 2,
    });
    expect(resStreak3.streakBonus).toBe(10);
    expect(resStreak3.scoreAwarded).toBe(100 + 5 + 10);

    // Đang có streak 6, đúng câu này -> streak 7 (+30 trần)
    const resStreak7 = evaluateSubmissionScore({
      isCorrect: true,
      timeSpentMs: 10000,
      totalTimeAllowedMs: 15000,
      currentStreak: 6,
    });
    expect(resStreak7.streakBonus).toBe(30);
  });
});
