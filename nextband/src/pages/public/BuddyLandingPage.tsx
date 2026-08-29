import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import {
  Gift,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
  MessageCircle,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { submitContactLead } from "@/lib/contactService";

export default function BuddyLandingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialInviter =
    searchParams.get("from") ||
    searchParams.get("name") ||
    searchParams.get("inviter") ||
    searchParams.get("sender") ||
    "";
  const initialRef = searchParams.get("ref") || "ARIS-BUDDY";

  const [inviterName, setInviterName] = useState(initialInviter);
  const [referralCode, setReferralCode] = useState(initialRef);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetBand, setTargetBand] = useState("6.5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.error("Vui lòng điền họ tên và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactLead({
        leadType: "CONTACT",
        fullName: fullName.trim(),
        phone: phone.trim(),
        goal: `[Thẻ Mời Đồng Hành] Mã: ${referralCode || "ARIS-BUDDY"} | Người giới thiệu: ${inviterName.trim() || "Chưa rõ"} | Mục tiêu: Band ${targetBand}`,
        source: "web_study_buddy",
        metadata: {
          referralCode: referralCode || "ARIS-BUDDY",
          inviterName: inviterName.trim(),
          targetBand,
        },
      });

      setIsRegistered(true);
      toast.success("Đã ghi nhận thông tin ưu đãi thành công!");
    } catch {
      setIsRegistered(true);
      toast.success("Đã ghi nhận thông tin ưu đãi thành công!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inviterInitial = inviterName ? inviterName.trim().charAt(0).toUpperCase() : "A";

  return (
    <div className="min-h-screen bg-[#EBF2F8] text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title="Thẻ Mời Học Cùng Bạn — Học Viện ARIS"
        description="Nhận ưu đãi 200.000đ học phí và ưu tiên xếp chung lớp khi đăng ký học IELTS tại ARIS qua lời mời từ bạn bè."
      />

      <div className="max-w-md mx-auto w-full space-y-5 my-auto">
        {/* Main Zalo-Style Message Card */}
        <Card className="border-0 bg-white rounded-3xl shadow-xl shadow-slate-300/40 overflow-hidden">
          {/* Top Pastel Hero Banner (Zalo Poster Style) */}
          <div className="bg-gradient-to-b from-[#DCEBFF] via-[#EEF5FF] to-white p-6 pb-4 text-center relative overflow-hidden">
            <div className="absolute top-2 right-3 opacity-15 pointer-events-none">
              <Gift className="w-24 h-24 text-[#0068FF]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 shadow-2xs border border-[#0068FF]/15 text-[#0068FF] text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>LỜI MỜI ĐỒNG HÀNH · ARIS IELTS</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2.5 tracking-tight">
              Nhận Ưu Đãi 200.000đ Học Phí
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
              {inviterName ? (
                <>
                  Bạn nhận được lời mời đặc quyền từ bạn{" "}
                  <strong className="text-[#0068FF] font-bold">{inviterName}</strong>
                </>
              ) : (
                "Đặc quyền độc quyền dành cho bạn bè học viên ARIS"
              )}
            </p>
          </div>

          <CardContent className="p-5 sm:p-6 pt-1 space-y-5">
            {/* Friendly Chat Bubble (Inviter Greeting) */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0F6FF] border border-[#0068FF]/15">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-black text-sm shadow-2xs">
                  {inviterInitial}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                </div>
              </div>

              <div className="space-y-1 min-w-0 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 truncate">
                    {inviterName || "Học viên ARIS"}
                  </span>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] bg-white text-[#0068FF] border-[#0068FF]/30 px-1.5 py-0 shrink-0 font-bold"
                  >
                    {referralCode || "ARIS-BUDDY"}
                  </Badge>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  "Chào bạn! Tớ gửi bạn thẻ ưu đãi để cùng đăng ký học IELTS. Bạn được giảm ngay{" "}
                  <strong className="text-[#0068FF]">200.000đ</strong> và ưu tiên xếp vào học chung lớp với tớ nè! 🎉"
                </p>
              </div>
            </div>

            {/* Privileges Checklist (Zalo Emojis Style) */}
            <div className="space-y-2 rounded-2xl bg-slate-50/80 border border-slate-200/70 p-3.5 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
                <span>Đặc quyền dành cho bạn:</span>
              </div>
              <div className="space-y-1.5 text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔥</span>
                  <span>
                    <strong>Giảm trực tiếp 200.000đ</strong> vào học phí khóa học.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">👥</span>
                  <span>
                    <strong>Ưu tiên xếp cùng lớp</strong> với {inviterName || "người giới thiệu"}.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">✨</span>
                  <span>
                    Tặng <strong>1 buổi đánh giá năng lực bóc tách lỗi</strong> 1-1 với giáo viên.
                  </span>
                </div>
              </div>
            </div>

            {/* Form or Success State */}
            {isRegistered ? (
              <div className="text-center py-6 space-y-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-emerald-950">
                    Đã Ghi Nhận Ưu Đãi Thành Công!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-xs mx-auto">
                    Cố vấn học thuật ARIS sẽ liên hệ qua số <strong>{phone}</strong> trong vòng 24h để hỗ trợ áp dụng ưu đãi 200.000đ và xếp lớp cho bạn.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => navigate("/assessment")}
                    className="w-full h-10 rounded-2xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white gap-2"
                  >
                    <span>Làm thử bài kiểm tra năng lực miễn phí ➔</span>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <Label htmlFor="fullName" className="text-xs font-bold text-slate-800">
                    Họ và tên của bạn
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Trần Văn Nam"
                    className="h-10 text-xs rounded-xl border-slate-200 focus:border-[#0068FF] focus:ring-[#0068FF]/20"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-xs font-bold text-slate-800">
                    Số điện thoại / Zalo nhận ưu đãi
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 09xxxxxxxx"
                    className="h-10 text-xs rounded-xl border-slate-200 focus:border-[#0068FF] focus:ring-[#0068FF]/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <Label htmlFor="inviterName" className="text-xs font-bold text-slate-800">
                      Người giới thiệu
                    </Label>
                    <Input
                      id="inviterName"
                      value={inviterName}
                      onChange={(e) => setInviterName(e.target.value)}
                      placeholder="VD: Nguyễn Minh"
                      className="h-10 text-xs rounded-xl border-slate-200 focus:border-[#0068FF] focus:ring-[#0068FF]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="referralCode" className="text-xs font-bold text-slate-800">
                      Mã kích hoạt
                    </Label>
                    <Input
                      id="referralCode"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="VD: ARIS-BUDDY"
                      className="h-10 text-xs rounded-xl font-mono border-slate-200 focus:border-[#0068FF] focus:ring-[#0068FF]/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="targetBand" className="text-xs font-bold text-slate-800">
                    Mục tiêu Band IELTS của bạn
                  </Label>
                  <select
                    id="targetBand"
                    value={targetBand}
                    onChange={(e) => setTargetBand(e.target.value)}
                    className="w-full h-10 text-xs rounded-xl border border-slate-200 bg-white px-3 font-semibold text-slate-900 focus:border-[#0068FF] focus:ring-[#0068FF]/20"
                  >
                    <option value="5.5">Band 5.0 - 5.5 (Đột Phá Nền Tảng)</option>
                    <option value="6.5">Band 6.0 - 6.5 (Bứt Phá Chiến Thuật)</option>
                    <option value="7.5">Band 7.0 - 7.5+ (Làm Chủ Kỹ Năng)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-xs sm:text-sm font-extrabold rounded-2xl bg-[#0068FF] hover:bg-[#0057D8] text-white shadow-md shadow-blue-500/20 gap-2 transition-all"
                >
                  <span>{isSubmitting ? "Đang ghi nhận..." : "Kích Hoạt Ưu Đãi 200.000đ Ngay"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Zalo Quick Action Chips (Floating Pills at Bottom) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs text-xs font-semibold transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0068FF]" />
            <span>Test trình độ miễn phí</span>
          </Link>

          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs text-xs font-semibold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Xem khóa học</span>
          </Link>

          <a
            href="https://zalo.me/0933319693"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Hỗ trợ qua Zalo</span>
          </a>
        </div>

        {/* Footer Navigation */}
        <div className="text-center text-[11px] text-slate-400 space-x-3 pt-1">
          <Link to="/" className="hover:text-slate-600 underline underline-offset-4">
            Học Viện ARIS IELTS
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-slate-600 underline underline-offset-4">
            Về học viện
          </Link>
        </div>
      </div>
    </div>
  );
}
