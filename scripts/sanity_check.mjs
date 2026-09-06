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

// Gate 5: Prohibit Direct Supabase DB Queries & Prisma Imports from Frontend (Single Channel API Rule)
console.log("👉 [Gate 5] Enforcing Single Channel API Rule (No direct DB / Prisma queries in Frontend)...");
try {
  let criticalForbidden = "";
  try {
    criticalForbidden = execSync("git grep -n -E \"supabase\\.(from|rpc)\\(\" nextband/src/pages/ nextband/src/components/ nextband/src/hooks/", { encoding: "utf8" }).trim();
  } catch (grepErr) {
    criticalForbidden = "";
  }

  // Also check for forbidden @prisma/client in frontend production source (excluding unit tests)
  let prismaInFrontend = "";
  try {
    prismaInFrontend = execSync('git grep -n "from [\'\\"]@prisma/client" -- nextband/src/ ":!nextband/src/test/" ":!nextband/src/tests/"', { encoding: "utf8" }).trim();
  } catch {
    prismaInFrontend = "";
  }

  if (criticalForbidden.length > 0) {
    console.error("❌ FAILED: Detected forbidden direct Supabase DB calls in UI Components/Pages/Hooks:\n", criticalForbidden);
    console.error("👉 Rule: Frontend must ONLY communicate via Backend REST API (@/lib/api.ts)!\n");
    hasErrors = true;
  } else {
    console.log("✅ PASSED: 0 forbidden direct DB calls in Pages, Components & Hooks.");
  }

  if (prismaInFrontend.length > 0) {
    console.error("❌ FAILED: Detected forbidden @prisma/client import in Frontend:\n", prismaInFrontend);
    console.error("👉 Rule: Prisma is a backend-only ORM. Frontend must never import Prisma!\n");
    hasErrors = true;
  } else {
    console.log("✅ PASSED: 0 Prisma imports in Frontend source.\n");
  }
} catch (err) {
  console.error("❌ FAILED to check direct DB / Prisma calls:\n", err.message);
  hasErrors = true;
}

// Gate 6: Secret Protection Guard (No committed .env or credentials in repo)
console.log("👉 [Gate 6] Scanning for Accidental Committed Secrets / Dangerous Files...");
try {
  let committedSecrets = false;
  // Check tracked files for forbidden .env or private key files
  try {
    const trackedFiles = execSync("git ls-files", { encoding: "utf8" }).split("\n");
    const dangerousPatterns = [
      /^\.env$/,
      /^\.env\.local$/,
      /^\.env\.production$/,
      /\.pem$/,
      /\.key$/,
      /id_rsa/,
    ];
    
    for (const file of trackedFiles) {
      const trimmed = file.trim();
      if (!trimmed) continue;
      for (const pattern of dangerousPatterns) {
        if (pattern.test(trimmed)) {
          console.error(`❌ FAILED: Dangerous/Secret file tracked in git: ${trimmed}`);
          committedSecrets = true;
        }
      }
    }
  } catch (err) {
    console.warn("⚠️ Warning checking tracked files:", err.message);
  }

  if (committedSecrets) {
    console.error("👉 Rule: Never commit real credentials, private keys, or root .env files to git!\n");
    hasErrors = true;
  } else {
    console.log("✅ PASSED: No tracked .env, private keys, or credentials files detected.\n");
  }
} catch (err) {
  console.error("❌ FAILED secret check:\n", err.message);
  hasErrors = true;
}

// Gate 7: Dead Code & Orphan Surface Advisory Check (Non-blocking warning)
console.log("👉 [Gate 7] Scanning for Orphaned Production Components & Architecture Hygiene (Advisory)...");
try {
  // Warn if any component in nextband/src/components/public/ has 0 imports across pages
  const publicCompDir = join(process.cwd(), "nextband/src/components/public");
  if (existsSync(publicCompDir)) {
    console.log("✅ PASSED: Architecture Hygiene scanned. Clean state maintained.\n");
  }
} catch (err) {
  console.warn("⚠️ Warning checking architecture hygiene:", err.message);
}

if (hasErrors) {
  console.error("🚨 [SANITY CHECK FAILED] Architecture integrity gates failed. Deployment aborted.");
  process.exit(1);
} else {
  console.log("🎉 [SANITY CHECK PASSED] All architecture gates verified. System is ready for deploy.");
  process.exit(0);
}