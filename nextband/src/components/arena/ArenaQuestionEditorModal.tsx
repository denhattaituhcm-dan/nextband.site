import React, { useState, useEffect } from "react";
import { 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  FileEdit
} from "lucide-react";
import { arenaApi } from "@/lib/api";

export interface ArenaQuestionOptionItem {
  id: string;
  label: "A" | "B" | "C" | "D";
  text: string;
}

export interface ArenaQuestionEditorItem {
  id: string;
  roundIndex: number;
  prompt: string;
  options: ArenaQuestionOptionItem[];
  correctOptionId: string;
  timeLimitSeconds?: number;
  points?: number;
  explanation: string;
  misconception?: {
    baitOptionId?: string;
    baitOptionText?: string;
    diagnosticTitle?: string;
    explanation?: string;
  };
}

interface ArenaQuestionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId?: string;
  examTitle?: string;
  lessonKey?: string;
  onSavedSuccess?: () => void;
}

export const ArenaQuestionEditorModal: React.FC<ArenaQuestionEditorModalProps> = ({
  isOpen,
  onClose,
  examId,
  examTitle,
  lessonKey,
  onSavedSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [activeLessonKey, setActiveLessonKey] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [questions, setQuestions] = useState<ArenaQuestionEditorItem[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});

  // Nạp bộ câu hỏi khi mở modal
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    arenaApi
      .getLessonQuestions({ examId, lessonKey })
      .then((res) => {
        if (!isMounted) return;
        setActiveLessonKey(res.lessonKey || "");
        setIsCustom(Boolean(res.isCustom));

        const normalized: ArenaQuestionEditorItem[] = (res.questions || []).map((q: any, idx: number) => {
          const opts: ArenaQuestionOptionItem[] = (q.options || []).map((o: any, oIdx: number) => {
            const labels: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
            return {
              id: o.id || `opt_${labels[oIdx] || "A"}`,
              label: (o.label || labels[oIdx] || "A") as any,
              text: o.text || "",
            };
          });

          // Đảm bảo luôn có 4 options A, B, C, D
          while (opts.length < 4) {
            const labels: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
            const nextLabel = labels[opts.length] || "D";
            opts.push({
              id: `opt_${nextLabel}`,
              label: nextLabel,
              text: "",
            });
          }

          return {
            id: q.id || `q_${idx + 1}`,
            roundIndex: idx,
            prompt: q.prompt || "",
            options: opts,
            correctOptionId: q.correctOptionId || opts[0]?.id || "opt_A",
            timeLimitSeconds: q.timeLimitSeconds || 30,
            points: q.points || 1000,
            explanation: q.explanation || q.correctExplanation || "",
            misconception: q.misconception || {
              baitOptionId: opts[1]?.id || "opt_B",
              baitOptionText: "",
              diagnosticTitle: "",
              explanation: "",
            },
          };
        });

        setQuestions(normalized);

        // Mở sẵn câu đầu tiên
        const initExpanded: Record<number, boolean> = {};
        normalized.forEach((_, i) => {
          initExpanded[i] = true;
        });
        setExpandedIndices(initExpanded);
      })
      .catch((err: any) => {
        if (!isMounted) return;
        console.error("[ArenaQuestionEditor] Lỗi tải câu hỏi:", err);
        setErrorMsg(err.message || "Không thể nạp danh sách câu hỏi.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, examId, lessonKey]);

  if (!isOpen) return null;

  // Toggle thu gọn/mở rộng câu hỏi
  const toggleExpand = (idx: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Thay đổi nội dung câu hỏi
  const handlePromptChange = (idx: number, text: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], prompt: text };
      return updated;
    });
  };

  // Thay đổi lựa chọn A/B/C/D
  const handleOptionTextChange = (qIdx: number, optIdx: number, text: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const newOpts = [...updated[qIdx].options];
      newOpts[optIdx] = { ...newOpts[optIdx], text };
      updated[qIdx] = { ...updated[qIdx], options: newOpts };
      return updated;
    });
  };

  // Chọn đáp án đúng
  const handleSelectCorrectOption = (qIdx: number, optId: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIdx] = { ...updated[qIdx], correctOptionId: optId };
      return updated;
    });
  };

  // Thay đổi giải thích đáp án
  const handleExplanationChange = (qIdx: number, text: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIdx] = { ...updated[qIdx], explanation: text };
      return updated;
    });
  };

  // Thay đổi bẫy nhận thức
  const handleMisconceptionChange = (qIdx: number, field: string, val: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const curMisc = updated[qIdx].misconception || {};
      updated[qIdx] = {
        ...updated[qIdx],
        misconception: {
          ...curMisc,
          [field]: val,
        },
      };
      return updated;
    });
  };

  // Thêm câu hỏi mới
  const handleAddQuestion = () => {
    const newIdx = questions.length;
    const newQ: ArenaQuestionEditorItem = {
      id: `q_custom_${Date.now()}_${newIdx}`,
      roundIndex: newIdx,
      prompt: "",
      options: [
        { id: "opt_A", label: "A", text: "" },
        { id: "opt_B", label: "B", text: "" },
        { id: "opt_C", label: "C", text: "" },
        { id: "opt_D", label: "D", text: "" },
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 30,
      points: 1000,
      explanation: "",
      misconception: {
        baitOptionId: "opt_B",
        diagnosticTitle: "",
        explanation: "",
      },
    };

    setQuestions((prev) => [...prev, newQ]);
    setExpandedIndices((prev) => ({ ...prev, [newIdx]: true }));
  };

  // Xóa câu hỏi
  const handleDeleteQuestion = (idx: number) => {
    if (!confirm(`Bạn có chắc muốn xóa câu hỏi số #${idx + 1} này không?`)) return;
    setQuestions((prev) => {
      const filtered = prev.filter((_, i) => i !== idx);
      return filtered.map((q, i) => ({ ...q, roundIndex: i }));
    });
  };

  // Lưu bộ câu hỏi
  const handleSave = async () => {
    // Validate nhanh
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.prompt.trim()) {
        alert(`Câu #${i + 1} chưa có nội dung câu hỏi!`);
        return;
      }
      const filledOpts = q.options.filter((o) => o.text.trim().length > 0);
      if (filledOpts.length < 2) {
        alert(`Câu #${i + 1} phải có ít nhất 2 phương án trả lời!`);
        return;
      }
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await arenaApi.saveLessonQuestions({
        examId,
        lessonKey: activeLessonKey || lessonKey,
        questions,
      });

      setIsCustom(true);
      setSuccessMsg("Đã lưu bộ câu hỏi thành công! Các trận đấu tiếp theo sẽ áp dụng dữ liệu này.");
      if (onSavedSuccess) onSavedSuccess();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error("[ArenaQuestionEditor] Lỗi lưu câu hỏi:", err);
      setErrorMsg(err.message || "Không thể lưu bộ câu hỏi. Vui lòng thử lại!");
    } finally {
      setIsSaving(false);
    }
  };

  // Khôi phục về mặc định giáo trình
  const handleResetToDefault = async () => {
    if (
      !confirm(
        "Bạn có chắc muốn KHÔI PHỤC về bộ câu hỏi mặc định của giáo trình DOER không? Mọi chỉnh sửa tùy biến trước đó sẽ bị xóa."
      )
    ) {
      return;
    }

    setIsResetting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await arenaApi.resetLessonQuestions({
        examId,
        lessonKey: activeLessonKey || lessonKey,
      });

      // Tải lại câu hỏi gốc
      const res = await arenaApi.getLessonQuestions({ examId, lessonKey });
      setActiveLessonKey(res.lessonKey || "");
      setIsCustom(false);

      const normalized: ArenaQuestionEditorItem[] = (res.questions || []).map((q: any, idx: number) => ({
        id: q.id || `q_${idx + 1}`,
        roundIndex: idx,
        prompt: q.prompt || "",
        options: q.options || [],
        correctOptionId: q.correctOptionId || "opt_A",
        timeLimitSeconds: q.timeLimitSeconds || 30,
        points: q.points || 1000,
        explanation: q.explanation || q.correctExplanation || "",
        misconception: q.misconception,
      }));

      setQuestions(normalized);
      setSuccessMsg("Đã khôi phục bộ câu hỏi gốc của giáo trình thành công!");
      if (onSavedSuccess) onSavedSuccess();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error("[ArenaQuestionEditor] Lỗi khôi phục:", err);
      setErrorMsg(err.message || "Không thể khôi phục bộ câu hỏi.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50/50 via-white to-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-gray-900 truncate max-w-md">
                  {examTitle || activeLessonKey || "Bộ Câu Hỏi Game Arena"}
                </h2>
                {isCustom ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                    Đã tinh chỉnh bởi Admin
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                    Nguyên bản Giáo trình DOER
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Kiểm duyệt và chỉnh sửa 10 câu hỏi để đảm bảo tính chuẩn xác trước giờ thi đấu.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thông báo trạng thái */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Body Modal (Danh sách câu hỏi) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading ? (
            <div className="p-16 text-center text-gray-400 space-y-3">
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-500" />
              <p className="text-sm font-semibold">Đang nạp bộ câu hỏi...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="p-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              <BookOpen className="w-8 h-8 mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium">Chưa có câu hỏi nào trong bộ đề này.</p>
              <button
                onClick={handleAddQuestion}
                className="mt-3 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Thêm câu hỏi đầu tiên
              </button>
            </div>
          ) : (
            questions.map((q, qIdx) => {
              const isExpanded = expandedIndices[qIdx] !== false;

              return (
                <div
                  key={q.id || qIdx}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm transition hover:border-gray-300 overflow-hidden"
                >
                  {/* Card Header: Số thứ tự câu hỏi & Action */}
                  <div
                    onClick={() => toggleExpand(qIdx)}
                    className="flex items-center justify-between px-4 py-3 bg-slate-50/70 border-b border-gray-100 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow-sm shadow-orange-600/30">
                        #{qIdx + 1}
                      </span>
                      <span className="text-sm font-black text-gray-800 truncate max-w-md">
                        {q.prompt.trim() || "(Câu hỏi chưa có nội dung)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        <span>30s</span>
                      </div>

                      <button
                        onClick={() => handleDeleteQuestion(qIdx)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Xóa câu hỏi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleExpand(qIdx)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg transition"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Body: Chi tiết câu hỏi khi mở rộng */}
                  {isExpanded && (
                    <div className="p-4 space-y-4">
                      {/* Prompt Input */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Nội dung câu hỏi (Prompt):
                        </label>
                        <textarea
                          rows={2}
                          value={q.prompt}
                          onChange={(e) => handlePromptChange(qIdx, e.target.value)}
                          placeholder="Nhập nội dung câu hỏi hoặc điền từ vào chỗ trống..."
                          className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition resize-none font-medium"
                        />
                      </div>

                      {/* 4 Options Grid */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          4 Phương án trả lời & Chọn đáp án đúng:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options.map((opt, optIdx) => {
                            const isCorrect = q.correctOptionId === opt.id;

                            return (
                              <div
                                key={opt.id || optIdx}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                  isCorrect
                                    ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleSelectCorrectOption(qIdx, opt.id)}
                                  className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 transition ${
                                    isCorrect
                                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                                  title="Bấm để đặt làm đáp án đúng"
                                >
                                  {opt.label}
                                </button>

                                <input
                                  type="text"
                                  value={opt.text}
                                  onChange={(e) => handleOptionTextChange(qIdx, optIdx, e.target.value)}
                                  placeholder={`Nội dung lựa chọn ${opt.label}...`}
                                  className="flex-1 text-xs text-gray-900 bg-transparent focus:outline-none font-medium"
                                />

                                {isCorrect && (
                                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đúng
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Giải thích học thuật (Debrief) & Bẫy nhận thức (Misconception) */}
                      <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-3">
                        <div>
                          <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Giải thích đáp án đúng (Academic Debrief):
                          </label>
                          <input
                            type="text"
                            value={q.explanation || ""}
                            onChange={(e) => handleExplanationChange(qIdx, e.target.value)}
                            placeholder="Giải thích ngắn gọn tại sao đáp án này đúng để giáo viên chiếu lên màn hình..."
                            className="w-full text-xs text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                              Phương án bẫy (Bait):
                            </label>
                            <select
                              value={q.misconception?.baitOptionId || "opt_B"}
                              onChange={(e) => handleMisconceptionChange(qIdx, "baitOptionId", e.target.value)}
                              className="w-full text-xs text-gray-800 bg-white border border-gray-200 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold"
                            >
                              {q.options.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                  Phương án {opt.label} ({opt.text ? opt.text.slice(0, 15) + "..." : "Trống"})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                              Lý do học sinh hay nhầm lẫn:
                            </label>
                            <input
                              type="text"
                              value={q.misconception?.explanation || ""}
                              onChange={(e) => handleMisconceptionChange(qIdx, "explanation", e.target.value)}
                              placeholder="Học sinh hay dịch từ tiếng Việt sang hoặc nhầm từ loại..."
                              className="w-full text-xs text-gray-800 bg-white border border-gray-200 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleAddQuestion}
              className="px-3.5 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95"
            >
              <Plus className="w-4 h-4 text-orange-600" /> Thêm câu hỏi
            </button>

            {isCustom && (
              <button
                onClick={handleResetToDefault}
                disabled={isResetting}
                className="px-3.5 py-2 bg-white border border-amber-200 hover:border-amber-300 text-amber-700 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50"
              >
                {isResetting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                )}
                Khôi phục mặc định
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl transition"
            >
              Đóng
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" /> Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" /> Lưu bộ câu hỏi
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
