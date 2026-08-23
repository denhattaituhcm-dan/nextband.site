import fs from 'fs';

const exam = JSON.parse(fs.readFileSync('scripts/dump_entrance_exam.json', 'utf8'));

const listeningSec = exam.sections.find(s => s.sectionType === 'listening');
const readingSec = exam.sections.find(s => s.sectionType === 'reading');
const grammarSec = exam.sections.find(s => s.sectionType === 'general');
const writingSec = exam.sections.find(s => s.sectionType === 'writing');
const speakingSec = exam.sections.find(s => s.sectionType === 'speaking');

const listeningQ = listeningSec?.questionGroups?.[0]?.questions?.[0];
const readingPassage = readingSec?.questionGroups?.[0]?.passage || '';
const readingQ1 = readingSec?.questionGroups?.[0]?.questions?.[0];
const readingTFNG = (readingSec?.questionGroups?.[0]?.questions || []).slice(1);
const grammarQs = grammarSec?.questionGroups?.[0]?.questions || [];
const writingQ = writingSec?.questionGroups?.[0]?.questions?.[0];

// 1. Generate questions.ts content
const questionsFileContent = `/**
 * Public Sanitized Question Templates for ARIS Entrance Assessment
 * Mirrors Database Exam cce291f7-d88b-4976-8ed3-cc21daca7023
 * Contains ZERO secret answer keys. Safe for client-facing test delivery.
 */

export interface SanitizedQuestion {
  id: string;
  skill: "listening" | "reading" | "grammar" | "writing" | "speaking";
  sectionTitle: string;
  questionType:
    | "multiple_choice"
    | "fill_blank"
    | "true_false_not_given"
    | "short_answer"
    | "matching"
    | "essay"
    | "text_area"
    | "audio_record";
  prompt: string;
  passageText?: string;
  audioUrl?: string;
  options?: string[];
  placeholder?: string;
  orderIndex: number;
  blankCount?: number;
}

export interface SanitizedPlacementTestPayload {
  testId: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  skills: {
    listening: {
      title: string;
      audioUrl: string;
      questions: SanitizedQuestion[];
    };
    reading: {
      title: string;
      passage: string;
      questions: SanitizedQuestion[];
    };
    grammar: {
      title: string;
      questions: SanitizedQuestion[];
    };
    writing: {
      title: string;
      prompt: string;
      guidelines: string[];
      minWords: number;
      maxWords?: number;
    };
    speaking: {
      title: string;
      part1Questions: string[];
      part2Topic: string;
      part2Cues: string[];
    };
  };
}

export const canonicalPlacementTestPayload: SanitizedPlacementTestPayload = {
  testId: "cce291f7-d88b-4976-8ed3-cc21daca7023",
  title: "ENTRANCE TEST — ARIS Diagnostic Assessment",
  durationMinutes: 60,
  totalQuestions: 35, // 10 Listening + 13 Reading + 10 Grammar = 33 Obj + 2 Subj
  skills: {
    listening: {
      title: "Kỹ năng Nghe (Listening)",
      audioUrl: ${JSON.stringify(listeningSec?.audioUrl || "https://gzpdlqxjggyxlkeatvvf.supabase.co/storage/v1/object/public/exam-assets/audio/1787423782098-cambridge-ielts-13-academic-listening-1-audio-1.mp3")},
      questions: [
        {
          id: ${JSON.stringify(listeningQ?.id || "43907def-1f78-4839-8751-ff1079fdee91")},
          skill: "listening",
          sectionTitle: "Kỹ năng Nghe (Listening)",
          questionType: "fill_blank",
          prompt: ${JSON.stringify(listeningQ?.questionText || "")},
          placeholder: "Nhập câu trả lời...",
          orderIndex: 1,
          blankCount: 10,
        },
      ],
    },
    reading: {
      title: "Kỹ năng Đọc hiểu (Reading)",
      passage: ${JSON.stringify(readingPassage)},
      questions: [
        {
          id: ${JSON.stringify(readingQ1?.id || "c0d8e9bd-f426-42c3-b051-4c15df13543a")},
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "fill_blank",
          prompt: ${JSON.stringify(readingQ1?.questionText || "")},
          placeholder: "Nhập câu trả lời...",
          orderIndex: 1,
          blankCount: 7,
        },
        ${readingTFNG.map((q, idx) => `{
          id: ${JSON.stringify(q.id)},
          skill: "reading",
          sectionTitle: "Kỹ năng Đọc hiểu (Reading)",
          questionType: "true_false_not_given",
          prompt: ${JSON.stringify(q.questionText || "")},
          options: ["TRUE", "FALSE", "NOT GIVEN"],
          orderIndex: ${idx + 8},
          blankCount: 1,
        }`).join(',\n        ')}
      ],
    },
    grammar: {
      title: "Ngữ pháp & Từ vựng (Grammar)",
      questions: [
        ${grammarQs.map((q, idx) => `{
          id: ${JSON.stringify(q.id)},
          skill: "grammar",
          sectionTitle: "Ngữ pháp & Từ vựng (Grammar)",
          questionType: "multiple_choice",
          prompt: ${JSON.stringify(q.questionText || "")},
          options: ${JSON.stringify(q.options)},
          orderIndex: ${idx + 1},
          blankCount: 1,
        }`).join(',\n        ')}
      ],
    },
    writing: {
      title: "Kỹ năng Viết (Writing)",
      prompt: ${JSON.stringify(writingQ?.questionText || "Viết một bài văn khoảng 100–150 từ trả lời câu hỏi sau: Some people think that students should be required to learn a foreign language in school. Do you agree or disagree? Give reasons and examples.")},
      guidelines: [
        "Viết tối thiểu 100 từ, phát triển ít nhất 2 luận điểm rõ ràng.",
        "Sử dụng đa dạng cấu trúc câu ghép, câu phức và từ vựng học thuật.",
        "Trình bày mạch lạc với mở bài, thân bài và kết bài.",
      ],
      minWords: 80,
      maxWords: 400,
    },
    speaking: {
      title: "Kỹ năng Nói (Speaking)",
      part1Questions: [
        "1. Tell me about your hometown. What do you like most about living there?",
        "2. How do you usually study or practice English in your free time?",
      ],
      part2Topic: "Describe an important goal or ambition you have set for yourself recently.",
      part2Cues: [
        "What the goal is",
        "When and why you decided to pursue it",
        "What steps you need to take to accomplish it",
        "And explain how achieving this goal will change your life.",
      ],
    },
  },
};
`;

