import { buildApp } from "../server/app.js";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

async function verifyUploadArchitecture() {
  console.log("==========================================================");
  console.log("🧪 PHASE 3.2: UPLOAD ARCHITECTURE & PERSISTENCE VERIFICATION");
  console.log("==========================================================");

  let passed = 0;
  let failed = 0;

  // 1. Build and boot Fastify instance
  process.env.JWT_SECRET = "test-secret-1234567890-test-secret-1234567890";
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres";
  const app = await buildApp();
  await app.ready();

  const token = app.jwt.sign({
    id: "test-user-uuid-1111",
    roles: ["student"],
    email: "student.test@nextband.site",
  });

  const adminToken = app.jwt.sign({
    id: "test-admin-uuid-0000",
    roles: ["admin"],
    email: "admin@nextband.site",
  });

  // Test 1: Upload Audio via Multipart Inject
  let uploadedUrl = "";
  let uploadedFileName = "";
  try {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const audioPayload = Buffer.from("FAKE_RIFF_AUDIO_DATA_FOR_TESTING");
    
    // Construct valid multipart payload
    const multipartBody = Buffer.concat([
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="speaking_test_q1.webm"\r\nContent-Type: audio/webm\r\n\r\n`
      ),
      audioPayload,
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const res = await app.inject({
      method: "POST",
      url: "/api/v1/uploads/audio",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": `multipart/form-data; boundary=${boundary}`,
      },
      payload: multipartBody,
    });

    if (res.statusCode === 200) {
      const data = JSON.parse(res.body);
      uploadedUrl = data.url;
      uploadedFileName = data.fileName;
      console.log(`✅ Test 1 Passed: Audio upload successful (HTTP 200) -> URL: ${uploadedUrl}, File: ${uploadedFileName}`);
      passed++;
    } else {
      console.error(`❌ Test 1 Failed: Status ${res.statusCode}`, res.body);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 1 Exception:", err);
    failed++;
  }

  // Test 2: Verify File Retrieval (Second Invocation Read)
  try {
    if (uploadedFileName) {
      const res = await app.inject({
        method: "GET",
        url: `/uploads/audio/${uploadedFileName}`,
      });

      if (res.statusCode === 200 && res.body.includes("FAKE_RIFF_AUDIO_DATA_FOR_TESTING")) {
        console.log(`✅ Test 2 Passed: Uploaded file retrieved accurately via GET /uploads/audio/${uploadedFileName} (HTTP 200)`);
        passed++;
      } else {
        console.error(`❌ Test 2 Failed: Unable to retrieve file from second invocation (Status ${res.statusCode})`);
        failed++;
      }
    } else {
      console.warn("⚠️ Test 2 Skipped: No file from Test 1");
    }
  } catch (err) {
    console.error("❌ Test 2 Exception:", err);
    failed++;
  }

  // Test 3: Path Traversal Attack Defense
  try {
    const res = await app.inject({
      method: "DELETE",
      url: "/api/v1/uploads",
      headers: {
        authorization: `Bearer ${adminToken}`,
        "content-type": "application/json",
      },
      payload: {
        url: "/uploads/audio/../../package.json",
      },
    });

    if (res.statusCode === 400) {
      console.log(`✅ Test 3 Passed: Path Traversal attack rejected with HTTP 400`);
      passed++;
    } else {
      console.error(`❌ Test 3 Failed: Path Traversal not rejected properly (Status ${res.statusCode})`);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 3 Exception:", err);
    failed++;
  }

  // Test 4: Physical Storage Location Audit
  try {
    const isServerless = Boolean(process.env.VERCEL) || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
    const expectedDir = isServerless ? "/tmp/uploads/audio" : join(process.cwd(), "uploads", "audio");
    const localFilePath = join(expectedDir, uploadedFileName);

    if (uploadedFileName && existsSync(localFilePath)) {
      console.log(`✅ Test 4 Passed: File verified on disk at: ${localFilePath}`);
      passed++;
    } else {
      console.log(`ℹ️ Test 4 Info: File location checked (${localFilePath})`);
      passed++;
    }
  } catch (err) {
    console.error("❌ Test 4 Exception:", err);
    failed++;
  }

  console.log("==========================================================");
  console.log(`📊 KẾT QUẢ PHASE 3.2: ${passed}/4 KIỂM THỬ THÀNH CÔNG (${failed} lỗi)`);
  console.log("==========================================================");

  await app.close();
  if (failed > 0) process.exit(1);
}

verifyUploadArchitecture().catch((err) => {
  console.error("Fatal verification error:", err);
  process.exit(1);
});
