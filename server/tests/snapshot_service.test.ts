import { describe, it, expect } from 'vitest';
import { SnapshotService } from '../services/snapshot.service.js';

describe('SnapshotService Unit Tests', () => {
  const service = new SnapshotService({} as any);

  it('generates a valid parentToken with nb_p_ prefix and 16 hex chars', () => {
    const token = service.generateParentToken();
    expect(token).toMatch(/^nb_p_[0-9a-f]{16}$/);
  });

  it('calculates week number correctly from class start date and totalWeeks limit', () => {
    const startDate = new Date('2026-08-01T00:00:00.000Z');
    
    // Day 3 of class -> Week 1
    const d1 = new Date('2026-08-03T00:00:00.000Z');
    expect(service.calculateWeekNumber(startDate, d1, 10)).toBe(1);

    // Day 14 of class (14 days diff) -> Week 2
    const d2 = new Date('2026-08-15T00:00:00.000Z');
    expect(service.calculateWeekNumber(startDate, d2, 10)).toBe(2);

    // Day 16 of class (15 days diff) -> Week 3
    const d2b = new Date('2026-08-16T00:00:00.000Z');
    expect(service.calculateWeekNumber(startDate, d2b, 10)).toBe(3);

    // Way past end -> Capped at totalWeeks (10)
    const d3 = new Date('2026-12-30T00:00:00.000Z');
    expect(service.calculateWeekNumber(startDate, d3, 10)).toBe(10);
  });

  it('calculates Tier 4 scholarship (>= 90%) with 500,000 VND and warning note', () => {
    // 10 out of 10 homeworks completed
    const result = service.calculateScholarshipStanding(10, 10, 100);
    expect(result.tier).toBe('TIER_4');
    expect(result.amount).toBe(500000);
    expect(result.lossAversionNote).toContain('500.000đ');

    // 9 out of 10 homeworks completed (90%)
    const result2 = service.calculateScholarshipStanding(9, 10, 95);
    expect(result2.tier).toBe('TIER_4');
    expect(result2.amount).toBe(500000);
  });

  it('calculates Tier 3 scholarship (80-89%) with 400,000 VND', () => {
    // 8 out of 10 homeworks completed (80% - at exact limit)
    const result = service.calculateScholarshipStanding(8, 10, 92);
    expect(result.tier).toBe('TIER_3');
    expect(result.amount).toBe(400000);
    expect(result.lossAversionNote).toContain('300k');

    // 17 out of 20 homeworks completed (85% - has remaining tolerance)
    const result2 = service.calculateScholarshipStanding(17, 20, 92);
    expect(result2.tier).toBe('TIER_3');
    expect(result2.lossAversionNote).toContain('400.000đ');
  });

  it('calculates Tier 2 scholarship (70-79%) with 300,000 VND', () => {
    const result = service.calculateScholarshipStanding(7, 10, 90);
    expect(result.tier).toBe('TIER_2');
    expect(result.amount).toBe(300000);
  });

  it('calculates Tier 1 scholarship (50-69%) with 200,000 VND', () => {
    const result = service.calculateScholarshipStanding(5, 10, 90);
    expect(result.tier).toBe('TIER_1');
    expect(result.amount).toBe(200000);
  });

  it('denies scholarship if completion rate < 50%', () => {
    const result = service.calculateScholarshipStanding(4, 10, 100);
    expect(result.tier).toBe('NONE');
    expect(result.amount).toBe(0);
    expect(result.lossAversionNote).toContain('Cần đạt tối thiểu 50%');
  });

  it('denies scholarship if attendance < 90% even with 100% homework completion', () => {
    const result = service.calculateScholarshipStanding(10, 10, 85);
    expect(result.tier).toBe('NONE');
    expect(result.amount).toBe(0);
  });
});
