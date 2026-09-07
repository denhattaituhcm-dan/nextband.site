/**
 * Diagnostic Service — NextBand Academic Diagnostic Engine (LBOS)
 *
 * Triết lý: "Bác sĩ chẩn đoán học thuật" (Precision Academic Diagnosis)
 *   Accuracy != Diagnosis.
 *   Diagnosis = Accuracy + Evidence Volume + Recency + Repeated Errors.
 *
 * Nguyên tắc bất biến:
 *   1. Không kết luận khi dữ liệu quá mỏng (Sparse Data Fallacy).
 *   2. Xếp hạng rủi ro (Vulnerability Ranking) theo trọng số Log2 bằng chứng thay vì sort accuracy thô.
 *   3. Tính toán Trend (Baseline kỳ trước vs Kỳ gần nhất) để phụ huynh thấy tiến trình can thiệp.
 *   4. Deduplicate multiple attempts: Chỉ lấy canonical attempt mới nhất của mỗi bài thi.
 *   5. Tuân thủ Architecture Freeze: Chỉ đọc từ schema Prisma hiện có.
 */

import { PrismaClient } from '@prisma/client';

export type DiagnosticConfidence = 'INSUFFICIENT' | 'LOW' | 'MEDIUM' | 'HIGH';
export type DiagnosticSeverity = 'CRITICAL' | 'WEAK' | 'STABLE' | 'STRENGTH';
export type DiagnosticTrendDirection = 'IMPROVING' | 'STABLE' | 'DECLINING';

export interface QuestionTypeDiagnostic {
  questionType: string;
  skill: 'READING' | 'LISTENING' | 'GRAMMAR';
  label: string;
  total: number;
  correct: number;
  accuracy: number; // 0 - 100 (%)
  evidenceCount: number;
  confidence: DiagnosticConfidence;
  severity: DiagnosticSeverity;
  vulnerabilityScore: number;
  diagnosisVi: string;
  trend?: {
    previousAccuracy: number;
    currentAccuracy: number;
    delta: number;
    direction: DiagnosticTrendDirection;
  };
}

export interface SkillDiagnostic {
  skill: 'READING' | 'LISTENING';
  overallAccuracy: number;
  totalQuestions: number;
  confidence: DiagnosticConfidence;
  vulnerabilities: QuestionTypeDiagnostic[];
  strengths: QuestionTypeDiagnostic[];
}

export interface VocabularyDiagnostic {
  wordId: string;
  word: string;
  cefrLevel: string | null;
  coreIdea: string;
  failedReviews: number;
  totalReviews: number;
  masteryScore: number;
  severity: DiagnosticSeverity;
}

export interface StudentAcademicDiagnosticDTO {
  studentId: string;
  classId?: string;
  generatedAt: string;
  overall: {
    evidenceCount: number;
    confidence: DiagnosticConfidence;
    primaryVulnerability?: string;
    primaryStrength?: string;
  };
  listening: SkillDiagnostic;
  reading: SkillDiagnostic;
  language: {
    vocabulary: VocabularyDiagnostic[];
    grammarNotes: string[];
  };
}

// ---------------------------------------------------------------------------
// Từ điển sư phạm chuyển hóa questionType sang nhãn & chẩn đoán tiếng Việt
// ---------------------------------------------------------------------------
const QUESTION_METADATA_MAP: Record<
  string,
  { label: string; diagnosis: string; skill: 'READING' | 'LISTENING' | 'GRAMMAR' }
