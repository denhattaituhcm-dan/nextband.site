/**
 * TEACHER CONTEXTUAL BUTTON (ZERO-FLUFF SINGLE-ACTION)
 * Tuân thủ Hiến pháp Điều 41 (Tối giản là cốt lõi)
 * Duy nhất 1 nút hành động chính tại mỗi trạng thái của lớp học.
 */

import React from 'react';
import { ArenaState, HostCommandType } from '@/lib/arena/types';
import { Play, Lock, BarChart2, Eye, BookOpen, Trophy, ArrowRight } from 'lucide-react';

interface TeacherContextualButtonProps {
  state: ArenaState;
  onExecuteCommand: (command: HostCommandType) => void;
  isLoading?: boolean;
  isLastRound?: boolean;
}

export const TeacherContextualButton: React.FC<TeacherContextualButtonProps> = React.memo(
  ({ state, onExecuteCommand, isLoading = false, isLastRound = false }) => {
    switch (state) {
      case 'LOBBY':
        return (
          <button
            onClick={() => onExecuteCommand('START_ARENA')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95 group"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>BẮT ĐẦU TRẬN ĐẤU</span>
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      case 'QUESTION_LIVE':
        return (
          <button
            onClick={() => onExecuteCommand('LOCK_ROUND')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95 animate-pulse"
          >
            <Lock className="w-6 h-6" />
            <span>KHÓA CÂU HỎI</span>
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      case 'ANSWER_LOCKED':
        return (
          <button
            onClick={() => onExecuteCommand('REVEAL_DISTRIBUTION')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <BarChart2 className="w-6 h-6" />
            <span>HIỆN PHÂN PHỐI ĐÁP ÁN</span>
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      case 'REVEAL_DISTRIBUTION':
        return (
          <button
            onClick={() => onExecuteCommand('REVEAL_PERSONAL')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <Eye className="w-6 h-6" />
            <span>CÔNG BỐ ĐÁP ÁN ĐÚNG</span>
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      case 'REVEAL_PERSONAL':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onExecuteCommand('START_DEBRIEF')}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-6 h-6" />
              <span>GIẢI THÍCH BẪY HỌC THUẬT</span>
              <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
                Enter ↵
              </kbd>
            </button>
            {isLastRound && (
              <button
                onClick={() => onExecuteCommand('NEXT_ROUND')}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-lg rounded-2xl shadow-2xl shadow-amber-500/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95 animate-pulse"
              >
                <Trophy className="w-6 h-6 text-yellow-200" />
                <span>LÊN BỤC VINH DANH 🏆</span>
              </button>
            )}
          </div>
        );

      case 'TEACHER_DEBRIEF':
        return (
          <button
            onClick={() => onExecuteCommand(isLastRound ? 'NEXT_ROUND' : 'SHOW_LEADERBOARD')}
            disabled={isLoading}
            className={`flex items-center justify-center gap-3 px-8 py-4 ${
              isLastRound
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-xl shadow-2xl shadow-amber-500/40 animate-pulse'
                : 'bg-purple-600 hover:bg-purple-700 text-white font-black text-lg shadow-xl shadow-purple-600/20'
            } rounded-2xl transition-all cursor-pointer transform hover:scale-105 active:scale-95`}
          >
            {isLastRound ? (
              <>
                <Trophy className="w-7 h-7 text-yellow-200 animate-bounce" />
                <span>LÊN BỤC VINH DANH (PODIUM) 🏆</span>
              </>
            ) : (
              <>
                <Trophy className="w-6 h-6" />
                <span>BẢNG XẾP HẠNG</span>
              </>
            )}
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      case 'LEADERBOARD':
        return (
          <button
            onClick={() => onExecuteCommand('NEXT_ROUND')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            {isLastRound ? (
              <>
                <Trophy className="w-6 h-6 text-amber-300" />
                <span>XEM BỤC VINH DANH 🏆</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-6 h-6" />
                <span>CÂU HỎI TIẾP THEO</span>
              </>
            )}
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      case 'PODIUM':
        return (
          <button
            onClick={() => onExecuteCommand('RESTART_ARENA')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>BẮT ĐẦU TRẬN MỚI (VỀ SẢNH)</span>
            <kbd className="ml-2 hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold bg-black/25 text-white/90 rounded border border-white/20">
              Enter ↵
            </kbd>
          </button>
        );

      default:
        return null;
    }
  }
);

TeacherContextualButton.displayName = 'TeacherContextualButton';
