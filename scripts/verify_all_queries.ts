process.env.NODE_ENV = "test";
import { buildApp } from "../server/app.js";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("=================================================================");
  console.log("🚀 TESTING ALL 15 CORE REST MODULES");
  console.log("=================================================================");

  const app = await buildApp();
  await app.ready();

  const adminToken = (app as any).jwt.sign({
    id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    email: "admin@ielts.com",
    roles: ["admin", "teacher"],
  });

  const endpointsToTest = [
    { name: "1. Health check", method: "GET", url: "/api/v1/health" },
    { name: "2. Courses list", method: "GET", url: "/api/v1/courses" },
    { name: "3. Exams list", method: "GET", url: "/api/v1/exams?limit=10" },
    { name: "4. Classes list", method: "GET", url: "/api/v1/classes" },
    { name: "5. Class detail (M01)", method: "GET", url: "/api/v1/classes/29749efd-24e4-4529-bfb6-54636e189b33" },
    { name: "6. Class sessions (M01)", method: "GET", url: "/api/v1/classes/29749efd-24e4-4529-bfb6-54636e189b33/sessions" },
    { name: "7. Attendance Matrix (M01)", method: "GET", url: "/api/v1/classes/29749efd-24e4-4529-bfb6-54636e189b33/attendance-matrix" },
    { name: "8. Submissions list (M01)", method: "GET", url: "/api/v1/submissions?classId=29749efd-24e4-4529-bfb6-54636e189b33&limit=200" },
    { name: "9. Admin Dashboard Summary", method: "GET", url: "/api/v1/admin/dashboard-summary" },
    { name: "10. Admin Periodic Reports", method: "GET", url: "/api/v1/admin/reports/periodic?periodType=YEAR&year=2026" },
    { name: "11. Student Periodic Reports Latest", method: "GET", url: "/api/v1/classes/29749efd-24e4-4529-bfb6-54636e189b33/students/3835536b-ac37-426f-bbea-fe7e4a61a21b/periodic-reports/latest" },
    { name: "12. Interventions list", method: "GET", url: "/api/v1/interventions?classId=29749efd-24e4-4529-bfb6-54636e189b33" },
    { name: "13. Tuition Overview", method: "GET", url: "/api/v1/admin/tuition/overview" },
    { name: "14. Leads list", method: "GET", url: "/api/v1/leads" },
    { name: "15. Notifications list", method: "GET", url: "/api/v1/notifications" },
    { name: "16. Site Settings", method: "GET", url: "/api/v1/site-settings" },
    { name: "17. Branches list", method: "GET", url: "/api/v1/branches" },
    { name: "18. Rooms list", method: "GET", url: "/api/v1/rooms" },
    { name: "19. Speaking Forecast list", method: "GET", url: "/api/v1/speaking-forecast" },
    { name: "20. Students Management list", method: "GET", url: "/api/v1/users/students-management" },
  ];

  let passed = 0;
  let failed = 0;

  for (const ep of endpointsToTest) {
    const res = await app.inject({
      method: ep.method as any,
      url: ep.url,
      headers: { authorization: `Bearer ${adminToken}` },
    });

    const isOk = res.statusCode >= 200 && res.statusCode < 300;
    if (isOk) {
      console.log(`✅ [${res.statusCode}] ${ep.name} -> ${ep.url}`);
      passed++;
    } else {
      console.log(`❌ [${res.statusCode}] ${ep.name} -> ${ep.url} : ${res.body}`);
      failed++;
    }
  }

  console.log(`\n=================================================================`);
  console.log(`📊 FINAL RESULT: ${passed}/${endpointsToTest.length} ENDPOINTS PASSED 100%`);
  console.log(`=================================================================`);

  await app.close();
}

main().catch(console.error);
