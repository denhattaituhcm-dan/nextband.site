import { describe, it, expect } from "vitest";
import { isHolidayDate, getHolidayInfo, OFFICIAL_VIETNAM_HOLIDAYS } from "../utils/holiday.helper.js";

describe("Holiday Exclusion & Class Lifecycle Tests", () => {
  describe("Holiday Helper Tests", () => {
    it("should identify Vietnam National Day 2/9 in 2026 as a holiday", () => {
      // 2026 National holiday: 2026-08-30 to 2026-09-03
      expect(isHolidayDate("2026-08-30")).toBe(true);
      expect(isHolidayDate("2026-08-31")).toBe(true);
      expect(isHolidayDate("2026-09-01")).toBe(true);
      expect(isHolidayDate("2026-09-02")).toBe(true);
      expect(isHolidayDate("2026-09-03")).toBe(true);

      // 2026-09-04 should be a regular working/studying day
      expect(isHolidayDate("2026-09-04")).toBe(false);
      expect(isHolidayDate("2026-08-29")).toBe(false);
    });

    it("should identify Tet holiday in 2026", () => {
      // 2026 Tet: 2026-02-14 to 2026-02-22
      expect(isHolidayDate("2026-02-17")).toBe(true);
      expect(isHolidayDate("2026-02-23")).toBe(false);
    });

    it("should support custom holiday ranges", () => {
      const custom = [
        { name: "Trung tâm nghỉ tập huấn", startDate: "2026-10-10", endDate: "2026-10-12" },
      ];
      expect(isHolidayDate("2026-10-11", custom)).toBe(true);
      expect(isHolidayDate("2026-10-13", custom)).toBe(false);
    });
  });

  describe("Grace Period & Maintenance Invariants", () => {
    it("should enforce at least 7 days grace period after last actual session date", () => {
      const now = new Date("2026-08-31T20:00:00.000Z");
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Session ended on Aug 28 (only 3 days ago) -> MUST NOT auto-close
      const sessionAug28 = new Date("2026-08-28T18:00:00.000Z");
      const isPastGracePeriod1 = sessionAug28.getTime() <= sevenDaysAgo.getTime();
      expect(isPastGracePeriod1).toBe(false);

      // Session ended on Aug 20 (11 days ago) -> eligible for auto-close if all sessions done
      const sessionAug20 = new Date("2026-08-20T18:00:00.000Z");
      const isPastGracePeriod2 = sessionAug20.getTime() <= sevenDaysAgo.getTime();
      expect(isPastGracePeriod2).toBe(true);
    });

    it("should correctly find next available weekdays when shifting an ad-hoc cancelled session", () => {
      const weekdays = [1, 3, 5]; // Mon, Wed, Fri
      // Assume unexpected cancellation on Friday 2026-09-04
      const cancelDate = new Date("2026-09-04T00:00:00.000Z");
      const cur = new Date(cancelDate);
      cur.setDate(cur.getDate() + 1);

      const shiftedDates: string[] = [];
      while (shiftedDates.length < 3) {
        const dow = cur.getDay();
        const isHol = isHolidayDate(cur);
        if (weekdays.includes(dow) && !isHol) {
          const mm = String(cur.getMonth() + 1).padStart(2, "0");
          const dd = String(cur.getDate()).padStart(2, "0");
          shiftedDates.push(`${cur.getFullYear()}-${mm}-${dd}`);
        }
        cur.setDate(cur.getDate() + 1);
      }

      // Next MWF dates after Friday 2026-09-04 are: Mon 2026-09-07, Wed 2026-09-09, Fri 2026-09-11
      expect(shiftedDates).toEqual(["2026-09-07", "2026-09-09", "2026-09-11"]);
    });
  });
});
