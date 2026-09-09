import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seasonalApi } from "@/features/seasonal/core/seasonalApi";
import { SeasonalEventType } from "@/features/seasonal/core/types";
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
  Coins,
  RefreshCw,
  Save,
  Flower2,
  Award,
} from "lucide-react";

interface SeasonalPresetDef {
  type: SeasonalEventType;
  code: string;
  name: string;
  subtitle: string;
  icon: string;
  badgeLabel: string;
  colorBorder: string;
  colorBg: string;
  colorRing: string;
  defaultStart: string;
  defaultEnd: string;
  defaultBudget: number;
  defaultSlots: number;
  description: string;
  prizePoolTitle: string;
  feature1Label: string;
  feature1Desc: string;
  feature2Label: string;
  feature2Desc: string;
  feature3Label: string;
  feature3Desc: string;
  feature5Label: string;
  feature5Desc: string;
}

const SEASONAL_PRESETS: SeasonalPresetDef[] = [
  {
    type: "TET",
    code: "TET_2027",
    name: "Tết Nguyên Đán 2027",
    subtitle: "Khai Bút Đầu Xuân — Mở Lộc Tri Thức",
    icon: "🌸",
    badgeLabel: "Tháng Giêng",
    colorBorder: "border-red-500",
    colorBg: "bg-red-50/50 dark:bg-red-950/20",
    colorRing: "ring-2 ring-red-400/30",
    defaultStart: "2027-01-25",
    defaultEnd: "2027-02-15",
    defaultBudget: 800000,
    defaultSlots: 60,
    description:
      "Khi Bật: Học sinh thấy cành mai vàng, bao lì xì trên bài tập và nhận lộc khai bút khi nộp bài. Khi Tắt: Hệ thống quay lại nguyên bản 100%.",
    prizePoolTitle: "Quỹ Lộc Xuân (Prize Pool Khóa Cứng)",
    feature1Label: "Cành Mai Vàng Góc Màn Hình",
    feature1Desc: "Vector SVG cành mai vàng thanh tao ở góc trên bên phải",
    feature2Label: "Bao Lì Xì Trên Thẻ Bài Tập",
    feature2Desc: "Gắn huy hiệu bao lì xì đỏ may mắn trên từng hàng BTVN",
    feature3Label: "Lễ Mở Lộc (Popup Xé Bao Lì Xì)",
    feature3Desc: "Hiện modal chúc Tết của Viện Trưởng Huyền Cơ khi nộp bài",
    feature5Label: "Hiệu Ứng Cánh Hoa Mai Rơi",
    feature5Desc: "Cánh hoa mai rơi nhẹ (Mặc định tắt để máy học sinh luôn mượt nhất)",
  },
  {
    type: "BACK_TO_SCHOOL",
    code: "BACK_TO_SCHOOL",
    name: "Khai Giảng — Khởi Hành Năm Học",
    subtitle: "Khởi Hành Năm Học — Bứt Phá Band",
    icon: "🔔",
    badgeLabel: "Tháng 9",
    colorBorder: "border-blue-500",
    colorBg: "bg-blue-50/50 dark:bg-blue-950/20",
    colorRing: "ring-2 ring-blue-400/30",
    defaultStart: "2026-08-15",
    defaultEnd: "2026-09-15",
    defaultBudget: 500000,
    defaultSlots: 50,
    description:
      "Khi Bật: Học sinh thấy không khí Khai Giảng, huy hiệu Khởi Hành Năm Học và mở quà khi nộp bài. Khi Tắt: Hệ thống quay lại nguyên bản 100%.",
    prizePoolTitle: "Quỹ Học Bổng Tựu Trường (Prize Pool Khóa Cứng)",
    feature1Label: "Biểu Tượng Tựu Trường Góc Màn Hình",
    feature1Desc: "Trang trí biểu tượng tựu trường ở góc trên bên phải màn hình",
    feature2Label: "Huy Hiệu Khởi Hành Trên Thẻ Bài Tập",
    feature2Desc: "Gắn huy hiệu nhiệm vụ tựu trường trên từng hàng BTVN",
    feature3Label: "Lễ Mở Quà Khởi Động",
    feature3Desc: "Hiện modal vinh danh thành tích học sinh khi nộp bài",
    feature5Label: "Hiệu Ứng Ánh Sao Khởi Đầu",
    feature5Desc: "Hiệu ứng ánh sao lấp lánh (Mặc định tắt để máy mượt nhất)",
  },
  {
    type: "TEACHERS_DAY",
    code: "TEACHERS_DAY",
    name: "20/11 — Một Lời Tri Ân",
    subtitle: "Một Lời Tri Ân — Một Bước Trưởng Thành",
    icon: "📜",
    badgeLabel: "Tháng 11",
    colorBorder: "border-amber-500",
    colorBg: "bg-amber-50/50 dark:bg-amber-950/20",
    colorRing: "ring-2 ring-amber-400/30",
    defaultStart: "2026-11-01",
    defaultEnd: "2026-11-25",
    defaultBudget: 500000,
    defaultSlots: 50,
    description:
      "Khi Bật: Học sinh thấy chủ đề Một Lời Tri Ân, mở Lá Thư Tri Ân gửi Thầy Cô khi hoàn thành bài. Khi Tắt: Hệ thống quay lại nguyên bản 100%.",
    prizePoolTitle: "Quỹ Tri Ân Thầy Cô (Prize Pool Khóa Cứng)",
    feature1Label: "Nhành Hoa Điểm 10 Góc Màn Hình",
    feature1Desc: "Trang trí nhành hoa tri ân ở góc trên bên phải màn hình",
    feature2Label: "Phong Bì Thư Tri Ân Trên Thẻ Bài Tập",
    feature2Desc: "Gắn huy hiệu phong thư tri ân trên từng hàng BTVN",
    feature3Label: "Lễ Mở Thư Tri Ân (Popup Gửi Lời Cảm Ơn)",
    feature3Desc: "Hiện modal gửi lời tri ân trang trọng tới Thầy Cô khi nộp bài",
    feature5Label: "Hiệu Ứng Cánh Hoa Điểm 10 Rơi",
    feature5Desc: "Cánh hoa rơi nhẹ nhàng (Mặc định tắt để máy mượt nhất)",
  },
  {
    type: "MID_AUTUMN",
    code: "MID_AUTUMN",
    name: "Tết Trung Thu — Đêm Trăng Học Tập",
    subtitle: "Đêm Trăng Học Tập — Vượt Chặng Đèn Lồng",
    icon: "🏮",
    badgeLabel: "Tháng 8 Âm",
    colorBorder: "border-purple-500",
    colorBg: "bg-purple-50/50 dark:bg-purple-950/20",
    colorRing: "ring-2 ring-purple-400/30",
    defaultStart: "2026-09-20",
    defaultEnd: "2026-10-05",
    defaultBudget: 400000,
    defaultSlots: 40,
    description:
      "Khi Bật: Học sinh thấy lồng đèn trung thu, ánh trăng học tập và quà tặng vượt chặng. Khi Tắt: Hệ thống quay lại nguyên bản 100%.",
    prizePoolTitle: "Quỹ Học Tập Trăng Rằm (Prize Pool Khóa Cứng)",
    feature1Label: "Lồng Đèn Trung Thu Góc Màn Hình",
    feature1Desc: "Trang trí lồng đèn trung thu thanh nhã ở góc trên bên phải",
    feature2Label: "Huy Hiệu Đèn Lồng Trên Thẻ Bài Tập",
    feature2Desc: "Gắn huy hiệu đèn lồng trên từng hàng BTVN",
    feature3Label: "Lễ Mở Lồng Đèn May Mắn",
    feature3Desc: "Hiện modal chúc mừng đêm rằm và trao thưởng khi nộp bài",
    feature5Label: "Hiệu Ứng Ánh Trăng Rơi",
    feature5Desc: "Hiệu ứng ánh sao lấp lánh (Mặc định tắt để máy mượt nhất)",
  },
];

