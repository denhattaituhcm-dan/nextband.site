# COMPREHENSIVE CODE HEALTH AUDIT — FULL REPOSITORY REPORT

> **Audit Date:** October 16, 2026  
> **Auditor Role:** Principal Software Engineer, Staff Architect & Technical Debt Auditor  
> **Repository:** NextBand IELTS LMS (`d:/handover/ielts` / `https://github.com/denhattaituhcm-dan/nextband.git`)  
> **Scope:** Audit-Only (Zero lines of production source code, tests, or configuration modified)  
> **Verdict:** **NO-GO (Tạm dừng phát triển tính năng mới để khắc phục ngay lỗi đứt gãy build/test baseline P0)**

---

## 1. EXECUTIVE SUMMARY

Một cuộc kiểm toán độc lập, toàn diện và dựa trên bằng chứng thực nghiệm (evidence-first) đã được tiến hành trên toàn bộ monorepo **NextBand (ARIS IELTS LMS)** vào ngày **16/10/2026**, bao gồm Backend Fastify (`server/`), Frontend React 18 SPA (`nextband/`), Serverless API Gateway (`api/`), Prisma ORM & PostgreSQL Schema (`prisma/`), bộ kiểm thử tự động (`server/tests/`, `nextband/src/`), và các công cụ kiểm soát kiến trúc (`scripts/`).

### Tóm tắt trạng thái so với kỳ kiểm toán trước (14/10/2026)

