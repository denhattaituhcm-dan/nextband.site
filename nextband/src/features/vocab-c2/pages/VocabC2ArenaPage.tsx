import React, { useState } from "react";
import { VOCAB_C2_UNITS, getC2UnitByNumber } from "@/data/vocab-c2";
import { useLexiconEngine } from "../engine/useLexiconEngine";
import { ArenaHeader, ArenaModeId } from "../components/ArenaHeader";
import { ModeASchemaVision } from "../components/ModeASchemaVision";
import { ModeBSynapseSlash } from "../components/ModeBSynapseSlash";
import { ModeCTriLockVault } from "../components/ModeCTriLockVault";
import { ModeDPersonaClash } from "../components/ModeDPersonaClash";
import { ModeEChroniclesOfFate } from "../components/ModeEChroniclesOfFate";
import { Layers, Zap, Key, Swords, BookOpen } from "lucide-react";

export const VocabC2ArenaPage: React.FC = () => {
  const [selectedUnitNumber, setSelectedUnitNumber] = useState(1);
  const [activeMode, setActiveMode] = useState<ArenaModeId>("schema");

  const currentUnit = getC2UnitByNumber(selectedUnitNumber);

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

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Cyber-Academic HUD */}
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
      />

      {/* Main Game Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Unit Info Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0B0F19] border border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                UNIT {currentUnit.unitNumber} • {currentUnit.pdfPages}
              </span>
              <h1 className="text-lg font-black text-white">{currentUnit.titleEn}</h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentUnit.themeSummaryVi}</p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "schema" as ArenaModeId, label: "Mode A: Schema", icon: Layers },
              { id: "synapse" as ArenaModeId, label: "Mode B: Synapse", icon: Zap },
              { id: "trilock" as ArenaModeId, label: "Mode C: Tri-Lock", icon: Key },
              { id: "persona" as ArenaModeId, label: "Mode D: Persona", icon: Swords },
              { id: "chronicles" as ArenaModeId, label: "Mode E: Chronicles", icon: BookOpen },
            ].map((m) => {
              const Icon = m.icon;
              const isActive = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/30"
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
        </div>
      </main>
    </div>
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
