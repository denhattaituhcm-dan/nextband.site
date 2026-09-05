import { PrismaClient, NotificationType } from "@prisma/client";
import { ClassRepository } from "../repositories/class.repository.js";
import { AuthorizationService, AuthorizationError, NotFoundError } from "./authorization.service.js";
import { NotificationService } from "./notification.service.js";
import { RoomCollisionService } from "./room-collision.service.js";
import { isHolidayDate, HolidayRange } from "../utils/holiday.helper.js";

export class ClassService {
  private repo: ClassRepository;
  private notifService: NotificationService;

  constructor(private prisma: PrismaClient) {
    this.repo = new ClassRepository(prisma);
    this.notifService = new NotificationService(prisma);
  }

  // Use Case: Get all active class memberships for the currently authenticated student
  async getMyClasses(userId: string) {
    const memberships = await this.repo.getClassesForStudent(userId);
    return memberships.map((m) => ({
      id: m.id,
      classId: m.class.id,
      className: m.class.name,
      courseId: m.class.courseId,
      courseTitle: m.class.course?.title ?? m.class.name,
      courseSlug: m.class.course?.slug ?? null,
      teacherName: m.class.teacher?.fullName ?? null,
      isActive: m.class.isActive,
      membershipStatus: "ACTIVE",
      joinedAt: m.createdAt,
    }));
  }

