import { describe, it, expect, vi } from "vitest";
import { calculateDateRange, PeriodicReportService } from "../services/periodic-report.service.js";

describe("PeriodicReportService - Date Range & Calculations", () => {
  it("calculates exact date range for full year 2026", () => {
    const { startDate, endDate } = calculateDateRange({
      periodType: "YEAR",
      year: 2026,
    });

    expect(startDate.getFullYear()).toBe(2026);
    expect(startDate.getMonth()).toBe(0); // January
    expect(startDate.getDate()).toBe(1);

    expect(endDate.getFullYear()).toBe(2026);
    expect(endDate.getMonth()).toBe(11); // December
    expect(endDate.getDate()).toBe(31);
  });

  it("calculates exact date range for Quarter 3 (July - September)", () => {
    const { startDate, endDate } = calculateDateRange({
      periodType: "QUARTER",
      year: 2026,
      quarter: 3,
    });

    expect(startDate.getMonth()).toBe(6); // July (0-indexed: 6)
    expect(startDate.getDate()).toBe(1);

    expect(endDate.getMonth()).toBe(8); // September (0-indexed: 8)
    expect(endDate.getDate()).toBe(30);
  });

  it("calculates exact date range for Month 8 (August)", () => {
    const { startDate, endDate } = calculateDateRange({
      periodType: "MONTH",
      year: 2026,
      month: 8,
    });

    expect(startDate.getMonth()).toBe(7); // August (0-indexed: 7)
    expect(startDate.getDate()).toBe(1);

    expect(endDate.getMonth()).toBe(7);
    expect(endDate.getDate()).toBe(31);
  });

  it("calculates exact date range for CUSTOM academic year (2025-09-01 to 2026-08-31)", () => {
    const { startDate, endDate } = calculateDateRange({
      periodType: "CUSTOM",
      startDate: "2025-09-01",
      endDate: "2026-08-31",
    });

    expect(startDate.getFullYear()).toBe(2025);
    expect(startDate.getMonth()).toBe(8); // September
    expect(startDate.getDate()).toBe(1);

    expect(endDate.getFullYear()).toBe(2026);
    expect(endDate.getMonth()).toBe(7); // August
    expect(endDate.getDate()).toBe(31);
  });

  it("aggregates report correctly and formats executive summary text", async () => {
    const mockPrisma: any = {
      branch: {
        findUnique: vi.fn().mockResolvedValue({ name: "Cơ sở Quận 1" }),
        findMany: vi.fn().mockResolvedValue([
          {
            id: "b-1",
            code: "CS1",
            name: "Cơ sở Quận 1",
            address: "123 Đường A",
            rooms: [{ id: "r-1", name: "Room 101", capacity: 20 }],
            classes: [
              {
                id: "c-1",
                _count: { students: 15 },
              },
            ],
          },
        ]),
      },
      contactLead: {
        count: vi.fn().mockResolvedValueOnce(50) // newLeads
          .mockResolvedValueOnce(18), // enrolled
        findMany: vi.fn().mockResolvedValue([
          { source: "Facebook", status: "ENROLLED", convertedUserId: "u-1" },
          { source: "Facebook", status: "NEW", convertedUserId: null },
          { source: "Referral", status: "ENROLLED", convertedUserId: "u-2" },
        ]),
      },
      assessmentSession: {
        count: vi.fn().mockResolvedValue(30),
      },
      class: {
        count: vi.fn().mockResolvedValueOnce(10) // opened
          .mockResolvedValueOnce(8) // completed
          .mockResolvedValueOnce(4), // running
        findMany: vi.fn().mockResolvedValue([
          { _count: { students: 12 } },
          { _count: { students: 16 } },
        ]),
      },
      classStudent: {
        count: vi.fn().mockResolvedValueOnce(25) // newEnrollments
          .mockResolvedValueOnce(20) // activeStudents
          .mockResolvedValueOnce(15) // graduated
          .mockResolvedValueOnce(2) // reserved
          .mockResolvedValueOnce(1), // dropped
      },
      user: {
        count: vi.fn().mockResolvedValueOnce(6) // startTeachers
          .mockResolvedValueOnce(3) // newTeachers
          .mockResolvedValueOnce(1) // resignedTeachers
          .mockResolvedValueOnce(8), // endTeachers
      },
      classSession: {
        count: vi.fn().mockResolvedValue(120),
      },
      classAttendance: {
        findMany: vi.fn().mockResolvedValue([
          { status: "PRESENT" },
          { status: "PRESENT" },
          { status: "ABSENT" },
        ]),
      },
      exam: {
        count: vi.fn().mockResolvedValue(40),
      },
      examSubmission: {
        count: vi.fn().mockResolvedValue(35),
      },
    };

    const service = new PeriodicReportService(mockPrisma);
    const result = await service.generateReport({
      periodType: "YEAR",
      year: 2026,
      branchId: "ALL",
    });

    expect(result.period.type).toBe("YEAR");
    expect(result.admissions.newLeads).toBe(50);
    expect(result.admissions.enrolled).toBe(18);
    expect(result.admissions.conversionRate).toBe(36);
    expect(result.admissions.bySource.length).toBe(2);

    expect(result.classes.opened).toBe(10);
    expect(result.classes.completed).toBe(8);
    expect(result.classes.avgClassSize).toBe(14);

    expect(result.students.newEnrollments).toBe(25);
    expect(result.students.activeAtEnd).toBe(20);
    expect(result.students.graduated).toBe(15);

    expect(result.teachers.startOfPeriod).toBe(6);
    expect(result.teachers.newlyRecruited).toBe(3);
    expect(result.teachers.resigned).toBe(1);
    expect(result.teachers.endOfPeriod).toBe(8);

    expect(result.academic.totalSessions).toBe(120);
    expect(result.academic.totalAttendances).toBe(3);
    expect(result.academic.attendanceRate).toBe(66.7);

    // Summary text must contain key sections
    expect(result.summaryText).toContain("BÁO CÁO TỔNG KẾT KẾT QUẢ HOẠT ĐỘNG NĂM 2026");
    expect(result.summaryText).toContain("1. Quy mô & Đào tạo:");
    expect(result.summaryText).toContain("2. Tuyển sinh & Phát triển:");
    expect(result.summaryText).toContain("3. Đội ngũ Giảng viên:");
    expect(result.summaryText).toContain("4. Hoạt động Học thuật:");
  });

  it("successfully generates report on actual PostgreSQL database without throwing", async () => {
    const { isTestDatabaseConfigured, createSafeTestPrismaClient } = await import("./testDbGuard.js");
    if (!isTestDatabaseConfigured()) {
      console.warn("ℹ️  [SRE P0] Skipping real DB test in periodic_reports.test.ts (no dedicated test DB configured).");
      return;
    }
    const prisma = createSafeTestPrismaClient();
    const service = new PeriodicReportService(prisma);


    try {
      const realReport = await service.generateReport({
        periodType: "YEAR",
        year: 2026,
        branchId: "ALL",
      });

      expect(realReport).toBeDefined();
      expect(realReport.period.year).toBe(2026);
      expect(realReport.classes.runningAtEnd).toBeGreaterThanOrEqual(0);
      expect(realReport.students.activeAtEnd).toBeGreaterThanOrEqual(0);
      expect(realReport.summaryText).toBeDefined();
    } finally {
      await prisma.$disconnect();
    }
  }, 40000);
});
