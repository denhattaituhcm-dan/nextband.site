import fs from "fs";
import path from "path";

const dir = "server/tests";
for (const file of fs.readdirSync(dir)) {
  if (file.endsWith(".ts") || file.endsWith(".js") || file.endsWith(".mjs")) {
    const full = path.join(dir, file);
    let content = fs.readFileSync(full, "utf8");
    content = content.replaceAll("../src/plugins/prisma.js", "../plugins/prisma.js");
    content = content.replaceAll('join(process.cwd(), "src"', 'join(process.cwd(), "server"');
    content = content.replaceAll('join(process.cwd(), "..", "nextband"', 'join(process.cwd(), "nextband"');
    fs.writeFileSync(full, content, "utf8");
    console.log("Fixed mock in:", file);
  }
}
