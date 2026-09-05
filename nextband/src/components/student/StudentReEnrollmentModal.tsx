import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { parentHubApi } from "@/lib/api";
import { toast } from "sonner";
import {
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { getCourseBrand } from "@/lib/courseBrand";

export interface StudentReEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId?: string;
  className?: string;
  courseTitle?: string;
  studentId?: string;
  studentName?: string;
  studentPhone?: string;
  scholarshipAmount?: number;
}

// Course Progression Sequence
const LEVEL_PROGRESSION: Record<string, { nextName: string; nextBand: string; nextDesc: string }> = {
  starter: {
    nextName: "DREAMER",
    nextBand: "Band 3.0 → 4.0",
    nextDesc: "Luyện ngữ pháp câu ghép/câu phức, phản xạ kỹ năng nghe đọc học thuật và nền tảng IELTS",
  },
  dreamer: {
    nextName: "BUILDER",
    nextBand: "Band 4.0 → 5.0",
    nextDesc: "Làm quen cấu trúc 4 kỹ năng IELTS Cambridge, viết đoạn văn Task 1 & 2 luận điểm logic",
  },
  builder: {
    nextName: "MASTER",
    nextBand: "Band 5.0 → 6.0",
    nextDesc: "Chiến thuật xử lý chuyên sâu 4 kỹ năng, làm bài thi đầy đủ áp lực thời gian phòng thi",
  },
  master: {
    nextName: "LEADER",
    nextBand: "Band 6.0 → 6.5+",
    nextDesc: "Đột phá band điểm cao 6.5 - 7.5+, tối ưu hóa phong cách hành văn và độ chuẩn xác phản xạ",
  },
  leader: {
    nextName: "CHUYÊN ĐỀ ADVANCED / MOCK TEST V.I.P",
    nextBand: "Band 7.0+",
    nextDesc: "Luyện đề cấp tốc sát ngày thi thật, chấm chữa 1-1 chuyên sâu cùng Examiner 8.0+",
  },
};

export function StudentReEnrollmentModal({
  isOpen,
  onClose,
  classId,
  className = "Lớp hiện tại",
  courseTitle = "Khóa học",
  studentId,
  studentName = "Học viên",
  studentPhone = "",
  scholarshipAmount = 500000,
}: StudentReEnrollmentModalProps) {
  const [phone, setPhone] = useState(studentPhone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine current brand & next progression
  const currentBrand = getCourseBrand({ title: courseTitle, name: className });
  const progression = LEVEL_PROGRESSION[currentBrand.key] || {
    nextName: "Khóa học Kế tiếp",
    nextBand: "Nâng cao",
    nextDesc: "Tiếp tục lộ trình thăng hạng band điểm IELTS tại NextBand",
  };

  const formattedScholarship = `${(scholarshipAmount || 500000).toLocaleString("vi-VN")}đ`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 9) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ để tư vấn viên liên hệ");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await parentHubApi.requestReEnrollment({
        classId,
        studentId,
        parentPhone: phone.trim(),
        scholarshipAmount,
      });

      toast.success("Đã ghi nhận đăng ký tái tục & bảo lưu học bổng thành công!");
      onClose();

      // Open Zalo deep-link for instant consultation
      if (res?.zaloDeepLink) {
        setTimeout(() => {
          window.open(res.zaloDeepLink, "_blank", "noopener,noreferrer");
        }, 500);
      }
    } catch (err: any) {
      toast.error(err.message || "Không thể gửi yêu cầu tái đăng ký lúc này. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg rounded-3xl p-6 sm:p-7 border-slate-200">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </span>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
              BẢO LƯU HỌC BỔNG KỶ LUẬT
            </Badge>
          </div>
          <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">
            Tái Đăng Ký Khóa Học Kế Tiếp
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 leading-relaxed">
            Giữ chỗ ưu tiên trong lớp học sĩ số nhỏ (tối đa 8 học viên) và áp dụng voucher học bổng kỷ luật được khấu trừ trực tiếp vào học phí.
          </DialogDescription>
        </DialogHeader>

        {/* Course Progression Journey Card */}
        <div className="my-2 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                Lớp hiện tại
              </span>
              <p className="text-sm font-bold text-slate-200">{className}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                Khóa chuyển tiếp
              </span>
              <p className="text-sm font-black text-white">{progression.nextName}</p>
            </div>
          </div>

          {/* Target Band & Benefit */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-200">Mục tiêu: {progression.nextBand}</span>
            </div>
            <div className="font-mono font-bold text-amber-300">
              Học bổng: -{formattedScholarship}
            </div>
          </div>
        </div>

        {/* Form Details */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="student-name" className="text-xs font-bold text-slate-700">
              Học viên
            </Label>
            <Input
              id="student-name"
              disabled
              value={studentName}
              className="h-10 rounded-xl bg-slate-50 text-slate-800 text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-phone" className="text-xs font-bold text-slate-700">
              Số điện thoại liên hệ (Học viên hoặc Phụ huynh) <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="contact-phone"
              required
              placeholder="Nhập số điện thoại (VD: 0981977797)..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-10 rounded-xl text-xs font-medium"
            />
            <p className="text-[11px] text-slate-500">
              Chuyên viên học vụ sẽ liên hệ xác nhận lịch học, xếp lớp phù hợp và áp dụng mã giảm giá học bổng.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Cam kết sĩ số tối đa 8 học viên / lớp</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% Giáo viên IELTS 8.0+ trực tiếp giảng dạy</span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-10 px-4 rounded-xl text-xs font-bold border-slate-200 cursor-pointer"
            >
              Để sau
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-xs gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isSubmitting ? "Đang xử lý..." : "Xác Nhận Giữ Chỗ & Học Bổng"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
