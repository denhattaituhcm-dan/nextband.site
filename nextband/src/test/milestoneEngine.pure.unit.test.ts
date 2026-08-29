import { describe, it, expect } from "vitest";
import {
  evaluateAllAchievedMilestones,
  selectHighestPriorityPendingMilestone,
  CourseLessonItem,
} from "../lib/milestoneEngine";

describe("Milestone Celebration Engine - 15 Invariant Test Matrix", () => {
  const courseId = "course-starter-27";

  function createRegularCourse(totalWeeks: number): CourseLessonItem[] {
    const items: CourseLessonItem[] = [];
    for (let w = 1; w <= totalWeeks; w++) {
      for (let d = 1; d <= 3; d++) {
        items.push({
          id: `exam-w${w}-d${d}`,
          title: `Week ${w} - Day ${d}`,
          semanticType: "REGULAR",
          weekGroup: w,
          orderInWeek: d,
          isCompleted: false,
        });
      }
    }
    return items;
  }

  // 1. 3 bài hoàn thành đúng tuần -> Micro Week 1
  it("Test 1: 3 completed lessons in Week 1 triggers MICRO_WEEK_1_CLEARED", () => {
    const lessons = createRegularCourse(9);
    lessons[0].isCompleted = true;
    lessons[1].isCompleted = true;
    lessons[2].isCompleted = true; // Week 1 fully completed

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const week1 = milestones.find((m) => m.key === `MICRO_WEEK_1_CLEARED_${courseId}`);
    expect(week1).toBeDefined();
    expect(week1?.tier).toBe("MICRO");
    expect(week1?.stats.weekCompleted).toBe(1);
  });

  // 2. 27/27 bài hoàn thành -> EPIC_GRADUATION
  it("Test 2: 27/27 regular lessons completed triggers EPIC_GRADUATION", () => {
    const lessons = createRegularCourse(9);
    lessons.forEach((l) => (l.isCompleted = true));

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const epic = milestones.find((m) => m.key === `EPIC_GRADUATION_${courseId}`);
    expect(epic).toBeDefined();
    expect(epic?.tier).toBe("EPIC");
  });

  // 3. 28 bài với Final Test (27 Regular + 1 Final Test)
  it("Test 3: 28 lessons with Final Test triggers EPIC only when Final Test is completed", () => {
    const lessons = createRegularCourse(9);
    lessons.push({
      id: "exam-final-test",
      title: "FINAL TEST - TỔNG DUYỆT TỐI HẬU",
      semanticType: "FINAL_TEST",
      weekGroup: 9,
      orderInWeek: 4,
      isCompleted: false,
    });

    // Complete all 27 regular
    for (let i = 0; i < 27; i++) lessons[i].isCompleted = true;

    let milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    let epic = milestones.find((m) => m.key === `EPIC_GRADUATION_${courseId}`);
    expect(epic).toBeUndefined(); // Final test not completed yet!

    // Complete final test
    lessons[27].isCompleted = true;
    milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    epic = milestones.find((m) => m.key === `EPIC_GRADUATION_${courseId}`);
    expect(epic).toBeDefined();
    expect(epic?.tier).toBe("EPIC");
  });

  // 4. 28 bài với Bonus (27 Regular + 1 Bonus)
  it("Test 4: 28 lessons with Bonus does NOT turn Bonus into EPIC falsely", () => {
    const lessons = createRegularCourse(9);
    lessons.push({
      id: "exam-bonus-writing",
      title: "BONUS - Bài tập làm thêm Writing Task 2",
      semanticType: "BONUS",
      weekGroup: 5,
      orderInWeek: 4,
      isCompleted: true,
    });

    // Only completed 5 lessons
    lessons[0].isCompleted = true;
    lessons[1].isCompleted = true;

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const epic = milestones.find((m) => m.key === `EPIC_GRADUATION_${courseId}`);
    expect(epic).toBeUndefined(); // Must NOT trigger EPIC
  });

  // 5. 30/30 bài hoàn thành (Leader 10 tuần x 3 bài)
  it("Test 5: 30/30 lessons in 10-week course triggers Week 10 and EPIC", () => {
    const leaderCourseId = "course-leader-30";
    const lessons = createRegularCourse(10); // 30 lessons
    lessons.forEach((l) => (l.isCompleted = true));

    const milestones = evaluateAllAchievedMilestones({ courseId: leaderCourseId, lessons });
    const week10 = milestones.find((m) => m.key === `MICRO_WEEK_10_CLEARED_${leaderCourseId}`);
    const epic = milestones.find((m) => m.key === `EPIC_GRADUATION_${leaderCourseId}`);

    expect(week10).toBeDefined();
    expect(epic).toBeDefined();
  });

  // 6. Bonus giữa khóa không làm lệch cấu trúc tuần
  it("Test 6: Bonus in mid-course does not distort Week 4 requirements", () => {
    const lessons = createRegularCourse(9);
    lessons.splice(9, 0, {
      id: "exam-bonus-mid",
      title: "BONUS SPEAKING 1",
      semanticType: "BONUS",
      weekGroup: 3,
      orderInWeek: 4,
      isCompleted: true,
    });

    // Week 4 has 3 regular lessons (index 10, 11, 12)
    lessons[10].isCompleted = true;
    lessons[11].isCompleted = true;
    // lessons[12] is not completed!

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const week4 = milestones.find((m) => m.key === `MICRO_WEEK_4_CLEARED_${courseId}`);
    expect(week4).toBeUndefined(); // Still missing lesson 3 of week 4
  });

  // 7 & 8. Deduplication with claimedKeys set
  it("Test 7 & 8: Already claimed milestone is filtered out", () => {
    const lessons = createRegularCourse(9);
    lessons[0].isCompleted = true;
    lessons[1].isCompleted = true;
    lessons[2].isCompleted = true;

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const claimedKeys = new Set([`MICRO_WEEK_1_CLEARED_${courseId}`]);

    const pending = selectHighestPriorityPendingMilestone(milestones, claimedKeys);
    expect(pending).toBeNull(); // Already claimed, suppress modal!
  });

  // 9. Multi-device consistency (Priority ordering: EPIC > MACRO > MICRO)
  it("Test 9: Priority ordering selects EPIC over MACRO and MICRO", () => {
    const lessons = createRegularCourse(9);
    lessons.forEach((l) => (l.isCompleted = true));

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const claimedKeys = new Set<string>(); // Clean new device

    const pending = selectHighestPriorityPendingMilestone(milestones, claimedKeys);
    expect(pending?.tier).toBe("EPIC"); // Must present EPIC first
  });

  // 10. Dashboard Recovery Flow
  it("Test 10: Dashboard recovery captures unclaimed week milestone", () => {
    const lessons = createRegularCourse(9);
    // Student completed week 1 and week 2
    for (let i = 0; i < 6; i++) lessons[i].isCompleted = true;

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const claimedKeys = new Set([`MICRO_WEEK_1_CLEARED_${courseId}`]); // Week 1 claimed, Week 2 pending

    const pending = selectHighestPriorityPendingMilestone(milestones, claimedKeys);
    expect(pending?.key).toBe(`MICRO_WEEK_2_CLEARED_${courseId}`);
  });

  // 11. Partial course does not generate false EPIC
  it("Test 15: Course with only 10/27 completed NEVER generates EPIC", () => {
    const lessons = createRegularCourse(9);
    for (let i = 0; i < 10; i++) lessons[i].isCompleted = true;

    const milestones = evaluateAllAchievedMilestones({ courseId, lessons });
    const epic = milestones.find((m) => m.tier === "EPIC");
    expect(epic).toBeUndefined();
  });
});
