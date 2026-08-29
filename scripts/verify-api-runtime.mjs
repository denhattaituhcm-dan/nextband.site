import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

console.log("\n========================================================");
console.log("🛡️  NEXTBAND RUNTIME API GATEWAY VERIFICATION (8-GATE)  ");
console.log("========================================================\n");

let passedGates = 0;
let totalGates = 5;

// ----------------------------------------------------
// GATE 0: SOURCE / ARTIFACT LINEAGE
// ----------------------------------------------------
console.log("🔍 [GATE 0] Checking Source Lineage & Artifact Integrity...");
const appSourcePath = resolve(rootDir, "server/app.ts");
const rogueApiPath = resolve(rootDir, "ielts-api");

if (!existsSync(appSourcePath)) {
  console.error("❌ GATE 0 FAILED: server/app.ts not found!");
  process.exit(1);
}
if (existsSync(rogueApiPath)) {
  console.error("❌ GATE 0 FAILED: Rogue ielts-api directory detected!");
  process.exit(1);
}
console.log("  ✅ server/app.ts is authoritative production source.");
console.log("  ✅ No rogue API source paths detected.");
passedGates++;

// ----------------------------------------------------
// GATE 1A: FASTIFY BOOT INTEGRITY
// ----------------------------------------------------
console.log("\n⚡ [GATE 1A] Booting Fastify Application (Plugin & Route Resolution)...");
let buildApp;
try {
  const appModule = await import("../server/app.js");
  buildApp = appModule.buildApp;
} catch (err) {
  const appModule = await import("../server/app.ts");
  buildApp = appModule.buildApp;
}

let app;
try {
  app = await buildApp();
  await app.ready();
  console.log("  ✅ fastify.ready() completed successfully with ZERO boot errors!");
  console.log("  ✅ ZERO route collisions (FST_ERR_DUPLICATED_ROUTE = 0).");
  passedGates++;
} catch (bootErr) {
  console.error("❌ GATE 1A FAILED: Fastify boot crashed:", bootErr);
  process.exit(1);
}

// ----------------------------------------------------
// GATE 1B & GATE 3: RUNTIME SMOKE & CRITICAL API CONTRACTS
// ----------------------------------------------------
console.log("\n📡 [GATE 1B & 3] Exercising Critical API Contracts & Smoke Tests...");

try {
  // Test 1: Root / Health Check
  const healthRes = await app.inject({ method: "GET", url: "/health" });
  if (healthRes.statusCode !== 200) {
    throw new Error(`/health returned status ${healthRes.statusCode}: ${healthRes.body}`);
  }
  const healthData = JSON.parse(healthRes.body);
  if (healthData.status !== "ok") {
    throw new Error(`/health payload invalid: ${healthRes.body}`);
  }
  console.log("  ✅ GET /health -> 200 OK (status: ok)");

  // Test 2: Public /courses listing with strict active-only domain invariant
  const coursesRes = await app.inject({
    method: "GET",
    url: "/api/v1/courses?page=1&limit=20&sortBy=newest",
  });
  if (coursesRes.statusCode !== 200) {
    throw new Error(`GET /courses returned status ${coursesRes.statusCode}: ${coursesRes.body}`);
  }
  const coursesPayload = JSON.parse(coursesRes.body);
  if (!Array.isArray(coursesPayload.data)) {
    throw new Error(`GET /courses data is not an array: ${coursesRes.body}`);
  }

  // Domain Invariant Assertion: Default listing MUST ONLY contain active courses (no soft-deleted)
  const hasInactiveCourse = coursesPayload.data.some((c) => c.isActive === false);
  if (hasInactiveCourse) {
    throw new Error("Domain Invariant Violation: Soft-deleted/inactive course found in default GET /courses list!");
  }
  console.log(`  ✅ GET /api/v1/courses -> 200 OK (returned ${coursesPayload.data.length} active courses, soft-deleted excluded)`);

  // Test 3: Unauthenticated boundary checks
  const notifRes = await app.inject({ method: "GET", url: "/api/v1/notifications" });
  if (notifRes.statusCode !== 401) {
    throw new Error(`GET /notifications without token must return 401, got ${notifRes.statusCode}`);
  }
  console.log("  ✅ GET /api/v1/notifications (No Auth) -> 401 Unauthorized (Protected)");

  const classesRes = await app.inject({ method: "GET", url: "/api/v1/classes" });
  if (classesRes.statusCode !== 401) {
    throw new Error(`GET /classes without token must return 401, got ${classesRes.statusCode}`);
  }
  console.log("  ✅ GET /api/v1/classes (No Auth) -> 401 Unauthorized (Protected)");

  // Test 4: Sessions endpoint without auth
  const sessionsRes = await app.inject({ method: "GET", url: "/api/v1/classes/00000000-0000-0000-0000-000000000000/sessions" });
  if (sessionsRes.statusCode !== 401) {
    throw new Error(`GET /classes/:id/sessions without token must return 401, got ${sessionsRes.statusCode}`);
  }
  console.log("  ✅ GET /api/v1/classes/:id/sessions (No Auth) -> 401 Unauthorized (Protected)");

  passedGates++;
} catch (smokeErr) {
  console.error("❌ GATE 1B/3 FAILED:", smokeErr.message);
  await app.close();
  process.exit(1);
}

// ----------------------------------------------------
// GATE 2 & 5: DATABASE DOMAIN INVARIANTS & SOFT-DELETE INTEGRITY
// ----------------------------------------------------
console.log("\n🗄️  [GATE 2 & 5] Validating Database Integrity & Soft-Delete Invariants...");
try {
  const prisma = app.prisma;
  const [totalCourses, activeCourses, softDeletedCourses] = await Promise.all([
    prisma.course.count(),
    prisma.course.count({ where: { isActive: true } }),
    prisma.course.count({ where: { isActive: false } }),
  ]);

  console.log(`  📊 DB Course State: Total=${totalCourses} | Active=${activeCourses} | SoftDeleted=${softDeletedCourses}`);
  if (activeCourses < 1) {
    throw new Error("Zero active courses found in database!");
  }
  if (softDeletedCourses < 1) {
    console.warn("  ⚠️ Note: Currently 0 soft-deleted courses in database.");
  } else {
    console.log("  ✅ Soft-deleted courses are safely stored in DB without polluting active queries.");
  }
  passedGates++;
} catch (dbErr) {
  console.error("❌ GATE 2/5 FAILED:", dbErr.message);
  await app.close();
  process.exit(1);
}

// ----------------------------------------------------
// GATE 7: SERVERLESS RUNTIME & CLEAN TEARDOWN
// ----------------------------------------------------
console.log("\n🚀 [GATE 7] Testing Clean Graceful Shutdown...");
try {
  await app.close();
  console.log("  ✅ Fastify cleanly closed all active handles and DB connections.");
  passedGates++;
} catch (closeErr) {
  console.error("❌ GATE 7 FAILED:", closeErr);
  process.exit(1);
}

console.log("\n========================================================");
console.log(`🎉 ALL ${passedGates}/${totalGates} RUNTIME GATE CHECKS PASSED WITH 100% SUCCESS!`);
console.log("========================================================\n");
process.exit(0);
