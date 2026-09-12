/**
 * GOLD QUEST CHEST MODAL COMPONENT (MỞ RƯƠNG KHO BÁU & CƯỚP VÀNG)
 * Thành phần tương tác trên màn hình học sinh khi trả lời đúng:
 * 1. Chọn 1 trong 3 rương kho báu [🎁] [🎁] [🎁]
 * 2. Ngẫu nhiên trúng: Vàng (+50, +100, +250), Bom (-25%), Nhân đôi (x2), hoặc CƯỚP VÀNG
 * 3. Nếu trúng Cướp Vàng: Hiện danh sách bạn cùng lớp để chọn cướp 25% số vàng.
 */

import React, { useState } from 'react';
import { Sparkles, Trophy, Skull } from 'lucide-react';

export type ChestRewardType = 'GOLD_SMALL' | 'GOLD_MED' | 'GOLD_LARGE' | 'DOUBLE' | 'BOMB' | 'STEAL';

export interface ChestReward {
  type: ChestRewardType;
  title: string;
  desc: string;
  goldChange?: number;
  multiplier?: number;
}

interface PlayerCandidate {
  name: string;
  gold: number;
}

interface GoldQuestChestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGold: number;
  players: PlayerCandidate[];
  myNickname: string;
  onApplyReward: (goldDelta: number) => void;
  onStealGold: (victimName: string, stolenAmount: number) => void;
}

