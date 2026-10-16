# AGENTS.md — QUY TẮC PHÁT TRIỂN & BẢO TRÌ BẮT BUỘC DÀNH CHO ANTIGRAVITY

> Tài liệu này được Antigravity tự động phát hiện và nạp (Hierarchical Project Rule).  
> Mọi AI Agent tham gia chỉnh sửa codebase NextBand / ARIS IELTS LMS bắt buộc phải tuân thủ nghiêm ngặt các quy tắc sau.

---

## 1. NGUYÊN TẮC KHẢO SÁT TRƯỚC KHI SỬA ĐỔI
1. **Đọc System Map trước khi bắt đầu:** Luôn đọc [`docs/architecture/SYSTEM_MAP.md`](file:///d:/handover/ielts/docs/architecture/SYSTEM_MAP.md) và [`docs/architecture/MODULE_BOUNDARIES.md`](file:///d:/handover/ielts/docs/architecture/MODULE_BOUNDARIES.md) trước khi sửa đổi bất kỳ file nào.
2. **Không tạo duplicate implementation:** Tuyệt đối không tự ý viết thêm một implementation nghiệp vụ thứ hai nếu hệ thống đã có implementation dùng chung (ví dụ: đã có `client.ts` thì không tạo thêm helper fetch mới).
3. **Đánh giá consumer khi sửa shared module:** Không được thay đổi signature, URL hoặc kiểu dữ liệu của các shared module (`@/lib/api/*`, `client.ts`, `server/plugins/prisma.ts`) mà chưa kiểm tra toàn bộ các consumer liên quan.

---

## 2. RÀNG BUỘC KIẾN TRÚC & DỮ LIỆU
4. **Tuân thủ Single Channel API Rule (Gate 5):** Tuyệt đối không để Frontend UI Component hoặc Custom Hook gọi trực tiếp database/Prisma hoặc bảng Supabase. Mọi truy vấn bắt buộc phải đi qua `@/lib/api/*`.
5. **Cấm tuyệt đối Circular Dependencies (Gate 1):** Luồng dependency luôn là Directed Acyclic Graph (DAG). Các module trong `nextband/src/lib/api/domains/*.api.ts` chỉ được import từ `../client`, không được import ngược lại `api.ts`.
6. **Bảo toàn Database Contract:** Không tự ý thay đổi cột, quan hệ hoặc schema Prisma (`prisma/schema.prisma`) mà chưa đối chiếu với toàn bộ backend services và serverless bundle.
7. **Cấm tạo Mock Data / RAM Fallback (Gate 3):** Tuyệt đối không tạo in-memory mock stores, biến tạm thời hay fallback giả lập để làm cho build pass hoặc che giấu lỗi backend. Nếu API lỗi, phải ném `ApiError` minh bạch.

---

## 3. KỶ LUẬT KIỂM CHỨNG & BÀN GIAO
8. **Typecheck Pass không đồng nghĩa với Runtime Correctness:** Không coi việc `tsc` pass là bằng chứng duy nhất chứng minh code chạy đúng. Bắt buộc phải đối chiếu logic và chạy test nghiệp vụ liên quan.
9. **Chạy Sanity Check & Regression Tests:** Trước khi kết thúc phiên làm việc, bắt buộc phải chạy `node scripts/sanity_check.mjs` (kiểm tra 7 gates) và các test hồi quy thuộc domain vừa can thiệp.
10. **Bảo toàn Working Tree:** Không được ghi đè, clean, reset hoặc revert các file chưa commit của developer.
11. **Kiểm tra Git Diff:** Luôn chạy `git diff --stat` và kiểm tra diff chi tiết trước khi báo cáo hoàn thành. Phạm vi thay đổi phải là tối thiểu và chính xác theo yêu cầu.
12. **Minh bạch khi phát hiện quy tắc không phù hợp:** Nếu phát hiện một quy tắc kiến trúc không còn phù hợp hoặc gây tắc nghẽn, hãy giải trình bằng bằng chứng và đề xuất cập nhật thay vì âm thầm vi phạm.

---

## 4. QUY ĐỊNH REPO & DEPLOYMENT TARGET (CHỐNG PUSH NHẦM)
13. **Đích đến Repo của Workspace này:** Workspace `d:\handover\ielts` này chỉ phục vụ duy nhất cho hệ thống **`nextband.site`**.
    - **Remote `origin` chính:** `https://github.com/denhattaituhcm-dan/nextband.site.git` (nhánh `main`).
    - **Vercel Project:** `nextband-site-frontend` ➔ Domain: `https://nextband.site`.
    - **Supabase Backend:** Project `qxtpbonwjmxmogriyfox` (`FRONTEND_URL=https://nextband.site`).
    - **Cấm tuyệt đối:** Không bao giờ push code từ workspace này sang repo `nextband.git` (nay là `legacy_nextband`). Mọi lệnh `git push` mặc định sẽ đẩy lên `origin/main` (`nextband.site.git`).
14. **Tự động Commit & Push khi hoàn thành (Bắt buộc không cần nhắc):**
    - Sau khi hoàn thành bất kỳ task chỉnh sửa/thêm tính năng nào và đã kiểm tra `sanity_check.mjs` / `typecheck` thành công, AI Agent **phải tự động stage, commit (với commit message chuẩn Conventional Commits) và chạy ngay `git push origin main`**.
    - Tuyệt đối không để code nằm lại ở uncommitted / unpushed state và không bao giờ đợi user phải nhắc *"đẩy code lên chưa"*.

