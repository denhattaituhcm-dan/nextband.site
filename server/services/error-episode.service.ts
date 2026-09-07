import { PrismaClient } from "@prisma/client";

export const RETENTION_STREAK_THRESHOLD = 2; // Số bài độc lập liên tiếp sạch lỗi để được công nhận RETAINED

export type EpisodeStatus =
  | "OBSERVED"
  | "REVISION_REQUESTED"
  | "CORRECTED"
  | "MONITORING"
  | "RETAINED"
  | "RECURRED";

export interface ProcessGradingParams {
  submissionId: string;
  studentId: string;
  examId: string;
  examType?: string;
  grades: Array<{
    answerId?: string;
    questionId?: string;
    score?: number;
    feedback?: string;
    primaryErrorCategory?: string | null;
    revisionRequired?: boolean;
    sentenceFeedbacks?: any[];
  }>;
  options?: {
    feedback?: string;
    primaryErrorCategory?: string | null;
    revisionRequired?: boolean;
    sentenceFeedbacks?: any[];
  };
}

export interface StudentRecoveryStats {
  studentId: string;
  totalDetected: number;
  totalRevisionRequested: number;
  totalCorrected: number;
  recoveryRate: number; // percentage (0 - 100)
  episodes: any[];
}

export interface StudentAcademicEvidenceStats {
  studentId: string;
  totalDetected: number;
  totalRevisionRequested: number;
  totalCorrected: number;
  totalRetained: number;
  totalRecurred: number;
  recoveryRate: number; // percentage (0 - 100)
  retentionRate: number; // percentage (0 - 100)
  episodes: {
    retained: any[];
    monitoring: any[];
    recurred: any[];
    pendingRevision: any[];
    observed: any[];
  };
}