> = {
  matching: {
    label: 'Matching Information / Headings',
    diagnosis: 'Học viên gặp khó khăn khi tổng hợp ý chính đoạn văn và nhận diện bẫy paraphrase tiêu đề.',
    skill: 'READING',
  },
  true_false_not_given: {
    label: 'True / False / Not Given',
    diagnosis: 'Học viên hay suy diễn cảm tính, chưa phân biệt rõ ràng giữa False (mâu thuẫn thông tin) và Not Given (không đề cập).',
    skill: 'READING',
  },
  yes_no_not_given: {
    label: 'Yes / No / Not Given',
    diagnosis: 'Học viên gặp trở ngại khi nhận định quan điểm/thái độ của tác giả so với sự thật khách quan.',
    skill: 'READING',
  },
  multiple_choice: {
    label: 'Multiple Choice (Trắc nghiệm)',
    diagnosis: 'Học viên dễ bị phân tâm bởi các phương án bẫy (distractors) chứa từ khóa giống bài đọc/nghe nhưng sai ngữ cảnh.',
    skill: 'READING',
  },
  fill_blank: {
    label: 'Completion / Điền từ',
    diagnosis: 'Học viên chưa chú ý ngữ pháp câu chứa chỗ trống (từ loại, số ít/số nhiều) hoặc lỗi chính tả (spelling).',
    skill: 'READING',
  },
  short_answer: {
    label: 'Short Answer Questions',
    diagnosis: 'Học viên xác định giới hạn từ (Word limit) chưa chuẩn hoặc chưa định vị đúng câu trả lời trong bài đọc.',
    skill: 'READING',
  },
  listening: {
    label: 'Listening Comprehension',
    diagnosis: 'Học viên gặp khó khăn với tốc độ nói tự nhiên, hiện tượng nuốt âm/nối âm hoặc bẫy sửa thông tin (correction).',
    skill: 'LISTENING',
  },
};

// ---------------------------------------------------------------------------
// Pure Diagnostic Evaluation Functions
// ---------------------------------------------------------------------------

/**
 * Tính toán độ tin cậy dựa trên số lượng bằng chứng (evidence volume)
 */
export function calculateConfidence(evidenceCount: number): DiagnosticConfidence {
  if (evidenceCount < 5) return 'INSUFFICIENT';
  if (evidenceCount < 12) return 'LOW';
  if (evidenceCount < 25) return 'MEDIUM';
  return 'HIGH';
}

/**
 * Phân loại mức độ nghiêm trọng của dạng bài
 */
export function classifySeverity(accuracy: number, evidenceCount: number): DiagnosticSeverity {
  const confidence = calculateConfidence(evidenceCount);
  if (confidence === 'INSUFFICIENT') {
    return accuracy >= 80 ? 'STRENGTH' : 'STABLE';
  }

  if (accuracy >= 80) return 'STRENGTH';
  if (accuracy >= 70) return 'STABLE';
  if (accuracy >= 55) return 'WEAK';

  // accuracy < 55%
  return evidenceCount >= 12 ? 'CRITICAL' : 'WEAK';
}

/**
 * Tính chỉ số rủi ro học thuật (Vulnerability Score) có trọng số logarit
 * Tránh bẫy sparse data: 0/2 câu không thể có điểm rủi ro cao hơn 14/24 câu
 */
export function calculateVulnerabilityScore(accuracy: number, evidenceCount: number): number {
  if (evidenceCount <= 0) return 0;
  const errorRate = Math.max(0, 100 - accuracy);
  const logWeight = Math.log2(evidenceCount + 1);
  return Math.round(errorRate * logWeight * 10) / 10;
}

/**
 * Tính xu hướng thay đổi (Trend) giữa 2 chu kỳ
 */
export function calculateTrend(
  prevAccuracy: number | null,
  currAccuracy: number
): {
  previousAccuracy: number;
  currentAccuracy: number;
  delta: number;
  direction: DiagnosticTrendDirection;
} | undefined {
  if (prevAccuracy === null || isNaN(prevAccuracy)) {
    return undefined;
  }

  const delta = Math.round((currAccuracy - prevAccuracy) * 10) / 10;
  let direction: DiagnosticTrendDirection = 'STABLE';
  if (delta >= 8) direction = 'IMPROVING';
  else if (delta <= -8) direction = 'DECLINING';

  return {
    previousAccuracy: Math.round(prevAccuracy * 10) / 10,
    currentAccuracy: Math.round(currAccuracy * 10) / 10,
    delta,
    direction,
  };
}

// ---------------------------------------------------------------------------
// Diagnostic Service Class
// ---------------------------------------------------------------------------

