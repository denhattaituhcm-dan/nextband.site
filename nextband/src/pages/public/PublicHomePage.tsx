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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublicHomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <SEO
        title="ARIS — Học Tiếng Anh Từ Bản Chất"
        description="ARIS — Học tiếng Anh từ bản chất. Không học mẹo. Không học thuộc bài mẫu. Định vị chính xác năng lực và bóc tách từng lỗi sai để đạt điểm IELTS mong muốn."
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-32 border-b border-border/80 bg-gradient-to-br from-background via-background to-[#002147]/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left: Headline, Subheadline & Primary Action */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red-soft text-brand-red border border-brand-red/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" />
                <span>Học Viện ARIS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black text-foreground tracking-tight leading-[1.12]">
                Học tiếng Anh{" "}
                <span className="text-brand-red underline decoration-brand-red/30 underline-offset-8">
                  từ bản chất
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
                  className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3 sm:py-0 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-brand-red-foreground shadow-sm gap-2.5 whitespace-normal text-center"
                >
                  <span>Đánh giá năng lực miễn phí</span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/academic-system")}
                  className="w-full sm:w-auto rounded-2xl px-6 sm:px-8 h-auto min-h-14 py-3 sm:py-0 font-bold text-base sm:text-lg border-2 border-[#002147]/20 hover:bg-[#002147]/5 text-foreground whitespace-normal text-center"
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
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border-2 border-[#002147]/15 bg-card p-7 sm:p-9 shadow-md space-y-6">
                <div className="space-y-1.5 border-b border-border/70 pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-blue font-extrabold">
                    Khung Đào Tạo ARIS
                  </span>
                  <h4 className="font-black text-foreground text-lg sm:text-xl">
                    3 Câu Hỏi Định Hình Sự Tiến Bộ
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-[#002147]/15 bg-[#002147]/[0.03] space-y-1.5 text-left">
                    <div className="flex items-center gap-2.5 text-base font-extrabold text-foreground">
                      <span className="h-7 w-7 rounded-xl bg-[#002147] text-white font-mono text-xs flex items-center justify-center font-black">
                        1
                      </span>
                      <span>Bạn đang ở đâu?</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-foreground/75 leading-relaxed pl-9">
                      Định vị chính xác trình độ học thuật hiện tại trên thang đo 7 cấp bậc ARIS-7.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#002147]/15 bg-[#002147]/[0.03] space-y-1.5 text-left">
                    <div className="flex items-center gap-2.5 text-base font-extrabold text-foreground">
                      <span className="h-7 w-7 rounded-xl bg-[#002147] text-white font-mono text-xs flex items-center justify-center font-black">
                        2
                      </span>
                      <span>Điều gì cản trở bạn?</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-foreground/75 leading-relaxed pl-9">
                      Hệ thống Academic Diagnosis bóc tách chính xác từng lỗ hổng tư duy và dạng bài hay mắc lỗi.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#002147]/15 bg-[#002147]/[0.03] space-y-1.5 text-left">
                    <div className="flex items-center gap-2.5 text-base font-extrabold text-foreground">
                      <span className="h-7 w-7 rounded-xl bg-[#002147] text-white font-mono text-xs flex items-center justify-center font-black">
                        3
                      </span>
                      <span>Bước tiếp theo là gì?</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-foreground/75 leading-relaxed pl-9">
                      Can thiệp trúng đích để thăng cấp trên thang đo ARIS-7, theo sát bởi giảng viên chuyên môn.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#002147] text-white text-left space-y-2 shadow-2xs">
                  <div className="text-base font-bold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-brand-cyan" />
                    <span>Học có kỷ luật &amp; đo lường minh bạch</span>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Mọi bài nộp được lưu trữ và chấm chữa chi tiết trên hệ thống để bạn thấy rõ sự tiến bộ qua từng ngày.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-white/75 text-xs font-semibold border-t border-white/15 mt-1">
                    <Users className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
                    Tiến độ của bạn hiển thị cùng cả lớp — mỗi bài nộp là một bước leo hạng.
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
          <div className="p-7 rounded-3xl bg-card border border-border/80 border-l-4 border-l-[#002147] space-y-3.5 shadow-2xs">
            <div className="p-3 rounded-2xl bg-[#002147]/10 text-[#002147] w-fit">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Chẩn đoán chính xác</h3>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Không chỉ dừng lại ở con số điểm. Hệ thống bóc tách 4 tầng năng lực: Bạn đang yếu ở đâu, bẫy tư duy nào khiến bạn chọn sai đáp án (Matching Headings, Paraphrase hay Distractor).
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-border/80 border-l-4 border-l-brand-red space-y-3.5 shadow-2xs">
            <div className="p-3 rounded-2xl bg-brand-red/10 text-brand-red w-fit">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Can thiệp đúng chỗ</h3>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Dành 100% thời lượng bài giảng và bài tập để lấp đúng khoảng trống tư duy. Không lãng phí thời gian và sức lực của học viên vào những phần đại trà đã làm chủ.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-border/80 border-l-4 border-l-brand-blue space-y-3.5 shadow-2xs">
            <div className="p-3 rounded-2xl bg-brand-blue/10 text-brand-blue w-fit">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-foreground text-lg sm:text-xl">Theo dõi tiến bộ</h3>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Mỗi lỗ hổng được khắc phục là một bước tiến trên thang đo ARIS-7. Toàn bộ tiến trình được lưu vết trên Academic Record™ để phụ huynh và học sinh đo lường qua từng tuần.
            </p>
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
            <span>Khảo thí kiểm tra Rank hiện tại của bạn ngay (60 Phút)</span>
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
          <PlaceholderCard
            variant="feature"
            badge="Chấm chữa chi tiết"
            title="Sửa lỗi từng câu"
            description="Giáo viên chỉ rõ từng lỗi sai ngữ pháp, từ vựng và cách dùng từ để bạn hiểu rõ nguyên nhân câu văn chưa chuẩn."
            metadata={["Phân tích ngữ pháp", "Gợi ý viết lại"]}
          />

          <PlaceholderCard
            variant="feature"
            badge="Kỷ luật luyện tập"
            title="Làm bài sửa (Re-attempt)"
            description="Sau khi nhận phản hồi, học viên tự tay viết lại bài sửa để khắc phục triệt để lỗ hổng trước khi chuyển sang bài mới."
            metadata={["Khắc phục lỗi cũ", "Đo lường tiến bộ"]}
          />

          <PlaceholderCard
            variant="feature"
            badge="Minh bạch tiến trình"
            title="Nhật ký bài nộp"
            description="Dễ dàng xem lại toàn bộ lịch sử bài nộp, so sánh bài làm đầu khóa và hiện tại để thấy rõ sự tiến bộ thực tế."
            metadata={["Lưu trữ bài nộp", "Biểu đồ kỹ năng"]}
          />
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
            <div className="pt-3 border-t border-border/60 text-xs font-bold text-[#002147] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Chẩn đoán chính xác 100% sự thật</span>
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
                Chỉ đích danh đúng 2 thói quen vô thức đang cản trở bạn bứt phá lên Band 6.5 - 7.0+, kèm chiến lược giải thoát cụ thể để bạn thấy rõ lộ trình tăng điểm.
              </p>
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
            <div className="pt-3 border-t border-border/60 text-xs font-bold text-brand-blue flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Bảo bối độc bản mang vào phòng thi</span>
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
