import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  teacherProfileApi,
  TeacherProfileData,
  AvailabilitySlot,
} from "@/lib/api";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  Edit,
  Save,
  X,
  Loader2,
  ExternalLink,
  Users,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────
const TEACHABLE_LEVELS = ["Foundation", "4.0", "5.0", "6.0", "6.5+", "7.0+"];
const STRONG_SKILLS = ["Listening", "Reading", "Writing", "Speaking"];
const STRENGTH_OPTIONS = [
  "Strong Writing", "Strong Speaking", "Strong Listening", "Strong Reading",
  "Classroom Management", "Explains Grammar Clearly",
  "Good with Beginners", "Good with Weak Students", "Good with High-level Students",
  "Motivational", "Strict / Disciplined", "Detailed Feedback",
  "Strong Exam Strategy",
];
const DEVELOPMENT_OPTIONS = [
  "Classroom pacing", "Giving concise feedback", "Time management",
  "Speaking correction", "Lesson preparation consistency",
  "Writing feedback depth", "Grammar explanation",
];
const CERTIFICATE_OPTIONS = ["IELTS", "TESOL", "CELTA", "TEFL", "MA English", "BA English", "Khác"];
const EDUCATION_OPTIONS = ["BA", "MA", "PhD", "Khác"];
const DAY_LABELS: Record<number, string> = {
  1: "T2", 2: "T3", 3: "T4", 4: "T5", 5: "T6", 6: "T7", 7: "CN",
};

// ─── Capacity Badge ────────────────────────────────────────────
function CapacityBadge({ status, current, max }: { status: string; current: number; max: number | null }) {
  if (status === "full") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Đang đầy tải ({current}/{max ?? "?"})
      </span>
    );
  }
  if (status === "nearFull") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        Gần đầy ({current}/{max ?? "?"} lớp)
      </span>
    );
  }
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Có thể nhận thêm ({current}/{max ?? "?"} lớp)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-slate-400" />
      Chưa cấu hình tải ({current} lớp)
    </span>
  );
}

// ─── Tag Toggle ────────────────────────────────────────────────
function TagToggle({
  options, selected, onChange, color = "default",
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  color?: "default" | "blue" | "emerald" | "amber" | "rose";
}) {
  const colorMap: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    blue:    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300",
    emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300",
    amber:   "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300",
    rose:    "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300",
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() =>
              onChange(active ? selected.filter((s) => s !== opt) : [...selected, opt])
            }
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer",
              active
                ? colorMap[color] || colorMap.default
                : "bg-muted text-muted-foreground border-transparent hover:border-border"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Score Input ───────────────────────────────────────────────
function ScoreInput({
  label, value, onChange,
}: {
  label: string;
  value: number | null | undefined;
  onChange: (v: number | null) => void;
}) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
      <Input
        type="number"
        min={0}
        max={9}
        step={0.5}
        placeholder="—"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : parseFloat(e.target.value))
        }
        className="h-9 text-center text-sm font-bold w-16 mx-auto"
      />
    </div>
  );
}

