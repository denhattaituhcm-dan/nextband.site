import React from 'react';
import { LEVEL_1_PUZZLES } from '../data/level-1.data';

interface CompletionSummaryProps {
  onReplay: () => void;
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

export const CompletionSummary: React.FC<CompletionSummaryProps> = ({ onReplay }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-5 sm:p-7 bg-white border border-slate-200/90 rounded-3xl shadow-xl text-slate-800">
      {/* Header */}
      <div className="text-center space-y-1.5 pb-4 border-b border-slate-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-2xl mb-1 shadow-xs">
          🏆
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Bí kíp tóm tắt: Vật chứa vs Nắp đậy
        </h2>
        <p className="text-xs text-slate-500">
          5 nguyên tắc ghi nhớ nhanh giúp chọn đúng 100% giới từ không gian
        </p>
      </div>

      {/* 5 Scannable Visual Cards Grid */}
      <div className="mt-4 space-y-2.5">
        {LEVEL_1_SUMMARY_CARDS.map((item) => (
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
          Tiếng Anh chọn <strong className="text-emerald-700 font-black">IN</strong> khi vật thể được <u>nâng đỡ</u>, <u>chặn đường thoát</u> hoặc <u>kẹp giữ cùng chuyển động</u> — không phụ thuộc vào hình dạng hay tỉ lệ nhô ra ngoài!
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🔄</span>
          <span>Chơi lại thử thách</span>
        </button>
        <button
          type="button"
          disabled
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-sm border border-slate-200 cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>Level 2: Quỹ đạo & Góc nhìn (Sắp ra mắt)</span>
          <span>🔒</span>
        </button>
      </div>
    </div>
  );
};
