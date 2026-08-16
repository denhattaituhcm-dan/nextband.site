# KIẾN TRÚC TỔNG THỂ HỆ THỐNG IELTS (CANONICAL ARCHITECTURE SPECIFICATION)
**Hệ thống:** Nextband.site — Nền tảng Đào tạo và Thi Thử IELTS Chuẩn Quốc Tế  
**Phiên bản Kiến trúc:** 2.0 (Canonical Authority Model)  
**Trạng thái:** 🟢 PRODUCTION READY  

---

## 1. TẦNG KIẾN TRÚC MỤC TIÊU (TARGET ARCHITECTURE)

```
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                   │
│   - UI Components (Shadcn UI / Tailwind / Lucide Icons)     │
│   - State & Cache Management: TanStack React Query          │
│   - Auth Session Provider: Supabase Auth (JWT Provider)     │
│   - Feature API Clients (@/lib/api.ts)                      │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST (JSON)
                               │ Authorization: Bearer <JWT>
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               FASTIFY BACKEND API GATEWAY (Node.js)         │
│   - Security Boundary: JWKS Verification, RBAC, Dual-Scope   │
│   - Routing Layer: Thin Routes + Zod Validation Schema      │
│   - Controller Layer: Request Mapping & Response DTOs        │
│   - Domain Service Layer: Pure Business Logic               │
│   - Grading Authority: CanonicalScoringService & BandCalc    │
│   - State Machine: SubmissionStateMachine (IN_PROGRESS..)    │
│   - Idempotency & Audit Outbox: IdempotencyService           │
│   - Repository Layer: Isolated Persistence Operations        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Prisma ORM (Connection Pooling)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             SUPABASE POSTGRESQL (CANONICAL DATABASE)        │
│   - Schema: Canonical Relational Tables (130 Exams, 609 Sec)│
│   - Authority: Single Source of Truth                       │
│   - Audit: Immutable Audit Outbox Logs                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│       LEGACY MYSQL DATABASE (READ-ONLY EVIDENCE SNAPSHOT)   │
│   - Non-canonical, Historical Evidence only                 │
│   - ZERO RUNTIME APPLICATION ACCESS                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. NGUYÊN TẮC CỐT LÕI (ARCHITECTURAL INVARIANTS)

1. **Fastify Server là Trọng Tài Chấm Điểm Duy Nhất (Sole Grading Authority)**:
   - Client tuyệt đối không được gửi điểm, band score, số câu đúng để Server lưu trữ.
   - Server tự động tải answer key trong giao dịch cô lập, đối chiếu đáp án qua `CanonicalScoringService` và quy đổi Band Score qua `IeltsBandCalculator`.

2. **Bảo Vệ Đề Thi Tuyệt Đối (Answer-Key Zero-Leakage)**:
   - Khi bài nộp ở trạng thái `IN_PROGRESS`, DTO trả về cho học sinh hoàn toàn bóc tách các trường `correctAnswer`, `acceptedAnswers`, `audioScript`, `answerKey`.

3. **Tính Bất Biến Của Máy Trạng Thái (State Machine Invariants)**:
   - Trạng thái: `IN_PROGRESS` $\longrightarrow$ `SUBMITTED` $\longrightarrow$ `GRADED` $\longrightarrow$ `FINAL`.
   - Chặn mọi hành vi rollback trạng thái (`409 Conflict`).
   - Mọi hoạt động phúc khảo điểm (`regrade`) bắt buộc phải ghi nhận Audit Outbox với đầy đủ `actorId`, `reason`, `oldScore`, `newScore`.

4. **Zero Dual-Write**:
   - 100% write mutations chỉ đi vào Supabase PostgreSQL Canonical Database. Không tồn tại bất kỳ write phụ nào ra database legacy.
