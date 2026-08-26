import React from "react";
import { ReadingCase } from "../types";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, RotateCcw, Award, Compass, BookOpen, Map as MapIcon, Sparkles } from "lucide-react";
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
  const isCase1 = readingCase.id === "case-001";

  // Dynamic score calculations based on readingCase definition
  const task1Obj = readingCase.tasks.find((t) => t.id === "task-01");
  const task2Obj = readingCase.tasks.find((t) => t.id === "task-02");
  const task3Obj = readingCase.tasks.find((t) => t.id === "task-03");
  const task4Obj = readingCase.tasks.find((t) => t.id === "task-04");

  const task1Correct = taskAnswers["task-01"] === (task1Obj && "answer" in task1Obj ? task1Obj.answer : "B");
  const task2Correct = taskAnswers["task-02"] === (task2Obj && "answer" in task2Obj ? task2Obj.answer : "C");
  const task3Correct = taskAnswers["task-03"] === (task3Obj && "answer" in task3Obj ? task3Obj.answer : "A");
  
  const task4Target = task4Obj && "target_sentence" in task4Obj ? task4Obj.target_sentence : undefined;
  const task4ProveCorrect = task4Target
    ? Boolean(
        selectedEvidenceSentence &&
          (task4Target.includes(selectedEvidenceSentence.trim().slice(0, 30)) ||
            selectedEvidenceSentence.includes(task4Target.trim().slice(0, 30)))
      )
    : false;

  const hypothesisCorrect = finalHypothesis === readingCase.final_deduction.correct_hypothesis;

  const requiredEvidenceIds = readingCase.final_deduction.correct_evidence_ids;
  const evidenceCorrect =
    selectedEvidenceIds.length === requiredEvidenceIds.length &&
    requiredEvidenceIds.every((id) => selectedEvidenceIds.includes(id));

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
          {isCase1 ? "SCIENTIFIC AUTOPSY" : "STRATEGIC AUTOPSY"}: {readingCase.title.toUpperCase()}
        </h1>

        <p className="text-sm font-medium text-stone-600 max-w-xl mx-auto">
          {isFullMastery
            ? isCase1
              ? "Tuyệt vời! Bạn đã kết luận chính xác cơ chế nứt gãy thủy lực ngầm (Hydro-Fracturing) dựa trên dữ liệu cảm biến thực địa."
              : "Tuyệt vời! Bạn đã kết luận chính xác đòn bẩy giao tiếp theo nguyên lý của Warren Buffett và đối chiếu đủ các bằng chứng cốt lõi."
            : isOverInference
            ? isCase1
              ? "Bạn đã chọn đúng cơ chế, nhưng các bằng chứng đối chiếu chưa đầy đủ (Cần chú ý đối chiếu dữ liệu nhiệt độ đá đáy)."
              : "Bạn đã chọn đúng kết luận chính, nhưng các bằng chứng đối chiếu từ 3 nguồn chưa đầy đủ."
            : isCase1
            ? "Chưa giải mã hoàn tất hồ sơ. Hãy chú ý đối chiếu mâu thuẫn giữa giả thuyết nhiệt địa chất và số liệu cảm biến thực tế."
            : "Chưa giải mã hoàn tất hồ sơ. Hãy chú ý đối chiếu mâu thuẫn giữa kỹ năng AI và kỹ năng thấu cảm giữa người với người."}
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
                <p className="text-xs text-stone-500">
                  {isCase1
                    ? "Quét chi tiết gờ băng không có dấu hiệu tràn nước"
                    : "Xác định chứng chỉ Dale Carnegie duy nhất tại văn phòng"}
                </p>
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
                <p className="text-xs text-stone-500">
                  {isCase1
                    ? "Đối chiếu mâu thuẫn giữa Giả thuyết & Cảm biến"
                    : "Đối chiếu giới hạn của AI so với khả năng xây dựng niềm tin"}
                </p>
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
                <p className="text-xs text-stone-500">
                  {isCase1
                    ? "Suy luận chính xác dữ liệu sóng xung kích 03:12"
                    : "Suy luận nguyên lý tâm lý của việc lắng nghe tích cực"}
                </p>
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
                <p className="text-xs text-stone-500">
                  {isCase1
                    ? "Trích dẫn câu văn xác nhận khe nứt sâu 850m tới đá đáy"
                    : "Trích dẫn nguyên lý khách hàng mua niềm tin và sự tự tin"}
                </p>
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
            Bóc Tách Bẫy Tư Duy & Bài Học Cốt Lõi
          </h2>

          <div className="space-y-3">
            {isCase1 ? (
              <>
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
              </>
            ) : (
              <>
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    ⚠️ Bẫy #1: Ngộ nhận về vai trò kỹ thuật trong kỷ nguyên AI
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Bẫy ngộ nhận rằng viết prompt hay công cụ kỹ thuật là yếu tố quyết định. Bài đọc chứng minh người dẫn đầu là người chuyển hóa sự phức tạp thành rõ ràng và xây dựng được niềm tin bền vững giữa con người với con người.
                  </p>
                </div>

                <div className="rounded-xl bg-stone-50 p-3.5 border border-stone-200">
                  <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                    💡 Quy Tắc Lãnh Đạo & Giao Tiếp Đòn Bẩy:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-stone-700">
                    <li>Giao tiếp không phải soft skill đơn thuần mà là <em>chiến lược kinh doanh cốt lõi</em> có tính chất lãi kép.</li>
                    <li>Khách hàng mua sự tự tin, nhà đầu tư rót vốn cho người sáng lập mà họ tin cậy.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Case-specific Post-Submission Artifact */}
      {isCase1 && (
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
      )}

      {!isCase1 && (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-white p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Executive Framework: The Buffett Communication Multiplier
              </h2>
              <p className="text-xs text-stone-500">
                Mô hình 3 thói quen giao tiếp đòn bẩy vượt trội AI — Xây dựng vốn quan hệ và niềm tin bền vững.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl bg-emerald-50/80 p-4 border border-emerald-200">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Habit #1</span>
              <h3 className="text-sm font-bold text-stone-900 mt-1">Tò Mò Thay Vì Định Kiến</h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Thay vì vội chuẩn bị phản biện, hãy đặt câu hỏi để thực sự thấu hiểu góc nhìn của đối phương.
              </p>
            </div>
            <div className="rounded-xl bg-sky-50/80 p-4 border border-sky-200">
              <span className="text-xs font-mono font-bold text-sky-700 uppercase">Habit #2</span>
              <h3 className="text-sm font-bold text-stone-900 mt-1">Phản Hồi Hàng Ngày</h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Cung cấp phản hồi liên tục, cụ thể để tạo ra sự rõ ràng (clarity) và xóa tan mọi hoang mang.
              </p>
            </div>
            <div className="rounded-xl bg-amber-50/80 p-4 border border-amber-200">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">Habit #3</span>
              <h3 className="text-sm font-bold text-stone-900 mt-1">Lắng Nghe Để Thấu Hiểu</h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                Lắng nghe trọn vẹn, không để tâm trí bận rộn suy nghĩ câu trả lời khi người khác đang nói.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-6">
        <Button
          variant="outline"
          onClick={onRetry}
          className="w-full sm:w-auto border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-xs cursor-pointer"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Mở lại hồ sơ (Re-open Dossier)
        </Button>

        <div className="flex w-full sm:w-auto items-center gap-3">
          <Button asChild variant="ghost" className="w-full sm:w-auto text-stone-600 hover:text-stone-900 hover:bg-stone-100">
            <Link to="/reading">
              Về Thư viện Reading
            </Link>
          </Button>

          {isCase1 ? (
            <Button
              asChild
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Link to="/reading/case-002">
                Lưu Tiến Trình & Mở Case #002
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer"
            >
              <Link to="/reading">
                Hoàn Thành Khảo Hạch & Về Thư Viện
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

