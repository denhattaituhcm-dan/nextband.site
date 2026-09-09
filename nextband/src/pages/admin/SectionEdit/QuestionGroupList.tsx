import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionGroup, Question } from "./types";
import { QuestionGroupItem } from "./QuestionGroupItem";

interface QuestionGroupListProps {
  questionGroups: QuestionGroup[];
  section: any;
  draggedQuestion: { groupId: string; questionId: string } | null;
  dragOverQuestionId: string | null;
  setDraggedQuestion: (val: { groupId: string; questionId: string } | null) => void;
  setDragOverQuestionId: (val: string | null) => void;
  onQuestionReorderDrop: (targetGroupId: string, targetQuestionId: string) => void;
  onOpenGroupDialog: (group?: QuestionGroup) => void;
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

export const QuestionGroupList: React.FC<QuestionGroupListProps> = ({
  questionGroups,
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Nhóm câu hỏi</CardTitle>
            <CardDescription>
              Tạo các nhóm câu hỏi (Passage, Section con...)
            </CardDescription>
          </div>
          <Button
            onClick={() => onOpenGroupDialog()}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Thêm nhóm
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {questionGroups && questionGroups.length > 0 ? (
          <div className="space-y-4">
            <Accordion
              type="multiple"
              defaultValue={questionGroups.map((g: any) => g.id)}
              className="space-y-4"
            >
              {questionGroups.map((group: any) => (
                <QuestionGroupItem
                  key={group.id}
                  group={group}
                  section={section}
                  draggedQuestion={draggedQuestion}
                  dragOverQuestionId={dragOverQuestionId}
                  setDraggedQuestion={setDraggedQuestion}
                  setDragOverQuestionId={setDragOverQuestionId}
                  onQuestionReorderDrop={onQuestionReorderDrop}
                  onOpenGroupDialog={onOpenGroupDialog}
                  onDeleteGroupPrompt={onDeleteGroupPrompt}
                  onOpenQuestionDialog={onOpenQuestionDialog}
                  onDeleteQuestionPrompt={onDeleteQuestionPrompt}
                  onOpenNormalizeGroupModal={onOpenNormalizeGroupModal}
                  bulkImportGroupId={bulkImportGroupId}
                  setBulkImportGroupId={setBulkImportGroupId}
                  bulkImportText={bulkImportText}
                  setBulkImportText={setBulkImportText}
                  bulkImportType={bulkImportType}
                  setBulkImportType={setBulkImportType}
                  showBulkPreview={showBulkPreview}
                  setShowBulkPreview={setShowBulkPreview}
                  parsedBulkQuestions={parsedBulkQuestions}
                  onBulkImport={onBulkImport}
                  isBulkImportPending={isBulkImportPending}
                />
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
            <p className="text-muted-foreground mb-4">
              Chưa có nội dung nào trong section này.
            </p>
            <Button onClick={() => onOpenGroupDialog()} className="gap-2">
              <Plus className="h-4 w-4" /> Thêm nhóm câu hỏi đầu tiên
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
