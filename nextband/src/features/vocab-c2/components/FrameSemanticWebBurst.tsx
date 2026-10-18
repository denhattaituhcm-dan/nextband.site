import React, { useState } from "react";
import { FrameSemanticWeb, FrameElement } from "@/data/vocab-c2/types";
import { useArenaTheme } from "../context/ThemeContext";
import {
  Network,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  ChevronRight,
  Lightbulb,
  Layers,
  Target,
  ArrowRight,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Pencil,
} from "lucide-react";

interface Props {
  frameWebs?: FrameSemanticWeb[];
  anchorCollocation?: string;
}

type Step = "how_to_play" | "explore" | "synthesis" | "complete";

const ROLE_META: Record<string, { icon: string; label: string; colorLight: string; colorDark: string; borderLight: string; borderDark: string }> = {
  Agent:        { icon: "🎯", label: "Tác nhân",         colorLight: "bg-blue-50 text-blue-900",    colorDark: "bg-blue-950/30 text-blue-200",    borderLight: "border-blue-300", borderDark: "border-blue-500/50" },
  Target:       { icon: "🏢", label: "Mục tiêu",         colorLight: "bg-indigo-50 text-indigo-900", colorDark: "bg-indigo-950/30 text-indigo-200", borderLight: "border-indigo-300", borderDark: "border-indigo-500/50" },
  Trigger:      { icon: "⚡", label: "Tác nhân kích hoạt", colorLight: "bg-amber-50 text-amber-900",  colorDark: "bg-amber-950/30 text-amber-200",  borderLight: "border-amber-300", borderDark: "border-amber-500/50" },
  Institution:  { icon: "🏛️", label: "Thể chế / Môi trường", colorLight: "bg-purple-50 text-purple-900", colorDark: "bg-purple-950/30 text-purple-200", borderLight: "border-purple-300", borderDark: "border-purple-500/50" },
  Consequence:  { icon: "🔚", label: "Hệ quả",           colorLight: "bg-rose-50 text-rose-900",    colorDark: "bg-rose-950/30 text-rose-200",    borderLight: "border-rose-300", borderDark: "border-rose-500/50" },
  Tool:         { icon: "🔧", label: "Công cụ",           colorLight: "bg-teal-50 text-teal-900",    colorDark: "bg-teal-950/30 text-teal-200",    borderLight: "border-teal-300", borderDark: "border-teal-500/50" },
};

const DEFAULT_META = { icon: "📌", label: "Vai trò", colorLight: "bg-slate-50 text-slate-900", colorDark: "bg-slate-900 text-slate-200", borderLight: "border-slate-300", borderDark: "border-slate-600" };

