import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BatchNormalizeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetNormalizeGroupId: string | null;
  totalQuestionsCount: number;
  normalizing: boolean;
  onConfirm: (groupId: string | null) => void;
}

export const BatchNormalizeModal: React.FC<BatchNormalizeModalProps> = ({
  open,
  onOpenChange,
  targetNormalizeGroupId,
  totalQuestionsCount,
  normalizing,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Xác nhận chuẩn hóa định dạng tự động
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2 text-sm text-foreground/80">
            <p>
              Hệ thống sẽ tự động quét qua{" "}
              <strong>
                {targetNormalizeGroupId
                  ? `các câu hỏi và đoạn văn trong nhóm này`
                  : `toàn bộ ${totalQuestionsCount} câu hỏi, đoạn văn và hướng dẫn`}
              </strong>{" "}
              để:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
              <li>Loại bỏ thẻ cỡ chữ rác, cỡ chữ to nhỏ thất thường copy từ Word/Google Docs.</li>
              <li>Đưa kích thước chữ về chuẩn hệ thống giúp học viên làm bài rõ ràng, đồng nhất.</li>
              <li>Bảo toàn nguyên vẹn chữ in đậm, in nghiêng, gạch chân, danh sách, bảng biểu và từ khóa điền khuyết.</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 pt-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={normalizing}
          >
            Hủy
          </Button>
          <Button
            onClick={() => onConfirm(targetNormalizeGroupId)}
            disabled={normalizing}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2"
          >
            {normalizing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Bắt đầu chuẩn hóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
