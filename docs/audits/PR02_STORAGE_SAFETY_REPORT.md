# BÁO CÁO NGHIỆM THU TRACK 0 / PR-02: STORAGE SAFETY & URL CONTRACT UNIFICATION

> **Ngày thực hiện:** 19/11/2026  
> **Trạng thái:** HOÀN THÀNH (Nghiệm thu đạt 100%)  
> **Cam kết:** Không xóa uploads local, không ghi đè ngoài ý muốn, không chạy bulk SQL update, không push origin/main, không deploy production.

---

## 1. TỔNG QUAN KẾT QUẢ TRIỂN KHAI PR-02

| Hạng mục | Mức ưu tiên | Mục tiêu | Kết quả thực tế | Trạng thái |
|---|---|---|---|---|
| **Backfill 16 PNG thiếu** | **P0** | Upload đủ 16 file PNG (26.58 MB) lên bucket `exam-assets/images/` với `upsert: false` | 16/16 file đã được đẩy lên an toàn. 100% tệp local được giữ nguyên vẹn | **ĐẠT (100%)** |
| **Xác minh CDN Storage** | **P0** | Kiểm tra HTTP HEAD từng object: status=200, Content-Type=image/png, Content-Length match local byte-for-byte | 16/16 file trả về HTTP 200, Content-Type=image/png, kích thước khớp tuyệt đối | **ĐẠT (100%)** |
| **5 Thumbnail khóa học** | **P1** | Xử lý URL chết `api.nextband.site` trỏ về CDN chính thức `qxtpbonwjmxmogriyfox` | 5/5 object đã tồn tại trên CDN. `toFileUrl()` & `formatStorageUrl()` tự động chuẩn hóa sang CDN | **ĐẠT (100%)** |
| **2 Audio đề thi DB** | **P1** | Chuẩn hóa đường dẫn tương đối `/uploads/audio/` | Đã chuẩn hóa qua `toFileUrl()` & `formatStorageUrl()`, mapping chuẩn xác sang `exam-assets/audio/` | **ĐẠT (100%)** |
| **Backend `toFileUrl()`** | **P1** | Bổ sung mapping `/uploads/images/`, rewrite `api.nextband.site` về Supabase CDN | Đã cập nhật tại `server/utils/file.ts` + 8 regression unit tests | **ĐẠT (100%)** |
| **Frontend `formatStorageUrl()`** | **P1** | Thống nhất URL contract, loại bỏ tiền tố thừa `uploads/` | Đã cập nhật tại `nextband/src/lib/api.ts` + 5 regression unit tests | **ĐẠT (100%)** |
| **Contract `deleteFile()`** | **P2** | Chuyển stub rỗng thành Fastify REST API call có xác thực JWT (Gate 5) | Đã kết nối `DELETE /api/v1/uploads` thông qua `authenticatedFetch` + `handleApiResponse` | **ĐẠT (100%)** |

---

## 2. MANIFEST CHI TIẾT 16 TỆP PNG ĐÃ BACKFILL VÀ NGHIỆM THU CDN

Toàn bộ 16 tệp PNG được đọc trực tiếp từ thư mục an toàn local `uploads/images/` và đẩy lên bucket `exam-assets` tại thư mục `images/<filename>` của project `qxtpbonwjmxmogriyfox.supabase.co`. Không có bất kỳ object nào bị ghi đè (`upsert: false`).

