import React, { useState, useRef, useEffect } from "react";
import { CASE_001 } from "@/data/readingCases/case001";
import { VocabularyTerm } from "@/features/reading/types";
import { ContextualGlossTooltip } from "@/features/reading/components/ContextualGlossTooltip";
import { CaseAutopsyView } from "@/features/reading/components/CaseAutopsyView";
import { Button } from "@/components/ui/button";
import {
  FileText,
  UserCheck,
  Cpu,
  HelpCircle,
  CheckCircle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info,
  Layers,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function ReadingCasePage() {
  const readingCase = CASE_001;

  // Active source filter (or all)
  const [activeSourceId, setActiveSourceId] = useState<string>("all");

  // Vocabulary Gloss State
  const [activeGloss, setActiveGloss] = useState<{
    term: VocabularyTerm;
    position: { top: number; left: number };
  } | null>(null);
  const [savedTerms, setSavedTerms] = useState<string[]>([]);
  const [hasInteractedGloss, setHasInteractedGloss] = useState(false);

  // Investigation Tasks State
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [selectedEvidenceSentence, setSelectedEvidenceSentence] = useState<string | null>(null);

  // Final Deduction State
  const [finalHypothesis, setFinalHypothesis] = useState<string | null>(null);
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);

  // Page View State: "investigating" | "autopsy"
  const [viewState, setViewState] = useState<"investigating" | "autopsy">("investigating");

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleWindowClick = () => setActiveGloss(null);
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  const handleWordClick = (e: React.MouseEvent, termObj: VocabularyTerm) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setActiveGloss({
      term: termObj,
      position: {
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      },
    });
    setHasInteractedGloss(true);
  };

  const handleSentenceClick = (sentenceText: string) => {
    setSelectedEvidenceSentence(sentenceText);
  };

  const toggleEvidenceId = (evId: string) => {
    setSelectedEvidenceIds((prev) =>
      prev.includes(evId) ? prev.filter((id) => id !== evId) : [...prev, evId]
    );
  };

  const handleSaveTerm = (term: string) => {
    setSavedTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
    );
  };

  // Check if all 4 tasks are completed
  const isAllTasksCompleted =
    Boolean(taskAnswers["task-01"]) &&
    Boolean(taskAnswers["task-02"]) &&
    Boolean(taskAnswers["task-03"]) &&
    Boolean(selectedEvidenceSentence);

  const canSubmitAutopsy =
    isAllTasksCompleted &&
    Boolean(finalHypothesis) &&
    selectedEvidenceIds.length > 0;

  const handleReset = () => {
    setTaskAnswers({});
    setSelectedEvidenceSentence(null);
    setFinalHypothesis(null);
    setSelectedEvidenceIds([]);
    setViewState("investigating");
  };

  // Helper to render paragraph with clickable vocabulary words
  const renderInteractiveText = (text: string, paragraphId: string) => {
    // Break into sentences
    const sentences = text.split(/(?<=[.!?])\s+/);

    return (
      <div className="space-y-2">
        {sentences.map((sentence, sIdx) => {
          const isSelectedEvidence = selectedEvidenceSentence === sentence;

          // Check if sentence contains vocabulary terms
          let renderedSentence: React.ReactNode = sentence;

          readingCase.vocabulary.forEach((v) => {
            const regex = new RegExp(`\\b(${v.term})\\b`, "gi");
            if (regex.test(sentence)) {
              const parts = sentence.split(regex);
              renderedSentence = parts.map((part, pIdx) => {
                if (part.toLowerCase() === v.term.toLowerCase()) {
                  const isSaved = savedTerms.includes(v.term);
                  return (
                    <span
                      key={pIdx}
                      onClick={(e) => handleWordClick(e, v)}
                      className="cursor-pointer font-semibold underline decoration-amber-400/60 decoration-2 underline-offset-4 text-amber-300 hover:text-amber-200 hover:decoration-amber-300 transition-colors px-0.5 rounded bg-amber-400/10"
                      title="Click để giải mã nghĩa theo ngữ cảnh"
                    >
                      {part}
                    </span>
                  );
                }
                return part;
              });
            }
          });

          return (
            <p
              key={sIdx}
              onClick={() => handleSentenceClick(sentence)}
              className={`rounded-lg px-2.5 py-1.5 transition-all text-slate-200 leading-relaxed cursor-pointer ${
                isSelectedEvidence
                  ? "bg-amber-500/20 border-l-4 border-amber-400 text-amber-100 shadow-sm"
                  : "hover:bg-slate-800/60 border-l-4 border-transparent"
              }`}
            >
              {renderedSentence}
            </p>
          );
        })}
      </div>
    );
  };

  if (viewState === "autopsy") {
    return (
      <div className="min-h-screen bg-[#070e18] text-slate-100 py-10">
        <SEO
          title={`${readingCase.title} - The Case Autopsy | ARIS IELTS`}
          description="Báo cáo chẩn đoán năng lực đọc hiểu chuyên sâu"
        />
        <CaseAutopsyView
          readingCase={readingCase}
          taskAnswers={taskAnswers}
          selectedEvidenceSentence={selectedEvidenceSentence}
          finalHypothesis={finalHypothesis}
          selectedEvidenceIds={selectedEvidenceIds}
          onRetry={handleReset}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070e18] text-slate-100 flex flex-col font-sans">
      <SEO
        title={`Case #001: ${readingCase.title} | ARIS IELTS Reading`}
        description="Vụ án Căn Phòng Khóa Kín - Thử thách giải mã đọc hiểu IELTS Band 5.0"
      />

      {/* Top Case Header Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/90 sticky top-0 z-30 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs">
              #01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                  {readingCase.title}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {readingCase.level.realm_name_vi} · Band {readingCase.level.ielts_band.toFixed(1)}
                </span>
                <span className="text-xs text-amber-400 hidden sm:inline-block">★★☆☆</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {readingCase.universe.name} · Thời lượng khuyến nghị: ~15 phút
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!hasInteractedGloss && (
              <div className="hidden md:flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Mẹo: Click từ gạch chân màu vàng để giải mã nghĩa tại chỗ</span>
              </div>
            )}
            <div className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              Tasks: {Object.keys(taskAnswers).length + (selectedEvidenceSentence ? 1 : 0)} / 4
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-View Layout */}
      <div className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: MULTI-SOURCE DOSSIER (7 Columns on large screens ~ 58%)      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Source Tab Filter */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              <Button
                size="sm"
                variant={activeSourceId === "all" ? "default" : "ghost"}
                onClick={() => setActiveSourceId("all")}
                className={`text-xs h-8 rounded-lg ${
                  activeSourceId === "all"
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5 mr-1.5" />
                Toàn Bộ Hồ Sơ (3 Nguồn)
              </Button>
              {readingCase.sources.map((src, idx) => (
                <Button
                  key={src.id}
                  size="sm"
                  variant={activeSourceId === src.id ? "default" : "ghost"}
                  onClick={() => setActiveSourceId(src.id)}
                  className={`text-xs h-8 rounded-lg whitespace-nowrap ${
                    activeSourceId === src.id
                      ? "bg-slate-700 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {idx === 0 && <FileText className="h-3.5 w-3.5 mr-1.5 text-blue-400" />}
                  {idx === 1 && <UserCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />}
                  {idx === 2 && <Cpu className="h-3.5 w-3.5 mr-1.5 text-purple-400" />}
                  Source {idx + 1}
                </Button>
              ))}
            </div>

            {/* Dossier Document Cards */}
            <div className="space-y-6">
              {readingCase.sources
                .filter((src) => activeSourceId === "all" || activeSourceId === src.id)
                .map((src, idx) => (
                  <div
                    key={src.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-xs"
                  >
                    {/* Source Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                            SOURCE #{idx + 1}
                          </span>
                          <span className="text-xs text-slate-400">{src.subtitle}</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                          {src.title}
                        </h2>
                      </div>
                    </div>

                    {/* Paragraphs */}
                    <div className="space-y-4 text-sm sm:text-[15px]">
                      {src.paragraphs.map((p) => (
                        <div key={p.id}>
                          {renderInteractiveText(p.text, p.id)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: INVESTIGATION & REASONING PANEL (5 Columns ~ 42%)           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                  <h3 className="font-extrabold text-white text-sm sm:text-base uppercase tracking-wide">
                    Hồ Sơ Thử Thách Nhận Thức
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">4 Tasks</span>
              </div>

              {/* Tasks List */}
              <div className="space-y-6">
                
                {/* Task 1: FIND */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      TASK 01 · FIND (Locating Detail)
                    </span>
                    {taskAnswers["task-01"] && (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                    {readingCase.tasks[0].question}
                  </p>
                  {"options" in readingCase.tasks[0] && (
                    <div className="space-y-1.5 pt-1">
                      {readingCase.tasks[0].options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            taskAnswers["task-01"] === opt.id
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-100 font-medium"
                              : "border-slate-800 hover:bg-slate-800/80 text-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="task-01"
                            checked={taskAnswers["task-01"] === opt.id}
                            onChange={() => setTaskAnswers({ ...taskAnswers, "task-01": opt.id })}
                            className="mt-0.5 text-amber-500 focus:ring-0"
                          />
                          <span>
                            <strong className="mr-1">{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Task 2: MATCH */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      TASK 02 · MATCH (Cross-Source Timeline)
                    </span>
                    {taskAnswers["task-02"] && (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                    {readingCase.tasks[1].question}
                  </p>
                  {"options" in readingCase.tasks[1] && (
                    <div className="space-y-1.5 pt-1">
                      {readingCase.tasks[1].options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            taskAnswers["task-02"] === opt.id
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-100 font-medium"
                              : "border-slate-800 hover:bg-slate-800/80 text-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="task-02"
                            checked={taskAnswers["task-02"] === opt.id}
                            onChange={() => setTaskAnswers({ ...taskAnswers, "task-02": opt.id })}
                            className="mt-0.5 text-amber-500 focus:ring-0"
                          />
                          <span>
                            <strong className="mr-1">{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Task 3: INFER */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      TASK 03 · INFER (Boundary-Restricted)
                    </span>
                    {taskAnswers["task-03"] && (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                    {readingCase.tasks[2].question}
                  </p>
                  {"options" in readingCase.tasks[2] && (
                    <div className="space-y-1.5 pt-1">
                      {readingCase.tasks[2].options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            taskAnswers["task-03"] === opt.id
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-100 font-medium"
                              : "border-slate-800 hover:bg-slate-800/80 text-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="task-03"
                            checked={taskAnswers["task-03"] === opt.id}
                            onChange={() => setTaskAnswers({ ...taskAnswers, "task-03": opt.id })}
                            className="mt-0.5 text-amber-500 focus:ring-0"
                          />
                          <span>
                            <strong className="mr-1">{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Task 4: PROVE (Click-to-Source) */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      TASK 04 · PROVE (Click Câu Làm Bằng Chứng)
                    </span>
                    {selectedEvidenceSentence && (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                    {readingCase.tasks[3].instruction}
                  </p>
                  
                  <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-xs">
                    {selectedEvidenceSentence ? (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Câu văn đã chọn làm bằng chứng:
                        </span>
                        <p className="italic text-slate-300 bg-slate-800/80 p-2 rounded border border-slate-700">
                          "{selectedEvidenceSentence}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">
                        👉 Hãy click trực tiếp vào câu văn trong <strong>Source 1 (Cột Trái)</strong> để ghim làm bằng chứng.
                      </p>
                    )}
                  </div>
                </div>

                {/* Final Deduction Section */}
                <div className="border-t border-slate-800 pt-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-amber-400" />
                    <h4 className="font-black text-white text-sm uppercase tracking-wide">
                      Final Deduction: Kết Án
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    {readingCase.final_deduction.question}
                  </p>

                  <div className="space-y-2">
                    {readingCase.final_deduction.options.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          finalHypothesis === opt.id
                            ? "bg-amber-500/20 border-amber-500/80 text-amber-100 font-medium"
                            : "border-slate-800 hover:bg-slate-800 text-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="final_hypothesis"
                          checked={finalHypothesis === opt.id}
                          onChange={() => setFinalHypothesis(opt.id)}
                          className="mt-0.5 text-amber-500 focus:ring-0"
                        />
                        <span>
                          <strong className="mr-1">{opt.id}.</strong> {opt.text}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Required Supporting Evidence Selection */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Chọn ĐÚNG 2 chứng cứ chứng minh kết luận trên:
                    </p>
                    <div className="space-y-1.5">
                      {readingCase.final_deduction.required_evidence_pool.map((ev) => {
                        const isChecked = selectedEvidenceIds.includes(ev.id);
                        return (
                          <label
                            key={ev.id}
                            className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                              isChecked
                                ? "bg-amber-500/15 border-amber-500/40 text-amber-200"
                                : "border-slate-800/80 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleEvidenceId(ev.id)}
                              className="mt-0.5 rounded text-amber-500 focus:ring-0"
                            />
                            <span>{ev.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    disabled={!canSubmitAutopsy}
                    onClick={() => setViewState("autopsy")}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xl ${
                      canSubmitAutopsy
                        ? "bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Xem Báo Cáo Phá Án (Case Autopsy)
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {!canSubmitAutopsy && (
                    <p className="text-[11px] text-center text-slate-500">
                      Cần hoàn thành đủ 4 Tasks + Chọn Giả Thuyết + Chọn Bằng Chứng để mở khóa Autopsy.
                    </p>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Contextual Gloss Tooltip */}
      {activeGloss && (
        <ContextualGlossTooltip
          term={activeGloss.term}
          position={activeGloss.position}
          onClose={() => setActiveGloss(null)}
          onSave={handleSaveTerm}
          isSaved={savedTerms.includes(activeGloss.term.term)}
        />
      )}
    </div>
  );
}
