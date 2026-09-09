import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
      toast.error("Vui lòng nhập họ và tên của bạn");
      return;
    }
    if (!cleanPhone || cleanPhone.length < 9) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ (dùng Zalo để nhận báo cáo)");
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
        toast.success("Khởi tạo bài kiểm tra chẩn đoán thành công!");
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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-brand-red/10 selection:text-brand-red">
      <SEO
        title="Chẩn Đoán Trình Độ & Điểm Nghẽn IELTS — Học Viện ARIS"
        description="Bạn đang ở Band nào thật sự? Bài kiểm tra chẩn đoán học thuật giúp xác định chính xác trình độ, điểm mạnh và điểm nghẽn tư duy của bạn."
      />

      {/* ========================================================================= */}
      {/* MINIMAL BRAND HEADER                                                      */}
      {/* ========================================================================= */}
      <header className="border-b border-stone-200/80 bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SiteLogo />
            <span className="hidden sm:inline-block text-xs font-semibold tracking-wider text-stone-600 uppercase border-l border-stone-300 pl-3">
              Diagnostic System
            </span>
          </div>

          <Button
            size="sm"
            onClick={handleOpenModal}
            className="rounded-full px-5 font-bold text-xs sm:text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-sm"
          >
            Kiểm Tra Miễn Phí
          </Button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: ĐÁNH TRÚNG NỖI ĐAU & TÒ MÒ                                */}
      {/* ========================================================================= */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-stone-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-brand-red" />
            <span>Hệ Thống Đánh Giá Học Thuật ARIS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.15]">
            Bạn đang ở Band nào thật sự?
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed max-w-2xl mx-auto font-normal">
            Bài kiểm tra chẩn đoán giúp xác định chính xác trình độ và những{" "}
            <span className="font-bold text-stone-900 underline decoration-brand-red/40 underline-offset-4">
              điểm nghẽn tư duy
            </span>{" "}
            đang kéo điểm IELTS của bạn xuống.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleOpenModal}
              className="w-full sm:w-auto rounded-xl px-9 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-white shadow-md hover:shadow-lg transition-all gap-2"
            >
              <span>BẮT ĐẦU CHẨN ĐOÁN</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-stone-600" />
              15 – 20 phút
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-stone-600" />
              Không cần biết Band trước
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="h-4 w-4 text-stone-600" />
              Có bản phân tích cá nhân
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TẠI SAO KHÁC? (ARIS DIAGNOSTIC VS TEST THÔNG THƯỜNG)                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-stone-200/70 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-brand-red uppercase">
              Sự Khác Biệt
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Đây không phải bài test IELTS thông thường.
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto">
              Bài test thông thường chỉ đếm số câu đúng. ARIS phân tích cơ chế vì sao bạn sai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Box 1: Test thông thường */}
            <Card className="rounded-2xl border border-stone-200 bg-stone-50/60 p-6 sm:p-7 space-y-5">
              <div className="space-y-1">
                <Badge variant="outline" className="text-stone-500 border-stone-300 font-bold text-xs uppercase tracking-wider">
                  Test truyền thống
                </Badge>
                <h3 className="text-lg font-bold text-stone-800">Chỉ đo số lượng câu đúng</h3>
              </div>

              <div className="space-y-3 text-sm text-stone-600 font-medium">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs shrink-0 mt-0.5">1</div>
                  <span>Bạn làm một loạt câu hỏi ngẫu nhiên.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs shrink-0 mt-0.5">2</div>
                  <span>Hệ thống trả ra một con số: ví dụ Band 5.0.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs shrink-0 mt-0.5">3</div>
                  <span>Khuyên bạn "cần học thêm từ vựng" chung chung.</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-600 italic border-t border-stone-200">
                → Bạn vẫn hoang mang không biết bắt đầu sửa từ đâu.
              </div>
            </Card>

            {/* Box 2: ARIS Diagnostic */}
            <Card className="rounded-2xl border-2 border-brand-red/30 bg-brand-red/[0.02] p-6 sm:p-7 space-y-5 shadow-sm">
              <div className="space-y-1">
                <Badge className="bg-brand-red text-white font-bold text-xs uppercase tracking-wider">
                  ARIS Diagnostic
                </Badge>
                <h3 className="text-lg font-bold text-stone-900">Bóc tách điểm nghẽn tư duy</h3>
              </div>

              <div className="space-y-3 text-sm text-stone-800 font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span><strong>Bạn sai ở đâu:</strong> Nhận diện đúng vị trí đứt gãy.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span><strong>Vì sao bạn sai:</strong> Do kiến thức, phản xạ hay bẫy logic?</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <span><strong>Cần sửa thứ gì trước:</strong> Phác đồ khắc phục trúng đích.</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-brand-red font-semibold border-t border-brand-red/20">
                → Tiết kiệm hàng tháng trời tự bơi trong biển tài liệu.
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 4 KHU VỰC NĂNG LỰC ĐƯỢC SOI RÕ                                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-stone-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-stone-600 uppercase">
              Phạm Vi Đánh Giá
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              4 Năng lực được "soi" kỹ lưỡng
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Card className="rounded-2xl border border-stone-200/90 bg-white p-6 space-y-3 shadow-none hover:border-stone-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">LISTENING</h3>
              <p className="text-sm text-stone-600 font-medium">
                Nghe âm thanh <span className="text-stone-600">→</span> Nhận diện ngữ âm <span className="text-stone-600">→</span> Tốc độ xử lý thông tin thực tế.
              </p>
            </Card>

            <Card className="rounded-2xl border border-stone-200/90 bg-white p-6 space-y-3 shadow-none hover:border-stone-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">READING</h3>
              <p className="text-sm text-stone-600 font-medium">
                Đọc hiểu bản chất <span className="text-stone-600">→</span> Tìm bằng chứng khách quan <span className="text-stone-600">→</span> Tránh bẫy suy diễn.
              </p>
            </Card>

            <Card className="rounded-2xl border border-stone-200/90 bg-white p-6 space-y-3 shadow-none hover:border-stone-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <PenTool className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">WRITING & GRAMMAR</h3>
              <p className="text-sm text-stone-600 font-medium">
                Nhận diện cấu trúc <span className="text-stone-600">→</span> Tư duy cụm từ <span className="text-stone-600">→</span> Khả năng kiểm soát câu.
              </p>
            </Card>

            <Card className="rounded-2xl border border-stone-200/90 bg-white p-6 space-y-3 shadow-none hover:border-stone-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Mic className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">LOGIC & REASONING</h3>
              <p className="text-sm text-stone-600 font-medium">
                Hiểu ý niệm ngầm <span className="text-stone-600">→</span> Loại bỏ ngụy biện <span className="text-stone-600">→</span> Phản xạ ra quyết định.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BẠN SẼ NHẬN ĐƯỢC GÌ? (PREVIEW BẢN CHẨN ĐOÁN)                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-stone-200/70 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-brand-red uppercase">
              Kết Quả Trả Về
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Bạn sẽ nhận được gì sau bài test?
            </h2>
            <p className="text-base text-stone-600 max-w-lg mx-auto">
              Không chỉ là một điểm số khô khan. Bạn nhận được một bức tranh nhận thức rõ ràng.
            </p>
          </div>

          {/* Mockup Card Hồ Sơ Chẩn Đoán */}
          <div className="max-w-2xl mx-auto rounded-2xl border border-stone-300 bg-[#FAF9F5] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-4 gap-2">
              <div className="space-y-0.5">
                <p className="text-xs font-mono text-stone-600 uppercase">ARIS DIAGNOSTIC REPORT</p>
                <h4 className="text-base font-bold text-stone-900">Hồ Sơ Năng Lực Sơ Bộ</h4>
              </div>
              <Badge variant="outline" className="bg-white border-stone-300 text-stone-700 font-mono text-xs">
                #NB-ANALYSIS
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <p className="text-[11px] text-stone-600 font-medium">Trình độ ước tính</p>
                <p className="text-lg font-black text-brand-red">5.0 – 5.5</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <p className="text-[11px] text-stone-600 font-medium">Điểm mạnh</p>
                <p className="text-sm font-bold text-emerald-600 truncate">Reading Evidence</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <p className="text-[11px] text-stone-600 font-medium">Điểm nghẽn #1</p>
                <p className="text-sm font-bold text-amber-700 truncate">Nuốt âm tự nhiên</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <p className="text-[11px] text-stone-600 font-medium">Điểm nghẽn #2</p>
                <p className="text-sm font-bold text-rose-700 truncate">Dịch thô Word-by-word</p>
              </div>
            </div>

            <div className="p-4 bg-stone-100 rounded-xl space-y-1.5 text-xs sm:text-sm text-stone-700">
              <p className="font-bold text-stone-900 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-brand-red" />
                Kết luận sơ bộ từ đội ngũ học thuật:
              </p>
              <p className="leading-relaxed">
                "Bạn không cần học lại toàn bộ tiếng Anh từ đầu. Bạn chỉ cần tháo gỡ đúng 2 điểm nghẽn này trước để điểm số tự nhiên bứt phá."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE ARIS WAY (ĐÁNH GIÁ -> CÁ NHÂN HÓA -> RÈN LUYỆN -> TIẾN BỘ)       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-stone-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-stone-600 uppercase">
              Phương Pháp Sư Phạm
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              The ARIS Way
            </h2>
            <p className="text-base text-stone-600 max-w-lg mx-auto">
              Chu trình rèn luyện dựa trên bằng chứng, không cảm tính.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="text-xs font-mono font-bold text-brand-red">BƯỚC 01</div>
              <h3 className="text-base font-extrabold text-stone-900">Đánh Giá</h3>
              <p className="text-xs text-stone-600 leading-relaxed">Bóc tách điểm nghẽn và thói quen làm bài.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="text-xs font-mono font-bold text-brand-red">BƯỚC 02</div>
              <h3 className="text-base font-extrabold text-stone-900">Cá Nhân Hóa</h3>
              <p className="text-xs text-stone-600 leading-relaxed">Khoanh vùng đúng lỗ hổng cần sửa chữa trước.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="text-xs font-mono font-bold text-brand-red">BƯỚC 03</div>
              <h3 className="text-base font-extrabold text-stone-900">Rèn Luyện</h3>
              <p className="text-xs text-stone-600 leading-relaxed">Chữa bài chi tiết từng câu, sửa đến khi chuẩn.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="text-xs font-mono font-bold text-brand-red">BƯỚC 04</div>
              <h3 className="text-base font-extrabold text-stone-900">Tiến Bộ</h3>
              <p className="text-xs text-stone-600 leading-relaxed">Thăng tiến minh bạch theo chuẩn ARIS-7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CTA BANNER                                                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#1F2937] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Bắt đầu bằng việc biết chính xác bạn đang ở đâu.
          </h2>
          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto font-normal">
            Dành 15–20 phút làm bài chẩn đoán miễn phí. Bạn sẽ nhận được bản phân tích và định hướng trực tiếp qua Zalo.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleOpenModal}
              className="rounded-xl px-9 h-14 font-extrabold text-base sm:text-lg bg-brand-red hover:bg-brand-red-hover text-white shadow-lg gap-2"
            >
              <span>KIỂM TRA MIỄN PHÍ NGAY</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-stone-400">
            Không yêu cầu thẻ ngân hàng • Không tự động đăng ký khóa học
          </p>
        </div>
      </section>

      {/* Footer tối giản */}
      <footer className="py-8 border-t border-stone-200 text-center text-xs text-stone-600">
        <p>© {new Date().getFullYear()} Học Viện ARIS. Nền Tảng Học Tập NextBand.</p>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL KÍCH HOẠT BÀI CHẨN ĐOÁN & THU THẬP ZALO (O2O LEAD CAPTURE)          */}
      {/* ========================================================================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 sm:p-7">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-xl font-bold text-stone-900">
              Khởi Tạo Bài Chẩn Đoán IELTS
            </DialogTitle>
            <DialogDescription className="text-sm text-stone-600">
              Nhập thông tin để hệ thống tạo phòng thi và gửi bản phân tích điểm nghẽn qua Zalo cho bạn.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleStartDiagnostic} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="diag-fullname" className="text-xs font-bold text-stone-700">
                Họ và tên của bạn <span className="text-brand-red">*</span>
              </Label>
              <Input
                id="diag-fullname"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11 rounded-xl"
                disabled={isStarting}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="diag-phone" className="text-xs font-bold text-stone-700">
                Số điện thoại (dùng Zalo) <span className="text-brand-red">*</span>
              </Label>
              <Input
                id="diag-phone"
                type="tel"
                placeholder="Ví dụ: 0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-xl"
                disabled={isStarting}
              />
              <p className="text-[11px] text-stone-600">
                Chúng tôi dùng số này để gửi Hồ sơ phân tích điểm nghẽn qua Zalo.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="diag-target" className="text-xs font-bold text-stone-700">
                Mục tiêu mong muốn của bạn
              </Label>
              <Select value={targetBand} onValueChange={setTargetBand} disabled={isStarting}>
                <SelectTrigger id="diag-target" className="h-11 rounded-xl">
                  <SelectValue placeholder="Chọn mục tiêu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IELTS 5.0 - 5.5">Band 5.0 – 5.5 (Tốt nghiệp / Căn bản)</SelectItem>
                  <SelectItem value="IELTS 6.0 - 6.5">Band 6.0 – 6.5 (Chuẩn đầu ra / Công việc)</SelectItem>
                  <SelectItem value="IELTS 7.0 - 7.5+">Band 7.0 – 7.5+ (Học bổng / Du học / Định cư)</SelectItem>
                  <SelectItem value="Chưa rõ mục tiêu">Chưa rõ mục tiêu (Cần tư vấn thêm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                disabled={isStarting}
                className="w-full h-12 rounded-xl font-bold text-base bg-brand-red hover:bg-brand-red-hover text-white shadow-sm"
              >
                {isStarting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Đang tạo phòng thi...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Bắt Đầu Làm Bài Test Ngay
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-center text-xs text-stone-600 pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Bảo mật thông tin tuyệt đối • 100% Miễn phí</span>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
