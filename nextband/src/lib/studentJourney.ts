/**
 * ARIS Student Journey & Realm (Cảnh Giới) Data Architecture
 * Standardized for NextBand IELTS Command Center
 */

export interface RealmDefinition {
  id: string;
  name: string; // Tên cảnh giới (vd: Học Sĩ)
  minBand: number;
  maxBand: number;
  titleEn: string;
  description: string;
  nextRealmName: string;
  nextBandThreshold: number;
}

export const ARIS_REALMS: RealmDefinition[] = [
  {
    id: "hoc_do",
    name: "Học Đồ",
    minBand: 0,
    maxBand: 3.5,
    titleEn: "Apprentice",
    description: "Khởi đầu, xây dựng nền móng phát âm & từ vựng căn bản",
    nextRealmName: "Học Sĩ",
    nextBandThreshold: 4.0,
  },
  {
    id: "hoc_si",
    name: "Học Sĩ",
    minBand: 4.0,
    maxBand: 4.5,
    titleEn: "Specialist",
    description: "Hình thành phản xạ câu ghép & cấu trúc đoạn văn ngắn mạch lạc",
    nextRealmName: "Học Sư",
    nextBandThreshold: 5.0,
  },
  {
    id: "hoc_su",
    name: "Học Sư",
    minBand: 5.0,
    maxBand: 5.5,
    titleEn: "Master",
    description: "Làm chủ cấu trúc bài thi IELTS & viết luận có bố cục logic",
    nextRealmName: "Học Giả",
    nextBandThreshold: 6.0,
  },
  {
    id: "hoc_gia",
    name: "Học Giả",
    minBand: 6.0,
    maxBand: 6.5,
    titleEn: "Scholar",
    description: "Kiểm soát ngữ pháp phức hợp & tư duy lập luận phản biện sắc sảo",
    nextRealmName: "Học Bá",
    nextBandThreshold: 7.0,
  },
  {
    id: "hoc_ba",
    name: "Học Bá",
    minBand: 7.0,
    maxBand: 7.5,
    titleEn: "Elite",
    description: "Sử dụng từ vựng tự nhiên & văn phong học thuật cao cấp",
    nextRealmName: "Học Tôn",
    nextBandThreshold: 8.0,
  },
  {
    id: "hoc_ton",
    name: "Học Tôn",
    minBand: 8.0,
    maxBand: 8.5,
    titleEn: "Grandmaster",
    description: "Độ chính xác và độ trôi chảy tiệm cận người bản xứ",
    nextRealmName: "Học Đế",
    nextBandThreshold: 9.0,
  },
  {
    id: "hoc_de",
    name: "Học Đế",
    minBand: 9.0,
    maxBand: 9.0,
    titleEn: "Sovereign",
    description: "Bậc thầy ngôn ngữ, hoàn hảo cả 4 kỹ năng",
    nextRealmName: "Đỉnh Cao",
    nextBandThreshold: 9.0,
  },
];

/**
 * Suy ra Cảnh Giới ARIS dựa trên Band điểm hiện tại
 */
export function getRealmByBand(band: number): RealmDefinition {
  const normalized = Math.max(0, Math.min(9.0, Number(band) || 0));
  for (let i = ARIS_REALMS.length - 1; i >= 0; i--) {
    if (normalized >= ARIS_REALMS[i].minBand) {
      return ARIS_REALMS[i];
    }
  }
  return ARIS_REALMS[0];
}

export interface CourseBandTarget {
  entryBand: number;
  targetBand: number;
  courseKey: string;
  courseName: string;
}

/**
 * Authoritative Course Band Resolver
 * Extracts entry band and target band strictly from class and course context.
 */
