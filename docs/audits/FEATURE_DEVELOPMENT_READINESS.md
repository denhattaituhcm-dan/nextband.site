# FEATURE DEVELOPMENT READINESS REPORT (BÁO CÁO RA QUYẾT ĐỊNH PHÁT TRIỂN TÍNH NĂNG MỚI)

> **Audit Date:** October 16, 2026  
> **Auditor:** Principal Software Engineer, Staff Architect & Technical Debt Auditor  
> **Final Verdict:** **NO-GO (Tạm dừng tính năng mới trong ~2–3 giờ để xử lý dứt điểm 4 lỗi chặn đường P0 trước khi chuyển sang GO)**

---

## 1. CÓ NÊN TIẾP TỤC PHÁT TRIỂN TÍNH NĂNG MỚI NGAY BÂY GIỜ KHÔNG?

**TRẢ LỜI TRỰC TIẾP: KHÔNG NÊN BẮT ĐẦU TÍNH NĂNG MỚI NGAY LÚC NÀY (TACTICAL NO-GO).**

### Tại sao lại là NO-GO ở thời điểm hiện tại (16/10/2026)?
Đội ngũ kỹ thuật vừa thực hiện một loạt cải tiến rất đáng ghi nhận trong working tree (đã sửa xong lỗi sập bộ nhớ Vitest OOM, đã sửa lỗi React Hooks ở `CourseDetail.tsx` và `HomeworkTab.tsx`, đã viết [`faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts) và [`evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts) để thay thế truy vấn Supabase trực tiếp).

Tuy nhiên, quá trình triển khai dở dang của đợt cập nhật này cùng với 2 commit mới nhất trên nhánh `main` (`a0fb7ed9`, `ffd3df61`) đang tạo ra **4 lỗi P0 làm đứt gãy hoàn toàn khả năng Build, Typecheck và an toàn dữ liệu**:

