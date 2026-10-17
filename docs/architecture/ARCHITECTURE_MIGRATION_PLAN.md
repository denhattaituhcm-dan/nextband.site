# KẾ HOẠCH CHUYỂN ĐỔI KIẾN TRÚC GIA TĂNG (INCREMENTAL MIGRATION ROADMAP)

> **Mục tiêu chiến lược:** Tối ưu hóa cấu trúc hệ thống, hạ thấp bán kính ảnh hưởng của các thay đổi, và tạo đà cho việc mở rộng tính năng mới nhanh chóng, an toàn.  
> **Nguyên tắc triển khai:** Chia nhỏ thành từng bước độc lập (*Vertical Slices*), mỗi bước đều có thể kiểm thử tự động, có thể rollback tức thì, và tuyệt đối không làm gián đoạn môi trường production.

---

## BẢNG TỔNG HỢP LỘ TRÌNH CHUYỂN ĐỔI (MIGRATION ROADMAP)

```mermaid
timeline
    title Lộ trình Hiện đại hóa Kiến trúc NextBand
    section Giai đoạn 1 : Giảm Bán Kính Ảnh Hưởng
      Bước 1.1 : Phân rã Modular API Client (@/lib/api/)
      Bước 1.2 : Dynamic Code-splitting Từ điển Reading Case
    section Giai đoạn 2 : Đóng gói Domain & Giải nén God Components
      Bước 2.1 : Giải nén EnglishIdiomsHubPage (2,179 dòng)
      Bước 2.2 : Hợp nhất Feature Slice Reading Case
    section Giai đoạn 3 : Chuẩn hóa SSOT & Đồng bộ Tiến độ
      Bước 3.1 : Hợp nhất Logic Chấm thi examSkillHelper
      Bước 3.2 : Cung cấp API lưu trữ tiến độ Reading Challenge
    section Giai đoạn 4 : Tự động hóa Giám sát Kiến trúc
      Bước 4.1 : Bổ sung Sanity Gate kiểm soát ranh giới Import
      Bước 4.2 : Tách biệt Assets nhị phân ra khỏi Git index
```

---

## GIAI ĐOẠN 1: GIẢM BÁN KÍNH ẢNH HƯỞNG & TỐI ƯU BUNDLE (QUICK WINS)

### Bước 1.1: Phân rã `nextband/src/lib/api.ts` thành Modular Client API

- **Vấn đề cần giải quyết:** File `api.ts` dài 6,153 dòng, phục vụ 40 domain con, bị import bởi 126 components. Mọi thay đổi API đều gây rủi ro conflict và gãy build diện rộng.
- **Phạm vi File/Module:**
  - Tạo mới: `nextband/src/lib/api/client.ts` (chứa base fetch, error handler, token resolver).
  - Tách thành các file nhỏ: `domains/classes.api.ts`, `domains/exams.api.ts`, `domains/submissions.api.ts`, `domains/arena.api.ts`, `domains/faculty.api.ts`, `domains/evidence.api.ts`...
  - Giữ `nextband/src/lib/api.ts` hoặc `nextband/src/lib/api/index.ts` làm Facade re-export 100% các hàm và types cũ.
- **Dependencies:** Không có dependency mới.
- **Effort ước tính:** 2 ngày làm việc (16 giờ).
- **Regression Risk:** Cực kỳ thấp (**LOW**) vì giữ nguyên toàn bộ tên hàm và kiểu dữ liệu qua Facade re-export.
- **Test bắt buộc:**
  - `npm run sanity` (Gate 4 TS & Gate 5 Single Channel API).
  - `npm run typecheck` (Đảm bảo 0 lỗi kiểu dữ liệu trên toàn bộ 126 consumers).
  - `npm test` (Chạy toàn bộ 424 unit tests frontend).
- **Điều kiện hoàn thành:**
  - File `api.ts` gốc thu gọn chỉ còn là file re-export ngắn gọn (< 150 dòng).
  - Mỗi domain mới phát triển chỉ cần tạo file API riêng trong `domains/`.