  // Use Case: List Classes with Role & Teacher filtering & Branch scoping
  async listClasses(user: { id: string; roles: string[] }, query: any) {
    const { page = 1, limit = 10, search, isActive, branchId } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (isTeacher && !isAdmin) {
      where.teacherId = user.id;
    } else if (!isAdmin && !isTeacher) {
      where.students = { some: { studentId: user.id } };
    } else if (isAdmin && query.teacherId) {
      where.teacherId = query.teacherId;
    }

    if (query.courseId) {
      where.courseId = query.courseId;
    }

    // Branch Scoping (INV-2, INV-3, INV-5)
    const authService = new AuthorizationService(this.prisma);
    const branchScope = await authService.resolveAuthorizedBranchScope({
      userId: user.id,
      userRoles: user.roles,
      requestedBranchId: branchId,
    });

    if (branchScope.type === "branch") {
      where.branchId = branchScope.branchId;
    } else if (branchScope.type === "branches") {
      where.branchId = { in: branchScope.branchIds };
    }

    if (isActive !== undefined) {
      where.isActive = isActive === "true" || isActive === true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [rawData, total] = await Promise.all([
      this.repo.findMany(where, skip, limit),
      this.repo.count(where),
    ]);

    // Canonical Enrichment: Aggregate real-time exam and submission metrics for classes
    const classIds = rawData.map((c) => c.id);
    const courseIds = Array.from(new Set(rawData.map((c) => c.courseId).filter(Boolean))) as string[];

    const examsCountByCourse = new Map<string, number>();
    if (courseIds.length > 0) {
      const courseExams = await this.prisma.exam.groupBy({
        by: ["courseId"],
        where: {
          courseId: { in: courseIds },
          isPublished: true,
          isActive: true,
        },
        _count: { id: true },
      });
      courseExams.forEach((ce) => {
        if (ce.courseId) examsCountByCourse.set(ce.courseId, ce._count.id);
      });
    }

    const classStudents = classIds.length > 0
      ? await this.prisma.classStudent.findMany({
          where: {
            classId: { in: classIds },
            status: "ACTIVE",
            deletedAt: null,
          },
          select: {
            classId: true,
            studentId: true,
          },
        })
      : [];

    const studentsByClass = new Map<string, string[]>();
    classStudents.forEach((cs) => {
      if (!studentsByClass.has(cs.classId)) studentsByClass.set(cs.classId, []);
      studentsByClass.get(cs.classId)!.push(cs.studentId);
    });

    const allStudentIds = Array.from(new Set(classStudents.map((cs) => cs.studentId)));
    const studentUsers = allStudentIds.length > 0
      ? await this.prisma.user.findMany({
          where: {
            OR: [{ id: { in: allStudentIds } }, { userId: { in: allStudentIds } }],
          },
          select: { id: true, userId: true },
        })
      : [];

    const userToCanonicalId = new Map<string, string>();
    studentUsers.forEach((u) => {
      if (u.id) userToCanonicalId.set(u.id, u.userId);
      if (u.userId) userToCanonicalId.set(u.userId, u.userId);
    });

    const canonicalStudentUserIds = Array.from(new Set(studentUsers.map((u) => u.userId).filter(Boolean)));
    const submissions = canonicalStudentUserIds.length > 0
      ? await this.prisma.examSubmission.findMany({
          where: {
            studentId: { in: canonicalStudentUserIds },
          },
          select: {
            id: true,
            studentId: true,
            examId: true,
            status: true,
            submittedAt: true,
            exam: {
              select: { courseId: true },
            },
          },
        })
      : [];

    const data = rawData.map((c: any) => {
      const courseExamCount = c.courseId ? (examsCountByCourse.get(c.courseId) || 0) : 0;
      const classStudentIds = studentsByClass.get(c.id) || [];
      const classCanonicalUserIds = new Set(
        classStudentIds.map((sId) => userToCanonicalId.get(sId) || sId)
      );

      const classSubmissions = submissions.filter(
        (s) =>
          classCanonicalUserIds.has(s.studentId) &&
          (!c.courseId || s.exam?.courseId === c.courseId)
      );

      const pendingSubmissionsCount = classSubmissions.filter(
        (s) => s.status === "SUBMITTED"
      ).length;

      const completedSubmissions = classSubmissions.filter(
        (s) => s.status === "SUBMITTED" || s.status === "GRADED"
      );
      const uniqueCompletedExams = new Set(
        completedSubmissions.map((s) => `${s.studentId}_${s.examId}`)
      );
      const completedSubmissionsCount = uniqueCompletedExams.size;

      const totalStudents = classStudentIds.length;
      const totalAssigned = courseExamCount * Math.max(1, totalStudents);
      const progressPercent = totalAssigned > 0
        ? Math.min(100, Math.round((completedSubmissionsCount / totalAssigned) * 100))
        : 0;

      return {
        ...c,
        homeworkCount: courseExamCount,
        completedSessions: courseExamCount,
        pendingSubmissionsCount,
        completedSubmissionsCount,
        overdueCount: 0,
        progressPercent,
      };
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Use Case: Get Class Details with Ownership Check
  async getClassById(user: { id: string; roles: string[] }, id: string) {
    const classData = await this.repo.findById(id);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (isTeacher && !isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - lớp không thuộc quyền quản lý của bạn", 403);
    }

    if (!isAdmin && !isTeacher) {
      const isEnrolled = classData.students.some((s: any) => s.studentId === user.id);
      if (!isEnrolled) {
        throw new AuthorizationError("Từ chối truy cập - bạn không phải thành viên của lớp này", 403);
      }
    }

    return classData;
  }

  // Use Case: Get Class Sessions
  async getClassSessions(user: { id: string; roles: string[] }, classId: string) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (isTeacher && !isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - lớp không thuộc quyền quản lý của bạn", 403);
    }

    if (!isAdmin && !isTeacher) {
      const isEnrolled = classData.students.some((s: any) => s.studentId === user.id);
      if (!isEnrolled) {
        throw new AuthorizationError("Từ chối truy cập - bạn không phải thành viên của lớp này", 403);
      }
    }

    const sessions = await this.prisma.classSession.findMany({
      where: { classId },
      orderBy: { sessionNumber: "asc" },
    });

    return sessions.map((s: any) => ({
      id: s.id,
      classId: s.classId,
      sessionNumber: s.sessionNumber,
      title: s.note || `Buổi ${s.sessionNumber}`,
      sessionDate: s.plannedDate,
      plannedDate: s.plannedDate,
      startTime: s.startTime || null,
      endTime: s.endTime || null,
      status: s.status,
      note: s.note || null,
      rescheduleReason: s.rescheduleReason || null,
      completedAt: null,
    }));
  }

  // Use Case: Generate or Update Class Sessions (With Holiday Exclusion)
  async generateSessionsForClass(
    user: { id: string; roles: string[] },
    classId: string,
    options: {
      startDate: string;
      weekdays: number[];
      totalSessions: number;
      startTime: string;
      endTime: string;
      excludeHolidays?: boolean;
      customHolidays?: HolidayRange[];
    }
  ) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const {
      startDate,
      weekdays,
      totalSessions = 27,
      startTime = "18:00",
      endTime = "20:00",
      excludeHolidays = true,
      customHolidays,
    } = options;

    if (!startDate || !Array.isArray(weekdays) || weekdays.length === 0) {
      throw new AuthorizationError("Ngày bắt đầu và thứ trong tuần không được để trống", 400);
    }

    const dates: string[] = [];
    const [y, m, d] = startDate.split("-").map(Number);
    const cur = new Date(y, m - 1, d);

    // Limit iteration safety counter to prevent infinite loop
    let maxDaysLookahead = totalSessions * 14;
    while (dates.length < totalSessions && maxDaysLookahead > 0) {
      maxDaysLookahead--;
      const dow = cur.getDay();
      if (weekdays.includes(dow)) {
        // Check if day falls into holidays
        const isHoliday = excludeHolidays && isHolidayDate(cur, customHolidays);
        if (!isHoliday) {
          const mm = String(cur.getMonth() + 1).padStart(2, "0");
          const dd = String(cur.getDate()).padStart(2, "0");
          dates.push(`${cur.getFullYear()}-${mm}-${dd}`);
        }
      }
      cur.setDate(cur.getDate() + 1);
    }

    const startTimeDate = new Date(`1970-01-01T${startTime.slice(0, 5)}:00.000Z`);
    const endTimeDate = new Date(`1970-01-01T${endTime.slice(0, 5)}:00.000Z`);

    const existingSessions = await this.prisma.classSession.findMany({
      where: { classId },
    });

    const result = [];
    for (let idx = 0; idx < dates.length; idx++) {
      const sessionNumber = idx + 1;
      const plannedDate = new Date(`${dates[idx]}T00:00:00.000Z`);
      const existing = existingSessions.find((s) => s.sessionNumber === sessionNumber);

      if (existing) {
        const updated = await this.prisma.classSession.update({
          where: { id: existing.id },
          data: {
            plannedDate,
            startTime: startTimeDate,
            endTime: endTimeDate,
          },
        });
        result.push(updated);
      } else {
        const created = await this.prisma.classSession.create({
          data: {
            classId,
            sessionNumber,
            plannedDate,
            startTime: startTimeDate,
            endTime: endTimeDate,
            status: "PLANNED",
          },
        });
        result.push(created);
      }
    }

    if (existingSessions.length > dates.length) {
      const extraneousIds = existingSessions
        .filter((s) => s.sessionNumber > dates.length && s.status === "PLANNED")
        .map((s) => s.id);
      if (extraneousIds.length > 0) {
        await this.prisma.classSession.deleteMany({
          where: { id: { in: extraneousIds } },
        });
      }
    }

    // Automatically sync Class.endDate with the final session date
    if (dates.length > 0) {
      const finalEndDate = new Date(`${dates[dates.length - 1]}T23:59:59.999Z`);
      await this.prisma.class.update({
        where: { id: classId },
        data: { endDate: finalEndDate },
      });
    }

    return result;
  }

  // Use Case: Postpone a session due to unexpected circumstances and shift all subsequent sessions
  async postponeSessionAndShift(
    user: { id: string; roles: string[] },
    classId: string,
    sessionId: string,
    options: {
      reason?: string;
      customHolidays?: HolidayRange[];
    } = {}
  ) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền dời lịch lớp học này", 403);
    }

    // Fetch all sessions of the class
    const allSessions = await this.prisma.classSession.findMany({
      where: { classId },
      orderBy: { sessionNumber: "asc" },
    });

    const targetSession = allSessions.find((s) => s.id === sessionId);
    if (!targetSession) {
      throw new NotFoundError("Không tìm thấy buổi học cần dời");
    }

    if (targetSession.status === "COMPLETED") {
      throw new AuthorizationError("Không thể dời buổi học đã hoàn thành điểm danh", 400);
    }

    // Determine weekdays of this class from schedules or derive from existing session dates
    let weekdays: number[] = [];
    const schedules = await this.prisma.classSchedule.findMany({
      where: { classId },
    });
    if (schedules.length > 0) {
      weekdays = schedules.map((sc) => sc.dayOfWeek);
    } else {
      const distinctDows = new Set(
        allSessions
          .filter((s) => s.plannedDate)
          .map((s) => new Date(s.plannedDate).getDay())
      );
      weekdays = Array.from(distinctDows);
    }

    if (weekdays.length === 0) {
      weekdays = [1, 3, 5];
    }

    // Get all sessions from target session onwards that are not completed
    const sessionsToShift = allSessions.filter(
      (s) => s.sessionNumber >= targetSession.sessionNumber && s.status !== "COMPLETED"
    );

    // Starting from the day after the target session's original plannedDate
    const origDate = new Date(targetSession.plannedDate);
    const cur = new Date(origDate);
    cur.setDate(cur.getDate() + 1);

    const updatedSessions = [];
    for (const sess of sessionsToShift) {
      let foundValidDate = false;
      let safetyCounter = 60;
      while (!foundValidDate && safetyCounter > 0) {
        safetyCounter--;
        const dow = cur.getDay();
        const isHoliday = isHolidayDate(cur, options.customHolidays);
        if (weekdays.includes(dow) && !isHoliday) {
          foundValidDate = true;
          const newPlannedDate = new Date(cur);
          newPlannedDate.setUTCHours(0, 0, 0, 0);

          const updated = await this.prisma.classSession.update({
            where: { id: sess.id },
            data: { plannedDate: newPlannedDate },
          });
          updatedSessions.push(updated);
        }
        cur.setDate(cur.getDate() + 1);
      }
    }

    // Update Class endDate with the last shifted session's date
    if (updatedSessions.length > 0) {
      const lastSession = updatedSessions[updatedSessions.length - 1];
      const newEndDate = new Date(lastSession.plannedDate);
      newEndDate.setUTCHours(23, 59, 59, 999);
      await this.prisma.class.update({
        where: { id: classId },
        data: { endDate: newEndDate },
      });
    }

    // Send announcement to students
    const reasonText = options.reason ? ` Lý do: ${options.reason}.` : "";
    const newDateStr = updatedSessions[0]
      ? new Date(updatedSessions[0].plannedDate).toLocaleDateString("vi-VN")
      : "";
    const origDateStr = origDate.toLocaleDateString("vi-VN");

    const students = await this.prisma.classStudent.findMany({
      where: { classId, status: "ACTIVE", deletedAt: null },
      select: { studentId: true },
    });

    if (students.length > 0) {
      const notifs = students.map((st) => ({
        userId: st.studentId,
        type: NotificationType.ANNOUNCEMENT,
        title: `Thông báo dời lịch học: ${classData.name}`,
        message: `Buổi học số ${targetSession.sessionNumber} (dự kiến ngày ${origDateStr}) đã được dời sang ngày ${newDateStr}.${reasonText} Các buổi học tiếp theo được tự động cập nhật theo lịch mới.`,
        link: `/classes/${classId}`,
        entityType: "CLASS",
        entityId: classId,
      }));
      await this.notifService.createBatchNotifications(this.prisma, notifs);
    }

    return {
      success: true,
      message: `Đã dời Buổi ${targetSession.sessionNumber} từ ${origDateStr} sang ${newDateStr} và cập nhật lịch cho ${updatedSessions.length} buổi học tiếp theo.`,
      shiftedCount: updatedSessions.length,
      updatedSessions,
    };
  }

