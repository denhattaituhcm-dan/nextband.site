import React from "react";
import { formatStorageUrl } from "@/lib/api";
import { parseMatchingData } from "@/components/exam/MatchingRenderer";
import { parseFillBlankAnswers } from "@/components/admin/question-forms";
import { RichContent } from "@/components/exam/RichContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GripVertical,
  Headphones,
  Edit,
  Trash2,
  Plus,
  Zap,
  Sparkles,
  Loader2,
} from "lucide-react";
import { QuestionGroup, Question, ALL_QUESTION_TYPES, getQuestionTypesForSection } from "./types";

interface QuestionGroupItemProps {
  group: QuestionGroup;
  section: any;
  draggedQuestion: { groupId: string; questionId: string } | null;
  dragOverQuestionId: string | null;
  setDraggedQuestion: (val: { groupId: string; questionId: string } | null) => void;
  setDragOverQuestionId: (val: string | null) => void;
  onQuestionReorderDrop: (targetGroupId: string, targetQuestionId: string) => void;
  onOpenGroupDialog: (group: QuestionGroup) => void;
  onDeleteGroupPrompt: (group: { id: string; title: string }) => void;
  onOpenQuestionDialog: (groupId: string, question?: Question) => void;
  onDeleteQuestionPrompt: (question: { id: string; text: string }) => void;
  onOpenNormalizeGroupModal: (groupId: string) => void;
  // Bulk import props
  bulkImportGroupId: string | null;
  setBulkImportGroupId: (val: string | null) => void;
  bulkImportText: string;
  setBulkImportText: (val: string) => void;
  bulkImportType: string;
  setBulkImportType: (val: string) => void;
  showBulkPreview: boolean;
  setShowBulkPreview: (val: boolean) => void;
  parsedBulkQuestions: any[];
  onBulkImport: () => void;
  isBulkImportPending: boolean;
}

