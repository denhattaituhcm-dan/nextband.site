import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Play, 
  Users, 
  Sparkles, 
  Trophy, 
  Volume2, 
  Flame, 
  Layers, 
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function AdminGameArenaPage() {
  const [activeGameType, setActiveGameType] = useState<string>("class_arena");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-orange-50 text-orange-600 border-orange-200 font-bold">
              Class Arena Engine
            </Badge>
            <span className="text-xs text-gray-400 font-medium">Kahoot-style Classroom Interaction</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
            <Gamepad2 className="w-7 h-7 text-orange-500" />
            Đấu Trường Lớp Học (Game Arena)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Công cụ tổ chức minigame thời gian thực cho Giáo viên và Quản trị viên điều phối lớp học 10–20 học viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3000/arena/host"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            Mở Màn Chiếu Host (Máy chiếu)
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="border-orange-100 bg-gradient-to-br from-orange-50/40 to-white shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-orange-700 font-bold uppercase tracking-wider">Mã PIN Mặc định</p>
              <h3 className="text-2xl font-black text-orange-600 font-mono mt-1">839210</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Sẵn sàng kết nối</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/40 to-white shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-700 font-bold uppercase tracking-wider">Quy mô Tối ưu</p>
              <h3 className="text-2xl font-black text-indigo-600 mt-1">10 – 20</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Học viên / phòng</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Layers className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-white shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Độ trễ phản hồi</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">&lt; 50ms</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Haptic click feedback</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-gradient-to-br from-amber-50/40 to-white shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">Chẩn đoán bẫy</p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">Misconception</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Collocation & Tense</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <BookOpen className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Game Control & Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Launch Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Chế độ Đấu Trường Trực Tuyến
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mt-0.5">
                    Lựa chọn gói tương tác học thuật phù hợp cho buổi học hôm nay.
                  </CardDescription>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Realtime Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-5 rounded-2xl border-2 border-orange-500/40 bg-orange-50/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900 text-base">IELTS Collocation Arena (Tiny MVP)</span>
                    <Badge variant="outline" className="text-[10px] bg-white border-orange-200 text-orange-600 font-bold">
                      Đã kích hoạt
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-xl">
                    Hệ thống câu hỏi đục lỗ ngữ cảnh tiếng Anh có phân tích lỗi sai Collocation chuẩn (`make an investment` vs `do an investment`). Tích hợp Suspense ritual, nhạc nền `gathering.mp3` và xếp hạng tức thì.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 pt-1">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Server Authority
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <Volume2 className="w-3.5 h-3.5" /> Timing Audio FX
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <Clock className="w-3.5 h-3.5" /> 15s Suspense Timer
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                  <a
                    href="http://localhost:3000/arena/host"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Vào Host Màn Chiếu
                  </a>
                  <a
                    href="http://localhost:3000/arena/join"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Thử nghiệm Mobile Học viên
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Host Instructions & Workflow */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-950 text-white">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-base font-black flex items-center gap-2 text-white">
                <Trophy className="w-4 h-4 text-amber-400" />
                Quy trình Giảng viên (MC Flow)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Bấm <strong>Mở Màn Chiếu Host</strong> và trình chiếu toàn màn hình lên máy chiếu / TV lớp học.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Yêu cầu học viên vào <strong>localhost:3000/arena/join</strong>, nhập mã PIN 6 số và tên để thẻ Pop-in Avatar xuất hiện.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Sử dụng <strong>Duy nhất 1 nút Contextual Button</strong> ở chân màn hình để điều khiển nhịp bài giảng: Khóa câu ➔ Phân phối ➔ Bẫy học thuật ➔ Bảng xếp hạng.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
