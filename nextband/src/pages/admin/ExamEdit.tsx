import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examsApi, sectionsApi } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Settings,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Edit,
  FileText,
  Check,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import ExamForm from "@/components/admin/ExamForm";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

const sectionIcons = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
  general: FileText,
};

const sectionColors = {
  listening: "bg-listening text-white",
  reading: "bg-reading text-white",
  writing: "bg-writing text-white",
  speaking: "bg-speaking text-white",
  general: "bg-primary text-primary-foreground",
};

export default function AdminExamEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const activeTab = searchParams.get("tab") || "info";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  const { data: examData, isLoading: examLoading } = useQuery({
    queryKey: ["exam", id],
    queryFn: () => examsApi.getById(id!),
    enabled: !!id,
  });

  const sections = examData?.sections || [];

  const handleBack = () => {
    if (examData?.courseId) {
      navigate(`/admin/courses/${examData.courseId}?tab=exams`);
    } else {
      navigate("/admin/exams");
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
    queryClient.invalidateQueries({ queryKey: ["exam", id] });
  };

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState({
    title: "",
    sectionType: "reading",
    orderIndex: 0,
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createSectionMutation = useMutation({
    mutationFn: (data: any) => sectionsApi.create({ ...data, examId: id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", id] });
      setCreateDialogOpen(false);
      setNewSection({
        title: "",
        sectionType: "reading",
        orderIndex: sections.length,
      });
      toast({ title: "Đã thêm phần thi mới thành công" });
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi tạo phần thi",
        description: err.message || "Không thể tạo phần thi",
        variant: "destructive",
      });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: ({ id, ...data }: any) => sectionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", id] });
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi cập nhật phần thi",
        description: err.message || "Không thể cập nhật phần thi",
        variant: "destructive",
      });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (sectionId: string) => sectionsApi.delete(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", id] });
      setDeleteId(null);
      toast({ title: "Đã xóa phần thi thành công" });
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi xóa phần thi",
        description: err.message || "Không thể xóa phần thi",
        variant: "destructive",
      });
    },
  });

  const moveSection = (section: any, direction: "up" | "down") => {
    const currentIndex = section.orderIndex ?? 0;
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) return;

    updateSectionMutation.mutate({ id: section.id, orderIndex: newIndex });
  };

  if (!id) {
    return <div>ID không hợp lệ</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Chỉnh sửa bài thi</h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="info" className="gap-2">
            <Settings className="h-4 w-4" />
            Thông tin
          </TabsTrigger>
          <TabsTrigger value="sections" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Sections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <ExamForm mode="edit" examId={id} onSuccess={handleSuccess} />
        </TabsContent>

        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quản lý Sections</CardTitle>
                  <CardDescription>
                    Chỉnh sửa nội dung từng phần thi
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setNewSection((s) => ({
                      ...s,
                      orderIndex: sections.length,
                    }));
                    setCreateDialogOpen(true);
                  }}
                  size="sm"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Thêm Section
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {examLoading ? (
                <p className="text-muted-foreground">Đang tải...</p>
              ) : sections && sections.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {sections
                    .sort(
                      (a: any, b: any) =>
                        (a.orderIndex || 0) - (b.orderIndex || 0),
                    )
                    .map((section: any) => {
                      const Icon =
                        sectionIcons[
                          section.sectionType as keyof typeof sectionIcons
                        ] || BookOpen;
                      const colorClass =
                        sectionColors[
                          section.sectionType as keyof typeof sectionColors
                        ] || "bg-muted";

                      const groups = section.questionGroups || section.question_groups || [];
                      const groupCount = groups.length;
                      const totalQuestions = groups.reduce(
                        (sum: number, g: any) => sum + (g.questions?.length || 0),
                        0
                      );
                      const isComplete = totalQuestions > 0;

                      return (
                        <Card
                          key={section.id}
                          className="hover:shadow-md transition-shadow border-slate-200"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Badge className={colorClass}>
                                  <Icon className="mr-1 h-3 w-3" />
                                  {(section.sectionType || "").toUpperCase()}
                                </Badge>
                                {isComplete ? (
                                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 font-medium">
                                    <Check className="h-3 w-3 mr-1" />
                                    Complete
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 font-medium">
                                    Empty
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="flex flex-col">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => moveSection(section, "up")}
                                    disabled={updateSectionMutation.isPending}
                                  >
                                    <ChevronUp className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => moveSection(section, "down")}
                                    disabled={updateSectionMutation.isPending}
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="h-8"
                                >
                                  <Link to={`/admin/sections/${section.id}`}>
                                    <Edit className="h-3 w-3 mr-1" />
                                    Sửa
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => setDeleteId(section.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <CardTitle className="text-lg mt-2 font-bold text-slate-800">
                              {section.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-muted-foreground space-y-2">
                              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                                <span>📦 {groupCount} Groups</span>
                                <span>•</span>
                                <span>❓ {totalQuestions} Questions</span>
                                {section.durationMinutes ? (
                                  <>
                                    <span>•</span>
                                    <span>⏱️ {section.durationMinutes} phút</span>
                                  </>
                                ) : null}
                              </div>
                              {section.instructions && (
                                <p className="line-clamp-2 text-xs text-slate-500 pt-1">
                                  {section.instructions.replace(/<[^>]*>/g, "")}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-800">Chưa có phần thi (Section) nào</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      Bài thi cần có ít nhất một phần thi để tạo câu hỏi và cho học viên làm bài.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      onClick={() => {
                        setNewSection({
                          title: "Speaking",
                          sectionType: "speaking",
                          orderIndex: 0,
                        });
                        setCreateDialogOpen(true);
                      }}
                    >
                      <Mic className="h-4 w-4 mr-1.5" /> + Speaking
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() => {
                        setNewSection({
                          title: "Writing",
                          sectionType: "writing",
                          orderIndex: 0,
                        });
                        setCreateDialogOpen(true);
                      }}
                    >
                      <PenTool className="h-4 w-4 mr-1.5" /> + Writing
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => {
                        setNewSection({
                          title: "Listening",
                          sectionType: "listening",
                          orderIndex: 0,
                        });
                        setCreateDialogOpen(true);
                      }}
                    >
                      <Headphones className="h-4 w-4 mr-1.5" /> + Listening
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() => {
                        setNewSection({
                          title: "Reading",
                          sectionType: "reading",
                          orderIndex: 0,
                        });
                        setCreateDialogOpen(true);
                      }}
                    >
                      <BookOpen className="h-4 w-4 mr-1.5" /> + Reading
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                      onClick={() => {
                        setNewSection({
                          title: "Grammar",
                          sectionType: "general",
                          orderIndex: 0,
                        });
                        setCreateDialogOpen(true);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1.5" /> + General
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setNewSection({
                          title: "",
                          sectionType: "reading",
                          orderIndex: 0,
                        });
                        setCreateDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Tùy chỉnh phần thi
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Section Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Section mới</DialogTitle>
            <DialogDescription>
              Tạo một phần thi mới cho bài tập này.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tiêu đề Section</Label>
              <Input
                placeholder="VD: Listening Section 1, Reading Passage 1, Grammar..."
                value={newSection.title}
                onChange={(e) =>
                  setNewSection((s) => ({ ...s, title: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại Section</Label>
                <Select
                  value={newSection.sectionType}
                  onValueChange={(val) =>
                    setNewSection((s) => ({ ...s, sectionType: val }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="listening">Listening</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="speaking">Speaking</SelectItem>
                    <SelectItem value="general">General (Grammar / Vocab)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Thứ tự (Index)</Label>
                <Input
                  type="number"
                  value={newSection.orderIndex}
                  onChange={(e) =>
                    setNewSection((s) => ({
                      ...s,
                      orderIndex: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              disabled={createSectionMutation.isPending || !newSection.title}
              onClick={() => createSectionMutation.mutate(newSection)}
            >
              {createSectionMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Tạo Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteSectionMutation.mutate(deleteId)}
        title="Xóa Section?"
        description="Toàn bộ câu hỏi và dữ liệu trong section này sẽ bị xóa vĩnh viễn."
        loading={deleteSectionMutation.isPending}
      />
    </div>
  );
}
