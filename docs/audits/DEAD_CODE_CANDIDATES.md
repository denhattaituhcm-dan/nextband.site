# DEAD CODE CANDIDATES & REDUNDANT ARTIFACTS REGISTER

> **Audit Date:** October 16, 2026  
> **Repository:** NextBand Monorepo (`d:/handover/ielts`)  
> **Strict Policy:** AUDIT-ONLY — Không có bất kỳ file, function, component hay dependency nào bị xóa trong quá trình lập danh sách này.

---

## 1. PHÂN LOẠI THEO NHÓM BẰNG CHỨNG

- **Nhóm A — Confirmed Dead Code & Orphaned Assets:** Có đủ bằng chứng 100% không còn bất kỳ đường dẫn truy cập tĩnh hay động nào trong toàn bộ ứng dụng.
- **Nhóm B — Likely Dead Code:** Có dấu hiệu không được sử dụng trong frontend/backend chính, nhưng cần xác minh thêm khả năng tích hợp bên ngoài trước khi gỡ bỏ.
- **Nhóm C — Duplicate / Redundant Logic & Tracked Build Artifacts:** Nhiều nơi cùng cài đặt một logic nghiệp vụ hoặc file sinh tự động đang bị lưu trong Git.
- **Nhóm D — Legacy / Compatibility Tombstone Code:** Code cũ được giữ lại có chủ đích để trả lỗi rõ ràng (`410 GONE`) hoặc lưu vết lịch sử migration.

---

## 2. BẢNG CHI TIẾT CÁC PHÁT HIỆN DEAD CODE & DƯ THỪA

