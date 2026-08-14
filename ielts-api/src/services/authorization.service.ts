import { PrismaClient } from "@prisma/client";
import { basename, resolve, sep } from "path";

export class AuthorizationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 403) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string = "Tài nguyên không tồn tại") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class AuthorizationService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Xác thực quyền quản trị hoặc giáo viên phụ trách chính lớp học.
   * Throws 404 nếu lớp không tồn tại, 403 nếu không có quyền.
   */
  async requireClassTeacherOrAdmin(params: {
    userId: string;
    userRoles: string[];
    classId: string;
  }) {
    const { userId, userRoles = [], classId } = params;
    const isAdmin = userRoles.includes("admin");

    const cls = await this.prisma.class.findUnique({
      where: { id: classId },
    });

    if (!cls) {
      throw new NotFoundError("Lớp học không tồn tại.");
    }

    if (isAdmin) {
      return cls;
    }

    const isTeacher = userRoles.includes("teacher");
    if (isTeacher && cls.teacherId === userId) {
      return cls;
    }

    throw new AuthorizationError(
      "Từ chối truy cập: Bạn không có quyền thao tác trên lớp học này.",
      403,
    );
  }

  /**
   * Xác thực quyền quản trị hoặc giáo viên phụ trách lớp chứa bài tập (Homework).
   */
  async requireHomeworkTeacherOrAdmin(params: {
    userId: string;
    userRoles: string[];
    homeworkId: string;
  }) {
    const { userId, userRoles = [], homeworkId } = params;
    const isAdmin = userRoles.includes("admin");

    const homework = await this.prisma.homework.findUnique({
      where: { id: homeworkId },
      include: { class: true },
    });

    if (!homework) {
      throw new NotFoundError("Bài tập không tồn tại.");
    }

    if (isAdmin) {
      return homework;
    }

    const isTeacher = userRoles.includes("teacher");
    if (isTeacher && homework.class && homework.class.teacherId === userId) {
      return homework;
    }

    throw new AuthorizationError(
      "Từ chối truy cập: Bạn không có quyền quản lý bài tập này.",
      403,
    );
  }

  /**
   * Xác thực quyền chấm bài nộp (Submission) của giáo viên phụ trách lớp hoặc Admin.
   */
  async requireSubmissionTeacherOrAdmin(params: {
    userId: string;
    userRoles: string[];
    homeworkId: string;
    studentId: string;
  }) {
    const { userId, userRoles = [], homeworkId, studentId } = params;
    const isAdmin = userRoles.includes("admin");

    const homework = await this.prisma.homework.findUnique({
      where: { id: homeworkId },
      include: { class: true },
    });

    if (!homework) {
      throw new NotFoundError("Bài tập không tồn tại.");
    }

    if (!isAdmin) {
      const isTeacher = userRoles.includes("teacher");
      if (!isTeacher || homework.class.teacherId !== userId) {
        throw new AuthorizationError(
          "Từ chối truy cập: Bạn không có quyền chấm bài nộp của lớp học này.",
          403,
        );
      }
    }

    const submission = await this.prisma.submission.findUnique({
      where: {
        homeworkId_studentId: {
          homeworkId,
          studentId,
        },
      },
    });

    if (!submission) {
      throw new NotFoundError("Không tìm thấy bài nộp của học viên.");
    }

    return { homework, submission };
  }

  /**
   * Kiểm tra xem học viên có đang trong lớp học (active) hay không.
   */
  async isStudentEnrolledInClass(studentId: string, classId: string): Promise<boolean> {
    const record = await this.prisma.classStudent.findFirst({
      where: {
        classId,
        studentId,
        deletedAt: null,
      },
    });
    return !!record;
  }

  /**
   * Chuẩn hóa và kiểm tra ranh giới thư mục tuyệt đối chống Path Traversal.
   */
  validateUploadPathBoundary(params: {
    subDir: string;
    rawFileName: string;
    baseUploadDir: string;
  }): string {
    const { subDir, rawFileName, baseUploadDir } = params;

    if (subDir !== "images" && subDir !== "audio") {
      throw new AuthorizationError("Thư mục con không hợp lệ", 400);
    }

    // Lọc bỏ toàn bộ ký tự traversal bằng path.basename
    const safeFileName = basename(rawFileName.trim());
    if (!safeFileName || safeFileName === "." || safeFileName === "..") {
      throw new AuthorizationError("Tên tệp không hợp lệ", 400);
    }

    const targetBaseDir = resolve(baseUploadDir, subDir);
    const targetFilePath = resolve(targetBaseDir, safeFileName);

    // Strict Boundary Check: Phải nằm trong targetBaseDir + separator
    if (!targetFilePath.startsWith(targetBaseDir + sep)) {
      throw new AuthorizationError("Phát hiện hành vi điều hướng đường dẫn không hợp lệ (Path Traversal)", 403);
    }

    return targetFilePath;
  }
}
