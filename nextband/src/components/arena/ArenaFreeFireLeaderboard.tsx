import React from 'react';
import { Trophy, Zap, Crown, Flame, ChevronRight, Award } from 'lucide-react';
import { PlayerPublicRank } from '@/lib/arena/types';
import { LobbyPlayer } from '@/components/arena/ArenaLobbyKahoot';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { getCharacterBySeed } from '@/lib/arena/characterCatalog';

interface PlayerAnswerRecord {
  playerId: string;
  nickname: string;
  optionId: string;
  timeLeft: number;
  score: number;
  gold?: number;
}

interface ArenaFreeFireLeaderboardProps {
  rankings: PlayerPublicRank[];
  answers: Record<string, PlayerAnswerRecord>;
  players: LobbyPlayer[];
  questionIndex: number;
  totalQuestions: number;
  gameMode?: 'CLASSIC' | 'GOLD_QUEST';
}

export const ArenaFreeFireLeaderboard: React.FC<ArenaFreeFireLeaderboardProps> = React.memo(({
  rankings,
  answers,
  players,
  questionIndex,
  totalQuestions,
  gameMode = 'CLASSIC',
}) => {
  const top10 = rankings.slice(0, 10);
  const leader = rankings[0];
  const leaderPlayer = players.find(
    (p) => p.name.toLowerCase() === leader?.nickname.toLowerCase() || p.id === leader?.playerId
  );
  const leaderAnswer = leader ? answers[leader.nickname] : undefined;
  const unitLabel = gameMode === 'GOLD_QUEST' ? '🪙' : 'pts';

  // Helper tìm avatar seed cho mỗi học sinh
  const getPlayerSeed = (nickname: string, playerId: string) => {
    const found = players.find(
      (p) => p.name.toLowerCase() === nickname.toLowerCase() || p.id === playerId
    );
    return found?.avatarSeed !== undefined ? found.avatarSeed : nickname;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 animate-fadeIn select-none">
      {/* Top Tournament Header Banner */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-900/60 via-purple-900/40 to-blue-900/60 border-y border-cyan-500/30 backdrop-blur-sm rounded-xl">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs md:text-sm uppercase tracking-wider rounded-md transform -skew-x-12 shadow-md">
            CÂU {questionIndex + 1} / {totalQuestions}
          </div>
          <span className="text-xs md:text-sm font-black tracking-widest text-cyan-300 uppercase">
            {gameMode === 'GOLD_QUEST' ? 'BẢNG VÀNG ĐẠI GIA · GOLD RUSH' : 'BẢNG XẾP HẠNG CHIẾN THẦN · BATTLE ROYALE'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>{players.length} Chiến binh đang tham chiến</span>
        </div>
      </div>

      {/* Main 2-Column Esports Showdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI: MVP / TOP 1 SPOTLIGHT (BOOYAH STYLE) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-blue-950/80 via-indigo-950/70 to-slate-950/90 border-2 border-amber-400/50 shadow-2xl shadow-blue-950/80 relative overflow-hidden text-center group">
          {/* Tia sáng nền & Hào quang */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Huy hiệu đỉnh */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>NGƯỜI DẪN ĐẦU VÒNG {questionIndex + 1}</span>
          </div>

          {/* Typography BOOYAH / TOP 1 Thể thao điện tử */}
          <div className="relative my-2 transform -rotate-2 scale-105">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-500 drop-shadow-[0_4px_10px_rgba(245,158,11,0.5)]">
              BOOYAH!
            </h2>
            <span className="block text-[11px] font-black uppercase tracking-widest text-cyan-300 drop-shadow">
              CHẾ NGỰ ĐẤU TRƯỜNG
            </span>
          </div>

          {leader ? (
            <div className="space-y-3 mt-3 w-full flex flex-col items-center">
              {/* Avatar lớn kèm vương miện */}
              <div className="relative pt-3">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                  <Crown className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-md" />
                </div>
                <div className="p-2 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-xl shadow-amber-500/30">
                  <PvZCardAvatar
                    seed={getPlayerSeed(leader.nickname, leader.playerId)}
                    size="lg"
                    className="transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Tên & Chiến binh */}
              <div className="w-full">
                <h3 className="text-xl md:text-2xl font-black text-white tracking-wide uppercase truncate max-w-[240px] mx-auto drop-shadow-md">
                  {leader.nickname}
                </h3>
                <span className="text-xs font-bold text-amber-300/90 block mt-0.5">
                  {getCharacterBySeed(getPlayerSeed(leader.nickname, leader.playerId)).name}
                </span>
              </div>

              {/* Thẻ chỉ số thành tích vòng này */}
              <div className="w-full grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-2xl bg-blue-900/40 border border-cyan-400/30 text-center">
                  <span className="text-[10px] font-bold text-cyan-300 block uppercase">
                    Điểm câu này
                  </span>
                  <span className="text-base font-black text-emerald-400 font-mono">
                    {leaderAnswer && leaderAnswer.score > 0 ? `+${leaderAnswer.score}` : '+0'}
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-center">
                  <span className="text-[10px] font-bold text-amber-300 block uppercase">
                    Tổng tích lũy
                  </span>
                  <span className="text-base font-black text-amber-300 font-mono">
                    {leader.totalScore.toLocaleString()} {unitLabel}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 font-semibold my-8">Chưa có người chơi</p>
          )}
        </div>

        {/* CỘT PHẢI: FREE FIRE STYLE SLANTED BANNERS (TOP 10) */}
        <div className="lg:col-span-8 space-y-2">
          {/* Header Bảng chỉ số (Cột Hạng, Người Chơi, Câu Này, Tổng Điểm) */}
          <div className="flex items-center justify-between px-4 py-1.5 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-purple-800/40">
            <div className="w-14 text-center">Hạng</div>
            <div className="flex-1 text-left pl-3">Chiến binh</div>
            <div className="w-24 text-right pr-2">Câu này</div>
            <div className="w-28 text-right pr-2">Tổng điểm</div>
          </div>

          {/* Danh sách Top 10 dạng dải banner vát góc thể thao */}
          {top10.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-bold bg-purple-950/30 rounded-2xl border border-purple-800/40">
              Chưa có dữ liệu bài nộp cho vòng đấu này.
            </div>
          ) : (
            <div className="space-y-1.5">
              {top10.map((p, idx) => {
                const ans = answers[p.nickname];
                const roundPts = ans ? ans.score : 0;
                const isTop1 = p.rank === 1;
                const isTop2 = p.rank === 2;
                const isTop3 = p.rank === 3;

                // Màu sắc thanh dải theo chuẩn Free Fire
                const rowBg = isTop1
                  ? 'bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#075985] border-2 border-amber-400 shadow-lg shadow-amber-500/20'
                  : isTop2
                  ? 'bg-gradient-to-r from-[#0369a1] via-[#075985] to-[#0c4a6e] border border-slate-300/60 shadow-md'
                  : isTop3
                  ? 'bg-gradient-to-r from-[#0369a1] via-[#075985] to-[#0c4a6e] border border-amber-600/50 shadow-md'
                  : 'bg-gradient-to-r from-[#075985]/90 via-[#0c4a6e]/80 to-[#0f172a]/90 border border-cyan-500/20 hover:border-cyan-400/50';

                return (
                  <div
                    key={p.playerId || idx}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 transform hover:translate-x-1.5 ${rowBg}`}
                  >
                    {/* HẠNG (Rank Badge nhọn) */}
                    <div className="w-14 flex items-center justify-center shrink-0">
                      <div
                        className={`px-2 py-0.5 rounded font-black text-xs md:text-sm italic tracking-tight shadow-md flex items-center justify-center min-w-[36px] ${
                          isTop1
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black'
                            : isTop2
                            ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black'
                            : isTop3
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black'
                            : 'bg-blue-950/80 text-cyan-300 border border-cyan-400/40 font-bold'
                        }`}
                      >
                        {p.rank === 1 ? '1ST' : p.rank === 2 ? '2ND' : p.rank === 3 ? '3RD' : `${p.rank}TH`}
                      </div>
                    </div>

                    {/* AVATAR + NICKNAME */}
                    <div className="flex-1 flex items-center gap-2.5 min-w-0 pl-2">
                      <div className="shrink-0">
                        <PvZCardAvatar
                          seed={getPlayerSeed(p.nickname, p.playerId)}
                          size="sm"
                          className="scale-90"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="font-black text-sm md:text-base text-white tracking-wide uppercase truncate block drop-shadow-sm">
                          {p.nickname}
                        </span>
                        <span className="text-[10px] font-semibold text-cyan-300/80 block truncate">
                          {getCharacterBySeed(getPlayerSeed(p.nickname, p.playerId)).name}
                        </span>
                      </div>
                    </div>

                    {/* ĐIỂM CÂU NÀY (ROUND PTS) */}
                    <div className="w-24 text-right pr-2 shrink-0 font-mono">
                      {roundPts > 0 ? (
                        <span className="text-xs md:text-sm font-black text-emerald-300 drop-shadow-sm flex items-center justify-end gap-1">
                          <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse" />
                          +{roundPts}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">+0</span>
                      )}
                    </div>

                    {/* TỔNG ĐIỂM (TOTAL PTS) */}
                    <div className="w-28 text-right pr-2 shrink-0 font-mono">
                      <span
                        className={`text-sm md:text-base font-black ${
                          isTop1
                            ? 'text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]'
                            : 'text-white'
                        }`}
                      >
                        {p.totalScore.toLocaleString()} {unitLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ArenaFreeFireLeaderboard.displayName = 'ArenaFreeFireLeaderboard';
