import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
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
import {
  School,
  ExternalLink,
  Users,
  User,
  MapPin,
  Calendar,
  Filter,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseClassesListProps {
  courseId: string;
}

export default function CourseClassesList({ courseId }: CourseClassesListProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const { data, isLoading } = useQuery({
    queryKey: ["course-classes-admin", courseId, statusFilter],
    queryFn: () =>
      classesApi.list({
        courseId,
        isActive: statusFilter === "all" ? undefined : statusFilter === "active",
        limit: 100,
      }),
    enabled: !!courseId,
  });

  const classes = (data?.data || []) as any[];

  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <School className="w-5 h-5 text-primary" />
            <span>Lớp học thuộc Khóa học</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-1">
            Tổng cộng {classes.length} lớp học đang sử dụng giáo trình khóa học này.
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val: any) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-[140px] h-9 text-xs font-semibold rounded-xl bg-background">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent className="rounded-xl text-xs">
              <SelectItem value="all">Tất cả lớp ({classes.length})</SelectItem>
              <SelectItem value="active">Đang mở</SelectItem>
              <SelectItem value="inactive">Đã đóng</SelectItem>
            </SelectContent>
          </Select>

          {/* Quick link to Classes Manager */}
          <Button variant="outline" size="sm" asChild className="h-9 text-xs rounded-xl gap-1.5 border-border">
            <Link to={`/admin/classes?courseId=${courseId}`}>
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Quản lý Lớp</span>
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground py-8 text-center text-xs">Đang tải danh sách lớp học...</p>
        ) : classes.length > 0 ? (
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-bold text-xs uppercase">Lớp học</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Giáo viên phụ trách</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Cơ sở & Phòng</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Sĩ số</TableHead>
                  <TableHead className="font-bold text-xs uppercase">Trạng thái</TableHead>
                  <TableHead className="text-right font-bold text-xs uppercase">Class Workspace</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => {
                  const studentCount = cls.studentsCount ?? cls.student_count ?? (Array.isArray(cls.students) ? cls.students.length : 0);
                  const capacity = cls.room?.capacity || cls.maxStudents;
                  const isActive = cls.isActive !== false && cls.status !== "ARCHIVED" && cls.status !== "CLOSED";

                  return (
                    <TableRow key={cls.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="space-y-0.5">
                          <span className="font-bold text-sm text-foreground block">
                            {cls.name}
                          </span>
                          {cls.code && (
                            <span className="text-xs font-mono text-muted-foreground">
                              {cls.code}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                          <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{cls.teacher?.fullName || cls.teacher?.name || "Chưa phân công"}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-xs space-y-0.5">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span>{cls.branch?.name || cls.branchName || "—"}</span>
                          </div>
                          {cls.room?.name && (
                            <span className="text-[11px] text-muted-foreground/80 block pl-4">
                              Phòng: {cls.room.name}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span className="font-semibold text-foreground">
                            {studentCount} {capacity ? `/ ${capacity}` : "học viên"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-semibold ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                              : "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200"
                          }`}
                        >
                          {isActive ? "Đang mở" : "Đã đóng"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1 rounded-lg font-semibold"
                        >
                          <Link to={`/admin/classes/${cls.id}`}>
                            <span>Mở Lớp</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-xl space-y-2 bg-slate-50/50">
            <School className="w-10 h-10 text-muted-foreground mx-auto opacity-40" />
            <p className="text-sm font-semibold text-foreground">Chưa có lớp học nào thuộc khóa học này</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Bạn có thể mở trang Quản lý Lớp để tạo lớp học mới và gán khóa học này làm chương trình đào tạo.
            </p>
            <Button size="sm" asChild className="rounded-xl mt-2 text-xs">
              <Link to={`/admin/classes?courseId=${courseId}`}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Mở Quản lý Lớp</span>
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
