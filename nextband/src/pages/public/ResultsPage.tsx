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
  Activity,
  Zap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getPublishedEvidence,
  fetchEvidenceListAsync,
  getAcademicRankHonor,
  getKimKhoaHonors,
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

  return (
    <div className="flex flex-col bg-background font-sans text-foreground selection:bg-brand-blue selection:text-white">
      <SEO
        title="Báo Cáo Tiến Bộ Thực Tế — Học Viện ARIS"
        description="Minh chứng tiến bộ học tập qua dữ liệu bài nộp, nhật ký sửa bài và sự phát triển năng lực tư duy ngôn ngữ thực chất tại ARIS."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Stripe-Inspired Living Mesh Aurora & Telemetry Engine     */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-border/80 overflow-hidden bg-white">
        {/* Stripe-inspired Living Mesh Aurora Gradient & Diagonal Light Architecture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top Right Iris-Cyan Aurora Orb */}
          <div className="absolute -top-40 -right-32 w-[650px] h-[650px] bg-gradient-to-br from-[#635bff]/12 via-[#00d4ff]/10 to-transparent rounded-full blur-3xl opacity-85 transform rotate-12" />
          {/* Left Academic Crimson Ambient Flare */}
          <div className="absolute top-1/4 -left-32 w-[520px] h-[520px] bg-gradient-to-tr from-[#df1843]/08 via-[#635bff]/06 to-transparent rounded-full blur-3xl opacity-70" />
          {/* Bottom Emerald-Cyan Radar Bloom */}
          <div className="absolute -bottom-32 right-1/4 w-[460px] h-[460px] bg-gradient-to-tl from-[#00f5a0]/08 via-[#00d4ff]/08 to-transparent rounded-full blur-3xl opacity-70" />
          {/* Micro dot-grid matrix texture (Stripe aesthetic) */}
          <div 
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `radial-gradient(#94a3b8 0.8px, transparent 0.8px)`,
              backgroundSize: "24px 24px"
            }}
          />
          {/* Diagonal luminous accent beam (Signature Stripe 3D Slant) */}
          <div 
            className="absolute -top-24 right-0 w-3/4 h-96 opacity-20 pointer-events-none transform -skew-y-6"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(99,91,255,0.25) 50%, rgba(0,212,255,0.35) 100%)",
              filter: "blur(45px)"
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top System Sub-header: Crisp Telemetry Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 mb-8 text-xs sm:text-sm font-sans font-extrabold text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red" />
              </span>
              <span className="text-slate-900 tracking-wide font-black">HỌC VIỆN ARIS</span>
              <span className="text-slate-300 font-normal">•</span>
              <span className="text-slate-600 font-semibold tracking-normal">Báo Cáo Tiến Bộ & Khảo Thí Thực Tế</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                DỮ LIỆU ĐÃ XÁC THỰC
              </span>
              <span className="text-slate-300">|</span>
              <span>ARIS VERIFIED 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Headline: High Authority & Typographic Balance */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-blue-soft via-indigo-50 to-brand-blue-soft text-brand-blue border border-brand-blue/20 text-xs sm:text-sm font-extrabold shadow-2xs">
                <TrendingUp className="h-4 w-4 text-brand-blue" />
                <span>Minh Chứng Năng Lực Học Viên</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight text-slate-900 leading-[1.12]">
                Tiến bộ phải{" "}
                <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-red bg-clip-text text-transparent underline decoration-brand-red/40 decoration-wavy decoration-2 underline-offset-8 inline-block">
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
                  className="rounded-2xl px-8 h-14 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-[0_10px_25px_-5px_rgba(223,24,67,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(223,24,67,0.45)] transition-all gap-2.5 hover:-translate-y-0.5 cursor-pointer"
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
                  className="rounded-2xl px-7 h-14 font-bold text-base border-2 border-slate-200 bg-white/80 backdrop-blur-xs hover:bg-slate-50 hover:border-slate-300 text-slate-800 transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
                >
                  Xem kết quả học viên
                </Button>
              </div>
            </div>

            {/* Right Focal Element: [STRIPE-STYLE LIVING PROGRESS TELEMETRY CARD] */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Multi-layered Chromatic Ambient Glow (Stripe signature aura) */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#00d4ff]/25 via-[#635bff]/20 to-[#df1843]/15 rounded-[2.5rem] blur-xl opacity-80 group-hover:opacity-100 transition-all duration-500 -z-10" />

                {/* Main Glassmorphism Card */}
                <div className="relative rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-white/95 border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.9)_inset] space-y-6">
                  {/* Specular Edge Refraction Accent (Top Prism Line) */}
                  <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-80" />

                  {/* Card Header: Live Telemetry Indicator */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono font-black tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
                        <span>ARIS BAND ENGINE</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-600 font-bold">TELEMETRY</span>
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      AUTO-AUDITED
                    </span>
                  </div>

                  {/* Key Metrics Split Display */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1 relative overflow-hidden">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-[11px] sm:text-xs font-bold">Tỉ lệ đạt mục tiêu</span>
                        <Activity className="h-3.5 w-3.5 text-brand-blue opacity-70" />
                      </div>
                      <p className="text-3xl sm:text-4xl font-black text-brand-blue tracking-tight font-mono">
                        94.8<span className="text-xl text-brand-red font-bold">%</span>
                      </p>
                      <span className="text-[11px] text-slate-500 font-medium block">Theo cam kết đầu vào</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1 relative overflow-hidden">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-[11px] sm:text-xs font-bold">Tăng band trung bình</span>
                        <Zap className="h-3.5 w-3.5 text-brand-red opacity-70" />
                      </div>
                      <p className="text-3xl sm:text-4xl font-black text-brand-red tracking-tight font-mono">
                        +1.0
                      </p>
                      <span className="text-[11px] text-slate-500 font-medium block">Sau 1 lộ trình chuẩn</span>
                    </div>
                  </div>

                  {/* Stripe-style Trajectory Curve (SVG Sparkline showing Band Evolution) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0a2540] text-white space-y-3 shadow-inner relative overflow-hidden">
                    {/* Subtle grid pattern inside */}
                    <div 
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
                        backgroundSize: "20px 20px"
                      }}
                    />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                        QUỸ ĐẠO TIẾN BỘ CHUẨN HOÁ
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-200 border border-white/15">
                        12 TUẦN
                      </span>
                    </div>

                    {/* SVG Trajectory Chart */}
                    <div className="relative z-10 pt-1 pb-1">
                      <svg viewBox="0 0 320 85" className="w-full h-20 overflow-visible">
                        <defs>
                          <linearGradient id="stripeCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00d4ff" />
                            <stop offset="50%" stopColor="#635bff" />
                            <stop offset="100%" stopColor="#df1843" />
                          </linearGradient>
                          <linearGradient id="stripeFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path
                          d="M 10 70 C 70 65, 120 48, 170 38 C 220 28, 270 16, 310 12 L 310 80 L 10 80 Z"
                          fill="url(#stripeFillGradient)"
                        />

                        {/* Trajectory Stroke */}
                        <path
                          d="M 10 70 C 70 65, 120 48, 170 38 C 220 28, 270 16, 310 12"
                          fill="none"
                          stroke="url(#stripeCurveGradient)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Node 1: Entry */}
                        <circle cx="10" cy="70" r="4" fill="#00d4ff" stroke="#0a2540" strokeWidth="2" />
                        <text x="10" y="82" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold">Band 5.5</text>

                        {/* Node 2: Mid-term */}
                        <circle cx="170" cy="38" r="4" fill="#635bff" stroke="#0a2540" strokeWidth="2" />
                        <text x="140" y="52" fill="#cbd5e1" fontSize="8" fontFamily="monospace" fontWeight="bold">Tuần 6: 6.5</text>

                        {/* Node 3: Target Peak */}
                        <circle cx="310" cy="12" r="5" fill="#df1843" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="310" cy="12" r="9" fill="none" stroke="#df1843" strokeWidth="1.5" opacity="0.6" className="animate-ping origin-center" />
                        <text x="255" y="8" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">Đích: 7.5+</text>
                      </svg>
                    </div>

                    {/* Micro Telemetry Metric row: Error Reduction */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                      <span className="text-slate-300 text-[11px] font-medium">Tỷ lệ triệt tiêu lỗi lập luận:</span>
                      <span className="font-mono font-black text-emerald-400 text-xs flex items-center gap-1">
                        <span>-78.4%</span>
                        <span className="text-[10px] text-slate-400">(Sau 8 tuần)</span>
                      </span>
                    </div>
                  </div>

                  {/* Micro Snapshot Counts */}
                  <div className="pt-1 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-brand-blue" />
                        Học viên công khai bảng điểm:
                      </span>
                      <span className="font-mono font-black text-slate-900">{totalCount}+ Học viên</span>
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
      <section className="py-16 sm:py-24 border-b border-border/80 bg-slate-50/60 relative overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-b from-[#635bff]/06 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-sans font-extrabold tracking-wider text-brand-blue uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                01 // QUÁ TRÌNH CHUYỂN HÓA NĂNG LỰC
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Chu Trình Giải Phẫu & Triệt Tiêu Lỗi Sai
              </h2>
            </div>
            <p className="text-base text-slate-600 max-w-md font-normal leading-relaxed">
              Sự thay đổi không đến từ việc làm đề ồ ạt, mà từ việc triệt tiêu từng lỗ hổng tư duy theo 3 giai đoạn rõ ràng và kiểm chứng được.
            </p>
          </div>

          {/* Tri-Phase Bento Cards (Stripe Feature Grid Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Phase 1: Điểm Nghẽn Ban Đầu */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-rose-300 hover:shadow-[0_20px_45px_-12px_rgba(244,63,94,0.12)] transition-all duration-300 group shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/80">
                    GIAI ĐOẠN 1
                  </span>
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-rose-950 transition-colors">
                    Điểm Nghẽn Ban Đầu
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase mt-1">
                    Thói quen học máy móc
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Tâm lý dịch từ vựng thô từng chữ từ tiếng Việt sang tiếng Anh. Dùng collocation gượng ép hoặc cố nhồi nhét từ vựng C1/C2 không đúng ngữ cảnh.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-2 text-rose-600">
                  <span className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-black shrink-0">✕</span>
                  <span>Dịch thô Word-by-Word</span>
                </div>
                <div className="flex items-center gap-2 text-rose-600">
                  <span className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-black shrink-0">✕</span>
                  <span>Đoạn văn rời rạc, thiếu logic</span>
                </div>
                <div className="flex items-center gap-2 text-rose-600">
                  <span className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-black shrink-0">✕</span>
                  <span>Lúng túng khi gặp dạng đề mới</span>
                </div>
              </div>
            </div>

            {/* Phase 2: Rèn Luyện Lõi (Stripe Deep Navy Centerpiece Card) */}
            <div className="rounded-3xl bg-gradient-to-b from-[#081B33] to-[#0a2540] text-white p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_25px_50px_-12px_rgba(8,27,51,0.45)] border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400/60 hover:shadow-[0_25px_60px_-10px_rgba(0,212,255,0.22)] transition-all duration-300">
              {/* Specular top prism line */}
              <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              {/* Subtle matrix grid */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ 
                  backgroundImage: "linear-gradient(to right, #00d4ff 1px, transparent 1px), linear-gradient(to bottom, #00d4ff 1px, transparent 1px)", 
                  backgroundSize: "24px 24px" 
                }} 
              />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    GIAI ĐOẠN 2 • TRỌNG TÂM
                  </span>
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] group-hover:scale-110 transition-transform">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Kỷ Luật Giải Phẫu
                  </h3>
                  <p className="text-xs font-mono font-bold text-cyan-300 uppercase mt-1">
                    Phương pháp ARIS Way
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Giáo viên trực tiếp bóc tách từng câu văn. Bắt buộc học viên viết lại bài sửa (Re-attempt) để chuyển hóa nhận thức thành phản xạ tự nhiên.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/15 text-xs sm:text-sm font-bold relative z-10">
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>Sửa chi tiết cấu trúc câu & luận điểm</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>Bắt buộc hoàn thành bài sửa Re-attempt</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>Theo dõi tỷ lệ giảm lỗi sai theo tuần</span>
                </div>
              </div>
            </div>

            {/* Phase 3: Năng Lực Chuẩn Hóa */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-emerald-300 hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.12)] transition-all duration-300 group shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    GIAI ĐOẠN 3
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-950 transition-colors">
                    Tư Duy Trực Diện
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase mt-1">
                    Chuẩn hóa Cambridge
                  </p>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Khả năng phản xạ và tổ chức ý tưởng trực tiếp bằng tiếng Anh. Viết luận sắc bén, lập luận chặt chẽ và tự tin làm chủ phòng thi thực tế.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Văn phong học thuật chuẩn xác, tự nhiên</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Ý tưởng mạch lạc, dẫn chứng thuyết phục</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-sans font-extrabold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
                  02 // KHẢO THÍ HỌC THUẬT ARIS
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 font-sans">
                  Kim Khoa Bảng
                </h2>
              </div>

              {/* Tôn chỉ đề từ rút gọn 1 câu */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <p className="text-sm sm:text-base font-medium text-amber-950 dark:text-amber-100 italic tracking-normal">
                    "Trăm ngày mài giũa thành cốt cách — Vạn dặm tu luyện đắc Kim Khoa."
                  </p>
                </div>
              </div>
            </div>

            {/* Tactile Filter Segment Selector (Stripe Sleek Segmented Pill Control) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-2xs backdrop-blur-xs shrink-0">
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
                    "px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer",
                    activeBandFilter === filter.key
                      ? "bg-slate-900 text-white shadow-[0_4px_14px_rgba(15,23,42,0.18)] ring-1 ring-slate-800"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Case Grid — Kim Khoa Bảng */}
          {filteredList.length === 0 ? (
            <div className="py-16 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-3xl font-sans text-sm">
              Không tìm thấy hồ sơ nào trong nhóm điểm này.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredList.map((item) => {
                const kimKhoa = getKimKhoaHonors(item);
                const honor = getAcademicRankHonor(
                  item.academicRankTitle || item.overallScore,
                  {
                    listening: item.listeningScore,
                    reading: item.readingScore,
                    writing: item.writingScore,
                    speaking: item.speakingScore,
                  }
                );

                return (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-amber-500/50 hover:shadow-xl space-y-6 relative overflow-hidden group"
                  >
                    {/* Golden subtle corner watermark / seal accent */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-amber-500/5 pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                    {/* Top Identity & Profile Badge Header */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Danh xưng đặc biệt (Bậc Đỉnh Phong / Phá Cảnh Tân Khoa / Vinh danh) */}
                          {kimKhoa.specialDesignation ? (
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold border",
                                kimKhoa.specialBadgeColor.bg,
                                kimKhoa.specialBadgeColor.text,
                                kimKhoa.specialBadgeColor.border
                              )}
                            >
                              <Sparkles className="h-3 w-3 shrink-0" />
                              <span>{kimKhoa.specialDesignation}</span>
                            </span>
                          ) : null}

                          {/* Cảnh giới phân kỳ */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-muted text-foreground border border-border/70">
                            {honor.stage.stageName} {honor.stage.starCount}★
                          </span>
                        </div>

                        <span className="text-xs font-mono font-semibold text-muted-foreground shrink-0">
                          {item.studyDuration || "Chính quy"}
                        </span>
                      </div>

                      {/* Middle: Student Avatar + Details & Cảnh Giới Xác Lập */}
                      <div className="flex gap-5 items-start">
                        {/* Student Image with Academic Golden Border Accent */}
                        <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36">
                          <img
                            src={item.imageUrl}
                            alt={item.studentName}
                            className="w-full h-full rounded-2xl object-cover border-2 border-amber-400/30 shadow-xs"
                          />
                          <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded-md bg-[#002147]/90 text-white font-mono font-black text-[10px] shadow-xs backdrop-blur-xs">
                            {item.overallScore} IELTS
                          </div>
                        </div>

                        {/* Student Trajectory & Cảnh Giới Xác Lập */}
                        <div className="flex-1 min-w-0 space-y-2.5">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                              Học viên Kim Khoa
                            </span>
                            <h3 className="font-black text-foreground text-lg sm:text-xl leading-tight truncate">
                              {item.studentName}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground font-normal truncate mt-0.5">
                              {item.studentSchool || item.courseName || "Học viện ARIS"}
                            </p>
                          </div>

                          {/* Cảnh giới xác lập */}
                          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border/80 space-y-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                              Cảnh giới xác lập
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "text-xs sm:text-sm font-black tracking-tight",
                                honor.accentColor
                              )}>
                                {kimKhoa.realmWithBand}
                              </span>
                              <span className="text-[11px] font-semibold text-muted-foreground">
                                ({honor.subtitle})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lộ trình tu luyện: Tích lũy từ bậc [...] → Đột phá cảnh giới [...] */}
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                            Lộ trình tu luyện
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-red-soft text-brand-red font-mono font-bold text-xs">
                            <span>+{kimKhoa.deltaScore}</span>
                            <TrendingUp className="h-3 w-3" />
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                          {kimKhoa.cultivationJourney}
                        </p>
                      </div>

                      {/* 4 Skill Scores Matrix (Mono Data Grid) */}
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            LISTENING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-foreground">
                            {item.listeningScore || "—"}
                          </span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            READING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-foreground">
                            {item.readingScore || "—"}
                          </span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            WRITING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-brand-red">
                            {item.writingScore || "—"}
                          </span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/70">
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground block font-mono font-semibold tracking-wider">
                            SPEAKING
                          </span>
                          <span className="text-sm sm:text-base font-mono font-bold text-brand-blue">
                            {item.speakingScore || "—"}
                          </span>
                        </div>
                      </div>

                      {/* Thủ bút ấn chứng của Bác sĩ thuật */}
                      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/40 flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                            Thủ bút ấn chứng
                          </span>
                          <p className="text-xs text-blue-950 dark:text-blue-200 font-semibold italic">
                            "{kimKhoa.mentorSignature}"
                          </p>
                        </div>
                      </div>

                      {/* Trải nghiệm tu luyện */}
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
      <section className="py-16 sm:py-24 border-b border-border/80 bg-slate-50/70 relative overflow-hidden">
        {/* Soft background ambient gradient flare */}
        <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-gradient-to-l from-[#00d4ff]/06 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-sans font-extrabold tracking-wider text-brand-blue uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              03 // 3 LỚP MINH BẠCH DỮ LIỆU HỌC TẬP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Lưu Vết &amp; Kiểm Chứng Quá Trình Rèn Luyện
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Mọi bài tập và tương tác sửa bài đều được số hóa theo tiêu chuẩn lưu vết chuẩn mực, đảm bảo tính minh bạch và đối chiếu được sự tiến bộ theo từng tuần.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Layer 1: Raw Submission Logs */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 space-y-5 shadow-2xs hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(28,68,122,0.12)] transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-brand-blue-soft text-brand-blue shadow-[0_4px_16px_rgba(28,68,122,0.15)] group-hover:scale-105 transition-transform w-fit">
                  <FileCode2 className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  TIME-LOCKED
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-extrabold text-brand-blue uppercase tracking-wider">
                  LỚP 1
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Nhật Ký Bài Nộp Gốc
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Toàn bộ bài viết Task 1, Task 2 và tệp ghi âm Speaking được lưu trữ theo mốc thời gian nguyên bản, giúp học viên đối chiếu bài làm đầu tiên và bài làm hiện tại.
              </p>
            </div>

            {/* Layer 2: Error Anatomy */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 space-y-5 shadow-2xs hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(223,24,67,0.12)] transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-brand-red-soft text-brand-red shadow-[0_4px_16px_rgba(223,24,67,0.15)] group-hover:scale-105 transition-transform w-fit">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  DEEP ANATOMY
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-extrabold text-brand-red uppercase tracking-wider">
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
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-7 sm:p-8 space-y-5 shadow-2xs hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.12)] transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 shadow-[0_4px_16px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform w-fit">
                  <History className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  AUDITED RE-ATTEMPT
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-extrabold text-emerald-700 uppercase tracking-wider">
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
      {/* 5. EDITORIAL BOTTOM CONVERSION SECTION (Stripe Slanted Dark Aura)          */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#081B33] text-white relative overflow-hidden">
        {/* Stripe-style Radiant Mesh Flare */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 50%, #00d4ff 0%, #635bff 45%, transparent 80%)`,
            filter: "blur(60px)"
          }}
        />

        {/* Matrix Grid Lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-sans font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-xs">
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
              className="rounded-2xl px-9 h-14 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-[0_12px_30px_rgba(223,24,67,0.45)] hover:shadow-[0_16px_36px_rgba(223,24,67,0.55)] transition-all gap-2.5 hover:-translate-y-0.5 cursor-pointer"
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

              {/* Honorary Academic Rank Award Banner - Kim Khoa Đề Danh */}
              {(() => {
                const kimKhoa = getKimKhoaHonors(selectedStory);
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
                  <div className="space-y-3">
                    <div
                      className={cn(
                        "p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-500/10 border-amber-500/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-card border border-amber-500/30 shadow-2xs shrink-0">
                          <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase font-serif font-black tracking-wider text-amber-850 dark:text-amber-300 block">
                              VINH DANH HỌC THUẬT
                            </span>
                            {kimKhoa.specialDesignation && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/40">
                                {kimKhoa.specialDesignation}
                              </span>
                            )}
                          </div>
                          <div className="text-base sm:text-lg font-bold text-foreground flex flex-wrap items-center gap-2">
                            <span>{kimKhoa.realmWithBand}</span>
                            <span className="text-xs font-semibold text-muted-foreground">({honor.subtitle})</span>
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

                    {/* Lộ trình tu luyện & Thủ bút ấn chứng trong Modal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                          Lộ trình tu luyện
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                          {kimKhoa.cultivationJourney}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/40 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                          Thủ bút ấn chứng
                        </span>
                        <p className="text-xs sm:text-sm font-semibold italic text-blue-950 dark:text-blue-200 leading-snug">
                          "{kimKhoa.mentorSignature}"
                        </p>
                      </div>
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
