import { describe, it, expect } from 'vitest';
import {
  calculateConfidence,
  classifySeverity,
  calculateVulnerabilityScore,
  calculateTrend,
  DiagnosticService,
} from '../services/diagnostic.service.js';

describe('Academic Diagnostic Engine — Pure Logic & Ranking Verification', () => {
  describe('Diagnostic Confidence Evaluation (Evidence Volume)', () => {
    it('should classify < 5 questions as INSUFFICIENT to avoid sparse data fallacy', () => {
      expect(calculateConfidence(0)).toBe('INSUFFICIENT');
      expect(calculateConfidence(3)).toBe('INSUFFICIENT');
      expect(calculateConfidence(4)).toBe('INSUFFICIENT');
    });

    it('should classify 5-11 questions as LOW confidence', () => {
      expect(calculateConfidence(5)).toBe('LOW');
      expect(calculateConfidence(11)).toBe('LOW');
    });

    it('should classify 12-24 questions as MEDIUM confidence', () => {
      expect(calculateConfidence(12)).toBe('MEDIUM');
      expect(calculateConfidence(24)).toBe('MEDIUM');
    });

    it('should classify >= 25 questions as HIGH confidence', () => {
      expect(calculateConfidence(25)).toBe('HIGH');
      expect(calculateConfidence(70)).toBe('HIGH');
    });
  });

  describe('Diagnostic Severity & Vulnerability Scoring', () => {
    it('3/5 questions correct (60%) must NOT be marked as CRITICAL due to insufficient evidence volume', () => {
      // 60% accuracy, 5 questions -> confidence LOW
      const severity = classifySeverity(60, 5);
      expect(severity).toBe('WEAK'); // Not CRITICAL
    });

    it('14/24 questions correct (58.3%) with medium evidence should be marked as CRITICAL if accuracy < 55% or WEAK', () => {
      // 58.3% >= 55% -> WEAK
      const severity58 = classifySeverity(58.3, 24);
      expect(severity58).toBe('WEAK');

      // 45% accuracy (<55%) with 24 questions (>=12) -> CRITICAL
      const severity45 = classifySeverity(45, 24);
      expect(severity45).toBe('CRITICAL');
    });

    it('Vulnerability Ranking: Log-weighted score prevents a 0/2 sparse error from outranking a confirmed 14/28 vulnerability', () => {
      // Sparse: 0% accuracy, 2 questions
      const scoreSparse = calculateVulnerabilityScore(0, 2); // 100 * log2(3) ≈ 158.5

      // Heavy evidence: 45% accuracy, 28 questions
      const scoreHeavy = calculateVulnerabilityScore(45, 28); // 55 * log2(29) ≈ 55 * 4.85 ≈ 267.2

      expect(scoreHeavy).toBeGreaterThan(scoreSparse);
    });
  });

  describe('Diagnostic Trend Engine (Two-period comparison)', () => {
    it('should detect IMPROVING trend when accuracy increases by >= +8%', () => {
      const trend = calculateTrend(54, 71);
      expect(trend).toBeDefined();
      expect(trend?.delta).toBe(17);
      expect(trend?.direction).toBe('IMPROVING');
      expect(trend?.previousAccuracy).toBe(54);
      expect(trend?.currentAccuracy).toBe(71);
    });

    it('should detect DECLINING trend when accuracy decreases by <= -8%', () => {
      const trend = calculateTrend(75, 60);
      expect(trend).toBeDefined();
      expect(trend?.delta).toBe(-15);
      expect(trend?.direction).toBe('DECLINING');
    });

    it('should detect STABLE trend when delta is within [-8%, +8%]', () => {
      const trend = calculateTrend(65, 68);
      expect(trend).toBeDefined();
      expect(trend?.delta).toBe(3);
      expect(trend?.direction).toBe('STABLE');
    });
  });

  describe('Mocked Prisma Aggregate & Deduplication Test', () => {
    it('correctly aggregates questions and deduplicates multiple attempts on same exam', async () => {
      const mockSubmissions = [
        // Attempt 2 (Newer - submittedAt: 2026-03-02)
        {
          id: 'sub-attempt-2',
          examId: 'exam-1',
          studentId: 'student-01',
          status: 'GRADED',
          submittedAt: new Date('2026-03-02T10:00:00Z'),
          createdAt: new Date('2026-03-02T09:00:00Z'),
          answers: [
            {
              questionId: 'q-1',
              score: 1,
              evidence: { isCorrect: true },
              question: {
                questionType: 'matching',
                group: { section: { sectionType: 'reading' } },
              },
            },
            {
              questionId: 'q-2',
              score: 1,
              evidence: { isCorrect: true },
              question: {
                questionType: 'matching',
                group: { section: { sectionType: 'reading' } },
              },
            },
          ],
        },
        // Attempt 1 (Older - submittedAt: 2026-03-01) -> MUST BE IGNORED FOR EXAM-1
        {
          id: 'sub-attempt-1',
          examId: 'exam-1',
          studentId: 'student-01',
          status: 'GRADED',
          submittedAt: new Date('2026-03-01T10:00:00Z'),
          createdAt: new Date('2026-03-01T09:00:00Z'),
          answers: [
            {
              questionId: 'q-1',
              score: 0,
              evidence: { isCorrect: false },
              question: {
                questionType: 'matching',
                group: { section: { sectionType: 'reading' } },
              },
            },
          ],
        },
        // Exam 2 (Listening)
        {
          id: 'sub-exam-2',
          examId: 'exam-2',
          studentId: 'student-01',
          status: 'GRADED',
          submittedAt: new Date('2026-03-03T10:00:00Z'),
          createdAt: new Date('2026-03-03T09:00:00Z'),
          answers: [
            {
              questionId: 'q-3',
              score: 0,
              evidence: { isCorrect: false },
              question: {
                questionType: 'listening',
                group: { section: { sectionType: 'listening' } },
              },
            },
          ],
        },
      ];

      const mockPrisma: any = {
        classExamAssignment: {
          findMany: async () => [{ examId: 'exam-1' }, { examId: 'exam-2' }],
        },
        examSubmission: {
          findMany: async () => mockSubmissions,
        },
        userVocabulary: {
          findMany: async () => [
            {
              wordId: 'w-1',
              failedReviews: 4,
              totalReviews: 6,
              masteryScore: 0.35,
              word: { word: 'meticulous', cefrLevel: 'C1', coreIdea: 'very careful and precise' },
            },
          ],
        },
      };

      const diagnosticService = new DiagnosticService(mockPrisma);
      const result = await diagnosticService.getStudentDiagnostic('student-01', 'class-01');

      expect(result.studentId).toBe('student-01');
      // Reading: only attempt 2 counted (2 questions, both correct -> 100%)
      expect(result.reading.totalQuestions).toBe(2);
      expect(result.reading.overallAccuracy).toBe(100);

      // Listening: 1 question, 0 correct -> 0%
      expect(result.listening.totalQuestions).toBe(1);
      expect(result.listening.overallAccuracy).toBe(0);

      // Vocabulary: should capture failed review
      expect(result.language.vocabulary.length).toBe(1);
      expect(result.language.vocabulary[0].word).toBe('meticulous');
      expect(result.language.vocabulary[0].severity).toBe('CRITICAL');
    });
  });
});
