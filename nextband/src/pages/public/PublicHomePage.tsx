import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionContainer } from "@/components/public/SectionContainer";
import { AcademicRankSystem } from "@/components/public/AcademicRankSystem";
import { PlaceholderCard } from "@/components/public/PlaceholderCard";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Target,
  Brain,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  Users,
  Compass,
  Flame,
  FileText,
  Sparkles,
  Clock,
  BookmarkCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicHomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-[#FBF9F5]">
      <SEO
        title="ARIS — Học Tiếng Anh Từ Bản Chất"
        description="ARIS — Học tiếng Anh từ bản chất. Không học mẹo. Không học thuộc bài mẫu. Định vị chính xác năng lực và bóc tách từng lỗi sai để đạt điểm IELTS mong muốn."
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28 border-b border-border/80 bg-[radial-gradient(ellipse_at_top_right,rgba(0,33,71,0.07)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.05)_0%,transparent_45%)]">
        {/* Soft Ambient Blur Spots */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left: Headline, Subheadline & Primary Action */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red-soft text-brand-red border border-brand-red/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
                <GraduationCap className="h-4 w-4" />
                <span>Học Viện ARIS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black text-foreground tracking-tight leading-[1.12]">
                Học tiếng Anh{" "}
                <span className="relative inline-block text-brand-red font-black">
                  <span className="relative z-10">từ bản chất</span>
                  <span className="absolute left-0 right-0 bottom-2 h-3.5 bg-brand-red/15 -rotate-1 rounded-sm -z-0" />
                </span>
                .
                <br />
                <span className="text-[#002147] block mt-2">
                  Không học mẹo. Không học thuộc bài mẫu.
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-[22px] text-foreground/85 font-normal leading-relaxed max-w-2xl">
                ARIS giúp bạn hiểu rõ năng lực hiện tại, bóc tách từng lỗi sai và xây dựng tư duy ngôn ngữ vững chắc để đạt điểm IELTS mong muốn.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => navigate("/assessment")}
                  className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3 sm:py-0 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-lg shadow-brand-red/20 gap-2.5 whitespace-normal text-center transition-all"
                >
                  <span>Đánh giá năng lực miễn phí</span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/academic-system")}
                  className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3 sm:py-0 font-bold text-base sm:text-lg border-2 border-[#002147]/20 bg-background/80 hover:bg-[#002147]/5 text-foreground whitespace-normal text-center shadow-xs"
                >
                  Khám phá hệ thống học thuật
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-7 border-t border-border/80 flex flex-wrap items-center gap-6 sm:gap-8 text-sm sm:text-base text-foreground/80 font-bold">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Giảng viên có chứng chỉ chuyên môn
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Lộ trình cá nhân hóa
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-success" />
                  Học cùng lớp — thi đua cùng tiến
                </span>
              </div>
            </div>

            {/* Right: 3-Question Framework Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border-2 border-white/80 bg-card/90 backdrop-blur-md p-7 sm:p-8 shadow-xl shadow-blue-950/5 space-y-5">
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-brand-blue font-extrabold">
                      Khung Đào Tạo ARIS
                    </span>
                    <h4 className="font-black text-foreground text-lg sm:text-xl">
                      3 Trụ Cột Định Hình Tiến Bộ
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-brand-blue border border-blue-200/80 text-xs font-black">
                    ARIS-7™
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl border border-slate-200/80 bg-background/60 shadow-2xs space-y-1.5 text-left transition-all hover:border-brand-blue/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-base font-extrabold text-foreground">
                        <span className="h-7 w-7 rounded-xl bg-[#002147] text-white font-mono text-xs flex items-center justify-center font-black">
                          1
                        </span>
                        <span>Bạn đang ở đâu?</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Vị trí hiện tại</span>
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed pl-9.5">
                      Định vị chính xác trình độ học thuật hiện tại trên thang đo 7 cấp bậc ARIS-7.
                    </p>
                    <div className="pl-9.5 pt-1">
                      <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-blue h-full rounded-full" style={{ width: "45%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-brand-red/20 bg-brand-red-soft/40 shadow-2xs space-y-1.5 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-base font-extrabold text-brand-red">
                        <span className="h-7 w-7 rounded-xl bg-brand-red text-white font-mono text-xs flex items-center justify-center font-black">
                          2
                        </span>
                        <span>Điều gì cản trở bạn?</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">Điểm nghẽn tư duy</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed pl-9.5">
                      Hệ thống Academic Diagnosis bóc tách chính xác từng lỗ hổng tư duy và dạng bài hay mắc lỗi.
                    </p>
                    <div className="pl-9.5 pt-0.5 flex items-center gap-1.5 text-xs font-semibold text-brand-red">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                      <span>Chỉ rõ cơ chế lỗi — Không nhận xét cảm tính</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 bg-background/60 shadow-2xs space-y-1.5 text-left transition-all hover:border-emerald-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-base font-extrabold text-foreground">
                        <span className="h-7 w-7 rounded-xl bg-[#002147] text-white font-mono text-xs flex items-center justify-center font-black">
                          3
                        </span>
                        <span>Bước tiếp theo là gì?</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Can thiệp trúng đích</span>
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed pl-9.5">
                      Can thiệp trúng đích để thăng cấp trên thang đo ARIS-7, theo sát bởi giảng viên chuyên môn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE ACADEMIC DIAGNOSIS SYSTEM (ĐỊNH VỊ THƯƠNG HIỆU ARIS)       */}
      {/* ========================================================================= */}
      <SectionContainer
        badge="Phương pháp ARIS"
        title="Đừng học thêm. Hãy học đúng chỗ."
        description="Nhiều học viên giải hàng trăm bộ đề nhưng điểm số vẫn đứng yên, không phải vì chưa chăm chỉ — mà vì đang học những thứ mình đã biết, và bỏ quên những lỗ hổng chưa từng được gọi tên. ARIS lấy chẩn đoán học thuật làm điểm khởi đầu: Bóc tách chính xác vì sao bạn sai trước khi dạy bạn cách làm đúng."
        background="muted"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-7 rounded-3xl bg-card border border-border/80 border-l-4 border-l-[#002147] space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-[#002147]/10 text-[#002147] w-fit">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Chẩn đoán chính xác</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Không chỉ dừng lại ở con số điểm. Hệ thống bóc tách 4 tầng năng lực: Bạn đang yếu ở đâu, bẫy tư duy nào khiến bạn chọn sai đáp án.
              </p>
            </div>

            {/* Visual Graphic: 4-Layer Diagnostic Breakdown */}
            <div className="pt-2 space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-semibold text-slate-700">Tầng 4: Bẫy suy diễn (Distractor)</span>
                <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px]">Cần gỡ</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-semibold text-slate-700">Tầng 3: Ngữ pháp câu phức</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Vững</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-semibold text-slate-700">Tầng 2: Từ vựng học thuật C1</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Vững</span>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-border/80 border-l-4 border-l-brand-red space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-brand-red/10 text-brand-red w-fit">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Can thiệp đúng chỗ</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Dành 100% thời lượng bài giảng và bài tập để lấp đúng khoảng trống tư duy. Không lãng phí thời gian và sức lực vào những phần đã làm chủ.
              </p>
            </div>

            {/* Visual Graphic: Effort vs ROI Comparison */}
            <div className="pt-2 space-y-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Học đề ngẫu nhiên</span>
                  <span className="text-slate-400">Lãng phí 70% sức</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[35%]" />
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                <div className="flex justify-between font-bold text-brand-red">
                  <span>Trúng điểm nghẽn ARIS</span>
                  <span className="font-black">+0.5 Band</span>
                </div>
                <div className="w-full bg-rose-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-red h-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-border/80 border-l-4 border-l-brand-blue space-y-4 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-brand-blue/10 text-brand-blue w-fit">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Theo dõi tiến bộ</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Mỗi lỗ hổng được khắc phục là một bước tiến trên thang đo ARIS-7. Toàn bộ tiến trình được lưu vết minh bạch để đo lường qua từng tuần.
              </p>
            </div>

            {/* Visual Graphic: Progression Stepper */}
            <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Tuần 1</span>
                <span className="font-mono font-black text-slate-700">Band 5.0</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Tuần 4</span>
                <span className="font-mono font-black text-brand-blue">Band 6.0</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <div className="text-center">
                <span className="text-[10px] text-emerald-600 font-bold block">Mục tiêu</span>
                <span className="font-mono font-black text-emerald-700">Band 7.0+</span>
              </div>
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
        description="ARIS chuẩn hóa lộ trình thành 7 cấp bậc rõ ràng. Mỗi bậc đều có tiêu chuẩn năng lực cụ thể, giúp bạn biết mình đã làm được gì và cần thêm điều gì để nâng band."
        background="elevated"
      >
        <AcademicRankSystem initialRank={5} />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 text-center w-full max-w-full">
          <Button
            size="lg"
            onClick={() => navigate("/assessment")}
            className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 text-sm sm:text-base font-extrabold bg-brand-red hover:bg-brand-red-hover text-white shadow-md gap-2.5 whitespace-normal text-center"
          >
            <span>Kiểm tra Rank hiện tại của bạn ngay (60 Phút)</span>
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
        description="Bài nộp, nhận xét giáo viên và tiến độ của từng học viên được lưu trữ minh bạch. Bảng xếp hạng lớp tạo động lực thi đua — không phải để cạnh tranh, mà để cùng nhau không bỏ cuộc."
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
      {/* SECTION 5.5: THE METACOGNITIVE MIRROR (TẤM GƯƠNG TỰ SOI CHIẾU NĂNG LỰC)   */}
      {/* ========================================================================= */}
      <SectionContainer
        badge="Triết Lý Chẩn Đoán Độc Quyền"
        title="Muốn nâng cao Band điểm, trước hết phải hiểu rõ chính mình."
        description="Luyện 50 bộ đề mà không hiểu bản thân thì bạn chỉ đang lặp lại những thói quen sai lầm trong vô thức. ARIS trang bị cho bạn một Tấm Gương Tự Soi Chiếu (Metacognitive Mirror) — bóc tách từng lỗi sai, vạch rõ nút thắt cản trở và trao cho bạn cuốn Sổ Tay Bẫy Lỗi độc bản trước giờ thi thật."
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

        {/* Action Button */}
        <div className="mt-10 flex justify-center text-center w-full max-w-full">
          <Button
            size="lg"
            onClick={() => navigate("/assessment")}
            className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 font-extrabold text-sm sm:text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-md gap-2.5 whitespace-normal text-center"
          >
            <span>Trải nghiệm Chẩn đoán Năng lực ARIS Miễn Phí</span>
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Button>
        </div>
      </SectionContainer>

      {/* ========================================================================= */}
      {/* SECTION 6: 5-COURSE PROGRESSION PATHWAYS                                 */}
      {/* ========================================================================= */}
      <SectionContainer
        badge="Lộ Trình Đào Tạo"
        title="5 Chặng rèn luyện bám sát từng mốc năng lực."
        description="Không học lớp quá dễ gây lãng phí thời gian, không học lớp quá khó gây nản lòng. 5 khóa học của ARIS được cấu trúc thành 2 chặng phát triển rõ ràng."
        background="muted"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Pathway 1: Foundation */}
          <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-6 shadow-2xs">
            <div className="space-y-1.5 border-b border-border/60 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-blue font-extrabold">
                Giai Đoạn 1: Xây Nền Năng Lực
              </span>
              <h3 className="text-2xl font-black text-foreground">
                Lộ Trình Nền Tảng (Mất gốc → 5.0)
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Tập trung phát âm IPA chuẩn, làm chủ ngữ pháp câu và đọc/nghe hiểu văn bản học thuật.
              </p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => navigate("/courses/starter")}
                className="p-4 rounded-2xl border border-border/70 bg-muted/20 hover:border-[#EE6873]/50 hover:bg-[#EE6873]/5 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-md bg-[#EE6873]/15 text-[#EE6873] border border-[#EE6873]/30">
                      STARTER
                    </span>
                    <span className="text-sm font-extrabold text-foreground">Đầu ra 3.0</span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-1">Mất gốc → Nền tảng phát âm IPA &amp; Từ vựng sinh hoạt</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>

              <div
                onClick={() => navigate("/courses/dreamer")}
                className="p-4 rounded-2xl border border-border/70 bg-muted/20 hover:border-[#294398]/50 hover:bg-[#294398]/5 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-md bg-[#294398]/15 text-[#294398] border border-[#294398]/30">
                      DREAMER
                    </span>
                    <span className="text-sm font-extrabold text-foreground">3.0 → 4.0</span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-1">Ngữ pháp câu phức &amp; Đọc hiểu đoạn văn học thuật ngắn</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>

              <div
                onClick={() => navigate("/courses/builder")}
                className="p-4 rounded-2xl border border-border/70 bg-muted/20 hover:border-[#F37C42]/50 hover:bg-[#F37C42]/5 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-md bg-[#F37C42]/15 text-[#F37C42] border border-[#F37C42]/30">
                      BUILDER
                    </span>
                    <span className="text-sm font-extrabold text-foreground">4.0 → 5.0</span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-1">Làm quen 4 kỹ năng IELTS &amp; Viết đoạn văn có luận điểm</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            </div>
          </div>

          {/* Pathway 2: Breakthrough */}
          <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-6 shadow-2xs">
            <div className="space-y-1.5 border-b border-border/60 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-red font-extrabold">
                Giai Đoạn 2: Bứt Phá Điểm Số
              </span>
              <h3 className="text-2xl font-black text-foreground">
                Lộ Trình Chuyên Sâu (5.0 → 6.5+)
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Huấn luyện phương pháp The ARIS Way, viết luận Task 2 và phản xạ nói đa chiều.
              </p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => navigate("/courses/master")}
                className="p-4 rounded-2xl border border-border/70 bg-muted/20 hover:border-[#538442]/50 hover:bg-[#538442]/5 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-md bg-[#538442]/15 text-[#538442] border border-[#538442]/30">
                      MASTER
                    </span>
                    <span className="text-sm font-extrabold text-foreground">5.0 → 6.0</span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-1">Viết luận Task 2, mô tả biểu đồ Task 1 &amp; Phản xạ Speaking</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>

              <div
                onClick={() => navigate("/courses/leader")}
                className="p-4 rounded-2xl border border-border/70 bg-muted/20 hover:border-[#D12E33]/50 hover:bg-[#D12E33]/5 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-md bg-[#D12E33]/15 text-[#D12E33] border border-[#D12E33]/30">
                      LEADER
                    </span>
                    <span className="text-sm font-extrabold text-foreground">6.0 → 6.5+</span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-1">Văn phong học thuật tự nhiên &amp; Tư duy phản biện cấp cao</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-blue-soft/50 border border-brand-blue/20 text-xs text-foreground/80 font-bold space-y-1.5">
              <div className="flex items-center gap-2 text-brand-blue">
                <Users className="h-4 w-4" />
                <span>Lớp nhỏ — kết nối thật</span>
              </div>
              <p className="text-foreground/65 font-medium leading-relaxed">
                Tối đa 8 học viên mỗi lớp. Giáo viên biết tên từng người — bảng xếp hạng không phải con số ẩn danh mà là những người học thật, cùng tiến bộ với bạn mỗi ngày.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center text-center w-full max-w-full">
          <Button
            variant="outline"
            onClick={() => navigate("/courses")}
            className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 font-extrabold text-sm sm:text-base border-2 border-border/80 hover:bg-muted whitespace-normal text-center"
          >
            <span>Xem chi tiết toàn bộ 5 chương trình đào tạo</span>
            <ArrowRight className="h-5 w-5 ml-2 shrink-0" />
          </Button>
        </div>
      </SectionContainer>

      {/* ========================================================================= */}
      {/* SECTION 7: FINAL CONVERSION BANNER (HÀNH ĐỘNG NGAY)                       */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-brand-blue text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Target className="h-4 w-4 text-brand-cyan" />
            <span>Bắt Đầu Đúng Cách</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Bắt đầu bằng việc biết chính xác bạn đang ở đâu.
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Làm bài kiểm tra năng lực đầu vào miễn phí để nhận phân tích chi tiết điểm mạnh, điểm yếu và gợi ý lộ trình học tập phù hợp từ ARIS.
          </p>

          {/* Community social proof line */}
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-semibold">
            <Users className="h-4 w-4 text-brand-cyan shrink-0" />
            <span>Tham gia cùng hàng trăm học viên đang thi đua và cùng nhau chinh phục mục tiêu IELTS.</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-full">
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 font-extrabold text-base sm:text-lg bg-brand-red text-white hover:bg-brand-red-hover shadow-md border-0 gap-2.5 whitespace-normal text-center"
            >
              <span>Làm bài kiểm tra năng lực ngay</span>
              <ArrowRight className="h-5 w-5 text-white shrink-0" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3.5 sm:py-0 font-bold text-base sm:text-lg border-2 border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white whitespace-normal text-center"
            >
              Liên hệ nhận tư vấn trực tiếp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