export function resolveCourseBands(
  courseTitle?: string | null,
  className?: string | null,
  courseSlug?: string | null
): CourseBandTarget {
  const combined = `${courseTitle || ""} ${className || ""} ${courseSlug || ""}`.toLowerCase();

  // 1. Starter: 0.0 -> 3.0
  if (
    combined.includes("starter") ||
    /\b(st|s\d+)\b/i.test(combined) ||
    /^s\d+/i.test(className?.trim() || "")
  ) {
    return { entryBand: 0.0, targetBand: 3.0, courseKey: "starter", courseName: "Starter" };
  }

  // 2. Dreamer: 3.0 -> 4.0
  if (
    combined.includes("dreamer") ||
    /\b(dr|d\d+)\b/i.test(combined) ||
    /^d\d+/i.test(className?.trim() || "")
  ) {
    return { entryBand: 3.0, targetBand: 4.0, courseKey: "dreamer", courseName: "Dreamer" };
  }

  // 3. Builder: 4.0 -> 5.0
  if (
    combined.includes("builder") ||
    /\b(bu|b\d+)\b/i.test(combined) ||
    /^b\d+/i.test(className?.trim() || "")
  ) {
    return { entryBand: 4.0, targetBand: 5.0, courseKey: "builder", courseName: "Builder" };
  }

  // 4. Master: 5.0 -> 6.0
  if (
    combined.includes("master") ||
    /\b(ma|m\d+)\b/i.test(combined) ||
    /^m\d+/i.test(className?.trim() || "")
  ) {
    return { entryBand: 5.0, targetBand: 6.0, courseKey: "master", courseName: "Master" };
  }

  // 5. Leader: 6.0 -> 6.5
  if (
    combined.includes("leader") ||
    /\b(le|l\d+)\b/i.test(combined) ||
    /^l\d+/i.test(className?.trim() || "")
  ) {
    return { entryBand: 6.0, targetBand: 6.5, courseKey: "leader", courseName: "Leader" };
  }

  // Generic fallback if not matched
  return { entryBand: 5.0, targetBand: 6.0, courseKey: "default", courseName: "Khóa học IELTS" };
}

export interface SkillMastery {
  skill: "Listening" | "Reading" | "Writing" | "Speaking";
  labelVi: string;
  currentBand: number;
  targetBand: number;
  percent: number;
  needsFocus: boolean;
}

export interface StudentJourneyOverview {
  entryBand: number;
  currentBand: number;
  targetBand: number;
  currentRealm: RealmDefinition;
  nextRealmName: string;
  nextBandThreshold: number;
  progressPercent: number;
  skills: SkillMastery[];
}

import { detectExamSkill } from "./examSkillHelper";

/**
 * Maps accuracy ratio (0.0 to 1.0) to standardized IELTS band score (0.0 - 9.0)
 */
export function accuracyToIeltsBand(ratio: number): number {
  const r = Math.max(0, Math.min(1, Number(ratio) || 0));
  if (r >= 0.95) return 9.0;
  if (r >= 0.90) return 8.5;
  if (r >= 0.85) return 8.0;
  if (r >= 0.78) return 7.5;
  if (r >= 0.70) return 7.0;
  if (r >= 0.63) return 6.5;
  if (r >= 0.55) return 6.0;
  if (r >= 0.45) return 5.5;
  if (r >= 0.38) return 5.0;
  if (r >= 0.30) return 4.5;
  if (r >= 0.23) return 4.0;
  if (r >= 0.15) return 3.5;
  return 3.0;
}

/**
 * Extracts IELTS band score from a submission record
 */
export function extractSubmissionBand(submission: any): number | null {
  if (!submission) return null;

  // 1. Direct teacher totalScore (Writing / Speaking / Graded exams)
  if (submission.totalScore != null && !isNaN(Number(submission.totalScore))) {
    const rawScore = Number(submission.totalScore);
    if (rawScore <= 9.0 && rawScore >= 0) {
      return Math.round(rawScore * 2) / 2;
    }
    if (rawScore <= 10 && rawScore > 0) {
      return accuracyToIeltsBand(rawScore / 10);
    }
    if (rawScore <= 100 && rawScore > 0) {
      return accuracyToIeltsBand(rawScore / 100);
    }
  }

  // 2. Direct score field
  if (submission.score != null && !isNaN(Number(submission.score))) {
    const s = Number(submission.score);
    if (s <= 9.0 && s >= 0) return Math.round(s * 2) / 2;
  }

  // 3. Objective correct / total questions
  const correct = submission.correctAnswers ?? submission.correct_answers;
  const total = submission.totalQuestions ?? submission.total_questions;
  if (correct != null && total != null && Number(total) > 0) {
    const ratio = Number(correct) / Number(total);
    return accuracyToIeltsBand(ratio);
  }

  return null;
}

