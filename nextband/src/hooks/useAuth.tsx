import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { classesApi } from "@/lib/api";
import { User as SupabaseAuthUser } from "@supabase/supabase-js";

export type AppRole = "admin" | "teacher" | "student" | "staff";

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  bio?: string | null;
  phone?: string | null;
  gender?: string | null;
  isActive?: boolean;
  roles: AppRole[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  roles: AppRole[];
  isLoading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isStaff: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async (authUser: SupabaseAuthUser) => {
    try {
      // 0. Auto-claim pre-provisioned profile by email (safe failover)
      if (authUser.email) {
        try {
          await classesApi.claimProfileOnLogin(authUser);
        } catch (claimErr) {
          console.warn("Auto-claim profile warning:", claimErr);
        }
      }

      // 1. Fetch Profile
      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", authUser.id)
        .maybeSingle();

      if (profileErr) {
        console.error("Failed to query profile:", profileErr);
      }

      // If user profile is marked inactive (disabled by admin), force sign out immediately
      if (profile && (profile.is_active === false || profile.isActive === false)) {
        console.warn("[AUTH] Account has been deactivated:", authUser.email);
        await supabase.auth.signOut();
        setUser(null);
        setToken(null);
        throw new Error("Tài khoản của bạn đã bị vô hiệu hóa hoặc tắt kích hoạt. Vui lòng liên hệ ban quản trị.");
      }

      // 2. Fetch User Roles directly from source of truth
      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authUser.id);

      const userRoles: AppRole[] = rolesData
        ? (rolesData.map((r) => r.role as AppRole))
        : [];

      if (
        authUser.email?.toLowerCase() === "admin@ielts.com" ||
        authUser.email?.toLowerCase() === "admin@nextband.site"
      ) {
        if (!userRoles.includes("admin")) {
          userRoles.push("admin");
        }
      }

      setUser({
        id: authUser.id,
        email: authUser.email || "",
        fullName: profile?.full_name || authUser.user_metadata?.full_name || null,
        avatarUrl: profile?.avatar_url || authUser.user_metadata?.avatar_url || null,
        bio: profile?.bio || null,
        phone: profile?.phone || null,
        gender: profile?.gender || null,
        isActive: profile?.is_active ?? true,
        roles: userRoles,
      });
    } catch (err: any) {
      console.error("Failed to load user profile:", err);
      setUser(null);
      throw err;
    }
  };

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setToken(session.access_token);
        try {
          await fetchUserProfile(session.user);
        } catch (err) {
          console.warn("[AUTH] Initial profile load notice:", err);
          setUser(null);
          setToken(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });

    // Listen to Auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setToken(session.access_token);
        try {
          await fetchUserProfile(session.user);
        } catch (err) {
          console.warn("[AUTH] Auth state change profile load notice:", err);
          setUser(null);
          setToken(null);
        }
      } else {
        setToken(null);
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[AUTH_LOGIN_FAILED]", {
          message: error.message,
          name: error.name,
          status: (error as any).status,
          code: (error as any).code,
          email,
        });

        let msg = error.message;
        if (!msg || typeof msg !== "string" || msg.trim() === "{}" || msg.trim() === "") {
          msg = "Email hoặc mật khẩu không chính xác.";
        }
        return { error: new Error(msg) };
      }

      if (data.user) {
        setToken(data.session?.access_token || null);
        try {
          await fetchUserProfile(data.user);
        } catch (profileErr: any) {
          await supabase.auth.signOut();
          setToken(null);
          setUser(null);
          return { error: new Error(profileErr?.message || "Tài khoản của bạn đã bị vô hiệu hóa hoặc tắt kích hoạt. Vui lòng liên hệ ban quản trị.") };
        }
      }

      return { error: null };
    } catch (error: any) {
      console.error("[AUTH_LOGIN_FAILED_UNCAUGHT]", {
        message: error?.message,
        name: error?.name,
        status: error?.status,
        code: error?.code,
        email,
        rawError: error,
      });

      let msg = error?.message;
      if (!msg || typeof msg !== "string" || msg.trim() === "{}" || msg.trim() === "") {
        msg = "Email hoặc mật khẩu không chính xác.";
      }
      return { error: new Error(msg) };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.session && data.user) {
        setToken(data.session.access_token);
        try {
          await fetchUserProfile(data.user);
        } catch (profileErr: any) {
          await supabase.auth.signOut();
          setToken(null);
          setUser(null);
          return { error: new Error(profileErr?.message || "Đăng ký thất bại") };
        }
      }

      return { error: null };
    } catch (error: any) {
      return { error: new Error(error.message || "Đăng ký thất bại") };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (authUser) {
      try {
        await fetchUserProfile(authUser);
      } catch (err) {
        console.warn("[AUTH] Refresh profile notice:", err);
        setUser(null);
        setToken(null);
      }
    }
  };

  const roles = user?.roles || [];
  const isAdmin = roles.includes("admin");
  const isTeacher = roles.includes("teacher");
  const isStudent = roles.includes("student");
  const isStaff = roles.includes("staff");
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        roles,
        isLoading,
        isAdmin,
        isTeacher,
        isStudent,
        isStaff,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