export const FrameSemanticWebBurst: React.FC<Props> = ({ frameWebs }) => {
  const { theme } = useArenaTheme();
  const isPaper = theme === "paper";
  const isSlate = theme === "slate";

  const fallbackWebs: FrameSemanticWeb[] = [
    {
      id: "frame_judicial",
      frameName: "Judicial Sentencing & Penology Frame",
      frameConceptVi: "Khung Ngữ nghĩa Tố tụng & Thi hành Án phạt Hình sự",
      anchorCollocation: "custodial sentence",
      elements: [
        {
          role: "Agent",
          term: "Presiding Magistrate / Trial Judge",
          meaningVi: "Thẩm phán chủ tọa phiên tòa — Chủ thể ra phán quyết",
          sentenceUsage: "The presiding magistrate reviewed the formal indictment before decreeing penalty.",
        },
        {
          role: "Trigger",
          term: "Extenuating Circumstances",
          meaningVi: "Tình tiết giảm nhẹ — Yếu tố tác động đến mức án",
          sentenceUsage: "Counsel pleaded compelling extenuating circumstances to avert maximum incarceration.",
        },
        {
          role: "Institution",
          term: "Penitentiary Custody",
          meaningVi: "Trại giam cách ly / Nhà tù thụ án",
          sentenceUsage: "The felon was immediately remanded into high-security penitentiary custody.",
        },
        {
          role: "Consequence",
          term: "Recidivism vs Rehabilitation",
          meaningVi: "Nguy cơ tái phạm đối trọng với sự hoàn lương xã hội",
          sentenceUsage: "Vocational guidance programs are vital to lower chronic rates of recidivism.",
        },
      ],
      academicSynthesisParagraph:
        "In modern jurisprudence, when a presiding magistrate hands down an immediate custodial sentence, the court must balance the presence of extenuating circumstances against the severe risk of future recidivism.",
    },
    {
      id: "frame_corporate",
      frameName: "Hostile Acquisition & Corporate Governance Frame",
      frameConceptVi: "Khung Ngữ nghĩa Thâu tóm Doanh nghiệp & Quản trị Tập đoàn",
      anchorCollocation: "cut-throat competition",
      elements: [
        {
          role: "Agent",
          term: "Activist Investor Consortium",
          meaningVi: "Tổ hợp nhà đầu tư chủ động thâu tóm",
          sentenceUsage: "An ambitious consortium pooled liquid capital to stage a hostile tender offer.",
        },
        {
          role: "Target",
          term: "Vulnerable Conglomerate",
          meaningVi: "Đại tập đoàn đa ngành bị đưa vào tầm ngắm",
          sentenceUsage: "The sprawling conglomerate suffered from balance-sheet insolvency.",
        },
        {
          role: "Trigger",
          term: "Double-dip Recession",
          meaningVi: "Cơn suy thoái kép làm kiệt quệ dòng tiền",
          sentenceUsage: "The prolonged double-dip recession destroyed margins across core retail divisions.",
        },
        {
          role: "Consequence",
          term: "Immediate Capitulation",
          meaningVi: "Sự đầu hàng nhượng bộ hoàn toàn trước sức ép thâu tóm",
          sentenceUsage: "Facing insolvency, the executive board signaled immediate capitulation.",
        },
      ],
      academicSynthesisParagraph:
        "During a punishing double-dip recession, a struggling conglomerate facing relentless cut-throat competition is often coerced into immediate capitulation by an aggressive investment consortium.",
    },
  ];

  const activeWebs = frameWebs && frameWebs.length > 0 ? frameWebs : fallbackWebs;
  const [selectedWebIndex, setSelectedWebIndex] = useState(0);
  const currentWeb = activeWebs[selectedWebIndex] || activeWebs[0];

  const [step, setStep] = useState<Step>("how_to_play");
  const [revealedRoles, setRevealedRoles] = useState<Set<string>>(new Set());
  const [showSynthesis, setShowSynthesis] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalElements = currentWeb.elements.length;
  const revealedCount = revealedRoles.size;
  const allRevealed = revealedCount >= totalElements;

  const handleRevealCard = (role: string) => {
    setRevealedRoles(prev => new Set([...prev, role]));
  };

  const handleNextWeb = (idx: number) => {
    setSelectedWebIndex(idx);
    setRevealedRoles(new Set());
    setShowSynthesis(false);
    setIsCompleted(false);
    setStep("explore");
  };

  const handleRevealAll = () => {
    setRevealedRoles(new Set(currentWeb.elements.map(e => e.role)));
  };

  const handleComplete = () => {
    setShowSynthesis(true);
    setIsCompleted(true);
    setStep("complete");
  };

  // ─── Theme utility ─────────────────────────────────────────────
  const bg     = isPaper ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
               : isSlate ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
               :           "bg-[#0D1322] border-cyan-500/20 text-white";

  const cardBg  = isPaper ? "bg-white border-slate-200 shadow-xs"
                : isSlate ? "bg-slate-900 border-slate-700"
                :           "bg-white/5 border-white/10";

  const mutedText = isPaper ? "text-slate-500" : "text-slate-400";
  const accentText = isPaper ? "text-teal-800" : "text-cyan-400";
  const accentBtn = isPaper
    ? "bg-teal-700 hover:bg-teal-800 text-white"
    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950";
  const borderDiv = isPaper ? "border-slate-200" : "border-white/10";
  const hintBox = isPaper ? "bg-amber-50 border-amber-200 text-amber-950" : "bg-cyan-950/30 border-cyan-500/20 text-cyan-100";

  return (
    <div className={`rounded-3xl border shadow-xl space-y-0 animate-in fade-in duration-300 overflow-hidden ${bg}`}>

      {/* ── HEADER ── */}
      <div className={`p-6 sm:p-8 border-b ${borderDiv} flex flex-col sm:flex-row sm:items-start justify-between gap-4`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className={`w-5 h-5 ${accentText}`} />
            <span className={`text-[11px] font-mono font-black uppercase tracking-widest ${accentText}`}>
              FILLMORE FRAME SEMANTICS • MẠNG KHUNG Ý NIỆM C2
            </span>
          </div>
          <h3 className={`text-xl font-black font-serif ${isPaper ? "text-slate-900" : "text-white"}`}>
            {currentWeb.frameName}
          </h3>
          <p className={`text-xs italic font-serif ${mutedText}`}>
            "{currentWeb.frameConceptVi}"
          </p>
        </div>

        {/* Anchor collocation pill */}
        <div className={`px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 self-start shrink-0 ${
          isPaper ? "bg-teal-50 border-teal-200 text-teal-900 shadow-xs"
                  : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
        }`}>
          <Target className="w-3.5 h-3.5" />
          <span>Anchor:</span>
          <strong className="font-black underline">{currentWeb.anchorCollocation}</strong>
        </div>
      </div>

      {/* ── STEP 1: HOW TO PLAY ── */}
      {step === "how_to_play" && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className={`p-5 rounded-2xl border space-y-4 ${hintBox}`}>
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-6 h-6 shrink-0" />
              <h4 className="text-base font-black font-serif">Cách chơi — Frame Semantics là gì?</h4>
            </div>

            <p className={`text-sm leading-relaxed font-sans ${isPaper ? "text-amber-950" : "text-cyan-100"}`}>
              <strong>Frame Semantics</strong> (Charles Fillmore, 1976) là lý thuyết cho rằng mỗi từ vựng học thuật C2 không tồn tại độc lập — nó <em>kích hoạt một kịch bản ngữ nghĩa hoàn chỉnh</em> gồm nhiều vai trò liên kết với nhau.
            </p>

            <p className={`text-sm leading-relaxed ${isPaper ? "text-amber-900" : "text-cyan-200"}`}>
              Ví dụ: Khi dùng từ <strong>"custodial sentence"</strong>, não bộ bạn đồng thời kích hoạt cả <em>thẩm phán</em>, <em>bị cáo</em>, <em>tòa án</em>, <em>hình phạt</em>, <em>tái phạm</em>… Hiểu được khung này giúp bạn viết IELTS Task 2 như người bản ngữ.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                { n: "1", icon: "👁️", title: "Mở từng thẻ", desc: "Click vào từng vai trò để khám phá. Đọc định nghĩa tiếng Việt & câu ví dụ học thuật." },
                { n: "2", icon: "🧠", title: "Hiểu kết nối", desc: "Tìm hiểu các vai trò liên kết với nhau thành một kịch bản hoàn chỉnh như thế nào." },
                { n: "3", icon: "✍️", title: "Đọc đoạn tổng hợp", desc: "Đọc đoạn văn IELTS Band 8.5 kết hợp toàn bộ khung ngữ nghĩa vào một câu duy nhất." },
              ].map(s => (
                <div key={s.n} className={`p-3.5 rounded-xl border text-center space-y-1.5 ${isPaper ? "bg-white border-amber-200" : "bg-black/30 border-white/10"}`}>
                  <div className="text-2xl">{s.icon}</div>
                  <div className={`text-xs font-black ${isPaper ? "text-amber-900" : "text-cyan-200"}`}>Bước {s.n}: {s.title}</div>
                  <div className={`text-[11px] leading-relaxed ${isPaper ? "text-amber-800" : "text-slate-400"}`}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep("explore")}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${accentBtn}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Bắt đầu Khám phá Khung Ngữ nghĩa →</span>
          </button>
        </div>
      )}

      {/* ── STEP 2: EXPLORE ── */}
      {(step === "explore" || step === "synthesis" || step === "complete") && (
        <div className="p-6 sm:p-8 space-y-6">

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={mutedText}>Tiến trình khám phá: {revealedCount}/{totalElements} vai trò</span>
              {!allRevealed && (
                <button onClick={handleRevealAll} className={`text-xs font-bold underline cursor-pointer ${accentText}`}>
                  Mở tất cả ngay
                </button>
              )}
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isPaper ? "bg-slate-200" : "bg-white/10"}`}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${isPaper ? "bg-teal-600" : "bg-cyan-400"}`}
                style={{ width: `${totalElements > 0 ? (revealedCount / totalElements) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Instruction hint */}
          {!allRevealed && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${hintBox}`}>
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>👆 Click vào từng thẻ màu để mở khóa vai trò và xem nghĩa tiếng Việt + câu ví dụ học thuật.</span>
            </div>
          )}

          {/* Frame element cards — interactive reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentWeb.elements.map((elem: FrameElement) => {
              const meta = ROLE_META[elem.role] || DEFAULT_META;
              const isRevealed = revealedRoles.has(elem.role);

              return (
                <div
                  key={elem.role}
                  onClick={() => !isRevealed && handleRevealCard(elem.role)}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isRevealed
                      ? `${isPaper ? meta.colorLight : meta.colorDark} ${isPaper ? meta.borderLight : meta.borderDark}`
                      : `${isPaper ? "bg-slate-100 border-slate-300 cursor-pointer hover:bg-slate-200 hover:border-slate-400" : "bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20"}`
                  }`}
                >
                  {/* Role badge header */}
                  <div className={`px-4 pt-4 pb-2 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{meta.icon}</span>
                      <div>
                        <span className={`text-[10px] font-mono font-black uppercase tracking-wider opacity-70`}>
                          [{elem.role}]
                        </span>
                        <span className={`text-[10px] font-mono ml-1.5 opacity-60`}>
                          — {meta.label}
                        </span>
                      </div>
                    </div>
                    {isRevealed
                      ? <CheckCircle2 className={`w-4 h-4 ${isPaper ? "text-teal-700" : "text-cyan-400"}`} />
                      : <Eye className={`w-4 h-4 opacity-40`} />
                    }
                  </div>

                  {/* Term name — always visible */}
                  <div className="px-4 pb-3">
                    <h4 className={`text-sm font-black leading-tight ${isPaper ? "text-slate-900" : isRevealed ? "text-white" : "text-slate-300"}`}>
                      {elem.term}
                    </h4>
                  </div>

                  {/* Hidden content — revealed on click */}
                  {isRevealed ? (
                    <div className={`px-4 pb-4 pt-2 space-y-2 border-t ${isPaper ? "border-black/10" : "border-white/10"}`}>
                      <p className={`text-xs font-sans font-medium`}>
                        🇻🇳 {elem.meaningVi}
                      </p>
                      <p className={`text-[11px] italic font-serif leading-relaxed opacity-90`}>
                        "{elem.sentenceUsage}"
                      </p>
                    </div>
                  ) : (
                    <div className={`px-4 pb-4`}>
                      <p className={`text-xs italic ${mutedText}`}>
                        👆 Click để xem nghĩa & câu ví dụ C2
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Call to action after all revealed */}
          {allRevealed && !isCompleted && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
              isPaper ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-emerald-950/30 border-emerald-500/40 text-emerald-100"
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${isPaper ? "text-emerald-700" : "text-emerald-400"}`} />
                <span className="text-sm font-black font-mono">✅ Đã khám phá toàn bộ {totalElements} vai trò trong khung ngữ nghĩa!</span>
              </div>
              <p className={`text-xs leading-relaxed ${isPaper ? "text-emerald-800" : "text-emerald-200"}`}>
                Bước tiếp theo: Xem cách một nhà văn học thuật <strong>kết hợp tất cả các vai trò</strong> này vào một câu văn IELTS Band 8.5+ duy nhất.
              </p>
              <button
                onClick={handleComplete}
                className={`w-full py-3 px-5 rounded-xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isPaper ? "bg-teal-700 hover:bg-teal-800 text-white" : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Xem Đoạn Văn Tổng Hợp IELTS Band 8.5+ →</span>
              </button>
            </div>
          )}

          {/* Synthesis paragraph — unlocked after completing */}
          {showSynthesis && (
            <div className={`p-6 rounded-2xl border space-y-4 animate-in fade-in duration-500 ${cardBg}`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider ${accentText}`}>
                <Pencil className="w-4 h-4" />
                <span>IELTS TASK 2 SYNTHESIS PARAGRAPH — BAND 8.5+ MODEL SENTENCE:</span>
              </div>

              <blockquote className={`text-base sm:text-lg font-serif leading-relaxed italic ${isPaper ? "text-slate-800" : "text-slate-100"}`}>
                "{currentWeb.academicSynthesisParagraph}"
              </blockquote>

              {/* Role labels annotation */}
              <div className={`p-4 rounded-xl border space-y-2 ${isPaper ? "bg-amber-50 border-amber-200" : "bg-black/30 border-white/10"}`}>
                <p className={`text-xs font-black font-mono uppercase tracking-wider ${isPaper ? "text-amber-900" : "text-amber-300"}`}>
                  🔍 Phân tích vai trò trong câu:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentWeb.elements.map(e => {
                    const m = ROLE_META[e.role] || DEFAULT_META;
                    return (
                      <span key={e.role} className={`text-[11px] px-2.5 py-1 rounded-lg font-mono font-bold border ${
                        isPaper ? `${m.colorLight} ${m.borderLight}` : `${m.colorDark} ${m.borderDark}`
                      }`}>
                        {m.icon} {e.role}: <em className="not-italic">{e.term}</em>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-xs ${isPaper ? "bg-teal-50 border-teal-200 text-teal-900" : "bg-cyan-950/30 border-cyan-500/20 text-cyan-100"}`}>
                <strong>💡 Luyện tập nâng cao:</strong> Thử tự viết một câu tương tự với anchor collocation <strong>"{currentWeb.anchorCollocation}"</strong> trong bối cảnh khác. Đây là kỹ thuật của những người đạt Band 8.0–9.0 thực sự.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FRAME SWITCHER ── */}
      {activeWebs.length > 1 && (
        <div className={`px-6 sm:px-8 py-4 border-t flex items-center justify-between ${borderDiv}`}>
          <span className={`text-xs font-mono ${mutedText}`}>
            {activeWebs.length} Khung ngữ nghĩa trong Unit này
          </span>
          <div className="flex items-center gap-2">
            {activeWebs.map((w, i) => (
              <button
                key={w.id}
                onClick={() => handleNextWeb(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedWebIndex === i
                    ? isPaper
                      ? "bg-teal-700 text-white shadow-xs"
                      : "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : isPaper
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                FRAME {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── RESTART HOW TO PLAY ── */}
      {step !== "how_to_play" && (
        <div className={`px-6 sm:px-8 pb-4 flex items-center justify-end`}>
          <button
            onClick={() => setStep("how_to_play")}
            className={`text-xs flex items-center gap-1 ${mutedText} hover:${accentText} transition-colors cursor-pointer`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Xem lại hướng dẫn</span>
          </button>
        </div>
      )}
    </div>
  );
};
