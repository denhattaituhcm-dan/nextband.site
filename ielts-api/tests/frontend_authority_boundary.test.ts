import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function getAllSourceFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== "dist" && file !== ".git") {
        getAllSourceFiles(filePath, fileList);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

describe("GATE 3: FRONTEND STATIC ARCHITECTURE & AUTHORITY BOUNDARY TEST SUITE", () => {
  const frontendSrcDir = join(process.cwd(), "..", "nextband", "src");
  const sourceFiles = getAllSourceFiles(frontendSrcDir);

  // =========================================================================
  // 1. FORBIDDEN CLIENT MUTATIONS ON AUTHORITATIVE TABLES
  // =========================================================================
  describe("1. Zero Direct Client Mutations on Authoritative Tables", () => {
    it("1.1. No direct Supabase INSERT, UPDATE, UPSERT, or DELETE on exam_submissions in frontend source", () => {
      const forbiddenPatterns = [
        /\.from\(\s*["']exam_submissions["']\s*\)\s*\.insert/i,
        /\.from\(\s*["']exam_submissions["']\s*\)\s*\.update/i,
        /\.from\(\s*["']exam_submissions["']\s*\)\s*\.upsert/i,
        /\.from\(\s*["']exam_submissions["']\s*\)\s*\.delete/i,
      ];

      const violations: { file: string; pattern: string; line: number }[] = [];

      for (const filePath of sourceFiles) {
        const content = readFileSync(filePath, "utf-8");
        const lines = content.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          for (const pattern of forbiddenPatterns) {
            if (pattern.test(line)) {
              violations.push({
                file: filePath,
                pattern: pattern.toString(),
                line: i + 1,
              });
            }
          }
        }
      }

      expect(violations).toHaveLength(0);
    });

    it("1.2. No direct client score mutation on answers table in frontend source", () => {
      const forbiddenPatterns = [
        /\.from\(\s*["']answers["']\s*\)\s*\.update/i,
        /\.from\(\s*["']answers["']\s*\)\s*\.upsert/i,
      ];

      const violations: { file: string; line: number }[] = [];

      for (const filePath of sourceFiles) {
        const content = readFileSync(filePath, "utf-8");
        const lines = content.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          for (const pattern of forbiddenPatterns) {
            if (pattern.test(line)) {
              violations.push({ file: filePath, line: i + 1 });
            }
          }
        }
      }

      expect(violations).toHaveLength(0);
    });

    it("1.3. No direct client mutation on user_roles in frontend source", () => {
      const forbiddenPatterns = [
        /\.from\(\s*["']user_roles["']\s*\)\s*\.insert/i,
        /\.from\(\s*["']user_roles["']\s*\)\s*\.update/i,
        /\.from\(\s*["']user_roles["']\s*\)\s*\.upsert/i,
        /\.from\(\s*["']user_roles["']\s*\)\s*\.delete/i,
      ];

      const violations: { file: string; line: number }[] = [];

      for (const filePath of sourceFiles) {
        const content = readFileSync(filePath, "utf-8");
        const lines = content.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          for (const pattern of forbiddenPatterns) {
            if (pattern.test(line)) {
              violations.push({ file: filePath, line: i + 1 });
            }
          }
        }
      }

      expect(violations).toHaveLength(0);
    });
  });

  // =========================================================================
  // 2. LIFECYCLE ROUTING TO FASTIFY GATEWAY
  // =========================================================================
  describe("2. Exclusive Routing to Fastify API Gateway in submissionsApi", () => {
    const apiTsPath = join(frontendSrcDir, "lib", "api.ts");
    const apiTsContent = readFileSync(apiTsPath, "utf-8");

    it("2.1. submissionsApi.start exclusively invokes Fastify POST /submissions", () => {
      expect(apiTsContent).toMatch(/fetch(WithResilience)?\(`\$\{API_BASE_URL\}\/submissions`/);
      expect(apiTsContent).not.toMatch(/\.from\(\s*["']exam_submissions["']\s*\)\s*\.insert/);
    });

    it("2.2. submissionsApi.saveAnswers exclusively invokes Fastify PUT /submissions/:id", () => {
      expect(apiTsContent).toMatch(/fetch(WithResilience)?\(`\$\{API_BASE_URL\}\/submissions\/\$\{id\}`/);
      expect(apiTsContent).not.toMatch(/\.from\(\s*["']answers["']\s*\)\s*\.upsert/);
    });

    it("2.3. submissionsApi.submit exclusively invokes Fastify POST /submissions/:id/submit", () => {
      expect(apiTsContent).toMatch(/fetch(WithResilience)?\(`\$\{API_BASE_URL\}\/submissions\/\$\{id\}\/submit`/);
    });

    it("2.4. submissionsApi.grade exclusively invokes Fastify POST /submissions/:id/grade", () => {
      expect(apiTsContent).toMatch(/fetch(WithResilience)?\(`\$\{API_BASE_URL\}\/submissions\/\$\{id\}\/grade`/);
      expect(apiTsContent).not.toMatch(/\.from\(\s*["']exam_submissions["']\s*\)\s*\.update/);
    });
  });
});
