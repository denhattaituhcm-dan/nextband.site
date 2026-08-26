import { FastifyPluginAsync } from "fastify";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";
import { paginationSchema } from "../schemas/common.schema.js";
import { authenticate, requireRoles, invalidateUserAuthCache } from "../middlewares/auth.middleware.js";
import { hashPassword } from "../utils/password.js";
import { handleValidation } from "../utils/validation.js";
import { withFileUrls, withFileUrlsMany } from "../utils/file.js";
import {
  getTeacherStudentIds,
  isStudentInTeacherClasses,
} from "../utils/teacherScope.js";

const usersRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /users - List users (admin/teacher only)
  fastify.get(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const dataQuery = handleValidation(
        paginationSchema.safeParse(request.query),
        request,
        reply,
      );
      if (!dataQuery) return;

      const { role } = request.query as any;

      const {
        page,
        limit,
        search,
        sortBy = "createdAt",
        sortOrder,
      } = dataQuery;
      const skip = (page - 1) * limit;

      const where: any = {};

      // Teacher: only see students in their classes
      const user = request.user;
      const isAdmin = user.roles.includes("admin");
      const isTeacher = user.roles.includes("teacher");

      if (isTeacher && !isAdmin) {
        const teacherStudentIds = await getTeacherStudentIds(
          fastify.prisma,
          user.id,
        );
        where.userId = { in: teacherStudentIds };
      }

      if (search) {
        where.OR = [
          { email: { contains: search, mode: "insensitive" } },
          { fullName: { contains: search, mode: "insensitive" } },
        ];
      }

      if (role) {
        where.roles = {
          some: { role },
        };
        if (role === "student") {
          where.roles.none = { role: "admin" };
        }
      }

      const sortFieldMap: Record<string, string> = {
        newest: "createdAt",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        name: "fullName",
        fullName: "fullName",
        email: "email",
      };
      const orderField = (sortBy && sortFieldMap[sortBy]) ? sortFieldMap[sortBy] : "createdAt";

      const [data, total] = await Promise.all([
        fastify.prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [orderField]: sortOrder },
          select: {
            id: true,
            userId: true,
            email: true,
            fullName: true,
            avatarUrl: true,
            gender: true,
            dateOfBirth: true,
            phone: true,
            parentName: true,
            parentPhone: true,
            isActive: true,
            createdAt: true,
            roles: true,
            _count: {
              select: { enrollments: true, submissions: true },
            },
          },
        }),
        fastify.prisma.user.count({ where }),
      ]);

      const users = data.map((u) => ({
        ...u,
        roles: u.roles.map((r) => r.role),
      }));

      return {
        data: withFileUrlsMany(users, ["avatarUrl"]),
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    },
  );

  // GET /users/students-management - Real-data Student Management View Model DTO
  fastify.get(
    "/students-management",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { page = 1, limit = 10, search } = (request.query || {}) as any;
      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || 10;
      const skip = (pageNum - 1) * limitNum;

      const user = request.user;
      const isAdmin = user.roles.includes("admin");
      const isTeacher = user.roles.includes("teacher");

      const where: any = {
        roles: {
          some: { role: "student" },
          none: { role: "admin" },
        },
      };

      if (isTeacher && !isAdmin) {
        const teacherStudentIds = await getTeacherStudentIds(fastify.prisma, user.id);
        where.userId = { in: teacherStudentIds };
      }

      if (search) {
        where.OR = [
          { email: { contains: search, mode: "insensitive" } },
          { fullName: { contains: search, mode: "insensitive" } },
        ];
      }

      const [studentsData, total] = await Promise.all([
        fastify.prisma.user.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            userId: true,
            email: true,
            fullName: true,
            avatarUrl: true,
            phone: true,
            parentName: true,
            parentPhone: true,
            gender: true,
            dateOfBirth: true,
            isActive: true,
            bio: true,
            createdAt: true,
            classesAsStudent: {
              where: { deletedAt: null },
              include: {
                class: {
                  select: {
                    id: true,
                    name: true,
                    courseId: true,
                    course: { select: { id: true, title: true } },
                    teacher: { select: { id: true, fullName: true, email: true } },
                  },
                },
              },
            },
            submissions: {
              select: {
                id: true,
                examId: true,
                status: true,
                totalScore: true,
                submittedAt: true,
                createdAt: true,
                exam: { select: { id: true, title: true, courseId: true } },
              },
              orderBy: { createdAt: "desc" },
            },
            attendanceRecords: {
              select: {
                id: true,
                status: true,
                sessionDate: true,
                createdAt: true,
                class: { select: { id: true, name: true, teacher: { select: { fullName: true } } } },
              },
              orderBy: { sessionDate: "desc" },
            },
          },
        }),
        fastify.prisma.user.count({ where }),
      ]);

      // Pre-fetch all published exams for all enrolled courses across this page
      const allCourseIds = Array.from(
        new Set(
          studentsData.flatMap((st) =>
            (st.classesAsStudent || []).map((cs) => cs.class?.courseId).filter(Boolean)
          )
        )
      ) as string[];

      const courseExams =
        allCourseIds.length > 0
          ? await fastify.prisma.exam.findMany({
              where: {
                courseId: { in: allCourseIds },
                isPublished: true,
              },
              select: { id: true, courseId: true, title: true },
            })
          : [];

      const courseExamsMap = new Map<string, Array<{ id: string; title: string }>>();
      courseExams.forEach((e) => {
        if (e.courseId) {
          if (!courseExamsMap.has(e.courseId)) courseExamsMap.set(e.courseId, []);
          courseExamsMap.get(e.courseId)!.push({ id: e.id, title: e.title });
        }
      });

      const items = await Promise.all(studentsData.map(async (st: any) => {
        // 1. Classes array (Deduplicated per student)
        const classesMap = new Map<string, any>();
        (st.classesAsStudent || []).forEach((cs: any) => {
          if (cs.class) {
            classesMap.set(cs.class.id, {
              id: cs.class.id,
              name: cs.class.name,
              courseId: cs.class.courseId,
              courseTitle: cs.class.course?.title || undefined,
              teacherId: cs.class.teacher?.id || undefined,
              teacherName: cs.class.teacher?.fullName || cs.class.teacher?.email || undefined,
            });
          }
        });
        const classes = Array.from(classesMap.values());

        // 2. Exam & Submissions stats for enrolled courses
        const studentCourseIds = classes.map((c) => c.courseId).filter(Boolean) as string[];
        const studentCourseExams = studentCourseIds.flatMap((cId) => courseExamsMap.get(cId) || []);
        const studentCourseExamIds = new Set(studentCourseExams.map((e) => e.id));

        let totalAssignedCount = 0;
        let submittedCount = 0;
        let gradedCount = 0;
        let homeworkPercentage: number | null = null;

        if (classes.length > 0 && studentCourseExamIds.size > 0) {
          totalAssignedCount = studentCourseExamIds.size;
          const relevantSubmissions = (st.submissions || []).filter(
            (s: any) => studentCourseExamIds.has(s.exam?.id) || studentCourseExamIds.has(s.examId)
          );

          // An exam is counted as submitted only if it is actually submitted (status is SUBMITTED or GRADED, or has submittedAt)
          // Deduplicate by examId so taking multiple attempts at the same exam does not double-count
          const submittedExamMap = new Map<string, any>();
          relevantSubmissions.forEach((s: any) => {
            const statusUpper = String(s.status || "").toUpperCase();
            const isSubmitted = statusUpper === "SUBMITTED" || statusUpper === "GRADED";
            if (isSubmitted) {
              const examKey = s.examId || s.exam?.id;
              if (examKey && !submittedExamMap.has(examKey)) {
                submittedExamMap.set(examKey, s);
              }
            }
          });

          submittedCount = submittedExamMap.size;
          gradedCount = Array.from(submittedExamMap.values()).filter(
            (s: any) => String(s.status || "").toUpperCase() === "GRADED"
          ).length;
          homeworkPercentage = Math.round((submittedCount / totalAssignedCount) * 100);
        }

        // 3. Attendance stats
        const attendances = st.attendanceRecords || [];
        const totalSessions = attendances.length;
        const attendedCount = attendances.filter(
          (a: any) => a.status === "PRESENT" || a.status === "present"
        ).length;
        const attendancePercentage =
          totalSessions > 0 ? Math.round((attendedCount / totalSessions) * 100) : null;

        // 4. Activities Timeline
        const recentActivities: any[] = [];
        (st.submissions || []).forEach((s: any) => {
          const statusUpper = String(s.status || "").toUpperCase();
          const isSubmitted = statusUpper === "SUBMITTED" || statusUpper === "GRADED";
          if (s.submittedAt || isSubmitted) {
            const timestamp = s.submittedAt || s.createdAt;
            if (timestamp) {
              recentActivities.push({
                type: "submission",
                title: `Nộp bài: ${s.exam?.title || "Bài tập / Bài thi"}`,
                description:
                  s.totalScore != null
                    ? `Điểm số: ${s.totalScore}`
                    : `Trạng thái: ${
                        statusUpper === "GRADED" ? "Đã chấm" : "Đã nộp bài"
                      }`,
                score: s.totalScore ? Number(s.totalScore) : null,
                timestamp: new Date(timestamp).toISOString(),
              });
            }
          }
        });
        attendances.forEach((a: any) => {
          if (a.sessionDate || a.createdAt) {
            const statusText =
              a.status === "PRESENT" || a.status === "present"
                ? "Có mặt"
                : a.status === "LATE" || a.status === "late"
                ? "Đi muộn"
                : "Vắng";
            const className = a.class?.name ? ` - Lớp ${a.class.name}` : "";
            const teacherText = a.class?.teacher?.fullName ? ` (GV: ${a.class.teacher.fullName})` : "";
            recentActivities.push({
              type: "attendance",
              title: `Điểm danh: ${statusText}${className}`,
              description: `Buổi học ngày ${new Date(
                a.sessionDate || a.createdAt
              ).toLocaleDateString("vi-VN")}${teacherText}`,
              timestamp: new Date(a.sessionDate || a.createdAt).toISOString(),
            });
          }
        });

        if (st.createdAt) {
          recentActivities.push({
            type: "account",
            title: "Gia nhập hệ thống",
            description: "Tài khoản học viên được khởi tạo trên hệ thống",
            timestamp: new Date(st.createdAt).toISOString(),
          });
        }

        recentActivities.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        const lastActivity = recentActivities.length > 0 ? recentActivities[0] : null;

        // 5. Server Academic Health Score Calculation (Only for enrolled students with real curriculum)
        let academicHealth: number | null = null;
        if (classes.length > 0 && totalAssignedCount > 0) {
          const hwProgressRatio = submittedCount / totalAssignedCount;
          const gradedRatio = submittedCount > 0 ? gradedCount / submittedCount : 0;

          if (totalSessions > 0) {
            const attRatio = attendedCount / totalSessions;
            const score = (attRatio * 0.3 + hwProgressRatio * 0.4 + gradedRatio * 0.3) * 100;
            academicHealth = Math.min(100, Math.max(0, Math.round(score)));
          } else {
            const score = (hwProgressRatio * 0.6 + gradedRatio * 0.4) * 100;
            academicHealth = Math.min(100, Math.max(0, Math.round(score)));
          }
        }

        // Check reservation / suspended status
        const isClassSuspended = (st.classesAsStudent || []).some((cs: any) => cs.status === "SUSPENDED");
        const isBioReserved = !!(st.bio?.includes('"isReserved":true') || st.bio?.includes('"status":"suspended"') || st.bio === "RESERVED");
        const isReserved = isClassSuspended || isBioReserved;
        const status = isReserved ? "suspended" : (st.isActive === false ? "inactive" : "active");

        return {
          id: st.id,
          userId: st.userId,
          fullName: st.fullName || st.email?.split("@")[0] || "Học viên",
          email: st.email,
          avatarUrl: st.avatarUrl,
          phone: st.phone,
          parentName: st.parentName,
          parentPhone: st.parentPhone,
          gender: st.gender,
          dateOfBirth: st.dateOfBirth,
          isActive: st.isActive,
          isReserved,
          status,
          bio: st.bio,
          createdAt: st.createdAt,
          classes,
          homework: {
            submittedCount,
            gradedCount,
            totalAssignedCount,
            percentage: homeworkPercentage,
          },
          attendance: {
            attendedCount,
            totalSessions,
            percentage: attendancePercentage,
          },
          lastActivity,
          recentActivities: recentActivities.slice(0, 10),
          academicHealth,
        };
      }));

      return reply.send({
        success: true,
        data: withFileUrlsMany(items, ["avatarUrl"]),
        meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
      });
    }
  );

  // GET /users/:id
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;

      const user = await fastify.prisma.user.findUnique({
        where: { userId: id },
        select: {
          id: true,
          userId: true,
          email: true,
          fullName: true,
          avatarUrl: true,
          bio: true,
          isActive: true,
          createdAt: true,
          roles: true,
          enrollments: {
            include: { course: { select: { id: true, title: true } } },
          },
        },
      });

      if (!user) {
        return reply.status(404).send({ error: "Không tìm thấy người dùng" });
      }

      // Teacher: check if this user is a student in their classes
      const currentUser = request.user;
      const isCurrentAdmin = currentUser.roles.includes("admin");
      const isCurrentTeacher = currentUser.roles.includes("teacher");
      if (isCurrentTeacher && !isCurrentAdmin) {
        const hasAccess = await isStudentInTeacherClasses(
          fastify.prisma,
          currentUser.id,
          id,
        );
        if (!hasAccess) {
          return reply
            .status(403)
            .send({
              error:
                "Từ chối truy cập - người dùng không thuộc lớp bạn phụ trách",
            });
        }
      }

      const userWithRoles = {
        ...user,
        id: user.userId,
        roles: user.roles.map((r) => r.role),
      };

      return withFileUrls(userWithRoles, ["avatarUrl"]);
    },
  );

  // POST /users - Create user (admin only with atomic DB transaction & idempotency protection)
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const {
        email,
        password,
        fullName,
        role = "student",
        gender,
        dateOfBirth,
        phone,
        parentName,
        parentPhone,
      } = request.body as any;

      if (!email || typeof email !== "string" || !email.includes("@")) {
        return reply.status(400).send({
          statusCode: 400,
          error: "Email không hợp lệ",
          message: "Email không hợp lệ",
        });
      }

      if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
        return reply.status(400).send({
          statusCode: 400,
          error: "Vui lòng nhập họ và tên",
          message: "Vui lòng nhập họ và tên",
        });
      }

      const cleanEmail = email.trim().toLowerCase();

      // 1. Idempotency Check: Check if user already exists
      const existing = await fastify.prisma.user.findFirst({
        where: { email: cleanEmail },
      });

      if (existing) {
        return reply.status(409).send({
          statusCode: 409,
          error: "Email đã tồn tại trong hệ thống",
          message: "Email đã tồn tại trong hệ thống",
        });
      }

      // Final password (provided or securely generated)
      const finalPassword = password || Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const parsedDob = dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : null;

      try {
        // 2. Atomic Execution: Call PostgreSQL stored function to create Auth identity, profile, and role atomically
        const dbResult: any = await fastify.prisma.$queryRawUnsafe(`
          SELECT public.admin_create_user(
            $1::text,
            $2::text,
            $3::text,
            $4::text,
            $5::text,
            $6::text,
            $7::text,
            $8::text,
            $9::date
          ) as result;
        `, cleanEmail, fullName.trim(), phone || null, gender || null, role, finalPassword, parentName || null, parentPhone || null, parsedDob);

        const profileData = dbResult?.[0]?.result;
        if (!profileData) {
          throw new Error("Không thể tạo hồ sơ người dùng trong cơ sở dữ liệu");
        }

        const user = await fastify.prisma.user.findFirst({
          where: { userId: profileData.user_id || profileData.id },
          include: { roles: true },
        });

        if (!user) {
          throw new Error("Không tìm thấy thông tin người dùng sau khi tạo");
        }

        // 3. Non-blocking In-App & Email/Telegram notification to Admins
        (async () => {
          try {
            const { NotificationService } = await import("../services/notification.service.js");
            const notifService = new NotificationService(fastify.prisma);
            const roleLabel = role === "student" ? "Học viên" : role === "teacher" ? "Giáo viên" : "Quản trị viên";
            await notifService.notifyUsersByRole(["admin"], {
              type: "SYSTEM",
              title: `${roleLabel} mới được thêm vào hệ thống`,
              message: `${roleLabel} ${user.fullName || user.email} (${user.email}) vừa được tạo thành công trên hệ thống.`,
              link: "/admin/users",
              entityType: "USER",
              entityId: user.userId,
            });

            if (role === "student") {
              const { leadNotificationService } = await import("../services/leadNotification.service.js");
              await leadNotificationService.notifyNewStudent({
                id: user.userId,
                fullName: user.fullName || user.email || "Học viên mới",
                email: user.email || "",
                phone: user.phone || null,
                source: "Tạo trực tiếp bởi Quản trị viên (Admin Portal)",
                createdBy: (request as any).user?.email || "Admin",
              });
            }
          } catch (notifErr) {
            request.log.error(notifErr, "Failed to dispatch user creation notification");
          }
        })();

        return reply.status(201).send({
          id: user.userId,
          email: user.email,
          fullName: user.fullName,
          roles: user.roles?.map((r: any) => r.role) || [role],
          createdAt: user.createdAt,
        });
      } catch (err: any) {
        request.log.error({ err, email: cleanEmail }, "User creation failed");
        const errMsg = err?.message || "Không thể tạo tài khoản người dùng";
        if (errMsg.toLowerCase().includes("already") || errMsg.toLowerCase().includes("duplicate") || errMsg.includes("trùng lặp")) {
          return reply.status(409).send({
            statusCode: 409,
            error: "Email đã tồn tại trong hệ thống",
            message: "Email đã tồn tại trong hệ thống",
          });
        }
        return reply.status(400).send({
          statusCode: 400,
          error: errMsg,
          message: errMsg,
        });
      }
    },
  );

  // PUT /users/:id - Update user (admin only)
  fastify.put<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { id } = request.params;
      const {
        fullName,
        isActive,
        isReserved,
        status,
        role,
        gender,
        dateOfBirth,
        phone,
        parentName,
        parentPhone,
        bio,
        joinedAt,
        resignedAt,
      } = request.body as any;

      const existingUser = await fastify.prisma.user.findFirst({
        where: {
          OR: [
            { userId: id },
            { id: id },
          ],
        },
        include: { roles: true },
      });

      if (!existingUser) {
        return reply.status(404).send({ error: "Không tìm thấy người dùng" });
      }

      let updatedBio = bio;
      if (isReserved !== undefined || status !== undefined) {
        const shouldReserve = isReserved === true || status === "suspended";
        const newEnrollmentStatus = shouldReserve ? "SUSPENDED" : "ACTIVE";

        await fastify.prisma.classStudent.updateMany({
          where: {
            studentId: existingUser.userId,
            deletedAt: null,
          },
          data: {
            status: newEnrollmentStatus,
          },
        });

        const currentBio = existingUser.bio || "";
        try {
          const bioObj = currentBio.startsWith("{") ? JSON.parse(currentBio) : { note: currentBio };
          bioObj.isReserved = shouldReserve;
          bioObj.status = shouldReserve ? "suspended" : "active";
          updatedBio = JSON.stringify(bioObj);
        } catch {
          updatedBio = JSON.stringify({ isReserved: shouldReserve, status: shouldReserve ? "suspended" : "active" });
        }
      }

      const user = await fastify.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          ...(fullName !== undefined && { fullName }),
          ...(isActive !== undefined && {
            isActive,
            ...(isActive === false && resignedAt === undefined && !existingUser.resignedAt
              ? { resignedAt: new Date() }
              : isActive === true && resignedAt === undefined
              ? { resignedAt: null }
              : {}),
          }),
          ...(joinedAt !== undefined && { joinedAt: joinedAt ? new Date(joinedAt) : null }),
          ...(resignedAt !== undefined && { resignedAt: resignedAt ? new Date(resignedAt) : null }),
          ...(updatedBio !== undefined && { bio: updatedBio }),
          ...(gender !== undefined && { gender }),
          ...(dateOfBirth !== undefined && {
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          }),
          ...(phone !== undefined && { phone }),
          ...(parentName !== undefined && { parentName }),
          ...(parentPhone !== undefined && { parentPhone }),
        },
        include: { roles: true },
      });

      // Update role if provided
      if (role) {
        await fastify.prisma.userRole.deleteMany({
          where: { userId: user.userId },
        });
        await fastify.prisma.userRole.create({
          data: { userId: user.userId, role },
        });
      }

      // Always invalidate auth cache whenever user is updated or toggled
      invalidateUserAuthCache(user.userId);
      invalidateUserAuthCache(user.id);
      invalidateUserAuthCache(id);

      return {
        id: user.userId,
        email: user.email,
        fullName: user.fullName,
        isActive: user.isActive,
        roles: role ? [role] : user.roles.map((r) => r.role),
      };
    },
  );

  // DELETE /users/:id - Delete user (admin only)
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { id } = request.params;
      const existingUser = await fastify.prisma.user.findFirst({
        where: {
          OR: [
            { userId: id },
            { id: id },
          ],
        },
      });

      if (existingUser) {
        await fastify.prisma.user.delete({ where: { id: existingUser.id } });
        invalidateUserAuthCache(existingUser.userId);
        invalidateUserAuthCache(existingUser.id);
        invalidateUserAuthCache(id);
      }
      return { success: true };
    },
  );
};

export default usersRoutes;
