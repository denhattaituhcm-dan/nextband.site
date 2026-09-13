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
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 fill-white" /> BẮT ĐẦU TRẬN ĐẤU
          </button>
        );

      case 'QUESTION_LIVE':
        return (
          <button
            onClick={() => onExecuteCommand('LOCK_ROUND')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95 animate-pulse"
          >
            <Lock className="w-6 h-6" /> KHÓA CÂU HỎI
          </button>
        );

      case 'ANSWER_LOCKED':
        return (
          <button
            onClick={() => onExecuteCommand('REVEAL_DISTRIBUTION')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <BarChart2 className="w-6 h-6" /> HIỆN PHÂN PHỐI ĐÁP ÁN
          </button>
        );

      case 'REVEAL_DISTRIBUTION':
        return (
          <button
            onClick={() => onExecuteCommand('REVEAL_PERSONAL')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <Eye className="w-6 h-6" /> CÔNG BỐ ĐÁP ÁN ĐÚNG
          </button>
        );

      case 'REVEAL_PERSONAL':
        return (
          <button
            onClick={() => onExecuteCommand('START_DEBRIEF')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-6 h-6" /> GIẢI THÍCH BẪY HỌC THUẬT
          </button>
        );

      case 'TEACHER_DEBRIEF':
        return (
          <button
            onClick={() => onExecuteCommand('SHOW_LEADERBOARD')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-purple-600/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <Trophy className="w-6 h-6" /> BẢNG XẾP HẠNG
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
                <Trophy className="w-6 h-6 text-amber-300" /> XEM BỤC VINH DANH 🏆
              </>
            ) : (
              <>
                <ArrowRight className="w-6 h-6" /> CÂU HỎI TIẾP THEO
              </>
            )}
          </button>
        );

      case 'PODIUM':
        return (
          <button
            onClick={() => onExecuteCommand('RESTART_ARENA')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 fill-white" /> BẮT ĐẦU TRẬN MỚI (VỀ SẢNH)
          </button>
        );

      default:
        return null;
    }
  }
);

TeacherContextualButton.displayName = 'TeacherContextualButton';
