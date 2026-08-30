import { useState, useEffect, useCallback, useRef } from "react";

export interface SelectionState {
  selectedText: string;
  contextSnippet: string;
  rect: DOMRect | null;
  isValid: boolean;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "and", "or", "but", "is", "are", "was", "were", "be", "been", "being",
  "it", "this", "that", "these", "those", "as"
]);

/**
 * Filter 1-4 meaningful lexical words / phrasal expressions.
 * Excludes full sentences, paragraphs, code blocks, input elements, or invalid tokens.
 */
export function validateLexicalSelection(
  text: string,
  containerEl?: HTMLElement | null
): boolean {
  if (!text) return false;

  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 2 || trimmed.length > 80) return false;

  // Reject full sentences or multiple lines
  if (trimmed.includes("\n") || trimmed.includes(".")) return false;

  // Split tokens by spaces/hyphens
  const tokens = trimmed.split(/[\s-]+/).filter(Boolean);
  if (tokens.length < 1 || tokens.length > 4) return false;

  // If all tokens are stop words (e.g. "in on at"), reject
  const hasLexicalContent = tokens.some(
    (t) => !STOP_WORDS.has(t.toLowerCase())
  );
  if (!hasLexicalContent) return false;

  // Check element context: reject inputs, textareas, or explicit ignored elements
  if (containerEl) {
    const tagName = containerEl.tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea" || containerEl.isContentEditable) {
      return false;
    }
    if (containerEl.closest("[data-no-lexicon]")) {
      return false;
    }
  }

  return true;
}

export function useInContextSelection(enabled: boolean = true) {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedText: "",
    contextSnippet: "",
    rect: null,
    isValid: false,
  });

  const clearSelection = useCallback(() => {
    setSelectionState({
      selectedText: "",
      contextSnippet: "",
      rect: null,
      isValid: false,
    });
  }, []);

  useEffect(() => {
    if (!enabled) {
      clearSelection();
      return;
    }

    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) {
        // We do not clear immediately on collapse to allow clicking on the action pill,
        // clearSelection is handled manually or on outer click.
        return;
      }

      const rawText = sel.toString().trim();
      const range = sel.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const parentEl =
        container.nodeType === Node.ELEMENT_NODE
          ? (container as HTMLElement)
          : container.parentElement;

      const isValid = validateLexicalSelection(rawText, parentEl);
      if (!isValid) {
        return;
      }

      // Extract context snippet (~150 chars around selection)
      let contextSnippet = rawText;
      if (parentEl && parentEl.textContent) {
        const fullText = parentEl.textContent;
        const textIdx = fullText.indexOf(rawText);
        if (textIdx !== -1) {
          const start = Math.max(0, textIdx - 80);
          const end = Math.min(fullText.length, textIdx + rawText.length + 80);
          contextSnippet = fullText.slice(start, end).trim();
        }
      }

      const rect = range.getBoundingClientRect();

      setSelectionState({
        selectedText: rawText,
        contextSnippet,
        rect,
        isValid: true,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Ignore click if clicking inside an existing pill or popover
      const target = e.target as HTMLElement;
      if (target?.closest("[data-lexicon-ui]")) {
        return;
      }

      setTimeout(handleSelectionChange, 10);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [enabled, clearSelection]);

  return {
    selectionState,
    clearSelection,
  };
}
