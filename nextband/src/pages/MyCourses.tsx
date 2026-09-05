import { useState } from "react";
import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { MyClassEnrollment } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Play, UserCheck, RefreshCw, Crown, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ClassLeaderboardWidget } from "@/components/student/ClassLeaderboardWidget";
import { StudentReEnrollmentModal } from "@/components/student/StudentReEnrollmentModal";
import { getCourseBrand } from "@/lib/courseBrand";

function getStudentClassTheme(brandKey: string) {
  switch (brandKey) {
    case "leader":
      return {
        cardBorder: "border-rose-200 dark:border-rose-900/60 hover:border-rose-400 hover:shadow-lg hover:shadow-rose-500/10",
        headerGradient: "from-rose-600/20 via-red-500/10 to-rose-500/5",
        primaryBadge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
        titleHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
        textAccent: "text-rose-600 dark:text-rose-400",
        bgAccent: "bg-rose-50 dark:bg-rose-950/40",
        buttonClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25",
        bandPill: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300",
        duration: "10 TUẦN",
      };
    case "master":
      return {
        cardBorder: "border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10",
        headerGradient: "from-emerald-600/20 via-green-500/10 to-emerald-500/5",
        primaryBadge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
        titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
        textAccent: "text-emerald-600 dark:text-emerald-400",
        bgAccent: "bg-emerald-50 dark:bg-emerald-950/40",
        buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25",
        bandPill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300",
        duration: "09 TUẦN",
      };
    case "builder":
      return {
        cardBorder: "border-orange-200 dark:border-orange-900/60 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/10",
        headerGradient: "from-orange-600/20 via-amber-500/10 to-orange-500/5",
        primaryBadge: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800",
        titleHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
        textAccent: "text-orange-600 dark:text-orange-400",
        bgAccent: "bg-orange-50 dark:bg-orange-950/40",
        buttonClass: "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/25",
        bandPill: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/80 dark:text-orange-300",
        duration: "09 TUẦN",
      };
    case "dreamer":
      return {
        cardBorder: "border-blue-200 dark:border-blue-900/60 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10",
        headerGradient: "from-blue-600/20 via-sky-500/10 to-blue-500/5",
        primaryBadge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
        titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
        textAccent: "text-blue-600 dark:text-blue-400",
        bgAccent: "bg-blue-50 dark:bg-blue-950/40",
        buttonClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25",
        bandPill: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300",
        duration: "09 TUẦN",
      };
    case "starter":
      return {
        cardBorder: "border-fuchsia-200 dark:border-fuchsia-900/60 hover:border-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/10",
        headerGradient: "from-fuchsia-600/20 via-pink-500/10 to-rose-500/5",
        primaryBadge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800",
        titleHover: "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
        textAccent: "text-fuchsia-600 dark:text-fuchsia-400",
        bgAccent: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
        buttonClass: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-fuchsia-600/25",
        bandPill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/80 dark:text-fuchsia-300",
        duration: "09 TUẦN",
      };
    default:
      return {
        cardBorder: "border-border hover:border-primary/50 hover:shadow-md",
        headerGradient: "from-primary/15 via-primary/5 to-secondary/15",
        primaryBadge: "bg-white/90 dark:bg-card/90 font-bold text-[10px] text-primary border-primary/20",
        titleHover: "group-hover:text-primary",
        textAccent: "text-primary",
        bgAccent: "bg-primary/5",
        buttonClass: "bg-primary hover:bg-primary/90 text-white",
        bandPill: "bg-muted text-muted-foreground border-border",
        duration: "",
      };
  }
}

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state, enrollments, isLoading, retry } = useStudentLifecycle();
  const [reEnrollTargetClass, setReEnrollTargetClass] = useState<MyClassEnrollment | null>(null);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1.5">
          Lớp Học & Khóa Học Của Tôi
        </h1>
        <p className="text-sm text-muted-foreground">
          Quản lý, tiếp tục học và theo dõi tiến độ thi đua làm bài tập cùng các bạn trong lớp
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="grid gap-6 grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Skeleton className="h-64 w-full rounded-2xl" />
              </div>
              <div className="lg:col-span-7">
                <Skeleton className="h-64 w-full rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      ) : state === "API_ERROR" || state === "NETWORK_ERROR" ? (
        <Card className="p-8 text-center space-y-4 border-destructive/20 bg-destructive/5 rounded-2xl">
          <div className="text-destructive font-bold text-lg">Không thể tải danh sách lớp học</div>
          <p className="text-sm text-muted-foreground">Vui lòng kiểm tra kết nối và thử lại.</p>
          <Button onClick={retry} variant="outline" size="sm" className="gap-2 mx-auto">
            <RefreshCw className="h-4 w-4" />
            Thử lại
          </Button>
        </Card>
      ) : enrollments && enrollments.length > 0 ? (
        <div className="space-y-8">
          {enrollments.map((item) => {
            const brand = getCourseBrand({ title: item.courseTitle, name: item.className });
            const theme = getStudentClassTheme(brand.key);

            return (
              <div
                key={item.id}
                className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Bên trái: Thẻ Lớp Học mang màu sắc cấp độ khóa học tương ứng (lg:col-span-5) */}
                <div className="lg:col-span-5 flex">
                  <Card
                    tabIndex={0}
                    role="button"
                    onClick={() => navigate(`/app/class/${item.classId}/lessons`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/app/class/${item.classId}/lessons`);
                      }
                    }}
                    className={`w-full group overflow-hidden transition-all duration-300 flex flex-col justify-between bg-card shadow-xs rounded-2xl border cursor-pointer ${theme.cardBorder}`}
                  >
                    {/* Header mang màu sắc đặc trưng của khóa học */}
                    <div className={`h-36 sm:h-40 bg-gradient-to-br ${theme.headerGradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Badge variant="outline" className={`font-bold text-[10px] ${theme.primaryBadge}`}>
                            LỚP HỌC CHÍNH THỨC
                          </Badge>
                          {brand.band && (
                            <Badge variant="outline" className={`font-bold text-[10px] ${theme.bandPill}`}>
                              {brand.band}
                            </Badge>
                          )}
                          {theme.duration && (
                            <Badge variant="outline" className={`font-mono text-[10px] ${theme.bandPill}`}>
                              {theme.duration}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold shrink-0">
                          Đang hoạt động
                        </Badge>
                      </div>

                      <div>
                        <h3 className={`text-xl sm:text-2xl font-extrabold text-foreground tracking-tight transition-colors ${theme.titleHover}`}>
                          {item.className}
                        </h3>
                        <p className={`text-xs font-bold mt-1 flex items-center gap-1.5 ${theme.textAccent}`}>
                          <Crown className="h-3.5 w-3.5 shrink-0" />
                          Khóa {item.courseTitle || brand.name}
                        </p>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        {item.teacherName && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <UserCheck className={`h-4 w-4 shrink-0 ${theme.textAccent}`} />
                            <span>Giáo viên: <strong className="text-foreground font-semibold">{item.teacherName}</strong></span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <BookOpen className={`h-4 w-4 shrink-0 ${theme.textAccent}`} />
                          <span>Luyện tập bài tập, nộp bài & nhận xét trực tuyến</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setReEnrollTargetClass(item)}
                          className="font-bold text-xs gap-1.5 rounded-xl px-3.5 h-9 border-amber-300 bg-amber-50/50 text-amber-900 hover:bg-amber-100/80 shadow-2xs cursor-pointer"
                        >
                          <Award className="h-3.5 w-3.5 text-amber-600" />
                          <span>Tái đăng ký</span>
                        </Button>

                        <Button
                          size="sm"
                          asChild
                          className={`font-bold text-xs gap-2 rounded-xl px-5 h-9 shadow-sm hover:shadow-md transition-all ${theme.buttonClass}`}
                        >
                          <Link to={`/app/class/${item.classId}/lessons`}>
                            <Play className="h-3.5 w-3.5 fill-current" />
                            Vào Lớp Học
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bên phải: Thẻ Thông tin Lớp học & Bảng Thi đua Tiến độ (lg:col-span-7) */}
                <div className="lg:col-span-7 flex">
                  <ClassLeaderboardWidget
                    classId={item.classId}
                    className={item.className}
                    currentUserId={user?.id}
                    targetBand={brand.band}
                    badgeClass={theme.bandPill}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-2xl bg-muted/30">
          <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Bạn chưa được phân vào lớp học nào
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Vui lòng liên hệ trung tâm hoặc giáo viên quản trị để được thêm vào lớp học của bạn.
          </p>
          <Button asChild variant="outline">
            <Link to="/app">
              <BookOpen className="mr-2 h-4 w-4" />
              Quay lại Bàn làm việc
            </Link>
          </Button>
        </div>
      )}

      {/* Re-Enrollment Modal for Selected Course */}
      <StudentReEnrollmentModal
        isOpen={!!reEnrollTargetClass}
        onClose={() => setReEnrollTargetClass(null)}
        classId={reEnrollTargetClass?.classId}
        className={reEnrollTargetClass?.className}
        courseTitle={reEnrollTargetClass?.courseTitle}
        studentId={user?.id}
        studentName={user?.fullName || "Học viên"}
        studentPhone={user?.phone || ""}
        scholarshipAmount={500000}
      />
    </div>
  );
}
