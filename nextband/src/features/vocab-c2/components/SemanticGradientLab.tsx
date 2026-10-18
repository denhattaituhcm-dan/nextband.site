import React, { useState, useEffect, useRef } from "react";
import { SemanticGradientItem, SemanticGradientAxis } from "@/data/vocab-c2/types";
import { C2ModeSharedProps } from "./ArenaHeader";
import { Sliders, Sparkles, CheckCircle2, RotateCcw, ArrowRight, BrainCircuit, Info } from "lucide-react";

export const SemanticGradientLab: React.FC<C2ModeSharedProps> = ({ unit, onRecordAttempt }) => {
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
          poleA: "Thân tình, Hòa nhập (0)",
          poleB: "Cách biệt, Cô lập (100)",
          targetValue: 88,
          tolerance: 15,
          hintVi: "Người 'aloof' chủ động dựng lên rào cản ngăn người khác tiếp cận.",
        },
        {
          axisName: "Động cơ Vị thế (Status Motive)",
          poleA: "Tự ti, Phòng thủ (0)",
          poleB: "Trịch thượng, Khinh mạn (100)",
          targetValue: 55,
          tolerance: 18,
          hintVi: "Sự xa cách có thể đến từ tính nhút nhát hoặc từ cảm giác xem mình cao hơn.",
        },
        {
          axisName: "Sắc thái Ngữ dụng (Pragmatic Tone)",
          poleA: "Khen ngợi, Tán dương (0)",
          poleB: "Phê phán, Bất đồng (100)",
          targetValue: 72,
          tolerance: 15,
          hintVi: "Trong giao tiếp, 'aloof' thường mang hàm ý chê bai sự thiếu nhiệt tình xã hội.",
        },
      ],
      cognitiveAnalysisVi:
        "Ngôn ngữ học tri nhận chỉ ra rằng 'aloof' không đơn giản là 'ngược lại với thân thiện' (nhị phân). Nó nằm trên một không gian 3 chiều: đòi hỏi khoảng cách vật lý/tâm lý cao (88/100), trong khi thái độ tự tôn ở mức trung dung (55/100) và sắc thái chê trách nhẹ (72/100).",
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
          poleA: "Hòa nhã, Nhượng bộ (0)",
          poleB: "Hủy diệt, Khát máu (100)",
          targetValue: 95,
          tolerance: 12,
          hintVi: "Cạnh tranh 'cut-throat' loại trừ mọi sự khoan nhượng trong kinh doanh.",
        },
        {
          axisName: "Ràng buộc Đạo đức (Ethical Restraint)",
          poleA: "Thượng tôn đạo đức (0)",
          poleB: "Vô nguyên tắc, Bất chấp (100)",
          targetValue: 86,
          tolerance: 15,
          hintVi: "Trong thị trường khốc liệt, các chuẩn mực luân lý thường bị gạt sang một bên.",
        },
        {
          axisName: "Áp lực Sinh tồn (Survival Pressure)",
          poleA: "Thư thái, Dư dả (0)",
          poleB: "Một mất một còn (100)",
          targetValue: 90,
          tolerance: 14,
          hintVi: "Trạng thái zero-sum game: sự tồn tại của ta là cái chết của đối thủ.",
        },
      ],
      cognitiveAnalysisVi:
        "Về mặt tri nhận không gian (Image Schema FORCE), 'cut-throat' nén áp lực sinh tồn lên mức cực hạn (90/100), thúc đẩy hành vi vượt khỏi các ranh giới kiềm tỏa đạo đức (86/100).",
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
          poleA: "Khu trú, Hiền hòa (0)",
          poleB: "Phá vỡ vỏ bọc, Di căn (100)",
          targetValue: 98,
          tolerance: 10,
          hintVi: "Khối u ác tính không tôn trọng màng ngăn sinh học, lấn chiếm toàn bộ mô lân cận.",
        },
        {
          axisName: "Độc tính Đe dọa Sinh mệnh (Lethal Threat)",
          poleA: "Vô hại, Tự tiêu (0)",
          poleB: "Tử vong không thể cứu vãn (100)",
          targetValue: 92,
          tolerance: 12,
          hintVi: "Malignant mang tính đe dọa sinh tử nếu không can thiệp phẫu thuật khẩn cấp.",
        },
        {
          axisName: "Khả năng Kiểm soát Lâm sàng (Controllability)",
          poleA: "Dễ kiểm soát hoàn toàn (0)",
          poleB: "Kháng thuốc, Khôn lường (100)",
          targetValue: 80,
          tolerance: 16,
          hintVi: "Tế bào ác tính biến dị liên tục, gây khó khăn cho việc hóa trị.",
        },
      ],
      cognitiveAnalysisVi:
        "Khái niệm 'malignant' trong hệ hình y khoa là biểu hiện tột cùng của CONTAINER_BOUNDARY breach (xâm phạm ranh giới chứa đựng) kết hợp với mối đe dọa sinh tử gần mức tuyệt đối.",
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
    <div className="rounded-3xl p-6 sm:p-8 bg-[#0D1322] border border-cyan-500/30 shadow-2xl space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-cyan-400">
              SEMANTIC GRADIENT LAB • PROTOTYPE CONTINUUM
            </span>
          </div>
          <h3 className="text-xl font-black text-white mt-1">
            Định Vị Tọa Độ Ngữ Nghĩa Đa Chiều:{" "}
            <span className="text-cyan-300 uppercase tracking-tight">{currentItem.word}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ngôn ngữ tự nhiên không phải nhị phân trắng/đen. Hãy kéo 3 thanh trượt để xác lập vùng ý niệm chuẩn xác!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            [{currentItem.pos}] {currentItem.ipa}
          </span>
        </div>
      </div>

      {/* Word Definition Spotlight */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm font-serif text-slate-200">
          "{currentItem.definitionEn}"
        </p>
        <span className="text-xs text-cyan-300 shrink-0 font-sans">
          🇻🇳 {currentItem.definitionVi}
        </span>
      </div>

      {/* 3 Continuous Sliders */}
      <div className="space-y-6 pt-2">
        {currentItem.axes.map((axis: SemanticGradientAxis, idx: number) => {
          const val = userSliders[idx];
          const isMatch = isCalibrated && Math.abs(val - axis.targetValue) <= axis.tolerance;

          return (
            <div key={axis.axisName} className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 font-mono">
                  TRỤC {idx + 1}: {axis.axisName}
                </span>
                <span className="text-xs font-mono font-black text-cyan-300">
                  {val}/100 {isCalibrated && `(Chuẩn: ${axis.targetValue})`}
                </span>
              </div>

              {/* Slider Component */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  disabled={isCalibrated}
                  onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-black/60 rounded-lg appearance-none"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{axis.poleA}</span>
                  <span>{axis.poleB}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-1 flex items-center gap-1 font-serif">
                <Info className="w-3 h-3 text-cyan-400 shrink-0" />
                {axis.hintVi}
              </p>
            </div>
          );
        })}
      </div>

      {/* Verification & Cognitive Revelation */}
      <div className="pt-2">
        {!isCalibrated ? (
          <button
            onClick={handleVerifyGradients}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm transition-all shadow-xl shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>XÁC LẬP TỌA ĐỘ TRI NHẬN [CALIBRATE SEMANTIC RESONANCE]</span>
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div
              className={`p-5 rounded-2xl border ${
                isResonanceUnlocked
                  ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                  : "bg-amber-950/40 border-amber-500/50 text-amber-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-black font-mono">
                    {isResonanceUnlocked
                      ? "⚡ CỘNG HƯỞNG TRI NHẬN THÀNH CÔNG (ACCURATE PROTOTYPE)!"
                      : "⚠️ LỆCH TỌA ĐỘ NGỮ NGHĨA — HÃY QUAN SÁT TỌA ĐỘ CHUẨN"}
                  </span>
                </div>
                <button
                  onClick={nextGradient}
                  className="px-4 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Khảo sát từ tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed mt-3 pt-3 border-t border-white/10 font-sans">
                💡 <strong className="text-cyan-300">Phân tích từ Nhà Ngôn ngữ học Tri nhận:</strong>{" "}
                {currentItem.cognitiveAnalysisVi}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