export class ErrorEpisodeService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Main lifecycle transition hook invoked within gradeSubmission transaction
   */
  async processSubmissionGrading(tx: any, params: ProcessGradingParams): Promise<any[]> {
    const prisma = tx || this.prisma;
    if (!prisma.studentErrorEpisode) {
      return [];
    }

    const { submissionId, studentId, examId, examType = "WRITING", grades = [], options } = params;
    const skill = (examType || "WRITING").toUpperCase() === "SPEAKING" ? "SPEAKING" : "WRITING";

    const isRevisionRequired = grades.some((g) => g.revisionRequired) || !!options?.revisionRequired;

    // 1. Detect if this submission is Attempt 2 (or higher) of a previously graded submission FOR THE SAME EXAM
    const rawEarlierGraded = await prisma.examSubmission.findMany({
      where: {
        examId,
        studentId,
        id: { not: submissionId },
        status: "GRADED",
      },
      orderBy: { createdAt: "asc" },
    });
    const earlierGradedSubmissions = rawEarlierGraded.filter((s: any) => s.id !== submissionId);
    const isRevisionSubmission = earlierGradedSubmissions.length > 0;

    // 2. Extract error items from this submission
    interface ErrorItem {
      tag: string;
      category: string;
      sentence?: string;
      note?: string;
      answerId?: string;
    }

    const errorItems: ErrorItem[] = [];

    // Collect sentenceFeedbacks
    grades.forEach((g) => {
      const fbs = g.sentenceFeedbacks || [];
      fbs.forEach((fb: any) => {
        if (fb && fb.category && fb.category !== "PRAISE") {
          errorItems.push({
            tag: fb.tag || fb.category,
            category: fb.category,
            sentence: fb.originalSentence || fb.sentence,
            note: fb.note || fb.suggestedSentence,
            answerId: g.answerId,
          });
        }
      });
    });

    if (options?.sentenceFeedbacks) {
      options.sentenceFeedbacks.forEach((fb: any) => {
        if (fb && fb.category && fb.category !== "PRAISE") {
          const alreadyExists = errorItems.some((e) => e.tag === fb.tag && e.sentence === (fb.originalSentence || fb.sentence));
          if (!alreadyExists) {
            errorItems.push({
              tag: fb.tag || fb.category,
              category: fb.category,
              sentence: fb.originalSentence || fb.sentence,
              note: fb.note || fb.suggestedSentence,
            });
          }
        }
      });
    }

    // If no sentence feedbacks, fallback to primaryErrorCategory
    const primaryCat = options?.primaryErrorCategory || grades[0]?.primaryErrorCategory;
    if (errorItems.length === 0 && primaryCat) {
      errorItems.push({
        tag: primaryCat,
        category: primaryCat,
        note: options?.feedback || grades[0]?.feedback,
        answerId: grades[0]?.answerId,
      });
    }

    const currentErrorTags = new Set(errorItems.map((e) => e.tag));

    // 3. Case A: If this is an Attempt 2+ of the SAME exam (Revision submission)
    if (isRevisionSubmission) {
      const earlierSubIds = earlierGradedSubmissions.map((s: any) => s.id);
      const targetEpisodes = await prisma.studentErrorEpisode.findMany({
        where: {
          studentId,
          sourceSubmissionId: { in: earlierSubIds },
          status: { in: ["REVISION_REQUESTED", "OBSERVED"] },
        },
      });

      if (!isRevisionRequired) {
        // Teacher verified the revision: transition to CORRECTED!
        for (const ep of targetEpisodes) {
          await prisma.studentErrorEpisode.update({
            where: { id: ep.id },
            data: {
              status: "CORRECTED",
              revisionSubmissionId: submissionId,
              correctedAt: new Date(),
              lastObservedAt: new Date(),
            },
          });
        }
      } else {
        // Teacher still requires revision: keep REVISION_REQUESTED
        for (const ep of targetEpisodes) {
          await prisma.studentErrorEpisode.update({
            where: { id: ep.id },
            data: {
              status: "REVISION_REQUESTED",
              revisionSubmissionId: submissionId,
              lastObservedAt: new Date(),
            },
          });
        }
      }
    } else {
      // 4. Case B: If this is an INDEPENDENT new assignment (Different exam or first attempt)
      // Evaluate Retention & Recurrence for all prior episodes of this student in the same skill
      const priorEpisodes = (
        await prisma.studentErrorEpisode.findMany({
          where: {
            studentId,
            skill,
            status: { in: ["CORRECTED", "MONITORING", "RETAINED", "RECURRED"] },
          },
        })
      ).filter((ep: any) => ep.sourceSubmissionId !== submissionId);

      const evaluatedTagSet = new Set<string>();

      for (const ep of priorEpisodes) {
        evaluatedTagSet.add(ep.errorTag);
        if (currentErrorTags.has(ep.errorTag)) {
          // RECURRENCE: The student made this mistake again in a subsequent assignment!
          await prisma.studentErrorEpisode.update({
            where: { id: ep.id },
            data: {
              status: isRevisionRequired ? "REVISION_REQUESTED" : "RECURRED",
              recurrenceCount: (ep.recurrenceCount || 0) + 1,
              cleanStreakCount: 0,
              lastObservedAt: new Date(),
            },
          });
        } else {
          // CLEAN STREAK: This new assignment did NOT contain this mistake!
          const newStreak = (ep.cleanStreakCount || 0) + 1;
          const isRetained = newStreak >= RETENTION_STREAK_THRESHOLD;
          await prisma.studentErrorEpisode.update({
            where: { id: ep.id },
            data: {
              status: isRetained ? "RETAINED" : "MONITORING",
              cleanStreakCount: newStreak,
              ...(isRetained && !ep.retainedAt ? { retainedAt: new Date() } : {}),
            },
          });
        }
      }

      // Record any BRAND NEW error items that are not already tracked in priorEpisodes
      const initialStatus: EpisodeStatus = isRevisionRequired ? "REVISION_REQUESTED" : "OBSERVED";

      for (const item of errorItems) {
        if (evaluatedTagSet.has(item.tag)) {
          // Already handled as recurrence on the living episode!
          continue;
        }

        const existing = await prisma.studentErrorEpisode.findFirst({
          where: {
            studentId,
            sourceSubmissionId: submissionId,
            errorTag: item.tag,
          },
        });

        if (existing) {
          await prisma.studentErrorEpisode.update({
            where: { id: existing.id },
            data: {
              status: initialStatus,
              teacherFeedback: item.note || existing.teacherFeedback,
              lastObservedAt: new Date(),
            },
          });
        } else {
          await prisma.studentErrorEpisode.create({
            data: {
              studentId,
              skill,
              category: item.category,
              errorTag: item.tag,
              status: initialStatus,
              sourceSubmissionId: submissionId,
              sourceAnswerId: item.answerId || null,
              revisionSubmissionId: null,
              correctedAt: null,
              initialSentence: item.sentence || null,
              teacherFeedback: item.note || null,
              firstObservedAt: new Date(),
              lastObservedAt: new Date(),
            },
          });
        }
      }
    }

    // Return current episodes for this student
    return await prisma.studentErrorEpisode.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Compute comprehensive Academic Evidence Stats (Recovery Rate + Retention Rate)
   */
  async getStudentAcademicEvidenceStats(studentId: string): Promise<StudentAcademicEvidenceStats> {
    const episodes = await this.prisma.studentErrorEpisode.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    const totalDetected = episodes.length;
    const totalRevisionRequested = episodes.filter(
      (e: any) =>
        e.status === "REVISION_REQUESTED" ||
        e.status === "CORRECTED" ||
        e.status === "MONITORING" ||
        e.status === "RETAINED" ||
        e.correctedAt !== null
    ).length;

    const totalCorrected = episodes.filter(
      (e: any) =>
        e.status === "CORRECTED" ||
        e.status === "MONITORING" ||
        e.status === "RETAINED" ||
        e.correctedAt !== null
    ).length;

    const totalRetained = episodes.filter((e: any) => e.status === "RETAINED").length;
    const totalRecurred = episodes.filter((e: any) => e.status === "RECURRED" || (e.recurrenceCount && e.recurrenceCount > 0)).length;

    const recoveryRate = totalRevisionRequested > 0 ? Math.round((totalCorrected / totalRevisionRequested) * 100) : 100;
    const retentionRate = totalCorrected > 0 ? Math.round((totalRetained / totalCorrected) * 100) : 100;

    return {
      studentId,
      totalDetected,
      totalRevisionRequested,
      totalCorrected,
      totalRetained,
      totalRecurred,
      recoveryRate,
      retentionRate,
      episodes: {
        retained: episodes.filter((e: any) => e.status === "RETAINED"),
        monitoring: episodes.filter((e: any) => e.status === "MONITORING" || e.status === "CORRECTED"),
        recurred: episodes.filter((e: any) => e.status === "RECURRED"),
        pendingRevision: episodes.filter((e: any) => e.status === "REVISION_REQUESTED"),
        observed: episodes.filter((e: any) => e.status === "OBSERVED"),
      },
    };
  }

  /**
   * Backwards-compatible recovery stats
   */
  async getStudentRecoveryStats(studentId: string): Promise<StudentRecoveryStats> {
    const stats = await this.getStudentAcademicEvidenceStats(studentId);
    return {
      studentId: stats.studentId,
      totalDetected: stats.totalDetected,
      totalRevisionRequested: stats.totalRevisionRequested,
      totalCorrected: stats.totalCorrected,
      recoveryRate: stats.recoveryRate,
      episodes: await this.prisma.studentErrorEpisode.findMany({
        where: { studentId },
        orderBy: { createdAt: "desc" },
      }),
    };
  }
}
