import React, { useState, useMemo } from 'react';
import { LEVEL_1_PUZZLES } from '../data/level-1.data';
import { LEVEL_2_PUZZLES } from '../data/level-2.data';
import { soundEffects } from '../utils/soundEffects';

export interface CompletionSummaryProps {
  onReplay: () => void;
  onSwitchLevel?: () => void;
  currentLevel?: 1 | 2;
}

interface TakeawayCard {
  order: number;
  prep: string;
  badgeColor: string;
  tag: string;
  icon: string;
  rule: string;
  highlight: string;
  example: string;
}

const LEVEL_1_SUMMARY_CARDS: TakeawayCard[] = [
  {
    order: 1,
    prep: 'IN',
    badgeColor: 'bg-emerald-600 text-white',
    tag: 'Lòng vật chứa',
    icon: '🥣',
    rule: 'Mặt lõm bao bọc và giữ vật không rơi.',
    highlight: 'Lòng bát giữ cam ➔',
    example: 'in the bowl'
  },
  {
    order: 2,
    prep: 'IN',
    badgeColor: 'bg-emerald-600 text-white',
    tag: 'Thuộc khối hàng',
    icon: '🍌',
    rule: 'Dù vượt mép vành, đẩy bát chuối vẫn đi cùng.',
    highlight: 'Cùng chuyển động ➔',
    example: 'in the bowl'
  },
  {
    order: 3,
    prep: 'UNDER',
    badgeColor: 'bg-amber-600 text-white',
    tag: 'Nắp che phủ',
    icon: '🍎',
    rule: 'Bát úp chỉ che bụi, nhấc bát táo ở lại bàn.',
    highlight: 'Đóng vai trò che ➔',
    example: 'under the bowl'
  },
  {
    order: 4,
    prep: 'IN',
    badgeColor: 'bg-purple-600 text-white',
    tag: 'Chặn đường thoát',
    icon: '💨',
    rule: 'Khói bay lên bị bát úp nhốt chặt không thoát.',
    highlight: 'Giam giữ khí ➔',
    example: 'smoke in the bowl'
  },
  {
    order: 5,
    prep: 'IN',
    badgeColor: 'bg-blue-600 text-white',
    tag: 'Kẹp giữ cơ học',
    icon: '🪵',
    rule: 'Dù 70% đinh nhô ngoài, thớ gỗ kẹp giữ mũi đinh.',
    highlight: 'Kẹp chặt liên kết ➔',
    example: 'in the wood'
  }
];

const LEVEL_2_SUMMARY_CARDS: TakeawayCard[] = [
  {
    order: 1,
    prep: 'ON',
    badgeColor: 'bg-indigo-600 text-white',
    tag: 'Tiếp xúc bề mặt phẳng',
    icon: '🖼️',
    rule: 'Tì lên mặt phẳng đứng hoặc ngang để được nâng đỡ.',
    highlight: 'Mặt phẳng đỡ ➔',
    example: 'on the wall'
  },
  {
    order: 2,
    prep: 'ON',
    badgeColor: 'bg-indigo-600 text-white',
    tag: 'Mặt phẳng mở rộng',
    icon: '💧',
    rule: 'Nước loang tự do trên mặt phẳng không có gờ chắn.',
    highlight: 'Trải rộng diện tích ➔',
    example: 'on the desk'
  },
  {
    order: 3,
    prep: 'IN',
    badgeColor: 'bg-emerald-600 text-white',
    tag: 'Góc phòng lòng chảo',
    icon: '📚',
    rule: '2 vách tường giao nhau tạo không gian 3D ôm lấy đồ vật.',
    highlight: 'Góc ôm trọn ➔',
    example: 'in the corner of the room'
  },
  {
    order: 4,
    prep: 'ON',
    badgeColor: 'bg-indigo-600 text-white',
    tag: 'Mặt sàn có lối đi',
    icon: '🚌',
    rule: 'Phương tiện có sàn đứng và đi lại được như bục di động.',
    highlight: 'Mặt sàn đứng ➔',
    example: 'on the bus / train'
  },
  {
    order: 5,
    prep: 'AT',
    badgeColor: 'bg-rose-600 text-white',
    tag: 'Toạ độ điểm hội tụ',
    icon: '📍',
    rule: 'Xem địa điểm như một điểm chấm toạ độ 0D trên bản đồ.',
    highlight: 'Điểm toạ độ ➔',
    example: 'at the checkpoint'
  }
];

