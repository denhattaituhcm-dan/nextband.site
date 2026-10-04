/**
 * SCRIPT: SCAN & CLEAN ORPHAN STORAGE ASSETS (SAFE AUDIT & BATCH PURGE)
 * Project: NextBand Supabase Storage
 * Target Buckets: exam-assets (audio/, images/), dictation-audio, etc.
 * 
 * Logic:
 * 1. Read all valid references from Database (ExamSection, QuestionGroup, Question, Answer, Course, User, SpeakingRecordingAsset).
 * 2. Connect to Supabase Storage using SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL.
 * 3. List all files recursively in the specified bucket & prefix.
 * 4. Match against Database active whitelist.
 * 5. Dry-run mode by default, or delete if --execute is passed.
 */

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://qvtkcitxncnxsrjymvrt.supabase.co";

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error("❌ ERROR: SUPABASE_SERVICE_ROLE_KEY is required to manage storage.");
  console.error("Please provide SUPABASE_SERVICE_ROLE_KEY in .env or run with:");
  console.error("  $env:SUPABASE_SERVICE_ROLE_KEY=\"<key>\"; node scripts/clean_orphan_storage.mjs");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const prisma = new PrismaClient();

// Parse CLI flags
const isExecute = process.argv.includes("--execute");
const targetBucket = process.argv.find((arg) => arg.startsWith("--bucket="))?.split("=")[1] || "exam-assets";
const targetFolder = process.argv.find((arg) => arg.startsWith("--folder="))?.split("=")[1] || ""; // e.g. "audio" or "images"

async function getAllActiveDbReferences() {
  console.log("🔍 [1/4] Scanning Database for active audio & image references...");
  const validFilenames = new Set();

  const addRef = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== "string") return;
    const clean = rawUrl.trim();
    if (!clean) return;

    // Extract filename from URL or path
    const parts = clean.split(/[/?#]/);
    const filename = parts.pop();
    if (filename && filename.includes(".")) {
      validFilenames.add(filename);
    }

    // Also store normalized relative path if present
    const normalized = clean.replace(/^[/\\]+/, "");
    validFilenames.add(normalized);
  };

  try {
    // 1. Exam Sections (audio_url)
    const sections = await prisma.examSection.findMany({
      where: { audioUrl: { not: null } },
      select: { audioUrl: true },
    });
    sections.forEach((s) => addRef(s.audioUrl));

    // 2. Question Groups (audio_url)
    const groups = await prisma.questionGroup.findMany({
      where: { audioUrl: { not: null } },
      select: { audioUrl: true },
    });
    groups.forEach((g) => addRef(g.audioUrl));

    // 3. Questions (audio_url)
    const questions = await prisma.question.findMany({
      where: { audioUrl: { not: null } },
      select: { audioUrl: true },
    });
    questions.forEach((q) => addRef(q.audioUrl));

    // 4. Question Versions (audio_url)
    const qVersions = await prisma.questionVersion.findMany({
      where: { audioUrl: { not: null } },
      select: { audioUrl: true },
    });
    qVersions.forEach((qv) => addRef(qv.audioUrl));

    // 5. Answers (audio_url & answer_text)
    const answers = await prisma.answer.findMany({
      where: {
        OR: [
          { audioUrl: { not: null } },
          { answerText: { contains: "audio" } },
          { answerText: { contains: "uploads" } },
        ],
      },
      select: { audioUrl: true, answerText: true },
    });
    answers.forEach((a) => {
      addRef(a.audioUrl);
      if (a.answerText && (a.answerText.includes(".mp3") || a.answerText.includes(".webm") || a.answerText.includes(".ogg") || a.answerText.includes(".wav"))) {
        addRef(a.answerText);
      }
    });

    // 6. Speaking Recording Assets
    const speakingAssets = await prisma.speakingRecordingAsset.findMany({
      select: { storagePath: true },
    });
    speakingAssets.forEach((sa) => addRef(sa.storagePath));

    // 7. Course Thumbnails (images)
    const courses = await prisma.course.findMany({
      where: { thumbnailUrl: { not: null } },
      select: { thumbnailUrl: true },
    });
    courses.forEach((c) => addRef(c.thumbnailUrl));

    // 8. User Avatars
    const users = await prisma.user.findMany({
      where: { avatarUrl: { not: null } },
      select: { avatarUrl: true },
    });
    users.forEach((u) => addRef(u.avatarUrl));

    console.log(`  ✅ Extracted ${validFilenames.size} unique active asset references from Database.`);
  } catch (err) {
    console.warn("⚠️ Warning querying some DB tables, continuing with best effort:", err.message);
  }

  return validFilenames;
}

