# REMEDIATION ROADMAP (LỘ TRÌNH KHẮC PHỤC THEO THỨ TỰ ƯU TIÊN)

> **Audit Date:** October 16, 2026  
> **Repository:** NextBand Monorepo (`d:/handover/ielts`)  
> **Execution Strategy:** Phased, Non-Destructive, Evidence-Verified

---

## 1. TỔNG QUAN LỘ TRÌNH KHẮC PHỤC

```text
┌────────────────────────────────────────────────────────────────────────┐
│ P0 — IMMEDIATE UNBLOCK (2.5 Giờ) — BẮT BUỘC TRƯỚC KHI VIẾT FEATURE MỚI │
│ • Tạo/sửa bank_parts/week1..9.data.ts để khôi phục npm run build       │
│ • Bổ sung trường .summary vào unit04.ts & unit05.ts (chống crash UI)   │
│ • Khóa lỗi lộ dữ liệu nháp tại GET /faculty & GET /evidence            │
│ • Sửa lỗi Hook ở ChallengeUnitPage.tsx & DB call ở useUnitProgress.ts  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   ▼  (Đạt trạng thái GO)
┌────────────────────────────────────────────────────────────────────────┐
│ P1 — STABILIZATION & RELEASE GATE (4 Giờ)                              │
│ • Xác minh schema DB cho faculty_profiles & evidence                   │
│ • Ẩn err.message thô trong HTTP 500 của faculty/evidence routes        │
│ • Cập nhật unit test readlangSidebar.test.tsx & commit working tree    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ P2 — HIGH-VALUE PERFORMANCE & ARCHITECTURE DEBT (2 Ngày)               │
│ • Code-split từ điển ReadingCasePage (giảm chunk từ 1.45 MB ➔ <250 kB) │
│ • Hợp nhất logic examSkillHelper giữa Frontend và Backend              │
│ • Chia nhỏ Monolithic API Client (nextband/src/lib/api.ts)             │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ P3 — REPO CLEANUP & ASSET HYGIENE (1 Ngày)                             │
│ • Gỡ 276 binary uploads khỏi Git index (git rm -r --cached uploads/)   │
│ • Dọn dẹp 179 HTML slides (256 MB) & các file trích xuất tạm           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. P0 — IMMEDIATE (XỬ LÝ NGAY ĐỂ MỞ KHÓA BUILD & CHỐNG CRASH — 2.5 GIỜ)

### Hạng mục P0.1: Khôi phục Build & Arena Tests tại `doer-questions-bank.data.ts` (`DEBT-12`)
- **Phạm vi:** [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts) và thư mục `server/services/bank_parts/`.
- **Hành động:**
  - Bổ sung đầy đủ 9 file `server/services/bank_parts/week1.data.ts` đến `week9.data.ts` xuất ra `WEEK_1_QUESTIONS` .. `WEEK_9_QUESTIONS`.
  - Hoặc nếu bộ câu hỏi đang được biên soạn dở, tạm thời khởi tạo hằng số rỗng `export const DOER_ARENA_LESSON_QUESTIONS: Record<string, ArenaQuestion[]> = {};` để không làm gãy `esbuild` và `tsc`.
- **Phụ thuộc:** Không.
- **Effort ước lượng:** 45 phút.
- **Điều kiện nghiệm thu:**
  - `npm run build:api` chạy thành công với 0 lỗi.
  - `npx vitest run server/tests/arena/` pass toàn bộ 6/6 test suites.

### Hạng mục P0.2: Khắc phục lỗi Crash Runtime & Typecheck tại `unit04.ts` và `unit05.ts` (`DEBT-13`)
- **Phạm vi:** [`nextband/src/data/idioms/unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts) và [`nextband/src/data/idioms/unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts).
- **Hành động:**
  - Bổ sung trường `summary` vào interface `UnitIdiomsData` và object `UNIT_04_DATA`, `UNIT_05_DATA` đồng nhất với `unit01..03` và `unit06`:
    ```ts
    summary: {
      total_idioms: 20,
      total_teaching_modules: 2,
      total_practice_exercises: 5,
      total_audios: 26,
      accent: "US",
    },
    ```
- **Phụ thuộc:** Không.
- **Effort ước lượng:** 30 phút.
- **Điều kiện nghiệm thu:**
  - `npm run typecheck` đạt **0 lỗi** trên cả Backend và Frontend.
  - Truy cập `/english-idioms` và chọn Unit 4, Unit 5 trên `/english-idioms/study` hiển thị bình thường, không văng `TypeError`.

### Hạng mục P0.3: Khóa lỗ hổng rò rỉ dữ liệu chưa xuất bản tại `faculty.routes.ts` và `evidence.routes.ts` (`DEBT-14`)
- **Phạm vi:**
  - [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L6-L18)
  - [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L6-L18)
  - [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts#L5495-L5545)
- **Hành động:**
  1. Trong `faculty.routes.ts`: Sửa `GET /` luôn luôn dùng `where: { isPublished: true }` (bỏ biến `isPublic = !(request.headers.authorization)`).
  2. Trong `evidence.routes.ts`: Sửa `GET /` luôn luôn dùng `where: { published: true, consentConfirmed: true }`.
  3. Trong `nextband/src/lib/api.ts`: Sửa `getAllFaculty()` gọi `GET /faculty/all` và `getAllEvidence()` gọi `GET /evidence/all`.
- **Phụ thuộc:** Không.
- **Effort ước lượng:** 30 phút.
- **Điều kiện nghiệm thu:** Học viên đăng nhập gọi `GET /api/v1/evidence` chỉ nhận được các bản ghi có `published: true` và `consentConfirmed: true`. Admin gọi `GET /api/v1/evidence/all` nhận được đầy đủ danh sách.

### Hạng mục P0.4: Sửa lỗi Rules of Hooks tại `ChallengeUnitPage.tsx` & Direct DB Call tại `useUnitProgress.ts` (`DEBT-15`, `DEBT-16`)
- **Phạm vi:**
  - [`nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L25-L56)
  - [`nextband/src/features/reading-challenge/hooks/useUnitProgress.ts`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L55-L73)
