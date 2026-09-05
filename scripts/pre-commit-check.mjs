import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

console.log("🔍 [Pre-Commit] Kiem tra TypeScript tren cac file dang thay doi...");

try {
  // Lay danh sach cac file staged (sap commit)
  const stagedFiles = execSync("git diff --cached --name-only --diff-filter=ACMR", { encoding: "utf8" })
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  const tsFiles = stagedFiles.filter(f => /\.(ts|tsx)$/.test(f) && !f.endsWith(".d.ts"));

  if (tsFiles.length === 0) {
    console.log("⚡ Khong co file TS/TSX nao can commit. Bo qua typecheck!");
    process.exit(0);
  }

  console.log(`📝 Phat hien ${tsFiles.length} file TypeScript dang commit:`);
  tsFiles.forEach(f => console.log(`   - ${f}`));

  // Kiem tra xem co file thuoc nextband (frontend) khong
  const hasFrontendTs = tsFiles.some(f => f.startsWith("nextband/src/"));
  const tsconfigPath = resolve(rootDir, "nextband/tsconfig.app.json");

  if (hasFrontendTs && existsSync(tsconfigPath)) {
    console.log("🚀 Dang kiem tra loi TypeScript (tuong tu Vercel build)...");
    execSync(`npx tsc -p "${tsconfigPath}" --noEmit`, {
      cwd: rootDir,
      stdio: "inherit",
    });
  }

  console.log("✅ [Pre-Commit] Tat ca kiem tra dat chuan! Tien hanh commit an toan.");
  process.exit(0);
} catch (err) {
  console.error("\n❌ [Pre-Commit] LOI: Code co loi kieu du lieu TypeScript!");
  console.error("⚠️ Git da ngan chan commit nay de tranh lam hong ban build Vercel.");
  console.error("👉 Hay sua loi duoc liet ke o tren roi commit lai.\n");
  process.exit(1);
}
