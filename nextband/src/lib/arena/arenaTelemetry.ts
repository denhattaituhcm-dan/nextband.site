/**
 * ARENA TELEMETRY & AUTO-DIAGNOSTIC COLLECTOR
 * Tuân thủ Hiến pháp Kiến trúc Điều 7 (Pure Functions / Dedicated Service).
 * 
 * Nhiệm vụ:
 * 1. Ghi nhận nhật ký 20 hành động gần nhất (Breadcrumbs).
 * 2. Bắt lỗi JavaScript/State desync trong lúc thi đấu.
 * 3. Đóng gói Telemetry Payload phục vụ phân tích tự động.
 */

export interface ArenaBreadcrumb {
  timestamp: number;
  category: 'ui' | 'network' | 'engine' | 'user';
  message: string;
  data?: Record<string, any>;
}

export interface ArenaDiagnosticReport {
  id: string;
  timestamp: number;
  pin: string;
  playerId: string;
  state: string;
  errorName: string;
  errorMessage: string;
  errorStack?: string;
  breadcrumbs: ArenaBreadcrumb[];
  userAgent: string;
  autoRecoveryAttempted: boolean;
  autoRecoverySuccess?: boolean;
}

class ArenaTelemetryService {
  private breadcrumbs: ArenaBreadcrumb[] = [];
  private readonly MAX_BREADCRUMBS = 20;

  public addBreadcrumb(
    category: ArenaBreadcrumb['category'],
    message: string,
    data?: Record<string, any>
  ): void {
    const entry: ArenaBreadcrumb = {
      timestamp: Date.now(),
      category,
      message,
      data,
    };
    this.breadcrumbs.push(entry);
    if (this.breadcrumbs.length > this.MAX_BREADCRUMBS) {
      this.breadcrumbs.shift();
    }
  }

  public getBreadcrumbs(): ArenaBreadcrumb[] {
    return [...this.breadcrumbs];
  }

  public createDiagnosticReport(params: {
    pin: string;
    playerId: string;
    state: string;
    error: Error | string;
    autoRecoveryAttempted: boolean;
    autoRecoverySuccess?: boolean;
  }): ArenaDiagnosticReport {
    const errorObj = typeof params.error === 'string' ? new Error(params.error) : params.error;

    const report: ArenaDiagnosticReport = {
      id: `diag_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      pin: params.pin,
      playerId: params.playerId,
      state: params.state,
      errorName: errorObj.name || 'Error',
      errorMessage: errorObj.message || String(params.error),
      errorStack: errorObj.stack,
      breadcrumbs: this.getBreadcrumbs(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Node/Server',
      autoRecoveryAttempted: params.autoRecoveryAttempted,
      autoRecoverySuccess: params.autoRecoverySuccess,
    };

    console.warn('[ArenaSelfHealing][DiagnosticReport]', report);

    // Tự động đẩy báo cáo hộp đen về Server API (chỉ chạy trên Client thật, không block UI)
    if (typeof window !== 'undefined' && window.location?.origin && typeof fetch === 'function') {
      try {
        const endpoint = `${window.location.origin}/api/arena/telemetry`;
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report),
        }).catch(() => {});
      } catch {
        // Safe failover
      }
    }

    return report;
  }

  public clear(): void {
    this.breadcrumbs = [];
  }
}

export const arenaTelemetry = new ArenaTelemetryService();

