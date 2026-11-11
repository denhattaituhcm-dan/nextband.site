/**
 * ARENA HUB PAGE (/arena)
 * Cổng Sảnh Đấu Trường Phản Xạ NextBand IELTS
 * Điểm đón trung tâm:
 * - Tab 1: Đấu Đơn Cấp Tốc (Solo Run) - Chơi ngay 0 giây chờ, không cần PIN
 * - Tab 2: Vào Phòng Lớp Học (Classroom PIN) - Nhập PIN vào phòng của giáo viên
 * - Tab 3: Bảng Vàng Cá Nhân - Xem thành tích, kỷ lục và link thách đấu
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Zap, Users, Trophy, Dices, ArrowRight, ShieldCheck, Flame, Volume2, VolumeX, Share2, Award, Clock } from 'lucide-react';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { AvatarPickerModal } from '@/components/arena/AvatarPickerModal';
import { CHARACTER_AVATARS, getCharacterBySeed, getCharacterCategoryLabel } from '@/lib/arena/characterCatalog';
import { arenaApi } from '@/lib/api';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { useToast } from '@/hooks/use-toast';

const COOL_NICKNAMES = [
  'Thần Tốc IELTS',
  'Chiến Binh 8.0+',
  'Cao Thủ Collocation',
  'Sát Thủ Từ Vựng',
  'Phù Thủy Lexical',
  'Vua Phản Xạ',
  'Kỵ Sĩ Band 7.5',
  'Đại Tướng Reading',
  'Thần Gió IELTS',
  'Bậc Thầy Ngữ Nghĩa',
];

export default function ArenaHubPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { isBgmEnabled, toggleBgm, playClickSound } = useArenaAudio();

  // URL parameters (e.g., /arena?tab=pin&pin=123456)
  const initialTab = searchParams.get('tab') === 'pin' || searchParams.get('pin') ? 'PIN' : 'SOLO';
  const [activeTab, setActiveTab] = useState<'SOLO' | 'PIN' | 'STATS'>(initialTab);

  // Solo profile state
  const [nickname, setNickname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('arena_solo_name') || '';
    }
    return '';
  });
  const [avatarId, setAvatarId] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('arena_solo_avatar');
      if (stored !== null && !isNaN(Number(stored))) return Number(stored);
    }
    return Math.floor(Math.random() * CHARACTER_AVATARS.length);
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Classroom PIN state
  const [pin, setPin] = useState(searchParams.get('pin') || '');
  const [isQrPin, setIsQrPin] = useState(Boolean(searchParams.get('pin')?.trim().length === 6));
  const [pinError, setPinError] = useState('');
  const [isPinLoading, setIsPinLoading] = useState(false);

  // Stats state from localStorage
  const [highScore, setHighScore] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHighScore(Number(localStorage.getItem('arena_solo_high_score') || 0));
      setMaxStreak(Number(localStorage.getItem('arena_solo_max_streak') || 0));
      setGamesPlayed(Number(localStorage.getItem('arena_solo_games_played') || 0));
    }
  }, [activeTab]);

  // Sinh tên ngẫu nhiên
  const handleRandomNickname = () => {
    playClickSound();
    const chosen = COOL_NICKNAMES[Math.floor(Math.random() * COOL_NICKNAMES.length)];
    setNickname(chosen);
  };

  // Đổi avatar ngẫu nhiên
  const handleRerollAvatar = () => {
    playClickSound();
    setAvatarId((prev) => {
      let next = Math.floor(Math.random() * CHARACTER_AVATARS.length);
      while (next === prev && CHARACTER_AVATARS.length > 1) {
        next = Math.floor(Math.random() * CHARACTER_AVATARS.length);
      }
      return next;
    });
  };

  // Bắt đầu thi đấu Solo
  const handleStartSolo = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    const finalName = nickname.trim() || 'Chiến Binh IELTS';
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('arena_solo_name', finalName);
      sessionStorage.setItem('arena_solo_avatar', String(avatarId));
    }

    navigate(`/arena/solo?name=${encodeURIComponent(finalName)}&avatarId=${avatarId}`);
  };

  // Tham gia phòng học bằng PIN
  const handleJoinPin = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setPinError('');

    const cleanPin = pin.trim();
    const cleanNick = nickname.trim() || 'Học viên';

    if (!cleanPin || cleanPin.length !== 6) {
      setPinError('Mã PIN phải gồm 6 chữ số');
      return;
    }

    setIsPinLoading(true);

    try {
      const joinResult = await arenaApi.joinRoom({
        pin: cleanPin,
        nickname: cleanNick,
        avatarId,
      });

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('arena_pin', cleanPin);
        sessionStorage.setItem('arena_room_id', joinResult.roomId);
        sessionStorage.setItem('arena_nickname', joinResult.nickname);
        sessionStorage.setItem('arena_player_id', joinResult.participantId);
        sessionStorage.setItem('arena_player_token', joinResult.playerSessionToken);
        sessionStorage.setItem('arena_plant_id', String(avatarId));
      }

      navigate(
        `/arena/play?pin=${cleanPin}&roomId=${encodeURIComponent(joinResult.roomId)}&name=${encodeURIComponent(joinResult.nickname)}&playerId=${encodeURIComponent(joinResult.participantId)}&plantId=${avatarId}`
      );
    } catch (err: any) {
      const message = err instanceof Error ? err.message : 'Lỗi tham gia phòng thi đấu';
      setPinError(message);
      setIsPinLoading(false);
    }
  };

  // Thách đấu bạn bè
  const handleShareChallenge = () => {
    playClickSound();
    const shareUrl = `${window.location.origin}/arena`;
    const shareText = `🔥 Thách bạn vào so tài phản xạ IELTS tại Đấu Trường NextBand Arena! Kỷ lục của mình là ${highScore.toLocaleString()} điểm. Vào phá kỷ lục nào: ${shareUrl}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: '✅ Đã sao chép link thách đấu!',
          description: 'Gửi link này cho bạn bè qua Zalo hoặc Messenger để cùng so tài!',
        });
      }).catch(() => {
        toast({
          title: 'Link Đấu Trường',
          description: shareUrl,
        });
      });
    }
  };

  const character = CHARACTER_AVATARS[avatarId] || getCharacterBySeed(nickname);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#150a33] text-white flex flex-col font-sans select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header Bar */}
      <header className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center justify-between border-b border-purple-500/20 shrink-0">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span>Trang chủ NextBand</span>
        </Link>

        {/* Brand Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-amber-300 text-xs font-black shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NEXTBAND ARENA</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleBgm}
          title={isBgmEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className="p-1.5 rounded-xl bg-purple-900/60 border border-purple-400/30 text-purple-200 hover:text-white transition cursor-pointer"
        >
          {isBgmEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>
      </header>

      {/* Main Hub Container */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-5 flex flex-col justify-center">
        {/* Title Section */}
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ĐẤU TRƯỜNG PHẢN XẠ
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-sm mx-auto">
            Bứt phá phản xạ Collocation & Lexical Resource chuẩn IELTS theo thời gian thực
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-purple-950/80 rounded-2xl border border-purple-500/30 mb-5 shadow-inner">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('SOLO');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'SOLO'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Đấu Đơn</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('PIN');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'PIN'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Vào Phòng PIN</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('STATS');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'STATS'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Bảng Vàng</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: SOLO RUN (CHƠI NGAY)                                  */}
        {/* ============================================================ */}
        {activeTab === 'SOLO' && (
          <form onSubmit={handleStartSolo} className="space-y-4 animate-in fade-in duration-200">
            {/* Avatar Preview Card */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-900/50 to-purple-950/80 border-2 border-purple-500/40 shadow-xl flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="lg" />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-purple-950 text-[10px] font-black shadow border border-amber-200">
                  #{avatarId + 1}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-white">{character.name}</h3>
                <span className="text-[11px] font-bold text-amber-300/90">{getCharacterCategoryLabel(character.type)}</span>
              </div>

              {/* Avatar Control Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleRerollAvatar}
                  className="px-3 py-1.5 rounded-xl bg-purple-800/60 hover:bg-purple-700/60 border border-purple-400/40 text-xs font-bold text-purple-100 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Dices className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đổi ngẫu nhiên</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-800/60 hover:bg-purple-700/60 border border-purple-400/40 text-xs font-bold text-purple-100 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Chọn trong 50 Avatar</span>
                </button>
              </div>
            </div>

            {/* Nickname Input with Random Generator */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Biệt danh của bạn trong trận đấu:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={25}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Nhập tên của bạn (vd: Thần Tốc IELTS)..."
                  className="flex-1 px-4 py-3 bg-purple-950/80 border-2 border-purple-500/40 rounded-2xl text-white placeholder-purple-400/50 text-sm font-bold focus:outline-none focus:border-amber-400 transition"
                />
                <button
                  type="button"
                  onClick={handleRandomNickname}
                  title="Tạo tên ngầu ngẫu nhiên"
                  className="px-3.5 py-3 rounded-2xl bg-purple-800/60 hover:bg-purple-700/60 border-2 border-purple-500/40 text-amber-300 transition cursor-pointer flex items-center justify-center shrink-0"
                >
                  <Dices className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Feature Perks */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-purple-200/90 py-1">
              <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/40">
                ⏱️ 10 Câu / 15s
              </div>
              <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/40">
                🔥 Streak Combo x2
              </div>
              <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/40">
                💡 Bẫy Misconception
              </div>
            </div>

            {/* Start Solo Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-purple-950 font-black text-base uppercase tracking-wider shadow-[0_5px_0_0_#9a3412] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
            >
              <Zap className="w-5 h-5 text-purple-950" />
              <span>BẮT ĐẦU ĐẤU ĐƠN NGAY (0s CHỜ)</span>
              <ArrowRight className="w-5 h-5 text-purple-950" />
            </button>
          </form>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CLASSROOM ROOM VIA PIN                                */}
        {/* ============================================================ */}
        {activeTab === 'PIN' && (
          <form onSubmit={handleJoinPin} className="space-y-4 animate-in fade-in duration-200">
            {isQrPin ? (
              <div className="flex items-center justify-between p-3.5 bg-orange-500/15 border-2 border-orange-500/40 rounded-2xl shadow-inner">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-300 uppercase">Phòng thi:</span>
                  <span className="text-2xl font-black font-mono tracking-widest text-orange-400">#{pin}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsQrPin(false);
                    setPin('');
                  }}
                  className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer p-1"
                >
                  Đổi phòng khác
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Mã PIN phòng thi đấu (6 số trên màn chiếu):
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="Nhập 6 chữ số mã PIN..."
                  className="w-full px-4 py-3.5 bg-purple-950/80 border-2 border-purple-500/40 rounded-2xl text-center text-white placeholder-purple-400/50 text-xl font-mono font-black tracking-widest focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            )}

            {/* Nickname Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Tên hiển thị của bạn trong lớp:
              </label>
              <input
                type="text"
                maxLength={25}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nhập họ tên hoặc biệt danh..."
                className="w-full px-4 py-3 bg-purple-950/80 border-2 border-purple-500/40 rounded-2xl text-white placeholder-purple-400/50 text-sm font-bold focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            {/* Error Notice */}
            {pinError && (
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-bold text-center">
                {pinError}
              </div>
            )}

            {/* Join Room Button */}
            <button
              type="submit"
              disabled={isPinLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#3b0764] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none disabled:opacity-50"
            >
              <Users className="w-5 h-5" />
              <span>{isPinLoading ? 'ĐANG KẾT NỐI PHÒNG...' : 'VÀO PHÒNG LỚP HỌC'}</span>
            </button>
          </form>
        )}

        {/* ============================================================ */}
        {/* TAB 3: PERSONAL STATS & LEADERBOARD TRACKER                  */}
        {/* ============================================================ */}
        {activeTab === 'STATS' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-center">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Kỷ lục điểm</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {highScore.toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-center">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Max Streak</span>
                <span className="text-xl sm:text-2xl font-black text-orange-400 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" /> {maxStreak}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-center">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">Số trận đấu</span>
                <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                  {gamesPlayed}
                </span>
              </div>
            </div>

            {/* Challenge Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-950/50 via-purple-950/80 to-purple-900/60 border-2 border-amber-500/40 shadow-xl space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>THÁCH ĐẤU BẠN BÈ PHÁ KỶ LỤC</span>
              </div>

              <p className="text-xs text-purple-200 leading-relaxed max-w-sm mx-auto">
                Chia sẻ link Đấu Trường cho bạn bè để cùng so tài tốc độ Collocation IELTS và xem ai đạt điểm cao hơn!
              </p>

              <button
                type="button"
                onClick={handleShareChallenge}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#9a3412] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
              >
                <Share2 className="w-4 h-4" />
                <span>SAO CHÉP LINK THÁCH ĐẤU BẠN BÈ</span>
              </button>
            </div>

            {/* Quick Play Action */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('SOLO');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-purple-800/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Chơi thêm một ván để nâng cao kỷ lục</span>
            </button>
          </div>
        )}
      </main>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        selectedAvatarId={avatarId}
        onSelectAvatar={(id) => {
          setAvatarId(id);
          setIsPickerOpen(false);
        }}
      />
    </div>
  );
}
