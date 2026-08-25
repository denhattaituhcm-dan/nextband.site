import { describe, it, expect } from "vitest";
import {
  parseWeekAndDay,
  compareHomeworkOrder,
  sortStudentActionQueue,
} from "@/lib/homeworkStatusHelper";

describe("Homework & Exam Pedagogical Natural Ordering Tests", () => {
  it("Gate 1: Correctly parses Week and Day from standard title patterns", () => {
    expect(parseWeekAndDay("WEEK 1 - DAY 1 - WRITING")).toEqual({ week: 1, day: 1 });
    expect(parseWeekAndDay("WEEK 1 - DAY 2 - READING & LISTENING")).toEqual({ week: 1, day: 2 });
    expect(parseWeekAndDay("WEEK 1 - DAY 3 - SPEAKING")).toEqual({ week: 1, day: 3 });
    expect(parseWeekAndDay("WEEK 2 - DAY 1 - WRITING")).toEqual({ week: 2, day: 1 });
    expect(parseWeekAndDay("WEEK 10 - DAY 3 - FINAL")).toEqual({ week: 10, day: 3 });
  });

  it("Gate 2: Correctly parses shorthand titles (W1 - D1, D9 - D2, DAY 1)", () => {
    expect(parseWeekAndDay("W1 - D1 - WRI")).toEqual({ week: 1, day: 1 });
    expect(parseWeekAndDay("W1 - D2 - LIS")).toEqual({ week: 1, day: 2 });
    expect(parseWeekAndDay("W1 - D3 - SPK")).toEqual({ week: 1, day: 3 });
    expect(parseWeekAndDay("D9 - D2", 9)).toEqual({ week: 9, day: 2 });
    expect(parseWeekAndDay("DAY 1 - WRITING", 1)).toEqual({ week: 1, day: 1 });
    expect(parseWeekAndDay("DAY 3 - SPEAKING", 1)).toEqual({ week: 1, day: 3 });
  });

  it("Gate 3: Sorts exams sequentially by Week 1, 2, 3... and Day 1, 2, 3...", () => {
    const rawList = [
      { id: "3", title: "WEEK 1 - DAY 3 - SPEAKING", week: 1 },
      { id: "2", title: "WEEK 1 - DAY 2 - READING & LISTENING", week: 1 },
      { id: "1", title: "WEEK 1 - DAY 1 - WRITING", week: 1 },
      { id: "6", title: "WEEK 2 - DAY 3 - SPEAKING", week: 2 },
      { id: "4", title: "WEEK 2 - DAY 1 - WRITING", week: 2 },
      { id: "5", title: "WEEK 2 - DAY 2 - READING & LISTENING", week: 2 },
      { id: "final", title: "FINAL TEST", week: 10 },
      { id: "extra", title: "EXTRA READING", week: 10 },
    ];

    const sorted = [...rawList].sort(compareHomeworkOrder);
    const expectedIds = ["1", "2", "3", "4", "5", "6", "extra", "final"];

    expect(sorted.map((item) => item.id)).toEqual(expectedIds);
  });

  it("Gate 4: sortStudentActionQueue prioritizes pedagogical state, then natural week/day order", () => {
    const now = new Date("2026-08-25T12:00:00.000Z").getTime();

    const mockHomeworks = [
      { id: "w1-d3", title: "WEEK 1 - DAY 3 - SPEAKING", status: "UPCOMING", deadline: "2026-09-05T23:59:59.000Z", week: 1 },
      { id: "w1-d2", title: "WEEK 1 - DAY 2 - READING & LISTENING", status: "UPCOMING", deadline: "2026-09-05T23:59:59.000Z", week: 1 },
      { id: "w1-d1", title: "WEEK 1 - DAY 1 - WRITING", status: "UPCOMING", deadline: "2026-09-05T23:59:59.000Z", week: 1 },
      { id: "w2-d1", title: "WEEK 2 - DAY 1 - WRITING", status: "UPCOMING", deadline: "2026-09-12T23:59:59.000Z", week: 2 },
    ];

    const queue = sortStudentActionQueue(mockHomeworks, now);
    expect(queue.map((item) => item.id)).toEqual(["w1-d1", "w1-d2", "w1-d3", "w2-d1"]);
  });
});
