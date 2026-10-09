import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cambridgeApi, CambridgeRoomSummary, CambridgeSessionSummary } from "@/lib/api";
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
  Users,
  DoorOpen,
  Lock,
  ArrowRight,
  Share2,
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
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Modal tạo phòng thi
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState("Cambridge Placement Test");
  const [groupName, setGroupName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState<string>("0"); // 0 = Không giới hạn

  // 1. Danh sách tất cả phòng thi
  const { data: roomsData, isLoading: isLoadingRooms, refetch: refetchRooms } = useQuery({
    queryKey: ["cambridgeRooms"],
    queryFn: () => cambridgeApi.listRooms(),
  });

  const rooms = roomsData?.data || [];

  // Tự động chọn phòng đầu tiên nếu chưa chọn
  React.useEffect(() => {
    if (!selectedRoomId && rooms.length > 0) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [rooms, selectedRoomId]);

  // 2. Chi tiết phòng thi đang chọn
  const { data: roomDetailData, isLoading: isLoadingDetail, refetch: refetchDetail } = useQuery({
    queryKey: ["cambridgeRoomDetail", selectedRoomId],
    queryFn: () => cambridgeApi.getRoomDetail(selectedRoomId!),
    enabled: !!selectedRoomId,
    refetchInterval: 5000, // Tự động cập nhật học sinh đang nộp bài mỗi 5s
  });

  const currentRoom = roomDetailData?.data;
  const sessions = currentRoom?.sessions || [];

  // Mutation Tạo phòng thi mới
  const createRoomMutation = useMutation({
    mutationFn: () =>
      cambridgeApi.createRoom({
        title: roomTitle.trim(),
        groupName: groupName.trim() || undefined,
        teacherName: teacherName.trim() || undefined,
        durationMinutes: Number(durationMinutes) > 0 ? Number(durationMinutes) : null,
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cambridgeRooms"] });
      setIsCreateRoomOpen(false);
      if (res?.data?.id) {
        setSelectedRoomId(res.data.id);
      }
      setGroupName("");
    },
    onError: (err: any) => {
      alert("Lỗi khi tạo phòng thi: " + err.message);
    },
  });

  // Mutation Đóng phòng thi
  const closeRoomMutation = useMutation({
    mutationFn: (roomId: string) => cambridgeApi.closeRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cambridgeRooms"] });
      queryClient.invalidateQueries({ queryKey: ["cambridgeRoomDetail", selectedRoomId] });
    },
  });

  // Copy link phòng thi
  const handleCopyRoomLink = (roomCode: string) => {
    const fullUrl = `${window.location.origin}/cambridge/room/${roomCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(roomCode);
    setTimeout(() => setCopiedLink(null), 2500);
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
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Đã xếp lớp
          </Badge>
        );
      }
      if (s.gradingStatus === "PARTIAL") {
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <FileEdit className="w-3 h-3 mr-1" /> Đang chấm
          </Badge>
        );
      }
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-semibold">
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
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Cambridge Placement Test</h1>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs font-bold">
                Phòng thi trực tuyến
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Quy trình thi 1 chạm: Giáo viên tạo phòng thi $\rightarrow$ Gửi link học sinh vào thi $\rightarrow$ Chấm Speaking/Writing & xếp lớp tự động.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              refetchRooms();
              if (selectedRoomId) refetchDetail();
            }}
            variant="outline"
            size="sm"
            className="text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4 mr-1.5" /> Làm mới
          </Button>
          <Button
            onClick={() => setIsCreateRoomOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Tạo phòng thi mới
          </Button>
        </div>
      </div>

      {/* Main Container: Left Sidebar Rooms + Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CỘT TRÁI: DANH SÁCH PHÒNG THI */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <DoorOpen className="w-4 h-4" /> Danh sách phòng thi ({rooms.length})
            </h3>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {isLoadingRooms ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Đang tải phòng...
              </div>
            ) : rooms.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-400 space-y-2">
                <DoorOpen className="w-8 h-8 mx-auto text-slate-300" />
                <p>Chưa có phòng thi nào được tạo.</p>
                <Button
                  size="sm"
                  onClick={() => setIsCreateRoomOpen(true)}
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs"
                >
                  Tạo phòng đầu tiên
                </Button>
              </div>
            ) : (
              rooms.map((r: any) => {
                const isSelected = selectedRoomId === r.id;
                const isClosed = r.status === "CLOSED";
                const totalStudents = r._count?.sessions || 0;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRoomId(r.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition text-left space-y-2 ${
                      isSelected
                        ? "bg-purple-50/60 border-purple-300 shadow-sm ring-1 ring-purple-200"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-700">{r.roomCode}</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          isClosed
                            ? "bg-slate-100 text-slate-500 border-slate-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
                        }`}
                      >
                        {isClosed ? "Đã đóng" : "Đang mở"}
                      </Badge>
                    </div>

                    <div>
                      <div className="font-bold text-sm text-slate-900 line-clamp-1">{r.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {r.groupName || "Tất cả học sinh"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>{new Date(r.createdAt).toLocaleDateString("vi-VN")}</span>
                      <span className="font-semibold text-purple-700 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {totalStudents} thí sinh
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT PHÒNG THI & HỌC SINH ĐANG LÀM */}
        <div className="lg:col-span-3 space-y-4">
          {currentRoom ? (
            <>
              {/* Card thông tin phòng thi & Link mời học sinh */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900">{currentRoom.title}</h2>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          currentRoom.status === "CLOSED"
                            ? "bg-slate-100 text-slate-500"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
                        }`}
                      >
                        {currentRoom.status === "CLOSED" ? "Phòng đã đóng" : "Đang nhận học sinh"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>Mã phòng: <strong className="font-mono text-indigo-700">{currentRoom.roomCode}</strong></span>
                      {currentRoom.groupName && <span>• Nhóm/Lớp: <strong>{currentRoom.groupName}</strong></span>}
                      {currentRoom.teacherName && <span>• Phụ trách: <strong>{currentRoom.teacherName}</strong></span>}
                    </div>
                  </div>

                  {/* Actions phòng */}
                  <div className="flex items-center gap-2">
                    {currentRoom.status === "OPEN" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (window.confirm("Bạn có chắc muốn đóng phòng thi này? Học sinh mới sẽ không thể vào thêm.")) {
                            closeRoomMutation.mutate(currentRoom.id);
                          }
                        }}
                        className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                      >
                        <Lock className="w-3.5 h-3.5 mr-1" /> Đóng phòng
                      </Button>
                    )}

                    <Button
                      size="sm"
                      onClick={() => handleCopyRoomLink(currentRoom.roomCode)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm"
                    >
                      {copiedLink === currentRoom.roomCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-300" /> Đã chép link!
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 mr-1" /> Sao chép link gửi học sinh
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Box hiển thị link tham gia cho học sinh */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 truncate text-slate-600">
                    <span className="font-bold text-slate-800 shrink-0">Đường dẫn thi trực tiếp:</span>
                    <code className="bg-white px-2 py-1 rounded border text-indigo-700 font-mono truncate select-all">
                      {window.location.origin}/cambridge/room/{currentRoom.roomCode}
                    </code>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(`/cambridge/room/${currentRoom.roomCode}`, "_blank")}
                    className="text-indigo-600 hover:text-indigo-800 hover:bg-white text-xs shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1" /> Mở thử giao diện học sinh
                  </Button>
                </div>
              </div>

              {/* Bảng danh sách thí sinh trong phòng */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" /> Danh sách bài làm trong phòng ({sessions.length})
                  </h3>
                  <span className="text-xs text-slate-400">
                    Tự động cập nhật trực tiếp mỗi 5 giây
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                      <tr>
                        <th className="px-6 py-3.5">Thí sinh</th>
                        <th className="px-6 py-3.5">Trạng thái bài</th>
                        <th className="px-6 py-3.5">Tiến độ Gate</th>
                        <th className="px-6 py-3.5">Điểm trắc nghiệm</th>
                        <th className="px-6 py-3.5">Xếp lớp đề xuất</th>
                        <th className="px-6 py-3.5 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoadingDetail ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                            Đang tải danh sách thí sinh...
                          </td>
                        </tr>
                      ) : sessions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                            <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                            Chưa có học sinh nào vào phòng thi này. Hãy sao chép link trên gửi cho học sinh!
                          </td>
                        </tr>
                      ) : (
                        sessions.map((s: any) => (
                          <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{s.candidateName}</div>
                              <div className="text-xs text-slate-500 font-mono mt-0.5">
                                {s.testCode} {s.candidateGrade ? `• ${s.candidateGrade}` : ""}
                              </div>
                            </td>
                            <td className="px-6 py-4">{getStatusBadge(s)}</td>
                            <td className="px-6 py-4">
                              {s.gatePassed ? (
                                <Badge className="bg-emerald-100 text-emerald-800 border-none font-medium">
                                  Vào Extension
                                </Badge>
                              ) : s.extensionAllowed ? (
                                <Badge className="bg-amber-100 text-amber-800 border-none font-medium">
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
                                <span className="text-slate-400 text-xs">Đang làm bài</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                {getLevelBadge(s.finalLevel || s.computedPlacement?.level)}
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
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <DoorOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <h3 className="font-bold text-slate-700 text-base">Chưa chọn phòng thi</h3>
              <p className="text-xs text-slate-500 mt-1">
                Chọn một phòng thi ở danh sách bên trái hoặc nhấn nút "Tạo phòng thi mới" để bắt đầu.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Tạo Phòng Thi Nhanh (10 giây) */}
      <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Tạo phòng thi mới</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (roomTitle.trim()) {
                createRoomMutation.mutate();
              }
            }}
            className="space-y-4 py-2"
          >
            <div>
              <Label className="text-xs font-semibold">Tên phòng thi *</Label>
              <Input
                placeholder="Ví dụ: Cambridge Placement Test"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Lớp / Nhóm học sinh (không bắt buộc)</Label>
              <Input
                placeholder="Ví dụ: Học sinh mới tháng 10"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Giáo viên phụ trách (không bắt buộc)</Label>
              <Input
                placeholder="Tên giáo viên"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Thời gian cho phép vào phòng</Label>
              <Select value={durationMinutes} onValueChange={setDurationMinutes}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 phút</SelectItem>
                  <SelectItem value="90">90 phút</SelectItem>
                  <SelectItem value="120">120 phút</SelectItem>
                  <SelectItem value="0">Không giới hạn giờ vào phòng</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-slate-500 mt-1">
                Đây là thời hạn cho phép bắt đầu thi, không thay đổi thời lượng Core và Extension trong đặc tả bài thi.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateRoomOpen(false)}>
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={!roomTitle.trim() || createRoomMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {createRoomMutation.isPending ? "Đang tạo phòng..." : "Mở phòng thi ngay"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Chấm Điểm & Xếp Lớp (Tái sử dụng trọn vẹn modal đã hoàn thiện) */}
      {selectedSessionId && (
        <CambridgeGradingModal
          sessionId={selectedSessionId}
          onClose={() => {
            setSelectedSessionId(null);
            if (selectedRoomId) refetchDetail();
          }}
        />
      )}
    </div>
  );
}
