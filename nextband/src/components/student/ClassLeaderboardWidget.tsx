import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { classesApi, ClassLeaderboardData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Trophy,
  Users,
  Swords,
  Crown,
  Flame,
  ArrowRight,
  Target,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionQueueItem } from "@/lib/homeworkStatusHelper";
import { calculateBattleLoopState } from "@/lib/battleLoopEngine";
import { routes } from "@/lib/routes";
import { StudyBuddyModal } from "./StudyBuddyModal";
import { Gift } from "lucide-react";

interface ClassLeaderboardWidgetProps {
  classId: string;
  className: string;
  currentUserId?: string;
  targetBand?: string;
  badgeClass?: string;
  topMission?: ActionQueueItem | null;
  mode?: "battleLoop" | "full";
}

export const ClassLeaderboardWidget: React.FC<ClassLeaderboardWidgetProps> = ({
  classId,
  className,
  currentUserId,
  targetBand: propTargetBand,
  badgeClass,
  topMission,
  mode = "battleLoop",
}) => {
  const navigate = useNavigate();
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);

  const { data, isLoading } = useQuery<ClassLeaderboardData>({
    queryKey: ["class-leaderboard", classId],
    queryFn: () => classesApi.getLeaderboard(classId),
    enabled: !!classId,
    staleTime: 1000 * 60 * 2,
  });

  const students = data?.students || [];
  const totalHomeworks = data?.totalHomeworks || 0;
  const totalStudents = data?.totalStudents || students.length;
  const classCompletionRate = data?.classCompletionRate ?? 0;
  const totalSubmittedSlots = data?.totalSubmittedSlots ?? 0;
  const totalAssignedSlots = data?.totalAssignedSlots ?? 0;
  const targetBand = propTargetBand || data?.targetBand || "Band 6.5+";
  const myRank = data?.myRank;
  const myCompletedCount = data?.myCompletedCount || 0;

  // ── Tính toán Vòng lặp Chiến đấu (Battle Loop) ─────────────────────────────
  const battle = calculateBattleLoopState({
    students,
    myRank,
    myCompletedCount,
    totalHomeworks,
    topMission,
  });

  const handleCtaClick = () => {
    if (battle.targetExamId) {
      navigate(routes.exam.take(battle.targetExamId));
    } else if (classId) {
      navigate(`/app/class/${classId}/lessons`);
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-black shadow-xs shrink-0">
            🥇
          </span>
        );
      case 2:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white text-xs font-black shadow-xs shrink-0">
            🥈
          </span>
        );
      case 3:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white text-xs font-black shadow-xs shrink-0">
            🥉
          </span>
        );
      default:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-[11px] font-bold shrink-0">
            #{rank}
          </span>
        );
    }
  };

  const renderStudentRow = (st: any, isHighlight: boolean = false) => {
    const is100 = totalHomeworks > 0 && st.completedCount === totalHomeworks;

    return (
      <div
        key={st.studentId}
        className={cn(
          "flex items-center gap-2.5 p-2 rounded-xl border transition-all text-xs",
          st.isMe
            ? "border-primary/50 bg-primary/5 shadow-2xs ring-1 ring-primary/25 font-medium"
            : isHighlight
            ? "border-amber-300/60 bg-amber-50/40 dark:bg-amber-950/20"
            : "border-border/60 bg-card hover:bg-muted/30"
        )}
      >
        {/* Rank Badge */}
        {getRankBadge(st.rank)}

        {/* Avatar */}
        <Avatar className="h-6 w-6 shrink-0">
          <AvatarImage src={st.avatarUrl || undefined} />
          <AvatarFallback className="bg-muted text-[10px] font-bold text-foreground">
            {st.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Name & Progress */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className={cn("truncate font-semibold", st.isMe ? "text-primary" : "text-foreground")}>
              {st.fullName} {st.isMe && <span className="text-[10px] font-black text-primary">(Bạn)</span>}
            </span>
            <span className="text-[11px] font-bold text-muted-foreground shrink-0 ml-1.5">
              {st.completedCount}/{totalHomeworks} ({st.completionRate}%)
            </span>
          </div>

          <Progress
            value={st.completionRate}
            className={cn(
              "h-1.2",
              st.rank === 1 ? "[&>div]:bg-amber-500" : st.isMe ? "[&>div]:bg-primary" : "[&>div]:bg-slate-300 dark:[&>div]:bg-slate-600"
            )}
          />
        </div>

        {/* 100% Star Badge */}
        {is100 && (
          <Badge className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0 shrink-0 shadow-2xs">
            100%
          </Badge>
        )}
      </div>
    );
  };

  return (
    <>
      <Card className="w-full flex flex-col justify-between border-slate-200 bg-white shadow-xs overflow-hidden rounded-2xl">
        {/* 1. CARD HEADER */}
        <CardHeader className="p-4 pb-3 border-b bg-gradient-to-r from-amber-500/10 via-primary/5 to-transparent">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
                  Đấu Trường Thi Đua
                  <Flame className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                </CardTitle>
                <CardDescription className="text-[11px] text-muted-foreground">
                  {className} · {totalStudents} học viên
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-bold gap-1 px-2 py-0.5",
                  badgeClass || "bg-primary/5 text-primary border-primary/20"
                )}
              >
                <Target className="h-3 w-3" />
                {targetBand}
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* 2. CARD CONTENT */}
        <CardContent className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-muted-foreground animate-pulse">
              Đang tải bảng xếp hạng chiến lực...
            </div>
          ) : students.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground space-y-1">
              <Users className="h-6 w-6 text-muted-foreground mx-auto mb-1 opacity-50" />
              <p className="font-semibold text-foreground">Lớp học chưa có học viên</p>
              <p className="text-[11px]">Bảng xếp hạng sẽ bắt đầu khi có thành viên nộp bài.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* SMART FOCUS LIST (Top 1-3 + Rival + You) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1 pb-0.5">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-amber-500" />
                    Top Dẫn Đầu
                  </span>
                  <span>Tiến độ</span>
                </div>

                {/* TOP 3 */}
                {battle.top3.map((st) => renderStudentRow(st))}

                {/* ELLIPSIS IF GAP EXISTS */}
                {battle.showEllipsis && (
                  <div className="flex items-center justify-center gap-1.5 py-0.5 text-[10px] text-muted-foreground font-semibold">
                    <span>· · ·</span>
                  </div>
                )}

                {/* STUDENT ABOVE (RIVAL) IF OUTSIDE TOP 3 */}
                {battle.studentAbove && battle.studentAbove.rank > 3 && (
                  renderStudentRow(battle.studentAbove, true)
                )}

                {/* CURRENT STUDENT IF OUTSIDE TOP 3 */}
                {battle.myStudent && battle.myStudent.rank > 3 && (
                  renderStudentRow(battle.myStudent)
                )}
              </div>

              {/* BATTLE ACTION BOX (VÒNG LẶP HÀNH ĐỘNG TRANH ĐUA) */}
              <div
                className={cn(
                  "p-3 rounded-xl border text-xs space-y-2 transition-all",
                  battle.battleMode === "LEADER"
                    ? "bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-300 text-amber-950 dark:from-amber-950/40 dark:to-amber-900/20 dark:border-amber-700 dark:text-amber-100"
                    : battle.battleMode === "CHALLENGE_TOP3"
                    ? "bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 text-indigo-950 dark:from-indigo-950/40 dark:to-blue-950/20 dark:border-indigo-800 dark:text-indigo-100"
                    : "bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 text-white shadow-xs"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="font-extrabold flex items-center gap-1.5 text-[11px] leading-tight">
                      {battle.battleMode === "LEADER" ? (
                        <Crown className="h-3.5 w-3.5 text-amber-600 fill-amber-500 shrink-0" />
                      ) : (
                        <Swords className={cn("h-3.5 w-3.5 shrink-0", battle.battleMode === "CHALLENGE_TOP3" ? "text-indigo-600" : "text-amber-400")} />
                      )}
                      <span>{battle.headline}</span>
                    </div>
                    <p className={cn(
                      "text-[10px] leading-relaxed",
                      battle.battleMode === "LEADER"
                        ? "text-amber-800 dark:text-amber-300"
                        : battle.battleMode === "CHALLENGE_TOP3"
                        ? "text-indigo-700 dark:text-indigo-300"
                        : "text-slate-300"
                    )}>
                      {battle.subHeadline}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={handleCtaClick}
                  className={cn(
                    "w-full h-7 text-[11px] font-bold rounded-lg gap-1.5 transition-all shadow-xs",
                    battle.battleMode === "LEADER"
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : battle.battleMode === "CHALLENGE_TOP3"
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-white hover:bg-slate-100 text-slate-900"
                  )}
                >
                  <span>{battle.ctaLabel}</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* 3. CARD FOOTER */}
          <div className="pt-2 border-t space-y-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Cả lớp: <strong>{classCompletionRate}%</strong>
              </span>

              {students.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullModalOpen(true)}
                  className="h-6 text-[11px] text-primary hover:text-primary/80 font-bold px-1.5 gap-0.5"
                >
                  <span>Xem đầy đủ ({students.length})</span>
                  <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Study Buddy Pass Trigger */}
            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] bg-slate-50/80 dark:bg-slate-900/40 rounded-xl px-2.5 py-1.5">
              <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Có bạn học cùng sẽ vui hơn</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBuddyModalOpen(true)}
                className="h-6 text-[11px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold px-2 gap-0.5 rounded-lg"
              >
                <span>Mời bạn ➔</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STUDY BUDDY PASS MODAL */}
      <StudyBuddyModal
        isOpen={isBuddyModalOpen}
        onClose={() => setIsBuddyModalOpen(false)}
        studentName={battle.myStudent?.fullName || "Học viên"}
        className={className}
        userId={currentUserId}
      />

      {/* FULL STANDINGS DIALOG MODAL */}
      <Dialog open={isFullModalOpen} onOpenChange={setIsFullModalOpen}>
        <DialogContent className="max-w-md max-h-[85vh] flex flex-col p-6 rounded-2xl">
          <DialogHeader className="pb-3 border-b">
            <DialogTitle className="text-base font-extrabold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Bảng Tổng Sắp Thi Đua — {className}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Toàn bộ {totalStudents} học viên trong lớp · {totalHomeworks} bài tập được giao
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto space-y-2 py-3 flex-1 pr-1">
            {students.map((st) => renderStudentRow(st))}
          </div>

          <div className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
            <span>Hạng của bạn: <strong className="text-primary font-bold">#{myRank || "-"}/{totalStudents}</strong></span>
            <Button size="sm" variant="outline" onClick={() => setIsFullModalOpen(false)} className="text-xs h-7">
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