  // Use Case: Create Class (Admin Only)
  async createClass(user: { id: string; roles: string[] }, data: any) {
    const isAdmin = user.roles.includes("admin");

    if (!isAdmin) {
      throw new AuthorizationError("Chỉ quản trị viên (Admin) mới có quyền tạo lớp học", 403);
    }

    const teacherId = data.teacherId || null;

    let courseId = data.courseId;
    if (!courseId) {
      const firstCourse = await this.prisma.course.findFirst();
      courseId = firstCourse?.id || "default";
    }

    // MVP invariant: Room phải thuộc cùng Branch với Class.
    // Room.branchId === Class.branchId — không được tạo lớp học ở cơ sở A nhưng dùng phòng ở cơ sở B.
    if (data.roomId && data.branchId) {
      const room = await this.prisma.room.findUnique({
        where: { id: data.roomId },
        select: { branchId: true, name: true },
      });
      if (!room) {
        throw new NotFoundError("Phòng học không tồn tại.");
      }
      if (room.branchId !== data.branchId) {
        throw new AuthorizationError(
          "Phòng học không thuộc cơ sở đã chọn. Vui lòng chọn phòng học thuộc đúng cơ sở.",
          400
        );
      }
    }

    return this.repo.create({
      name: data.name,
      description: data.description,
      course: { connect: { id: courseId } },
      branch: data.branchId ? { connect: { id: data.branchId } } : undefined,
      room: data.roomId ? { connect: { id: data.roomId } } : undefined,
      teacher: teacherId ? { connect: { id: teacherId } } : undefined,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      isActive: data.isActive !== undefined ? data.isActive : true,
    } as any);
  }


  // Use Case: Update Class (Admin Only)
  async updateClass(user: { id: string; roles: string[] }, id: string, data: any) {
    const classData = await this.repo.findById(id);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Bạn không có quyền chỉnh sửa thông tin lớp học này", 403);
    }

