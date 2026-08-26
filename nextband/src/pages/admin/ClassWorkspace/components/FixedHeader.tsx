import React, { useState } from "react";
import { useWorkspace } from "../WorkspaceProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, GraduationCap, MapPin, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassGraduationModal } from "@/components/admin/ClassGraduationModal";

export const FixedHeader: React.FC = () => {
  const {
    classData,
    openAddStudentModal,
  } = useWorkspace();
  const navigate = useNavigate();
  const [graduationModalOpen, setGraduationModalOpen] = useState(false);

  const activeStudents = classData?.activeStudents || [];
  const studentsCount = activeStudents.length || classData?.studentCount || 0;
  const teacherName = classData?.teacher?.fullName || "Chưa phân công";
  const courseTitle = classData?.course?.title || (classData?.target_band ? `Target Band ${classData.target_band}` : null);

  return (
    <div className="bg-background border-b pb-3 pt-2 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/classes")}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {classData?.name || "Lớp học"}
              </h1>
              {classData?.status && (
                <Badge variant="outline" className="text-[10px] font-normal uppercase">
                  {classData.status}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium">
              <span>{teacherName}</span>
              <span>·</span>
              <span>{studentsCount} học viên</span>
              {courseTitle && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <GraduationCap className="h-3 w-3 text-primary" />
                    {courseTitle}
                  </span>
                </>
              )}
              {classData?.branch && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    {classData.branch.name}
                    {classData.room && ` (${classData.room.name})`}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Top Right Action: Graduation Summary & Primary Action */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={classData?.status === "CLOSED" || classData?.isActive === false ? "secondary" : "outline"}
            onClick={() => setGraduationModalOpen(true)}
            className={cn(
              "h-8 text-xs gap-1.5 font-bold shadow-2xs",
              classData?.status !== "CLOSED" && classData?.isActive !== false && "border-amber-400 text-amber-900 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700"
            )}
          >
            <Award className="h-3.5 w-3.5 text-amber-600" />
            {classData?.status === "CLOSED" || classData?.isActive === false ? "Báo cáo tốt nghiệp" : "Tổng kết & Đóng lớp"}
          </Button>

          {classData?.status !== "CLOSED" && classData?.isActive !== false && (
            <Button
              size="sm"
              onClick={() => openAddStudentModal()}
              className="h-8 text-xs gap-1.5 bg-primary font-semibold shadow-2xs"
            >
              <UserPlus className="h-3.5 w-3.5" />
              + Thêm học viên
            </Button>
          )}
        </div>
      </div>

      {classData?.id && (
        <ClassGraduationModal
          classId={classData.id}
          isOpen={graduationModalOpen}
          onClose={() => setGraduationModalOpen(false)}
          isAlreadyClosed={classData?.status === "CLOSED" || classData?.isActive === false}
        />
      )}
    </div>
  );
};
