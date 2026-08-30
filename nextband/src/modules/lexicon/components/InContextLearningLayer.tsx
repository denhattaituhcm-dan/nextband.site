import React, { useState, useCallback } from "react";
import { useInContextSelection } from "../hooks/useInContextSelection";
import { InContextActionPill } from "./InContextActionPill";
import { InContextPopover } from "./InContextPopover";
import { lexiconApi } from "../services/lexiconClient";
import { ContextualLearningPayload } from "../types";
import { useToast } from "@/hooks/use-toast";

interface InContextLearningLayerProps {
  /** Canonical content ref from host page/component (e.g. "hw_12_passage_1") */
  sourceContentRef: string;
  /** Explicit override to disable feature in exam modes */
  isExamMode?: boolean;
  children: React.ReactNode;
}

export const InContextLearningLayer: React.FC<InContextLearningLayerProps> = ({
  sourceContentRef,
  isExamMode = false,
  children,
}) => {
  const { selectionState, clearSelection } = useInContextSelection(!isExamMode);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContextualLearningPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleUnderstand = useCallback(async () => {
    if (!selectionState.selectedText || !selectionState.rect) return;

    setPopoverOpen(true);
    setLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const res = await lexiconApi.understand({
        selection: selectionState.selectedText,
        contextSnippet: selectionState.contextSnippet,
        sourceContentRef,
      });

      setData(res);
      setIsSaved(!!res.isSaved);
    } catch (err: any) {
      setError(err?.message || "Không thể phân tích ngữ cảnh từ vựng lúc này.");
    } finally {
      setLoading(false);
    }
  }, [selectionState, sourceContentRef]);

  const handleSave = useCallback(async () => {
    if (!data || isSaved) return;

    try {
      await lexiconApi.saveMemory({
        normalizedTerm: data.normalizedTerm,
        sourceContentRef,
        contextText: selectionState.contextSnippet,
      });

      setIsSaved(true);
      toast({
        title: "Đã lưu vào bộ nhớ học tập!",
        description: `Từ "${data.normalizedTerm}" đã được đưa vào kho cá nhân của bạn.`,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Lỗi lưu từ",
        description: err?.message || "Không thể lưu từ vào lúc này.",
      });
    }
  }, [data, isSaved, sourceContentRef, selectionState.contextSnippet, toast]);

  const handleClose = useCallback(() => {
    setPopoverOpen(false);
    setData(null);
    setError(null);
    clearSelection();
  }, [clearSelection]);

  return (
    <div className="relative inline-block w-full">
      {children}

      {/* Pill action button when valid text selected */}
      {!isExamMode && selectionState.isValid && !popoverOpen && (
        <InContextActionPill
          rect={selectionState.rect}
          onUnderstand={handleUnderstand}
        />
      )}

      {/* Popover Card */}
      {!isExamMode && popoverOpen && (
        <InContextPopover
          rect={selectionState.rect}
          selectedText={selectionState.selectedText}
          loading={loading}
          data={data}
          error={error}
          onClose={handleClose}
          onSave={handleSave}
          isSaved={isSaved}
        />
      )}
    </div>
  );
};
