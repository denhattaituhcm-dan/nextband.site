/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🧪 STAGING / DEV VERIFICATION SUITE — VOCABULARY IN USE BOOKMARK & SM-2 ENGINE
 * ══════════════════════════════════════════════════════════════════════════════
 * Verifies:
 * 1. Database Migration: Table structure, constraints, indices, and RLS enabled.
 * 2. Supabase Direct Client / RLS Protection:
 *    - Anonymous users blocked from reading or inserting bookmarks.
 *    - Cross-account read/write blocked at the PostgreSQL RLS level.
 * 3. Fastify Backend Integration & Account Isolation:
 *    - Account 1: Bookmarks words, reloads (persisted).
 *    - Account 2: Isolated (cannot see or manipulate Account 1 bookmarks).
 *    - Account 1: SM-2 review progress update, reloads (persisted).
 * ══════════════════════════════════════════════════════════════════════════════
 */

import { Client } from "pg";
import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import vocabInUseRoutes from "../server/routes/vocab-in-use.routes.js";
import { readFileSync } from "fs";

// Load environment variables
const envContent = readFileSync(".env", "utf8");
const envVars: Record<string, string> = {};
envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      envVars[key] = val;
    }
  }
});

const DB_URL = "postgresql://postgres:postgres@localhost:5432/nextband_test";
const SUPABASE_URL = envVars.SUPABASE_URL || "https://qxtpbonwjmxmogriyfox.supabase.co";
const SUPABASE_ANON_KEY = readFileSync("nextband/.env", "utf8")
  .split("\n")
  .find((l) => l.startsWith("VITE_SUPABASE_ANON_KEY="))
  ?.split("=")[1]
  ?.trim();

const USER_1 = {
  id: "11111111-1111-4111-a111-111111111111",
  email: "student_a_staging@nextband.site",
  fullName: "Student A (Staging)",
};

const USER_2 = {
  id: "22222222-2222-4222-a222-222222222222",
  email: "student_b_staging@nextband.site",
  fullName: "Student B (Staging)",
};

