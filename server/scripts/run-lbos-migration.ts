/**
 * Run LBOS migration SQL directly via Prisma $executeRawUnsafe
 * Bypasses advisory lock issue with PgBouncer pooler
 *
 * Run: npx tsx server/scripts/run-lbos-migration.ts
 */
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function runMigration() {
  const sqlPath = join(
    process.cwd(),
    'prisma/migrations/20260905000000_add_lbos_snapshot_radar/migration.sql'
  );
  const sql = readFileSync(sqlPath, 'utf-8');

  const statements = splitStatements(sql);
  console.log(`Running ${statements.length} statements...\n`);

  let ok = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (!stmt) continue;
    try {
      await prisma.$executeRawUnsafe(stmt + (stmt.endsWith(';') ? '' : ';'));
      console.log(`✓ [${i + 1}] ${stmt.substring(0, 80).replace(/\n/g, ' ')}...`);
      ok++;
    } catch (err: any) {
      const msg = err.message ?? '';
      if (msg.includes('already exists') || msg.includes('duplicate') || msg.includes('P2010')) {
        console.log(`⚠ [${i + 1}] Already exists, skip: ${stmt.substring(0, 60).replace(/\n/g, ' ')}`);
        skipped++;
      } else {
        console.error(`✗ [${i + 1}] FAILED: ${msg.substring(0, 200)}`);
        errors++;
      }
    }
  }

  // Mark migration as applied
  try {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "_prisma_migrations" (
        id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count
      ) VALUES (
        gen_random_uuid()::text,
        'manual-lbos',
        NOW(),
        '20260905000000_add_lbos_snapshot_radar',
        NULL, NULL, NOW(), 1
      )
      ON CONFLICT DO NOTHING
    `);
    console.log('\n✓ Migration recorded in _prisma_migrations');
  } catch (err: any) {
    console.log('\n⚠ Could not record in _prisma_migrations:', err.message?.substring(0, 100));
  }

  console.log(`\nDone: ${ok} applied, ${skipped} skipped, ${errors} errors`);
}

function splitStatements(sql: string): string[] {
  const result: string[] = [];
  let current = '';
  let inDollarBlock = false;

  for (const line of sql.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--')) continue;

    if (!inDollarBlock && trimmed.startsWith('DO $$')) {
      inDollarBlock = true;
    }

    if (inDollarBlock) {
      current += line + '\n';
      if (trimmed === '$$;') {
        result.push(current.trim());
        current = '';
        inDollarBlock = false;
      }
      continue;
    }

    current += line + '\n';
    if (trimmed.endsWith(';')) {
      const stmt = current.trim().replace(/;$/, '');
      if (stmt) result.push(stmt);
      current = '';
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

runMigration()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
