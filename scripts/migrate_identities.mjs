import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function migrateIdentities() {
  const isDryRun = process.argv.includes("--dry-run");
  console.log("=================================================================");
  console.log(`🚀 IDENTITY MIGRATION SCRIPT (${isDryRun ? "DRY RUN MODE" : "EXECUTE MODE"})`);
  console.log("=================================================================\n");

  const [profiles, userRoles] = await Promise.all([
    prisma.user.findMany(),
    prisma.userRole.findMany(),
  ]);

  const validUserIds = new Set(profiles.map((p) => p.userId));
  const orphanRoles = userRoles.filter((r) => !validUserIds.has(r.userId));

  console.log(`Found ${orphanRoles.length} orphaned user_roles:`);
  orphanRoles.forEach((r) => console.log(`  - Role ${r.id} for non-existent userId ${r.userId} (${r.role})`));

  if (!isDryRun && orphanRoles.length > 0) {
    console.log(`\nCleaning up ${orphanRoles.length} orphaned user_roles inside transaction...`);
    await prisma.$transaction(async (tx) => {
      const deleteResult = await tx.userRole.deleteMany({
        where: { id: { in: orphanRoles.map((r) => r.id) } },
      });
      console.log(`✅ Successfully deleted ${deleteResult.count} orphan user_roles.`);
    });
  } else if (isDryRun) {
    console.log("\n[DRY RUN] Would delete orphaned user_roles above.");
  }

  // Check duplicate profiles: phamminhkhang23032011@gmail.com
  const duplicateEmail = "phamminhkhang23032011@gmail.com";
  const dupProfiles = profiles.filter((p) => p.email?.toLowerCase() === duplicateEmail);
  if (dupProfiles.length > 1) {
    console.log(`\nFound duplicate profiles for ${duplicateEmail}:`, dupProfiles.map((p) => ({ id: p.id, userId: p.userId, fullName: p.fullName })));
    // Keep the one with proper full_name ('Pham Minh Khang') and remove the empty mock profile
    const keeper = dupProfiles.find((p) => p.fullName === "Pham Minh Khang") || dupProfiles[0];
    const toRemove = dupProfiles.filter((p) => p.id !== keeper.id);

    if (!isDryRun) {
      await prisma.$transaction(async (tx) => {
        for (const rem of toRemove) {
          console.log(`Consolidating duplicate profile ${rem.userId} into canonical ${keeper.userId}...`);
          await tx.userRole.deleteMany({ where: { userId: rem.userId } });
          await tx.user.delete({ where: { id: rem.id } });
        }
      });
      console.log("✅ Duplicate profile consolidation complete.");
    } else {
      console.log(`[DRY RUN] Would keep ${keeper.userId} and delete duplicates:`, toRemove.map((p) => p.userId));
    }
  }

  console.log("\n=================================================================");
  console.log("✅ MIGRATION FINISHED");
  console.log("=================================================================");
}

migrateIdentities()
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
