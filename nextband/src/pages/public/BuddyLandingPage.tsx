import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import {
  Gift,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export default function BuddyLandingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const referralCode = searchParams.get("ref") || "ARIS-BUDDY";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetBand, setTargetBand] = useState("6.5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      toast.error("Vui lòng điền họ tên và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    // Simulate consultation / discount lead capture
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      toast.success("Đã ghi nhận thông tin ưu đãi thành công!");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Thẻ Mời Học Cùng Bạn — Học Viện ARIS"
        description="Nhận ưu đãi 200.000đ học phí và ưu tiên xếp chung lớp khi đăng ký học IELTS tại ARIS qua lời mời từ bạn bè."
      />

      <div className="max-w-xl mx-auto w-full space-y-6 my-auto">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold font-mono">
            <Gift className="w-3.5 h-3.5" />
            <span>OFFICIAL STUDY BUDDY INVITATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Học Viện ARIS IELTS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Học tiếng Anh từ bản chất · Bóc tách từng lỗi sai cùng bạn thân
          </p>
        </div>

        {/* The Main Invitation Card */}
        <Card className="border border-slate-200/90 bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="h-1.5 w-full bg-rose-600" />

          <CardHeader className="p-6 pb-4 space-y-2 text-center border-b border-slate-100">
            <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold font-mono">
              Lời mời đặc quyền từ học viên ARIS
            </div>
            <CardTitle className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Nhận Ưu Đãi 200.000đ Học Phí
            </CardTitle>
            <CardDescription className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Bạn nhận được Thẻ Mời Đồng Hành với mã kích hoạt:{" "}
              <strong className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {referralCode}
              </strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-7 space-y-6">
            {/* Privileges Checklist */}
            <div className="rounded-2xl bg-slate-50/90 border border-slate-200/80 p-4 space-y-2.5 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Đặc quyền dành riêng cho bạn khi đăng ký:</span>
              </div>
              <div className="space-y-1.5 text-slate-700 pl-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Giảm trực tiếp 200.000đ</strong> vào học phí khóa học.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Ưu tiên xếp chung lớp</strong> để cùng thi đua leo Top với người mời.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Tặng <strong>1 buổi đánh giá năng lực bóc tách lỗi chi tiết</strong> với giáo viên.
                  </span>
                </div>
              </div>
            </div>

            {/* Form or Success State */}
            {isRegistered ? (
              <div className="text-center py-6 space-y-3 bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-emerald-950">
                    Đã Ghi Nhận Mã Ưu Đãi Thành Công!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Cố vấn học thuật của ARIS sẽ liên hệ qua số <strong>{phone}</strong> trong vòng 24h để hỗ trợ áp dụng ưu đãi 200.000đ và sắp xếp lớp học cho bạn.
                  </p>
                </div>
                <div className="pt-3">
                  <Button
                    onClick={() => navigate("/assessment")}
                    className="h-9 px-5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white gap-2"
                  >
                    <span>Làm thử bài kiểm tra năng lực miễn phí ➔</span>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-bold text-slate-800">
                    Họ và tên của bạn
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Trần Văn Nam"
                    className="h-10 text-xs rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-bold text-slate-800">
                    Số điện thoại / Zalo để nhận ưu đãi
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 09xxxxxxxx"
                    className="h-10 text-xs rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="targetBand" className="text-xs font-bold text-slate-800">
                    Mục tiêu Band IELTS của bạn
                  </Label>
                  <select
                    id="targetBand"
                    value={targetBand}
                    onChange={(e) => setTargetBand(e.target.value)}
                    className="w-full h-10 text-xs rounded-xl border border-input bg-background px-3 font-semibold text-slate-900"
                  >
                    <option value="5.5">Band 5.0 - 5.5 (Đột Phá Nền Tảng)</option>
                    <option value="6.5">Band 6.0 - 6.5 (Bứt Phá Chiến Thuật)</option>
                    <option value="7.5">Band 7.0 - 7.5+ (Làm Chủ Kỹ Năng)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-xs sm:text-sm font-extrabold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm gap-2 transition-all"
                >
                  <span>{isSubmitting ? "Đang gửi đăng ký..." : "Kích Hoạt Ưu Đãi 200.000đ & Xếp Lớp"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="text-center text-xs text-slate-500 space-x-3">
          <Link to="/" className="hover:text-slate-800 font-semibold underline underline-offset-4">
            Trang chủ ARIS
          </Link>
          <span>•</span>
          <Link to="/assessment" className="hover:text-slate-800 font-semibold underline underline-offset-4">
            Đánh giá năng lực miễn phí
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-slate-800 font-semibold underline underline-offset-4">
            Về học viện
          </Link>
        </div>
      </div>
    </div>
  );
}
