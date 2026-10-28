import React from 'react';
import { Swords } from 'lucide-react';
import { LobbyPlayer } from '@/components/arena/ArenaLobbyKahoot';

interface ArenaTeamTugOfWarProps {
  redScore: number;
  blueScore: number;
  players: LobbyPlayer[];
  cumulativeScores: Record<string, number>;
}

export const ArenaTeamTugOfWar: React.FC<ArenaTeamTugOfWarProps> = React.memo(({
  redScore,
  blueScore,
  players,
  cumulativeScores,
}) => {
  const totalScore = redScore + blueScore;
  const redPercent = totalScore === 0 ? 50 : Math.max(15, Math.min(85, Math.round((redScore / totalScore) * 100)));
  const bluePercent = 100 - redPercent;

  const redPlayers = players.filter((p) => p.team === 'RED');
  const bluePlayers = players.filter((p) => p.team === 'BLUE');

  // Tìm MVP của từng đội
  const getTeamMvp = (teamPlayers: LobbyPlayer[]) => {
    if (teamPlayers.length === 0) return null;
    let mvp = teamPlayers[0];
    let maxPts = cumulativeScores[mvp.name] || 0;
    for (const p of teamPlayers) {
      const pts = cumulativeScores[p.name] || 0;
      if (pts > maxPts) {
        maxPts = pts;
        mvp = p;
      }
    }
    return { name: mvp.name, score: maxPts };
  };

  const redMvp = getTeamMvp(redPlayers);
  const blueMvp = getTeamMvp(bluePlayers);

  const delta = Math.abs(redScore - blueScore);
  const leadingTeam = redScore > blueScore ? 'RED' : blueScore > redScore ? 'BLUE' : 'TIE';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#1c0e3f]/90 to-[#100726]/95 border-2 border-purple-500/40 shadow-2xl shadow-purple-950/70 select-none animate-fadeIn">
      {/* Top Status & Lead Notice */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-rose-600/30 border border-rose-400 flex items-center justify-center text-rose-400 text-sm font-black shadow-sm">
            🔴
          </span>
          <div className="text-left">
            <span className="text-xs sm:text-sm font-black text-rose-300 uppercase tracking-wider block">
              Rồng Lửa (Red Dragons)
            </span>
            <span className="text-[10px] text-slate-300">
              {redPlayers.length} chiến binh {redMvp ? `· MVP: ${redMvp.name} (${redMvp.score}đ)` : ''}
            </span>
          </div>
        </div>

        {/* Center Swords / Leader Badge */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/50 text-[11px] font-black uppercase tracking-wider shadow-md">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span className={leadingTeam === 'RED' ? 'text-rose-400' : leadingTeam === 'BLUE' ? 'text-cyan-400' : 'text-amber-300'}>
              {leadingTeam === 'RED'
                ? `Đỏ Dẫn +${delta}đ`
                : leadingTeam === 'BLUE'
                ? `Xanh Dẫn +${delta}đ`
                : 'Thế Trận Cân Bằng'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-row-reverse text-right">
          <span className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-cyan-400 text-sm font-black shadow-sm">
            🔵
          </span>
          <div className="text-right">
            <span className="text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-wider block">
              Phượng Hoàng (Blue Phoenix)
            </span>
            <span className="text-[10px] text-slate-300">
              {bluePlayers.length} chiến binh {blueMvp ? `· MVP: ${blueMvp.name} (${blueMvp.score}đ)` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Main Tug-of-War Track Bar */}
      <div className="relative w-full h-8 sm:h-10 rounded-2xl p-1 bg-purple-950/90 border-2 border-purple-700/60 overflow-hidden flex items-center shadow-inner">
        {/* Red Team Fill */}
        <div
          className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-amber-500 rounded-l-xl transition-all duration-700 flex items-center justify-start pl-3 shadow-md"
          style={{ width: `${redPercent}%` }}
        >
          <span className="text-xs sm:text-sm font-black text-white font-mono drop-shadow">
            {redScore.toLocaleString()} pts ({redPercent}%)
          </span>
        </div>

        {/* Center Indicator Pin / Tug Flag */}
        <div
          className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white shadow-[0_0_15px_#fff] z-10 transition-all duration-700 pointer-events-none rounded-full flex items-center justify-center"
          style={{ left: `${redPercent}%` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Blue Team Fill */}
        <div
          className="h-full bg-gradient-to-l from-cyan-700 via-sky-500 to-blue-500 rounded-r-xl transition-all duration-700 flex items-center justify-end pr-3 shadow-md"
          style={{ width: `${bluePercent}%` }}
        >
          <span className="text-xs sm:text-sm font-black text-white font-mono drop-shadow">
            ({bluePercent}%) {blueScore.toLocaleString()} pts
          </span>
        </div>
      </div>

      {/* Micro Player Avatars by Team */}
      <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-purple-900/40 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-rose-300 uppercase">Thành viên Đỏ:</span>
          {redPlayers.map((p) => (
            <span
              key={p.id}
              className="px-2 py-0.5 rounded-lg bg-rose-500/20 border border-rose-400/40 text-[10px] font-bold text-rose-200"
            >
              {p.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <span className="text-[10px] font-bold text-cyan-300 uppercase">Thành viên Xanh:</span>
          {bluePlayers.map((p) => (
            <span
              key={p.id}
              className="px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-bold text-cyan-200"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

ArenaTeamTugOfWar.displayName = 'ArenaTeamTugOfWar';
