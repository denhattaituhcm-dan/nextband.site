/**
 * ARENA PODIUM VIEW (KHOẢNH KHẮC QUÁN QUÂN CHUẨN KAHOOT)
 * Trình tự công bố kịch tính 4 chặng:
 * Chặng 0 (0s - 1.5s): Bục vinh danh trồi lên, sẵn sàng vị trí.
 * Chặng 1 (1.5s - 4.5s): Vinh danh HẠNG 3 (Đồng) rơi xuống bục.
 * Chặng 2 (4.5s - 8s): Vinh danh HẠNG 2 (Bạc) xuất hiện, tăng kịch tính.
 * Chặng 3 (8s+): Trống dồn (Drumroll) -> QUÁN QUÂN (Vàng) xuất hiện cùng Vương miện & Pháo hoa rực rỡ!
 */

import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Medal, RotateCcw, Crown, Sparkles, Award } from 'lucide-react';
import { PlayerPublicRank } from '@/lib/arena/types';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { getCharacterBySeed } from '@/lib/arena/characterCatalog';
import { LobbyPlayer } from '@/components/arena/ArenaLobbyKahoot';

interface ArenaPodiumViewProps {
  rankings: PlayerPublicRank[];
  players?: LobbyPlayer[];
  gameMode?: 'CLASSIC' | 'GOLD_QUEST';
  onRestart?: () => void;
}

