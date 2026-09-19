import { describe, it, expect } from "vitest";
import { execSync } from "child_process";

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
});