| STT | Tên tệp PNG | Kích thước Local (Bytes) | Kích thước CDN (Bytes) | HTTP Status | MIME Type | Kết quả kiểm chứng |
|:---:|---|:---:|:---:|:---:|:---:|:---:|
| 1 | `1773376560244-1189f3a8-9bd9-492d-9e04-1a0d0523ac0e.png` | 863,478 | 863,478 | 200 OK | `image/png` | ✅ Khớp 100% |
| 2 | `1773377240770-ba30c689-5d86-4ce2-a6c6-fa6f69e17e84.png` | 896,551 | 896,551 | 200 OK | `image/png` | ✅ Khớp 100% |
| 3 | `1773511083660-481ddb41-d66f-4df1-8c3b-d6d5be5806a5.png` | 794,728 | 794,728 | 200 OK | `image/png` | ✅ Khớp 100% |
| 4 | `1773511834847-dd2d0196-883d-4341-bc4f-2eeeea3a0076.png` | 1,152,670 | 1,152,670 | 200 OK | `image/png` | ✅ Khớp 100% |
| 5 | `1773512965384-1d45f18d-f0d0-485d-9c6a-6e42c14b6dc4.png` | 948,881 | 948,881 | 200 OK | `image/png` | ✅ Khớp 100% |
| 6 | `1773632589109-66ff5fd9-6d29-4b72-ae98-116dca82c76a.png` | 5,198,108 | 5,198,108 | 200 OK | `image/png` | ✅ Khớp 100% |
| 7 | `1773632612206-325d2051-1bda-4327-ac84-0b9f5e3ed9e6.png` | 4,045,639 | 4,045,639 | 200 OK | `image/png` | ✅ Khớp 100% |
| 8 | `1773633012021-519315f1-f2a5-4e7c-a526-cddca4fc4be2.png` | 7,393,638 | 7,393,638 | 200 OK | `image/png` | ✅ Khớp 100% |
| 9 | `1773633378827-1ef576e3-6e3c-469d-b0f6-bb61aca468c5.png` | 1,535,579 | 1,535,579 | 200 OK | `image/png` | ✅ Khớp 100% |
| 10 | `1774624171623-5813cdbc-7059-442f-b1c1-350848e65a95.png` | 563,452 | 563,452 | 200 OK | `image/png` | ✅ Khớp 100% |
| 11 | `1774630800497-2b6ffd31-dfe7-48dd-9a83-8cf630b8971f.png` | 985,580 | 985,580 | 200 OK | `image/png` | ✅ Khớp 100% |
| 12 | `1776931516416-1e710024-b758-411f-9dd2-c9a22cd72fa9.png` | 656,381 | 656,381 | 200 OK | `image/png` | ✅ Khớp 100% |
| 13 | `1776931889225-9548ce55-8407-406f-afd6-d728ef812aa9.png` | 759,264 | 759,264 | 200 OK | `image/png` | ✅ Khớp 100% |
| 14 | `1773902886553-176e6473-d260-4a0c-89c4-961c4bd7ac39.png` | 741,177 | 741,177 | 200 OK | `image/png` | ✅ Khớp 100% |
| 15 | `1773905363314-5feefc31-df6b-41e5-b64d-26f6dd08ec66.png` | 767,672 | 767,672 | 200 OK | `image/png` | ✅ Khớp 100% |
| 16 | `1774634143222-22d2356d-228a-432b-8b9a-c9d8d8125966.png` | 563,452 | 563,452 | 200 OK | `image/png` | ✅ Khớp 100% |
| **Tổng** | **16 tệp PNG** | **27,866,250 Bytes (~26.58 MB)** | **27,866,250 Bytes** | **16/16 HTTP 200** | **100% image/png** | **Hoàn hảo** |

*Ghi chú: Toàn bộ bản gốc tại `uploads/images/` trên ổ đĩa local được giữ nguyên 100%, không bị di chuyển hoặc xóa.*

---

## 3. NGHIỆM THU 5 THUMBNAIL KHÓA HỌC & 2 AUDIO ĐỀ THI

### 3.1. Đối chiếu 5 Thumbnail khóa học
Cả 5 khóa học trước đây lưu URL dạng `https://api.nextband.site/uploads/images/<file>` trong cột `courses.thumbnail_url`. Do `api.nextband.site` trả về lỗi HTTP 503, việc chuyển đổi URL tại runtime qua `toFileUrl()` và `formatStorageUrl()` giải quyết triệt để vấn đề mà không cần chạy SQL UPDATE hàng loạt rủi ro.

