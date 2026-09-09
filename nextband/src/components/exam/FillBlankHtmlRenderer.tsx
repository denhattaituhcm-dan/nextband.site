import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  MutableRefObject,
} from "react";
import { sanitizeHtml } from "../../lib/sanitize";
import { handleShortAnswerKeyDown } from "@/lib/shortAnswerNavigation";

const FILL_BLANK_PLACEHOLDER_REGEX = /(?:\[BLANK(?:_(\d+))?\]|\[(\d+)\])/gi;

interface FillBlankHtmlRendererProps {
  html: string;
  answers: Record<string, any>;
  questionId: string;
  startNumber?: number;
  onAnswerChange: (questionId: string, answer: any) => void;
  questionRefs?: MutableRefObject<Map<string, HTMLElement>>;
  currentQuestionId?: string;
  onQuestionFocus?: (questionId: string) => void;
}

export function FillBlankHtmlRenderer({
  html,
  answers,
  questionId,
  startNumber = 1,
  onAnswerChange,
  questionRefs,
  currentQuestionId,
  onQuestionFocus,
}: FillBlankHtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep values in refs for the event listener to avoid stale closures
  const answersRef = useRef(answers);
  const questionIdRef = useRef(questionId);
  const onAnswerChangeRef = useRef(onAnswerChange);
  const startNumberRef = useRef(startNumber);
  const onQuestionFocusRef = useRef(onQuestionFocus);

  useEffect(() => {
    answersRef.current = answers;
    questionIdRef.current = questionId;
    onAnswerChangeRef.current = onAnswerChange;
    startNumberRef.current = startNumber;
    onQuestionFocusRef.current = onQuestionFocus;
  }, [answers, questionId, onAnswerChange, startNumber, onQuestionFocus]);

  // Memoize and sanitize processed HTML to avoid unnecessary re-renders
  const processedHtml = useMemo(() => {
    const rawReplaced = html.replace(FILL_BLANK_PLACEHOLDER_REGEX, (_match, blankNum, directNum) => {
      const numStr = blankNum || directNum;
      const blankIndex = numStr ? Number(numStr) - 1 : -1;
      const explicitNum = numStr ? Number(numStr) : -1;
      return `<span data-fill-blank="${blankIndex}" data-explicit-num="${explicitNum}" class="fill-blank-slot"></span>`;
    });
    return sanitizeHtml(rawReplaced);
  }, [html]);

  const assignIndices = useCallback(() => {
    if (!containerRef.current) return;
    const slots = containerRef.current.querySelectorAll(".fill-blank-slot");
    let cursor = 0;
    slots.forEach((slot) => {
      const idx = slot.getAttribute("data-fill-blank");
      const explicitNum = slot.getAttribute("data-explicit-num");

      let slotNumber = startNumber + cursor;
      if (explicitNum && explicitNum !== "-1") {
        slotNumber = Number(explicitNum);
      } else if (idx !== "-1" && idx !== null) {
        slotNumber = Number(idx) + 1;
      }

      if (idx === "-1" || idx === null) {
        slot.setAttribute("data-fill-blank", String(cursor));
      } else {
        cursor = Number(idx);
      }
      slot.setAttribute("data-slot-number", String(slotNumber));
      cursor++;
    });
  }, [startNumber]);

  // Main Effect: DOM Manipulation and Event Listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Assign indices to slots
    assignIndices();

    const registeredFocusIds: string[] = [];

    // 2. Clear out any existing inputs that might be lingering from previous renders
    const slots = container.querySelectorAll(".fill-blank-slot");
    slots.forEach((slot) => {
      const blankKey = slot.getAttribute("data-fill-blank") || "0";
      const slotNumber = slot.getAttribute("data-slot-number") || String(startNumberRef.current + Number(blankKey));
      const focusId = `${questionIdRef.current}::blank:${blankKey}`;
      let input = slot.querySelector("input") as HTMLInputElement | null;

      if (!input) {
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = `(${slotNumber})`;
        input.className =
          "inline-flex items-center min-w-[110px] max-w-[200px] h-9 px-3 mx-1.5 my-1 rounded-xl border-2 border-brand-blue/30 bg-background text-foreground text-center text-sm font-extrabold shadow-xs focus:outline-none focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/20 placeholder:text-muted-foreground/45 placeholder:font-bold focus:placeholder:text-transparent transition-all";
        slot.appendChild(input);
      } else {
        input.placeholder = `(${slotNumber})`;
      }

      // Crucial: Set a unique identifier for this input instance to prevent cross-contamination
      input.setAttribute("data-blank-key", blankKey);
      input.setAttribute("data-owner-id", questionIdRef.current);
      input.setAttribute("data-focus-id", focusId);
      input.setAttribute("data-short-answer-input", "true");

      if (questionRefs?.current) {
        questionRefs.current.set(focusId, slot as HTMLElement);
        registeredFocusIds.push(focusId);
      }

      const currentAnswers = answersRef.current || {};
      const currentValue = currentAnswers[blankKey] || "";
      if (input.value !== currentValue) {
        input.value = currentValue;
      }
    });

    // 3. Event Delegation with strict ID checking
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.tagName === "INPUT") {
        const ownerId = target.getAttribute("data-owner-id");
        const key = target.getAttribute("data-blank-key");

        // Safety check: Only handle events for inputs owned by THIS component instance
        if (ownerId === questionIdRef.current && key !== null) {
          onAnswerChangeRef.current(ownerId, {
            ...answersRef.current,
            [key]: target.value,
          });
        }
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      if (target.tagName === "INPUT") {
        const focusId = target.getAttribute("data-focus-id");
        if (focusId && onQuestionFocusRef.current) {
          onQuestionFocusRef.current(focusId);
        }
      }
    };

    // Keyboard Navigation: Enter moves to next short answer input; Tab moves to next slot
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement;
      if (target.tagName !== "INPUT") return;

      if (e.key === "Enter") {
        handleShortAnswerKeyDown(e);
        return;
      }

      if (e.key === "Tab" && !e.shiftKey) {
        const allInputs = Array.from(
          document.querySelectorAll<HTMLInputElement>(
            'input[data-short-answer-input="true"]:not([disabled])'
          )
        );
        const currentIndex = allInputs.indexOf(target);
        if (currentIndex !== -1 && currentIndex < allInputs.length - 1) {
          e.preventDefault();
          const nextInput = allInputs[currentIndex + 1];
          nextInput.focus();
          nextInput.select();
          nextInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    const currentRefs = questionRefs?.current;
    container.addEventListener("input", handleInput);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("input", handleInput);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("keydown", handleKeyDown);
      if (currentRefs && registeredFocusIds.length > 0) {
        registeredFocusIds.forEach((focusId) => {
          currentRefs.delete(focusId);
        });
      }
    };
  }, [processedHtml, assignIndices, questionRefs]); // Re-run if HTML changes

  // 4. Sync Side Effect: Watch answers prop for external changes (like Resets or Multi-input sync)
  useEffect(() => {
    if (!containerRef.current) return;
    const inputs = containerRef.current.querySelectorAll(
      `.fill-blank-slot input[data-owner-id="${questionId}"]`,
    ) as NodeListOf<HTMLInputElement>;

    inputs.forEach((input) => {
      const key = input.getAttribute("data-blank-key") || "0";
      const currentValue = answers[key] || "";
      if (input.value !== currentValue) {
        input.value = currentValue;
      }
    });
  }, [answers, questionId]);

  useEffect(() => {
    if (!currentQuestionId || !questionRefs?.current) return;
    if (!currentQuestionId.startsWith(`${questionId}::blank:`)) return;
    const target = questionRefs.current.get(currentQuestionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = target.querySelector("input") as HTMLInputElement | null;
      input?.focus();
    }
  }, [currentQuestionId, questionId, questionRefs]);

  return React.createElement("div", {
    ref: containerRef,
    className:
      "text-sm sm:text-base leading-relaxed text-foreground font-sans [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-extrabold [&_h3]:text-foreground [&_h3]:mb-3.5 [&_h4]:text-sm sm:[&_h4]:text-base [&_h4]:font-bold [&_h4]:text-foreground [&_h4]:mb-2.5 [&_table]:border-collapse [&_table]:w-full [&_table]:my-3.5 [&_table]:rounded-2xl [&_table]:overflow-hidden [&_td]:border [&_td]:border-border [&_td]:p-3.5 sm:[&_td]:p-4 [&_td]:text-sm sm:[&_td]:text-base [&_td]:align-top [&_td]:leading-relaxed [&_th]:border [&_th]:border-border [&_th]:p-3.5 sm:[&_th]:p-4 [&_th]:bg-muted/70 [&_th]:text-xs sm:[&_th]:text-sm [&_th]:font-extrabold [&_th]:text-foreground [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:my-1.5",
    dangerouslySetInnerHTML: { __html: processedHtml },
  });
}

export { FILL_BLANK_PLACEHOLDER_REGEX };

export const hasFillBlankPlaceholders = (text: string) => {
  if (!text) return false;
  const plain = text.replace(/<[^>]*>/g, "");
  return /(?:\[BLANK(?:_\d+)?\]|\[\d+\])/i.test(plain);
};
