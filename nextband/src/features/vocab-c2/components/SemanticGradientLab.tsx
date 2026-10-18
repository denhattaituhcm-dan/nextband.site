import React, { useState, useEffect, useRef } from "react";
import { SemanticGradientItem, SemanticGradientAxis } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { useArenaTheme } from "../context/ThemeContext";
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  Info,
  Compass,
  Target,
  SlidersHorizontal,
} from "lucide-react";

export const SemanticGradientLab: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
  const { theme } = useArenaTheme();
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  const gradientItems: SemanticGradientItem[] = unit.semanticGradients || [
    {
      id: "grad_aloof",
      word: "aloof",
      ipa: "/əˈluːf/",
      pos: "adj.",
      definitionEn: "Conspicuously uninvolved, distant, or cold in social intercourse.",
      definitionVi: "Lạnh lùng, xa cách, duy trì khoảng cách tâm lý với đám đông.",
      axes: [
        {
          axisName: "Khoảng cách Xã hội (Social Distance)",
          poleA: "Thân tình, Hòa nhập (0%)",
          poleB: "Cách biệt, Cô lập (100%)",
          targetValue: 88,
          tolerance: 16,
          hintVi: "Người 'aloof' chủ động dựng lên rào cản ngăn người khác tiếp cận.",
        },
        {
          axisName: "Động cơ Vị thế (Status Motive)",
          poleA: "Tự ti, Phòng thủ (0%)",
          poleB: "Trịch thượng, Khinh mạn (100%)",
          targetValue: 55,
          tolerance: 18,
          hintVi: "Sự xa cách có thể đến từ tính nhút nhát hoặc từ cảm giác xem mình cao hơn.",
        },
        {
          axisName: "Sắc thái Ngữ dụng (Pragmatic Tone)",
          poleA: "Khen ngợi, Tán dương (0%)",
          poleB: "Phê phán, Bất đồng (100%)",
          targetValue: 72,
          tolerance: 16,
          hintVi: "Trong giao tiếp, 'aloof' thường mang hàm ý chê bai sự thiếu nhiệt tình xã hội.",
        },
      ],
      cognitiveAnalysisVi:
        "Ngôn ngữ học tri nhận chỉ ra rằng 'aloof' không đơn giản là 'ngược lại với thân thiện' (nhị phân). Nó nằm trên một không gian 3 chiều: đòi hỏi khoảng cách vật lý/tâm lý cao (vùng 80-100%), trong khi thái độ tự tôn ở mức trung dung (40-60%) và sắc thái chê trách nhẹ (60-80%).",
    },
    {
      id: "grad_cutthroat",
      word: "cut-throat",
      ipa: "/ˈkʌt.θrəʊt/",
      pos: "adj.",
      definitionEn: "Fierce, unprincipled, and relentless in striving for advantage.",
      definitionVi: "Khốc liệt, tàn nhẫn, sẵn sàng tiêu diệt đối thủ không nể tình.",
      axes: [
        {
          axisName: "Mức độ Bạo lực Cạnh tranh (Competitive Intensity)",
          poleA: "Hòa nhã, Nhượng bộ (0%)",
          poleB: "Hủy diệt, Khát máu (100%)",
          targetValue: 95,
          tolerance: 12,
          hintVi: "Cạnh tranh 'cut-throat' loại trừ mọi sự khoan nhượng trong kinh doanh.",
        },
        {
          axisName: "Ràng buộc Đạo đức (Ethical Restraint)",
          poleA: "Thượng tôn đạo đức (0%)",
          poleB: "Vô nguyên tắc, Bất chấp (100%)",
          targetValue: 86,
          tolerance: 15,
          hintVi: "Trong thị trường khốc liệt, các chuẩn mực luân lý thường bị gạt sang một bên.",
        },
        {
          axisName: "Áp lực Sinh tồn (Survival Pressure)",
          poleA: "Thư thái, Dư dả (0%)",
          poleB: "Một mất một còn (100%)",
          targetValue: 90,
          tolerance: 14,
          hintVi: "Trạng thái zero-sum game: sự tồn tại của ta là cái chết của đối thủ.",
        },
      ],
      cognitiveAnalysisVi:
        "Về mặt tri nhận không gian (Image Schema FORCE), 'cut-throat' nén áp lực sinh tồn lên mức cực hạn (90%), thúc đẩy hành vi vượt khỏi các ranh giới kiềm tỏa đạo đức (vùng cực đoan 85-100%).",
    },
    {
      id: "grad_malignant",
      word: "malignant",
      ipa: "/məˈlɪɡ.nənt/",
      pos: "adj.",
      definitionEn: "Invasive, virulent, and uncontrollably destructive to healthy tissue.",
      definitionVi: "Ác tính, có khả năng xâm lấn và di căn hủy hoại sự sống.",
      axes: [
        {
          axisName: "Mức độ Xâm lấn Ranh giới (Invasiveness)",
          poleA: "Khu trú, Hiền hòa (0%)",
          poleB: "Phá vỡ vỏ bọc, Di căn (100%)",
          targetValue: 98,
          tolerance: 10,
          hintVi: "Khối u ác tính không tôn trọng màng ngăn sinh học, lấn chiếm toàn bộ mô lân cận.",
        },
        {
          axisName: "Độc tính Đe dọa Sinh mệnh (Lethal Threat)",
          poleA: "Vô hại, Tự tiêu (0%)",
          poleB: "Tử vong không thể cứu vãn (100%)",
          targetValue: 92,
          tolerance: 12,
          hintVi: "Malignant mang tính đe dọa sinh tử nếu không can thiệp phẫu thuật khẩn cấp.",
        },
        {
          axisName: "Khả năng Kiểm soát Lâm sàng (Controllability)",
          poleA: "Dễ kiểm soát hoàn toàn (0%)",
          poleB: "Kháng thuốc, Khôn lường (100%)",
          targetValue: 80,
          tolerance: 16,
          hintVi: "Tế bào ác tính biến dị liên tục, gây khó khăn cho việc hóa trị.",
        },
      ],
      cognitiveAnalysisVi:
        "Khái niệm 'malignant' trong hệ hình y khoa là biểu hiện tột cùng của CONTAINER_BOUNDARY breach (xâm phạm ranh giới chứa đựng) kết hợp với mối đe dọa sinh tử gần mức tuyệt đối (90-100%).",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = gradientItems[currentIndex] || gradientItems[0];

  const [userSliders, setUserSliders] = useState<[number, number, number]>([50, 50, 50]);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [isResonanceUnlocked, setIsResonanceUnlocked] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setUserSliders([50, 50, 50]);
    setIsCalibrated(false);
    setIsResonanceUnlocked(false);
  }, [currentIndex, unit]);

  const handleSliderChange = (axisIndex: number, val: number) => {
    if (isCalibrated) return;
    setUserSliders((prev) => {
      const next = [...prev] as [number, number, number];
      next[axisIndex] = val;
      return next;
    });
  };

  const getQualitativeDescriptor = (val: number): { label: string; zone: string; colorClass: string } => {
    if (val <= 20) return { label: "Mức Rất Thấp / Hoàn Toàn Ngược Lại (0-20%)", zone: "Zone 1", colorClass: "text-blue-500" };
    if (val <= 40) return { label: "Mức Nhẹ / Nghiêng Về Cực A (20-40%)", zone: "Zone 2", colorClass: "text-teal-600" };
    if (val <= 60) return { label: "Mức Cân Bằng / Trung Tính (40-60%)", zone: "Zone 3", colorClass: "text-amber-600" };
    if (val <= 80) return { label: "Mức Rõ Rệt / Nghiêng Về Cực B (60-80%)", zone: "Zone 4", colorClass: "text-orange-600" };
    return { label: "Mức Cực Hạn / Tuyệt Đối (80-100%)", zone: "Zone 5", colorClass: "text-rose-600 font-bold" };
  };

  const handleVerifyGradients = () => {
    if (isCalibrated) return;
    const latency = Date.now() - startTimeRef.current;

    // Check tolerances
    const results = currentItem.axes.map((ax, idx) => {
      const diff = Math.abs(userSliders[idx] - ax.targetValue);
      return diff <= ax.tolerance;
    });

    const allPassed = results.every(Boolean);
    setIsCalibrated(true);
    setIsResonanceUnlocked(allPassed);

    onRecordAttempt({
      itemId: currentItem.id,
      word: currentItem.word,
      mode: "gradient",
      isCorrect: allPassed,
      latencyMs: latency,
      meaningVi: currentItem.definitionVi,
    });
  };

  const nextGradient = () => {
    setCurrentIndex((prev) => (prev < gradientItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 animate-in fade-in duration-300 ${
        isPaperTheme
          ? "bg-[#FAF7F2] border-[#E2D9CC] text-slate-900"
          : isSlateTheme
          ? "bg-[#0F172A] border-slate-700/80 text-slate-100"
          : "bg-[#0D1322] border-cyan-500/30 text-white shadow-2xl"
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
          isPaperTheme ? "border-slate-200" : "border-white/10"
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <Compass className={`w-5 h-5 ${isPaperTheme ? "text-teal-700" : "text-cyan-400"}`} />
            <span
              className={`text-xs font-mono font-black uppercase tracking-widest ${
                isPaperTheme ? "text-teal-800" : "text-cyan-400"
              }`}
            >
              SEMANTIC GRADIENT LAB • ĐỊNH VỊ TỌA ĐỘ Ý NIỆM
            </span>
          </div>
          <h3
            className={`text-xl font-black mt-1 font-serif ${
              isPaperTheme ? "text-slate-900" : "text-white"
            }`}
          >
            Định Vị Tọa Độ Sắc Thái:{" "}
            <span className={isPaperTheme ? "text-teal-700 uppercase" : "text-cyan-300 uppercase tracking-tight"}>
              {currentItem.word}
            </span>
          </h3>
          <p className={`text-xs mt-1 ${isPaperTheme ? "text-slate-600" : "text-slate-400"}`}>
            💡 Từ vựng C2 không mang nghĩa trắng/đen tuyệt đối. Hãy kéo 3 thanh trượt vào vùng ý niệm chuẩn xác dựa theo 5 thang định tính bên dưới!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono px-3 py-1.5 rounded-xl border font-bold ${
              isPaperTheme
                ? "bg-teal-50 text-teal-800 border-teal-200 shadow-xs"
                : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
            }`}
          >
            [{currentItem.pos}] {currentItem.ipa}
          </span>
        </div>
      </div>

      {/* Word Definition Spotlight */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isPaperTheme
            ? "bg-white border-slate-200 shadow-xs"
            : "bg-black/40 border-white/10"
        }`}
      >
        <p className={`text-sm font-serif italic ${isPaperTheme ? "text-slate-800" : "text-slate-200"}`}>
          "{currentItem.definitionEn}"
        </p>
        <span
          className={`text-xs shrink-0 font-medium ${
            isPaperTheme ? "text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200" : "text-cyan-300"
          }`}
        >
          🇻🇳 {currentItem.definitionVi}
        </span>
      </div>

      {/* Guide Card: How the 5 Semantic Zones work */}
      <div
        className={`p-3.5 rounded-2xl border text-xs flex flex-wrap items-center justify-between gap-2 font-mono ${
          isPaperTheme
            ? "bg-amber-50/70 border-amber-200 text-amber-950"
            : "bg-cyan-950/20 border-cyan-500/20 text-cyan-200"
        }`}
      >
        <span className="font-bold flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-amber-600" />
          5 Vùng Định Tính Mẫu:
        </span>
        <span className="text-[11px] opacity-90">
          [0-20%: Rất Thấp] ➔ [21-40%: Nhẹ] ➔ [41-60%: Cân Bằng] ➔ [61-80%: Rõ Rệt] ➔ [81-100%: Cực Hạn]
        </span>
      </div>

      {/* 3 Continuous Sliders with Qualitative Visual Zones */}
      <div className="space-y-6 pt-2">
        {currentItem.axes.map((axis: SemanticGradientAxis, idx: number) => {
          const val = userSliders[idx];
          const descriptor = getQualitativeDescriptor(val);
          const isMatch = isCalibrated && Math.abs(val - axis.targetValue) <= axis.tolerance;

          // Target zone range for visual hint
          const minTarget = Math.max(0, axis.targetValue - axis.tolerance);
          const maxTarget = Math.min(100, axis.targetValue + axis.tolerance);

          return (
            <div
              key={axis.axisName}
              className={`space-y-3 p-5 rounded-2xl border transition-all ${
                isPaperTheme
                  ? "bg-white border-slate-200 shadow-xs"
                  : "bg-white/5 border-white/5"
              }`}
            >
              {/* Axis Title & Current Value */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span
                  className={`text-xs font-bold font-mono ${
                    isPaperTheme ? "text-slate-800" : "text-slate-200"
                  }`}
                >
                  TRỤC {idx + 1}: {axis.axisName}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-lg border ${
                      isPaperTheme
                        ? "bg-slate-100 text-slate-800 border-slate-300"
                        : "bg-black/50 text-cyan-300 border-white/10"
                    }`}
                  >
                    {val}%
                  </span>

                  {isCalibrated && (
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                        isMatch
                          ? isPaperTheme
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-400"
                          : isPaperTheme
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-rose-500/20 text-rose-300 border-rose-400"
                      }`}
                    >
                      {isMatch ? "✓ Đạt Chuẩn" : `(Mục tiêu: ${axis.targetValue}%)`}
                    </span>
                  )}
                </div>
              </div>

              {/* Slider Component & Interactive Track */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  disabled={isCalibrated}
                  onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                  className="w-full accent-teal-600 dark:accent-cyan-400 cursor-pointer h-2.5 rounded-lg appearance-none bg-slate-200 dark:bg-black/60"
                />

                {/* Qualitative Landmarks (5 Zones) */}
                <div className="grid grid-cols-5 text-[10px] font-mono text-center pt-1 border-t border-slate-200 dark:border-white/10 opacity-70">
                  <span className={val <= 20 ? "font-black text-teal-700 dark:text-cyan-300 underline" : ""}>0-20%</span>
                  <span className={val > 20 && val <= 40 ? "font-black text-teal-700 dark:text-cyan-300 underline" : ""}>21-40%</span>
                  <span className={val > 40 && val <= 60 ? "font-black text-teal-700 dark:text-cyan-300 underline" : ""}>41-60%</span>
                  <span className={val > 60 && val <= 80 ? "font-black text-teal-700 dark:text-cyan-300 underline" : ""}>61-80%</span>
                  <span className={val > 80 ? "font-black text-teal-700 dark:text-cyan-300 underline" : ""}>81-100%</span>
                </div>

                <div
                  className={`flex items-center justify-between text-xs font-mono font-medium ${
                    isPaperTheme ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  <span className="max-w-[45%]">⬅️ {axis.poleA}</span>
                  <span className="max-w-[45%] text-right">{axis.poleB} ➡️</span>
                </div>
              </div>

              {/* Current Zone Dynamic Feedback */}
              <div
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                  isPaperTheme
                    ? "bg-slate-50 border-slate-200 text-slate-700"
                    : "bg-black/30 border-white/5 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 font-serif italic">
                  <Info className={`w-3.5 h-3.5 shrink-0 ${isPaperTheme ? "text-teal-700" : "text-cyan-400"}`} />
                  <span>{axis.hintVi}</span>
                </div>
                <span className={`text-[11px] font-mono font-bold shrink-0 ml-2 ${descriptor.colorClass}`}>
                  {descriptor.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification & Cognitive Revelation */}
      <div className="pt-2">
        {!isCalibrated ? (
          <button
            onClick={handleVerifyGradients}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
              isPaperTheme
                ? "bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>XÁC LẬP TỌA ĐỘ TRI NHẬN [CALIBRATE SEMANTIC RESONANCE]</span>
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div
              className={`p-5 rounded-2xl border ${
                isResonanceUnlocked
                  ? isPaperTheme
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                  : isPaperTheme
                  ? "bg-amber-50 border-amber-300 text-amber-950"
                  : "bg-amber-950/40 border-amber-500/50 text-amber-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-5 h-5 ${isPaperTheme ? "text-emerald-700" : "text-emerald-400"}`}
                  />
                  <span className="text-sm font-black font-mono">
                    {isResonanceUnlocked
                      ? "⚡ CỘNG HƯỞNG TRI NHẬN CHÍNH XÁC (ACCURATE PROTOTYPE)!"
                      : "⚠️ LỆCH VÙNG Ý NIỆM — HÃY QUAN SÁT TỌA ĐỘ CHUẨN ĐƯỢC GỢI Ý PHÍA TRÊN"}
                  </span>
                </div>
                <button
                  onClick={nextGradient}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition-all shadow-sm cursor-pointer flex items-center gap-1.5 self-start sm:self-auto ${
                    isPaperTheme
                      ? "bg-teal-700 hover:bg-teal-800 text-white"
                      : "bg-cyan-400 hover:bg-cyan-300 text-slate-950"
                  }`}
                >
                  <span>Khảo sát từ tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div
                className={`text-xs leading-relaxed mt-3 pt-3 border-t font-sans ${
                  isPaperTheme ? "border-emerald-200 text-slate-800" : "border-white/10 text-slate-200"
                }`}
              >
                💡 <strong className={isPaperTheme ? "text-teal-900" : "text-cyan-300"}>Phân tích từ Nhà Ngôn ngữ học Tri nhận:</strong>{" "}
                {currentItem.cognitiveAnalysisVi}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