export default function SeasonalEventsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-seasonal-events"],
    queryFn: () => seasonalApi.getAdminEvents(),
  });

  const events = data?.events || [];
  const [selectedType, setSelectedType] = useState<SeasonalEventType>("TET");

  // Selected Preset Definition
  const currentPreset = useMemo(() => {
    return SEASONAL_PRESETS.find((p) => p.type === selectedType) || SEASONAL_PRESETS[0];
  }, [selectedType]);

  // Selected DB Event (if matched)
  const currentDbEvent = useMemo(() => {
    return events.find((e) => e.type === selectedType);
  }, [events, selectedType]);

  // Local state for editable fields
  const [isActive, setIsActive] = useState(false);
  const [startAt, setStartAt] = useState(currentPreset.defaultStart);
  const [endAt, setEndAt] = useState(currentPreset.defaultEnd);
  const [budgetCap, setBudgetCap] = useState(currentPreset.defaultBudget);
  const [totalSlots, setTotalSlots] = useState(currentPreset.defaultSlots);

  // UI config state
  const [showBlossom, setShowBlossom] = useState(true);
  const [showEnvelopes, setShowEnvelopes] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [showPetals, setShowPetals] = useState(false);
  const [playChime, setPlayChime] = useState(true);

  // Sync state when selectedType or DB event changes
  useEffect(() => {
    if (currentDbEvent) {
      setIsActive(currentDbEvent.isActive);
      setStartAt(currentDbEvent.startAt ? currentDbEvent.startAt.slice(0, 10) : currentPreset.defaultStart);
      setEndAt(currentDbEvent.endAt ? currentDbEvent.endAt.slice(0, 10) : currentPreset.defaultEnd);
      setBudgetCap(currentDbEvent.budgetCap || currentPreset.defaultBudget);
      setTotalSlots(currentDbEvent.totalSlots || currentPreset.defaultSlots);

      const ui = currentDbEvent.uiConfig || {};
      setShowBlossom(ui.showBlossom !== false);
      setShowEnvelopes(ui.showEnvelopes !== false);
      setShowModal(ui.showModal !== false);
      setShowPetals(ui.showPetals === true);
      setPlayChime(ui.playChime !== false);
    } else {
      // Fallback to preset defaults
      setIsActive(false);
      setStartAt(currentPreset.defaultStart);
      setEndAt(currentPreset.defaultEnd);
      setBudgetCap(currentPreset.defaultBudget);
      setTotalSlots(currentPreset.defaultSlots);
      setShowBlossom(currentPreset.type === "TET");
      setShowEnvelopes(true);
      setShowModal(true);
      setShowPetals(false);
      setPlayChime(true);
    }
  }, [selectedType, currentDbEvent, currentPreset]);

  // Save mutation
  const updateMutation = useMutation({
    mutationFn: (payload: any) => {
      const targetId = currentDbEvent?.id || events[0]?.id;
      if (!targetId) throw new Error("Chưa tìm thấy ID sự kiện");
      return seasonalApi.updateAdminEvent(targetId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seasonal-events"] });
      queryClient.invalidateQueries({ queryKey: ["seasonal-active-event"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Đã lưu cấu hình cho sự kiện ${currentPreset.name}`,
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
        bannerTitle: currentPreset.subtitle,
      },
    });
  };

  const handleSelectPreset = (preset: SeasonalPresetDef) => {
    setSelectedType(preset.type);
    toast({
      title: `Đã chọn: ${preset.name}`,
      description: `Bảng cấu hình phía dưới đã chuyển sang sự kiện ${preset.name}.`,
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

  const activeEventOnSystem = events.find((e) => e.isActive);

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
            {activeEventOnSystem && (
              <Badge className="bg-emerald-500 text-white font-bold text-[11px] animate-pulse">
                Đang chạy: {activeEventOnSystem.name}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Quản Lý Sự Kiện Lễ / Tết
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Bật/tắt không khí lễ hội, kiểm soát trần ngân sách Quỹ Lộc và tùy chọn các lớp áo giao diện theo văn hóa Việt Nam.
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
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1. Danh Sách Lễ Hội Việt Nam (Bấm vào thẻ để chọn sự kiện chỉnh sửa)
          </h2>
          <span className="text-xs text-primary font-bold">
            Đang chọn: {currentPreset.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SEASONAL_PRESETS.map((preset) => {
            const isSelected = selectedType === preset.type;
            const dbEvt = events.find((e) => e.type === preset.type);
            const isCurrentlyActive = !!dbEvt?.isActive;

            return (
              <Card
                key={preset.type}
                onClick={() => handleSelectPreset(preset)}
                className={`cursor-pointer transition-all border-2 rounded-2xl ${
                  isSelected
                    ? `${preset.colorBorder} ${preset.colorBg} ${preset.colorRing} shadow-md`
                    : "hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 opacity-80 hover:opacity-100"
                }`}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{preset.icon}</span>
                    <Badge
                      className={`text-[10px] font-bold ${
                        isCurrentlyActive
                          ? "bg-emerald-500 text-white"
                          : isSelected
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {isCurrentlyActive ? "ĐANG BẬT" : isSelected ? "ĐANG CHỌN" : preset.badgeLabel}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {preset.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {preset.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 2. Main Event Controller: Status & Dates */}
      <Card className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentPreset.icon}</span>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <span>{currentPreset.name}</span>
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
              </div>
              <CardDescription className="text-xs mt-1.5">
                {currentPreset.description}
              </CardDescription>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border shrink-0">
              <Label htmlFor="active-toggle" className="text-xs font-extrabold cursor-pointer">
                {isActive ? `Tắt ${currentPreset.name}` : `BẬT ${currentPreset.name.toUpperCase()}`}
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
                  {currentPreset.prizePoolTitle}
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
                  {currentDbEvent?.claimedSlots || 0} / {totalSlots}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">
                  Quỹ Tiền Mặt Còn Lại
                </span>
                <div className="text-lg font-black text-rose-900 dark:text-rose-100 mt-0.5">
                  {(currentDbEvent?.remainingCashBudget || Number(budgetCap)).toLocaleString("vi-VN")}đ
                </div>
              </div>
            </div>
          </div>

          {/* 4. UI Checkbox Toggles */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <Flower2 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Tùy Chọn Giao Diện & Hiệu Ứng Cho: {currentPreset.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">{currentPreset.feature1Label}</Label>
                  <p className="text-[11px] text-slate-500">{currentPreset.feature1Desc}</p>
                </div>
                <Switch checked={showBlossom} onCheckedChange={setShowBlossom} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">{currentPreset.feature2Label}</Label>
                  <p className="text-[11px] text-slate-500">{currentPreset.feature2Desc}</p>
                </div>
                <Switch checked={showEnvelopes} onCheckedChange={setShowEnvelopes} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">{currentPreset.feature3Label}</Label>
                  <p className="text-[11px] text-slate-500">{currentPreset.feature3Desc}</p>
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
                  <Label className="text-xs font-bold">{currentPreset.feature5Label}</Label>
                  <p className="text-[11px] text-slate-500">{currentPreset.feature5Desc}</p>
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
                Khi {totalSlots} suất tiền mặt được trao hết, hệ thống không đóng sự kiện mà tự động chuyển sang <strong>Lộc Danh Dự (+200 XP & Huy Hiệu Khai Bút Vàng)</strong>. Học sinh làm bài muộn vẫn nhận trọn vẹn giá trị tinh thần và thành tựu học tập.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
