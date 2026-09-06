import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app.js";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { isTestDatabaseConfigured, createSafeTestPrismaClient } from "./testDbGuard.js";

const isDbReady = isTestDatabaseConfigured();

describe.skipIf(!isDbReady)("🎁 STUDY BUDDY / REFERRAL ENGINE E2E VERIFICATION SUITE", () => {
  let app: FastifyInstance;
  let prisma: any;

  let inviterUserId: string;
  let inviterToken: string;
  let inviterReferralCode: string;
  let targetClassId: string;
  let targetCourseId: string;
  let adminUserId: string;
  let adminToken: string;
  const createdLeadIds: string[] = [];
  const createdUserIds: string[] = [];

  beforeAll(async () => {
    prisma = createSafeTestPrismaClient();
    app = await buildApp({ testing: true });
    await app.ready();


    // 1. Seed or get Inviter User (User A)
    inviterUserId = randomUUID();
    createdUserIds.push(inviterUserId);
    const inviterEmail = `inviter_${Date.now()}@example.com`;
    const inviterAuth = await prisma.user.create({
      data: {
        userId: inviterUserId,
        email: inviterEmail,
        fullName: "Nguyen Van Inviter",
        phone: `0988${Math.floor(100000 + Math.random() * 900000)}`,
        referralCode: `ARIS-INVIT${Math.floor(1000 + Math.random() * 9000)}`,
        roles: {
          create: { role: "student" as any },
        },
      },
      include: { roles: true },
    });

    inviterReferralCode = inviterAuth.referralCode!;
    inviterToken = app.jwt.sign({
      sub: inviterUserId,
      id: inviterUserId,
      email: inviterEmail,
      user_metadata: { role: "student" },
      app_metadata: { roles: ["student"] },
    });

    // 2. Admin Token
    adminUserId = randomUUID();
    createdUserIds.push(adminUserId);
    const adminUser = await prisma.user.create({
      data: {
        userId: adminUserId,
        email: `admin_${Date.now()}@example.com`,
        fullName: "System Admin",
        roles: {
          create: { role: "admin" as any },
        },
      },
    });
    adminToken = app.jwt.sign({
      sub: adminUserId,
      id: adminUserId,
      email: adminUser.email,
      user_metadata: { role: "admin" },
      app_metadata: { roles: ["admin"] },
    });

    // 3. Target Course & Class ($2,000,000 tuition)
    const course = await prisma.course.create({
      data: {
        title: "IELTS Intensive Master Course",
        level: "advanced",
        price: 2000000,
        isPublished: true,
        isActive: true,
      },
    });
    targetCourseId = course.id;

    const cls = await prisma.class.create({
      data: {
        name: "IELTS Intensive Class A",
        courseId: targetCourseId,
        status: "ACTIVE",
        isActive: true,
      },
    });
    targetClassId = cls.id;
  }, 60000);

  afterAll(async () => {
    try {
      // 1. Delete notifications triggered by the test
      await prisma.notification.deleteMany({
        where: {
          OR: [
            ...(createdLeadIds.length > 0 ? [{ entityType: "LEAD", entityId: { in: createdLeadIds } }] : []),
            ...(createdUserIds.length > 0 ? [
              { entityType: "STUDENT", entityId: { in: createdUserIds } },
              { userId: { in: createdUserIds } },
            ] : []),
            { message: { contains: "Tran Van Referee" } },
            { message: { contains: "Le Thi Friend" } },
            { message: { contains: "web_study_buddy" } },
            { title: { contains: "Bộ Quà Tặng ARIS!" } },
            { title: { contains: "Bạn đồng hành đã hoàn tất đăng ký!" } },
          ],
        },
      }).catch(() => {});

      // 2. Delete rewards & attributions
      if (inviterUserId) {
        await prisma.referralReward.deleteMany({ where: { inviterUserId } }).catch(() => {});
        await prisma.referralAttribution.deleteMany({ where: { inviterUserId } }).catch(() => {});
      }
      if (createdUserIds.length > 0) {
        await prisma.referralAttribution.deleteMany({ where: { refereeUserId: { in: createdUserIds } } }).catch(() => {});
      }

      // 3. Delete leads
      if (createdLeadIds.length > 0 || inviterUserId) {
        await prisma.contactLead.deleteMany({
          where: {
            OR: [
              ...(createdLeadIds.length > 0 ? [{ id: { in: createdLeadIds } }] : []),
              ...(inviterUserId ? [{ inviterUserId }] : []),
              ...(createdUserIds.length > 0 ? [{ convertedUserId: { in: createdUserIds } }] : []),
            ],
          },
        }).catch(() => {});
      }

      // 4. Delete class student, class, course
      if (targetClassId) {
        await prisma.classStudent.deleteMany({ where: { classId: targetClassId } }).catch(() => {});
        await prisma.class.delete({ where: { id: targetClassId } }).catch(() => {});
      }
      if (targetCourseId) {
        await prisma.course.delete({ where: { id: targetCourseId } }).catch(() => {});
      }

      // 5. Delete test users and roles
      if (createdUserIds.length > 0) {
        await prisma.userRole.deleteMany({ where: { userId: { in: createdUserIds } } }).catch(() => {});
        await prisma.user.deleteMany({ where: { userId: { in: createdUserIds } } }).catch(() => {});
      }
    } finally {
      await app.close();
      await prisma.$disconnect();
    }
  }, 60000);

  // ---------------------------------------------------------------------------
  // STEP 1: PUBLIC CODE VALIDATION
  // ---------------------------------------------------------------------------
  it("Step 1: Public validation endpoint returns inviter details for valid code", async () => {
    const res = await app.inject({
      method: "GET",
      url: `/api/v1/referrals/validate-code/${inviterReferralCode}`,
    });

    expect(res.statusCode).toBe(200);
    const json = JSON.parse(res.body);
    expect(json.valid).toBe(true);
    expect(json.referralCode).toBe(inviterReferralCode);
    expect(json.inviterName).toBe("Nguyen Van Inviter");
  });

  it("Step 1.1: Public validation returns 404 for nonexistent code", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/referrals/validate-code/ARIS-FAKE9999",
    });

    expect(res.statusCode).toBe(404);
    const json = JSON.parse(res.body);
    expect(json.valid).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // STEP 2: LEAD CREATION WITH STRUCTURED ATTRIBUTION
  // ---------------------------------------------------------------------------
  it("Step 2: Submitting a lead with referral code stores structured attribution in DB", async () => {
    const refereePhone = `0911${Math.floor(100000 + Math.random() * 900000)}`;
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/leads",
      payload: {
        fullName: "Tran Van Referee",
        phone: refereePhone,
        email: "referee_bob@example.com",
        source: "web_study_buddy",
        referralCode: inviterReferralCode,
        goal: "Band 7.0 Target",
      },
    });

    if (res.statusCode !== 201 && res.statusCode !== 200) {
      console.error("Step 2 failed payload:", res.body);
    }
    expect([200, 201]).toContain(res.statusCode);
    const body = JSON.parse(res.body);
    const leadId = body.data?.id || body.id;
    expect(leadId).toBeDefined();
    createdLeadIds.push(leadId);

    // Verify DB integrity
    const savedLead = await prisma.contactLead.findUnique({
      where: { id: leadId },
    });
    expect(savedLead).toBeDefined();
    expect(savedLead?.referralCode).toBe(inviterReferralCode);
    expect(savedLead?.inviterUserId).toBe(inviterUserId);
  }, 60000);

  // ---------------------------------------------------------------------------
  // STEP 3: CONVERSION, AUTOMATIC -200,000Đ DISCOUNT & REWARD CREATION
  // ---------------------------------------------------------------------------
  it("Step 3: Converting referred lead applies 200k discount and creates Attribution + Pending Reward", async () => {
    const refereePhone = `0922${Math.floor(100000 + Math.random() * 900000)}`;
    const refereeEmail = `referee_convert_${Date.now()}@example.com`;

    // 1. Create Lead
    const lead = await prisma.contactLead.create({
      data: {
        fullName: "Le Thi Friend",
        phone: refereePhone,
        email: refereeEmail,
        source: "web_study_buddy",
        referralCode: inviterReferralCode,
        inviterUserId,
        status: "NEW",
      },
    });
    createdLeadIds.push(lead.id);

    // 2. Admin converts lead to student with placement into targetClass ($2,000,000 price)
    const convertRes = await app.inject({
      method: "POST",
      url: `/api/v1/leads/${lead.id}/convert`,
      headers: { authorization: `Bearer ${adminToken}` },
      payload: {
        email: refereeEmail,
        fullName: "Le Thi Friend",
        phone: refereePhone,
        targetClassId,
      },
    });

    if (convertRes.statusCode !== 200 && convertRes.statusCode !== 201) {
      console.error("Step 3 conversion failed:", convertRes.body);
    }
    expect([200, 201]).toContain(convertRes.statusCode);
    const convertBody = JSON.parse(convertRes.body);
    const studentUserId = convertBody.data?.user?.userId || convertBody.data?.lead?.convertedUserId;
    expect(studentUserId).toBeDefined();
    createdUserIds.push(studentUserId);

    // 3. Verify ClassStudent tuition fee is automatically discounted by 200,000đ (2,000,000 -> 1,800,000)
    const classStudent = await prisma.classStudent.findUnique({
      where: {
        classId_studentId: {
          classId: targetClassId,
          studentId: studentUserId,
        },
      },
    });
    expect(classStudent).toBeDefined();
    expect(Number(classStudent?.tuitionFee)).toBe(1800000); // 2,000,000 - 200,000 = 1,800,000
    expect(classStudent?.paymentStatus).toBe("UNPAID");

    // 4. Verify ReferralAttribution record
    const attribution = await prisma.referralAttribution.findFirst({
      where: { refereeUserId: studentUserId },
    });
    expect(attribution).toBeDefined();
    expect(attribution?.inviterUserId).toBe(inviterUserId);
    expect(Number(attribution?.discountAmount)).toBe(200000);
    expect(attribution?.status).toBe("CONVERTED");

    // 5. Verify ReferralReward record is created in PENDING_QUALIFICATION state
    const reward = await prisma.referralReward.findFirst({
      where: { attributionId: attribution!.id },
    });
    expect(reward).toBeDefined();
    expect(reward?.status).toBe("PENDING_QUALIFICATION");
    expect(reward?.inviterUserId).toBe(inviterUserId);

    // -------------------------------------------------------------------------
    // STEP 4: TUITION PAYMENT & REWARD QUALIFICATION TRIGGER
    // -------------------------------------------------------------------------
    // Admin marks tuition as fully paid ($1,800,000)
    const tuitionRes = await app.inject({
      method: "PATCH",
      url: `/api/v1/admin/tuition/students/${classStudent!.id}`,
      headers: { authorization: `Bearer ${adminToken}` },
      payload: {
        paidAmount: 1800000,
        paymentStatus: "PAID",
      },
    });

    expect(tuitionRes.statusCode).toBe(200);

    // Verify Reward status transitions to ELIGIBLE
    const updatedReward = await prisma.referralReward.findUnique({
      where: { id: reward!.id },
    });
    expect(updatedReward?.status).toBe("ELIGIBLE");
    expect(updatedReward?.qualifiedAt).toBeDefined();

    // -------------------------------------------------------------------------
    // STEP 5: INVITER PROFILE MY-REFERRALS REFLECTION
    // -------------------------------------------------------------------------
    const myReferralsRes = await app.inject({
      method: "GET",
      url: "/api/v1/referrals/my-referrals",
      headers: { authorization: `Bearer ${inviterToken}` },
    });

    expect(myReferralsRes.statusCode).toBe(200);
    const myReferrals = JSON.parse(myReferralsRes.body);
    expect(myReferrals.referralCode).toBe(inviterReferralCode);
    expect(myReferrals.stats.totalInvited).toBeGreaterThanOrEqual(1);
    expect(myReferrals.stats.totalEligible).toBeGreaterThanOrEqual(1);

    const earnedReward = myReferrals.rewards.find((r: any) => r.id === reward!.id);
    expect(earnedReward).toBeDefined();
    expect(earnedReward.status).toBe("ELIGIBLE");
  }, 60000);
});
