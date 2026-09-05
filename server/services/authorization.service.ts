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

export class ValidationError extends Error {
  statusCode: number;
  constructor(message: string = "Dữ liệu không hợp lệ") {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
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
   * Kiểm tra xem học viên có đang trong lớp học (active) hay không.
   * Domain Invariant: Chỉ học viên có status = ACTIVE, chưa bị soft-delete (deletedAt = null)
   * và thuộc lớp đang hoạt động (class.isActive = true) mới được coi là hợp lệ.
   */
  async isStudentEnrolledInClass(studentId: string, classId: string): Promise<boolean> {
    const record = await this.prisma.classStudent.findFirst({
      where: {
        classId,
        studentId,
        status: "ACTIVE",
        deletedAt: null,
        class: {
          isActive: true,
        },
      },
    });
    return !!record;
  }

  /**
   * Kiểm tra quyền làm/xem bài thi của học viên (hỗ trợ cả Direct Enrollment và Class Membership).
   * Domain Invariant: Học viên bị đình chỉ (SUSPENDED), đã xóa mềm (deletedAt != null),
   * hoặc lớp học bị vô hiệu hóa sẽ bị từ chối truy cập (HTTP 403).
   */
  async isStudentAuthorizedForExam(params: {
    studentId: string;
    examId: string;
    courseId: string;
    isOpen?: boolean;
  }): Promise<boolean> {
    const { studentId, examId, courseId, isOpen } = params;
    if (isOpen) return true;

    // 1. Direct course enrollment
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        courseId_studentId: {
          courseId,
          studentId,
        },
      },
    });
    if (enrollment) return true;

    // 2. Class-based membership (via ClassStudent in active class for this course)
    const classStudent = await this.prisma.classStudent.findFirst({
      where: {
        studentId,
        status: "ACTIVE",
        deletedAt: null,
        class: {
          isActive: true,
          courseId,
        },
      },
    });

    return !!classStudent;
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

  /**
   * Authoring IDOR Protection: Xác thực quyền tạo Đề thi trong Khóa học (Admin hoặc Giáo viên phụ trách Khóa học).
   */
  async requireCourseAuthoringAccess(
    courseId: string,
    userId: string,
    userRoles: string[] = [],
  ) {
    if (userRoles.includes("admin")) return true;
    if (!userRoles.includes("teacher")) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin có quyền tạo đề thi", 403);
    }

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { teacherId: true, isActive: true },
    });

    if (!course) {
      throw new NotFoundError("Khóa học không tồn tại.");
    }

    if (!course.teacherId || course.teacherId !== userId) {
      throw new AuthorizationError(
        "Từ chối quyền: Bạn không phụ trách khóa học này.",
        403,
      );
    }
    return course;
  }

  /**
   * Authoring IDOR Protection: Xác thực quyền soạn thảo Đề thi (Admin hoặc Giáo viên phụ trách Khóa học).
   */
  async requireExamAuthoringAccess(
    examId: string,
    userId: string,
    userRoles: string[] = [],
  ) {
    if (userRoles.includes("admin")) return true;
    if (!userRoles.includes("teacher")) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin có quyền chỉnh sửa", 403);
    }

    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: { course: { select: { teacherId: true } } },
    });

    if (!exam) {
      throw new NotFoundError("Bài thi không tồn tại.");
    }

    if (!exam.course?.teacherId || exam.course.teacherId !== userId) {
      throw new AuthorizationError(
        "Từ chối quyền: Bạn không phụ trách khóa học chứa đề thi này.",
        403,
      );
    }
    return exam;
  }

  /**
   * Authoring IDOR Protection: Xác thực quyền soạn thảo Phần thi (Section).
   */
  async requireSectionAuthoringAccess(
    sectionId: string,
    userId: string,
    userRoles: string[] = [],
  ) {
    if (userRoles.includes("admin")) return true;
    if (!userRoles.includes("teacher")) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin có quyền chỉnh sửa", 403);
    }

    const section = await this.prisma.examSection.findUnique({
      where: { id: sectionId },
      include: { exam: { include: { course: { select: { teacherId: true } } } } },
    });

    if (!section) {
      throw new NotFoundError("Phần thi không tồn tại.");
    }

    const teacherId = section.exam?.course?.teacherId;
    if (teacherId && teacherId !== userId) {
      throw new AuthorizationError(
        "Từ chối quyền: Bạn không phụ trách khóa học chứa phần thi này.",
        403,
      );
    }
    return section;
  }

  /**
   * Authoring IDOR Protection: Xác thực quyền soạn thảo Nhóm câu hỏi (QuestionGroup).
   */
  async requireQuestionGroupAuthoringAccess(
    groupId: string,
    userId: string,
    userRoles: string[] = [],
  ) {
    if (userRoles.includes("admin")) return true;
    if (!userRoles.includes("teacher")) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin có quyền chỉnh sửa", 403);
    }

    const group = await this.prisma.questionGroup.findUnique({
      where: { id: groupId },
      include: {
        section: {
          include: { exam: { include: { course: { select: { teacherId: true } } } } },
        },
      },
    });

    if (!group) {
      throw new NotFoundError("Nhóm câu hỏi không tồn tại.");
    }

    const teacherId = group.section?.exam?.course?.teacherId;
    if (teacherId && teacherId !== userId) {
      throw new AuthorizationError(
        "Từ chối quyền: Bạn không phụ trách khóa học chứa nhóm câu hỏi này.",
        403,
      );
    }
    return group;
  }

  /**
   * Authoring IDOR Protection: Xác thực quyền soạn thảo Câu hỏi (Question).
   */
  async requireQuestionAuthoringAccess(
    questionId: string,
    userId: string,
    userRoles: string[] = [],
  ) {
    if (userRoles.includes("admin")) return true;
    if (!userRoles.includes("teacher")) {
      throw new AuthorizationError("Chỉ giáo viên hoặc admin có quyền chỉnh sửa", 403);
    }

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: {
        group: {
          include: {
            section: {
              include: { exam: { include: { course: { select: { teacherId: true } } } } },
            },
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundError("Câu hỏi không tồn tại.");
    }

    const teacherId = question.group?.section?.exam?.course?.teacherId;
    if (teacherId && teacherId !== userId) {
      throw new AuthorizationError(
        "Từ chối quyền: Bạn không phụ trách khóa học chứa câu hỏi này.",
        403,
      );
    }
    return question;
  }

  /**
   * Phân giải phạm vi chi nhánh được phép truy cập.
   *
   * MVP Multi-Location invariant:
   *   - Admin, Teacher, Student → { type: "all" } — truy cập toàn bộ active branches.
   *   - Branch không phải là security boundary trong MVP này.
   *   - selectedBranch ở frontend là UI filter/view state, KHÔNG được dùng để derive authorization scope.
   *   - UserBranch được giữ nguyên cho các role chuyên biệt trong tương lai (branch_manager, staff).
   *     Hiện tại chưa có role nào bị giới hạn bởi UserBranch scope trong MVP.
   *
   * Nếu sau này cần branch-based access control, chỉ áp dụng cho các role được
   * liệt kê rõ ràng trong BRANCH_SCOPED_ROLES, không mặc định áp dụng cho tất cả.
   */
  async resolveAuthorizedBranchScope(params: {
    userId: string;
    userRoles: string[];
    requestedBranchId?: string | null;
  }): Promise<AuthorizedBranchScope> {
    const { userRoles = [], requestedBranchId } = params;

    // MVP Option A: Admin/Teacher/Student đều có global access.
    // UserBranch scope chỉ áp dụng cho các role chuyên biệt (branch_manager, v.v.)
    // hiện chưa tồn tại trong hệ thống. Giữ code dưới đây cho tương lai.
    const BRANCH_SCOPED_ROLES: string[] = [
      // "branch_manager", "branch_staff"  // ← Uncomment khi có nhu cầu thực tế
    ];

    const needsBranchScope = userRoles.some((r) => BRANCH_SCOPED_ROLES.includes(r));

    if (!needsBranchScope) {
      // Admin, Teacher, Student: global access — thấy tất cả active branches
      if (!requestedBranchId || requestedBranchId === "ALL" || requestedBranchId === "all") {
        return { type: "all" };
      }
      return { type: "branch", branchId: requestedBranchId };
    }

    // Dự phòng cho tương lai: các role bị scope theo UserBranch
    // Đoạn code này hiện không được kích hoạt vì BRANCH_SCOPED_ROLES rỗng.
    const { userId } = params;
    const userBranches = await this.prisma.userBranch.findMany({
      where: { userId },
      select: { branchId: true },
    });
    const allowedBranchIds = userBranches.map((ub) => ub.branchId);

    if (allowedBranchIds.length === 0) {
      return { type: "branches", branchIds: [] };
    }

    if (!requestedBranchId || requestedBranchId === "ALL" || requestedBranchId === "all") {
      return { type: "branches", branchIds: allowedBranchIds };
    }

    if (!allowedBranchIds.includes(requestedBranchId)) {
      throw new AuthorizationError("Từ chối truy cập: Bạn không có quyền quản lý chi nhánh này.", 403);
    }

    return { type: "branch", branchId: requestedBranchId };
  }
}

export type AuthorizedBranchScope =
  | { type: "all" }
  | { type: "branch"; branchId: string }
  | { type: "branches"; branchIds: string[] };