/**
 * Tính toán tổng quan hành trình của học viên dựa trên lịch sử bài nộp thực tế và mục tiêu khóa học
 */
export function calculateStudentJourney(
  submissions: any[] = [],
  fallbackCurrentBand = 5.0,
  fallbackTargetBand = 6.0,
  entryBand?: number
): StudentJourneyOverview {
  const validSubmissions = Array.isArray(submissions) ? submissions : [];
  const actualEntryBand = entryBand !== undefined ? entryBand : fallbackCurrentBand;

  const computeSkill = (
    skillName: "Listening" | "Reading" | "Writing" | "Speaking",
    labelVi: string,
    skillKey: "listening" | "reading" | "writing" | "speaking"
  ): { skill: SkillMastery; hasRealData: boolean } => {
    const matchingScores: number[] = [];

    validSubmissions.forEach((sub) => {
      const exam = sub.exam || {
        title: sub.examTitle || sub.title,
        examType: sub.examType || sub.exam_type,
      };
      const detected = detectExamSkill(exam);

      const isMatch =
        detected === skillKey ||
        (detected === "reading_listening" && (skillKey === "listening" || skillKey === "reading")) ||
        (detected === "grammar" && (skillKey === "reading" || skillKey === "writing"));

      if (isMatch) {
        const b = extractSubmissionBand(sub);
        if (b != null && !isNaN(b)) {
          matchingScores.push(b);
        }
      }
    });

    const hasRealData = matchingScores.length > 0;
    let band = actualEntryBand;

    if (hasRealData) {
      // Lấy trung bình tối đa 5 bài gần nhất của kỹ năng này
      const recent = matchingScores.slice(0, 5);
      const sum = recent.reduce((acc, val) => acc + val, 0);
      band = Math.round((sum / recent.length) * 2) / 2;
      band = Math.max(actualEntryBand, Math.min(9.0, band));
    }

    const percent = Math.min(100, Math.round((band / 9.0) * 100));

    return {
      skill: {
        skill: skillName,
        labelVi,
        currentBand: band,
        targetBand: fallbackTargetBand,
        percent,
        needsFocus: false,
      },
      hasRealData,
    };
  };

  const listeningRes = computeSkill("Listening", "Nghe", "listening");
  const readingRes = computeSkill("Reading", "Đọc", "reading");
  const writingRes = computeSkill("Writing", "Viết", "writing");
  const speakingRes = computeSkill("Speaking", "Nói", "speaking");

  const skills = [
    listeningRes.skill,
    readingRes.skill,
    writingRes.skill,
    speakingRes.skill,
  ];

  // Xác định kỹ năng cần tập trung (kỹ năng có band thấp nhất hoặc < targetBand)
  const minBand = Math.min(...skills.map((s) => s.currentBand));
  skills.forEach((s) => {
    if (s.currentBand === minBand && s.currentBand < fallbackTargetBand) {
      s.needsFocus = true;
    }
  });

  // Tính Overall Band thực tế nếu có ít nhất 1 kỹ năng có dữ liệu bài làm
  const hasAnyData =
    listeningRes.hasRealData ||
    readingRes.hasRealData ||
    writingRes.hasRealData ||
    speakingRes.hasRealData;

  const currentBand = hasAnyData
    ? Math.round(((skills.reduce((acc, s) => acc + s.currentBand, 0) / 4) * 2)) / 2
    : actualEntryBand;

  const currentRealm = getRealmByBand(currentBand);

  // Tính % tiến độ tới cảnh giới tiếp theo
  const lower = currentRealm.minBand;
  const upper = currentRealm.nextBandThreshold;
  const range = upper - lower || 1;
  const progressPercent = Math.min(
    100,
    Math.max(10, Math.round(((currentBand - lower) / range) * 100))
  );

  return {
    entryBand: actualEntryBand,
    currentBand,
    targetBand: fallbackTargetBand,
    currentRealm,
    nextRealmName: currentRealm.nextRealmName,
    nextBandThreshold: currentRealm.nextBandThreshold,
    progressPercent,
    skills,
  };
}
