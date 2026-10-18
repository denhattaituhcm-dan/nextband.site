import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "paper" | "slate" | "cyber";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
  setZenMode: (zen: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "lexicon_arena_theme_v1";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (saved === "paper" || saved === "slate" || saved === "cyber") return saved;
    } catch {
      // fallback
    }
    // Default to 'paper' (Academic Editorial) for supreme readability & zero eye-strain
    return "paper";
  });

  const [isZenMode, setZenMode] = useState<boolean>(false);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  const toggleZenMode = () => setZenMode((prev) => !prev);

  // Global key listener for 'Z' -> Zen Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "z" || e.key === "Z") {
        e.preventDefault();
        setZenMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isZenMode,
        toggleZenMode,
        setZenMode,
      }}
    >
      <div data-arena-theme={theme} className={`arena-root font-sans antialiased`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useArenaTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useArenaTheme must be used within a ThemeProvider");
  }
  return context;
};
