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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Calendar,
  Coins,
  RefreshCw,
  Save,
  Flower2,
  Award,
  Plus,
  Trash2,
  Calculator,
  AlertTriangle,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Users,
  Check,
  Undo2,
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

export interface EditableRewardPool {
  id?: string;
  tier: string;
  label: string;
  amount: number;
  totalSlots: number;
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

  // UI state for Tabs
  const [activeTab, setActiveTab] = useState<"config" | "payouts">("config");
  const [payoutSearch, setPayoutSearch] = useState("");
  const [payoutStatusFilter, setPayoutStatusFilter] = useState<"ALL" | "PENDING" | "DISBURSED">("ALL");
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  // Selected DB Event (if matched)
  const currentDbEvent = useMemo(() => {
    return events.find((e) => e.type === selectedType);
  }, [events, selectedType]);

  const targetEventIdentifier = currentDbEvent?.id || currentPreset.code;

  // Query payouts for the selected event
  const {
    data: payoutsData,
    isLoading: isPayoutsLoading,
    refetch: refetchPayouts,
  } = useQuery({
    queryKey: ["admin-seasonal-payouts", targetEventIdentifier],
    queryFn: () => (targetEventIdentifier ? seasonalApi.getPayoutList(targetEventIdentifier) : { payouts: [] }),
    enabled: !!targetEventIdentifier,
  });

  const payouts = payoutsData?.payouts || [];

