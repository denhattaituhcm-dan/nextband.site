import { School, GraduationCap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TeacherClassOption {
  id: string;
  name: string;
  target_band?: string | number | null;
  targetBand?: string | number | null;
  [key: string]: unknown;
}

export interface TeacherHeaderProps {
  classes: TeacherClassOption[];
  selectedClassId: string;
  onSelectClass: (classId: string) => void;
  onRefresh: () => void;
}

export function TeacherHeader({
  classes,
  selectedClassId,
  onSelectClass,
  onRefresh,
}: TeacherHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 shrink-0 flex items-center justify-between shadow-2xs z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">Teacher Workspace</h1>
            <p className="text-[11px] text-slate-500">Sổ bài tập & Chấm bài Học viên</p>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* Bộ chọn Lớp học */}
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 text-slate-400" />
          <Select value={selectedClassId} onValueChange={onSelectClass}>
            <SelectTrigger className="w-[260px] h-9 text-xs font-semibold bg-slate-50 border-slate-200">
              <SelectValue placeholder="Chọn Lớp học phụ trách..." />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id} className="text-xs">
                  {c.name} {c.target_band ? `(Target Band ${c.target_band})` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          className="h-8 text-xs text-slate-500 hover:text-slate-900"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Làm mới
        </Button>
      </div>
    </header>
  );
}
