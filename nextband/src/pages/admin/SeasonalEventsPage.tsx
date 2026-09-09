import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seasonalApi } from "@/features/seasonal/core/seasonalApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Calendar,
  Gift,
  Coins,
  CheckCircle2,
  AlertCircle,
  Flower2,
  Bell,
  RefreshCw,
  Save,
  Flame,
  Award,
} from "lucide-react";

export default function SeasonalEventsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-seasonal-events"],
    queryFn: () => seasonalApi.getAdminEvents(),
  });

  const events = data?.events || [];
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  useEffect(() => {
    if (events.length > 0 && !selectedEventId) {
      // Prioritize active event or first event
      const active = events.find((e) => e.isActive);
      setSelectedEventId(active?.id || events[0].id);
    }
  }, [events, selectedEventId]);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  // Local state for editable fields
  const [isActive, setIsActive] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [budgetCap, setBudgetCap] = useState(800000);
  const [totalSlots, setTotalSlots] = useState(60);

  // UI config state
  const [showBlossom, setShowBlossom] = useState(true);
  const [showEnvelopes, setShowEnvelopes] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [showPetals, setShowPetals] = useState(false);
  const [playChime, setPlayChime] = useState(true);

  // Sync state when selected event changes
  useEffect(() => {
    if (selectedEvent) {
      setIsActive(selectedEvent.isActive);
      setStartAt(selectedEvent.startAt ? selectedEvent.startAt.slice(0, 10) : "2027-01-25");
      setEndAt(selectedEvent.endAt ? selectedEvent.endAt.slice(0, 10) : "2027-02-15");
      setBudgetCap(selectedEvent.budgetCap || 800000);
      setTotalSlots(selectedEvent.totalSlots || 60);

      const ui = selectedEvent.uiConfig || {};
      setShowBlossom(ui.showBlossom !== false);
      setShowEnvelopes(ui.showEnvelopes !== false);
      setShowModal(ui.showModal !== false);
      setShowPetals(ui.showPetals === true);
      setPlayChime(ui.playChime !== false);
    }
  }, [selectedEvent]);

  // Save mutation
  const updateMutation = useMutation({
    mutationFn: (payload: any) => seasonalApi.updateAdminEvent(selectedEvent.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seasonal-events"] });
      queryClient.invalidateQueries({ queryKey: ["seasonal-active-event"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Đã lưu cấu hình cho sự kiện ${selectedEvent?.name}`,
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Không thể lưu cấu hình",
        description: err.message,
      });
    },
  });

  const handleSave = (activeOverride?: boolean) => {
    if (!selectedEvent) return;
    const finalActive = activeOverride !== undefined ? activeOverride : isActive;

    updateMutation.mutate({
      isActive: finalActive,
      startAt,
      endAt,
      budgetCap: Number(budgetCap),
      totalSlots: Number(totalSlots),
      uiConfig: {
        showBlossom,
        showEnvelopes,
        showModal,
        showPetals,
        playChime,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          <span>Đang tải cấu hình sự kiện Lễ / Tết...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-300 font-bold gap-1 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              ARIS Vietnamese Seasonal Layer
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Quản Lý Sự Kiện Lễ / Tết
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Bật/tắt không khí lễ hội, kiểm soát trần ngân sách Quỹ Lộc và tùy chọn các lớp áo giao diện.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="rounded-xl gap-1.5 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Làm mới
          </Button>
          <Button
            onClick={() => handleSave()}
            disabled={updateMutation.isPending}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl shadow-xs gap-1.5 px-5"
          >
            <Save className="w-4 h-4" />
            <span>{updateMutation.isPending ? "Đang lưu..." : "Lưu Thay Đổi"}</span>
          </Button>
        </div>
      </div>

      {/* 1. Event Selector (Vietnamese Holiday Presets) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          1. Danh Sách Lễ Hội Việt Nam (Vietnamese Seasonal Calendar)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card
            onClick={() => setSelectedEventId(events.find((e) => e.type === "TET")?.id || "")}
            className={`cursor-pointer transition-all border-2 rounded-2xl ${
              selectedEvent?.type === "TET"
                ? "border-red-500 bg-red-50/40 dark:bg-red-950/20 shadow-xs"
                : "hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌸</span>
                <Badge
                  className={`text-[10px] font-bold ${
                    selectedEvent?.isActive && selectedEvent?.type === "TET"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {selectedEvent?.isActive && selectedEvent?.type === "TET" ? "ĐANG BẬT" : "SẴN SÀNG"}
                </Badge>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Tết Nguyên Đán
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Khai Bút Đầu Xuân — Mở Lộc Tri Thức
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => {
              toast({
                title: "Ngày 20/11 — Tri Ân Thầy Cô",
                description: "Chủ đề 'Một Lời Tri Ân — Một Bước Trưởng Thành' sẽ kích hoạt vào dịp tháng 11.",
              });
            }}
            className="cursor-pointer transition-all border-2 rounded-2xl opacity-75 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">📜</span>
                <Badge variant="outline" className="text-[10px] font-semibold text-slate-500">
                  Tháng 11
                </Badge>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  20/11 — Tri Ân
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Một Lời Tri Ân — Một Bước Trưởng Thành
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => {
              toast({
                title: "Khai Giảng / Back to School",
                description: "Chiến dịch 'Khởi Hành Năm Học — Bứt Phá Band' kích hoạt vào tháng 8 - 9.",
              });
            }}
            className="cursor-pointer transition-all border-2 rounded-2xl opacity-75 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🔔</span>
                <Badge variant="outline" className="text-[10px] font-semibold text-slate-500">
                  Tháng 9
                </Badge>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Khai Giảng
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Khởi Hành Năm Học — Bứt Phá Band
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => {
              toast({
                title: "Tết Trung Thu",
                description: "Chủ đề 'Đêm Trăng Học Tập — Vượt Chặng Đèn Lồng' kích hoạt vào Rằm tháng 8 Âm lịch.",
              });
            }}
            className="cursor-pointer transition-all border-2 rounded-2xl opacity-75 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏮</span>
                <Badge variant="outline" className="text-[10px] font-semibold text-slate-500">
                  Tháng 8 Âm
                </Badge>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Tết Trung Thu
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Đêm Trăng Học Tập — Vượt Chặng Đèn Lồng
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2. Main Event Controller: Status & Dates */}
      <Card className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <span>{selectedEvent?.name || "Tết Nguyên Đán 2027"}</span>
                <Badge
                  className={`font-black text-xs ${
                    isActive
                      ? "bg-emerald-500 text-white animate-pulse"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {isActive ? "ĐANG BẬT TRÊN HỆ THỐNG" : "ĐANG TẮT"}
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                Khi Bật: Học sinh thấy cành mai, bao lì xì trên bài tập và nhận lộc khi nộp bài. Khi Tắt: Hệ thống quay lại nguyên bản 100%.
              </CardDescription>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border shrink-0">
              <Label htmlFor="active-toggle" className="text-xs font-bold cursor-pointer">
                {isActive ? "Tắt Sự Kiện" : "BẬT SỰ KIỆN TẾT"}
              </Label>
              <Switch
                id="active-toggle"
                checked={isActive}
                onCheckedChange={(checked) => {
                  setIsActive(checked);
                  handleSave(checked);
                }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-6">
          {/* Dates row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Ngày bắt đầu sự kiện
              </Label>
              <Input
                type="date"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="rounded-xl text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Ngày kết thúc sự kiện
              </Label>
              <Input
                type="date"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                className="rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          {/* 3. Prize Pool Hard-Cap Dashboard */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Quỹ Lộc Xuân (Prize Pool Khóa Cứng)
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 italic">
                Chống lạm chi tuyệt đối — Hết suất tự chuyển Lộc Danh Dự
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">
                  Ngân Sách Tối Đa
                </span>
                <div className="text-lg font-black text-amber-900 dark:text-amber-100 mt-0.5">
                  {Number(budgetCap).toLocaleString("vi-VN")}đ
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                  Tổng Số Suất Lộc
                </span>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {totalSlots} Suất
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                  Đã Trao
                </span>
                <div className="text-lg font-black text-emerald-900 dark:text-emerald-100 mt-0.5">
                  {selectedEvent?.claimedSlots || 0} / {totalSlots}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">
                  Quỹ Tiền Mặt Còn Lại
                </span>
                <div className="text-lg font-black text-rose-900 dark:text-rose-100 mt-0.5">
                  {(selectedEvent?.remainingCashBudget || 550000).toLocaleString("vi-VN")}đ
                </div>
              </div>
            </div>

            {/* Allocation breakdown list */}
            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border text-xs space-y-2">
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                Cơ Cấu Phân Bổ Phong Bao Lộc (Bảo Vệ Ngân Sách)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Lộc nhỏ (40 suất): <strong>5.000đ</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Lộc vừa (15 suất): <strong>10.000đ</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Đại lộc (4 suất): <strong>25.000đ</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Lộc thần tài (1 suất): <strong>100.000đ</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. UI Checkbox Toggles */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <Flower2 className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Tùy Chọn Giao Diện & Hiệu Ứng (Cần cái gì thì tick cái đó)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">Cành Mai Vàng Góc Màn Hình</Label>
                  <p className="text-[11px] text-slate-500">Vector SVG thanh tao ở góc trên bên phải</p>
                </div>
                <Switch checked={showBlossom} onCheckedChange={setShowBlossom} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">Bao Lì Xì Trên Thẻ Bài Tập</Label>
                  <p className="text-[11px] text-slate-500">Gắn huy hiệu bao lì xì đỏ trên từng hàng BTVN</p>
                </div>
                <Switch checked={showEnvelopes} onCheckedChange={setShowEnvelopes} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">Lễ Mở Lộc (Popup Xé Bao Lì Xì)</Label>
                  <p className="text-[11px] text-slate-500">Hiện modal chúc Tết của Viện Trưởng Huyền Cơ khi nộp bài</p>
                </div>
                <Switch checked={showModal} onCheckedChange={setShowModal} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">Âm Thanh Chime Khai Lộc</Label>
                  <p className="text-[11px] text-slate-500">Âm thanh ngũ cung synthesized êm dịu, không cần tải mp3</p>
                </div>
                <Switch checked={playChime} onCheckedChange={setPlayChime} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30 sm:col-span-2">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">Hiệu Ứng Cánh Hoa Mai Rơi</Label>
                  <p className="text-[11px] text-slate-500">Cánh hoa mai rơi nhẹ (Mặc định tắt để máy học sinh luôn mượt nhất)</p>
                </div>
                <Switch checked={showPetals} onCheckedChange={setShowPetals} />
              </div>
            </div>
          </div>

          {/* Fallback rule indicator */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 dark:text-emerald-300">
                Cơ Chế Bảo Vệ & Duy Trì Động Lực:
              </span>
              <p className="text-emerald-800 dark:text-emerald-400 text-[11px] mt-0.5 leading-relaxed">
                Khi 60 suất tiền mặt được trao hết, hệ thống không đóng sự kiện mà tự động chuyển sang <strong>Lộc Danh Dự (+200 XP & Huy Hiệu Khai Bút Vàng)</strong>. Học sinh làm bài muộn vẫn nhận trọn vẹn giá trị tinh thần và thành tựu học tập.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
