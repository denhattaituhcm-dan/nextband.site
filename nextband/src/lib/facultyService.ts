import { facultyApi, uploadsApi } from "./api";

export interface FacultyProfile {
  id: string;
  name: string;
  role: string;
  avatar_url: string | null;
  ielts_badge: string;
  ielts_badge_sub?: string | null;
  achievements: string[];
  trf_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type FacultyProfileInput = Omit<FacultyProfile, "id" | "created_at" | "updated_at">;

// Fallback seed record if table has not been initialized in environment
export const INITIAL_FACULTY_SEED: FacultyProfile = {
  id: "luu-van-dang",
  name: "Lưu Văn Đang",
  role: "Academic Lead — Phụ trách Chuyên môn ARIS",
  avatar_url: "/teachers/LVD.png",
  ielts_badge: "8.0",
  ielts_badge_sub: "Listening & Reading 8.5",
  achievements: [
    "Tác giả khung năng lực 7 cấp bậc (ARIS-7) & phương pháp đào tạo The ARIS Way",
    "Hơn 5 năm kinh nghiệm giảng dạy & chuẩn hóa tiêu chuẩn chấm chữa trên NextBand",
    "Cử nhân Sư phạm Tiếng Anh, chuyên sâu phương pháp luận khảo thí quốc tế",
  ],
  trf_image_url: "/IELTS CERTIFICATE_LUU_VAN-DANG_page-0001.jpg",
  is_published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

function normalizeRow(row: any): FacultyProfile {
  let achievements: string[] = [];
  if (Array.isArray(row.achievements)) {
    achievements = row.achievements.map((item: any) =>
      typeof item === "string" ? item : item?.text || String(item)
    );
  } else if (typeof row.achievements === "string") {
    try {
      const parsed = JSON.parse(row.achievements);
      if (Array.isArray(parsed)) {
        achievements = parsed.map((item: any) =>
          typeof item === "string" ? item : item?.text || String(item)
        );
      }
    } catch {
      achievements = [row.achievements];
    }
  }

  return {
    id: row.id,
    name: row.name || "Giảng viên ARIS",
    role: row.role || "IELTS Instructor",
    avatar_url: row.avatarUrl || row.avatar_url || null,
    ielts_badge: row.ieltsBadge || row.ielts_badge || "8.0",
    ielts_badge_sub: row.ieltsBadgeSub || row.ielts_badge_sub || null,
    achievements: achievements.length > 0 ? achievements : INITIAL_FACULTY_SEED.achievements,
    trf_image_url: row.trfImageUrl || row.trf_image_url || null,
    is_published: Boolean(row.isPublished ?? row.is_published ?? true),
    created_at: row.createdAt || row.created_at || new Date().toISOString(),
    updated_at: row.updatedAt || row.updated_at || new Date().toISOString(),
  };
}

export const facultyService = {
  /**
   * Fetch all published faculty profiles for the public /teachers page
   */
  async getPublicFaculty(): Promise<FacultyProfile[]> {
    try {
      const data = await facultyApi.getPublic();
      if (data && data.length > 0) {
        return data.map(normalizeRow);
      }
      return [INITIAL_FACULTY_SEED];
    } catch (err) {
      console.warn("[facultyService] Backend query notice, using default seed:", err);
      return [INITIAL_FACULTY_SEED];
    }
  },

  /**
   * Fetch all faculty profiles (including drafts) for Admin
   */
  async getAllFaculty(): Promise<FacultyProfile[]> {
    try {
      const data = await facultyApi.getAll();
      if (data && data.length > 0) {
        return data.map(normalizeRow);
      }
      return [INITIAL_FACULTY_SEED];
    } catch (err) {
      console.warn("[facultyService] Backend admin query notice:", err);
      return [INITIAL_FACULTY_SEED];
    }
  },

  /**
   * Create or update a faculty profile
   */
  async saveFaculty(profile: Partial<FacultyProfile>): Promise<FacultyProfile> {
    const payload = {
      id: profile.id,
      name: profile.name,
      role: profile.role,
      avatarUrl: profile.avatar_url,
      ieltsBadge: profile.ielts_badge || "8.0",
      ieltsBadgeSub: profile.ielts_badge_sub || null,
      achievements: profile.achievements || [],
      trfImageUrl: profile.trf_image_url || null,
      isPublished: profile.is_published ?? true,
    };

    const data = await facultyApi.save(payload);
    return normalizeRow(data);
  },

  /**
   * Delete a faculty profile
   */
  async deleteFaculty(id: string): Promise<boolean> {
    return facultyApi.delete(id);
  },

  /**
   * Quick toggle publish state
   */
  async togglePublished(id: string, is_published: boolean): Promise<boolean> {
    await facultyApi.togglePublish(id, is_published);
    return true;
  },

  /**
   * Upload image asset (avatar or TRF scan) via Fastify REST uploads API
   */
  async uploadAsset(file: File, _folder: "avatars" | "trf"): Promise<string> {
    const uploadRes = await uploadsApi.uploadImage(file);
    return uploadRes.url;
  },
};
