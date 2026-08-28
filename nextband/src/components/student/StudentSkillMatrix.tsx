import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  MessageSquareQuote,
  ArrowRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { SkillMastery } from "@/lib/studentJourney";

interface StudentSkillMatrixProps {
  skills: SkillMastery[];
  latestSubmission?: any;
}

export function StudentSkillMatrix({
  skills,
  latestSubmission,
}: StudentSkillMatrixProps) {
  const navigate = useNavigate();

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case "Listening":
        return <Headphones className="w-3.5 h-3.5" />;
      case "Reading":
        return <BookOpen className="w-3.5 h-3.5" />;
      case "Writing":
        return <PenTool className="w-3.5 h-3.5" />;
      case "Speaking":
        return <Mic className="w-3.5 h-3.5" />;
      default:
        return <TrendingUp className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* ── Left Card: Tiến trình 4 Kỹ Năng (5 cols) ── */}
      <Card className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-slate-900">
                Năng Lực Kỹ Năng
              </h2>
              <p className="text-[11px] text-slate-500">
                Thước đo band chuẩn hoá
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/app/my-submissions")}
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold h-8 gap-1"
          >
            Lịch sử <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Skill Bars List */}
        <div className="space-y-3.5 pt-1">
          {skills.map((item) => {
            const isNeedFocus = item.needsFocus;
            return (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <span className="text-slate-400">{getSkillIcon(item.skill)}</span>
                    <span>{item.skill}</span>
                    {isNeedFocus && (
                      <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[9px] px-1.5 py-0 h-4 font-bold">
                        Trọng tâm
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="font-bold text-slate-900">Band {item.currentBand.toFixed(1)}</span>
                    <span className="text-slate-400">/ 9.0</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isNeedFocus
                        ? "bg-amber-500"
                        : "bg-slate-700"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Right Card: Nhận Xét & Phân Tích Lỗi Sư Phạm (7 cols) ── */}
      <Card className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs flex flex-col justify-between space-y-4">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm md:text-base font-bold text-slate-900">
                  Ghi Chú & Nhận Xét Giáo Viên Gần Nhất
                </h2>
                <p className="text-[11px] text-slate-500">
                  Báo cáo chiến thuật sửa lỗi
                </p>
              </div>
            </div>

            {latestSubmission?.score !== undefined && (
              <Badge className="bg-slate-900 text-white border-0 text-xs font-mono font-bold px-2.5 py-0.5">
                Band {latestSubmission.score}
              </Badge>
            )}
          </div>

          {/* Feedback Content Box */}
          {latestSubmission ? (
            <div className="rounded-xl bg-slate-50/80 border border-slate-200 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <FileCheck2 className="w-4 h-4 text-slate-600" />
                <span>{latestSubmission.examTitle || latestSubmission.title || "Bài tập Writing Task 2 gần nhất"}</span>
              </div>

              <div className="relative pl-3.5 border-l-2 border-slate-400 space-y-1">
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{latestSubmission.teacherFeedback || latestSubmission.feedback || "Luận điểm ở Body 1 triển khai thuyết phục, tuy nhiên cần cải thiện độ mạch lạc (Cohesion) và sử dụng đa dạng các cấu trúc câu phức để nâng tiêu chí Grammatical Accuracy."}"
                </p>
              </div>

              {/* 4 Tiêu chí IELTS Breakdown Mini */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-200/70 text-[11px]">
                <div className="bg-white rounded-lg p-1.5 border border-slate-200/80 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">TR</div>
                  <div className="font-bold text-slate-800">6.0</div>
                </div>
                <div className="bg-white rounded-lg p-1.5 border border-slate-200/80 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">CC</div>
                  <div className="font-bold text-amber-700">5.5 (Cần sửa)</div>
                </div>
                <div className="bg-white rounded-lg p-1.5 border border-slate-200/80 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">LR</div>
                  <div className="font-bold text-slate-800">6.0</div>
                </div>
                <div className="bg-white rounded-lg p-1.5 border border-slate-200/80 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">GRA</div>
                  <div className="font-bold text-slate-800">5.5</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-center text-xs text-slate-500 space-y-2">
              <AlertCircle className="w-5 h-5 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">Chưa có nhận xét nào được ghi nhận</p>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Hãy hoàn thành bài tập trong danh sách nhiệm vụ để giáo viên tiến hành chấm điểm và đưa ra nhận xét sửa lỗi chi tiết.
              </p>
            </div>
          )}
        </div>

        {/* Footer Link */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/app/my-submissions")}
          className="w-full text-xs font-semibold h-9 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5"
        >
          <span>Xem lại toàn bộ bài đã chấm & phản hồi giáo viên</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </Button>
      </Card>
    </div>
  );
}
