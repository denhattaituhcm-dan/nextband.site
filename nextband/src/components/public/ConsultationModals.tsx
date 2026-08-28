import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertCircle, Compass, ShieldCheck, BookOpen, Send, ArrowRight, Play, FileCheck } from "lucide-react";
import { submitContactLead } from "@/lib/contactService";
import { assessmentApi } from "@/lib/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";

// Common Modal Props
interface ModalBaseProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// -------------------------------------------------------------
// 1. MODAL: TƯ VẤN LỘ TRÌNH IELTS
// -------------------------------------------------------------
export function RoadmapConsultationModal({ isOpen, onOpenChange }: ModalBaseProps) {
  const { settings } = useSiteSettings();
  const zaloUrl = settings?.zaloLink || "https://zalo.me";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetBand, setTargetBand] = useState("Chưa xác định");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setErrorMessage(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanName || !cleanPhone) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await submitContactLead({
        leadType: "CONTACT",
        fullName: cleanName,
        phone: cleanPhone,
        goal: `Tư vấn lộ trình IELTS | Mục tiêu: ${targetBand}`,
        source: "bubble_roadmap_consultation",
        metadata: {
          intent: "roadmap_consultation",
          targetBand,
        },
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage("Không thể gửi thông tin. Bạn có thể nhắn trực tiếp qua Zalo với chúng tôi.");
      }
    } catch (err: any) {
      console.error("Roadmap consultation lead error:", err);
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng liên hệ trực tiếp qua Zalo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[460px] p-0 rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
        {isSubmitted ? (
          <div className="text-center p-6 sm:p-7 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-foreground">
                Đã Nhận Thông Tin
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-sm mx-auto">
                Cảm ơn <strong>{fullName}</strong>. Cố vấn học thuật ARIS sẽ liên hệ qua Zalo/SĐT{" "}
                <strong>{phone}</strong> để tư vấn lộ trình học phù hợp nhất.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/80 text-left space-y-1.5 text-xs text-foreground/80">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nhu cầu:</span>
                <span className="font-semibold text-foreground">Tư vấn lộ trình IELTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mục tiêu Band:</span>
                <span className="font-semibold text-brand-red">{targetBand}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleClose}
                className="w-full h-11 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Hoàn tất
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tier 1: Top Warm Banner */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-100/70 via-orange-50/50 to-amber-50/30 border-b border-amber-200/50 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>Định Hướng Học Tập 1:1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                TƯ VẤN LỘ TRÌNH IELTS
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed mt-1">
                ARIS bóc tách năng lực hiện tại, tư vấn mục tiêu và xây dựng lộ trình học cá nhân hóa cho bạn.
              </p>
            </div>

            {/* Tier 2: Form Content & Soft Pill CTA */}
            <div className="p-5 sm:p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => window.open(zaloUrl, "_blank", "noopener,noreferrer")}
                    className="w-full h-8 rounded-full bg-[#0068FF] hover:bg-[#0057d9] text-white text-xs font-semibold"
                  >
                    <Send className="w-3 h-3 mr-1.5" />
                    Nhắn trực tiếp qua Zalo
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Họ và tên */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="roadmap-name" className="text-xs font-bold text-foreground">
                    Họ và tên <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="roadmap-name"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  />
                </div>

                {/* Số điện thoại / Zalo */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="roadmap-phone" className="text-xs font-bold text-foreground">
                    Số điện thoại có Zalo <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="roadmap-phone"
                    required
                    type="tel"
                    placeholder="Nhập SĐT có Zalo (Ví dụ: 0933 319 693)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  />
                </div>

                {/* Mục tiêu IELTS */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="roadmap-target" className="text-xs font-bold text-foreground">
                    Mục tiêu IELTS
                  </Label>
                  <Select value={targetBand} onValueChange={setTargetBand}>
                    <SelectTrigger id="roadmap-target" className="h-10 rounded-xl border-border bg-card text-foreground text-sm">
                      <SelectValue placeholder="Chọn mục tiêu" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Chưa xác định">Chưa xác định (Cần định hướng)</SelectItem>
                      <SelectItem value="5.0">Mục tiêu 5.0</SelectItem>
                      <SelectItem value="6.0">Mục tiêu 6.0</SelectItem>
                      <SelectItem value="6.5">Mục tiêu 6.5</SelectItem>
                      <SelectItem value="7.0+">Mục tiêu 7.0+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary Action Button (Soft Pill CTA) */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-full font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200/80 shadow-xs transition-all cursor-pointer active:scale-[0.99]"
                  >
                    {loading ? "Đang xử lý..." : "Đăng ký nhận tư vấn lộ trình"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// -------------------------------------------------------------
// 2. MODAL: THI THỬ IELTS 4 KỸ NĂNG (ENTRANCE TEST)
// -------------------------------------------------------------
export function AssessmentRegistrationModal({ isOpen, onOpenChange }: ModalBaseProps) {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const zaloUrl = settings?.zaloLink || "https://zalo.me";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetBand, setTargetBand] = useState("Chưa xác định");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<{
    sessionId: string;
  } | null>(null);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setErrorMessage(null);
      setActiveSession(null);
    }, 200);
  };

  const handleStartExam = () => {
    handleClose();
    if (activeSession?.sessionId) {
      navigate(`/assessment/take/${activeSession.sessionId}`);
    } else {
      navigate(`/assessment`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage("Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự)");
      return;
    }

    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 9) {
      setErrorMessage("Vui lòng nhập số điện thoại hợp lệ (tối thiểu 9 chữ số)");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Dedicated Assessment Session Initialization (Backend creates session & issues session JWT)
      const sessionRes = await assessmentApi.createSession({
        fullName: cleanName,
        phone: cleanPhone,
        targetBand,
      });

      if (sessionRes?.sessionId) {
        setActiveSession({
          sessionId: sessionRes.sessionId,
        });
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch (err: any) {
      console.warn("Assessment session initialization notice:", err);
      setErrorMessage(err.message || "Không thể khởi tạo phiên khảo thí. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[480px] p-0 rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
        {isSubmitted ? (
          <div className="text-center p-6 sm:p-7 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Đã Sẵn Sàng Vào Phòng Kiểm Tra!
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-sm mx-auto">
                Chào <strong>{fullName}</strong>! Phòng kiểm tra đã chuẩn bị sẵn sàng bộ câu hỏi <strong>Chẩn đoán 4 Kỹ Năng &amp; Ngữ Pháp</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 text-left space-y-2 text-xs text-foreground/85">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bài kiểm tra:</span>
                <span className="font-bold text-foreground">ARIS Placement Assessment (4 Kỹ Năng)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thời lượng:</span>
                <strong className="text-foreground">60 Phút (Miễn phí)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mục tiêu Band:</span>
                <strong className="text-brand-red">{targetBand}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SĐT / Zalo nhận kết quả:</span>
                <strong className="text-brand-blue">{phone}</strong>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                onClick={handleStartExam}
                className="w-full h-12 rounded-full font-black text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-md gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Bắt Đầu Làm Bài Kiểm Tra Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full h-10 rounded-full font-bold text-xs border border-border hover:bg-muted"
              >
                Huỷ
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tier 1: Top Warm Banner */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-100/70 via-orange-50/50 to-amber-50/30 border-b border-amber-200/50 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Định Vị Năng Lực 4 Kỹ Năng</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                BÀI TEST TRÌNH ĐỘ IELTS
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/75 mt-1.5">
                <span className="font-semibold text-amber-800">⏱️ Thời lượng: 60 phút</span>
                <span>•</span>
                <span>Miễn phí 100%</span>
                <span>•</span>
                <span>Nhận phân tích lỗi sai qua Zalo</span>
              </div>
            </div>

            {/* Tier 2: Form & CTA */}
            <div className="p-5 sm:p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => window.open(zaloUrl, "_blank", "noopener,noreferrer")}
                    className="w-full h-8 rounded-full bg-[#0068FF] hover:bg-[#0057d9] text-white text-xs font-semibold"
                  >
                    <Send className="w-3 h-3 mr-1.5" />
                    Nhắn trực tiếp qua Zalo
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Họ và tên */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="assessment-name" className="text-xs font-bold text-foreground">
                    Họ và tên thí sinh <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="assessment-name"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  />
                </div>

                {/* Số điện thoại / Zalo */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="assessment-phone" className="text-xs font-bold text-foreground">
                    Số điện thoại có Zalo (để nhận bài chấm chi tiết) <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="assessment-phone"
                    required
                    type="tel"
                    placeholder="Nhập SĐT có Zalo (Ví dụ: 0933 319 693)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  />
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    * Cố vấn học thuật ARIS sẽ gửi bài chấm chi tiết và nhận xét qua Zalo theo số này.
                  </p>
                </div>

                {/* Mục tiêu IELTS */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="assessment-target" className="text-xs font-bold text-foreground">
                    Mục tiêu Band điểm
                  </Label>
                  <Select value={targetBand} onValueChange={setTargetBand}>
                    <SelectTrigger id="assessment-target" className="h-10 rounded-xl border-border bg-card text-foreground text-sm">
                      <SelectValue placeholder="Chọn mục tiêu" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Chưa xác định">Chưa xác định (Cần định hướng)</SelectItem>
                      <SelectItem value="5.0">Mục tiêu 5.0</SelectItem>
                      <SelectItem value="6.0">Mục tiêu 6.0</SelectItem>
                      <SelectItem value="6.5">Mục tiêu 6.5</SelectItem>
                      <SelectItem value="7.0+">Mục tiêu 7.0+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary Action Button (Soft Blue Pill CTA) */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-full font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200/80 shadow-xs transition-all gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Play className="w-4 h-4 fill-current text-blue-600" />
                    <span>{loading ? "Đang khởi tạo phòng thi..." : "Bắt Đầu Làm Bài Kiểm Tra"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// -------------------------------------------------------------
// 3. MODAL: ĐĂNG KÝ HỌC THỬ
// -------------------------------------------------------------
export function TrialClassModal({ isOpen, onOpenChange }: ModalBaseProps) {
  const { settings } = useSiteSettings();
  const zaloUrl = settings?.zaloLink || "https://zalo.me";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [learningMode, setLearningMode] = useState<"offline" | "online">("offline");
  const [course, setCourse] = useState("STARTER (Mất gốc → 3.0)");
  const [schedule, setSchedule] = useState("Tối Thứ 2 - 4 - 6 (Ca 1: 17:30 - 19:30)");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setErrorMessage(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, "");

    if (!cleanName || !cleanPhone) return;

    setLoading(true);
    setErrorMessage(null);

    const modeText = learningMode === "offline" ? "Offline tại cơ sở" : "Online qua Zoom";

    try {
      const res = await submitContactLead({
        leadType: "QUICK_TRIAL",
        fullName: cleanName,
        phone: cleanPhone,
        course,
        preferredSchedule: `${schedule} (${modeText})`,
        goal: `Đăng ký học thử | Khóa: ${course} | Hình thức: ${modeText} | Ca học: ${schedule}`,
        source: "bubble_trial_class",
        metadata: {
          intent: "trial_class",
          learningMode,
          course,
          schedule,
        },
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage("Không thể gửi thông tin. Bạn có thể nhắn trực tiếp qua Zalo với chúng tôi.");
      }
    } catch (err: any) {
      console.error("Trial class lead error:", err);
      setErrorMessage("Không thể kết nối máy chủ. Vui lòng liên hệ trực tiếp qua Zalo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[460px] p-0 rounded-3xl bg-card border border-border overflow-hidden shadow-2xl">
        {isSubmitted ? (
          <div className="text-center p-6 sm:p-7 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-foreground">
                Đã Nhận Đăng Ký Học Thử
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-sm mx-auto">
                Cảm ơn <strong>{fullName}</strong>. ARIS sẽ liên hệ qua Zalo/SĐT{" "}
                <strong>{phone}</strong> để tư vấn lớp phù hợp và sắp xếp lịch học thử.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/80 text-left space-y-1.5 text-xs text-foreground/80">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Khóa học quan tâm:</span>
                <span className="font-semibold text-foreground">{course}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hình thức:</span>
                <span className="font-semibold text-foreground">
                  {learningMode === "offline" ? "Offline tại lớp" : "Online qua Zoom"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ca học mong muốn:</span>
                <span className="font-semibold text-brand-red">{schedule}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleClose}
                className="w-full h-11 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Hoàn tất
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tier 1: Top Warm Banner */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-100/70 via-orange-50/50 to-amber-50/30 border-b border-amber-200/50 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Trải Nghiệm Thực Tế</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                ĐĂNG KÝ HỌC THỬ MIỄN PHÍ
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed mt-1">
                Trải nghiệm lớp học thực tế và phương pháp học thuật tại Học viện ARIS.
              </p>
            </div>

            {/* Tier 2: Form & Pill CTA */}
            <div className="p-5 sm:p-6 space-y-3.5">
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => window.open(zaloUrl, "_blank", "noopener,noreferrer")}
                    className="w-full h-8 rounded-full bg-[#0068FF] hover:bg-[#0057d9] text-white text-xs font-semibold"
                  >
                    <Send className="w-3 h-3 mr-1.5" />
                    Nhắn trực tiếp qua Zalo
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Họ và tên */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="trial-name" className="text-xs font-bold text-foreground">
                    Họ và tên <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="trial-name"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  />
                </div>

                {/* Số điện thoại / Zalo */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="trial-phone" className="text-xs font-bold text-foreground">
                    Số điện thoại có Zalo <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="trial-phone"
                    required
                    type="tel"
                    placeholder="Nhập SĐT có Zalo (Ví dụ: 0933 319 693)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 rounded-xl border-border bg-card text-foreground text-sm"
                  />
                </div>

                {/* Hình thức học */}
                <div className="space-y-1 text-left">
                  <Label className="text-xs font-bold text-foreground">Hình thức học</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLearningMode("offline")}
                      className={`h-9 px-3 rounded-full text-xs font-semibold border transition-all text-center ${
                        learningMode === "offline"
                          ? "bg-amber-500/15 text-amber-900 border-amber-500/40 shadow-xs font-bold"
                          : "bg-muted/50 border-border text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      Offline tại cơ sở
                    </button>
                    <button
                      type="button"
                      onClick={() => setLearningMode("online")}
                      className={`h-9 px-3 rounded-full text-xs font-semibold border transition-all text-center ${
                        learningMode === "online"
                          ? "bg-amber-500/15 text-amber-900 border-amber-500/40 shadow-xs font-bold"
                          : "bg-muted/50 border-border text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      Online qua Zoom
                    </button>
                  </div>
                </div>

                {/* Khóa học quan tâm */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="trial-course" className="text-xs font-bold text-foreground">
                    Khóa học quan tâm
                  </Label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger id="trial-course" className="h-10 rounded-xl border-border bg-card text-foreground text-sm">
                      <SelectValue placeholder="Chọn khóa học" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="STARTER (Mất gốc → 3.0)">STARTER (Mất gốc → 3.0)</SelectItem>
                      <SelectItem value="DREAMER (3.0 → 4.0)">DREAMER (3.0 → 4.0)</SelectItem>
                      <SelectItem value="BUILDER (4.0 → 5.0)">BUILDER (4.0 → 5.0)</SelectItem>
                      <SelectItem value="MASTER (5.0 → 6.0)">MASTER (5.0 → 6.0)</SelectItem>
                      <SelectItem value="LEADER (6.0 → 6.5+)">LEADER (6.0 → 6.5+)</SelectItem>
                      <SelectItem value="Cần ARIS tư vấn thêm">Chưa rõ (Cần ARIS tư vấn)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ca học mong muốn */}
                <div className="space-y-1 text-left">
                  <Label htmlFor="trial-schedule" className="text-xs font-bold text-foreground">
                    Ca học mong muốn
                  </Label>
                  <Select value={schedule} onValueChange={setSchedule}>
                    <SelectTrigger id="trial-schedule" className="h-10 rounded-xl border-border bg-card text-foreground text-sm">
                      <SelectValue placeholder="Chọn ca học" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Tối Thứ 2 - 4 - 6 (Ca 1: 17:30 - 19:30)">Tối Thứ 2 - 4 - 6 (Ca 1: 17:30 - 19:30)</SelectItem>
                      <SelectItem value="Tối Thứ 2 - 4 - 6 (Ca 2: 19:30 - 21:30)">Tối Thứ 2 - 4 - 6 (Ca 2: 19:30 - 21:30)</SelectItem>
                      <SelectItem value="Tối Thứ 3 - 5 - 7 (Ca 1: 17:30 - 19:30)">Tối Thứ 3 - 5 - 7 (Ca 1: 17:30 - 19:30)</SelectItem>
                      <SelectItem value="Tối Thứ 3 - 5 - 7 (Ca 2: 19:30 - 21:30)">Tối Thứ 3 - 5 - 7 (Ca 2: 19:30 - 21:30)</SelectItem>
                      <SelectItem value="Cuối tuần T7 - CN (Sáng: 09:00 - 11:00)">Cuối tuần T7 - CN (Sáng: 09:00 - 11:00)</SelectItem>
                      <SelectItem value="Cuối tuần T7 - CN (Chiều: 15:00 - 17:00)">Cuối tuần T7 - CN (Chiều: 15:00 - 17:00)</SelectItem>
                      <SelectItem value="Linh hoạt theo tư vấn">Linh hoạt theo tư vấn của trung tâm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary Action Button (Soft Blue Pill CTA) */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-full font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200/80 shadow-xs transition-all cursor-pointer active:scale-[0.99]"
                  >
                    {loading ? "Đang xử lý..." : "Đăng ký xếp lớp học thử"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
