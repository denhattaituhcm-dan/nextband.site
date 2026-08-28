import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { classesApi, ClassLeaderboardData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  Target,
  Handshake,
  AlertCircle,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassLeaderboardWidgetProps {
  classId: string;
  className: string;
  currentUserId?: string;
  targetBand?: string;
  badgeClass?: string;
}

export const ClassLeaderboardWidget: React.FC<ClassLeaderboardWidgetProps> = ({
  classId,
  className,
  currentUserId,
  targetBand: propTargetBand,
  badgeClass,
}) => {
  const [showAll, setShowAll] = useState(false);

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
  const nextUpcoming = data?.nextUpcomingHomework;
  const targetBand = propTargetBand || data?.targetBand || "Band 6.5+";
  const myRank = data?.myRank;
  const myCompletedCount = data?.myCompletedCount || 0;

  // Determine top students to display (default 4)
  const displayLimit = showAll ? students.length : 4;
  const topStudents = students.slice(0, displayLimit);
  const myStudentObj = students.find((s) => s.isMe);
  const isMeInTop = topStudents.some((s) => s.isMe);

  // Motivational message
  const top1Completed = students[0]?.completedCount || 0;
  const diffToTop = Math.max(0, top1Completed - myCompletedCount);

  const formatDeadline = (iso: string) => {
    try {
      const d = new Date(iso);
      const diffHours = Math.round((d.getTime() - Date.now()) / (1000 * 60 * 60));
      if (diffHours > 0 && diffHours < 24) {
        return `Còn ${diffHours} giờ`;
      }
      if (diffHours >= 24 && diffHours < 48) {
        return "Còn 1 ngày";
      }
      return new Intl.DateTimeFormat("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    } catch {
      return iso;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-black shadow-xs">
            🥇
          </span>
        );
      case 2:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white text-xs font-black shadow-xs">
            🥈
          </span>
        );
      case 3:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white text-xs font-black shadow-xs">
            🥉
          </span>
        );
      default:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-[11px] font-bold">
            #{rank}
          </span>
        );
    }
  };

  return (
    <Card className="w-full flex flex-col justify-between border-border bg-card shadow-xs overflow-hidden rounded-2xl">
      {/* 1. CARD HEADER */}
      <CardHeader className="p-5 pb-3 border-b bg-gradient-to-r from-amber-500/10 via-primary/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-1.5">
                Tiến Độ Thi Đua Lớp Học
                <Flame className="h-4 w-4 text-rose-500 inline fill-rose-500" />
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                <span>{totalStudents} học viên</span>
                <span>·</span>
                <span>{totalHomeworks} bài tập được giao</span>
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge
              variant="outline"
              className={cn(
                "text-[11px] font-semibold gap-1",
                badgeClass || "bg-primary/5 text-primary border-primary/20"
              )}
            >
              <Target className="h-3 w-3" />
              {targetBand}
            </Badge>

            {myRank && totalHomeworks > 0 && totalSubmittedSlots > 0 && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[11px] font-bold px-2.5 py-0.5",
                  myRank === 1
                    ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                    : myRank <= 3
                    ? "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
                    : "bg-muted text-muted-foreground"
                )}
              >
                Hạng của bạn: #{myRank}/{totalStudents}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      {/* 2. CARD CONTENT */}
      <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        {isLoading ? (
          <div className="py-8 text-center text-xs text-muted-foreground animate-pulse">
            Đang tải bảng xếp hạng tiến độ...
          </div>
        ) : students.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Lớp học chưa có học viên hoặc chưa có bài tập nào được giao.
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* TIER 1: TIẾN ĐỘ ĐỒNG ĐỘI & HẠN CHÓT SẮP TỚI */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              {/* Mục tiêu tập thể cả lớp */}
              <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Handshake className="h-3.5 w-3.5 text-emerald-600" />
                    Tiến độ cả lớp
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    {classCompletionRate}% ({totalSubmittedSlots}/{totalAssignedSlots} bài)
                  </span>
                </div>
                <Progress value={classCompletionRate} className="h-1.5 [&>div]:bg-emerald-600" />
                <p className="text-[10px] text-muted-foreground">
                  {classCompletionRate >= 80 ? "🎉 Cả lớp đang hoàn thành rất xuất sắc!" : "Cùng nhau nộp bài để đạt 100% nhé!"}
                </p>
              </div>

              {/* Hạn chót bài tập gần nhất */}
              <div className={cn(
                "p-3 rounded-xl border space-y-1",
                nextUpcoming?.isUrgent
                  ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
                  : "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900"
              )}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-foreground truncate max-w-[140px]" title={nextUpcoming ? nextUpcoming.title : "Không có bài nộp gấp"}>
                    <Clock className={cn("h-3.5 w-3.5 shrink-0", nextUpcoming?.isUrgent ? "text-rose-600" : "text-amber-600")} />
                    {nextUpcoming ? nextUpcoming.title : "Hạn nộp gần nhất"}
                  </span>
                  {nextUpcoming ? (
                    <Badge variant={nextUpcoming.isUrgent ? "destructive" : "outline"} className="text-[10px] font-bold px-1.5 py-0">
                      {formatDeadline(nextUpcoming.deadline)}
                    </Badge>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-normal">Đã hoàn thành hết</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground truncate">
                  {nextUpcoming ? `Hạn chót: ${new Date(nextUpcoming.deadline).toLocaleDateString("vi-VN")}` : "Hiện tại không có bài tập nào sắp đến hạn."}
                </p>
              </div>
            </div>

            {/* TIER 2: BẢNG XẾP HẠNG THI ĐUA CÁ NHÂN */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">
                {totalHomeworks === 0 ? (
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    Thành viên lớp học
                  </span>
                ) : (
                  <span>Bảng Thi Đua Làm Bài</span>
                )}
                {totalHomeworks > 0 && <span>Chuỗi học · Tiến độ</span>}
              </div>

              {/* No homework yet: show participant list without rank */}
              {totalHomeworks === 0 && (
                <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-4 text-center space-y-1.5">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                  <p className="text-xs font-semibold text-foreground">Chưa có bài tập nào được giao</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Bảng xếp hạng sẽ bắt đầu ngay khi giáo viên giao bài đầu tiên.<br />
                    {totalStudents} thành viên đã sẵn sàng thi đua!
                  </p>
                </div>
              )}

              {totalHomeworks > 0 && topStudents.map((st) => {
                const is100 = st.completedCount === totalHomeworks;

                return (
                  <div
                    key={st.studentId}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-xl border transition-all",
                      st.isMe
                        ? "border-primary/50 bg-primary/5 shadow-2xs ring-1 ring-primary/20"
                        : "border-border/60 bg-card hover:bg-muted/30"
                    )}
                  >
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">{getRankBadge(st.rank)}</div>

                    {/* Avatar */}
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarImage src={st.avatarUrl || undefined} />
                      <AvatarFallback className="bg-muted text-[10px] font-bold text-foreground">
                        {st.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Name & Progress bar */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={cn("font-bold truncate", st.isMe ? "text-primary" : "text-foreground")}>
                          {st.fullName} {st.isMe && <span className="text-[10px] font-extrabold text-primary">(Bạn)</span>}
                        </span>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-semibold text-muted-foreground">
                            {st.completedCount}/{totalHomeworks} bài ({st.completionRate}%)
                          </span>
                        </div>
                      </div>

                      <Progress
                        value={st.completionRate}
                        className={cn(
                          "h-1.5",
                          st.rank === 1 ? "[&>div]:bg-amber-500" : st.isMe ? "[&>div]:bg-primary" : "[&>div]:bg-slate-400"
                        )}
                      />
                    </div>

                    {/* 100% Badge */}
                    {is100 && (
                      <Badge className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0 flex-shrink-0 shadow-2xs">
                        🎖️ 100%
                      </Badge>
                    )}
                  </div>
                );
              })}


              {totalHomeworks > 0 && !showAll && !isMeInTop && myStudentObj && (
                <>
                  <div className="flex items-center justify-center gap-2 py-0.5 text-[10px] text-muted-foreground font-medium">
                    <span>· · ·</span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl border border-primary/50 bg-primary/5 shadow-2xs ring-1 ring-primary/20">
                    <div className="flex-shrink-0">{getRankBadge(myStudentObj.rank)}</div>
                    <Avatar className="h-7 w-7 flex-shrink-0">
                      <AvatarImage src={myStudentObj.avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                        {myStudentObj.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold truncate text-primary">
                          {myStudentObj.fullName} <span className="text-[10px] font-extrabold text-primary">(Bạn)</span>
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-semibold text-primary">
                            {myStudentObj.completedCount}/{totalHomeworks} bài ({myStudentObj.completionRate}%)
                          </span>
                        </div>
                      </div>
                      <Progress value={myStudentObj.completionRate} className="h-1.5 [&>div]:bg-primary" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* TIER 3: FOOTER MOTIVATION & TOGGLE */}
        <div className="pt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            {totalHomeworks === 0 ? (
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {totalStudents} thành viên đã sẵn sàng — bảng xếp hạng sẽ bắt đầu khi có bài tập.
              </span>
            ) : myRank === 1 ? (
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Bạn đang dẫn đầu lớp! Hãy giữ vững phong độ nhé.
              </span>
            ) : diffToTop > 0 ? (
              <span className="text-foreground">
                💡 Bạn chỉ cần làm thêm <strong className="text-primary font-bold">{diffToTop} bài</strong> nữa để bắt kịp Top 1!
              </span>
            ) : (
              <span>Cùng nhau hoàn thành 100% bài tập để nhận vinh danh khóa nhé!</span>
            )}
          </div>

          {totalHomeworks > 0 && students.length > 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="h-7 text-[11px] text-muted-foreground hover:text-foreground gap-1 px-2 shrink-0"
            >
              {showAll ? (
                <>
                  Thu gọn <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Xem tất cả ({students.length}) <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