1. **Khóa MASTER** (`86c74efa-2b5e-4676-8a36-ad7cf575d15e`):
   - Tên file: `1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png`
   - CDN URL: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 1,930,225 bytes, `image/png`).
2. **Khóa LUYỆN THI TN THPT** (`ce799268-8b91-42cd-8eff-853b4211da12`):
   - Tên file: `1774065300765-fbef6032-0b14-4614-9d85-235d0b419778.png`
   - CDN URL: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/images/1774065300765-fbef6032-0b14-4614-9d85-235d0b419778.png`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 1,961,357 bytes, `image/png`).
3. **Khóa PLACEMENT TEST** (`2b2d1b1d-f984-4b36-810f-52b09733e713`):
   - Tên file: `1772894356718-da0543e6-bb2e-40de-81ee-36171eeaa1d1.png`
   - CDN URL: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/images/1772894356718-da0543e6-bb2e-40de-81ee-36171eeaa1d1.png`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 2,644,950 bytes, `image/png`).
4. **Khóa BUILDER** (`575e9b58-f55a-4e9b-9416-88a5adbb535f`):
   - Tên file: `1772691209886-2d101112-476d-4777-9ef1-7055aa8125d5.png`
   - CDN URL: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/images/1772691209886-2d101112-476d-4777-9ef1-7055aa8125d5.png`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 1,981,513 bytes, `image/png`).
5. **Khóa LEADER** (`3abdb60a-e2ba-48b1-9661-f56b121cc66d`):
   - Tên file: `1772691234663-a1b60005-a326-4193-85e4-ba750ed21f2f.png`
   - CDN URL: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/images/1772691234663-a1b60005-a326-4193-85e4-ba750ed21f2f.png`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 2,153,148 bytes, `image/png`).

*(Hai khóa học còn lại trong hệ thống là DOER và DREAMER vốn đã lưu sẵn CDN URL chính xác và hoạt động bình thường).*

### 3.2. Đối chiếu 2 Audio đề thi lưu relative path
1. **Bản ghi `exam_sections` (ID `2c2c4b72-8ff4-41ad-b75a-1ad274a350d6`):**
   - Giá trị DB: `/uploads/audio/1773767189919-e4deb7ad-30fb-4b36-b407-1bbd2472cf1e.mp3`
   - Resolves to: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/audio/1773767189919-e4deb7ad-30fb-4b36-b407-1bbd2472cf1e.mp3`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 6,246,243 bytes, `audio/mpeg`).
2. **Bản ghi `question_groups` (ID `ac6a1f46-f8bc-4384-bacf-c9815c324e99`):**
   - Giá trị DB: `/uploads/audio/1773729966543-82ef47ab-4678-4d41-8575-34f930e44920.mp3`
   - Resolves to: `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/audio/1773729966543-82ef47ab-4678-4d41-8575-34f930e44920.mp3`
   - Kiểm tra: **HTTP 200 OK** (Dung lượng: 2,576,688 bytes, `audio/mpeg`).

---

## 4. CHI TIẾT SỬA ĐỔI CODE & KIẾN TRÚC

### 4.1. `server/utils/file.ts` (`toFileUrl`)
- Bổ sung quy tắc rewrite legacy domain: mọi URL chứa `https?://(api.)?nextband.site/uploads/(images|audio)/<file>` lập tức được ánh xạ về `${supabaseBase}/storage/v1/object/public/exam-assets/<folder>/<filename>`.
- Bổ sung canonical mapping cho `/uploads/images/<filename>` và `uploads/images/<filename>` trỏ về `exam-assets/images/<filename>`.
- Bảo toàn mapping `/uploads/audio/<filename>` và direct `exam-assets/...`.