// ─── Availability Grid ─────────────────────────────────────────
function AvailabilityEditor({
  slots, onChange,
}: {
  slots: AvailabilitySlot[];
  onChange: (s: AvailabilitySlot[]) => void;
}) {
  const days = [1, 2, 3, 4, 5, 6, 7];

  const addSlot = (dayOfWeek: number) => {
    if (slots.some((s) => s.dayOfWeek === dayOfWeek)) return;
    onChange([...slots, { dayOfWeek, startTime: "18:00", endTime: "21:30" }]);
  };

  const removeSlot = (dayOfWeek: number) => {
    onChange(slots.filter((s) => s.dayOfWeek !== dayOfWeek));
  };

  const updateSlot = (dayOfWeek: number, field: "startTime" | "endTime", val: string) => {
    onChange(
      slots.map((s) =>
        s.dayOfWeek === dayOfWeek ? { ...s, [field]: val } : s
      )
    );
  };

  return (
    <div className="space-y-2">
      {days.map((d) => {
        const slot = slots.find((s) => s.dayOfWeek === d);
        return (
          <div key={d} className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground w-7">{DAY_LABELS[d]}</span>
            {slot ? (
              <>
                <Input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => updateSlot(d, "startTime", e.target.value)}
                  className="h-8 text-xs w-28"
                />
                <span className="text-muted-foreground text-xs">→</span>
                <Input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => updateSlot(d, "endTime", e.target.value)}
                  className="h-8 text-xs w-28"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => removeSlot(d)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => addSlot(d)}
                className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors px-2 py-1 rounded border border-dashed border-muted-foreground/30 hover:border-primary/50"
              >
                + Thêm khung giờ
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
interface TeacherProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  teacher: {
    id: string;          // profile.id (UUID in profiles table)
    userId: string;      // auth userId
    fullName?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
    isActive?: boolean;
  } | null;
  isAdminViewer?: boolean;
}

export function TeacherProfileDrawer({
  open,
  onClose,
  teacher,
  isAdminViewer = true,
}: TeacherProfileDrawerProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<TeacherProfileData>>({});

  const userId = teacher?.userId || teacher?.id || "";

  const { data, isLoading } = useQuery({
    queryKey: ["teacher-profile", userId],
    queryFn: () => teacherProfileApi.get(userId),
    enabled: open && !!userId,
    staleTime: 30_000,
  });

  const upsertMutation = useMutation({
    mutationFn: (payload: Partial<TeacherProfileData>) =>
      teacherProfileApi.upsert(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-profile", userId] });
      toast({ title: "Đã cập nhật hồ sơ giáo viên" });
      setIsEditing(false);
    },
    onError: (err: any) => {
      toast({
        title: "Lỗi",
        description: err?.message || "Không thể cập nhật hồ sơ",
        variant: "destructive",
      });
    },
  });

  const startEdit = () => {
    setForm({
      ieltsOverall: data?.profile?.ieltsOverall,
      ieltsL: data?.profile?.ieltsL,
      ieltsR: data?.profile?.ieltsR,
      ieltsW: data?.profile?.ieltsW,
      ieltsS: data?.profile?.ieltsS,
      ieltsTestedAt: data?.profile?.ieltsTestedAt ?? undefined,
      yearsTeachingIelts: data?.profile?.yearsTeachingIelts,
      yearsTeachingEnglish: data?.profile?.yearsTeachingEnglish,
      certificates: data?.profile?.certificates ?? [],
      educationLevel: data?.profile?.educationLevel,
      teachableLevels: data?.profile?.teachableLevels ?? [],
      strongSkills: data?.profile?.strongSkills ?? [],
      strengths: data?.profile?.strengths ?? [],
      developmentAreas: data?.profile?.developmentAreas ?? [],
      internalNotes: data?.profile?.internalNotes,
      availabilitySlots: data?.profile?.availabilitySlots ?? [],
      maxClassesPerWeek: data?.profile?.maxClassesPerWeek,
      maxHoursPerWeek: data?.profile?.maxHoursPerWeek,
    });
    setIsEditing(true);
  };

  const handleSave = () => upsertMutation.mutate(form);

  const setField = (key: keyof TeacherProfileData, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const profile = data?.profile;
  const workload = data?.workload;
  const classes = data?.currentClasses ?? [];

  const initials = (teacher?.fullName || teacher?.email || "G")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) { setIsEditing(false); onClose(); } }}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col" side="right">
        {/* ── Header ── */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarImage src={teacher?.avatarUrl || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-base leading-tight">
                  {teacher?.fullName || "Chưa đặt tên"}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {profile?.ieltsOverall != null && (
                    <Badge className="text-xs bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                      IELTS {profile.ieltsOverall}
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      teacher?.isActive
                        ? "text-emerald-700 border-emerald-300 dark:text-emerald-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {teacher?.isActive ? "Đang hoạt động" : "Tạm nghỉ"}
                  </Badge>
                  {workload && (
                    <CapacityBadge
                      status={workload.capacityStatus}
                      current={workload.currentClasses}
                      max={workload.maxClasses}
                    />
                  )}
                </div>
              </div>
            </div>

            {isAdminViewer && !isEditing && (
              <Button variant="outline" size="sm" className="shrink-0" onClick={startEdit}>
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Sửa
              </Button>
            )}
            {isEditing && (
              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  disabled={upsertMutation.isPending}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={upsertMutation.isPending}
                >
                  {upsertMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  Lưu
                </Button>
              </div>
            )}
          </div>
        </SheetHeader>

        {/* ── Tabs ── */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="capability" className="h-full flex flex-col">
            <TabsList className="mx-5 mt-4 mb-0 grid grid-cols-3 shrink-0">
              <TabsTrigger value="capability" className="text-xs gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                Năng lực
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-xs gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Lịch & Tải
              </TabsTrigger>
              <TabsTrigger value="classes" className="text-xs gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                Lớp dạy
              </TabsTrigger>
            </TabsList>

            {/* ─── Tab 1: Năng lực ─── */}
            <TabsContent value="capability" className="flex-1 overflow-y-auto px-5 py-4 space-y-6 mt-0">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
                </div>
              ) : (
                <>
                  {/* IELTS Scores */}
                  <section>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      Điểm IELTS
                    </h3>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Overall</span>
                          <Input
                            type="number"
                            min={0}
                            max={9}
                            step={0.5}
                            placeholder="Overall"
                            value={form.ieltsOverall ?? ""}
                            onChange={(e) =>
                              setField("ieltsOverall", e.target.value === "" ? null : parseFloat(e.target.value))
                            }
                            className="h-8 w-24 text-center text-sm font-bold"
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <ScoreInput label="L" value={form.ieltsL} onChange={(v) => setField("ieltsL", v)} />
                          <ScoreInput label="R" value={form.ieltsR} onChange={(v) => setField("ieltsR", v)} />
                          <ScoreInput label="W" value={form.ieltsW} onChange={(v) => setField("ieltsW", v)} />
                          <ScoreInput label="S" value={form.ieltsS} onChange={(v) => setField("ieltsS", v)} />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Ngày thi</Label>
                          <Input
                            type="date"
                            value={form.ieltsTestedAt ? String(form.ieltsTestedAt).slice(0, 10) : ""}
                            onChange={(e) => setField("ieltsTestedAt", e.target.value || null)}
                            className="h-8 text-xs mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        {profile?.ieltsOverall != null ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">{profile.ieltsOverall}</span>
                              <span className="text-sm text-muted-foreground">Overall</span>
                            </div>
                            <div className="flex gap-4">
                              {[
                                { label: "L", val: profile.ieltsL },
                                { label: "R", val: profile.ieltsR },
                                { label: "W", val: profile.ieltsW },
                                { label: "S", val: profile.ieltsS },
                              ].map(({ label, val }) => (
                                <div key={label} className="text-center">
                                  <p className="text-[10px] text-muted-foreground">{label}</p>
                                  <p className="text-sm font-semibold">{val ?? "—"}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">Chưa có điểm IELTS</p>
                        )}
                      </>
                    )}
                  </section>

                  {/* Experience & Certs */}
                  <section>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Kinh nghiệm & Chứng chỉ
                    </h3>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Năm dạy IELTS</Label>
                            <Input
                              type="number"
                              min={0}
                              value={form.yearsTeachingIelts ?? ""}
                              onChange={(e) => setField("yearsTeachingIelts", e.target.value === "" ? null : parseInt(e.target.value))}
                              className="h-8 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Năm dạy tiếng Anh</Label>
                            <Input
                              type="number"
                              min={0}
                              value={form.yearsTeachingEnglish ?? ""}
                              onChange={(e) => setField("yearsTeachingEnglish", e.target.value === "" ? null : parseInt(e.target.value))}
                              className="h-8 text-sm mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Chứng chỉ</Label>
                          <TagToggle
                            options={CERTIFICATE_OPTIONS}
                            selected={form.certificates ?? []}
                            onChange={(v) => setField("certificates", v)}
                            color="blue"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Học vấn</Label>
                          <TagToggle
                            options={EDUCATION_OPTIONS}
                            selected={form.educationLevel ? [form.educationLevel] : []}
                            onChange={(v) => setField("educationLevel", v[v.length - 1] ?? null)}
                            color="default"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {(profile?.yearsTeachingIelts != null || profile?.yearsTeachingEnglish != null) && (
                          <div className="flex gap-4 text-sm">
                            {profile?.yearsTeachingIelts != null && (
                              <span><b>{profile.yearsTeachingIelts}</b> năm IELTS</span>
                            )}
                            {profile?.yearsTeachingEnglish != null && (
                              <span><b>{profile.yearsTeachingEnglish}</b> năm tiếng Anh</span>
                            )}
                          </div>
                        )}
                        {(profile?.certificates ?? []).length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {(profile?.certificates ?? []).map((c) => (
                              <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                            ))}
                          </div>
                        )}
                        {!profile?.ieltsOverall && !profile?.yearsTeachingIelts && !(profile?.certificates?.length) && (
                          <p className="text-sm text-muted-foreground italic">Chưa có thông tin</p>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Teaching Capability */}
                  <section>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Năng lực giảng dạy
                    </h3>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Có thể dạy level</Label>
                          <TagToggle
                            options={TEACHABLE_LEVELS}
                            selected={form.teachableLevels ?? []}
                            onChange={(v) => setField("teachableLevels", v)}
                            color="emerald"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Kỹ năng mạnh</Label>
                          <TagToggle
                            options={STRONG_SKILLS}
                            selected={form.strongSkills ?? []}
                            onChange={(v) => setField("strongSkills", v)}
                            color="blue"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Điểm mạnh</Label>
                          <TagToggle
                            options={STRENGTH_OPTIONS}
                            selected={form.strengths ?? []}
                            onChange={(v) => setField("strengths", v)}
                            color="emerald"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Cần phát triển</Label>
                          <TagToggle
                            options={DEVELOPMENT_OPTIONS}
                            selected={form.developmentAreas ?? []}
                            onChange={(v) => setField("developmentAreas", v)}
                            color="amber"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(profile?.teachableLevels ?? []).length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1.5">Có thể dạy</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(profile?.teachableLevels ?? []).map((l) => (
                                <Badge key={l} className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200">
                                  {l}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {(profile?.strongSkills ?? []).length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1.5">Kỹ năng mạnh</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(profile?.strongSkills ?? []).map((s) => (
                                <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {(profile?.strengths ?? []).length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1.5">Điểm mạnh</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(profile?.strengths ?? []).map((s) => (
                                <Badge key={s} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {(profile?.developmentAreas ?? []).length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1.5">Cần phát triển</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(profile?.developmentAreas ?? []).map((s) => (
                                <Badge key={s} className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {!(profile?.teachableLevels?.length) && !(profile?.strengths?.length) && (
                          <p className="text-sm text-muted-foreground italic">Chưa có thông tin năng lực</p>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Internal Notes — admin only */}
                  {isAdminViewer && (
                    <section>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                        Ghi chú nội bộ
                      </h3>
                      {isEditing ? (
                        <Textarea
                          placeholder="Ghi chú dành cho Academic Manager (không hiển thị với giáo viên)..."
                          value={form.internalNotes ?? ""}
                          onChange={(e) => setField("internalNotes", e.target.value)}
                          rows={3}
                          className="text-sm resize-none"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {profile?.internalNotes || <span className="italic">Chưa có ghi chú</span>}
                        </p>
                      )}
                    </section>
                  )}
                </>
              )}
            </TabsContent>

            {/* ─── Tab 2: Lịch & Tải ─── */}
            <TabsContent value="schedule" className="flex-1 overflow-y-auto px-5 py-4 space-y-6 mt-0">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => <Skeleton key={i} className="h-32 w-full rounded-lg" />)}
                </div>
              ) : (
                <>
                  {/* Capacity Config */}
                  <section>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      Sức tải tối đa
                    </h3>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Lớp tối đa / tuần</Label>
                          <Input
                            type="number"
                            min={1}
                            value={form.maxClassesPerWeek ?? ""}
                            onChange={(e) => setField("maxClassesPerWeek", e.target.value === "" ? null : parseInt(e.target.value))}
                            className="h-8 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Giờ tối đa / tuần</Label>
                          <Input
                            type="number"
                            min={1}
                            step={0.5}
                            value={form.maxHoursPerWeek ?? ""}
                            onChange={(e) => setField("maxHoursPerWeek", e.target.value === "" ? null : parseFloat(e.target.value))}
                            className="h-8 mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {workload && (
                          <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Lớp hiện tại</span>
                              <span className="text-sm font-semibold">
                                {workload.currentClasses}
                                {workload.maxClasses != null ? ` / ${workload.maxClasses}` : ""}
                              </span>
                            </div>
                            {workload.maxClasses != null && (
                              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    workload.capacityStatus === "full" ? "bg-red-500" :
                                    workload.capacityStatus === "nearFull" ? "bg-amber-500" :
                                    "bg-emerald-500"
                                  )}
                                  style={{ width: `${Math.min((workload.currentClasses / workload.maxClasses) * 100, 100)}%` }}
                                />
                              </div>
                            )}
                            {workload.maxHours != null && (
                              <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>Giờ tối đa</span>
                                <span>{workload.maxHours}h / tuần</span>
                              </div>
                            )}
                          </div>
                        )}
                        <CapacityBadge
                          status={workload?.capacityStatus ?? "unknown"}
                          current={workload?.currentClasses ?? 0}
                          max={workload?.maxClasses ?? null}
                        />
                      </div>
                    )}
                  </section>

                  {/* Availability */}
                  <section>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Lịch có thể dạy
                    </h3>
                    {isEditing ? (
                      <AvailabilityEditor
                        slots={form.availabilitySlots ?? []}
                        onChange={(s) => setField("availabilitySlots", s)}
                      />
                    ) : (
                      <>
                        {(profile?.availabilitySlots ?? []).length > 0 ? (
                          <div className="space-y-1.5">
                            {(profile?.availabilitySlots as AvailabilitySlot[] ?? [])
                              .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                              .map((slot) => (
                                <div key={slot.dayOfWeek} className="flex items-center gap-3 text-sm">
                                  <span className="w-7 text-xs font-semibold text-muted-foreground">
                                    {DAY_LABELS[slot.dayOfWeek]}
                                  </span>
                                  <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                                    {slot.startTime} → {slot.endTime}
                                  </span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">Chưa cấu hình lịch</p>
                        )}
                      </>
                    )}
                  </section>
                </>
              )}
            </TabsContent>

            {/* ─── Tab 3: Lớp đang dạy ─── */}
            <TabsContent value="classes" className="flex-1 overflow-y-auto px-5 py-4 space-y-3 mt-0">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
                </div>
              ) : classes.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Chưa phụ trách lớp nào</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">{classes.length} lớp đang phụ trách</p>
                  </div>
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => navigate(`/admin/classes?id=${cls.id}`)}
                      className="w-full text-left rounded-lg border bg-card hover:bg-muted/50 p-3 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{cls.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {cls.studentCount} học viên
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-[10px] px-1.5 py-0",
                                  cls.status === "ACTIVE"
                                    ? "text-emerald-700 border-emerald-200"
                                    : "text-muted-foreground"
                                )}
                              >
                                {cls.status === "ACTIVE" ? "Đang học" : cls.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
