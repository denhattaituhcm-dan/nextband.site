import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== SCANNING FOR ALL TEST LEFTOVERS ===");

  // 1. Leads
  const leads = await prisma.contactLead.findMany({
    select: { id: true, fullName: true, phone: true, email: true, source: true, referralCode: true, createdAt: true },
    orderBy: { createdAt: "desc" }
  });
  console.log(`\n1. Leads in system: ${leads.length}`);
  leads.forEach(l => console.log(`   - [${l.id}] ${l.fullName} | ${l.phone} | ${l.email} | source: ${l.source} | ${l.createdAt}`));

  // 2. Notifications breakdown
  const allNotifs = await prisma.notification.findMany({
    select: { id: true, title: true, message: true, type: true, isRead: true, entityType: true, createdAt: true },
  });
  console.log(`\n2. Total Notifications in system: ${allNotifs.length}`);
  
  const notifSummary = {};
  for (const n of allNotifs) {
    const key = `${n.type} | ${n.title}`;
    notifSummary[key] = (notifSummary[key] || 0) + 1;
  }
  console.log("Notifications breakdown by Title:");
  console.table(notifSummary);

  // Detailed check of items to delete
  console.log("\n=== DETAILED CLEANUP CANDIDATES ===");
  
  // 1. Notifications to delete
  const testNotifs = await prisma.notification.findMany({
    where: {
      OR: [
        { title: "Có Lead mới đăng ký tư vấn", message: { contains: "Tran Van Referee" } },
        { title: "Có Lead mới đăng ký tư vấn", message: { contains: "web_study_buddy" } },
        { title: "Khách tư vấn đã chuyển thành Học viên", message: { contains: "Le Thi Friend" } },
        { title: "Khách tư vấn đã chuyển thành Học viên", message: { contains: "example.com" } },
        { title: "🎁 Bạn đã mở khóa Bộ Quà Tặng ARIS!" },
        { title: "🎉 Bạn đồng hành đã hoàn tất đăng ký!" },
        { title: "Kết quả bài thi", message: { contains: "WRITING TEST INTEGRITY" } },
        { title: "Kết quả bài thi", message: { contains: "INTEGRITY" } },
        { message: { contains: "example.com" } },
      ]
    },
    select: { id: true }
  });
  console.log(`Test Notifications to delete: ${testNotifs.length}`);

  // 2. Test Users to delete
  const allSystemUsers = await prisma.user.findMany({
    select: { userId: true, email: true, fullName: true, roles: { select: { role: true } } }
  });

  const testUsersToDelete = allSystemUsers.filter((u) => {
    const email = (u.email || "").toLowerCase();
    return (
      email.endsWith("@example.com") ||
      email.endsWith("@test.com") ||
      email.startsWith("test-") ||
      email.startsWith("test_") ||
      email.startsWith("admin_p1_") ||
      email.startsWith("student_p1_") ||
      email.startsWith("inviter_") ||
      email.startsWith("admin_") ||
      email.startsWith("referee_convert_")
    );
  });
  console.log(`Test Users to delete: ${testUsersToDelete.length}`);
  testUsersToDelete.forEach(u => console.log(`   - [${u.userId}] ${u.fullName} (${u.email})`));

  // Real users to KEEP (sanity check)
  const realUsers = allSystemUsers.filter((u) => !testUsersToDelete.some((t) => t.userId === u.userId));
  console.log(`Real Users preserved (${realUsers.length}):`);
  realUsers.forEach(u => console.log(`   + [${u.userId}] ${u.fullName} (${u.email}) [${u.roles.map(r=>r.role).join(',')}]`));

  // 3. Test Courses & Classes
  const testCoursesToDelete = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: "P1 IELTS Intensive" } },
        { title: { contains: "IELTS Intensive Master Course" } },
      ]
    },
    select: { id: true, title: true }
  });
  console.log(`Test Courses to delete: ${testCoursesToDelete.length}`);

  // 4. Dummy test leads from initial bubble tests
  const dummyLeads = await prisma.contactLead.findMany({
    where: {
      OR: [
        { fullName: { in: ["h", "n", "f", "d", "fđ"] } },
        { phone: { in: ["h", "n", "f", "d"] } },
        { fullName: "Tran Van Referee" },
        { fullName: "Le Thi Friend" },
        { email: { contains: "example.com" } }
      ]
    },
    select: { id: true, fullName: true, phone: true, source: true }
  });
  console.log(`Dummy Leads to delete (${dummyLeads.length}):`);
  dummyLeads.forEach(l => console.log(`   - [${l.id}] ${l.fullName} (${l.phone}) source: ${l.source}`));

  const realLeads = await prisma.contactLead.findMany({
    where: {
      NOT: {
        OR: [
          { fullName: { in: ["h", "n", "f", "d", "fđ"] } },
          { phone: { in: ["h", "n", "f", "d"] } },
          { fullName: "Tran Van Referee" },
          { fullName: "Le Thi Friend" },
          { email: { contains: "example.com" } }
        ]
      }
    },
    select: { id: true, fullName: true, phone: true, source: true }
  });
  console.log(`Real Leads preserved (${realLeads.length}):`);
  realLeads.forEach(l => console.log(`   + [${l.id}] ${l.fullName} (${l.phone}) source: ${l.source}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
