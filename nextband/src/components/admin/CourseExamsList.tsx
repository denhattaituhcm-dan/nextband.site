import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { examsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, ArrowUpDown, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { DataTablePagination } from "@/components/admin/DataTablePagination";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseExamsListProps {
  courseId: string;
}

interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  week: number;
  durationMinutes: number;
  isPublished: boolean;
  isActive: boolean;
  isLocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

type SortField = "week" | "title" | "createdAt";
type SortOrder = "asc" | "desc";

export default function CourseExamsList({ courseId }: CourseExamsListProps) {
  const [sortField, setSortField] = useState<SortField>("week");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [deleteExam, setDeleteExam] = useState<{
    id: string;
    title: string;
    isLocked?: boolean;
  } | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: [
      "course-exams-admin",
      courseId,
      sortField,
      sortOrder,
      page,
      pageSize,
    ],
    queryFn: () =>
      examsApi.list({
        courseId,
        page,
        limit: pageSize,
        sortBy: sortField,
        sortOrder,
      }),
    enabled: !!courseId,
  });

  const exams = (data?.data || []) as Exam[];
  const totalPages = data?.meta?.totalPages || 1;
  const total = data?.meta?.total || 0;

  const deleteMutation = useMutation({
    mutationFn: async ({ id, password }: { id: string; password: string }) =>
      examsApi.delete(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-exams-admin"] });
      toast({ title: "Đã xóa", description: "bài tập đã được xóa" });
      setDeleteExam(null);
    },
  });

  const lockMutation = useMutation({
    mutationFn: async ({ id, isLocked }: { id: string; isLocked: boolean }) =>
      examsApi.update(id, { isLocked }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-exams-admin"] });
      toast({ title: "Đã cập nhật trạng thái khóa" });
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description:
          err.response?.data?.error || "Không thể cập nhật trạng thái khóa",
        variant: "destructive",
      });
    },
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const SortHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown
          className={`h-3 w-3 ${sortField === field ? "text-primary" : "text-muted-foreground"}`}
        />
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>bài tập trong khóa học</CardTitle>
        <Button size="sm" asChild>
          <Link to={`/admin/exams/create?courseId=${courseId}`}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm bài thi
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Đang tải...</p>
        ) : exams && exams.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <SortHeader field="week">Tuần</SortHeader>
                  <SortHeader field="title">Tên bài thi</SortHeader>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Kích hoạt</TableHead>
                  <TableHead className="w-[80px] text-center">Khóa</TableHead>
                  <TableHead className="w-[120px] whitespace-nowrap">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">
                      Tuần {exam.week || 1}
                    </TableCell>
                    <TableCell>{exam.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={exam.isPublished ? "default" : "secondary"}
                      >
                        {exam.isPublished ? "Đã xuất bản" : "Nháp"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={exam.isActive ? "default" : "outline"}>
                        {exam.isActive ? "Hoạt động" : "Tắt"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={exam.isLocked ? "default" : "outline"}
                              size="icon"
                              className={`h-8 w-8 ${
                                exam.isLocked
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() =>
                                lockMutation.mutate({
                                  id: exam.id,
                                  isLocked: !exam.isLocked,
                                })
                              }
                              disabled={lockMutation.isPending}
                              aria-label={
                                exam.isLocked
                                  ? "Đang khóa, bấm để mở khóa"
                                  : "Đang mở khóa, bấm để khóa"
                              }
                            >
                              {exam.isLocked ? (
                                <Lock className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                              ) : (
                                <Unlock className="h-4 w-4 text-slate-400" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {exam.isLocked
                              ? "Đang khóa — Bấm để mở khóa"
                              : "Đang mở khóa — Bấm để khóa"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <Button variant="ghost" size="sm" asChild disabled={!!exam.isLocked}>
                                  <Link to={`/admin/exams/${exam.id}`}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {exam.isLocked
                                ? "Đang khóa, cần mở khóa trước khi sửa"
                                : "Sửa bài thi"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  disabled={!!exam.isLocked}
                                  onClick={() =>
                                    setDeleteExam({
                                      id: exam.id,
                                      title: exam.title,
                                      isLocked: !!exam.isLocked,
                                    })
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {exam.isLocked
                                ? "Đang khóa, cần mở khóa trước khi xóa"
                                : "Xóa bài thi"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <DataTablePagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={total}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </>
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            Chưa có bài tập nào
          </p>
        )}
      </CardContent>

      <DeleteConfirmDialog
        open={!!deleteExam}
        onOpenChange={(open) => !open && setDeleteExam(null)}
        onConfirm={(payload) =>
          deleteExam &&
          payload?.password &&
          deleteMutation.mutate({ id: deleteExam.id, password: payload.password })
        }
        loading={deleteMutation.isPending}
        title="Xóa bài thi?"
        description={`Bạn có chắc chắn muốn xóa bài tập "${deleteExam?.title}"? Hành động này không thể hoàn tác.`}
        confirmKeyword="XOA"
        requirePassword
      />
    </Card>
  );
}
