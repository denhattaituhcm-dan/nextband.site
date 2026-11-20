import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ReadingCasePage from "@/pages/public/reading/ReadingCasePage";
import { CASE_002 } from "@/data/readingCases/case002";

function renderReadingCase(path = "/reading/case-002") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/reading/:caseId" element={<ReadingCasePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ReadingCasePage — Bilingual Toggle, Non-Hijacking Lookup, Glossary & Bugfix Regression", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    window.localStorage.clear();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("defaults to English-only mode and enables aligned bilingual mode strictly when user opts in", () => {
    renderReadingCase("/reading/case-002");

    // Default must be English-only: no bilingual column header rendered yet
    expect(screen.queryByText(/TIẾNG VIỆT \(Gióng hàng từng đoạn\)/i)).toBeNull();

    // Per-paragraph quick translation toggle works in English-only mode
    const translateButtons = screen.getAllByRole("button", { name: /Dịch đoạn/i });
    expect(translateButtons.length).toBeGreaterThan(0);
    fireEvent.click(translateButtons[0]);
    expect(screen.getByText(/Bản dịch đoạn 1:/i)).toBeDefined();
    expect(screen.getByText(/Suốt nhiều thập kỷ, Warren Buffett/i)).toBeDefined();

    // Clicking "Song ngữ" opts in to side-by-side aligned view
    const bilingualToggle = screen.getByRole("button", { name: /^Song ngữ$/i });
    fireEvent.click(bilingualToggle);
    expect(screen.getAllByText(/TIẾNG VIỆT \(Gióng hàng từng đoạn\)/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Đó là lý do giao tiếp đã trở thành một hệ số nhân sức mạnh/i)).toBeDefined();
  });

  it("correctly evaluates Task 2 badge independently of Task 1 (regression test for Task 2 badge bug)", () => {
    renderReadingCase("/reading/case-002");

    // Switch to Góc Chiêm Nghiệm tab
    fireEvent.click(screen.getByRole("button", { name: /Góc Chiêm Nghiệm/i }));

    // Choose WRONG answer for Task 1 (B instead of A)
    const task1Radios = document.querySelectorAll<HTMLInputElement>('input[name="task-01"]');
    expect(task1Radios.length).toBe(4);
    fireEvent.click(task1Radios[1]); // B (wrong)

    // Choose RIGHT answer for Task 2 (C)
    const task2Radios = document.querySelectorAll<HTMLInputElement>('input[name="task-02"]');
    expect(task2Radios.length).toBe(4);
    fireEvent.click(task2Radios[2]); // C (correct)

    // Inspect Task 2 section header badge explicitly
    const task2Header = screen.getByText(/GỢI Ý 2 · ĐỐI CHIẾU Ý TƯỞNG/i).parentElement;
    expect(task2Header).not.toBeNull();
    expect(within(task2Header as HTMLElement).getByText("Đúng")).toBeDefined();
  });

  it("preserves floating translation above clicked words and shows quick-peek bar without hijacking Góc Chiêm Nghiệm", () => {
    renderReadingCase("/reading/case-002");

    // User is actively working in Góc Chiêm Nghiệm
    fireEvent.click(screen.getByRole("button", { name: /Góc Chiêm Nghiệm/i }));
    expect(screen.getByText(/GỢI Ý 1 · CHI TIẾT BÀI ĐỌC/i)).toBeDefined();

    // Click an interactive word/phrase token inside the article (e.g. "competitive advantage")
    const wordSpan = screen.getByText("competitive advantage");
    fireEvent.click(wordSpan);

    // 1. Tab must remain on Góc Chiêm Nghiệm (not hijacked!)
    expect(screen.getByText(/GỢI Ý 1 · CHI TIẾT BÀI ĐỌC/i)).toBeDefined();

    // 2. Signature floating Vietnamese label still appears above the word
    const wordWrapper = wordSpan.parentElement as HTMLElement;
    expect(wordWrapper.textContent).toContain("competitive advantage");
    expect(wordWrapper.querySelector("span.rounded-full")).not.toBeNull();

    // 3. Quick-peek bar appears with "Giải nghĩa sâu" action button
    const quickDeepButtons = screen.getAllByRole("button", { name: /Giải nghĩa sâu/i });
    expect(quickDeepButtons.length).toBeGreaterThanOrEqual(1);
    const barButton = quickDeepButtons.find((btn) =>
      btn.className.includes("bg-emerald-500")
    );
    expect(barButton).toBeDefined();

    // Clicking "Giải nghĩa sâu" intentionally opens ReadlangExplorationSidebar
    fireEvent.click(barButton as HTMLElement);
    expect(screen.getByText(/Hiểu đơn giản/i)).toBeDefined();
  });

  it("renders case glossary tab with paragraph jump pills and marks reading status", () => {
    renderReadingCase("/reading/case-002");

    // Switch to Từ vựng tab (desktop + mobile switcher both render a button)
    const vocabTabs = screen.getAllByRole("button", { name: /Từ vựng/i });
    fireEvent.click(vocabTabs[vocabTabs.length - 1]);

    expect(screen.getByText(/Từ vựng bài này/i)).toBeDefined();
    const jumpPills = screen.getAllByRole("button", { name: /Đoạn \d+/i });
    expect(jumpPills.length).toBeGreaterThan(0);

    // Mark article as read from header
    const markReadBtn = screen.getByRole("button", { name: /Đánh dấu đã đọc/i });
    fireEvent.click(markReadBtn);
    expect(screen.getByRole("button", { name: /^Đã đọc$/i })).toBeDefined();

    // Verify Case 2 title rendered
    expect(screen.getByText(CASE_002.title)).toBeDefined();
  });
});
