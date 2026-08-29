import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Compass, ShieldCheck, BookOpen, Send, GraduationCap, Gift } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  RoadmapConsultationModal,
  AssessmentRegistrationModal,
  TrialClassModal,
} from "./ConsultationModals";

function ZaloIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9453 0 1.0746.8697 1.9453 1.945 1.9453z" />
    </svg>
  );
}

type ModalType = "roadmap" | "assessment" | "trial" | null;

interface SupportOption {
  id: "buddy" | "roadmap" | "assessment" | "trial";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  path?: string;
  badge?: string;
}

export function ConsultationBubble() {
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const zaloUrl = settings?.zaloLink || "https://zalo.me";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const supportOptions: SupportOption[] = [
    {
      id: "buddy",
      icon: <Gift className="w-4 h-4 text-amber-500" />,
      title: "Thẻ mời học cùng bạn",
      subtitle: "Kích hoạt ưu đãi giảm 200.000đ học phí",
      path: "/buddy",
      badge: "Ưu đãi -200k",
    },
    {
      id: "assessment",
      icon: <ShieldCheck className="w-4 h-4 text-[#0068FF]" />,
      title: "Kiểm tra trình độ tiếng Anh",
      subtitle: "Nhận kết quả phân tích trong 24 giờ",
    },
    {
      id: "roadmap",
      icon: <Compass className="w-4 h-4 text-indigo-600" />,
      title: "Tư vấn lộ trình học IELTS",
      subtitle: "Được tư vấn level và khóa học phù hợp",
    },
    {
      id: "trial",
      icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
      title: "Đăng ký học thử miễn phí",
      subtitle: "Trải nghiệm lớp học trước khi quyết định",
    },
  ];

  const handleOptionClick = (option: SupportOption) => {
    setIsOpen(false);
    if (option.path) {
      navigate(option.path);
      return;
    }
    setActiveModal(option.id as ModalType);
  };

  const handleDirectZaloClick = () => {
    window.open(zaloUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none font-sans"
      >
        {/* Popover Mini-Card (2-tier Academic Card inspired by Zalo) */}
        {isOpen && (
          <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-card border border-border/80 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
            {/* Tier 1: Top Warm Banner */}
            <div className="relative p-4 bg-gradient-to-br from-amber-100/70 via-orange-50/50 to-amber-50/30 border-b border-amber-200/40">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-800/80 bg-amber-500/15 px-2 py-0.5 rounded-full">
                        Ban Học Thuật
                      </span>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Đang trực tuyến" />
                    </div>
                    <h3 className="text-sm font-extrabold text-foreground tracking-tight mt-0.5">
                      Cố Vấn Học Thuật ARIS
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-foreground/75 mt-2 leading-relaxed pl-0.5">
                Giải đáp lộ trình cá nhân hóa &amp; hỗ trợ bài test năng lực 4 kỹ năng miễn phí.
              </p>
            </div>

            {/* Tier 2: Suggestion Pills / Option Cards */}
            <div className="p-3 space-y-1.5 bg-card">
              <div className="space-y-1.5">
                {supportOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-left border transition-all duration-150 group cursor-pointer active:scale-[0.99] ${
                      opt.id === "buddy"
                        ? "bg-gradient-to-r from-amber-50/70 to-orange-50/40 hover:from-amber-100/80 hover:to-orange-100/60 border-amber-200/80"
                        : "bg-muted/40 hover:bg-muted border-border/60 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-xl border shrink-0 transition-all ${
                          opt.id === "buddy"
                            ? "bg-white border-amber-300 shadow-2xs group-hover:scale-105"
                            : "bg-background border-border/60 group-hover:border-primary/30 group-hover:scale-105"
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug truncate">
                            {opt.title}
                          </span>
                          {opt.badge && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500 text-white shrink-0 shadow-2xs">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-tight mt-0.5 truncate">
                          {opt.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors pl-1">
                      →
                    </span>
                  </button>
                ))}
              </div>

              {/* Direct Zalo Action (Soft Pill CTA) */}
              <div className="pt-2 border-t border-border/50">
                <button
                  onClick={handleDirectZaloClick}
                  className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-[#0068FF] hover:bg-[#0057d9] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <div className="w-4 h-4 shrink-0">
                    <ZaloIcon className="w-full h-full text-white" />
                  </div>
                  <span>Nhắn trực tiếp qua Zalo OA</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating CTA Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex items-center gap-2.5 h-12 pl-4 sm:pl-5 pr-1.5 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0068FF] hover:from-[#0047B3] hover:to-[#005AE0] text-white shadow-[0_4px_20px_rgba(0,104,255,0.35)] hover:shadow-[0_6px_26px_rgba(0,104,255,0.48)] border border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none"
          aria-expanded={isOpen}
          aria-label="Tư vấn ngay"
        >
          {/* Label */}
          <span className="text-sm font-bold tracking-tight text-white whitespace-nowrap pl-0.5">
            Tư vấn ngay
          </span>

          {/* Zalo Circular Badge */}
          <div className="relative w-9 h-9 rounded-full bg-white text-[#0068FF] flex items-center justify-center shrink-0 p-1.5 shadow-sm">
            {/* Main Ripple Ring */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-full border-2 border-white/60 animate-signal-ripple"
            />

            {/* Delayed Second Ripple Ring */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-full border-2 border-white/60 animate-signal-ripple-delayed"
            />

            {/* Zalo Icon */}
            <ZaloIcon className="w-full h-full text-[#0068FF]" />
          </div>
        </button>
      </div>

      {/* Dynamic Modals */}
      <RoadmapConsultationModal
        isOpen={activeModal === "roadmap"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <AssessmentRegistrationModal
        isOpen={activeModal === "assessment"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <TrialClassModal
        isOpen={activeModal === "trial"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </>
  );
}
