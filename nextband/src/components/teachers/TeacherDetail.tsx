import React, { useState } from "react";
import { TeacherCertificateModal } from "./TeacherCertificateModal";
import { Button } from "@/components/ui/button";
import {
  Award,
  GraduationCap,
  Clock,
  BookOpen,
  ShieldCheck,
  Maximize2,
  ExternalLink,
} from "lucide-react";

interface TeacherDetailProps {
  teacher: any;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  achievement: Award,
  education: GraduationCap,
  experience: Clock,
  expertise: BookOpen,
  verification: ShieldCheck,
};

function getAchievementIcon(item: any, index: number): React.ComponentType<{ className?: string }> {
  if (typeof item === "object" && item?.type && iconMap[item.type]) {
    return iconMap[item.type];
  }

  const text = typeof item === "string" ? item : item?.text || "";
  const lower = text.toLowerCase();

  if (lower.includes("verified") || lower.includes("trf") || lower.includes("test report")) {
    return ShieldCheck;
  }
  if (lower.includes("tác giả") || lower.includes("khung") || lower.includes("phương pháp") || lower.includes("chuyên môn")) {
    return BookOpen;
  }
  if (lower.includes("năm") || lower.includes("kinh nghiệm") || lower.includes("giảng dạy")) {
    return Clock;
  }
  if (lower.includes("cử nhân") || lower.includes("sư phạm") || lower.includes("bằng") || lower.includes("thạc sĩ")) {
    return GraduationCap;
  }

  const defaultCycle = [ShieldCheck, BookOpen, Clock, GraduationCap, Award];
  return defaultCycle[index % defaultCycle.length] || ShieldCheck;
}

export function TeacherDetail({ teacher }: TeacherDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trfImage = teacher.trf_image_url || teacher.certificate?.image;
  const certificateData = trfImage
    ? {
        image: trfImage,
        alt: teacher.certificate?.alt || `IELTS Test Report Form - ${teacher.name}`,
      }
    : null;

  const rawAchievements: any[] = Array.isArray(teacher.achievements)
    ? teacher.achievements
    : [];

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm flex flex-col justify-between">
      <div className="space-y-5">
        {/* Header: Teacher Name & Role */}
        <div className="space-y-1.5 border-b border-border/60 pb-3 sm:pb-4">
          <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            {teacher.name}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-brand-blue">
            {teacher.role}
          </p>
        </div>

        {/* Evidence-Based Badges: Verified Credentials & Grading Volume */}
        <div className="grid grid-cols-2 gap-3 py-1">
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-left">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Chứng Chỉ Quốc Tế</span>
            <span className="font-extrabold text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              IELTS {teacher.ielts_badge || "8.0+"} Verified
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-left">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Bằng Chứng Thực Tế</span>
            <span className="font-extrabold text-xs sm:text-sm text-blue-950 flex items-center gap-1.5 mt-0.5">
              <BookOpen className="h-4 w-4 text-blue-600 shrink-0" />
              {teacher.grading_count || "1,200+"} bài chấm 1:1
            </span>
          </div>
        </div>

        {/* Credentials / Key Points (Concise & Evidence-Based) */}
        {rawAchievements.length > 0 && (
          <div className="space-y-2.5">
            <ul className="space-y-2">
              {rawAchievements.slice(0, 3).map((item, index) => {
                const IconComponent = getAchievementIcon(item, index);
                const textContent = typeof item === "string" ? item : item?.text || "";

                return (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                    <div className="p-1 rounded-md bg-brand-blue-soft text-brand-blue mt-0.5 shrink-0">
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                    <span className="leading-snug font-medium">{textContent}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Certificate Section: Full TRF Scan Frame */}
        {certificateData && (
          <div className="space-y-3 pt-2 border-t border-border/60">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-black text-foreground tracking-tight">
                Bảng điểm thi IELTS
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-blue-hover gap-1.5 h-8 px-2.5 rounded-lg hover:bg-brand-blue-soft"
              >
                <span>Phóng to</span>
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Full Vertical TRF Image Preview */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsModalOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              className="relative group rounded-2xl overflow-hidden border border-border/80 bg-white cursor-pointer shadow-2xs w-full flex items-center justify-center transition-all hover:border-brand-blue hover:shadow-md"
            >
              <img
                src={certificateData.image}
                alt={certificateData.alt}
                loading="lazy"
                className="w-full h-auto max-h-[680px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-bold backdrop-blur-[1px]">
                <Maximize2 className="h-4 w-4" />
                <span>Phóng to Bảng điểm TRF chính thức</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional Review Link */}
      {teacher.reviewLink && (
        <div className="pt-4 border-t border-border/60">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl font-bold text-sm border-brand-blue/30 text-brand-blue hover:bg-brand-blue-soft gap-2"
          >
            <a href={teacher.reviewLink} target="_blank" rel="noopener noreferrer">
              <span>Xem đánh giá từ học viên</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
      {certificateData && (
        <TeacherCertificateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          certificate={certificateData}
          teacherName={teacher.name}
        />
      )}
    </div>
  );
}
