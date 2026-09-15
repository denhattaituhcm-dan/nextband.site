import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
  ShieldCheck,
  GraduationCap,
  CalendarDays,
  Loader2,
  Search,
  Filter
} from "lucide-react";
import { REGISTERED_GAMES, GameEngineId } from "@/lib/arena/gameCatalogue";
import { coursesApi, examsApi } from "@/lib/api";

export default function AdminGameArenaPage() {
  const [selectedGameId, setSelectedGameId] = useState<GameEngineId>("class_arena");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const selectedGame = REGISTERED_GAMES.find((g) => g.id === selectedGameId) || REGISTERED_GAMES[0];

  // Fetch danh sách Khóa học (DREAMER, BUILDER, MASTER...)
  const { data: coursesData, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses-list"],
    queryFn: () => coursesApi.list({ limit: 100, isActive: true }),
  });
  const courses = coursesData?.data || [];

  // Tự động chọn khóa DOER (trước đây là DREAMER) khi tải xong danh sách
  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      const targetCourse = courses.find((c: any) => 
        c.title?.toLowerCase().includes("doer") || c.slug?.toLowerCase().includes("doer")
      ) || courses.find((c: any) => 
        c.title?.toLowerCase().includes("dreamer") || c.slug?.toLowerCase().includes("dreamer")
      );
      if (targetCourse) {
        setSelectedCourseId(targetCourse.id);
      } else {
        setSelectedCourseId(courses[0].id);
      }
    }
  }, [courses, selectedCourseId]);

  // Fetch danh sách các bộ câu hỏi / bài học của Khóa học đã chọn (27 bài của DREAMER)
  const { data: examsData, isLoading: isLoadingExams } = useQuery({
    queryKey: ["admin-exams", selectedCourseId],
    queryFn: () => examsApi.list({
      limit: 100,
      courseId: selectedCourseId || undefined,
      sortBy: "title",
      sortOrder: "asc",
    }),
    enabled: !!selectedCourseId,
  });

  const examsList = examsData?.data || [];
  const filteredExams = examsList.filter((ex: any) => 
    !searchFilter.trim() || ex.title?.toLowerCase().includes(searchFilter.toLowerCase().trim())
  );

  const selectedCourse = courses.find((c: any) => c.id === selectedCourseId);

  const handleLaunchHost = (examId?: string, customPin?: string) => {
    setIsCreatingRoom(true);
    const pinParam = customPin ? `pin=${customPin}` : '';
    const examParam = examId ? `examId=${examId}` : '';
    const queryParts = [pinParam, examParam].filter(Boolean).join('&');
    const targetUrl = queryParts ? `/arena/host?${queryParts}` : `/arena/host`;
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
            Kho trò chơi học thuật dành cho Giáo viên & Quản trị viên kích hoạt hoạt động lớp học trực tiếp theo từng khóa & bài học.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleLaunchHost(selectedExamId)}
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

      {/* Selected Game Workspace: Chọn Khóa Học & Danh Sách 27 Bộ Câu Hỏi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Course Selector & 27 Lesson Question Sets */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-black text-gray-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-orange-500" />
                    Lộ Trình Khóa Học & Bộ Câu Hỏi Giảng Dạy
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mt-0.5">
                    Chọn khóa học và chọn bài học trong 27 buổi theo đúng giáo trình để tổ chức thi đấu trực tiếp.
                  </CardDescription>
                </div>
                {selectedGame.status === "ACTIVE" ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 w-fit">
                    Sẵn sàng tạo phòng
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-400 w-fit">
                    Bản thảo
                  </Badge>
                )}
              </div>

              {/* Tầng 1: Chọn Khóa Học (Course Tabs/Pills) */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                  Chọn Khóa Học:
                </div>
                {isLoadingCourses ? (
                  <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> Đang tải danh sách khóa học...
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {courses.map((course: any) => {
                      const isCurrentCourse = selectedCourseId === course.id;
                      const isDoerOrDreamer = course.title?.toLowerCase().includes("doer") || course.title?.toLowerCase().includes("dreamer");
                      return (
                        <button
                          key={course.id}
                          onClick={() => {
                            setSelectedCourseId(course.id);
                            setSelectedExamId("");
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border ${
                            isCurrentCourse
                              ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/25 scale-105"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <span>{course.title}</span>
                          {isDoerOrDreamer && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                              isCurrentCourse ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"
                            }`}>
                              Lộ trình chuẩn
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {/* Tầng 2: Thanh tìm kiếm & Thông tin tổng số bộ câu hỏi */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-gray-800">
                    Danh sách bài học khóa {selectedCourse?.title || "đang chọn"}:
                  </span>
                  <Badge variant="secondary" className="font-extrabold text-[11px] bg-orange-100 text-orange-700">
                    {filteredExams.length} bộ câu hỏi
                  </Badge>
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm tuần, ngày, kỹ năng..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Danh sách 27 Bộ Câu Hỏi */}
              {isLoadingExams ? (
                <div className="p-12 text-center text-gray-400 space-y-3">
                  <Loader2 className="w-7 h-7 mx-auto animate-spin text-orange-500" />
                  <p className="text-xs font-semibold">Đang tải danh sách bài học & câu hỏi...</p>
                </div>
              ) : filteredExams.length > 0 ? (
                <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                  {filteredExams.map((exam: any, idx: number) => {
                    const isExamSelected = selectedExamId === exam.id;
                    const weekNum = exam.week || Math.ceil((idx + 1) / 3);
                    const isSpeaking = exam.title?.toLowerCase().includes("speaking");
                    const isListening = exam.title?.toLowerCase().includes("listening");
                    const isReadingWriting = exam.title?.toLowerCase().includes("reading") || exam.title?.toLowerCase().includes("writing");

                    return (
                      <div
                        key={exam.id}
                        onClick={() => setSelectedExamId(exam.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isExamSelected
                            ? "border-orange-500 bg-orange-50/40 shadow-sm shadow-orange-500/10"
                            : "border-gray-100 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              Buổi #{idx + 1}
                            </span>
                            <span className="font-extrabold text-sm text-gray-900 truncate">
                              {exam.title}
                            </span>
                            {weekNum && (
                              <Badge variant="outline" className="text-[10px] text-gray-500 border-gray-200">
                                Tuần {weekNum}
                              </Badge>
                            )}
                            {isSpeaking && (
                              <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                                Speaking
                              </Badge>
                            )}
                            {isListening && (
                              <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[10px]">
                                Listening
                              </Badge>
                            )}
                            {isReadingWriting && (
                              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                Reading & Writing
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>Thời lượng chuẩn: {exam.durationMinutes || exam.duration_minutes || 45} phút</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Chuẩn giáo trình thực tế
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedExamId(exam.id);
                              handleLaunchHost(exam.id);
                            }}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl px-3.5 py-1.5 shadow-sm shadow-orange-600/20"
                          >
                            <Play className="w-3.5 h-3.5 mr-1 fill-white" /> Dạy bài này
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
                    Chưa tìm thấy bộ câu hỏi nào phù hợp với bộ lọc hiện tại.
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
                    <Button
                      onClick={() => handleLaunchHost(selectedExamId)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Vào Host Màn Chiếu
                    </Button>
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
