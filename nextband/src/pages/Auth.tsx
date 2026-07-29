import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  BookOpen,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { authApi } from "@/lib/api";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { SiteLogo } from "@/components/common/SiteLogo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const emailSchema = z.string().email("Email không hợp lệ");
const passwordSchema = z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự");

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [rememberGoogleLogin, setRememberGoogleLogin] = useState(true);
  const [showGoogleHint, setShowGoogleHint] = useState(false);

  const { signIn, user } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  useEffect(() => {
    const hidden = localStorage.getItem("google_login_hint_hidden") === "1";
    setShowGoogleHint(!hidden);
  }, []);

  const validateInputs = () => {
    const newErrors: { email?: string; password?: string } = {};

    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: error.message || "Email hoặc mật khẩu không chính xác.",
      });
    } else {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại!",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50/40 dark:bg-slate-950 font-sans selection:bg-primary/10 selection:text-primary">
      {/* Left side - Premium Quiet Academic Branding */}
      <div className="hidden lg:flex lg:w-7/12 bg-slate-900 text-slate-100 p-16 xl:p-20 flex-col justify-between relative overflow-hidden border-r border-slate-800/80">
        {/* Subtle Radial Light & Ambient Depth (Imperceptible yet luxurious) */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Logo - Plenty of space */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <SiteLogo alt="NextBand Logo" className="max-h-11 w-auto brightness-0 invert opacity-95" />
          </div>
          {/* 2. Hero Tagline */}
          <h2 className="text-xl xl:text-2xl font-medium tracking-tight text-slate-200 leading-snug max-w-md pt-2">
            {settings.authTagline}
          </h2>
        </div>

        {/* 3 & 4 & 5 & 6. Product Feature Cards - Elevated Depth & Typography Hierarchy */}
        <div className="space-y-5 relative z-10 my-auto max-w-md">
          <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
            <div className="rounded-xl bg-gradient-to-b from-slate-700/80 to-slate-800 p-3 border border-slate-600/30 shadow-inner shrink-0 group-hover:border-primary/40 transition-colors">
              <BookOpen className="h-5 w-5 text-primary-foreground/90" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-100 text-sm tracking-tight">
                {settings.authFeatureOneTitle}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {settings.authFeatureOneDescription}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
            <div className="rounded-xl bg-gradient-to-b from-slate-700/80 to-slate-800 p-3 border border-slate-600/30 shadow-inner shrink-0 group-hover:border-primary/40 transition-colors">
              <Users className="h-5 w-5 text-primary-foreground/90" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-100 text-sm tracking-tight">
                {settings.authFeatureTwoTitle}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {settings.authFeatureTwoDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500 relative z-10 font-normal tracking-wide">
          © {new Date().getFullYear()} NextBand. All rights reserved.
        </p>
      </div>

      {/* Right side - Light Quiet Form Workspace */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-16 lg:p-20">
        {/* 8. Light Weight Card */}
        <Card className="w-full max-w-[380px] border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl bg-white dark:bg-slate-900 p-2 sm:p-4">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-3">
              <SiteLogo alt="NextBand Logo" className="max-h-10 w-auto" />
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Đăng nhập
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Đăng nhập để tiếp tục bài học của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 9. Google Login Primary Entry */}
            <div className="space-y-2.5">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border-slate-200/90 dark:border-slate-700 h-11 px-4 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99]"
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    await authApi.loginWithGoogle();
                  } catch (error: any) {
                    toast({
                      variant: "destructive",
                      title: "Đăng nhập Google thất bại",
                      description: error?.message || "Không thể khởi chạy đăng nhập Google.",
                    });
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="tracking-tight">Đăng nhập bằng Google</span>
              </Button>
              <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 font-normal">
                Cách nhanh nhất dành cho học viên
              </p>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200/80 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-medium">
                  Hoặc bằng email
                </span>
              </div>
            </div>

            {/* Secondary Email/Password Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-10 text-xs border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-primary/40"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-10 text-xs pr-9 border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-primary/40"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2.5 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full h-10 text-xs font-medium tracking-tight mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
