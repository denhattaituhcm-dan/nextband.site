/**
 * Utility for Vietnam Public Holidays & Custom Break Range Checking
 * Pure, deterministic, supports recurring dates and year-specific holiday schedules.
 */

export interface HolidayRange {
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD (inclusive)
}

/**
 * Standard Vietnam Public Holiday Calendar (Configured for common years & official government schedules)
 */
export const OFFICIAL_VIETNAM_HOLIDAYS: HolidayRange[] = [
  // 2025
  { name: "Tết Dương Lịch 2025", startDate: "2025-01-01", endDate: "2025-01-01" },
  { name: "Tết Nguyên Đán 2025", startDate: "2025-01-25", endDate: "2025-02-02" },
  { name: "Giỗ Tổ Hùng Vương 2025", startDate: "2025-04-07", endDate: "2025-04-07" },
  { name: "Giải phóng 30/4 & Quốc tế Lao động 1/5 (2025)", startDate: "2025-04-30", endDate: "2025-05-04" },
  { name: "Quốc Khánh 2/9 (2025)", startDate: "2025-08-30", endDate: "2025-09-02" },

  // 2026
  { name: "Tết Dương Lịch 2026", startDate: "2026-01-01", endDate: "2026-01-01" },
  { name: "Tết Nguyên Đán 2026", startDate: "2026-02-14", endDate: "2026-02-22" },
  { name: "Giỗ Tổ Hùng Vương 2026", startDate: "2026-04-26", endDate: "2026-04-27" },
  { name: "Giải phóng 30/4 & Quốc tế Lao động 1/5 (2026)", startDate: "2026-04-30", endDate: "2026-05-03" },
  { name: "Quốc Khánh 2/9 (2026)", startDate: "2026-08-30", endDate: "2026-09-03" },

  // 2027
  { name: "Tết Dương Lịch 2027", startDate: "2027-01-01", endDate: "2027-01-01" },
  { name: "Tết Nguyên Đán 2027", startDate: "2027-02-05", endDate: "2027-02-14" },
  { name: "Giỗ Tổ Hùng Vương 2027", startDate: "2027-04-16", endDate: "2027-04-16" },
  { name: "Giải phóng 30/4 & Quốc tế Lao động 1/5 (2027)", startDate: "2027-04-30", endDate: "2027-05-03" },
  { name: "Quốc Khánh 2/9 (2027)", startDate: "2027-09-01", endDate: "2027-09-03" },
];

/**
 * Format a Date or date string to YYYY-MM-DD in local/deterministic time
 */
export function formatToDateString(date: Date | string): string {
  if (typeof date === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Checks if a given date falls within any holiday range
 */
export function isHolidayDate(
  date: Date | string,
  customHolidays?: HolidayRange[]
): boolean {
  const targetDateStr = formatToDateString(date);
  const allHolidays = customHolidays && customHolidays.length > 0
    ? [...OFFICIAL_VIETNAM_HOLIDAYS, ...customHolidays]
    : OFFICIAL_VIETNAM_HOLIDAYS;

  for (const h of allHolidays) {
    if (targetDateStr >= h.startDate && targetDateStr <= h.endDate) {
      return true;
    }
  }

  const monthDay = targetDateStr.slice(5); // "MM-DD"
  const fixedRecurring = ["01-01", "04-30", "05-01", "09-02"];
  if (fixedRecurring.includes(monthDay)) {
    return true;
  }

  return false;
}

/**
 * Returns holiday details if date is a holiday, otherwise null
 */
export function getHolidayInfo(
  date: Date | string,
  customHolidays?: HolidayRange[]
): HolidayRange | null {
  const targetDateStr = formatToDateString(date);
  const allHolidays = customHolidays && customHolidays.length > 0
    ? [...OFFICIAL_VIETNAM_HOLIDAYS, ...customHolidays]
    : OFFICIAL_VIETNAM_HOLIDAYS;

  for (const h of allHolidays) {
    if (targetDateStr >= h.startDate && targetDateStr <= h.endDate) {
      return h;
    }
  }

  return null;
}
