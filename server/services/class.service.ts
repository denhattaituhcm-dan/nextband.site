import { PrismaClient, NotificationType } from "@prisma/client";
import { ClassRepository } from "../repositories/class.repository.js";
import { AuthorizationService, AuthorizationError, NotFoundError } from "./authorization.service.js";
import { NotificationService } from "./notification.service.js";

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

  // Use Case: Create Class (Admin or Teacher)
  async createClass(user: { id: string; roles: string[] }, data: any) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin mới có quyền tạo lớp", 403);
    }

    const teacherId = isAdmin ? (data.teacherId || user.id) : user.id;

    let courseId = data.courseId;
    if (!courseId) {
      const firstCourse = await this.prisma.course.findFirst();
      courseId = firstCourse?.id || "default";
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

  // Use Case: Update Class with Ownership Guard
  async updateClass(user: { id: string; roles: string[] }, id: string, data: any) {
    const classData = await this.repo.findById(id);
    if (!classData) {
      throw new NotFoundError("Không tìm thấy lớp học");
    }

    const isAdmin = user.roles.includes("admin");
    if (!isAdmin && classData.teacherId !== user.id) {
      throw new AuthorizationError("Từ chối truy cập - bạn không có quyền sửa lớp này", 403);
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

    if (classData.status === "CLOSED" || !classData.isActive) {
      return {
        success: true,
        message: "Lớp học đã ở trạng thái đóng.",
        data: classData,
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

    await this.sendClassClosedNotifications({
      id: updatedClass.id,
      name: updatedClass.name,
      teacherId: updatedClass.teacherId,
      students: updatedClass.students,
    });

    return {
      success: true,
      message: `Đã đóng lớp "${updatedClass.name}" thành công và gửi thông báo đến học viên.`,
      data: updatedClass,
    };
  }

  // Use Case: Run Lifecycle Maintenance (Auto-close after 6 months & Auto-cleanup after 3 months)
  async runClassLifecycleMaintenance() {
    const now = new Date();

    // 1. Tự động đóng các lớp ACTIVE quá 6 tháng kể từ ngày khai giảng (startDate)
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    const expiredClasses = await this.prisma.class.findMany({
      where: {
        status: "ACTIVE",
        startDate: {
          lte: sixMonthsAgo,
        },
      },
      select: {
        id: true,
        name: true,
        teacherId: true,
        students: { select: { studentId: true } },
      },
    });

    let closedCount = 0;
    for (const cls of expiredClasses) {
      await this.prisma.class.update({
        where: { id: cls.id },
        data: {
          status: "CLOSED",
          isActive: false,
          closedAt: now,
        },
      });

      await this.sendClassClosedNotifications({
        id: cls.id,
        name: cls.name,
        teacherId: cls.teacherId,
        students: cls.students,
      });
      closedCount++;
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
