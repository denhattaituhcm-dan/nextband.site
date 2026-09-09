import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Target,
  Sparkles,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ShieldCheck,
  Loader2,
  TrendingUp,
  Play,
} from "lucide-react";
import { assessmentApi } from "@/lib/api";
import { toast } from "sonner";
import { SiteLogo } from "@/components/common/SiteLogo";

export default function DiagnosticLandingPage() {
  const navigate = useNavigate();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetBand, setTargetBand] = useState("IELTS 6.5");
  const [isStarting, setIsStarting] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleStartDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanName) {
      toast.error("Vui lòng nhập họ và tên thí sinh");
      return;
    }
    if (!cleanPhone || cleanPhone.length < 9) {
      toast.error("Vui lòng nhập số điện thoại có Zalo (tối thiểu 9 số)");
      return;
    }

    setIsStarting(true);
    try {
      const res = await assessmentApi.createSession({
        fullName: cleanName,
        phone: cleanPhone,
        targetBand,
      });

      if (res && res.sessionId) {
        toast.success("Khởi tạo phòng thi khảo thí thành công!");
        setIsModalOpen(false);
        navigate(`/assessment/take/${res.sessionId}`);
      } else {
        throw new Error("Không nhận được mã phiên thi hợp lệ");
      }
    } catch (err: any) {
      toast.error(err.message || "Không thể kết nối hệ thống chẩn đoán. Vui lòng thử lại!");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans selection:bg-brand-red/10 selection:text-brand-red flex flex-col">
      <SEO
        title="Chẩn Đoán Trình Độ & Điểm Nghẽn IELTS — Học Viện ARIS"
        description="Bạn đang ở Band nào thật sự? Bài kiểm tra chẩn đoán học thuật giúp xác định chính xác trình độ, điểm mạnh và điểm nghẽn tư duy của bạn."
      />

      {/* ========================================================================= */}
      {/* BRAND HEADER: LOGO CHUẨN NEXTBAND / ARIS IELTS                            */}
      {/* ========================================================================= */}
      <header className="border-b border-border/80 bg-background/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <SiteLogo
              alt="ARIS IELTS"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0 transition-transform group-hover:scale-105"
            />
            <div className="flex items-center border-l border-border pl-2.5 sm:pl-3 h-7 sm:h-8">
              <span className="font-black tracking-wider text-base sm:text-lg text-foreground leading-none uppercase whitespace-nowrap">
                ARIS IELTS
              </span>
            </div>
            <span className="hidden md:inline-block text-xs font-semibold tracking-wider text-muted-foreground uppercase border-l border-border pl-3">
              Diagnostic System
            </span>
          </Link>

          <Button
            size="sm"
            onClick={handleOpenModal}
            className="rounded-full px-5 h-9 font-bold text-xs sm:text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-sm transition-all"
          >
            Kiểm Tra Miễn Phí
          </Button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: ĐÁNH TRÚNG NỖI ĐAU & TÒ MÒ                                */}
      {/* ========================================================================= */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border/70 bg-gradient-to-b from-background via-card to-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-soft text-brand-red border border-brand-red/20 text-xs sm:text-sm font-black uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Hệ Thống Đánh Giá Học Thuật ARIS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.14]">
            Bạn đang ở Band nào thật sự?
          </h1>

          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto font-normal">
            Bài kiểm tra chẩn đoán giúp xác định chính xác trình độ và những{" "}
            <span className="font-bold text-foreground underline decoration-brand-red/50 underline-offset-4">
              điểm nghẽn tư duy
            </span>{" "}
            đang kéo điểm IELTS của bạn xuống.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleOpenModal}
              className="w-full sm:w-auto rounded-2xl px-9 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-white shadow-md hover:shadow-lg transition-all gap-2"
            >
              <span>BẮT ĐẦU CHẨN ĐOÁN</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-blue" />
              15 – 20 phút
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-brand-blue" />
              Không cần biết Band trước
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="h-4 w-4 text-brand-blue" />
              Có bản phân tích cá nhân
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TẠI SAO KHÁC? (ARIS DIAGNOSTIC VS TEST THÔNG THƯỜNG)                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-border/70 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-brand-red uppercase">
              Sự Khác Biệt
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Đây không phải bài test IELTS thông thường.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto font-normal">
              Bài test thông thường chỉ đếm số câu đúng. ARIS phân tích cơ chế vì sao bạn sai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Box 1: Test thông thường */}
            <Card className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <Badge variant="outline" className="text-muted-foreground border-border font-extrabold text-xs uppercase tracking-wider">
                  Test truyền thống
                </Badge>
                <h3 className="text-lg font-bold text-foreground">Chỉ đo số lượng câu đúng</h3>
              </div>

              <div className="space-y-3 text-sm text-foreground/80 font-medium">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-border text-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">1</div>
                  <span>Bạn làm một loạt câu hỏi ngẫu nhiên.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-border text-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">2</div>
                  <span>Hệ thống trả ra một con số: ví dụ Band 5.0.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-border text-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">3</div>
                  <span>Khuyên bạn "cần học thêm từ vựng" chung chung.</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-muted-foreground italic border-t border-border">
                → Bạn vẫn hoang mang không biết bắt đầu sửa từ đâu.
              </div>
            </Card>

            {/* Box 2: ARIS Diagnostic */}
            <Card className="rounded-3xl border-2 border-brand-blue/40 bg-card p-6 sm:p-8 space-y-5 shadow-sm hover:border-brand-blue/70 transition-all">
              <div className="space-y-1">
                <Badge className="bg-brand-blue text-white font-extrabold text-xs uppercase tracking-wider">
                  ARIS Diagnostic
                </Badge>
                <h3 className="text-lg font-bold text-foreground">Bóc tách điểm nghẽn tư duy</h3>
              </div>

              <div className="space-y-3 text-sm text-foreground font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span><strong>Bạn sai ở đâu:</strong> Nhận diện đúng vị trí đứt gãy.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span><strong>Vì sao bạn sai:</strong> Do kiến thức, phản xạ hay bẫy logic?</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span><strong>Cần sửa thứ gì trước:</strong> Phác đồ khắc phục trúng đích.</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-brand-blue font-bold border-t border-brand-blue/20">
                → Tiết kiệm hàng tháng trời tự bơi trong biển tài liệu.
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 4 KHU VỰC NĂNG LỰC ĐƯỢC SOI RÕ                                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-border/70 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-muted-foreground uppercase">
              Phạm Vi Đánh Giá
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              4 Năng lực được "soi" kỹ lưỡng
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs hover:border-brand-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-foreground tracking-tight">LISTENING</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Nghe âm thanh <span className="text-foreground/40">→</span> Nhận diện ngữ âm <span className="text-foreground/40">→</span> Tốc độ xử lý thông tin thực tế.
              </p>
            </Card>

            <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs hover:border-brand-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-brand-blue flex items-center justify-center font-bold">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-foreground tracking-tight">READING</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Đọc hiểu bản chất <span className="text-foreground/40">→</span> Tìm bằng chứng khách quan <span className="text-foreground/40">→</span> Tránh bẫy suy diễn.
              </p>
            </Card>

            <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs hover:border-brand-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                <PenTool className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-foreground tracking-tight">WRITING & GRAMMAR</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Nhận diện cấu trúc <span className="text-foreground/40">→</span> Tư duy cụm từ <span className="text-foreground/40">→</span> Khả năng kiểm soát câu.
              </p>
            </Card>

            <Card className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-xs hover:border-brand-blue/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold">
                <Mic className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-foreground tracking-tight">LOGIC & REASONING</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Hiểu ý niệm ngầm <span className="text-foreground/40">→</span> Loại bỏ ngụy biện <span className="text-foreground/40">→</span> Phản xạ ra quyết định.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BẠN SẼ NHẬN ĐƯỢC GÌ? (PREVIEW BẢN CHẨN ĐOÁN)                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-border/70 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-brand-red uppercase">
              Kết Quả Trả Về
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Bạn sẽ nhận được gì sau bài test?
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto font-normal">
              Không chỉ là một điểm số khô khan. Bạn nhận được một bức tranh nhận thức rõ ràng.
            </p>
          </div>

          {/* Mockup Card Hồ Sơ Chẩn Đoán */}
          <div className="max-w-2xl mx-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 gap-2">
              <div className="space-y-0.5">
                <p className="text-xs font-mono text-muted-foreground uppercase">ARIS DIAGNOSTIC REPORT</p>
                <h4 className="text-base font-black text-foreground">Hồ Sơ Năng Lực Sơ Bộ</h4>
              </div>
              <Badge variant="outline" className="bg-muted/40 border-border text-foreground font-mono text-xs font-bold">
                #NB-ANALYSIS
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-muted/20 rounded-2xl border border-border/80">
                <p className="text-[11px] text-muted-foreground font-medium">Trình độ ước tính</p>
                <p className="text-lg font-black text-brand-red">5.0 – 5.5</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-2xl border border-border/80">
                <p className="text-[11px] text-muted-foreground font-medium">Điểm mạnh</p>
                <p className="text-sm font-bold text-emerald-600 truncate">Reading Evidence</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-2xl border border-border/80">
                <p className="text-[11px] text-muted-foreground font-medium">Điểm nghẽn #1</p>
                <p className="text-sm font-bold text-amber-700 truncate">Nuốt âm tự nhiên</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-2xl border border-border/80">
                <p className="text-[11px] text-muted-foreground font-medium">Điểm nghẽn #2</p>
                <p className="text-sm font-bold text-rose-700 truncate">Dịch thô từng từ</p>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-2xl border border-border/60 space-y-1.5 text-xs sm:text-sm text-foreground/80">
              <p className="font-bold text-foreground flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-brand-blue" />
                Kết luận sơ bộ từ đội ngũ học thuật:
              </p>
              <p className="leading-relaxed font-normal">
                "Bạn không cần học lại toàn bộ tiếng Anh từ đầu. Bạn chỉ cần tháo gỡ đúng 2 điểm nghẽn này trước để điểm số tự nhiên bứt phá."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE ARIS WAY (ĐÁNH GIÁ -> CÁ NHÂN HÓA -> RÈN LUYỆN -> TIẾN BỘ)       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-border/70 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-muted-foreground uppercase">
              Phương Pháp Sư Phạm
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              The ARIS Way
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto font-normal">
              Chu trình rèn luyện dựa trên bằng chứng, không cảm tính.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-card rounded-3xl border border-border text-center space-y-2 shadow-xs">
              <div className="text-xs font-mono font-black text-brand-blue">BƯỚC 01</div>
              <h3 className="text-base font-black text-foreground">Đánh Giá</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">Bóc tách điểm nghẽn và thói quen làm bài.</p>
            </div>

            <div className="p-5 bg-card rounded-3xl border border-border text-center space-y-2 shadow-xs">
              <div className="text-xs font-mono font-black text-brand-blue">BƯỚC 02</div>
              <h3 className="text-base font-black text-foreground">Cá Nhân Hóa</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">Khoanh vùng đúng lỗ hổng cần sửa chữa trước.</p>
            </div>

            <div className="p-5 bg-card rounded-3xl border border-border text-center space-y-2 shadow-xs">
              <div className="text-xs font-mono font-black text-brand-blue">BƯỚC 03</div>
              <h3 className="text-base font-black text-foreground">Rèn Luyện</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">Chữa bài chi tiết từng câu, sửa đến khi chuẩn.</p>
            </div>

            <div className="p-5 bg-card rounded-3xl border border-border text-center space-y-2 shadow-xs">
              <div className="text-xs font-mono font-black text-brand-blue">BƯỚC 04</div>
              <h3 className="text-base font-black text-foreground">Tiến Bộ</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">Thăng tiến minh bạch theo chuẩn ARIS-7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CTA BANNER (THE NEXTBAND NAVY PALETTE)                            */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#002147] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Bắt đầu bằng việc biết chính xác bạn đang ở đâu.
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto font-normal leading-relaxed">
            Dành 15–20 phút làm bài chẩn đoán miễn phí. Bạn sẽ nhận được bản phân tích và định hướng trực tiếp qua Zalo.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleOpenModal}
              className="rounded-2xl px-9 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-white shadow-lg gap-2"
            >
              <span>KIỂM TRA MIỄN PHÍ NGAY</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-white/60 font-medium">
            Không yêu cầu thẻ ngân hàng • Không tự động đăng ký khóa học
          </p>
        </div>
      </section>

      {/* Footer tối giản */}
      <footer className="py-8 border-t border-border bg-background text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Học Viện ARIS. Nền Tảng Học Tập NextBand.</p>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 2-TIER CAO CẤP CHUẨN NEXTBAND (THEO ẢNH 3 MẪU)                      */}
      {/* ========================================================================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
          {/* Tier 1: Top Warm Banner (Tone hổ phách / vàng kem chuẩn Ảnh 3) */}
          <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-100/80 via-orange-50/60 to-amber-50/40 border-b border-amber-200/60 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Test IELTS Trực Tuyến</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Chẩn Đoán Năng Lực IELTS
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/75 mt-1.5 font-medium">
              <span className="font-semibold text-amber-800">⏱️ Thời lượng: 15–20 phút</span>
              <span>•</span>
              <span>Miễn phí 100%</span>
              <span>•</span>
              <span>Phân tích kết quả qua Zalo</span>
            </div>
          </div>

          {/* Tier 2: Form & Pill CTA (Chuẩn thanh lịch Ảnh 3) */}
          <div className="p-5 sm:p-6 space-y-4">
            <form onSubmit={handleStartDiagnostic} className="space-y-3.5">
              <div className="space-y-1 text-left">
                <Label htmlFor="diag-fullname" className="text-xs font-bold text-foreground">
                  Họ và tên thí sinh <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="diag-fullname"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  disabled={isStarting}
                />
              </div>

              <div className="space-y-1 text-left">
                <Label htmlFor="diag-phone" className="text-xs font-bold text-foreground">
                  Số điện thoại có Zalo (để nhận kết quả test) <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="diag-phone"
                  required
                  type="tel"
                  placeholder="Nhập SĐT có Zalo (Ví dụ: 0933 319 693)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  disabled={isStarting}
                />
                <p className="text-[11px] text-muted-foreground leading-normal">
                  * Giáo viên ARIS sẽ gửi bài chấm chi tiết và nhận xét qua Zalo theo số này.
                </p>
              </div>

              <div className="space-y-1 text-left">
                <Label htmlFor="diag-target" className="text-xs font-bold text-foreground">
                  Mục tiêu Band điểm
                </Label>
                <Select value={targetBand} onValueChange={setTargetBand} disabled={isStarting}>
                  <SelectTrigger id="diag-target" className="h-10 rounded-xl border-border bg-card text-foreground text-sm">
                    <SelectValue placeholder="Chọn mục tiêu" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="IELTS 5.0">IELTS 5.0 (Cơ bản / Tốt nghiệp ĐH)</SelectItem>
                    <SelectItem value="IELTS 5.5">IELTS 5.5 (Sơ trung cấp)</SelectItem>
                    <SelectItem value="IELTS 6.0">IELTS 6.0 (Xét tuyển ĐH / Du học)</SelectItem>
                    <SelectItem value="IELTS 6.5">IELTS 6.5 (Tiêu chuẩn đầu ra)</SelectItem>
                    <SelectItem value="IELTS 7.0">IELTS 7.0 (Chuyên sâu)</SelectItem>
                    <SelectItem value="IELTS 7.5+">IELTS 7.5+ (Xuất sắc / Định cư)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  disabled={isStarting}
                  className="w-full h-12 rounded-full font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200/80 shadow-xs transition-all gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isStarting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span>Đang kết nối phòng thi...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current text-blue-600" />
                      <span>Bắt đầu làm bài ngay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isStarting}
                  className="w-full h-8 rounded-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Hủy bỏ
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