export class DiagnosticService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Truy xuất toàn bộ bài nộp hợp lệ của học viên, deduplicate và aggregate
   */
  async getStudentDiagnostic(
    studentId: string,
    classId?: string
  ): Promise<StudentAcademicDiagnosticDTO> {
    // 1. Xác định danh sách Exam IDs hợp lệ nếu có classId
    let targetExamIds: string[] | null = null;
    if (classId) {
      const assignments = await this.prisma.classExamAssignment.findMany({
        where: { classId, status: 'PUBLISHED' },
        select: { examId: true },
      });
      targetExamIds = assignments.map((a) => a.examId);
    }

    // 2. Query toàn bộ submission đã nộp (SUBMITTED hoặc GRADED)
    const submissions = await this.prisma.examSubmission.findMany({
      where: {
        studentId,
        status: { in: ['SUBMITTED', 'GRADED', 'submitted', 'graded'] as any },
        ...(targetExamIds ? { examId: { in: targetExamIds } } : {}),
      },
      orderBy: { submittedAt: 'desc' },
      include: {
        answers: {
          include: {
            evidence: true,
            question: {
              include: {
                group: {
                  include: {
                    section: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // 3. Deduplicate theo examId (Chỉ lấy attempt mới nhất của từng exam để tránh double-count)
    const latestSubmissionByExam = new Map<string, (typeof submissions)[0]>();
    const allFinalSubmissions: typeof submissions = [];

    for (const sub of submissions) {
      if (!latestSubmissionByExam.has(sub.examId)) {
        latestSubmissionByExam.set(sub.examId, sub);
        allFinalSubmissions.push(sub);
      }
    }

    // 4. Chia tập dữ liệu làm 2 nửa theo thời gian để tính Trend (Baseline vs Recent)
    const sortedSubmissions = [...allFinalSubmissions].sort((a, b) => {
      const tA = (a.submittedAt || a.createdAt).getTime();
      const tB = (b.submittedAt || b.createdAt).getTime();
      return tA - tB;
    });

    const midIndex = Math.floor(sortedSubmissions.length / 2);
    const baselineSubmissions = sortedSubmissions.length >= 2 ? sortedSubmissions.slice(0, midIndex) : [];
    const recentSubmissions = sortedSubmissions.length >= 2 ? sortedSubmissions.slice(midIndex) : sortedSubmissions;

    // Helper thống kê câu hỏi từ tập submissions
    interface QuestionStats {
      questionType: string;
      skill: 'READING' | 'LISTENING' | 'GRAMMAR';
      total: number;
      correct: number;
    }

    const collectStats = (subs: typeof submissions): Map<string, QuestionStats> => {
      const statsMap = new Map<string, QuestionStats>();

      for (const sub of subs) {
        for (const ans of sub.answers) {
          const q = ans.question;
          if (!q) continue;

          const qType = String(q.questionType || 'unknown').toLowerCase();
          const sectionType = String(q.group?.section?.sectionType || 'reading').toLowerCase();

          // Xác định Skill
          let skill: 'READING' | 'LISTENING' | 'GRAMMAR' = 'READING';
          if (sectionType === 'listening' || qType === 'listening') {
            skill = 'LISTENING';
          }

          const key = `${skill}:${qType}`;
          const current = statsMap.get(key) || {
            questionType: qType,
            skill,
            total: 0,
            correct: 0,
          };

          current.total += 1;
          // Xác định đúng/sai: Ưu tiên AnswerEvaluationEvidence, fallback ans.score
          const isCorrect = ans.evidence?.isCorrect ?? (Number(ans.score) > 0);
          if (isCorrect) {
            current.correct += 1;
          }

          statsMap.set(key, current);
        }
      }

      return statsMap;
    };

    const overallStatsMap = collectStats(sortedSubmissions);
    const baselineStatsMap = collectStats(baselineSubmissions);
    const recentStatsMap = collectStats(recentSubmissions);

    // 5. Chuyển hóa sang QuestionTypeDiagnostic objects
    const diagnosticItems: QuestionTypeDiagnostic[] = [];

    for (const [key, stat] of overallStatsMap.entries()) {
      const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 1000) / 10 : 0;
      const confidence = calculateConfidence(stat.total);
      const severity = classifySeverity(accuracy, stat.total);
      const vulnerabilityScore = calculateVulnerabilityScore(accuracy, stat.total);

      const meta = QUESTION_METADATA_MAP[stat.questionType] || {
        label: stat.questionType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        diagnosis: `Học viên cần cải thiện độ chính xác ở dạng bài ${stat.questionType}.`,
        skill: stat.skill,
      };

      // Tính trend nếu có đủ 2 mốc dữ liệu
      let trendData: QuestionTypeDiagnostic['trend'] = undefined;
      const baseStat = baselineStatsMap.get(key);
      const recStat = recentStatsMap.get(key);
      if (baseStat && recStat && baseStat.total >= 3 && recStat.total >= 3) {
        const baseAcc = Math.round((baseStat.correct / baseStat.total) * 100);
        const recAcc = Math.round((recStat.correct / recStat.total) * 100);
        trendData = calculateTrend(baseAcc, recAcc);
      }

      diagnosticItems.push({
        questionType: stat.questionType,
        skill: stat.skill,
        label: meta.label,
        total: stat.total,
        correct: stat.correct,
        accuracy,
        evidenceCount: stat.total,
        confidence,
        severity,
        vulnerabilityScore,
        diagnosisVi: meta.diagnosis,
        trend: trendData,
      });
    }

    // 6. Tách biệt Listening & Reading
    const buildSkillDiagnostic = (targetSkill: 'READING' | 'LISTENING'): SkillDiagnostic => {
      const skillItems = diagnosticItems.filter((item) => item.skill === targetSkill);
      const totalQ = skillItems.reduce((acc, cur) => acc + cur.total, 0);
      const correctQ = skillItems.reduce((acc, cur) => acc + cur.correct, 0);
      const overallAccuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 1000) / 10 : 0;

      // Vulnerabilities: Lọc các dạng bài cần chú ý, sort theo VulnerabilityScore DESC
      const vulnerabilities = skillItems
        .filter((item) => item.severity === 'CRITICAL' || item.severity === 'WEAK')
        .sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);

      // Strengths: Lọc các thế mạnh, sort theo Accuracy DESC
      const strengths = skillItems
        .filter((item) => item.severity === 'STRENGTH' || item.severity === 'STABLE')
        .sort((a, b) => b.accuracy - a.accuracy);

      return {
        skill: targetSkill,
        overallAccuracy,
        totalQuestions: totalQ,
        confidence: calculateConfidence(totalQ),
        vulnerabilities,
        strengths,
      };
    };

    const readingDiag = buildSkillDiagnostic('READING');
    const listeningDiag = buildSkillDiagnostic('LISTENING');

    // 7. Thu thập dữ liệu Từ vựng/Ngữ pháp từ UserVocabulary
    const vocabRecords = await this.prisma.userVocabulary.findMany({
      where: {
        userId: studentId,
        OR: [{ failedReviews: { gte: 2 } }, { masteryScore: { lt: 0.6 } }],
      },
      take: 10,
      orderBy: { failedReviews: 'desc' },
      include: {
        word: true,
      },
    });

    const vocabularyDiagnostics: VocabularyDiagnostic[] = vocabRecords.map((vr) => ({
      wordId: vr.wordId,
      word: vr.word.word,
      cefrLevel: vr.word.cefrLevel,
      coreIdea: vr.word.coreIdea,
      failedReviews: vr.failedReviews,
      totalReviews: vr.totalReviews,
      masteryScore: Math.round(vr.masteryScore * 100),
      severity: vr.failedReviews >= 4 ? 'CRITICAL' : 'WEAK',
    }));

    // 8. Tổng hợp Overall Diagnostic Info
    const totalEvidenceCount = readingDiag.totalQuestions + listeningDiag.totalQuestions;
    const overallConfidence = calculateConfidence(totalEvidenceCount);

    // Tìm primary vulnerability & strength trên toàn bộ kỹ năng
    const allVulnerabilities = [...readingDiag.vulnerabilities, ...listeningDiag.vulnerabilities].sort(
      (a, b) => b.vulnerabilityScore - a.vulnerabilityScore
    );
    const allStrengths = [...readingDiag.strengths, ...listeningDiag.strengths].sort(
      (a, b) => b.accuracy - a.accuracy
    );

    return {
      studentId,
      classId,
      generatedAt: new Date().toISOString(),
      overall: {
        evidenceCount: totalEvidenceCount,
        confidence: overallConfidence,
        primaryVulnerability: allVulnerabilities[0]?.label,
        primaryStrength: allStrengths[0]?.label,
      },
      listening: listeningDiag,
      reading: readingDiag,
      language: {
        vocabulary: vocabularyDiagnostics,
        grammarNotes: [
          'Chú ý mạo từ (a/an/the) và cấu trúc danh từ ghép trong bài điền từ.',
          'Rèn luyện chuyển đổi mệnh đề quan hệ rút gọn để tăng tốc độ đọc hiểu.',
        ],
      },
    };
  }
}
