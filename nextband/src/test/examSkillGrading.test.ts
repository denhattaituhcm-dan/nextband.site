import { describe, it, expect } from 'vitest';
import {
  detectExamSkill,
  formatSkillScoreDisplay,
  isObjectiveSkill,
} from '@/lib/examSkillHelper';

describe('5-Skill Grading Models & Score Formatting', () => {
  describe('detectExamSkill', () => {
    it('detects grammar from sectionType general with title Grammar', () => {
      const skill = detectExamSkill({
        title: 'W1 - D1 - WRI',
        sections: [{ sectionType: 'general', title: 'Grammar' }],
      });
      expect(skill).toBe('grammar');
    });

    it('detects speaking from speaking question and title', () => {
      const skill = detectExamSkill({
        title: 'W1 - D3 - SPK',
        sections: [{ sectionType: 'speaking', title: 'Speaking' }],
      });
      expect(skill).toBe('speaking');
    });

    it('detects writing from essay questions and writing section', () => {
      const skill = detectExamSkill({
        title: 'WRITING TEST',
        sections: [{ sectionType: 'writing', title: 'Writing' }],
      });
      expect(skill).toBe('writing');
    });

    it('detects listening from listening section', () => {
      const skill = detectExamSkill({
        title: 'W1 - D2 - LIS',
        sections: [{ sectionType: 'listening', title: 'Listening' }],
      });
      expect(skill).toBe('listening');
    });

    it('detects reading from reading title and section', () => {
      const skill = detectExamSkill({
        title: 'W4 - D3 - REA',
        sections: [{ sectionType: 'reading', title: 'Reading' }],
      });
      expect(skill).toBe('reading');
    });
  });

  describe('isObjectiveSkill', () => {
    it('identifies grammar, listening, reading as objective (1 point per question)', () => {
      expect(isObjectiveSkill('grammar')).toBe(true);
      expect(isObjectiveSkill('listening')).toBe(true);
      expect(isObjectiveSkill('reading')).toBe(true);
    });

    it('identifies writing and speaking as subjective (IELTS band scale)', () => {
      expect(isObjectiveSkill('writing')).toBe(false);
      expect(isObjectiveSkill('speaking')).toBe(false);
    });
  });

  describe('formatSkillScoreDisplay', () => {
    it('formats objective score as X/Y questions with percentage', () => {
      const display = formatSkillScoreDisplay('grammar', {
        status: 'GRADED',
        correctAnswers: 18,
        totalQuestions: 20,
      });
      expect(display.scoreText).toBe('18/20 câu');
      expect(display.subText).toContain('90%');
      expect(display.isGraded).toBe(true);
    });

    it('formats subjective graded score as IELTS Band X.X', () => {
      const display = formatSkillScoreDisplay('writing', {
        status: 'GRADED',
        totalScore: 6.5,
      });
      expect(display.scoreText).toBe('Band 6.5');
      expect(display.subText).toContain('nhận xét');
      expect(display.isGraded).toBe(true);
    });

    it('formats subjective submitted score as waiting for teacher review', () => {
      const display = formatSkillScoreDisplay('speaking', {
        status: 'SUBMITTED',
      });
      expect(display.scoreText).toBe('Chờ GV chấm');
      expect(display.isPending).toBe(true);
    });

    it('formats unattempted objective skill with 1 câu = 1 điểm note', () => {
      const display = formatSkillScoreDisplay('listening', null);
      expect(display.scoreText).toBe('Chưa làm');
      expect(display.subText).toBe('1 câu = 1 điểm');
    });
  });
});
