import React from "react";
import { useNavigate } from "react-router-dom";
import { SectionContainer } from "@/components/public/SectionContainer";
import { AcademicRankSystem } from "@/components/public/AcademicRankSystem";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import {
  Brain,
  Layers,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Target,
  PenTool,
  Compass,
  ShieldCheck,
  Sparkles,
  FileCheck,
  MessageSquare,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RevealCardProps {
  badge: string;
  badgeType?: "crimson" | "blue" | "amber" | "emerald";
  title: string;
  subtitle: string;
  frontSummary: string;
  frontBullets: string[];
  backHeading: string;
  backSubheading: string;
  backMechanismTitle: string;
  backMechanismSteps: { step: string; desc: string }[];
  backKeyTakeaway: string;
  actionText?: string;
  onActionClick?: () => void;
}

const REVEAL_THEMES = {
  crimson: {
    border: "border-brand-red/30 hover:border-brand-red/60",
    badge: "bg-brand-red/10 text-brand-red border-brand-red/20",
    accent: "text-brand-red",
    glow: "shadow-brand-red/10",
    btnGrad: "bg-gradient-to-r from-brand-red to-[#B71C1C] hover:from-brand-red-hover hover:to-[#880E4E] text-white",
    cardBg: "bg-gradient-to-b from-card via-card to-brand-red/5",
    backHeaderBg: "bg-brand-red-soft dark:bg-brand-red/10 text-brand-red border-brand-red/20",
  },
  blue: {
    border: "border-brand-blue/30 hover:border-brand-blue/60",
    badge: "bg-brand-blue-soft text-brand-blue border-brand-blue/20",
    accent: "text-brand-blue",
    glow: "shadow-brand-blue/10",
    btnGrad: "bg-gradient-to-r from-brand-blue to-[#1E3A8A] hover:from-brand-blue-hover hover:to-[#172554] text-white",
    cardBg: "bg-gradient-to-b from-card via-card to-brand-blue-soft/30",
    backHeaderBg: "bg-brand-blue-soft dark:bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/60",
    badge: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/30",
    accent: "text-amber-600 dark:text-amber-400",
    glow: "shadow-amber-500/10",
    btnGrad: "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white",
    cardBg: "bg-gradient-to-b from-card via-card to-amber-50/20 dark:to-amber-950/10",
    backHeaderBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/30",
    accent: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-emerald-500/10",
    btnGrad: "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white",
    cardBg: "bg-gradient-to-b from-card via-card to-emerald-50/20 dark:to-emerald-950/10",
    backHeaderBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
  },
};

function RevealCardItem({
  badge,
  badgeType = "blue",
  title,
  subtitle,
  frontSummary,
  frontBullets,
  backHeading,
  backSubheading,
  backMechanismTitle,
  backMechanismSteps,
  backKeyTakeaway,
  actionText,
  onActionClick,
}: RevealCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const theme = REVEAL_THEMES[badgeType];

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[520px] duration-500 transform-style-3d transition-transform",
        isFlipped ? "rotate-y-180" : ""
      )}
    >
      {/* ========================================================================= */}
      {/* MẶT TRƯỚC (THE SEAL / MẶT KHÁM PHÁ)                                      */}
      {/* ========================================================================= */}
      <div
        onClick={handleFlip}
        aria-hidden={isFlipped}
        className={cn(
          "absolute inset-0 backface-hidden flip-face-front rounded-3xl p-6 sm:p-8 bg-card border-2 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl",
          theme.border,
          theme.glow,
          theme.cardBg,
          isFlipped ? "pointer-events-none z-0" : "pointer-events-auto z-10 cursor-pointer"
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/80">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border inline-flex items-center gap-1.5",
                theme.badge
              )}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{badge}</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/80 hover:bg-muted text-foreground text-xs font-bold transition border border-border/60 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-brand-blue dark:text-brand-cyan" />
              <span>Lật mở cơ chế ↺</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider block">
              {subtitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
              {title}
            </h3>
          </div>
        </div>

        <div className="bg-muted/40 dark:bg-muted/20 p-5 rounded-2xl space-y-4 my-4 border border-border/60 flex-1 flex flex-col justify-between">
          <p className="text-sm sm:text-base text-foreground/85 font-medium leading-relaxed">
            {frontSummary}
          </p>

          <div className="space-y-2 pt-2 border-t border-border/50">
            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground block">
              Điểm cốt lõi khám phá:
            </span>
            <div className="space-y-1.5">
              {frontBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme.accent)} />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFlip();
          }}
          className={cn(
            "w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer",
            theme.btnGrad
          )}
        >
          <span>KHÁM PHÁ CƠ CHẾ VẬN HÀNH</span>
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MẶT SAU (THE CODEX / MẬT THƯ TRI THỨC VẬN HÀNH)                          */}
      {/* ========================================================================= */}
      <div
        onClick={handleFlip}
        aria-hidden={!isFlipped}
        className={cn(
          "absolute inset-0 backface-hidden flip-face-back rounded-3xl p-6 sm:p-8 bg-card border-2 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl",
          theme.border,
          theme.cardBg,
          isFlipped ? "pointer-events-auto z-10 cursor-pointer" : "pointer-events-none z-0"
        )}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-border/80">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border inline-flex items-center gap-1.5",
                theme.backHeaderBg
              )}
            >
              <span>Học Viện Mật Thư</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/80 hover:bg-muted text-foreground text-xs font-bold transition border border-border/60 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Mặt trước ↺</span>
            </button>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-black text-foreground">{backHeading}</h4>
            <p className="text-xs text-muted-foreground">{backSubheading}</p>
          </div>
        </div>

        <div className="space-y-3 my-3 flex-1 flex flex-col justify-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground block">
            {backMechanismTitle}:
          </span>

          <div className="space-y-2">
            {backMechanismSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-background/90 border border-border/80 text-xs sm:text-sm space-y-0.5 shadow-2xs"
              >
                <div className="font-bold text-foreground flex items-center gap-2">
                  <span className={cn("font-mono text-xs px-2 py-0.5 rounded-md", theme.badge)}>
                    0{idx + 1}
                  </span>
                  <span>{s.step}</span>
                </div>
                <p className="text-muted-foreground pl-8 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-muted/60 border border-border/70 text-xs text-foreground/90 font-medium">
            <span className="font-bold text-foreground">💡 Cam kết thực chất: </span>
            {backKeyTakeaway}
          </div>
        </div>

        {actionText && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.();
            }}
            className={cn(
              "w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition hover:scale-[1.01] active:scale-[0.98] cursor-pointer",
              theme.btnGrad
            )}
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}


