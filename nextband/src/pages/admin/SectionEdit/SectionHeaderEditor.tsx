import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/admin/FileUpload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { sectionIcons, sectionColors } from "./types";

interface SectionHeaderEditorProps {
  section: any;
  totalQuestionsCount: number;
  normalizing: boolean;
  onOpenNormalizeModal: () => void;
  onUpdateSection: (data: any) => void;
  localInstructions: string | null;
  setLocalInstructions: (val: string) => void;
  localAudioScript: string | null;
  setLocalAudioScript: (val: string) => void;
}

export const SectionHeaderEditor: React.FC<SectionHeaderEditorProps> = ({
  section,
  totalQuestionsCount,
  normalizing,
  onOpenNormalizeModal,
  onUpdateSection,
  localInstructions,
  setLocalInstructions,
  localAudioScript,
  setLocalAudioScript,
}) => {
  const navigate = useNavigate();

  const Icon =
    sectionIcons[section.sectionType as keyof typeof sectionIcons] ||
    sectionIcons.general;
  const colorClass =
    sectionColors[section.sectionType as keyof typeof sectionColors] ||
    sectionColors.general;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (section.examId) {
                navigate(`/admin/exams/${section.examId}?tab=sections`);
              } else {
                navigate(-1);
              }
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={colorClass}>
                <Icon className="mr-1 h-3 w-3" />
                {(section.sectionType || "").toUpperCase()}
              </Badge>
              {section.examTitle && (
                <span className="text-sm text-muted-foreground italic">
                  / {section.examTitle}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold">{section.title}</h1>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenNormalizeModal}
          disabled={normalizing || totalQuestionsCount === 0}
          className="gap-2 border-amber-500/40 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 font-semibold shadow-xs"
        >
          {normalizing ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
          ) : (
            <Sparkles className="h-4 w-4 text-amber-500" />
          )}
          <span>Chuẩn hóa toàn bộ ({totalQuestionsCount})</span>
        </Button>
      </div>

      {/* Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cài đặt Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {section.sectionType === "listening" && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>File Audio chính (Listening)</Label>
                  <FileUpload
                    accept="audio/*"
                    currentUrl={section.audioUrl || undefined}
                    onUploadComplete={(url) => onUpdateSection({ audioUrl: url })}
                    onRemove={() => onUpdateSection({ audioUrl: "" })}
                    maxSizeMB={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Thời gian (phút)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={section.durationMinutes || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        onUpdateSection({
                          durationMinutes: isNaN(val) ? 0 : val,
                        });
                      }}
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      phút
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transcript audio (chỉ hiển thị sau khi nộp)</Label>
                <RichTextEditor
                  placeholder="Nhập toàn bộ script khớp với audio..."
                  value={
                    localAudioScript !== null
                      ? localAudioScript
                      : section.audioScript || ""
                  }
                  onChange={(html) => setLocalAudioScript(html)}
                  minHeight={140}
                />
                <p className="text-xs text-muted-foreground">
                  Script chỉ được gửi xuống client sau khi thí sinh nộp bài để xem lại.
                </p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Hướng dẫn chung cho Section</Label>
            <RichTextEditor
              placeholder="Nhập hướng dẫn cho toàn bộ section..."
              value={
                localInstructions !== null
                  ? localInstructions
                  : section.instructions || ""
              }
              onChange={(html) => setLocalInstructions(html)}
              minHeight={100}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
