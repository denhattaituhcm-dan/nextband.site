import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';

export interface RevengeQuestionItem {
  id: string;
  prompt: string;
  options: Array<{
    id: string;
    label: string;
    text: string;
  }>;
  correctOptionId: string;
  correctAnswerText: string;
  correctExplanation: string;
  selectedOptionId?: string | null;
  isCorrect?: boolean;
}

interface QuestionTypeRevengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrongQuestions: RevengeQuestionItem[];
  allQuestionsCount: number;
}

export const QuestionTypeRevengeModal: React.FC<QuestionTypeRevengeModalProps> = ({
  isOpen,
  onClose,
  wrongQuestions,
  allQuestionsCount,
}) => {
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'PRACTICE'>('SUMMARY');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<string | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentWrongQ = wrongQuestions[practiceIndex];
  const isPracticeCorrect = selectedPracticeOption === currentWrongQ?.correctOptionId;

  const handleSelectPracticeOption = (optionId: string) => {
    if (hasCheckedAnswer) return;
    setSelectedPracticeOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedPracticeOption) return;
    setHasCheckedAnswer(true);
    if (selectedPracticeOption === currentWrongQ.correctOptionId) {
      if (!resolvedIds.includes(currentWrongQ.id)) {
        setResolvedIds((prev) => [...prev, currentWrongQ.id]);
      }
    }
  };

  const handleNextPracticeQuestion = () => {
    setSelectedPracticeOption(null);
    setHasCheckedAnswer(false);
    if (practiceIndex < wrongQuestions.length - 1) {
      setPracticeIndex((prev) => prev + 1);
    } else {
      setActiveTab('SUMMARY');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-purple-950/60 border-b border-purple-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Sổ Tay Học Thuật Sau Trận</h3>
              <p className="text-xs text-purple-300/80 font-medium">
                {wrongQuestions.length === 0
                  ? 'Tuyệt đỉnh! Bạn đúng 100% câu hỏi'
                  : `Cần phục thù ${wrongQuestions.length - resolvedIds.length}/${wrongQuestions.length} câu chưa chuẩn`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-purple-900/40 bg-slate-950/40 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('SUMMARY')}
            className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'SUMMARY'
                ? 'border-purple-400 text-purple-200'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Tổng kết chi tiết
          </button>
          {wrongQuestions.length > 0 && (
            <button
              onClick={() => {
                setActiveTab('PRACTICE');
                setPracticeIndex(0);
                setSelectedPracticeOption(null);
                setHasCheckedAnswer(false);
              }}
              className={`pb-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
                activeTab === 'PRACTICE'
                  ? 'border-emerald-400 text-emerald-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Luyện lại ngay ({resolvedIds.length}/{wrongQuestions.length})
            </button>
          )}
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'SUMMARY' ? (
            <>
              {/* Score card summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center">
                  <span className="text-xs text-emerald-300 font-bold uppercase block">Đã hoàn thành đúng</span>
                  <span className="text-2xl font-black text-emerald-400">
                    {allQuestionsCount - wrongQuestions.length} / {allQuestionsCount}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center">
                  <span className="text-xs text-rose-300 font-bold uppercase block">Cần củng cố lại</span>
                  <span className="text-2xl font-black text-rose-400">
                    {wrongQuestions.length} câu
                  </span>
                </div>
              </div>

              {wrongQuestions.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Xuất Sắc! Nắm Vững 100% Kiến Thức</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Bạn không mắc bất kỳ bẫy misconception nào trong bài học này. Hãy tiếp tục duy trì phong độ ở các buổi tiếp theo!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
                    <span>DANH SÁCH BẪY KIẾN THỨC BẠN ĐÃ MẮC PHẢI:</span>
                    <span className="text-purple-300">{wrongQuestions.length} mục</span>
                  </div>

                  {wrongQuestions.map((q, idx) => {
                    const isResolved = resolvedIds.includes(q.id);
                    return (
                      <div
                        key={q.id || idx}
                        className={`p-4 rounded-2xl border transition ${
                          isResolved
                            ? 'bg-emerald-950/30 border-emerald-600/40'
                            : 'bg-slate-800/60 border-slate-700/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-purple-300 uppercase">
                            Câu {idx + 1}
                          </span>
                          {isResolved ? (
                            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                              ✓ Đã khắc phục
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Chưa đúng
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-semibold text-white mb-2 leading-snug">
                          {q.prompt}
                        </p>

                        <div className="p-3 bg-slate-900/80 rounded-xl space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 font-bold">Đáp án chuẩn:</span>
                            <span className="text-emerald-400 font-black">{q.correctAnswerText}</span>
                          </div>
                          <p className="text-slate-300 pt-1 text-[11px] leading-relaxed border-t border-slate-800">
                            💡 <span className="font-semibold text-purple-300">Giải thích:</span> {q.correctExplanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            /* Practice / Revenge Tab */
            currentWrongQ && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-purple-300 font-bold">
                  <span>PHỤC THÙ CÂU HỎI {practiceIndex + 1}/{wrongQuestions.length}</span>
                  <span className="text-slate-400">Không tính áp lực thời gian</span>
                </div>

                <div className="p-4 bg-slate-800/80 border border-purple-500/30 rounded-2xl">
                  <h4 className="text-sm font-bold text-white leading-relaxed">
                    "{currentWrongQ.prompt}"
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {currentWrongQ.options.map((opt) => {
                    const isSelected = selectedPracticeOption === opt.id;
                    const isTargetCorrect = opt.id === currentWrongQ.correctOptionId;

                    let btnClass = 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:border-purple-400/60';
                    if (isSelected && !hasCheckedAnswer) {
                      btnClass = 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-500/20';
                    } else if (hasCheckedAnswer) {
                      if (isTargetCorrect) {
                        btnClass = 'bg-emerald-600/30 border-emerald-400 text-emerald-200 font-bold';
                      } else if (isSelected && !isTargetCorrect) {
                        btnClass = 'bg-rose-600/30 border-rose-400 text-rose-200 line-through';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={hasCheckedAnswer}
                        onClick={() => handleSelectPracticeOption(opt.id)}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${btnClass}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-slate-900/60 flex items-center justify-center font-bold text-[11px] text-purple-300">
                            {opt.label}
                          </span>
                          <span>{opt.text}</span>
                        </span>
                        {hasCheckedAnswer && isTargetCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {hasCheckedAnswer && isSelected && !isTargetCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation upon check */}
                {hasCheckedAnswer && (
                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                      isPracticeCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <span className="font-bold block mb-1">
                      {isPracticeCorrect ? '🎉 Bạn đã nắm vững bản chất!' : '❌ Vẫn chưa chính xác, hãy đọc kỹ giải thích:'}
                    </span>
                    <p className="text-slate-300 text-[11px]">
                      {currentWrongQ.correctExplanation}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-slate-950/80 border-t border-purple-900/40 flex items-center justify-between gap-3">
          {activeTab === 'SUMMARY' ? (
            wrongQuestions.length > 0 ? (
              <button
                onClick={() => {
                  setActiveTab('PRACTICE');
                  setPracticeIndex(0);
                  setSelectedPracticeOption(null);
                  setHasCheckedAnswer(false);
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Bắt đầu làm lại các câu sai ngay
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition"
              >
                Đã hoàn tất ôn tập
              </button>
            )
          ) : (
            <>
              <button
                onClick={() => setActiveTab('SUMMARY')}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
              >
                Quay lại bảng tổng kết
              </button>
              {!hasCheckedAnswer ? (
                <button
                  disabled={!selectedPracticeOption}
                  onClick={handleCheckAnswer}
                  className={`py-2.5 px-5 font-bold text-xs rounded-xl transition ${
                    selectedPracticeOption
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <button
                  onClick={handleNextPracticeQuestion}
                  className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                >
                  {practiceIndex < wrongQuestions.length - 1 ? (
                    <>
                      Câu tiếp theo <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    'Xem lại tổng kết'
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
