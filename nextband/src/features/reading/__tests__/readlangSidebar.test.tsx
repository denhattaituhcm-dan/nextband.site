import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReadlangExplorationSidebar } from "../components/ReadlangExplorationSidebar";
import { lookupWord } from "../services/readingDictionary";

describe("ReadlangExplorationSidebar Component", () => {
  it("renders humanized pedagogical sections for 'dispensing' without framework leaks", () => {
    const term = lookupWord("dispensing");
    expect(term).not.toBeNull();

    render(
      <ReadlangExplorationSidebar
        activeTerm={term}
        savedTerms={[]}
        onToggleSave={vi.fn()}
      />
    );

    // 1. Verify term header & IPA
    expect(screen.getByText("dispensing")).toBeDefined();
    expect(screen.getByText("/dɪˈspɛnsɪŋ/")).toBeDefined();

    // 2. Verify humanized teacher titles
    expect(screen.getByText(/Hiểu đơn giản/i)).toBeDefined();
    expect(screen.getByText(/Trong câu này/i)).toBeDefined();
    expect(screen.getByText(/Bạn sẽ gặp nó ở những đâu\?/i)).toBeDefined();
    expect(screen.getByText(/Phân biệt & Lưu ý/i)).toBeDefined();
    expect(screen.getByText(/Cách nhận diện khi đọc/i)).toBeDefined();

    // 3. Verify content is rich and concrete
    expect(screen.getByText(/dispense là đưa một thứ ra cho người khác nhận hoặc sử dụng/i)).toBeDefined();
    expect(screen.getByText(/Buffett đang 'phân phát' những lời khuyên của mình/i)).toBeDefined();

    // 4. Verify ZERO leaked framework jargon
    const sidebarHtml = document.body.innerHTML;
    expect(sidebarHtml).not.toContain("1. Khái Niệm Lõi");
    expect(sidebarHtml).not.toContain("2. Khung Cảnh Tâm Trí");
    expect(sidebarHtml).not.toContain("Tác thể:");
    expect(sidebarHtml).not.toContain("Đối tượng:");
    expect(sidebarHtml).not.toContain("Thực thể trao/chuyển:");
    expect(sidebarHtml).not.toContain("Điểm chung ý niệm:");
  });

  it("renders compact view for concise words without bloated empty cards", () => {
    const simpleTerm = lookupWord("reached");
    expect(simpleTerm).not.toBeNull();

    render(
      <ReadlangExplorationSidebar
        activeTerm={simpleTerm}
        savedTerms={[]}
        onToggleSave={vi.fn()}
      />
    );

    expect(screen.getByText("reached")).toBeDefined();
    expect(screen.getByText(/Hiểu đơn giản/i)).toBeDefined();

    // Concise words should not have multi-domain transfer cards
    const sidebarHtml = document.body.innerHTML;
    expect(sidebarHtml).not.toContain("Tác thể:");
    expect(sidebarHtml).not.toContain("1. Khái Niệm Lõi");
  });
});
