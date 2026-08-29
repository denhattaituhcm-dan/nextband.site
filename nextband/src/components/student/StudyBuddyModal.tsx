import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudyBuddyPass } from "./StudyBuddyPass";
import {
  generateReferralCode,
  getBuddyShareText,
  exportBuddyPassToPng,
} from "@/lib/studyBuddyHelper";
import { Copy, Check, Download, Gift, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface StudyBuddyModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  className: string;
  userId?: string;
}

export function StudyBuddyModal({
  isOpen,
  onClose,
  studentName,
  className,
  userId,
}: StudyBuddyModalProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const referralCode = generateReferralCode(studentName, userId);
  const targetUrl = `${window.location.origin}/buddy?ref=${referralCode}`;

  const handleCopyLink = async () => {
    try {
      const shareText = getBuddyShareText(studentName, referralCode, targetUrl);
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Đã sao chép lời mời và mã vào bộ nhớ tạm!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Không thể sao chép tự động, vui lòng sao chép thủ công.");
    }
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    try {
      await exportBuddyPassToPng({
        studentName,
        className,
        referralCode,
        targetUrl,
      });
      toast.success("Đã tải ảnh thẻ mời 1200x630 thành công!");
    } catch (err: any) {
      toast.error("Không thể xuất ảnh thẻ mời.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 rounded-3xl space-y-4">
        <DialogHeader className="pb-1 text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[11px] font-bold text-rose-700 w-fit">
            <Gift className="w-3.5 h-3.5" />
            <span>Thẻ Đồng Hành & Quà Tặng</span>
          </div>
          <DialogTitle className="text-lg font-extrabold text-foreground tracking-tight">
            Mời Bạn Cùng Lớp — Nhận Quà ARIS
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Mỗi khi 1 bạn ghi danh với mã mời của bạn: Bạn nhận <strong>01 Bộ Quà Tặng ARIS</strong>, bạn của bạn được <strong>giảm ngay 200.000đ học phí</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* The Visual Card Container */}
        <div className="flex items-center justify-center p-2 bg-muted/30 border rounded-2xl">
          <StudyBuddyPass
            studentName={studentName}
            className={className}
            referralCode={referralCode}
            targetUrl={targetUrl}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <Button
            onClick={handleCopyLink}
            variant="default"
            className="w-full h-9 text-xs font-bold gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã sao chép tin nhắn</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép tin nhắn rủ bạn</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleDownloadImage}
            variant="outline"
            disabled={isExporting}
            className="w-full h-9 text-xs font-bold gap-1.5 rounded-xl border-slate-300 hover:bg-slate-50 text-slate-800"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? "Đang xuất ảnh..." : "Tải ảnh thẻ (1200x630)"}</span>
          </Button>
        </div>

        {/* Footer Policy Note */}
        <div className="pt-2 border-t text-[11px] text-muted-foreground flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            Ưu tiên xếp chung lớp với bạn
          </span>
          <span className="font-mono text-slate-600">
            Mã: <strong>{referralCode}</strong>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
