import React from "react";

export const SHORT_ANSWER_SELECTOR = 'input[data-short-answer-input="true"]:not([disabled])';

/**
 * Handle Enter key in short-answer inputs to focus the next input field.
 * Allows students to type answers continuously without touching the mouse.
 * Explicitly does not apply to textareas or long essay questions.
 */
export function handleShortAnswerKeyDown(
  e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
) {
  if (e.key !== "Enter") return;

  // Ignore Ctrl+Enter, Alt+Enter, Meta+Enter
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  // Prevent IME composition Enter (Vietnamese typing, etc.)
  if (
    (e as any).nativeEvent?.isComposing ||
    (e as any).isComposing ||
    (e as any).keyCode === 229
  ) {
    return;
  }

  // Resolve the input element (supports both direct element handlers and delegated container listeners)
  const targetEl = (e.target || e.currentTarget) as HTMLElement | null;
  const current = (
    targetEl && targetEl.tagName === "INPUT"
      ? targetEl
      : e.currentTarget && (e.currentTarget as HTMLElement).tagName === "INPUT"
        ? (e.currentTarget as HTMLElement)
        : null
  ) as HTMLInputElement | null;

  if (!current || current.tagName !== "INPUT") return;

  // Find all active short answer inputs in DOM order
  const allInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>(SHORT_ANSWER_SELECTOR),
  );

  const currentIndex = allInputs.indexOf(current);
  if (currentIndex === -1) return;

  // Shift + Enter: Move to previous short-answer input
  if (e.shiftKey) {
    if (currentIndex > 0) {
      e.preventDefault();
      const prevInput = allInputs[currentIndex - 1];
      prevInput.focus();
      prevInput.select();
      prevInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // Normal Enter: Move to next short-answer input
  if (currentIndex < allInputs.length - 1) {
    e.preventDefault();
    const nextInput = allInputs[currentIndex + 1];
    nextInput.focus();
    nextInput.select();
    nextInput.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    // Last input in current view: prevent default form submit
    e.preventDefault();
  }
}
