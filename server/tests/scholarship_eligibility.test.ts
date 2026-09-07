import { describe, it, expect } from 'vitest';
import {
  isScholarshipEligible,
  extractRevisionRequired,
} from '../services/scholarship-eligibility.engine.js';

describe('Scholarship Eligibility Engine Unit Tests', () => {
  describe('extractRevisionRequired', () => {
    it('returns true if submission.revisionRequired is true', () => {
      expect(extractRevisionRequired({ revisionRequired: true })).toBe(true);
    });

    it('returns true if answer feedback contains revisionRequired: true', () => {
      const sub = {
        answers: [
          { feedback: JSON.stringify({ revisionRequired: false, text: 'ok' }) },
          { feedback: JSON.stringify({ revisionRequired: true, text: 'rewrite needed' }) },
        ],
      };
      expect(extractRevisionRequired(sub)).toBe(true);
    });

    it('returns false when no answer has revisionRequired flag', () => {
      const sub = {
        answers: [
          { feedback: JSON.stringify({ revisionRequired: false, text: 'good job' }) },
          { feedback: 'Simple text feedback' },
        ],
      };
      expect(extractRevisionRequired(sub)).toBe(false);
    });
  });

  describe('isScholarshipEligible', () => {
    it('rejects submissions with invalid status', () => {
      expect(isScholarshipEligible(null).isEligible).toBe(false);
      expect(isScholarshipEligible({ status: 'IN_PROGRESS' }).isEligible).toBe(false);
      expect(isScholarshipEligible({ status: 'ABANDONED' }).isEligible).toBe(false);
    });

    it('rejects any submission with revisionRequired: true regardless of status', () => {
      const writingSub = {
        status: 'GRADED',
        totalScore: 6.5,
        exam: { examType: 'writing' },
        revisionRequired: true,
      };
      const res = isScholarshipEligible(writingSub);
      expect(res.isEligible).toBe(false);
      expect(res.reasonCode).toBe('REVISION_REQUIRED');
    });

    it('approves GRADED writing submission with valid score and no revisionRequired', () => {
      const writingSub = {
        status: 'GRADED',
        totalScore: 6.5,
        exam: { examType: 'writing' },
        revisionRequired: false,
      };
      const res = isScholarshipEligible(writingSub);
      expect(res.isEligible).toBe(true);
      expect(res.reasonCode).toBe('TEACHER_GRADED_QUALIFIED');
    });

    it('rejects GRADED writing submission with 0 score', () => {
      const writingSub = {
        status: 'GRADED',
        totalScore: 0,
        exam: { examType: 'writing' },
        revisionRequired: false,
      };
      const res = isScholarshipEligible(writingSub);
      expect(res.isEligible).toBe(false);
      expect(res.reasonCode).toBe('ZERO_SCORE');
    });

    it('handles SUBMITTED writing with grace period (pending teacher review)', () => {
      const pendingSub = {
        status: 'SUBMITTED',
        exam: { examType: 'writing' },
      };
      // Default allows pending review in weekly monitor
      expect(isScholarshipEligible(pendingSub, { allowPendingTeacherReview: true }).isEligible).toBe(true);
      expect(isScholarshipEligible(pendingSub, { allowPendingTeacherReview: true }).reasonCode).toBe('PENDING_TEACHER_REVIEW');

      // Strict audit rejects pending review
      expect(isScholarshipEligible(pendingSub, { allowPendingTeacherReview: false }).isEligible).toBe(false);
      expect(isScholarshipEligible(pendingSub, { allowPendingTeacherReview: false }).reasonCode).toBe('AWAITING_TEACHER_GRADE');
    });

    it('approves objective (Reading/Listening) completed submissions', () => {
      const readingSub = {
        status: 'GRADED',
        totalScore: 8.0,
        correctAnswers: 32,
        totalQuestions: 40,
        exam: { examType: 'reading' },
      };
      const res = isScholarshipEligible(readingSub);
      expect(res.isEligible).toBe(true);
      expect(res.reasonCode).toBe('ELIGIBLE_OBJECTIVE');
    });
  });
});
