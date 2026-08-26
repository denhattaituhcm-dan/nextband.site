import React from "react";
import { SlidersHorizontal, Type, AlignLeft, AlignJustify, Sun, Moon, BookOpen, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ReaderSettings {
  fontSize: number; // in px: 13, 14, 16, 18, 20, 22, 24
  lineHeight: "normal" | "relaxed" | "loose";
  fontFamily: "sans" | "serif" | "mono";
  theme: "light" | "eink" | "dark";
  textAlign: "left" | "justify";
}

interface ReadingSettingsPopoverProps {
  settings: ReaderSettings;
  onChange: (newSettings: Partial<ReaderSettings>) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ReadingSettingsPopover: React.FC<ReadingSettingsPopoverProps> = ({
  settings,
  onChange,
  isOpen,
  onToggle,
  onClose,
}) => {
  const fontSizes = [13, 14, 16, 18, 20, 22, 24];

  const handleDecreaseFont = () => {
    const currentIdx = fontSizes.indexOf(settings.fontSize);
    if (currentIdx > 0) {
      onChange({ fontSize: fontSizes[currentIdx - 1] });
    }
  };

  const handleIncreaseFont = () => {
    const currentIdx = fontSizes.indexOf(settings.fontSize);
    if (currentIdx < fontSizes.length - 1) {
      onChange({ fontSize: fontSizes[currentIdx + 1] });
    }
  };

  const cycleLineHeight = (direction: "up" | "down") => {
    const options: ReaderSettings["lineHeight"][] = ["normal", "relaxed", "loose"];
    const idx = options.indexOf(settings.lineHeight);
    if (direction === "up" && idx < options.length - 1) {
      onChange({ lineHeight: options[idx + 1] });
    } else if (direction === "down" && idx > 0) {
      onChange({ lineHeight: options[idx - 1] });
    }
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 border-stone-300 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
        title="Tùy chỉnh cỡ chữ và giao diện đọc"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-stone-600" />
        <span>Cài đặt đọc (Settings)</span>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-stone-300 bg-[#F7F5F0] text-stone-900 p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 font-sans space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-stone-800">
                <SlidersHorizontal className="h-3.5 w-3.5 text-stone-700" />
                <span>Reading Settings</span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">{settings.fontSize}px</span>
            </div>

            {/* Section 1: Change Size */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                Kích thước (Change Size)
              </span>
              
              {/* Font size row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDecreaseFont}
                  disabled={settings.fontSize <= fontSizes[0]}
                  className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-stone-200/90 hover:bg-stone-300 active:scale-95 disabled:opacity-40 text-xs font-semibold text-stone-800 transition-all cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                  <span>- Font</span>
                </button>
                <button
                  type="button"
                  onClick={handleIncreaseFont}
                  disabled={settings.fontSize >= fontSizes[fontSizes.length - 1]}
                  className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-stone-200/90 hover:bg-stone-300 active:scale-95 disabled:opacity-40 text-xs font-semibold text-stone-800 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Font</span>
                </button>
              </div>

              {/* Line height row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => cycleLineHeight("down")}
                  disabled={settings.lineHeight === "normal"}
                  className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-stone-200/90 hover:bg-stone-300 active:scale-95 disabled:opacity-40 text-xs font-semibold text-stone-800 transition-all cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                  <span>- Line Height</span>
                </button>
                <button
                  type="button"
                  onClick={() => cycleLineHeight("up")}
                  disabled={settings.lineHeight === "loose"}
                  className="flex items-center justify-center gap-1.5 h-8 rounded-lg bg-stone-200/90 hover:bg-stone-300 active:scale-95 disabled:opacity-40 text-xs font-semibold text-stone-800 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Line Height</span>
                </button>
              </div>
            </div>

            {/* Section 2: Change Appearance */}
            <div className="space-y-2 pt-1 border-t border-stone-300/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                Kiểu chữ & Hiển thị (Appearance)
              </span>

              {/* Font Family Selection */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => onChange({ fontFamily: "sans" })}
                  className={`h-8 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                    settings.fontFamily === "sans"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-200/90 hover:bg-stone-300 text-stone-800"
                  }`}
                >
                  Sans (Inter)
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ fontFamily: "serif" })}
                  className={`h-8 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                    settings.fontFamily === "serif"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-200/90 hover:bg-stone-300 text-stone-800"
                  }`}
                >
                  Serif (Book)
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ fontFamily: "mono" })}
                  className={`h-8 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    settings.fontFamily === "mono"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-200/90 hover:bg-stone-300 text-stone-800"
                  }`}
                >
                  Mono
                </button>
              </div>

              {/* Theme Selection */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => onChange({ theme: "eink" })}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    settings.theme === "eink"
                      ? "bg-[#E6D7B8] text-[#3D2C15] border border-[#BFA87E] shadow-xs font-bold"
                      : "bg-[#F3EAD3] hover:bg-[#ECE0C4] text-[#4A381E]"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>E-Ink</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ theme: "light" })}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    settings.theme === "light"
                      ? "bg-white text-stone-900 border border-stone-300 shadow-xs font-bold"
                      : "bg-stone-200/90 hover:bg-stone-300 text-stone-800"
                  }`}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ theme: "dark" })}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    settings.theme === "dark"
                      ? "bg-stone-900 text-stone-100 border border-stone-700 shadow-xs font-bold"
                      : "bg-stone-800/80 hover:bg-stone-800 text-stone-300"
                  }`}
                >
                  <Moon className="h-3.5 w-3.5 text-blue-400" />
                  <span>Dark</span>
                </button>
              </div>

              {/* Text Alignment Selection */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onChange({ textAlign: "left" })}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    settings.textAlign === "left"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-200/90 hover:bg-stone-300 text-stone-800"
                  }`}
                >
                  <AlignLeft className="h-3.5 w-3.5" />
                  <span>Align Left</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ textAlign: "justify" })}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    settings.textAlign === "justify"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-200/90 hover:bg-stone-300 text-stone-800"
                  }`}
                >
                  <AlignJustify className="h-3.5 w-3.5" />
                  <span>Justify</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
