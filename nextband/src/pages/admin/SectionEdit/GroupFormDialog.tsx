import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { QuestionGroup } from "./types";

interface GroupFormDialogProps {
  open: boolean;
  onClose: (saved: boolean) => void;
  editingGroup: QuestionGroup | null;
  groupForm: {
    title: string;
    passage: string;
    instructions: string;
    audioUrl: string;
    orderIndex: number;
  };
  setGroupForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      passage: string;
      instructions: string;
      audioUrl: string;
      orderIndex: number;
    }>
  >;
  onSave: () => void;
  isPending: boolean;
}

export const GroupFormDialog: React.FC<GroupFormDialogProps> = ({
  open,
  onClose,
  editingGroup,
  groupForm,
  setGroupForm,
  onSave,
  isPending,
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent className="max-w-[96vw] sm:max-w-[980px]">
        <DialogHeader>
          <DialogTitle>
            {editingGroup ? "Cập nhật nhóm" : "Thêm nhóm mới"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 space-y-2">
              <Label>Tiêu đề nhóm (Passage title, Section header...)</Label>
              <Input
                value={groupForm.title}
                onChange={(e) =>
                  setGroupForm((f) => ({ ...f, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Thứ tự</Label>
              <Input
                type="number"
                value={groupForm.orderIndex}
                onChange={(e) =>
                  setGroupForm((f) => ({
                    ...f,
                    orderIndex: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hướng dẫn nhóm (Instructions)</Label>
            <RichTextEditor
              value={groupForm.instructions}
              onChange={(html) =>
                setGroupForm((f) => ({ ...f, instructions: html }))
              }
              minHeight={100}
            />
          </div>

          <div className="space-y-2">
            <Label>Audio nhóm (Không bắt buộc)</Label>
            <FileUpload
              accept="audio/*"
              currentUrl={groupForm.audioUrl}
              onUploadComplete={(url) =>
                setGroupForm((f) => ({ ...f, audioUrl: url }))
              }
              onRemove={() => setGroupForm((f) => ({ ...f, audioUrl: "" }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Nội dung chính / Đoạn văn (Passage)</Label>
            <RichTextEditor
              value={groupForm.passage}
              onChange={(html) =>
                setGroupForm((f) => ({ ...f, passage: html }))
              }
              minHeight={250}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>
            Hủy
          </Button>
          <Button onClick={onSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu nhóm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
