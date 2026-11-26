import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionContainer } from "@/components/public/SectionContainer";
import { AcademicRankSystem } from "@/components/public/AcademicRankSystem";
import { ArisBentoGrid } from "@/components/public/ArisBentoGrid";
import { HeroDiagnosticHook } from "@/components/public/HeroDiagnosticHook";
import { TransparentProgramsOverview } from "@/components/public/TransparentProgramsOverview";
import { QuickTrialModal } from "@/components/public/QuickTrialModal";
import { StickyMobileActionBar } from "@/components/public/StickyMobileActionBar";
import { Button } from "@/components/ui/button";
import AcademicPhrase from "@/components/common/AcademicPhrase";
import { SEO } from "@/components/common/SEO";
import {
  ArrowRight,
  GraduationCap,
  Target,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  TrendingUp,
  Users,
  Compass,
  Flame,
  FileText,
  Sparkles,
  BookmarkCheck,
  Award,
} from "lucide-react";

export default function PublicHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedTrialCourse, setSelectedTrialCourse] = useState("starter");

  const handleOpenTrial = (courseKey = "starter") => {
    setSelectedTrialCourse(courseKey);
    setTrialModalOpen(true);
  };

  const scrollToTuition = () => {
    const el = document.getElementById("bang-hoc-phi");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (location.hash === "#bang-hoc-phi") {
      const timer = setTimeout(() => {
        const el = document.getElementById("bang-hoc-phi");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col bg-[#FBF9F5]">
      <SEO
        title="ARIS • DAN IELTS (NextBand) — Đào Tạo Tiếng Anh THCS, THPT, Cambridge & IELTS"
        description="Học tiếng Anh từ bản chất: Lộ trình rõ ràng & học phí công khai cho Tiếng Anh THCS, THPT (1tr/tháng), Cambridge Flyers/KET/PET và Luyện thi IELTS từ mất gốc lên 6.5+ chỉ 12 tháng. Lớp siêu nhỏ tối đa 08 học viên, GV IELTS 8.0+."
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION — ẤN TƯỢNG, RÕ RÀNG & KHÁI QUÁT NGAY TỪ ĐẦU      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-border/80 bg-[radial-gradient(ellipse_at_top_right,rgba(0,33,71,0.08)_0%,transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.06)_0%,transparent_48%)]">
        {/* Soft Ambient Blur Spots */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left: Clear Positioning, Programs Summary, Key Metrics & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Top Dual Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-soft text-brand-red border border-brand-red/25 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xs">
                  <GraduationCap className="h-4 w-4" />
                  <span>ARIS • DAN IELTS</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenTrial("starter")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200/80 text-amber-950 border border-amber-300 text-xs sm:text-sm font-black transition-colors shadow-2xs cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>Test trình độ &amp; Học thử 02 buổi miễn phí!</span>
                </button>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-black text-foreground tracking-tight leading-[1.12]">
                Học tiếng Anh{" "}
                <AcademicPhrase
                  text="từ bản chất!"
                  className="font-montserrat font-black tracking-normal inline-block"
                />
                <span className="text-[#002147] block mt-2 text-3xl sm:text-4xl lg:text-[44px] leading-[1.18]">
                  Từ mất gốc lên <span className="text-brand-red">IELTS 6.5+</span> chỉ 12 tháng.
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-foreground/85 font-medium leading-relaxed max-w-2xl">
                Hệ thống đào tạo bài bản với <strong>học phí công khai minh bạch</strong> cho{" "}
                <strong className="text-[#002147]">Tiếng Anh THCS – THPT</strong>,{" "}
                <strong className="text-[#002147]">Chứng chỉ Cambridge (Flyers • KET • PET)</strong> và{" "}
                <strong className="text-[#002147]">Luyện thi IELTS</strong>. Không học mẹo, chấm chữa sát sao 1:1 từng câu trên nền tảng NextBand LMS.
              </p>

              {/* 4 High-Impact Overview Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
                  <div className="text-lg sm:text-xl font-black text-[#002147]">≤ 08 HV</div>
                  <div className="text-[11px] sm:text-xs font-semibold text-foreground/75 mt-0.5 leading-snug">
                    Lớp siêu nhỏ (= ½ trung tâm lớn)
                  </div>
                </div>
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
                  <div className="text-lg sm:text-xl font-black text-brand-red">IELTS 8.0+</div>
                  <div className="text-[11px] sm:text-xs font-semibold text-foreground/75 mt-0.5 leading-snug">
                    100% Giáo viên chuyên môn đứng lớp
                  </div>
                </div>
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs">
                  <div className="text-lg sm:text-xl font-black text-emerald-700">+1.0 Band</div>
                  <div className="text-[11px] sm:text-xs font-semibold text-foreground/75 mt-0.5 leading-snug">
                    Lộ trình tinh gọn 9–10 tuần/khóa
                  </div>
                </div>
                <div
                  onClick={scrollToTuition}
                  className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/90 hover:bg-amber-100/80 border border-amber-200/90 shadow-2xs cursor-pointer transition-colors"
                >
                  <div className="text-lg sm:text-xl font-black text-amber-900">Từ 1tr/tháng</div>
                  <div className="text-[11px] sm:text-xs font-bold text-amber-800 mt-0.5 leading-snug">
                    Công khai học phí • Xem ngay ↓
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => handleOpenTrial("starter")}
                  className="w-full sm:w-auto rounded-2xl px-6 sm:px-7 h-auto min-h-14 py-3 sm:py-0 font-extrabold text-base bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-lg shadow-brand-red/20 gap-2 whitespace-normal text-center transition-all"
                >
                  <span>Đăng ký Test &amp; Học thử miễn phí</span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToTuition}
                  className="w-full sm:w-auto rounded-2xl px-6 sm:px-7 h-auto min-h-14 py-3 sm:py-0 font-extrabold text-base border-2 border-[#002147]/25 bg-white hover:bg-[#002147] hover:text-white text-[#002147] whitespace-normal text-center shadow-2xs transition-colors"
                >
                  Xem bảng học phí công khai
                </Button>
              </div>

              {/* Quick Online Assessment Sub-link */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-foreground/80 font-bold pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/assessment")}
                  className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-red underline underline-offset-4 cursor-pointer"
                >
                  <Award className="h-4 w-4 shrink-0" />
                  <span>Hoặc làm bài kiểm tra năng lực 4 kỹ năng Online ngay →</span>
                </button>
              </div>
            </div>

            {/* Right: Interactive Diagnostic Hook Sandbox */}
            <div className="lg:col-span-5 relative">
              <HeroDiagnosticHook onStartFullAssessment={() => navigate("/assessment")} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: TỔNG QUAN 3 HỆ ĐÀO TẠO & BẢNG HỌC PHÍ CÔNG KHAI                */}
      {/* ========================================================================= */}
      <TransparentProgramsOverview onOpenTrial={handleOpenTrial} />

      {/* ========================================================================= */}
      {/* SECTION 3: THE ACADEMIC DIAGNOSIS SYSTEM (PHƯƠNG PHÁP ARIS)               */}
      {/* ========================================================================= */}
      <SectionContainer
        badge="Phương pháp & Nền tảng ARIS"
        title="Đừng học thêm. Hãy học đúng chỗ."
        description="Giải 100 bộ đề không bằng sửa đúng một lỗ hổng tư duy. ARIS bóc tách chính xác vì sao bạn sai trước khi dạy bạn cách làm đúng."
        background="muted"
      >
        <ArisBentoGrid />

        {/* Flat 3-Step Methodology Workflow: Đo lường đầu vào → Học bản chất cấu trúc → Sửa lỗi 1:1 từng câu */}
        <div className="mt-12 pt-10 border-t border-border/70">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-blue font-extrabold">
              Quy Trình Tinh Gọn
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              3 Bước Kiến Tạo Năng Lực Học Thuật Chuẩn Xác
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#002147] text-white flex items-center justify-center font-mono font-black text-xs">
                  01
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đầu vào</span>
              </div>
              <h4 className="font-extrabold text-foreground text-base sm:text-lg">
                Đo lường đầu vào
              </h4>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Khảo thí toàn diện 4 kỹ năng theo khung ARIS-7 để định vị chính xác vị trí năng lực và điểm nghẽn nhận thức.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#002147] text-white flex items-center justify-center font-mono font-black text-xs">
                  02
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tiếp thu</span>
              </div>
              <h4 className="font-extrabold text-foreground text-base sm:text-lg">
                Học bản chất cấu trúc
              </h4>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Hiểu sâu bản chất ngữ pháp chức năng và logic lập luận học thuật, triệt tiêu thói quen học vẹt bài mẫu và dịch thô.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-brand-red/30 bg-gradient-to-br from-white via-white to-brand-red-soft/20 shadow-2xs space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-brand-red text-white flex items-center justify-center font-mono font-black text-xs">
                  03
                </span>
                <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider">Phản hồi</span>
              </div>
              <h4 className="font-extrabold text-foreground text-base sm:text-lg text-brand-red">
                Sửa lỗi 1:1 từng câu
              </h4>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Chấm chữa chi tiết từng dòng (Line-by-line), bóc tách cơ chế lỗi và bắt buộc hoàn thành bài sửa (Re-attempt) để tiến bộ.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ========================================================================= */}
      {/* SECTION 4: THE ARIS-7 ACADEMIC RANK SYSTEM                               */}
      {/* ========================================================================= */}
      <SectionContainer
        id="academic-system"
        badge="Bản Đồ Tiến Độ"
        title="Bạn đang ở đâu trên hành trình học tiếng Anh?"
        description="7 cấp bậc chuẩn hóa năng lực. Biết rõ bạn đang ở đâu và chính xác cần làm gì để thăng hạng."
        background="elevated"
      >
        <AcademicRankSystem initialRank={5} />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 text-center w-full max-w-full">
          <Button
            size="lg"
            onClick={() => navigate("/assessment")}
            className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 text-sm sm:text-base font-extrabold bg-brand-red hover:bg-brand-red-hover text-white shadow-md gap-2.5 whitespace-normal text-center"
          >
            <span>Kiểm tra Rank &amp; Nhận phân tích năng lực (Miễn phí)</span>
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/academic-system")}
            className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 text-sm sm:text-base font-bold border-2 border-border/80 hover:bg-muted text-foreground gap-2 whitespace-normal text-center"
          >
            <span>Xem chi tiết 7 cấp bậc &amp; 4 giai đoạn</span>
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Button>
        </div>
      </SectionContainer>

      {/* ========================================================================= */}
      {/* SECTION 5: NEXTBAND LEARNING SYSTEM (HỆ THỐNG HỌC TẬP RIÊNG)              */}
      {/* ========================================================================= */}
      <SectionContainer
        badge="Lớp Học & Hệ Thống Học Tập"
        title="Học một mình hay học cùng lớp — hành trình của bạn đều được ghi nhận."
        description="Lưu trữ minh bạch bài nộp và phản hồi của giáo viên. Bảng xếp hạng tạo động lực cùng tiến bộ mỗi ngày."
        background="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {/* Card 1: Sửa lỗi từng câu */}
          <div className="p-7 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs flex flex-col justify-between hover:border-brand-blue/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-200/80">
                  Chấm chữa chi tiết
                </span>
                <FileCheck className="w-5 h-5 text-brand-blue" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Sửa lỗi từng câu</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Giáo viên chỉ rõ từng lỗi sai ngữ pháp, từ vựng và cách dùng từ để bạn hiểu rõ nguyên nhân câu văn chưa chuẩn.
              </p>
            </div>

            {/* Visual UI Mockup: Sentence Annotation */}
            <div className="p-3.5 rounded-2xl bg-[#001E3D]/5 border border-slate-200/80 space-y-2.5">
              <div className="text-xs leading-relaxed font-serif text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span>The chart illustrates how energy consumption </span>
                <span className="line-through text-rose-600 bg-rose-100/70 px-1 rounded">grow rapid</span>{" "}
                <span className="font-sans font-bold text-emerald-700 bg-emerald-100/80 px-1 rounded">grew rapidly</span>
                <span> over the decade.</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-slate-600 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70">
                <span className="font-bold text-amber-800 shrink-0">Giảng viên:</span>
                <span>Chia quá khứ đơn (grew) kèm phó từ (rapidly) để bổ nghĩa động từ chuẩn C1.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="px-2 py-0.5 rounded bg-slate-100">Phân tích ngữ pháp</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Gợi ý viết lại</span>
            </div>
          </div>

          {/* Card 2: Làm bài sửa Re-attempt */}
          <div className="p-7 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
                  Kỷ luật luyện tập
                </span>
                <RefreshCw className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Làm bài sửa (Re-attempt)</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Sau khi nhận phản hồi, học viên tự tay viết lại bài sửa để khắc phục triệt để lỗ hổng trước khi chuyển sang bài mới.
              </p>
            </div>

            {/* Visual UI Mockup: Before & After Version Compare */}
            <div className="p-3.5 rounded-2xl bg-[#001E3D]/5 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-mono text-[10px] font-bold">1</span>
                  <span className="text-slate-600">Bản nháp 1</span>
                </div>
                <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">Band 5.5 (3 lỗi)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[10px] font-bold">2</span>
                  <span className="font-bold text-emerald-900">Bài sửa Re-attempt</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 text-[11px]">Band 6.5 (Đã gỡ)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="px-2 py-0.5 rounded bg-slate-100">Khắc phục lỗi cũ</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Đo lường tiến bộ</span>
            </div>
          </div>

          {/* Card 3: Nhật ký bài nộp */}
          <div className="p-7 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  Minh bạch tiến trình
                </span>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Nhật ký bài nộp</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Dễ dàng xem lại toàn bộ lịch sử bài nộp, so sánh bài làm đầu khóa và hiện tại để thấy rõ sự tiến bộ thực tế.
              </p>
            </div>

            {/* Visual UI Mockup: Submissions Timeline */}
            <div className="p-3.5 rounded-2xl bg-[#001E3D]/5 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-[11px]">
                <span className="font-medium text-slate-700 truncate max-w-[150px]">Task 2 • Education</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Band 7.0</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-[11px]">
                <span className="font-medium text-slate-700 truncate max-w-[150px]">Speaking Part 2</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Band 7.5</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-[11px]">
                <span className="font-medium text-slate-700 truncate max-w-[150px]">Reading Full Test 02</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">34/40 (7.5)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="px-2 py-0.5 rounded bg-slate-100">Lưu trữ bài nộp</span>
              <span className="px-2 py-0.5 rounded bg-slate-100">Biểu đồ kỹ năng</span>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ========================================================================= */}
      {/* SECTION 6: THE METACOGNITIVE MIRROR (TẤM GƯƠNG TỰ SOI CHIẾU NĂNG LỰC)     */}
      {/* ========================================================================= */}
      <SectionContainer
        badge="Triết Lý Chẩn Đoán Độc Quyền"
        title="Muốn nâng cao Band điểm, trước hết phải hiểu rõ chính mình."
        description="Đừng lặp lại lỗi sai trong vô thức. Nhận diện nút thắt cản trở và bỏ túi Sổ Tay Bẫy Lỗi độc bản trước giờ thi thật."
        background="elevated"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {/* Card 1 */}
          <div className="p-7 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#002147]/10 text-[#002147] w-fit">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">
                Tấm Gương Tự Soi Chiếu (Metacognition)
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Không dùng AI đoán mò. Dữ liệu lỗi ngữ pháp, phát âm và dạng bài yếu nhất được thẩm định trực tiếp bởi giáo viên chuyên môn và thuật toán so khớp khách quan.
              </p>
            </div>

            {/* Visual Error Frequency Graph */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Matching Headings (Overthinking)</span>
                  <span className="font-mono font-bold text-rose-600">55%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[55%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Distractor Trap (Paraphrase lệch)</span>
                  <span className="font-mono font-bold text-amber-600">35%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[35%]" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 text-xs font-bold text-[#002147] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Chẩn đoán chính xác và khách quan</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-brand-red/10 text-brand-red w-fit">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">
                Nút Thắt Quyết Định (+0.5 Band ROI)
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Chỉ rõ 2 thói quen vô thức đang cản trở bạn bứt phá lên Band 6.5 - 7.0+, kèm chiến lược cụ thể để bạn thấy rõ lộ trình tăng điểm.
              </p>
            </div>

            {/* Visual ROI Unlocking */}
            <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-700">Điểm hiện tại:</span>
                <span className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">Band 6.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-brand-red font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <span>Gỡ 2 bẫy tư duy thường gặp</span>
              </div>
              <div className="flex items-center justify-between font-bold pt-1 border-t border-rose-200/60 text-brand-red">
                <span>Tiềm năng bứt phá:</span>
                <span className="font-mono font-black text-sm bg-brand-red text-white px-2 py-0.5 rounded shadow-2xs">Band 7.0+</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 text-xs font-bold text-brand-red flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Tập trung gỡ đúng nút thắt</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-brand-blue/10 text-brand-blue w-fit">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">
                Sổ Tay Bẫy Lỗi Cá Nhân Hóa (My Cheat Sheet)
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Mỗi học viên sở hữu cuốn cẩm nang bỏ túi độc bản — tổng hợp chính xác những câu mình từng viết sai và lời chữa của thầy cô để tự tin đọc ôn tập 15 phút trước giờ thi thật.
              </p>
            </div>

            {/* Visual Mini Pocket Cheat Sheet */}
            <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-amber-900 font-bold border-b border-amber-200/60 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sổ tay bẫy lỗi cá nhân</span>
                </span>
                <span className="text-[10px] text-amber-700 font-normal">Chỉ riêng bạn</span>
              </div>
              <div className="space-y-1 text-slate-700 font-sans text-xs">
                <div className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Đọc lướt bỏ qua từ phủ định (barely, seldom)</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Kiểm tra danh từ số ít/nhiều trước khi chốt</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 text-xs font-bold text-brand-blue flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Sổ tay ôn tập trước giờ thi thật</span>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ========================================================================= */}
      {/* SECTION 7: FINAL CONVERSION BANNER (HÀNH ĐỘNG NGAY)                       */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Target className="h-4 w-4 text-brand-cyan" />
            <span>Test Trình Độ &amp; Học Thử Miễn Phí</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Trải nghiệm thực tế 02 buổi học trước khi quyết định.
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Kiểm tra trình độ đầu vào miễn phí, nhận tư vấn lộ trình sát năng lực (THCS, THPT, Cambridge hoặc IELTS) và trực tiếp trải nghiệm lớp học tối đa 08 học viên.
          </p>

          {/* Community social proof line */}
          <div className="flex items-center justify-center gap-2 text-white/75 text-sm font-semibold">
            <Users className="h-4 w-4 text-brand-cyan shrink-0" />
            <span>CS1: 68B Phan Bội Châu, P. Dĩ An • CS2 (DAN IELTS): 103B đường 12, P. Tam Bình, TP. HCM</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-full">
            <Button
              size="lg"
              onClick={() => handleOpenTrial("starter")}
              className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 font-extrabold text-base sm:text-lg bg-brand-red text-white hover:bg-brand-red-hover shadow-md border-0 gap-2.5 whitespace-normal text-center"
            >
              <span>Đăng ký Test &amp; Học thử 02 buổi</span>
              <ArrowRight className="h-5 w-5 text-white shrink-0" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/assessment")}
              className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 font-bold text-base sm:text-lg border-2 border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white whitespace-normal text-center"
            >
              Làm bài test Online ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Trial Modal */}
      <QuickTrialModal
        isOpen={trialModalOpen}
        onOpenChange={setTrialModalOpen}
        initialCourseSlug={selectedTrialCourse}
      />

      {/* Floating Sticky Conversion Bar on Mobile */}
      <StickyMobileActionBar />
    </div>
  );
}
