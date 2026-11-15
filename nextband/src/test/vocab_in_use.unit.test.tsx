import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VocabInUsePage from "../pages/public/vocab-in-use/VocabInUsePage";
import { VOCAB_IN_USE_UNITS, getVocabInUseUnit } from "../data/vocabInUse";

describe("📚 Vocabulary in Use (C1-C2 Studio) — Data & Interactive UI", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Validates complete data integrity across Units 1, 2, and 3", () => {
    expect(VOCAB_IN_USE_UNITS).toHaveLength(3);

    for (const unit of VOCAB_IN_USE_UNITS) {
      expect(unit.passageParagraphs.length).toBeGreaterThanOrEqual(2);
      expect(unit.lexicon.length).toBeGreaterThanOrEqual(15);
      expect(unit.theorySections.length).toBeGreaterThanOrEqual(2);
      expect(unit.exercises.length).toBeGreaterThanOrEqual(3);

      // Every clickable token in the passage must resolve to an entry in unit.lexicon
      const lexiconIds = new Set(unit.lexicon.map((l) => l.id));
      for (const paragraph of unit.passageParagraphs) {
        for (const token of paragraph) {
          if (token.lexiconId) {
            expect(lexiconIds.has(token.lexiconId)).toBe(true);
          }
        }
      }

      // Every exercise must contain questions
      for (const ex of unit.exercises) {
        expect(ex.questions.length).toBeGreaterThan(0);
      }
    }

    expect(getVocabInUseUnit(999).unitId).toBe(1);
  });

  it("Renders Unit 1 interactive spread, updates Lexicon Inspector on word click, and saves bookmarks", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/1"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/The Architecture of Brevity: Decoding Modern Shorthand/i)
    ).toBeInTheDocument();

    // Click interactive token 'all mod cons' in the reading passage
    const tokenBtn = screen.getAllByRole("button", { name: "all mod cons" })[0];
    fireEvent.click(tokenBtn);

    const inspector = screen.getByTestId("lexicon-inspector");
    expect(within(inspector).getByText("all mod cons")).toBeInTheDocument();
    expect(
      within(inspector).getByText(/Đầy đủ tiện nghi hiện đại/i)
    ).toBeInTheDocument();

    // Bookmark the word and verify counter increments
    const bookmarkBtn = within(inspector).getByRole("button", {
      name: /Lưu sổ từ/i
    });
    fireEvent.click(bookmarkBtn);
    expect(
      screen.getByRole("button", { name: /Sổ từ \(1\)/i })
    ).toBeInTheDocument();
  });

  it("Grades Gap Fill exercise in Unit 1 accurately and displays Vietnamese explanation", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/1"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    const ex11 = screen.getByTestId("exercise-ex-1-1");
    const inputs = within(ex11).getAllByRole("textbox");
    expect(inputs).toHaveLength(4);

    fireEvent.change(inputs[0], { target: { value: "AD" } });
    fireEvent.change(inputs[1], { target: { value: "i.e." } });
    fireEvent.change(inputs[2], { target: { value: "NB" } });
    fireEvent.change(inputs[3], { target: { value: "e.g." } });

    const checkBtn = within(ex11).getByRole("button", {
      name: /Kiểm tra đáp án/i
    });
    fireEvent.click(checkBtn);

    expect(within(ex11).getByText("Kết quả: 4/4")).toBeInTheDocument();
    expect(
      within(ex11).getByText(/Anno Domini.*sau Công nguyên/i)
    ).toBeInTheDocument();
  });

  it("Renders Unit 2 Classifier & Sentence Upgrade exercises and grades them properly", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/2"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Beneath the Surface: How Prefixes Architect Nuance/i)
    ).toBeInTheDocument();

    const ex21 = screen.getByTestId("exercise-ex-2-1");
    const excessButtons = within(ex21).getAllByRole("button", {
      name: /\(a\) Excess \/ Less/i
    });
    // Select (a) for question 1 (overstated) and question 5 (underfunded)
    fireEvent.click(excessButtons[0]);
    fireEvent.click(excessButtons[4]);

    const checkEx21 = within(ex21).getByRole("button", {
      name: /Kiểm tra đáp án/i
    });
    fireEvent.click(checkEx21);

    expect(within(ex21).getByText("Kết quả: 2/6")).toBeInTheDocument();
  });

  it("Renders Unit 3 Sentence Upgrade & Classifier exercises and checks answers", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/3"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Precision Packaging: How Modern Suffixes Condense Meaning/i)
    ).toBeInTheDocument();

    const ex34 = screen.getByTestId("exercise-ex-3-4");
    fireEvent.click(
      within(ex34).getByRole("button", {
        name: "Poisonous mushrooms are easily identifiable."
      })
    );
    fireEvent.click(
      within(ex34).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex34).getByText("Kết quả: 1/6")).toBeInTheDocument();
  });
});
