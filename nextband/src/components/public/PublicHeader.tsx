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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavSubItem {
  label: string;
  href: string;
  badge?: string;
  isDivider?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

const PUBLIC_NAV_ITEMS: NavItem[] = [
  {
    label: "Khóa học",
    href: "/courses",
    children: [
      { label: "Hệ thống học thuật ARIS-7", href: "/academic-system", badge: "Phương pháp" },
      { label: "Khảo thí năng lực", href: "/assessment", badge: "Test 4 kỹ năng" },
      { label: "Lộ trình học tổng quan", href: "/courses" },
      { label: "DIVIDER", href: "", isDivider: true },
      { label: "Khóa STARTER (Mất gốc → 3.0)", href: "/courses/starter" },
      { label: "Khóa DREAMER (3.0 → 4.5)", href: "/courses/dreamer" },
      { label: "Khóa BUILDER (4.5 → 5.5)", href: "/courses/builder" },
      { label: "Khóa MASTER (5.5 → 6.5)", href: "/courses/master" },
      { label: "Khóa LEADER (6.5 → 7.5+)", href: "/courses/leader" },
    ],
  },
  { label: "Reading", href: "/reading" },
  { label: "Speaking Forecast", href: "/ielts-speaking-forecast" },
  { label: "Tiến bộ", href: "/results" },
  { label: "Giảng viên", href: "/teachers" },
  { label: "Tuyển dụng", href: "/careers" },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(true);
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
    if (item.href !== "/" && location.pathname.startsWith(item.href)) return true;
    return false;
  };

  const isSubActive = (href: string) => {
    if (href === "/courses" && location.pathname === "/courses") return true;
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
              <div className="flex items-center border-l border-white/20 pl-2.5 sm:pl-3 h-7 sm:h-8">
                <span className="font-black tracking-wider text-base sm:text-lg text-white leading-none uppercase whitespace-nowrap">
                  ARIS IELTS
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
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      to={item.href}
                      className={cn(
                        "px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-[13px] font-bold tracking-wider uppercase whitespace-nowrap text-center transition-all inline-flex items-center gap-1.5",
                        active
                          ? "bg-white/15 text-white font-black shadow-xs border border-white/20"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu - Oxford Academic Navy */}
                    <div className="absolute top-full left-0 pt-2 hidden group-hover:block transition-all z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
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
                              {sub.badge && (
                                <span className="ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300 border border-sky-400/30 whitespace-nowrap shrink-0">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
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
              <>
                {/* Guest State - Direct Homework CTA */}
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
              </>
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

              if (hasChildren) {
                return (
                  <div key={item.label} className="space-y-1">
                    <div
                      onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                      className={cn(
                        "px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer",
                        active
                          ? "bg-white/15 text-white font-black border border-white/20"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 opacity-70 transition-transform duration-200",
                          mobileCoursesOpen && "rotate-180"
                        )}
                      />
                    </div>

                    {mobileCoursesOpen && (
                      <div className="pl-3 ml-2 border-l border-white/15 space-y-1 py-1">
                        {item.children!.map((sub, idx) => {
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
                                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 whitespace-nowrap shrink-0">
                                  {sub.badge}
                                </span>
                              ) : (
                                <ArrowRight className="h-3 w-3 opacity-40 shrink-0" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
