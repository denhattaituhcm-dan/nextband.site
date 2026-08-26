import React from "react";
import { ReadingCase } from "../types";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, RotateCcw, Award, Compass, BookOpen, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CrimeSceneBlueprint } from "./CrimeSceneBlueprint";

interface CaseAutopsyProps {
  readingCase: ReadingCase;
  taskAnswers: Record<string, string>;
  selectedEvidenceSentence: string | null;
  finalHypothesis: string | null;
  selectedEvidenceIds: string[];
  onRetry: () => void;
}

export const CaseAutopsyView: React.FC<CaseAutopsyProps> = ({
  readingCase,
  taskAnswers,
  selectedEvidenceSentence,
  finalHypothesis,
  selectedEvidenceIds,
  onRetry,
}) => {
  // Score calculations
  const task1Correct = taskAnswers["task-01"] === "B";
  const task2Correct = taskAnswers["task-02"] === "C";
  const task3Correct = taskAnswers["task-03"] === "A";
  const task4ProveCorrect =
    selectedEvidenceSentence?.includes("850-meter ice sheet") ||
    selectedEvidenceSentence?.includes("drained directly to the bedrock") ||
    false;

  const hypothesisCorrect = finalHypothesis === "hyp-2";

  // Check required evidence: ev-02 & ev-03
  const evidence1Correct = selectedEvidenceIds.includes("ev-02");
  const evidence2Correct = selectedEvidenceIds.includes("ev-03");
  const evidenceCorrect =
    evidence1Correct &&
    evidence2Correct &&
    selectedEvidenceIds.length === 2;

  const isFullMastery =
    task1Correct &&
    task2Correct &&
    task3Correct &&
    task4ProveCorrect &&
    hypothesisCorrect &&
    evidenceCorrect;

  const isOverInference = hypothesisCorrect && !evidenceCorrect;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-stone-900 animate-in fade-in duration-300 font-sans">
      {/* Header Banner */}
      <div
        className={`rounded-2xl border p-6 sm:p-8 text-center shadow-xs transition-all ${
          isFullMastery
            ? "border-emerald-200 bg-emerald-50 text-emerald-950"
            : isOverInference
            ? "border-amber-200 bg-amber-50 text-amber-950"
            : "border-stone-200 bg-white text-stone-900"
        }`}
      >
        <div className="inline-flex items-center justify-center rounded-full p-3 mb-3 bg-stone-100/80">
          {isFullMastery ? (
            <Award className="h-10 w-10 text-emerald-600" />
          ) : isOverInference ? (
            <AlertTriangle className="h-10 w-10 text-amber-600" />
          ) : (
            <Compass className="h-10 w-10 text-primary" />
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
            {readingCase.level.realm_name_vi} · IELTS Band {readingCase.level.ielts_band.toFixed(1)}
          </span>
          <span className="text-xs text-amber-500">★★☆☆</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 mb-2">
          SCIENTIFIC AUTOPSY: {readingCase.title.toUpperCase()}
        </h1>

        <p className="text-sm font-medium text-stone-600 max-w-xl mx-auto">
          {isFullMastery
            ? "Tuyệt vời! Bạn đã kết luận chính xác cơ chế nứt gãy thủy lực ngầm (Hydro-Fracturing) dựa trên dữ liệu cảm biến thực địa."
            : isOverInference
            ? "Bạn đã chọn đúng cơ chế, nhưng các bằng chứng đối chiếu chưa đầy đủ (Cần chú ý đối chiếu dữ liệu nhiệt độ đá đáy)."
            : "Chưa giải mã hoàn tất hồ sơ. Hãy chú ý đối chiếu mâu thuẫn giữa giả thuyết nhiệt địa chất và số liệu cảm biến thực tế."}
        </p>
      </div>

      {/* Grid Diagnostic */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Left Column: Skills Breakdown */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
            <BookOpen className="h-5 w-5 text-sky-600" />
            Bảng Chẩn Đoán Năng Lực Đọc (Reading Skills)
          </h2>

          <div className="space-y-3 text-sm">
            {/* Task 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div>
                <p className="font-bold text-stone-800">1. Locating Specific Detail (Task 1)</p>
                <p className="text-xs text-stone-500">Quét chi tiết gờ băng không có dấu hiệu tràn nước</p>
              </div>
              {task1Correct ? (
                <span className="flex items-center text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Đạt
                </span>
              ) : (
                <span className="flex items-center text-xs font-bold text-rose-600">
                  <XCircle className="h-4 w-4 mr-1" /> Chưa đạt
                </span>
              )}
            </div>

            {/* Task 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div>
                <p className="font-bold text-stone-800">2. Cross-Source Matching (Task 2)</p>
                <p className="text-xs text-stone-500">Đối chiếu mâu thuẫn giữa Giả thuyết & Cảm biến</p>
              </div>
              {task2Correct ? (
                <span className="flex items-center text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Đạt
                </span>
              ) : (
                <span className="flex items-center text-xs font-bold text-rose-600">
                  <XCircle className="h-4 w-4 mr-1" /> Chưa đạt
                </span>
              )}
            </div>

            {/* Task 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div>
                <p className="font-bold text-stone-800">3. Boundary-Restricted Inference (Task 3)</p>
                <p className="text-xs text-stone-500">Suy luận chính xác dữ liệu sóng xung kích 03:12</p>
              </div>
              {task3Correct ? (
                <span className="flex items-center text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Đạt
                </span>
              ) : (
                <span className="flex items-center text-xs font-bold text-rose-600">
                  <XCircle className="h-4 w-4 mr-1" /> Chưa đạt
                </span>
              )}
            </div>

            {/* Task 4 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div>
                <p className="font-bold text-stone-800">4. Text-Grounded Evidence (Task 4 - Prove)</p>
                <p className="text-xs text-stone-500">Trích dẫn câu văn xác nhận khe nứt sâu 850m tới đá đáy</p>
              </div>
              {task4ProveCorrect ? (
                <span className="flex items-center text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Đạt
                </span>
              ) : (
                <span className="flex items-center text-xs font-bold text-rose-600">
                  <XCircle className="h-4 w-4 mr-1" /> Chưa đạt
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning & Traps */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Bóc Tách Bẫy Tư Duy Khoa Học (Traps & Takeaways)
          </h2>

          <div className="space-y-3">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                ⚠️ Bẫy #1: Tin vào lời giải thích chưa kiểm chứng (Unverified Hypothesis)
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">
                Lời giải thích của nhà nghiên cứu (Dr. Vance) cho rằng nhiệt lòng đất làm tan băng đáy, nhưng dữ liệu cảm biến thực nghiệm chứng minh đá đáy vẫn ở mức -1.8°C. Không được xem giả thuyết là sự thật (Fact) khi chưa đối chiếu số liệu.
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-3.5 border border-stone-200">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                💡 Quy Tắc IELTS Reading Cốt Lõi:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-stone-700">
                <li>Chỉ chọn đáp án được xác nhận trực tiếp bằng dữ liệu và câu chữ trong bài đọc.</li>
                <li>Luôn phân biệt rõ ràng giữa <em>Quan sát thực tế (Observation)</em>, <em>Giả thuyết cá nhân (Hypothesis)</em> và <em>Dữ liệu cảm biến khách quan (Sensor Data)</em>.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Post-Submission Spatial Artifact: Glaciological Cross-Section */}
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <MapIcon className="h-5 w-5 text-sky-600" />
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Sơ Đồ Địa Chất Cắt Ngang: Cơ Chế Nứt Gãy Thủy Lực (Hydro-Fracturing Resolution)
            </h2>
            <p className="text-xs text-stone-500">
              Mô hình cắt ngang 850m tầng băng giải thích hiện tượng thoát nước tốc độ cao từ hồ mặt xuống mạng lưới thủy văn đáy băng.
            </p>
          </div>
        </div>
        <CrimeSceneBlueprint />
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-6">
        <Button
          variant="outline"
          onClick={onRetry}
          className="w-full sm:w-auto border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-xs cursor-pointer"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Mở lại hồ sơ vụ án (Re-open Dossier)
        </Button>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <Button asChild variant="ghost" className="w-full sm:w-auto text-stone-600 hover:text-stone-900 hover:bg-stone-100">
            <Link to="/reading">
              Về Thư viện Reading
            </Link>
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Link to="/login?redirect=/reading/case-002">
              Lưu Tiến Trình & Mở Case #002
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