  // Toggle Disbursed Mutation
  const toggleDisbursedMutation = useMutation({
    mutationFn: ({ studentId, isDisbursed }: { studentId: string; isDisbursed: boolean }) => {
      if (!targetEventIdentifier) throw new Error("Chưa chọn sự kiện");
      return seasonalApi.togglePayoutDisbursed(targetEventIdentifier, studentId, isDisbursed);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["admin-seasonal-payouts", targetEventIdentifier] });
      toast({
        title: vars.isDisbursed ? "Đã ghi nhận lì xì ✓" : "Đã hoàn tác trạng thái",
        description: vars.isDisbursed
          ? "Đã đánh dấu đã phát lộc cho học viên."
          : "Đã chuyển lại thành chờ phát tiền.",
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Lỗi cập nhật",
        description: err.message,
      });
    },
  });

  // Clear Payout List Mutation
  const clearPayoutsMutation = useMutation({
    mutationFn: () => {
      if (!targetEventIdentifier) throw new Error("Chưa chọn sự kiện");
      return seasonalApi.clearPayoutList(targetEventIdentifier);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-seasonal-payouts", targetEventIdentifier] });
      queryClient.invalidateQueries({ queryKey: ["admin-seasonal-events"] });
      queryClient.invalidateQueries({ queryKey: ["seasonal-active-event"] });
      setIsClearDialogOpen(false);
      toast({
        title: "Đã xóa danh sách phát lộc!",
        description: `Đã dọn dẹp ${res.deletedClaims} bản ghi nhận lộc và đặt lại số suất về 0.`,
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Lỗi xóa danh sách",
        description: err.message,
      });
    },
  });

  // Filtered payouts
  const filteredPayouts = useMemo(() => {
    return payouts.filter((p) => {
      const matchesSearch =
        p.studentName.toLowerCase().includes(payoutSearch.toLowerCase()) ||
        p.phone.includes(payoutSearch) ||
        p.email.toLowerCase().includes(payoutSearch.toLowerCase()) ||
        p.className.toLowerCase().includes(payoutSearch.toLowerCase());

      if (!matchesSearch) return false;
      if (payoutStatusFilter === "PENDING") return !p.isDisbursed;
      if (payoutStatusFilter === "DISBURSED") return p.isDisbursed;
      return true;
    });
  }, [payouts, payoutSearch, payoutStatusFilter]);

  // Payout Summary stats
  const payoutSummary = useMemo(() => {
    const totalCashSum = payouts.reduce((sum, p) => sum + p.totalCash, 0);
    const disbursedCash = payouts.filter((p) => p.isDisbursed).reduce((sum, p) => sum + p.totalCash, 0);
    const pendingCash = totalCashSum - disbursedCash;
    const disbursedStudents = payouts.filter((p) => p.isDisbursed).length;
    const pendingStudents = payouts.length - disbursedStudents;

    return {
      totalCashSum,
      disbursedCash,
      pendingCash,
      disbursedStudents,
      pendingStudents,
      totalStudents: payouts.length,
    };
  }, [payouts]);

  // Export CSV
  const handleExportCSV = () => {
    if (payouts.length === 0) {
      toast({
        title: "Không có dữ liệu",
        description: "Hiện chưa có học sinh nào nhận lộc trong sự kiện này.",
      });
      return;
    }

    const headers = [
      "Họ và Tên",
      "Số Điện Thoại",
      "Email",
      "Lớp Học",
      "Số Bài Đã Làm",
      "Tổng Tiền Lộc (VNĐ)",
      "XP Danh Dự",
      "Trạng Thái",
      "Ngày Giờ Lì Xì",
    ];

    const rows = payouts.map((p) => [
      `"${p.studentName}"`,
      `"${p.phone}"`,
      `"${p.email}"`,
      `"${p.className}"`,
      p.claimsCount,
      p.totalCash,
      p.totalHonorXp,
      p.isDisbursed ? "Đã phát tiền" : "Chưa phát tiền",
      p.disbursedAt ? `"${new Date(p.disbursedAt).toLocaleString("vi-VN")}"` : "Chưa phát",
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Danh_sach_phat_loc_${currentPreset.code}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Đã xuất file CSV!",
      description: `Tải xuống danh sách phát lộc ${payouts.length} học viên thành công.`,
    });
  };

  // Local state for editable fields
  const [isActive, setIsActive] = useState(false);
  const [startAt, setStartAt] = useState(currentPreset.defaultStart);
  const [endAt, setEndAt] = useState(currentPreset.defaultEnd);
  const [budgetCap, setBudgetCap] = useState(currentPreset.defaultBudget);
  const [totalSlots, setTotalSlots] = useState(currentPreset.defaultSlots);

  // Editable reward tiers (Pools)
  const [rewardPools, setRewardPools] = useState<EditableRewardPool[]>([]);

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

      // Load DB pools if present
      if (currentDbEvent.pools && currentDbEvent.pools.length > 0) {
        setRewardPools(
          currentDbEvent.pools.map((p, idx) => ({
            id: p.id,
            tier: p.tier,
            label: idx === 0 ? "Lộc nhỏ" : idx === 1 ? "Lộc vừa" : idx === 2 ? "Đại lộc" : `Tầng ${idx + 1}`,
            amount: p.amount,
            totalSlots: p.totalSlots,
          }))
        );
      } else {
        setDefaultPoolsForType(selectedType);
      }

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
      setDefaultPoolsForType(selectedType);
    }
  }, [selectedType, currentDbEvent, currentPreset]);

  function setDefaultPoolsForType(type: SeasonalEventType) {
    if (type === "TET") {
      setRewardPools([
        { tier: "SMALL", label: "Lộc nhỏ", amount: 5000, totalSlots: 40 },
        { tier: "MEDIUM", label: "Lộc vừa", amount: 10000, totalSlots: 15 },
        { tier: "LARGE", label: "Đại lộc", amount: 25000, totalSlots: 4 },
        { tier: "SPECIAL", label: "Lộc thần tài", amount: 100000, totalSlots: 1 },
      ]);
    } else {
      setRewardPools([
        { tier: "SMALL", label: "Tầng 1 (Cơ bản)", amount: 5000, totalSlots: 30 },
        { tier: "MEDIUM", label: "Tầng 2 (Bứt phá)", amount: 10000, totalSlots: 15 },
        { tier: "LARGE", label: "Tầng 3 (Xuất sắc)", amount: 20000, totalSlots: 5 },
      ]);
    }
  }

  // Calculated sum of all tiers
  const calculatedTotalSlots = useMemo(() => {
    return rewardPools.reduce((sum, p) => sum + (Number(p.totalSlots) || 0), 0);
  }, [rewardPools]);

  const calculatedTotalCash = useMemo(() => {
    return rewardPools.reduce((sum, p) => sum + (Number(p.amount) || 0) * (Number(p.totalSlots) || 0), 0);
  }, [rewardPools]);

  // Handlers for modifying pools
  const handleUpdatePoolAmount = (index: number, newAmount: number) => {
    setRewardPools((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], amount: Math.max(0, newAmount) };
      return copy;
    });
  };

  const handleUpdatePoolSlots = (index: number, newSlots: number) => {
    setRewardPools((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], totalSlots: Math.max(1, newSlots) };
      return copy;
    });
  };

  const handleUpdatePoolLabel = (index: number, newLabel: string) => {
    setRewardPools((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], label: newLabel };
      return copy;
    });
  };

  const handleAddTier = () => {
    setRewardPools((prev) => [
      ...prev,
      {
        tier: `TIER_${prev.length + 1}`,
        label: `Tầng ${prev.length + 1}`,
        amount: 10000,
        totalSlots: 10,
      },
    ]);
  };

  const handleRemoveTier = (index: number) => {
    if (rewardPools.length <= 1) {
      toast({
        variant: "destructive",
        title: "Không thể xóa",
        description: "Cần giữ lại ít nhất 1 tầng phần thưởng.",
      });
      return;
    }
    setRewardPools((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSyncCalculatedTotals = () => {
    setBudgetCap(calculatedTotalCash);
    setTotalSlots(calculatedTotalSlots);
    toast({
      title: "Đã đồng bộ!",
      description: `Đã cập nhật Ngân sách = ${calculatedTotalCash.toLocaleString("vi-VN")}đ và Tổng số suất = ${calculatedTotalSlots} suất.`,
    });
  };

  // Save mutation
  const updateMutation = useMutation({
    mutationFn: (payload: any) => {
      const targetIdentifier = currentDbEvent?.id || currentPreset.code;
      return seasonalApi.updateAdminEvent(targetIdentifier, {
        ...payload,
        code: currentPreset.code,
        name: currentPreset.name,
        type: currentPreset.type,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seasonal-events"] });
      queryClient.invalidateQueries({ queryKey: ["seasonal-active-event"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Đã lưu cấu hình và kích hoạt sự kiện ${currentPreset.name}`,
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
      pools: rewardPools.map((p, idx) => ({
        tier: p.tier,
        amount: Number(p.amount) || 5000,
        totalSlots: Number(p.totalSlots) || 10,
        order: idx + 1,
      })),
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
            Bật/tắt không khí lễ hội, tự do điều chỉnh số tiền, số suất và cơ cấu các tầng phần thưởng.
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl shadow-xs gap-1.5 px-5 cursor-pointer"
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

      {/* 2. Tabs Navigation: Cấu Hình vs Danh Sách Phát Lộc */}
      <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border">
          <TabsList className="bg-transparent h-auto p-0 gap-1.5">
            <TabsTrigger
              value="config"
              className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm cursor-pointer"
            >
              ⚙️ Cấu Hình & Quỹ Lộc
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm cursor-pointer flex items-center gap-2"
            >
              <span>🧧 Danh Sách Phát Lộc</span>
              <Badge className="bg-amber-500 text-white font-black text-[10px] px-1.5 py-0 h-4">
                {payouts.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {activeTab === "payouts" && (
            <div className="flex items-center gap-2 px-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                disabled={payouts.length === 0}
                className="h-8 rounded-xl text-xs font-semibold gap-1.5 bg-white dark:bg-slate-900 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                <span>Xuất CSV</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsClearDialogOpen(true)}
                disabled={payouts.length === 0}
                className="h-8 rounded-xl text-xs font-semibold gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa Danh Sách</span>
              </Button>
            </div>
          )}
        </div>

        {/* TAB 1: CẤU HÌNH & QUỸ LỘC */}
        <TabsContent value="config" className="mt-0 space-y-6">
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

              {/* 3. Prize Pool Controller: Editable Budget & Slots */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {currentPreset.prizePoolTitle}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 italic">
                    Admin có thể trực tiếp nhập số tiền ngân sách & tổng số suất bên dưới
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* EDITABLE BUDGET CAP */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-[11px] font-extrabold text-amber-900 dark:text-amber-200 uppercase">
                        Ngân Sách Tối Đa (VNĐ)
                      </Label>
                      <span className="text-[10px] text-amber-700 font-bold">Khóa cứng</span>
                    </div>
                    <Input
                      type="number"
                      step="50000"
                      min="10000"
                      value={budgetCap}
                      onChange={(e) => setBudgetCap(Number(e.target.value))}
                      className="bg-white dark:bg-slate-900 font-black text-base h-9 rounded-xl border-amber-300"
                    />
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 font-bold pt-0.5">
                      = {Number(budgetCap).toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>

                  {/* EDITABLE TOTAL SLOTS */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 uppercase">
                        Tổng Số Suất Lộc
                      </Label>
                      <span className="text-[10px] text-slate-500 font-bold">Toàn chiến dịch</span>
                    </div>
                    <Input
                      type="number"
                      min="1"
                      value={totalSlots}
                      onChange={(e) => setTotalSlots(Number(e.target.value))}
                      className="bg-white dark:bg-slate-900 font-black text-base h-9 rounded-xl border-slate-300"
                    />
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold pt-0.5">
                      = {totalSlots} suất nhận thưởng
                    </p>
                  </div>

                  {/* CLAIMED STATS */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
                    <span className="text-[11px] font-extrabold text-emerald-800 dark:text-emerald-300 uppercase">
                      Đã Trao Cho Học Viên
                    </span>
                    <div className="text-xl font-black text-emerald-900 dark:text-emerald-100 my-1">
                      {currentDbEvent?.claimedSlots || 0} / {totalSlots}
                    </div>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                      {totalSlots > (currentDbEvent?.claimedSlots || 0)
                        ? `Còn lại ${totalSlots - (currentDbEvent?.claimedSlots || 0)} suất tiền mặt`
                        : "Đã trao hết — Chuyển Lộc Danh Dự"}
                    </p>
                  </div>

                  {/* REMAINING CASH */}
                  <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 flex flex-col justify-between">
                    <span className="text-[11px] font-extrabold text-rose-800 dark:text-rose-300 uppercase">
                      Quỹ Tiền Mặt Còn Lại
                    </span>
                    <div className="text-xl font-black text-rose-900 dark:text-rose-100 my-1">
                      {(currentDbEvent?.remainingCashBudget || Number(budgetCap)).toLocaleString("vi-VN")}đ
                    </div>
                    <p className="text-[10px] text-rose-700 dark:text-rose-400">
                      Tự động trừ dần khi học viên nộp bài
                    </p>
                  </div>
                </div>

                {/* EDITABLE REWARD TIERS TABLE */}
                <div className="mt-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <span>Chi Tiết Cơ Cấu Các Tầng Phần Thưởng</span>
                        <Badge variant="outline" className="text-[10px] font-bold">
                          {rewardPools.length} tầng
                        </Badge>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Tự do thêm tầng, sửa mệnh giá tiền mặt và phân bổ số suất cho từng tầng.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleSyncCalculatedTotals}
                        className="h-8 rounded-xl text-xs font-bold gap-1 border-primary/40 text-primary hover:bg-primary/10 cursor-pointer"
                        title="Tự động gán Tổng Ngân Sách và Tổng Suất bằng tổng các tầng bên dưới"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Đồng bộ lên Tổng Quỹ</span>
                      </Button>

                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={handleAddTier}
                        className="h-8 rounded-xl text-xs font-bold gap-1 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm Tầng</span>
                      </Button>
                    </div>
                  </div>

                  {/* Pool rows */}
                  <div className="space-y-2 pt-1">
                    {rewardPools.map((pool, idx) => {
                      const subTotal = (Number(pool.amount) || 0) * (Number(pool.totalSlots) || 0);

                      return (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs"
                        >
                          {/* Tier Name / Label */}
                          <div className="w-full sm:w-44 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <Input
                              value={pool.label}
                              onChange={(e) => handleUpdatePoolLabel(idx, e.target.value)}
                              className="h-8 text-xs font-bold rounded-lg"
                              placeholder="Tên tầng lộc"
                            />
                          </div>

                          {/* Amount Input */}
                          <div className="flex-1 flex items-center gap-1.5">
                            <Label className="text-[11px] text-slate-500 shrink-0">Mệnh giá:</Label>
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                step="1000"
                                min="1000"
                                value={pool.amount}
                                onChange={(e) => handleUpdatePoolAmount(idx, Number(e.target.value))}
                                className="h-8 text-xs font-bold rounded-lg pr-7"
                              />
                              <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-bold pointer-events-none">
                                đ
                              </span>
                            </div>
                          </div>

                          {/* Slots Input */}
                          <div className="w-full sm:w-36 flex items-center gap-1.5">
                            <Label className="text-[11px] text-slate-500 shrink-0">Số suất:</Label>
                            <Input
                              type="number"
                              min="1"
                              value={pool.totalSlots}
                              onChange={(e) => handleUpdatePoolSlots(idx, Number(e.target.value))}
                              className="h-8 text-xs font-bold rounded-lg text-center"
                            />
                          </div>

                          {/* Subtotal */}
                          <div className="w-full sm:w-36 text-right font-black text-xs text-amber-600 dark:text-amber-400 shrink-0">
                            = {subTotal.toLocaleString("vi-VN")}đ
                          </div>

                          {/* Delete Button */}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTier(idx)}
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 rounded-lg shrink-0"
                            title="Xóa tầng phần thưởng này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Summary Check */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span>Tổng tiền phân bổ: <strong className="text-slate-900 dark:text-white font-black">{calculatedTotalCash.toLocaleString("vi-VN")}đ</strong></span>
                      <span>•</span>
                      <span>Tổng số suất: <strong className="text-slate-900 dark:text-white font-black">{calculatedTotalSlots} suất</strong></span>
                    </div>

                    {calculatedTotalCash > budgetCap && (
                      <div className="flex items-center gap-1.5 text-rose-600 text-[11px] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Tổng tiền các tầng ({calculatedTotalCash.toLocaleString("vi-VN")}đ) vượt Ngân sách tối đa ({Number(budgetCap).toLocaleString("vi-VN")}đ). Hãy bấm "Đồng bộ lên Tổng Quỹ" hoặc tăng ngân sách!</span>
                      </div>
                    )}
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
        </TabsContent>

        {/* TAB 2: DANH SÁCH PHÁT LỘC */}
        <TabsContent value="payouts" className="mt-0 space-y-4">
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="rounded-2xl p-4 border bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Tổng Lộc Tích Lũy</span>
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {payoutSummary.totalCashSum.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {payoutSummary.totalStudents} học viên đã mở lộc
              </p>
            </Card>

            <Card className="rounded-2xl p-4 border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase">Đã Phát Lì Xì</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
                {payoutSummary.disbursedCash.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                Đã chuyển cho {payoutSummary.disbursedStudents} bạn
              </p>
            </Card>

            <Card className="rounded-2xl p-4 border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase">Chưa Phát (Cần Chuyển)</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">
                {payoutSummary.pendingCash.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                Còn {payoutSummary.pendingStudents} bạn đang đợi
              </p>
            </Card>
          </div>

          {/* Search, Filters & Action Bar */}
          <Card className="rounded-2xl border bg-white dark:bg-slate-900 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Tìm học viên theo tên, SĐT, email, lớp..."
                  value={payoutSearch}
                  onChange={(e) => setPayoutSearch(e.target.value)}
                  className="pl-9 h-9 text-xs rounded-xl"
                />
              </div>

              {/* Status filter buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <Button
                  size="sm"
                  variant={payoutStatusFilter === "ALL" ? "default" : "outline"}
                  onClick={() => setPayoutStatusFilter("ALL")}
                  className="h-8 text-xs rounded-xl cursor-pointer"
                >
                  Tất cả ({payouts.length})
                </Button>
                <Button
                  size="sm"
                  variant={payoutStatusFilter === "PENDING" ? "default" : "outline"}
                  onClick={() => setPayoutStatusFilter("PENDING")}
                  className="h-8 text-xs rounded-xl cursor-pointer"
                >
                  Chưa phát ({payoutSummary.pendingStudents})
                </Button>
                <Button
                  size="sm"
                  variant={payoutStatusFilter === "DISBURSED" ? "default" : "outline"}
                  onClick={() => setPayoutStatusFilter("DISBURSED")}
                  className="h-8 text-xs rounded-xl cursor-pointer"
                >
                  Đã phát ({payoutSummary.disbursedStudents})
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => refetchPayouts()}
                  className="h-8 w-8 rounded-xl cursor-pointer"
                  title="Tải lại danh sách"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Payouts Table */}
            {isPayoutsLoading ? (
              <div className="py-12 flex items-center justify-center text-xs text-slate-500 gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                <span>Đang tải danh sách phát lộc...</span>
              </div>
            ) : filteredPayouts.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Chưa có dữ liệu nhận lộc
                </p>
                <p className="text-xs text-slate-400">
                  {payoutSearch
                    ? "Không tìm thấy học viên nào khớp với từ khóa tìm kiếm."
                    : `Chưa có học sinh nào hoàn thành bài tập nhận thưởng trong dịp ${currentPreset.name}.`}
                </p>
              </div>
            ) : (
              <div className="border rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b">
                    <tr>
                      <th className="p-3">Học Viên</th>
                      <th className="p-3">SĐT & Lớp</th>
                      <th className="p-3 text-center">Số Bài Đã Làm</th>
                      <th className="p-3 text-right">Tổng Tiền Lộc</th>
                      <th className="p-3 text-center">Trạng Thái</th>
                      <th className="p-3 text-right">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredPayouts.map((item) => (
                      <tr
                        key={item.studentId}
                        className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                          item.isDisbursed ? "opacity-75" : ""
                        }`}
                      >
                        {/* Student Name */}
                        <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                          <div>{item.studentName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{item.email}</div>
                        </td>

                        {/* Phone & Class */}
                        <td className="p-3">
                          <div className="font-semibold text-slate-700 dark:text-slate-300">{item.phone}</div>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-0.5">
                            {item.className}
                          </Badge>
                        </td>

                        {/* Claims Count */}
                        <td className="p-3 text-center">
                          <span className="font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                            {item.claimsCount} bài
                          </span>
                        </td>

                        {/* Total Cash */}
                        <td className="p-3 text-right">
                          <div className="font-black text-sm text-amber-600 dark:text-amber-400">
                            {item.totalCash.toLocaleString("vi-VN")}đ
                          </div>
                          {item.totalHonorXp > 0 && (
                            <div className="text-[10px] text-emerald-600 font-semibold">
                              +{item.totalHonorXp} XP Khai Bút
                            </div>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="p-3 text-center">
                          {item.isDisbursed ? (
                            <Badge className="bg-emerald-500 text-white font-bold text-[10px] gap-1">
                              <Check className="w-3 h-3" />
                              Đã phát tiền
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold text-[10px] gap-1">
                              <Clock className="w-3 h-3" />
                              Chờ phát
                            </Badge>
                          )}
                        </td>

                        {/* Action Toggle Button */}
                        <td className="p-3 text-right">
                          {item.isDisbursed ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={toggleDisbursedMutation.isPending}
                              onClick={() =>
                                toggleDisbursedMutation.mutate({
                                  studentId: item.studentId,
                                  isDisbursed: false,
                                })
                              }
                              className="h-7 text-[11px] text-slate-500 hover:text-rose-600 rounded-lg gap-1 cursor-pointer"
                              title="Hoàn tác về Chưa phát"
                            >
                              <Undo2 className="w-3 h-3" />
                              <span>Hoàn tác</span>
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              disabled={toggleDisbursedMutation.isPending}
                              onClick={() =>
                                toggleDisbursedMutation.mutate({
                                  studentId: item.studentId,
                                  isDisbursed: true,
                                })
                              }
                              className="h-7 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-1 shadow-xs cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>Đã Lì Xì ✓</span>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog: Clear Payout List */}
      <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mx-auto sm:mx-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
              Xóa Toàn Bộ Danh Sách Phát Lộc?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 leading-relaxed">
              Hành động này sẽ xóa vĩnh viễn toàn bộ lịch sử nhận lộc ({payouts.length} học viên) của sự kiện <strong>{currentPreset.name}</strong> và <strong>đặt lại số suất đã mở về 0</strong>. Bạn có chắc chắn muốn thực hiện không?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsClearDialogOpen(false)}
              className="rounded-xl text-xs font-semibold cursor-pointer"
            >
              Hủy bỏ
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={clearPayoutsMutation.isPending}
              onClick={() => clearPayoutsMutation.mutate()}
              className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer bg-rose-600 hover:bg-rose-700 text-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{clearPayoutsMutation.isPending ? "Đang xóa..." : "Xác Nhận Xóa Hết"}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