export const ArenaPodiumView: React.FC<ArenaPodiumViewProps> = React.memo(({
  rankings,
  players = [],
  gameMode = 'CLASSIC',
  onRestart,
}) => {
  const first = rankings[0];
  const second = rankings[1];
  const third = rankings[2];
  const rest = rankings.slice(3, 5);

  const getAvatarSeed = (rankPlayer?: PlayerPublicRank) => {
    if (!rankPlayer) return 'student';
    if (rankPlayer.avatarSeed !== undefined) return rankPlayer.avatarSeed;
    const found = players.find(
      (p) => p.name.toLowerCase() === rankPlayer.nickname.toLowerCase() || p.id === rankPlayer.playerId
    );
    return found?.avatarSeed !== undefined ? found.avatarSeed : rankPlayer.nickname;
  };

  const unitLabel = gameMode === 'GOLD_QUEST' ? '🪙 Vàng' : 'pts';

  // Chặng hiển thị: 0: Trống trồi bục -> 1: Hiện Hạng 3 -> 2: Hiện Hạng 2 -> 3: Drumroll -> 4: Hiện Quán quân & Pháo hoa
  const [revealStage, setRevealStage] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playClimberSound, playPodiumSound, playDrumroll, playChampionFanfare } = useArenaAudio();

  // Hiệu ứng pháo hoa Confetti Canvas tự thân thuần túy (không cần cài thêm thư viện ngoài)
  useEffect(() => {
    if (revealStage < 4) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6', '#ef4444', '#fbbf24'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vr: number;
      alpha: number;
    }> = [];

    // Tạo 120 mảnh pháo hoa đa sắc màu bay từ bục quán quân tung lên
    for (let i = 0; i < 140; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 120,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 5,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // Trọng lực
        p.vx *= 0.98; // Ma sát không khí
        p.rotation += p.vr;
        p.alpha -= 0.006; // Mờ dần

        if (p.alpha > 0) {
          aliveCount++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [revealStage]);

  // Luồng đếm giờ giải mã từng bậc bục vinh danh
  useEffect(() => {
    // 1.5s: Mở màn Hạng 3
    const t1 = setTimeout(() => {
      setRevealStage(1);
      playClimberSound();
    }, 1500);

    // 4.5s: Mở màn Hạng 2
    const t2 = setTimeout(() => {
      setRevealStage(2);
      playClimberSound();
    }, 4500);

    // 7.0s: Bắt đầu hồi hộp: Đèn spotlight rọi quét qua lại + Tiếng trống dồn dập 4 giây
    const t3 = setTimeout(() => {
      setRevealStage(3);
      playDrumroll(4000);
    }, 7000);

    // 11.0s: QUÁN QUÂN XUẤT HIỆN! Đèn spotlight khóa chặt vào Hạng 1, Kèn chiến thắng & Pháo hoa
    const t4 = setTimeout(() => {
      setRevealStage(4);
      playChampionFanfare();
      playPodiumSound();
    }, 11000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [playClimberSound, playPodiumSound, playDrumroll, playChampionFanfare]);

  const hasRevealedThird = revealStage >= 1;
  const hasRevealedSecond = revealStage >= 2;
  const isDrumRolling = revealStage === 3;
  const hasRevealedFirst = revealStage >= 4;

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-6 px-4 space-y-8 animate-fadeIn overflow-hidden">
      {/* Keyframe animation cho đèn spotlight quét qua lại hồi hộp */}
      <style>{`
        @keyframes sweepSpotlightLeft {
          0% { transform: rotate(-38deg); opacity: 0.75; }
          45% { transform: rotate(18deg); opacity: 0.95; }
          100% { transform: rotate(-34deg); opacity: 0.8; }
        }
        @keyframes sweepSpotlightRight {
          0% { transform: rotate(38deg); opacity: 0.75; }
          50% { transform: rotate(-18deg); opacity: 0.95; }
          100% { transform: rotate(32deg); opacity: 0.8; }
        }
        @keyframes sweepSpotlightCenter {
          0% { transform: translateX(-50%) rotate(-28deg); opacity: 0.65; }
          30% { transform: translateX(-50%) rotate(24deg); opacity: 0.85; }
          70% { transform: translateX(-50%) rotate(-18deg); opacity: 0.75; }
          100% { transform: translateX(-50%) rotate(0deg); opacity: 0.9; }
        }
        @keyframes sweepPuddleFloor {
          0% { transform: translateX(-160%) scaleX(1.2); opacity: 0.5; }
          50% { transform: translateX(60%) scaleX(1.3); opacity: 0.85; }
          100% { transform: translateX(-120%) scaleX(1.1); opacity: 0.6; }
        }
      `}</style>

      {/* Canvas pháo hoa overlay toàn màn hình khi Quán quân lộ diện */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-30"
      />

      {/* THEATRICAL SPOTLIGHT SYSTEM (Đèn rọi sân khấu quét tìm kiếm Quán Quân) */}
      {(isDrumRolling || hasRevealedFirst) && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-10 transition-opacity duration-1000">
          {/* Lớp màn tối sân khấu tập trung ánh nhìn vào Quán Quân */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${
            isDrumRolling ? 'bg-slate-950/75' : 'bg-slate-950/60'
          }`} />

          {/* Đèn rọi trung tâm: Quét tìm kiếm khi drumroll -> Khóa thẳng vào bục Quán quân khi công bố */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 md:w-96 h-full origin-top transition-all duration-700 ${
              isDrumRolling
                ? 'opacity-80'
                : hasRevealedFirst
                ? 'opacity-95 animate-pulse'
                : 'opacity-0'
            }`}
            style={{
              clipPath: 'polygon(42% 0%, 58% 0%, 92% 100%, 8% 100%)',
              background:
                'linear-gradient(180deg, rgba(254, 240, 138, 0.95) 0%, rgba(250, 204, 21, 0.45) 45%, rgba(245, 158, 11, 0.2) 85%, transparent 100%)',
              filter: 'blur(2px)',
              animation: isDrumRolling ? 'sweepSpotlightCenter 2.8s ease-in-out infinite alternate' : 'none',
            }}
          />

          {/* Luồng sáng chéo từ bên trái: Quét chéo qua lại khi drumroll -> Khóa vào bục Quán quân */}
          <div
            className={`hidden md:block absolute top-0 left-1/4 w-80 h-[92%] origin-top transition-all duration-700 ${
              isDrumRolling
                ? 'opacity-85'
                : hasRevealedFirst
                ? 'opacity-70 -rotate-[20deg]'
                : 'opacity-0'
            }`}
            style={{
              clipPath: 'polygon(45% 0%, 55% 0%, 96% 100%, 4% 100%)',
              background:
                'linear-gradient(180deg, rgba(254, 240, 138, 0.9) 0%, rgba(250, 204, 21, 0.45) 45%, rgba(245, 158, 11, 0.15) 85%, transparent 100%)',
              filter: 'blur(3px)',
              animation: isDrumRolling ? 'sweepSpotlightLeft 2.4s ease-in-out infinite alternate' : 'none',
            }}
          />

          {/* Luồng sáng chéo từ bên phải: Quét chéo qua lại khi drumroll -> Khóa vào bục Quán quân */}
          <div
            className={`hidden md:block absolute top-0 right-1/4 w-80 h-[92%] origin-top transition-all duration-700 ${
              isDrumRolling
                ? 'opacity-85'
                : hasRevealedFirst
                ? 'opacity-70 rotate-[20deg]'
                : 'opacity-0'
            }`}
            style={{
              clipPath: 'polygon(45% 0%, 55% 0%, 96% 100%, 4% 100%)',
              background:
                'linear-gradient(180deg, rgba(254, 240, 138, 0.9) 0%, rgba(250, 204, 21, 0.45) 45%, rgba(245, 158, 11, 0.15) 85%, transparent 100%)',
              filter: 'blur(3px)',
              animation: isDrumRolling ? 'sweepSpotlightRight 2.1s ease-in-out infinite alternate' : 'none',
            }}
          />

          {/* Quầng sáng phản chiếu trên sàn: Quét theo đèn khi drumroll -> Định vị chân bục Hạng 1 */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-80 md:w-96 h-24 rounded-[100%] transition-all duration-700 ${
              isDrumRolling
                ? 'opacity-70 scale-95'
                : hasRevealedFirst
                ? 'opacity-95 scale-110'
                : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.9) 0%, rgba(245, 158, 11, 0.5) 45%, transparent 75%)',
              filter: 'blur(8px)',
              animation: isDrumRolling ? 'sweepPuddleFloor 2.4s ease-in-out infinite alternate' : 'none',
            }}
          />
        </div>
      )}

      {/* Title */}
      <div className="text-center space-y-2 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> BẢNG VINH DANH CHUNG CUỘC
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          {hasRevealedFirst ? 'QUÁN QUÂN NEXTQUIZ 🏆' : isDrumRolling ? '🥁 AI SẼ LÀ QUÁN QUÂN?!' : 'ĐANG CÔNG BỐ KẾT QUẢ...'}
        </h1>
        <p className="text-sm text-purple-200/80 font-medium">
          {isDrumRolling ? (
            <span className="text-amber-300 font-extrabold animate-pulse text-base drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]">
              🥁 Tiếng trống dồn dập... Đèn spotlight đang quét tìm chủ nhân ngôi vị QUÁN QUÂN hôm nay!
            </span>
          ) : hasRevealedFirst ? (
            'Chúc mừng các chiến binh xuất sắc nhất của trận đấu hôm nay!'
          ) : (
            'Nín thở chờ đón bục vinh danh...'
          )}
        </p>
      </div>

      {/* Olympic 3-tier Podium */}
      <div className="flex items-end justify-center gap-3 md:gap-6 w-full max-w-2xl pt-8 pb-4 z-20">
        {/* Hạng 2 (Silver) */}
        <div className="flex-1 flex flex-col items-center space-y-3">
          {second && hasRevealedSecond ? (
            <div className="flex flex-col items-center space-y-1.5 animate-bounce transition-all duration-700">
              <div className="p-1 rounded-2xl bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-400 shadow-xl shadow-slate-400/30">
                <PvZCardAvatar seed={getAvatarSeed(second)} size="md" />
              </div>
              <div className="text-center">
                <span className="font-black text-sm md:text-base text-slate-200 truncate max-w-[120px] block">
                  {second.nickname}
                </span>
                <span className="text-[10px] font-bold text-slate-400 block truncate max-w-[120px]">
                  {getCharacterBySeed(getAvatarSeed(second)).name}
                </span>
              </div>
              <span className="text-xs md:text-sm font-black text-slate-300 font-mono">
                {second.totalScore} {unitLabel}
              </span>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-500 animate-pulse font-mono">
                {revealStage >= 1 ? 'Chờ Hạng 2...' : ''}
              </span>
            </div>
          )}
          <div className="w-full h-32 md:h-40 bg-gradient-to-t from-slate-800 to-slate-600 rounded-t-2xl border-t-4 border-slate-300 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700">
            <Medal className="w-8 h-8 text-slate-300 mb-1" />
            <span className="text-3xl font-black">2</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">Á QUÂN</span>
          </div>
        </div>

        {/* Hạng 1 (Gold - Cao nhất) */}
        <div className="flex-1 flex flex-col items-center space-y-3 -mt-6">
          {first && hasRevealedFirst ? (
            <div className="flex flex-col items-center space-y-1.5 relative animate-bounce transition-all duration-1000 scale-105 z-30">
              <div className="absolute -top-10 text-amber-300 animate-bounce drop-shadow-[0_0_25px_rgba(250,204,21,1)]">
                <Crown className="w-12 h-12 fill-amber-400 stroke-amber-200 stroke-[1.5]" />
              </div>
              <div className="p-1.5 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.9)] ring-4 ring-amber-300/60">
                <PvZCardAvatar seed={getAvatarSeed(first)} size="lg" />
              </div>
              <div className="text-center">
                <span className="font-black text-base md:text-lg text-amber-300 truncate max-w-[150px] drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] block">
                  {first.nickname}
                </span>
                <span className="text-xs font-bold text-amber-200/90 block truncate max-w-[150px]">
                  {getCharacterBySeed(getAvatarSeed(first)).name}
                </span>
              </div>
              <span className="text-sm md:text-base font-black text-amber-400 font-mono">
                {first.totalScore} {unitLabel}
              </span>
            </div>
          ) : (
            <div className="h-24 flex flex-col items-center justify-center">
              {isDrumRolling ? (
                <div className="flex flex-col items-center justify-center space-y-1.5 animate-pulse">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500/40 via-yellow-300/30 to-amber-600/40 border-2 border-amber-300/80 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.9)] animate-bounce">
                    <span className="text-3xl font-black text-amber-300">?</span>
                  </div>
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/50">
                    🥁 Đang Tìm Kiếm...
                  </span>
                </div>
              ) : (
                <span className="text-xs font-bold text-amber-500/60 font-mono">
                  Quán Quân ???
                </span>
              )}
            </div>
          )}
          <div className={`w-full h-44 md:h-56 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 rounded-t-2xl border-t-4 border-amber-300 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700 ${
            hasRevealedFirst ? 'shadow-[0_0_50px_rgba(245,158,11,0.8)] ring-2 ring-amber-300 relative z-20' : ''
          }`}>
            <Trophy className="w-10 h-10 text-amber-200 mb-1 animate-pulse" />
            <span className="text-4xl md:text-5xl font-black">1</span>
            <span className="text-[11px] uppercase font-black tracking-widest text-amber-100">QUÁN QUÂN</span>
          </div>
        </div>

        {/* Hạng 3 (Bronze) */}
        <div className="flex-1 flex flex-col items-center space-y-3">
          {third && hasRevealedThird ? (
            <div className="flex flex-col items-center space-y-1.5 animate-bounce transition-all duration-700">
              <div className="p-1 rounded-2xl bg-gradient-to-tr from-amber-700 via-amber-500 to-amber-800 shadow-xl shadow-amber-800/30">
                <PvZCardAvatar seed={getAvatarSeed(third)} size="md" />
              </div>
              <div className="text-center">
                <span className="font-black text-sm md:text-base text-amber-400 truncate max-w-[120px] block">
                  {third.nickname}
                </span>
                <span className="text-[10px] font-bold text-amber-500/90 block truncate max-w-[120px]">
                  {getCharacterBySeed(getAvatarSeed(third)).name}
                </span>
              </div>
              <span className="text-xs md:text-sm font-black text-amber-500 font-mono">
                {third.totalScore} {unitLabel}
              </span>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              <span className="text-xs font-bold text-amber-700/60 animate-pulse font-mono">
                Chuẩn bị...
              </span>
            </div>
          )}
          <div className="w-full h-24 md:h-32 bg-gradient-to-t from-amber-950 to-amber-800 rounded-t-2xl border-t-4 border-amber-700 flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700">
            <Award className="w-7 h-7 text-amber-600 mb-1" />
            <span className="text-2xl font-black">3</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">HẠNG 3</span>
          </div>
        </div>
      </div>

      {/* Honor Roll: Hạng 4 & 5 hiển thị sau khi Quán quân xuất hiện */}
      {hasRevealedFirst && rest.length > 0 && (
        <div className="w-full max-w-md space-y-2 pt-2 z-10 animate-fadeIn">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300/80 block text-center">
            BẢNG DANH DỰ (TOP 4 & 5)
          </span>
          <div className="grid grid-cols-1 gap-2">
            {rest.map((p) => (
              <div
                key={p.playerId}
                className="flex items-center justify-between px-4 py-2 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-purple-900/60 border border-purple-700 flex items-center justify-center text-xs font-black text-purple-300">
                    {p.rank}
                  </span>
                  <div className="shrink-0">
                    <PvZCardAvatar seed={getAvatarSeed(p)} size="sm" className="scale-75" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-slate-200 block">{p.nickname}</span>
                    <span className="text-[10px] text-purple-300/80 font-medium block">
                      {getCharacterBySeed(getAvatarSeed(p)).name}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {p.totalScore} {unitLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button: Chơi lại trận mới (Chỉ hiện khi đã công bố xong Quán quân) */}
      {hasRevealedFirst && onRestart && (
        <div className="pt-4 z-10 animate-fadeIn">
          <button
            onClick={onRestart}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2 text-sm tracking-wider uppercase transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> BẮT ĐẦU TRẬN ĐẤU MỚI
          </button>
        </div>
      )}
    </div>
  );
});
