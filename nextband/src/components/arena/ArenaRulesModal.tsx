'use client';

import React, { useEffect } from 'react';
import {
  X,
  BookOpen,
  Monitor,
  Smartphone,
  Zap,
  Flame,
  Coins,
  ShieldCheck,
  Trophy,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ArenaGameMode } from '@/components/arena/HostSettingsModal';

interface ArenaRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameMode?: ArenaGameMode;
  survivalInitialLives?: 1 | 3;
}

export const ArenaRulesModal: React.FC<ArenaRulesModalProps> = ({
  isOpen,
  onClose,
  gameMode = 'CLASSIC',
  survivalInitialLives = 3,
}) => {
  // Lắng nghe phím ESC hoặc Enter để đóng modal nhanh
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-3xl bg-[#1a0f3d] border-2 border-purple-500/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden text-white flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/50 bg-purple-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-950/40">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-[10px] font-black uppercase tracking-wider text-purple-300">
                <Sparkles className="w-3 h-3 text-amber-400" /> NextQuiz Classroom Engine
              </div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-wide">
                Hướng Dẫn Trả Lời & Nội Quy Thi Đấu
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-900/50 hover:bg-purple-800 text-purple-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-purple-700/50"
            title="Đóng (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-sm">
          
          {/* PHẦN 1: CÁCH TRẢ LỜI CÂU HỎI TRÊN ĐIỆN THOẠI */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>1. Quy trình quan sát và trả lời trên điện thoại:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Bước 1 */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 font-black text-sm">
                  1
                </div>
                <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-blue-400" /> Nhìn Màn Chiếu Lớp
                </h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  Đề bài, hình ảnh và 4 ô đáp án (Đỏ, Xanh, Vàng, Lục) hiển thị trên màn chiếu lớn của giáo viên.
                </p>
              </div>

              {/* Bước 2 */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 font-black text-sm">
                  2
                </div>
                <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Chọn & Xác Nhận
                </h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  Bấm nút màu tương ứng trên điện thoại $\to$ Bấm nút <strong>"XÁC NHẬN"</strong> để chốt đáp án, chống bấm nhầm.
                </p>
              </div>

              {/* Bước 3 */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-sm">
                  3
                </div>
                <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> Tốc Độ Là Điểm Số
                </h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  Điểm = 100 điểm + (giây còn lại &times; 10). Trả lời đúng càng nhanh thì điểm cộng càng cao!
                </p>
              </div>
            </div>
          </div>

          {/* PHẦN 2: CƠ CHẾ ĐẶC BIỆT CỦA CHẾ ĐỘ THI */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>
                2. Cơ chế đặc biệt (
                {gameMode === 'GOLD_QUEST'
                  ? 'Chế độ Cướp Vàng 💰'
                  : gameMode === 'ARENA_100'
                  ? 'Chế độ Đấu Trường 100 🛡️'
                  : gameMode === 'TEAM_BATTLE'
                  ? 'Chia Đội Phân Tranh ⚔️'
                  : 'Chế độ Cổ Điển 🎯'}
                ):
              </span>
            </div>

            {gameMode === 'GOLD_QUEST' ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-yellow-950/40 to-amber-950/50 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span>RƯƠNG BÁU & CƯỚP VÀNG LIVE:</span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  Mỗi câu trả lời đúng, học sinh được mở 1 trong 3 rương báu bí ẩn: nhận thêm vàng, nhân đôi số vàng hoặc được quyền chọn cướp vàng từ đối thủ top đầu để bứt phá bảng xếp hạng!
                </p>
              </div>
            ) : gameMode === 'ARENA_100' ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/50 to-rose-950/60 border-2 border-rose-400/60 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
                  <Flame className="w-5 h-5 text-rose-400 animate-bounce" />
                  <span>
                    ĐẤU TRƯỜNG 100 — THỬ THÁCH SINH TỒN ({survivalInitialLives === 1 ? '⚡ 1 MẠNG LOẠI TRỰC TIẾP' : '❤️❤️❤️ 3 MẠNG SINH TỒN'}):
                  </span>
                </div>
                <ul className="text-xs text-rose-100/90 leading-relaxed space-y-1.5 list-disc pl-4">
                  <li>
                    Mỗi chiến binh bước vào đấu trường với <strong>{survivalInitialLives} mạng ❤️</strong>. Trả lời đúng thì tiếp tục trụ lại; trả lời sai hoặc hết giờ sẽ bị <strong>trừ 1 mạng (Không thể hồi mạng)</strong>.
                  </li>
                  <li>
                    <strong>Chế độ Thử Sức khi hết mạng:</strong> Học viên hết mạng sẽ rời sàn đấu chính nhưng vẫn được chọn đáp án trên điện thoại để tự ôn tập và lưu vào Sổ Tay Học Thuật!
                  </li>
                  <li>
                    <strong>Điều kiện Chiến Thắng:</strong> Chiến binh cuối cùng trụ lại trên sàn đấu sẽ đăng quang Quán Quân ngay lập tức, hoặc phân định theo số mạng còn lại & điểm tốc độ khi hết bộ câu hỏi.
                  </li>
                </ul>
              </div>
            ) : gameMode === 'TEAM_BATTLE' ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-purple-950/50 to-blue-950/60 border-2 border-amber-400/60 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                  <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span>CHIA ĐỘI PHÂN TRANH — KÉO CO THỜI GIAN THỰC (TUG-OF-WAR ⚔️):</span>
                </div>
                <ul className="text-xs text-slate-200 leading-relaxed space-y-1.5 list-disc pl-4">
                  <li>
                    Người chơi tự động được chia làm 2 chiến tuyến: <strong className="text-red-400">🔴 Rồng Đỏ (Red Dragons)</strong> và <strong className="text-blue-400">🔵 Phượng Lam (Blue Phoenix)</strong>.
                  </li>
                  <li>
                    Điểm số cá nhân của bạn sẽ trực tiếp cộng dồn vào thanh lực Kéo Co của toàn đội. Đội có tổng điểm cao hơn sẽ chiếm ưu thế áp đảo trên màn hình Máy Chủ!
                  </li>
                  <li>
                    Người chơi có điểm số cao nhất mỗi đội sẽ được vinh danh là <strong>MVP Đội</strong> sau mỗi vòng đấu.
                  </li>
                </ul>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-rose-950/40 to-amber-950/60 border-2 border-amber-400/60 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                  <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span>CÂU HỎI QUYẾT ĐỊNH (FINAL ROUND) — ĐIỂM SỐ NHÂN ĐÔI (x2):</span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  Ở câu hỏi cuối cùng của trận đấu, toàn bộ điểm số nhận được sẽ được <strong>nhân đôi gấp 2 lần (x2)</strong>. Đây là cơ hội ngàn vàng cho các bạn ở nhóm dưới bứt phá lội ngược dòng vào Top 3 Podium!
                </p>
              </div>
            )}
          </div>

          {/* PHẦN 3: NỘI QUY PHÒNG THI & KỶ LUẬT LỚP HỌC */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Nội quy phòng thi & Văn hóa Fair-Play:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="font-bold text-white mb-0.5">Tinh Thần Fair-Play</h5>
                  <p className="text-purple-200/70">
                    Tự lực hoàn thành câu trả lời, không nhìn màn hình của bạn bên cạnh hay trao đổi đáp án.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="font-bold text-white mb-0.5">Giữ Trật Tự & Tập Trung</h5>
                  <p className="text-purple-200/70">
                    Giữ yên lặng khi đồng hồ câu hỏi đang đếm ngược để cả lớp cùng tập trung suy nghĩ.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="font-bold text-white mb-0.5">Không Tải Lại Trang (F5)</h5>
                  <p className="text-purple-200/70">
                    Giữ nguyên màn hình điện thoại; hệ thống có cơ chế tự phục hồi (Self-Healing) nếu rớt mạng chớp nhoáng.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Trophy className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-0.5">Vinh Danh Quán Quân Podium</h5>
                  <p className="text-purple-200/70">
                    Top 3 chiến binh cao điểm nhất sẽ bước lên bục vinh danh cùng đèn spotlight và pháo hoa rực rỡ!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-purple-900/50 bg-purple-950/70 flex items-center justify-between">
          <span className="text-xs text-purple-300/70 font-medium hidden sm:inline">
            💡 Nhấn <strong>ESC</strong> hoặc <strong>Enter</strong> để đóng hộp thoại
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg shadow-purple-950/50 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            Đã Hiểu & Sẵn Sàng Bắt Đầu!
          </button>
        </div>
      </div>
    </div>
  );
};
