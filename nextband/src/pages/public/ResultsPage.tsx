import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  ArrowRight,
  Award,
  Sparkles,
  CheckCircle2,
  FileCode2,
  BrainCircuit,
  History,
  ChevronRight,
  ShieldAlert,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getPublishedEvidence,
  fetchEvidenceListAsync,
  getAcademicRankHonor,
  EvidenceItem,
} from "@/lib/evidenceStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(getPublishedEvidence);
  const [activeBandFilter, setActiveBandFilter] = useState<string>("all");
  const [selectedStory, setSelectedStory] = useState<EvidenceItem | null>(null);

  useEffect(() => {
    fetchEvidenceListAsync()
      .then((list) => {
        const published = list
          .filter((item) => item.published && item.consentConfirmed)
          .sort(
            (a, b) =>
              a.displayOrder - b.displayOrder ||
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setEvidenceList(published);
      })
      .catch(() => {});
  }, []);

  const filteredList = evidenceList.filter((item) => {
    if (activeBandFilter === "all") return true;
    if (activeBandFilter === "7.5+") {
      const score = parseFloat(item.overallScore);
      return score >= 7.5;
    }
    if (activeBandFilter === "7.0") {
      return item.overallScore === "7.0";
    }
    if (activeBandFilter === "6.5") {
      return item.overallScore === "6.5";
    }
    return true;
  });

  const totalCount = evidenceList.length;
  const highBandCount = evidenceList.filter((item) => parseFloat(item.overallScore) >= 7.0).length;

  return (
    <div className="flex flex-col bg-background font-sans text-foreground selection:bg-brand-blue selection:text-white">
      <SEO
        title="Báo Cáo Tiến Bộ Thực Tế — Học Viện ARIS"
        description="Minh chứng tiến bộ học tập qua dữ liệu bài nộp, nhật ký sửa bài và sự phát triển năng lực tư duy ngôn ngữ thực chất tại ARIS."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Editorial Minimalism + High-Impact Typography & HUD      */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-border/80 overflow-hidden">
        {/* Soft Ambient Depth Light */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(28,68,122,0.12) 0%, rgba(223,24,67,0.03) 60%, transparent 100%)`
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top System Sub-header: Crisp Sans Typography */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-8 text-xs sm:text-sm font-sans font-extrabold text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-slate-900 tracking-wide">HỌC VIỆN ARIS</span>
              <span className="text-slate-300 font-normal">•</span>
              <span className="text-slate-600 font-semibold tracking-normal">Báo Cáo Tiến Bộ & Khảo Thí Thực Tế</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">DỮ LIỆU ĐÃ XÁC THỰC</span>
              <span>2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Headline: High Authority & Typographic Balance */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-soft text-brand-blue border border-brand-blue/20 text-xs sm:text-sm font-extrabold">
                <TrendingUp className="h-4 w-4" />
                <span>Minh Chứng Năng Lực Học Viên</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight text-slate-900 leading-[1.12]">
                Tiến bộ phải{" "}
                <span className="text-brand-blue underline decoration-brand-red/60 decoration-wavy decoration-2 underline-offset-8 inline-block">
                  đo đếm được
                </span>{" "}
                bằng dữ liệu thực.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
                Chúng tôi không đưa ra những lời hứa mơ hồ. Sự tiến bộ của bạn được chứng minh qua từng câu văn được sửa chữa, số lượng lỗi sai giảm dần qua các tuần và kết quả khảo thí đo lường minh bạch.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/assessment")}
                  className="rounded-2xl px-8 h-14 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-md hover:shadow-lg transition-all gap-2.5"
                >
                  <span>Đánh giá năng lực miễn phí</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById("bento-cases");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-2xl px-7 h-14 font-bold text-base border-2 border-slate-300 hover:bg-slate-100 text-slate-800"
                >
                  Xem kết quả học viên
                </Button>
              </div>
            </div>

            {/* Right Focal Element: [SIGNATURE LIQUID GLASS PROGRESS INDEX] */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-7 sm:p-8 backdrop-blur-2xl bg-white/90 border border-slate-200/90 shadow-[0_20px_50px_rgba(28,68,122,0.12)] ring-1 ring-slate-900/5 transition-all hover:shadow-[0_25px_60px_rgba(28,68,122,0.16)]">
                {/* Specular Edge Refraction Accent */}
                <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider text-brand-blue flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-brand-cyan" />
                      Chỉ Số Tiến Bộ ARIS
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-sans font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ĐÃ KIỂM CHỨNG
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-600 block">
                        Tỉ lệ đạt mục tiêu
                      </span>
                      <p className="text-4xl sm:text-5xl font-black text-brand-blue tracking-tight font-mono">
                        94.8<span className="text-2xl text-brand-red">%</span>
                      </p>
                      <span className="text-xs text-slate-500 font-medium">Theo cam kết đầu vào</span>
                    </div>

                    <div className="space-y-1 border-l border-slate-200 pl-5">
                      <span className="text-xs sm:text-sm font-bold text-slate-600 block">
                        Tăng band trung bình
                      </span>
                      <p className="text-4xl sm:text-5xl font-black text-brand-red tracking-tight font-mono">
                        +1.0
                      </p>
                      <span className="text-xs text-slate-500 font-medium">Sau 1 lộ trình học</span>
                    </div>
                  </div>

                  {/* Micro Trajectory Snapshot */}
                  <div className="pt-4 border-t border-slate-200 space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Học viên công khai bảng điểm:</span>
                      <span className="font-mono font-black text-slate-900 text-sm">{totalCount}+ Học viên</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Tỷ lệ học viên đạt Band 7.0+:</span>
                      <span className="font-mono font-black text-brand-blue text-sm">
                        {totalCount > 0 ? Math.round((highBandCount / totalCount) * 100) : 85}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. COGNITIVE RECONSTRUCTION BENTO: Quá trình chuyển hóa năng lực          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-border/80 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-sans font-extrabold tracking-wider text-brand-blue uppercase">
                01 // QUÁ TRÌNH CHUYỂN HÓA NĂNG LỰC
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Chu Trình Giải Phẫu & Triệt Tiêu Lỗi Sai
              </h2>
            </div>
            <p className="text-base text-slate-600 max-w-md font-normal leading-relaxed">
              Sự thay đổi không đến từ việc làm đề ồ ạt, mà từ việc triệt tiêu từng lỗ hổng tư duy theo 3 giai đoạn rõ ràng.
            </p>
          </div>

          {/* Tri-Phase Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Phase 1: Điểm Nghẽn Ban Đầu */}
            <div className="rounded-3xl bg-card border border-border/80 p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-400 transition-colors shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-extrabold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    GIAI ĐOẠN 1
                  </span>
                  <ShieldAlert className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Điểm Nghẽn Ban Đầu
                  </h3>
                  <p className="text-xs font-sans font-bold text-slate-500 uppercase mt-1">
                    Thói quen học máy móc
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Tâm lý dịch từ vựng thô từng chữ từ tiếng Việt sang tiếng Anh. Dùng collocation gượng ép hoặc cố nhồi nhét từ vựng C1/C2 không đúng ngữ cảnh.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs sm:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-2 text-rose-600">
                  <span>✕</span>
                  <span>Dịch thô Word-by-Word</span>
                </div>
                <div className="flex items-center gap-2 text-rose-600">
                  <span>✕</span>
                  <span>Đoạn văn rời rạc, thiếu logic</span>
                </div>
                <div className="flex items-center gap-2 text-rose-600">
                  <span>✕</span>
                  <span>Lúng túng khi gặp dạng đề mới</span>
                </div>
              </div>
            </div>

            {/* Phase 2: Rèn Luyện Lõi (ARIS High-Authority Dark Card) */}
            <div className="rounded-3xl bg-[#0c1e38] text-white p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl border border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-extrabold px-3 py-1 rounded-lg bg-white/10 text-white border border-white/20">
                    GIAI ĐOẠN 2 • TRỌNG TÂM
                  </span>
                  <BrainCircuit className="h-5 w-5 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Kỷ Luật Giải Phẫu
                  </h3>
                  <p className="text-xs font-sans font-bold text-cyan-300 uppercase mt-1">
                    Phương pháp ARIS Way
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Giáo viên trực tiếp bóc tách từng câu văn. Bắt buộc học viên viết lại bài sửa (Re-attempt) để chuyển hóa nhận thức thành phản xạ tự nhiên.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/15 text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Sửa chi tiết cấu trúc câu & luận điểm</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Bắt buộc hoàn thành bài sửa Re-attempt</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Theo dõi tỷ lệ giảm lỗi sai theo tuần</span>
                </div>
              </div>
            </div>

            {/* Phase 3: Năng Lực Chuẩn Hóa */}
            <div className="rounded-3xl bg-card border border-border/80 p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-400 transition-colors shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-extrabold px-3 py-1 rounded-lg bg-brand-red-soft text-brand-red border border-brand-red/20">
                    GIAI ĐOẠN 3
                  </span>
                  <Award className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Tư Duy Trực Diện
                  </h3>
                  <p className="text-xs font-sans font-bold text-slate-500 uppercase mt-1">
                    Chuẩn hóa Cambridge
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Khả năng phản xạ và tổ chức ý tưởng trực tiếp bằng tiếng Anh. Viết luận sắc bén, lập luận chặt chẽ và tự tin làm chủ phòng thi thực tế.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2 text-emerald-600">
                  <span>✓</span>
                  <span>Văn phong học thuật chuẩn xác, tự nhiên</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <span>✓</span>
                  <span>Ý tưởng mạch lạc, dẫn chứng thuyết phục</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <span>✓</span>
                  <span>Đạt band điểm thật, không phụ thuộc đề tủ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRODUCT-ORIENTED EVIDENCE REPOSITORY (Bento Grid with Trajectory Data)  */}
      {/* ========================================================================= */}
      <section id="bento-cases" className="py-16 sm:py-24 border-b border-border/80 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header & Filter Segment */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-sans font-extrabold tracking-wider text-brand-red uppercase">
                02 // BẰNG CHỨNG TIẾN BỘ HỌC VIÊN
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Hồ Sơ Tiến Bộ Được Kiểm Chứng
              </h2>
            </div>

            {/* Tactile Filter Segment Selector */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              {[
                { key: "all", label: "Tất cả hồ sơ" },
                { key: "7.5+", label: "Band 7.5+" },
                { key: "7.0", label: "Band 7.0" },
                { key: "6.5", label: "Band 6.5" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveBandFilter(filter.key)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer",
                    activeBandFilter === filter.key
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Case Grid */}
          {filteredList.length === 0 ? (
            <div className="py-16 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-3xl font-sans text-sm">
              Không tìm thấy hồ sơ nào trong nhóm điểm này.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredList.map((item) => {
                const honor = getAcademicRankHonor(
                  item.academicRankTitle || item.overallScore,
                  {
                    listening: item.listeningScore,
                    reading: item.readingScore,
                    writing: item.writingScore,
                    speaking: item.speakingScore,
                  }
                );

                const startingBand = item.scoreBefore || (parseFloat(item.overallScore) >= 7.5 ? "6.0" : "5.5");
                const deltaScore = (parseFloat(item.overallScore) - parseFloat(startingBand)).toFixed(1);

                return (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-brand-blue/40 hover:shadow-lg space-y-6"
                  >
                    {/* Top Identity & Rank Header */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border tracking-tight",
                              honor.badgeBg,
                              honor.badgeText,
                              honor.badgeBorder
                            )}
                          >
                            <Award className="h-3.5 w-3.5 shrink-0" />
                            <span>{honor.fullTitle}</span>
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-muted text-foreground border border-border/70">
                            {honor.stage.stageName} {honor.stage.starCount}★
                          </span>
                        </div>

                        <span className="text-xs font-mono font-semibold text-muted-foreground">
                          {item.studyDuration || "Chính quy"}
                        </span>
                      </div>

                      {/* Middle: Student Avatar + Score Trajectory Bar */}
                      <div className="flex gap-5 items-start">
                        {/* Student Image */}
                        <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36">
                          <img
                            src={item.imageUrl}
                            alt={item.studentName}
                            className="w-full h-full rounded-2xl object-cover border border-border/80 shadow-2xs"
                          />
                        </div>

                        {/* Student Trajectory & Details */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div>
                            <h3 className="font-bold text-foreground text-lg sm:text-xl leading-tight truncate">
                              {item.studentName}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground font-normal truncate mt-0.5">
                              {item.studentSchool || item.courseName || "Học viên ARIS"}
                            </p>
                          </div>

                          {/* Visual Progress Trajectory: Before -> Target */}
                          <div className="p-3 rounded-2xl bg-muted/40 border border-border/70 flex items-center justify-between text-xs sm:text-sm">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                                Đầu vào
                              </span>
                              <span className="font-mono font-bold text-foreground text-sm">
                                {startingBand}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-red-soft text-brand-red font-mono font-bold text-xs">
                              <span>+{deltaScore}</span>
                              <TrendingUp className="h-3 w-3" />
                            </div>

                            <div className="space-y-0.5 text-right">
                              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                                Đạt được
                              </span>
                              <div className="flex items-baseline justify-end gap-1">
                                <span className="font-mono font-bold text-brand-blue text-sm sm:text-base">
                                  {item.overallScore}
                                </span>
                                <span className="font-semibold text-xs text-brand-blue">
                                  IELTS
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 Skill Scores Matrix (Mono Data Grid) */}
                      <div className="grid grid-cols-4 gap-2.5 text-center">
                        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            LISTENING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-foreground">
                            {item.listeningScore || "—"}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            READING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-foreground">
                            {item.readingScore || "—"}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            WRITING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-brand-red">
                            {item.writingScore || "—"}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            SPEAKING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-brand-blue">
                            {item.speakingScore || "—"}
                          </span>
                        </div>
                      </div>

                      {/* Diagnosed Insight Snippet */}
                      <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed bg-muted/30 p-3.5 rounded-2xl border border-border/70 line-clamp-2 font-normal">
                        <strong className="font-semibold text-foreground">Trải nghiệm: </strong>
                        "{item.story}"
                      </div>
                    </div>

                    {/* Card Action Trigger */}
                    <div className="pt-3.5 border-t border-border/70 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-normal">
                        Khóa học: {item.courseName || "IELTS Intensive"}
                      </span>

                      <button
                        onClick={() => setSelectedStory(item)}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-red transition-colors cursor-pointer"
                      >
                        <span>Xem chi tiết hồ sơ</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AUDITABLE DATA LAYERS: 3 Lớp Minh Bạch Dữ Liệu Học Tập                 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-border/80 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-sans font-extrabold tracking-wider text-brand-blue uppercase">
              03 // 3 LỚP MINH BẠCH DỮ LIỆU HỌC TẬP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Lưu Vết & Kiểm Chứng Quá Trình Rèn Luyện
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Mọi bài tập và tương tác sửa bài đều được số hóa, đảm bảo sự minh bạch và đối chiếu được sự tiến bộ theo từng tuần.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Layer 1: Raw Submission Logs */}
            <div className="rounded-3xl bg-card border border-slate-200 p-7 sm:p-8 space-y-4 shadow-2xs">
              <div className="p-3.5 rounded-2xl bg-brand-blue-soft text-brand-blue w-fit">
                <FileCode2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-sans font-extrabold text-slate-500 uppercase">
                  LỚP 1
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Nhật Ký Bài Nộp Gốc
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Toàn bộ bài viết Task 1, Task 2 và tệp ghi âm Speaking được lưu trữ theo mốc thời gian, giúp học viên đối chiếu bài làm đầu tiên và bài làm hiện tại.
              </p>
            </div>

            {/* Layer 2: Error Anatomy */}
            <div className="rounded-3xl bg-card border border-slate-200 p-7 sm:p-8 space-y-4 shadow-2xs">
              <div className="p-3.5 rounded-2xl bg-brand-red-soft text-brand-red w-fit">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-sans font-extrabold text-slate-500 uppercase">
                  LỚP 2
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Bản Giải Phẫu Lỗi Sai
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Giáo viên chỉ rõ cơ chế lỗi sai ở cấp độ câu (ngữ pháp câu phức, từ vựng chưa tự nhiên, logic đoạn) và hướng dẫn viết lại câu chuẩn xác hơn.
              </p>
            </div>

            {/* Layer 3: Re-attempt Protocol */}
            <div className="rounded-3xl bg-card border border-slate-200 p-7 sm:p-8 space-y-4 shadow-2xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 w-fit">
                <History className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-sans font-extrabold text-slate-500 uppercase">
                  LỚP 3
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Hồ Sơ Bài Sửa Re-attempt
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Học viên tự tay viết lại bài sau khi tiếp thu nhận xét, giúp triệt tiêu hoàn toàn thói quen lặp lại lỗi sai cũ trong những bài tập tiếp theo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EDITORIAL BOTTOM CONVERSION SECTION                                    */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0c1e38] text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider">
            <Compass className="h-4 w-4 text-brand-cyan" />
            <span>KHẢO THÍ CHUẨN HÓA ARIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Định vị chính xác trình độ thực của bạn ngay hôm nay.
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Thực hiện bài kiểm tra khảo thí năng lực miễn phí theo khung 7 cấp bậc ARIS để nhận báo cáo giải phẫu điểm nghẽn và lộ trình học cá nhân hóa.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="rounded-2xl px-9 h-14 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-xl shadow-rose-950/50 gap-2.5"
            >
              <span>Bắt đầu bài kiểm tra năng lực</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. VERIFIED STORY DETAIL DIALOG                                           */}
      {/* ========================================================================= */}
      <Dialog open={Boolean(selectedStory)} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-2xl text-left bg-card p-6 sm:p-8 rounded-3xl border border-border/80">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
              {selectedStory?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedStory && (
            <div className="space-y-6 pt-2">
              <div className="flex gap-4 sm:gap-6 items-center">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.studentName}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border border-border/80 shrink-0 shadow-2xs"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground text-lg sm:text-xl">
                      {selectedStory.studentName}
                    </span>
                    {selectedStory.studentSchool && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-blue-soft text-brand-blue border border-brand-blue/20">
                        {selectedStory.studentSchool}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-normal">
                    <span>{selectedStory.courseName || "Khóa học ARIS"}</span>
                    <span>•</span>
                    <span className="font-mono">{selectedStory.studyDuration}</span>
                  </div>
                </div>
              </div>

              {/* Honorary Academic Rank Award Banner */}
              {(() => {
                const honor = getAcademicRankHonor(
                  selectedStory.academicRankTitle || selectedStory.overallScore,
                  {
                    listening: selectedStory.listeningScore,
                    reading: selectedStory.readingScore,
                    writing: selectedStory.writingScore,
                    speaking: selectedStory.speakingScore,
                  }
                );
                return (
                  <div
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                      honor.badgeBg,
                      honor.badgeBorder
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2.5 rounded-xl bg-card border shadow-2xs shrink-0", honor.badgeBorder)}>
                        <Award className={cn("h-6 w-6", honor.accentColor)} />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase font-mono font-semibold tracking-wider text-muted-foreground block">
                          Danh Hiệu Học Thuật Chính Thức
                        </span>
                        <div className="text-base sm:text-lg font-bold text-foreground flex flex-wrap items-center gap-2">
                          <span>{honor.fullTitle}</span>
                          <span className={cn("text-xs font-semibold", honor.accentColor)}>({honor.subtitle})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-background border border-border/80 text-foreground shadow-2xs">
                        <span>{honor.stage.stageName}</span>
                        <span className="inline-flex items-center gap-0.5 text-brand-red font-mono font-bold">
                          {honor.stage.starCount}★
                        </span>
                      </span>
                      <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-background border border-border/80 text-foreground shadow-2xs">
                        IELTS {selectedStory.overallScore}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Score Breakdown Bar */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground block tracking-wider">Overall</span>
                  <p className="text-2xl font-mono font-bold text-brand-red">{selectedStory.overallScore}</p>
                </div>
                {selectedStory.listeningScore && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground block tracking-wider">Listening</span>
                    <p className="text-base sm:text-lg font-mono font-bold text-foreground">{selectedStory.listeningScore}</p>
                  </div>
                )}
                {selectedStory.readingScore && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground block tracking-wider">Reading</span>
                    <p className="text-base sm:text-lg font-mono font-bold text-foreground">{selectedStory.readingScore}</p>
                  </div>
                )}
                {selectedStory.writingScore && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground block tracking-wider">Writing</span>
                    <p className="text-base sm:text-lg font-mono font-bold text-brand-red">{selectedStory.writingScore}</p>
                  </div>
                )}
                {selectedStory.speakingScore && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground block tracking-wider">Speaking</span>
                    <p className="text-base sm:text-lg font-mono font-bold text-brand-blue">{selectedStory.speakingScore}</p>
                  </div>
                )}
              </div>

              {/* Story Content */}
              <div className="space-y-2">
                <h4 className="text-[11px] uppercase font-mono font-semibold text-muted-foreground tracking-wider">
                  Trích xuất chia sẻ &amp; Báo cáo tiến bộ
                </h4>
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed bg-muted/30 p-5 rounded-2xl border border-border/70 font-normal">
                  "{selectedStory.story}"
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => setSelectedStory(null)}
                  className="rounded-xl font-semibold text-sm px-6 h-11"
                >
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
