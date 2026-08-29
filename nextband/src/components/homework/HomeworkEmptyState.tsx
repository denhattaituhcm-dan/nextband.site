import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Layers,
  GraduationCap,
  Target,
  Brain,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  Gift,
  FileCheck2,
  Compass,
  Award,
  Zap,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { JoinClassModal } from "@/components/auth/JoinClassModal";
import { StudyBuddyModal } from "@/components/student/StudyBuddyModal";

interface HomeworkEmptyStateProps {
  onJoinClick?: () => void;
  hasClasses?: boolean;
  state?: "NO_ENROLLMENT" | "PENDING_ACTIVATION" | "SUSPENDED_STUDENT" | "ACTIVE_STUDENT";
}

export function HomeworkEmptyState({ onJoinClick, hasClasses, state }: HomeworkEmptyStateProps) {
  const { settings } = useSiteSettings();
  const { user, isAdmin, isTeacher } = useAuth();
  const navigate = useNavigate();
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [buddyModalOpen, setBuddyModalOpen] = useState(false);

  const isSuspended = state === "SUSPENDED_STUDENT";
  const isPending = state === "PENDING_ACTIVATION";

  const handleOpenJoinModal = () => {
    if (onJoinClick) {
      onJoinClick();
    } else {
      setJoinModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <JoinClassModal open={joinModalOpen} onOpenChange={setJoinModalOpen} />
      <StudyBuddyModal
        isOpen={buddyModalOpen}
        onClose={() => setBuddyModalOpen(false)}
        studentName={user?.fullName || "Học viên"}
        className="Tài khoản tự do"
        userId={user?.id}
      />

      {/* ADMIN / TEACHER QUICK SHORTCUT */}
      {(isAdmin || isTeacher) && (
        <Card className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                Bạn đang đăng nhập với quyền {isAdmin ? "Quản trị viên (Admin)" : "Giáo viên"}
              </h4>
              <p className="text-xs text-muted-foreground">
                Đây là trang làm bài tập của Học viên. Bấm bên dưới để truy cập khu vực quản lý lớp &amp; chấm bài:
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {isAdmin && (
              <Button size="sm" onClick={() => navigate("/admin/classes")} className="font-bold text-xs gap-1.5 shadow-sm">
                <Layers className="h-3.5 w-3.5" /> Quản lý Lớp học
              </Button>
            )}
            <Button
              size="sm"
              variant={isAdmin ? "outline" : "default"}
              onClick={() => navigate("/admin/teacher-workspace")}
              className="font-bold text-xs gap-1.5 shadow-sm"
            >
              <GraduationCap className="h-3.5 w-3.5" /> Bàn làm việc Giáo viên
            </Button>
          </div>
        </Card>
      )}

      {/* 1. HERO: KHU VỰC HUẤN LUYỆN ĐỘC LẬP (INDEPENDENT TRAINING CENTER) */}
      <Card
        className={`border-0 text-white rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 relative overflow-hidden ${
          isSuspended
            ? "bg-gradient-to-br from-amber-600 via-red-600 to-rose-700"
            : isPending
            ? "bg-gradient-to-br from-sky-600 via-indigo-600 to-blue-700"
            : "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
        }`}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold font-mono">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isSuspended
                  ? "TÀI KHOẢN TẠM DỪNG"
                  : isPending
                  ? "ĐANG CHỜ KÍCH HOẠT LỚP"
                  : "KHU VỰC HUẤN LUYỆN ĐỘC LẬP"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {isSuspended
                ? "Tài khoản tạm thời bị tạm dừng"
                : isPending
                ? "Lớp học của bạn đang được điều phối"
                : `Chào mừng ${user?.fullName || "bạn"} đến với ARIS`}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {isSuspended
                ? "Lớp học của bạn đang ở trạng thái Tạm dừng. Vui lòng liên hệ Giáo viên hoặc Trung tâm để mở lại quyền học."
                : isPending
                ? "Hệ thống đã ghi nhận đăng ký của bạn. Trong lúc chờ giáo viên kích hoạt vào lớp, bạn có thể bắt đầu làm bài test đánh giá năng lực hoặc khám phá kho bài đọc tương tác bên dưới."
                : "Bạn chưa được ghi danh vào lớp học chính thức. Bạn hoàn toàn có thể tự do rèn luyện: làm bài đánh giá năng lực chuẩn hoá hoặc mở rộng vốn từ vựng với các bài đọc tương tác có sẵn."}
            </p>
          </div>

          {/* Right Action: Nhập mã lớp & Liên hệ */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <Button
              onClick={handleOpenJoinModal}
              className="h-11 px-6 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all gap-2"
            >
              <KeyRound className="h-4 w-4 text-rose-600" />
              <span>Nhập mã lớp để vào lớp học</span>
            </Button>

            {settings.zaloLink && (
              <a
                href={settings.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all"
              >
                <MessageCircle className="h-4 w-4 text-sky-400" />
                <span>Liên hệ hỗ trợ</span>
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* 2. CÁC CÔNG CỤ RÈN LUYỆN SẴN CÓ: ĐÁNH GIÁ NĂNG LỰC & READING UNIVERSE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 2.1 CỘT TRÁI (7/12): BÀI ĐÁNH GIÁ NĂNG LỰC 60 PHÚT CHUẨN HOÁ */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                      Đánh Giá Năng Lực Chuẩn Hóa
                    </h2>
                    <p className="text-xs text-slate-500">
                      Định vị chính xác Cảnh Giới xuất phát &amp; bóc tách điểm nghẽn
                    </p>
                  </div>
                </div>

                <Badge className="bg-rose-50 text-rose-700 border-rose-200 text-[10px] font-bold px-2 py-0.5">
                  Miễn Phí
                </Badge>
              </div>

              {/* Description & Features */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bài kiểm tra chuẩn hóa được thiết kế độc quyền bởi ARIS giúp định vị chính xác trình độ hiện tại của bạn từ Band 3.5 đến 7.5+, chỉ ra điểm mạnh và dạng bài bạn hay bị bẫy nhất.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>Thời lượng</span>
                  </div>
                  <p className="text-[11px] text-slate-500">60 phút kiểm tra tập trung</p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Brain className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nội dung</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Đọc hiểu &amp; Ngữ pháp cốt lõi</p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kết quả</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Báo cáo bóc tách lỗi chi tiết</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Kết quả được ghi nhận và lưu vĩnh viễn vào hồ sơ của bạn
              </span>
              <Button
                onClick={() => navigate("/assessment")}
                className="w-full sm:w-auto h-10 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm gap-2 transition-all cursor-pointer"
              >
                <span>Bắt đầu kiểm tra năng lực</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* 2.2 CỘT PHẢI (5/12): THƯ VIỆN READING UNIVERSE (2 BÀI CÓ SẴN) */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Reading Universe
                    </h2>
                    <p className="text-xs text-slate-500">
                      Luyện đọc hiểu mở rộng &amp; tra từ ngữ cảnh
                    </p>
                  </div>
                </div>

                <Link
                  to="/reading"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  Xem tất cả <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* 2 Interactive Reading Cards */}
              <div className="space-y-3">
                {/* Case 01 */}
                <Link
                  to="/reading/case-001"
                  className="block p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100 border-0 text-[10px] font-bold px-1.5 py-0">
                          Khoa học tự nhiên
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-mono">5 phút</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        ❄️ Bài #01: Hiện Tượng Hồ Băng
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Khám phá bí ẩn của những hồ băng và tra cứu từ vựng học thuật tức thì.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                </Link>

                {/* Case 02 */}
                <Link
                  to="/reading/case-002"
                  className="block p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100 border-0 text-[10px] font-bold px-1.5 py-0">
                          Tư duy &amp; Đời sống
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-mono">6 phút</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        📈 Bài #02: Lời Khuyên Warren Buffett
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Mở rộng tư duy logic, cấu trúc câu ghép và từ vựng về tài chính cá nhân.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Referral / Buddy Banner */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1.5 text-[11px] font-medium">
                <Gift className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Rủ bạn học cùng: Nhận Quà ARIS</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBuddyModalOpen(true)}
                className="h-7 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 rounded-lg"
              >
                <span>Xem Thẻ Mời ➔</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. 5-LEVEL IELTS ROADMAP */}
      <Card className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-xs overflow-hidden">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold font-mono">
            <span>KHUNG ĐÀO TẠO 5 CHẶNG</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Lộ Trình Nâng Band Từ Bản Chất
          </h3>
          <p className="text-xs text-slate-500">
            Học viên ARIS được bóc tách từng lỗi sai qua từng chặng để đạt mục tiêu Band 6.5 - 7.0+
          </p>
        </div>

        {/* ROADMAP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
          {/* LEVEL 1: STARTER */}
          <div className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-black">
                  BAND 3.0
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">LVL 01</span>
              </div>
              <div className="font-bold text-sm text-slate-900">STARTER</div>
              <div className="text-[11px] text-slate-600 font-medium">
                Hiểu bản chất một câu văn &amp; liên kết các thành phần câu vững vàng.
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono border-t pt-2">27 buổi (9 tuần)</div>
          </div>

          {/* LEVEL 2: DREAMER */}
          <div className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-black">
                  BAND 4.0
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">LVL 02</span>
              </div>
              <div className="font-bold text-sm text-slate-900">DREAMER</div>
              <div className="text-[11px] text-slate-600 font-medium">
                Sự mạch lạc của đoạn văn &amp; tự tin viết, đọc hiểu các cấu trúc dài.
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono border-t pt-2">27 buổi (9 tuần)</div>
          </div>

          {/* LEVEL 3: BUILDER */}
          <div className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px] font-black">
                  BAND 5.0
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">LVL 03</span>
              </div>
              <div className="font-bold text-sm text-slate-900">BUILDER</div>
              <div className="text-[11px] text-slate-600 font-medium">
                Nắm bản chất các dạng đề thi IELTS &amp; phản xạ trả lời logic, tự nhiên.
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono border-t pt-2">27 buổi (9 tuần)</div>
          </div>

          {/* LEVEL 4: MASTER */}
          <div className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black">
                  BAND 6.0
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">LVL 04</span>
              </div>
              <div className="font-bold text-sm text-slate-900">MASTER</div>
              <div className="text-[11px] text-slate-600 font-medium">
                Luyện thi nâng cao, làm chủ lập luận chuyên sâu và tối ưu thời gian làm bài.
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono border-t pt-2">27 buổi (9 tuần)</div>
          </div>

          {/* LEVEL 5: LEADER */}
          <div className="flex flex-col justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-rose-700 text-white text-[10px] font-black">
                  BAND 7.0+
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">LVL 05</span>
              </div>
              <div className="font-bold text-sm text-slate-900">LEADER</div>
              <div className="text-[11px] text-slate-600 font-medium">
                Tư duy ngôn ngữ học thuật, phản xạ tự nhiên như người bản xứ &amp; chạm mốc 7.5+.
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono border-t pt-2">30 buổi (10 tuần)</div>
          </div>
        </div>
      </Card>

      {/* 4. TEACHING FACULTY & VERIFIED TRF CERTIFICATE */}
      <TeacherFacultySection />
    </div>
  );
}

function TeacherFacultySection() {
  const teachersList = [
    {
      id: "luu-van-dang",
      name: "Thầy Lưu Văn Đang",
      score: "8.0",
      role: "Giảng viên Chủ nhiệm ARIS IELTS",
      pdfUrl: "/IELTS CERTIFICATE_LUU_VAN-DANG.pdf",
      imageUrl: "/IELTS CERTIFICATE_LUU_VAN-DANG_page-0001.jpg",
      credentials: [
        "Chứng chỉ Nghiệp vụ Sư phạm — ĐH Sư phạm TP.HCM",
        "Hơn 5 năm kinh nghiệm giảng dạy & tư vấn lộ trình IELTS 6.5+",
        "Trực tiếp chấm & chữa bài Writing / Speaking cho học viên NextBand",
      ],
    },
  ];

  const [selectedTeacherId, setSelectedTeacherId] = useState(teachersList[0].id);
  const currentTeacher =
    teachersList.find((t) => t.id === selectedTeacherId) || teachersList[0];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Bảng Điểm Đội Ngũ Giảng Dạy ARIS IELTS
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            100% Giảng viên đạt IELTS 8.0+ với Chứng chỉ TRF được xác thực chính thức
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
          VERIFIED TRF 8.0+
        </span>
      </div>

      {/* TEACHER TABS (FOR MULTIPLE TEACHERS SELECTION) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {teachersList.map((t) => {
          const isSelected = t.id === selectedTeacherId;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTeacherId(t.id);
                setImgError(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                  isSelected ? "bg-white text-slate-900" : "bg-slate-200 text-slate-800"
                }`}
              >
                {t.score}
              </span>
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* SIDE-BY-SIDE GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: SELECTED TEACHER PROFILE CARD */}
        <div className="md:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center text-lg shadow-sm">
                {currentTeacher.score}
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  {currentTeacher.name}
                </h4>
                <div className="text-xs text-rose-600 font-extrabold">
                  IELTS Overall {currentTeacher.score}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {currentTeacher.role}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-200/70 pt-3">
              {currentTeacher.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-700 font-medium">
                  <span className="text-rose-600 font-bold">
                    {idx === 0 ? "🎓" : idx === 1 ? "👨‍🏫" : "✍️"}
                  </span>
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href={currentTeacher.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all shadow-2xs"
          >
            📄 Mở xem Bảng điểm gốc (PDF) ➔
          </a>
        </div>

        {/* RIGHT COLUMN: FLAT NATURAL IMAGE DISPLAY ON PAGE */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-700">
            <span className="text-slate-800 font-extrabold text-sm">
              Chứng chỉ IELTS TRF chính thức
            </span>
            <a
              href={currentTeacher.imageUrl || currentTeacher.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-rose-600 hover:underline font-extrabold flex items-center gap-1"
            >
              Phóng to
            </a>
          </div>

          <div className="w-full rounded-2xl bg-white border border-slate-200 p-2 sm:p-3 shadow-2xs relative overflow-hidden flex items-center justify-center">
            {!imgError && currentTeacher.imageUrl ? (
              <img
                key={currentTeacher.id}
                src={currentTeacher.imageUrl}
                alt={`Bảng điểm IELTS ${currentTeacher.name}`}
                onError={() => setImgError(true)}
                className="w-full h-auto max-h-[700px] object-contain rounded-xl"
              />
            ) : (
              <iframe
                key={currentTeacher.id}
                src={`${currentTeacher.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={`Bảng điểm IELTS ${currentTeacher.name}`}
                className="w-full h-[600px] border-0 rounded-xl bg-white"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
