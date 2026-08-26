import { useStudentLifecycle } from "@/hooks/useStudentLifecycle";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Play, UserCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClassLeaderboardWidget } from "@/components/student/ClassLeaderboardWidget";

export default function MyCourses() {
  const { user } = useAuth();
  const { state, enrollments, isLoading, retry } = useStudentLifecycle();

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
          {enrollments.map((item) => (
            <div
              key={item.id}
              className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Bên trái: Thẻ Lớp Học (lg:col-span-5) */}
              <div className="lg:col-span-5 flex">
                <Card
                  className="w-full group overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between border-border bg-card shadow-xs rounded-2xl"
                >
                  <div className="h-36 bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/15 p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-white/90 dark:bg-card/90 font-bold text-[10px] text-primary border-primary/20">
                        LỚP HỌC CHÍNH THỨC
                      </Badge>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                        Đang hoạt động
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {item.className}
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5 flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        Khóa {item.courseTitle}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      {item.teacherName && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <UserCheck className="h-4 w-4 text-primary shrink-0" />
                          <span>Giáo viên: <strong className="text-foreground font-semibold">{item.teacherName}</strong></span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BookOpen className="h-4 w-4 text-primary shrink-0" />
                        <span>Luyện tập bài tập, nộp bài & nhận xét trực tuyến</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t flex items-center justify-end">
                      <Button size="sm" asChild className="font-bold text-xs gap-2 rounded-xl px-5 h-9 bg-primary shadow-sm hover:shadow-md transition-all">
                        <Link to={`/app/class/${item.classId}/lessons`}>
                          <Play className="h-3.5 w-3.5 fill-current" />
                          Vào Lớp Học
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
                />
              </div>
            </div>
          ))}
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
    </div>
  );
}
