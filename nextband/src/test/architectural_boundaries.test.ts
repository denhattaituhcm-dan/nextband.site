import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

describe("Phase 4: Architectural Boundaries & Single Channel API Rule", () => {
  it("Guarantees 0 direct Supabase DB queries (.from or .rpc) in Pages, Components, and Hooks", () => {
    let matches = "";
    try {
      matches = execSync(
        'git grep -n -E "supabase\\.(from|rpc)\\(" -- nextband/src/pages/ nextband/src/components/ nextband/src/hooks/',
        { encoding: "utf8" }
      ).trim();
    } catch {
      matches = "";
    }

    expect(matches).toBe("");
  });

  it("Guarantees 0 @prisma/client imports in frontend production source code", () => {
    let prismaMatches = "";
    try {
      prismaMatches = execSync(
        'git grep -n "from [\'\\"]@prisma/client" -- nextband/src/ ":!nextband/src/test/" ":!nextband/src/tests/"',
        { encoding: "utf8" }
      ).trim();
    } catch {
      prismaMatches = "";
    }

    expect(prismaMatches).toBe("");
  });

  it("Guarantees domain API modules in nextband/src/lib/api/domains/*.api.ts only import runtime primitives from ../client (never ../../supabase or ../../api)", () => {
    const domainsDir = path.resolve(process.cwd(), "nextband/src/lib/api/domains");
    const files = fs.readdirSync(domainsDir).filter((f) => f.endsWith(".api.ts"));

    const violations: string[] = [];
    for (const file of files) {
      const content = fs.readFileSync(path.join(domainsDir, file), "utf8");
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("import ") || trimmed.startsWith("import type ")) continue;
        const match = /from\s+["']([^"']+)["']/.exec(trimmed);
        if (match && match[1] !== "../client") {
          violations.push(`${file}: imports runtime module "${match[1]}" instead of "../client"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
