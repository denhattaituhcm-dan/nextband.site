import esbuild from "esbuild";
import { mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

mkdirSync(resolve(rootDir, "api"), { recursive: true });

// 1. Bundle server/app.ts directly into api/server.cjs (Pre-compiled CommonJS for zero-overhead Vercel packaging)
await esbuild.build({
  entryPoints: [resolve(rootDir, "server/app.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: resolve(rootDir, "api/server.cjs"),
  external: ["@prisma/client", "@vercel/node"],
});

// 2. Write lightweight api/index.cjs handler
const indexCode = `const { buildApp } = require("./server.cjs");

let fastifyApp = null;

module.exports = async function handler(req, res) {
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
        message: err?.message || "Serverless runtime error",
        stack: err?.stack,
      })
    );
  }
};
`;

writeFileSync(resolve(rootDir, "api/index.cjs"), indexCode);
console.log("✅ Single CommonJS API Serverless Gateway built successfully (0 memory overhead)!");
