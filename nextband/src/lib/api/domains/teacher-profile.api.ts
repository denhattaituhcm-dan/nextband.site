import { API_BASE_URL, authenticatedFetch, handleApiResponse } from "../client";

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
    const res = await authenticatedFetch(`${API_BASE_URL}/teacher-profile/${userId}`);
    return handleApiResponse<{
      profile: TeacherProfileData | null;
      currentClasses: TeacherClassItem[];
      workload: {
        currentClasses: number;
        maxClasses: number | null;
        maxHours: number | null;
        capacityStatus: "available" | "nearFull" | "full" | "unknown";
      };
    }>(res, "Không thể tải hồ sơ giáo viên");
  },

  /**
   * Upsert hồ sơ năng lực (admin only).
   */
  upsert: async (userId: string, data: Partial<TeacherProfileData>) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/teacher-profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return handleApiResponse(res, "Không thể cập nhật hồ sơ giáo viên");
  },
};
