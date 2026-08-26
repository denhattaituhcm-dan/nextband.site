import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { classesApi, ClassLeagueStanding } from "@/lib/api";
import { useBranch } from "@/contexts/BranchContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Award,
  Medal,
  Flame,
  Users,
  BookOpen,
  Calendar,
  Building2,
  Download,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Search,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function ClassLeague() {
  const { selectedBranch, setSelectedBranch, branches, canSelectAll } = useBranch();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["class-league-standings", selectedBranch],
    queryFn: () => classesApi.getLeagueStandings(selectedBranch),
    staleTime: 1000 * 60 * 2,
  });

  const standings = data?.standings || [];
  const filteredStandings = standings.filter((item) =>
    item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Top 3 Podium
  const top1 = standings[0];
  const top2 = standings[1];
  const top3 = standings[2];

  // Overview metrics
  const totalClasses = standings.length;
  const avgCompletion = totalClasses > 0
    ? Math.round(standings.reduce((acc, c) => acc + c.completionRate, 0) / totalClasses)
    : 0;
  const highestScore = top1?.leagueScore || 0;

  // Export CSV function
  const handleExportCSV = () => {
    if (standings.length === 0) return;
    const headers = [
      "Hạng",
      "Lớp học",
      "Khóa học",
      "Giáo viên",
      "Cơ sở",
      "Sĩ số",
      "Bài nộp",
      "Tỷ lệ hoàn thành (%)",
      "Chuyên cần (%)",
      "Điểm thi đua",
    ];

    const rows = standings.map((item) => [
      item.rank,
      `"${item.className}"`,
      `"${item.courseTitle}"`,
      `"${item.teacherName}"`,
      `"${item.branchName}"`,
      item.totalStudents,
      `"${item.totalCompletedSubmissions}/${item.totalAssignedSlots}"`,
      `${item.completionRate}%`,
      `${item.attendanceRate}%`,
      item.leagueScore,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Dau_Truong_Thi_Dua_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white font-black text-sm shadow-md ring-2 ring-amber-300">
            🥇
          </span>
        );
      case 2:
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-black text-sm shadow-md ring-2 ring-slate-200">
            🥈
          </span>
        );
      case 3:
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-white font-black text-sm shadow-md ring-2 ring-amber-600">
            🥉
          </span>
        );
      default:
        return (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground font-bold text-xs">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                Đấu Trường Thi Đua Lớp Học
                <Flame className="h-5 w-5 text-rose-500 fill-rose-500 animate-pulse" />
              </h1>
              <p className="text-sm text-muted-foreground">
                Bảng tổng sắp thi đua học thuật, kỷ luật làm bài tập & chuyên cần giữa các lớp
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Branch Filter */}
          {canSelectAll && branches && branches.length > 0 && (
            <div className="w-48">
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="h-9 text-xs rounded-xl">
                  <Building2 className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Chọn cơ sở" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả chi nhánh</SelectItem>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Refresh button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-9 gap-1.5 text-xs rounded-xl"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
            Làm mới
          </Button>

          {/* Export button */}
          <Button
            size="sm"
            onClick={handleExportCSV}
            disabled={standings.length === 0}
            className="h-9 gap-1.5 text-xs rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            <Download className="h-3.5 w-3.5" />
            Xuất Báo Cáo Thi Đua
          </Button>
        </div>
      </div>

      {/* 2. OVERVIEW KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 rounded-2xl border-border bg-card shadow-xs flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Lớp tham gia đua top</p>
            <h3 className="text-xl font-extrabold text-foreground">{totalClasses} lớp</h3>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl border-border bg-card shadow-xs flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Hoàn thành bài tập TB</p>
            <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{avgCompletion}%</h3>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl border-border bg-card shadow-xs flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Điểm thi đua cao nhất</p>
            <h3 className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
              {highestScore.toLocaleString()} pts
            </h3>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl border-border bg-card shadow-xs flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 shrink-0">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Lớp dẫn đầu hệ thống</p>
            <h3 className="text-lg font-extrabold text-foreground truncate max-w-[140px]" title={top1?.className}>
              {top1?.className || "Chưa có"}
            </h3>
          </div>
        </Card>
      </div>

      {/* 3. PODIUM TOP 3 (BỤC VINH DANH) */}
      {standings.length >= 2 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 items-end pt-4 pb-2">
          {/* RANK 2 (Á QUÂN) */}
          {top2 && (
            <Card className="order-2 md:order-1 rounded-2xl border-slate-200 dark:border-slate-800 bg-gradient-to-t from-slate-50/80 to-card shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-5 text-center space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-2xl shadow-inner">
                  🥈
                </div>
                <div>
                  <Badge variant="outline" className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-300">
                    Á QUÂN HỆ THỐNG
                  </Badge>
                  <h3 className="text-lg font-black text-foreground mt-1">{top2.className}</h3>
                  <p className="text-xs text-muted-foreground">{top2.courseTitle}</p>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-2xl font-black text-slate-700 dark:text-slate-300">
                    {top2.leagueScore.toLocaleString()} <span className="text-xs font-semibold">pts</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>Bài tập: <strong className="text-foreground">{top2.completionRate}%</strong></span>
                    <span>·</span>
                    <span>Chuyên cần: <strong className="text-foreground">{top2.attendanceRate}%</strong></span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
                  <span>GV: <strong className="text-foreground">{top2.teacherName}</strong></span>
                </div>
              </div>
            </Card>
          )}

          {/* RANK 1 (QUÁN QUÂN - TALLEST & GLOWING) */}
          {top1 && (
            <Card className="order-1 md:order-2 rounded-2xl border-amber-300 dark:border-amber-700/60 bg-gradient-to-t from-amber-500/10 via-amber-500/5 to-card shadow-lg ring-2 ring-amber-400/30 overflow-hidden md:-translate-y-2">
              <div className="bg-amber-500 text-white text-[11px] font-black uppercase py-1 text-center tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                VÔ ĐỊCH TOÀN TRUNG TÂM
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="p-6 text-center space-y-3.5">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-3xl shadow-lg ring-4 ring-amber-200 dark:ring-amber-900">
                  🥇
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground">{top1.className}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{top1.courseTitle}</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mt-0.5">{top1.branchName}</p>
                </div>
                <div className="pt-2 border-t border-amber-200 dark:border-amber-900/50">
                  <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                    {top1.leagueScore.toLocaleString()} <span className="text-sm font-semibold">pts</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>Bài tập: <strong className="text-emerald-600 font-bold">{top1.completionRate}%</strong></span>
                    <span>·</span>
                    <span>Chuyên cần: <strong className="text-blue-600 font-bold">{top1.attendanceRate}%</strong></span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
                  <span>Giáo viên phụ trách: <strong className="text-foreground font-bold">{top1.teacherName}</strong></span>
                </div>
              </div>
            </Card>
          )}

          {/* RANK 3 (HẠNG BA) */}
          {top3 && (
            <Card className="order-3 md:order-3 rounded-2xl border-amber-800/20 bg-gradient-to-t from-amber-900/5 to-card shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-5 text-center space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-700/20 text-amber-800 text-2xl shadow-inner">
                  🥉
                </div>
                <div>
                  <Badge variant="outline" className="text-[10px] font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border-amber-300">
                    HẠNG 3 HỆ THỐNG
                  </Badge>
                  <h3 className="text-lg font-black text-foreground mt-1">{top3.className}</h3>
                  <p className="text-xs text-muted-foreground">{top3.courseTitle}</p>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-2xl font-black text-amber-800 dark:text-amber-400">
                    {top3.leagueScore.toLocaleString()} <span className="text-xs font-semibold">pts</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>Bài tập: <strong className="text-foreground">{top3.completionRate}%</strong></span>
                    <span>·</span>
                    <span>Chuyên cần: <strong className="text-foreground">{top3.attendanceRate}%</strong></span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
                  <span>GV: <strong className="text-foreground">{top3.teacherName}</strong></span>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* 4. FULL LEAGUE TABLE */}
      <Card className="rounded-2xl border-border bg-card shadow-xs overflow-hidden">
        <CardHeader className="p-5 pb-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              Bảng Tổng Sắp Chi Tiết ({filteredStandings.length} Lớp)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Điểm số được tính tự động từ tỷ lệ hoàn thành bài tập (70%) và tỷ lệ chuyên cần (30%)
            </CardDescription>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm lớp, giáo viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-16 text-center text-xs text-muted-foreground animate-pulse">
              Đang tải bảng tổng sắp thi đua liên lớp...
            </div>
          ) : filteredStandings.length === 0 ? (
            <div className="py-16 text-center text-xs text-muted-foreground">
              Không tìm thấy lớp học nào phù hợp với bộ lọc.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/40 text-muted-foreground font-semibold uppercase text-[10px] tracking-wider border-b">
                  <tr>
                    <th className="py-3 px-4 text-center w-14">Hạng</th>
                    <th className="py-3 px-4">Lớp Học</th>
                    <th className="py-3 px-4">Giáo Viên Phụ Trách</th>
                    <th className="py-3 px-4">Cơ Sở</th>
                    <th className="py-3 px-4 text-center">Sĩ Số</th>
                    <th className="py-3 px-4">Tiến Độ Bài Tập</th>
                    <th className="py-3 px-4 text-center">Chuyên Cần</th>
                    <th className="py-3 px-4 text-right">Điểm Thi Đua</th>
                    <th className="py-3 px-4 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStandings.map((item) => (
                    <tr
                      key={item.classId}
                      className={cn(
                        "hover:bg-muted/30 transition-colors",
                        item.rank === 1 && "bg-amber-500/5",
                        item.rank === 2 && "bg-slate-500/5",
                        item.rank === 3 && "bg-amber-800/5"
                      )}
                    >
                      {/* Rank */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex justify-center">{getRankBadge(item.rank)}</div>
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        <div className="flex flex-col">
                          <span className="text-sm font-extrabold text-foreground hover:text-primary transition-colors">
                            {item.className}
                          </span>
                          <span className="text-[11px] font-normal text-muted-foreground">
                            {item.courseTitle}
                          </span>
                        </div>
                      </td>

                      {/* Teacher */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.teacherAvatar || undefined} />
                            <AvatarFallback className="text-[9px] bg-primary/10 text-primary font-bold">
                              {item.teacherName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-foreground">{item.teacherName}</span>
                        </div>
                      </td>

                      {/* Branch */}
                      <td className="py-3.5 px-4 text-muted-foreground font-medium">
                        {item.branchName}
                      </td>

                      {/* Students count */}
                      <td className="py-3.5 px-4 text-center font-bold text-foreground">
                        {item.totalStudents} HV
                      </td>

                      {/* Homework completion */}
                      <td className="py-3.5 px-4 min-w-[140px]">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{item.completionRate}%</span>
                            <span className="text-muted-foreground">{item.totalCompletedSubmissions}/{item.totalAssignedSlots} bài</span>
                          </div>
                          <Progress value={item.completionRate} className="h-1.5 [&>div]:bg-emerald-600" />
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="py-3.5 px-4 text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-bold text-[10px]",
                            item.attendanceRate >= 90
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : item.attendanceRate >= 80
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          )}
                        >
                          {item.attendanceRate}%
                        </Badge>
                      </td>

                      {/* League Score */}
                      <td className="py-3.5 px-4 text-right">
                        <span className={cn(
                          "inline-block font-black text-sm px-2.5 py-0.5 rounded-lg",
                          item.rank === 1
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : item.rank <= 3
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-foreground"
                        )}>
                          {item.leagueScore.toLocaleString()} pts
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-7 px-2 text-xs font-bold text-primary hover:text-primary gap-1"
                        >
                          <Link to={`/admin/classes/${item.classId}`}>
                            Xem lớp <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
