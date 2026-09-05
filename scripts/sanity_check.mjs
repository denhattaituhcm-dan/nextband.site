#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

console.log("🔍 [SANITY CHECK] Initiating Pre-Deploy Architecture Integrity Gate...\n");

let hasErrors = false;

// Gate 1: Check Circular Dependencies
console.log("👉 [Gate 1] Checking Circular Dependencies...");
try {
  const madgeOutput = execSync("npx madge --circular --extensions ts server/ nextband/src/", { encoding: "utf8" });
  if (madgeOutput.includes("Found")) {
    console.error("❌ FAILED: Circular dependencies detected!\n", madgeOutput);
    hasErrors = true;
  } else {
    console.log("✅ PASSED: 0 Circular dependencies.\n");
  }
} catch (err) {
  console.error("❌ FAILED: Circular check error:\n", err.stdout || err.message);
  hasErrors = true;
}

// Gate 2: Prohibit Hardcoded Admin Emails in Server Auth
console.log("👉 [Gate 2] Checking for Hardcoded Email Bypasses...");
try {
  const authMiddlewareContent = readFileSync(join(process.cwd(), "server/middlewares/auth.middleware.ts"), "utf8");
  if (authMiddlewareContent.includes("getRootAdminEmails") || authMiddlewareContent.includes("isRootAdmin")) {
    console.error("❌ FAILED: Detected hardcoded email admin bypass in server/middlewares/auth.middleware.ts");
    hasErrors = true;
  } else {
    console.log("✅ PASSED: Auth Middleware uses 100% database SSOT.\n");
  }
} catch (err) {
  console.error("❌ FAILED to read auth middleware:\n", err.message);
  hasErrors = true;
}

// Gate 3: Prohibit Dead In-Memory Stores in Production Bundles
console.log("👉 [Gate 3] Checking for In-Memory Mock Stores in Client API...");
try {
  const apiContent = readFileSync(join(process.cwd(), "nextband/src/lib/api.ts"), "utf8");
  if (apiContent.includes("localUsersStore")) {
    console.error("❌ FAILED: Detected localUsersStore mock data in nextband/src/lib/api.ts");
    hasErrors = true;
  } else {
    console.log("✅ PASSED: No mock stores in client production bundle.\n");
  }
} catch (err) {
  console.error("❌ FAILED to read nextband/src/lib/api.ts:\n", err.message);
  hasErrors = true;
}

// Gate 4: TypeScript Frontend Compilation Check
console.log("👉 [Gate 4] Verifying Frontend TypeScript Contract...");
try {
  execSync("node --max-old-space-size=4096 ./node_modules/typescript/bin/tsc -p nextband/tsconfig.app.json --noEmit", { stdio: "inherit" });
  console.log("✅ PASSED: Frontend TypeScript compilation successful.\n");
} catch (err) {
  console.error("❌ FAILED: Frontend TypeScript compilation errors detected.");
  hasErrors = true;
}

if (hasErrors) {
  console.error("🚨 [SANITY CHECK FAILED] Architecture integrity gates failed. Deployment aborted.");
  process.exit(1);
} else {
  console.log("🎉 [SANITY CHECK PASSED] All architecture gates verified. System is ready for deploy.");
  process.exit(0);
}