/**
 * NEXTQUIZ QUESTION REPOSITORY
 * Bộ câu hỏi chuẩn IELTS Collocation & Lexical Resource
 * Tích hợp chẩn đoán bẫy Misconception của học sinh Việt Nam.
 */

export interface ArenaQuestionOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ArenaQuestion {
  id: string;
  roundIndex: number;
  prompt: string;
  options: ArenaQuestionOption[];
  correctOptionId: string;
  correctAnswerText: string;
  correctExplanation: string;
  misconception: {
    baitOptionId: string;
    baitOptionText: string;
    diagnosticTitle: string;
    explanation: string;
  };
}

function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function shuffleQuestionOptions(question: ArenaQuestion, seedStr?: string): ArenaQuestion {
  if (!question.options || question.options.length < 2) return question;

  const originalCorrect = question.options.find((o) => o.id === question.correctOptionId) || question.options[0];
  const originalBait = question.misconception
    ? question.options.find((o) => o.id === question.misconception.baitOptionId)
    : null;

  const seedNum = hashSeed(seedStr || question.id || 'arena_fallback');
  const shuffled = [...question.options];
  let curSeed = seedNum;

  for (let i = shuffled.length - 1; i > 0; i--) {
    curSeed = (curSeed * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((curSeed / 4294967296) * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const labels: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const newOptions: ArenaQuestionOption[] = shuffled.map((opt, idx) => ({
    id: `opt_${labels[idx]}`,
    label: labels[idx],
    text: opt.text,
  }));

  const newCorrectIdx = shuffled.findIndex((opt) => opt.text === originalCorrect.text);
  const correctIdxSafe = newCorrectIdx >= 0 ? newCorrectIdx : 0;
  const newCorrectOptionId = newOptions[correctIdxSafe].id;
  const newCorrectAnswerText = `${newOptions[correctIdxSafe].label}. ${newOptions[correctIdxSafe].text}`;

  let newMisconception = question.misconception;
  if (originalBait && question.misconception) {
    const newBaitIdx = shuffled.findIndex((opt) => opt.text === originalBait.text);
    if (newBaitIdx >= 0) {
      newMisconception = {
        ...question.misconception,
        baitOptionId: newOptions[newBaitIdx].id,
        baitOptionText: `${newOptions[newBaitIdx].label}. ${newOptions[newBaitIdx].text}`,
      };
    }
  }

  return {
    ...question,
    options: newOptions,
    correctOptionId: newCorrectOptionId,
    correctAnswerText: newCorrectAnswerText,
    misconception: newMisconception,
  };
}

const RAW_ARENA_COLLOCATION_QUESTIONS: ArenaQuestion[] = [
  {
    id: 'q_colloc_01',
    roundIndex: 0,
    prompt: 'The enterprise decided to ______ an investment in clean technology.',
    options: [
      { id: 'opt_A', label: 'A', text: 'make an investment' },
      { id: 'opt_B', label: 'B', text: 'do an investment' },
      { id: 'opt_C', label: 'C', text: 'take an investment' },
      { id: 'opt_D', label: 'D', text: 'create an investment' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. make an investment',
    correctExplanation: 'Động từ chuẩn đi với "investment" trong học thuật IELTS là "make" (không dùng do/take/create).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. do an investment',
      diagnosticTitle: 'Bẫy dịch từ tư duy tiếng Việt (Làm đầu tư)',
      explanation: 'Học viên có thói quen dịch "làm đầu tư" thành "do an investment". Trong tiếng Anh học thuật, "make" đi với quyết định/khoản đầu tư kinh tế mang tính chủ động.',
    },
  },
  {
    id: 'q_colloc_02',
    roundIndex: 1,
    prompt: 'Students need to ______ into account cultural differences when studying abroad.',
    options: [
      { id: 'opt_A', label: 'A', text: 'take' },
      { id: 'opt_B', label: 'B', text: 'make' },
      { id: 'opt_C', label: 'C', text: 'keep' },
      { id: 'opt_D', label: 'D', text: 'bring' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. take',
    correctExplanation: 'Cụm cố định "take something into account" mang nghĩa cân nhắc, tính đến một yếu tố nào đó.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. make',
      diagnosticTitle: 'Nhầm lẫn với "make account of"',
      explanation: 'Học viên hay nhầm với cấu trúc "make account" hoặc tự ghép "make into account". Thành ngữ chuẩn luôn là "take into account" hoặc "take into consideration".',
    },
  },
  {
    id: 'q_colloc_03',
    roundIndex: 2,
    prompt: 'Recent scientific research has ______ valuable light on how memory functions.',
    options: [
      { id: 'opt_A', label: 'A', text: 'shed' },
      { id: 'opt_B', label: 'B', text: 'dropped' },
      { id: 'opt_C', label: 'C', text: 'shone' },
      { id: 'opt_D', label: 'D', text: 'lighted' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. shed',
    correctExplanation: 'Collocation band 7.0+: "shed light on something" nghĩa là làm sáng tỏ, soi rọi điều gì chưa rõ.',
    misconception: {
      baitOptionId: 'opt_C',
      baitOptionText: 'C. shone',
      diagnosticTitle: 'Bẫy nghĩa đen "Chiếu sáng (Shine/Shone)"',
      explanation: 'Học viên nghĩ ánh sáng phải dùng động từ "shine/shone", nhưng collocation thành ngữ học thuật chỉ chấp nhận "shed light on".',
    },
  },
  {
    id: 'q_colloc_04',
    roundIndex: 3,
    prompt: 'Engaging in regular aerobic workouts helps individuals ______ in good shape.',
    options: [
      { id: 'opt_A', label: 'A', text: 'stay' },
      { id: 'opt_B', label: 'B', text: 'hold' },
      { id: 'opt_C', label: 'C', text: 'run' },
      { id: 'opt_D', label: 'D', text: 'stand' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. stay',
    correctExplanation: 'Cụm từ "stay in shape" hoặc "keep in shape" là collocation chuẩn chỉ việc giữ vóc dáng cân đối và khỏe mạnh.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. hold',
      diagnosticTitle: 'Nhầm lẫn giữ hình dáng (Hold)',
      explanation: '"Hold" chỉ dùng cho giữ vật lý (hold hands). Để diễn tả trạng thái sức khỏe duy trì ổn định, ta dùng "stay" hoặc "keep".',
    },
  },
  {
    id: 'q_colloc_05',
    roundIndex: 4,
    prompt: 'The international summit aimed to ______ public awareness of climate change.',
    options: [
      { id: 'opt_A', label: 'A', text: 'raise' },
      { id: 'opt_B', label: 'B', text: 'rise' },
      { id: 'opt_C', label: 'C', text: 'lift' },
      { id: 'opt_D', label: 'D', text: 'boost' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. raise',
    correctExplanation: 'Cụm chuẩn "raise awareness of something" (nâng cao nhận thức). "Raise" là ngoại động từ cần tân ngữ "awareness".',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. rise',
      diagnosticTitle: 'Bẫy kinh điển: Ngoại động từ vs Nội động từ (Raise vs Rise)',
      explanation: '"Rise" là nội động từ (không bao giờ có tân ngữ phía sau, ví dụ: the sun rises). Do đó không thể nói "rise awareness".',
    },
  },
];

export const ARENA_COLLOCATION_QUESTIONS: ArenaQuestion[] = RAW_ARENA_COLLOCATION_QUESTIONS.map((q, idx) =>
  shuffleQuestionOptions({ ...q, roundIndex: idx }, `client_init_${q.id}`)
);

