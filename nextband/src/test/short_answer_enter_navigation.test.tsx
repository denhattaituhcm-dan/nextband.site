import React, { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { handleShortAnswerKeyDown, SHORT_ANSWER_SELECTOR } from "@/lib/shortAnswerNavigation";
import { FillBlankHtmlRenderer } from "@/components/exam/FillBlankHtmlRenderer";
import { ListeningSection } from "@/components/exam/ListeningSection";

describe("Short Answer Enter Navigation", () => {
  beforeEach(() => {
    // Mock scrollIntoView in jsdom
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("moves focus to the next short-answer input when pressing Enter", () => {
    function TestComponent() {
      const [val1, setVal1] = useState("");
      const [val2, setVal2] = useState("");
      const [val3, setVal3] = useState("");

      return (
        <div>
          <input
            data-testid="input-1"
            data-short-answer-input="true"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            onKeyDown={handleShortAnswerKeyDown}
          />
          <input
            data-testid="input-2"
            data-short-answer-input="true"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            onKeyDown={handleShortAnswerKeyDown}
          />
          <input
            data-testid="input-3"
            data-short-answer-input="true"
            value={val3}
            onChange={(e) => setVal3(e.target.value)}
            onKeyDown={handleShortAnswerKeyDown}
          />
        </div>
      );
    }

    render(<TestComponent />);

    const input1 = screen.getByTestId("input-1") as HTMLInputElement;
    const input2 = screen.getByTestId("input-2") as HTMLInputElement;
    const input3 = screen.getByTestId("input-3") as HTMLInputElement;

    input1.focus();
    expect(document.activeElement).toBe(input1);

    // Press Enter on input 1
    fireEvent.keyDown(input1, { key: "Enter" });
    expect(document.activeElement).toBe(input2);
    expect(input2.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "center" });

    // Press Enter on input 2
    fireEvent.keyDown(input2, { key: "Enter" });
    expect(document.activeElement).toBe(input3);
  });

  it("moves focus to the previous input when pressing Shift + Enter", () => {
    function TestComponent() {
      return (
        <div>
          <input
            data-testid="input-1"
            data-short-answer-input="true"
            onKeyDown={handleShortAnswerKeyDown}
          />
          <input
            data-testid="input-2"
            data-short-answer-input="true"
            onKeyDown={handleShortAnswerKeyDown}
          />
        </div>
      );
    }

    render(<TestComponent />);

    const input1 = screen.getByTestId("input-1") as HTMLInputElement;
    const input2 = screen.getByTestId("input-2") as HTMLInputElement;

    input2.focus();
    expect(document.activeElement).toBe(input2);

    fireEvent.keyDown(input2, { key: "Enter", shiftKey: true });
    expect(document.activeElement).toBe(input1);
  });

  it("does NOT move focus when IME is composing (Vietnamese Telex/VNI typing)", () => {
    function TestComponent() {
      return (
        <div>
          <input
            data-testid="input-1"
            data-short-answer-input="true"
            onKeyDown={handleShortAnswerKeyDown}
          />
          <input
            data-testid="input-2"
            data-short-answer-input="true"
            onKeyDown={handleShortAnswerKeyDown}
          />
        </div>
      );
    }

    render(<TestComponent />);

    const input1 = screen.getByTestId("input-1") as HTMLInputElement;
    input1.focus();

    // Event with isComposing true
    fireEvent.keyDown(input1, { key: "Enter", isComposing: true });
    expect(document.activeElement).toBe(input1);

    // Event with keyCode 229 (IME composition event in some browsers)
    fireEvent.keyDown(input1, { key: "Enter", keyCode: 229 });
    expect(document.activeElement).toBe(input1);
  });

  it("does NOT apply Enter navigation to textarea / essay inputs", () => {
    function TestEssayComponent() {
      const [essayText, setEssayText] = useState("");
      return (
        <div>
          <textarea
            data-testid="essay-textarea"
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
          />
          <input
            data-testid="next-input"
            data-short-answer-input="true"
          />
        </div>
      );
    }

    render(<TestEssayComponent />);

    const textarea = screen.getByTestId("essay-textarea") as HTMLTextAreaElement;
    textarea.focus();

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
    textarea.dispatchEvent(enterEvent);

    // Focus remains in textarea and event is not prevented
    expect(document.activeElement).toBe(textarea);
    expect(enterEvent.defaultPrevented).toBe(false);
  });

  it("seamlessly navigates across FillBlankHtmlRenderer slots on Enter", () => {
    const handleAnswerChange = vi.fn();
    const handleQuestionFocus = vi.fn();

    const html = "Jane [BLANK_1] at the school and [BLANK_2] English.";

    render(
      <div>
        <FillBlankHtmlRenderer
          html={html}
          answers={{}}
          questionId="q1"
          onAnswerChange={handleAnswerChange}
          onQuestionFocus={handleQuestionFocus}
        />
        <input
          data-testid="subsequent-short-answer"
          data-short-answer-input="true"
          onKeyDown={handleShortAnswerKeyDown}
        />
      </div>
    );

    const inputs = document.querySelectorAll(SHORT_ANSWER_SELECTOR) as NodeListOf<HTMLInputElement>;
    expect(inputs.length).toBe(3); // 2 blank slots + 1 subsequent short-answer

    const slot1 = inputs[0];
    const slot2 = inputs[1];
    const subInput = inputs[2];

    slot1.focus();
    expect(document.activeElement).toBe(slot1);

    // Press Enter in slot 1 -> should focus slot 2
    fireEvent.keyDown(slot1, { key: "Enter" });
    expect(document.activeElement).toBe(slot2);

    // Press Enter in slot 2 -> should jump to subsequent short-answer input
    fireEvent.keyDown(slot2, { key: "Enter" });
    expect(document.activeElement).toBe(subInput);
  });

  it("navigates from Question 6 to Question 7 in ListeningSection when Enter is pressed", () => {
    const mockSection = {
      id: "sec-lis",
      title: "W2 - D2 - LIS",
      question_groups: [
        {
          id: "part-2",
          title: "PART 2: DAILY ACTIONS & VERB ENDINGS",
          order_index: 0,
          questions: [
            {
              id: "q-6",
              question_type: "short_answer",
              question_text: "Jane ___________ at the school near her apartment.",
              order_index: 0,
            },
            {
              id: "q-7",
              question_type: "short_answer",
              question_text: "They ___________ basketball every Friday.",
              order_index: 1,
            },
          ],
        },
      ],
    };

    const handleAnswerChange = vi.fn();
    const handleQuestionFocus = vi.fn();

    render(
      <ListeningSection
        section={mockSection}
        answers={{}}
        onAnswerChange={handleAnswerChange}
        onQuestionFocus={handleQuestionFocus}
        currentQuestionId="q-6"
      />
    );

    const inputs = screen.getAllByPlaceholderText("Nhập câu trả lời...") as HTMLInputElement[];
    expect(inputs.length).toBe(2);

    const input6 = inputs[0];
    const input7 = inputs[1];

    expect(input6.getAttribute("data-short-answer-input")).toBe("true");
    expect(input7.getAttribute("data-short-answer-input")).toBe("true");

    input6.focus();
    expect(document.activeElement).toBe(input6);

    // Pressing Enter in input6 moves to input7
    fireEvent.keyDown(input6, { key: "Enter" });
    expect(document.activeElement).toBe(input7);
    expect(input7.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "center" });
    expect(handleQuestionFocus).toHaveBeenCalledWith("q-7");
  });
});
