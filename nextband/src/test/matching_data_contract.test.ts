import { describe, it, expect } from "vitest";
import {
  parseMatchingData,
  convertOptionValToIndex,
} from "@/components/exam/MatchingRenderer";

describe("Matching Data Contract - Frontend Lifecycle & Sanitization", () => {
  const mockCanonicalStudentQuestion = {
    id: "q-matching-minhanh",
    questionType: "matching",
    questionText: "Which feature is related to each of the following areas of the world represented in the playground?",
    options: {
      items: [
        "Asia",
        "Antarctica",
        "South America",
        "North America",
        "Europe",
        "Africa",
      ],
      options: [
        "ancient forts",
        "waterways",
        "ice and snow",
        "jewels",
        "local animals",
        "mountains",
      ],
    },
    // correctAnswer is omitted from Student DTO
    points: 6,
  };

  it("1. parseMatchingData correctly parses Canonical Student DTO without correctAnswer", () => {
    const data = parseMatchingData(mockCanonicalStudentQuestion);

    expect(data.items).toHaveLength(6);
    expect(data.options).toHaveLength(6);
    expect(data.items[0].text).toBe("Asia");
    expect(data.items[5].text).toBe("Africa");
    expect(data.options[0].text).toBe("ancient forts");
    expect(data.options[0].label).toBe("A");
    expect(data.options[4].text).toBe("local animals");
    expect(data.options[4].label).toBe("E");
    // Student DTO must have no pairs
    expect(Object.keys(data.pairs)).toHaveLength(0);
  });

  it("2. parseMatchingData gracefully handles stringified options JSON", () => {
    const stringifiedQuestion = {
      ...mockCanonicalStudentQuestion,
      options: JSON.stringify(mockCanonicalStudentQuestion.options),
    };

    const data = parseMatchingData(stringifiedQuestion);
    expect(data.items).toHaveLength(6);
    expect(data.options).toHaveLength(6);
  });

  it("3. parseMatchingData parses Admin Preview question with correctAnswer", () => {
    const adminQuestion = {
      id: "q-admin-preview",
      questionType: "matching",
      questionText: "Which feature is related...",
      options: null,
      correctAnswer: JSON.stringify({
        items: ["Asia", "Antarctica"],
        options: ["ancient forts", "waterways"],
        pairs: { "0": "A", "1": "B" },
      }),
      points: 2,
    };

    const data = parseMatchingData(adminQuestion);
    expect(data.items).toHaveLength(2);
    expect(data.options).toHaveLength(2);
    expect(data.pairs["0"]).toBe(0); // "A" -> 0
    expect(data.pairs["1"]).toBe(1); // "B" -> 1
  });

  it("4. convertOptionValToIndex converts letters, numbers, and strings accurately", () => {
    expect(convertOptionValToIndex(4)).toBe(4);
    expect(convertOptionValToIndex("4")).toBe(4);
    expect(convertOptionValToIndex("E")).toBe(4);
    expect(convertOptionValToIndex("e")).toBe(4);
    expect(convertOptionValToIndex("A")).toBe(0);
    expect(convertOptionValToIndex("F")).toBe(5);
    expect(convertOptionValToIndex(null)).toBeNull();
    expect(convertOptionValToIndex(undefined)).toBeNull();
  });

  it("5. Teacher Review normalization logic verifies student answer 4 matches correct answer 'E'", () => {
    const studentAnswerRaw: Record<string, any> = { "0": 4, "1": 2, "2": 3, "3": 1, "4": 5, "5": 0 };
    const correctPairsRaw: Record<string, any> = { "0": "E", "1": "C", "2": "D", "3": "B", "4": "F", "5": "A" };

    const items = [
      "Asia",
      "Antarctica",
      "South America",
      "North America",
      "Europe",
      "Africa",
    ];

    items.forEach((_, idx) => {
      const studentOpt = studentAnswerRaw[String(idx)];
      const correctOpt = correctPairsRaw[String(idx)];

      const studentIdx = convertOptionValToIndex(studentOpt);
      const correctIdx = convertOptionValToIndex(correctOpt);

      expect(studentIdx).not.toBeNull();
      expect(correctIdx).not.toBeNull();
      expect(studentIdx).toBe(correctIdx);

      const studentLabel = String.fromCharCode(65 + studentIdx!);
      const correctLabel = String.fromCharCode(65 + correctIdx!);
      expect(studentLabel).toBe(correctLabel);
    });
  });

  it("6. Sub-question pagination split logic calculates all 6 sub-questions from options.items", () => {
    const list: any[] = [];
    let displayCursor = 0;

    const q = mockCanonicalStudentQuestion;

    if (q.questionType === "matching") {
      let itemsList: string[] = [];
      if (q.options && typeof q.options === "object" && Array.isArray(q.options.items)) {
        itemsList = q.options.items;
      }

      if (itemsList.length > 0) {
        itemsList.forEach((_, idx) => {
          displayCursor += 1;
          list.push({
            ...q,
            isSubQuestion: true,
            subIndex: String(idx),
            displayNumber: displayCursor,
            displayLabel: String(displayCursor),
          });
        });
      }
    }

    expect(list).toHaveLength(6);
    expect(list[0].displayNumber).toBe(1);
    expect(list[5].displayNumber).toBe(6);
  });

  it("7. parseMatchingData gracefully handles legacy empty string array options: ['', '', '', ''] by falling back to correctAnswer", () => {
    const legacyEmptyArrayQuestion = {
      id: "q-legacy-empty-array",
      questionType: "matching",
      questionText: "Which feature is related to each of the following areas of the world represented in the playground?",
      options: ["", "", "", ""],
      correctAnswer: JSON.stringify({
        items: ["Asia", "Antarctica", "South America", "North America", "Europe", "Africa"],
        options: ["ancient forts", "waterways", "ice and snow", "jewels", "local animals", "mountains", "music and film", "space travel", "volcanoes"],
        pairs: { "0": "A", "1": "C", "2": "C", "3": "A", "4": "B", "5": "A" }
      }),
      points: 6,
    };

    const data = parseMatchingData(legacyEmptyArrayQuestion);
    expect(data.items).toHaveLength(6);
    expect(data.options).toHaveLength(9);
    expect(data.items[0].text).toBe("Asia");
    expect(data.options[0].text).toBe("ancient forts");
    expect(data.options[0].label).toBe("A");
    expect(data.options[8].text).toBe("volcanoes");
    expect(data.options[8].label).toBe("I");
    expect(data.pairs["0"]).toBe(0); // "A" -> 0
    expect(data.pairs["1"]).toBe(2); // "C" -> 2
  });
});
