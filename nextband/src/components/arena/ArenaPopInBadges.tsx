/**
 * ARENA POP-IN BADGES (SPRING ANIMATION CSS COMPONENT)
 * Tuân thủ Hiến pháp:
 * - Điều 12 (Component chỉ render)
 * - Điều 41.4 (Web Standards thuần túy, không phụ thuộc thư viện bên ngoài dễ lỗi thời)
 * Avatar nảy bật giữa màn hình với màu gradient rực rỡ và hiệu ứng bounce CSS.
 */

import React from 'react';

export interface ArenaLobbyPlayer {
  id: string;
  nickname: string;
  colorGradient?: string;
}

const GRADIENTS = [
  'from-red-500 to-rose-600 border-red-400',
  'from-blue-500 to-cyan-600 border-blue-400',
  'from-amber-500 to-orange-600 border-amber-400',
  'from-emerald-500 to-teal-600 border-emerald-400',
  'from-purple-500 to-indigo-600 border-purple-400',
  'from-pink-500 to-rose-500 border-pink-400',
];

interface ArenaPopInBadgesProps {
  players: ArenaLobbyPlayer[];
}

export const ArenaPopInBadges: React.FC<ArenaPopInBadgesProps> = React.memo(({ players }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto py-6">
      {players.map((player, index) => {
        const gradient = player.colorGradient || GRADIENTS[index % GRADIENTS.length];
        const initial = player.nickname.charAt(0).toUpperCase();

        return (
          <div
            key={player.id}
            className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-xl backdrop-blur-md animate-in fade-in zoom-in-50 duration-300 transform hover:scale-105 transition-all"
          >
            {/* Avatar Icon */}
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} border flex items-center justify-center text-white font-black text-sm shadow-md`}
            >
              {initial}
            </div>

            {/* Player Nickname */}
            <span className="text-sm font-extrabold text-white tracking-wide">
              {player.nickname}
            </span>
          </div>
        );
      })}
    </div>
  );
});

ArenaPopInBadges.displayName = 'ArenaPopInBadges';
