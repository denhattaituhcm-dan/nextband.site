import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const OLD_URL = "https://gzpdlqxjggyxlkeatvvf.supabase.co";
const OLD_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGRscXhqZ2d5eGxrZWF0dnZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTI5Nzc2MywiZXhwIjoyMTAwODczNzYzfQ.U7gdBESktCmGq25Eh4uLoDpbMo78X2s67cvdHTROC1E";

const NEW_URL = "https://dmamqxiukfiyhfbbcqsq.supabase.co";
const NEW_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtYW1xeGl1a2ZpeWhmYmJjcXNxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDQzNTg3MiwiZXhwIjoyMTA2MDExODcyfQ.LZZXXodeRqrHxuVZ5M0VqVmrP7F4RZW3vtkwr9oNlSQ";

const supabaseOld = createClient(OLD_URL, OLD_SERVICE_KEY);
const supabaseNew = createClient(NEW_URL, NEW_SERVICE_KEY);

async function ensureBuckets() {
  console.log("Ensuring buckets exist on new project...");
  const bucketsToCreate = [
    { name: "exam-assets", public: true },
    { name: "speaking-recordings", public: false }
  ];

  const { data: currentBuckets, error } = await supabaseNew.storage.listBuckets();
  if (error) throw error;
  const currentNames = currentBuckets.map(b => b.name);

  for (const b of bucketsToCreate) {
    if (!currentNames.includes(b.name)) {
      console.log(`Creating bucket '${b.name}' (public: ${b.public})...`);
      const { error: cErr } = await supabaseNew.storage.createBucket(b.name, {
        public: b.public
      });
      if (cErr) console.error(`Error creating bucket ${b.name}:`, cErr.message);
      else console.log(`✓ Bucket '${b.name}' created successfully.`);
    } else {
      console.log(`✓ Bucket '${b.name}' already exists.`);
    }
  }
}

async function listAllFiles(client, bucket, folder = "") {
  let allFiles = [];
  const { data, error } = await client.storage.from(bucket).list(folder, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" }
  });

  if (error) {
    console.error(`Error listing ${bucket}/${folder}:`, error.message);
    return allFiles;
  }

  for (const item of data) {
    const itemPath = folder ? `${folder}/${item.name}` : item.name;
    if (item.id === null) {
      const subFiles = await listAllFiles(client, bucket, itemPath);
      allFiles = allFiles.concat(subFiles);
    } else {
      allFiles.push({ path: itemPath, size: item.metadata?.size || 0, mimeType: item.metadata?.mimetype });
    }
  }

  return allFiles;
}

async function migrateStorage() {
  await ensureBuckets();
  const bucket = "exam-assets";
  console.log(`\nStarting migration for bucket '${bucket}'...`);
  const files = await listAllFiles(supabaseOld, bucket);
  console.log(`Total files to copy: ${files.length}`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const prefix = `[${i + 1}/${files.length}]`;
    try {
      // 1. Download from old
      const { data: blob, error: dlErr } = await supabaseOld.storage.from(bucket).download(file.path);
      if (dlErr) {
        console.error(`${prefix} ❌ Download failed: ${file.path}`, dlErr.message);
        failCount++;
        continue;
      }

      // Convert Blob to ArrayBuffer / Buffer
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 2. Upload to new
      const { error: upErr } = await supabaseNew.storage.from(bucket).upload(file.path, buffer, {
        contentType: file.mimeType || "application/octet-stream",
        upsert: true
      });

      if (upErr) {
        console.error(`${prefix} ❌ Upload failed: ${file.path}`, upErr.message);
        failCount++;
      } else {
        successCount++;
        if ((i + 1) % 10 === 0 || i === files.length - 1) {
          console.log(`${prefix} ✓ Progress: ${successCount} files migrated.`);
        }
      }
    } catch (e) {
      console.error(`${prefix} ❌ Error: ${file.path}`, e.message);
      failCount++;
    }
  }

  console.log(`\n🎉 STORAGE MIGRATION COMPLETED!`);
  console.log(`✓ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
}

migrateStorage().catch(console.error);
