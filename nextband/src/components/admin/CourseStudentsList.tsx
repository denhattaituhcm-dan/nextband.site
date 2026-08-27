import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentsApi, usersApi, classesApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Search, User, Loader2, School, BookOpen, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseStudentsListProps {
  courseId: string;
}

export default function CourseStudentsList({
  courseId,
}: CourseStudentsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"class_students" | "enrollments">("class_students");

  // 1. Fetch direct self-paced enrollments
  const { data: enrollmentsData, isLoading: isEnrollmentsLoading } = useQuery({
    queryKey: ["course-enrollments", courseId],
    queryFn: () => enrollmentsApi.listByCourse(courseId),
    enabled: !!courseId,
  });

  const enrollments = Array.isArray(enrollmentsData)
    ? enrollmentsData
    : (enrollmentsData as any)?.data || [];

  // 2. Fetch classes running this course to extract class students
  const { data: classesData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["course-classes-students", courseId],
    queryFn: () => classesApi.list({ courseId, limit: 100 }),
    enabled: !!courseId,
  });

  const classStudentsList = useMemo(() => {
    const rawClasses = classesData?.data || [];
    const list: any[] = [];
    const seen = new Set<string>();

    rawClasses.forEach((cls: any) => {
      const students = cls.students || cls.class_students || [];
      students.forEach((st: any) => {
        const studentId = st.studentId || st.student_id || st.id || st.userId;
        const key = `${cls.id}-${studentId}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            studentId,
            fullName: st.fullName || st.full_name || st.name || st.email || "Học viên",
            email: st.email || "",
            avatarUrl: st.avatarUrl || st.avatar_url || null,
            joinedAt: st.joinedAt || st.joined_at || st.createdAt || st.created_at,
            status: st.status || (st.isActive !== false ? "ACTIVE" : "INACTIVE"),
            classId: cls.id,
            className: cls.name,
            teacherName: cls.teacher?.fullName || cls.teacher?.name || "Chưa phân công",
          });
        }
      });
    });
    return list;
  }, [classesData]);

  // Fetch available users (not enrolled)
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["available-users", courseId, searchTerm],
    queryFn: () => usersApi.list({ search: searchTerm, limit: 20 }),
    enabled: open,
  });

  const enrolledIds = enrollments.map((e: any) => e.studentId);
  const availableUsers = (usersData?.data || []).filter(
    (u: any) => !enrolledIds.includes(u.id),
  );

  // Add student mutation
  const addMutation = useMutation({
    mutationFn: (studentId: string) =>
      enrollmentsApi.enrollUser(courseId, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-enrollments", courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-users", courseId],
      });
      toast({
        title: "Thành công",
        description: "Đã thêm học viên vào khóa học",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.response?.data?.error || error.message,
        variant: "destructive",
      });
    },
  });

  // Remove student mutation
  const removeMutation = useMutation({
    mutationFn: (enrollmentId: string) => enrollmentsApi.delete(enrollmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-enrollments", courseId],
      });
      toast({
        title: "Thành công",
        description: "Đã xóa học viên khỏi khóa học",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.response?.data?.error || error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Học viên thuộc Khóa học</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[11px] font-semibold">
              {classStudentsList.length} Học viên theo Lớp
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200 text-[11px] font-semibold">
              {enrollments.length} Học viên Tự học (Enrollment)
            </Badge>
          </CardDescription>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              Ghi danh Tự học
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-slate-900 font-bold text-lg">Ghi danh Học viên Tự học</DialogTitle>
              <DialogDescription className="text-slate-500 text-xs">
                Chọn tài khoản học viên để cấp quyền truy cập khóa học theo hình thức tự học (Direct Enrollment).
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Tìm theo email hoặc tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-emerald-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-600"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {usersLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : availableUsers && availableUsers.length > 0 ? (
                  availableUsers.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl || undefined} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {user.fullName || "Chưa đặt tên"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                        onClick={() => addMutation.mutate(user.id)}
                        disabled={addMutation.isPending}
                      >
                        Ghi danh
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    {searchTerm
                      ? "Không tìm thấy học viên"
                      : "Nhập tên hoặc email để tìm kiếm"}
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Source Sub-Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid grid-cols-2 w-full sm:w-[380px] p-1 bg-muted rounded-xl">
            <TabsTrigger value="class_students" className="rounded-lg text-xs font-bold gap-1.5">
              <School className="w-3.5 h-3.5" />
              <span>Học viên theo Lớp ({classStudentsList.length})</span>
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="rounded-lg text-xs font-bold gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Học viên Tự học ({enrollments.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: CLASS STUDENTS */}
          <TabsContent value="class_students" className="pt-3">
            {isClassesLoading ? (
              <p className="text-muted-foreground py-6 text-center text-xs">Đang tải danh sách học viên theo lớp...</p>
            ) : classStudentsList.length > 0 ? (
              <div className="border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="font-bold text-xs uppercase">Học viên</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Email</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Lớp học</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Giáo viên</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Trạng thái</TableHead>
                      <TableHead className="text-right font-bold text-xs uppercase">Workspace</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudentsList.map((item, idx) => (
                      <TableRow key={`${item.classId}-${item.studentId}-${idx}`} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={item.avatarUrl || undefined} />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-sm text-foreground">
                              {item.fullName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">{item.email || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs font-semibold">
                            {item.className}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{item.teacherName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-[11px] font-semibold ${
                              item.status === "ACTIVE"
                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                                : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200"
                            }`}
                          >
                            {item.status === "ACTIVE" ? "Đang học" : item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-primary gap-1">
                            <Link to={`/admin/classes/${item.classId}`}>
                              <span>Xem Lớp</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-xl space-y-1 bg-slate-50/50">
                <School className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
                <p className="text-sm font-semibold text-foreground">Chưa có lớp nào mở cho khóa học này</p>
                <p className="text-xs text-muted-foreground">Khi tạo Lớp học gắn với khóa học này, danh sách học viên sẽ xuất hiện tự động tại đây.</p>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: DIRECT ENROLLMENTS */}
          <TabsContent value="enrollments" className="pt-3">
            {isEnrollmentsLoading ? (
              <p className="text-muted-foreground py-6 text-center text-xs">Đang tải danh sách học viên tự học...</p>
            ) : enrollments && enrollments.length > 0 ? (
              <div className="border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="font-bold text-xs uppercase">Học viên</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Email</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Ngày ghi danh</TableHead>
                      <TableHead className="font-bold text-xs uppercase">Tiến độ</TableHead>
                      <TableHead className="w-[80px] text-right font-bold text-xs uppercase">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment: any) => (
                      <TableRow key={enrollment.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={enrollment.student?.avatarUrl || undefined}
                              />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-sm text-foreground">
                              {enrollment.student?.fullName || "Chưa đặt tên"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">{enrollment.student?.email}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString("vi-VN") : "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-semibold bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200">
                            {enrollment.progressPercent || 0}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-destructive hover:text-destructive"
                            onClick={() => removeMutation.mutate(enrollment.id)}
                            disabled={removeMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-xl space-y-1 bg-slate-50/50">
                <BookOpen className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
                <p className="text-sm font-semibold text-foreground">Chưa có học viên tự học nào được ghi danh trực tiếp</p>
                <p className="text-xs text-muted-foreground">Bấm "Ghi danh Tự học" ở trên để cấp quyền học cho học viên cá nhân.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

