import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// ── SRE ISOLATION: Prioritize .env.test.local -> .env.test. NEVER load production .env in test ──
const rootDir = path.resolve(__dirname, "..");
const testEnvLocal = path.resolve(rootDir, ".env.test.local");
const testEnv = path.resolve(rootDir, ".env.test");

if (fs.existsSync(testEnvLocal)) {
  dotenv.config({ path: testEnvLocal, override: true });
} else if (fs.existsSync(testEnv)) {
  dotenv.config({ path: testEnv, override: true });
} else {
  delete process.env.DATABASE_URL;
  delete process.env.DIRECT_URL;
}

const checkUrls = [
  process.env.DATABASE_URL,
  process.env.DIRECT_URL,
  process.env.DATABASE_URL_TEST,
  process.env.TEST_DATABASE_URL,
].filter(Boolean) as string[];

const PROD_DENYLIST = [
  "gzpdlqxjggyxlkeatvvf",
  "aws-0-ap-southeast-2.pooler.supabase.com",
  "nextband.site",
  "api.nextband.site",
];

for (const url of checkUrls) {
  const isProd = PROD_DENYLIST.some((blocked) => url.toLowerCase().includes(blocked));
  if (isProd) {
    console.error("\n🚨🚨🚨 [CRITICAL SRE SAFETY VIOLATION - P0 BLOCKED] 🚨🚨🚨");
    console.error("Test runner detected Production Database connection string in frontend test runner!");
    throw new Error("CRITICAL_SRE_SAFETY_VIOLATION: Production database access strictly forbidden in tests!");
  }
}

export default defineConfig({

  root: path.resolve(__dirname, "."),
  plugins: [react()],
  test: {
    root: path.resolve(__dirname, "."),
    environment: "jsdom",
    globals: true,
    setupFiles: [path.resolve(__dirname, "./src/test/setup.ts")],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
});
