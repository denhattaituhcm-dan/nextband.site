'use client';

/**
 * ARENA ERROR BOUNDARY (SELF-HEALING UI CONTAINER)
 * Tuân thủ Hiến pháp Kiến trúc Điều 3 (Rendering Guard) và Zero-Fluff UI.
 * 
 * Tính năng tự phục hồi:
 * - Bắt lỗi unhandled exceptions trong render tree
 * - Tự động ghi nhận telemetry & breadcrumbs
 * - Tự động thử phục hồi (Auto Recovery) tối đa 3 lần sau 1.5s
 * - Cung cấp nút khôi phục thủ công nếu lỗi liên tục
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { arenaTelemetry } from '@/lib/arena/arenaTelemetry';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  pin?: string;
  playerId?: string;
  fallbackStateName?: string;
  onAutoRecover?: () => void;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  recoveryCount: number;
  isRecovering: boolean;
}

export class ArenaErrorBoundary extends Component<Props, State> {
  private recoveryTimer: NodeJS.Timeout | null = null;
  private readonly MAX_AUTO_RECOVERIES = 2;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      recoveryCount: 0,
      isRecovering: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      errorMessage: error.message || 'Lỗi hiển thị phòng đấu',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { pin = 'unknown', playerId = 'unknown', fallbackStateName = 'UNKNOWN' } = this.props;

    // Gửi báo cáo chẩn đoán
    arenaTelemetry.createDiagnosticReport({
      pin,
      playerId,
      state: fallbackStateName,
      error,
      autoRecoveryAttempted: this.state.recoveryCount < this.MAX_AUTO_RECOVERIES,
    });

    // Kích hoạt Self-Healing tự động nếu chưa vượt quá giới hạn
    if (this.state.recoveryCount < this.MAX_AUTO_RECOVERIES) {
      this.setState({ isRecovering: true });
      this.recoveryTimer = setTimeout(() => {
        this.attemptRecovery();
      }, 1500);
    }
  }

  componentWillUnmount(): void {
    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
    }
  }

  private attemptRecovery = (): void => {
    if (this.props.onAutoRecover) {
      this.props.onAutoRecover();
    }
    this.setState((prev) => ({
      hasError: false,
      errorMessage: '',
      recoveryCount: prev.recoveryCount + 1,
      isRecovering: false,
    }));
  };

  private handleManualReset = (): void => {
    this.setState({ recoveryCount: 0 });
    this.attemptRecovery();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.state.isRecovering) {
        return (
          <div className="w-full min-h-[300px] flex flex-col items-center justify-center p-6 text-center animate-pulse">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-3" />
            <p className="text-white font-bold text-sm tracking-wide">
              Đang tự động đồng bộ lại phòng...
            </p>
          </div>
        );
      }

      return (
        <div className="w-full min-h-[280px] bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md">
          <AlertTriangle className="w-12 h-12 text-amber-400 mb-3" />
          <h3 className="text-lg font-black text-white mb-1">Mất đồng bộ hiển thị</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-5">
            Dữ liệu phòng đấu bị gián đoạn nhẹ. Bấm để kết nối lại ngay.
          </p>
          <button
            onClick={this.handleManualReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Khôi phục phòng
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