    if (isTeacher && !isAdmin) {
      const isOwner =
        (classData.teacherId && classData.teacherId === user.id) ||
        (classData.teacherId && (user as any).userId === classData.teacherId);
      if (!isOwner) {
        throw new AuthorizationError("Bạn không có quyền sửa lớp này", 403);
      }
    }

    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.courseId !== undefined) updatePayload.courseId = data.courseId;
    if (data.branchId !== undefined) updatePayload.branchId = data.branchId || null;
    if (data.roomId !== undefined) updatePayload.roomId = data.roomId || null;
    if (data.startDate !== undefined) updatePayload.startDate = data.startDate ? new Date(data.startDate) : null;
    if (data.endDate !== undefined) updatePayload.endDate = data.endDate ? new Date(data.endDate) : null;
    if (data.isActive !== undefined) updatePayload.isActive = data.isActive;
    if (isAdmin && data.teacherId !== undefined) updatePayload.teacherId = data.teacherId;

    // MVP invariant: Room phải thuộc cùng Branch với Class khi cập nhật.
    const effectiveBranchId = updatePayload.branchId ?? classData.branchId;
    const effectiveRoomId = updatePayload.roomId ?? classData.roomId;
    if (effectiveRoomId && effectiveBranchId) {
      const room = await this.prisma.room.findUnique({
        where: { id: effectiveRoomId },
        select: { branchId: true },
      });
      if (room && room.branchId !== effectiveBranchId) {
        throw new AuthorizationError(
          "Phòng học không thuộc cơ sở đã chọn. Vui lòng chọn phòng học thuộc đúng cơ sở.",
          400
        );
      }
    }

    // OP-GAP-03: Room collision check when changing room for an active class with existing sessions
    if (data.roomId !== undefined && effectiveRoomId && effectiveRoomId !== classData.roomId) {
      const existingClassSessions = await this.prisma.classSession.findMany({
        where: {
          classId: id,
          status: { not: "CANCELLED" },
        },
        select: {
          plannedDate: true,
          startTime: true,
          endTime: true,
        },
      });

      if (existingClassSessions.length > 0) {
        const collisionResult = await RoomCollisionService.checkRoomConflictForSessions(
          this.prisma,
          {
            roomId: effectiveRoomId,
            sessions: existingClassSessions,
            excludeClassId: id,
          }
        );

        if (collisionResult.hasConflict) {
          throw new AuthorizationError(
            collisionResult.message || "Xung đột phòng học với lớp khác trong cùng khung giờ.",
            409
          );
        }
      }
    }

    return this.repo.update(id, updatePayload);
  }


  // Helper: Gửi thông báo đến học sinh và giáo viên khi lớp đóng
  private async sendClassClosedNotifications(classData: {
    id: string;
    name: string;
    teacherId?: string | null;
    students?: Array<{ studentId: string }>;
  }) {
    const recipientUserIds = new Set<string>();
    if (classData.teacherId) {
      recipientUserIds.add(classData.teacherId);
    }
    if (classData.students) {
      for (const s of classData.students) {
        if (s.studentId) recipientUserIds.add(s.studentId);
      }
    }

    if (recipientUserIds.size === 0) return;

    const notifPayloads = Array.from(recipientUserIds).map((userId) => ({
      userId,
      type: NotificationType.SYSTEM,
      title: `Lớp học đã kết thúc: ${classData.name}`,
      message: `Lớp học "${classData.name}" đã chính thức đóng. Bạn có 3 tháng để xem lại bài nộp, điểm số và nhận xét trước khi dữ liệu lớp được dọn dẹp.`,
      link: `/classes/${classData.id}`,
      entityType: "CLASS",
      entityId: classData.id,
    }));

    await this.notifService.createBatchNotifications(this.prisma, notifPayloads);
  }

  // Use Case: Get Center-Wide Inter-Class League Standings (Class Competition & Gamification)
  async getLeagueStandings(branchId?: string) {
    const where: any = {
      status: "ACTIVE",
    };
    if (branchId && branchId !== "ALL") {
      where.branchId = branchId;
    }

    const classes = await this.prisma.class.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            exams: {
              where: { isPublished: true, isActive: true },
              select: { id: true },
            },
          },
        },
        branch: { select: { id: true, name: true } },
        teacher: { select: { id: true, fullName: true, avatarUrl: true } },
        sessions: { select: { id: true } },
        students: {
          where: { deletedAt: null, status: "ACTIVE" },
          include: {
            student: {
              select: {
                id: true,
                userId: true,
                fullName: true,
              },
            },
          },
        },
        attendance: {
          select: {
            studentId: true,
            status: true,
          },
        },
      },
    });

    // Fetch canonical exam submissions for all students in active classes
    const allStudentUserIds = Array.from(
      new Set(
        classes.flatMap((c) =>
          c.students.map((cs) => cs.student.userId || cs.student.id).filter(Boolean)
        )
      )
    );

    const allExamsInCourses = Array.from(
      new Set(classes.flatMap((c) => (c.course?.exams || []).map((e) => e.id)))
    );

    const allSubmissions = allStudentUserIds.length > 0 && allExamsInCourses.length > 0
      ? await this.prisma.examSubmission.findMany({
          where: {
            studentId: { in: allStudentUserIds },
            examId: { in: allExamsInCourses },
            status: { in: ["SUBMITTED", "GRADED"] },
          },
          select: {
            studentId: true,
            examId: true,
            status: true,
          },
        })
      : [];

    const standings = classes.map((c) => {
      const totalStudents = c.students.length;
      const totalHomeworks = c.course?.exams?.length || 0;
      const totalSessions = c.sessions.length;

      const courseExamIds = new Set((c.course?.exams || []).map((e) => e.id));
      const classStudentIds = new Set(
        c.students.map((cs) => cs.student.userId || cs.student.id).filter(Boolean)
      );

      const completedSubmissions = allSubmissions.filter(
        (s) => classStudentIds.has(s.studentId) && courseExamIds.has(s.examId)
      );

      const uniqueCompletedSlots = new Set(
        completedSubmissions.map((s) => `${s.studentId}_${s.examId}`)
      );
      const totalCompletedSubmissions = uniqueCompletedSlots.size;

      const totalAssignedSlots = totalStudents * totalHomeworks;
      const completionRate = totalAssignedSlots > 0 ? Math.round((totalCompletedSubmissions / totalAssignedSlots) * 100) : 0;

      // 2. Attendance rate
      const totalAttendanceSlots = totalStudents * totalSessions;
      const attendedCount = c.attendance.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
      const attendanceRate = totalAttendanceSlots > 0 ? Math.round((attendedCount / totalAttendanceSlots) * 100) : 100;

      // 3. League Score calculation (Fair scale: 70% Homework + 30% Attendance)
      // If no assignments or sessions have happened yet, score is 0.
      const leagueScore = (totalAssignedSlots === 0 && totalAttendanceSlots === 0)
        ? 0
        : Math.round(completionRate * 70 + attendanceRate * 30);

      return {
        classId: c.id,
        className: c.name,
        courseTitle: c.course?.title || "Khóa học",
        branchName: c.branch?.name || "Chưa gán",
        branchId: c.branchId,
        teacherName: c.teacher?.fullName || "Chưa phân công",
        teacherAvatar: c.teacher?.avatarUrl || null,
        totalStudents,
        totalHomeworks,
        totalSessions,
        totalCompletedSubmissions,
        totalAssignedSlots,
        completionRate,
        attendanceRate,
        leagueScore,
      };
    });

    // Sort descending by leagueScore, then by completionRate
    standings.sort((a, b) => {
      if (b.leagueScore !== a.leagueScore) {
        return b.leagueScore - a.leagueScore;
      }
      return b.completionRate - a.completionRate;
    });

    // Assign rank
    const rankedStandings = standings.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    return {
      totalClasses: rankedStandings.length,
      standings: rankedStandings,
    };
  }

  // Use Case: Get Class Progress Leaderboard for Students & Peers (Gamified Race to 100%)
  async getClassLeaderboard(user: { id: string; roles: string[] }, classId: string) {
    const classData = await this.prisma.class.findUnique({
      where: { id: classId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            exams: {
              where: { isPublished: true, isActive: true },
              select: { id: true, title: true, week: true },
              orderBy: { week: "asc" },
            },
          },
        },
        students: {
          where: { deletedAt: null, status: "ACTIVE" },
          include: {
            student: {
              select: {
                id: true,
                userId: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
        sessions: {
          select: {
            id: true,
            sessionNumber: true,
            plannedDate: true,
          },
          orderBy: { sessionNumber: "asc" },
        },
      },
    });

    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const courseExams = classData.course?.exams || [];
    const totalHomeworks = courseExams.length;
    const examIds = courseExams.map((e) => e.id);

    const studentUserIds = classData.students.map((cs) => cs.student.userId || cs.student.id).filter(Boolean);
    const submissions = studentUserIds.length > 0 && examIds.length > 0
      ? await this.prisma.examSubmission.findMany({
          where: {
            studentId: { in: studentUserIds },
            examId: { in: examIds },
            status: { in: ["SUBMITTED", "GRADED"] },
          },
          select: {
            studentId: true,
            examId: true,
            status: true,
            submittedAt: true,
          },
        })
      : [];

    const now = new Date();

    // 1. Next upcoming session / homework deadline for the whole class
    const upcomingSessions = classData.sessions
      .filter((s) => s.plannedDate && new Date(s.plannedDate) >= now)
      .sort((a, b) => new Date(a.plannedDate).getTime() - new Date(b.plannedDate).getTime());

    const nextSession = upcomingSessions[0] || null;
    const nextExam = nextSession ? courseExams[nextSession.sessionNumber - 1] || courseExams[0] : courseExams[0] || null;
    const nextDeadline = nextSession?.plannedDate
      ? new Date(new Date(nextSession.plannedDate).getTime() + 7 * 24 * 60 * 60 * 1000)
      : null;

    const nextUpcomingHomework = nextExam
      ? {
          title: nextExam.title,
          deadline: nextDeadline,
          isUrgent: nextDeadline ? nextDeadline.getTime() - now.getTime() < 48 * 60 * 60 * 1000 : false,
        }
      : null;

    // 2. Calculate individual student metrics
    const studentRanks = classData.students.map((cs) => {
      const student = cs.student;
      const studentId = student.userId || student.id;

      const studentSubs = submissions.filter(
        (s) => s.studentId === student.userId || s.studentId === student.id
      );
      const uniqueSubmittedExams = new Set(studentSubs.map((s) => s.examId));
      const completedCount = uniqueSubmittedExams.size;
      const completionRate = totalHomeworks > 0 ? Math.round((completedCount / totalHomeworks) * 100) : 0;

      return {
        studentId,
        fullName: student.fullName || "Học viên",
        avatarUrl: student.avatarUrl,
        completedCount,
        totalHomeworks,
        completionRate,
        isMe: studentId === user.id,
      };
    });

    // 3. Calculate collective class progress
    const totalStudents = studentRanks.length;
    const totalAssignedSlots = totalStudents * totalHomeworks;
    const totalSubmittedSlots = studentRanks.reduce((acc, s) => acc + s.completedCount, 0);
    const classCompletionRate = totalAssignedSlots > 0 ? Math.round((totalSubmittedSlots / totalAssignedSlots) * 100) : 0;

    // Target Band
    const bandMatch = classData.course?.title?.match(/\d+(\.\d+)?/);
    const targetBand = bandMatch ? `Band ${bandMatch[0]}+` : "Band 6.5+";

    // Sort descending by completedCount, then by fullName
    studentRanks.sort((a, b) => {
      if (b.completedCount !== a.completedCount) {
        return b.completedCount - a.completedCount;
      }
      return a.fullName.localeCompare(b.fullName);
    });

    let currentRank = 1;
    const rankedStudents = studentRanks.map((s, index) => {
      if (index > 0 && s.completedCount < studentRanks[index - 1].completedCount) {
        currentRank = index + 1;
      }
      return {
        ...s,
        rank: currentRank,
      };
    });

    const myRankItem = rankedStudents.find((s) => s.isMe);

    return {
      classId: classData.id,
      className: classData.name,
      courseTitle: classData.course?.title || "IELTS Course",
      targetBand,
      totalStudents,
      totalHomeworks,
      classCompletionRate,
      totalSubmittedSlots,
      totalAssignedSlots,
      nextUpcomingHomework,
      myRank: myRankItem?.rank || null,
      myCompletedCount: myRankItem?.completedCount || 0,
      students: rankedStudents,
    };
  }

  // Use Case: Get End-of-Course Graduation Summary (Honor Roll, Completion & Overdue Rates)
  async getGraduationSummary(classId: string) {
    const classData = await this.prisma.class.findUnique({
      where: { id: classId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            exams: {
              where: { isPublished: true, isActive: true },
              select: { id: true, title: true, week: true },
              orderBy: { week: "asc" },
            },
          },
        },
        teacher: { select: { id: true, fullName: true, email: true } },
        sessions: {
          select: { id: true, sessionNumber: true, plannedDate: true },
          orderBy: { sessionNumber: "asc" },
        },
        students: {
          where: { deletedAt: null, status: "ACTIVE" },
          include: {
            student: {
              select: {
                id: true,
                userId: true,
                fullName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        attendance: {
          select: {
            studentId: true,
            status: true,
          },
        },
      },
    });

    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const courseExams = classData.course?.exams || [];
    const totalHomeworks = courseExams.length;
    const totalSessions = classData.sessions.length;
    const examIds = courseExams.map((e) => e.id);

    const studentUserIds = classData.students.map((cs) => cs.student.userId || cs.student.id).filter(Boolean);
    const submissions = studentUserIds.length > 0 && examIds.length > 0
      ? await this.prisma.examSubmission.findMany({
          where: {
            studentId: { in: studentUserIds },
            examId: { in: examIds },
            status: { in: ["SUBMITTED", "GRADED"] },
          },
          select: {
            studentId: true,
            examId: true,
            status: true,
            submittedAt: true,
          },
        })
      : [];

    const studentResults = classData.students.map((cs) => {
      const student = cs.student;
      const studentId = student.userId || student.id;

      const studentSubs = submissions.filter(
        (s) => s.studentId === student.userId || s.studentId === student.id
      );

      // Deduplicate by examId
      const uniqueSubmittedExams = new Set(studentSubs.map((s) => s.examId));
      const submittedCount = uniqueSubmittedExams.size;
      const onTimeCount = submittedCount; // Exam submissions recorded within academic term
      const overdueCount = 0;

      const completionRate = totalHomeworks > 0 ? Math.round((submittedCount / totalHomeworks) * 100) : 100;
      const overdueRate = submittedCount > 0 ? Math.round((overdueCount / submittedCount) * 100) : 0;

      // Calculate attendance metrics
      const studentAttendances = classData.attendance.filter(
        (a) => a.studentId === student.userId || a.studentId === student.id
      );
      const attendedSessions = studentAttendances.filter((a) => a.status === "PRESENT" || a.status === "LATE").length;
      const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 100;

      const isHonorRoll = totalHomeworks > 0 && completionRate === 100 && overdueCount === 0;

      return {
        studentId,
        fullName: student.fullName,
        email: student.email,
        avatarUrl: student.avatarUrl,
        classStudentStatus: cs.status,
        totalHomeworks,
        submittedCount,
        completionRate,
        onTimeCount,
        overdueCount,
        overdueRate,
        totalSessions,
        attendedSessions,
        attendanceRate,
        isHonorRoll,
      };
    });

    const honorRollCount = studentResults.filter((s) => s.isHonorRoll).length;

    return {
      classId: classData.id,
      className: classData.name,
      teacherName: classData.teacher?.fullName || "Chưa phân công",
      courseTitle: classData.course?.title || "IELTS Program",
      startDate: classData.startDate,
      endDate: classData.endDate,
      status: classData.status,
      closedAt: classData.closedAt,
      totalSessions,
      totalHomeworks,
      totalStudents: studentResults.length,
      honorRollCount,
      students: studentResults,
    };
  }

  // Use Case: Close Class (Teacher or Admin)
  async closeClass(user: { id: string; roles: string[] }, id: string) {
    const classData = await this.repo.findById(id);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền đóng lớp này", 403);
    }

    const graduationSummary = await this.getGraduationSummary(id);

    if (classData.status === "CLOSED" || !classData.isActive) {
      return {
        success: true,
        message: "Lớp học đã ở trạng thái đóng.",
        data: {
          class: classData,
          graduationSummary,
        },
      };
    }

    const updatedClass = await this.prisma.class.update({
      where: { id },
      data: {
        status: "CLOSED",
        isActive: false,
        closedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        teacherId: true,
        status: true,
        isActive: true,
        closedAt: true,
        students: { select: { studentId: true } },
      },
    });

    // Mark active students in this class as completed with timestamp
    await this.prisma.classStudent.updateMany({
      where: {
        classId: id,
        status: "ACTIVE",
        deletedAt: null,
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    await this.sendClassClosedNotifications({
      id: updatedClass.id,
      name: updatedClass.name,
      teacherId: updatedClass.teacherId,
      students: updatedClass.students,
    });

    return {
      success: true,
      message: `Đã đóng lớp "${updatedClass.name}" thành công và tổng hợp kết quả tốt nghiệp cho ${graduationSummary.totalStudents} học viên (${graduationSummary.honorRollCount} học viên vinh danh 100%).`,
      data: {
        class: updatedClass,
        graduationSummary,
      },
    };
  }

  // Use Case: Reopen / Extend Class (Teacher or Admin)
  async reopenClass(user: { id: string; roles: string[] }, id: string) {
    const classData = await this.repo.findById(id);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền mở lại lớp này", 403);
    }

    const updatedClass = await this.prisma.class.update({
      where: { id },
      data: {
        status: "ACTIVE",
        isActive: true,
        closedAt: null,
      },
    });

    // Revert completed students back to active
    await this.prisma.classStudent.updateMany({
      where: {
        classId: id,
        status: "COMPLETED",
        deletedAt: null,
      },
      data: {
        status: "ACTIVE",
        completedAt: null,
      },
    });

    return {
      success: true,
      message: `Đã mở lại lớp "${updatedClass.name}" thành công.`,
      data: updatedClass,
    };
  }

  // Use Case: Run Lifecycle Maintenance (Auto-close strictly after 7 days grace period post last actual session & all sessions complete)
  async runClassLifecycleMaintenance() {
    const now = new Date();
    let closedCount = 0;

    // 1. Tự động đóng lớp sau 1 tuần (7 ngày grace period) kể từ buổi học cuối cùng hoặc endDate
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const candidateClasses = await this.prisma.class.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        sessions: {
          select: { id: true, plannedDate: true, status: true },
          orderBy: { plannedDate: "desc" },
        },
        students: { select: { studentId: true } },
      },
    });

    for (const cls of candidateClasses) {
      // Check if there are any sessions planned in the future
      const hasFutureSessions = cls.sessions.some(
        (s) => s.plannedDate && new Date(s.plannedDate).getTime() > now.getTime()
      );

      // Check if any sessions are still pending/unattended in the past 7 days
      const hasRecentPendingSessions = cls.sessions.some(
        (s) => s.status === "PLANNED" && s.plannedDate && new Date(s.plannedDate).getTime() > sevenDaysAgo.getTime()
      );

      // Last session date
      const lastSessionDate = cls.sessions[0]?.plannedDate || cls.endDate;
      const isPastGracePeriod =
        !hasFutureSessions &&
        !hasRecentPendingSessions &&
        lastSessionDate &&
        new Date(lastSessionDate).getTime() <= sevenDaysAgo.getTime();

      // Safety cutoff: Lớp mở quá 180 ngày kể từ startDate VÀ không còn buổi học nào trong tương lai
      const isSixMonthsOld =
        !hasFutureSessions &&
        cls.startDate &&
        new Date(cls.startDate).getTime() <= new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).getTime();

      if (isPastGracePeriod || isSixMonthsOld) {
        await this.prisma.class.update({
          where: { id: cls.id },
          data: {
            status: "CLOSED",
            isActive: false,
            closedAt: now,
          },
        });

        await this.prisma.classStudent.updateMany({
          where: { classId: cls.id, status: "ACTIVE", deletedAt: null },
          data: { status: "COMPLETED", completedAt: now },
        });

        await this.sendClassClosedNotifications({
          id: cls.id,
          name: cls.name,
          teacherId: cls.teacherId,
          students: cls.students,
        });
        closedCount++;
      }
    }

    // 2. Tự động lưu trữ (ARCHIVED) các lớp đã CLOSED quá 3 tháng (90 ngày) kể từ ngày closedAt
    // TUYỆT ĐỐI KHÔNG HARD-DELETE để bảo toàn 100% dữ liệu lịch sử (Attendance, Homework, Submissions, Reports)
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const classesToArchive = await this.prisma.class.findMany({
      where: {
        status: "CLOSED",
        closedAt: {
          lte: threeMonthsAgo,
        },
      },
      select: { id: true, name: true },
    });

    let archivedCount = 0;
    for (const cls of classesToArchive) {
      await this.prisma.class.update({
        where: { id: cls.id },
        data: {
          status: "ARCHIVED",
          archivedAt: now,
          isActive: false,
        },
      });
      archivedCount++;
    }

    return {
      success: true,
      timestamp: now.toISOString(),
      closedClassesCount: closedCount,
      archivedClassesCount: archivedCount,
      deletedClassesCount: 0, // Invariant: Hard delete is strictly eliminated (always 0)
    };
  }

  // Use Case: Add Student to Class (Bi-directional Cascade to Course Enrollment)
  async addStudent(user: { id: string; roles: string[] }, classId: string, studentId: string) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    if (classData.status === "CLOSED" || !classData.isActive) {
      throw new AuthorizationError("Lớp học đã kết thúc và đóng, không thể thêm học viên mới", 400);
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền thêm học viên vào lớp này", 403);
    }

    const alreadyIn = await this.repo.isStudentInClass(classId, studentId);
    if (alreadyIn) {
      throw new AuthorizationError("Học viên đã có trong lớp học này", 409);
    }

    return this.prisma.$transaction(async (tx) => {
      const classStudent = await tx.classStudent.upsert({
        where: { classId_studentId: { classId, studentId } },
        update: {
          status: "ACTIVE",
          deletedAt: null,
          joinedAt: new Date(),
        },
        create: {
          classId,
          studentId,
          status: "ACTIVE",
          joinedAt: new Date(),
        },
      });

      // Bi-directional Cascade: Ensure Course Enrollment exists
      if (classData.courseId) {
        const existingEnrollment = await tx.enrollment.findUnique({
          where: {
            courseId_studentId: {
              courseId: classData.courseId,
              studentId,
            },
          },
        });

        if (!existingEnrollment) {
          await tx.enrollment.create({
            data: {
              courseId: classData.courseId,
              studentId,
              enrolledAt: new Date(),
            },
          });
        }
      }

      // Audit Log
      await tx.enrollmentAuditLog.create({
        data: {
          operatorId: user.id,
          studentId,
          classId,
          action: "CLASS_PLACEMENT_CASCADE",
          reason: `Xếp học viên vào lớp ${classData.name} (Tự động kích hoạt quyền khóa học)`,
          toStatus: "ACTIVE",
        },
      });

      return classStudent;
    });
  }

  // Use Case: Remove Student from Class (Cascade check to revoke Course Enrollment if no other active classes)
  async removeStudent(user: { id: string; roles: string[] }, classId: string, studentId: string) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    if (classData.status === "CLOSED" || !classData.isActive) {
      throw new AuthorizationError("Lớp học đã kết thúc và đóng, không thể thay đổi danh sách học viên", 400);
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền xóa học viên khỏi lớp này", 403);
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.classStudent.updateMany({
        where: { classId, studentId, deletedAt: null },
        data: {
          status: "DROPPED",
          deletedAt: new Date(),
        },
      });

      // Bi-directional Cascade Check: If student has no other active classes for this course, revoke course enrollment
      if (classData.courseId) {
        const remainingActiveClasses = await tx.classStudent.count({
          where: {
            studentId,
            status: "ACTIVE",
            deletedAt: null,
            class: {
              courseId: classData.courseId,
              id: { not: classId },
            },
          },
        });

        if (remainingActiveClasses === 0) {
          await tx.enrollment.deleteMany({
            where: {
              courseId: classData.courseId,
              studentId,
            },
          });
        }
      }

      // Audit Log
      await tx.enrollmentAuditLog.create({
        data: {
          operatorId: user.id,
          studentId,
          classId,
          action: "STUDENT_REMOVAL_CASCADE",
          reason: `Xóa học viên khỏi lớp ${classData.name}`,
          toStatus: "DROPPED",
        },
      });

      return { success: true };
    });
  }

  // Use Case: Update student status in class (ACTIVE, SUSPENDED, RESERVED, COMPLETED, DROPPED)
  async updateStudentStatus(
    user: { id: string; roles: string[] },
    classId: string,
    studentId: string,
    options: { status: string; reason?: string }
  ) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền cập nhật trạng thái học viên của lớp này", 403);
    }

    const validStatuses = ["ACTIVE", "SUSPENDED", "RESERVED", "COMPLETED", "DROPPED"];
    const targetStatus = (options.status || "").toUpperCase();
    if (!validStatuses.includes(targetStatus)) {
      throw new AuthorizationError(`Trạng thái không hợp lệ: ${options.status}. Các trạng thái hợp lệ: ${validStatuses.join(", ")}`, 400);
    }

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.classStudent.findFirst({
        where: { classId, studentId, deletedAt: null },
      });

      if (!existing) {
        throw new NotFoundError("Không tìm thấy học viên trong lớp học này");
      }

      const fromStatus = existing.status;
      const updated = await tx.classStudent.update({
        where: { id: existing.id },
        data: {
          status: targetStatus as any,
          completedAt: targetStatus === "COMPLETED" ? new Date() : (targetStatus === "ACTIVE" ? null : existing.completedAt),
        },
      });

      // Audit log
      await tx.enrollmentAuditLog.create({
        data: {
          operatorId: user.id,
          studentId,
          classId,
          fromStatus: fromStatus as any,
          toStatus: targetStatus as any,
          action: "STUDENT_STATUS_UPDATE",
          reason: options.reason || `Cập nhật trạng thái học viên từ ${fromStatus} sang ${targetStatus}`,
        },
      });

      return { success: true, data: updated };
    }, { maxWait: 10000, timeout: 20000 });
  }

  // Use Case: Reschedule a single session
  async rescheduleSingleSession(
    user: { id: string; roles: string[] },
    sessionId: string,
    plannedDate: string,
    reason?: string
  ) {
    const session = await this.prisma.classSession.findUnique({
      where: { id: sessionId },
      include: { class: true },
    });
    if (!session) {
      throw new NotFoundError("Không tìm thấy buổi học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && session.class?.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền dời lịch buổi học này", 403);
    }

    if (session.status === "COMPLETED") {
      throw new AuthorizationError("Không thể dời lịch buổi học đã hoàn tất", 400);
    }

    const newPlannedDate = new Date(plannedDate);
    const updated = await this.prisma.classSession.update({
      where: { id: sessionId },
      data: {
        plannedDate: newPlannedDate,
        rescheduleReason: reason || null,
        status: "SCHEDULED",
      },
    });

    return updated;
  }

  // Use Case: Update session status
  async updateSessionStatus(
    user: { id: string; roles: string[] },
    sessionId: string,
    status: string,
    note?: string
  ) {
    const session = await this.prisma.classSession.findUnique({
      where: { id: sessionId },
      include: { class: true },
    });
    if (!session) {
      throw new NotFoundError("Không tìm thấy buổi học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && session.class?.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền cập nhật trạng thái buổi học này", 403);
    }

    const normalizedStatus = (status || "").toUpperCase();
    const validStatuses = ["SCHEDULED", "COMPLETED", "CANCELLED", "PLANNED"];
    if (!validStatuses.includes(normalizedStatus)) {
      throw new AuthorizationError(`Trạng thái không hợp lệ: ${status}`, 400);
    }

    const updated = await this.prisma.classSession.update({
      where: { id: sessionId },
      data: {
        status: normalizedStatus,
        rescheduleReason: note !== undefined ? note : session.rescheduleReason,
      },
    });

    return updated;
  }

  // Use Case: Record Attendance
  async recordAttendance(
    user: { id: string; roles: string[] },
    classId: string,
    records: Array<{ studentId: string; sessionDate: string; status: string; note?: string }>
  ) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    if (classData.status === "CLOSED" || !classData.isActive) {
      throw new AuthorizationError("Lớp học đã kết thúc và đóng, không thể điểm danh", 400);
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền điểm danh lớp này", 403);
    }

    const results = [];
    for (const r of records) {
      const sDate = r.sessionDate ? new Date(r.sessionDate) : new Date();
      const recorded = await this.repo.recordAttendance({
        classId,
        studentId: r.studentId,
        sessionDate: sDate,
        markedBy: user.id,
        status: r.status,
        note: r.note,
      });
      results.push(recorded);
    }

    return { success: true, count: results.length, data: results };
  }

  // Use Case: Set / Update Homework Deadline for a Class (Class-Level Override)
  async setHomeworkDeadline(
    user: { id: string; roles: string[] },
    classId: string,
    examId: string,
    deadline: string | Date | null
  ) {
    const classData = await this.repo.findById(classId);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    if (classData.status === "CLOSED" || !classData.isActive) {
      throw new AuthorizationError("Lớp học đã kết thúc và đóng, không thể giao bài tập hoặc sửa hạn nộp", 400);
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền sửa deadline lớp này", 403);
    }

    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });
    if (!exam) {
      throw new NotFoundError("Không tìm thấy bài tập/bài thi");
    }

    const parsedDeadline = deadline ? new Date(deadline) : null;

    // Upsert assignment record for the class-exam pair
    const assignment = await this.prisma.classExamAssignment.upsert({
      where: {
        classId_examId: {
          classId,
          examId,
        },
      },
      update: {
        deadline: parsedDeadline,
        status: "PUBLISHED",
      },
      create: {
        classId,
        examId,
        createdBy: user.id,
        deadline: parsedDeadline,
        status: "PUBLISHED",
      },
    });

    return {
      success: true,
      classId,
      examId,
      deadline: assignment.deadline,
      deadlineSource: assignment.deadline ? "MANUAL" : "AUTO",
    };
  }
}
