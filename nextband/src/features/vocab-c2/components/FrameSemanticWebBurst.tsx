import React, { useState } from "react";
import { FrameSemanticWeb, FrameElement } from "@/data/vocab-c2/types";
import { Network, Sparkles, BookOpen, Layers, Check, ExternalLink } from "lucide-react";

interface Props {
  frameWebs?: FrameSemanticWeb[];
  anchorCollocation?: string;
}

export const FrameSemanticWebBurst: React.FC<Props> = ({ frameWebs, anchorCollocation }) => {
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
          meaningVi: "Thẩm phán chủ tọa phiên tòa (Chủ thể ra phán quyết)",
          sentenceUsage: "The presiding magistrate reviewed the formal indictment before decreeing penalty.",
        },
        {
          role: "Trigger",
          term: "Extenuating Circumstances",
          meaningVi: "Tình tiết giảm nhẹ (Yếu tố tác động mức án)",
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

  const [activeElementRole, setActiveElementRole] = useState<string | null>(null);

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0D1322] to-[#080C16] border border-cyan-500/30 shadow-2xl space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-cyan-400">
              FILLMORE FRAME SEMANTICS • MẠNG KHUNG Ý NIỆM
            </span>
          </div>
          <h3 className="text-xl font-black text-white mt-1">
            {currentWeb.frameName}
          </h3>
          <p className="text-xs text-slate-300 font-serif italic">
            "{currentWeb.frameConceptVi}"
          </p>
        </div>

        {/* Anchor Tag */}
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5 self-start sm:self-auto">
          <span>Anchor Collocation:</span>
          <strong className="underline text-white">{currentWeb.anchorCollocation}</strong>
        </div>
      </div>

      {/* Frame Visual Web Burst Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {currentWeb.elements.map((elem: FrameElement) => {
          const isSelected = activeElementRole === elem.role;

          let roleColor = "border-cyan-500/30 bg-cyan-950/20 text-cyan-300";
          if (elem.role === "Agent") roleColor = "border-blue-500/40 bg-blue-950/20 text-blue-300";
          if (elem.role === "Trigger") roleColor = "border-amber-500/40 bg-amber-950/20 text-amber-300";
          if (elem.role === "Institution") roleColor = "border-purple-500/40 bg-purple-950/20 text-purple-300";
          if (elem.role === "Consequence") roleColor = "border-rose-500/40 bg-rose-950/20 text-rose-300";

          return (
            <div
              key={elem.role}
              onClick={() => setActiveElementRole(isSelected ? null : elem.role)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${roleColor} ${
                isSelected ? "ring-2 ring-white/40 scale-[1.02] shadow-xl" : "hover:bg-white/10"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider opacity-70">
                  [{elem.role.toUpperCase()}]
                </span>
                <h4 className="text-sm font-black text-white leading-tight">
                  {elem.term}
                </h4>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <p className="text-xs text-slate-300 font-sans">
                  🇻🇳 {elem.meaningVi}
                </p>
                <p className="text-[11px] text-slate-400 italic font-serif">
                  "{elem.sentenceUsage}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic IELTS Task 2 Synthesis */}
      <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold">
          <BookOpen className="w-4 h-4" />
          <span>IELTS BAND 8.5+ SYNTHESIS PARAGRAPH (KẾT HỢP TOÀN BỘ KHUNG):</span>
        </div>
        <p className="text-sm font-serif text-slate-200 leading-relaxed italic">
          "{currentWeb.academicSynthesisParagraph}"
        </p>
      </div>

      {/* Frame Switcher if multiple */}
      {activeWebs.length > 1 && (
        <div className="flex items-center justify-end gap-2 pt-1">
          {activeWebs.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setSelectedWebIndex(i)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedWebIndex === i
                  ? "bg-cyan-500 text-slate-950 font-black shadow-xs shadow-cyan-500/20"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              FRAME {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