fs.writeFileSync('server/data/placement-test/questions.ts', questionsFileContent);
console.log('✅ Generated server/data/placement-test/questions.ts');

// 2. Generate answerKeys.ts content
const answerKeysFileContent = `/**
 * Authoritative Secret Answer Keys for ARIS Entrance Assessment
 * Strictly resides on Backend Server.
 * NEVER EXPORTED OR EXPOSED TO CLIENT BUNDLE.
 */

export interface AuthoritativeAnswerKey {
  questionId: string;
  skill: "listening" | "reading" | "grammar";
  correctAnswer: string; // Exact match or regex/variants separated by '|'
  acceptedAnswers?: string[];
  diagnosticCategory: string;
  difficulty: "foundation" | "intermediate" | "advanced";
  weight: number;
}

export const authoritativePlacementAnswerKeys: Record<string, AuthoritativeAnswerKey> = {
  // Listening: Multi-blank fill-in-the-blank (10 blanks)
  "43907def-1f78-4839-8751-ff1079fdee91": {
    questionId: "43907def-1f78-4839-8751-ff1079fdee91",
    skill: "listening",
    correctAnswer: '["choose","private","20% | 20 percent","healthy","bones","lecture","Arretsa | arretsa","vegetarian","market","knife"]',
    acceptedAnswers: ["choose", "private", "20%", "20 percent", "healthy", "bones", "lecture", "Arretsa", "arretsa", "vegetarian", "market", "knife"],
    diagnosticCategory: "cambridge_listening_form_filling",
    difficulty: "intermediate",
    weight: 10,
  },

  // Reading: Multi-blank fill-in-the-blank (7 blanks)
  "c0d8e9bd-f426-42c3-b051-4c15df13543a": {
    questionId: "c0d8e9bd-f426-42c3-b051-4c15df13543a",
    skill: "reading",
    correctAnswer: '["update","environment","captain","films","season","accomodation","blog"]',
    acceptedAnswers: ["update", "environment", "captain", "films", "season", "accomodation", "accommodation", "blog"],
    diagnosticCategory: "summary_completion",
    difficulty: "intermediate",
    weight: 7,
  },

  // Reading: True / False / Not Given (6 questions)
  "e6084ef6-30d7-421b-9935-c15e506d4049": {
    questionId: "e6084ef6-30d7-421b-9935-c15e506d4049",
    skill: "reading",
    correctAnswer: "FALSE",
    acceptedAnswers: ["FALSE", "F"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },
  "de50e60b-f74c-4948-905f-03f5ba2c0b6d": {
    questionId: "de50e60b-f74c-4948-905f-03f5ba2c0b6d",
    skill: "reading",
    correctAnswer: "NOT GIVEN",
    acceptedAnswers: ["NOT GIVEN", "NG"],
    diagnosticCategory: "tfng_logic",
    difficulty: "advanced",
    weight: 1,
  },
  "e19ac399-6094-4a0c-9003-b54abc5e0f40": {
    questionId: "e19ac399-6094-4a0c-9003-b54abc5e0f40",
    skill: "reading",
    correctAnswer: "FALSE",
    acceptedAnswers: ["FALSE", "F"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },
  "00d76f65-dd5f-4dc1-98de-8c235f37f834": {
    questionId: "00d76f65-dd5f-4dc1-98de-8c235f37f834",
    skill: "reading",
    correctAnswer: "TRUE",
    acceptedAnswers: ["TRUE", "T"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },
  "578ed22b-adee-4442-92ab-c04a1951d902": {
    questionId: "578ed22b-adee-4442-92ab-c04a1951d902",
    skill: "reading",
    correctAnswer: "NOT GIVEN",
    acceptedAnswers: ["NOT GIVEN", "NG"],
    diagnosticCategory: "tfng_logic",
    difficulty: "advanced",
    weight: 1,
  },
  "6268c893-6886-499e-81c3-194dea9cd9f2": {
    questionId: "6268c893-6886-499e-81c3-194dea9cd9f2",
    skill: "reading",
    correctAnswer: "TRUE",
    acceptedAnswers: ["TRUE", "T"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },

  // Grammar (10 questions)
  "7b3cc213-6fbc-4e41-8ed7-9420773fd55a": {
    questionId: "7b3cc213-6fbc-4e41-8ed7-9420773fd55a",
    skill: "grammar",
    correctAnswer: "goes",
    acceptedAnswers: ["goes"],
    diagnosticCategory: "present_simple_tense",
    difficulty: "foundation",
    weight: 1,
  },
  "5ba28972-e776-4953-b05e-41d6a862c4ed": {
    questionId: "5ba28972-e776-4953-b05e-41d6a862c4ed",
    skill: "grammar",
    correctAnswer: "have read",
    acceptedAnswers: ["have read"],
    diagnosticCategory: "present_perfect_tense",
    difficulty: "foundation",
    weight: 1,
  },
  "afd8852d-5f56-413d-99ef-73cd89c969d4": {
    questionId: "afd8852d-5f56-413d-99ef-73cd89c969d4",
    skill: "grammar",
    correctAnswer: "will be sent",
    acceptedAnswers: ["will be sent"],
    diagnosticCategory: "future_passive_voice",
    difficulty: "intermediate",
    weight: 1,
  },
  "59739e98-711b-4d4b-8927-e5f97c0d3a32": {
    questionId: "59739e98-711b-4d4b-8927-e5f97c0d3a32",
    skill: "grammar",
    correctAnswer: "much",
    acceptedAnswers: ["much"],
    diagnosticCategory: "uncountable_quantifiers",
    difficulty: "foundation",
    weight: 1,
  },
  "380a1c22-1b82-478a-863e-e5e9a2ac21dd": {
    questionId: "380a1c22-1b82-478a-863e-e5e9a2ac21dd",
    skill: "grammar",
    correctAnswer: "since",
    acceptedAnswers: ["since"],
    diagnosticCategory: "prepositions_of_time",
    difficulty: "foundation",
    weight: 1,
  },
  "36a7ce11-694e-4986-871b-96427ac6f798": {
    questionId: "36a7ce11-694e-4986-871b-96427ac6f798",
    skill: "grammar",
    correctAnswer: "invested",
    acceptedAnswers: ["invested"],
    diagnosticCategory: "second_conditional",
    difficulty: "intermediate",
    weight: 1,
  },
  "307abd86-198d-4686-9c35-03e3b8d84520": {
    questionId: "307abd86-198d-4686-9c35-03e3b8d84520",
    skill: "grammar",
    correctAnswer: "who",
    acceptedAnswers: ["who"],
    diagnosticCategory: "relative_pronouns",
    difficulty: "foundation",
    weight: 1,
  },
  "af2cb913-45db-4ee3-a2bb-870d79d44334": {
    questionId: "af2cb913-45db-4ee3-a2bb-870d79d44334",
    skill: "grammar",
    correctAnswer: "to maintain",
    acceptedAnswers: ["to maintain"],
    diagnosticCategory: "infinitive_structures",
    difficulty: "intermediate",
    weight: 1,
  },
  "ecd26e7b-aaae-45a1-b3c2-52bcdd8409af": {
    questionId: "ecd26e7b-aaae-45a1-b3c2-52bcdd8409af",
    skill: "grammar",
    correctAnswer: "having",
    acceptedAnswers: ["having"],
    diagnosticCategory: "gerund_after_prepositions",
    difficulty: "intermediate",
    weight: 1,
  },
  "eea6e4cd-4eda-4de6-904c-c4c2a834f0a7": {
    questionId: "eea6e4cd-4eda-4de6-904c-c4c2a834f0a7",
    skill: "grammar",
    correctAnswer: "had already finished",
    acceptedAnswers: ["had already finished"],
    diagnosticCategory: "past_perfect_tense",
    difficulty: "intermediate",
    weight: 1,
  },
};
`;

fs.writeFileSync('server/data/placement-test/answerKeys.ts', answerKeysFileContent);
console.log('✅ Generated server/data/placement-test/answerKeys.ts');
