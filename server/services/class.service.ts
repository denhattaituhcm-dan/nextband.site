import { PrismaClient, NotificationType } from "@prisma/client";
import { ClassRepository } from "../repositories/class.repository.js";
import { AuthorizationService, AuthorizationError, NotFoundError } from "./authorization.service.js";
import { NotificationService } from "./notification.service.js";
import { RoomCollisionService } from "./room-collision.service.js";

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

    const [data, total] = await Promise.all([
      this.repo.findMany(where, skip, limit),
      this.repo.count(where),
    ]);

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
    if (!isAdmin) {
      throw new AuthorizationError("Chỉ quản trị viên (Admin) mới có quyền chỉnh sửa thông tin lớp học", 403);
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
        course: { select: { id: true, title: true } },
        branch: { select: { id: true, name: true } },
        teacher: { select: { id: true, fullName: true, avatarUrl: true } },
        sessions: { select: { id: true } },
        students: {
          where: { deletedAt: null },
          include: {
            student: {
              select: {
                userId: true,
                fullName: true,
              },
            },
          },
        },
        homeworks: {
          select: {
            id: true,
            submissions: {
              select: {
                studentId: true,
                status: true,
                submittedAt: true,
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

    const standings = classes.map((c) => {
      const totalStudents = c.students.length;
      const totalHomeworks = c.homeworks.length;
      const totalSessions = c.sessions.length;

      // 1. Completion rate across the class
      let totalCompletedSubmissions = 0;

      for (const hw of c.homeworks) {
        for (const sub of hw.submissions) {
          if (sub.status === "SUBMITTED" || sub.status === "GRADED") {
            totalCompletedSubmissions++;
          }
        }
      }

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
        course: { select: { id: true, title: true } },
        students: {
          where: { deletedAt: null },
          include: {
            student: {
              select: {
                userId: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
        homeworks: {
          select: {
            id: true,
            title: true,
            deadline: true,
            submissions: {
              select: {
                studentId: true,
                status: true,
                submittedAt: true,
              },
            },
          },
        },
      },
    });

    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const totalHomeworks = classData.homeworks.length;
    const now = new Date();

    // 1. Next upcoming homework deadline for the whole class
    const upcomingHomeworks = classData.homeworks
      .filter((h) => h.deadline && new Date(h.deadline) >= now)
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());
    
    const nextHw = upcomingHomeworks[0] || null;
    const nextUpcomingHomework = nextHw
      ? {
          title: nextHw.title,
          deadline: nextHw.deadline,
          isUrgent: new Date(nextHw.deadline!).getTime() - now.getTime() < 48 * 60 * 60 * 1000,
        }
      : null;

    // 2. Calculate individual student metrics
    const studentRanks = classData.students.map((cs) => {
      const student = cs.student;
      const studentId = student.userId;

      let completedCount = 0;
      const activityDays = new Set<string>();

      for (const hw of classData.homeworks) {
        const sub = hw.submissions.find((s) => s.studentId === studentId);
        if (sub && (sub.status === "SUBMITTED" || sub.status === "GRADED")) {
          completedCount++;
        }
      }

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
        course: { select: { id: true, title: true } },
        teacher: { select: { id: true, fullName: true, email: true } },
        sessions: { select: { id: true, sessionNumber: true, plannedDate: true } },
        students: {
          where: { deletedAt: null },
          include: {
            student: {
              select: {
                userId: true,
                fullName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        homeworks: {
          select: {
            id: true,
            title: true,
            deadline: true,
            submissions: {
              select: {
                id: true,
                studentId: true,
                status: true,
                submittedAt: true,
                score: true,
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

    const totalHomeworks = classData.homeworks.length;
    const totalSessions = classData.sessions.length;

    const studentResults = classData.students.map((cs) => {
      const student = cs.student;
      const studentId = student.userId;

      // Calculate homework metrics
      let submittedCount = 0;
      let onTimeCount = 0;
      let overdueCount = 0;

      for (const hw of classData.homeworks) {
        const sub = hw.submissions.find((s) => s.studentId === studentId);
        const isSubmitted = sub && (sub.status === "SUBMITTED" || sub.status === "GRADED");
        if (isSubmitted) {
          submittedCount++;
          if (sub.submittedAt && hw.deadline) {
            const subTime = new Date(sub.submittedAt).getTime();
            const deadTime = new Date(hw.deadline).getTime();
            if (subTime > deadTime) {
              overdueCount++;
            } else {
              onTimeCount++;
            }
          } else {
            onTimeCount++;
          }
        }
      }

      const completionRate = totalHomeworks > 0 ? Math.round((submittedCount / totalHomeworks) * 100) : 100;
      const overdueRate = submittedCount > 0 ? Math.round((overdueCount / submittedCount) * 100) : 0;

      // Calculate attendance metrics
      const studentAttendances = classData.attendance.filter((a) => a.studentId === studentId);
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

  // Use Case: Run Lifecycle Maintenance (Auto-close after 7 days grace period & 6 months safety cutoff)
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
          select: { plannedDate: true },
          orderBy: { plannedDate: "desc" },
          take: 1,
        },
        students: { select: { studentId: true } },
      },
    });

    for (const cls of candidateClasses) {
      const lastSessionDate = cls.sessions[0]?.plannedDate || cls.endDate;
      const isPastGracePeriod = lastSessionDate && new Date(lastSessionDate) <= sevenDaysAgo;

      // Safety cutoff: Lớp mở quá 180 ngày kể từ startDate
      const isSixMonthsOld = cls.startDate && new Date(cls.startDate) <= new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

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

    // 2. Tự động dọn dẹp / xóa sạch các lớp đã CLOSED quá 3 tháng (90 ngày) kể từ ngày closedAt
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const classesToDelete = await this.prisma.class.findMany({
      where: {
        status: "CLOSED",
        closedAt: {
          lte: threeMonthsAgo,
        },
      },
      select: { id: true, name: true },
    });

    let deletedCount = 0;
    for (const cls of classesToDelete) {
      await this.prisma.class.delete({
        where: { id: cls.id },
      });
      deletedCount++;
    }

    return {
      success: true,
      timestamp: now.toISOString(),
      closedClassesCount: closedCount,
      deletedClassesCount: deletedCount,
    };
  }

  // Use Case: Add Student to Class
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

    return this.repo.addStudentToClass(classId, studentId);
  }

  // Use Case: Remove Student from Class
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

    return this.repo.removeStudentFromClass(classId, studentId);
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

    // Find existing homework record or create one
    const existingHw = await this.prisma.homework.findFirst({
      where: { classId, examId },
    });

    let updatedHw;
    if (existingHw) {
      updatedHw = await this.prisma.homework.update({
        where: { id: existingHw.id },
        data: {
          deadline: parsedDeadline,
          status: "PUBLISHED",
        },
      });
    } else {
      updatedHw = await this.prisma.homework.create({
        data: {
          classId,
          examId,
          createdBy: user.id,
          title: exam.title,
          deadline: parsedDeadline,
          status: "PUBLISHED",
        },
      });
    }

    return {
      success: true,
      classId,
      examId,
      deadline: updatedHw.deadline,
      deadlineSource: updatedHw.deadline ? "MANUAL" : "AUTO",
    };
  }
}
