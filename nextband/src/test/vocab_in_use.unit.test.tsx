import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VocabInUsePage from "../pages/public/vocab-in-use/VocabInUsePage";
import { VOCAB_IN_USE_UNITS, getVocabInUseUnit } from "../data/vocabInUse";

describe("📚 Vocabulary in Use (C1-C2 Studio) — Data & Interactive UI", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Validates complete data integrity across Units 1 to 6", () => {
    expect(VOCAB_IN_USE_UNITS).toHaveLength(6);

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

      // Every exercise must contain valid questions & targets
      for (const ex of unit.exercises) {
        expect(ex.questions.length).toBeGreaterThan(0);
        if (ex.kind === "classifier") {
          const validCatKeys = new Set(ex.categories.map((c) => c.key));
          for (const q of ex.questions) {
            expect(validCatKeys.has(q.correctCategory)).toBe(true);
          }
        } else if (ex.kind === "sentence_upgrade") {
          for (const q of ex.questions) {
            expect(q.options).toContain(q.correctOption);
          }
        }
      }
    }

    expect(getVocabInUseUnit(999).unitId).toBe(1);
  });

  it("Renders Unit Catalog hub at /vocab-in-use without entering exercises immediately, then navigates to Unit 1 on selection", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use"]}>
        <Routes>
          <Route path="/vocab-in-use" element={<VocabInUsePage />} />
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("vocab-in-use-catalog")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-3")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-4")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-5")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-6")).toBeInTheDocument();

    // Unit 1 passage & exercise workspace should NOT render on the catalog root route
    expect(
      screen.queryByText(/The Architecture of Brevity: Decoding Modern Shorthand/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("exercise-ex-1-1")).not.toBeInTheDocument();

    // Search filters down to matching Unit
    const searchInput = screen.getByRole("textbox", { name: /Tìm kiếm Unit/i });
    fireEvent.change(searchInput, { target: { value: "Prefixes" } });
    expect(screen.queryByTestId("unit-card-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("unit-card-2")).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "" } });

    // Enter Unit 1 via its CTA link
    const enterUnit1Link = screen.getByRole("link", { name: /Vào học Unit 1/i });
    fireEvent.click(enterUnit1Link);

    expect(
      screen.getByText(/The Architecture of Brevity: Decoding Modern Shorthand/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("exercise-ex-1-1")).toBeInTheDocument();

    // Unit switcher bar and 100-unit roadmap accordion should NOT be combined into the unit workspace
    expect(screen.queryByTestId("vocab-in-use-catalog")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Lộ trình toàn sách \(100 Units\)/i })
    ).not.toBeInTheDocument();

    // Back-to-catalog links are present in header and bottom navigation
    expect(screen.getByRole("link", { name: /^Chọn Unit$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Về trang Chọn Unit/i })
    ).toBeInTheDocument();
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

  it("Renders Unit 4 Word-building & Word-blending exercises and grades Gap Fill accurately", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/4"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Classical Roots Meet Portmanteau Invention/i)
    ).toBeInTheDocument();

    const ex44 = screen.getByTestId("exercise-ex-4-4");
    const inputs = within(ex44).getAllByRole("textbox");
    expect(inputs).toHaveLength(8);

    fireEvent.change(inputs[0], { target: { value: "autograph" } });
    fireEvent.change(inputs[1], { target: { value: "criminology" } });
    fireEvent.change(inputs[5], { target: { value: "teleworking" } });
    fireEvent.change(inputs[7], { target: { value: "cybercrime" } });

    fireEvent.click(
      within(ex44).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex44).getByText("Kết quả: 4/8")).toBeInTheDocument();
  });

  it("Renders Unit 5 Loanwords & Enrichment exercises and grades Gap Fill accurately", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/5"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/How Global Borrowings Enriched the English Lexicon/i)
    ).toBeInTheDocument();

    const ex53 = screen.getByTestId("exercise-ex-5-3");
    const inputs = within(ex53).getAllByRole("textbox");
    expect(inputs).toHaveLength(6);

    fireEvent.change(inputs[0], { target: { value: "hara-kiri" } });
    fireEvent.change(inputs[1], { target: { value: "mumps" } });
    fireEvent.change(inputs[2], { target: { value: "amber" } });
    fireEvent.change(inputs[3], { target: { value: "tonic" } });
    fireEvent.change(inputs[4], { target: { value: "roster" } });
    fireEvent.change(inputs[5], { target: { value: "gimmick" } });

    fireEvent.click(
      within(ex53).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex53).getByText("Kết quả: 6/6")).toBeInTheDocument();
  });

  it("Renders Unit 6 Confusable Words & Phrasal Compounds exercises and grades them accurately", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/6"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Precision in Shades of Meaning/i)
    ).toBeInTheDocument();

    const ex61 = screen.getByTestId("exercise-ex-6-1");
    fireEvent.click(
      within(ex61).getByRole("button", {
        name: "I have always tried not to interfere in things that are not my business."
      })
    );
    fireEvent.click(
      within(ex61).getByRole("button", {
        name: "The traffic was stationary for a few minutes, then it began to move again."
      })
    );
    fireEvent.click(
      within(ex61).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex61).getByText("Kết quả: 2/12")).toBeInTheDocument();

    const ex64 = screen.getByTestId("exercise-ex-6-4");
    const inputs = within(ex64).getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
    fireEvent.change(inputs[0], { target: { value: "an outbreak" } });
    fireEvent.change(inputs[5], { target: { value: "a breakout" } });
    fireEvent.click(
      within(ex64).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex64).getByText("Kết quả: 2/6")).toBeInTheDocument();
  });
});
