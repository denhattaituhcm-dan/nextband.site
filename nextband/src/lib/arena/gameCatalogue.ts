/**
 * GAME REGISTRY & CATALOGUE CONTRACT
 * Tuân thủ Hiến pháp Kiến trúc:
 * - Điều 7 (Pure Functions): Cung cấp metadata thuần túy, không phụ thuộc UI/DB.
 * - Điều 41 (Simplicity & Zero-Fluff): Cấu trúc rõ ràng, hỗ trợ mở rộng các game tương lai của trung tâm.
 */

export type GameEngineId = 'class_arena' | 'word_chain' | 'dictation_sprint';

export interface GameMetadata {
  id: GameEngineId;
  name: string;
  tagline: string;
  description: string;
  status: 'ACTIVE' | 'COMING_SOON';
  category: 'Live Quiz' | 'Vocabulary' | 'Listening';
  recommendedPlayers: string;
  avgDuration: string;
  badgeColor: string;
  launchPath?: string;
  joinPath?: string;
}

export interface QuestionBankPackage {
  id: string;
  gameId: GameEngineId;
  title: string;
  category: string;
  level: string; // e.g., 'IELTS 5.5 - 6.5', 'IELTS 6.5 - 7.5'
  questionCount: number;
  tags: string[];
}

export const REGISTERED_GAMES: GameMetadata[] = [
  {
    id: 'class_arena',
    name: 'Class Arena (IELTS Collocation & Live Quiz)',
    tagline: 'Kahoot-style Classroom Interaction',
    description: 'Đấu trường phản xạ thời gian thực có phân tích bẫy Misconception học thuật, nén nhang đếm ngược 15s và bảng vàng vinh danh.',
    status: 'ACTIVE',
    category: 'Live Quiz',
    recommendedPlayers: '10–20 học viên',
    avgDuration: '5–10 phút',
    badgeColor: 'orange',
    launchPath: '/arena/host',
    joinPath: '/arena/join',
  },
  {
    id: 'word_chain',
    name: 'Word Chain Arena (Từ vựng & Word Formation)',
    tagline: 'Vocabulary Rapid-Fire Duel',
    description: 'Chế độ nối từ vựng học thuật, nhận diện họ từ (Noun - Verb - Adj) theo nhóm đồng đội phản xạ nhanh.',
    status: 'COMING_SOON',
    category: 'Vocabulary',
    recommendedPlayers: '10–30 học viên',
    avgDuration: '7–12 phút',
    badgeColor: 'indigo',
  },
  {
    id: 'dictation_sprint',
    name: 'Listening Dictation Sprint (Tốc ký Chép chính tả)',
    tagline: 'Speed Dictation Relay',
    description: 'Nghe phát âm chuẩn người bản xứ và điền từ khóa đục lỗ tức thì theo từng nhịp ngắt câu (Chuncking).',
    status: 'COMING_SOON',
    category: 'Listening',
    recommendedPlayers: '5–20 học viên',
    avgDuration: '10–15 phút',
    badgeColor: 'emerald',
  },
];

export const MOCK_QUESTION_PACKAGES: QuestionBankPackage[] = [
  {
    id: 'colloc_general_01',
    gameId: 'class_arena',
    title: 'IELTS Business & Investment Collocations',
    category: 'Collocation',
    level: 'IELTS 6.0+',
    questionCount: 5,
    tags: ['make an investment', 'pay attention', 'take into account'],
  },
  {
    id: 'colloc_academic_02',
    gameId: 'class_arena',
    title: 'Academic Writing Task 2 Cohesion & Verbs',
    category: 'Writing Vocabulary',
    level: 'IELTS 6.5+',
    questionCount: 10,
    tags: ['draw a conclusion', 'cast light on', 'raise awareness'],
  },
  {
    id: 'tense_speaking_01',
    gameId: 'class_arena',
    title: 'Speaking Part 1 & 2 Fluency Traps',
    category: 'Grammar Traps',
    level: 'IELTS 5.5 - 6.5',
    questionCount: 8,
    tags: ['past perfect', 'used to', 'would rather'],
  },
];