export const CompletionSummary: React.FC<CompletionSummaryProps> = ({
  onReplay,
  onSwitchLevel,
  currentLevel = 1
}) => {
  const currentPuzzles = currentLevel === 1 ? LEVEL_1_PUZZLES : LEVEL_2_PUZZLES;
  const summaryCards = currentLevel === 1 ? LEVEL_1_SUMMARY_CARDS : LEVEL_2_SUMMARY_CARDS;

  // Extract all micro-challenges from current level puzzles and shuffle them
  const allQuestions = useMemo(() => {
    const list = currentPuzzles.map((p) => ({
      puzzleOrder: p.order,
      ...p.ieltsBridge!.microChallenge
    }));
    return [...list].sort(() => Math.random() - 0.5);
  }, [currentPuzzles]);

  // Track answers for each question index
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const handleSelectOption = (qIdx: number, opt: string, correct: string) => {
    if (userAnswers[qIdx]) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: opt }));
    if (opt === correct) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playThud();
    }
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([idx, ans]) => ans === allQuestions[Number(idx)].correctAnswer
  ).length;

  return (
    <div className="w-full max-w-2xl mx-auto p-5 sm:p-7 bg-white border border-slate-200/90 rounded-3xl shadow-xl text-slate-800">
      {/* Header */}
      <div className="text-center space-y-1.5 pb-4 border-b border-slate-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-2xl mb-1 shadow-xs">
          🏆
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {currentLevel === 1
            ? 'Bí kíp tóm tắt: Vật chứa vs Nắp đậy (IN vs UNDER)'
            : 'Bí kíp tóm tắt: Bề mặt, Ranh giới & Điểm (ON vs IN vs AT)'}
        </h2>
        <p className="text-xs text-slate-500">
          5 nguyên tắc ghi nhớ nhanh giúp chọn đúng 100% giới từ không gian
        </p>
      </div>

      {/* 5 Scannable Visual Cards Grid */}
      <div className="mt-4 space-y-2.5">
        {summaryCards.map((item) => (
          <div
            key={item.order}
            className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 transition-all shadow-xs"
          >
            {/* Left: Icon & Prep Pill */}
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-xl">{item.icon}</span>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-black tracking-wider shadow-xs ${item.badgeColor}`}>
                {item.prep}
              </span>
            </div>

            {/* Middle: Punchy Core Rule with Highlight */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {item.tag}
                </span>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200/60 hidden sm:inline">
                  {item.highlight}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {item.rule}
              </p>
            </div>

            {/* Right: Concrete English Example Tag */}
            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-[11px] font-bold text-slate-700 shadow-2xs">
                {item.example}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Formula Epiphany Box */}
      <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-center gap-3 shadow-xs">
        <span className="text-2xl shrink-0">💡</span>
        <div className="leading-snug">
          <span className="font-black text-amber-900 block mb-0.5">Quy tắc vàng bỏ túi:</span>
          {currentLevel === 1 ? (
            <>
              Tiếng Anh chọn <strong className="text-emerald-700 font-black">IN</strong> khi vật thể được <u>nâng đỡ</u>, <u>chặn đường thoát</u> hoặc <u>kẹp giữ cùng chuyển động</u> — không phụ thuộc vào hình dạng hay tỉ lệ nhô ra ngoài!
            </>
          ) : (
            <>
              Tiếng Anh chọn <strong className="text-indigo-700 font-black">ON</strong> khi có <u>mặt phẳng nâng đỡ tiếp xúc</u> (dù phẳng ngang hay đứng), <strong className="text-emerald-700 font-black">IN</strong> khi có <u>lòng bao bọc</u>, và <strong className="text-rose-700 font-black">AT</strong> khi coi địa điểm như <u>toạ độ điểm không chiều</u>!
            </>
          )}
        </div>
      </div>

      {/* SECTION: SHUFFLED IELTS ACADEMIC REVIEW CHALLENGE */}
      <div className="mt-7 pt-6 border-t-2 border-indigo-100">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono text-xs font-black tracking-wide shadow-xs">
              IELTS REVIEW ARENA
            </span>
            <span className="text-sm font-black text-indigo-950">
              Thử thách phản xạ tổng hợp (Đã xáo trộn câu)
            </span>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            {answeredCount} / {allQuestions.length} câu
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Các câu hỏi học thuật được xáo ngẫu nhiên để kiểm tra xem bạn đã thực sự thấu suốt bản chất hay chưa:
        </p>

        <div className="space-y-4">
          {allQuestions.map((q, qIdx) => {
            const userAnswer = userAnswers[qIdx];
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={qIdx}
                className="p-4 rounded-2xl bg-slate-50 border border-indigo-100/80 shadow-2xs text-left"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Câu {qIdx + 1}:</span>
                  {isAnswered && (
                    <span className={isCorrect ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                      {isCorrect ? '✓ Đúng' : '✕ Sai'}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed mb-3">
                  {q.prompt}
                </p>

                {/* Shuffled Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {q.options.map((opt) => {
                    const isSelected = userAnswer === opt;
                    const isTarget = opt === q.correctAnswer;
                    let btnClass = 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200';

                    if (isAnswered) {
                      if (isTarget) {
                        btnClass = 'bg-emerald-600 text-white border-emerald-600 font-black shadow-xs';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-600 text-white border-rose-600 font-black';
                      } else {
                        btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(qIdx, opt, q.correctAnswer)}
                        className={`py-2 px-3 rounded-xl border font-bold text-xs uppercase tracking-wide transition-all active:scale-95 cursor-pointer ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answer */}
                {isAnswered && (
                  <div
                    className={`mt-2.5 p-2.5 rounded-xl text-xs font-medium leading-relaxed animate-fadeIn ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                        : 'bg-rose-50 text-rose-950 border border-rose-200'
                    }`}
                  >
                    <span className="font-bold mr-1">Đáp án đúng: {q.correctAnswer.toUpperCase()} ➔</span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {answeredCount === allQuestions.length && (
          <div className="mt-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center animate-fadeIn">
            <span className="text-xl">🎉</span>
            <h4 className="text-sm font-black text-indigo-950 mt-1">
              Bạn đạt {correctCount}/{allQuestions.length} câu chính xác!
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Tư duy bản chất vật lý đã ngấm sâu thành phản xạ tự nhiên trong bài thi IELTS.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🔄</span>
          <span>Chơi lại Level {currentLevel}</span>
        </button>

        {onSwitchLevel && (
          <button
            type="button"
            onClick={onSwitchLevel}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentLevel === 1 ? 'Chuyển sang Level 2: ON vs IN vs AT' : 'Quay lại Level 1: IN vs UNDER'}</span>
            <span>➔</span>
          </button>
        )}
      </div>
    </div>
  );
};
