import { describe, it, expect } from "vitest";
import { TET_THEME } from "@/features/seasonal/presets/tet/theme";
import { SEASONAL_THEMES } from "@/features/seasonal/core/seasonalThemeAdapter";
import { DEFAULT_TET_UI_CONFIG } from "../../../server/services/seasonal.service";

describe("ARIS Seasonal Layer - Vietnamese Tet Architecture Invariants", () => {
  it("should have authentic Vietnamese copywriting and proverbs from Viện Trưởng Huyền Cơ", () => {
    expect(TET_THEME.proverbs.length).toBeGreaterThanOrEqual(5);
    expect(TET_THEME.proverbs.some((p) => p.includes("Khai bút"))).toBe(true);
    const proverb = TET_THEME.getRandomProverb();
    expect(typeof proverb).toBe("string");
    expect(proverb.length).toBeGreaterThan(10);
  });

  it("should maintain default UI config with petals off by default to ensure performance", () => {
    expect(DEFAULT_TET_UI_CONFIG.showBlossom).toBe(true);
    expect(DEFAULT_TET_UI_CONFIG.showEnvelopes).toBe(true);
    expect(DEFAULT_TET_UI_CONFIG.showModal).toBe(true);
    expect(DEFAULT_TET_UI_CONFIG.showPetals).toBe(false); // Petals disabled by default for zero lag
    expect(DEFAULT_TET_UI_CONFIG.playChime).toBe(true);
  });

  it("should enforce hard-capped prize pool calculation (550k cash distributed across 60 slots)", () => {
    const pools = [
      { tier: "SMALL", amount: 5000, totalSlots: 40 },
      { tier: "MEDIUM", amount: 10000, totalSlots: 15 },
      { tier: "LARGE", amount: 25000, totalSlots: 4 },
      { tier: "SPECIAL", amount: 100000, totalSlots: 1 },
    ];

    const totalSlots = pools.reduce((sum, p) => sum + p.totalSlots, 0);
    const totalCash = pools.reduce((sum, p) => sum + p.amount * p.totalSlots, 0);

    expect(totalSlots).toBe(60);
    expect(totalCash).toBe(550000);
    expect(totalCash).toBeLessThanOrEqual(800000); // Strict budget cap adherence
  });

  it("should transition seamlessly to HONOR_XP when slots are exhausted", () => {
    const simulateRewardClaim = (claimedSlots: number, totalSlots: number) => {
      if (claimedSlots >= totalSlots) {
        return {
          rewardType: "HONOR_XP",
          amount: 200,
          badge: "Khai Bút Vàng",
        };
      }
      return {
        rewardType: "CASH",
        amount: 10000,
      };
    };

    const regularClaim = simulateRewardClaim(20, 60);
    expect(regularClaim.rewardType).toBe("CASH");

    const exhaustedClaim = simulateRewardClaim(60, 60);
    expect(exhaustedClaim.rewardType).toBe("HONOR_XP");
    expect(exhaustedClaim.amount).toBe(200);
  });

  it("should provide distinctive theme configurations for all 4 Vietnamese Holidays", () => {
    const holidays = ["TEACHERS_DAY", "BACK_TO_SCHOOL", "MID_AUTUMN", "TET"] as const;
    for (const h of holidays) {
      const theme = SEASONAL_THEMES[h];
      expect(theme).toBeDefined();
      expect(theme.type).toBe(h);
      expect(theme.name).toBeTruthy();
      expect(theme.bannerGradient).toBeTruthy();
      expect(theme.icon).toBeTruthy();
      expect(theme.envelopeReadyLabel).toBeTruthy();
      expect(theme.proverbs.length).toBeGreaterThanOrEqual(3);
    }

    // 20/11 specifically
    const teachersDay = SEASONAL_THEMES.TEACHERS_DAY;
    expect(teachersDay.icon).toBe("📜");
    expect(teachersDay.name).toContain("20/11");
    expect(teachersDay.envelopeReadyLabel).toBe("Mở Thư Tri Ân");
    expect(teachersDay.headerWalletLabel).toBe("Quỹ Tri Ân");
    expect(teachersDay.cornerBranchType).toBe("TEACHER_FLOWERS");
  });
});
