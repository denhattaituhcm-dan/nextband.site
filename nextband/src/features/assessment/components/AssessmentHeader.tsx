import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ShieldCheck, CheckCircle2, RefreshCw, Send, AlertTriangle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentHeaderProps {
  candidateName: string;
  targetBand: string;
  formattedTime: string;
  isUrgent: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error" | "offline" | "syncing";
  onOpenSubmitDialog: () => void;
  onOpenExitDialog: () => void;
  isSubmitting: boolean;
}

export function AssessmentHeader({
  candidateName,
  targetBand,
  formattedTime,
  isUrgent,
  saveStatus,
  onOpenSubmitDialog,
  onOpenExitDialog,
  isSubmitting,
}: AssessmentHeaderProps) {
  return (
    <header className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between gap-3">
        {/* Left: Branding & Candidate Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-red flex items-center justify-center text-white font-black text-base shadow-sm shrink-0">
            N
          </div>
          <div className="hidden sm:block min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-foreground truncate">{candidateName}</span>
              <Badge variant="outline" className="text-[10px] bg-brand-red-soft text-brand-red border-brand-red/20 font-bold px-1.5 py-0">
                Mục tiêu: {targetBand}
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">ARIS Diagnostic Assessment</p>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-all shadow-sm",
            isUrgent
              ? "bg-red-500/15 border-red-500 text-red-600 dark:text-red-400 animate-pulse font-black shadow-red-500/20"
              : "bg-brand-blue/10 border-brand-blue/35 text-brand-blue dark:bg-brand-blue/20 dark:border-brand-blue/50 dark:text-blue-300 font-black ring-2 ring-brand-blue/10",
          )}
        >
          <Clock className={cn("w-4 h-4 shrink-0", isUrgent ? "text-red-600 animate-bounce" : "text-brand-blue animate-none")} />
          <span className="text-sm sm:text-base font-mono font-black tracking-widest">{formattedTime}</span>
        </div>

        {/* Right: Autosave Status, Exit & Submit Button */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            {saveStatus === "saving" || saveStatus === "syncing" ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-blue" />
                <span>{saveStatus === "syncing" ? "Đang đồng bộ..." : "Đang lưu nháp..."}</span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Đã lưu nháp</span>
              </>
            ) : saveStatus === "error" || saveStatus === "offline" ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-600 font-medium">Lưu offline</span>
              </>
            ) : null}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onOpenExitDialog}
            className="h-10 px-3 rounded-xl font-bold text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 transition-colors cursor-pointer border border-border sm:border-transparent"
            title="Thoát và hủy bài làm hiện tại"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thoát bài</span>
          </Button>

          <Button
            onClick={onOpenSubmitDialog}
            disabled={isSubmitting}
            className="h-9 px-4 rounded-full font-black text-xs bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white shadow-md shadow-red-500/20 gap-2 cursor-pointer transition-all duration-200 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Nộp Bài &amp; Xem Kết Quả</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
