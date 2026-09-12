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
  Clock,
  PlusCircle,
  FolderArchive,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { REGISTERED_GAMES, MOCK_QUESTION_PACKAGES, GameEngineId } from "@/lib/arena/gameCatalogue";

export default function AdminGameArenaPage() {
  const [selectedGameId, setSelectedGameId] = useState<GameEngineId>("class_arena");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("colloc_general_01");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const selectedGame = REGISTERED_GAMES.find((g) => g.id === selectedGameId) || REGISTERED_GAMES[0];
  const activePackages = MOCK_QUESTION_PACKAGES.filter((p) => p.gameId === selectedGameId);

  const handleLaunchHost = (customPin?: string) => {
    setIsCreatingRoom(true);
    // Sinh hoặc chuyển hướng vào Host
    const targetUrl = customPin ? `/arena/host?pin=${customPin}` : `/arena/host`;
    window.open(targetUrl, "_blank");
    setTimeout(() => setIsCreatingRoom(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-orange-50 text-orange-600 border-orange-200 font-bold">
              Trung Tâm Quản Trị Trò Chơi
            </Badge>
            <span className="text-xs text-gray-400 font-medium">NextBand Interactive Class Hub</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
            <Gamepad2 className="w-7 h-7 text-orange-500" />
            Quản Lý Game Giảng Dạy & Tương Tác
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kho trò chơi học thuật dành cho Giáo viên & Quản trị viên kích hoạt hoạt động lớp học trực tiếp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleLaunchHost()}
            disabled={isCreatingRoom}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            {isCreatingRoom ? "Đang mở..." : "Mở Màn Chiếu Host (Máy chiếu)"}
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Game Catalog Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-orange-500" />
            Danh Mục Trò Chơi Của Trung Tâm ({REGISTERED_GAMES.length})
          </h2>
          <span className="text-xs text-gray-400">Sẵn sàng mở rộng thêm nhiều định dạng game mới</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REGISTERED_GAMES.map((game) => {
            const isSelected = selectedGameId === game.id;
            const isActive = game.status === "ACTIVE";

            return (
              <div
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-orange-500 bg-orange-50/20 shadow-md shadow-orange-500/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                    >
                      {isActive ? "Đang hoạt động" : "Đang phát triển"}
                    </Badge>
                    <span className="text-[11px] font-bold text-gray-400">{game.category}</span>
                  </div>

                  <h3 className="text-base font-black text-gray-900 leading-snug">
                    {game.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {game.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>Quy mô: {game.recommendedPlayers}</span>
                  <span className="font-bold text-orange-600">{game.avgDuration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Game Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Question Bank Packages & Live Launch */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    Bộ Đề Giảng Dạy & Gói Câu Hỏi ({selectedGame.name})
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mt-0.5">
                    Chọn gói bài tập phù hợp với giáo trình trước khi khởi động phòng chơi.
                  </CardDescription>
                </div>
                {selectedGame.status === "ACTIVE" ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Sẵn sàng tạo phòng
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-400">
                    Bản thảo
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {activePackages.length > 0 ? (
                <div className="space-y-3">
                  {activePackages.map((pkg) => {
                    const isPkgSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isPkgSelected
                            ? "border-orange-500 bg-orange-50/30"
                            : "border-gray-100 hover:border-gray-200 bg-white"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-gray-900">{pkg.title}</span>
                            <Badge variant="outline" className="text-[10px] text-gray-600 border-gray-200">
                              {pkg.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{pkg.questionCount} câu hỏi</span>
                            <span>•</span>
                            <span className="truncate max-w-md">
                              Chủ đề: {pkg.tags.join(", ")}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunchHost();
                            }}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg px-3 py-1.5"
                          >
                            <Play className="w-3.5 h-3.5 mr-1 fill-white" /> Dạy gói này
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 space-y-2">
                  <FolderArchive className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="text-xs font-semibold">
                    Đang hoàn thiện các gói bài tập cho game này.
                  </p>
                </div>
              )}

              {/* Game Engine Direct Actions */}
              {selectedGame.status === "ACTIVE" && (
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-gray-500">
                    <span className="font-bold text-gray-700">Mã PIN mặc định:</span>{" "}
                    <span className="font-mono font-black text-orange-600 text-sm">839210</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href="/arena/host"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Vào Host Màn Chiếu
                    </a>
                    <a
                      href="/arena/join"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                    >
                      Thử Mobile Học Viên
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Host Guide & Standards */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-950 text-white">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-base font-black flex items-center gap-2 text-white">
                <Trophy className="w-4 h-4 text-amber-400" />
                Quy Trình Giảng Dạy (MC Flow)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Bấm <strong>Mở Màn Chiếu Host</strong> và chiếu toàn màn hình lên máy chiếu / TV lớp học.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Học sinh vào <strong>/arena/join</strong> trên điện thoại cá nhân, nhập mã PIN và tên để avatar nảy lên màn hình.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Giáo viên chỉ cần bấm <strong>1 nút điều khiển duy nhất</strong> ở chân màn hình theo từng nhịp sư phạm.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-sm font-black text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Tiêu Chuẩn Đấu Trường 10–20 HS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Chấm điểm:</span>
                <span className="font-bold text-gray-900">100% Server Authority</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Độ trễ phản xạ:</span>
                <span className="font-bold text-emerald-600">&lt; 50ms Haptic</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Nhịp nghi thức:</span>
                <span className="font-bold text-gray-900">15s Nén nhang</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Âm thanh sư phạm:</span>
                <span className="font-bold text-gray-900">gathering.mp3 + FX</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