export const QuestionGroupItem: React.FC<QuestionGroupItemProps> = ({
  group,
  section,
  draggedQuestion,
  dragOverQuestionId,
  setDraggedQuestion,
  setDragOverQuestionId,
  onQuestionReorderDrop,
  onOpenGroupDialog,
  onDeleteGroupPrompt,
  onOpenQuestionDialog,
  onDeleteQuestionPrompt,
  onOpenNormalizeGroupModal,
  bulkImportGroupId,
  setBulkImportGroupId,
  bulkImportText,
  setBulkImportText,
  bulkImportType,
  setBulkImportType,
  showBulkPreview,
  setShowBulkPreview,
  parsedBulkQuestions,
  onBulkImport,
  isBulkImportPending,
}) => {
  return (
    <AccordionItem
      key={group.id}
      value={group.id}
      className="border rounded-lg px-4"
    >
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex items-center justify-between w-full pr-4 text-left">
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <span className="font-bold text-sm">
                {group.title || "Nhóm câu hỏi (không tiêu đề)"}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px]">
                  {group.questions?.length || 0} câu hỏi
                </Badge>
                <span className="text-[10px] text-muted-foreground font-mono">
                  #{group.orderIndex}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onOpenNormalizeGroupModal(group.id);
              }}
              className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-medium"
              title="Chuẩn hóa định dạng nhóm câu hỏi này"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1 text-amber-500" /> Chuẩn hóa nhóm
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onOpenGroupDialog(group);
              }}
            >
              <Edit className="h-4 w-4 mr-1" /> Sửa
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteGroupPrompt({
                  id: group.id,
                  title: group.title || "Nhóm này",
                });
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4 pb-6 border-t mt-2">
        {/* Group Audio (For Listening sections) */}
        {(group.audioUrl || (group as any).audio_url) && (
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-center gap-3">
            <Headphones className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <audio
                src={formatStorageUrl(group.audioUrl || (group as any).audio_url)}
                controls
                className="h-8 w-full outline-none"
              />
            </div>
          </div>
        )}

        {/* Group Content (Passage or Instructions) */}
        {group.passage && (
          <div className="mb-4 p-4 bg-muted/50 rounded-lg prose prose-sm max-w-none">
            <div className="text-[10px] uppercase text-muted-foreground font-bold mb-2">
              Passage / Nội dung:
            </div>
            <RichContent html={group.passage} variant="passage" />
          </div>
        )}

        {group.instructions && (
          <div className="mb-4 p-3 bg-white border-orange-500/50 border rounded-lg text-sm text-black font-semibold shadow-sm">
            <div className="text-[10px] uppercase text-orange-600 font-bold mb-1 opacity-70">
              Hướng dẫn:
            </div>
            <RichContent html={group.instructions} />
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-3 pl-4 border-l-2 border-primary/10 ml-2">
          {(group.questions || [])
            .sort(
              (a: any, b: any) =>
                (a.orderIndex || 0) - (b.orderIndex || 0),
            )
            .map((q: any, qIndex: number) => {
              const isBeingDragged = draggedQuestion?.questionId === q.id;
              const isDragOver = dragOverQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", q.id);
                    e.dataTransfer.effectAllowed = "move";
                    setDraggedQuestion({ groupId: group.id, questionId: q.id });
                  }}
                  onDragEnd={() => {
                    setDraggedQuestion(null);
                    setDragOverQuestionId(null);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    if (draggedQuestion && draggedQuestion.groupId === group.id && draggedQuestion.questionId !== q.id) {
                      setDragOverQuestionId(q.id);
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverQuestionId === q.id) {
                      setDragOverQuestionId(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    onQuestionReorderDrop(group.id, q.id);
                  }}
                  className={`flex items-start gap-3 p-3 border rounded-lg transition-all bg-card ${
                    isBeingDragged
                      ? "opacity-40 border-dashed border-primary/50 bg-primary/5 scale-[0.99]"
                      : isDragOver
                        ? "border-2 border-primary bg-primary/10 shadow-md ring-2 ring-primary/20"
                        : "hover:bg-muted/30"
                  }`}
                >
                  <div
                    className="flex-shrink-0 flex flex-col items-center gap-1.5 mt-0.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors"
                    title="Kéo thả để đổi thứ tự câu hỏi"
                  >
                    <GripVertical className="h-4 w-4" />
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shadow-xs">
                      {qIndex + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-clamp-2 prose prose-sm max-w-none">
                      <RichContent html={q.question_text || q.questionText || "Nội dung câu hỏi"} />
                    </div>
                    {/* Display Options / Matching items / Fill-in-the-blank answers */}
                    {(() => {
                      const qType = q.question_type || q.questionType;
                      if (qType === "matching") {
                        const { items, options, pairs } = parseMatchingData(q);
                        if (items.length > 0 || options.length > 0) {
                          return (
                            <div className="mt-2 space-y-2 text-xs text-muted-foreground bg-teal-50/40 dark:bg-teal-950/20 p-2.5 rounded border border-teal-200/50">
                              {items.length > 0 && (
                                <div>
                                  <span className="font-semibold text-teal-800 dark:text-teal-300 block mb-1.5">
                                    Danh sách câu hỏi (vế trái) & Đáp án nối:
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-1">
                                    {items.map((item, i) => {
                                      const optIdx = pairs[String(i)];
                                      const matchedOpt = optIdx !== undefined ? options[optIdx] : null;
                                      return (
                                        <div
                                          key={i}
                                          className="flex items-center gap-1.5 text-foreground bg-white dark:bg-neutral-900 px-2 py-1 rounded border border-teal-100 dark:border-teal-900"
                                        >
                                          <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">
                                            {i + 1}.
                                          </span>
                                          <span className="truncate flex-1 font-medium">
                                            {item.text || `(Câu ${i + 1})`}
                                          </span>
                                          <span className="font-bold text-teal-700 dark:text-teal-300 shrink-0 bg-teal-100 dark:bg-teal-900/60 px-1.5 py-0.5 rounded text-[11px]">
                                            {matchedOpt ? `→ ${matchedOpt.label}` : "Chưa nối"}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {options.length > 0 && (
                                <div className="pt-2 border-t border-teal-200/40 dark:border-teal-900/40">
                                  <span className="font-semibold text-teal-800 dark:text-teal-300 block mb-1.5">
                                    Các lựa chọn (vế phải):
                                  </span>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pl-1">
                                    {options.map((opt) => (
                                      <div
                                        key={opt.index}
                                        className="flex items-center gap-1.5 text-muted-foreground bg-white dark:bg-neutral-900 px-2 py-1 rounded border border-teal-100/60 dark:border-teal-900/40"
                                      >
                                        <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">
                                          {opt.label}.
                                        </span>
                                        <span className="truncate flex-1">{opt.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      }

                      if (qType === "fill_blank") {
                        const fbAnswers = parseFillBlankAnswers(q.correctAnswer || q.correct_answer);
                        if (fbAnswers.length > 0) {
                          return (
                            <div className="mt-2 text-xs bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 p-2 rounded border border-amber-200/50 flex items-center gap-2">
                              <span className="font-semibold shrink-0">Đáp án điền:</span>
                              <span className="font-mono bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                {fbAnswers.join(" | ")}
                              </span>
                            </div>
                          );
                        }
                      }

                      if (Array.isArray(q.options) && q.options.length > 0) {
                        return (
                          <div className="mt-2 space-y-1 text-xs text-muted-foreground bg-muted/20 p-2 rounded border">
                            {q.options.map((opt: string, optIdx: number) => (
                              <div key={optIdx} className="flex items-center gap-1.5">
                                <span className="font-semibold text-primary">
                                  {String.fromCharCode(65 + optIdx)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    })()}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 h-4"
                      >
                        {ALL_QUESTION_TYPES.find(
                          (t) => t.value === (q.question_type || q.questionType),
                        )?.label || q.question_type || q.questionType}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {q.points} điểm
                      </span>
                      {q.audioUrl && (
                        <Badge className="bg-blue-500 h-4 px-1.5">
                          <Headphones className="h-2 w-2 mr-1" />{" "}
                          Audio
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        onOpenQuestionDialog(group.id, q)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() =>
                        onDeleteQuestionPrompt({
                          id: q.id,
                          text: (q.questionText || q.question_text || "").replace(
                            /<[^>]*>/g,
                            "",
                          ),
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}

          {/* Question Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-dashed h-9"
              onClick={() => onOpenQuestionDialog(group.id)}
            >
              <Plus className="mr-2 h-4 w-4" /> Thêm câu hỏi
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-dashed h-9"
              onClick={() => {
                setBulkImportGroupId(group.id);
                setBulkImportText("");
                setBulkImportType("auto");
                setShowBulkPreview(true);
              }}
            >
              <Zap className="mr-2 h-4 w-4" /> Nhập nhanh
            </Button>
          </div>

          {/* Bulk import inline panel */}
          {bulkImportGroupId === group.id && (
            <Card className="border-2 border-primary/30 bg-primary/5 mt-3 shadow-xs">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        Nhập nhanh câu hỏi thông minh
                        <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">
                          Tự động nhận diện
                        </Badge>
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Hỗ trợ nhận diện số câu (1., 2.), các lựa chọn (a., b., c., d. hoặc A, B, C, D) và đáp án đúng.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-full hover:bg-muted"
                    onClick={() => setBulkImportGroupId(null)}
                  >
                    ✕
                  </Button>
                </div>

                <Textarea
                  placeholder={`Ví dụ dán vào đây:\n2. I ___ this book three times, but I still find it interesting.\na. read\nb. am reading\n*c. have read\nd. had read\n\n3. She hasn't seen her cousin ___ last year.\nA. since\nB. for\nC. in\nD. from\nĐáp án: A`}
                  value={bulkImportText}
                  onChange={(e) => setBulkImportText(e.target.value)}
                  rows={8}
                  className="font-mono text-xs bg-white resize-y"
                />

                {/* Live Parser Statistics & Preview */}
                {bulkImportText.trim() && (
                  <div className="bg-white rounded-lg p-3 border text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          Đã nhận diện: {parsedBulkQuestions.length} câu hỏi
                        </span>
                        {parsedBulkQuestions.length > 0 && (
                          <span className="text-muted-foreground text-[11px]">
                            ({parsedBulkQuestions.filter((q) => q.questionType === "multiple_choice").length} trắc nghiệm,{" "}
                            {parsedBulkQuestions.filter((q) => q.questionType !== "multiple_choice").length} tự luận/khác)
                          </span>
                        )}
                      </div>
                      {parsedBulkQuestions.length > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[11px] px-2 text-primary hover:bg-primary/5"
                          onClick={() => setShowBulkPreview(!showBulkPreview)}
                        >
                          {showBulkPreview ? "Ẩn xem trước" : "Xem trước chi tiết"}
                        </Button>
                      )}
                    </div>

                    {showBulkPreview && parsedBulkQuestions.length > 0 && (
                      <div className="max-h-48 overflow-y-auto space-y-2 pt-2 border-t border-border/50">
                        {parsedBulkQuestions.map((pq, idx) => (
                          <div key={idx} className="bg-muted/30 p-2 rounded border text-[11px] space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-foreground">
                                Câu {pq.questionNumber || idx + 1}: {pq.questionText}
                              </span>
                              <Badge variant="outline" className="text-[9px] shrink-0 bg-background">
                                {ALL_QUESTION_TYPES.find((t) => t.value === pq.questionType)?.label || pq.questionType}
                              </Badge>
                            </div>
                            {pq.options && pq.options.length > 0 && (
                              <div className="grid grid-cols-2 gap-1 text-muted-foreground pl-2 text-[10px]">
                                {pq.options.map((opt: string, oIdx: number) => (
                                  <div
                                    key={oIdx}
                                    className={`flex items-center gap-1 ${
                                      pq.correctAnswer === opt ? "text-emerald-600 font-semibold" : ""
                                    }`}
                                  >
                                    <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                                    {pq.correctAnswer === opt && (
                                      <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 rounded">✓ Đáp án</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-xs whitespace-nowrap font-medium">
                      Dạng:
                    </Label>
                    <Select
                      value={bulkImportType}
                      onValueChange={setBulkImportType}
                    >
                      <SelectTrigger className="h-8 text-xs bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">
                          ✨ Tự động nhận diện (Khuyên dùng)
                        </SelectItem>
                        {getQuestionTypesForSection(
                          section.sectionType,
                        ).map((t) => (
                          <SelectItem
                            key={t.value}
                            value={t.value}
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    size="sm"
                    onClick={onBulkImport}
                    disabled={
                      parsedBulkQuestions.length === 0 ||
                      isBulkImportPending
                    }
                    className="font-bold gap-1.5 shadow-xs"
                  >
                    {isBulkImportPending && (
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    )}
                    Tạo {parsedBulkQuestions.length} câu
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
