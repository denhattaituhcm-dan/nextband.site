import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { authApi, uploadsApi, classesApi, submissionsApi, referralsApi } from "@/lib/api";
import { submissionKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, User, Camera, Save, Trophy, Flame, Star, CheckCircle2, Zap, Users, Medal, Gift, Copy, Check, Sparkles } from "lucide-react";
import { StudentEvidenceProfileCard } from "@/components/profile/StudentEvidenceProfileCard";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { StudyBuddyModal } from "@/components/student/StudyBuddyModal";
import { generateReferralCode, getBuddyShareText } from "@/lib/studyBuddyHelper";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const { enrollments } = useStudentLifecycle();
  const { toast } = useToast();

  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatarUrl || "");
      setPhone(user.phone || "");
      setGender(user.gender || "");
    }
  }, [user]);

  // --- Data: leaderboard & submissions for achievements ---
  // Lấy enrolledClassId từ useStudentLifecycle chuẩn hóa
  const enrolledClassId: string | null = enrollments[0]?.classId ?? null;

  const { data: leaderboardData } = useQuery({
    queryKey: ["class-leaderboard-profile", enrolledClassId],
    queryFn: () => classesApi.getLeaderboard(enrolledClassId!),
    enabled: !!enrolledClassId,
    staleTime: 1000 * 60 * 5,
  });

  const { data: submissionsData } = useQuery({
    queryKey: submissionKeys.profileSubmissions(user?.id),
    queryFn: () => submissionsApi.list({ studentId: user?.id, limit: 200 }).catch(() => ({ data: [] })),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });

  const { data: referralsData } = useQuery({
    queryKey: ["my-referrals", user?.id],
    queryFn: () => referralsApi.getMyReferrals().catch(() => null),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });

  const userSubmissions = Array.isArray(submissionsData?.data) ? submissionsData.data : [];
  const gradedCount = userSubmissions.filter((s: any) => ["graded", "GRADED"].includes(s.status)).length;
  const submittedCount = userSubmissions.filter((s: any) =>
    ["submitted", "SUBMITTED", "graded", "GRADED"].includes(s.status)
  ).length;

  const myStudent = leaderboardData?.students?.find((s) => s.isMe);
  const myRank = leaderboardData?.myRank;
  const totalStudents = leaderboardData?.totalStudents ?? 0;
  const completionRate = myStudent?.completionRate ?? 0;
  const completedCount = myStudent?.completedCount ?? 0;
  const totalHomeworks = leaderboardData?.totalHomeworks ?? 0;

  // --- Achievement engine: derive badges from real data ---
  const achievements = useMemo(() => {
    const list: { id: string; label: string; desc: string; icon: React.ReactNode; color: string; earned: boolean }[] = [
      {
        id: "top1",
        label: "Dẫn đầu lớp",
        desc: "Đang xếp hạng #1 trong lớp học",
        icon: <Trophy className="h-4 w-4" />,
        color: "bg-amber-100 text-amber-700 border-amber-300",
        earned: myRank === 1 && totalStudents > 1,
      },
      {
        id: "top3",
        label: "Top 3 lớp",
        desc: "Đang nằm trong Top 3 học viên xuất sắc nhất lớp",
        icon: <Medal className="h-4 w-4" />,
        color: "bg-blue-100 text-blue-700 border-blue-300",
        earned: !!myRank && myRank <= 3 && myRank > 1 && totalStudents > 3,
      },
      {
        id: "complete100",
        label: "Hoàn thành 100%",
        desc: "Đã hoàn thành toàn bộ bài tập được giao trong lớp",
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: "bg-emerald-100 text-emerald-700 border-emerald-300",
        earned: completionRate === 100 && totalHomeworks > 0,
      },
      {
        id: "graded10",
        label: "Được chấm 10+ bài",
        desc: `Đã có ${gradedCount} bài được giáo viên chấm & nhận xét`,
        icon: <Star className="h-4 w-4" />,
        color: "bg-violet-100 text-violet-700 border-violet-300",
        earned: gradedCount >= 10,
      },
      {
        id: "graded5",
        label: "Được chấm 5+ bài",
        desc: `Đã có ${gradedCount} bài được giáo viên chấm & nhận xét`,
        icon: <Star className="h-4 w-4" />,
        color: "bg-violet-100 text-violet-600 border-violet-200",
        earned: gradedCount >= 5 && gradedCount < 10,
      },
      {
        id: "submitted10",
        label: "Nộp 10+ bài",
        desc: `Đã nộp tổng cộng ${submittedCount} bài cho giáo viên`,
        icon: <Zap className="h-4 w-4" />,
        color: "bg-sky-100 text-sky-700 border-sky-300",
        earned: submittedCount >= 10,
      },
      {
        id: "submitted5",
        label: "Nộp 5+ bài",
        desc: `Đã nộp tổng cộng ${submittedCount} bài cho giáo viên`,
        icon: <Zap className="h-4 w-4" />,
        color: "bg-sky-100 text-sky-600 border-sky-200",
        earned: submittedCount >= 5 && submittedCount < 10,
      },
      {
        id: "active80",
        label: "Tiến độ tích cực",
        desc: `Hoàn thành ${Math.round(completionRate)}% bài tập được giao`,
        icon: <Users className="h-4 w-4" />,
        color: "bg-teal-100 text-teal-700 border-teal-300",
        earned: completionRate >= 80 && completionRate < 100 && totalHomeworks > 0,
      },
    ];

    // De-duplicate multi-tier badges (chỉ hiện badge cao nhất)
    const earnedIds = list.filter((a) => a.earned).map((a) => a.id);
    if (earnedIds.includes("graded10")) {
      return list.filter((a) => a.id !== "graded5" || !earnedIds.includes("graded10"));
    }
    if (earnedIds.includes("submitted10")) {
      return list.filter((a) => a.id !== "submitted5" || !earnedIds.includes("submitted10"));
    }
    return list;
  }, [myRank, totalStudents, completionRate, totalHomeworks, gradedCount, submittedCount]);

  const earnedAchievements = achievements.filter((a) => a.earned);
  const lockedAchievements = achievements.filter((a) => !a.earned);


  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingInfo(true);
    try {
      await authApi.updateProfile({ fullName, bio, avatarUrl, phone, gender });
      await refreshUser();
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân của bạn đã được cập nhật.",
      });
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.response?.data?.error || "Không thể cập nhật thông tin.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const response = await uploadsApi.uploadImage(file);
      setAvatarUrl(response.url);
      await authApi.updateProfile({ avatarUrl: response.url });
      await refreshUser();
      toast({
        title: "Tải ảnh lên thành công",
        description: "Ảnh đại diện của bạn đã được cập nhật và lưu thành công.",
      });
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error?.message || "Không thể tải ảnh lên.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cá Nhân</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin cá nhân và cài đặt tài khoản của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="relative inline-block">
                <Avatar className="h-32 w-32 mx-auto border-2 border-primary/10">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-4xl bg-muted">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <Label
                    htmlFor="avatar-upload"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </Label>
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploadingAvatar}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{user?.fullName || "Học viên"}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Study Buddy Pass Card */}
          {(() => {
            const activeRefCode = referralsData?.referralCode || (user as any)?.referralCode || generateReferralCode(user?.fullName, user?.id);
            const totalInvited = referralsData?.stats?.totalInvited ?? 0;
            const totalEligible = referralsData?.stats?.totalEligible ?? 0;
            const rewardsList = referralsData?.rewards ?? [];

            return (
              <Card className="relative overflow-hidden rounded-2xl border-2 border-rose-200/90 bg-gradient-to-br from-rose-50/90 via-orange-50/50 to-amber-50/70 text-slate-900 shadow-md hover:shadow-lg transition-all duration-300">
                {/* Decorative background glow accents */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-400/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

                <CardHeader className="relative p-4 pb-3 border-b border-rose-100/80 bg-white/60 backdrop-blur-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xs">
                        <Gift className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-rose-600">Đặc Quyền Học Viên</div>
                        <div className="text-xs font-black tracking-tight text-slate-900">THẺ ĐỒNG HÀNH ARIS</div>
                      </div>
                    </div>
                    <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0 text-[10px] font-extrabold px-2 py-0.5 shadow-2xs">
                      {totalInvited > 0 ? `🎉 ${totalInvited} bạn đã mời` : "🎁 Ưu Đãi HOT"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative p-4 space-y-3.5">
                  {/* Voucher code box */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-amber-500" /> Mã giới thiệu của bạn
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/90 border-2 border-dashed border-rose-300 shadow-2xs">
                      <div className="flex-1 font-mono font-black text-xs sm:text-sm px-2 text-rose-700 tracking-wider truncate">
                        {activeRefCode}
                      </div>
                      <Button
                        size="sm"
                        onClick={async () => {
                          const inviter = user?.fullName || "Học viên";
                          const targetUrl = `${window.location.origin}/buddy?ref=${activeRefCode}&from=${encodeURIComponent(inviter)}`;
                          const shareText = getBuddyShareText(inviter, activeRefCode, targetUrl);
                          try {
                            await navigator.clipboard.writeText(shareText);
                            setIsCopiedCode(true);
                            toast({ title: "Thành công", description: "Đã sao chép tin nhắn mời kèm mã ưu đãi." });
                            setTimeout(() => setIsCopiedCode(false), 3000);
                          } catch {
                            toast({ title: "Thông báo", description: "Vui lòng sao chép thủ công." });
                          }
                        }}
                        className="h-7.5 px-3 text-xs font-bold gap-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs shrink-0 transition-colors"
                      >
                        {isCopiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{isCopiedCode ? "Đã chép" : "Sao chép"}</span>
                      </Button>
                    </div>
                  </div>

                  {/* Highlights / Benefits */}
                  <div className="grid grid-cols-1 gap-1.5">
                    <div className="p-2 rounded-xl bg-rose-100/50 border border-rose-200/80 flex items-center gap-2">
                      <span className="text-sm shrink-0">🎉</span>
                      <div className="text-[11px] leading-tight">
                        <span className="text-slate-600 font-medium">Bạn bè nhận: </span>
                        <strong className="text-rose-600 font-bold">Giảm 200.000đ học phí</strong>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-100/50 border border-amber-200/80 flex items-center gap-2">
                      <span className="text-sm shrink-0">🎁</span>
                      <div className="text-[11px] leading-tight">
                        <span className="text-slate-600 font-medium">Bạn nhận: </span>
                        <strong className="text-amber-800 font-bold">01 Bộ Quà Tặng ARIS</strong>
                      </div>
                    </div>
                  </div>

                  {/* Trạng thái phần thưởng */}
                  {rewardsList.length > 0 && (
                    <div className="space-y-1.5 pt-1 border-t border-rose-200/60">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Tiến độ quà tặng ({rewardsList.length})
                      </div>
                      <div className="space-y-1">
                        {rewardsList.map((r: any) => (
                          <div key={r.id} className="text-[11px] p-2 rounded-lg bg-white/90 border border-rose-100 flex items-center justify-between shadow-2xs">
                            <span className="font-semibold text-slate-800">Bộ Quà Tặng ARIS</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              r.status === "ELIGIBLE"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : r.status === "DELIVERED"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-amber-100 text-amber-800 border border-amber-200"
                            }`}>
                              {r.status === "ELIGIBLE" ? "🎁 Đủ điều kiện nhận" : r.status === "DELIVERED" ? "Đã nhận quà" : "Chờ bạn đóng học phí"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    size="sm"
                    onClick={() => setIsBuddyModalOpen(true)}
                    className="w-full text-xs font-bold h-9 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white gap-2 shadow-sm hover:shadow-md transition-all transform active:scale-[0.99]"
                  >
                    <Sparkles className="h-4 w-4 text-amber-200 animate-pulse" />
                    <span>Xem thẻ mời & Tải ảnh chia sẻ</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })()}
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-8">
          {/* Personal Info */}
          <Card>
            <form onSubmit={handleUpdateInfo}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" /> Thông tin cá nhân
                </CardTitle>
                <CardDescription>
                  Cập nhật họ tên và giới thiệu bản thân của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="VD: 09xxxxxxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Giới tính</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bio">Giới thiệu</Label>
                    <span className={`text-xs font-mono ${bio.length >= 150 ? "text-destructive font-semibold" : bio.length >= 120 ? "text-warning" : "text-muted-foreground"}`}>
                      {bio.length}/150
                    </span>
                  </div>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 150))}
                    placeholder="Một chút về bản thân bạn..."
                    rows={3}
                    maxLength={150}
                  />
                  {bio.length >= 150 && (
                    <p className="text-xs text-destructive">Đã đạt giới hạn 150 ký tự.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" disabled={isUpdatingInfo}>
                  {isUpdatingInfo ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Lưu thông tin
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Hồ sơ Năng lực Dọc (Longitudinal Evidence Profile) */}
          <StudentEvidenceProfileCard submissions={userSubmissions} />

          {/* Thành tích & Danh hiệu */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" /> Thành tích & Danh hiệu
              </CardTitle>
              <CardDescription>
                Các danh hiệu được tính tự động từ tiến độ học tập, thứ hạng lớp và chuỗi học liên tục của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Earned achievements */}
              {earnedAchievements.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Đã đạt được · {earnedAchievements.length} danh hiệu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {earnedAchievements.map((a) => (
                      <div
                        key={a.id}
                        title={a.desc}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${a.color} cursor-default select-none`}
                      >
                        {a.icon}
                        {a.label}
                      </div>
                    ))}
                  </div>

                  {/* Stats snapshot */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    {myRank && (
                      <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center space-y-1">
                        <div className="text-xl font-black text-foreground">#{myRank}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">Hạng trong lớp</div>
                      </div>
                    )}
                    {completionRate > 0 && (
                      <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center space-y-1">
                        <div className="text-xl font-black text-emerald-600">{Math.round(completionRate)}%</div>
                        <div className="text-[10px] text-muted-foreground font-medium">Tỷ lệ hoàn thành</div>
                      </div>
                    )}
                    {submittedCount > 0 && (
                      <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center space-y-1">
                        <div className="text-xl font-black text-foreground">{submittedCount}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">Bài đã nộp</div>
                      </div>
                    )}
                    {totalHomeworks > 0 && (
                      <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center space-y-1">
                        <div className="text-xl font-black text-foreground">{completedCount}/{totalHomeworks}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">Tiến độ lớp</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Chưa có danh hiệu nào</p>
                  <p className="text-xs text-muted-foreground">
                    Hoàn thành bài tập, nâng cao tỷ lệ nộp bài đúng hạn và leo hạng trong lớp để mở khóa danh hiệu đầu tiên.
                  </p>
                </div>
              )}

              {/* Locked / upcoming achievements */}
              {lockedAchievements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Chưa đạt · Mục tiêu tiếp theo
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lockedAchievements.map((a) => (
                      <div
                        key={a.id}
                        title={a.desc}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-xs font-medium text-muted-foreground cursor-default select-none opacity-60"
                      >
                        {a.icon}
                        {a.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Study Buddy Pass Modal */}
      <StudyBuddyModal
        isOpen={isBuddyModalOpen}
        onClose={() => setIsBuddyModalOpen(false)}
        studentName={user?.fullName || "Học viên"}
        className={enrollments[0]?.className || "Lớp học cá nhân"}
        userId={user?.id}
        code={referralsData?.referralCode || (user as any)?.referralCode}
      />
    </div>
  );
}