- **Hành động:**
  1. Trong `ChallengeUnitPage.tsx`: Đưa lời gọi `useUnitProgress(parsedUnitNumber)` lên dòng 26 (trước khối `if (!unit) return ...`).
  2. Trong `useUnitProgress.ts`: Gỡ bỏ lời gọi trực tiếp `supabase.from('reading_challenge_progress').upsert(...)` (hoặc chuyển sang gọi qua `api.ts`).
- **Phụ thuộc:** Không.
- **Effort ước lượng:** 45 phút.
- **Điều kiện nghiệm thu:**
  - `npm --prefix nextband run lint` đạt **0 Errors**.
  - `npm run sanity` đạt **PASS 7/7 Gates**.

---

## 3. P1 — STABILIZATION (ỔN ĐỊNH TRƯỚC RELEASE — 4 GIỜ)

### Hạng mục P1.1: Ẩn `err.message` thô trong HTTP 500 của `faculty.routes.ts` & `evidence.routes.ts` (`DEBT-17`)
- **Phạm vi:** [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts) và [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts).
- **Hành động:** Không trả `message: err.message` trực tiếp ra JSON khi status là `500` (chỉ log qua `fastify.log.error(err)` và trả thông báo chuẩn `"Internal server error"`).
- **Effort ước lượng:** 30 phút.
- **Điều kiện nghiệm thu:** Không rò rỉ chuỗi lỗi Prisma ra client khi DB gặp sự cố.

