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
});
