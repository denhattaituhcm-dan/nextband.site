import React from "react";
import { useNavigate } from "react-router-dom";
import { SectionContainer } from "@/components/public/SectionContainer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import {
  ShieldAlert,
  ShieldCheck,
  Target,
  Award,
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Brain,
  Layers,
  Users,
  Mail,
  HelpCircle,
  Cpu,
  GraduationCap,
  Scale,
  Quote,
} from "lucide-react";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <SEO
        title="Về ARIS — Tại Sao ARIS Tồn Tại? | Bản Sắc & Tuyên Ngôn Học Thuật"
        description="Bản sắc, triết lý và tuyên ngôn học thuật của ARIS. Tại sao chúng tôi từ chối mẹo thi cấp tốc để xây dựng năng lực ngôn ngữ thực chất và đo lường bằng chứng minh bạch."
      />

      {/* ========================================================================= */}
      {/* HERO SECTION — INSTITUTIONAL PURPOSE                                      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28 border-b border-border/80 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red-soft text-brand-red border border-brand-red/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Compass className="h-4 w-4" />
            <span>Bản Sắc &amp; Tuyên Ngôn Học Thuật</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.12]">
            Tại sao ARIS{" "}
            <span className="text-brand-blue block sm:inline">
              tồn tại?
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/85 font-normal leading-relaxed max-w-3xl mx-auto">
            Một lời tuyên ngôn về sự trung thực trong học thuật, kỷ luật rèn luyện có bằng chứng và giá trị thực chất của năng lực ngôn ngữ.
          </p>

          {/* Quick anchor tags */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-muted-foreground">
            <a href="#the-problem" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              01 — Vấn Đề
            </a>
            <a href="#the-manifesto" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              02 — Tuyên Ngôn
            </a>
            <a href="#academic-standards" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              03 — Chuẩn Mực
            </a>
            <a href="#procedure" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              04 — Quy Trình
            </a>
            <a href="#the-people" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              05 — Đội Ngũ
            </a>
            <a href="#aris-nextband" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              06 — ARIS &amp; NextBand
            </a>
            <a href="#contact" className="px-3 py-1.5 rounded-lg bg-muted hover:text-foreground transition-colors">
              07 — Liên Hệ
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 01 — THE PROBLEM (Nghịch Lý Thị Trường IELTS)                             */}
      {/* ========================================================================= */}
      <section id="the-problem" className="scroll-mt-20">
        <SectionContainer
          badge="01 — The Problem"
          title="Thị trường luyện thi IELTS đang gặp vấn đề gì?"
          description="Học viên bỏ ra hàng tháng trời và hàng chục triệu đồng nhưng điểm số vẫn giậm chân tại chỗ vì 3 điểm nghẽn mang tính hệ thống."
          background="muted"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-destructive/10 text-destructive w-fit">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="font-black text-foreground text-xl">
                1. Ảo tưởng về mẹo thi &amp; Học vẹt bài mẫu
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Thói quen học thuộc lòng câu mẫu tạo ra những bài viết rập khuôn, thiếu logic. Người học có thể qua được bài kiểm tra ngắn hạn nhưng mất hoàn toàn khả năng tư duy độc lập khi bước vào môi trường đại học quốc tế.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-destructive/10 text-destructive w-fit">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="font-black text-foreground text-xl">
                2. Nhận xét cảm tính &amp; Đánh giá mờ nhạt
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Nhiều nơi chỉ phê chung chung <em>"viết chưa tự nhiên"</em> hay <em>"cần từ vựng hay hơn"</em> mà không chỉ ra cơ chế lỗi sai ngữ pháp và cấu trúc lập luận, khiến người học làm hàng chục đề vẫn lặp lại lỗi cũ.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-destructive/10 text-destructive w-fit">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="font-black text-foreground text-xl">
                3. Tiếp thị thổi phồng &amp; Cam kết ảo
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Những lời hứa hẹn <em>"tăng 2 band cấp tốc sau 30 ngày"</em> đánh tráo khái niệm giữa điểm số may rủi và năng lực thực tế. Năng lực ngôn ngữ không thể xây dựng bằng phép màu mà phải qua quá trình rèn luyện kỷ luật.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 02 — THE ARIS MANIFESTO (Tuyên Ngôn Học Thuật)                            */}
      {/* ========================================================================= */}
      <section id="the-manifesto" className="scroll-mt-20">
        <SectionContainer
          badge="02 — Tuyên Ngôn Học Thuật"
          title="Tại sao là ARIS?"
          description="ARIS lấy cảm hứng từ Aristotle — một trong những tư tưởng gia có ảnh hưởng sâu rộng đến lịch sử của tư duy logic và nghệ thuật lập luận."
          background="default"
        >
          {/* Main Manifesto & Aristotle Inspiration Feature Card */}
          <div className="p-8 sm:p-12 rounded-3xl border border-border/80 bg-card space-y-8 shadow-2xs mb-12 text-left">
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-medium">
                Chúng tôi tin rằng năng lực ngôn ngữ không dừng lại ở việc ghi nhớ từ vựng hay ráp nối những cấu trúc có sẵn.
              </p>
              <p className="text-xs sm:text-sm text-brand-blue font-bold tracking-wider uppercase">
                Người học cần được rèn luyện để có thể:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-muted/50 border border-border/60 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h4 className="font-black text-foreground text-base">
                  Tư duy rõ ràng
                </h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Trước khi đặt bút hay cất lời.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-muted/50 border border-border/60 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h4 className="font-black text-foreground text-base">
                  Lập luận có căn cứ
                </h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Biết phân biệt giữa ý kiến và bằng chứng.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-muted/50 border border-border/60 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm">
                  3
                </div>
                <h4 className="font-black text-foreground text-base">
                  Diễn đạt chính xác
                </h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Mạch lạc và có chủ đích.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border/70 space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-muted-foreground">
                  Tinh Thần Cốt Lõi Của ARIS
                </h4>
                <p className="text-base sm:text-lg text-foreground/90 font-medium leading-relaxed">
                  Không chạy theo những mẹo vặt để đối phó với bài thi, mà xây dựng năng lực ngôn ngữ thực chất, có thể quan sát, đánh giá và phát triển theo thời gian.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-brand-blue">
                <Quote className="h-4 w-4 shrink-0 text-brand-blue/70" />
                <span className="italic">ARIS — Inspired by Aristotle, built for modern language learning.</span>
              </div>
            </div>
          </div>

          {/* 4 Core Operational Beliefs */}
          <div className="space-y-6 text-left">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                4 Niềm Tin Vận Hành Cốt Lõi
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Bốn nguyên lý chi phối mọi hoạt động đào tạo, biên soạn giáo trình và quy chuẩn chấm chữa tại ARIS.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
              <div className="p-8 rounded-3xl border border-border/80 bg-card space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-lg">
                    I
                  </div>
                  <h4 className="text-xl font-black text-foreground">
                    Năng Lực Trước, Điểm Số Sau
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  Điểm số IELTS chỉ là hệ quả tự nhiên (lagging indicator) của một năng lực tư duy ngôn ngữ thực chất. Khi người học hiểu rõ cấu trúc câu, ngữ pháp chức năng và logic diễn đạt, điểm số sẽ tự khắc nâng tầm.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-border/80 bg-card space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-lg">
                    II
                  </div>
                  <h4 className="text-xl font-black text-foreground">
                    Tiến Bộ Phải Đo Lường Bằng Bằng Chứng
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  Sự tiến bộ không thể đánh giá bằng cảm giác hay lời khen xã giao. Mọi bài nộp, bản nháp và lịch sử sửa bài đều được lưu vết minh bạch để đối chiếu chính xác sự chuyển biến của học viên qua từng tuần.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-border/80 bg-card space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-lg">
                    III
                  </div>
                  <h4 className="text-xl font-black text-foreground">
                    Luyện Tập Có Chủ Đích &amp; Phản Hồi Kép
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  Làm 100 đề mà không sửa lỗi thì chỉ lặp lại lỗi sai 100 lần. Làm 10 bài được mổ xẻ chi tiết từng câu và tự tay viết lại bài sửa sẽ tạo ra bước nhảy vọt về độ chính xác và tư duy viết luận.
                </p>
              </div>

              <div className="p-8 rounded-3xl border border-border/80 bg-card space-y-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-lg">
                    IV
                  </div>
                  <h4 className="text-xl font-black text-foreground">
                    Trách Nhiệm Tối Cao Với Sự Tiến Bộ
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                  Giáo viên là người bóc tách lỗi sai và cung cấp bản đồ học thuật; học viên là người trực tiếp bước đi và rèn luyện. Chúng tôi xây dựng một môi trường nghiêm túc, đề cao tính chủ động và kỷ luật tự thân.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 03 — ACADEMIC STANDARDS (Chuẩn Mực Sư Phạm)                                */}
      {/* ========================================================================= */}
      <section id="academic-standards" className="scroll-mt-20">
        <SectionContainer
          badge="03 — Academic Standards"
          title="ARIS kiểm soát chất lượng giảng dạy và chấm chữa như thế nào?"
          description="Mọi hoạt động sư phạm tại ARIS đều vận hành theo quy chuẩn học thuật khắt khe, không thỏa hiệp với sự hời hợt."
          background="muted"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-brand-blue-soft text-brand-blue w-fit">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="font-black text-foreground text-xl">
                Bóc Tách Lỗi Từng Câu (Line-by-Line)
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Không chấm điểm hình thức. Mọi bài viết và bài nói đều được giáo viên mổ xẻ chi tiết từng câu, định danh chính xác nguyên nhân lỗi ngữ pháp, từ vựng và tính liên kết logic.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-brand-blue-soft text-brand-blue w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-black text-foreground text-xl">
                Kỷ Luật Bài Sửa Bắt Buộc (Re-Attempt)
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Nhận xét chỉ có giá trị khi được chuyển hóa thành hành động. Học viên bắt buộc phải tự tay viết lại bài sửa dựa trên feedback của giáo viên trước khi được mở bài học tiếp theo.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/80 space-y-4 shadow-2xs">
              <div className="p-3 rounded-2xl bg-brand-blue-soft text-brand-blue w-fit">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-black text-foreground text-xl">
                Khung 7 Cấp Bậc Định Lượng (ARIS-7)
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Tiêu chuẩn đầu ra của từng cấp bậc (Rank 3 đến Rank 9) được chuẩn hóa tường minh với 4 giai đoạn tiến trình (Sơ kỳ $\rightarrow$ Đỉnh phong), giúp loại bỏ hoàn toàn sự mập mờ trong đánh giá.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 04 — ENROLLMENT PROCEDURE (Quy Trình Nhập Học)                            */}
      {/* ========================================================================= */}
      <section id="procedure" className="scroll-mt-20">
        <SectionContainer
          badge="04 — Quy Trình Nhập Học"
          title="Quy trình nhập học & rèn luyện tại ARIS"
          description="Hành trình chuẩn mực từng bước giúp bạn định vị chính xác năng lực, chọn đúng lộ trình và bắt đầu bứt phá điểm số."
          background="default"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Cột trái: Tóm tắt 4 bước quy trình */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-foreground text-base">
                    Đánh Giá Năng Lực Đầu Vào
                  </h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Khảo thí chuẩn hóa 4 kỹ năng để bóc tách chính xác điểm mạnh, điểm nghẽn và định vị Rank ARIS ban đầu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-foreground text-base">
                    Tư Vấn &amp; Xếp Lộ Trình Mục Tiêu
                  </h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Phân tích chi tiết kết quả bài test, thiết kế lộ trình cá nhân hóa tương ứng với cấp bậc mục tiêu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-foreground text-base">
                    Kích Hoạt Tài Khoản NextBand
                  </h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Nhận tài khoản học tập, giáo trình chuyên sâu và làm quen với không gian nộp bài số chuẩn Cambridge.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border/80 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  4
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-foreground text-base">
                    Rèn Luyện &amp; Sửa Bài 1:1 Có Bằng Chứng
                  </h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Học tập theo phương pháp The ARIS Way, nhận chấm chữa chi tiết từng dòng và hoàn thành bài sửa bắt buộc.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => navigate("/assessment")}
                  className="rounded-xl px-6 h-12 font-bold bg-brand-red text-white hover:bg-brand-red-hover shadow-sm gap-2"
                >
                  <span>Bắt đầu Đánh giá Năng lực</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/contact")}
                  className="rounded-xl px-6 h-12 font-bold border-2 border-border/80 hover:bg-muted text-foreground"
                >
                  <span>Tư vấn lộ trình</span>
                </Button>
              </div>
            </div>

            {/* Cột phải: Ảnh sơ đồ quy trình */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full rounded-3xl border border-border/80 bg-card p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <img
                  src="/assets/procedure/procedure.png"
                  alt="Sơ đồ quy trình nhập học tại ARIS"
                  className="w-full h-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 05 — THE PEOPLE (Đội Ngũ Học Thuật)                                       */}
      {/* ========================================================================= */}
      <section id="the-people" className="scroll-mt-20">
        <SectionContainer
          badge="05 — The People"
          title="Ai đứng sau hệ thống học thuật ARIS?"
          description="Đội ngũ giảng viên và chuyên viên học thuật có năng lực thực chiến cao, đam mê phương pháp giảng dạy bản chất."
          background="muted"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                  Tiêu Chuẩn Giảng Viên 8.0+ &amp; Trách Nhiệm Đồng Hành
                </h3>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Tại ARIS, giảng viên không chỉ đứng lớp truyền đạt kiến thức mà là những người trực tiếp đồng hành chấm chữa từng bài nộp của bạn mỗi ngày.
                </p>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-foreground/80 font-semibold">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>100% Giảng viên sở hữu chứng chỉ IELTS 8.0+ và có nền tảng học thuật vững chắc.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Nghiên cứu định kỳ bộ đề Cambridge để cập nhật chính xác xu hướng khảo thí quốc tế.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Tuyệt đối không giao việc chấm bài quan trọng cho người thiếu chuyên môn sư phạm.</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button
                  onClick={() => navigate("/teachers")}
                  variant="outline"
                  className="rounded-xl px-6 h-12 font-bold border-2 border-border/80 hover:bg-muted text-foreground gap-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Khám phá hồ sơ đội ngũ giảng viên</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-muted/60 border border-border/80 space-y-4 shadow-2xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-black uppercase">
                  Ban Cố Vấn &amp; Nghiên Cứu
                </div>
                <h4 className="text-xl font-black text-foreground">
                  Phát Triển Giáo Trình Độc Lập
                </h4>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Giáo trình tại ARIS không sao chép sách trôi nổi trên thị trường mà được đội ngũ học thuật biên soạn dựa trên nguyên lý ngôn ngữ học chức năng và tư duy phản biện quốc tế.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 06 — ARIS & NEXTBAND (Học Viện & Nền Tảng Công Nghệ)                      */}
      {/* ========================================================================= */}
      <section id="aris-nextband" className="scroll-mt-20">
        <SectionContainer
          badge="06 — ARIS & NextBand"
          title="Học viện và Bàn làm việc số liên kết với nhau như thế nào?"
          description="Sự kết hợp giữa chuẩn mực sư phạm truyền thống và sức mạnh đo lường của công nghệ học tập hiện đại."
          background="default"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl border border-border/80 bg-card space-y-5 shadow-2xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-soft text-brand-blue text-xs font-extrabold uppercase">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Học Viện ARIS</span>
              </div>
              <h3 className="text-2xl font-black text-foreground">
                Định Hình Bản Sắc &amp; Chuẩn Mực Học Thuật
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                ARIS chịu trách nhiệm xây dựng triết lý đào tạo, khung 7 cấp bậc năng lực (ARIS-7), phương pháp giảng dạy The ARIS Way và kiểm duyệt chất lượng đội ngũ giảng viên.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-foreground/80 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Khung chuẩn năng lực 7 cấp bậc rõ ràng
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Giáo trình tập trung vào tư duy phản biện
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Đội ngũ giảng viên IELTS 8.0+ có chứng chỉ sư phạm
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-border/80 bg-card space-y-5 shadow-2xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft text-brand-red text-xs font-extrabold uppercase">
                <Cpu className="h-3.5 w-3.5" />
                <span>Hạ Tầng NextBand</span>
              </div>
              <h3 className="text-2xl font-black text-foreground">
                Bàn Làm Việc Số &amp; Hệ Thống Lưu Vết Bằng Chứng
              </h3>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                NextBand là không gian làm việc trực tuyến của học viên: nơi 100% bài nộp và bản sửa được lưu trữ nguyên trạng, giao diện thi mô phỏng chuẩn Cambridge và biểu đồ tiến bộ cập nhật tự động.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-foreground/80 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Lưu trữ 100% bài nộp, bản nháp &amp; lịch sử bài sửa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Phòng thi mô phỏng chuẩn giao diện thi máy tính
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Biểu đồ đo lường tiến độ học tập minh bạch theo thời gian
                </li>
              </ul>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ========================================================================= */}
      {/* 07 — CONTACT & ACADEMIC EXCHANGE (Liên Hệ Chuyên Môn)                     */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 sm:py-24 bg-brand-blue text-white scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Mail className="h-4 w-4 text-brand-cyan" />
            <span>07 — Kết Nối Học Thuật</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Trao đổi chuyên môn &amp; Kết nối cùng ARIS
          </h2>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Bạn có câu hỏi về khung chuẩn học thuật, chương trình đào tạo hoặc muốn trao đổi chuyên môn với đội ngũ học thuật ARIS?
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/contact")}
              className="rounded-2xl px-8 h-14 font-extrabold text-base sm:text-lg bg-brand-red text-white hover:bg-brand-red-hover shadow-md border-0 gap-2.5"
            >
              <span>Gửi thông tin trao đổi</span>
              <ArrowRight className="h-5 w-5 text-white" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/academic-system")}
              className="rounded-2xl px-8 h-14 font-bold text-base sm:text-lg bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              <span>Khám phá Hệ thống ARIS-7</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
