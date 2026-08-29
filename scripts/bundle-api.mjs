import esbuild from "esbuild";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

mkdirSync(resolve(rootDir, "api"), { recursive: true });

const entryCode = `
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes("db.gzpdlqxjggyxlkeatvvf.supabase.co")) {
  try {
    const parsed = new URL(process.env.DATABASE_URL);
    parsed.hostname = "aws-0-ap-southeast-2.pooler.supabase.com";
    parsed.port = "6543";
    if (!parsed.username.includes(".")) {
      parsed.username = parsed.username + ".gzpdlqxjggyxlkeatvvf";
    }
    if (!parsed.searchParams.has("pgbouncer")) {
      parsed.searchParams.set("pgbouncer", "true");
    }
    process.env.DATABASE_URL = parsed.toString();
  } catch {}
}

import { buildApp } from "../server/app.js";

let fastifyApp = null;

export default async function handler(req, res) {
  try {
    if (!fastifyApp) {
      fastifyApp = await buildApp();
      await fastifyApp.ready();
    }

    const response = await fastifyApp.inject({
      method: req.method || "GET",
      url: req.url,
      headers: req.headers,
      query: req.query,
      payload: req.body,
    });

    if (response.headers) {
      for (const [key, value] of Object.entries(response.headers)) {
        if (value !== undefined) {
          res.setHeader(key, value);
        }
      }
    }

    res.statusCode = response.statusCode;
    res.end(response.body);
  } catch (err) {
    console.error("Fastify Serverless Handler Error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Đã xảy ra lỗi hệ thống. Vui lòng liên hệ quản trị viên.",
      })
    );
  }
}
`;

await esbuild.build({
  stdin: {
    contents: entryCode,
    resolveDir: resolve(rootDir, "api"),
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  nodePaths: [
    resolve(rootDir, "node_modules"),
    resolve(rootDir, "nextband/node_modules"),
    resolve(rootDir, "../node_modules"),
  ],
  banner: {
    js: `import { createRequire as __esbuild_createRequire } from "module";
import { fileURLToPath as __esbuild_fileURLToPath } from "url";
import { dirname as __esbuild_dirname } from "path";
const require = __esbuild_createRequire(import.meta.url);
const __filename = __esbuild_fileURLToPath(import.meta.url);
const __dirname = __esbuild_dirname(__filename);
`,
  },
  outfile: resolve(rootDir, "api/index.js"),
  external: ["@prisma/client", "@vercel/node"],
});

console.log("✅ 100% self-contained Fastify Serverless Gateway bundled into api/index.js!");

import { copyFileSync, existsSync as fsExists } from "fs";
const nextbandApiDir = resolve(rootDir, "nextband/api");
if (fsExists(nextbandApiDir)) {
  copyFileSync(resolve(rootDir, "api/index.js"), resolve(nextbandApiDir, "index.js"));
  console.log("✅ Synced bundle to nextband/api/index.js!");
}