### Hạng mục P1.2: Cập nhật Unit Test `readlangSidebar.test.tsx` (`DEBT-19`)
- **Phạm vi:** [`nextband/src/features/reading/__tests__/readlangSidebar.test.tsx`](file:///d:/handover/ielts/nextband/src/features/reading/__tests__/readlangSidebar.test.tsx#L25-L30).
- **Hành động:** Cập nhật kỳ vọng test khớp với cấu trúc hiển thị mới của `ReadlangSidebar` (*"Hiểu đơn giản"*, *"Trong câu này"*, *"Cách nhận diện khi đọc"*).
- **Effort ước lượng:** 30 phút.
- **Điều kiện nghiệm thu:** `npx vitest run nextband/src/features/` pass 100% (17/17 tests).

### Hạng mục P1.3: Kiểm tra đồng bộ Schema Database & Commit toàn bộ bản vá ổn định
- **Phạm vi:** [`prisma/schema.prisma`](file:///d:/handover/ielts/prisma/schema.prisma).
- **Hành động:** Chạy kiểm tra tương thích schema của `FacultyProfile` và `StudentEvidence` và thực hiện `npm run verify` trọn vẹn trước khi commit.
- **Effort ước lượng:** 2 giờ.
- **Điều kiện nghiệm thu:** Lệnh tổng `npm run verify` kết thúc với **Exit Code 0**.

---

## 4. P2 — HIGH-VALUE DEBT (TỐI ƯU HÓA HIỆU NĂNG & TỐC ĐỘ PHÁT TRIỂN — 2 NGÀY)

### Hạng mục P2.1: Code-Splitting cho `ReadingCasePage` & `VocabC1Page` (`DEBT-10`)
- **Mục tiêu:** Giảm kích thước chunk `ReadingCasePage-D-zRGY8d.js` từ **1,452.85 kB** xuống **< 250 kB**.
- **Phạm vi:** `nextband/src/features/reading/services/case*Dictionary.ts` và `nextband/src/data/vocabC1Unit*.ts`.
- **Hành động:** Chuyển các câu lệnh `import { CASE_014_DICTIONARY } from ...` tĩnh sang nạp động `await import(...)` khi học viên chọn bài đọc hoặc Unit tương ứng.
- **Effort ước lượng:** 6 – 8 giờ.
- **Điều kiện nghiệm thu:** `npm run build:fe` không còn cảnh báo chunk nào vượt quá 500 kB.

### Hạng mục P2.2: Loại bỏ nhân đôi logic `examSkillHelper` (`DEBT-18`)
- **Phạm vi:** [`server/utils/examSkillHelper.ts`](file:///d:/handover/ielts/server/utils/examSkillHelper.ts) và [`nextband/src/lib/examSkillHelper.ts`](file:///d:/handover/ielts/nextband/src/lib/examSkillHelper.ts).
- **Hành động:** Để Backend tính sẵn cờ `isAutoGraded` / `requiresManualGrading` trong DTO trả về từ API, hoặc dùng chung 1 file định nghĩa duy nhất.
- **Effort ước lượng:** 2 giờ.
- **Điều kiện nghiệm thu:** Chỉ còn 1 nguồn sự thật duy nhất (SSOT) cho quy tắc phân loại kỹ năng bài thi.

### Hạng mục P2.3: Phân tách `nextband/src/lib/api.ts` theo Domain (`DEBT-11`)
- **Phạm vi:** [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts) (5,587 dòng).
- **Hành động:** Tách thành các module con trong `nextband/src/lib/api/` và re-export qua `api.ts`.
- **Effort ước lượng:** 8 giờ.
- **Điều kiện nghiệm thu:** Giảm xung đột merge trên file `api.ts`, giữ nguyên 100% chữ ký hàm hiện có.

---

## 5. P3 — CLEANUP & REPOSITORY HYGIENE (1 NGÀY)

### Hạng mục P3.1: Dọn dẹp các tệp trích xuất tạm và Binary Uploads trong Git (`DEBT-07`, `DEBT-08`)
- **Hành động:**
  1. Xóa hoặc di chuyển các file untracked tạm: `scripts/unit12_pages.txt` .. `unit20_pages.txt`, `scripts/ak_*.txt`, `english-for-everyone/`.
  2. Gỡ bỏ 276 tệp trong `uploads/` khỏi Git index bằng `git rm -r --cached uploads/`.
  3. Di dời 6 thư mục `slides*` (256 MB) và `pixel-decoder-images/` ra khỏi thư mục gốc của monorepo.
- **Effort ước lượng:** 3 giờ.
- **Điều kiện nghiệm thu:** `git status` và `git ls-files uploads` sạch sẽ, dung lượng working directory giảm ~500 MB.