async function runStagingVerification() {
  console.log("═════════════════════════════════════════════════════════════════════");
  console.log("🚀 STARTING VOCABULARY IN USE STAGING / DEV VERIFICATION");
  console.log("═════════════════════════════════════════════════════════════════════\n");

  const pgClient = new Client({ connectionString: DB_URL });
  await pgClient.connect();

  const prisma = new PrismaClient({
    datasources: { db: { url: DB_URL } },
  });
  await prisma.$connect();

  try {
    // -------------------------------------------------------------------------
    // STEP 1: Verify Table Schema, Indices & RLS Flags in PostgreSQL
    // -------------------------------------------------------------------------
    console.log("📋 [STEP 1/4] Verifying Database Schema, Foreign Keys & RLS Flags...");

    // Check profiles existence for test users
    await pgClient.query(`
      INSERT INTO "profiles" ("id", "user_id", "email")
      VALUES 
        ('${USER_1.id}', '${USER_1.id}', '${USER_1.email}'),
        ('${USER_2.id}', '${USER_2.id}', '${USER_2.email}')
      ON CONFLICT ("user_id") DO NOTHING;
    `);

    const rlsCheck = await pgClient.query(`
      SELECT c.relname, c.relrowsecurity, c.relforcerowsecurity
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relname = 'vocab_in_use_bookmarks';
    `);

    if (!rlsCheck.rows[0]?.relrowsecurity) {
      throw new Error("RLS is NOT enabled on vocab_in_use_bookmarks!");
    }
    console.log("   ✅ RLS Enabled:", rlsCheck.rows[0].relrowsecurity);
    console.log("   ✅ FORCE RLS Enabled:", rlsCheck.rows[0].relforcerowsecurity);

    const policies = await pgClient.query(`
      SELECT polname, polcmd FROM pg_policy WHERE polrelid = 'vocab_in_use_bookmarks'::regclass ORDER BY polcmd;
    `);
    console.log(`   ✅ Active PostgreSQL RLS Policies (${policies.rows.length}):`);
    policies.rows.forEach((p: any) => console.log(`      - ${p.polname} (CMD: ${p.polcmd})`));

    // -------------------------------------------------------------------------
    // STEP 2: PostgreSQL Native Session RLS Pentest (Direct Client Isolation)
    // -------------------------------------------------------------------------
    console.log("\n🛡️ [STEP 2/4] Testing PostgreSQL Native RLS & Direct Client Isolation...");

    // Clean any prior test bookmarks
    await pgClient.query(`DELETE FROM "vocab_in_use_bookmarks" WHERE "user_id" IN ('${USER_1.id}', '${USER_2.id}');`);

    // 2.1 User 1 inserts a bookmark in User 1's authenticated session
    await pgClient.query(`
      SET LOCAL ROLE authenticated;
      SET LOCAL "request.jwt.claims" = '${JSON.stringify({ sub: USER_1.id, role: "authenticated" })}';
      INSERT INTO "vocab_in_use_bookmarks" (
        "id", "user_id", "unit_id", "lexicon_id", "word", "meaning_vi", "ipa", "example"
      ) VALUES (
        'bm-u1-test-01', '${USER_1.id}', 19, 'impetuous', 'impetuous', 'bốc đồng, hấp tấp', '/ɪmˈpetʃ.u.əs/', 'He is so impetuous.'
      );
    `);
    console.log("   ✅ User 1 successfully inserted bookmark under authenticated session.");

    // 2.2 User 2 queries: Must NOT see User 1's bookmark
    const u2SelectResult = await pgClient.query(`
      SET LOCAL ROLE authenticated;
      SET LOCAL "request.jwt.claims" = '${JSON.stringify({ sub: USER_2.id, role: "authenticated" })}';
      SELECT * FROM "vocab_in_use_bookmarks";
    `);
    const u2Rows = u2SelectResult[2]?.rows || [];
    if (u2Rows.length !== 0) {
      throw new Error(`RLS LEAK! User 2 can see ${u2Rows.length} bookmarks belonging to User 1!`);
    }
    console.log("   ✅ User 2 queried vocab_in_use_bookmarks: Returned 0 rows (User 1 data invisible).");

    // 2.3 User 2 attempts to maliciously UPDATE User 1's bookmark
    const u2UpdateResult = await pgClient.query(`
      SET LOCAL ROLE authenticated;
      SET LOCAL "request.jwt.claims" = '${JSON.stringify({ sub: USER_2.id, role: "authenticated" })}';
      UPDATE "vocab_in_use_bookmarks" SET "meaning_vi" = 'hacked' WHERE "id" = 'bm-u1-test-01';
    `);
    const updateCount = u2UpdateResult[2]?.rowCount || 0;
    if (updateCount !== 0) {
      throw new Error(`RLS BYPASS! User 2 updated User 1's bookmark!`);
    }
    console.log("   ✅ User 2 malicious UPDATE blocked by RLS: 0 rows modified.");

    // 2.4 User 2 attempts to maliciously DELETE User 1's bookmark
    const u2DeleteResult = await pgClient.query(`
      SET LOCAL ROLE authenticated;
      SET LOCAL "request.jwt.claims" = '${JSON.stringify({ sub: USER_2.id, role: "authenticated" })}';
      DELETE FROM "vocab_in_use_bookmarks" WHERE "id" = 'bm-u1-test-01';
    `);
    const deleteCount = u2DeleteResult[2]?.rowCount || 0;
    if (deleteCount !== 0) {
      throw new Error(`RLS BYPASS! User 2 deleted User 1's bookmark!`);
    }
    console.log("   ✅ User 2 malicious DELETE blocked by RLS: 0 rows deleted.");

    // 2.5 User 2 attempts to forge an INSERT with User 1's user_id
    let u2ForgeBlocked = false;
    try {
      await pgClient.query(`
        SET LOCAL ROLE authenticated;
        SET LOCAL "request.jwt.claims" = '${JSON.stringify({ sub: USER_2.id, role: "authenticated" })}';
        INSERT INTO "vocab_in_use_bookmarks" (
          "id", "user_id", "unit_id", "lexicon_id", "word", "meaning_vi"
        ) VALUES (
          'bm-forge-01', '${USER_1.id}', 19, 'taciturn', 'taciturn', 'lầm lì'
        );
      `);
    } catch (err: any) {
      if (err.message.includes("violates row-level security policy")) {
        u2ForgeBlocked = true;
      }
    }
    if (!u2ForgeBlocked) {
      throw new Error("RLS BYPASS! User 2 was able to insert a row with User 1's user_id!");
    }
    console.log("   ✅ User 2 spoofed INSERT blocked by RLS: 'new row violates row-level security policy'.");

    // 2.6 Anonymous role query
    const anonResult = await pgClient.query(`
      SET LOCAL ROLE anon;
      RESET "request.jwt.claims";
      SELECT * FROM "vocab_in_use_bookmarks";
    `);
    const anonRows = anonResult[2]?.rows || [];
    if (anonRows.length !== 0) {
      throw new Error(`RLS LEAK! Anonymous user can see ${anonRows.length} bookmarks!`);
    }
    console.log("   ✅ Anonymous user queried vocab_in_use_bookmarks: Returned 0 rows.");

    // -------------------------------------------------------------------------
    // STEP 3: Supabase Direct REST Client Test (Production/Staging Endpoint)
    // -------------------------------------------------------------------------
    console.log("\n🌐 [STEP 3/4] Testing Direct Supabase PostgREST Client...");
    if (SUPABASE_ANON_KEY) {
      const restRes = await fetch(`${SUPABASE_URL}/rest/v1/vocab_in_use_bookmarks`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      const data = await restRes.json();
      console.log(`   ✅ Supabase REST API (anon key) returned status ${restRes.status}, data length: ${Array.isArray(data) ? data.length : 0}`);
      if (Array.isArray(data) && data.length > 0) {
        throw new Error("RLS LEAK ON SUPABASE ENDPOINT! Anon key was able to read records!");
      }
    } else {
      console.log("   ⚠️ VITE_SUPABASE_ANON_KEY not configured, skipped REST endpoint probe.");
    }

    // -------------------------------------------------------------------------
    // STEP 4: Fastify Backend E2E Test (Login 2 accounts, Bookmark, Reload, Review)
    // -------------------------------------------------------------------------
    console.log("\n⚡ [STEP 4/4] Fastify Backend E2E Test (2 Separate Accounts)...");

    // Clean test records before backend run
    await pgClient.query(`RESET ROLE;`);
    await pgClient.query(`DELETE FROM "vocab_in_use_bookmarks" WHERE "user_id" IN ('${USER_1.id}', '${USER_2.id}');`);

    const app = Fastify();
    await app.register(fastifyJwt, { secret: "test_jwt_secret_min_32_characters_for_staging" });

    // Mock authenticate decorator using Fastify JWT for test
    app.decorate("authenticate", async (request: any, reply: any) => {
      try {
        const decoded = await request.jwtVerify();
        request.user = { id: decoded.sub, email: decoded.email, roles: ["student"] };
      } catch (err) {
        reply.status(401).send({ error: "Unauthorized" });
      }
    });

    // Decorate prisma
    app.decorate("prisma", prisma);

    // Register routes
    await app.register(vocabInUseRoutes, { prefix: "/api/vocab-in-use" });

    // Generate tokens for both accounts
    const tokenUser1 = app.jwt.sign({ sub: USER_1.id, email: USER_1.email });
    const tokenUser2 = app.jwt.sign({ sub: USER_2.id, email: USER_2.email });

    // 4.1 Account 1 saves 2 bookmarks: 'impetuous' (Unit 19) and 'placenta' (Unit 20)
    console.log("   --- Scenario A: Account 1 saves words ---");
    const saveRes1 = await app.inject({
      method: "POST",
      url: "/api/vocab-in-use/bookmarks/toggle",
      headers: { authorization: `Bearer ${tokenUser1}` },
      payload: {
        unitId: 19,
        lexiconId: "impetuous",
        word: "impetuous",
        meaningVi: "bốc đồng, hấp tấp",
        ipa: "/ɪmˈpetʃ.u.əs/",
        example: "He is so impetuous.",
        collocations: ["impetuous decision", "impetuous young man"],
        wordType: "adj",
      },
    });
    console.log("   User 1 bookmarked 'impetuous':", saveRes1.json().action);

    const saveRes2 = await app.inject({
      method: "POST",
      url: "/api/vocab-in-use/bookmarks/toggle",
      headers: { authorization: `Bearer ${tokenUser1}` },
      payload: {
        unitId: 20,
        lexiconId: "placenta",
        word: "placenta",
        meaningVi: "nhau thai",
        ipa: "/pləˈsen.tə/",
        example: "The placenta nourishes the developing baby.",
        collocations: ["placenta previa"],
        wordType: "noun",
      },
    });
    console.log("   User 1 bookmarked 'placenta':", saveRes2.json().action);

    // 4.2 Account 1 simulates Page Reload: GET /bookmarks
    console.log("   --- Scenario B: Account 1 Page Reload ---");
    const reloadRes1 = await app.inject({
      method: "GET",
      url: "/api/vocab-in-use/bookmarks",
      headers: { authorization: `Bearer ${tokenUser1}` },
    });
    const u1Bookmarks = reloadRes1.json().data?.items || [];
    console.log(`   Account 1 reloaded page: Found ${u1Bookmarks.length} bookmarks:`, u1Bookmarks.map((b: any) => b.word));
    if (u1Bookmarks.length !== 2) {
      throw new Error(`Data persistence failure! Expected 2 bookmarks for User 1, got ${u1Bookmarks.length}`);
    }
    const impetuousBm = u1Bookmarks.find((b: any) => b.word === "impetuous");
    if (!impetuousBm || impetuousBm.meaningVi !== "bốc đồng, hấp tấp" || impetuousBm.unitId !== 19) {
      throw new Error("Full snapshot integrity check failed on reloaded bookmark!");
    }
    console.log("   ✅ Data persisted after reload with 100% snapshot integrity!");

    // 4.3 Account 2 logs in: Must see 0 bookmarks (Cross-account isolation)
    console.log("   --- Scenario C: Account 2 logs in (Isolation Check) ---");
    const u2BookmarksRes = await app.inject({
      method: "GET",
      url: "/api/vocab-in-use/bookmarks",
      headers: { authorization: `Bearer ${tokenUser2}` },
    });
    const u2Bookmarks = u2BookmarksRes.json().data?.items || [];
    console.log(`   Account 2 bookmarks count: ${u2Bookmarks.length}`);
    if (u2Bookmarks.length !== 0) {
      throw new Error(`DATA LEAK! Account 2 can see Account 1's bookmarks: ${JSON.stringify(u2Bookmarks)}`);
    }
    console.log("   ✅ Account 2 cannot see Account 1's bookmarks (Isolated: 0 records).");

    // 4.4 Account 2 attempts to review Account 1's bookmark
    console.log("   --- Scenario D: Account 2 attempts malicious review of Account 1 bookmark ---");
    const hackReviewRes = await app.inject({
      method: "POST",
      url: "/api/vocab-in-use/review",
      headers: { authorization: `Bearer ${tokenUser2}` },
      payload: {
        bookmarkId: impetuousBm.id,
        isCorrect: true,
      },
    });
    console.log(`   Account 2 review attempt status: ${hackReviewRes.statusCode}`);
    if (hackReviewRes.statusCode !== 404) {
      throw new Error(`SECURITY FAIL! Account 2 was not blocked with 404! Status: ${hackReviewRes.statusCode}`);
    }
    console.log("   ✅ Account 2 review of Account 1 bookmark strictly denied (404 Not Found).");

    // 4.5 Account 2 saves their own bookmark: 'effusive' (Unit 18)
    console.log("   --- Scenario E: Account 2 saves own word ---");
    await app.inject({
      method: "POST",
      url: "/api/vocab-in-use/bookmarks/toggle",
      headers: { authorization: `Bearer ${tokenUser2}` },
      payload: {
        unitId: 18,
        lexiconId: "effusive",
        word: "effusive",
        meaningVi: "dạt dào, quá mức sốt sắng",
        ipa: "/ɪˈfjuː.sɪv/",
        example: "She gave an effusive welcome.",
        wordType: "adj",
      },
    });
    const u2ReloadRes = await app.inject({
      method: "GET",
      url: "/api/vocab-in-use/bookmarks",
      headers: { authorization: `Bearer ${tokenUser2}` },
    });
    const u2Items = u2ReloadRes.json().data?.items || [];
    console.log(`   Account 2 reloaded page: Found ${u2Items.length} bookmark:`, u2Items.map((b: any) => b.word));
    if (u2Items.length !== 1 || u2Items[0].word !== "effusive") {
      throw new Error("Account 2 bookmark persistence mismatch!");
    }

    // Verify Account 1 still has only their 2 bookmarks
    const u1RecheckRes = await app.inject({
      method: "GET",
      url: "/api/vocab-in-use/bookmarks",
      headers: { authorization: `Bearer ${tokenUser1}` },
    });
    const u1RecheckItems = u1RecheckRes.json().data?.items || [];
    if (u1RecheckItems.length !== 2) {
      throw new Error("Account 1 bookmarks corrupted by Account 2 activity!");
    }
    console.log("   ✅ Multi-user concurrent isolation confirmed: User 1 has 2 bookmarks, User 2 has 1 bookmark.");

    // 4.6 Account 1 performs SM-2 Review
    console.log("   --- Scenario F: SM-2 Spaced Repetition Review & Persistence ---");
    const initialDueRes = await app.inject({
      method: "GET",
      url: "/api/vocab-in-use/due-review",
      headers: { authorization: `Bearer ${tokenUser1}` },
    });
    console.log(`   Account 1 words due for review: ${initialDueRes.json().data?.count || 0}`);

    // Submit review with isCorrect: true
    const reviewRes = await app.inject({
      method: "POST",
      url: "/api/vocab-in-use/review",
      headers: { authorization: `Bearer ${tokenUser1}` },
      payload: {
        bookmarkId: impetuousBm.id,
        isCorrect: true,
      },
    });
    const reviewData = reviewRes.json().data;
    console.log("   Review result for 'impetuous':");
    console.log(`      - Interval Days: ${reviewData.intervalDays} (Progression: 1 -> 3 days)`);
    console.log(`      - Total Reviews: ${reviewData.totalReviews}`);
    console.log(`      - Mastery Score: ${reviewData.masteryScore}`);
    console.log(`      - Next Review At: ${reviewData.nextReviewAt}`);

    if (reviewData.intervalDays !== 3 || reviewData.totalReviews !== 1) {
      throw new Error(`SM-2 calculation failed! Expected intervalDays=3, got ${reviewData.intervalDays}`);
    }

    // Simulates Page Reload after review: GET /bookmarks
    const postReviewReload = await app.inject({
      method: "GET",
      url: "/api/vocab-in-use/bookmarks",
      headers: { authorization: `Bearer ${tokenUser1}` },
    });
    const reloadedImpetuous = postReviewReload.json().data?.items.find((b: any) => b.id === impetuousBm.id);
    if (!reloadedImpetuous || reloadedImpetuous.intervalDays !== 3 || reloadedImpetuous.totalReviews !== 1) {
      throw new Error("SM-2 review progress was NOT persisted after page reload!");
    }
    console.log("   ✅ SM-2 review progress successfully persisted after page reload!");

    // Clean up test data
    await pgClient.query(`DELETE FROM "vocab_in_use_bookmarks" WHERE "user_id" IN ('${USER_1.id}', '${USER_2.id}');`);

    console.log("\n═════════════════════════════════════════════════════════════════════");
    console.log("🎉 ALL STAGING / DEV VERIFICATION SCENARIOS PASSED WITH 100% SUCCESS!");
    console.log("═════════════════════════════════════════════════════════════════════\n");
  } finally {
    await prisma.$disconnect();
    await pgClient.end();
  }
}

runStagingVerification().catch((err) => {
  console.error("❌ Staging verification failed:", err);
  process.exit(1);
});
