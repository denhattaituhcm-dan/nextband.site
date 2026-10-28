/**
 * HOST ROOM CONFIG MODAL (CÀI ĐẶT THÔNG SỐ PHÒNG THI ĐẤU)
 * Bổ sung tùy chọn Chế độ chơi:
 * - 'CLASSIC': Kahoot Cổ Điển (Đua điểm trắc nghiệm)
 * - 'GOLD_QUEST': Cướp Vàng (Mở rương, cướp vàng, lật kèo kịch tính)
 * - 'ARENA_100': Đấu Trường 100 (Sinh tồn qua các vòng, trụ hạng tìm người sống sót cuối cùng)
 * Mặc định: Giữ nguyên 'CLASSIC' nếu giáo viên không chỉnh.
 */

import React from 'react';
import { X, Clock, Award, Users, Check, Gamepad2, Shield, Heart } from 'lucide-react';

export type ArenaGameMode = 'CLASSIC' | 'GOLD_QUEST' | 'ARENA_100' | 'TEAM_BATTLE';

export interface RoomSettings {
  gameMode: ArenaGameMode; // 'CLASSIC' | 'GOLD_QUEST' | 'ARENA_100'
  survivalInitialLives: 1 | 3; // 1 mạng (Loại trực tiếp) hoặc 3 mạng (Sinh tồn nhiều mạng) cho ARENA_100
  timeLimit: number;       // Thời gian tính bằng giây: 10, 15, 20, 30
  scoringMode: 'standard' | 'double' | 'no_points';
  maxSlots: number;        // Sĩ số: 10, 12, 16, 20
  showDebrief: boolean;    // Bật chẩn đoán giải thích sau câu
  autoLockOnAllAnswered: boolean;
}

export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  gameMode: 'CLASSIC',
  survivalInitialLives: 3,
  timeLimit: 15,
  scoringMode: 'standard',
  maxSlots: 24,
  showDebrief: true,
  autoLockOnAllAnswered: true,
};

interface HostSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: RoomSettings;
  onSaveSettings: (newSettings: RoomSettings) => void;
}

