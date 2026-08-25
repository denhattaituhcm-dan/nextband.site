import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { classesApi } from "@/lib/api";
import {
  formatVietnameseDeadline,
  formatDeadlineCountdown,
} from "@/lib/homeworkStatusHelper";
import {
  Calendar as CalendarIcon,
  Clock,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface SetHomeworkDeadlineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: string;
  className?: string;
  lessonId: string;
  lessonTitle: string;
  currentDeadline: string | Date | null;
  deadlineSource: "MANUAL" | "AUTO";
  onSuccess: () => void;
}

export const SetHomeworkDeadlineModal: React.FC<SetHomeworkDeadlineModalProps> = ({
  open,
  onOpenChange,
  classId,
  className,
  lessonId,
  lessonTitle,
  currentDeadline,
  deadlineSource,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("23:59");
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Initialize input fields when modal opens or deadline changes
  useEffect(() => {
    if (open) {
      if (currentDeadline) {
        const d = new Date(currentDeadline);
        if (!isNaN(d.getTime())) {
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          setSelectedDate(`${yyyy}-${mm}-${dd}`);

          const hh = String(d.getHours()).padStart(2, "0");
          const min = String(d.getMinutes()).padStart(2, "0");
          setSelectedTime(`${hh}:${min}`);
          return;
        }
      }

      // Default to 7 days from now at 23:59
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      const yyyy = defaultDate.getFullYear();
      const mm = String(defaultDate.getMonth() + 1).padStart(2, "0");
      const dd = String(defaultDate.getDate()).padStart(2, "0");
      setSelectedDate(`${yyyy}-${mm}-${dd}`);
      setSelectedTime("23:59");
    }
  }, [open, currentDeadline]);

  // Quick preset handlers
  const applyDaysOffset = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
    setSelectedTime("23:59");
  };

  const applyThisWeekend = () => {
    const d = new Date();
    const day = d.getDay(); // 0 is Sunday
    const daysUntilSunday = day === 0 ? 0 : 7 - day;
    d.setDate(d.getDate() + daysUntilSunday);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
    setSelectedTime("23:59");
  };

  // Preview date calculation
  const getPreviewDate = (): Date | null => {
    if (!selectedDate) return null;
    try {
      const [year, month, day] = selectedDate.split("-").map(Number);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const date = new Date(year, month - 1, day, hours || 23, minutes || 59, 59, 999);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const previewDate = getPreviewDate();
  const countdown = previewDate ? formatDeadlineCountdown(previewDate) : null;

  // Handle Save Manual Deadline
  const handleSaveDeadline = async () => {
    if (!previewDate) {
      toast({
        title: "Chưa chọn ngày hạn nộp",
        description: "Vui lòng chọn ngày và giờ hết hạn hợp lệ.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      await classesApi.setHomeworkDeadline(classId, lessonId, previewDate.toISOString());
      toast({
        title: "Cập nhật hạn nộp thành công 📅",
        description: `Đã đặt deadline cho bài "${lessonTitle}" đến ${formatVietnameseDeadline(previewDate)}.`,
      });
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: "Không thể lưu hạn nộp",
        description: err.message || "Đã xảy ra lỗi khi lưu hạn nộp bài tập.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Reset to Automatic Calculation
  const handleResetToAuto = async () => {
    try {
      setIsResetting(true);
      await classesApi.setHomeworkDeadline(classId, lessonId, null);
      toast({
        title: "Đã khôi phục hạn tự động 🔄",
        description: `Bài "${lessonTitle}" đã được đưa về hạn nộp tự động theo tuần học.`,
      });
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: "Không thể khôi phục hạn",
        description: err.message || "Đã xảy ra lỗi khi đặt lại hạn nộp.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <CalendarIcon className="h-5 w-5 text-emerald-600" />
            Cài đặt Hạn nộp Bài tập
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Thiết lập hoặc gia hạn hạn nộp cho toàn bộ học viên lớp{" "}
            <strong className="text-foreground">{className || "hiện tại"}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Target Homework Identity Card */}
          <div className="p-3 bg-muted/30 border rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground truncate max-w-[240px]">
                {lessonTitle}
              </span>
              {deadlineSource === "MANUAL" ? (
                <Badge className="bg-emerald-600 text-white text-[10px] font-mono">
                  Gán thủ công
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] font-mono text-blue-700 border-blue-300 bg-blue-50/50">
                  Tự động theo tuần
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Hạn hiện tại: <strong>{formatVietnameseDeadline(currentDeadline)}</strong></span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Chọn nhanh hạn nộp
            </Label>
            <div className="grid grid-cols-4 gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-[11px] h-8 px-2"
                onClick={() => applyDaysOffset(3)}
              >
                +3 ngày
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-[11px] h-8 px-2"
                onClick={() => applyDaysOffset(7)}
              >
                +7 ngày
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-[11px] h-8 px-2"
                onClick={() => applyDaysOffset(14)}
              >
                +14 ngày
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-[11px] h-8 px-2"
                onClick={applyThisWeekend}
              >
                Cuối tuần
              </Button>
            </div>
          </div>

          {/* Date and Time Custom Inputs */}
          <div className="grid grid-cols-12 gap-2.5">
            <div className="col-span-7 space-y-1.5">
              <Label htmlFor="deadline-date" className="text-xs font-semibold">
                Ngày hết hạn
              </Label>
              <Input
                id="deadline-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="col-span-5 space-y-1.5">
              <Label htmlFor="deadline-time" className="text-xs font-semibold">
                Giờ hết hạn
              </Label>
              <Input
                id="deadline-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="h-9 text-xs font-mono"
              />
            </div>
          </div>

          {/* Preview Box */}
          {previewDate && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Hạn nộp mới: {formatVietnameseDeadline(previewDate)}
                </span>
              </div>
              {countdown && (
                <div className="text-[11px] text-muted-foreground pl-5">
                  {countdown.isOverdue ? (
                    <span className="text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Ngày này đã qua so với hiện tại
                    </span>
                  ) : (
                    <span>⏳ Thời gian còn lại: <strong>{countdown.text}</strong></span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <div>
            {deadlineSource === "MANUAL" && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isSaving || isResetting}
                onClick={handleResetToAuto}
                className="text-xs text-muted-foreground hover:text-rose-600 gap-1.5 h-9 px-2.5"
              >
                {isResetting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="h-3.5 w-3.5" />
                )}
                Khôi phục tự động
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isSaving || isResetting}
              className="text-xs h-9"
            >
              Hủy
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveDeadline}
              disabled={isSaving || isResetting || !previewDate}
              className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 h-9 px-4 font-semibold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Lưu hạn nộp
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
