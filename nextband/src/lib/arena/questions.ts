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

export const ARENA_COLLOCATION_QUESTIONS: ArenaQuestion[] = [
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
