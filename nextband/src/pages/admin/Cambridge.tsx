import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cambridgeApi, CambridgeSessionSummary } from "@/lib/api";
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  Eye,
  FileEdit,
  GraduationCap,
  Volume2,
  ExternalLink,
  ShieldAlert,
  UserCheck,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CambridgeGradingModal from "./CambridgeGradingModal";

export default function AdminCambridge() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [gradingFilter, setGradingFilter] = useState<string>("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form tạo bài test
  const [candidateName, setCandidateName] = useState("");
  const [candidateGrade, setCandidateGrade] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [targetLevel, setTargetLevel] = useState<string>("Flyers");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cambridgeSessions", search, gradingFilter],
    queryFn: () =>
      cambridgeApi.listSessions({
        search: search.trim() || undefined,
        gradingStatus: gradingFilter !== "ALL" ? gradingFilter : undefined,
      }),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      cambridgeApi.createSession({
        candidateName,
        candidateGrade: candidateGrade || undefined,
        candidatePhone: candidatePhone || undefined,
        targetLevel,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cambridgeSessions"] });
      setIsCreateOpen(false);
      setCandidateName("");
      setCandidateGrade("");
      setCandidatePhone("");
    },
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (s: CambridgeSessionSummary) => {
    if (s.status === "ACTIVE") {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="w-3 h-3 mr-1 animate-spin" /> Đang làm bài
        </Badge>
      );
    }
    if (s.status === "SUBMITTED") {
      if (s.gradingStatus === "GRADED") {
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Đã xếp lớp
          </Badge>
        );
      }
      if (s.gradingStatus === "PARTIAL") {
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <FileEdit className="w-3 h-3 mr-1" /> Đang chấm dở
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <AlertCircle className="w-3 h-3 mr-1" /> Cần chấm
        </Badge>
      );
    }
    return <Badge variant="outline">Hết hạn</Badge>;
  };

  const getLevelBadge = (level?: string | null) => {
    if (!level) return <span className="text-slate-400 text-xs italic">Chưa xếp</span>;
    if (level === "PET") {
      return <Badge className="bg-purple-600 hover:bg-purple-700 font-bold">PET (B1)</Badge>;
    }
    if (level === "KET") {
      return <Badge className="bg-indigo-600 hover:bg-indigo-700 font-bold">KET (A2)</Badge>;
    }
    return <Badge className="bg-emerald-600 hover:bg-emerald-700 font-bold">Flyers (A2-)</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Cambridge Placement Test</h1>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                ARIS Standard
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Bài thi chuẩn đoán 4 kĩ năng xếp lớp Cambridge: Flyers, KET, PET (Median & Veto Rules)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4 mr-1.5" /> Làm mới
          </Button>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Tạo phiên thi mới
          </Button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Tìm theo tên học sinh, mã thi, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-slate-200"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-500">Trạng thái chấm:</span>
          <Select value={gradingFilter} onValueChange={setGradingFilter}>
            <SelectTrigger className="w-[160px] bg-white border-slate-200">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="PENDING">Chưa chấm</SelectItem>
              <SelectItem value="PARTIAL">Đang chấm dở</SelectItem>
              <SelectItem value="GRADED">Đã chấm xong</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table list */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
              <tr>
                <th className="px-6 py-4">Mã bài thi</th>
                <th className="px-6 py-4">Học sinh</th>
                <th className="px-6 py-4">Trạng thái bài</th>
                <th className="px-6 py-4">Tiến độ Gate</th>
                <th className="px-6 py-4">Điểm trắc nghiệm</th>
                <th className="px-6 py-4">Kết quả xếp lớp</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Đang tải danh sách bài thi...
                  </td>
                </tr>
              ) : !data?.data || data.data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    Chưa có phiên làm bài Cambridge nào. Hãy bấm "Tạo phiên thi mới" để cấp mã cho học sinh.
                  </td>
                </tr>
              ) : (
                data.data.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-indigo-700">
                        {s.testCode}
                        <button
                          onClick={() => handleCopyCode(s.testCode)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition"
                          title="Sao chép mã"
                        >
                          {copiedCode === s.testCode ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Tạo lúc: {new Date(s.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{s.candidateName}</div>
                      <div className="text-xs text-slate-500">
                        {s.candidateGrade ? `Khối: ${s.candidateGrade}` : "Chưa rõ khối"}
                        {s.candidatePhone ? ` • ${s.candidatePhone}` : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(s)}</td>
                    <td className="px-6 py-4">
                      {s.gatePassed ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-none font-medium">
                          Đạt Gate (Vào Extension)
                        </Badge>
                      ) : s.extensionAllowed ? (
                        <Badge className="bg-amber-100 text-amber-800 border-none font-medium" title={s.extensionOverrideReason || "Giáo viên mở quyền"}>
                          GV duyệt Extension
                        </Badge>
                      ) : (
                        <span className="text-xs text-slate-500">Chỉ Core</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {s.objectiveScore ? (
                        <div>
                          <span className="font-bold text-slate-800">
                            {s.objectiveScore.totalCorrect} / {s.objectiveScore.totalItems}
                          </span>
                          <span className="text-xs text-slate-500 ml-1">câu đúng</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">Chưa có bài nộp</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {getLevelBadge(s.finalLevel)}
                        {s.isAdjusted && (
                          <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">
                            Điều chỉnh
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => setSelectedSessionId(s.id)}
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-semibold"
                      >
                        <FileEdit className="w-3.5 h-3.5 mr-1" /> Chấm & Xếp lớp
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tạo Phiên Thi */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Cấp mã làm bài Cambridge mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-semibold">Họ và tên học sinh *</Label>
              <Input
                placeholder="Ví dụ: Nguyễn Văn An"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Khối / Lớp</Label>
                <Input
                  placeholder="Ví dụ: Lớp 5"
                  value={candidateGrade}
                  onChange={(e) => setCandidateGrade(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Mục tiêu cấp độ</Label>
                <Select value={targetLevel} onValueChange={setTargetLevel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Flyers">Flyers (A2-)</SelectItem>
                    <SelectItem value="KET">KET (A2)</SelectItem>
                    <SelectItem value="PET">PET (B1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold">Số điện thoại phụ huynh</Label>
              <Input
                placeholder="Ví dụ: 0987654321"
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Hủy
            </Button>
            <Button
              disabled={!candidateName.trim() || createMutation.isPending}
              onClick={() => createMutation.mutate()}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {createMutation.isPending ? "Đang tạo..." : "Tạo & Cấp mã thi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Chấm Điểm & Xem Chi Tiết Placement Sheet */}
      {selectedSessionId && (
        <CambridgeGradingModal
          sessionId={selectedSessionId}
          onClose={() => {
            setSelectedSessionId(null);
            queryClient.invalidateQueries({ queryKey: ["cambridgeSessions"] });
          }}
        />
      )}
    </div>
  );
}
