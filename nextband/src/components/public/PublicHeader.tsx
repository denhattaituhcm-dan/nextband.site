import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SiteLogo } from "@/components/common/SiteLogo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  X,
  ArrowRight,
  User,
  Shield,
  GraduationCap,
  ChevronDown,
  Sparkles,
  BookOpen,
  Zap,
  Swords,
  Mic,
  Compass,
  FileText,
  Flame,
  FlaskConical,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavSubItem {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: "sky" | "rose" | "emerald" | "amber" | "purple";
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  isDivider?: boolean;
}

interface NavMegaColumn {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isFeatured?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  isMegaMenu?: boolean;
  megaColumns?: NavMegaColumn[];
  children?: NavSubItem[];
}

function renderNavBadge(
  badge: string,
  color?: "sky" | "rose" | "emerald" | "amber" | "purple"
) {
  const isLive = badge.toUpperCase() === "LIVE";
  const isHot = badge.toUpperCase() === "HOT";

  let colorClasses = "bg-sky-500/20 text-sky-300 border-sky-400/30";
  if (color === "rose" || isLive) {
    colorClasses = "bg-rose-500/20 text-rose-300 border-rose-400/30";
  } else if (color === "emerald") {
    colorClasses = "bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
  } else if (color === "amber" || isHot) {
    colorClasses = "bg-amber-500/20 text-amber-300 border-amber-400/30";
  } else if (color === "purple") {
    colorClasses = "bg-purple-500/20 text-purple-300 border-purple-400/30";
  }

  return (
    <span
      className={cn(
        "ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border whitespace-nowrap shrink-0 inline-flex items-center gap-1 leading-none shadow-2xs",
        colorClasses
      )}
    >
      {isLive && (
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
      )}
      {isHot && <Flame className="h-2.5 w-2.5 text-amber-300 shrink-0" />}
      <span>{badge}</span>
    </span>
  );
}

