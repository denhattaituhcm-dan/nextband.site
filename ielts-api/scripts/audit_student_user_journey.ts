import { PrismaClient } from "@prisma/client";
import { ClassService } from "../src/services/class.service.js";
import { LessonService } from "../src/services/lesson.service.js";
import { ExamSubmissionService } from "../src/services/exam-submission.service.js";

const prisma = new PrismaClient();

async function runComprehensiveUserJourneyAudit() {
  console.log("================================================================================");
  console.log("    AUDIT TOÀN DIỆN HÀNH TRÌNH HỌC VIÊN (END-TO-END STUDENT USER JOURNEY)       ");
  console.log("================================================================================");

  const classService = new ClassService(prisma);
  const lessonService = new LessonService(prisma);
  const submissionService = new ExamSubmissionService(prisma);

  const createdSubmissionIds: string[] = [];

  try {
    // -------------------------------------------------------------------------
    // CHẶNG 1: XÁC THỰC & DANH TÍNH HỌC VIÊN (AUTHENTICATION & IDENTITY CLAIM)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 1] Khởi tạo phiên & Xác thực danh tính học viên...");
    const studentUser = await prisma.user.findFirst({
      where: { email: "denhattaituhcm@gmail.com" },
      include: { roles: true },
    });

    if (!studentUser) {
      throw new Error("Không tìm thấy tài khoản học viên test: denhattaituhcm@gmail.com");
    }

    const studentCanonicalId = studentUser.userId || studentUser.id;
    const studentAuthObj = { id: studentCanonicalId, roles: ["student"] };
    console.log(`  ✓ Xác thực thành công: ${studentUser.fullName} (${studentUser.email})`);
    console.log(`    - Canonical User ID: ${studentCanonicalId}`);
    console.log(`    - Roles: [${studentUser.roles.map((r) => r.role).join(", ")}]`);

    // -------------------------------------------------------------------------
    // CHẶNG 2: BÀN LÀM VIỆC & KHÁM PHÁ LỚP HỌC (DASHBOARD & CLASS DISCOVERY)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 2] Tải danh sách lớp học (Bàn làm việc / Dashboard)...");
    const myClasses = await classService.getMyClasses(studentCanonicalId);
    console.log(`  ✓ my-classes API trả về: ${myClasses.length} lớp học`);

    if (myClasses.length === 0) {
      throw new Error("Học viên không có lớp học nào. Không thể tiếp tục hành trình.");
    }

    const targetClass = myClasses[0];
    console.log(`  ✓ Lựa chọn lớp học mục tiêu: "${targetClass.className}" (ClassID: ${targetClass.classId})`);
    console.log(`    - Khóa học: ${targetClass.courseTitle} (CourseID: ${targetClass.courseId})`);
    console.log(`    - Giáo viên: ${targetClass.teacherName}`);

    // -------------------------------------------------------------------------
    // CHẶNG 3: VÀO LỚP HỌC & TẢI LỘ TRÌNH BÀI HỌC (ENTER CLASS & LESSON ROSTER)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 3] Vào phòng học & Tải lộ trình bài tập (StudentLessonViewerPage)...");
    const classLessons = await lessonService.getClassLessonProjection(
      targetClass.classId,
      studentCanonicalId,
      ["student"]
    );

    console.log(`  ✓ Tải lộ trình thành công: ${classLessons.lessons.length} bài học/bài tập.`);
    console.log(`    - Tiến độ hoàn thành lớp: ${classLessons.progress.percentage}% (${classLessons.progress.completedLessons}/${classLessons.progress.totalLessons})`);

    const availableLesson = classLessons.lessons.find((l) => l.id);
    if (!availableLesson) {
      throw new Error("Lớp học không có bài tập/đề thi nào để thực hiện.");
    }

    console.log(`  ✓ Chọn bài tập để làm: "${availableLesson.title}" (ExamID: ${availableLesson.id})`);

    // -------------------------------------------------------------------------
    // CHẶNG 4: MỞ PHÒNG THI / BÀI TẬP & TẢI ĐỀ (START EXAM INTERFACE)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 4] Mở phòng thi & Khởi tạo phiên làm bài (ExamInterface)...");
    const examDetail = await prisma.exam.findUnique({
      where: { id: availableLesson.id },
      include: {
        sections: {
          include: {
            questionGroups: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
    });

    if (!examDetail) {
      throw new Error("Không thể tải chi tiết đề thi.");
    }

    const questionsList = examDetail.sections.flatMap((s) =>
      s.questionGroups.flatMap((g) => g.questions)
    );
    console.log(`  ✓ Đề thi tải thành công: ${examDetail.sections.length} phần thi, ${questionsList.length} câu hỏi.`);

    // -------------------------------------------------------------------------
    // CHẶNG 5: KHỞI TẠO ATTEMPT 1 & LƯU NHÁP (START ATTEMPT 1 & DRAFT PERSISTENCE)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 5] Khởi tạo Attempt 1 và kiểm tra cơ chế lưu nháp (Draft)...");
    const { submission: attempt1 } = await submissionService.startAttempt(studentAuthObj, examDetail.id);
    createdSubmissionIds.push(attempt1.id);
    console.log(`  ✓ Tạo Attempt 1 thành công: SubmissionID: ${attempt1.id}, Status: ${attempt1.status}`);

    const targetQuestion = questionsList[0];
    const sampleAnswer = targetQuestion ? "Sample Journey Student Essay Response Band 5.5" : "Sample Answer";

    if (targetQuestion) {
      await submissionService.saveDraft(studentAuthObj, attempt1.id, [
        {
          questionId: targetQuestion.id,
          answerText: sampleAnswer,
        },
      ]);
      console.log(`  ✓ Lưu nháp (Draft) thành công cho câu hỏi ID: ${targetQuestion.id}`);
    }

    // -------------------------------------------------------------------------
    // CHẶNG 6: NỘP BÀI ATTEMPT 1 (SUBMIT ATTEMPT 1)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 6] Học viên bấm Nộp bài (Submit Attempt 1)...");
    const submitResult = await submissionService.submitExam(
      studentAuthObj,
      attempt1.id,
      {
        answers: targetQuestion
          ? [{ questionId: targetQuestion.id, answerText: sampleAnswer }]
          : [],
        idempotencyKey: `journey-idempotency-${Date.now()}`,
      }
    );
    console.log(`  ✓ Nộp bài thành công: Status: ${submitResult.status}`);

    // -------------------------------------------------------------------------
    // CHẶNG 7: GIÁO VIÊN CHẤM BÀI & YÊU CẦU LÀM BÀI SỬA (TEACHER EVALUATION)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 7] Giáo viên chấm bài & Yêu cầu học viên sửa bài (P1 Lean Learning Loop)...");
    const teacherUser = await prisma.user.findFirst({
      where: { email: "bestcanthocity@gmail.com" },
    });
    if (!teacherUser) {
      throw new Error("Không tìm thấy tài khoản giáo viên.");
    }
    const teacherCanonicalId = teacherUser.userId || teacherUser.id;
    const teacherAuthObj = { id: teacherCanonicalId, roles: ["teacher"] };

    const gradeResult = await submissionService.gradeManualSubmission(
      teacherAuthObj,
      attempt1.id,
      {
        totalScore: 5.5,
        feedback: "Bài làm ý tưởng tốt nhưng cấu trúc đoạn văn chưa chặt chẽ, thiếu câu chuyển ý. Cần viết lại phần thân bài.",
        primaryErrorCategory: "STRUCTURE",
        revisionRequired: true,
      }
    );
    console.log(`  ✓ Giáo viên trả bài thành công: Score: ${gradeResult.totalScore}, RevisionRequired: ${gradeResult.revisionRequired}, Lỗi chính: ${gradeResult.primaryErrorCategory}`);

    // -------------------------------------------------------------------------
    // CHẶNG 8: HỌC VIÊN XEM KẾT QUẢ & BẤM LÀM BÀI SỬA (STUDENT STARTS REVISION)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 8] Học viên xem nhận xét & Bấm 'Làm bài sửa (Attempt 2)'...");
    const attempt2 = await submissionService.startRevision(studentAuthObj, {
      examId: examDetail.id,
      clonePreviousAnswers: true,
    });
    createdSubmissionIds.push(attempt2.id);
    console.log(`  ✓ Khởi tạo Attempt 2 thành công: SubmissionID: ${attempt2.id}, Status: ${attempt2.status}`);

    // Forensic Check: Verify Attempt 1 remains frozen
    const attempt1Check = await prisma.examSubmission.findUnique({
      where: { id: attempt1.id },
    });
    if (attempt1Check?.status !== "graded" || Number(attempt1Check?.totalScore) !== 5.5) {
      throw new Error("CRITICAL FAILURE: Attempt 1 bị thay đổi dữ liệu sau khi Attempt 2 được tạo!");
    }
    console.log(`  ✓ Kiểm tra tính Bất Biến (Attempt 1 Isolation): Attempt 1 vẫn giữ nguyên điểm 5.5, status: ${attempt1Check.status}`);

    // -------------------------------------------------------------------------
    // CHẶNG 9: HỌC VIÊN SỬA BÀI VÀ NỘP ATTEMPT 2 (STUDENT SUBMITS ATTEMPT 2)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 9] Học viên chỉnh sửa bài viết và Nộp Attempt 2...");
    const improvedAnswer = "Improved and Restructured Essay with Cohesive Paragraphs Band 7.0";
    await submissionService.submitExam(
      studentAuthObj,
      attempt2.id,
      {
        answers: targetQuestion
          ? [{ questionId: targetQuestion.id, answerText: improvedAnswer }]
          : [],
        idempotencyKey: `journey-attempt2-submit-${Date.now()}`,
      }
    );
    console.log(`  ✓ Nộp Attempt 2 thành công.`);

    // -------------------------------------------------------------------------
    // CHẶNG 10: GIÁO VIÊN DUYỆT BÀI SỬA & HOÀN TẤT VÒNG HỌC (FINAL APPROVAL)
    // -------------------------------------------------------------------------
    console.log("\n[CHẶNG 10] Giáo viên duyệt bài sửa (Attempt 2) & Đạt chuẩn...");
    const finalGrade = await submissionService.gradeManualSubmission(
      teacherAuthObj,
      attempt2.id,
      {
        totalScore: 7.0,
        feedback: "Bài sửa rất tốt! Cấu trúc đã được sắp xếp mạch lạc, lập luận rõ ràng.",
        primaryErrorCategory: undefined,
        revisionRequired: false,
      }
    );
    console.log(`  ✓ Hoàn tất vòng học (Learning Loop Completed): Final Score: ${finalGrade.totalScore}, RevisionRequired: ${finalGrade.revisionRequired}`);

    console.log("\n================================================================================");
    console.log("            KẾT LUẬN AUDIT: TOÀN BỘ 10 CHẶNG ĐÃ PASS 100%                      ");
    console.log("            HÀNH TRÌNH HỌC VIÊN HOÀN TOÀN LIỀN MẠCH, KHÔNG BỊ GÃY!             ");
    console.log("================================================================================");
  } finally {
    // Clean up temporary journey test submissions
    if (createdSubmissionIds.length > 0) {
      console.log(`\n[Cleanup] Dọn dẹp ${createdSubmissionIds.length} bản ghi test khỏi Production DB...`);
      await prisma.answer.deleteMany({
        where: { submissionId: { in: createdSubmissionIds } },
      });
      await prisma.examSubmission.deleteMany({
        where: { id: { in: createdSubmissionIds } },
      });
      console.log("  ✓ Dọn dẹp hoàn tất.");
    }
  }
}

runComprehensiveUserJourneyAudit()
  .catch((err) => {
    console.error("FATAL JOURNEY AUDIT ERROR:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
