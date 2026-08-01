# NextBand Reliability & Workflow Roadmap (Phân Kỳ Phát Triển 5 Giai Đoạn)

Tài liệu này xác định **Lộ Trình Phát Triển 5 Giai Đoạn (5-Phase Roadmap)** cho hệ thống NextBand, chuyển trọng tâm từ kiểm tra CSDL đơn lẻ sang **Toàn Vẹn Ứng Dụng (Application & Business Outcome Correctness)**.

---

## I. LỘ TRÌNH 5 GIAI ĐOẠN (5-PHASE SYSTEM ROADMAP)

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    NEXTBAND 5-PHASE SYSTEM ROADMAP                     │
 └──────┬──────────────────┬──────────────────┬───────────────────┬───────┘
        │                  │                  │                   │
        ▼                  ▼                  ▼                   ▼
    PHASE 1            PHASE 2            PHASE 3             PHASE 4            PHASE 5
  Reliability         Workflow         Observability       Performance         Automation
(Zero Data Loss)  (End-to-End Flow)  (Trace & Logs)      (Speed & Indexes)   (pnpm verify)
```

### 📍 PHASE 1: RELIABILITY (ĐẦU VÀO ƯU TIÊN HIỆN TẠI)
- **Mục tiêu**: Đảm bảo **Không Làm Hỏng Dữ Liệu (Zero Data Loss)**.
- **Nhiệm vụ**: Khóa ngoại (FK), Transaction nguyên tử, Rollback khi lỗi mạng, Unique Constraint chống double-click, và RLS Policies.
- **Artifacts**: Lưu trữ bằng chứng thực tế tại thư mục `evidence/sql/` và `evidence/tests/`.

### 📍 PHASE 2: WORKFLOW VERIFICATION
- **Mục tiêu**: Mọi luồng nghiệp vụ cốt lõi chạy thông suốt từ **Admin $\rightarrow$ Teacher $\rightarrow$ Student $\rightarrow$ Teacher**.
- **Xác minh**:
  - `Happy Path`: Giao bài $\rightarrow$ Học viên nộp $\rightarrow$ Giáo viên chấm $\rightarrow$ Trả điểm.
  - `Sad Path`: Sai quyền RLS, Timeout mạng, Nộp quá hạn, Bài thi chưa phát hành.

### 📍 PHASE 3: OBSERVABILITY
- **Mục tiêu**: Mọi sự cố trên Production đều có thể **Truy vết ngay lập tức (Zero Guesswork Debugging)**.
- **Nhiệm vụ**: Bổ sung `Request ID`, `Latency Tracker`, `DB Execution Time`, `Slow Query Logger`.

### 📍 PHASE 4: PERFORMANCE
- **Mục tiêu**: Tối ưu tốc độ ứng dụng đạt tiêu chuẩn `Response Time < 200ms`.
- **Nhiệm vụ**: Chạy `EXPLAIN ANALYZE`, xóa bỏ câu truy vấn N+1, composite indexes, bundle lazy loading.

### 📍 PHASE 5: AUTOMATION
- **Mục tiêu**: Giảm 100% phụ thuộc vào kiểm tra thủ công.
- **Nhiệm vụ**: Xây dựng lệnh đơn `pnpm verify` tích hợp Typecheck, Lint, Schema Drift Audit, Unknown Detector, Build, và E2E Smoke Tests.

---

## II. THƯ MỤC LƯU TRỮ BẰNG CHỨNG THỰC TẾ (PHYSICAL EVIDENCE DIRECTORY)

Mọi trạng thái `VERIFIED` bắt buộc phải có tệp kết quả thực tế tương ứng tại:

```text
evidence/
  ├── sql/            (Ví dụ: fk_course_class.sql, fk_course_class_result.txt)
  ├── explain/        (Các bản ghi EXPLAIN ANALYZE)
  ├── har/            (Network HTTP capture files)
  ├── screenshots/    (Hình ảnh bằng chứng giao diện UI)
  └── tests/          (Script E2E / Integration test logs)
```
