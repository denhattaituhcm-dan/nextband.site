import React from 'react';
import { LEVEL_1_PUZZLES } from '../data/level-1.data';

interface CompletionSummaryProps {
  onReplay: () => void;
}

export const CompletionSummary: React.FC<CompletionSummaryProps> = ({ onReplay }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-xl text-slate-800">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 text-3xl mb-1 shadow-sm">
          🎓
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hoàn thành Level 1: Vật chứa & Nắp đậy
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Bạn vừa khám phá trọn vẹn bản chất tri nhận của giới từ tiếng Anh dựa trên công trình của Seth Lindstromberg.
        </p>
      </div>

      {/* Visual Principles Grid */}
      <div className="mt-6 space-y-3">
        {LEVEL_1_PUZZLES.map((puzzle) => (
          <div
            key={puzzle.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              {puzzle.order}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">
                  {puzzle.pedagogicalTakeaway.principleNameVi || puzzle.pedagogicalTakeaway.principleName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {puzzle.pedagogicalTakeaway.vi}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Epiphany Card */}
      <div className="mt-6 p-4.5 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 text-xs sm:text-sm leading-relaxed text-slate-700 shadow-xs">
        <span className="font-bold text-sky-800 block mb-1 text-sm">
          💡 Bài học cốt lõi lớn nhất (Hình học vs Chức năng):
        </span>
        Giới từ tiếng Anh không chỉ mô tả hình dạng không gian tĩnh. Chúng mã hóa <strong>chức năng vật lý</strong>:
        vật có được nâng đỡ chống lại trọng lực, có bị giam giữ chặn đường thoát, hay được thớ gỗ kẹp chặt và cùng chuyển động như một khối hay không.
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🔄</span>
          <span>Chơi lại Level 1</span>
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
