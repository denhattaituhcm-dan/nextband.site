# TECHNICAL DEBT REGISTER (SỔ ĐĂNG KÝ NỢ KỸ THUẬT)

> **Audit Date:** October 16, 2026  
> **Repository:** NextBand Monorepo (`d:/handover/ielts`)  
> **Status:** Officially Registered, Verified & Prioritized

---

## 1. CÁC KHOẢN NỢ ĐÃ ĐƯỢC XỬ LÝ TRONG WORKING TREE (RESOLVED SINCE OCT 14)

Trước khi liệt kê các khoản nợ đang mở, cuộc kiểm toán ghi nhận 4 hạng mục từ kỳ trước đã được đội ngũ kỹ thuật khắc phục trong working tree hiện tại:

| ID Cũ | Tên vấn đề | Bằng chứng đã khắc phục | Trạng thái |
| :--- | :--- | :--- | :---: |
| ~~DEBT-01~~ | Vi phạm React Rules of Hooks tại `CourseDetail.tsx` | Đã đưa `useQuery` lên trước lệnh `return <Navigate>` trong [`CourseDetail.tsx`](file:///d:/handover/ielts/nextband/src/pages/CourseDetail.tsx#L28-L55). ESLint báo 0 lỗi tại file này. | ✅ **Đã xử lý (Uncommitted)** |
| ~~DEBT-02~~ | Vi phạm React Rules of Hooks tại `HomeworkTab.tsx` | Đã đưa `useToast()` và `useState()` lên dòng 23-24 trong [`HomeworkTab.tsx`](file:///d:/handover/ielts/nextband/src/pages/admin/ClassWorkspace/tabs/HomeworkTab.tsx#L23-L24). ESLint báo 0 lỗi tại file này. | ✅ **Đã xử lý (Uncommitted)** |
| ~~DEBT-03~~ | Vitest Runner OOM / Esbuild Crash trong SingleFork | Đã tách `environment: "node"` cho backend và `environmentMatchGlobs` `jsdom` cho frontend, tắt `singleFork` trong [`vitest.config.ts`](file:///d:/handover/ielts/vitest.config.ts#L51-L65). 70 suites chạy hoàn tất không còn bị OOM. | ✅ **Đã xử lý (Uncommitted)** |
| ~~DEAD-03~~ | Hàm dư thừa `getRootAdminEmails()` trong `env.ts` | Đã xóa khỏi [`server/config/env.ts`](file:///d:/handover/ielts/server/config/env.ts). | ✅ **Đã xử lý (Uncommitted)** |

---

## 2. BẢNG ĐĂNG KÝ CÁC KHOẢN NỢ KỸ THUẬT & LỖI ĐANG MỞ (ACTIVE REGISTER)

| ID | Tên vấn đề | Nhóm | Mức độ | Bằng chứng cụ thể | Effort | Phụ thuộc | Trạng thái xác minh |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- | :---: |
| **DEBT-12** | Đứt gãy Build/Test do thiếu `./bank_parts/week1..9.data.js` | Production Reliability / Build | **Critical** | [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts#L6-L14) import 9 file không tồn tại, làm sập `npm run build`, `npm run typecheck` và 6 Arena test suites. | 1 giờ | Không | Đã xác nhận (100%) |
| **DEBT-13** | Lệch Schema `summary` ở `unit04.ts` & `unit05.ts` gây Crash UI & Fail Typecheck | UI/UX / Type Contract | **Critical** | [`EnglishIdiomsCatalogPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx#L126-L153) & [`EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx#L806) truy cập `.summary` trên [`unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts#L50-L57) & [`unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts#L50-L57) vốn không có trường `summary`. | 30 phút | Không | Đã xác nhận (100%) |
| **DEBT-14** | Rò rỉ dữ liệu nháp/chưa đồng ý tại `GET /faculty` & `GET /evidence` | Security / Access Control | **High** | [`faculty.routes.ts:8`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L8) và [`evidence.routes.ts:8`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L8) dùng `isPublic = !(request.headers.authorization)`. Mọi request có header `Authorization` bất kỳ đều lấy được toàn bộ bản ghi `published: false` & `consentConfirmed: false`. | 1 giờ | Không | Đã xác nhận (100%) |
| **DEBT-15** | Vi phạm React Rules of Hooks tại `ChallengeUnitPage.tsx` | UI/UX / Runtime | **High** | [`ChallengeUnitPage.tsx:56`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L56) gọi `useUnitProgress(unit.unitNumber)` sau lệnh `if (!unit) return ...` ở dòng 27. Làm `npm --prefix nextband run lint` báo 1 Error. | 30 phút | Không | Đã xác nhận (100%) |
| **DEBT-16** | Truy vấn Supabase trực tiếp trong `useUnitProgress.ts` | Architecture / Single Channel | **High** | [`useUnitProgress.ts:61`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L61) gọi `supabase.from('reading_challenge_progress').upsert(...)`. Làm Gate 5 của `npm run sanity` báo FAIL. | 2 giờ | Backend API | Đã xác nhận (100%) |
| **DEBT-10** | Phình đại Bundle Frontend (`ReadingCasePage.js` = 1.45 MB) | Complexity / Performance | **High** | `npm run build:fe` sinh ra `ReadingCasePage-D-zRGY8d.js` nặng **1,452.85 kB** và `VocabC1Page.js` nặng **469.16 kB** do import tĩnh >50,000 dòng dữ liệu từ điển và học liệu. | 8 giờ | Không | Đã xác nhận (100%) |
| **DEBT-17** | Lộ `err.message` thô trong HTTP 500 tại `faculty.routes.ts` & `evidence.routes.ts` | Security / Error Handling | **Medium** | [`faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L16) & [`evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L16) trả trực tiếp `message: err.message` trong khối `catch`, đi vòng qua bộ lọc lỗi 500 của `server/app.ts`. | 30 phút | Không | Đã xác nhận (100%) |
| **DEBT-18** | Song trùng logic `examSkillHelper.ts` giữa Frontend và Backend | Architecture / DRY | **Medium** | [`server/utils/examSkillHelper.ts`](file:///d:/handover/ielts/server/utils/examSkillHelper.ts) là bản sao của [`nextband/src/lib/examSkillHelper.ts`](file:///d:/handover/ielts/nextband/src/lib/examSkillHelper.ts). Nếu sửa regex ở 1 nơi mà quên nơi kia, số lượng bài chờ chấm sẽ lệch lại. | 2 giờ | Không | Đã xác nhận (100%) |
| **DEBT-19** | Unit test `readlangSidebar.test.tsx` lỗi thời so với UI hiện tại | Tests / Regression | **Medium** | [`readlangSidebar.test.tsx:27`](file:///d:/handover/ielts/nextband/src/features/reading/__tests__/readlangSidebar.test.tsx#L27) tìm chuỗi `/Bạn sẽ gặp nó ở những đâu\?/i` đã bị gỡ khỏi giao diện Sidebar mới. | 30 phút | Không | Đã xác nhận (100%) |
| **DEBT-06** | >2,250 `any` casts & Tắt chế độ `strict` trong TypeScript/ESLint | Maintainability | **Medium** | [`tsconfig.json`](file:///d:/handover/ielts/tsconfig.json#L8) đặt `strict: false`; [`eslint.config.js`](file:///d:/handover/ielts/nextband/eslint.config.js) tắt `@typescript-eslint/no-explicit-any`. | 24 giờ | Không | Đã xác nhận (100%) |
| **DEBT-11** | Monolithic API Client (`nextband/src/lib/api.ts` — 5,587 dòng) | Maintainability | **Medium** | [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts) chứa toàn bộ các hàm gọi API của 40+ domain routes trong một file duy nhất. | 12 giờ | Không | Đã xác nhận (100%) |
| **DEBT-07** | 276 file Binary Uploads (237 MB) bị theo dõi trong Git Index | Dependencies / Build Hygiene | **Medium** | `git ls-files uploads` trả về 276 tệp `.webm`, `.png`, `.jpg` làm nặng repository. | 1 giờ | Backup Storage | Đã xác nhận (100%) |
| **DEBT-08** | 179 tệp HTML Slides (256 MB) & Tệp trích xuất tạm tại Root/Scripts | Dead Code / Repo Hygiene | **Low** | Các thư mục `slides*` (256 MB), `english-for-everyone/`, và `scripts/unit*_pages.txt` nằm lẫn trong repository. | 1 giờ | Không | Đã xác nhận (100%) |
| **DEBT-09** | Bundled Artifacts (`api/index.js`, `nextband/api/index.js`) trong Git | Build Hygiene | **Low** | 2 file bundle 53,300+ dòng (5.2 MB) được theo dõi trong Git dễ gây conflict khi merge. | 2 giờ | Cấu hình Vercel | Đã xác nhận (100%) |

---

## 3. CHI TIẾT KỸ THUẬT & TIÊU CHÍ NGHIỆM THU CHO CÁC HẠNG MỤC TRỌNG YẾU MỚI

### DEBT-12: Đứt gãy Build/Test do thiếu `./bank_parts/week1..9.data.js`
- **Bằng chứng:**
  - [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts#L6-L14):
    ```ts
    import { WEEK_1_QUESTIONS } from "./bank_parts/week1.data.js";
    ...
    import { WEEK_9_QUESTIONS } from "./bank_parts/week9.data.js";
    ```
  - Thư mục `server/services/bank_parts/` không tồn tại.
- **Ảnh hưởng:** Chặn 100% quá trình `npm run build`, `npm run typecheck`, và làm 6 bộ test trong `server/tests/arena/` báo FAIL.
- **Phạm vi xử lý:** Tạo đầy đủ các file `server/services/bank_parts/week1.data.ts` .. `week9.data.ts` (hoặc tạm thời fallback về object rỗng `{}` nếu dữ liệu câu hỏi DOER đang được biên soạn).
- **Tiêu chí hoàn thành:** `npm run typecheck`, `npm run build`, và `npx vitest run server/tests/arena/` đều PASS 100%.

### DEBT-13: Lệch Schema `summary` ở `unit04.ts` & `unit05.ts`
- **Bằng chứng:**
  - [`nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx#L126-L153) gọi `unit04Data.summary.total_idioms` và `unit05Data.summary.total_idioms`.
  - [`nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx#L806) gọi `currentUnitData.summary.accent`.
  - [`nextband/src/data/idioms/unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts#L50-L57) và [`unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts#L50-L57) không có trường `summary`.
- **Ảnh hưởng:** Gây lỗi biên dịch TypeScript (Gate 4 của `npm run sanity` FAIL) và gây crash trắng trang khi người dùng mở `/english-idioms` hoặc chọn Unit 4 / Unit 5.
- **Phạm vi xử lý:** Bổ sung trường `summary: { total_idioms: 20, total_teaching_modules: 2, total_practice_exercises: 5, total_audios: 26, accent: "US" }` vào interface `UnitIdiomsData` và dữ liệu của `unit04.ts`, `unit05.ts`.
- **Tiêu chí hoàn thành:** `npm run typecheck` không còn báo lỗi `TS2339` tại `EnglishIdiomsCatalogPage.tsx` và `EnglishIdiomsHubPage.tsx`.

### DEBT-14: Rò rỉ dữ liệu nháp/chưa đồng ý tại `GET /api/v1/faculty` & `GET /api/v1/evidence`
- **Bằng chứng:**
  - [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L6-L12) và [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L6-L12) kiểm tra `const isPublic = !(request.headers.authorization);`.
  - Trong [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts#L5495-L5545), cả `getPublicFaculty()` và `getAllFaculty()` đều gọi chung `/faculty` thông qua `fetchWithAuth` (tự động gửi kèm token của học viên đang đăng nhập).
- **Ảnh hưởng:** Học viên đã đăng nhập hoặc bất kỳ request nào gắn header `Authorization` giả đều xem được toàn bộ bản nháp (`published: false`) và thông tin học viên chưa xác nhận đồng ý (`consentConfirmed: false`).
- **Phạm vi xử lý:**
  1. Tại `GET /api/v1/faculty`: Luôn luôn lọc `where: { isPublished: true }`.
  2. Tại `GET /api/v1/evidence`: Luôn luôn lọc `where: { published: true, consentConfirmed: true }`.
  3. Tại [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts): Sửa `getAllFaculty()` gọi tới `/faculty/all` và `getAllEvidence()` gọi tới `/evidence/all` (vốn đã có middleware `[authenticate, requireRoles("admin")]`).
- **Tiêu chí hoàn thành:** Viết unit test xác nhận request tới `GET /api/v1/evidence` dù có hay không có header `Authorization` cũng chỉ trả về các bản ghi có `published: true` và `consentConfirmed: true`.

### DEBT-15 & DEBT-16: Chuẩn hóa `ChallengeUnitPage.tsx` và `useUnitProgress.ts`
- **Bằng chứng:**
  - [`ChallengeUnitPage.tsx:56`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L56): Gọi `useUnitProgress(unit.unitNumber)` sau `if (!unit) return ...`.
  - [`useUnitProgress.ts:61`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L61): Gọi trực tiếp `supabase.from('reading_challenge_progress').upsert(...)`.
- **Phạm vi xử lý:**
  1. Đưa `useUnitProgress(parsedUnitNumber)` lên dòng 26 trước câu lệnh `if (!unit)` trong `ChallengeUnitPage.tsx`.
  2. Gỡ bỏ lệnh gọi trực tiếp `supabase.from('reading_challenge_progress')` trong `useUnitProgress.ts` (hoặc chuyển qua endpoint Fastify backend nếu cần lưu DB).
- **Tiêu chí hoàn thành:** `npm --prefix nextband run lint` đạt **0 Errors** và `npm run sanity` đạt **PASS 7/7 Gates**.