- **Lợi ích thực tế:** Triệt tiêu hoàn toàn điểm nóng xung đột merge code; giảm 90% bán kính ảnh hưởng khi mở rộng tính năng mới.

---

### Bước 1.2: Dynamic Code-splitting Từ điển Reading Case (1.45 MB $\longrightarrow$ < 200 kB)

- **Vấn đề cần giải quyết:** 15 file từ điển `case001Dictionary.ts` $\rightarrow$ `case015Dictionary.ts` (nặng 1.56 MB) đang bị import tĩnh vào `readingDictionary.ts`, đẩy chunk `ReadingCasePage.js` lên 1.45 MB.
- **Phạm vi File/Module:**
  - `nextband/src/features/reading/services/readingDictionary.ts`
  - Tạo hàm nạp động: `loadCaseDictionary(caseId: string)` sử dụng `import()`.
- **Dependencies:** Vite dynamic import native.
- **Effort ước tính:** 0.5 ngày làm việc (4 giờ).
- **Regression Risk:** Rất thấp (**LOW**).
- **Test bắt buộc:**
  - `npm --prefix nextband run test -- src/features/reading/` (Đảm bảo 4 test suites của reading pass 100%).
  - `npm run build:fe` (Kiểm tra kích thước chunk `ReadingCasePage.js`).
- **Điều kiện hoàn thành:**
  - Kích thước chunk `ReadingCasePage.js` giảm xuống dưới 300 kB.
  - Trang đọc bài mở mượt mà và nạp đúng từ điển tương ứng với từng Case ID.
- **Lợi ích thực tế:** Tốc độ tải trang đọc hiểu tăng gấp 4 lần; loại bỏ cảnh báo chunk warning của Vite.

---

## GIAI ĐOẠN 2: ĐÓNG GÓI DOMAIN & GIẢI NÉN GOD COMPONENTS

### Bước 2.1: Phân tách `EnglishIdiomsHubPage.tsx` (2,179 dòng) thành Modular Subcomponents

- **Vấn đề cần giải quyết:** File giao diện Idioms chứa toàn bộ logic nghe, 5 chế độ bài tập và modal trong 1 file monolithic duy nhất, gây khó khăn cho việc kiểm thử và mở rộng Unit bài học mới.
- **Phạm vi File/Module:**
  - Tạo thư mục: `nextband/src/features/idioms/components/`
    - `IdiomsAudioController.tsx` (Quản lý audio loop, playback rate, accent)
    - `IdiomsExerciseContainer.tsx` (Điều phối 5 loại bài tập: Flashcard, Multiple Choice, Fill in blank, Matching, Collocation)
    - `IdiomsSummaryCard.tsx`
  - Thu gọn `EnglishIdiomsHubPage.tsx` thành orchestrator component (< 300 dòng).
- **Dependencies:** `@/data/idioms/*`.
- **Effort ước tính:** 1.5 ngày làm việc (12 giờ).
- **Regression Risk:** Trung bình (**MEDIUM**) - Cần bảo vệ thứ tự hooks và state bài tập.
- **Test bắt buộc:**
  - Viết mới unit test cho `IdiomsExerciseContainer` và `IdiomsAudioController`.
  - `npm --prefix nextband run lint` (Đảm bảo 0 lỗi Rules of Hooks).
- **Điều kiện hoàn thành:**
  - 100% các Unit 1 đến Unit 6 hoạt động trơn tru.
  - Không còn file component nào dài quá 500 dòng trong domain Idioms.
- **Lợi ích thực tế:** Dễ dàng bổ sung Unit 7–20 mà không lo phát sinh lỗi ẩn; tái sử dụng các engine bài tập cho các module khác.

---

### Bước 2.2: Hợp nhất Feature Slice Reading Case

- **Vấn đề cần giải quyết:** Trang `ReadingCasePage.tsx` và `ReadingUniversePage.tsx` nằm rải rác ở `pages/public/reading/`, tách rời khỏi thư mục chứa components và logic tri nhận tại `features/reading/`.
- **Phạm vi File/Module:**
  - Chuyển `ReadingCasePage.tsx` và `ReadingUniversePage.tsx` vào `nextband/src/features/reading/pages/`.
  - Cập nhật đường dẫn import trong `nextband/src/App.tsx`.
