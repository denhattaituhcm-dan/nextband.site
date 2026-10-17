'use client';

import React, { useState, useMemo } from 'react';
import { X, Sparkles, Search, Check, Shield, Rocket, Heart, Smile, Palette } from 'lucide-react';
import { CHARACTER_AVATARS, CharacterAvatar } from '@/lib/arena/characterCatalog';
import { PvZCardAvatar } from './PvZCardAvatar';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAvatarId: number;
  onSelectAvatar: (avatarId: number) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: Sparkles },
  { id: 'anime_fantasy', label: 'Yu-Gi-Oh! & Anime', icon: Shield },
  { id: 'pop_heroes', label: 'Siêu Anh Hùng', icon: Rocket },
  { id: 'cute_chibi', label: 'Đáng Yêu & Chibi', icon: Heart },
  { id: 'space_nature', label: 'Vũ Trụ & Tự Nhiên', icon: Smile },
  { id: 'creative', label: 'Sáng Tạo', icon: Palette },
];

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  selectedAvatarId,
  onSelectAvatar,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [temporarySelection, setTemporarySelection] = useState<number>(selectedAvatarId);

  // Sync state whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setTemporarySelection(selectedAvatarId);
      setSearchQuery('');
    }
  }, [isOpen, selectedAvatarId]);

  const filteredAvatars = useMemo(() => {
    return CHARACTER_AVATARS.filter((avatar) => {
      const matchCategory = activeCategory === 'all' || avatar.type === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        avatar.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        avatar.type.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const currentPicked = CHARACTER_AVATARS.find((c) => c.id === temporarySelection) || CHARACTER_AVATARS[0];

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSelectAvatar(temporarySelection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-gradient-to-b from-[#1e0f45] via-[#160a33] to-[#0d0521] border border-purple-500/40 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-picker-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-500/20 flex items-center justify-between bg-purple-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <h2 id="avatar-picker-title" className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                Kho Linh Vật Đấu Trường
              </h2>
              <p className="text-xs text-purple-200/80">
                Chọn avatar đại diện cho bạn trên màn chiếu thi đấu
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 space-y-3 border-b border-purple-500/20 bg-purple-950/20">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhân vật (VD: Yugi, Pikachu, Batman...)"
              className="w-full pl-10 pr-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-xl text-xs sm:text-sm text-white placeholder:text-purple-300/50 outline-none focus:border-amber-400 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                      : 'bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 border border-purple-700/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                  <span>
                    {cat.label} ({cat.id === 'all' ? CHARACTER_AVATARS.length : CHARACTER_AVATARS.filter((a) => a.type === cat.id).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Avatar Grid */}
        <div className="p-3 sm:p-4 flex-1 overflow-y-auto overscroll-contain">
          {filteredAvatars.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-purple-300">
              <Smile className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-sm">Không tìm thấy avatar nào khớp với &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
              {filteredAvatars.map((avatar) => {
                const isSelected = temporarySelection === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setTemporarySelection(avatar.id)}
                    onDoubleClick={() => {
                      setTemporarySelection(avatar.id);
                      onSelectAvatar(avatar.id);
                      onClose();
                    }}
                    className={`group relative p-2.5 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500/25 border-amber-400 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400 scale-[1.03]'
                        : 'bg-purple-950/40 hover:bg-purple-900/50 border-purple-700/40 hover:border-purple-500/60'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-400 text-purple-950 flex items-center justify-center shadow-md animate-in zoom-in-50">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <PvZCardAvatar avatarId={avatar.id} seed={avatar.id} size="md" />
                    <span className={`text-[11px] font-bold block max-w-full truncate ${isSelected ? 'text-amber-300' : 'text-slate-200 group-hover:text-white'}`}>
                      {avatar.name}
                    </span>
                    <span className="text-[9px] text-purple-300/70 capitalize block max-w-full truncate">
                      {avatar.type.replace('_', ' ')}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-500/20 bg-purple-950/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <PvZCardAvatar avatarId={currentPicked.id} seed={currentPicked.id} size="sm" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider block">
                Đang chọn:
              </span>
              <span className="text-xs sm:text-sm font-black text-amber-300 truncate block">
                {currentPicked.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-900 border border-purple-700/60 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" /> Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
