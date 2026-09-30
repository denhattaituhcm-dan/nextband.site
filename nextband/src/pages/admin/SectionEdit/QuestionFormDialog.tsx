import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { QuestionFormRenderer } from "@/components/admin/question-forms";
import { Question, getQuestionTypesForSection } from "./types";

interface QuestionFormDialogProps {
  open: boolean;
  onClose: (saved: boolean) => void;
  editingQuestion: Question | null;
  sectionType: string;
  questionForm: {
    questionText: string;
    questionType: string;
    options: string[] | null;
    correctAnswer: string;
    fillBlankAnswers: string[];
    points: number;
    audioUrl: string;
    orderIndex: number;
  };
  setQuestionForm: React.Dispatch<
    React.SetStateAction<{
      questionText: string;
      questionType: string;
      options: string[] | null;
      correctAnswer: string;
      fillBlankAnswers: string[];
      points: number;
      audioUrl: string;
      orderIndex: number;
    }>
  >;
  onQuestionTypeChange: (newType: string) => void;
  onSave: () => void;
  isPending: boolean;
}

export const QuestionFormDialog: React.FC<QuestionFormDialogProps> = ({
  open,
  onClose,
  editingQuestion,
  sectionType,
  questionForm,
  setQuestionForm,
  onQuestionTypeChange,
  onSave,
  isPending,
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent className="max-w-[96vw] sm:max-w-[980px] h-[90vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>
            {editingQuestion ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Dạng câu hỏi</Label>
                {sectionType === "general" && (
                  <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                    ⚡ Phần thi Grammar: Chỉ áp dụng trắc nghiệm tự động chấm
                  </span>
                )}
                {sectionType === "writing" && (
                  <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                    ✍️ Phần thi Writing: Chỉ áp dụng Bài luận / Viết dài (Chấm thủ công theo tiêu chí IELTS)
                  </span>
                )}
              </div>
              <Select
                value={questionForm.questionType}
                onValueChange={onQuestionTypeChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getQuestionTypesForSection(sectionType).map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mx-auto w-full max-w-2xl">
              <QuestionFormRenderer
                questionType={questionForm.questionType}
                form={questionForm as any}
                onChange={(updates) =>
                  setQuestionForm((f) => ({ ...f, ...updates }))
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={() => onClose(false)}>
            Hủy
          </Button>
          <Button onClick={onSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu câu hỏi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