async function listFilesInFolder(bucket, prefix) {
  const files = [];
  const limit = 100;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase.storage.from(bucket).list(prefix, {
      limit,
      offset,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error(`❌ Error listing files in ${bucket}/${prefix}:`, error.message);
      break;
    }

    if (!data || data.length === 0) {
      break;
    }

    for (const item of data) {
      const itemPath = prefix ? `${prefix}/${item.name}` : item.name;
      // If it's a folder (id === null or no metadata.size or is directory)
      if (!item.id || item.metadata === null) {
        // Recurse into subdirectory
        const subFiles = await listFilesInFolder(bucket, itemPath);
        files.push(...subFiles);
      } else {
        files.push({
          name: item.name,
          id: item.id,
          fullPath: itemPath,
          metadata: item.metadata,
          sizeBytes: item.metadata?.size || 0,
        });
      }
    }

    if (data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }

  return files;
}

async function run() {
  console.log("=========================================================");
  console.log("🚀 SUPABASE STORAGE ORPHAN SCANNER & PURGE TOOL");
  console.log(`🌐 Target Supabase URL: ${supabaseUrl}`);
  console.log(`📦 Target Bucket: ${targetBucket}`);
  if (targetFolder) console.log(`📁 Target Subfolder: ${targetFolder}`);
  console.log(`⚙️ Mode: ${isExecute ? "🚨 REAL EXECUTE (DELETING FILES)" : "🛡️ DRY-RUN (AUDIT ONLY)"}`);
  console.log("=========================================================\n");

  // Step 1: Scan DB
  const dbWhitelist = await getAllActiveDbReferences();

  // Step 2: List files in Storage
  console.log(`\n📂 [2/4] Listing all files in bucket "${targetBucket}"...`);
  const storageFiles = await listFilesInFolder(targetBucket, targetFolder);
  console.log(`  ✅ Found ${storageFiles.length} files in Storage.`);

  let totalStorageBytes = 0;
  storageFiles.forEach((f) => {
    totalStorageBytes += f.sizeBytes || 0;
  });
  console.log(`  📊 Total Storage Size: ${(totalStorageBytes / (1024 * 1024)).toFixed(2)} MB`);

  // Step 3: Identify Orphan Files
  console.log("\n🔎 [3/4] Comparing Storage files with Database Whitelist...");
  const orphanFiles = [];
  let orphanBytes = 0;

  for (const file of storageFiles) {
    const filename = file.name;
    const fullPath = file.fullPath;

    // Check if filename or fullPath exists in DB references
    const isReferenced =
      dbWhitelist.has(filename) ||
      dbWhitelist.has(fullPath) ||
      Array.from(dbWhitelist).some((ref) => ref.includes(filename) || ref.endsWith(fullPath));

    if (!isReferenced) {
      orphanFiles.push(file);
      orphanBytes += file.sizeBytes || 0;
    }
  }

  console.log(`\n🎯 AUDIT SUMMARY:`);
  console.log(`  - Total Files in bucket/folder: ${storageFiles.length}`);
  console.log(`  - Active Files in DB: ${storageFiles.length - orphanFiles.length}`);
  console.log(`  - Orphan / Junk Files: ${orphanFiles.length}`);
  console.log(`  - Reclaimable Disk Space: ${(orphanBytes / (1024 * 1024)).toFixed(2)} MB`);

  if (orphanFiles.length > 0) {
    console.log(`\nTop 10 Sample Orphan Files to be deleted:`);
    orphanFiles.slice(0, 10).forEach((f, idx) => {
      const mb = ((f.sizeBytes || 0) / (1024 * 1024)).toFixed(2);
      console.log(`  ${idx + 1}. [${mb} MB] ${f.fullPath}`);
    });
  }

  // Step 4: Batch Delete
  if (orphanFiles.length === 0) {
    console.log("\n✨ Storage is completely clean! No orphan files found.");
    return;
  }

  if (!isExecute) {
    console.log("\n🛡️ DRY-RUN COMPLETED. No files were deleted.");
    console.log("👉 To execute the deletion, run this command:");
    console.log(`   node scripts/clean_orphan_storage.mjs --bucket=${targetBucket} --folder=${targetFolder} --execute\n`);
    return;
  }

  console.log(`\n🚨 [4/4] EXECUTING BATCH DELETION OF ${orphanFiles.length} ORPHAN FILES...`);

  // Batch delete in chunks of 50
  const BATCH_SIZE = 50;
  const pathsToDelete = orphanFiles.map((f) => f.fullPath);
  let deletedCount = 0;

  for (let i = 0; i < pathsToDelete.length; i += BATCH_SIZE) {
    const chunk = pathsToDelete.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase.storage.from(targetBucket).remove(chunk);

    if (error) {
      console.error(`❌ Error deleting batch ${i / BATCH_SIZE + 1}:`, error.message);
    } else {
      deletedCount += chunk.length;
      console.log(`  🗑️ Deleted batch ${Math.min(deletedCount, pathsToDelete.length)} / ${pathsToDelete.length} files...`);
    }
  }

  console.log(`\n🎉 SUCCESS: Deleted ${deletedCount} orphan files!`);
  console.log(`💾 Reclaimed ~${(orphanBytes / (1024 * 1024)).toFixed(2)} MB of Supabase Storage space.`);
}

run()
  .catch((err) => {
    console.error("💥 Unhandled Error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
