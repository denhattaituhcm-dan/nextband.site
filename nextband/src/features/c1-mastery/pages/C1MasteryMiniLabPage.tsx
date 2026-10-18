import React, { useState } from 'react';
import { CAUSATIVE_HAVE_GET_UNIT } from '../data/causativeHaveGet.unit';
import { evaluateTransformation } from '../engine/transformationEvaluator';
import { EvaluationResult } from '../types/mastery.types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  MessageSquare,
  Send,
} from 'lucide-react';

export default function C1MasteryMiniLabPage() {
  const unit = CAUSATIVE_HAVE_GET_UNIT;

  // Screen management: 1 (Contrastive Lens) -> 2 (Transformation Challenge) -> 3 (Verdict & Feedback)
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);

  // Screen 1: Contrastive Lens states
  const [contrastAnswers, setContrastAnswers] = useState<Record<string, string>>({});

  // Screen 2: Transformation Challenge states
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [evalResults, setEvalResults] = useState<Record<string, EvaluationResult>>({});
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({});
  const [itemStatuses, setItemStatuses] = useState<Record<string, 'unattempted' | 'first_try_correct' | 'assisted_correct' | 'in_progress'>>({});

  // Screen 3: User qualitative survey responses
  const [feedbackClarity, setFeedbackClarity] = useState<string | null>(null);
  const [noveltyRating, setNoveltyRating] = useState<string | null>(null);
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const activeTransItem = unit.transformationItems[activeItemIndex];

  // Handler: Screen 1 Contrast Selection
  const handleSelectContrast = (pairId: string, optionId: string) => {
    setContrastAnswers((prev) => ({ ...prev, [pairId]: optionId }));
  };

  const allContrastAnswered = unit.contrastivePairs.every((p) => contrastAnswers[p.id]);

  // Handler: Screen 2 Transformation Submission
  const handleCheckTransformation = () => {
    const raw = userInputs[activeTransItem.id] || '';
    const result = evaluateTransformation(raw, activeTransItem);

    setEvalResults((prev) => ({ ...prev, [activeTransItem.id]: result }));
    const currentAttempts = (attemptCounts[activeTransItem.id] || 0) + 1;
    setAttemptCounts((prev) => ({ ...prev, [activeTransItem.id]: currentAttempts }));

    if (result.verdict === 'EXACT_MATCH') {
      setItemStatuses((prev) => ({
        ...prev,
        [activeTransItem.id]: currentAttempts === 1 ? 'first_try_correct' : 'assisted_correct',
      }));
    } else {
      setItemStatuses((prev) => ({
        ...prev,
        [activeTransItem.id]: 'in_progress',
      }));
    }
  };

  const handleNextTransformation = () => {
    if (activeItemIndex < unit.transformationItems.length - 1) {
      setActiveItemIndex((prev) => prev + 1);
    } else {
      setCurrentScreen(3);
    }
  };

  const handleResetCurrentItem = () => {
    setUserInputs((prev) => ({ ...prev, [activeTransItem.id]: '' }));
    setEvalResults((prev) => {
      const next = { ...prev };
      delete next[activeTransItem.id];
      return next;
    });
  };

  // Quick stats for Screen 3
  const firstTryCorrectCount = Object.values(itemStatuses).filter((s) => s === 'first_try_correct').length;
  const assistedCorrectCount = Object.values(itemStatuses).filter((s) => s === 'assisted_correct').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Minimal Navigation & Progress Header */}
        <header className="border-b border-[#E8E1D5] pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#2D2825] text-white text-[11px] font-mono uppercase tracking-wider font-semibold">
              C1 Mastery Lab · Prototype
            </span>
            <span className="text-xs text-[#7A7067] font-medium hidden sm:inline">
              Chủ điểm: {unit.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={`px-2.5 py-1 rounded-full transition-colors ${currentScreen === 1 ? 'bg-[#C86D51] text-white' : 'bg-[#EFE9DF] text-[#7A7067]'}`}>
              1. Soi chiếu
            </span>
            <span className="text-[#C5BCB1]">→</span>
            <span className={`px-2.5 py-1 rounded-full transition-colors ${currentScreen === 2 ? 'bg-[#C86D51] text-white' : 'bg-[#EFE9DF] text-[#7A7067]'}`}>
              2. Rèn cấu trúc
            </span>
            <span className="text-[#C5BCB1]">→</span>
            <span className={`px-2.5 py-1 rounded-full transition-colors ${currentScreen === 3 ? 'bg-[#C86D51] text-white' : 'bg-[#EFE9DF] text-[#7A7067]'}`}>
              3. Tổng kết
            </span>
          </div>
        </header>

        {/* ============================================================== */}
        {/* SCREEN 1: CONTRASTIVE LENS (Soi chiếu sắc thái tối thiểu)      */}
        {/* ============================================================== */}
        {currentScreen === 1 && (
          <main className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#241F1C] tracking-tight">
                Soi chiếu cặp câu đối lập
              </h1>
              <p className="text-sm text-[#685D55] leading-relaxed font-light">
                Quan sát sự khác biệt về vai trò chủ ngữ và mức độ chủ động giữa hai câu dưới đây trước khi làm bài tập viết lại câu.
              </p>
            </div>

            <div className="space-y-6">
              {unit.contrastivePairs.map((pair, pIdx) => {
                const selectedOptId = contrastAnswers[pair.id];
                const selectedOpt = pair.checkQuestion.options.find((o) => o.id === selectedOptId);

                return (
                  <section
                    key={pair.id}
                    className="bg-white rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 shadow-xs space-y-5"
                  >
                    <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#9E948A] border-b border-[#F2ECE2] pb-2">
                      Trường hợp {pIdx + 1}: {pair.title}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Sentence A */}
                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#7A7067] px-2 py-0.5 rounded bg-white border border-[#E0D7CB]">
                          Câu A · Uỷ quyền / Chủ động
                        </span>
                        <p className="font-serif text-base text-[#2E2723] leading-relaxed">
                          "{pair.sentenceA.text}"
                        </p>
                        <p className="text-xs text-[#685D55] leading-normal pt-1 border-t border-[#EAE3D9]/60">
                          {pair.sentenceA.nuanceVi}
                        </p>
                      </div>

                      {/* Sentence B */}
                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#C86D51] px-2 py-0.5 rounded bg-white border border-[#F2DBD3]">
                          Câu B · Thuyết phục / Rủi ro
                        </span>
                        <p className="font-serif text-base text-[#2E2723] leading-relaxed">
                          "{pair.sentenceB.text}"
                        </p>
                        <p className="text-xs text-[#685D55] leading-normal pt-1 border-t border-[#EAE3D9]/60">
                          {pair.sentenceB.nuanceVi}
                        </p>
                      </div>
                    </div>

                    {/* Fast Verification Probe */}
                    <div className="pt-2 border-t border-[#F2ECE2] space-y-3">
                      <p className="text-xs sm:text-sm font-semibold text-[#2E2723] flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#C86D51] shrink-0" />
                        <span>{pair.checkQuestion.promptVi}</span>
                      </p>

                      <div className="grid gap-2">
                        {pair.checkQuestion.options.map((opt) => {
                          const isSelected = selectedOptId === opt.id;
                          let btnStyle = 'bg-white border-[#E0D7CB] hover:border-[#C86D51] text-[#4A423D]';

                          if (isSelected) {
                            btnStyle = opt.isCorrect
                              ? 'bg-[#EBF7EE] border-[#82C99B] text-[#1E5631] font-semibold'
                              : 'bg-[#FDF0ED] border-[#F2A691] text-[#8C2B14] font-semibold';
                          }

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectContrast(pair.id, opt.id)}
                              className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt.labelVi}
                            </button>
                          );
                        })}
                      </div>

                      {selectedOpt && (
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed transition-all ${
                            selectedOpt.isCorrect
                              ? 'bg-[#EBF7EE] text-[#1E5631] border border-[#C6EBD0]'
                              : 'bg-[#FDF0ED] text-[#8C2B14] border border-[#FCD7CE]'
                          }`}
                        >
                          <span className="font-bold">{selectedOpt.isCorrect ? '✓ ' : '✕ '}</span>
                          {selectedOpt.rationaleVi}
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={!allContrastAnswered}
                onClick={() => setCurrentScreen(2)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  allContrastAnswered
                    ? 'bg-[#2D2825] hover:bg-[#1A1715] text-white shadow-md'
                    : 'bg-[#E5DDCF] text-[#9E948A] cursor-not-allowed'
                }`}
              >
                <span>Bắt đầu rèn luyện cấu trúc</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        )}

        {/* ============================================================== */}
        {/* SCREEN 2: TRANSFORMATION CHALLENGE (Key-Word Transformation)   */}
        {/* ============================================================== */}
        {currentScreen === 2 && (
          <main className="space-y-6 animate-in fade-in duration-300">
            {/* Step Subheader */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A7067] font-semibold">
                  Thử thách {activeItemIndex + 1} / {unit.transformationItems.length}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-[#241F1C]">
                  {activeTransItem.title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                {unit.transformationItems.map((item, idx) => {
                  const status = itemStatuses[item.id];
                  let dotColor = 'bg-[#E5DDCF]';
                  if (status === 'first_try_correct') dotColor = 'bg-[#2E7D32]';
                  if (status === 'assisted_correct') dotColor = 'bg-[#F59E0B]';
                  if (status === 'in_progress') dotColor = 'bg-[#E11D48]';
                  if (idx === activeItemIndex) dotColor += ' ring-2 ring-[#2D2825]';

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveItemIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${dotColor}`}
                      title={`Câu ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Exercise Box */}
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Source Sentence */}
              <div className="space-y-1.5 pb-4 border-b border-[#F2ECE2]">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#9E948A]">
                  CÂU GỐC CẦN DIỄN ĐẠT LẠI:
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#241F1C] leading-relaxed">
                  "{activeTransItem.sourceSentence}"
                </p>
              </div>

              {/* Keyword Display */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-[#7A7067] font-medium">Từ khóa bắt buộc:</span>
                  <span className="font-mono text-sm sm:text-base font-extrabold px-3 py-0.5 rounded-md bg-[#2D2825] text-white tracking-widest">
                    {activeTransItem.keyword}
                  </span>
                </div>
                <span className="text-xs text-[#9E948A] font-mono">
                  Giới hạn: {activeTransItem.minWords}–{activeTransItem.maxWords} từ
                </span>
              </div>

              {/* Target Sentence Fill-in Workspace */}
              <div className="space-y-3">
                <div className="text-base sm:text-lg text-[#2E2723] font-serif leading-relaxed">
                  <span className="font-semibold">{activeTransItem.targetPrefix}</span>
                  <span className="mx-2 inline-block">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Nhập cụm từ cần điền..."
                      value={userInputs[activeTransItem.id] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setUserInputs((prev) => ({ ...prev, [activeTransItem.id]: val }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCheckTransformation();
                        }
                      }}
                      className="w-full sm:w-[320px] font-sans font-medium text-sm sm:text-base px-3.5 py-2 rounded-xl border border-[#C5BCB1] focus:outline-none focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 bg-[#FAF7F2] text-[#241F1C]"
                    />
                  </span>
                  <span className="font-semibold">{activeTransItem.targetSuffix}</span>
                </div>

                <p className="text-[11px] text-[#9E948A] italic font-light">
                  * Nhập chỉ phần còn thiếu trong ngoặc vuông (phải chứa từ khóa "{activeTransItem.keyword}").
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCheckTransformation}
                  className="px-5 py-2.5 rounded-xl bg-[#2D2825] hover:bg-[#1A1715] text-white text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kiểm tra đáp án</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCurrentItem}
                  className="px-4 py-2.5 rounded-xl border border-[#E0D7CB] hover:bg-[#FAF7F2] text-[#7A7067] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Gõ lại</span>
                </button>
              </div>

              {/* Feedback Drawer (Evaluator Output) */}
              {evalResults[activeTransItem.id] && (
                <div className="pt-4 border-t border-[#F2ECE2] animate-in fade-in duration-200">
                  {(() => {
                    const res = evalResults[activeTransItem.id];

                    if (res.verdict === 'EXACT_MATCH') {
                      return (
                        <div className="p-4 rounded-xl bg-[#EBF7EE] border border-[#82C99B] text-[#1E5631] space-y-2">
                          <div className="flex items-center gap-2 font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                            <span>{res.feedbackVi}</span>
                          </div>
                          <p className="text-xs leading-relaxed text-[#2D5A38]">
                            <strong>Giải thích học thuật:</strong> {activeTransItem.explanationVi}
                          </p>
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={handleNextTransformation}
                              className="px-4 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#256629] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>{activeItemIndex < unit.transformationItems.length - 1 ? 'Câu tiếp theo' : 'Xem tổng kết bài học'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    if (res.verdict === 'NEAR_MISS') {
                      return (
                        <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] text-[#92400E] space-y-2">
                          <div className="flex items-start gap-2 font-bold text-sm">
                            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                            <span>Phát hiện bẫy ngữ pháp thường gặp!</span>
                          </div>
                          <p className="text-xs leading-relaxed text-[#78350F]">
                            {res.feedbackVi}
                          </p>
                          <p className="text-[11px] text-[#B45309] italic">
                            Gợi ý: Đọc kỹ lại phản hồi bên trên, chỉnh sửa trong ô nhập liệu và bấm "Kiểm tra đáp án" lần nữa.
                          </p>
                        </div>
                      );
                    }

                    if (res.verdict === 'TYPO_SLIP') {
                      return (
                        <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] space-y-1">
                          <div className="flex items-center gap-2 font-bold text-sm">
                            <Sparkles className="w-4 h-4 text-[#16A34A]" />
                            <span>{res.feedbackVi}</span>
                          </div>
                          <p className="text-xs text-[#14532D]">
                            Cấu trúc của bạn về cơ bản đã đúng hướng, chỉ cần sửa lại 1 chữ cái bị gõ nhầm.
                          </p>
                        </div>
                      );
                    }

                    if (res.verdict === 'CONSTRAINT_VIOLATION') {
                      return (
                        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] space-y-1">
                          <div className="flex items-center gap-2 font-bold text-sm">
                            <AlertCircle className="w-4 h-4 text-[#DC2626]" />
                            <span>{res.feedbackVi}</span>
                          </div>
                        </div>
                      );
                    }

                    // Fallback UNRECOGNIZED
                    return (
                      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] space-y-2">
                        <div className="flex items-start gap-2 font-semibold text-sm text-[#334155]">
                          <HelpCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                          <span>{res.feedbackVi}</span>
                        </div>
                        <p className="text-xs text-[#64748B]">
                          Số lần thử hiện tại: {attemptCounts[activeTransItem.id] || 1}. Nếu muốn chuyển sang câu khác, bạn có thể nhấp vào các số thứ tự ở trên.
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-[#7A7067]">
              <button
                type="button"
                onClick={() => setCurrentScreen(1)}
                className="flex items-center gap-1.5 hover:text-[#2D2825] transition cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Xem lại cặp câu đối chiếu</span>
              </button>

              {activeItemIndex < unit.transformationItems.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActiveItemIndex((p) => p + 1)}
                  className="hover:text-[#2D2825] transition cursor-pointer font-medium"
                >
                  Chuyển sang câu {activeItemIndex + 2} →
                </button>
              )}
            </div>
          </main>
        )}

        {/* ============================================================== */}
        {/* SCREEN 3: VERDICT & LEARNER USABILITY SURVEY (Đo lường)         */}
        {/* ============================================================== */}
        {currentScreen === 3 && (
          <main className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#241F1C] tracking-tight">
                Tổng kết phiên học thử nghiệm
              </h1>
              <p className="text-sm text-[#685D55] leading-relaxed font-light">
                Dưới đây là kết quả rèn luyện thực tế của bạn với cấu trúc Have/Get và 2 câu hỏi phản hồi nhanh để chúng tôi tinh chỉnh chất lượng sư phạm.
              </p>
            </div>

            {/* Performance Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 text-center space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase text-[#7A7067] font-bold">
                  Đúng ngay lần 1
                </span>
                <p className="font-serif text-3xl font-bold text-[#2E7D32]">
                  {firstTryCorrectCount} / {unit.transformationItems.length}
                </p>
                <p className="text-[11px] text-[#9E948A]">
                  Phản xạ cấu trúc chuẩn xác
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 text-center space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase text-[#7A7067] font-bold">
                  Đúng sau gợi ý
                </span>
                <p className="font-serif text-3xl font-bold text-[#F59E0B]">
                  {assistedCorrectCount} / {unit.transformationItems.length}
                </p>
                <p className="text-[11px] text-[#9E948A]">
                  Tự sửa sau khi gặp phản hồi bẫy
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 text-center space-y-1 shadow-xs">
                <span className="text-[11px] font-mono uppercase text-[#7A7067] font-bold">
                  Tổng lượt kiểm tra
                </span>
                <p className="font-serif text-3xl font-bold text-[#2D2825]">
                  {Object.values(attemptCounts).reduce((a, b) => a + b, 0)}
                </p>
                <p className="text-[11px] text-[#9E948A]">
                  Số lần thử trên cả bài
                </p>
              </div>
            </div>

            {/* Item-by-item Retrospective */}
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="font-serif text-lg text-[#241F1C] border-b border-[#F2ECE2] pb-3">
                Bảng đối chiếu câu trả lời
              </h3>

              <div className="space-y-4">
                {unit.transformationItems.map((item, idx) => {
                  const input = userInputs[item.id] || '(Chưa nhập)';
                  const res = evalResults[item.id];
                  const isSuccess = res?.verdict === 'EXACT_MATCH';

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2 text-xs sm:text-sm"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[#7A7067]">Câu {idx + 1}: {item.title}</span>
                        <span className={isSuccess ? 'text-[#2E7D32]' : 'text-[#DC2626]'}>
                          {isSuccess ? '✓ Hoàn thành' : 'Chưa hoàn thành'}
                        </span>
                      </div>
                      <p className="text-[#4A423D]">
                        <strong>Bạn đã nhập:</strong> <code className="bg-white px-2 py-0.5 rounded border border-[#E0D7CB] font-mono">{input}</code>
                      </p>
                      <p className="text-[#685D55] text-xs">
                        <strong>Đáp án chuẩn:</strong> {item.acceptedAnswers[0]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2-Question Formative Usability Survey (Trực tiếp tại chỗ) */}
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-6 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#241F1C]">
                <MessageSquare className="w-5 h-5 text-[#C86D51]" />
                <span>Khảo sát nhanh cảm nhận học tập (Dành cho người học thử)</span>
              </div>

              {!surveySubmitted ? (
                <div className="space-y-5">
                  {/* Question 1: Clarity of feedback */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-[#4A423D]">
                      1. Khi bạn làm chưa đúng hoặc thiếu từ, lời giải thích trong hộp phản hồi có giúp bạn hiểu ra lỗi sai không?
                    </p>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {[
                        { id: 'very_clear', label: 'Rất rõ ràng, tự sửa được ngay' },
                        { id: 'somewhat_clear', label: 'Tương đối, cần đọc lại kỹ' },
                        { id: 'confusing', label: 'Còn mơ hồ, chưa hiểu vì sao sai' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFeedbackClarity(opt.id)}
                          className={`p-3 rounded-xl border text-xs text-left transition cursor-pointer ${
                            feedbackClarity === opt.id
                              ? 'bg-[#2D2825] text-white border-[#2D2825] font-semibold'
                              : 'bg-[#FAF7F2] border-[#EAE3D9] text-[#685D55] hover:border-[#C86D51]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2: Learning Novelty */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-[#4A423D]">
                      2. Sắc thái phân biệt giữa "Have/Get" (Ủy quyền vs. Thuyết phục vs. Sự cố ngoài ý muốn) này có giúp ích cho bạn khi viết câu không?
                    </p>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {[
                        { id: 'high_value', label: 'Rất hữu ích, trước giờ dùng theo quán tính' },
                        { id: 'medium_value', label: 'Bình thường, đã biết một phần' },
                        { id: 'low_value', label: 'Chưa thấy khác biệt nhiều' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setNoveltyRating(opt.id)}
                          className={`p-3 rounded-xl border text-xs text-left transition cursor-pointer ${
                            noveltyRating === opt.id
                              ? 'bg-[#2D2825] text-white border-[#2D2825] font-semibold'
                              : 'bg-[#FAF7F2] border-[#EAE3D9] text-[#685D55] hover:border-[#C86D51]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={!feedbackClarity || !noveltyRating}
                      onClick={() => setSurveySubmitted(true)}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
                        feedbackClarity && noveltyRating
                          ? 'bg-[#C86D51] hover:bg-[#B35C42] text-white'
                          : 'bg-[#E5DDCF] text-[#9E948A] cursor-not-allowed'
                      }`}
                    >
                      Gửi phản hồi khảo sát
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#EBF7EE] border border-[#82C99B] text-[#1E5631] text-xs sm:text-sm space-y-1">
                  <p className="font-bold">✓ Cảm ơn bạn đã gửi phản hồi!</p>
                  <p className="text-xs text-[#2D5A38]">
                    Dữ liệu cảm nhận của bạn đã được ghi nhận trực tiếp cho nhóm phát triển sản phẩm.
                  </p>
                </div>
              )}
            </div>

            {/* Restart Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentScreen(1);
                  setActiveItemIndex(0);
                  setEvalResults({});
                  setUserInputs({});
                  setAttemptCounts({});
                  setItemStatuses({});
                  setSurveySubmitted(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-[#C5BCB1] hover:bg-white text-[#4A423D] text-xs font-semibold transition cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại từ đầu chủ điểm này</span>
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