- **Effort ước tính:** 0.5 ngày (4 giờ).
- **Regression Risk:** Cực thấp (**VERY LOW**).
- **Test bắt buộc:** `npm run typecheck`, `npm run build:fe`.
- **Điều kiện hoàn thành:** 100% mã nguồn của domain Reading nằm gọn trong `nextband/src/features/reading/`.

---

## GIAI ĐOẠN 3: CHUẨN HÓA SSOT & ĐỒNG BỘ TIẾN ĐỘ NGOẠI TUYẾN

### Bước 3.1: Hợp nhất Logic Chấm thi `examSkillHelper` (Single Source of Truth)

- **Vấn đề cần giải quyết:** Hàm phân loại bài thi tự động/thủ công `isManualGradingRequired` và `isAutoGradedExam` đang bị duplicate tại cả `nextband/src/lib/examSkillHelper.ts` và `server/utils/examSkillHelper.ts`.
- **Phạm vi File/Module:**
  - Trả về cờ `isManualGradingRequired: boolean` trực tiếp từ backend API trong DTO của Exam và Submission.
  - Phía frontend chỉ việc tiêu thụ thuộc tính này từ API thay vì tự chạy regex tính toán lại.
- **Effort ước tính:** 1 ngày (8 giờ).
- **Regression Risk:** Thấp (**LOW**).
- **Test bắt buộc:** `server/tests/examSkillHelper.test.ts` và `nextband/src/test/examSkillHelper.test.ts`.
- **Lợi ích thực tế:** Triệt tiêu hoàn toàn rủi ro sai lệch dữ liệu hiển thị số lượng bài chờ chấm giữa giáo viên và học viên.

---

### Bước 3.2: Cung cấp API Đồng bộ Tiến độ Reading Challenge qua Backend

- **Vấn đề cần giải quyết:** 20 bài học Reading Challenge hiện chỉ lưu tiến độ trên `localStorage`. Học viên đổi thiết bị hoặc xóa cookie sẽ mất toàn bộ tiến trình học.
- **Phạm vi File/Module:**
  - Bổ sung model `ReadingChallengeProgress` vào `prisma/schema.prisma`.
  - Tạo route backend `server/routes/reading-challenge.routes.ts`.
  - Cập nhật hook `useUnitProgress.ts` để đồng bộ 2 chiều (Cloud DB First với LocalStorage Fallback ngoại tuyến).
- **Effort ước tính:** 1.5 ngày (12 giờ).
- **Regression Risk:** Thấp (**LOW**).
- **Test bắt buộc:** Viết integration test cho API đồng bộ tiến độ.
- **Lợi ích thực tế:** Học viên lưu giữ được thành quả học tập bền vững trên mọi thiết bị; quản trị viên có thể theo dõi tỷ lệ hoàn thành bài học.

---

## GIAI ĐOẠN 4: TỰ ĐỘNG HÓA GIÁM SÁT KIẾN TRÚC & DỌN DẸP DỮ LIỆU

### Bước 4.1: Bổ sung Architecture Gate vào `sanity_check.mjs`

- **Vấn đề cần giải quyết:** Cần công cụ tự động ngăn chặn lập trình viên hoặc AI Agent vô tình tạo import vi phạm ranh giới domain trong tương lai.
- **Phạm vi File/Module:**
  - Bổ sung Gate 8 vào [`scripts/sanity_check.mjs`](file:///d:/handover/ielts/scripts/sanity_check.mjs):
    - Quét các file trong `features/A/` không được import file nội bộ private của `features/B/` (chỉ được import qua `features/B/index.ts` nếu có).
    - Cấm import trực tiếp `@prisma/client` và `supabase.from()` trong frontend.
- **Effort ước tính:** 0.5 ngày (4 giờ).
- **Lợi ích thực tế:** Đảm bảo kiến trúc sạch sẽ tự động mà không phụ thuộc vào việc code review thủ công.