export const HostSettingsModal: React.FC<HostSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [localSettings, setLocalSettings] = React.useState<RoomSettings>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(localSettings);
    onClose();
  };

  const handleResetDefault = () => {
    setLocalSettings(DEFAULT_ROOM_SETTINGS);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="bg-[#1a0f3d] border-2 border-purple-400/40 rounded-3xl shadow-2xl max-w-xl w-full p-6 text-white space-y-5 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 font-black">
              ⚙️
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-white">Cài đặt phòng đấu</h3>
              <p className="text-xs text-purple-300/80">Tùy biến chế độ & thông số hiển thị lớp học</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cài đặt 0: CHẾ ĐỘ CHƠI (GAME MODE) */}
        <div className="space-y-2.5">
          <span className="text-xs font-black text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
            <Gamepad2 className="w-4 h-4 text-orange-400" /> Chọn chế độ thi đấu
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setLocalSettings((prev) => ({ ...prev, gameMode: 'CLASSIC' }))}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                localSettings.gameMode === 'CLASSIC'
                  ? 'bg-purple-900/80 border-purple-400 text-white shadow-lg shadow-purple-900/50'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">🎯</span>
                {localSettings.gameMode === 'CLASSIC' && (
                  <span className="text-[10px] px-2 py-0.5 bg-purple-600 text-white font-black rounded-full">
                    Đang chọn
                  </span>
                )}
              </div>
              <div className="font-black text-xs sm:text-sm text-white">Kahoot Cổ Điển</div>
              <div className="text-[10px] text-purple-200/80 mt-0.5 leading-snug">Đua điểm tốc độ & bảng xếp hạng</div>
            </button>

            <button
              type="button"
              onClick={() => setLocalSettings((prev) => ({ ...prev, gameMode: 'GOLD_QUEST' }))}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                localSettings.gameMode === 'GOLD_QUEST'
                  ? 'bg-amber-950/80 border-amber-400 text-white shadow-lg shadow-amber-900/50'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">💰</span>
                {localSettings.gameMode === 'GOLD_QUEST' && (
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500 text-slate-950 font-black rounded-full">
                    Đang chọn
                  </span>
                )}
              </div>
              <div className="font-black text-xs sm:text-sm text-amber-300">Cướp Vàng</div>
              <div className="text-[10px] text-amber-200/80 mt-0.5 leading-snug">Mở rương báu, cướp vàng lật kèo</div>
            </button>

            <button
              type="button"
              onClick={() => setLocalSettings((prev) => ({ ...prev, gameMode: 'ARENA_100' }))}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                localSettings.gameMode === 'ARENA_100'
                  ? 'bg-rose-950/80 border-rose-400 text-white shadow-lg shadow-rose-900/50'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">🛡️</span>
                {localSettings.gameMode === 'ARENA_100' && (
                  <span className="text-[10px] px-2 py-0.5 bg-rose-500 text-white font-black rounded-full">
                    Đang chọn
                  </span>
                )}
              </div>
              <div className="font-black text-xs sm:text-sm text-rose-300">Đấu Trường 100</div>
              <div className="text-[10px] text-rose-200/80 mt-0.5 leading-snug">Sinh tồn trụ hạng qua từng vòng</div>
            </button>

            <button
              type="button"
              onClick={() => setLocalSettings((prev) => ({ ...prev, gameMode: 'TEAM_BATTLE' }))}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                localSettings.gameMode === 'TEAM_BATTLE'
                  ? 'bg-gradient-to-br from-rose-950/90 to-cyan-950/90 border-amber-400 text-white shadow-lg shadow-purple-900/50'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">⚔️</span>
                {localSettings.gameMode === 'TEAM_BATTLE' && (
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500 text-slate-950 font-black rounded-full">
                    Đang chọn
                  </span>
                )}
              </div>
              <div className="font-black text-xs sm:text-sm text-amber-300">Chia Đội Phân Tranh</div>
              <div className="text-[10px] text-purple-200/80 mt-0.5 leading-snug">Kéo co điểm số Đỏ vs Xanh</div>
            </button>
          </div>

          {/* Tùy chọn Luật Sinh Tồn khi chọn Đấu Trường 100 */}
          {localSettings.gameMode === 'ARENA_100' && (
            <div className="mt-3 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-rose-200">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Luật Sinh Tồn Đấu Trường 100
                </span>
                <span className="text-[11px] text-amber-300 font-semibold">
                  ⚠️ Không thể hồi mạng — Càng chơi càng khốc liệt
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setLocalSettings((prev) => ({ ...prev, survivalInitialLives: 3 }))}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    localSettings.survivalInitialLives === 3
                      ? 'bg-rose-600/30 border-rose-400 text-white shadow-md'
                      : 'bg-black/20 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-rose-200">❤️❤️❤️ 3 Mạng (Khuyên dùng)</span>
                    {localSettings.survivalInitialLives === 3 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Trả lời sai mất 1 mạng. Hạn chế bị loại sớm, phù hợp lớp học tiếng Anh.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setLocalSettings((prev) => ({ ...prev, survivalInitialLives: 1 }))}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    localSettings.survivalInitialLives === 1
                      ? 'bg-rose-600/30 border-rose-400 text-white shadow-md'
                      : 'bg-black/20 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-amber-300">⚡ 1 Mạng (Loại trực tiếp)</span>
                    {localSettings.survivalInitialLives === 1 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Chuẩn format gameshow Đấu Trường 100: Sai hoặc hết giờ là bị loại ngay!
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cài đặt 1: Giới hạn thời gian (Time Limit) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400" /> Thời gian câu hỏi
            </span>
            <span className="text-amber-400 font-mono text-sm">{localSettings.timeLimit} Giây</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[10, 15, 20, 30].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setLocalSettings((prev) => ({ ...prev, timeLimit: t }))}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border cursor-pointer ${
                  localSettings.timeLimit === t
                    ? 'bg-amber-500 border-amber-300 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {t}s {t === 15 && <span className="text-[10px] opacity-75">(Chuẩn)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cài đặt 2: Sĩ số phòng đấu (Max Slots) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Users className="w-4 h-4 text-blue-400" /> Sĩ số hiển thị tối đa
            </span>
            <span className="text-blue-400 font-mono text-sm">{localSettings.maxSlots} Slots</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[12, 16, 20, 24].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setLocalSettings((prev) => ({ ...prev, maxSlots: s }))}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border cursor-pointer ${
                  localSettings.maxSlots === s
                    ? 'bg-blue-600 border-blue-300 text-white font-black shadow-md shadow-blue-600/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {s} chỗ {s === 24 && <span className="text-[10px] opacity-75">(Chuẩn)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-800/40">
          <button
            type="button"
            onClick={handleResetDefault}
            className="text-xs text-purple-300/80 hover:text-white underline cursor-pointer"
          >
            Khôi phục mặc định
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 border border-white/10 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
