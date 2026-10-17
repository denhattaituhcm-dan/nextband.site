import { supabase } from "../../supabase";

// Teacher Profile types
export interface AvailabilitySlot {
  dayOfWeek: number; // 1=Mon, 2=Tue, ..., 7=Sun
  startTime: string; // "18:00"
  endTime: string;   // "21:30"
}

export interface TeacherClassItem {
  id: string;
  name: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  studentCount: number;
}

export interface TeacherProfileData {
  id?: string;
  userId?: string;
  ieltsOverall?: number | null;
  ieltsL?: number | null;
  ieltsR?: number | null;
  ieltsW?: number | null;
  ieltsS?: number | null;
  ieltsTestedAt?: string | null;
  yearsTeachingIelts?: number | null;
  yearsTeachingEnglish?: number | null;
  certificates?: string[];
  educationLevel?: string | null;
  teachableLevels?: string[];
  strongSkills?: string[];
  strengths?: string[];
  developmentAreas?: string[];
  internalNotes?: string | null;
  availabilitySlots?: AvailabilitySlot[] | null;
  maxClassesPerWeek?: number | null;
  maxHoursPerWeek?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export const teacherProfileApi = {
  /**
   * Lấy hồ sơ năng lực của giáo viên (profile + currentClasses + workload).
   */
  get: async (userId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const res = await fetch(`/api/teacher-profile/${userId}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || err?.message || "Không thể tải hồ sơ giáo viên");
    }

    return res.json() as Promise<{
      profile: TeacherProfileData | null;
      currentClasses: TeacherClassItem[];
      workload: {
        currentClasses: number;
        maxClasses: number | null;
        maxHours: number | null;
        capacityStatus: "available" | "nearFull" | "full" | "unknown";
      };
    }>;
  },

  /**
   * Upsert hồ sơ năng lực (admin only).
   */
  upsert: async (userId: string, data: Partial<TeacherProfileData>) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const res = await fetch(`/api/teacher-profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || err?.message || "Không thể cập nhật hồ sơ giáo viên");
    }

    return res.json();
  },
};
