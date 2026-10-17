# HIẾN PHÁP KIẾN TRÚC — NEXTBAND LMS (ARCHITECTURE CONSTITUTION)

> **Mục đích:** Bộ quy tắc bất khả xâm phạm dành cho mọi Kỹ sư Phần mềm và AI Coding Agent khi tham gia phát triển, sửa lỗi hoặc tối ưu hóa codebase NextBand.  
> **Nguyên tắc tối thượng:** Giữ vững tính ổn định của hệ thống production; mọi quyết định thay đổi phải có căn cứ thực nghiệm, không phá vỡ hợp đồng dữ liệu hiện hữu.

---

## 1. QUY TẮC 1: PHÂN ĐỊNH RANH GIỚI DOMAIN (DOMAIN SEPARATION)

- **Nguyên tắc:** Mỗi domain nghiệp vụ phải có ranh giới rõ ràng về trách nhiệm và dữ liệu sở hữu. Một domain không được tự ý can thiệp trực tiếp vào dữ liệu nội bộ của domain khác mà không thông qua Public API/Interface được xuất bản.
- **DO (Nên làm):**
  ```typescript
  // Gọi qua Service hoặc Public Contract của domain khác:
  const isEnrolled = await this.enrollmentService.hasActiveEnrollment(studentId, courseId);
  ```
- **DON'T (Cấm làm):**
  ```typescript
  // Trong Arena Service lại tự ý query và chỉnh sửa trực tiếp bảng của Class Management:
  await prisma.classStudent.deleteMany({ where: { studentId } }); // SAI RANH GIỚI DỮ LIỆU
  ```

---

## 2. QUY TẮC 2: HƯỚNG PHỤ THUỘC MỘT CHIỀU (DEPENDENCY DIRECTION)

- **Nguyên tắc:** Chiều phụ thuộc luôn đi từ tầng cao xuống tầng thấp:
  $$\text{Presentation / UI} \longrightarrow \text{Domain Service} \longrightarrow \text{Infrastructure / Database}$$
  Tuyệt đối cấm tạo ra phụ thuộc vòng (*Circular Dependency*).
- **DO (Nên làm):**
  - Component UI $\longrightarrow$ React Query Hook $\longrightarrow$ Domain API Client $\longrightarrow$ Fastify REST API.
- **DON'T (Cấm làm):**
  - Tầng Domain Service lại đi import logic của Tầng Controller hoặc Tầng UI.
  - Hai file service import chéo lẫn nhau (`ServiceA` import `ServiceB` và `ServiceB` import `ServiceA`).

---

## 3. QUY TẮC 3: KIẾN TRÚC SINGLE CHANNEL API (NO DIRECT SUPABASE FROM FRONTEND)

- **Nguyên tắc:** Mọi truy vấn và biến đổi dữ liệu (Read/Write Mutations) từ Frontend bắt buộc phải đi qua Fastify API Gateway (`@/lib/api/*`).
- **DO (Nên làm):**
  ```typescript
  // Trong custom hook hoặc component:
  const { data } = useQuery({
    queryKey: ["classes", classId],
    queryFn: () => classesApi.getClassDetails(classId),
  });
  ```
- **DON'T (Cấm làm):**
  ```typescript
  // Tự gọi trực tiếp Supabase Database Client trong UI Component:
  const { data } = await supabase.from("classes").select("*").eq("id", classId); // VI PHẠM GATE 5 SANITY!
  ```
  *(Ngoại lệ duy nhất được phép: `supabase.auth` dùng quản lý phiên đăng nhập và `supabase.channel` dùng nghe sự kiện realtime).*

---

## 4. QUY TẮC 4: QUẢN TRỊ CODE DÙNG CHUNG (SHARED CODE GOVERNANCE)

- **Nguyên tắc "Rule of Three":** Chỉ đưa một hàm hoặc component vào `shared/` (`components/ui/`, `lib/utils.ts`) khi nó thực sự được sử dụng độc lập ở ít nhất 3 domain khác nhau. Tuyệt đối không nhét logic nghiệp vụ đặc thù của 1 domain vào thư mục dùng chung.
- **DO (Nên làm):**
  - `formatDate()`, `cn()`, `Button`, `Dialog` đặt trong `@/components/ui/` hoặc `@/lib/utils.ts`.
- **DON'T (Cấm làm):**
  - Đặt `calculateIeltsSpeakingBand()` hay `parseReadingCaseAutopsy()` vào `lib/utils.ts`.

---

## 5. QUY TẮC 5: KỶ LUẬT HỢP ĐỒNG API VÀ TYPES (CONTRACT & TYPE DISCIPLINE)

- **Nguyên tắc:** Mọi API Request và Response DTO phải có kiểu dữ liệu rõ ràng. Tuyệt đối cấm sử dụng `: any` hoặc `as any` tại ranh giới API để che giấu lỗi thiếu kiểu dữ liệu.
- **DO (Nên làm):**
  ```typescript
  export interface SubmitExamResponse {
    submissionId: string;
    status: "GRADED" | "REQUIRES_MANUAL_GRADING";
    overallBand?: number;
    gradedAt: string;
  }
  ```
