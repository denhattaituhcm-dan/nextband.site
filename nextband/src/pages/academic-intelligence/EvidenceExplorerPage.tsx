import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { academicIntelligenceApi } from "@/lib/api";
import {
  User,
  FileText,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Network,
  Stethoscope,
  Cpu,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EvidenceExplorerPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [studentSearch, setStudentSearch] = useState("");

  // 1. Fetch Students
  const { data: students = [], isLoading: isLoadingStudents } = useQuery({
    queryKey: ["academic-intelligence-students"],
    queryFn: academicIntelligenceApi.getStudents,
  });

  // 2. Fetch Submissions for selected student
  const {
    data: submissions = [],
    isLoading: isLoadingSubmissions,
  } = useQuery({
    queryKey: ["academic-intelligence-student-submissions", selectedStudentId],
    queryFn: () => academicIntelligenceApi.getStudentSubmissions(selectedStudentId!),
    enabled: !!selectedStudentId,
  });

  // 3. Fetch Provenance Chain for selected submission
  const {
    data: provenance,
    isLoading: isLoadingProvenance,
  } = useQuery({
    queryKey: ["academic-intelligence-submission-provenance", selectedSubmissionId],
    queryFn: () => academicIntelligenceApi.getSubmissionProvenance(selectedSubmissionId!),
    enabled: !!selectedSubmissionId,
  });

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-blue-500/40 text-blue-400 bg-blue-500/10 font-mono text-[10px]">
            PHASE B • EVIDENCE EXPLORER
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Chain of Provenance Inspector</span>
        </div>
        <h1 className="text-2xl font-bold text-white mt-1.5 font-mono">Evidence Explorer</h1>
        <p className="text-sm text-slate-400 mt-1">
          Drill-down trực tiếp theo chuỗi:{" "}
          <span className="text-slate-200 font-mono">
            Học sinh → Bài nộp → Câu hỏi → Câu trả lời → Chấm điểm → Bằng chứng vi kỹ năng → Chẩn đoán lỗi
          </span>
        </p>
      </div>

      {/* Step 1 & Step 2 Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Step 1: Chọn Học Sinh */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <User className="h-4 w-4 text-blue-400" />
                <span>1. Chọn Học Sinh ({students.length})</span>
              </CardTitle>
              <Badge variant="outline" className="text-[10px] border-slate-700 bg-slate-900 text-slate-400 font-mono">
                Student Directory
              </Badge>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <Input
                placeholder="Tìm theo tên hoặc email..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="pl-8 bg-slate-950 border-slate-800 text-xs h-8 text-slate-200 placeholder:text-slate-600"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingStudents ? (
              <div className="text-xs text-slate-500 py-6 text-center">Đang tải danh sách học sinh...</div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-xs text-slate-500 py-6 text-center">Không có học sinh nào.</div>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                {filteredStudents.map((stu) => {
                  const isSelected = selectedStudentId === stu.id;
                  return (
                    <button
                      key={stu.id}
                      type="button"
                      onClick={() => {
                        setSelectedStudentId(stu.id);
                        setSelectedSubmissionId(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-md border transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? "bg-blue-950/50 border-blue-600 text-white"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-medium truncate">{stu.fullName}</div>
                        <div className="text-[10px] text-slate-500 truncate font-mono">{stu.email}</div>
                      </div>
                      <div className="text-right shrink-0 font-mono text-[10px] text-slate-400 space-y-0.5">
                        <div>Submissions: <span className="text-white">{stu.submissionCount}</span></div>
                        <div>Evidence: <span className="text-emerald-400">{stu.evidenceCount}</span></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Chọn Bài Nộp (Submission) */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>2. Chọn Bài Nộp ({submissions.length})</span>
              </CardTitle>
              <Badge variant="outline" className="text-[10px] border-slate-700 bg-slate-900 text-slate-400 font-mono">
                Exam Submissions
              </Badge>
            </div>
            <CardDescription className="text-xs text-slate-400">
              {selectedStudentId ? "Chọn bài nộp để inspect chuỗi mắt xích" : "Hãy chọn học sinh ở bước 1 trước"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedStudentId ? (
              <div className="text-xs text-slate-600 py-10 text-center italic">
                Chưa chọn học sinh
              </div>
            ) : isLoadingSubmissions ? (
              <div className="text-xs text-slate-500 py-6 text-center">Đang tải danh sách bài nộp...</div>
            ) : submissions.length === 0 ? (
              <div className="text-xs text-slate-500 py-6 text-center">Học sinh chưa có bài nộp nào.</div>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                {submissions.map((sub) => {
                  const isSelected = selectedSubmissionId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubmissionId(sub.id)}
                      className={`w-full text-left p-2.5 rounded-md border transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? "bg-cyan-950/50 border-cyan-600 text-white"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-medium truncate">{sub.examTitle}</div>
                        <div className="text-[10px] text-slate-500 truncate font-mono">
                          ID: {sub.id.substring(0, 13)}... • {sub.examType}
                        </div>
                      </div>
                      <div className="text-right shrink-0 font-mono text-[10px] space-y-0.5">
                        <div className="text-white font-bold">
                          {sub.score !== null ? `${sub.score} pts` : "Chưa chấm"}
                        </div>
                        <div className="text-slate-400">
                          {sub.correctAnswers}/{sub.totalQuestions} đúng
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Step 3: Provenance Chain Viewer */}
      {selectedSubmissionId && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white font-mono">
                Chain of Provenance Detail
              </h2>
            </div>
            {provenance && (
              <span className="text-xs text-slate-400 font-mono">
                {provenance.chain.length} câu hỏi • {provenance.masterySnapshots.length} kỹ năng liên đới
              </span>
            )}
          </div>

          {isLoadingProvenance ? (
            <Card className="border-slate-800 bg-slate-900/60 p-8 text-center text-xs text-slate-500">
              Đang truy xuất chuỗi mắt xích bằng chứng từ database...
            </Card>
          ) : !provenance ? (
            <Card className="border-slate-800 bg-slate-900/60 p-8 text-center text-xs text-slate-500">
              Không tìm thấy dữ liệu bằng chứng cho bài nộp này.
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Submission Metadata Strip */}
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 font-mono">
                <div>
                  <span className="text-slate-400">Học sinh: </span>
                  <span className="text-white font-bold">{provenance.student.fullName || provenance.student.email}</span>
                </div>
                <div>
                  <span className="text-slate-400">Bài thi: </span>
                  <span className="text-white font-bold">{provenance.submission.examTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400">Kết quả: </span>
                  <span className="text-emerald-400 font-bold">{provenance.submission.totalScore} pts</span>
                  <span className="text-slate-500"> ({provenance.submission.correctAnswers}/{provenance.submission.totalQuestions} đúng)</span>
                </div>
              </div>

              {/* Questions Drill-down Accordion-like list */}
              <div className="space-y-3">
                {provenance.chain.map((item, idx) => {
                  return (
                    <Card key={item.questionId} className="border-slate-800 bg-slate-900/70 overflow-hidden">
                      <CardHeader className="py-3 px-4 bg-slate-950/60 border-b border-slate-800/80">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            <Badge variant="outline" className="text-[10px] font-mono border-slate-700 text-slate-400">
                              {item.questionType}
                            </Badge>
                            {item.evaluation.isCorrect ? (
                              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px] gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Đúng
                              </Badge>
                            ) : (
                              <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/40 text-[10px] gap-1">
                                <XCircle className="h-3 w-3" /> Sai
                              </Badge>
                            )}
                          </div>

                          <div className="text-xs font-mono text-slate-400">
                            Điểm: <span className="text-white font-bold">{item.evaluation.scoreAwarded}/{item.evaluation.maxScore}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 space-y-3 text-xs">
                        {/* Question & Answer Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-3 rounded border border-slate-800/80">
                          <div>
                            <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                              Nội Dung Câu Hỏi (Raw Question)
                            </div>
                            <div className="text-slate-200 mt-1 font-sans">{item.questionText}</div>
                            {item.correctAnswer && (
                              <div className="mt-2 text-[11px] text-slate-400 font-mono">
                                Đáp án chuẩn: <span className="text-emerald-400 font-bold">{item.correctAnswer}</span>
                              </div>
                            )}
                          </div>

                          <div className="border-t md:border-t-0 md:border-l border-slate-800/80 pt-2 md:pt-0 md:pl-3">
                            <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                              Bài Làm Học Sinh (Raw Answer)
                            </div>
                            <div className="text-slate-200 mt-1 font-mono font-medium">
                              {item.answer.answerText ? (
                                `"${item.answer.answerText}"`
                              ) : item.answer.audioUrl ? (
                                <span className="text-purple-400 italic">[Tệp ghi âm Speaking]</span>
                              ) : (
                                <span className="text-slate-500 italic">[Để trống]</span>
                              )}
                            </div>
                            {item.answer.feedback && (
                              <div className="mt-2 text-[11px] text-slate-400">
                                Nhận xét: <span className="text-slate-300">{item.answer.feedback}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Skill Evidence & Question Tags */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-slate-400 font-semibold">
                            <Network className="h-3 w-3 text-emerald-400" />
                            <span>Vi Kỹ Năng Liên Đới (Question Tags & Normalized Evidences)</span>
                          </div>

                          {item.skillEvidences.length === 0 ? (
                            <div className="text-[11px] text-slate-500 italic pl-2">
                              Câu hỏi này chưa gắn QuestionSkillTag (không sinh ra StudentSkillEvidence).
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.skillEvidences.map((se) => (
                                <div
                                  key={se.id}
                                  className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono flex items-center justify-between"
                                >
                                  <div>
                                    <div className="text-emerald-400 font-semibold">{se.skillCode}</div>
                                    <div className="text-[10px] text-slate-400 truncate max-w-[200px] font-sans">
                                      {se.skillName || "Micro-skill node"}
                                    </div>
                                  </div>
                                  <div className="text-right text-[10px] space-y-0.5">
                                    <div>Outcome: <span className="text-white font-bold">{se.outcome}</span></div>
                                    <div className="text-slate-500">Weight: {se.weight}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Diagnostic Hypothesis if any */}
                        {item.diagnostic && (
                          <div className="p-2.5 rounded bg-teal-950/30 border border-teal-800/60 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Stethoscope className="h-3.5 w-3.5 text-teal-400" />
                                <span className="font-bold text-teal-300 font-mono text-[11px]">
                                  {item.diagnostic.errorCode} ({item.diagnostic.errorName || "Bẫy lỗi học thuật"})
                                </span>
                              </div>
                              <Badge variant="outline" className="text-[9px] border-teal-700 text-teal-300 font-mono">
                                Rule: {item.diagnostic.ruleCode} • Conf: {item.diagnostic.confidence}
                              </Badge>
                            </div>
                            {item.diagnostic.evidenceSnippet && (
                              <p className="text-[11px] text-slate-300 pl-5 italic">
                                Trích đoạn: "{item.diagnostic.evidenceSnippet}"
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Related Student Model Mastery Snapshots */}
              {provenance.masterySnapshots.length > 0 && (
                <Card className="border-slate-800 bg-slate-900/80 mt-6">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-purple-400" />
                      Vector Năng Lực Học Sinh Liên Đới (Student Skill Mastery Snapshots)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400">
                      Tham số phân phối Bayesian Beta tương ứng của học sinh này trên các vi kỹ năng vừa kiểm tra.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {provenance.masterySnapshots.map((m) => (
                        <div key={m.skillCode} className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                          <div className="text-purple-300 font-bold truncate">{m.skillCode}</div>
                          <div className="text-[10px] text-slate-400 truncate font-sans">{m.skillName}</div>
                          <div className="grid grid-cols-2 gap-1 text-[10px] pt-1 border-t border-slate-900 text-slate-400">
                            <div>α: <span className="text-white font-bold">{m.alphaSuccess.toFixed(1)}</span></div>
                            <div>β: <span className="text-white font-bold">{m.betaFailure.toFixed(1)}</span></div>
                            <div>Mean: <span className="text-emerald-400 font-bold">{m.posteriorMean.toFixed(3)}</span></div>
                            <div>N: <span className="text-cyan-400 font-bold">{m.totalEvidence}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