export default function AcademicSystemPage() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <SEO
        title="Hệ Thống Học Thuật ARIS — Phương Pháp The ARIS Way, Chuẩn Năng Lực & Khung ARIS-7"
        description="ARIS xây dựng năng lực ngôn ngữ theo một hệ thống rõ ràng: từ phương pháp tri nhận bản chất The ARIS Way, 4 chuẩn năng lực cốt lõi đến bản đồ 7 cấp bậc ARIS-7."
      />

      {/* ========================================================================= */}
      {/* 01. HERO SECTION: ACADEMIC THESIS                                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-border/80 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue border border-brand-blue/20 text-xs sm:text-sm font-black uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Hệ Thống Học Thuật ARIS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.15]">
            ARIS xây dựng năng lực ngôn ngữ theo một hệ thống rõ ràng —{" "}
            <span className="text-brand-blue block sm:inline">
              từ cách hình thành câu, đến chuẩn năng lực và từng bước tiến bộ.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-foreground/85 font-medium leading-relaxed max-w-3xl mx-auto">
            Không học mẹo, không học thuộc bài mẫu. ARIS kết hợp phương pháp luận tri nhận bản chất (The ARIS Way) và khung chuẩn năng lực học thuật (ARIS-7) để bạn thấu hiểu điểm nghẽn và đo lường sự tiến bộ thực chất.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="rounded-2xl px-8 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-md gap-2"
            >
              <span>Tìm hiểu vị trí khởi điểm phù hợp</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("the-aris-way")}
              className="rounded-2xl px-8 h-14 font-bold text-base sm:text-lg border-2 border-border/80 hover:bg-muted text-foreground"
            >
              Khám phá phương pháp The ARIS Way
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. SECTION 02: THE ARIS WAY — HOW (CƠ CHẾ TƯ DUY)                        */}
      {/* ========================================================================= */}
      <section id="the-aris-way" className="scroll-mt-20">
        <SectionContainer
          badge="Phương Pháp The ARIS Way"
          title="Hiểu cách tiếng Anh tạo ra ý nghĩa từ bản chất"
          description="Phần lớn người học gặp bế tắc trong Writing và Speaking không phải vì thiếu từ vựng, mà vì đang mắc kẹt trong cơ chế dịch thô từng chữ từ tiếng Việt."
          background="muted"
        >
          {/* ========================================================================= */}
          {/* REVEAL CARDS (INTERACTIVE DISCOVERY: THE ARIS WAY & SOCRATIC METHOD)     */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {/* THẺ 1: THE ARIS WAY (TRIẾT LÝ TRI NHẬN BẢN CHẤT) */}
            <div className="perspective-1000 w-full min-h-[520px] select-none text-left">
              <RevealCardItem
                badge="Triết Lý Tri Nhận"
                badgeType="blue"
                title="The ARIS Way — Xóa Bỏ Tư Duy Dịch Từng Chữ"
                subtitle="Cơ Chế Tư Duy Độc Quyền"
                frontSummary="Học tiếng Anh không phải là học ghép từ điển. ARIS giúp bạn kích hoạt trường ý niệm và tiêu điểm ngữ cảnh để tạo câu tự nhiên như người bản xứ."
                frontBullets={[
                  "Triệt tiêu thói quen nghĩ tiếng Việt rồi dịch Word-by-Word",
                  "Phản xạ trực tiếp từ ý niệm (Concept) sang cấu trúc học thuật",
                  "Làm chủ sắc thái biểu đạt và độ tự nhiên trong Speaking & Writing"
                ]}
                backHeading="Bên Trong Cơ Chế Tri Nhận The ARIS Way"
                backSubheading="Cách ARIS tái lập trình tư duy ngôn ngữ cho học viên"
                backMechanismTitle="Quy trình 3 bước hình thành câu"
                backMechanismSteps={[
                  {
                    step: "Kích Hoạt Ý Niệm (Concept Activation)",
                    desc: "Xác định rõ bản chất thông điệp và trường nghĩa cốt lõi thay vì tìm từ dịch tương đương."
                  },
                  {
                    step: "Chọn Tiêu Điểm & Quan Hệ (Perspective Framing)",
                    desc: "Lựa chọn chủ thể, góc nhìn nhấn mạnh và mối quan hệ nhân quả/nhượng bộ giữa các thực thể."
                  },
                  {
                    step: "Hình Thành Cấu Trúc Chuẩn (Academic Expression)",
                    desc: "Tạo ra câu văn mạch lạc, chuẩn xác theo văn phong học thuật một cách tự nhiên."
                  }
                ]}
                backKeyTakeaway="Bạn phản xạ trực tiếp bằng tiếng Anh, kiểm soát sắc thái câu chữ mà không cần học thuộc lòng câu mẫu."
                actionText="Khảo thí đánh giá năng lực tư duy"
                onActionClick={() => navigate("/assessment")}
              />
            </div>

            {/* THẺ 2: SOCRATIC FEEDBACK 1:1 (HỆ THỐNG GIẢNG VIÊN TRUY VẤN) */}
            <div className="perspective-1000 w-full min-h-[520px] select-none text-left">
              <RevealCardItem
                badge="Giảng Dạy Tinh Hoa"
                badgeType="crimson"
                title="Sửa Từ Gốc — Không Chữa Lỗi Bề Mặt"
                subtitle="Phương Pháp Socratic 1:1"
                frontSummary="Giáo viên ARIS không sửa hộ câu hay đưa đáp án mẫu. Chúng tôi đặt câu hỏi truy vấn logic để bạn tự nhận diện điểm nghẽn và tự sửa câu hoàn chỉnh."
                frontBullets={[
                  "Bóc tách nguyên nhân tư duy đằng sau mỗi lỗi sai",
                  "Truy vấn ngữ pháp chức năng thay vì ép công thức máy móc",
                  "Lưu vết toàn bộ lịch sử tiến bộ trên hệ thống NextBand"
                ]}
                backHeading="Bên Trong Cơ Chế Phản Hồi Socratic 1:1"
                backSubheading="Cách giảng viên ARIS đồng hành bóc tách điểm nghẽn"
                backMechanismTitle="Quy trình truy vấn Socratic"
                backMechanismSteps={[
                  {
                    step: "Nhận Diện Điểm Nghẽn (Diagnose Root Cause)",
                    desc: "Xác định lỗi sai xuất phát từ dịch thô, nhầm lẫn từ loại hay sai lệch cấu trúc biểu đạt."
                  },
                  {
                    step: "Đặt Câu Hỏi Truy Vấn (Socratic Inquiry)",
                    desc: "Đặt câu hỏi gợi mở để người học tự đối chiếu quy luật và nhận ra sự bất hợp lý trong câu của mình."
                  },
                  {
                    step: "Tự Tái Cấu Trúc (Self-Correction Mastery)",
                    desc: "Học viên tự tay viết lại câu hoàn chỉnh, khắc sâu nhận thức và không bao giờ tái phạm lỗi cũ."
                  }
                ]}
                backKeyTakeaway="Mỗi lỗi sai là một cơ hội hiểu sâu bản chất, giúp bạn làm chủ năng lực ngôn ngữ bền vững."
                actionText="Tìm hiểu đội ngũ giảng viên ARIS"
                onActionClick={() => navigate("/teachers")}
              />
            </div>
          </div>


          {/* 4 Nấc Thang Tri Nhận */}
          <div className="pt-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                4 Nấc Thang Tri Nhận Ngôn Ngữ
              </h3>
              <p className="text-sm sm:text-base text-foreground/75">
                Chuyển hóa nguyên lý ngôn ngữ học thành 4 bước rèn luyện rõ ràng:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {/* Step 1 */}
              <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                    01
                  </span>
                  <h4 className="text-lg font-black text-foreground">
                    Hiểu ý nghĩa
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  Hiểu rõ nét nghĩa bản chất của từ thay vì chỉ gắn nhãn tiếng Việt. Từ đó mô tả điều gì? Sắc thái thay đổi ra sao theo ngữ cảnh?
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                    02
                  </span>
                  <h4 className="text-lg font-black text-foreground">
                    Chọn góc nhìn
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  Cùng một sự việc có nhiều cách diễn đạt. Ai là chủ thể? Trọng tâm cần nhấn mạnh là gì? Quan hệ nhân quả giữa các ý là gì?
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                    03
                  </span>
                  <h4 className="text-lg font-black text-foreground">
                    Biến ý thành câu
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  Dẫn dắt suy nghĩ theo chuỗi: <strong>Ý niệm → Mối quan hệ → Cấu trúc → Câu chữ</strong>, triệt tiêu thói quen dịch thô từng từ.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-3xl border border-border/80 bg-card space-y-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                    04
                  </span>
                  <h4 className="text-lg font-black text-foreground">
                    Sửa từ gốc
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  Khi câu sai, giáo viên giúp bạn nhận diện vì sao bạn lại chọn cấu trúc đó để bóc tách tận gốc lỗi tư duy thay vì chỉ sửa chữ bề mặt.
                </p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL CASE STUDY */}
          <div className="pt-12 space-y-6 text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-lg bg-brand-blue-soft text-brand-blue">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Case Study Minh Họa Tri Nhận Bản Xứ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                Hiểu ngôn ngữ từ góc nhìn của người bản xứ
              </h3>
              <p className="text-sm sm:text-base text-foreground/75">
                Thay vì dịch thô từng chữ hay học vẹt nghĩa tiếng Việt, The ARIS Way giúp người học bóc tách ý niệm hình tượng (Conceptual Metaphor) và cảm giác trực quan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* CASE 1: PULL ONE'S WEIGHT */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-brand-blue/30 space-y-5 shadow-2xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue uppercase tracking-wider">
                      Ví dụ 01 • Teamwork &amp; Effort
                    </span>
                    <span className="text-xs font-bold text-foreground/60">Idiom</span>
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-black text-foreground font-mono">
                    "Pull one's weight"
                  </h4>

                  {/* Dịch thô vs Bản xứ */}
                  <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-1 text-xs sm:text-sm">
                    <div className="font-bold text-destructive flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Cách dịch thô / Học vẹt thông thường:</span>
                    </div>
                    <p className="text-foreground/80 pl-5">
                      Dịch từng từ là <em>"kéo trọng lượng của mình"</em> → Khó hiểu và gượng gạo khi nói về làm việc nhóm.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 space-y-2 text-xs sm:text-sm">
                    <div className="font-bold text-brand-blue flex items-center gap-1.5">
                      <Compass className="h-4 w-4 shrink-0" />
                      <span>Góc nhìn &amp; Hình tượng người bản xứ:</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pl-5">
                      Bắt nguồn từ hình ảnh <strong>đội đua thuyền chèo (rowing crew)</strong>. Mỗi tay chèo phải dùng lực chèo đủ mạnh để tự kéo/đẩy khối lượng cơ thể mình tiến lên, không bắt đồng đội phải chèo gánh thêm phần cân nặng của mình.
                    </p>
                  </div>
                </div>

                {/* Kết quả bản chất */}
                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="text-xs font-mono font-bold text-success uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Bản chất ý niệm &amp; Ứng dụng tự nhiên:</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-brand-blue text-white font-mono text-xs sm:text-sm font-semibold shadow-xs">
                    "In any group project, everyone must <span className="underline decoration-white/60 underline-offset-4">pull their weight</span> to succeed."
                  </div>
                  <p className="text-xs text-foreground/75">
                    → Mang nghĩa: <strong>Làm tròn trách nhiệm, đóng góp công sức tương xứng</strong> (không ỷ lại, không ăn bám).
                  </p>
                </div>
              </div>

              {/* CASE 2: HAVE THE GUTS */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-brand-blue/30 space-y-5 shadow-2xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue uppercase tracking-wider">
                      Ví dụ 02 • Courage &amp; Grit
                    </span>
                    <span className="text-xs font-bold text-foreground/60">Idiom</span>
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-black text-foreground font-mono">
                    "Have the guts (for/to do)"
                  </h4>

                  {/* Dịch thô vs Bản xứ */}
                  <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-1 text-xs sm:text-sm">
                    <div className="font-bold text-destructive flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Cách dịch thô / Học vẹt thông thường:</span>
                    </div>
                    <p className="text-foreground/80 pl-5">
                      Dịch thô là <em>"có ruột / lòng mề"</em> → Cảm thấy kỳ quặc và không hiểu nguồn gốc vì sao lại chỉ sự dũng cảm.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 space-y-2 text-xs sm:text-sm">
                    <div className="font-bold text-brand-blue flex items-center gap-1.5">
                      <Compass className="h-4 w-4 shrink-0" />
                      <span>Góc nhìn &amp; Cảm giác trực quan bản xứ:</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed pl-5">
                      Khi đối mặt với nỗi sợ hoặc rủi ro lớn, phản ứng sinh học tự nhiên là <strong>cảm giác thắt ruột, nôn nao ở vùng bụng (nervous gut)</strong>. Người <em>"have the guts"</em> là người có đủ bản lĩnh để chịu đựng và vượt qua nỗi sợ thắt ruột đó.
                    </p>
                  </div>
                </div>

                {/* Kết quả bản chất */}
                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="text-xs font-mono font-bold text-success uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Bản chất ý niệm &amp; Ứng dụng tự nhiên:</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-brand-blue text-white font-mono text-xs sm:text-sm font-semibold shadow-xs">
                    "He talks big, but doesn't <span className="underline decoration-white/60 underline-offset-4">have the guts to</span> take the risk."
                  </div>
                  <p className="text-xs text-foreground/75">
                    → Mang nghĩa: <strong>Có dũng khí, có gan, dám đương đầu với thử thách</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 03. SECTION 03: COMPETENCY FRAMEWORK — WHAT (CHUẨN NĂNG LỰC)              */}
      {/* ========================================================================= */}
      <section id="competency-framework" className="scroll-mt-20">
        <SectionContainer
          badge="Chuẩn Năng Lực Cốt Lõi"
          title="ARIS quan tâm bạn đang thực sự kiểm soát những năng lực nào"
          description="Thay vì chỉ nhìn vào điểm số bề mặt, ARIS đo lường sự tiến bộ dựa trên 4 trụ cột năng lực biểu đạt và lập luận cốt lõi."
          background="default"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left max-w-5xl mx-auto">
            {/* C1: Meaning Precision */}
            <div className="p-7 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs hover:border-brand-blue/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                  C1 • WHAT meaning?
                </span>
                <Brain className="h-5 w-5 text-brand-blue" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Meaning Precision
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Khả năng lựa chọn từ và cụm từ truyền tải chính xác nét nghĩa và trường nghĩa dự định, triệt tiêu thói quen dịch từng từ một từ tiếng Việt sang tiếng Anh.
              </p>
              <div className="pt-2 text-xs font-bold text-brand-blue flex items-center gap-1.5 border-t border-border/60">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Dùng đúng từ theo ngữ cảnh, không chắp vá từ phức tạp sai lệch nghĩa</span>
              </div>
            </div>

            {/* C2: Structural Control */}
            <div className="p-7 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs hover:border-brand-blue/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                  C2 • HOW structured?
                </span>
                <Layers className="h-5 w-5 text-brand-blue" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Structural Control
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Khả năng lựa chọn và làm chủ cấu trúc câu (đơn, ghép, phức, bị động) để phản ánh chính xác quan hệ ý nghĩa (nguyên nhân, nhượng bộ, điều kiện, mục đích) mà không dựa vào mẫu câu học thuộc.
              </p>
              <div className="pt-2 text-xs font-bold text-brand-blue flex items-center gap-1.5 border-t border-border/60">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Cấu trúc phục vụ mục đích biểu đạt, không nhồi nhét ngữ pháp máy móc</span>
              </div>
            </div>

            {/* C3: Logical Progression */}
            <div className="p-7 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs hover:border-brand-blue/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                  C3 • HOW developed?
                </span>
                <Compass className="h-5 w-5 text-brand-blue" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Logical Progression
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Khả năng triển khai ý tưởng theo chuỗi suy luận chặt chẽ: giải thích rõ cơ chế và nguyên nhân trước khi đưa ra minh chứng, tạo tính mạch lạc và thuyết phục tự thân cho đoạn văn.
              </p>
              <div className="pt-2 text-xs font-bold text-brand-blue flex items-center gap-1.5 border-t border-border/60">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Lập luận có căn cứ, không nhảy cóc ý hay lạm dụng từ nối bề mặt</span>
              </div>
            </div>

            {/* C4: Contextual Appropriateness */}
            <div className="p-7 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs hover:border-brand-blue/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs px-3 py-1 rounded-xl bg-brand-blue-soft text-brand-blue">
                  C4 • APPROPRIATE for whom/why?
                </span>
                <ShieldCheck className="h-5 w-5 text-brand-blue" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Contextual Appropriateness
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Khả năng điều chỉnh phong cách ngôn ngữ, độ trang trọng và sắc thái học thuật phù hợp với định dạng bài thi (Academic Register cho Writing; giao tiếp tự nhiên cho Speaking).
              </p>
              <div className="pt-2 text-xs font-bold text-brand-blue flex items-center gap-1.5 border-t border-border/60">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Giữ vững phong thái học thuật khách quan, điềm đạm và chính xác</span>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 04. SECTION 04: ARIS-7 FRAMEWORK — WHERE (BẢN ĐỒ NĂNG LỰC)                */}
      {/* ========================================================================= */}
      <section id="aris-7" className="scroll-mt-20">
        <SectionContainer
          badge="Khung Chuẩn Năng Lực & Danh Hiệu ARIS-7"
          title="ARIS-7: Bản đồ định vị năng lực & Hệ thống danh hiệu vinh danh thực chất"
          description="Mỗi cấp bậc định vị rõ hồ sơ năng lực và chuẩn đầu ra cụ thể. Sau khi đạt kết quả thi IELTS chính thức, học viên sẽ được Hội đồng học thuật ARIS trao tặng danh hiệu tương ứng."
          background="muted"
        >
          {/* Interactive Rank Component */}
          <AcademicRankSystem initialRank={5} />

          {/* Action CTA: Làm bài khảo thí chẩn đoán năng lực */}
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <div className="relative group inline-flex">
              {/* Soft ambient back-glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-red via-brand-red-hover to-brand-blue opacity-30 blur-xl group-hover:opacity-60 transition duration-500" />

              <button
                type="button"
                onClick={() => navigate("/assessment")}
                className="relative rounded-2xl px-6 sm:px-9 py-4 sm:py-5 bg-gradient-to-r from-brand-red via-[#E63946] to-[#D62828] text-white shadow-xl hover:shadow-2xl hover:shadow-brand-red/30 transition-all duration-300 gap-3 sm:gap-5 border border-white/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center text-left"
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-xs text-white shrink-0 shadow-inner">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="flex flex-col pr-1 sm:pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                      Làm bài khảo thí để xác định chính xác Rank của bạn
                    </span>
                    <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white/20 text-white border border-white/30">
                      60 Phút
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white/90 mt-0.5 flex items-center gap-1.5">
                    <span>Khảo thí 4 kỹ năng toàn diện</span>
                    <span className="opacity-60">•</span>
                    <span>Chuẩn Clean-Room NextBand</span>
                    <span className="opacity-60">•</span>
                    <span className="text-amber-200 font-bold">Hoàn toàn miễn phí</span>
                  </p>
                </div>

                <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 group-hover:bg-white/25 text-white shrink-0 transition-all duration-200 ml-auto sm:ml-2">
                  <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-foreground/75 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                Định vị chính xác Rank theo khung ARIS-7
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-blue shrink-0" />
                Nhận báo cáo bóc tách điểm nghẽn ngay sau khi nộp bài
              </span>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 05. SECTION 05: HOW YOU MOVE & PROOF (QUY TRÌNH RÈN LUYỆN & MINH CHỨNG)   */}
      {/* ========================================================================= */}
      <section id="how-you-move" className="scroll-mt-20">
        <SectionContainer
          badge="Quy Trình Rèn Luyện &amp; Minh Chứng"
          title="Phương pháp chỉ tạo ra kết quả khi đi kèm phản hồi có chủ đích"
          description="Mọi bài viết và bài nói của học viên đều được bóc tách chi tiết trên nền tảng NextBand LMS để chỉ rõ nguyên nhân vì sao câu chưa đạt và hướng dẫn tự sửa lại."
          background="default"
        >
          {/* 3 Steps: Practice -> Teacher Feedback -> NextBand Record */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-brand-blue-soft text-brand-blue w-fit">
                <PenTool className="h-5 w-5" />
              </div>
              <div className="font-mono text-xs font-bold text-muted-foreground uppercase">Bước 01</div>
              <h4 className="font-black text-foreground text-xl">Luyện Tập Có Mục Tiêu</h4>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Học viên thực hiện bài tập Writing hoặc Speaking trực tiếp trên nền tảng NextBand LMS theo từng chủ điểm học thuật.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-brand-blue-soft text-brand-blue w-fit">
                <Brain className="h-5 w-5" />
              </div>
              <div className="font-mono text-xs font-bold text-muted-foreground uppercase">Bước 02</div>
              <h4 className="font-black text-foreground text-xl">Phản Hồi &amp; Truy Vấn 1:1</h4>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Giáo viên bóc tách từng câu văn, đặt câu hỏi truy vấn để học viên tự nhận ra điểm nghẽn tư duy thay vì chỉ sửa lỗi ngữ pháp bề mặt.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-success/15 text-success w-fit">
                <FileCheck className="h-5 w-5" />
              </div>
              <div className="font-mono text-xs font-bold text-muted-foreground uppercase">Bước 03</div>
              <h4 className="font-black text-foreground text-xl">Lưu Vết Hồ Sơ Học Tập</h4>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Toàn bộ lịch sử bài nộp, nhận xét của giáo viên và kết quả đánh giá được lưu trữ minh bạch trên NextBand để theo dõi tiến độ.
              </p>
            </div>
          </div>

          {/* Socratic Feedback Dialogue Case Study */}
          <div className="pt-12 max-w-4xl mx-auto space-y-6 text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-lg bg-brand-blue-soft text-brand-blue">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Minh Họa Phản Hồi Socratic Thực Tế</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                Giáo viên không chỉ sửa câu — Giáo viên hỏi để bạn tự thấy vì sao câu sai
              </h3>
            </div>

            <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-2xs space-y-6">
              <div className="space-y-4">
                {/* Dialogue Step 1 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 rounded-full bg-destructive/15 text-destructive font-black text-xs flex items-center justify-center shrink-0 mt-1">
                    HV
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-foreground/90 space-y-1">
                    <div className="font-bold text-xs text-muted-foreground">Học viên viết:</div>
                    <div className="font-mono font-semibold">"Due to the weather is bad, we canceled the trip."</div>
                  </div>
                </div>

                {/* Dialogue Step 2 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 rounded-full bg-brand-blue-soft text-brand-blue font-black text-xs flex items-center justify-center shrink-0 mt-1">
                    GV
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-blue-soft/40 border border-brand-blue/20 text-xs sm:text-sm text-foreground space-y-2">
                    <div className="font-bold text-xs text-brand-blue">Giảng viên ARIS truy vấn:</div>
                    <p className="leading-relaxed">
                      "Sau cụm từ <strong>'Due to'</strong>, em đang dùng một Mệnh đề (Clause) hay một Cụm danh từ (Noun Phrase)? Vì sao trong trường hợp này ta không dùng một mệnh đề có động từ đứng độc lập?"
                    </p>
                  </div>
                </div>

                {/* Dialogue Step 3 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 rounded-full bg-destructive/15 text-destructive font-black text-xs flex items-center justify-center shrink-0 mt-1">
                    HV
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-foreground/90 space-y-1">
                    <div className="font-bold text-xs text-muted-foreground">Học viên nhận ra:</div>
                    <div>"Dạ, 'Due to' là giới từ nên phía sau phải là một cụm danh từ. Em đã bị quen miệng dịch từ 'bởi vì' trong tiếng Việt sang!"</div>
                  </div>
                </div>

                {/* Dialogue Step 4 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 rounded-full bg-success/15 text-success font-black text-xs flex items-center justify-center shrink-0 mt-1">
                    GV
                  </div>
                  <div className="p-4 rounded-2xl bg-success/10 border border-success/20 text-xs sm:text-sm text-foreground space-y-1">
                    <div className="font-bold text-xs text-success">Kết quả viết lại hoàn chỉnh:</div>
                    <div className="font-bold font-mono text-foreground break-words">
                      → "Due to adverse weather conditions, the trip was canceled."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 06. SECTION 06: ACTION CTA (ENTRY POINT)                                  */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-brand-blue text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/20 text-xs font-extrabold uppercase tracking-wider">
            <Target className="h-4 w-4 text-brand-cyan" />
            <span>Khảo Thí Năng Lực Đầu Vào</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Tìm hiểu vị trí khởi điểm phù hợp của bạn.
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Thực hiện bài đánh giá năng lực đầu vào chuẩn hóa để nhận báo cáo phân tích chi tiết về điểm mạnh, điểm nghẽn và cấp bậc năng lực học thuật tương ứng.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="rounded-2xl px-8 h-14 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-md gap-2"
            >
              <span>Đăng ký đánh giá đầu vào</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/courses")}
              className="rounded-2xl px-8 h-14 font-bold text-base border-2 border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white"
            >
              Khám phá các khóa học
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
