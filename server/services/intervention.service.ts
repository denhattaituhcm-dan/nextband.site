import { PrismaClient } from "@prisma/client";
import {
  CreateInterventionInput,
  UpdateInterventionInput,
  TransitionInterventionInput,
} from "../schemas/intervention.schema.js";
import { AuthorizationError, NotFoundError, ValidationError } from "./authorization.service.js";

// Valid transitions mapping:
// DETECTED -> CONTACTED, FAILED
// CONTACTED -> RESPONDED, FAILED
// RESPONDED -> RESOLVED, FAILED
// OPEN (legacy) -> CONTACTED, RESOLVED, FAILED
const VALID_TRANSITIONS: Record<string, string[]> = {
  DETECTED: ["CONTACTED", "FAILED"],
  CONTACTED: ["RESPONDED", "FAILED"],
  RESPONDED: ["RESOLVED", "FAILED"],
  OPEN: ["CONTACTED", "RESOLVED", "FAILED"],
};

export class InterventionService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Lấy toàn bộ lịch sử can thiệp học vụ của một học viên
   */
  async listByStudent(studentId: string, user: { id: string; roles: string[] }) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Chỉ quản trị viên và giáo viên mới có quyền xem nhật ký can thiệp học vụ.", 403);
    }

    // Verify student exists
    const student = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: studentId }, { userId: studentId }],
      },
      select: { id: true, userId: true, fullName: true },
    });

    if (!student) {
      throw new NotFoundError("Học viên không tồn tại.");
    }

    const effectiveStudentUserId = student.userId || student.id;

    const logs = await this.prisma.studentInterventionLog.findMany({
      where: {
        studentId: effectiveStudentUserId,
      },
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            fullName: true,
            email: true,
            avatarUrl: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            course: { select: { id: true, title: true } },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return logs.map((log) => ({
      id: log.id,
      studentId: log.studentId,
      classId: log.classId,
      className: log.class?.name || null,
      courseTitle: log.class?.course?.title || null,
      authorId: log.authorId,
      authorName: log.author?.fullName || log.author?.email || "Cán bộ quản trị",
      authorAvatarUrl: log.author?.avatarUrl || null,
      category: log.category,
      title: log.title,
      notes: log.notes,
      actionTaken: log.actionTaken,
      agreedPlan: log.agreedPlan,
      followUpDate: log.followUpDate ? log.followUpDate.toISOString().split("T")[0] : null,
      status: log.status,
      resolvedAt: log.resolvedAt,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    }));
  }

  /**
   * Tạo bản ghi can thiệp học vụ mới
   */
  async create(authorId: string, input: CreateInterventionInput, user: { id: string; roles: string[] }) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Chỉ quản trị viên và giáo viên mới có quyền tạo nhật ký can thiệp học vụ.", 403);
    }

    // Resolve student
    const student = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: input.studentId }, { userId: input.studentId }],
      },
      select: { id: true, userId: true },
    });

    if (!student) {
      throw new NotFoundError("Học viên không tồn tại.");
    }

    const effectiveStudentUserId = student.userId || student.id;

    // Resolve author
    const author = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: authorId }, { userId: authorId }],
      },
      select: { id: true, userId: true },
    });

    const effectiveAuthorUserId = author?.userId || author?.id || authorId;

    const followUpDateObj = input.followUpDate ? new Date(`${input.followUpDate}T00:00:00.000Z`) : null;
    const resolvedAtObj = input.status === "RESOLVED" ? new Date() : null;

    const log = await this.prisma.studentInterventionLog.create({
      data: {
        studentId: effectiveStudentUserId,
        authorId: effectiveAuthorUserId,
        classId: input.classId || null,
        category: input.category || "ACADEMIC_RISK",
        title: input.title || null,
        notes: input.notes,
        actionTaken: input.actionTaken || null,
        agreedPlan: input.agreedPlan || null,
        followUpDate: followUpDateObj,
        status: input.status || "DETECTED",
        outcome: input.outcome || null,
        metadata: input.metadata ? (input.metadata as any) : undefined,
        resolvedAt: resolvedAtObj,
      },
      include: {
        author: { select: { fullName: true, email: true } },
        class: { select: { name: true } },
      },
    });

    return log;
  }

  /**
   * Chuyển trạng thái can thiệp theo state machine hợp lệ:
   * DETECTED -> CONTACTED / FAILED
   * CONTACTED -> RESPONDED / FAILED
   * RESPONDED -> RESOLVED / FAILED
   * CẤM nhảy cóc (vd: DETECTED -> RESOLVED)
   */
  async transitionStatus(
    id: string,
    input: TransitionInterventionInput,
    user: { id: string; roles: string[] }
  ) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Từ chối quyền chuyển trạng thái can thiệp.", 403);
    }

    const existing = await this.prisma.studentInterventionLog.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError("Bản ghi can thiệp không tồn tại.");
    }

    const currentStatus = existing.status;
    const targetStatus = input.status;

    // Kiểm tra tính hợp lệ của bước chuyển
    const allowed = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowed.includes(targetStatus)) {
      throw new ValidationError(
        `Không thể chuyển trạng thái từ '${currentStatus}' sang '${targetStatus}'. Chỉ cho phép chuyển sang: ${allowed.join(", ") || "không có"}`
      );
    }

    // Nếu chuyển sang trạng thái kết thúc (RESOLVED / FAILED), outcome là bắt buộc hoặc khuyến nghị
    const isTerminal = targetStatus === "RESOLVED" || targetStatus === "FAILED";
    const outcome = input.outcome || existing.outcome || (isTerminal ? (targetStatus === "RESOLVED" ? "SCHOLARSHIP_SAVED" : "SCHOLARSHIP_LOST") : null);

    const updateData: any = {
      status: targetStatus,
      outcome,
    };

    if (input.notes) {
      updateData.notes = `${existing.notes}\n[${new Date().toISOString()}] ${input.notes}`;
    }
    if (input.actionTaken) {
      updateData.actionTaken = input.actionTaken;
    }
    if (input.metadata) {
      updateData.metadata = {
        ...((existing.metadata as object) || {}),
        ...input.metadata,
      };
    }

    if (targetStatus === "RESOLVED") {
      updateData.resolvedAt = new Date();
    }

    const updated = await this.prisma.studentInterventionLog.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { fullName: true, email: true } },
        class: { select: { name: true } },
      },
    });

    return updated;
  }

  /**
   * Cập nhật tiến độ / trạng thái can thiệp học vụ
   */
  async update(id: string, input: UpdateInterventionInput, user: { id: string; roles: string[] }) {
    const isAdmin = user.roles.includes("admin");
    const isTeacher = user.roles.includes("teacher");

    if (!isAdmin && !isTeacher) {
      throw new AuthorizationError("Từ chối quyền cập nhật nhật ký can thiệp.", 403);
    }

    const existing = await this.prisma.studentInterventionLog.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError("Bản ghi can thiệp không tồn tại.");
    }

    const updateData: any = {};
    if (input.category !== undefined) updateData.category = input.category;
    if (input.title !== undefined) updateData.title = input.title;
    if (input.notes !== undefined) updateData.notes = input.notes;
    if (input.actionTaken !== undefined) updateData.actionTaken = input.actionTaken;
    if (input.agreedPlan !== undefined) updateData.agreedPlan = input.agreedPlan;
    if (input.outcome !== undefined) updateData.outcome = input.outcome;
    if (input.metadata !== undefined) updateData.metadata = input.metadata;
    if (input.followUpDate !== undefined) {
      updateData.followUpDate = input.followUpDate ? new Date(`${input.followUpDate}T00:00:00.000Z`) : null;
    }
    if (input.status !== undefined) {
      updateData.status = input.status;
      if (input.status === "RESOLVED" && existing.status !== "RESOLVED") {
        updateData.resolvedAt = new Date();
      } else if (input.status !== "RESOLVED") {
        updateData.resolvedAt = null;
      }
    }

    const updated = await this.prisma.studentInterventionLog.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { fullName: true, email: true } },
        class: { select: { name: true } },
      },
    });

    return updated;
  }

  /**
   * Xóa bản ghi can thiệp (Chỉ Admin)
   */
  async delete(id: string, user: { id: string; roles: string[] }) {
    const isAdmin = user.roles.includes("admin");
    if (!isAdmin) {
      throw new AuthorizationError("Chỉ Admin mới có quyền xóa nhật ký can thiệp học vụ.", 403);
    }

    await this.prisma.studentInterventionLog.delete({
      where: { id },
    });

    return { success: true };
  }
}
