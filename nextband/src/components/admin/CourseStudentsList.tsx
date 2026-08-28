import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { classesApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, User, School, ExternalLink, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseStudentsListProps {
  courseId: string;
}

export default function CourseStudentsList({
  courseId,
}: CourseStudentsListProps) {
  // Fetch classes running this course to extract class students
  const { data: classesData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["course-classes-students", courseId],
    queryFn: () => classesApi.list({ courseId, limit: 100 }),
    enabled: !!courseId,
  });

  const { classStudentsList, uniqueStudentCount } = useMemo(() => {
    const rawClasses = classesData?.data || [];
    const list: any[] = [];
    const uniqueStudents = new Set<string>();

    rawClasses.forEach((cls: any) => {
      const students = cls.students || cls.class_students || [];
      students.forEach((st: any) => {
        const studentId = st.studentId || st.student_id || st.id || st.userId;
        if (studentId) {
          uniqueStudents.add(studentId);
        }
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
      });
    });
    return { classStudentsList: list, uniqueStudentCount: uniqueStudents.size };
  }, [classesData]);

  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Danh sách Học viên theo Lớp</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[11px] font-semibold">
              {uniqueStudentCount} Học viên thực tế
            </Badge>
            <span>•</span>
            <span className="text-slate-500">
              Quản lý tập trung qua các Lớp học trực thuộc Khóa
            </span>
          </CardDescription>
        </div>

        <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
          <Link to={`/admin/classes?courseId=${courseId}`}>
            <School className="mr-2 h-4 w-4" />
            Xem các Lớp học
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
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
                  <TableHead className="text-right font-bold text-xs uppercase">Chi tiết Lớp</TableHead>
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
                          <span>Vào Lớp</span>
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
            <p className="text-xs text-muted-foreground">Khi tạo Lớp học và thêm học viên vào lớp, danh sách học viên sẽ xuất hiện tự động tại đây.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

