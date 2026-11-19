# PR-01 — BÁO CÁO KIỂM TOÁN STORAGE SAFETY & ĐỐI CHIẾU DATABASE THỰC TẾ

> **Ngày kiểm toán:** 19/11/2026  
> **Phạm vi PR-01:** Audit chỉ đọc PostgreSQL (`BEGIN TRANSACTION READ ONLY`) + đối chiếu `storage.buckets` / `storage.objects` (`qxtpbonwjmxmogriyfox.supabase.co`) với toàn bộ **277 tệp local duy nhất** trong `uploads/` & `nextband/public/uploads/`, và sửa URL domain cũ đã chết tại [`server/data/placement-test/questions.ts:73`](file:///d:/handover/ielts/server/data/placement-test/questions.ts#L73) kèm regression test.  
> **An toàn dữ liệu & Production:** Không xóa `uploads/` local, không xóa object trên Supabase Storage, không chạy SQL `UPDATE`/`DELETE`, không sửa bucket policy, không push `origin/main`, không deploy production.

---

## 1. KẾT QUẢ KIỂM KÊ SUPABASE STORAGE & DATABASE PRODUCTION (`READ-ONLY`)

### 1.1. Hiện trạng `storage.buckets` và `storage.objects` trên `qxtpbonwjmxmogriyfox`

| Bucket (`id` / `name`) | `public` | `file_size_limit` | `allowed_mime_types` | Tổng số object | Phân bố theo prefix |
| :--- | :---: | :---: | :--- | :---: | :--- |
| `exam-assets` | `true` | `null` | `null` | **216** | `audio/`: 86 · `uploads/audio/`: 81 *(trùng lặp)* · `speaking-recordings/`: 42 · `images/`: 7 |
| `speaking-recordings` | `true` | `15,728,640` (15 MB) | `audio/webm`, `audio/ogg`, `audio/mp4`, `audio/wav` | **0** | *(Toàn bộ 42 file ghi âm đang nằm trong `exam-assets/speaking-recordings/*`)* |

> **Phát hiện quan trọng:** Lý do trước đây khi quét HTTP `HEAD` qua URL public thô cho ra 188 file báo 400 là vì:
> 1. Phần lớn tệp local trong `uploads/` (173 tệp) là tệp cũ/rác hoàn toàn **không còn tham chiếu trong DB**;
> 2. Có **81 file audio** bị lưu đúp dưới cả `exam-assets/audio/` và `exam-assets/uploads/audio/`, trong khi ảnh chỉ có **7 object** trên `exam-assets/images/`.

### 1.2. Kết quả quét toàn bộ schema `public` trong PostgreSQL (`198` tham chiếu media sạch sau khi khử trùng lặp)

Quét toàn bộ các cột `text`, `character varying`, `json`, `jsonb` trong schema `public` bằng giao dịch chỉ đọc (`BEGIN TRANSACTION READ ONLY`):

| Mẫu URL / Đường dẫn tìm thấy trong DB | Số lần xuất hiện | Ghi chú kỹ thuật |
| :--- | :---: | :--- |
| `qxt_storage_url` (`https://qxtpbonwjmxmogriyfox.supabase.co/storage/...`) | **99** | URL chuẩn trên project chính thức. |
| `relative_speaking_recordings` (`speaking-recordings/...`) | **68** | Lưu tại `speaking_recording_assets.storage_path` và `answers.audio_url`. |
| `external_http_other` | **20** | `api.dictionaryapi.dev`: 19 (`cognitive_words.audio_url`) · `zalo.me`: 1 (`site_settings`). |
| `nextband_domain_uploads_url` (`https://api.nextband.site/uploads/...`) | **8** | Domain cũ hiện trả **HTTP 503** (`5` thumbnails khóa học đã có trên CDN + `3` ảnh đề thi bị thiếu trên CDN). |
| `relative_uploads_path` (`/uploads/...`) | **3** | `2` file audio đề thi (đã có trên CDN) + `1` `/uploads/logo.png` (không có cả local lẫn CDN). |
| `OLD_gzp_url` / `OLD_dma_url` trong bảng DB | **0** | **0 bản ghi** trong DB trỏ domain Supabase cũ; nơi duy nhất còn hardcode `gzpdlqxjggyxlkeatvvf` ở runtime là `server/data/placement-test/questions.ts:73` (đã sửa ở PR-01). |

---

## 2. PHÂN LOẠI TOÀN BỘ 277 TỆP LOCAL THÀNH 4 NHÓM

Tổng hợp từ `uploads/` (275 tệp, 224.50 MB) và `nextband/public/uploads/` (276 tệp, 230.57 MB), giao nhau 274 tệp ➔ **277 tệp duy nhất**:

| Nhóm | Mô tả | Số tệp local | Tổng dung lượng | Trạng thái & Hành động cần thiết |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Existing & Accessible** (Tồn tại trong `storage.objects` public + URL DB khớp chính xác, HTTP 200) | **80** *(78 audio, 2 ảnh)* | — | ✅ **An toàn 100%.** Không cần thao tác. |
| **2** | **Existing but Incorrect URL** (File ĐÃ tồn tại trong `storage.objects` public HTTP 200, nhưng DB/code đang trỏ sai host hoặc relative path) | **8** *(1 audio placement test + 2 audio đề thi + 5 thumbnail khóa học)* | — | 🟡 **Đã sửa 1/8 trong PR-01** (`questions.ts:73`). 7 URL còn lại trong DB chỉ cần chuẩn hóa URL (không cần re-upload file). |
| **3** | **Missing from Storage (NEED BACKFILL)** (Đang được DB tham chiếu chủ động ở đề thi thật, nhưng **CHƯA CÓ** trong `storage.objects`) | **16** *(100% là `.png`)* | **26.58 MB** | 🔴 **BẮT BUỘC BACKFILL** 16 tệp PNG này từ local lên `exam-assets/images/<file>`. (13 tệp DB đã có sẵn URL `qxtpbonwjmxmogriyfox` chuẩn; 3 tệp còn trỏ `api.nextband.site`). |
| **4** | **Unreferenced / Obsolete** (0 tham chiếu trong DB `public` schema, 0 tham chiếu trong source code) | **173** *(1 có trên storage, 172 không có)* | **137.06 MB** | ⚪ **Giữ nguyên tại local** cho đến khi hoàn tất backfill + kiểm thử xong toàn bộ Track 0. |

> **Kết luận lớn của PR-01:** Không phải 188 tệp bị mất mà chỉ có đúng **16 tệp ảnh `.png` (26.58 MB)** thực sự đang được hệ thống sử dụng và cần backfill lên `exam-assets/images/`. Ngoài ra có **3 bản ghi mồ côi chỉ tồn tại ở DB** (thiếu ở cả Storage lẫn ổ đĩa local, xem Mục 5).

---

## 3. CHI TIẾT NHÓM 2 — 8 TỆP ĐÃ CÓ TRÊN STORAGE NHƯNG URL CHƯA CHUẨN

| # | Tệp local | Object thực tế trên `qxtpbonwjmxmogriyfox` (HTTP 200) | Nguồn URL hiện tại | Tình trạng |
| :- | :--- | :--- | :--- | :--- |
| 1 | `entrance test/cambridge-ielts-13-academic-listening-1-audio-1.mp3` | `exam-assets/audio/1787423782098-cambridge-ielts-13-academic-listening-1-audio-1.mp3` | [`server/data/placement-test/questions.ts:73`](file:///d:/handover/ielts/server/data/placement-test/questions.ts#L73) (`gzpdlqxjggyxlkeatvvf.supabase.co`) | ✅ **Đã sửa trong PR-01** sang `qxtpbonwjmxmogriyfox.supabase.co` kèm test |
| 2 | `audio/1773767189919-e4deb7ad-30fb-4b36-b407-1bbd2472cf1e.mp3` | `exam-assets/audio/...` & `exam-assets/uploads/audio/...` | `exam_sections.audio_url` (`2c2c4b72-8ff4-41ad-b75a-1ad274a350d6` — *WEEK 3 - DAY 2 - READING AND LISTENING / Listening*) lưu `/uploads/audio/...` | Được `toFileUrl()` cứu ở runtime; nên chuẩn hóa URL DB sau khi được duyệt |
| 3 | `audio/1773729966543-82ef47ab-4678-4d41-8575-34f930e44920.mp3` | `exam-assets/audio/...` & `exam-assets/uploads/audio/...` | `question_groups.audio_url` (`ac6a1f46-f8bc-4384-bacf-c9815c324e99` — *WEEK 1 - DAY 2 - READING & LISTENING / Question 11-14*) lưu `/uploads/audio/...` | Được `toFileUrl()` cứu ở runtime; nên chuẩn hóa URL DB sau khi được duyệt |
| 4 | `images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png` | `exam-assets/images/1772691223925-5aa5823d-00ee-4e53-b166-69608d30fa6a.png` | `courses.thumbnail_url` (`86c74efa-2b5e-4676-8a36-ad7cf575d15e` — **MASTER**) lưu `https://api.nextband.site/uploads/images/...` (HTTP 503) | File đã có sẵn trên CDN; cần rewrite URL sang `qxt` (khi được duyệt) |
| 5 | `images/1772691209886-2d101112-476d-4777-9ef1-7055aa8125d5.png` | `exam-assets/images/1772691209886-2d101112-476d-4777-9ef1-7055aa8125d5.png` | `courses.thumbnail_url` (`575e9b58-f55a-4e9b-9416-88a5adbb535f` — **BUILDER**) lưu `https://api.nextband.site/uploads/images/...` (HTTP 503) | File đã có sẵn trên CDN; cần rewrite URL sang `qxt` (khi được duyệt) |
| 6 | `images/1772691234663-a1b60005-a326-4193-85e4-ba750ed21f2f.png` | `exam-assets/images/1772691234663-a1b60005-a326-4193-85e4-ba750ed21f2f.png` | `courses.thumbnail_url` (`3abdb60a-e2ba-48b1-9661-f56b121cc66d` — **LEADER**) lưu `https://api.nextband.site/uploads/images/...` (HTTP 503) | File đã có sẵn trên CDN; cần rewrite URL sang `qxt` (khi được duyệt) |
| 7 | `images/1772894356718-da0543e6-bb2e-40de-81ee-36171eeaa1d1.png` | `exam-assets/images/1772894356718-da0543e6-bb2e-40de-81ee-36171eeaa1d1.png` | `courses.thumbnail_url` (`2b2d1b1d-f984-4b36-810f-52b09733e713` — **PLACEMENT TEST**) lưu `https://api.nextband.site/uploads/images/...` (HTTP 503) | File đã có sẵn trên CDN; cần rewrite URL sang `qxt` (khi được duyệt) |
| 8 | `images/1774065300765-fbef6032-0b14-4614-9d85-235d0b419778.png` | `exam-assets/images/1774065300765-fbef6032-0b14-4614-9d85-235d0b419778.png` | `courses.thumbnail_url` (`ce799268-8b91-42cd-8eff-853b4211da12` — **LUYỆN THI TN THPT**) lưu `https://api.nextband.site/uploads/images/...` (HTTP 503) | File đã có sẵn trên CDN; cần rewrite URL sang `qxt` (khi được duyệt) |

---

## 4. DANH SÁCH CHÍNH XÁC 16 TỆP CẦN BACKFILL (NHÓM 3 — 26.58 MB)

### 4A. 13 tệp DB đã lưu sẵn URL `qxtpbonwjmxmogriyfox` chuẩn (chỉ cần upload lên `exam-assets/images/`, không cần sửa DB)

| # | Tệp local (`images/...`) | Dung lượng | Bảng & Cột DB | Row ID | Đề thi bị ảnh hưởng |
| :- | :--- | :---: | :--- | :--- | :--- |
| 1 | `images/1773376560244-1189f3a8-9bd9-492d-9e04-1a0d0523ac0e.png` | 843.2 KB | `exam_sections.instructions` | `5bcdc57e-aff4-4957-968d-0cc559eea92f` | `WEEK 3 - DAY 1 - SPEAKING` (Speaking) |
| 2 | `images/1773377240770-ba30c689-5d86-4ce2-a6c6-fa6f69e17e84.png` | 875.5 KB | `exam_sections.instructions` | `18691437-a623-47ac-ab29-ee94cb2770cb` | `WEEK 3 - DAY 3 - READING AND WRITING` (Reading) |
| 3 | `images/1773511083660-481ddb41-d66f-4df1-8c3b-d6d5be5806a5.png` | 776.1 KB | `exam_sections.instructions` | `eac543ac-4cd5-47a2-8270-7da73016d5c1` | `WEEK 5 - DAY 1 - SPEAKING` (Speaking) |
| 4 | `images/1773511834847-dd2d0196-883d-4341-bc4f-2eeeea3a0076.png` | 1.10 MB | `exam_sections.instructions` | `43b5a59e-c75e-46df-b696-710d9f6dce7f` | `WEEK 5 - DAY 3 - READING AND WRITING` (Reading) |
| 5 | `images/1773512965384-1d45f18d-f0d0-485d-9c6a-6e42c14b6dc4.png` | 926.6 KB | `exam_sections.instructions` | `43030963-45f5-46f2-a812-d586e2533f15` | `WEEK 7 - DAY 3 - READING AND WRITING` (Reading) |
| 6 | `images/1773632589109-66ff5fd9-6d29-4b72-ae98-116dca82c76a.png` | 4.96 MB | `exam_sections.instructions` | `0850f444-fb17-4d50-be7b-75d242e16e4a` | `WEEK 9 - DAY 3 - READING AND WRITING` (Reading) |
| 7 | `images/1773632612206-325d2051-1bda-4327-ac84-0b9f5e3ed9e6.png` | 3.86 MB | `exam_sections.instructions` | `0850f444-fb17-4d50-be7b-75d242e16e4a` | `WEEK 9 - DAY 3 - READING AND WRITING` (Reading) |
| 8 | `images/1773633012021-519315f1-f2a5-4e7c-a526-cddca4fc4be2.png` | 7.05 MB | `exam_sections.instructions` | `28c57bb8-4b33-403d-9a2a-3a44b6b6260a` | `WEEK 6 - DAY 3 - READING AND WRITING` (Reading) |
| 9 | `images/1773633378827-1ef576e3-6e3c-469d-b0f6-bb61aca468c5.png` | 1.46 MB | `exam_sections.instructions` | `8a816ffd-d984-42e3-817d-78cf989455b3` | `WEEK 4 - DAY 3 - READING AND WRITING` (Reading) |
| 10 | `images/1774624171623-5813cdbc-7059-442f-b1c1-350848e65a95.png` | 550.2 KB | `questions.question_text` | `f1b4ce72-b8da-42e6-af35-f40fe9fe4a00` | `W8 - D1 - WRI` |
| 11 | `images/1774630800497-2b6ffd31-dfe7-48dd-9a83-8cf630b8971f.png` | 962.5 KB | `questions.question_text` | `107e9ed2-cac5-4891-8ea8-9734c985a775` | `WEEK 1 - DAY 1 - SPEAKING` |
| 12 | `images/1776931516416-1e710024-b758-411f-9dd2-c9a22cd72fa9.png` | 641.0 KB | `question_groups.passage` | `bdf646c5-f333-4f58-aa73-762c166b24e6` | `W7 - D2 - WR` (Body) |
| 13 | `images/1776931889225-9548ce55-8407-406f-afd6-d728ef812aa9.png` | 741.5 KB | `question_groups.passage` | `19869ef6-9106-4a89-87c6-e3d494d7b9d0` | `W6 - D2 - WRI` (Intro + Overview) |

### 4B. 3 tệp thiếu trên Storage VÀ DB đang trỏ `https://api.nextband.site/uploads/images/...` (cần backfill + rewrite URL sau khi duyệt)

| # | Tệp local (`images/...`) | Dung lượng | Bảng & Cột DB | Row ID | Đề thi bị ảnh hưởng |
| :- | :--- | :---: | :--- | :--- | :--- |
| 14 | `images/1773902886553-176e6473-d260-4a0c-89c4-961c4bd7ac39.png` | 723.8 KB | `exam_sections.instructions` | `139f3775-932f-4f51-9d12-19147616f03d` | `WEEK 9 - DAY 1 - WRITING` (Writing) |
| 15 | `images/1773905363314-5feefc31-df6b-41e5-b64d-26f6dd08ec66.png` | 749.7 KB | `exam_sections.instructions` | `3f250c2e-dace-4a50-9b25-27cd30dbf059` | `WEEK 8 - DAY 1 - WRITING` (Writing) |
| 16 | `images/1774634143222-22d2356d-228a-432b-8b9a-c9d8d8125966.png` | 550.2 KB | `exam_sections.instructions` | `e6d92eb4-359c-4968-991b-f7d66c68c064` | `W9 - D1 - WRI` (Writing) |

---

## 5. BẢN GHI MỒ CÔI CHỈ CÓ TRONG DB (KHÔNG TỒN TẠI CẢ STORAGE LẪN LOCAL)

| # | Bảng & Cột DB | Row ID | Giá trị URL trong DB | Ghi chú |
| :- | :--- | :--- | :--- | :--- |
| 1 | `profiles.avatar_url` | `06832f41-cb55-48d9-af41-1fd35a88d778` | `.../exam-assets/images/1789872001900-Screenshot_20260920-093919_Zalo.jpg` | Ảnh đại diện người dùng không có trên local lẫn CDN (UI fallback chữ cái đầu). |
| 2 | `profiles.avatar_url` | `b3157928-7dd9-4bd4-9365-cdc32f123449` | `.../exam-assets/images/1786801997554-744738167_122212621328336355_2697222599311871653_n.jpg` | Ảnh đại diện người dùng không có trên local lẫn CDN (UI fallback chữ cái đầu). |
| 3 | `site_settings.value` (`key="global"`) | `6850ecee-ab9f-4799-b97f-4e129b894362` | `logoUrl: "/uploads/logo.png"` | [`SiteLogo.tsx`](file:///d:/handover/ielts/nextband/src/components/common/SiteLogo.tsx#L45-L62) tự động fallback sang `/logo.png` trong `public/`. |

---

## 6. THAY ĐỔI CODE TRONG PR-01 & KẾT QUẢ KIỂM CHỨNG

### 6.1. Thay đổi trong PR-01
1. Tạo regression test [`server/tests/placement_test_storage_contract.test.ts`](file:///d:/handover/ielts/server/tests/placement_test_storage_contract.test.ts) (xác nhận **FAIL** ở bước Red Phase khi `questions.ts:73` còn trỏ `gzpdlqxjggyxlkeatvvf.supabase.co`).
2. Sửa [`server/data/placement-test/questions.ts:73`](file:///d:/handover/ielts/server/data/placement-test/questions.ts#L73) từ domain cũ đã chết sang `https://qxtpbonwjmxmogriyfox.supabase.co/storage/v1/object/public/exam-assets/audio/1787423782098-cambridge-ielts-13-academic-listening-1-audio-1.mp3`.

### 6.2. Kết quả kiểm chứng sau khi sửa (Green Phase)
- `npx vitest run server/tests/placement_test_storage_contract.test.ts nextband/src/tests/assessment-clean-room.test.ts nextband/src/tests/assessment-security.test.ts server/tests/assessment_scoring_integrity.test.ts`: **4/4 test files PASS (20/20 tests)**.
- `node --max-old-space-size=3072 ./node_modules/typescript/bin/tsc -p tsconfig.json --noEmit`: **0 lỗi (Exit code 0)**.
- `node scripts/sanity_check.mjs`: **PASS 7/7 Gates**.
- **Rollback độc lập 1 lệnh:** `git revert <commit_sha>` (không ảnh hưởng DB, không ảnh hưởng Storage, không đụng production).
