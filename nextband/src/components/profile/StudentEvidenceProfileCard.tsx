import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sparkles,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Layers,
  BookOpen,
  Mic,
  PenTool,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { aggregateWritingEvidence } from "@/lib/writingEvidenceAggregator";
import { QUESTION_TYPE_METADATA } from "@/lib/objectiveEvidenceAggregator";
import { cn } from "@/lib/utils";

interface StudentEvidenceProfileCardProps {
  submissions: any[];
  className?: string;
}

export function StudentEvidenceProfileCard({
  submissions,
  className,
}: StudentEvidenceProfileCardProps) {
  const [activeTab, setActiveTab] = useState<string>("writing");

  // 1. Writing Evidence Longitudinal Aggregation
  const writingProfile = useMemo(() => {
    return aggregateWritingEvidence(submissions);
  }, [submissions]);

  // 2. Objective (Reading / Listening) Longitudinal Question Type Aggregation
  const objectiveTypeStats = useMemo(() => {
    const map: Record<string, { total: number; correct: number }> = {};

    (submissions || []).forEach((sub) => {
      if (!Array.isArray(sub?.answers)) return;

      sub.answers.forEach((ans: any) => {
        const qType = ans?.question?.questionType || ans?.questionType;
        if (!qType) return;

        if (!map[qType]) {
          map[qType] = { total: 0, correct: 0 };
        }
        map[qType].total++;

        const isCorrect = ans.score != null ? ans.score > 0 : false;
        if (isCorrect) map[qType].correct++;
      });
    });

    return Object.entries(map)
      .map(([typeKey, data]) => {
        const meta = QUESTION_TYPE_METADATA[typeKey] || {
          typeKey,
          labelVi: typeKey.replace(/_/g, " ").toUpperCase(),
          skill: "Reading / Listening",
          descriptionVi: "Dạng bài trắc nghiệm",
          remediationAdvice: "Tiếp tục rèn luyện",
        };
        const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        return {
          typeKey,
          labelVi: meta.labelVi,
          skill: meta.skill,
          total: data.total,
          correct: data.correct,
          accuracy,
        };
      })
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [submissions]);

  const hasWritingData = writingProfile.totalGradedSubmissions > 0;
  const hasObjectiveData = objectiveTypeStats.length > 0;

  if (!hasWritingData && !hasObjectiveData) {
    return null;
  }

  return (
    <Card className={cn("border border-slate-200/90 shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden font-sans", className)}>
      <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Hồ Sơ Năng Lực Dọc (Evidence Profile)</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                  Human-Verified & Machine-Audited
                </Badge>
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Bản đồ tổng hợp điểm sáng, lỗ hổng kỹ thuật và quỹ đạo tiến bộ thực tế của bạn
              </p>
            </div>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-3">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 h-9 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <TabsTrigger value="writing" className="font-bold text-xs gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs">
              <PenTool className="w-3.5 h-3.5" />
              <span>Writing ({writingProfile.totalGradedSubmissions} bài)</span>
            </TabsTrigger>
            <TabsTrigger value="reading" className="font-bold text-xs gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading & Listening</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* TAB 1: WRITING EVIDENCE */}
        {activeTab === "writing" && (
          <div className="space-y-4">
            {/* RECOVERY TRAJECTORY / TIẾN BỘ THỰC TẾ */}
            {writingProfile.recoveringErrors.length > 0 && (
              <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-900 dark:text-emerald-200">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span>TIẾN BỘ THỰC TẾ: CÁC LỖI ĐÃ HỒI PHỤC THÀNH CÔNG</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {writingProfile.recoveringErrors.map((rec, i) => (
                    <div
                      key={i}
                      className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-lg border border-emerald-200 text-xs flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{rec.labelVi}</p>
                        <span className="text-[10px] text-slate-500">
                          {rec.initialCount} lần ➔ còn {rec.recentCount} lần
                        </span>
                      </div>
                      <Badge className="bg-emerald-600 text-white font-extrabold text-[10px]">
                        Giảm {rec.reductionPercentage}% 🎉
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRAISE HIGHLIGHTS (ĐIỂM SÁNG) */}
            {writingProfile.praiseHighlights.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Điểm sáng đã được giáo viên ghi nhận ({writingProfile.totalPraisePoints} lời khen):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {writingProfile.praiseHighlights.map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-100 text-emerald-950 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 shadow-2xs"
                    >
                      <span>{p.labelVi}</span>
                      <Badge variant="outline" className="bg-emerald-200/80 border-emerald-400 text-[10px] px-1.5 py-0">
                        {p.count}x
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TOP GRAMMAR & EXPRESSION ISSUES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Grammar */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-slate-100">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Lỗ hổng Ngữ pháp (Grammar Accuracy):</span>
                </div>
                <div className="space-y-1.5">
                  {writingProfile.topGrammarIssues.length > 0 ? (
                    writingProfile.topGrammarIssues.map((item, idx) => (
                      <div key={idx} className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                          <span>{item.labelVi}</span>
                          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            {item.count} lần
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.tip}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Chưa ghi nhận lỗi ngữ pháp lặp lại.</p>
                  )}
                </div>
              </div>

              {/* Expression */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-slate-100">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Diễn đạt & Từ vựng (Lexical & Expression):</span>
                </div>
                <div className="space-y-1.5">
                  {writingProfile.topExpressionIssues.length > 0 ? (
                    writingProfile.topExpressionIssues.map((item, idx) => (
                      <div key={idx} className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                          <span>{item.labelVi}</span>
                          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            {item.count} lần
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{item.tip}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Chưa ghi nhận lỗi diễn đạt lặp lại.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: READING & LISTENING QUESTION TYPES */}
        {activeTab === "reading" && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium">
              Bản đồ độ chính xác phân bổ theo từng dạng câu hỏi IELTS được thu thập tự động từ toàn bộ các bài làm:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {objectiveTypeStats.map((item) => {
                const isWeak = item.accuracy < 50;
                const isStrong = item.accuracy >= 75;

                return (
                  <div
                    key={item.typeKey}
                    className={cn(
                      "p-3 rounded-xl border flex items-center justify-between",
                      isWeak
                        ? "bg-rose-50/50 border-rose-200 dark:bg-rose-950/20"
                        : isStrong
                        ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20"
                        : "bg-slate-50 border-slate-200 dark:bg-slate-800/40"
                    )}
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        {isWeak && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
                        {isStrong && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>{item.labelVi}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Đã làm: {item.total} câu ({item.correct} đúng)
                      </span>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-black px-2 py-1 tabular-nums",
                        isWeak
                          ? "bg-rose-100 text-rose-800 border-rose-300"
                          : isStrong
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-slate-200 text-slate-700 border-slate-300"
                      )}
                    >
                      {item.accuracy}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