1. **Production Build (`npm run build`) & Backend Typecheck đang sập hoàn toàn:** File [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts#L6-L14) import 9 file `./bank_parts/week1.data.js` $\rightarrow$ `week9.data.js` không tồn tại trên đĩa, làm hỏng `esbuild`, `tsc`, và làm 6 bộ test Arena thất bại.
2. **Trang `/english-idioms` và `/english-idioms/study` vừa commit lên `main` bị Crash Runtime (`TypeError`) & làm gãy Frontend Typecheck:** [`EnglishIdiomsCatalogPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsCatalogPage.tsx#L126-L153) và [`EnglishIdiomsHubPage.tsx`](file:///d:/handover/ielts/nextband/src/pages/public/reading/EnglishIdiomsHubPage.tsx#L806) đọc `unit04Data.summary` và `unit05Data.summary`, nhưng [`unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts#L50-L57) và [`unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts#L50-L57) không có trường `summary`.
3. **Lỗ hổng lộ dữ liệu chưa xuất bản / chưa xin phép (`consentConfirmed: false`) trong 2 route mới:** [`faculty.routes.ts:8`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L8) và [`evidence.routes.ts:8`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L8) dùng `const isPublic = !(request.headers.authorization)`. Mọi học viên đã đăng nhập (hoặc bất kỳ ai gửi header `Authorization` giả) đều lấy được toàn bộ bản nháp của Admin.
4. **Sanity Check (`npm run sanity`) và Frontend Lint (`npm --prefix nextband run lint`) đang FAIL:** Do [`useUnitProgress.ts:61`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L61) gọi thẳng `supabase.from('reading_challenge_progress')` và [`ChallengeUnitPage.tsx:56`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L56) gọi Hook `useUnitProgress` sau câu lệnh `return` sớm.

> [!IMPORTANT]
> **Đây KHÔNG PHẢI là một cuộc khủng hoảng kiến trúc dài hạn.** Tổng thời gian để sửa dứt điểm cả 4 vấn đề trên chỉ mất **2 đến 3 giờ làm việc**. Nhưng nếu không sửa ngay bây giờ mà tiếp tục viết đè tính năng mới lên một working tree đang không thể `build` và không thể `typecheck`, rủi ro chồng chất lỗi là 100%.

---

## 2. CHÍNH XÁC PHẢI XỬ LÝ VẤN ĐỀ NÀO TRƯỚC? (DANH SÁCH CHẶN P0 — 2.5 GIỜ)

Trước khi viết bất kỳ dòng code tính năng mới nào, đội ngũ cần hoàn tất 4 việc sau:

1. **Khôi phục Backend Build & Arena Tests (`DEBT-12` — 45 phút):**
   - Tạo 9 file `server/services/bank_parts/week1.data.ts` .. `week9.data.ts` (hoặc gỡ/comment các dòng import chưa có file trong [`server/services/doer-questions-bank.data.ts`](file:///d:/handover/ielts/server/services/doer-questions-bank.data.ts#L6-L14)).
2. **Sửa lỗi Crash & Typecheck tại English Idioms (`DEBT-13` — 30 phút):**
   - Thêm thuộc tính `summary: { total_idioms: 20, total_teaching_modules: 2, total_practice_exercises: 5, total_audios: 26, accent: "US" }` vào [`nextband/src/data/idioms/unit04.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit04.ts) và [`unit05.ts`](file:///d:/handover/ielts/nextband/src/data/idioms/unit05.ts).
3. **Khóa lỗ hổng lộ dữ liệu nháp tại `/api/v1/faculty` và `/api/v1/evidence` (`DEBT-14` — 30 phút):**
   - Sửa `GET /` trong [`server/routes/faculty.routes.ts`](file:///d:/handover/ielts/server/routes/faculty.routes.ts#L8-L10) luôn lọc `where: { isPublished: true }` và trong [`server/routes/evidence.routes.ts`](file:///d:/handover/ielts/server/routes/evidence.routes.ts#L8-L10) luôn lọc `where: { published: true, consentConfirmed: true }`.
   - Sửa `getAllFaculty()` và `getAllEvidence()` trong [`nextband/src/lib/api.ts`](file:///d:/handover/ielts/nextband/src/lib/api.ts#L5501-L5545) trỏ đúng vào `/faculty/all` và `/evidence/all`.
4. **Sửa lỗi Hook và Direct DB Call tại Reading Challenge (`DEBT-15` & `DEBT-16` — 45 phút):**
   - Đưa `useUnitProgress(parsedUnitNumber)` lên trước lệnh `if (!unit) return` trong [`ChallengeUnitPage.tsx`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/pages/ChallengeUnitPage.tsx#L25-L56).
   - Xóa hoặc chuyển lệnh `supabase.from('reading_challenge_progress')` trong [`useUnitProgress.ts`](file:///d:/handover/ielts/nextband/src/features/reading-challenge/hooks/useUnitProgress.ts#L61) qua REST API.

---

## 3. LOẠI TÍNH NĂNG NÀO AN TOÀN ĐỂ TRIỂN KHAI NGAY SAU KHI XỬ LÝ XONG 4 MỤC P0?

Ngay sau khi hoàn thành 4 mục P0 (mất ~2.5 giờ), dự án sẽ chuyển sang trạng thái **GO / CONDITIONAL GO** và hoàn toàn an toàn để phát triển:

1. **Số hóa tiếp các Unit Học liệu mới (English Idioms Unit 7+, Vocab C1 Unit 11+, Reading Challenge):**
   - Với điều kiện tuân thủ nghiêm ngặt TypeScript interface chuẩn (`UnitIdiomsData` có đầy đủ `summary`) và chạy `npm run typecheck` trước mỗi lần commit.
2. **Mở rộng tính năng Game Arena (DOER Question Bank):**
   - Sau khi các file `bank_parts/week1..9.data.ts` được nạp đầy đủ.
3. **Các tính năng Quản trị Lớp học (`ClassWorkspace`), Giao bài & Chấm bài (`SubmissionGrade`):**
   - Lỗi React Hooks ở `HomeworkTab.tsx` và `CourseDetail.tsx` đã được sửa sạch, logic phân loại bài chấm tự động vs chấm tay (`examSkillHelper`) đã có unit test bảo vệ.

---

## 4. NHỮNG RỦI RO BẮT BUỘC PHẢI GIẢI QUYẾT TRƯỚC PRODUCTION RELEASE

Trước khi đẩy bản release tiếp theo lên môi trường Production (`nextband.site` / Vercel):

1. **Đồng bộ Database Schema cho 2 bảng `faculty_profiles` và `evidence`:**
   - Phải xác minh bảng `faculty_profiles` và `evidence` trên Supabase Production có đầy đủ các cột khớp với [`prisma/schema.prisma`](file:///d:/handover/ielts/prisma/schema.prisma#L1599-L1639) (`consent_confirmed`, `display_order`, `ielts_badge_sub`, `trf_image_url`).
2. **Đạt trạng thái Xanh 100% cho chuỗi lệnh kiểm định (`npm run verify`):**
   - `npm run sanity` $\rightarrow$ PASS (7/7 Gates)
   - `npm run typecheck` $\rightarrow$ PASS (0 Errors)
   - `npm --prefix nextband run lint` $\rightarrow$ PASS (0 Errors)
   - `npm run verify:runtime` $\rightarrow$ PASS (5/5 Gates)
   - `npm run build` $\rightarrow$ PASS

---

## 5. NHỮNG KHOẢN NỢ KỸ THUẬT CÓ THỂ XỬ LÝ SONG SONG (NON-BLOCKING)

Các khoản nợ sau đây **không cần chặn việc phát triển tính năng mới**, có thể lên lịch xử lý song song trong các tuần tới:

- **Tối ưu hóa kích thước chunk `ReadingCasePage.js` (1.45 MB — `DEBT-10`):** Tách các file `case001Dictionary.ts` .. `case015Dictionary.ts` sang dynamic import `await import(...)` theo từng `caseId` thay vì import tĩnh tất cả vào 1 file.
- **Chia nhỏ `nextband/src/lib/api.ts` (5,587 dòng — `DEBT-11`):** Tách dần theo domain (`faculty.api.ts`, `evidence.api.ts`, `arena.api.ts`) khi chạm vào từng khu vực.
- **Dọn dẹp Git Index (`DEBT-07`, `DEBT-08`):** Chạy `git rm -r --cached uploads/` và dọn các file `scripts/unit*_pages.txt`, `slides*/`.
- **Cập nhật 1 assertion trong `readlangSidebar.test.tsx` (`DEBT-19`).**

---

## 6. NHỮNG KHU VỰC CẦN ĐÓNG BĂNG ĐỂ TRÁNH REGRESSION

- 🧊 **Attempt State Machine ([`server/services/submission-state-machine.ts`](file:///d:/handover/ielts/server/services/submission-state-machine.ts)) & Grading Invariants:** Đang đạt độ tin cậy 100% qua 400+ forensic assertions. Không tự ý sửa đổi luồng chuyển trạng thái bài thi.
- 🧊 **Auth Middleware ([`server/middlewares/auth.middleware.ts`](file:///d:/handover/ielts/server/middlewares/auth.middleware.ts)):** Giữ nguyên cơ chế xác thực Supabase JWKS và phân quyền DB SSOT.
- 🧊 **SRE Test Safety Guard ([`vitest.config.ts`](file:///d:/handover/ielts/vitest.config.ts#L21-L45)):** Tuyệt đối không xóa bộ chặn `PROD_DENYLIST` bảo vệ cơ sở dữ liệu production khi chạy test.

---

## 7. ĐIỀU KIỆN ĐỂ QUAY LẠI TRẠNG THÁI "GO"

Dự án sẽ chính thức đạt trạng thái **GO** ngay khi:

1. Lệnh `npm run typecheck` trả về **0 lỗi** ở cả `tsconfig.json` và `nextband/tsconfig.app.json`.
2. Lệnh `npm run sanity` trả về **7/7 Gates PASSED**.
3. Lệnh `npm --prefix nextband run lint` trả về **0 Errors**.
4. Lệnh `npm run build` đóng gói thành công cả Serverless API (`api/index.js`) và Frontend (`nextband/dist`).
5. Hai endpoint `GET /api/v1/faculty` và `GET /api/v1/evidence` không còn trả về dữ liệu `published: false` cho học viên hoặc request không phải admin.
