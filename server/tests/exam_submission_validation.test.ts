import { describe, it, expect } from 'vitest';
import { validateSubmissionTechnicalPayload } from '../services/exam-submission.service.js';
import { ValidationError } from '../services/authorization.service.js';

describe('validateSubmissionTechnicalPayload Unit Tests', () => {
  const writingExam = {
    id: 'exam-w1',
    examType: 'writing',
    sections: [
      {
        sectionType: 'writing',
        questionGroups: [
          {
            questions: [
              { id: 'q1', questionType: 'essay' },
            ],
          },
        ],
      },
    ],
  };

  const speakingExam = {
    id: 'exam-s1',
    examType: 'speaking',
    sections: [
      {
        sectionType: 'speaking',
        questionGroups: [
          {
            questions: [
              { id: 'q2', questionType: 'speaking' },
            ],
          },
        ],
      },
    ],
  };

  const readingExam = {
    id: 'exam-r1',
    examType: 'reading',
    sections: [
      {
        sectionType: 'reading',
        questionGroups: [
          {
            questions: [
              { id: 'q3', questionType: 'multiple_choice' },
            ],
          },
        ],
      },
    ],
  };

  it('rejects completely empty answers payload', () => {
    expect(() => validateSubmissionTechnicalPayload(readingExam, [])).toThrow(ValidationError);
    expect(() => validateSubmissionTechnicalPayload(readingExam, [{ questionId: 'q3', answerText: '' }])).toThrow(ValidationError);
  });

  it('rejects writing submission with blank or whitespace-only text', () => {
    expect(() =>
      validateSubmissionTechnicalPayload(writingExam, [
        { questionId: 'q1', answerText: '   <p>&nbsp;</p>   ' },
      ])
    ).toThrow(ValidationError);
  });

  it('rejects writing submission with text under 10 words / 30 chars', () => {
    expect(() =>
      validateSubmissionTechnicalPayload(writingExam, [
        { questionId: 'q1', answerText: 'hello world' },
      ])
    ).toThrow(ValidationError);
  });

  it('accepts writing submission with substantial content (>= 10 words)', () => {
    expect(() =>
      validateSubmissionTechnicalPayload(writingExam, [
        {
          questionId: 'q1',
          answerText:
            'This is a well written essay response discussing the positive aspects of international education and career growth.',
        },
      ])
    ).not.toThrow();
  });

  it('rejects speaking submission without audio', () => {
    expect(() =>
      validateSubmissionTechnicalPayload(speakingExam, [
        { questionId: 'q2', answerText: '' },
      ])
    ).toThrow(ValidationError);
  });

  it('accepts speaking submission with valid audio URL or audio path', () => {
    expect(() =>
      validateSubmissionTechnicalPayload(speakingExam, [
        { questionId: 'q2', audioUrl: 'https://storage.googleapis.com/audio/sample.webm' },
      ])
    ).not.toThrow();

    expect(() =>
      validateSubmissionTechnicalPayload(speakingExam, [
        { questionId: 'q2', answerText: 'speaking-recordings/user1/audio.webm' },
      ])
    ).not.toThrow();
  });

  it('accepts objective exam with valid answered questions', () => {
    expect(() =>
      validateSubmissionTechnicalPayload(readingExam, [
        { questionId: 'q3', answerText: 'B' },
      ])
    ).not.toThrow();
  });

  it('accepts listening exam having dummy empty speaking/writing sections without requiring audio', () => {
    const listeningExamWithEmptyShells = {
      id: 'exam-w2-d2-lis',
      examType: 'ielts',
      sections: [
        { sectionType: 'writing', questionGroups: [] },
        { sectionType: 'speaking', questionGroups: [] },
        { sectionType: 'reading', questionGroups: [] },
        {
          sectionType: 'listening',
          questionGroups: [
            {
              questions: [
                { id: 'l1', questionType: 'fill_blank' },
                { id: 'l2', questionType: 'multiple_choice' },
              ],
            },
          ],
        },
      ],
    };

    expect(() =>
      validateSubmissionTechnicalPayload(listeningExamWithEmptyShells, [
        { questionId: 'l1', answerText: 'library' },
      ])
    ).not.toThrow();
  });

  it('accepts grammar exam having short translation answers without requiring audio or 10 words', () => {
    const grammarExamWithEmptyShells = {
      id: 'exam-w5-d1-wri',
      examType: 'ielts',
      sections: [
        { sectionType: 'writing', questionGroups: [] },
        { sectionType: 'speaking', questionGroups: [] },
        {
          sectionType: 'general',
          questionGroups: [
            {
              questions: [
                { id: 'g1', questionType: 'essay' },
              ],
            },
          ],
        },
      ],
    };

    // Short sentence: 5 words / 26 chars
    expect(() =>
      validateSubmissionTechnicalPayload(grammarExamWithEmptyShells, [
        { questionId: 'g1', answerText: 'She lives near the school.' },
      ])
    ).not.toThrow();
  });
});
