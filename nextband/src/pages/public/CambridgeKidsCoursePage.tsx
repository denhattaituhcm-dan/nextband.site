import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { QuickTrialModal } from "@/components/public/QuickTrialModal";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Target,
  Calendar,
  BookOpen,
  GraduationCap,
  Laptop,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Sparkles,
  Award,
  Users,
  Compass,
  FileCheck,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export default function CambridgeKidsCoursePage() {
  const navigate = useNavigate();
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  const levels = [
    {
      level: "STARTERS (Pre-A1)",
      age: "7 - 8 Tuổi",
      badges: ["12-15 Khiên", "Pre-A1 CEFR"],
      target: "Khơi mở phản xạ tự nhiên & phát âm chuẩn quốc tế",
      description: "Tập trung xây dựng vốn từ vựng cơ bản qua hình ảnh, trò chơi và ngữ cảnh thực tế. Giúp trẻ tự tin nghe - hiểu và nói những câu ngắn mạch lạc.",
      skills: ["Học 450+ từ vựng căn bản", "Phát âm chuẩn theo IPA", "Giao tiếp chào hỏi & sở thích", "Nhận diện chữ cái & số đếm"],
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    },
    {
      level: "MOVERS (A1)",
      age: "8 - 10 Tuổi",
      badges: ["13-15 Khiên", "A1 CEFR"],
      target: "Mở rộng 1.000+ từ vựng & diễn đạt câu hoàn chỉnh",
      description: "Phát triển khả năng đọc hiểu các mẩu đối thoại ngắn, viết đoạn văn mô tả đơn giản và giao tiếp tự nhiên về cuộc sống hàng ngày.",
      skills: ["Mở rộng 1.000+ từ vựng học thuật", "Nghe hiểu câu chuyện hoạt hình", "Viết câu đơn & ghép chính xác", "Thuyết trình chủ đề quen thuộc"],
      color: "from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    },
    {
      level: "FLYERS & KET (A2)",
      age: "10 - 12 Tuổi",
      badges: ["14-15 Khiên", "A2 / Pre-IELTS"],
      target: "Tư duy phản biện & bước đệm vững vàng tiến tới IELTS 6.5+",
      description: "Luyện tập tư duy ngôn ngữ học thuật, phản biện và đọc hiểu đa dạng văn bản. Đây là nấc thang chuyển giao quan trọng bước vào hệ IELTS Chuyên sâu.",
      skills: ["Vốn từ vựng tương đương IELTS 3.5 - 4.0", "Đọc hiểu văn bản thông tin thực tế", "Viết bài luận ngắn mạch lạc", "Tranh biện & diễn đạt quan điểm"],
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    },
  ];

  const highlights = [
    {
      icon: Baby,
      title: "Đối tượng học viên",
      desc: "Học sinh tiểu học (7 - 12 tuổi). Phân lớp chính xác theo độ tuổi & bài test năng lực đầu vào.",
    },
    {
      icon: Target,
      title: "Cam kết đầu ra",
      desc: "Đạt 12 - 15 khiên Cambridge YLE (Starters/Movers/Flyers). Đền bù học lại miễn phí nếu không đạt chuẩn.",
    },
    {
      icon: Calendar,
      title: "Thời lượng & Lịch học",
      desc: "2 buổi/tuần (90 phút/buổi). Có ca học linh hoạt các buổi tối trong tuần và sáng/chiều cuối tuần.",
    },
    {
      icon: BookOpen,
      title: "Giáo trình chuẩn Cambridge",
      desc: "Bản quyền từ NXB Cambridge University Press, kết hợp bài tập tình huống thực tế của ARIS.",
    },
    {
      icon: GraduationCap,
      title: "Đội ngũ giảng viên",
      desc: "100% giáo viên có chứng chỉ sư phạm quốc tế (CELTA/TESOL) và IELTS 8.0+. Có trợ giảng kèm cặp sát sao.",
    },
    {
      icon: Laptop,
      title: "Công nghệ số NextBand",
      desc: "Cấp tài khoản luyện thi tương tác tại nhà, nghe audio chuẩn và báo cáo tiến bộ thời gian thực cho phụ huynh.",
    },
  ];

  return (
    <div className="flex flex-col">
      <SEO
        title="Tiếng Anh Trẻ Em Cambridge (7 - 12 Tuổi) — ARIS IELTS & NextBand"
        description="Khóa học tiếng Anh trẻ em chuẩn Cambridge Starters, Movers, Flyers tại ARIS. Lộ trình nền tảng vững chắc hướng tới IELTS 7.0+ cấp tốc."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-border/80 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/courses")}
            className="gap-2 text-foreground/75 hover:text-foreground font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại tổng quan khóa học</span>
          </Button>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Chương Trình Anh Ngữ Thiếu Nhi Quốc Tế</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            Tiếng Anh Trẻ Em Cambridge <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              (Starters • Movers • Flyers)
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Đặt nền móng ngôn ngữ học thuật chuẩn mực từ 7 - 12 tuổi. Phát triển tư duy phản biện và phản xạ tự nhiên – bệ phóng vững vàng tiến thẳng tới IELTS 7.0+ trong tương lai.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setTrialModalOpen(true)}
              className="font-black tracking-wide gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            >
              <span>Đăng Ký Test & Học Thử Miễn Phí</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const el = document.getElementById("roadmap-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-bold border-border hover:bg-muted"
            >
              Xem Lộ Trình 3 Cấp Độ
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Summary Grid (Học hỏi từ Smartcom) */}
      <section className="py-12 sm:py-16 bg-muted/20 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              Thông Tin Tổng Quan Về Khóa Học
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Những tiêu chí quan trọng nhất phụ huynh cần biết khi lựa chọn cho con
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs hover:border-primary/40 transition-all space-y-3"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Level Roadmap Section */}
      <section id="roadmap-section" className="py-14 sm:py-20 bg-background border-b border-border/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black tracking-widest text-primary uppercase">
              Lộ Trình Đào Tạo Chuẩn Khảo Thí
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">
              3 Cấp Độ Tiến Bước Tới Tương Lai IELTS
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Mỗi cấp độ được thiết kế để chuẩn hóa 4 kỹ năng Nghe - Nói - Đọc - Viết theo thang điểm CEFR quốc tế
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {levels.map((lvl, index) => (
              <div
                key={index}
                className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-muted text-muted-foreground">
                      {lvl.age}
                    </span>
                    <div className="flex gap-1.5">
                      {lvl.badges.map((b, i) => (
                        <span key={i} className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-foreground">{lvl.level}</h3>
                  <p className="text-xs font-bold text-primary">{lvl.target}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{lvl.description}</p>

                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <div className="text-xs font-bold text-foreground">Chuẩn năng lực đạt được:</div>
                    <ul className="space-y-1.5">
                      {lvl.skills.map((skill, si) => (
                        <li key={si} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTrialModalOpen(true)}
                  className="w-full font-bold border-primary/30 hover:bg-primary/5 hover:text-primary gap-1"
                >
                  <span>Tư vấn cấp độ này</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARIS Distinct Advantages Section */}
      <section className="py-14 sm:py-20 bg-muted/20 border-b border-border/80">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Tại Sao Phụ Huynh Chọn ARIS Cho Con?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sự kết hợp giữa chất lượng giảng dạy chuẩn học thuật và công nghệ số NextBand
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary shrink-0" />
                <h3 className="text-base font-bold text-foreground">Sĩ số tối đa 8 - 10 bé / lớp</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Đảm bảo mỗi bé đều được tương tác nói tiếng Anh với giáo viên tối thiểu 15 phút mỗi buổi. Giáo viên theo sát từng lỗi phát âm và phản xạ của con.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-3">
              <div className="flex items-center gap-3">
                <Laptop className="h-6 w-6 text-primary shrink-0" />
                <h3 className="text-base font-bold text-foreground">Nền tảng số NextBand độc quyền</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Bé được cấp tài khoản làm bài tập tương tác, nghe truyện tranh tương tác và làm bài thi thử Cambridge có âm thanh chất lượng cao tại nhà.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-3">
              <div className="flex items-center gap-3">
                <FileCheck className="h-6 w-6 text-primary shrink-0" />
                <h3 className="text-base font-bold text-foreground">Báo cáo tiến bộ minh bạch</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Phụ huynh nhận báo cáo nhận xét chi tiết sau từng tuần học qua cổng phụ huynh NextBand Hub, không mơ hồ về sự tiến bộ thực tế của con.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <h3 className="text-base font-bold text-foreground">2 Cơ sở đào tạo thuận tiện</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Học trực tiếp tại Cơ sở 1 (68B Phan Bội Châu, Dĩ An, TP.HCM) và Cơ sở 2 DAN IELTS (103B Đường 12, P. Tam Bình, TP.HCM).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-14 sm:py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Đăng Ký Đánh Giá Năng Lực 1-1 Miễn Phí Cho Bé
          </h2>
          <p className="text-xs sm:text-base text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Giúp phụ huynh biết chính xác trình độ tiếng Anh hiện tại của con theo chuẩn Cambridge và nhận kế hoạch học tập hoàn toàn miễn phí.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setTrialModalOpen(true)}
              className="font-black text-primary bg-background hover:bg-background/90 shadow-xl"
            >
              <span>Đăng Ký Ngay Bây Giờ</span>
              <ArrowRight className="h-4 w-4 ml-2" />
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
