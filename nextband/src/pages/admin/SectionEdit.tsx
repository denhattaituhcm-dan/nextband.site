import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionsApi, questionsApi, uploadsApi, formatStorageUrl } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import {
  parseFillBlankAnswers,
  stringifyFillBlankAnswers,
} from "@/components/admin/question-forms";
import { sanitizeQuestionPayload } from "@/lib/questionNormalizer";
import { parseSmartBulkQuestions } from "@/lib/smartQuestionParser";
import { normalizeQuestionHtml } from "@/lib/htmlNormalizer";
import {
  QuestionGroup,
  Question,
  getErrorMessage,
  getQuestionTypesForSection,
  SectionHeaderEditor,
  QuestionGroupList,
  BatchNormalizeModal,
  GroupFormDialog,
  QuestionFormDialog,
} from "./SectionEdit/index";


export default function AdminSectionEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<QuestionGroup | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Image Cleanup Tracking
  const pendingImagesRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ url: string }>;
      pendingImagesRef.current.push(customEvent.detail.url);
    };
    window.addEventListener("rich-text-image-uploaded", handler);
    return () => window.removeEventListener("rich-text-image-uploaded", handler);
  }, []);

  const cleanupImages = useCallback((retainedHtmlStrings: (string | undefined | null)[]) => {
    if (pendingImagesRef.current.length === 0) return;
    const combinedHtml = retainedHtmlStrings.filter(Boolean).join(" ");
    
    const orphans = pendingImagesRef.current.filter(url => !combinedHtml.includes(url));
    orphans.forEach(url => {
      uploadsApi.deleteFile(url).catch(console.error);
    });
    
    pendingImagesRef.current = [];
  }, []);

  // Bulk import states
  const [bulkImportGroupId, setBulkImportGroupId] = useState<string | null>(
    null,
  );
  const [bulkImportText, setBulkImportText] = useState("");
  const [bulkImportType, setBulkImportType] = useState("auto");
  const [showBulkPreview, setShowBulkPreview] = useState(true);

  // Delete states
  const [deleteGroup, setDeleteGroup] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deleteQuestion, setDeleteQuestion] = useState<{
    id: string;
    text: string;
  } | null>(null);

  // Drag and Drop questions state
  const [draggedQuestion, setDraggedQuestion] = useState<{ groupId: string; questionId: string } | null>(null);
  const [dragOverQuestionId, setDragOverQuestionId] = useState<string | null>(null);

  // Form states
  const [groupForm, setGroupForm] = useState({
    title: "",
    passage: "",
    instructions: "",
    audioUrl: "",
    orderIndex: 0,
  });
  const [questionForm, setQuestionForm] = useState<{
    questionText: string;
    questionType: string;
    options: string[] | null;
    correctAnswer: string;
    fillBlankAnswers: string[];
    points: number;
    audioUrl: string;
    orderIndex: number;
  }>({
    questionText: "",
    questionType: "multiple_choice",
    options: ["", "", "", ""],
    correctAnswer: "",
    fillBlankAnswers: [""],
    points: 1,
    audioUrl: "",
    orderIndex: 0,
  });

  // Batch Normalization states
  const [normalizing, setNormalizing] = useState(false);
  const [normalizeConfirmOpen, setNormalizeConfirmOpen] = useState(false);
  const [targetNormalizeGroupId, setTargetNormalizeGroupId] = useState<string | null>(null);

  const { data: sectionData, isLoading: sectionLoading } = useQuery({
    queryKey: ["section-detail", id],
    queryFn: () => sectionsApi.getById(id!),
    enabled: !!id,
  });

  const section = sectionData;
  const questionGroups = useMemo(() => {
    return section?.question_groups || section?.questionGroups || [];
  }, [section]);

  const totalQuestionsCount = useMemo(() => {
    return questionGroups.reduce((acc: number, g: any) => acc + (g.questions?.length || 0), 0);
  }, [questionGroups]);

  const getNextOrderIndexForGroup = (groupId: string) => {
    const group = questionGroups.find((g: any) => g.id === groupId);
    const questions = Array.isArray(group?.questions) ? group.questions : [];
    if (questions.length === 0) return 0;

    const maxOrder = questions.reduce((max: number, q: any) => {
      const value =
        typeof q?.orderIndex === "number"
          ? q.orderIndex
          : Number.parseInt(String(q?.orderIndex ?? 0), 10) || 0;
      return Math.max(max, value);
    }, -1);

    return maxOrder + 1;
  };

  // --- Mutations ---

  const createGroupMutation = useMutation({
    mutationFn: async (data: any) =>
      questionsApi.createGroup({ ...data, sectionId: id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      closeGroupDialog(true);
      toast({ title: "Đã thêm nhóm câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: getErrorMessage(error, "Không thể thêm nhóm câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: async ({ id: groupId, ...data }: any) =>
      questionsApi.updateGroup(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      closeGroupDialog(true);
      toast({ title: "Đã cập nhật nhóm câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: getErrorMessage(error, "Không thể cập nhật nhóm câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: (groupId: string) => questionsApi.deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      setDeleteGroup(null);
      toast({ title: "Đã xóa nhóm câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: getErrorMessage(error, "Không thể xóa nhóm câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const createQuestionMutation = useMutation({
    mutationFn: async (data: any) => {
      const finalData = { ...data };
      if (data.questionType === "fill_blank" && Array.isArray(data.fillBlankAnswers)) {
        finalData.correctAnswer = stringifyFillBlankAnswers(
          data.fillBlankAnswers,
        );
      }
      return questionsApi.create(finalData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      closeQuestionDialog(true);
      toast({ title: "Đã thêm câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi tạo câu hỏi",
        description: getErrorMessage(error, "Không thể thêm câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({ id: questionId, ...data }: any) => {
      const finalData = { ...data };
      if (data.questionType === "fill_blank" && Array.isArray(data.fillBlankAnswers)) {
        finalData.correctAnswer = stringifyFillBlankAnswers(
          data.fillBlankAnswers,
        );
      }
      return questionsApi.update(questionId, finalData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      closeQuestionDialog(true);
      toast({ title: "Đã cập nhật câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi cập nhật câu hỏi",
        description: getErrorMessage(error, "Không thể cập nhật câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: (questionId: string) => questionsApi.delete(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      setDeleteQuestion(null);
      toast({ title: "Đã xóa câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: getErrorMessage(error, "Không thể xóa câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const reorderQuestionsMutation = useMutation({
    mutationFn: ({ groupId, questionIds }: { groupId: string; questionIds: string[] }) =>
      questionsApi.reorder(groupId, questionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      toast({ title: "Đã lưu thứ tự câu hỏi" });
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      toast({
        title: "Lỗi sắp xếp",
        description: getErrorMessage(error, "Không thể thay đổi thứ tự câu hỏi"),
        variant: "destructive",
      });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: (data: any) => sectionsApi.update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: getErrorMessage(error, "Không thể cập nhật Section"),
        variant: "destructive",
      });
    },
  });

  const parsedBulkQuestions = useMemo(() => {
    return parseSmartBulkQuestions(bulkImportText, {
      fallbackType: bulkImportType,
      sectionType: section?.sectionType,
    });
  }, [bulkImportText, bulkImportType, section?.sectionType]);

  const bulkImportMutation = useMutation({
    mutationFn: async ({ groupId, text, questionType }: any) => {
      const parsed = parseSmartBulkQuestions(text, {
        fallbackType: questionType,
        sectionType: section?.sectionType,
      });
      if (parsed.length === 0) {
        throw new Error("Không tìm thấy câu hỏi nào hợp lệ để nhập.");
      }
      const startOrderIndex = getNextOrderIndexForGroup(groupId);
      const payload = parsed.map((item, idx) => ({
        questionType: item.questionType,
        questionText: item.questionText,
        options: item.options,
        correctAnswer: item.correctAnswer,
        points: item.points || 1,
        orderIndex: startOrderIndex + idx,
      }));
      return questionsApi.bulkCreate(groupId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      setBulkImportGroupId(null);
      setBulkImportText("");
      toast({ title: "Đã nhập thành công các câu hỏi" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi nhập liệu",
        description: getErrorMessage(error, "Có lỗi xảy ra khi tạo câu hỏi hàng loạt"),
        variant: "destructive",
      });
    },
  });

  // Local state for auto-saving fields to prevent cursor jumps
  const [localInstructions, setLocalInstructions] = useState<string | null>(
    null,
  );
  const [localAudioScript, setLocalAudioScript] = useState<string | null>(null);

  useEffect(() => {
    if (sectionData && localInstructions === null) {
      setLocalInstructions(sectionData.instructions || "");
    }
  }, [sectionData, localInstructions]);

  useEffect(() => {
    if (sectionData && localAudioScript === null) {
      setLocalAudioScript(sectionData.audioScript || "");
    }
  }, [sectionData, localAudioScript]);

  useEffect(() => {
    if (localInstructions === null || !sectionData) return;
    if (localInstructions !== (sectionData.instructions || "")) {
      const timer = setTimeout(() => {
        updateSectionMutation.mutate({ instructions: localInstructions });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [localInstructions, sectionData, updateSectionMutation]);

  useEffect(() => {
    if (localAudioScript === null || !sectionData) return;
    if (localAudioScript !== (sectionData.audioScript || "")) {
      const timer = setTimeout(() => {
        updateSectionMutation.mutate({ audioScript: localAudioScript });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [localAudioScript, sectionData, updateSectionMutation]);

  // --- Handlers ---

  const closeGroupDialog = (saved: boolean) => {
    setGroupDialogOpen(false);
    if (saved) {
      cleanupImages([groupForm.passage, groupForm.instructions]);
    } else {
      cleanupImages([editingGroup?.passage, editingGroup?.instructions]);
    }
  };

  const closeQuestionDialog = (saved: boolean) => {
    setQuestionDialogOpen(false);
    if (saved) {
      cleanupImages([questionForm.questionText]);
    } else {
      cleanupImages([editingQuestion?.questionText]);
    }
  };

  const handleOpenGroupDialog = (group?: QuestionGroup) => {
    pendingImagesRef.current = [];
    if (group) {
      setEditingGroup(group);
      setGroupForm({
        title: group.title || "",
        passage: group.passage || "",
        instructions: group.instructions || "",
        audioUrl: group.audioUrl || "",
        orderIndex: group.orderIndex || 0,
      });
    } else {
      setEditingGroup(null);
      setGroupForm({
        title: "",
        passage: "",
        instructions: "",
        audioUrl: "",
        orderIndex: questionGroups.length,
      });
    }
    setGroupDialogOpen(true);
  };

  const handleQuestionTypeChange = (newType: string) => {
    setQuestionForm((f) => {
      let nextOptions: any = null;
      let nextCorrectAnswer = "";
      let nextFillBlankAnswers = [""];

      if (newType === "multiple_choice") {
        nextOptions =
          Array.isArray(f.options) && f.options.length >= 2
            ? f.options
            : ["", "", "", ""];
        nextCorrectAnswer = "";
      } else if (newType === "fill_blank") {
        nextOptions = null;
        nextFillBlankAnswers = [""];
        nextCorrectAnswer = "";
      } else if (newType === "matching") {
        nextOptions = null;
        nextCorrectAnswer = JSON.stringify({
          items: ["", ""],
          options: ["", ""],
          pairs: {},
        });
      } else if (
        newType === "true_false_not_given" ||
        newType === "yes_no_not_given"
      ) {
        nextOptions = null;
        nextCorrectAnswer = "";
      } else {
        // short_answer, essay, speaking
        nextOptions = null;
        nextCorrectAnswer = "";
      }

      return {
        ...f,
        questionType: newType,
        options: nextOptions,
        correctAnswer: nextCorrectAnswer,
        fillBlankAnswers: nextFillBlankAnswers,
      };
    });
  };

  const handleOpenQuestionDialog = (groupId: string, question?: Question) => {
    pendingImagesRef.current = [];
    setSelectedGroupId(groupId);
    if (question) {
      const normalizedOrderIndex =
        question.orderIndex ?? (question as any).order_index ?? 0;
      setEditingQuestion(question);
      setQuestionForm({
        questionText: question.questionText || "",
        questionType: question.questionType,
        options: question.questionType === "multiple_choice" && Array.isArray(question.options)
          ? (question.options as string[])
          : question.questionType === "multiple_choice"
            ? ["", "", "", ""]
            : null as any,
        correctAnswer: question.correctAnswer || "",
        fillBlankAnswers:
          question.questionType === "fill_blank"
            ? parseFillBlankAnswers(question.correctAnswer)
            : [""],
        points: question.points || 1,
        audioUrl: (question as any).audioUrl || "",
        orderIndex: normalizedOrderIndex,
      });
    } else {
      setEditingQuestion(null);
      const allowedTypes = getQuestionTypesForSection(
        section?.sectionType || "general",
      );
      const defaultType =
        section?.sectionType === "speaking"
          ? "speaking"
          : section?.sectionType === "writing"
            ? "essay"
            : allowedTypes[0]?.value || "multiple_choice";

      const groupCount =
        questionGroups.find((g: any) => g.id === groupId)?.questions?.length ||
        0;

      setQuestionForm({
        questionText: "",
        questionType: defaultType,
        options: defaultType === "multiple_choice" ? ["", "", "", ""] : (null as any),
        correctAnswer: "",
        fillBlankAnswers: [""],
        points: 1,
        audioUrl: "",
        orderIndex: groupCount,
      });
    }
    setQuestionDialogOpen(true);
  };

  const handleSaveGroup = () => {
    if (editingGroup) {
      updateGroupMutation.mutate({ id: editingGroup.id, ...groupForm });
    } else {
      createGroupMutation.mutate(groupForm);
    }
  };

  const handleSaveQuestion = () => {
    const sanitized = sanitizeQuestionPayload(questionForm);

    if (!sanitized.questionText || sanitized.questionText.trim().length === 0) {
      toast({
        title: "Thiếu nội dung câu hỏi",
        description: "Vui lòng nhập nội dung hoặc hướng dẫn câu hỏi.",
        variant: "destructive",
      });
      return;
    }

    if (sanitized.questionType === "fill_blank") {
      sanitized.correctAnswer = stringifyFillBlankAnswers(
        questionForm.fillBlankAnswers,
      );
    }

    if (sanitized.questionType === "multiple_choice") {
      const validOpts = (sanitized.options || []).filter(
        (o) => typeof o === "string" && o.trim().length > 0,
      );
      if (validOpts.length < 2) {
        toast({
          title: "Lỗi dữ liệu",
          description: "Câu hỏi trắc nghiệm phải có ít nhất 2 lựa chọn có nội dung.",
          variant: "destructive",
        });
        return;
      }
    }

    if (sanitized.questionType === "matching") {
      let parsed: any = null;
      try {
        parsed = sanitized.correctAnswer ? JSON.parse(sanitized.correctAnswer) : null;
      } catch {}

      const rawItems: string[] = Array.isArray(parsed?.items) ? parsed.items : [];
      const rawOptions: string[] = Array.isArray(parsed?.options) ? parsed.options : [];
      const rawPairs: Record<string, string> =
        parsed?.pairs && typeof parsed.pairs === "object" ? parsed.pairs : {};

      const cleanItems = rawItems
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter(Boolean);
      const cleanOptions = rawOptions
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter(Boolean);

      if (cleanItems.length < 2 || cleanOptions.length < 2) {
        toast({
          title: "Thiếu thông tin câu hỏi nối đáp án",
          description:
            "Vui lòng nhập ít nhất 2 câu hỏi (vế trái) và 2 lựa chọn (vế phải).",
          variant: "destructive",
        });
        return;
      }

      // Check if any items are missing matching pairs
      const missingPairs: number[] = [];
      cleanItems.forEach((_, idx) => {
        if (!rawPairs[String(idx)]) {
          missingPairs.push(idx + 1);
        }
      });

      if (missingPairs.length > 0) {
        toast({
          title: "Chưa chọn đáp án nối",
          description: `Vui lòng chọn đáp án nối (A, B, C...) cho câu hỏi số: ${missingPairs.join(", ")}.`,
          variant: "destructive",
        });
        return;
      }

      sanitized.correctAnswer = JSON.stringify({
        items: cleanItems,
        options: cleanOptions,
        pairs: rawPairs,
      });
    }

    if (editingQuestion) {
      const originalOrder =
        editingQuestion.orderIndex ?? (editingQuestion as any).order_index ?? 0;
      const { orderIndex, ...rest } = sanitized;
      const updatePayload =
        orderIndex === originalOrder ? rest : { ...rest, orderIndex };

      updateQuestionMutation.mutate({
        id: editingQuestion.id,
        ...updatePayload,
      });
    } else if (selectedGroupId) {
      const nextOrderIndex = getNextOrderIndexForGroup(selectedGroupId);
      const { orderIndex: _ignoredOrderIndex, ...questionWithoutOrder } =
        sanitized;
      createQuestionMutation.mutate({
        ...questionWithoutOrder,
        groupId: selectedGroupId,
        orderIndex: nextOrderIndex,
      });
    }
  };

  const handleBulkImport = () => {
    if (!bulkImportGroupId || parsedBulkQuestions.length === 0) return;
    bulkImportMutation.mutate({
      groupId: bulkImportGroupId,
      text: bulkImportText,
      questionType: bulkImportType,
    });
  };

  const handleBatchNormalize = async (groupId?: string | null) => {
    setNormalizing(true);
    try {
      let affectedQuestions = 0;
      let affectedGroups = 0;

      const groupsToProcess = groupId
        ? questionGroups.filter((g: any) => g.id === groupId)
        : questionGroups;

      // 1. Process Section instructions if full section normalize
      if (!groupId && section?.instructions) {
        const normalizedInst = normalizeQuestionHtml(section.instructions);
        if (normalizedInst !== section.instructions) {
          await sectionsApi.update(id!, { instructions: normalizedInst });
        }
      }

      // 2. Process groups and their questions
      for (const group of groupsToProcess) {
        let groupUpdated = false;
        const groupUpdates: any = {};

        if (group.passage) {
          const normalizedPassage = normalizeQuestionHtml(group.passage);
          if (normalizedPassage !== group.passage) {
            groupUpdates.passage = normalizedPassage;
            groupUpdated = true;
          }
        }

        if (group.instructions) {
          const normalizedInst = normalizeQuestionHtml(group.instructions);
          if (normalizedInst !== group.instructions) {
            groupUpdates.instructions = normalizedInst;
            groupUpdated = true;
          }
        }

        if (groupUpdated) {
          await questionsApi.updateGroup(group.id, groupUpdates);
          affectedGroups++;
        }

        // Process questions in group
        for (const question of group.questions || []) {
          const qText = question.questionText || (question as any).question_text;
          if (qText) {
            const normalizedText = normalizeQuestionHtml(qText);
            if (normalizedText !== qText) {
              await questionsApi.update(question.id, { questionText: normalizedText });
              affectedQuestions++;
            }
          }
        }
      }

      await queryClient.invalidateQueries({ queryKey: ["section-detail", id] });
      toast({
        title: "Chuẩn hóa định dạng hoàn tất",
        description: `Đã chuẩn hóa ${affectedQuestions} câu hỏi và ${affectedGroups} nhóm nội dung.`,
      });
    } catch (error: any) {
      toast({
        title: "Lỗi chuẩn hóa",
        description: getErrorMessage(error, "Không thể chuẩn hóa câu hỏi"),
        variant: "destructive",
      });
    } finally {
      setNormalizing(false);
      setNormalizeConfirmOpen(false);
      setTargetNormalizeGroupId(null);
    }
  };

  const handleQuestionReorderDrop = (targetGroupId: string, targetQuestionId: string) => {
    if (!draggedQuestion) return;
    const { groupId: sourceGroupId, questionId: sourceQuestionId } = draggedQuestion;
    setDraggedQuestion(null);
    setDragOverQuestionId(null);

    // Only allow reordering within the same group
    if (sourceGroupId !== targetGroupId || sourceQuestionId === targetQuestionId) {
      return;
    }

    const group = questionGroups.find((g: any) => g.id === targetGroupId);
    if (!group || !Array.isArray(group.questions)) return;

    const sortedQuestions = [...group.questions].sort(
      (a: any, b: any) => (a.orderIndex || 0) - (b.orderIndex || 0)
    );

    const fromIndex = sortedQuestions.findIndex((q: any) => q.id === sourceQuestionId);
    const toIndex = sortedQuestions.findIndex((q: any) => q.id === targetQuestionId);

    if (fromIndex === -1 || toIndex === -1) return;

    // Rearrange array
    const updated = [...sortedQuestions];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    const newQuestionIds = updated.map((q: any) => q.id);
    reorderQuestionsMutation.mutate({ groupId: targetGroupId, questionIds: newQuestionIds });
  };

  if (sectionLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-muted-foreground text-lg">Section không tồn tại</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Settings */}
      <SectionHeaderEditor
        section={section}
        totalQuestionsCount={totalQuestionsCount}
        normalizing={normalizing}
        onOpenNormalizeModal={() => {
          setTargetNormalizeGroupId(null);
          setNormalizeConfirmOpen(true);
        }}
        onUpdateSection={(data) => updateSectionMutation.mutate(data)}
        localInstructions={localInstructions}
        setLocalInstructions={setLocalInstructions}
        localAudioScript={localAudioScript}
        setLocalAudioScript={setLocalAudioScript}
      />

      {/* Question Groups */}
      <QuestionGroupList
        questionGroups={questionGroups || []}
        section={section}
        draggedQuestion={draggedQuestion}
        dragOverQuestionId={dragOverQuestionId}
        setDraggedQuestion={setDraggedQuestion}
        setDragOverQuestionId={setDragOverQuestionId}
        onQuestionReorderDrop={handleQuestionReorderDrop}
        onOpenGroupDialog={handleOpenGroupDialog}
        onDeleteGroupPrompt={(grp) => setDeleteGroup(grp)}
        onOpenQuestionDialog={handleOpenQuestionDialog}
        onDeleteQuestionPrompt={(q) => setDeleteQuestion(q)}
        onOpenNormalizeGroupModal={(groupId) => {
          setTargetNormalizeGroupId(groupId);
          setNormalizeConfirmOpen(true);
        }}
        bulkImportGroupId={bulkImportGroupId}
        setBulkImportGroupId={setBulkImportGroupId}
        bulkImportText={bulkImportText}
        setBulkImportText={setBulkImportText}
        bulkImportType={bulkImportType}
        setBulkImportType={setBulkImportType}
        showBulkPreview={showBulkPreview}
        setShowBulkPreview={setShowBulkPreview}
        parsedBulkQuestions={parsedBulkQuestions}
        onBulkImport={handleBulkImport}
        isBulkImportPending={bulkImportMutation.isPending}
      />

      {/* Group Form Dialog */}
      <GroupFormDialog
        open={groupDialogOpen}
        onClose={closeGroupDialog}
        editingGroup={editingGroup}
        groupForm={groupForm}
        setGroupForm={setGroupForm}
        onSave={handleSaveGroup}
        isPending={createGroupMutation.isPending || updateGroupMutation.isPending}
      />

      {/* Question Form Dialog */}
      <QuestionFormDialog
        open={questionDialogOpen}
        onClose={closeQuestionDialog}
        editingQuestion={editingQuestion}
        sectionType={section.sectionType}
        questionForm={questionForm}
        setQuestionForm={setQuestionForm}
        onQuestionTypeChange={handleQuestionTypeChange}
        onSave={handleSaveQuestion}
        isPending={createQuestionMutation.isPending || updateQuestionMutation.isPending}
      />

      <DeleteConfirmDialog
        open={!!deleteGroup}
        onOpenChange={(open) => !open && setDeleteGroup(null)}
        onConfirm={() =>
          deleteGroup && deleteGroupMutation.mutate(deleteGroup.id)
        }
        title="Xóa nhóm?"
        description={`Bạn có chắc muốn xóa nhóm "${deleteGroup?.title}"?`}
        loading={deleteGroupMutation.isPending}
      />

      <DeleteConfirmDialog
        open={!!deleteQuestion}
        onOpenChange={(open) => !open && setDeleteQuestion(null)}
        onConfirm={() =>
          deleteQuestion && deleteQuestionMutation.mutate(deleteQuestion.id)
        }
        title="Xóa câu hỏi?"
        description="Câu hỏi này sẽ bị xóa khỏi hệ thống."
        loading={deleteQuestionMutation.isPending}
      />

      {/* Batch Normalize Confirmation Dialog */}
      <BatchNormalizeModal
        open={normalizeConfirmOpen}
        onOpenChange={setNormalizeConfirmOpen}
        targetNormalizeGroupId={targetNormalizeGroupId}
        totalQuestionsCount={totalQuestionsCount}
        normalizing={normalizing}
        onConfirm={handleBatchNormalize}
      />
    </div>
  );
}
