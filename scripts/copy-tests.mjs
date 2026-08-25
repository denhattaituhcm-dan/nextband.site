import fs from "fs";
import path from "path";

const srcDir = "ielts-api/tests";
const dstDir = "server/tests";

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

function copyRecursive(src, dst) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(dstPath)) fs.mkdirSync(dstPath, { recursive: true });
      copyRecursive(srcPath, dstPath);
    } else {
      let content = fs.readFileSync(srcPath, "utf8");
      content = content.replace(/from\s+["']\.\.\/src\//g, 'from "../');
      content = content.replace(/import\s*\(\s*["']\.\.\/src\//g, 'import("../');
      fs.writeFileSync(dstPath, content, "utf8");
      console.log("Preserved test:", entry.name);
    }
  }
}

copyRecursive(srcDir, dstDir);
console.log("✅ Successfully preserved 100% test suites in server/tests/");
