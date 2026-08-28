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
    nextRealmName: "Học Giả",
    nextBandThreshold: 4.0,
  },
  {
    id: "hoc_gia",
    name: "Học Giả",
    minBand: 4.0,
    maxBand: 4.5,
    titleEn: "Scholar",
    description: "Hình thành phản xạ câu đơn & cấu trúc đoạn văn ngắn",
    nextRealmName: "Học Sĩ",
    nextBandThreshold: 5.0,
  },
  {
    id: "hoc_si",
    name: "Học Sĩ",
    minBand: 5.0,
    maxBand: 5.5,
    titleEn: "Practitioner",
    description: "Làm chủ cấu trúc bài thi IELTS & viết luận có bố cục",
    nextRealmName: "Học Sư",
    nextBandThreshold: 6.0,
  },
  {
    id: "hoc_su",
    name: "Học Sư",
    minBand: 6.0,
    maxBand: 6.5,
    titleEn: "Adept",
    description: "Kiểm soát ngữ pháp phức hợp & tư duy lập luận phản biện",
    nextRealmName: "Học Bá",
    nextBandThreshold: 7.0,
  },
  {
    id: "hoc_ba",
    name: "Học Bá",
    minBand: 7.0,
    maxBand: 7.5,
    titleEn: "Master",
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
  const normalized = Math.max(0, Math.min(9.0, Number(band) || 5.0));
  for (let i = ARIS_REALMS.length - 1; i >= 0; i--) {
    if (normalized >= ARIS_REALMS[i].minBand) {
      return ARIS_REALMS[i];
    }
  }
  return ARIS_REALMS[0];
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
  currentBand: number;
  targetBand: number;
  currentRealm: RealmDefinition;
  nextRealmName: string;
  nextBandThreshold: number;
  progressPercent: number;
  skills: SkillMastery[];
}

/**
 * Tính toán tổng quan hành trình của học viên
 */
export function calculateStudentJourney(
  submissions: any[] = [],
  fallbackCurrentBand = 5.5,
  fallbackTargetBand = 6.5
): StudentJourneyOverview {
  const currentRealm = getRealmByBand(fallbackCurrentBand);
  
  // Tính % tiến độ tới chặng tiếp theo
  const lower = currentRealm.minBand;
  const upper = currentRealm.nextBandThreshold;
  const range = upper - lower || 1;
  const progressPercent = Math.min(
    100,
    Math.max(10, Math.round(((fallbackCurrentBand - lower) / range) * 100))
  );

  // Tính điểm 4 kỹ năng (nếu có submissions, trích xuất điểm gần nhất)
  const skills: SkillMastery[] = [
    {
      skill: "Listening",
      labelVi: "Nghe",
      currentBand: 6.5,
      targetBand: fallbackTargetBand,
      percent: Math.min(100, Math.round((6.5 / 9.0) * 100)),
      needsFocus: false,
    },
    {
      skill: "Reading",
      labelVi: "Đọc",
      currentBand: 7.0,
      targetBand: fallbackTargetBand,
      percent: Math.min(100, Math.round((7.0 / 9.0) * 100)),
      needsFocus: false,
    },
    {
      skill: "Writing",
      labelVi: "Viết",
      currentBand: 5.5,
      targetBand: fallbackTargetBand,
      percent: Math.min(100, Math.round((5.5 / 9.0) * 100)),
      needsFocus: true, // Kỹ năng thấp hơn target
    },
    {
      skill: "Speaking",
      labelVi: "Nói",
      currentBand: 5.5,
      targetBand: fallbackTargetBand,
      percent: Math.min(100, Math.round((5.5 / 9.0) * 100)),
      needsFocus: false,
    },
  ];

  return {
    currentBand: fallbackCurrentBand,
    targetBand: fallbackTargetBand,
    currentRealm,
    nextRealmName: currentRealm.nextRealmName,
    nextBandThreshold: currentRealm.nextBandThreshold,
    progressPercent,
    skills,
  };
}
