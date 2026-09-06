/**
 * ── CENTRALIZED SRE TEST DATABASE SAFETY GUARD (SEC-01 / P0) ──
 * 
 * Enforces strict fail-closed isolation between Test Runners and Production Database.
 * Rule: NO TEST SUITE SHALL EVER CONNECT TO PRODUCTION SUPABASE UNDER ANY CIRCUMSTANCES.
 */

import { PrismaClient } from "@prisma/client";

// Production identifiers that are STRICTLY FORBIDDEN in any test execution
export const PRODUCTION_DB_DENYLIST = [
  "gzpdlqxjggyxlkeatvvf",
  "aws-0-ap-southeast-2.pooler.supabase.com",
  "nextband.site",
  "api.nextband.site",
];

/**
 * Checks if a given connection string points to the Production Database.
 */
export function isProductionDatabaseUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== "string") return false;
  const lower = url.toLowerCase();
  return PRODUCTION_DB_DENYLIST.some((blocked) => lower.includes(blocked));
}

/**
 * Asserts that the provided connection string is 100% safe and NOT production.
 * Throws a fatal error and terminates execution if production is detected.
 */
export function assertNotProductionDb(url: string | undefined | null): void {
  if (!url) return;
  if (isProductionDatabaseUrl(url)) {
    const safeUrl = url.replace(/:[^:@]+@/, ":***@");
    const errorMsg = [
      "",
      "🚨🚨🚨 [CRITICAL SRE SAFETY VIOLATION - P0 BLOCKED] 🚨🚨🚨",
      "Attempted to connect to Production Supabase Database from Test Environment!",
      `Target URL: ${safeUrl}`,
      "",
      "Access strictly DENIED. Execution terminated to protect Production Data Integrity.",
      "To run database-dependent tests, configure a dedicated TEST database in .env.test",
      "(e.g., local PostgreSQL on Docker or a separate testing Supabase project).",
      "",
    ].join("\n");
    console.error(errorMsg);
    throw new Error("CRITICAL_SRE_SAFETY_VIOLATION: Production database access forbidden in tests!");
  }
}


/**
 * Resolves the active test database URL.
 * Returns null if no dedicated test database is configured or if candidate is production.
 */
export function resolveTestDatabaseUrl(): string | null {
  const candidate = process.env.DATABASE_URL_TEST || process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
  if (!candidate) return null;
  if (isProductionDatabaseUrl(candidate)) {
    return null;
  }
  return candidate;
}

/**
 * Checks if a safe, dedicated test database is configured and available.
 */
export function isTestDatabaseConfigured(): boolean {
  const url = resolveTestDatabaseUrl();
  return Boolean(url && !isProductionDatabaseUrl(url));
}

/**
 * Safe PrismaClient factory for integration tests.
 * Only instantiates if a valid, non-production test database is configured.
 */
export function createSafeTestPrismaClient(): PrismaClient {
  const testDbUrl = resolveTestDatabaseUrl();
  if (!testDbUrl) {
    throw new Error(
      "❌ [SRE P0] Cannot instantiate PrismaClient for test: No dedicated test database configured. " +
      "Set DATABASE_URL_TEST in .env.test to a dedicated test PostgreSQL instance."
    );
  }
  assertNotProductionDb(testDbUrl);
  return new PrismaClient({
    datasources: {
      db: { url: testDbUrl },
    },
    log: ["error"],
  });
}
