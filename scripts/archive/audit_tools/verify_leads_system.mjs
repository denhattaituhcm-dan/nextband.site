import handler from "../api/v1/leads.js";

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.body = null;
  }
  setHeader(key, val) {
    this.headers[key] = val;
    return this;
  }
  status(code) {
    this.statusCode = code;
    return this;
  }
  json(data) {
    this.body = data;
    return this;
  }
  end() {
    return this;
  }
}

async function runTests() {
  console.log("==================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ HỆ THỐNG LEADS SERVERLESS API");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  // Test 1: Validation failure (Thiếu số điện thoại)
  try {
    const req = {
      method: "POST",
      body: {
        leadType: "QUICK_TRIAL",
        fullName: "Nguyễn Văn Test",
        phone: "",
      },
    };
    const res = new MockResponse();
    await handler(req, res);

    if (res.statusCode === 400 && res.body?.success === false) {
      console.log("✅ Test 1 Passed: Validation bắt đúng lỗi thiếu SĐT (HTTP 400)");
      passed++;
    } else {
      console.error("❌ Test 1 Failed:", res.statusCode, res.body);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 1 Exception:", err);
    failed++;
  }

  // Test 2: Quick Trial Lead Submission (Thành công lưu Supabase)
  try {
    const testPhone = "0988" + Math.floor(100000 + Math.random() * 900000);
    const req = {
      method: "POST",
      body: {
        leadType: "QUICK_TRIAL",
        fullName: "Học Viên Test Quick Trial",
        phone: testPhone,
        course: "Khóa LEADER (6.0 → 6.5+)",
        preferredSchedule: "Tối Thứ 2 - 4 - 6 (18:30 - 20:30)",
        source: "trial_modal_leader",
      },
    };
    const res = new MockResponse();
    await handler(req, res);

    if (res.statusCode === 201 && res.body?.success === true && res.body?.data?.id) {
      console.log(`✅ Test 2 Passed: Quick Trial tạo thành công trong Supabase (Lead ID: ${res.body.data.id})`);
      passed++;
    } else {
      console.error("❌ Test 2 Failed:", res.statusCode, res.body);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 2 Exception:", err);
    failed++;
  }

  // Test 3: Contact Page Lead Submission
  try {
    const testPhone = "0977" + Math.floor(100000 + Math.random() * 900000);
    const req = {
      method: "POST",
      body: {
        leadType: "CONTACT",
        fullName: "Học Viên Test Tư Vấn",
        phone: testPhone,
        email: "test.student@example.com",
        message: "Em muốn tư vấn lộ trình học từ mất gốc lên 6.5",
        source: "contact_page",
      },
    };
    const res = new MockResponse();
    await handler(req, res);

    if (res.statusCode === 201 && res.body?.success === true) {
      console.log(`✅ Test 3 Passed: Contact Lead lưu thành công vào Supabase (Lead ID: ${res.body.data.id})`);
      passed++;
    } else {
      console.error("❌ Test 3 Failed:", res.statusCode, res.body);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 3 Exception:", err);
    failed++;
  }

  // Test 4: Assessment Booking Lead Submission
  try {
    const testPhone = "0966" + Math.floor(100000 + Math.random() * 900000);
    const req = {
      method: "POST",
      body: {
        leadType: "ASSESSMENT",
        fullName: "Học Viên Test Khảo Thí",
        phone: testPhone,
        email: "test.assess@example.com",
        metadata: {
          currentLevel: "Pre-IELTS (3.0)",
          targetBand: "IELTS 6.5",
          testFormat: "online",
          preferredDate: "2026-09-01",
        },
        source: "assessment_page",
      },
    };
    const res = new MockResponse();
    await handler(req, res);

    if (res.statusCode === 201 && res.body?.success === true) {
      console.log(`✅ Test 4 Passed: Assessment Lead lưu thành công với đầy đủ metadata (Lead ID: ${res.body.data.id})`);
      passed++;
    } else {
      console.error("❌ Test 4 Failed:", res.statusCode, res.body);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 4 Exception:", err);
    failed++;
  }

  // Test 5: Resilience Test (Apps Script Webhook bị lỗi hoặc URL không tồn tại)
  try {
    process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL = "https://invalid-webhook-test-url-12345.com/broken";
    process.env.GOOGLE_APPS_SCRIPT_SECRET = "test_secret";

    const testPhone = "0955" + Math.floor(100000 + Math.random() * 900000);
    const req = {
      method: "POST",
      body: {
        leadType: "QUICK_TRIAL",
        fullName: "Học Viên Resilience Test",
        phone: testPhone,
        course: "Khóa STARTER",
        preferredSchedule: "Tối 3-5-7",
      },
    };
    const res = new MockResponse();
    await handler(req, res);

    // KẾT QUẢ MONG MUỐN: Dù Webhook hỏng, Supabase vẫn lưu thành công và trả 201 cho học viên (Không mất lead)
    if (res.statusCode === 201 && res.body?.success === true) {
      console.log(`✅ Test 5 Passed: [Resilience OK] Dù Webhook lỗi/chết, Lead vẫn lưu an toàn vào Supabase (ID: ${res.body.data.id})`);
      passed++;
    } else {
      console.error("❌ Test 5 Failed:", res.statusCode, res.body);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 5 Exception:", err);
    failed++;
  }

  console.log("==================================================");
  console.log(`📊 KẾT QUẢ: ${passed}/5 BÀI TEST THÀNH CÔNG (${failed} lỗi)`);
  console.log("==================================================");

  if (failed > 0) process.exit(1);
}

runTests();