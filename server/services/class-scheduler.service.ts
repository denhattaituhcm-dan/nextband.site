import { PrismaClient } from "@prisma/client";
import { ClassService } from "./class.service.js";

export class ClassSchedulerService {
  private timer: NodeJS.Timeout | null = null;
  private initialTimeout: NodeJS.Timeout | null = null;
  private classService: ClassService;
  private isRunning: boolean = false;

  // Chu kỳ chạy: 24 giờ một lần
  private readonly INTERVAL_MS = 24 * 60 * 60 * 1000;
  // Khởi động lần đầu sau khi server bật: 15 giây
  private readonly INITIAL_DELAY_MS = 15 * 1000;

  constructor(private prisma: PrismaClient, private log?: any) {
    this.classService = new ClassService(prisma);
  }

  /**
   * Bắt đầu tác vụ định kỳ quét vòng đời lớp học
   */
  start(): void {
    if (this.timer || this.initialTimeout) {
      return;
    }

    this.log?.info?.("[ClassScheduler] ⏱️ Class Lifecycle Scheduler is enabled (runs every 24h).");

    this.initialTimeout = setTimeout(() => {
      this.runMaintenance();
      this.timer = setInterval(() => {
        this.runMaintenance();
      }, this.INTERVAL_MS);
    }, this.INITIAL_DELAY_MS);
  }

  /**
   * Dừng tác vụ (phục vụ graceful shutdown)
   */
  stop(): void {
    if (this.initialTimeout) {
      clearTimeout(this.initialTimeout);
      this.initialTimeout = null;
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.log?.info?.("[ClassScheduler] 🛑 Class Lifecycle Scheduler stopped.");
  }

  /**
   * Thực hiện 1 lượt quét bảo trì
   */
  async runMaintenance(): Promise<any> {
    if (this.isRunning) {
      this.log?.warn?.("[ClassScheduler] ⚠️ Previous maintenance job is still running, skipping this tick.");
      return;
    }

    this.isRunning = true;
    try {
      this.log?.info?.("[ClassScheduler] 🔄 Running Class Lifecycle Maintenance...");
      const result = await this.classService.runClassLifecycleMaintenance();
      this.log?.info?.(
        { result },
        `[ClassScheduler] ✅ Maintenance finished: Auto-closed ${result.closedClassesCount} classes, Purged ${result.deletedClassesCount} old closed classes.`
      );
      return result;
    } catch (err: any) {
      this.log?.error?.({ err }, "[ClassScheduler] ❌ Error running Class Lifecycle Maintenance: " + (err?.message || err));
    } finally {
      this.isRunning = false;
    }
  }
}