| # | Đường dẫn / Đối tượng | Ký hiệu / Artifact | Phân loại | Bằng chứng xác minh | Độ tin cậy | Cách xác minh trước khi xóa / hợp nhất |
| :- | :--- | :--- | :---: | :--- | :---: | :--- |
| 1 | `slides/`, `slides_builder_v2/`, `slides_dreamer/`, `slides_leader/`, `slides_master_v2/`, `slides_training/` | 179 tệp HTML slides (**255.98 MB**) | **A** | `git grep` trả về 0 tham chiếu trong toàn bộ `server/`, `nextband/`, `scripts/`. Chỉ được ẩn tạm bằng `.git/info/exclude`. | 100% | Xác nhận với bộ phận học thuật xem đã lưu trữ bản sao ở kho tài liệu riêng chưa trước khi di dời khỏi thư mục code. |
| 2 | `scripts/unit12_pages.txt` .. `unit20_pages.txt`, `scripts/ak_11_15.txt`, `scripts/ak_16_20.txt`, `scripts/extract_reading_challenge.mjs`, `english-for-everyone/` | 13 tệp trích xuất văn bản thô & script tạm (Untracked) | **A** | Các tệp dump text tạm thời phục vụ số hóa học liệu Reading Challenge / Idioms, không được import bởi bất kỳ module runtime hay build script nào. | 100% | Kiểm tra `git status`, di chuyển vào thư mục lưu trữ ngoại vi hoặc xóa sau khi hoàn tất nhập liệu. |
| 3 | `pixel-decoder-images/` & các file ảnh in ấn tại Root (`hop_den_aris_*.png`, `ban_duyet_*.png`, `test_text.png`) | 23 files ảnh thiết kế in ấn (~18 MB) | **A** | 0 tham chiếu trong `nextband/` hoặc `server/`. Đây là các file thiết kế hộp đèn quảng cáo ARIS và ảnh test. | 100% | Di chuyển sang thư mục tài sản thương hiệu (Brand Assets / Google Drive) ngoài Git repo. |
| 4 | `nextband/public/assets/Arena/avatars/individual_backup/` | 43 tệp ảnh avatar backup | **A** | [`characterCatalog.ts`](file:///d:/handover/ielts/nextband/src/lib/arena/characterCatalog.ts) chỉ trỏ tới `/assets/Arena/avatars/individual/`. Thư mục `individual_backup` không có bất kỳ nơi nào gọi tới. | 98% | Kiểm tra `git grep "individual_backup"` (0 kết quả) trước khi xóa. |
| 5 | [`server/routes/auth.routes.ts`](file:///d:/handover/ielts/server/routes/auth.routes.ts) | `GET /api/v1/auth/me`, `PUT /api/v1/auth/profile` | **B** | Frontend `nextband/src/` không gọi 2 endpoint này ([`useAuth.tsx`](file:///d:/handover/ielts/nextband/src/hooks/useAuth.tsx) đọc trực tiếp Supabase session/profiles). Chỉ có 1 file test `cache_control_boundary.test.ts` gọi mock. | 90% | Xác nhận không có mobile app hoặc script bên ngoài nào gọi 2 route này trước khi gỡ bỏ. |
| 6 | [`server/services/authorization.service.ts`](file:///d:/handover/ielts/server/services/authorization.service.ts) | Method `validateUploadPathBoundary()` | **B** | 0 caller trong toàn bộ `server/` và `nextband/`. Upload đã chuyển sang xử lý stream qua [`uploads.routes.ts`](file:///d:/handover/ielts/server/routes/uploads.routes.ts). | 95% | Chạy `npm run typecheck` và test suite sau khi gỡ. |
| 7 | [`server/utils/examSkillHelper.ts`](file:///d:/handover/ielts/server/utils/examSkillHelper.ts) & [`nextband/src/lib/examSkillHelper.ts`](file:///d:/handover/ielts/nextband/src/lib/examSkillHelper.ts) | Hàm `isSpeakingMatch`, `isWritingMatch`, `isAutoGradedExam`, `isManualGradingRequired` | **C** | Cùng một bộ biểu thức chính quy (regex) phân loại kỹ năng Speaking/Writing đang bị nhân đôi ở cả `server/utils/` và `nextband/src/lib/`. | 100% | Hợp nhất thành 1 file shared utility hoặc để Backend trả sẵn cờ `requiresManualGrading: boolean` trong API response để Frontend không phải tự đoán bằng regex. |
| 8 | `uploads/audio/*`, `uploads/images/*` | 276 tệp nhị phân (**237 MB**) tracked trong Git | **C** | `git ls-files uploads` trả về 276 tệp đã bị commit vào Git trước khi `.gitignore` có hiệu lực. | 100% | Chạy `git rm -r --cached uploads/` để bỏ theo dõi trong Git mà vẫn giữ nguyên file trên ổ đĩa máy chủ. |
| 9 | [`api/index.js`](file:///d:/handover/ielts/api/index.js) & `nextband/api/index.js` | 2 tệp bundle Serverless Gateway (53,300+ dòng / tệp, **5.2 MB**) | **C** | Là kết quả đầu ra của `scripts/bundle-api.mjs` nhưng đang được track trong Git. | 100% | Kiểm tra cấu hình build trên Vercel trước khi đưa vào `.gitignore`. |
| 10 | [`server/routes/auth.routes.ts`](file:///d:/handover/ielts/server/routes/auth.routes.ts) | `/register`, `/login`, `/login/google`, `/change-password`, `/verify-password` | **D** | Các endpoint trả về HTTP `410 GONE` (Tombstone). | 100% | **GIỮ NGUYÊN** để bảo đảm client cũ nhận phản hồi lỗi tường minh. |
| 11 | `prisma/legacy_mysql_migrations/*` | 14 tệp SQL migration cũ | **D** | Lưu trữ lịch sử chuyển đổi từ MySQL sang PostgreSQL. | 100% | **GIỮ NGUYÊN** làm tài liệu lịch sử. |

*(Ghi chú: Hàm `getRootAdminEmails()` trong [`server/config/env.ts`](file:///d:/handover/ielts/server/config/env.ts) từng được liệt kê ở Nhóm A trong kỳ audit ngày 14/10 hiện đã được lập trình viên xóa sạch trong working tree).*

---

## 3. CÁC COMPONENT ĐÃ ĐƯỢC KIỂM CHỨNG ĐANG HOẠT ĐỘNG (FALSE-POSITIVE EXCLUSIONS)

Các module sau đây không có import tĩnh thông thường nhưng **KHÔNG PHẢI DEAD CODE** (được nạp qua dynamic import, router hoặc realtime channel):

1. **[`nextband/src/pages/admin/CheckAttempt.tsx`](file:///d:/handover/ielts/nextband/src/pages/admin/CheckAttempt.tsx):** Nạp qua `React.lazy` trong [`App.tsx`](file:///d:/handover/ielts/nextband/src/App.tsx) (route `/admin/check-attempt`) và gắn trong `AdminSidebar.tsx`.
2. **`nextband/src/pages/admin/ClassWorkspace/**`:** Nạp động qua route `/admin/classes/:id/workspace` trong [`App.tsx`](file:///d:/handover/ielts/nextband/src/App.tsx).
3. **[`nextband/src/pages/admin/CambridgeGradingModal.tsx`](file:///d:/handover/ielts/nextband/src/pages/admin/CambridgeGradingModal.tsx):** Được sử dụng trực tiếp trong [`Cambridge.tsx`](file:///d:/handover/ielts/nextband/src/pages/admin/Cambridge.tsx).
4. **Hệ thống Multiplayer Arena (`ArenaHostPage.tsx`, `ArenaJoinPage.tsx`, `ArenaPlayPage.tsx`):** Hoạt động qua route `/arena/*` và kênh đồng bộ thời gian thực Supabase Realtime.

---

## 4. ĐO LƯỜNG & ƯỚC LƯỢNG CHI PHÍ XỬ LÝ

- **Số lượng file/thư mục rác hoặc dư thừa đã xác nhận (Nhóm A & C):** 179 file HTML slides + 276 file binary uploads trong Git index + 23 file ảnh in ấn tại root + 13 file text trích xuất tạm + 43 ảnh avatar backup = **534 files** (chiếm **~512 MB** dung lượng).
- **Số lượng hàm/route code cần xem xét (Nhóm B & C):** 2 route `/auth/me`, `/auth/profile`, 1 hàm `validateUploadPathBoundary`, và 1 cặp file helper trùng lặp `examSkillHelper.ts`.
- **Chi phí xử lý dự kiến:** **4 – 6 giờ công** (0.5 – 1 ngày làm việc).