### 4.2. `nextband/src/lib/api.ts` (`formatStorageUrl`, `normalizeCourseData`, `uploadsApi`)
- `formatStorageUrl`:
  - Chuẩn hóa legacy domain `api.nextband.site` về Supabase CDN public URL.
  - Loại bỏ tiền tố thừa `uploads/` khi format path dạng `uploads/images/...` hoặc `uploads/audio/...`.
  - Sinh đường dẫn canonical: `images/<file>` và `audio/<file>`.
- `normalizeCourseData`:
  - Áp dụng `formatStorageUrl` đồng bộ cho cả `thumbnailUrl` và `thumbnail_url`.
- `uploadsApi.deleteFile`:
  - Thay thế stub cũ `return { success: true }` bằng lời gọi có xác thực:
  ```ts
  deleteFile: async (url: string) => {
    const res = await authenticatedFetch(`${API_BASE_URL}/uploads`, {
      method: "DELETE",
      body: JSON.stringify({ url }),
    });
    return handleApiResponse<{ success: boolean; message?: string }>(res, "Xóa tệp khỏi hệ thống lưu trữ thất bại");
  }
  ```
  - Tuân thủ **Gate 5 (Single Channel API Rule)**: Frontend không tự ý tương tác storage bucket trực tiếp để xóa tệp mà gửi yêu cầu qua Fastify backend để kiểm tra role `admin`, giải mã token JWT và validate storage path an toàn trước khi xóa khỏi Supabase Storage.

---

## 5. BÁO CÁO KIỂM THỬ & KIỂM CHỨNG TOÀN DIỆN

### 5.1. Vitest Test Suites
```bash
npx vitest run server/tests/storage_url_contract.test.ts server/tests/placement_test_storage_contract.test.ts nextband/src/test/storage_url_frontend.test.ts nextband/src/test/storage_durability_p0.test.ts
```
- `server/tests/storage_url_contract.test.ts`: **8/8 PASSED**
- `server/tests/placement_test_storage_contract.test.ts`: **2/2 PASSED**
- `nextband/src/test/storage_url_frontend.test.ts`: **5/5 PASSED**
- `nextband/src/test/storage_durability_p0.test.ts`: **4/4 PASSED**
- **Tổng cộng: 19/19 tests PASSED.**

### 5.2. Architecture Sanity Check (7/7 Gates)
```bash
node scripts/sanity_check.mjs
```
- **Gate 1 (Circular Dependencies):** PASSED (0 circular dependencies).
- **Gate 2 (Hardcoded Email Bypass):** PASSED.
- **Gate 3 (In-Memory Mock Stores):** PASSED.
- **Gate 4 (TypeScript Compilation):** PASSED.
- **Gate 5 (Single Channel API):** PASSED (0 direct DB calls trong UI).
- **Gate 6 (Committed Secrets):** PASSED.
- **Gate 7 (Architecture Hygiene):** PASSED.

### 5.3. Madge Dependency Check
```bash
npx madge --circular --extensions ts server/ nextband/src/
# Result: √ No circular dependency found!
```

### 5.4. TypeScript Strict Compilation
```bash
npm run typecheck
# Result: Code 0 (Passed across server and frontend)
```

---

## 6. KẾT LUẬN & SẴN SÀNG CHO TRACK 1

- **Storage Safety:** Đạt 100% tiêu chí nghiệm thu. Toàn bộ 16 ảnh đề thi đã được đưa lên CDN chính thức, 5 thumbnail khóa học và 2 audio đề thi đều có URL hoạt động hoàn hảo và có contract bảo vệ.
- **Dữ liệu local:** Bản sao 277 file trên local disk được giữ nguyên 100%, không bị thất thoát.
- **Kiến trúc:** Gate 5 được củng cố với `uploadsApi.deleteFile` kết nối Fastify SSOT.
- **Trạng thái Git:** Sẵn sàng commit PR-02 thành một commit độc lập và chuyển sang Track 1 (PR-03: Circular Dependencies) theo lệnh điều phối của người dùng.