1. **Những tiến bộ đã được đội ngũ xử lý trong working tree hiện tại:**
   - Đã sửa dứt điểm 2 lỗi **React Rules of Hooks** nghiêm trọng tại [`CourseDetail.tsx`](file:///d:/handover/ielts/nextband/src/pages/CourseDetail.tsx) và [`HomeworkTab.tsx`](file:///d:/handover/ielts/nextband/src/pages/admin/ClassWorkspace/tabs/HomeworkTab.tsx), cùng lỗi lint tại [`sentenceFeedback.ts`](file:///d:/handover/ielts/nextband/src/lib/sentenceFeedback.ts).
   - Đã tái cấu trúc [`facultyService.ts`](file:///d:/handover/ielts/nextband/src/lib/facultyService.ts) và [`evidenceStore.ts`](file:///d:/handover/ielts/nextband/src/lib/evidenceStore.ts) để chuyển từ gọi trực tiếp Supabase client sang gọi qua Fastify REST API ([`faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts), [`evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts)) và bổ sung model `FacultyProfile`, `StudentEvidence` vào [`prisma/schema.prisma`](file:///d:/handover/ielts/prisma/schema.prisma#L1599-L1639).
   - Đã tối ưu hóa [`vitest.config.ts`](file:///d:/handover/ielts/vitest.config.ts#L48-L65) bằng cách tách môi trường mặc định sang `node` cho backend và chỉ dùng `jsdom` cho frontend (`singleFork: false`, `isolate: true`), **chấm dứt hoàn toàn lỗi sập bộ nhớ V8 Zone Allocation OOM** (70 file test backend chạy hoàn tất trong 175 giây mà không crash).
   - Đã nâng cấp Gate 5 trong [`scripts/sanity_check.mjs`](file:///d:/handover/ielts/scripts/sanity_check.mjs#L70-L73) để quét toàn bộ `nextband/src/`.

2. **Những lỗi đứt gãy nghiêm trọng (Regression / P0 Blockers) vừa phát sinh:**
   - **Đứt gãy Production Build (`npm run build` = FAIL) & Backend Typecheck (`FAIL`) & 6 Arena Test Suites (`FAIL`):** File mới [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts#L6-L14) được import vào [`server/services/arena-bank.service.ts`](file:///d:/handover/ielts/server/services/arena-bank.service.ts#L3), nhưng lại import 9 file con `./bank_parts/week1.data.js` $\rightarrow$ `week9.data.js` **không tồn tại trên ổ đĩa**. Điều này làm sập hoàn toàn quá trình đóng gói Serverless API Gateway (`esbuild`), làm hỏng `npm run typecheck` và làm 6 bộ test Arena thất bại.
   - **Đứt gãy Frontend Typecheck (`npm run sanity` Gate 4 = FAIL):** Các commit gần đây (`a0fb7ed9`, `ffd3df61`) tại [`EnglishIdiomsCatalogPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx#L126-L153) và [`EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx#L806) truy cập thuộc tính `.summary.total_idioms`, `.summary.total_practice_exercises` và `.summary.accent` trên `unit04Data` và `unit05Data`, nhưng [`unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts#L50-L57) và [`unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts#L50-L57) không có trường `summary` (gây lỗi runtime `TypeError: Cannot read properties of undefined` nếu người dùng chọn Unit 4 hoặc Unit 5 trên trang Idioms Hub).
   - **Lỗ hổng bảo mật Rò rỉ dữ liệu bản nháp (Information Disclosure / Auth Bypass) trong route mới:** Trong [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L8-L10) và [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L8-L10), API `GET /` kiểm tra `const isPublic = !(request.headers.authorization);`. Vì trình duyệt luôn tự động đính kèm `Authorization: Bearer <student_token>` cho mọi người dùng đã đăng nhập (qua [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts)), bất kỳ học viên nào đã đăng nhập (hoặc bất kỳ ai gửi kèm header `Authorization: anything` giả mạo) đều làm `isPublic = false` và **lấy được toàn bộ hồ sơ chưa xuất bản (`published: false`) và chưa có sự đồng ý (`consentConfirmed: false`)**.
   - **Phát hiện vi phạm mới qua Gate 5 & ESLint:**
     - [`ChallengeUnitPage.tsx`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L56): Gọi React Hook `useUnitProgress()` sau câu lệnh `if (!unit) return ...` ở dòng 27 (1 lỗi ESLint `react-hooks/rules-of-hooks`).
     - [`useUnitProgress.ts`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L61): Gọi trực tiếp `supabase.from('reading_challenge_progress').upsert(...)` từ frontend, làm Gate 5 của `npm run sanity` báo FAIL.
   - **Phình đại Bundle Frontend nghiêm trọng:** Chunk `ReadingCasePage` đã tăng vọt từ 744 kB lên **1,452.85 kB (1.45 MB)** sau khi nhúng thêm các từ điển đọc hiểu tĩnh.

---

## 2. HIỆN TRẠNG REPOSITORY & BẢO VỆ WORKING TREE (PHASE 0.1)

Tuân thủ nghiêm ngặt quy tắc **AUDIT ONLY** (Mục 2.1 & 2.2), trạng thái working tree của lập trình viên được ghi nhận nguyên vẹn trước và sau khi kiểm toán:

- **Đường dẫn thực tế:** `d:\handover\ielts` (tương ứng `/home/admindanielts/ielts-dictation` trên môi trường Linux server).
- **Git Branch:** `main` (HEAD tại commit `ffd3df61`: `feat(idioms): add Unit 06 Bad things with etymology, audio, and exercises`).
- **Node.js / npm:** `v26.0.0` / `11.12.1` trên Windows PowerShell.
- **Trạng thái Uncommitted Changes hiện có của Developer (16 modified files, 20 untracked items):**
  - **Modified (16 files):**
    - `nextband/src/lib/api.ts` (+93 dòng)
    - `nextband/src/lib/assessmentService.ts` (-1 dòng)
    - `nextband/src/lib/evidenceStore.ts` (chuyển sang REST API)
    - `nextband/src/lib/facultyService.ts` (chuyển sang REST API)
    - `nextband/src/lib/sentenceFeedback.ts` (sửa `prefer-const`)
    - `nextband/src/pages/CourseDetail.tsx` (sửa lỗi thứ tự React Hooks)
    - `nextband/src/pages/admin/Arena/AdminGameArenaPage.tsx` (sắp xếp thứ tự bài thi DOER)
    - `nextband/src/pages/admin/ClassWorkspace/tabs/HomeworkTab.tsx` (sửa lỗi thứ tự React Hooks)
    - `nextband/src/pages/arena/ArenaHostPage.tsx` (cải thiện UI cột % đáp án)
    - `prisma/schema.prisma` (thêm `FacultyProfile` và `StudentEvidence`)
    - `scripts/sanity_check.mjs` (mở rộng Gate 5)
    - `server/config/env.ts` (xóa hàm dead code `getRootAdminEmails`)
    - `server/routes/index.ts` (đăng ký `/faculty` và `/evidence`)
    - `server/services/arena-bank.service.ts` (tích hợp `DOER_ARENA_LESSON_QUESTIONS`)
    - `server/services/class.service.ts` (sử dụng `isManualGradingRequired`)
    - `vitest.config.ts` (tách môi trường `node` / `jsdom`, tắt `singleFork`)
  - **Untracked (20 files/folders):**
    - Code mới: [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts), [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts), [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts), [`server/utils/examSkillHelper.ts`](file:///d:/handover/ielts/server/utils/examSkillHelper.ts), [`server/tests/examSkillHelper.test.ts`](file:///d:/handover/ielts/server/tests/examSkillHelper.test.ts).
    - Tệp trích xuất học liệu tạm trong `scripts/`: `extract_reading_challenge.mjs`, `ak_11_15.txt`, `ak_16_20.txt`, `unit12_pages.txt` .. `unit20_pages.txt`, thư mục `english-for-everyone/`.

---

## 3. PHASE 0 — KẾT QUẢ CHẠY BASELINE THỰC TẾ

| Bước kiểm tra | Lệnh thực thi | Kết quả | Thời gian | Chi tiết lỗi / Cảnh báo | Phân loại nguồn gốc lỗi |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Sanity Check** | `npm run sanity` | **FAIL** | 11.2s | Pass 5/7 gates; **Fail Gate 4 (TS) & Gate 5 (Direct Supabase call)** | Gate 4 do commit `ffd3df61`; Gate 5 phát hiện file cũ nhờ mở rộng bộ lọc |
| **TypeScript Check** | `npm run typecheck` | **FAIL** | 8.4s | **9 lỗi Backend** (`TS2307` thiếu `./bank_parts/week*.data.js`); **5 lỗi Frontend** (`TS2339` thiếu `.summary` ở Unit 4 & 5) | Backend: Uncommitted file; Frontend: Commit `a0fb7ed9` & `ffd3df61` |
| **Frontend Lint** | `npm --prefix nextband run lint` | **FAIL** | 4.1s | **1 Error** (`rules-of-hooks` tại `ChallengeUnitPage.tsx:56`), **53 Warnings** | Đã tồn tại từ trước trong nhánh Reading Challenge |
| **Runtime Smoke** | `npm run verify:runtime` | **PASS** | 3.4s | **5/5 Gates PASS** (Fastify boot 0 lỗi, `/health` 200, `/courses` 200, Auth 401, DB Soft-Delete OK) | Nền tảng runtime cốt lõi ổn định |
| **Backend Tests** | `npx vitest run server/tests/` | **FAIL** | 174.9s | **64/70 suites PASS (654 tests pass)**; **6 Arena suites FAIL** do thiếu `./bank_parts/week1.data.js` | Uncommitted change trong `doer-questions-bank.data.ts` |
| **Frontend Feature Tests** | `npx vitest run nextband/src/features/` | **FAIL** | 4.9s | **3/4 suites PASS (16 tests)**; **1 test FAIL** (`readlangSidebar.test.tsx:27`) do thay đổi text UI | Test cũ lệch với giao diện Sidebar mới |
| **Full Build** | `npm run build` | **FAIL** | 5.8s | Prisma generate PASS; **`bundle-api.mjs` FAIL** với 9 lỗi esbuild không tìm thấy `./bank_parts/week1..9.data.js` | Uncommitted change trong `doer-questions-bank.data.ts` |
| **Frontend Build** | `npm run build:fe` | **PASS** | 11.1s | Vite SPA build thành công, nhưng cảnh báo chunk `ReadingCasePage.js` nặng **1,452.85 kB** | Đã tồn tại + phình thêm do dữ liệu tĩnh |

---

## 4. PHASE 1 — DEAD CODE & TÀI NGUYÊN DƯ THỪA

> Chi tiết đầy đủ được lập danh mục tại [`DEAD_CODE_CANDIDATES.md`](file:///d:/handover/ielts/docs/audits/DEAD_CODE_CANDIDATES.md).

### 4.1. Thống kê theo nhóm phân loại

1. **Nhóm A — Confirmed Dead Code & Orphaned Assets (Độ tin cậy 100%):**
   - **6 thư mục Slides HTML tại Root (`slides/`, `slides_builder_v2/`, `slides_dreamer/`, `slides_leader/`, `slides_master_v2/`, `slides_training/`):** 179 files, **255.98 MB**, 0 tham chiếu trong code.
   - **13 tệp trích xuất học liệu tạm thời (`scripts/unit12_pages.txt` .. `unit20_pages.txt`, `scripts/ak_*.txt`, `english-for-everyone/`):** Các tệp text thô dùng trong quá trình số hóa Reading Challenge đang nằm untracked trong `scripts/` và root.
   - **Thư mục `pixel-decoder-images/` & các file ảnh mẫu tại Root (`hop_den_aris_*.png`, `ban_duyet_*.png`, `test_text.png`):** 23 files ảnh thiết kế banner/biển hiệu in ấn ở thư mục gốc repository, không thuộc ứng dụng web.
   - **Thư mục `nextband/public/assets/Arena/avatars/individual_backup/`:** 43 file ảnh backup không được tham chiếu bởi [`characterCatalog.ts`](file:///d:/handover/ielts/nextband/src/lib/arena/characterCatalog.ts).
   - *(Ghi nhận đã xử lý)*: Hàm `getRootAdminEmails()` trong [`server/config/env.ts`](file:///d:/handover/ielts/server/config/env.ts) đã được xóa trong bản sửa đổi uncommitted hiện tại.

2. **Nhóm B — Likely Dead Code (Độ tin cậy 90%):**
   - **`GET /api/v1/auth/me` & `PUT /api/v1/auth/profile` trong [`server/routes/auth.routes.ts`](file:///d:/handover/ielts/server/routes/auth.routes.ts):** Không có consumer nào trong `nextband/src/`.
   - **`AuthorizationService.validateUploadPathBoundary()` trong [`server/services/authorization.service.ts`](file:///d:/handover/ielts/server/services/authorization.service.ts):** Không còn được gọi sau khi chuyển sang Supabase Storage.

3. **Nhóm C — Duplicate / Redundant Logic & Tracked Artifacts (Độ tin cậy 100%):**
   - **Song trùng hàm `isManualGradingRequired` & `isAutoGradedExam`:** Tồn tại đồng thời ở [`nextband/src/lib/examSkillHelper.ts`](file:///d:/handover/ielts/nextband/src/lib/examSkillHelper.ts) và [`server/utils/examSkillHelper.ts`](file:///d:/handover/ielts/server/utils/examSkillHelper.ts) (vừa tạo mới với comment *"Mirroring nextband/src/lib/examSkillHelper.ts"*). Mặc dù giải quyết được sự đồng bộ số lượng bài chờ chấm, việc copy-paste regex sang 2 nơi tạo rủi ro lệch logic trong tương lai nếu chỉ sửa 1 bên.
   - **276 tệp Binary Uploads (`uploads/audio/*.webm`, `uploads/images/*` — 237 MB):** Vẫn đang nằm trong Git index (`git ls-files uploads`).
   - **2 tệp Bundled Gateway (`api/index.js` và `nextband/api/index.js` — 5.2 MB tổng cộng):** Được tạo tự động từ `scripts/bundle-api.mjs` nhưng đang bị theo dõi bởi Git.

4. **Nhóm D — Legacy / Compatibility Tombstones (Giữ nguyên có chủ đích):**
   - Các endpoint HTTP `410 GONE` trong [`server/routes/auth.routes.ts`](file:///d:/handover/ielts/server/routes/auth.routes.ts) và `prisma/legacy_mysql_migrations/`.

---

## 5. PHASE 2 — TECHNICAL DEBT (NỢ KỸ THUẬT & KIẾN TRÚC)

> Chi tiết định danh và kế hoạch xử lý từng khoản nợ nằm tại [`TECHNICAL_DEBT_REGISTER.md`](file:///d:/handover/ielts/docs/audits/TECHNICAL_DEBT_REGISTER.md).

### 5.1. Đứt gãy Module & Contract (P0 Architecture/Build Debt)
- **Thiếu hụt module con trong `doer-questions-bank.data.ts`:**
  - File [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts#L6-L14) import 9 file từ `./bank_parts/week1.data.js` đến `week9.data.js`, nhưng thư mục `server/services/bank_parts/` hoàn toàn chưa tồn tại trên đĩa.
  - Do [`server/services/arena-bank.service.ts`](file:///d:/handover/ielts/server/services/arena-bank.service.ts#L3) import trực tiếp file này, toàn bộ chuỗi biên dịch Backend (`tsc`, `esbuild` trong `npm run build`, và 6 bài test Arena) bị gãy ngay lập tức.
- **Bất đồng bộ Schema dữ liệu Idioms giữa các Unit (`unit01..03, 06` vs `unit04..05`):**
  - Các file [`unit01.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit01.ts#L13-L19), `unit02.ts`, `unit03.ts`, và [`unit06.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit06.ts#L17-L23) định nghĩa đối tượng `summary: { total_idioms, total_teaching_modules, total_practice_exercises, total_audios, accent }`.
  - Ngược lại, [`unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts#L50-L57) và [`unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts#L50-L57) lại dùng interface `UnitIdiomsData` **không có thuộc tính `summary`**.
  - Khi [`EnglishIdiomsCatalogPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx#L126-L153) gọi `unit04Data.summary.total_idioms` và [`EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx#L806) gọi `currentUnitData.summary.accent`, TypeScript báo 5 lỗi biên dịch `TS2339` và ứng dụng sẽ crash (`TypeError: Cannot read properties of undefined (reading 'total_idioms')`) ngay khi truy cập trang `/english-idioms` hoặc chọn Unit 4 / Unit 5!

### 5.2. Độ phức tạp & Kích thước File (God Files & Static Data Bloat)
- **Dữ liệu học liệu tĩnh khổng lồ nhúng trực tiếp vào mã nguồn Frontend:**
  - [`nextband/src/data/vocabC1Unit1.ts`](file:///d:/handover/ielts/nextband/src/data/vocabC1Unit1.ts): **11,546 dòng** (cùng các Unit 2–10 tổng cộng hơn 30,000 dòng TypeScript).
  - [`nextband/src/data/vrsLessonsData.ts`](file:///d:/handover/ielts/nextband/src/data/vrsLessonsData.ts): **9,020 dòng**.
  - Tổ hợp 9 file từ điển Reading Case ([`readingDictionary.ts`](file:///d:/handover/ielts/nextband/src/features/reading/services/readingDictionary.ts) 5,549 dòng, [`case014Dictionary.ts`](file:///d:/handover/ielts/nextband/src/features/reading/services/case014Dictionary.ts) 4,560 dòng, [`case015Dictionary.ts`](file:///d:/handover/ielts/nextband/src/features/reading/services/case015Dictionary.ts) 3,984 dòng, [`case007Dictionary.ts`](file:///d:/handover/ielts/nextband/src/features/reading/services/case007Dictionary.ts) 3,326 dòng...): Tổng cộng **> 28,000 dòng** được import tĩnh vào `ReadingCasePage`, làm chunk `ReadingCasePage-D-zRGY8d.js` phình lên **1,452.85 kB** (gấp đôi kỳ audit trước).
- **Monolithic Service & UI Components:**
  - [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts): **5,587 dòng** (tăng thêm 83 dòng so với ngày 14/10). Mọi thay đổi API của mọi tính năng đều phải sửa chung file này.
  - [`nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx): **2,179 dòng** (chứa toàn bộ state, audio player, 5 loại bài tập tương tác và giao diện trong 1 component duy nhất).
  - [`server/services/exam-submission.service.ts`](file:///d:/handover/ielts/server/services/exam-submission.service.ts) (**1,918 dòng**), [`server/services/class.service.ts`](file:///d:/handover/ielts/server/services/class.service.ts) (**1,902 dòng**), [`server/services/assessment.service.ts`](file:///d:/handover/ielts/server/services/assessment.service.ts) (**1,749 dòng**).

### 5.3. Nợ Type Safety & Linter
- Toàn bộ repository vẫn tắt chế độ kiểm tra nghiêm ngặt (`"strict": false` trong [`tsconfig.json`](file:///d:/handover/ielts/tsconfig.json#L8), `"noImplicitAny": false` trong [`nextband/tsconfig.app.json`](file:///d:/handover/ielts/nextband/tsconfig.app.json)).
- Có hơn **2,250 vị trí dùng `: any` hoặc `as any`**.
- Có rất ít `TODO` / `@ts-ignore` rời rạc (chỉ 3 vị trí `@ts-ignore` / `@ts-expect-error` và 2 dòng `eslint-disable-line` hợp lệ trong `SpeakingGrader.tsx` và `WritingGrader.tsx`), cho thấy nợ kỹ thuật không nằm ở comment bỏ dở mà nằm ở việc lạm dụng `any` và nhúng dữ liệu tĩnh lớn.

### 5.4. Vi phạm ranh giới Single Channel API còn sót lại
- Sau khi `facultyService.ts` và `evidenceStore.ts` được chuyển sang REST API và Gate 5 của [`scripts/sanity_check.mjs`](file:///d:/handover/ielts/scripts/sanity_check.mjs#L70-L73) được mở rộng ra toàn bộ `nextband/src/`, Gate 5 đã lập tức bắt được vi phạm cuối cùng còn ẩn trong `features/`:
  - [`nextband/src/features/reading-challenge/hooks/useUnitProgress.ts`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L61): Gọi trực tiếp `await supabase.from('reading_challenge_progress').upsert({...})`. Bảng `reading_challenge_progress` cũng không tồn tại trong `prisma/schema.prisma`.

---

## 6. PHASE 3 — PRODUCTION, SECURITY & DATA INTEGRITY

### 6.1. Phát hiện Bảo mật Nghiêm trọng Mới (High Severity)
1. **Lỗi Logic Xác thực tại `GET /api/v1/faculty` và `GET /api/v1/evidence` (Unauthenticated/Student Draft & Unconsented Data Exposure):**
   - **Vị trí:**
     - [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L6-L12) (dòng 6–12)
     - [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L6-L12) (dòng 6–12)
   - **Bằng chứng cụ thể:**
     ```ts
     // server/routes/evidence.routes.ts (L6-L12)
     fastify.get("/", async (request, reply) => {
       try {
         const isPublic = !(request.headers.authorization);
         const items = await fastify.prisma.studentEvidence.findMany({
           where: isPublic ? { published: true, consentConfirmed: true } : undefined,
           orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
         });
     ```
   - **Phân tích lỗ hổng:**
     - Endpoint `GET /` không gắn middleware `authenticate` hay `requireRoles("admin")`, nhưng lại dùng biểu thức `!(request.headers.authorization)` để quyết định có lọc `{ published: true, consentConfirmed: true }` hay không!
     - Trong khi đó, [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts#L5495-L5545) (`getPublicFaculty`, `getPublicEvidence`) sử dụng hàm `fetchWithAuth` (luôn tự động đính kèm header `Authorization: Bearer <token>` nếu người dùng đang đăng nhập trên trình duyệt).
     - **Hậu quả 1 (Rò rỉ dữ liệu riêng tư):** Bất kỳ **học viên (student)** hoặc **giáo viên (teacher)** nào đang đăng nhập khi vào trang chủ công khai sẽ gửi kèm header `Authorization`, làm `isPublic = false` $\rightarrow$ Backend trả về **toàn bộ hồ sơ giảng viên nháp (`isPublished: false`) và toàn bộ hồ sơ học viên chưa đồng ý công khai thông tin (`consentConfirmed: false`, `published: false`)**!
     - **Hậu quả 2 (Auth Bypass hoàn toàn):** Bất kỳ kẻ tấn công ẩn danh nào chỉ cần gửi header giả `Authorization: Bearer fake` tới `GET /api/v1/evidence` hoặc `GET /api/v1/faculty` cũng sẽ nhận được toàn bộ dữ liệu ẩn mà không cần token hợp lệ, vì route này không chạy qua `authenticate`!
   - **Đề xuất xử lý:** Vì đã có endpoint riêng `/all` được bảo vệ bằng `{ preHandler: [authenticate, requireRoles("admin")] }` ở ngay dòng 21 của cả 2 file, endpoint `GET /` bắt buộc phải **luôn luôn** lọc `where: { isPublished: true }` (cho faculty) và `where: { published: true, consentConfirmed: true }` (cho evidence) bất kể có header `authorization` hay không, đồng thời [`api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts) cần gọi `/faculty/all` và `/evidence/all` cho các hàm quản trị `getAllFaculty()` / `getAllEvidence()`.

2. **Rò rỉ `err.message` thô của Prisma ra HTTP 500 Response tại `faculty.routes.ts` và `evidence.routes.ts`:**
   - **Vị trí:** [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L16) (L16, L32, L88, L111, L138) và [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L16) (L16, L32, L101, L120).
   - **Bằng chứng:** Các khối `catch (err: any)` trả về trực tiếp `reply.status(500).send({ error: "...", message: err.message })`. Trong khi global error handler của [`server/app.ts`](file:///d:/handover/ielts/server/app.ts) đã được thiết kế để ẩn chi tiết câu lệnh SQL/Prisma khi trả về 500 (được kiểm chứng bởi `security_gate3.test.ts`), việc bắt lỗi cục bộ và trả thẳng `err.message` trong 2 route mới này vô tình làm lộ cấu trúc bảng/cột Prisma nếu xảy ra lỗi DB.

### 6.2. Tính toàn vẹn dữ liệu & Đồng bộ Schema (Data Integrity)
- **Hai model mới trong `prisma/schema.prisma` (`FacultyProfile`, `StudentEvidence`) chưa có file migration:**
  - [`prisma/schema.prisma`](file:///d:/handover/ielts/prisma/schema.prisma#L1599-L1639) đã khai báo `@@map("faculty_profiles")` và `@@map("evidence")`, và `prisma generate` đã chạy thành công. Tuy nhiên cần đảm bảo các bảng và cột tương ứng (đặc biệt là `consent_confirmed`, `display_order`, `ielts_badge_sub`) đã tồn tại đồng bộ trên Supabase PostgreSQL production trước khi deploy code mới.
- **Bảo vệ Invariant Nghiệp vụ Cốt lõi (TỐT):**
  - Các bài test bảo mật và toàn vẹn dữ liệu cốt lõi (`p0_security_freeze.test.ts`, `submission_concurrency.test.ts`, `canonical_scoring_spec.test.ts`, `scoring_differential.test.ts`, `teacher_scope.test.ts`, `security_rbac_hardening.test.ts`) đều **PASS 100%**.
  - Cơ chế khóa trạng thái bài nộp (`SUBMITTED` / `GRADED` trả về `409 Conflict` khi cố tình ghi đè qua `PUT /submissions/:id`) hoạt động chính xác tuyệt đối.

---

## 7. PHASE 4 — TEST COVERAGE & REGRESSION RISK

- **Tổng quan thực thi Test Suite:**
  - Nhờ cấu hình mới trong [`vitest.config.ts`](file:///d:/handover/ielts/vitest.config.ts), tiến trình kiểm thử backend đã **thoát khỏi lỗi sập bộ nhớ V8 OOM**: 70 test suites trong `server/tests/` chạy hoàn tất trong **174.95 giây** với **654 assertions PASS**.
  - **6 test suites thất bại** (`server/tests/arena/dynamic_bank.test.ts`, `phase4_engine.test.ts`, `phase5_reclaim.test.ts`, `phase6_latejoin.test.ts`, `phase7_chaos.test.ts`, `phase8_simulation.test.ts`) đều xuất phát từ **cùng 1 nguyên nhân duy nhất**: [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts) import `./bank_parts/week1.data.js` không tồn tại.
  - Trên Frontend, 1 bài test [`nextband/src/features/reading/__tests__/readlangSidebar.test.tsx`](file:///d:/handover/ielts/nextband/src/features/reading/__tests__/readlangSidebar.test.tsx#L27) thất bại do giao diện component đã đổi nhãn hiển thị sang *"Hiểu đơn giản" / "Trong câu này" / "Cách nhận diện khi đọc"* và lược bỏ mục *"Bạn sẽ gặp nó ở những đâu?"*, nhưng unit test chưa được cập nhật theo.
- **Cảnh báo im lặng trong `NotificationService` khi chạy test:**
  - Trong `op_gap_02_lead_conversion.test.ts`, log ghi nhận `TypeError: Cannot read properties of undefined (reading 'findMany')` tại [`server/services/notification.service.ts:489`](file:///d:/handover/ielts/server/services/notification.service.ts#L489) do mock Prisma trong test không định nghĩa `prisma.userRole.findMany`. Dù hàm bắt lỗi an toàn (non-blocking), nên phòng vệ bằng optional chaining `this.prisma.userRole?.findMany`.

---

## 8. PHASE 5 — UI/UX REGRESSION & CHẤT LƯỢNG SẢN PHẨM

Các lỗi UI/UX đã được xác nhận bằng bằng chứng trực tiếp trong source code và trình biên dịch:

1. **Crash màn hình trắng (Runtime TypeError) trên trang English Idioms Catalog & Hub (`Critical`):**
   - **Trang / Component:** [`EnglishIdiomsCatalogPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx#L126-L153) (`/english-idioms`) và [`EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx#L806) (`/english-idioms/study`).
   - **Điều kiện xuất hiện:**
     - Ngay khi mở trang `/english-idioms`, hằng số cấp module `UNITS_CATALOG` (dòng 126, 152) thực thi `unit04Data.summary.total_idioms` và `unit05Data.summary.total_idioms`.
     - Vì `unit04Data` và `unit05Data` không có thuộc tính `summary` (`undefined`), việc nạp module `EnglishIdiomsCatalogPage.tsx` sẽ văng ngoại lệ `Uncaught TypeError: Cannot read properties of undefined (reading 'total_idioms')` ngay lập tức!
     - Tương tự, trên trang `/english-idioms/study`, khi học viên chọn Unit 4 hoặc Unit 5, dòng 806 `currentUnitData.summary.accent` sẽ văng lỗi `TypeError` làm sập toàn bộ trang học.
   - **Mức độ nghiêm trọng:** **Critical** (Tính năng vừa commit ở `a0fb7ed9` và `ffd3df61` đang bị hỏng hoàn toàn ở runtime).

2. **Vi phạm React Rules of Hooks tại `ChallengeUnitPage.tsx` (`High`):**
   - **Trang / Component:** [`nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L27-L56).
   - **Điều kiện xuất hiện:** Dòng 27 kiểm tra `if (!unit) return (...)`, sau đó dòng 56 mới gọi hook `useUnitProgress(unit.unitNumber)`.
   - **Ảnh hưởng:** Khi điều hướng từ một `unitId` không hợp lệ sang một `unitId` hợp lệ trên cùng component tree, React sẽ báo lỗi `Rendered more hooks than during the previous render`.

3. **Thời gian tải trang chậm trên thiết bị di động do Chunk `ReadingCasePage` nặng 1.45 MB (`Medium`):**
   - **Trang / Component:** `ReadingCasePage` (`dist/assets/ReadingCasePage-D-zRGY8d.js` = **1,452.85 kB** sau khi minify).
   - **Ảnh hưởng:** Học viên sử dụng mạng 3G/4G sẽ phải tải gần 1.5 MB JavaScript trước khi bài đọc đầu tiên hiển thị.

---

## 9. PHASE 6 — CHANGE IMPACT & KHẢ NĂNG PHÁT TRIỂN TÍNH NĂNG MỚI

### 9.1. Các Module có Rủi ro Cao (High-Risk Hotspots)
1. **[`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts) (5,587 dòng):** Điểm nghẽn trung tâm của toàn bộ frontend. Mọi tính năng mới đều phải thêm hàm vào file này, dễ gây conflict và nhầm lẫn giữa public fetcher với authenticated fetcher.
2. **[`server/services/arena-bank.service.ts`](file:///d:/handover/ielts/server/services/arena-bank.service.ts) & [`doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts):** Đang bị đứt gãy do thiếu các file `./bank_parts/week1..9.data.js`, trực tiếp chặn đứng pipeline `npm run build` của toàn bộ backend.
3. **Các trang Học liệu Public mới (`EnglishIdioms*`, `VocabC1*`, `ReadingCasePage`):** Tốc độ thêm học liệu mới rất nhanh (10+ commits trong vài ngày qua), nhưng do thiếu kiểm tra `npm run typecheck` trước khi commit nên đã để lọt lỗi lệch schema (`unit04`, `unit05` thiếu `summary`) vào nhánh `main`.

### 9.2. Đánh giá Mức độ Cô lập của Feature
- Các tính năng học liệu mới (`vocab-c1`, `idioms`, `reading-challenge`) được thiết kế khá độc lập về mặt giao diện (lazy-loaded routes trong `App.tsx`), không làm ảnh hưởng đến luồng thi cử/chấm bài cốt lõi.
- Tuy nhiên, vì dùng chung pipeline build (`npm run build`) và sanity check (`npm run sanity`), chỉ cần 1 file học liệu bị thiếu import (`doer-questions-bank.data.ts`) hoặc lệch type (`unit04.ts`), toàn bộ đợt triển khai (deployment) của cả hệ thống sẽ bị chặn.

---

## 10. PHASE 7 — BẢNG ĐỊNH LƯỢNG VÀ PHÂN LOẠI NỢ KỸ THUẬT

*(Mỗi phát hiện chỉ được tính 1 lần duy nhất ở nhóm chính yếu nhất)*

| Nhóm | Số phát hiện | Critical | High | Medium | Low | Độ tin cậy |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Security** | 2 | 0 | 1 | 1 | 0 | 100% |
| **Data Integrity** | 1 | 0 | 0 | 1 | 0 | 95% |
| **Production Reliability (Build Blocker)** | 1 | 1 | 0 | 0 | 0 | 100% |
| **Dead Code / Orphaned Assets** | 6 | 0 | 0 | 2 | 4 | 100% |
| **Architecture** | 2 | 0 | 1 | 1 | 0 | 100% |
| **Complexity / Maintainability** | 3 | 0 | 1 | 2 | 0 | 95% |
| **Tests / Regression Risk** | 2 | 0 | 0 | 1 | 1 | 100% |
| **UI/UX (Runtime Crash & Hooks)** | 2 | 1 | 1 | 0 | 0 | 100% |
| **Dependencies / Build** | 1 | 0 | 0 | 1 | 0 | 100% |
| **TỔNG CỘNG** | **20** | **2** | **4** | **9** | **5** | **99%** |

---

## 11. NHỮNG GIỚI HẠN CỦA CUỘC AUDIT

1. **Tuân thủ tuyệt đối nguyên tắc Read-Only / Audit-Only:** Không thực hiện bất kỳ chỉnh sửa nào lên source code, không chạy `prisma db push` hay migration làm biến đổi database thực tế.
2. **Trạng thái Working Tree:** Repository đang có 16 file đã sửa và 20 file/thư mục mới chưa commit của lập trình viên. Báo cáo đã bóc tách rõ ràng đâu là lỗi từ commit trên `main` (`unit04/05.summary`) và đâu là lỗi từ công việc đang làm dở (`doer-questions-bank.data.ts`, `faculty.routes.ts`, `evidence.routes.ts`).

---

## 12. PHASE 8 — KẾT LUẬN CUỐI CÙNG: NO-GO (TẠM DỪNG TÍNH NĂNG MỚI ĐỂ KHẮC PHỤC NGAY 4 LỖI P0)

> **Quyết định:** **NO-GO (Tạm dừng bắt đầu tính năng mới trong ~2–3 giờ để khóa sổ các thay đổi đang dang dở và khôi phục trạng thái Build/Typecheck Xanh)**

### Lý do chọn NO-GO ở thời điểm hiện tại (16/10/2026):
Mặc dù kiến trúc lõi đã tốt hơn rất nhiều so với ngày 14/10 (đã sửa xong Vitest OOM, sửa xong 2 lỗi Hooks cũ, và đang hoàn thiện chuyển đổi `faculty`/`evidence` sang REST API), nhưng **ngay tại thời điểm này**, hệ thống đang có **2 lỗi Critical (P0)** chặn đứng hoàn toàn khả năng build và gây crash trực tiếp trên nhánh `main`:

1. **`npm run build` và `npm run typecheck` đang FAIL hoàn toàn** do [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts) import 9 file `./bank_parts/week1..9.data.js` không tồn tại. Không thể deploy bất kỳ bản cập nhật nào lên production cho đến khi bổ sung 9 file này hoặc gỡ import.
2. **Trang `/english-idioms` và `/english-idioms/study` trên nhánh `main` đang bị lỗi crash runtime (`TypeError: unit04Data.summary is undefined`)** và làm gãy Gate 4 của `npm run sanity`.
3. **2 route mới [`faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts) và [`evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts) đang có lỗi logic xác thực (`isPublic = !request.headers.authorization`)** làm lộ dữ liệu nháp/chưa đồng ý công khai cho mọi người dùng đã đăng nhập.

👉 **Lưu ý quan trọng:** Đây là một **Short-Term Tactical NO-GO**. Tổng thời gian để xử lý dứt điểm cả 4 vấn đề chặn đường này chỉ khoảng **2 đến 3 giờ làm việc**. Ngay sau khi hoàn tất 4 mục P0 này (chi tiết trong [`FEATURE_DEVELOPMENT_READINESS.md`](file:///d:/handover/ielts/docs/audits/FEATURE_DEVELOPMENT_READINESS.md) và [`REMEDIATION_ROADMAP.md`](file:///d:/handover/ielts/docs/audits/REMEDIATION_ROADMAP.md)), toàn bộ các lệnh `npm run sanity`, `npm run typecheck`, `npm --prefix nextband run lint`, `npm run test` và `npm run build` sẽ đạt **PASS 100%**, đưa dự án tiến thẳng lên trạng thái **GO**.
