import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { authenticate, requireRoles } from "../middlewares/auth.middleware.js";
import { paginationSchema } from "../schemas/common.schema.js";
import { isTeacherOfClass } from "../utils/teacherScope.js";

const previewScheduleSchema = z.object({
  courseId: z.string().min(1, "courseId là bắt buộc"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "startDate phải có dạng YYYY-MM-DD"),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).min(1, "Cần chọn ít nhất 1 ngày trong tuần"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/).optional().default("18:00"),
  durationMinutes: z.number().int().optional().default(90)
});

const createClassSchema = z.object({
  courseId: z.string().min(1, "Mã khóa học (courseId) là bắt buộc"),
  name: z.string().min(1, "Tên lớp là bắt buộc"),
  description: z.string().optional(),
  teacherId: z.string().optional(),
  startDate: z.string().min(1, "Ngày bắt đầu là bắt buộc"),
  endDate: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  schedules: z.array(classScheduleSchema).optional().default([]),
  sessions: z.array(
    z.object({
      sessionNumber: z.number().int().min(1),
      lessonId: z.string().min(1),
      sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      title: z.string().optional()
    })
  ).optional().default([])
});

const updateClassSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  teacherId: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

const addStudentsSchema = z.object({
  studentIds: z.array(z.string()).min(1, "Cần ít nhất 1 học sinh"),
});

const normalizeAttendanceStatus = (
  status: string | null | undefined,
): "present" | "absent" | "inactive" => {
  if (status === "present") return "present";
  if (status === "inactive") return "inactive";
  return "absent";
};

const parseMonthRange = (month?: string) => {
  const now = new Date();
  let year = now.getUTCFullYear();
  let m = now.getUTCMonth() + 1; // 1-12
  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const [yStr, mStr] = month.split("-");
    year = Number(yStr);
    m = Number(mStr);
  }
  const start = new Date(Date.UTC(year, m - 1, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, m, 1, 0, 0, 0));
  return {
    start,
    end,
    monthLabel: `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, "0")}`,
  };
};

const classScheduleSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  durationMinutes: z.number().int().min(15).max(600),
  timezone: z.string().min(1).max(64).default("Asia/Ho_Chi_Minh"),
  isActive: z.boolean().optional().default(true),
});

const classAttendanceUpsertSchema = z.object({
  sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  records: z.array(
    z.object({
      studentId: z.string().min(1),
      status: z.enum(["present", "absent", "inactive"]),
      note: z.string().max(500).optional().nullable(),
    }),
  ),
});

const classesRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /classes - Danh sách lớp (admin/teacher)
  fastify.get(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const query = paginationSchema.safeParse(request.query);
      if (!query.success) {
        return reply
          .status(400)
          .send({ error: "Tham số truy vấn không hợp lệ" });
      }

      const {
        page,
        limit,
        search,
        sortBy = "createdAt",
        sortOrder,
      } = query.data;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (search) {
        where.name = { contains: search };
      }

      // Teacher chỉ thấy lớp của mình
      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin) {
        where.teacherId = (request.user as any).id;
      }

      const [data, total] = await Promise.all([
        fastify.prisma.class.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
          include: {
            teacher: {
              select: { id: true, fullName: true, email: true },
            },
            _count: {
              select: { students: true },
            },
          },
        }),
        fastify.prisma.class.count({ where }),
      ]);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    },
  );

  // GET /classes/:id - Chi tiết lớp
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;

      const classData = await fastify.prisma.class.findUnique({
        where: { id },
        include: {
          teacher: {
            select: { id: true, fullName: true, email: true },
          },
          students: {
            where: { deletedAt: null },
            include: {
              student: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
            orderBy: { joinedAt: "desc" },
          },
          schedules: true,
          sessions: {
            include: {
              lesson: {
                select: { id: true, title: true, lessonOrder: true },
              },
            },
            orderBy: { sessionNumber: "asc" },
          },
        },
      });

      if (!classData) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      // Teacher: verify ownership
      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin && classData.teacherId !== (request.user as any).id) {
        return reply
          .status(403)
          .send({
            error: "Từ chối truy cập - lớp không thuộc quyền quản lý của bạn",
          });
      }

      return classData;
    },
  );

  // POST /classes/preview-schedule - Sinh danh sách buổi học xem trước (Preview Schedule)
  fastify.post(
    "/preview-schedule",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const parsed = previewScheduleSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu preview không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const { courseId, startDate, daysOfWeek, startTime, durationMinutes } = parsed.data;

      const course = await fastify.prisma.course.findUnique({
        where: { id: courseId },
        include: {
          lessons: {
            orderBy: { lessonOrder: "asc" },
          },
        },
      });

      if (!course) {
        return reply.status(404).send({ error: "Không tìm thấy khóa học" });
      }

      if (!course.lessons || course.lessons.length === 0) {
        return reply.status(400).send({ error: "Khóa học này chưa có bài học nào để sinh lịch" });
      }

      // Generate dates for N lessons based on daysOfWeek
      const sessionsPreview: Array<{
        sessionNumber: number;
        lessonId: string;
        lessonOrder: number;
        lessonTitle: string;
        sessionDate: string;
      }> = [];

      let currentDate = new Date(startDate + "T00:00:00.000Z");
      const targetDays = new Set(daysOfWeek);

      for (let i = 0; i < course.lessons.length; i++) {
        const lesson = course.lessons[i];
        // Move currentDate to next matching dayOfWeek
        while (!targetDays.has(currentDate.getUTCDay())) {
          currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        const formattedDate = currentDate.toISOString().slice(0, 10);
        sessionsPreview.push({
          sessionNumber: i + 1,
          lessonId: lesson.id,
          lessonOrder: lesson.lessonOrder,
          lessonTitle: lesson.title,
          sessionDate: formattedDate,
        });

        // Advance 1 day for next search
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }

      return reply.send({
        courseId,
        courseTitle: course.title,
        totalSessions: course.lessons.length,
        startDate,
        daysOfWeek,
        startTime,
        durationMinutes,
        sessions: sessionsPreview,
      });
    },
  );

  // POST /classes - Tạo lớp mới (Atomic Transaction: Class + Schedule + ClassSessions)
  fastify.post(
    "/",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const parsed = createClassSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const {
        courseId,
        name,
        description,
        teacherId,
        startDate,
        endDate,
        isActive,
        schedules,
        sessions,
      } = parsed.data;

      const course = await fastify.prisma.course.findUnique({
        where: { id: courseId },
        include: { lessons: { orderBy: { lessonOrder: "asc" } } },
      });

      if (!course) {
        return reply.status(404).send({ error: "Không tìm thấy khóa học liên kết" });
      }

      // Strict Backend Validation: Check session count and 1-to-1 mapping
      if (sessions && sessions.length > 0) {
        if (sessions.length !== course.lessons.length) {
          return reply.status(400).send({
            error: `Số buổi học (${sessions.length}) không khớp với số bài học của khóa (${course.lessons.length}).`,
          });
        }

        const courseLessonIds = new Set(course.lessons.map((l) => l.id));
        for (const sess of sessions) {
          if (!courseLessonIds.has(sess.lessonId)) {
            return reply.status(400).send({
              error: `Bài học (lessonId: ${sess.lessonId}) không thuộc về khóa học này.`,
            });
          }
        }
      }

      // Execute Atomic Transaction: Class + ClassSchedule + ClassSession
      const createdClass = await fastify.prisma.$transaction(async (tx) => {
        const newClass = await tx.class.create({
          data: {
            courseId,
            name,
            description,
            teacherId: teacherId || (request.user as any).id,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : undefined,
            isActive,
            status: "ACTIVE",
          },
        });

        // Insert schedules if provided
        if (schedules && schedules.length > 0) {
          await tx.classSchedule.createMany({
            data: schedules.map((s) => ({
              classId: newClass.id,
              dayOfWeek: s.dayOfWeek,
              startTime: s.startTime,
              durationMinutes: s.durationMinutes,
              timezone: s.timezone || "Asia/Ho_Chi_Minh",
              isActive: s.isActive ?? true,
            })),
          });
        }

        // Insert sessions if provided, or auto-generate if empty
        let sessionsToCreate = sessions;
        if (!sessionsToCreate || sessionsToCreate.length === 0) {
          // Auto fallback generate if not provided
          let currentDate = new Date(startDate + "T00:00:00.000Z");
          const defaultDays = schedules.length > 0 ? new Set(schedules.map((s) => s.dayOfWeek)) : new Set([1, 3, 5]);
          sessionsToCreate = course.lessons.map((lesson, idx) => {
            while (!defaultDays.has(currentDate.getUTCDay())) {
              currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }
            const dateStr = currentDate.toISOString().slice(0, 10);
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            return {
              sessionNumber: idx + 1,
              lessonId: lesson.id,
              sessionDate: dateStr,
              title: lesson.title,
            };
          });
        }

        await tx.classSession.createMany({
          data: sessionsToCreate.map((s) => ({
            classId: newClass.id,
            lessonId: s.lessonId,
            sessionNumber: s.sessionNumber,
            sessionDate: new Date(s.sessionDate),
            title: s.title || null,
            status: "SCHEDULED",
          })),
        });

        return tx.class.findUnique({
          where: { id: newClass.id },
          include: {
            teacher: { select: { id: true, fullName: true, email: true } },
            schedules: true,
            sessions: {
              include: { lesson: { select: { id: true, title: true, lessonOrder: true } } },
              orderBy: { sessionNumber: "asc" },
            },
          },
        });
      });

      return reply.status(201).send(createdClass);
    },
  );

  // PUT /classes/:id - Cập nhật lớp
  fastify.put<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;
      const parsed = updateClassSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const existing = await fastify.prisma.class.findUnique({
        where: { id },
      });
      if (!existing) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      // Teacher: verify ownership
      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin && existing.teacherId !== (request.user as any).id) {
        return reply
          .status(403)
          .send({
            error: "Từ chối truy cập - lớp không thuộc quyền quản lý của bạn",
          });
      }

      const updateData: any = { ...parsed.data };
      if (updateData.startDate !== undefined) {
        updateData.startDate = updateData.startDate
          ? new Date(updateData.startDate)
          : null;
      }
      if (updateData.endDate !== undefined) {
        updateData.endDate = updateData.endDate
          ? new Date(updateData.endDate)
          : null;
      }

      const effectiveStart =
        updateData.startDate !== undefined
          ? updateData.startDate
          : existing.startDate;
      const effectiveEnd =
        updateData.endDate !== undefined ? updateData.endDate : existing.endDate;

      if (effectiveStart && effectiveEnd) {
        const startTime = new Date(effectiveStart).getTime();
        const endTime = new Date(effectiveEnd).getTime();
        if (Number.isFinite(startTime) && Number.isFinite(endTime)) {
          if (startTime > endTime) {
            return reply
              .status(400)
              .send({ error: "Ngày bắt đầu không được lớn hơn ngày kết thúc" });
          }
        }
      }

      const classData = await fastify.prisma.class.update({
        where: { id },
        data: updateData,
        include: {
          teacher: {
            select: { id: true, fullName: true, email: true },
          },
        },
      });

      return classData;
    },
  );

  // DELETE /classes/:id - Xoá lớp
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: [authenticate, requireRoles("admin")] },
    async (request, reply) => {
      const { id } = request.params;

      await fastify.prisma.class.delete({ where: { id } });
      return { success: true };
    },
  );

  // POST /classes/:id/students - Thêm học sinh vào lớp
  fastify.post<{ Params: { id: string } }>(
    "/:id/students",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;
      const parsed = addStudentsSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const existing = await fastify.prisma.class.findUnique({
        where: { id },
      });
      if (!existing) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      // Teacher: verify ownership
      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin && existing.teacherId !== (request.user as any).id) {
        return reply.status(403).send({ error: "Từ chối truy cập" });
      }

      const { studentIds } = parsed.data;

      // Dùng createMany với skipDuplicates để tránh lỗi unique
      const result = await fastify.prisma.classStudent.createMany({
        data: studentIds.map((studentId) => ({
          classId: id,
          studentId,
        })),
        skipDuplicates: true,
      });

      return { success: true, added: result.count };
    },
  );

  // PATCH /classes/:id/students/:studentId/status - Thay đổi trạng thái học viên & Ghi vết Audit Log
  fastify.patch<{ Params: { id: string; studentId: string }; Body: { status: string; reason?: string } }>(
    "/:id/students/:studentId/status",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id, studentId } = request.params;
      const { status, reason } = request.body || {};
      const operatorId = (request.user as any).id;

      const validStatuses = ["INVITED", "PENDING", "ACTIVE", "SUSPENDED", "COMPLETED"];
      if (!status || !validStatuses.includes(status)) {
        return reply.status(400).send({ error: "Trạng thái không hợp lệ" });
      }

      // Check teacher ownership if not admin
      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin) {
        const classData = await fastify.prisma.class.findUnique({
          where: { id },
        });
        if (!classData || classData.teacherId !== operatorId) {
          return reply.status(403).send({ error: "Từ chối truy cập" });
        }
      }

      const existing = await fastify.prisma.classStudent.findFirst({
        where: { classId: id, studentId, deletedAt: null },
      });

      if (!existing) {
        return reply.status(404).send({ error: "Học viên không thuộc lớp này" });
      }

      const fromStatus = existing.status;
      const updated = await fastify.prisma.classStudent.update({
        where: { id: existing.id },
        data: { status: status as any },
      });

      // Write Audit Log
      await fastify.prisma.enrollmentAuditLog.create({
        data: {
          operatorId,
          studentId,
          classId: id,
          fromStatus: fromStatus as any,
          toStatus: status as any,
          action: "STATUS_CHANGE",
          reason: reason || null,
        },
      });

      return { success: true, student: updated };
    },
  );

  // DELETE /classes/:id/students/:studentId - Xoá (Soft Delete) học sinh khỏi lớp
  fastify.delete<{ Params: { id: string; studentId: string } }>(
    "/:id/students/:studentId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id, studentId } = request.params;
      const operatorId = (request.user as any).id;

      // Teacher: verify ownership
      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin) {
        const classData = await fastify.prisma.class.findUnique({
          where: { id },
        });
        if (!classData || classData.teacherId !== operatorId) {
          return reply.status(403).send({ error: "Từ chối truy cập" });
        }
      }

      const existing = await fastify.prisma.classStudent.findFirst({
        where: { classId: id, studentId, deletedAt: null },
      });

      if (existing) {
        await fastify.prisma.classStudent.update({
          where: { id: existing.id },
          data: { deletedAt: new Date() },
        });

        await fastify.prisma.enrollmentAuditLog.create({
          data: {
            operatorId,
            studentId,
            classId: id,
            fromStatus: existing.status,
            toStatus: null,
            action: "SOFT_DELETE",
            reason: "Giáo viên / Admin xóa khỏi lớp",
          },
        });
      }

      return { success: true };
    },
  );

  // GET /classes/:id/schedules - Danh sách lịch học lặp lại
  fastify.get<{ Params: { id: string } }>(
    "/:id/schedules",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;

      const classData = await fastify.prisma.class.findUnique({
        where: { id },
        select: { id: true, teacherId: true },
      });
      if (!classData) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      const roles = ((request.user as any).roles || []).map((r: any) =>
        typeof r === "string" ? r : r?.role,
      );
      const isAdmin = roles.includes("admin");
      if (!isAdmin && classData.teacherId !== (request.user as any).id) {
        return reply.status(403).send({ error: "Từ chối truy cập" });
      }

      const rows = await fastify.prisma.$queryRaw<
        Array<{
          id: string;
          class_id: string;
          day_of_week: number;
          start_time: string;
          duration_minutes: number;
          timezone: string;
          is_active: number | boolean;
          created_at: Date;
          updated_at: Date;
        }>
      >(Prisma.sql`
        SELECT id, class_id, day_of_week, start_time, duration_minutes, timezone, is_active, created_at, updated_at
        FROM class_schedules
        WHERE class_id = ${id}
        ORDER BY day_of_week ASC, start_time ASC
      `);

      return {
        data: rows.map((r) => ({
          id: r.id,
          classId: r.class_id,
          dayOfWeek: r.day_of_week,
          startTime: r.start_time,
          durationMinutes: r.duration_minutes,
          timezone: r.timezone,
          isActive: Boolean(r.is_active),
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        })),
      };
    },
  );

  // POST /classes/:id/schedules - Tạo lịch học
  fastify.post<{ Params: { id: string } }>(
    "/:id/schedules",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;
      const parsed = classScheduleSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: "Dữ liệu lịch học không hợp lệ",
          details: parsed.error.flatten(),
        });
      }

      const classData = await fastify.prisma.class.findUnique({
        where: { id },
        select: { id: true, teacherId: true },
      });
      if (!classData) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      const roles = ((request.user as any).roles || []).map((r: any) =>
        typeof r === "string" ? r : r?.role,
      );
      const isAdmin = roles.includes("admin");
      if (!isAdmin && classData.teacherId !== (request.user as any).id) {
        return reply.status(403).send({ error: "Từ chối truy cập" });
      }

      const scheduleId = randomUUID();
      const { dayOfWeek, startTime, durationMinutes, timezone, isActive } =
        parsed.data;

      // Prevent duplicate (same class + dayOfWeek + startTime)
      const duplicate = await fastify.prisma.classSchedule.findFirst({
        where: { classId: id, dayOfWeek, startTime },
        select: { id: true },
      });
      if (duplicate) {
        return reply.status(409).send({
          error: "Lịch học đã tồn tại (trùng ngày và giờ bắt đầu)",
        });
      }

      await fastify.prisma.$executeRaw(Prisma.sql`
        INSERT INTO class_schedules (
          id, class_id, day_of_week, start_time, duration_minutes, timezone, is_active
        ) VALUES (
          ${scheduleId}, ${id}, ${dayOfWeek}, ${startTime}, ${durationMinutes}, ${timezone}, ${isActive}
        )
      `);

      return reply.status(201).send({
        id: scheduleId,
        classId: id,
        dayOfWeek,
        startTime,
        durationMinutes,
        timezone,
        isActive,
      });
    },
  );

  // DELETE /classes/:id/schedules/:scheduleId - Xóa lịch học
  fastify.delete<{ Params: { id: string; scheduleId: string } }>(
    "/:id/schedules/:scheduleId",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id, scheduleId } = request.params;
      const userId = (request.user as any).id;

      const userRoles = (request.user as any).roles || [];
      const isAdmin = userRoles.some(
        (r: any) => r.role === "admin" || r === "admin",
      );
      if (!isAdmin) {
        const owned = await isTeacherOfClass(fastify.prisma, userId, id);
        if (!owned) {
          return reply.status(403).send({ error: "Từ chối truy cập" });
        }
      }

      await fastify.prisma.$executeRaw(Prisma.sql`
        DELETE FROM class_schedules
        WHERE id = ${scheduleId} AND class_id = ${id}
      `);

      return { success: true };
    },
  );

  // Deprecated Legacy Raw-SQL Attendance routes removed.
  // Use /api/v1/classes/:classId/sessions/:sessionId/attendance and /api/v1/classes/:classId/attendance-matrix instead.

  // GET /classes/:id/attendance/history - Lịch sử + thống kê chuyên cần
  fastify.get<{ Params: { id: string } }>(
    "/:id/attendance/history",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { id } = request.params;

      const classData = await fastify.prisma.class.findUnique({
        where: { id },
        include: {
          students: {
            include: {
              student: {
                select: { id: true, fullName: true, email: true, avatarUrl: true },
              },
            },
            orderBy: { joinedAt: "asc" },
          },
        },
      });
      if (!classData) {
        return reply.status(404).send({ error: "Không tìm thấy lớp học" });
      }

      const roles = ((request.user as any).roles || []).map((r: any) =>
        typeof r === "string" ? r : r?.role,
      );
      const isAdmin = roles.includes("admin");
      if (!isAdmin && classData.teacherId !== (request.user as any).id) {
        return reply.status(403).send({ error: "Từ chối truy cập" });
      }

      const dateRows = await fastify.prisma.classAttendance.findMany({
        where: { classId: id },
        select: { sessionDate: true },
        distinct: ["sessionDate"],
        orderBy: { sessionDate: "asc" },
      });

      const sessionDates = dateRows.map((d) =>
        d.sessionDate.toISOString().slice(0, 10),
      );

      const attendanceRows = await fastify.prisma.classAttendance.findMany({
        where: { classId: id },
        select: {
          studentId: true,
          sessionDate: true,
          status: true,
        },
      });

      const recordsByStudent: Record<
        string,
        Record<string, "present" | "absent" | "inactive">
      > = {};
      attendanceRows.forEach((row) => {
        const dateKey = row.sessionDate.toISOString().slice(0, 10);
        if (!recordsByStudent[row.studentId]) {
          recordsByStudent[row.studentId] = {};
        }
        recordsByStudent[row.studentId][dateKey] = normalizeAttendanceStatus(
          row.status,
        );
      });

      const students = (classData.students || []).map((cs: any) => {
        const statusMap = recordsByStudent[cs.studentId] || {};
        let present = 0;
        let absent = 0;
        Object.values(statusMap).forEach((status) => {
          if (status === "present") present += 1;
          else if (status === "absent") absent += 1;
        });
        const totalCount = present + absent;
        const attendanceRate = totalCount > 0 ? present / totalCount : 0;
        return {
          studentId: cs.studentId,
          fullName: cs.student?.fullName || "Chưa đặt tên",
          email: cs.student?.email || "",
          avatarUrl: cs.student?.avatarUrl || null,
          statuses: statusMap,
          summary: {
            present,
            absent,
            attendanceRate,
            isEligible: attendanceRate >= 0.8,
          },
        };
      });

      return {
        classId: id,
        sessionDates,
        students,
      };
    },
  );

  // GET /attendance/summary/monthly?month=YYYY-MM&classId=optional
  fastify.get(
    "/attendance/summary/monthly",
    { preHandler: [authenticate, requireRoles("admin", "teacher")] },
    async (request, reply) => {
      const { month, classId } = request.query as {
        month?: string;
        classId?: string;
      };

      const { start, end, monthLabel } = parseMonthRange(month);

      const roles = ((request.user as any).roles || []).map((r: any) =>
        typeof r === "string" ? r : r?.role,
      );
      const isAdmin = roles.includes("admin");
      const userId = (request.user as any).id;

      let classFilter: any = {};
      if (classId) {
        if (!isAdmin) {
          const owned = await isTeacherOfClass(fastify.prisma, userId, classId);
          if (!owned) {
            return reply.status(403).send({ error: "Từ chối truy cập" });
          }
        }
        classFilter = { classId };
      } else if (!isAdmin) {
        // Teacher: only classes they own
        const ownClasses = await fastify.prisma.class.findMany({
          where: { teacherId: userId },
          select: { id: true },
        });
        const ids = ownClasses.map((c) => c.id);
        if (ids.length === 0) {
          return { month: monthLabel, totalPresent: 0, totalAbsent: 0, attendanceRate: 0 };
        }
        classFilter = { classId: { in: ids } };
      }

      const [presentCount, absentCount] = await Promise.all([
        fastify.prisma.classAttendance.count({
          where: {
            ...classFilter,
            status: "present",
            sessionDate: { gte: start, lt: end },
          },
        }),
        fastify.prisma.classAttendance.count({
          where: {
            ...classFilter,
            status: "absent",
            sessionDate: { gte: start, lt: end },
          },
        }),
      ]);

      const totalCount = presentCount + absentCount;
      const attendanceRate = totalCount > 0 ? presentCount / totalCount : 0;

      return {
        month: monthLabel,
        classId: classId || null,
        totalPresent: presentCount,
        totalAbsent: absentCount,
        attendanceRate,
      };
    },
  );
};

export default classesRoutes;
