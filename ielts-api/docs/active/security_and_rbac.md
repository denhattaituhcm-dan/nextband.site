# TÀI LIỆU AN TOÀN BẢO MẬT & PHÂN QUYỀN (SECURITY & RBAC SPECIFICATION)

---

## 1. MÔ HÌNH PHÂN QUYỀN MA TRẬN 3 LỚP (3-TIER RBAC MATRIX)

```
┌────────────┐     ┌──────────────┐     ┌──────────────┐
│   ADMIN    │     │   TEACHER    │     │   STUDENT    │
└─────┬──────┘     └──────┬───────┘     └──────┬───────┘
      │                   │                    │
      ├─ Toàn quyền       ├─ Quản lý lớp mình  ├─ Chỉ xem bài của mình
      ├─ Quản lý Users    ├─ Chấm bài học sinh ├─ Làm bài được giao
      ├─ Phúc khảo điểm   ├─ Điểm danh lớp     └─ Xem kết quả cá nhân
      └─ Cấu hình hệ thống└─ Tạo đề thi
```

| Tài Nguyên (Domain Resource) | Action | Student | Teacher (Lớp sở hữu) | Teacher (Lớp khác) | Admin |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Exam Submission** | Start / Autosave / Submit | ✅ (Chính chủ) | ✅ (Test mode) | ❌ (`403`) | ✅ |
| **Exam Submission** | View Detail (`GET /:id`) | ✅ (Chính chủ) | ✅ (Học viên lớp mình)| ❌ (`403 IDOR`) | ✅ |
| **Exam Submission** | Manual Grade (`POST /:id/grade`) | ❌ (`403`) | ✅ (Học viên lớp mình)| ❌ (`403`) | ✅ |
| **Exam Submission** | Official Regrade (`POST /:id/regrade`)| ❌ (`403`) | ✅ (Kèm lý do) | ❌ (`403`) | ✅ |
| **Class Entity** | Update Info (`PUT /classes/:id`)| ❌ (`403`) | ✅ (Chính chủ) | ❌ (`403`) | ✅ |
| **Class Entity** | Attendance (`POST /:id/attendance`)| ❌ (`403`) | ✅ (Chính chủ) | ❌ (`403`) | ✅ |
| **User Entity** | Create / Delete (`/users`) | ❌ (`403`) | ❌ (`403`) | ❌ (`403`) | ✅ |

---

## 2. CƠ CHẾ CHỐNG TẤN CÔNG ĐẶC TRƯNG

1. **Chống IDOR (Insecure Direct Object Reference)**:
   - Mọi truy vấn chi tiết bài làm, lớp học, điểm danh đều kiểm tra kép quyền sở hữu (Dual-channel ownership verification) qua database trước khi xử lý, chặn đứng việc thay đổi UUID trên thanh URL.
2. **Chống Tiêm Điểm (Score Injection Resistance)**:
   - Các trường `score`, `totalScore`, `bandScore`, `isCorrect` gửi từ client lên bị loại bỏ hoàn toàn trước khi nạp vào Domain Services.
3. **Bảo Mật Đề Thi (Answer-Key Zero Leakage)**:
   - DTO trả về cho học sinh đang thi loại bỏ 100% các trường chứa đáp án hoặc transcript audio.
