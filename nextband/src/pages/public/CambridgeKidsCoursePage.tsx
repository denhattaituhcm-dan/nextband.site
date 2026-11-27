import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { QuickTrialModal } from "@/components/public/QuickTrialModal";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  Volume2,
  Check,
  ChevronRight,
  Send,
  Zap,
  Target,
  Clock,
  Compass,
} from "lucide-react";

export default function CambridgeKidsCoursePage() {
  const navigate = useNavigate();
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"flyers" | "ket" | "pet">("flyers");

  // Sample Interactive Quick Quiz for Parents & Students
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const levelsData = {
    flyers: {
      badge: "Cấp độ 1 • 10 - 11 Tuổi",
      name: "CAMBRIDGE FLYERS (A2)",
      target: "Vững vàng ngữ pháp & Giao tiếp tự nhiên",
      desc: "Nấc thang cao nhất của hệ Young Learners (YLE). Giúp học sinh diễn đạt mạch lạc bằng câu phức, làm quen với cấu trúc bài đọc thông tin học thuật dài 150-200 từ.",
      stats: [
        { label: "Chuẩn đầu ra", val: "14 - 15 Khiên (A2)" },
        { label: "Vốn từ vựng", val: "1.200+ Từ" },
        { label: "Quy mô", val: "Tối đa 8 học viên" },
        { label: "Bệ phóng IELTS", val: "Tương đương 3.5 - 4.0" },
      ],
      skills: [
        "Nghe hiểu đoạn hội thoại dài và nhận diện chi tiết bẫy",
        "Đọc hiểu truyện ngắn, bản tin và bài giới thiệu khoa học",
        "Viết câu chuyện 3-5 câu dựa trên chuỗi tranh minh họa",
        "Nói tự tin về lý do, kế hoạch và quan điểm bản thân",
      ],
      gradient: "from-blue-600 to-cyan-500",
      accentBg: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    },
    ket: {
      badge: "Cấp độ 2 • 11 - 13 Tuổi",
      name: "A2 KEY / KET FOR SCHOOLS",
      target: "Tư duy học thuật & Viết luận văn ngắn",
      desc: "Bước chuyển bản lề sang hệ Cambridge General. Rèn luyện kỹ năng phân tích văn bản thực tế (báo chí, thông báo), viết email/ghi chú và phản xạ giao tiếp với giám khảo.",
      stats: [
        { label: "Chuẩn đầu ra", val: "Pass with Merit/Distinction" },
        { label: "Vốn từ vựng", val: "1.800+ Từ" },
        { label: "Quy mô", val: "Tối đa 8 học viên" },
        { label: "Bệ phóng IELTS", val: "Tương đương 4.0 - 4.5" },
      ],
      skills: [
        "Đọc hiểu bảng biểu thông tin, thông báo công cộng",
        "Viết email học thuật và mẩu truyện ngắn 35+ từ chuẩn cấu trúc",
        "Phản xạ trả lời phỏng vấn 1-1 với giám khảo theo chủ đề xã hội",
        "Nắm chắc ngữ pháp thời thì, câu điều kiện, câu bị động",
      ],
      gradient: "from-amber-600 to-orange-500",
      accentBg: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    },
    pet: {
      badge: "Cấp độ 3 • 12 - 15 Tuổi",
      name: "B1 PRELIMINARY / PET",
      target: "Trực diện tư duy IELTS 5.0 - 5.5+",
      desc: "Khóa học tinh hoa dành cho học sinh THCS định hướng thi chuyên hoặc lấy chứng chỉ IELTS sớm. Đào tạo tư duy lập luận phản biện, phân tích dữ liệu và viết luận 100 từ.",
      stats: [
        { label: "Chuẩn đầu ra", val: "B1 / B2 CEFR Quốc tế" },
        { label: "Vốn từ vựng", val: "2.500+ Từ học thuật" },
        { label: "Quy mô", val: "Tối đa 8 học viên" },
        { label: "Bệ phóng IELTS", val: "Tiến thẳng vào IELTS 5.5+" },
      ],
      skills: [
        "Đọc phân tích bài đọc báo chí dài 350+ từ, tìm ý chính và thái độ tác giả",
        "Viết bài luận văn (Essay) & Thư phản hồi 100 từ có dẫn chứng",
        "Thảo luận, tranh biện và bày tỏ quan điểm sâu sắc trong Speaking",
        "Sở hữu nền tảng từ vựng Collocation C1 cốt lõi của hệ ARIS",
      ],
      gradient: "from-emerald-600 to-teal-500",
      accentBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    },
  };

  const activeLevel = levelsData[activeTab];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Khóa Học Cambridge (FLYERS • KET • PET) — Bệ Phóng IELTS Cho Học Sinh 10-15 Tuổi"
        description="Chương trình đào tạo chứng chỉ quốc tế Cambridge Flyers, KET, PET tại ARIS. Chuẩn hóa ngữ pháp, tư duy phản biện, bước đệm vững vàng tiến tới IELTS 7.0+."
      />

      {/* Hero 3D Perspective Canvas */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-[#001733] text-white">
        {/* Glow ambient background lights */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/courses")}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full text-xs font-bold gap-2 -mt-4 border border-white/10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Tổng quan các khóa học ARIS</span>
            </Button>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm font-extrabold tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              <span>Chương Trình Học Thuật Thiếu Niên (10 - 15 Tuổi)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl">
              Hệ Đào Tạo Cambridge Quốc Tế <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-300 to-emerald-400">
                FLYERS • KET • PET
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-white/80 max-w-2xl leading-relaxed">
              Xóa bỏ việc học vẹt từ vựng. Đào tạo tư duy lập luận ngôn ngữ chuẩn mực từ cấp 2 – bệ phóng vững vàng tiến thẳng tới <strong>IELTS 6.5 - 7.5+</strong>.
            </p>

            {/* Quick Action Matrix */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setTrialModalOpen(true)}
                className="h-12 sm:h-14 px-8 rounded-2xl font-black text-base bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-xl shadow-brand-red/30 gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <span>Đăng ký khảo thí xếp lớp miễn phí</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("interactive-suite");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-12 sm:h-14 px-8 rounded-2xl font-bold text-base border-white/20 bg-white/5 hover:bg-white/15 text-white backdrop-blur-sm"
              >
                Trải nghiệm chuẩn đề thi
              </Button>
            </div>

            {/* Floating 3D Cards Metric Row */}
            <div className="w-full pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
              {[
                { icon: ShieldCheck, title: "Sĩ số tinh hoa", val: "Tối đa 8 học viên", sub: "Giáo viên tương tác 1-1" },
                { icon: Award, title: "Cam kết chuẩn CEFR", val: "100% Đầu ra", sub: "Có lộ trình học lại miễn phí" },
                { icon: GraduationCap, title: "Giảng viên", val: "IELTS 8.0+ & TESOL", sub: "Chuẩn phương pháp sư phạm" },
                { icon: Zap, title: "Hệ sinh thái số", val: "NextBand LMS 24/7", sub: "Tập dượt phòng thi thật" },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all"
                  >
                    <Icon className="h-6 w-6 text-cyan-400 mb-2.5" />
                    <div className="text-xs text-white/60 font-semibold">{card.title}</div>
                    <div className="text-base sm:text-lg font-black text-white mt-0.5">{card.val}</div>
                    <div className="text-[11px] text-white/50 mt-1">{card.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Level Navigator */}
      <section className="py-16 sm:py-24 bg-card border-b border-border/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-black tracking-widest text-primary uppercase">
              Lộ Trình Học Thuật Theo Độ Tuổi
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">
              Chọn Cấp Độ Phù Hợp Với Học Sinh
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Nhấp chuyển đổi để khám phá mục tiêu, vốn từ vựng và năng lực đạt được của từng chặng
            </p>
          </div>

          {/* Segmented 3D Controller */}
          <div className="flex justify-center">
            <div className="p-1.5 rounded-2xl bg-muted/60 border border-border inline-flex gap-2 shadow-inner">
              {[
                { id: "flyers", label: "1. FLYERS", age: "10-11 Tuổi" },
                { id: "ket", label: "2. KET (A2 Key)", age: "11-13 Tuổi" },
                { id: "pet", label: "3. PET (B1 Preliminary)", age: "12-15 Tuổi" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center gap-1 sm:gap-2 ${
                    activeTab === tab.id
                      ? "bg-background text-primary shadow-md border border-border/80 scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-normal opacity-75">({tab.age})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Level Showcase 3D Display Panel */}
          <div className="rounded-3xl border-2 border-border/80 bg-background p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Core Identity */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-black tracking-wider uppercase bg-primary/10 text-primary border-primary/20">
                  <Compass className="h-3.5 w-3.5" />
                  <span>{activeLevel.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-foreground">
                  {activeLevel.name}
                </h3>
                <p className="text-sm sm:text-base font-bold text-primary">
                  Mục tiêu trọng tâm: {activeLevel.target}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeLevel.desc}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {activeLevel.stats.map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-muted/40 border border-border/60">
                      <div className="text-[11px] font-semibold text-muted-foreground">{s.label}</div>
                      <div className="text-sm sm:text-base font-black text-foreground mt-0.5">{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Competencies Card */}
              <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-xs font-black uppercase text-foreground">
                    Kỹ Năng Đạt Được Sau Khóa
                  </span>
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>

                <ul className="space-y-3">
                  {activeLevel.skills.map((skill, si) => (
                    <li key={si} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-snug">{skill}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/60">
                  <Button
                    onClick={() => setTrialModalOpen(true)}
                    className="w-full h-11 font-black bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    <span>Nhận tư vấn & xếp lịch test {activeTab.toUpperCase()}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick-Test Challenge (Đặc quyền số NextBand) */}
      <section id="interactive-suite" className="py-16 sm:py-24 bg-muted/30 border-b border-border/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Thử Thách Trực Quan 30 Giây</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">
              Bé Có Nhận Ra Lỗi Sai Của Đề Thi KET / PET Này Không?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Đề thi Cambridge kiểm tra khả năng sử dụng ngữ cảnh thực tế, không học vẹt ngữ pháp.
            </p>
          </div>

          {/* Interactive Question Card */}
          <div className="rounded-2xl border-2 border-border bg-card p-6 sm:p-8 text-left space-y-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
              <span className="font-bold text-foreground">Dạng bài: KET Reading & Writing Part 5</span>
              <span className="text-primary font-bold">Độ khó: Level A2/B1</span>
            </div>

            <div className="text-sm sm:text-base text-foreground font-medium leading-relaxed bg-muted/30 p-4 rounded-xl border border-border/60">
              "If you want to join the science club, you must sign up before Friday. There are only a few places _______."
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["A. leaving", "B. left", "C. leaves"].map((opt, i) => (
                <button
                  key={i}
                  disabled={quizSubmitted}
                  onClick={() => {
                    setSelectedAnswer(i);
                    setQuizSubmitted(true);
                  }}
                  className={`p-3.5 rounded-xl border text-sm font-bold transition-all text-left flex items-center justify-between ${
                    quizSubmitted
                      ? i === 1
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black"
                        : selectedAnswer === i
                        ? "border-red-500 bg-red-500/10 text-red-600"
                        : "opacity-60 border-border"
                      : selectedAnswer === i
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <span>{opt}</span>
                  {quizSubmitted && i === 1 && <Check className="h-4 w-4 text-emerald-500" />}
                </button>
              ))}
            </div>

            {/* Explanation Drawer */}
            {quizSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="font-black flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  <span>Giải thích học thuật ARIS:</span>
                </div>
                <p className="leading-relaxed">
                  Đáp án chính xác là <strong>B. left</strong> (dạng rút gọn của mệnh đề quan hệ bị động: <em>"places which are left"</em> = các vị trí còn sót lại). Học viên học theo phương pháp tư duy ARIS sẽ hiểu ngay bản chất câu mà không cần đoán mò.
                </p>
                <div className="pt-2">
                  <Button
                    size="sm"
                    onClick={() => setTrialModalOpen(true)}
                    className="font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Đăng ký làm trọn vẹn đề test 15 phút cho con
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-14 sm:py-20 bg-[#002147] text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Sẵn Sàng Đặt Nền Tảng IELTS Cho Con Ngay Hôm Nay?
          </h2>
          <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Học viên được đánh giá năng lực 1-1 với giáo viên chuyên môn và nhận phân tích chi tiết lỗ hổng ngôn ngữ hoàn toàn miễn phí.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => setTrialModalOpen(true)}
              className="h-12 sm:h-14 px-8 rounded-2xl font-black text-base bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-xl shadow-brand-red/30 gap-2.5"
            >
              <span>Đăng Ký Đánh Giá 1-1 Cho Bé</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Trial Modal */}
      <QuickTrialModal
        isOpen={trialModalOpen}
        onOpenChange={setTrialModalOpen}
        initialCourseSlug="cambridge-kids"
      />
    </div>
  );
}
