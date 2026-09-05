import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// 1. Locate schema.prisma
const candidateSchemaPaths = [
  resolve(rootDir, "prisma/schema.prisma"),
  resolve(rootDir, "nextband/prisma/schema.prisma"),
  resolve(rootDir, "../prisma/schema.prisma"),
];

const schemaPath = candidateSchemaPaths.find((p) => existsSync(p));
if (schemaPath) {
  console.log(`📦 Generating Prisma Client from: ${schemaPath}`);
  try {
    execSync(`npx prisma generate --schema="${schemaPath}"`, {
      stdio: "inherit",
      env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=4096" },
    });
  } catch (err) {
    console.warn("⚠️ Prisma generate warning:", err?.message);
  }
} else {
  console.warn("⚠️ No schema.prisma found, skipping prisma generate");
}

// 2. Bundle Serverless API Gateway
console.log("⚡ Bundling Serverless API Gateway...");
const bundleScript = existsSync(resolve(rootDir, "scripts/bundle-api.mjs"))
  ? resolve(rootDir, "scripts/bundle-api.mjs")
  : resolve(rootDir, "nextband/scripts/bundle-api.mjs");

if (existsSync(bundleScript)) {
  execSync(`node "${bundleScript}"`, { stdio: "inherit" });
}

// 2.5. Verify Serverless API Gateway Runtime & Fastify Boot (8-Gate Gatekeeper)
console.log("🛡️ Running Serverless API Gateway Runtime Verification...");
const verifyScript = existsSync(resolve(rootDir, "scripts/verify-api-runtime.mjs"))
  ? resolve(rootDir, "scripts/verify-api-runtime.mjs")
  : resolve(rootDir, "nextband/scripts/verify-api-runtime.mjs");

if (existsSync(verifyScript)) {
  if (!process.env.DATABASE_URL) {
    console.log("ℹ️  DATABASE_URL not set in build environment. Skipping DB-dependent runtime smoke gates.");
  } else {
    try {
      execSync(`npx tsx "${verifyScript}"`, { stdio: "inherit" });
    } catch (err) {
      console.error("❌ Runtime Verification failed:", err?.message);
      throw err;
    }
  }
}

// 3. Ensure frontend dependencies are installed before typecheck
const nextbandDir = resolve(rootDir, "nextband");
const nextbandReact = resolve(nextbandDir, "node_modules/react");
const rootReact = resolve(rootDir, "node_modules/react");

if (existsSync(nextbandDir) && !existsSync(nextbandReact) && !existsSync(rootReact)) {
  console.log("📦 Frontend dependencies missing. Installing nextband dependencies...");
  try {
    execSync("npm install", { cwd: nextbandDir, stdio: "inherit" });
  } catch (installErr) {
    console.warn("⚠️ Failed to auto-install nextband dependencies:", installErr?.message);
  }
}

// 4. Strict TypeScript Verification
console.log("🔍 Running Strict TypeScript Typecheck...");
const tsconfigPath = existsSync(resolve(rootDir, "nextband/tsconfig.app.json"))
  ? resolve(rootDir, "nextband/tsconfig.app.json")
  : resolve(rootDir, "tsconfig.app.json");

if (existsSync(tsconfigPath)) {
  execSync(`npx tsc -p "${tsconfigPath}" --noEmit`, {
    cwd: rootDir,
    stdio: "inherit",
  });
}

// 4. Build Vite Frontend
console.log("🚀 Building Frontend with Vite SWC...");
const viteCwd = existsSync(resolve(rootDir, "vite.config.ts"))
  ? rootDir
  : resolve(rootDir, "nextband");

const viteBin = existsSync(resolve(rootDir, "node_modules/vite/bin/vite.js"))
  ? resolve(rootDir, "node_modules/vite/bin/vite.js")
  : existsSync(resolve(viteCwd, "node_modules/vite/bin/vite.js"))
  ? resolve(viteCwd, "node_modules/vite/bin/vite.js")
  : null;

if (viteBin) {
  execSync(`node "${viteBin}" build`, { cwd: viteCwd, stdio: "inherit" });
} else {
  execSync(`npx vite build`, { cwd: viteCwd, stdio: "inherit" });
}
console.log("✅ Full production build completed successfully!");