- **DON'T (Cấm làm):**
  ```typescript
  export async function submitExam(payload: any): Promise<any> { ... } // NỢ KỸ THUẬT NGUY HIỂM
  ```

---

## 6. QUY TẮC 6: BẤT BIẾN KIỂM THỬ HỒI QUY (NON-REGRESSION TESTING)

- **Nguyên tắc:** Tuyệt đối không sửa đổi hoặc xóa bỏ các assertion kiểm thử đã có chỉ để làm cho test pass. Nếu có thay đổi nghiệp vụ, phải giải trình căn cứ và bổ sung test case mới bao phủ cả trạng thái cũ và mới.
- **DO (Nên làm):**
  - Khi sửa lỗi bảo mật tại `/faculty`, viết thêm test case kiểm tra: Unauthenticated $\rightarrow$ Chỉ thấy public, Header giả mạo $\rightarrow$ Bị chặn.
- **DON'T (Cấm làm):**
  - Xóa dòng `expect(res.statusCode).toBe(401)` đi khi thấy test báo lỗi 403.

---

## 7. QUY TẮC 7: NGUYÊN TẮC THÊM TÍNH NĂNG MỚI (FEATURE ADDITION PROTOCOL)

- **Nguyên tắc:** Tính năng mới phải tuân theo cấu trúc Feature-First. Không tự tiện tạo thêm file rời rạc ở thư mục gốc hoặc nhồi nhét vào các file monolithic hiện hữu.
- **DO (Nên làm):**
  - Tạo feature mới trong `nextband/src/features/<tên-tính-năng>/` bao gồm đầy đủ `components/`, `hooks/`, `types/`, `pages/`.
  - Khai báo API Client tương ứng trong `nextband/src/lib/api/domains/<tên-tính-năng>.api.ts`.
- **DON'T (Cấm làm):**
  - Viết thêm 500 dòng code trực tiếp vào `nextband/src/lib/api.ts`.
  - Nhúng hàng chục nghìn dòng dữ liệu tĩnh trực tiếp vào file TypeScript mà không hỗ trợ lazy-loading.

---

## 8. QUY TẮC 8: NGUYÊN TẮC REFACTORING (WHEN & HOW TO REFACTOR)

- **Nguyên tắc:** Chỉ refactor khi có đầy đủ bộ kiểm thử bảo vệ (*Safety Net*). Refactor phải tách biệt hoàn toàn với task thêm tính năng mới (*Boy Scout Rule có kiểm soát: Không vừa đổi tên biến toàn hệ thống vừa làm tính năng mới*).
- **DO (Nên làm):**
  - Chạy `npm test` và `npm run sanity` trước khi bắt đầu.
  - Sửa từng bước nhỏ (*micro-commits*), chạy lại test sau mỗi bước.
- **DON'T (Cấm làm):**
  - Chạy các công cụ tự động format toàn bộ repository làm trôi dạt git history và gây merge conflict hàng loạt.

---

## 9. QUY TẮC 9: BẢO VỆ CÁC MODULE DÙNG CHUNG CÓ BÁN KÍNH ẢNH HƯỞNG LỚN (HIGH-BLAST-RADIUS)

- **Nguyên tắc:** Các file có hơn 50 consumers (như `nextband/src/lib/api.ts`, `server/middlewares/auth.middleware.ts`, `prisma/schema.prisma`) là đối tượng nhạy cảm cao độ.
- **DO (Nên làm):**
  - Áp dụng kỹ thuật Facade Pattern / Re-export để giữ vững tương thích ngược 100% khi tái cấu trúc.
- **DON'T (Cấm làm):**
  - Thay đổi chữ ký hàm (function signature) hoặc đổi tên export của các hàm đang phục vụ hàng chục component.

---

## 10. QUY TẮC 10: QUY TRÌNH XÁC MINH TRƯỚC KHI HOÀN TẤT TASK (PRE-COMPLETION CHECKLIST)

Mọi lập trình viên và AI Agent bắt buộc phải thực thi và ghi nhận kết quả **100% PASS** của 5 lệnh sau trước khi tuyên bố hoàn thành bất kỳ nhiệm vụ nào:

```bash
# 1. Kiểm tra toàn vẹn kiến trúc (7/7 Gates)
npm run sanity

# 2. Kiểm tra an toàn kiểu dữ liệu (0 lỗi TypeScript cả FE và BE)
npm run typecheck

# 3. Kiểm tra quy ước mã nguồn (0 lỗi ESLint)
npm --prefix nextband run lint

# 4. Kiểm tra bộ test tự động (100% Unit/Integration Tests PASS)
npm test

# 5. Kiểm tra khả năng khởi động Gateway thực tế (5/5 Runtime Gates)
npm run verify:runtime
```
