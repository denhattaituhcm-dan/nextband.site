import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { cambridgeApi } from "@/lib/api";
import {
  BookOpen,
  User,
  GraduationCap,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function CambridgeStudentRoomJoin() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const [candidateName, setCandidateName] = useState("");
  const [candidateGrade, setCandidateGrade] = useState("");

  // Tự động kiểm tra nếu học sinh đã có bài thi lưu trong trình duyệt cho phòng này
  const savedTestCodeKey = `cambridge_active_${roomCode}`;
  const existingTestCode = typeof window !== "undefined" ? localStorage.getItem(savedTestCodeKey) : null;

  // Lấy thông tin phòng thi công khai
  const { data, isLoading, error } = useQuery({
    queryKey: ["publicCambridgeRoom", roomCode],
    queryFn: () => cambridgeApi.getPublicRoomInfo(roomCode!),
    enabled: !!roomCode,
    retry: 1,
  });

  const room = data?.data;

  // Mutation vào phòng thi
  const joinMutation = useMutation({
    mutationFn: () =>
      cambridgeApi.joinRoom(roomCode!, {
        candidateName: candidateName.trim(),
        candidateGrade: candidateGrade.trim() || undefined,
        existingTestCode: existingTestCode || undefined,
      }),
    onSuccess: (res) => {
      const session = res.data;
      if (session?.testCode) {
        localStorage.setItem(savedTestCodeKey, session.testCode);
        navigate(`/cambridge/test/${session.testCode}`);
      }
    },
    onError: (err: any) => {
      alert("Không thể vào phòng thi: " + err.message);
    },
  });

  // Tự động điền lớp nếu phòng có sẵn groupName
  React.useEffect(() => {
    if (room?.groupName && !candidateGrade) {
      setCandidateGrade(room.groupName);
    }
  }, [room]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-lg font-bold">Đang tải thông tin phòng thi...</h2>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Phòng thi không tồn tại hoặc đã hết hạn</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-sm">
          Vui lòng kiểm tra lại đường dẫn phòng thi do giáo viên cung cấp.
        </p>
        <Button onClick={() => navigate("/")} className="mt-6 bg-slate-800 hover:bg-slate-700 text-xs">
          Về trang chủ
        </Button>
      </div>
    );
  }

  const isClosed = room.status === "CLOSED";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Room Header Info */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-900/30">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <Badge variant="outline" className="border-purple-500/40 text-purple-300 font-mono text-[11px] mb-2">
              Mã phòng: {room.roomCode}
            </Badge>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{room.title}</h1>
            <p className="text-xs text-slate-400 mt-1">
              Bài thi Cambridge Placement Test • Chuẩn đoán 4 kỹ năng xếp lớp
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1 text-xs text-slate-400">
            {room.teacherName && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" /> GV: {room.teacherName}
              </span>
            )}
            {room.groupName && (
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" /> {room.groupName}
              </span>
            )}
          </div>
        </div>

        {/* Status / Form */}
        {isClosed ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-red-300">Phòng thi đã đóng</h3>
            <p className="text-xs text-slate-400">
              Giáo viên đã kết thúc thời gian nhận bài cho phòng thi này.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (candidateName.trim()) {
                joinMutation.mutate();
              }
            }}
            className="space-y-4 pt-6"
          >
            <div>
              <Label className="text-xs font-semibold text-slate-300">Họ và tên của bạn *</Label>
              <Input
                placeholder="Ví dụ: Nguyễn Minh Anh"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
                className="mt-1.5 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 text-sm h-11 focus:border-purple-500"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-300">Lớp / Khối học (không bắt buộc)</Label>
              <Input
                placeholder="Ví dụ: Lớp 5A / Khối 6"
                value={candidateGrade}
                onChange={(e) => setCandidateGrade(e.target.value)}
                className="mt-1.5 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 text-sm h-11 focus:border-purple-500"
              />
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Lưu ý làm bài:
              </div>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Bài thi gồm phần Core (khoảng 52 phút) và phần Extension mở rộng.</li>
                <li>Hệ thống tự động lưu tiến độ làm bài khi bạn chọn câu trả lời.</li>
                <li>Không sử dụng công cụ dịch hoặc tài liệu hỗ trợ trong khi làm bài.</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={!candidateName.trim() || joinMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold h-11 text-sm shadow-lg shadow-purple-900/30 transition-all mt-2"
            >
              {joinMutation.isPending ? (
                "Đang vào phòng..."
              ) : (
                <>
                  Bắt đầu làm bài <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
