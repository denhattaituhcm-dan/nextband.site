import { describe, it, expect } from 'vitest';
import {
  evaluateTransformation,
  normalizeLearnerInput,
  countWords,
  hasExactKeywordToken,
} from '../engine/transformationEvaluator';
import { CAUSATIVE_HAVE_GET_UNIT } from '../data/causativeHaveGet.unit';

describe('transformationEvaluator - Unit Tests', () => {
  const item1 = CAUSATIVE_HAVE_GET_UNIT.transformationItems[0]; // keyword: GOT, min: 5, max: 6
  const item2 = CAUSATIVE_HAVE_GET_UNIT.transformationItems[1]; // keyword: HAD, min: 3, max: 4
  const item3 = CAUSATIVE_HAVE_GET_UNIT.transformationItems[2]; // keyword: HAVING, min: 5, max: 5

  describe('Sanitization & Helpers', () => {
    it('normalizes smart curly apostrophes and extra whitespaces', () => {
      const raw = '  we   finally    got   an    external   auditor  ’  s  ';
      expect(normalizeLearnerInput(raw)).toBe("we finally got an external auditor's");
    });

    it('counts words accurately by whitespace tokens', () => {
      expect(countWords('got an external auditor to inspect')).toBe(6);
      expect(countWords('')).toBe(0);
      expect(countWords('   one   two   three   ')).toBe(3);
    });

    it('identifies exact keyword token even when surrounded by punctuation', () => {
      expect(hasExactKeywordToken('got, an external auditor', 'GOT')).toBe(true);
      expect(hasExactKeywordToken('(got) an external auditor', 'GOT')).toBe(true);
      expect(hasExactKeywordToken('we got. an external auditor', 'GOT')).toBe(true);
    });

    it('rejects keyword when it is a substring inside a larger word', () => {
      expect(hasExactKeywordToken('we forgot the documents yesterday', 'GOT')).toBe(false);
      expect(hasExactKeywordToken('he gots no money', 'GOT')).toBe(false);
      expect(hasExactKeywordToken('shadowing the panel', 'HAD')).toBe(false);
    });
  });

  describe('Constraint Checks (Keyword & Length)', () => {
    it('returns CONSTRAINT_VIOLATION when input is empty', () => {
      const res = evaluateTransformation('', item1);
      expect(res.verdict).toBe('CONSTRAINT_VIOLATION');
      expect(res.feedbackVi).toContain('Vui lòng nhập câu trả lời');
    });

    it('returns CONSTRAINT_VIOLATION when keyword is mutated (e.g., GET instead of GOT)', () => {
      const res = evaluateTransformation('get an external auditor to inspect', item1);
      expect(res.verdict).toBe('CONSTRAINT_VIOLATION');
      expect(res.diagnosticCode).toBe('KEYWORD_MUTATED');
      expect(res.feedbackVi).toContain('không được thay đổi hình thái');
    });

    it('returns CONSTRAINT_VIOLATION when keyword is entirely missing', () => {
      const res = evaluateTransformation('persuaded an auditor to inspect', item1);
      expect(res.verdict).toBe('CONSTRAINT_VIOLATION');
      expect(res.feedbackVi).toContain('Bắt buộc sử dụng từ khóa in hoa');
    });

    it('returns CONSTRAINT_VIOLATION when word count is below minWords and not a recognized near-miss', () => {
      // minWords is 5, we provide 2 random words with intact keyword
      const res = evaluateTransformation('got something', item1);
      expect(res.verdict).toBe('CONSTRAINT_VIOLATION');
      expect(res.feedbackVi).toContain('Độ dài chưa phù hợp');
    });

    it('returns CONSTRAINT_VIOLATION when word count exceeds maxWords', () => {
      // maxWords is 6, we provide 7 words
      const res = evaluateTransformation('finally got an external auditor to inspect thoroughly', item1);
      expect(res.verdict).toBe('CONSTRAINT_VIOLATION');
      expect(res.feedbackVi).toContain('Độ dài chưa phù hợp');
    });

    it('accepts keyword accompanied by accidental punctuation without violation', () => {
      const res = evaluateTransformation('got, an external auditor to inspect', item1);
      expect(res.verdict).not.toBe('CONSTRAINT_VIOLATION');
    });
  });

  describe('Whitelist Exact Matching', () => {
    it('accepts exact whitelisted answer for Item 1', () => {
      const res = evaluateTransformation('got an external auditor to inspect', item1);
      expect(res.verdict).toBe('EXACT_MATCH');
      expect(res.matchedAcceptedAnswer).toBe('got an external auditor to inspect');
    });

    it('accepts answer with random uppercase/lowercase casing', () => {
      const res = evaluateTransformation('GOT an External Auditor TO INSPECT', item1);
      expect(res.verdict).toBe('EXACT_MATCH');
    });

    it('accepts answer with accidental surrounding and multiple internal whitespaces', () => {
      const res = evaluateTransformation('   got   an   external   auditor   to   inspect   ', item1);
      expect(res.verdict).toBe('EXACT_MATCH');
    });

    it('accepts multiple whitelisted variants (Item 2 with 3 or 4 words)', () => {
      const res4Words = evaluateTransformation('had its commercial reputation', item2);
      expect(res4Words.verdict).toBe('EXACT_MATCH');

      const res3Words = evaluateTransformation('had its reputation', item2);
      expect(res3Words.verdict).toBe('EXACT_MATCH');
    });

    it('accepts exact answer for Item 3', () => {
      const res = evaluateTransformation('having the laboratory sensors calibrated', item3);
      expect(res.verdict).toBe('EXACT_MATCH');
    });
  });

  describe('Near-Miss Pedagogical Pitfalls (Prioritized over Word Count)', () => {
    it('intercepts "had suffered" on Item 2 immediately as REPEATED_SOURCE_VERB even with only 2 words', () => {
      // User typed 2 words: "had suffered" -> Must NOT say "wrong word count", but explain the structural misconception!
      const res = evaluateTransformation('had suffered', item2);
      expect(res.verdict).toBe('NEAR_MISS');
      expect(res.diagnosticCode).toBe('REPEATED_SOURCE_VERB');
      expect(res.feedbackVi).toContain('severely damaged');
      expect(res.feedbackVi).toContain('suffered');
    });

    it('detects MISSING_TO when learner omits "to" after "get someone"', () => {
      // Word count: 5 (within bounds 5-6), contains keyword "got"
      const res = evaluateTransformation('got an external auditor inspect', item1);
      expect(res.verdict).toBe('NEAR_MISS');
      expect(res.diagnosticCode).toBe('MISSING_TO');
      expect(res.feedbackVi).toContain('Thiếu "to"');
    });

    it('detects WRONG_PARTICIPLE when using active participle in experiential adversity (Item 2)', () => {
      // Word count: 3 words
      const res = evaluateTransformation('had damaged its', item2);
      expect(res.verdict).toBe('NEAR_MISS');
      expect(res.diagnosticCode).toBe('WRONG_PARTICIPLE');
      expect(res.feedbackVi).toContain('tự phá hoại danh tiếng');
    });

    it('detects WRONG_PARTICIPLE when using bare infinitive "calibrate" instead of "calibrated" (Item 3)', () => {
      const res = evaluateTransformation('having the laboratory sensors calibrate', item3);
      expect(res.verdict).toBe('NEAR_MISS');
      expect(res.diagnosticCode).toBe('WRONG_PARTICIPLE');
      expect(res.feedbackVi).toContain('quá khứ phân từ');
    });
  });

  describe('Typo Slip Detection', () => {
    it('detects a 1-character typo slip on a secondary non-keyword token', () => {
      // "auditr" instead of "auditor" (Levenshtein distance = 1, length >= 12)
      const res = evaluateTransformation('got an external auditr to inspect', item1);
      expect(res.verdict).toBe('TYPO_SLIP');
      expect(res.feedbackVi).toContain('lỗi chính tả nhỏ');
    });
  });

  describe('Unrecognized Fallback', () => {
    it('returns UNRECOGNIZED on semantically mismatched inputs with neutral explanation', () => {
      // Valid word count and has keyword, but non-whitelisted phrasing
      const res = evaluateTransformation('got an auditor never inspected really', item1);
      expect(res.verdict).toBe('UNRECOGNIZED');
      expect(res.feedbackVi).toContain('Hệ thống chưa nhận diện được cách diễn đạt này trong danh sách đáp án mẫu đã kiểm duyệt');
    });
  });

  describe('Data Consistency Audit of CAUSATIVE_HAVE_GET_UNIT', () => {
    it('guarantees all acceptedAnswers satisfy word count bounds and contain keyword', () => {
      for (const t of CAUSATIVE_HAVE_GET_UNIT.transformationItems) {
        expect(t.acceptedAnswers.length).toBeGreaterThan(0);
        for (const answer of t.acceptedAnswers) {
          const count = countWords(normalizeLearnerInput(answer));
          expect(count).toBeGreaterThanOrEqual(t.minWords);
          expect(count).toBeLessThanOrEqual(t.maxWords);

          const tokens = normalizeLearnerInput(answer).toLowerCase().split(/\s+/);
          expect(tokens).toContain(t.keyword.toLowerCase());
        }
      }
    });

    it('verifies all diagnostic items have exactly one correct option', () => {
      for (const d of CAUSATIVE_HAVE_GET_UNIT.diagnosticItems) {
        const correctCount = d.options.filter((o) => o.isCorrect).length;
        expect(correctCount).toBe(1);

        if (d.whyProbe) {
          const whyCorrectCount = d.whyProbe.options.filter((o) => o.isCorrect).length;
          expect(whyCorrectCount).toBe(1);
        }
      }
    });
  });
});
