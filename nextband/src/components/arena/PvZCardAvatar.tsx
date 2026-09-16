'use client';

import React from 'react';
import { getCharacterBySeed, CHARACTER_AVATARS, CharacterAvatar } from '@/lib/arena/characterCatalog';

interface PvZCardAvatarProps {
  seed: string | number;
  avatarId?: number;
  plantId?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
}

const SIZE_CONFIGS = {
  sm: {
    container: 'w-10 h-10 rounded-xl',
    border: 'border-2',
    nameText: 'text-[9px]',
  },
  md: {
    container: 'w-16 h-16 rounded-2xl',
    border: 'border-3',
    nameText: 'text-[11px]',
  },
  lg: {
    container: 'w-24 h-24 rounded-3xl',
    border: 'border-4',
    nameText: 'text-xs',
  },
  xl: {
    container: 'w-32 h-32 rounded-3xl',
    border: 'border-4',
    nameText: 'text-sm',
  },
};

export const PvZCardAvatar: React.FC<PvZCardAvatarProps> = ({
  seed,
  avatarId,
  plantId,
  size = 'md',
  showName = false,
  className = '',
}) => {
  const chosenId = avatarId !== undefined ? avatarId : plantId;
  const character: CharacterAvatar = chosenId !== undefined 
    ? (CHARACTER_AVATARS.find(c => c.id === chosenId) || CHARACTER_AVATARS[0])
    : getCharacterBySeed(seed);

  const cfg = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div
        className={`relative overflow-hidden bg-white ${cfg.container} ${cfg.border} border-amber-300/80 shadow-lg shadow-black/30 flex-shrink-0 transition-transform duration-200 hover:scale-105 p-1 flex items-center justify-center`}
        title={character.name}
      >
        <img
          src={character.url}
          alt={character.name}
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
        />
      </div>
      {showName && (
        <span className={`font-bold text-amber-200 truncate max-w-[100px] text-center ${cfg.nameText}`}>
          {character.name}
        </span>
      )}
    </div>
  );
};