const PUBLIC_NAV_ITEMS: NavItem[] = [
  {
    label: "Khóa học",
    href: "/courses",
    children: [
      { label: "Tiếng Anh Cambridge (Flyers - KET - PET)", href: "/courses/cambridge-kids", badge: "10-15 Tuổi" },
      { label: "Hệ thống học thuật ARIS-7", href: "/academic-system", badge: "Phương pháp" },
      { label: "Khảo thí năng lực", href: "/assessment", badge: "Test 4 kỹ năng" },
      { label: "Lộ trình học tổng quan", href: "/courses" },
      { label: "DIVIDER", href: "", isDivider: true },
      { label: "Khóa DREAMER (Mất gốc → 3.0)", href: "/courses/starter" },
      { label: "Khóa DOER (3.0 → 4.5)", href: "/courses/dreamer" },
      { label: "Khóa BUILDER (4.5 → 5.5)", href: "/courses/builder" },
      { label: "Khóa MASTER (5.5 → 6.5)", href: "/courses/master" },
      { label: "Khóa LEADER (6.5 → 7.5+)", href: "/courses/leader" },
    ],
  },
  {
    label: "Đọc",
    href: "/reading",
    isFeatured: true,
    icon: BookOpen,
    isMegaMenu: true,
    megaColumns: [
      {
        title: "Luyện Đọc & Đấu Trường",
        icon: Zap,
        items: [
          {
            label: "Thử thách đọc hiểu",
            href: "/reading-challenge",
            badge: "Mới",
            badgeColor: "emerald",
            icon: Sparkles,
          },
          {
            label: "Đấu trường Live Arena",
            href: "/arena",
            badge: "LIVE",
            badgeColor: "rose",
            icon: Zap,
          },
          {
            label: "Đấu trường từ vựng C2",
            href: "/vocab-c2",
            badge: "HOT",
            badgeColor: "amber",
            icon: Swords,
          },
          {
            label: "Speaking Forecast",
            href: "/ielts-speaking-forecast",
            badge: "HOT",
            badgeColor: "rose",
            icon: Mic,
          },
          {
            label: "Bài đọc phân tích",
            href: "/reading#tu-sach",
            badge: "Tủ sách",
            badgeColor: "sky",
            icon: FileText,
          },
        ],
      },
      {
        title: "Kho Từ Vựng & Cấu Trúc",
        icon: Layers,
        items: [
          {
            label: "Essential Vocabulary (B2-C1)",
            href: "/essential-vocabulary",
            badge: "20 Bài",
            badgeColor: "sky",
            icon: GraduationCap,
          },
          {
            label: "Vocabulary in Use (C1-C2)",
            href: "/vocab-in-use",
            badge: "Mới",
            badgeColor: "emerald",
            icon: BookOpen,
          },
          {
            label: "Từ vựng nâng cao C1",
            href: "/vocab-c1",
            badge: "12 Bài",
            badgeColor: "purple",
            icon: Layers,
          },
          {
            label: "Từ vựng B2-C1 (Cambridge)",
            href: "/cambridge-vocab",
            badge: "20 Chủ đề",
            badgeColor: "sky",
            icon: Compass,
          },
          {
            label: "Thành ngữ thông dụng",
            href: "/reading/idioms",
            badge: "8 Chủ đề",
            badgeColor: "amber",
            icon: Flame,
          },
          {
            label: "Luyện tập Giới từ",
            href: "/preposition-lab",
            badge: "Mới",
            badgeColor: "emerald",
            icon: FlaskConical,
          },
        ],
      },
    ],
    children: [
      { label: "Thử thách đọc hiểu", href: "/reading-challenge", badge: "Mới" },
      { label: "Bài đọc phân tích", href: "/reading#tu-sach", badge: "Bài đọc" },
      { label: "Thành ngữ thông dụng", href: "/reading/idioms", badge: "8 Chủ đề" },
      { label: "Essential Vocabulary (B2-C1)", href: "/essential-vocabulary", badge: "20 Bài" },
      { label: "Từ vựng nâng cao C1", href: "/vocab-c1", badge: "12 Bài" },
      { label: "Vocabulary in Use (C1-C2)", href: "/vocab-in-use", badge: "Mới" },
      { label: "Đấu trường từ vựng C2", href: "/vocab-c2", badge: "HOT" },
      { label: "Đấu trường Live Arena", href: "/arena", badge: "LIVE" },
      { label: "Từ vựng B2-C1", href: "/cambridge-vocab", badge: "20 Chủ đề" },
      { label: "Luyện tập Giới từ", href: "/preposition-lab", badge: "Mới" },
      { label: "DIVIDER", href: "", isDivider: true },
      { label: "Speaking Forecast", href: "/ielts-speaking-forecast", badge: "HOT" },
    ],
  },
  { label: "Chemistry 10", href: "/chemistry", badge: "3D LAB" },
  { label: "Tự học", href: "https://tuhoc.nextband.vn", isFeatured: true },
  { label: "Tiến bộ", href: "/results" },
  { label: "Giảng viên", href: "/teachers" },
  { label: "Tuyển dụng", href: "/careers" },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, isTeacher } = useAuth();

  const isNavActive = (item: NavItem) => {
    if (item.href === "/" && location.pathname === "/") return true;
    if (item.href === "/courses") {
      if (
        location.pathname.startsWith("/courses") ||
        location.pathname.startsWith("/academic-system") ||
        location.pathname.startsWith("/assessment")
      ) {
        return true;
      }
    }
    if (item.href === "/reading") {
      if (
        location.pathname.startsWith("/reading") ||
        location.pathname.startsWith("/reading-challenge") ||
        location.pathname.startsWith("/essential-vocabulary") ||
        location.pathname.startsWith("/vocab-c1") ||
        location.pathname.startsWith("/vocab-in-use") ||
        location.pathname.startsWith("/vocab-c2") ||
        location.pathname.startsWith("/cambridge-vocab") ||
        location.pathname.startsWith("/preposition-lab") ||
        location.pathname.startsWith("/arena") ||
        location.pathname.startsWith("/ielts-speaking-forecast")
      ) {
        return true;
      }
    }
    if (item.href !== "/" && location.pathname.startsWith(item.href)) return true;
    return false;
  };

  const isSubActive = (href: string) => {
    if (href === "/courses" && location.pathname === "/courses") return true;
    if (href === "/essential-vocabulary" && (location.pathname.startsWith("/essential-vocabulary") || location.pathname.startsWith("/reading/essential-vocabulary"))) return true;
    if (href === "/vocab-c1" && (location.pathname === "/vocab-c1" || location.pathname === "/reading/vocab-c1")) return true;
    if (href === "/vocab-in-use" && (location.pathname.startsWith("/vocab-in-use") || location.pathname.startsWith("/reading/vocab-in-use"))) return true;
    if (href === "/vocab-c2" && (location.pathname === "/vocab-c2" || location.pathname === "/reading/vocab-c2")) return true;
    if (href === "/arena" && location.pathname.startsWith("/arena")) return true;
    if (href === "/cambridge-vocab" && location.pathname.startsWith("/cambridge-vocab")) return true;
    if (href === "/preposition-lab" && (location.pathname === "/preposition-lab" || location.pathname === "/reading/preposition-lab")) return true;
    if (href === "/ielts-speaking-forecast" && location.pathname.startsWith("/ielts-speaking-forecast")) return true;
    if (href === "/reading-challenge" && location.pathname.startsWith("/reading-challenge")) return true;
    if (href !== "/courses" && location.pathname === href) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#002147] text-white shadow-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <SiteLogo
                alt="ARIS IELTS"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105 shrink-0"
              />
              <div className="flex flex-col justify-center border-l border-white/20 pl-2.5 sm:pl-3 py-0.5">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-slate-300 uppercase leading-none">
                  BUILT BY
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-white tracking-wide leading-tight mt-1">
                  Anh ngữ Aris
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const active = isNavActive(item);
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                const ItemIcon = item.icon;
                return (
                  <div key={item.label} className="relative group/navitem">
                    <Link
                      to={item.href}
                      className={cn(
                        "px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold tracking-wider uppercase whitespace-nowrap text-center transition-all inline-flex items-center gap-1.5 relative overflow-hidden",
                        item.isFeatured
                          ? [
                              "bg-gradient-to-r from-sky-500/20 via-blue-600/25 to-indigo-600/25",
                              "text-sky-100 hover:text-white",
                              "border border-sky-400/40 hover:border-sky-300",
                              "shadow-[0_2px_12px_rgba(2,132,199,0.25)] hover:shadow-[0_4px_20px_rgba(2,132,199,0.45)]",
                              "hover:scale-[1.03] active:scale-[0.98]",
                            ].join(" ")
                          : active
                          ? "bg-white/15 text-white font-black shadow-xs border border-white/20"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.isFeatured && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -translate-x-full group-hover/navitem:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-sky-300/20 to-transparent"
                        />
                      )}
                      {ItemIcon && (
                        <ItemIcon className="h-3.5 w-3.5 text-cyan-300 shrink-0 group-hover/navitem:rotate-[-6deg] transition-transform" />
                      )}
                      <span className={cn(item.isFeatured && "font-black text-white drop-shadow-xs")}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="relative px-1.5 py-[0.5px] rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-sky-400/30 to-blue-500/30 text-sky-200 border border-sky-300/40 shadow-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200 group-hover/navitem:rotate-180",
                          item.isFeatured ? "text-sky-300 opacity-90" : "opacity-70"
                        )}
                      />
                    </Link>

                    {/* Mega Dropdown or Standard Dropdown */}
                    {item.isMegaMenu && item.megaColumns ? (
                      <div className="absolute top-full left-0 pt-2 hidden group-hover/navitem:block transition-all z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                        <div className="w-[580px] rounded-2xl bg-[#001938] border border-sky-500/30 shadow-2xl shadow-[#000d20]/90 p-3.5 ring-1 ring-sky-400/20 backdrop-blur-xl">
                          {/* Top Header Card */}
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 px-1">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-gradient-to-br from-sky-500/30 to-indigo-500/30 text-cyan-300 border border-sky-400/30 shadow-xs">
                                <BookOpen className="h-4 w-4" />
                              </div>
                              <span className="text-xs font-black text-white tracking-wider uppercase">
                                KHO TÀI LIỆU & ĐẤU TRƯỜNG ARIS
                              </span>
                              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                11+ TIỆN ÍCH
                              </span>
                            </div>
                            <Link
                              to={item.href}
                              className="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-200 hover:text-white border border-sky-400/30 text-[11px] font-bold flex items-center gap-1 transition-all group/all shrink-0"
                            >
                              <span>Vào Tủ sách</span>
                              <ArrowRight className="h-3 w-3 group-hover/all:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>

                          {/* 2 Columns Grid */}
                          <div className="grid grid-cols-2 gap-2.5">
                            {item.megaColumns.map((col, cIdx) => (
                              <div key={cIdx} className="space-y-1">
                                <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-black uppercase tracking-wider text-sky-300/90 border-b border-white/5">
                                  {col.icon && <col.icon className="h-3.5 w-3.5 text-sky-400" />}
                                  <span>{col.title}</span>
                                </div>

                                <div className="space-y-0.5">
                                  {col.items.map((sub) => {
                                    const subActive = isSubActive(sub.href);
                                    const SubIcon = sub.icon || BookOpen;

                                    return (
                                      <Link
                                        key={sub.href + sub.label}
                                        to={sub.href}
                                        className={cn(
                                          "group/sub flex items-center justify-between px-2.5 py-2 rounded-xl transition-all",
                                          subActive
                                            ? "bg-white/15 text-white font-bold border border-white/20 shadow-xs"
                                            : "text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                                        )}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          <div className="p-1 rounded-lg bg-white/5 text-sky-300 group-hover/sub:bg-sky-500/20 group-hover/sub:text-white transition-colors shrink-0">
                                            <SubIcon className="h-3.5 w-3.5" />
                                          </div>
                                          <span className="text-xs font-semibold text-white tracking-wide truncate group-hover/sub:text-cyan-200 transition-colors">
                                            {sub.label}
                                          </span>
                                        </div>
                                        {sub.badge && renderNavBadge(sub.badge, sub.badgeColor)}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Dropdown Menu - Oxford Academic Navy (Standard) */
                      <div className="absolute top-full left-0 pt-2 hidden group-hover/navitem:block transition-all z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                        <div className="w-80 rounded-2xl bg-[#002147] border border-white/15 shadow-2xl shadow-[#001026]/80 p-2 space-y-1 ring-1 ring-white/10">
                          {item.children!.map((sub, idx) => {
                            if (sub.isDivider) {
                              return (
                                <div
                                  key={`divider-${idx}`}
                                  className="border-t border-white/10 my-1.5 mx-2"
                                />
                              );
                            }

                            const subActive = isSubActive(sub.href);
                            const match = sub.label.match(/^(.*?)\s*(\(.*?\))$/);
                            const mainTitle = match ? match[1] : sub.label;
                            const subTarget = match ? match[2] : null;

                            return (
                              <Link
                                key={sub.href + sub.label}
                                to={sub.href}
                                className={cn(
                                  "group/sub flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all",
                                  subActive
                                    ? "bg-white/15 text-white font-bold border border-white/20 shadow-xs"
                                    : "text-slate-100 hover:text-white hover:bg-white/10"
                                )}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="font-bold text-white tracking-wide truncate">
                                    {mainTitle}
                                  </span>
                                  {subTarget && (
                                    <span className="text-[11px] text-slate-400 group-hover/sub:text-slate-300 font-normal shrink-0">
                                      {subTarget}
                                    </span>
                                  )}
                                </div>
                                {sub.badge && renderNavBadge(sub.badge, sub.badgeColor)}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.href.startsWith("http")) {
                const isHighlight = item.isFeatured || !!item.badge;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative inline-flex items-center gap-1.5 px-4 xl:px-5 py-1.5 rounded-full text-xs xl:text-[13px] font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 group/tuhoc overflow-hidden shadow-lg",
                      isHighlight
                        ? [
                            // Gradient rực rỡ, đậm nét đúng chuẩn nhận diện cam -> hồng đào -> tím sen -> tím neon (#ff6b00 -> #e93e7a -> #a824e8 -> #5b13ec)
                            "bg-gradient-to-r from-[#ff6b00] via-[#e93e7a] via-[#a824e8] to-[#5b13ec]",
                            "text-white",
                            "shadow-[0_2px_14px_rgba(233,62,122,0.45)] hover:shadow-[0_4px_22px_rgba(168,36,232,0.65)]",
                            "hover:brightness-110 hover:scale-[1.05] active:scale-[0.98]",
                            "border border-white/30",
                          ].join(" ")
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {/* Shimmer sweep effect */}
                    {isHighlight && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-full group-hover/tuhoc:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    )}

                    {isHighlight && (
                      <Sparkles className="h-3.5 w-3.5 text-amber-200 fill-amber-200/50 drop-shadow-sm shrink-0" />
                    )}
                    <span className="drop-shadow-md font-black tracking-wider">{item.label}</span>
                    {item.badge && (
                      <span className="relative px-1.5 py-[0.5px] rounded-full text-[9px] font-black uppercase tracking-wider bg-white/25 text-white backdrop-blur-xs border border-white/30 shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-[13px] font-bold tracking-wider uppercase whitespace-nowrap text-center transition-all",
                    active
                      ? "bg-white/15 text-white font-black shadow-xs border border-white/20"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                {/* Authenticated quick state */}
                <div
                  onClick={() => navigate("/app/profile")}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.avatarUrl || undefined} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground font-bold">
                      {user?.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-bold text-white uppercase tracking-wide max-w-[140px] truncate">
                    {user?.fullName || "Học viên"}
                  </span>
                </div>

                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/admin")}
                    className="h-10 px-3.5 text-xs font-bold uppercase tracking-wider gap-1.5 border-white/20 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
                  >
                    <Shield className="h-3.5 w-3.5 text-sky-400" />
                    <span>Quản trị</span>
                  </Button>
                )}

                {/* Primary Homework Entry CTA */}
                <Button
                  size="sm"
                  onClick={() => navigate("/app")}
                  className="h-10 px-5 rounded-xl text-xs sm:text-[13px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:via-red-400 hover:to-amber-400 text-white shadow-lg shadow-rose-600/25 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
                >
                  <span>Homework</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              /* Primary CTA for Guests: Homework */
              <Button
                size="sm"
                asChild
                className="h-10 px-5 rounded-xl text-xs sm:text-[13px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:via-red-400 hover:to-amber-400 text-white shadow-lg shadow-rose-600/25 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
              >
                <Link to="/login?next=/app">
                  <span>Homework</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            {isAuthenticated ? (
              <Button
                size="sm"
                onClick={() => navigate("/app")}
                className="h-8 px-3 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm"
              >
                Homework →
              </Button>
            ) : (
              <Button
                size="sm"
                asChild
                className="h-8 px-3 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm"
              >
                <Link to="/login?next=/app">Homework →</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setOpenMobileSubMenu(null);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="h-9 w-9 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#002147] text-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const active = isNavActive(item);
              const hasChildren = item.children && item.children.length > 0;
              const isSubMenuOpen = openMobileSubMenu === item.label;

              if (hasChildren) {
                const ItemIcon = item.icon;
                return (
                  <div key={item.label} className="space-y-1">
                    <div
                      onClick={() => setOpenMobileSubMenu(isSubMenuOpen ? null : item.label)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer group/mob overflow-hidden relative shadow-xs",
                        item.isFeatured
                          ? [
                              "bg-gradient-to-r from-[#0284c7] via-[#2563eb] to-[#4f46e5]",
                              "text-white font-black",
                              "shadow-[0_2px_14px_rgba(2,132,199,0.35)]",
                              "border border-sky-300/40",
                            ].join(" ")
                          : active
                          ? "bg-white/15 text-white font-black border border-white/20"
                          : "text-slate-300 hover:text-white hover:bg-white/10 font-bold"
                      )}
                    >
                      {item.isFeatured && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -translate-x-full group-hover/mob:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      )}
                      <div className="flex items-center gap-2">
                        {ItemIcon && (
                          <ItemIcon className="h-4 w-4 text-cyan-200 shrink-0" />
                        )}
                        <span className="drop-shadow-xs font-black tracking-wider">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-[1px] rounded-full text-[9px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 shadow-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-cyan-100">
                        {item.isFeatured && (
                          <span className="text-[10px] font-bold normal-case opacity-90">
                            {isSubMenuOpen ? "Thu gọn" : "11+ tiện ích"}
                          </span>
                        )}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            item.isFeatured ? "text-white" : "opacity-70",
                            isSubMenuOpen && "rotate-180"
                          )}
                        />
                      </div>
                    </div>

                    {isSubMenuOpen && (
                      <div
                        className={cn(
                          "rounded-xl py-2 px-1 space-y-2 animate-in slide-in-from-top-1 duration-150",
                          item.isFeatured
                            ? "bg-slate-900/70 border border-sky-500/25 pl-2.5 pr-2"
                            : "pl-3 ml-2 border-l border-white/15"
                        )}
                      >
                        {item.isMegaMenu && item.megaColumns ? (
                          <>
                            {/* Quick Link to /reading */}
                            <Link
                              to={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-sky-500/25 to-indigo-500/25 border border-sky-400/35 text-white text-xs font-bold shadow-xs hover:brightness-110"
                            >
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
                                <span>Vào Tủ sách tương tác ARIS</span>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-cyan-300" />
                            </Link>

                            {item.megaColumns.map((col, cIdx) => (
                              <div key={cIdx} className="space-y-1 pt-1">
                                <div className="px-2 text-[10px] font-black uppercase tracking-wider text-sky-300/80 flex items-center gap-1.5">
                                  {col.icon && <col.icon className="h-3 w-3 text-sky-400" />}
                                  <span>{col.title}</span>
                                </div>
                                {col.items.map((sub) => {
                                  const subActive = isSubActive(sub.href);
                                  const SubIcon = sub.icon || BookOpen;

                                  return (
                                    <Link
                                      key={sub.href + sub.label}
                                      to={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={cn(
                                        "px-2.5 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors flex items-center justify-between",
                                        subActive
                                          ? "bg-white/20 text-white font-bold border border-white/20"
                                          : "text-slate-200 hover:text-white hover:bg-white/10"
                                      )}
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <SubIcon className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
                                        <span className="font-semibold text-white truncate">
                                          {sub.label}
                                        </span>
                                      </div>
                                      {sub.badge ? (
                                        renderNavBadge(sub.badge, sub.badgeColor)
                                      ) : (
                                        <ArrowRight className="h-3 w-3 opacity-40 shrink-0" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </>
                        ) : (
                          item.children!.map((sub, idx) => {
                            if (sub.isDivider) {
                              return (
                                <div
                                  key={`mob-div-${idx}`}
                                  className="border-t border-white/10 my-1.5 mx-2"
                                />
                              );
                            }

                            const subActive = isSubActive(sub.href);
                            const match = sub.label.match(/^(.*?)\s*(\(.*?\))$/);
                            const mainTitle = match ? match[1] : sub.label;
                            const subTarget = match ? match[2] : null;

                            return (
                              <Link
                                key={sub.href + sub.label}
                                to={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors flex items-center justify-between",
                                  subActive
                                    ? "bg-white/15 text-white font-bold border border-white/20"
                                    : "text-slate-200 hover:text-white hover:bg-white/10"
                                )}
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="font-semibold text-white truncate">
                                    {mainTitle}
                                  </span>
                                  {subTarget && (
                                    <span className="text-[11px] text-slate-400 font-normal shrink-0">
                                      {subTarget}
                                    </span>
                                  )}
                                </div>
                                {sub.badge ? (
                                  renderNavBadge(sub.badge, sub.badgeColor)
                                ) : (
                                  <ArrowRight className="h-3 w-3 opacity-40 shrink-0" />
                                )}
                              </Link>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.href.startsWith("http")) {
                const isHighlight = item.isFeatured || !!item.badge;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between group/mob overflow-hidden relative shadow-md",
                      isHighlight
                        ? "bg-gradient-to-r from-[#ff6b00] via-[#e93e7a] via-[#a824e8] to-[#5b13ec] text-white shadow-[0_2px_14px_rgba(233,62,122,0.45)] border border-white/30"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {isHighlight && (
                        <Sparkles className="h-3.5 w-3.5 text-amber-200 fill-amber-200/50 shrink-0" />
                      )}
                      <span className="drop-shadow-sm font-black tracking-wider">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-[1px] rounded-full text-[9px] font-black uppercase tracking-wider bg-white/25 text-white border border-white/30 shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 opacity-90 text-white" />
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between",
                    active
                      ? "bg-white/15 text-white font-black border border-white/20"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/app");
                }}
                className="w-full h-10 font-black uppercase tracking-wider text-xs bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:via-red-400 hover:to-amber-400 text-white justify-center gap-2 shadow-md shadow-rose-950/40"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Vào Học Homework</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login?next=/app");
                }}
                className="w-full h-10 font-black uppercase tracking-wider text-xs bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:via-red-400 hover:to-amber-400 text-white justify-center gap-2 shadow-md shadow-rose-950/40"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Homework</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
