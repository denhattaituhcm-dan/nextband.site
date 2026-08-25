import { supabase } from "./supabase";

export interface EvidenceItem {
  id: string;
  studentName: string;
  studentSchool?: string;
  title: string;
  imageUrl: string;
  story: string;
  scoreBefore?: string;
  overallScore: string;
  academicRankTitle?: string;
  listeningScore?: string;
  readingScore?: string;
  writingScore?: string;
  speakingScore?: string;
  studyDuration?: string;
  courseName?: string;
  featured: boolean;
  published: boolean;
  consentConfirmed: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicRankHonor {
  rankNumber: number;
  title: string;
  subtitle: string;
  fullTitle: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentColor: string;
  iconColor: string;
}

export interface AcademicStageInfo {
  stageId: string;
  stageName: string;
  stageCode: string;
  starCount: number;
  stageRequirement: string;
  fullTitle: string;
}

/**
 * QUY TẮC GỐC (Áp dụng cho mọi cấp năng lực ARIS-7):
 * Mỗi cấp có mốc chuẩn X (ví dụ 3.0, 4.0, 5.0, 6.0, 7.0, 8.0):
 * - Sơ kỳ (1★): Overall X, có ít nhất 1 kỹ năng dưới mốc X
 * - Trung kỳ (2★): Overall X, tất cả kỹ năng đạt mốc >= X
 * - Hậu kỳ (3★): Overall vượt mốc (X + 0.5), nhưng còn ít nhất 1 kỹ năng chưa đạt (X + 0.5) (ở mốc ~X)
 * - Đỉnh phong (4★): Overall vượt mốc (X + 0.5), tất cả kỹ năng đồng đều ở mốc cao hơn >= (X + 0.5)
 */
export function calculateAcademicStage(
  overallStr: string | number,
  subscores?: {
    listening?: string | number;
    reading?: string | number;
    writing?: string | number;
    speaking?: string | number;
  }
): AcademicStageInfo {
  const overall = typeof overallStr === "number" ? overallStr : parseFloat(overallStr || "6.5");

  // Determine base X according to ARIS-7 rank scale
  let baseScore = 3.0;
  if (overall >= 8.5) baseScore = 8.5;
  else if (overall >= 8.0) baseScore = 8.0;
  else if (overall >= 7.0) baseScore = 7.0;
  else if (overall >= 6.0) baseScore = 6.0;
  else if (overall >= 5.0) baseScore = 5.0;
  else if (overall >= 4.0) baseScore = 4.0;
  else baseScore = 3.0;

  const nextScore = baseScore + 0.5;

  const parseScore = (val?: string | number) => {
    if (val === undefined || val === null || val === "") return NaN;
    return typeof val === "number" ? val : parseFloat(val);
  };

  const subs = subscores
    ? [
        parseScore(subscores.listening),
        parseScore(subscores.reading),
        parseScore(subscores.writing),
        parseScore(subscores.speaking),
      ].filter((s) => !isNaN(s))
    : [];

  // If no subscores provided, fallback estimation
  if (subs.length === 0) {
    if (overall >= nextScore) {
      return {
        stageId: "stage-3",
        stageName: "Hậu kỳ",
        stageCode: "Phase III",
        starCount: 3,
        stageRequirement: `Overall ${nextScore.toFixed(1)}`,
        fullTitle: "Hậu kỳ (3★)",
      };
    }
    return {
      stageId: "stage-2",
      stageName: "Trung kỳ",
      stageCode: "Phase II",
      starCount: 2,
      stageRequirement: `Overall ${baseScore.toFixed(1)}`,
      fullTitle: "Trung kỳ (2★)",
    };
  }

  const allAboveOrEqualNext = subs.every((s) => s >= nextScore);
  const anyBelowBase = subs.some((s) => s < baseScore);

  if (overall >= nextScore) {
    if (allAboveOrEqualNext) {
      return {
        stageId: "stage-4",
        stageName: "Đỉnh phong",
        stageCode: "Apex",
        starCount: 4,
        stageRequirement: `Overall ${nextScore.toFixed(1)}, tất cả kỹ năng ≥ ${nextScore.toFixed(1)}`,
        fullTitle: "Đỉnh phong (4★)",
      };
    } else {
      return {
        stageId: "stage-3",
        stageName: "Hậu kỳ",
        stageCode: "Phase III",
        starCount: 3,
        stageRequirement: `Overall ${nextScore.toFixed(1)}, còn kỹ năng ~${baseScore.toFixed(1)}`,
        fullTitle: "Hậu kỳ (3★)",
      };
    }
  } else {
    if (anyBelowBase) {
      return {
        stageId: "stage-1",
        stageName: "Sơ kỳ",
        stageCode: "Phase I",
        starCount: 1,
        stageRequirement: `Overall ${baseScore.toFixed(1)}, có kỹ năng < ${baseScore.toFixed(1)}`,
        fullTitle: "Sơ kỳ (1★)",
      };
    } else {
      return {
        stageId: "stage-2",
        stageName: "Trung kỳ",
        stageCode: "Phase II",
        starCount: 2,
        stageRequirement: `Overall ${baseScore.toFixed(1)}, tất cả kỹ năng ≥ ${baseScore.toFixed(1)}`,
        fullTitle: "Trung kỳ (2★)",
      };
    }
  }
}

export function getAcademicRankHonor(
  scoreStr: string | number,
  subscores?: {
    listening?: string | number;
    reading?: string | number;
    writing?: string | number;
    speaking?: string | number;
  }
): AcademicRankHonor & { stage: AcademicStageInfo } {
  const num = typeof scoreStr === "number" ? scoreStr : parseFloat(scoreStr || "0");
  const stage = calculateAcademicStage(num, subscores);

  if (isNaN(num) || num < 4.0) {
    return {
      rankNumber: 3,
      title: "Học Đồ",
      subtitle: "Academic Apprentice",
      fullTitle: "Rank 3 — Học Đồ",
      badgeBg: "bg-[#0e8388]/15",
      badgeText: "text-[#0e8388] dark:text-[#2dd4bf]",
      badgeBorder: "border-[#0e8388]/30",
      accentColor: "text-[#0e8388]",
      iconColor: "#0e8388",
      stage,
    };
  }
  if (num <= 5.0) {
    return {
      rankNumber: 4,
      title: "Học Sĩ",
      subtitle: "Academic Specialist",
      fullTitle: "Rank 4 — Học Sĩ",
      badgeBg: "bg-[#b85d19]/15",
      badgeText: "text-[#b85d19] dark:text-[#fb923c]",
      badgeBorder: "border-[#b85d19]/30",
      accentColor: "text-[#b85d19]",
      iconColor: "#b85d19",
      stage,
    };
  }
  if (num <= 6.0) {
    return {
      rankNumber: 5,
      title: "Học Sư",
      subtitle: "Academic Master",
      fullTitle: "Rank 5 — Học Sư",
      badgeBg: "bg-[#64748b]/15",
      badgeText: "text-[#475569] dark:text-[#cbd5e1]",
      badgeBorder: "border-[#64748b]/30",
      accentColor: "text-[#475569]",
      iconColor: "#64748b",
      stage,
    };
  }
  if (num <= 6.5) {
    return {
      rankNumber: 6,
      title: "Học Giả",
      subtitle: "Academic Scholar",
      fullTitle: "Rank 6 — Học Giả",
      badgeBg: "bg-[#d97706]/15",
      badgeText: "text-[#b45309] dark:text-[#fcd34d]",
      badgeBorder: "border-[#d97706]/30",
      accentColor: "text-[#b45309]",
      iconColor: "#d97706",
      stage,
    };
  }
  if (num <= 7.5) {
    return {
      rankNumber: 7,
      title: "Học Bá",
      subtitle: "Academic Elite",
      fullTitle: "Rank 7 — Học Bá",
      badgeBg: "bg-[#dc2626]/15",
      badgeText: "text-[#dc2626] dark:text-[#f87171]",
      badgeBorder: "border-[#dc2626]/30",
      accentColor: "text-[#dc2626]",
      iconColor: "#dc2626",
      stage,
    };
  }
  if (num <= 8.5) {
    return {
      rankNumber: 8,
      title: "Học Tôn",
      subtitle: "Academic Grandmaster",
      fullTitle: "Rank 8 — Học Tôn",
      badgeBg: "bg-[#2563eb]/15",
      badgeText: "text-[#2563eb] dark:text-[#60a5fa]",
      badgeBorder: "border-[#2563eb]/30",
      accentColor: "text-[#2563eb]",
      iconColor: "#2563eb",
      stage,
    };
  }
  return {
    rankNumber: 9,
    title: "Học Đế",
    subtitle: "Academic Sovereign",
    fullTitle: "Rank 9 — Học Đế",
    badgeBg: "bg-[#4f46e5]/15",
    badgeText: "text-[#4f46e5] dark:text-[#a5b4fc]",
    badgeBorder: "border-[#4f46e5]/30",
    accentColor: "text-[#4f46e5]",
    iconColor: "#4f46e5",
    stage,
  };
}

const STORAGE_KEY = "aris_evidence_records_v1";

const INITIAL_EVIDENCE_DATA: EvidenceItem[] = [
  {
    id: "evi-01",
    studentName: "Ánh Minh",
    studentSchool: "THPT Gia Định",
    title: "Cựu học sinh Gia Định đạt IELTS 6.5 Overall phục vụ xét tuyển ĐH",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    story:
      "Mình thật sự rất vui vì đã chọn ARIS là nơi bắt đầu hành trình chinh phục IELTS. Điều mình ấn tượng nhất là phương pháp bóc tách cấu trúc câu, giúp mình không còn thói quen dịch thô từ tiếng Việt.",
    scoreBefore: "5.0",
    overallScore: "6.5",
    academicRankTitle: "Rank 6 — Học Giả",
    listeningScore: "7.0",
    readingScore: "6.5",
    writingScore: "6.0",
    speakingScore: "6.5",
    studyDuration: "14 tuần",
    courseName: "Khóa BUILDER & MASTER",
    featured: true,
    published: true,
    consentConfirmed: true,
    displayOrder: 1,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "evi-02",
    studentName: "Đinh Văn Mạnh",
    studentSchool: "ĐH Bách Khoa",
    title: "Đạt IELTS 7.0 ngay từ lần thi đầu tiên cùng phương pháp The ARIS Way",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    story:
      "Đạt được aim 7.0 ngay trong lần thi IELTS đầu tiên là một cột mốc rất đáng nhớ. Thầy cô tại ARIS chỉ rõ từng lỗi sai lập luận và bắt buộc mình phải tự tay viết lại bài sửa sau mỗi buổi học.",
    scoreBefore: "5.5",
    overallScore: "7.0",
    academicRankTitle: "Rank 7 — Học Bá",
    listeningScore: "7.5",
    readingScore: "7.5",
    writingScore: "6.5",
    speakingScore: "6.5",
    studyDuration: "16 tuần",
    courseName: "Khóa MASTER & LEADER",
    featured: true,
    published: true,
    consentConfirmed: true,
    displayOrder: 2,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "evi-03",
    studentName: "Trần Phúc Hòa",
    studentSchool: "ĐH Sài Gòn",
    title: "Xét tốt nghiệp đầu ra và chuẩn bị cho sự nghiệp quốc tế với IELTS 7.5",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    story:
      "Sau khóa học tại ARIS, mình thấy bản thân tiến bộ rõ rệt nhất ở kỹ năng Writing Task 2. Lần đầu tiên mình viết được bài luận hơn 300 từ có cấu trúc mạch lạc, ít sai ngữ pháp và luận điểm sắc bén.",
    scoreBefore: "6.0",
    overallScore: "7.5",
    academicRankTitle: "Rank 7 — Học Bá",
    listeningScore: "8.0",
    readingScore: "8.0",
    writingScore: "7.0",
    speakingScore: "7.0",
    studyDuration: "18 tuần",
    courseName: "Khóa LEADER",
    featured: true,
    published: true,
    consentConfirmed: true,
    displayOrder: 3,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "evi-04",
    studentName: "Thanh Thảo",
    studentSchool: "ĐH Ngoại Ngữ",
    title: "Học kỷ luật tại ARIS: Bứt phá IELTS 8.0 để săn học bổng du học",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    story:
      "Quy trình chấm chữa từng câu và làm lại bài sửa trên NextBand đã tạo ra sự khác biệt hoàn toàn. Mình kiểm soát được hoàn toàn độ chính xác về ngữ nghĩa và phản xạ nói tự nhiên.",
    scoreBefore: "6.5",
    overallScore: "8.0",
    academicRankTitle: "Rank 8 — Học Tôn",
    listeningScore: "8.5",
    readingScore: "8.5",
    writingScore: "7.5",
    speakingScore: "7.5",
    studyDuration: "20 tuần",
    courseName: "Khóa LEADER",
    featured: false,
    published: true,
    consentConfirmed: true,
    displayOrder: 4,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper to normalize Supabase record to EvidenceItem
function mapSupabaseToEvidence(row: any): EvidenceItem {
  const overall = row.overall_score || row.overallScore || "6.5";
  const defaultHonor = getAcademicRankHonor(overall).fullTitle;
  return {
    id: row.id,
    studentName: row.student_name || row.studentName || "Học viên ARIS",
    studentSchool: row.student_school || row.studentSchool || "",
    title: row.title || "Tiến bộ năng lực IELTS cùng ARIS",
    imageUrl: row.image_url || row.imageUrl || "",
    story: row.story || "",
    scoreBefore: row.score_before || row.scoreBefore || "",
    overallScore: overall,
    academicRankTitle: row.academic_rank_title || row.academicRankTitle || defaultHonor,
    listeningScore: row.listening_score || row.listeningScore || "",
    readingScore: row.reading_score || row.readingScore || "",
    writingScore: row.writing_score || row.writingScore || "",
    speakingScore: row.speaking_score || row.speakingScore || "",
    studyDuration: row.study_duration || row.studyDuration || "",
    courseName: row.course_name || row.courseName || "",
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    consentConfirmed: Boolean(row.consent_confirmed ?? row.consentConfirmed),
    displayOrder: row.display_order ?? row.displayOrder ?? 1,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

// Synchronous local store getter (fallback & cache)
export function getEvidenceList(): EvidenceItem[] {
  if (typeof window === "undefined") return INITIAL_EVIDENCE_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVIDENCE_DATA));
      return INITIAL_EVIDENCE_DATA;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_EVIDENCE_DATA;
  }
}

// Fetch from Supabase with automatic cache sync
export async function fetchEvidenceListAsync(): Promise<EvidenceItem[]> {
  try {
    const { data, error } = await supabase
      .from("evidence")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map(mapSupabaseToEvidence);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn("Using local evidence fallback", err);
  }

  return getEvidenceList();
}

// Published query for public website
export function getPublishedEvidence(): EvidenceItem[] {
  const all = getEvidenceList();
  return all
    .filter((item) => item.published && item.consentConfirmed)
    .sort((a, b) => a.displayOrder - b.displayOrder || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Featured query for homepage
export function getFeaturedEvidence(): EvidenceItem[] {
  const published = getPublishedEvidence();
  const featured = published.filter((item) => item.featured);
  return featured.length > 0 ? featured.slice(0, 4) : published.slice(0, 3);
}

// Save or Update with Supabase sync
export async function saveEvidenceItemAsync(itemData: Partial<EvidenceItem>): Promise<EvidenceItem> {
  const localItem = saveEvidenceItem(itemData);

  try {
    const payload = {
      student_name: localItem.studentName,
      student_school: localItem.studentSchool,
      title: localItem.title,
      image_url: localItem.imageUrl,
      story: localItem.story,
      score_before: localItem.scoreBefore,
      overall_score: localItem.overallScore,
      listening_score: localItem.listeningScore,
      reading_score: localItem.readingScore,
      writing_score: localItem.writingScore,
      speaking_score: localItem.speakingScore,
      study_duration: localItem.studyDuration,
      course_name: localItem.courseName,
      featured: localItem.featured,
      published: localItem.published,
      consent_confirmed: localItem.consentConfirmed,
      display_order: localItem.displayOrder,
      updated_at: new Date().toISOString(),
    };

    if (itemData.id && !itemData.id.startsWith("evi-")) {
      await supabase.from("evidence").update(payload).eq("id", itemData.id);
    } else {
      const { data } = await supabase.from("evidence").insert(payload).select().single();
      if (data?.id) {
        localItem.id = data.id;
        saveEvidenceItem(localItem);
      }
    }
  } catch (err) {
    console.warn("Supabase evidence sync notice:", err);
  }

  return localItem;
}

// Synchronous save (updates local store immediately)
export function saveEvidenceItem(itemData: Partial<EvidenceItem>): EvidenceItem {
  const all = getEvidenceList();
  const now = new Date().toISOString();

  if (itemData.id) {
    const idx = all.findIndex((e) => e.id === itemData.id);
    if (idx !== -1) {
      const updated: EvidenceItem = {
        ...all[idx],
        ...itemData,
        updatedAt: now,
      } as EvidenceItem;
      if (!updated.consentConfirmed) {
        updated.published = false;
      }
      all[idx] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      return updated;
    }
  }

  const newItem: EvidenceItem = {
    id: itemData.id || `evi-${Date.now()}`,
    studentName: itemData.studentName || "Học viên ARIS",
    studentSchool: itemData.studentSchool || "",
    title: itemData.title || "Tiến bộ năng lực IELTS cùng ARIS",
    imageUrl:
      itemData.imageUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    story: itemData.story || "",
    scoreBefore: itemData.scoreBefore || "",
    overallScore: itemData.overallScore || "6.5",
    listeningScore: itemData.listeningScore || "",
    readingScore: itemData.readingScore || "",
    writingScore: itemData.writingScore || "",
    speakingScore: itemData.speakingScore || "",
    studyDuration: itemData.studyDuration || "12 tuần",
    courseName: itemData.courseName || "Khóa MASTER",
    featured: Boolean(itemData.featured),
    published: Boolean(itemData.published && itemData.consentConfirmed),
    consentConfirmed: Boolean(itemData.consentConfirmed),
    displayOrder: typeof itemData.displayOrder === "number" ? itemData.displayOrder : all.length + 1,
    createdAt: now,
    updatedAt: now,
  };

  all.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return newItem;
}

// Delete
export async function deleteEvidenceItemAsync(id: string): Promise<boolean> {
  deleteEvidenceItem(id);
  try {
    await supabase.from("evidence").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase delete notice:", err);
  }
  return true;
}

export function deleteEvidenceItem(id: string): boolean {
  const all = getEvidenceList();
  const filtered = all.filter((e) => e.id !== id);
  if (filtered.length === all.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Toggle published
export function toggleEvidencePublished(id: string, published: boolean): boolean {
  const all = getEvidenceList();
  const item = all.find((e) => e.id === id);
  if (!item) return false;
  if (published && !item.consentConfirmed) {
    throw new Error("Không thể xuất bản khi chưa có xác nhận đồng ý (Consent Confirmed) từ học viên.");
  }
  item.published = published;
  item.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  saveEvidenceItemAsync(item);
  return true;
}

// Toggle featured
export function toggleEvidenceFeatured(id: string, featured: boolean): boolean {
  const all = getEvidenceList();
  const item = all.find((e) => e.id === id);
  if (!item) return false;
  item.featured = featured;
  item.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  saveEvidenceItemAsync(item);
  return true;
}
