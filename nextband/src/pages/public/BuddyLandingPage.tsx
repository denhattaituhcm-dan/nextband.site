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
  Award,
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#F0F5FA] via-[#EBF2F8] to-[#E2EDF8] text-slate-900 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title="Thẻ Mời Học Cùng Bạn — Học Viện ARIS"
        description="Nhận ưu đãi 200.000đ học phí và ưu tiên xếp chung lớp khi đăng ký học IELTS tại ARIS qua lời mời từ bạn bè."
      />

      <div className="max-w-5xl mx-auto w-full my-auto space-y-6">
        {/* Main 2-Column Responsive Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-300/40 border border-slate-200/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT COLUMN: Invitation Story, Zalo Bubble & Perks (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-[#EDF5FF] via-[#F6F9FD] to-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/70 relative overflow-hidden">
              {/* Subtle Decorative Background Asset */}
              <div className="absolute -top-3 -right-3 opacity-15 pointer-events-none">
                <Gift className="w-28 h-28 text-[#0068FF]" />
              </div>

              <div className="space-y-5 relative z-10">
                {/* Header Badge with Warm Accent Touch */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white shadow-2xs border border-amber-400/40 text-xs font-bold tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span className="text-[#0068FF] font-extrabold">LỜI MỜI ĐỒNG HÀNH</span>
                  <span className="text-amber-500">•</span>
                  <span className="text-slate-700">ARIS IELTS</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    Nhận Ưu Đãi <span className="text-[#0068FF]">200.000đ</span> Học Phí
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {inviterName ? (
                      <>
                        Bạn nhận được lời mời học tập đặc quyền từ người bạn{" "}
                        <strong className="text-[#0068FF] font-bold">{inviterName}</strong>
                      </>
                    ) : (
                      "Đặc quyền độc quyền dành cho bạn bè học viên ARIS IELTS"
                    )}
                  </p>
                </div>

                {/* Friendly Chat Bubble (Inviter Greeting) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0068FF]/20 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-black text-sm shadow-xs">
                          {inviterInitial}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {inviterName || "Học viên ARIS"}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Học viên đang theo học</span>
                        </div>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] bg-amber-50 text-amber-900 border-amber-300/80 px-2.5 py-0.5 shrink-0 font-bold shadow-2xs"
                    >
                      {referralCode || "ARIS-BUDDY"}
                    </Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F0F6FF]/70 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    "Chào bạn! Tớ gửi bạn thẻ ưu đãi để cùng đăng ký học IELTS tại ARIS. Bạn được giảm ngay{" "}
                    <strong className="text-[#0068FF] font-bold">200.000đ</strong> và ưu tiên xếp vào học chung lớp với tớ nè! 🎉"
                  </div>
                </div>

                {/* 3 Value Pillars */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Đặc quyền bạn nhận được:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200/80 shadow-2xs space-y-1">
                      <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        🔥
                      </div>
                      <div className="text-xs font-bold text-slate-900">Giảm 200.000đ</div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Trừ trực tiếp vào học phí khóa học
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-gradient-to-b from-blue-50/70 to-white border border-blue-200/80 shadow-2xs space-y-1">
                      <div className="w-7 h-7 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        👥
                      </div>
                      <div className="text-xs font-bold text-slate-900">Ưu tiên xếp lớp</div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Học cùng ca & leo Top với bạn thân
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-gradient-to-b from-indigo-50/70 to-white border border-indigo-200/80 shadow-2xs space-y-1">
                      <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        ✨
                      </div>
                      <div className="text-xs font-bold text-slate-900">Đánh giá 1-1</div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        Bóc tách lỗi chi tiết với giáo viên
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-[11px] text-slate-500 relative z-10">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cam kết chính sách ưu đãi đồng hành chính hãng từ Học Viện ARIS.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Claim Form (5 cols on lg) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-center bg-white">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0068FF] uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Phiếu Đăng Ký Giữ Suất</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Kích Hoạt Ưu Đãi & Xếp Lớp
                  </h2>
                  <p className="text-xs text-slate-500">
                    Điền thông tin để đội ngũ cố vấn áp dụng mã giảm giá cho bạn.
                  </p>
                </div>

                {isRegistered ? (
                  <div className="text-center py-8 space-y-4 bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 animate-in fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-emerald-950">
                        Đã Ghi Nhận Ưu Đãi Thành Công!
                      </h3>
                      <p className="text-xs text-emerald-800 leading-relaxed max-w-xs mx-auto">
                        Cố vấn học thuật ARIS sẽ liên hệ qua số <strong>{phone}</strong> trong vòng 24h để hỗ trợ xếp lớp và áp dụng ưu đãi 200.000đ cho bạn.
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button
                        onClick={() => navigate("/assessment")}
                        className="w-full h-11 rounded-2xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white gap-2 shadow-xs"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Làm bài kiểm tra năng lực miễn phí ➔</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="space-y-1">
                      <Label htmlFor="fullName" className="text-xs font-bold text-slate-800">
                        Họ và tên của bạn <span className="text-rose-500">*</span>
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
                        Số điện thoại / Zalo nhận ưu đãi <span className="text-rose-500">*</span>
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
                          className="h-10 text-xs rounded-xl font-mono uppercase border-slate-200 focus:border-[#0068FF] focus:ring-[#0068FF]/20"
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

                    <div className="pt-1">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 text-xs sm:text-sm font-extrabold rounded-2xl bg-[#0068FF] hover:bg-[#0057D8] text-white shadow-md shadow-blue-500/25 gap-2 transition-all cursor-pointer"
                      >
                        <span>{isSubmitting ? "Đang xử lý..." : "Kích Hoạt Ưu Đãi 200.000đ Ngay"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-center text-[11px] text-slate-400 leading-tight pt-1">
                      🔒 Bảo mật thông tin · Tư vấn miễn phí trong 24h
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Floating Action Chips (Sub-Navigation) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs text-xs font-semibold transition-all hover:shadow-xs"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0068FF]" />
            <span>Test trình độ miễn phí</span>
          </Link>

          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs text-xs font-semibold transition-all hover:shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Xem danh sách khóa học</span>
          </Link>

          <a
            href="https://zalo.me/0933319693"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs text-xs font-semibold transition-all hover:shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tư vấn qua Zalo</span>
          </a>
        </div>

        {/* Footer Navigation */}
        <div className="text-center text-xs text-slate-400 space-x-3 pt-1">
          <Link to="/" className="hover:text-slate-600 underline underline-offset-4">
            Học Viện ARIS IELTS
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-slate-600 underline underline-offset-4">
            Về học viện
          </Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-slate-600 underline underline-offset-4">
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  );
}
