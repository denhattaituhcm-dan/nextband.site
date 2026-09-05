import { defineConfig } from "vitest/config";
import path from "path";
import "dotenv/config";

// ── SRE SAFETY GUARD (SEC-01): Prevent tests from connecting to Production Database ──
const rawDbUrl = process.env.DATABASE_URL || "";
const rawDirectUrl = process.env.DIRECT_URL || "";
const isProdDb =
  rawDbUrl.includes("aws-0-ap-southeast-2.pooler.supabase.com") ||
  rawDbUrl.includes("gzpdlqxjggyxlkeatvvf") ||
  rawDirectUrl.includes("aws-0-ap-southeast-2.pooler.supabase.com") ||
  rawDirectUrl.includes("gzpdlqxjggyxlkeatvvf");

if (isProdDb) {
  if (process.env.ALLOW_PROD_DB_IN_TEST === "true") {
    console.warn("⚠️ [DANGER] ALLOW_PROD_DB_IN_TEST is enabled. Tests will connect to Production Database!");
  } else {
    console.warn("🛡️ [SRE SAFETY GUARD] Detected Production Database credentials. Stripping DATABASE_URL & DIRECT_URL from test environment to prevent data contamination/loss.");
    delete process.env.DATABASE_URL;
    delete process.env.DIRECT_URL;
  }
}

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.resolve(__dirname, "./nextband/src/test/setup.ts")],
    fileParallelism: false,
    testTimeout: 45000,
    hookTimeout: 45000,
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.spec.ts",
      "server/tests/deadline_and_status.test.mjs",
      "server/tests/phase1_workflow_integration.test.ts",
      "tests/student_management_system.test.ts",
      "server/tests/rls_adversarial_pentest.test.ts",
      "server/tests/cross_assessment_attempt_integrity.test.ts",
      "server/tests/gateway_e2e_resilience.test.ts",
      "server/tests/periodic_reports.test.ts",
      "server/tests/speaking_evidence_engine.test.ts",
      "server/tests/study_buddy_referral_e2e.test.ts",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./nextband/src"),
      "@server": path.resolve(__dirname, "./server"),
    },
  },
});
