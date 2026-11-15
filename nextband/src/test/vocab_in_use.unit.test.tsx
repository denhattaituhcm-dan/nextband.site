import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VocabInUsePage from "../pages/public/vocab-in-use/VocabInUsePage";
import { VOCAB_IN_USE_UNITS, getVocabInUseUnit } from "../data/vocabInUse";

describe("📚 Vocabulary in Use (C1-C2 Studio) — Data & Interactive UI", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Validates complete data integrity across Units 1 to 12", () => {
    expect(VOCAB_IN_USE_UNITS).toHaveLength(12);
    expect(VOCAB_IN_USE_UNITS.map((u) => u.unitId)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ]);

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

  it("Renders Unit Catalog hub at /vocab-in-use without entering exercises immediately, filters chapters, then navigates to Unit 1 on selection", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use"]}>
        <Routes>
          <Route path="/vocab-in-use" element={<VocabInUsePage />} />
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("vocab-in-use-catalog")).toBeInTheDocument();
    for (let id = 1; id <= 12; id++) {
      expect(screen.getByTestId(`unit-card-${id}`)).toBeInTheDocument();
    }

    // Chapter filter narrows to Work and Study (Units 7-12)
    fireEvent.click(screen.getByRole("button", { name: /Work and Study \(6\)/i }));
    expect(screen.queryByTestId("unit-card-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("unit-card-7")).toBeInTheDocument();
    expect(screen.getByTestId("unit-card-12")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Tất cả \(12\)/i }));
    expect(screen.getByTestId("unit-card-1")).toBeInTheDocument();

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
    const enterUnit1Link = within(screen.getByTestId("unit-card-1")).getByRole(
      "link",
      { name: /Vào học Unit 1$/i }
    );
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

  it("Renders Unit 7 Colleagues & Routines exercises and grades Gap Fill accurately", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/7"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Inside the Modern Workspace: Colleagues, Clocks, and Calling/i)
    ).toBeInTheDocument();

    const ex71 = screen.getByTestId("exercise-ex-7-1");
    const inputs = within(ex71).getAllByRole("textbox");
    expect(inputs).toHaveLength(5);

    fireEvent.change(inputs[0], { target: { value: "working relationship" } });
    fireEvent.change(inputs[1], { target: { value: "rapport" } });
    fireEvent.change(inputs[2], { target: { value: "opposite number" } });
    fireEvent.change(inputs[3], { target: { value: "socialise with" } });
    fireEvent.change(inputs[4], { target: { value: "talk shop" } });

    fireEvent.click(
      within(ex71).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex71).getByText("Kết quả: 5/5")).toBeInTheDocument();
  });

  it("Renders Unit 8 Career & Promotion exercises and grades Classifier & Gap Fill", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/8"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Climbing the Ladder: Ambition, Perks, and Invisible Ceilings/i)
    ).toBeInTheDocument();

    const ex84 = screen.getByTestId("exercise-ex-8-4");
    const negButtons = within(ex84).getAllByRole("button", {
      name: /Trở ngại & Từ chối \(-\)/i
    });
    const posButtons = within(ex84).getAllByRole("button", {
      name: /Thăng tiến & Đãi ngộ \(\+\)/i
    });
    fireEvent.click(negButtons[0]); // glass ceiling (-)
    fireEvent.click(posButtons[1]); // perks (+)
    fireEvent.click(posButtons[7]); // high-flyer (+)

    fireEvent.click(
      within(ex84).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex84).getByText("Kết quả: 3/8")).toBeInTheDocument();
  });

  it("Renders Unit 9 Business 1 exercises and grades Sentence Upgrade accurately", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/9"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/From Cold Calls to Boardroom Deals: The Vocabulary of Commerce/i)
    ).toBeInTheDocument();

    const ex93 = screen.getByTestId("exercise-ex-9-3");
    fireEvent.click(within(ex93).getByRole("button", { name: "hammer out a deal" }));
    fireEvent.click(within(ex93).getByRole("button", { name: "red tape" }));
    fireEvent.click(within(ex93).getByRole("button", { name: "entrepreneurship" }));

    fireEvent.click(
      within(ex93).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex93).getByText("Kết quả: 3/6")).toBeInTheDocument();
  });

  it("Renders Unit 10 Business 2 exercises and grades Contracts & Collocations", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/10"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Contracts, Clauses, and the Human Factor in Enterprise/i)
    ).toBeInTheDocument();

    const ex102 = screen.getByTestId("exercise-ex-10-2");
    const inputs = within(ex102).getAllByRole("textbox");
    expect(inputs).toHaveLength(6);

    fireEvent.change(inputs[0], { target: { value: "project" } });
    fireEvent.change(inputs[1], { target: { value: "flaw" } });
    fireEvent.change(inputs[2], { target: { value: "Resources" } });
    fireEvent.change(inputs[3], { target: { value: "morale" } });
    fireEvent.change(inputs[4], { target: { value: "lack" } });
    fireEvent.change(inputs[5], { target: { value: "employee" } });

    fireEvent.click(
      within(ex102).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex102).getByText("Kết quả: 6/6")).toBeInTheDocument();
  });

  it("Renders Unit 11 Study & Academic Work and grades Written Genres Gap Fill", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/11"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Inside the Seminar Room: From First Draft to Doctoral Thesis/i)
    ).toBeInTheDocument();

    const ex111 = screen.getByTestId("exercise-ex-11-1");
    const inputs = within(ex111).getAllByRole("textbox");
    expect(inputs).toHaveLength(7);

    fireEvent.change(inputs[0], { target: { value: "thesis" } });
    fireEvent.change(inputs[1], { target: { value: "composition" } });
    fireEvent.change(inputs[2], { target: { value: "portfolio" } });
    fireEvent.change(inputs[3], { target: { value: "essay" } });
    fireEvent.change(inputs[4], { target: { value: "assignment" } });
    fireEvent.change(inputs[5], { target: { value: "dissertation" } });
    fireEvent.change(inputs[6], { target: { value: "project" } });

    fireEvent.click(
      within(ex111).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex111).getByText("Kết quả: 7/7")).toBeInTheDocument();
  });

  it("Renders Unit 12 Education Debates and grades Sentence Upgrade accurately", () => {
    render(
      <MemoryRouter initialEntries={["/vocab-in-use/12"]}>
        <Routes>
          <Route path="/vocab-in-use/:unitId" element={<VocabInUsePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Bridging the Divide: Equity, League Tables, and Lifelong Learning/i)
    ).toBeInTheDocument();

    const ex122 = screen.getByTestId("exercise-ex-12-2");
    fireEvent.click(
      within(ex122).getByRole("button", {
        name: "Inequality is inherent in the education system."
      })
    );
    fireEvent.click(
      within(ex122).getByRole("button", {
        name: "Elitism is bad for the country in the long term."
      })
    );
    fireEvent.click(
      within(ex122).getByRole("button", {
        name: "All parents want their children to excel at school."
      })
    );

    fireEvent.click(
      within(ex122).getByRole("button", { name: /Kiểm tra đáp án/i })
    );
    expect(within(ex122).getByText("Kết quả: 3/7")).toBeInTheDocument();
  });
});
