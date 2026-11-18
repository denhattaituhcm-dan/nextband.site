/**
 * ARENA HUB PAGE (/arena)
 * Cổng Sảnh Đấu Trường Phản Xạ NextBand IELTS (Cyber Esports Edition)
 * - Tự động nhận diện tài khoản đã đăng nhập
 * - Hỗ trợ Thách Đấu Bạn Bè 1v1 qua Challenge Link (/arena?challenge=DL-XXXX)
 * - Bảng Xếp Hạng Trực Tuyến Thật từ Database (Top Hôm Nay / Tuần Này / Mọi Thời Đại)
 * - Giao diện 2 cột chuẩn Esports trên Desktop (hết cảm giác co cụm đơn điệu)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  Users, 
  Trophy, 
  Dices, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Volume2, 
  VolumeX, 
  Share2, 
  Award, 
  Clock,
  Swords,
  Crown,
  Medal,
  RefreshCw,
  UserCheck,
  Globe,
  Lock,
  Plus,
  Monitor,
  Gamepad2
} from 'lucide-react';
import { PvZCardAvatar } from '@/components/arena/PvZCardAvatar';
import { AvatarPickerModal } from '@/components/arena/AvatarPickerModal';
import { CHARACTER_AVATARS, getCharacterBySeed, getCharacterCategoryLabel } from '@/lib/arena/characterCatalog';
import { arenaApi, PublicArenaLobbyResponse, PublicArenaRoomSummary } from '@/lib/api';
import { useArenaAudio } from '@/hooks/arena/useArenaAudio';
import { useAuth } from '@/hooks/useAuth';
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

interface LeaderboardItem {
  id: string;
  nickname: string;
  avatarId: number;
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
  maxStreak: number;
  avgResponseMs: number;
  challengeCode: string;
  createdAt: string;
}

interface ChallengeInfo {
  id: string;
  nickname: string;
  avatarId: number;
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
  maxStreak: number;
  avgResponseMs: number;
  questionIds: string[];
}

const TOPIC_DECK_OPTIONS = [
  {
    key: 'RANDOM_MIX',
    label: '🎲 Trộn Ngẫu Nhiên',
    desc: '10 câu bốc ngẫu nhiên từ kho 300+ câu',
  },
  {
    key: 'COLLOCATION',
    label: '🔥 Bẫy Collocation',
    desc: 'Lexical Resource IELTS Band 6.5–8.0+',
  },
  {
    key: 'FOUNDATION_DOER',
    label: '🌱 Nền Tảng Band 5–6',
    desc: 'Từ vựng & cấu trúc khóa DOER / Builder',
  },
  {
    key: 'MASTER_ACADEMIC',
    label: '🎓 Học Thuật Band 6.5+',
    desc: 'Chuyên sâu khóa Master / Leader',
  },
] as const;

const GAME_MODE_OPTIONS = [
  { key: 'CLASSIC', label: '🎯 Kahoot Cổ Điển', desc: 'Đua điểm tốc độ & Streak' },
  { key: 'GOLD_QUEST', label: '💰 Cướp Vàng', desc: 'Mở rương báu, cướp vàng lật kèo' },
  { key: 'ARENA_100', label: '🛡️ Đấu Trường 100', desc: 'Sinh tồn 3 mạng trụ hạng' },
] as const;

const TOPIC_LABEL_MAP: Record<string, string> = {
  RANDOM_MIX: '🎲 Trộn Kho Đề',
  COLLOCATION: '🔥 Collocation',
  FOUNDATION_DOER: '🌱 Nền Tảng',
  MASTER_ACADEMIC: '🎓 Học Thuật',
};

const MODE_LABEL_MAP: Record<string, string> = {
  CLASSIC: '🎯 Cổ Điển',
  GOLD_QUEST: '💰 Cướp Vàng',
  ARENA_100: '🛡️ Sinh Tồn',
};

export default function ArenaHubPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, isAuthenticated, isAdmin, isTeacher } = useAuth();
  const isVipHost = Boolean(isAdmin || isTeacher);
  const { isBgmEnabled, toggleBgm, playClickSound } = useArenaAudio();

  // Tab state
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam === 'pin' || tabParam === 'create' || searchParams.get('pin') ? 'PIN' : 'SOLO';
  const [activeTab, setActiveTab] = useState<'SOLO' | 'PIN' | 'STATS'>(initialTab);
  const [pinSubMode, setPinSubMode] = useState<'JOIN' | 'CREATE'>(tabParam === 'create' ? 'CREATE' : 'JOIN');

  // Challenge Code từ link mời (/arena?challenge=DL-XXXX)
  const challengeCode = searchParams.get('challenge');
  const [challengeData, setChallengeData] = useState<ChallengeInfo | null>(null);
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false);

  // Profile setup
  const [nickname, setNickname] = useState<string>(() => {
    if (user?.fullName) return user.fullName;
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

  // Điền tự động nếu vừa load xong user info
  useEffect(() => {
    if (user?.fullName && !nickname) {
      setNickname(user.fullName);
    }
  }, [user, nickname]);

  // Tải thông tin thách đấu nếu có mã challenge
  useEffect(() => {
    if (!challengeCode) return;
    setIsLoadingChallenge(true);
    arenaApi.getSoloChallenge(challengeCode)
      .then((data) => {
        setChallengeData(data);
      })
      .catch((err) => {
        console.warn('Lỗi tải thông tin thách đấu:', err);
      })
      .finally(() => {
        setIsLoadingChallenge(false);
      });
  }, [challengeCode]);

  // Leaderboard state
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<'today' | 'week' | 'all'>('week');
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  const fetchLeaderboard = (tf: 'today' | 'week' | 'all') => {
    setIsLoadingLeaderboard(true);
    arenaApi.getSoloLeaderboard({ timeframe: tf, limit: 10 })
      .then((data) => {
        setLeaderboard(data || []);
      })
      .catch((err) => {
        console.warn('Lỗi tải bảng xếp hạng:', err);
      })
      .finally(() => {
        setIsLoadingLeaderboard(false);
      });
  };

  useEffect(() => {
    fetchLeaderboard(leaderboardTimeframe);
  }, [leaderboardTimeframe]);

  // Classroom PIN & Community Live Room state
  const [pin, setPin] = useState(searchParams.get('pin') || '');
  const [isQrPin, setIsQrPin] = useState(Boolean(searchParams.get('pin')?.trim().length === 6));
  const [pinError, setPinError] = useState('');
  const [isPinLoading, setIsPinLoading] = useState(false);

  // Public Lobby & Community Room Creation state
  const [publicLobby, setPublicLobby] = useState<PublicArenaLobbyResponse | null>(null);
  const [isLoadingPublicRooms, setIsLoadingPublicRooms] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [createTopicKey, setCreateTopicKey] = useState<string>('RANDOM_MIX');
  const [createGameMode, setCreateGameMode] = useState<'CLASSIC' | 'GOLD_QUEST' | 'ARENA_100'>('CLASSIC');
  const [createHostMode, setCreateHostMode] = useState<'AUTO_PARTY' | 'PROJECTOR_HOST'>('AUTO_PARTY');
  const [createIsPublic, setCreateIsPublic] = useState<boolean>(true);
  const [createError, setCreateError] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const fetchPublicRooms = async (silent = false) => {
    if (!silent) setIsLoadingPublicRooms(true);
    try {
      const data = await arenaApi.getPublicRooms();
      setPublicLobby(data);
    } catch (err) {
      console.warn('Lỗi tải danh sách phòng công khai:', err);
    } finally {
      if (!silent) setIsLoadingPublicRooms(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'PIN') return;
    fetchPublicRooms(false);
    const interval = setInterval(() => {
      fetchPublicRooms(true);
    }, 8000);
    return () => clearInterval(interval);
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

    let url = `/arena/solo?name=${encodeURIComponent(finalName)}&avatarId=${avatarId}`;
    if (challengeData?.questionIds && challengeCode) {
      url += `&challenge=${encodeURIComponent(challengeCode)}`;
    }

    navigate(url);
  };

  // Helper dùng chung để tham gia phòng qua PIN và điều hướng sang /arena/play
  const joinAndNavigateToRoom = async (
    targetPin: string,
    opts?: { hostMode?: 'auto' }
  ) => {
    const cleanPin = targetPin.trim();
    const cleanNick = nickname.trim() || 'Chiến Binh IELTS';

    if (!cleanPin || cleanPin.length !== 6) {
      setPinError('Mã PIN phải gồm 6 chữ số');
      return;
    }

    setPinError('');
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

      const hostParam = opts?.hostMode ? `&hostMode=${opts.hostMode}` : '';
      navigate(
        `/arena/play?pin=${cleanPin}&roomId=${encodeURIComponent(joinResult.roomId)}&name=${encodeURIComponent(joinResult.nickname)}&playerId=${encodeURIComponent(joinResult.participantId)}&plantId=${avatarId}${hostParam}`
      );
    } catch (err: any) {
      const message = err instanceof Error ? err.message : 'Lỗi tham gia phòng thi đấu';
      setPinError(message);
      setCreateError(message);
      setIsPinLoading(false);
    }
  };

  // Tham gia phòng học bằng PIN
  const handleJoinPin = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    await joinAndNavigateToRoom(pin);
  };

  // Tạo phòng đấu Live cộng đồng (hoặc VIP nếu là Giáo viên/Admin)
  const handleCreateCommunityRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setCreateError('');
    setIsCreatingRoom(true);

    const finalHostName = nickname.trim() || user?.fullName || 'Chủ Phòng';
    const finalRoomTitle = roomTitle.trim() || `Phòng của ${finalHostName}`;

    try {
      const created = await arenaApi.createRoom({
        config: {
          roomTitle: finalRoomTitle,
          hostNickname: finalHostName,
          topicKey: createTopicKey,
          gameMode: createGameMode,
          hostMode: createHostMode,
          isPublic: createIsPublic,
          maxPlayers: isVipHost ? 60 : 20,
        },
      });

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`arena_host_token_${created.pin}`, created.hostToken);
        sessionStorage.setItem(`arena_host_mode_${created.pin}`, createHostMode);
        sessionStorage.setItem(`arena_room_config_${created.pin}`, JSON.stringify(created.config || {}));
      }

      if (createHostMode === 'PROJECTOR_HOST') {
        navigate(`/arena/host?pin=${created.pin}&roomId=${encodeURIComponent(created.roomId)}`);
        return;
      }

      // Chế độ AUTO_PARTY: Chủ phòng tự động gia nhập làm Người chơi số 1
      await joinAndNavigateToRoom(created.pin, { hostMode: 'auto' });
    } catch (err: any) {
      const message = err instanceof Error ? err.message : 'Không thể tạo phòng đấu mới';
      setCreateError(message);
      setIsCreatingRoom(false);
    }
  };

  // Thách đấu bạn bè
  const handleShareChallenge = (customCode?: string) => {
    playClickSound();
    const code = customCode || 'SOLO';
    const shareUrl = `${window.location.origin}/arena${code !== 'SOLO' ? `?challenge=${code}` : ''}`;
    const shareText = `⚔️ Thách bạn vào so tài phản xạ IELTS tại Đấu Trường NextBand Arena! Vào thử sức ngay: ${shareUrl}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: '✅ Đã sao chép link thách đấu!',
          description: 'Gửi link này cho bạn bè qua Zalo hoặc Messenger để cùng so kè điểm số!',
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
    <div className="min-h-screen min-h-[100dvh] bg-[#12082b] text-white flex flex-col font-sans select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a135e] via-[#150a33] to-[#0a051b]">
      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between border-b border-purple-500/20 shrink-0">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span>Trang chủ NextBand</span>
        </Link>

        {/* Brand Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-amber-300 text-xs font-black shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NEXTBAND ARENA ESPORTS</span>
        </div>

        {/* User Info & Audio Toggle */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated && user && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-bold">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[120px] truncate">{user.fullName || user.email}</span>
            </div>
          )}
          <button
            onClick={toggleBgm}
            title={isBgmEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-1.5 rounded-xl bg-purple-900/60 border border-purple-400/30 text-purple-200 hover:text-white transition cursor-pointer"
          >
            {isBgmEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* Main Container - 2 Column Cyber Split View on Desktop */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col justify-center">
        {/* Banner Nhận Lời Thách Đấu Nóng Bỏng (Nếu vào qua Link Thách Đấu) */}
        {challengeData && (
          <div className="w-full mb-6 p-4 rounded-3xl bg-gradient-to-r from-red-950/80 via-purple-950/90 to-amber-950/80 border-2 border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3.5 text-left">
              <div className="p-1.5 rounded-2xl bg-amber-400/20 border-2 border-amber-400 shrink-0">
                <PvZCardAvatar avatarId={challengeData.avatarId} seed={challengeData.avatarId} size="md" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-black uppercase tracking-wider border border-red-500/40">
                  <Swords className="w-3.5 h-3.5" /> LỜI THÁCH ĐẤU ĐỐI ĐẦU 1V1
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  <span className="text-amber-400">{challengeData.nickname}</span> thách bạn vượt qua {challengeData.totalScore.toLocaleString()} điểm!
                </h3>
                <p className="text-xs text-purple-200">
                  Chuỗi đúng: {challengeData.maxStreak} câu liên tiếp • Tốc độ: {(challengeData.avgResponseMs / 1000).toFixed(1)}s/câu
                </p>
              </div>
            </div>

            <button
              onClick={handleStartSolo}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-purple-950 font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#9a3412] active:translate-y-1 active:shadow-none shrink-0 flex items-center gap-2 cursor-pointer transition select-none"
            >
              <Zap className="w-4 h-4 text-purple-950" />
              <span>CHẤP NHẬN THÁCH ĐẤU NGAY</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============================================================ */}
          {/* CỘT TRÁI (7 CỘT): SẢNH THI ĐẤU & CHỌN NHÂN VẬT               */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 space-y-5">
            {/* Title Section */}
            <div className="text-left space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span>ĐẤU TRƯỜNG PHẢN XẠ</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/30">
                  LIVE
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-purple-200">
                Thử thách 10 câu Collocation & Lexical Resource IELTS theo thời gian thực.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-purple-950/80 rounded-2xl border border-purple-500/30 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveTab('SOLO');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'SOLO'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Đấu Đơn (0s Chờ)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveTab('PIN');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'PIN'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Phòng Đấu Live</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveTab('STATS');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'STATS'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Kỷ Lục Của Tôi</span>
              </button>
            </div>

            {/* TAB 1: SOLO RUN (CHƠI NGAY) */}
            {activeTab === 'SOLO' && (
              <form onSubmit={handleStartSolo} className="space-y-4 animate-in fade-in duration-200">
                {/* Avatar Preview Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-purple-900/50 to-purple-950/80 border-2 border-purple-500/40 shadow-xl flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative shrink-0">
                    <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="lg" />
                    <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-purple-950 text-[10px] font-black shadow border border-amber-200">
                      #{avatarId + 1}
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-white">{character.name}</h3>
                    <span className="text-xs font-bold text-amber-300/90 block">
                      {getCharacterCategoryLabel(character.type)}
                    </span>
                    <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
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
                        <span>Xem 50 Avatar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nickname Input with Random Generator */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 block">
                      Biệt danh của bạn:
                    </label>
                    {isAuthenticated && user && (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> Tự động nhận diện tài khoản
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={30}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Nhập tên của bạn (vd: Thần Tốc IELTS)..."
                      className="flex-1 px-4 py-3 bg-purple-950/80 border-2 border-purple-500/40 rounded-2xl text-white placeholder-purple-400/50 text-sm font-bold focus:outline-none focus:border-amber-400 transition"
                    />
                    <button
                      type="button"
                      onClick={handleRandomNickname}
                      title="Tạo tên ngầu ngẫu nhiên"
                      className="px-4 py-3 rounded-2xl bg-purple-800/60 hover:bg-purple-700/60 border-2 border-purple-500/40 text-amber-300 transition cursor-pointer flex items-center justify-center shrink-0"
                    >
                      <Dices className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Game Match Spec Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-purple-200/90 py-1">
                  <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                    ⏱️ 10 Câu / 15s
                  </div>
                  <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                    🔥 Streak Combo x2
                  </div>
                  <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                    💡 Bẫy Misconception
                  </div>
                </div>

                {/* Big Action Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-purple-950 font-black text-base uppercase tracking-wider shadow-[0_5px_0_0_#9a3412] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
                >
                  <Zap className="w-5 h-5 text-purple-950" />
                  <span>{challengeData ? 'BẮT ĐẦU ĐỐI ĐẦU 1V1' : 'BẮT ĐẦU ĐẤU ĐƠN (CHƠI NGAY)'}</span>
                  <ArrowRight className="w-5 h-5 text-purple-950" />
                </button>
              </form>
            )}

            {/* TAB 2: PHÒNG ĐẤU LIVE (VÀO PHÒNG + TẠO PHÒNG CỘNG ĐỒNG) */}
            {activeTab === 'PIN' && (
              <div className="space-y-4 animate-in fade-in duration-200 text-left">
                {/* Live Capacity Bar */}
                <div className="p-3 rounded-2xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        (publicLobby?.capacity.activeCommunityRooms ?? 0) >=
                        (publicLobby?.capacity.maxCommunityRooms ?? 20)
                          ? 'bg-rose-400 animate-pulse'
                          : 'bg-emerald-400 animate-ping'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-black text-white truncate">
                        Sảnh Cộng Đồng:{' '}
                        <span className="text-amber-300 font-mono">
                          {publicLobby?.capacity.activeCommunityRooms ?? 0}/
                          {publicLobby?.capacity.maxCommunityRooms ?? 20}
                        </span>{' '}
                        phòng đang mở
                      </p>
                      <p className="text-[10px] text-purple-300 truncate">
                        {isVipHost
                          ? '👑 Tài khoản Giáo viên/Admin được ưu tiên luồng VIP không giới hạn slot'
                          : `Tối đa ${publicLobby?.capacity.maxPlayersPerCommunityRoom ?? 20} người/phòng · Tự dọn sau 20 phút rảnh`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => fetchPublicRooms(false)}
                    disabled={isLoadingPublicRooms}
                    title="Làm mới trạng thái phòng"
                    className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/70 border border-purple-500/30 text-purple-200 hover:text-white transition cursor-pointer shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPublicRooms ? 'animate-spin text-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Sub-mode Switcher: Vào Phòng vs Tạo Phòng Mới */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-purple-950/60 border border-purple-700/40">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setPinSubMode('JOIN');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      pinSubMode === 'JOIN'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Vào Phòng & Sảnh Mở</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setPinSubMode('CREATE');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      pinSubMode === 'CREATE'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow'
                        : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tạo Phòng Mới</span>
                  </button>
                </div>

                {/* Compact Avatar & Nickname Row */}
                <div className="p-3 rounded-2xl bg-purple-900/35 border border-purple-500/30 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(true)}
                    className="relative shrink-0 cursor-pointer group"
                    title="Đổi linh vật"
                  >
                    <PvZCardAvatar avatarId={avatarId} seed={avatarId} size="sm" />
                    <span className="absolute -bottom-1 -right-1 px-1 py-0.5 rounded bg-amber-400 text-purple-950 text-[8px] font-black">
                      Đổi
                    </span>
                  </button>
                  <div className="flex-1 min-w-0">
                    <label className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block mb-1">
                      Tên hiển thị của bạn
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        maxLength={25}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Nhập họ tên hoặc biệt danh..."
                        className="flex-1 min-w-0 px-3 py-2 bg-purple-950/80 border border-purple-500/40 rounded-xl text-white placeholder-purple-400/50 text-xs font-bold focus:outline-none focus:border-amber-400 transition"
                      />
                      <button
                        type="button"
                        onClick={handleRandomNickname}
                        title="Đặt tên ngẫu nhiên"
                        className="px-2.5 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-700/60 border border-purple-500/40 text-amber-300 transition cursor-pointer shrink-0"
                      >
                        <Dices className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {pinSubMode === 'JOIN' ? (
                  <div className="space-y-4">
                    {/* Form Nhập PIN */}
                    <form onSubmit={handleJoinPin} className="space-y-3">
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
                            Mã PIN phòng thi đấu (6 số):
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              value={pin}
                              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                              placeholder="000000"
                              className="flex-1 px-4 py-3 bg-purple-950/80 border-2 border-purple-500/40 rounded-2xl text-center text-white placeholder-purple-400/40 text-2xl font-mono font-black tracking-widest focus:outline-none focus:border-amber-400 transition"
                            />
                            <button
                              type="submit"
                              disabled={isPinLoading}
                              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_4px_0_0_#3b0764] active:translate-y-1 active:shadow-none flex items-center justify-center gap-1.5 cursor-pointer transition select-none disabled:opacity-50 shrink-0"
                            >
                              <Users className="w-4 h-4" />
                              <span>{isPinLoading ? 'Đang vào...' : 'Vào Phòng'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {isQrPin && (
                        <button
                          type="submit"
                          disabled={isPinLoading}
                          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#3b0764] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none disabled:opacity-50"
                        >
                          <Users className="w-5 h-5" />
                          <span>{isPinLoading ? 'ĐANG KẾT NỐI PHÒNG...' : 'VÀO PHÒNG ĐẤU NGAY'}</span>
                        </button>
                      )}

                      {pinError && (
                        <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-bold text-center">
                          {pinError}
                        </div>
                      )}
                    </form>

                    {/* Danh sách Phòng Công Khai Đang Mở Sảnh Chờ */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-emerald-400" />
                          Phòng Công Khai Đang Mở ({publicLobby?.rooms.length ?? 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setPinSubMode('CREATE');
                          }}
                          className="text-[11px] font-black text-amber-300 hover:text-amber-200 cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Tự mở phòng mới
                        </button>
                      </div>

                      {isLoadingPublicRooms && !publicLobby ? (
                        <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-800/40 text-center text-xs text-purple-300">
                          Đang tìm các phòng công khai đang mở...
                        </div>
                      ) : !publicLobby || publicLobby.rooms.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-purple-950/50 border border-dashed border-purple-700/50 text-center space-y-2">
                          <p className="text-xs font-bold text-purple-200">
                            Hiện chưa có phòng công khai nào đang chờ ở sảnh.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setPinSubMode('CREATE');
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-black cursor-pointer transition"
                          >
                            <Plus className="w-3.5 h-3.5" /> Mở phòng đầu tiên ngay!
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                          {publicLobby.rooms.map((rm: PublicArenaRoomSummary) => (
                            <div
                              key={rm.id}
                              className="p-3 rounded-2xl bg-purple-950/75 border border-purple-500/30 hover:border-amber-400/60 transition flex items-center justify-between gap-3"
                            >
                              <div className="min-w-0 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-mono font-black text-[11px]">
                                    #{rm.pin}
                                  </span>
                                  <h4 className="text-xs font-black text-white truncate">
                                    {rm.roomTitle}
                                  </h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-purple-200/90 font-bold">
                                  <span>👑 {rm.hostNickname}</span>
                                  <span>•</span>
                                  <span>{TOPIC_LABEL_MAP[rm.topicKey] || '🎲 Trộn Kho Đề'}</span>
                                  <span>•</span>
                                  <span>{MODE_LABEL_MAP[rm.gameMode] || '🎯 Cổ Điển'}</span>
                                  <span>•</span>
                                  <span className="text-emerald-300 font-mono">
                                    {rm.playerCount}/{rm.maxPlayers} người
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                disabled={isPinLoading}
                                onClick={() => {
                                  playClickSound();
                                  joinAndNavigateToRoom(rm.pin);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs shrink-0 cursor-pointer transition shadow"
                              >
                                Vào Chơi
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* FORM TẠO PHÒNG ĐẤU LIVE MỚI */
                  <form onSubmit={handleCreateCommunityRoom} className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">
                        Tên phòng đấu (Tùy chọn):
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        value={roomTitle}
                        onChange={(e) => setRoomTitle(e.target.value)}
                        placeholder={`VD: Kèo Collocation cùng ${nickname.trim() || 'bạn bè'}...`}
                        className="w-full px-3.5 py-2.5 bg-purple-950/80 border border-purple-500/40 rounded-xl text-white placeholder-purple-400/50 text-xs font-bold focus:outline-none focus:border-amber-400 transition"
                      />
                    </div>

                    {/* Chọn Chủ Đề Câu Hỏi */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 block">
                        Chủ đề bộ 10 câu hỏi:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {TOPIC_DECK_OPTIONS.map((t) => (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setCreateTopicKey(t.key);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                              createTopicKey === t.key
                                ? 'bg-amber-500/20 border-amber-400 text-white shadow'
                                : 'bg-purple-950/60 border-purple-700/40 text-purple-200 hover:bg-purple-900/50'
                            }`}
                          >
                            <div className="text-xs font-black">{t.label}</div>
                            <div className="text-[10px] text-purple-300/90 mt-0.5 leading-snug">{t.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chọn Chế Độ Thi Đấu */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 block">
                        Thể thức thi đấu:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {GAME_MODE_OPTIONS.map((m) => (
                          <button
                            key={m.key}
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setCreateGameMode(m.key);
                            }}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                              createGameMode === m.key
                                ? 'bg-purple-600/40 border-amber-400 text-white shadow'
                                : 'bg-purple-950/60 border-purple-700/40 text-purple-200 hover:bg-purple-900/50'
                            }`}
                          >
                            <div className="text-[11px] font-black">{m.label}</div>
                            <div className="text-[9px] text-purple-300/90 mt-0.5 leading-tight">{m.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chọn Vai Trò Chủ Phòng (Auto-Party vs Màn Chiếu) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 block">
                        Chế độ Chủ phòng (Host Mode):
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setCreateHostMode('AUTO_PARTY');
                          }}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                            createHostMode === 'AUTO_PARTY'
                              ? 'bg-emerald-500/20 border-emerald-400 text-white shadow'
                              : 'bg-purple-950/60 border-purple-700/40 text-purple-200 hover:bg-purple-900/50'
                          }`}
                        >
                          <div className="text-xs font-black flex items-center gap-1.5">
                            <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Chơi cùng bạn bè</span>
                          </div>
                          <div className="text-[10px] text-purple-200/80 mt-0.5 leading-snug">
                            Vào chơi ngay như người chơi #1. Hệ thống tự chuyển câu!
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setCreateHostMode('PROJECTOR_HOST');
                          }}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                            createHostMode === 'PROJECTOR_HOST'
                              ? 'bg-indigo-500/25 border-indigo-400 text-white shadow'
                              : 'bg-purple-950/60 border-purple-700/40 text-purple-200 hover:bg-purple-900/50'
                          }`}
                        >
                          <div className="text-xs font-black flex items-center gap-1.5">
                            <Monitor className="w-3.5 h-3.5 text-indigo-300" />
                            <span>Màn chiếu Trọng tài</span>
                          </div>
                          <div className="text-[10px] text-purple-200/80 mt-0.5 leading-snug">
                            Màn hình lớn chiếu QR & kiểm soát nhịp trận như Kahoot.
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Quyền riêng tư phòng */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setCreateIsPublic(true);
                        }}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                          createIsPublic
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                            : 'bg-purple-950/60 border-purple-700/40 text-purple-300'
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Phòng Công Khai</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setCreateIsPublic(false);
                        }}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                          !createIsPublic
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-purple-950/60 border-purple-700/40 text-purple-300'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Phòng Kín (Chỉ PIN)</span>
                      </button>
                    </div>

                    {createError && (
                      <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-bold text-center">
                        {createError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={
                        isCreatingRoom ||
                        (!isVipHost &&
                          (publicLobby?.capacity.availableCommunitySlots ?? 20) <= 0)
                      }
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#065f46] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none disabled:opacity-50"
                    >
                      <Plus className="w-5 h-5" />
                      <span>
                        {isCreatingRoom
                          ? 'ĐANG KHỞI TẠO PHÒNG...'
                          : !isVipHost &&
                            (publicLobby?.capacity.availableCommunitySlots ?? 20) <= 0
                          ? 'SẢNH ĐANG ĐẦY (20/20 PHÒNG) - HÃY VÀO PHÒNG MỞ'
                          : 'TẠO PHÒNG ĐẤU NGAY'}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: STATS */}
            {activeTab === 'STATS' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-950/50 via-purple-950/80 to-purple-900/60 border-2 border-amber-500/40 shadow-xl space-y-3 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>KHOE THÀNH TÍCH VỚI BẠN BÈ</span>
                  </div>

                  <p className="text-xs text-purple-200 leading-relaxed max-w-sm mx-auto">
                    Mời bạn bè vào so tài trực tiếp để xem ai phản xạ từ vựng IELTS nhanh và chính xác hơn!
                  </p>

                  <button
                    type="button"
                    onClick={() => handleShareChallenge()}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-purple-950 font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#9a3412] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition select-none"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>SAO CHÉP LINK THÁCH ĐẤU BẠN BÈ</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* CỘT PHẢI (5 CỘT): BẢNG XẾP HẠNG CAO THỦ (LIVE LEADERBOARD)    */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#1c0d45] to-[#12072e] border-2 border-purple-500/40 shadow-2xl space-y-3.5 text-left">
              {/* Leaderboard Header */}
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">BẢNG VÀNG CAO THỦ</h3>
                    <span className="text-[10px] font-bold text-purple-300 block">Xếp hạng thực tế từ toàn hệ thống</span>
                  </div>
                </div>

                {/* Timeframe Switcher */}
                <div className="flex items-center gap-1 bg-purple-950/80 p-1 rounded-xl border border-purple-700/50">
                  <button
                    type="button"
                    onClick={() => setLeaderboardTimeframe('today')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                      leaderboardTimeframe === 'today' ? 'bg-amber-400 text-purple-950' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    Ngày
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeaderboardTimeframe('week')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                      leaderboardTimeframe === 'week' ? 'bg-amber-400 text-purple-950' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    Tuần
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeaderboardTimeframe('all')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                      leaderboardTimeframe === 'all' ? 'bg-amber-400 text-purple-950' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    Tất cả
                  </button>
                </div>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-2 min-h-[320px]">
                {isLoadingLeaderboard ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                    <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                    <span className="text-xs text-purple-300">Đang tải bảng xếp hạng...</span>
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-2 text-purple-300">
                    <Crown className="w-8 h-8 text-amber-400/50" />
                    <p className="text-xs font-bold">Chưa có ai ghi danh trong kỳ này!</p>
                    <p className="text-[11px] text-purple-400">Hãy là người đầu tiên leo Top 1!</p>
                  </div>
                ) : (
                  leaderboard.map((item, index) => {
                    const isTop1 = index === 0;
                    const isTop2 = index === 1;
                    const isTop3 = index === 2;

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2.5 rounded-2xl border transition ${
                          isTop1
                            ? 'bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                            : isTop2
                            ? 'bg-purple-900/30 border-purple-400/40'
                            : isTop3
                            ? 'bg-purple-900/20 border-purple-400/30'
                            : 'bg-purple-950/40 border-purple-800/30'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Rank Icon */}
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                              isTop1
                                ? 'bg-amber-400 text-purple-950 shadow'
                                : isTop2
                                ? 'bg-slate-300 text-purple-950 shadow'
                                : isTop3
                                ? 'bg-amber-700 text-white shadow'
                                : 'bg-purple-900/60 text-purple-300'
                            }`}
                          >
                            {isTop1 ? '👑' : index + 1}
                          </div>

                          {/* Avatar */}
                          <PvZCardAvatar avatarId={item.avatarId} seed={item.avatarId} size="sm" />

                          {/* Name & Details */}
                          <div className="min-w-0">
                            <span className="text-xs font-black text-white truncate block max-w-[130px] sm:max-w-[150px]">
                              {item.nickname}
                            </span>
                            <span className="text-[10px] text-purple-300 block font-mono">
                              {item.correctCount}/{item.totalQuestions} đúng • Streak: {item.maxStreak}
                            </span>
                          </div>
                        </div>

                        {/* Score & Challenge Button */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs sm:text-sm font-black font-mono text-amber-400">
                            {item.totalScore.toLocaleString()}đ
                          </span>
                          {item.challengeCode && (
                            <button
                              onClick={() => {
                                playClickSound();
                                navigate(`/arena?challenge=${item.challengeCode}`);
                              }}
                              title="Thách đấu người chơi này"
                              className="px-2 py-1 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-[10px] font-black text-red-200 transition cursor-pointer flex items-center gap-1"
                            >
                              <Swords className="w-3 h-3 text-red-400" />
                              <span className="hidden sm:inline">Đấu</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Live Ticker */}
              <div className="pt-2 border-t border-purple-500/30 flex items-center justify-between text-[11px] text-purple-300 font-bold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Đang ghi nhận điểm trực tiếp
                </span>
                <button
                  onClick={() => fetchLeaderboard(leaderboardTimeframe)}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Làm mới
                </button>
              </div>
            </div>
          </div>
        </div>
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