export const GoldQuestChestModal: React.FC<GoldQuestChestModalProps> = ({
  isOpen,
  onClose,
  currentGold,
  players,
  myNickname,
  onApplyReward,
  onStealGold,
}) => {
  const [step, setStep] = useState<'SELECT_CHEST' | 'SHOW_REWARD' | 'SELECT_VICTIM'>('SELECT_CHEST');
  const [selectedReward, setSelectedReward] = useState<ChestReward | null>(null);

  if (!isOpen) return null;

  // Thuật toán quay rương ngẫu nhiên theo tỷ lệ xác suất
  const handleOpenChest = () => {
    const rand = Math.random();
    let reward: ChestReward;

    if (rand < 0.25) {
      // 25% Cướp Vàng
      reward = { type: 'STEAL', title: 'CƯỚP VÀNG!', desc: 'Chọn 1 bạn trong lớp để cướp 25% số vàng của họ' };
    } else if (rand < 0.55) {
      // 30% Thỏi vàng vừa
      reward = { type: 'GOLD_MED', title: '+100 VÀNG', desc: 'Nhặt được túi vàng giá trị!', goldChange: 100 };
    } else if (rand < 0.75) {
      // 20% Kho báu lớn
      reward = { type: 'GOLD_LARGE', title: '+250 VÀNG', desc: 'Rương kho báu hoàng gia lấp lánh!', goldChange: 250 };
    } else if (rand < 0.88) {
      // 13% Thỏi vàng nhỏ
      reward = { type: 'GOLD_SMALL', title: '+50 VÀNG', desc: 'Một ít tiền lẻ rơi lại.', goldChange: 50 };
    } else if (rand < 0.95) {
      // 7% Nhân đôi
      reward = { type: 'DOUBLE', title: 'NHÂN ĐÔI VÀNG (x2)!', desc: 'Toàn bộ số vàng hiện tại của bạn được nhân hai!', multiplier: 2 };
    } else {
      // 5% Trúng bom
      const lost = Math.max(20, Math.round(currentGold * 0.25));
      reward = { type: 'BOMB', title: 'TRÚNG BOM! (-25%)', desc: `Rương chứa thuốc nổ, bạn bị rớt mất ${lost} vàng!`, goldChange: -lost };
    }

    setSelectedReward(reward);

    if (reward.type === 'STEAL') {
      const victims = players.filter((p) => p.name.trim().toLowerCase() !== myNickname.trim().toLowerCase() && p.gold > 0);
      if (victims.length > 0) {
        setStep('SELECT_VICTIM');
      } else {
        // Không có ai để cướp -> thưởng nóng 150 vàng
        const altReward: ChestReward = { type: 'GOLD_MED', title: '+150 VÀNG', desc: 'Lớp chưa ai có vàng để cướp, nhận ngay 150 vàng!', goldChange: 150 };
        setSelectedReward(altReward);
        onApplyReward(150);
        setStep('SHOW_REWARD');
      }
    } else {
      if (reward.type === 'DOUBLE') {
        onApplyReward(currentGold); // cộng thêm đúng số vàng hiện tại -> x2
      } else if (reward.goldChange) {
        onApplyReward(reward.goldChange);
      }
      setStep('SHOW_REWARD');
    }
  };

  const handlePickVictim = (victim: PlayerCandidate) => {
    const stealAmount = Math.max(25, Math.round(victim.gold * 0.25));
    onStealGold(victim.name, stealAmount);
    setStep('SHOW_REWARD');
    setSelectedReward({
      type: 'STEAL',
      title: 'CƯỚP THÀNH CÔNG!',
      desc: `Bạn vừa cướp ${stealAmount} vàng từ ${victim.name}!`,
    });
  };

  const victimsList = players.filter((p) => p.name.trim().toLowerCase() !== myNickname.trim().toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="bg-[#180c38] border-2 border-amber-400/60 rounded-3xl p-6 max-w-sm w-full text-center space-y-5 shadow-2xl relative">
        
        {/* BƯỚC 1: CHỌN 1 TRONG 3 RƯƠNG */}
        {step === 'SELECT_CHEST' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> CHÍNH XÁC!
              </span>
              <h3 className="text-xl font-black text-white">CHỌN 1 RƯƠNG MAY MẮN:</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={handleOpenChest}
                  className="p-4 bg-gradient-to-b from-amber-500/20 to-yellow-950/40 hover:from-amber-500/40 hover:to-yellow-900/60 border-2 border-amber-400/60 hover:border-amber-300 rounded-2xl flex flex-col items-center justify-center space-y-2 cursor-pointer shadow-lg transform hover:-translate-y-1 active:scale-95 transition-all"
                >
                  <span className="text-4xl animate-bounce">🎁</span>
                  <span className="text-[11px] font-black text-amber-300 uppercase">Rương {num}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-purple-300/80">
              Có thể mở trúng: Vàng, x2 Tài sản, Bom nổ, hoặc Cướp vàng!
            </p>
          </div>
        )}

        {/* BƯỚC 2 (NẾU MỞ TRÚNG CƯỚP VÀNG): CHỌN NẠN NHÂN ĐỂ CƯỚP */}
        {step === 'SELECT_VICTIM' && (
          <div className="space-y-4 text-left">
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-3xl mx-auto animate-bounce">
                🏴‍☠️
              </div>
              <h3 className="text-xl font-black text-amber-400">BẠN MỞ TRÚNG CƯỚP VÀNG!</h3>
              <p className="text-xs text-slate-300">Chọn 1 bạn để cướp 25% số vàng của họ:</p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {victimsList.map((vic, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePickVictim(vic)}
                  className="w-full p-3 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 rounded-xl flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{idx === 0 ? '👑' : '⭐'}</span>
                    <div>
                      <div className="text-xs font-black text-white">{vic.name}</div>
                      <div className="text-[10px] text-amber-400 font-bold">{vic.gold || 0} 🪙</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-xs font-black">
                    CƯỚP NGAY
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 3: HIỂN THỊ KẾT QUẢ RƯƠNG */}
        {step === 'SHOW_REWARD' && selectedReward && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-amber-500/20 animate-pulse">
              {selectedReward.type === 'BOMB' ? (
                <Skull className="w-8 h-8 text-rose-400" />
              ) : selectedReward.type === 'STEAL' ? (
                '🏴‍☠️'
              ) : (
                <Trophy className="w-8 h-8 text-amber-400" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-amber-300">{selectedReward.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedReward.desc}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
            >
              TIẾP TỤC TRẬN ĐẤU →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
