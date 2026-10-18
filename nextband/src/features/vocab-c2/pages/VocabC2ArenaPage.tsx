import React, { useState } from "react";
import { VOCAB_C2_UNITS, getC2UnitByNumber } from "@/data/vocab-c2";
import { useLexiconEngine } from "../engine/useLexiconEngine";
import { ArenaHeader, ArenaModeId } from "../components/ArenaHeader";
import { ModeASchemaVision } from "../components/ModeASchemaVision";
import { ModeBSynapseSlash } from "../components/ModeBSynapseSlash";
import { ModeCTriLockVault } from "../components/ModeCTriLockVault";
import { ModeDPersonaClash } from "../components/ModeDPersonaClash";
import { ModeEChroniclesOfFate } from "../components/ModeEChroniclesOfFate";
import { SemanticGradientLab } from "../components/SemanticGradientLab";
import { FrameSemanticWebBurst } from "../components/FrameSemanticWebBurst";
import { ThemeProvider, useArenaTheme } from "../context/ThemeContext";
import { C2UnitHubSelector } from "../components/C2UnitHubSelector";
import {
  Layers,
  Zap,
  Key,
  Swords,
  BookOpen,
  Sliders,
  Network,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

const VocabC2ArenaContent: React.FC = () => {
  const [selectedUnitNumber, setSelectedUnitNumber] = useState(1);
  const [activeMode, setActiveMode] = useState<ArenaModeId>("schema");
  // Default: show the 3D unit selector landing hub first
  const [viewState, setViewState] = useState<"hub" | "arena">("hub");

  const currentUnit = getC2UnitByNumber(selectedUnitNumber);
  const { theme, isZenMode, toggleZenMode } = useArenaTheme();

  const {
    state,
    soundEnabled,
    setSoundEnabled,
    headerRankInfo,
    nextRank,
    rankProgressPercent,
    mistakes,
    recordAttempt,
    clearMistake,
  } = useLexiconEngine(selectedUnitNumber);

  const avgLatency = useMemoAvgLatency(state.records);
  const isPaperTheme = theme === "paper";
  const isSlateTheme = theme === "slate";

  const handleSelectUnitAndEnterArena = (unitNum: number) => {
    setSelectedUnitNumber(unitNum);
    setViewState("arena");
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isPaperTheme
          ? "bg-[#F4EFEA] text-[#1E293B] selection:bg-amber-200 selection:text-amber-950"
          : isSlateTheme
          ? "bg-[#090D16] text-slate-100 selection:bg-sky-500 selection:text-slate-950"
          : "bg-[#070A12] text-slate-100 selection:bg-cyan-500 selection:text-slate-950"
      }`}
    >
      {/* Cyber-Academic HUD - chỉ hiển thị khi người dùng đã vào làm bài (viewState === "arena") */}
      {!isZenMode && viewState === "arena" && (
        <ArenaHeader
          unit={currentUnit}
          allUnits={VOCAB_C2_UNITS}
          onSelectUnit={(num) => setSelectedUnitNumber(num)}
          xp={state.totalXp}
          rank={headerRankInfo}
          nextRankXp={nextRank?.minXp || undefined}
          rankProgressPercent={rankProgressPercent}
          combo={state.currentCombo}
          maxCombo={state.maxCombo}
          avgLatencyMs={avgLatency}
          masteredCount={state.masteredWords.length}
          totalLexiconCount={320}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          mistakes={mistakes}
          onClearMistake={clearMistake}
          onRecordAttempt={recordAttempt}
          onOpenUnitHub={() => setViewState("hub")}
        />
      )}

      {/* Floating Zen Mode exit pill when Zen is active */}
      {isZenMode && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleZenMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md cursor-pointer border transition-all ${
              isPaperTheme
                ? "bg-white/90 border-[#E2D9CC] text-slate-800 hover:bg-white"
                : "bg-slate-900/90 border-slate-700 text-slate-200 hover:text-white"
            }`}
          >
            <EyeOff className="w-3.5 h-3.5 text-purple-500" />
            <span>Thoát Zen Mode [Z]</span>
          </button>
        </div>
      )}

      {/* VIEW STATE 1: 3D Unit Selector Landing Screen */}
      {viewState === "hub" ? (
        <div className="flex-1 w-full animate-in fade-in duration-300">
          <C2UnitHubSelector
            initialUnitNumber={selectedUnitNumber}
            onSelectUnit={handleSelectUnitAndEnterArena}
          />
        </div>
      ) : (
        /* VIEW STATE 2: Main Game Stage Container */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 animate-in fade-in duration-300">
          {/* Streamlined Mode Navigation Bar with 12 Chủ Đề Back Button */}
          {!isZenMode && (
            <div
              className={`flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl border transition-all ${
                isPaperTheme
                  ? "bg-[#FAF7F2] border-[#E2D9CC] shadow-xs text-slate-900"
                  : isSlateTheme
                  ? "bg-[#0F172A] border-slate-700/80 shadow-md text-slate-100"
                  : "bg-[#0B0F19] border-white/10 shadow-lg text-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setViewState("hub")}
                  title="Quay lại sảnh chọn 12 chủ đề 3D"
                  className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 text-xs font-bold ${
                    isPaperTheme
                      ? "bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-xs"
                      : "bg-white/5 border-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>12 Chủ đề</span>
                </button>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase font-mono border ${
                      isPaperTheme
                        ? "bg-teal-50 text-teal-800 border-teal-200"
                        : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    U{currentUnit.unitNumber}
                  </span>
                  <span
                    className={`text-sm font-bold truncate max-w-[200px] sm:max-w-xs ${
                      isPaperTheme ? "text-slate-900 font-serif" : "text-white"
                    }`}
                  >
                    {currentUnit.titleEn}
                  </span>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {[
                  { id: "schema" as ArenaModeId, label: "Schema", icon: Layers },
                  { id: "synapse" as ArenaModeId, label: "Synapse", icon: Zap },
                  { id: "trilock" as ArenaModeId, label: "Tri-Lock", icon: Key },
                  { id: "persona" as ArenaModeId, label: "Persona", icon: Swords },
                  { id: "chronicles" as ArenaModeId, label: "Chronicles", icon: BookOpen },
                  { id: "gradient" as ArenaModeId, label: "Gradients", icon: Sliders },
                  { id: "frameweb" as ArenaModeId, label: "Frames", icon: Network },
                ].map((m) => {
                  const Icon = m.icon;
                  const isActive = activeMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveMode(m.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? isPaperTheme
                            ? "bg-teal-700 text-white font-black shadow-xs"
                            : "bg-cyan-500 text-slate-950 font-black shadow-xs shadow-cyan-500/30"
                          : isPaperTheme
                          ? "bg-white text-slate-700 hover:bg-slate-100 hover:text-black border border-slate-200"
                          : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Mode Render */}
          <div className="w-full">
            {activeMode === "schema" && (
              <ModeASchemaVision unit={currentUnit} onRecordAttempt={recordAttempt} />
            )}
            {activeMode === "synapse" && (
              <ModeBSynapseSlash unit={currentUnit} onRecordAttempt={recordAttempt} />
            )}
            {activeMode === "trilock" && (
              <ModeCTriLockVault unit={currentUnit} onRecordAttempt={recordAttempt} />
            )}
            {activeMode === "persona" && (
              <ModeDPersonaClash unit={currentUnit} onRecordAttempt={recordAttempt} />
            )}
            {activeMode === "chronicles" && (
              <ModeEChroniclesOfFate unit={currentUnit} onRecordAttempt={recordAttempt} />
            )}
            {activeMode === "gradient" && (
              <SemanticGradientLab unit={currentUnit} onRecordAttempt={recordAttempt} />
            )}
            {activeMode === "frameweb" && (
              <FrameSemanticWebBurst frameWebs={currentUnit.frameWebs} />
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export const VocabC2ArenaPage: React.FC = () => {
  return (
    <ThemeProvider>
      <VocabC2ArenaContent />
    </ThemeProvider>
  );
};

function useMemoAvgLatency(records: Record<string, { lastLatencyMs: number | null }>): number {
  const vals = Object.values(records)
    .map((r) => r.lastLatencyMs)
    .filter((l): l is number => typeof l === "number" && l > 0);
  if (vals.length === 0) return 0;
  const sum = vals.reduce((a, b) => a + b, 0);
  return Math.round(sum / vals.length);
}

export default VocabC2ArenaPage;
