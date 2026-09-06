import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// ── SRE ISOLATION (SEC-01 / P0): In test mode, NEVER load production .env ──
const isTestEnv = process.env.NODE_ENV === "test" || Boolean(process.env.VITEST);
if (isTestEnv) {
  const testEnvLocal = path.resolve(process.cwd(), ".env.test.local");
  const testEnv = path.resolve(process.cwd(), ".env.test");
  if (fs.existsSync(testEnvLocal)) {
    dotenv.config({ path: testEnvLocal, override: true });
  } else if (fs.existsSync(testEnv)) {
    dotenv.config({ path: testEnv, override: true });
  }
  // In test environment, immediately purge any inherited production database URLs
  const PROD_DENYLIST = [
    "gzpdlqxjggyxlkeatvvf",
    "aws-0-ap-southeast-2.pooler.supabase.com",
    "nextband.site",
    "api.nextband.site",
  ];
  if (process.env.DATABASE_URL && PROD_DENYLIST.some(d => process.env.DATABASE_URL?.toLowerCase().includes(d))) {
    delete process.env.DATABASE_URL;
  }
} else {
  dotenv.config();
}

// Direct Supabase database host (port 5432) requires IPv6 which is unavailable in serverless runtimes.
// Automatically map to the official IPv4 connection pooler (port 6543) using runtime environment credentials.
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes("db.gzpdlqxjggyxlkeatvvf.supabase.co")) {
  try {
    const parsed = new URL(process.env.DATABASE_URL);
    parsed.hostname = "aws-0-ap-southeast-2.pooler.supabase.com";
    parsed.port = "6543";
    if (!parsed.username.includes(".")) {
      parsed.username = `${parsed.username}.gzpdlqxjggyxlkeatvvf`;
    }
    if (!parsed.searchParams.has("pgbouncer")) {
      parsed.searchParams.set("pgbouncer", "true");
    }
    process.env.DATABASE_URL = parsed.toString();
  } catch {}
}

const WEAK_SECRETS = new Set([
  "secret",
  "jwt_secret",
  "supersecret",
  "123456",
  "12345678",
  "password",
  "default_secret",
  "change_me",
]);

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.string().default("3001"),
    APP_URL: z.string().optional(), // Full URL của server, VD: https://api.yourdomain.com
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(1, "JWT_SECRET cannot be empty"),
    JWT_EXPIRES_IN: z.string().default("7d"),
    UPLOAD_DIR: z.string().default("uploads"),
    MAX_FILE_SIZE: z.string().default("52428800"), // 50MB
    FRONTEND_URL: z.string().default("http://localhost:5173"),
    PREVIEW_ALLOWED_ORIGINS: z.string().optional(),
    TRUST_PROXY_IPS: z.string().optional(), // Comma-separated list of trusted proxy IPs/CIDRs
    SUPABASE_URL: z.string().default("https://gzpdlqxjggyxlkeatvvf.supabase.co"),
    SUPABASE_JWKS_URL: z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
    NOTIFICATION_EMAIL_TO: z.string().default("arisieltsdeeplearning@gmail.com"),
    ROOT_ADMIN_EMAILS: z
      .string()
      .default("admin@ielts.com,admin@nextband.site,bestcanthocity@gmail.com"),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_SECURE: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().optional(),
    TELEGRAM_BOT_TOKEN: z.string().optional(),
    TELEGRAM_CHAT_ID: z.string().optional(),
    STT_API_KEY: z.string().optional(),
    GROQ_API_KEY: z.string().optional(),
    GEMINI_API_KEY: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
    STT_API_URL: z.string().optional(),
    WHISPER_API_URL: z.string().optional(),
    STT_MODEL: z.string().optional(),
    WHISPER_MODEL: z.string().optional(),
    STT_PROVIDER: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.NODE_ENV === "production") {
        if (data.JWT_SECRET.length < 32) return false;
        if (WEAK_SECRETS.has(data.JWT_SECRET.toLowerCase())) return false;
      }
      return true;
    },
    {
      message:
        "In production, JWT_SECRET must be at least 32 characters long and cannot be a known weak/default secret.",
      path: ["JWT_SECRET"],
    },
  );

let envData: z.infer<typeof envSchema>;
try {
  envData = envSchema.parse(process.env);
} catch (err: unknown) {
  if (err instanceof z.ZodError) {
    console.error(
      "❌ Invalid environment variables:",
      JSON.stringify(err.flatten().fieldErrors),
    );
  } else {
    console.error("❌ Invalid environment variables:", err);
  }
  
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "❌ FATAL: Missing or invalid required environment variables in production. Refusing to start with insecure fallbacks."
    );
  }

  // Development/Test safe defaults
  envData = {
    NODE_ENV: (process.env.NODE_ENV as any) || "development",
    PORT: process.env.PORT || "3001",
    DATABASE_URL: process.env.DATABASE_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || "dev_jwt_secret_min_32_characters_long_for_local_testing_only",
    JWT_EXPIRES_IN: "7d",
    UPLOAD_DIR: "uploads",
    MAX_FILE_SIZE: "52428800",
    FRONTEND_URL: "http://localhost:5173",
    SUPABASE_URL: "https://gzpdlqxjggyxlkeatvvf.supabase.co",
    NOTIFICATION_EMAIL_TO: "arisieltsdeeplearning@gmail.com",
  };
}

export const env = envData;

export function getRootAdminEmails(): Set<string> {
  const raw = env.ROOT_ADMIN_EMAILS || "";
  const emails = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return new Set(emails);
}
