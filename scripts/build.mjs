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
    execSync(`npx prisma generate --schema="${schemaPath}"`, { stdio: "inherit" });
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

// 3. Strict TypeScript Verification
console.log("🔍 Running Strict TypeScript Typecheck...");
const tsconfigPath = existsSync(resolve(rootDir, "nextband/tsconfig.app.json"))
  ? resolve(rootDir, "nextband/tsconfig.app.json")
  : resolve(rootDir, "tsconfig.app.json");

const tscBin = existsSync(resolve(rootDir, "node_modules/typescript/bin/tsc"))
  ? resolve(rootDir, "node_modules/typescript/bin/tsc")
  : existsSync(resolve(rootDir, "nextband/node_modules/typescript/bin/tsc"))
  ? resolve(rootDir, "nextband/node_modules/typescript/bin/tsc")
  : null;

if (existsSync(tsconfigPath)) {
  const tscCommand = tscBin
    ? `node --max-old-space-size=4096 "${tscBin}" -p "${tsconfigPath}" --noEmit`
    : `npx --node-options="--max-old-space-size=4096" tsc -p "${tsconfigPath}" --noEmit`;

  execSync(tscCommand, {
    cwd: existsSync(resolve(rootDir, "nextband")) ? resolve(rootDir, "nextband") : rootDir,
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
