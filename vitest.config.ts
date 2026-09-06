import { defineConfig } from "vitest/config";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// ── SRE ISOLATION: Prioritize .env.test.local -> .env.test. NEVER load production .env in test ──
const rootDir = __dirname;
const testEnvLocal = path.resolve(rootDir, ".env.test.local");
const testEnv = path.resolve(rootDir, ".env.test");

if (fs.existsSync(testEnvLocal)) {
  dotenv.config({ path: testEnvLocal, override: true });
} else if (fs.existsSync(testEnv)) {
  dotenv.config({ path: testEnv, override: true });
} else {
  // If no test env file exists, wipe any inherited production database URLs immediately
  delete process.env.DATABASE_URL;
  delete process.env.DIRECT_URL;
}

// ── SRE SAFETY GUARD (SEC-01 / P0): Fail-Closed Check ──
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
    console.error("Test runner detected Production Database connection string!");
    console.error("Target URL:", url.replace(/:[^:@]+@/, ":***@"));
    console.error("Execution terminated with status code 1 to protect Production Data.\n");
    throw new Error("CRITICAL_SRE_SAFETY_VIOLATION: Production database access strictly forbidden in tests!");
  }
}


export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.resolve(__dirname, "./nextband/src/test/setup.ts")],
    pool: "forks",
    poolOptions: {
      forks: {
        execArgv: ["--max-old-space-size=4096"],
        singleFork: true,
      },
    },
    fileParallelism: false,
    testTimeout: 45000,
    hookTimeout: 45000,
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.spec.ts",
      "server/tests/deadline_and_status.test.mjs",
    ],

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./nextband/src"),
      "@server": path.resolve(__dirname, "./server"),
    },
  },
});
