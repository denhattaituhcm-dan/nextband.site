/**
 * HOST ROOM CONFIG MODAL (CÀI ĐẶT THÔNG SỐ PHÒNG THI ĐẤU)
 * Thiết kế theo chuẩn thuộc tính Kahoot:
 * - Giữ nguyên bộ thông số mặc định (Default Presets):
 *   + Thời gian câu: 15 giây
 *   + Cách tính điểm: Tiêu chuẩn (Đúng + Tốc độ)
 *   + Sĩ số phòng: 12 học viên
 *   + Bật âm thanh / Nhạc nền
 *   + Tự động hiển thị phân tích lỗi sai (Misconception trap)
 * - Nếu giáo viên không chỉnh gì, toàn bộ cấu hình mặc định được giữ nguyên 100%.
 */

import React from 'react';
import { X, Clock, Award, Users, Check, Volume2, HelpCircle } from 'lucide-react';

export interface RoomSettings {
  timeLimit: number;       // Thời gian tính bằng giây: 5, 10, 15, 20, 30, 45, 60 (mặc định 15)
  scoringMode: 'standard' | 'double' | 'no_points'; // Hệ số điểm (mặc định 'standard')
  maxSlots: number;        // Sĩ số: 10, 12, 15, 20, 30 (mặc định 12)
  showDebrief: boolean;    // Bật chẩn đoán giải thích sau câu (mặc định true)
  autoLockOnAllAnswered: boolean; // Tự động khóa khi 100% học sinh đã nộp (mặc định true)
}

export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  timeLimit: 15,
  scoringMode: 'standard',
  maxSlots: 12,
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
        className="bg-[#1a0f3d] border-2 border-purple-400/40 rounded-3xl shadow-2xl max-w-lg w-full p-6 text-white space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 font-black">
              ⚙️
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-white">Cài đặt phòng đấu</h3>
              <p className="text-xs text-purple-300/80">Tùy biến thông số hiển thị & luật chơi chuẩn Kahoot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cài đặt 1: Giới hạn thời gian (Time Limit) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400" /> Giới hạn thời gian câu hỏi
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
                {t} giây {t === 15 && <span className="text-[10px] opacity-75">(Chuẩn)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cài đặt 2: Hệ số tính điểm (Scoring Mode) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" /> Cách tính điểm
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'standard', label: 'Tiêu chuẩn', sub: 'Đúng + Tốc độ' },
              { id: 'double', label: 'X2 Điểm', sub: 'Nhân đôi điểm số' },
              { id: 'no_points', label: 'Khảo sát', sub: 'Không tính điểm' },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setLocalSettings((prev) => ({ ...prev, scoringMode: sc.id as any }))}
                className={`py-2.5 px-3 rounded-xl text-left transition-all border cursor-pointer ${
                  localSettings.scoringMode === sc.id
                    ? 'bg-emerald-600 border-emerald-300 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <div className="font-bold text-xs">{sc.label}</div>
                <div className="text-[10px] opacity-70">{sc.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cài đặt 3: Sĩ số phòng đấu (Max Slots) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Users className="w-4 h-4 text-blue-400" /> Sĩ số hiển thị tối đa
            </span>
            <span className="text-blue-400 font-mono text-sm">{localSettings.maxSlots} Slots</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[10, 12, 16, 20].map((s) => (
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
                {s} chỗ {s === 12 && <span className="text-[10px] opacity-75">(Chuẩn)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cài đặt 4: Bật/Tắt giải thích & Khóa sớm */}
        <div className="space-y-2 pt-1 border-t border-purple-800/40">
          <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <span className="text-xs font-bold text-slate-200">
              Hiện chẩn đoán bẫy Collocation (Misconception)
            </span>
            <input
              type="checkbox"
              checked={localSettings.showDebrief}
              onChange={(e) => setLocalSettings((prev) => ({ ...prev, showDebrief: e.target.checked }))}
              className="w-4 h-4 rounded text-purple-600 accent-purple-500"
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
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
              <Check className="w-4 h-4" /> Áp dụng cài đặt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
