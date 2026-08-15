# TÀI LIỆU VẬN HÀNH & TRIỂN KHAI (DEPLOYMENT & OPERATIONS GUIDE)

---

## 1. KHỞI CHẠY HỆ THỐNG MỤC TIÊU (RUNNING SERVICES)

### 1.1. Backend Fastify Gateway (`ielts-api`)
```bash
cd d:/handover/ielts/ielts-api
npm install
npm run build     # Prisma generate && tsc
npm run dev       # Khởi chạy server tại http://localhost:3000
```

### 1.2. Frontend React Client (`nextband`)
```bash
cd d:/handover/ielts/nextband
npm install
npm run build     # Vite production bundle
npm run dev       # Khởi chạy Vite dev server tại http://localhost:5173
```

---

## 2. BIẾN MÔI TRƯỜNG BẮT BUỘC (ENVIRONMENT VARIABLES)

### Backend (`ielts-api/.env`)
- `DATABASE_URL`: Connection string PostgreSQL (Supabase Canonical DB).
- `JWT_SECRET`: Khóa bí mật giải mã và kiểm tra chữ ký Supabase JWT.
- `PORT`: Cổng dịch vụ (Mặc định `3000`).
- `CORS_ORIGIN`: Danh sách domain frontend được phép (`http://localhost:5173`, `https://nextband.site`).

### Frontend (`nextband/.env`)
- `VITE_API_BASE_URL`: Endpoint Fastify REST API (`http://localhost:3000/api/v1` hoặc `https://api.nextband.site/api/v1`).
- `VITE_SUPABASE_URL`: Endpoint Supabase Storage & Auth.
- `VITE_SUPABASE_ANON_KEY`: Public Anon Key cho Auth Session.

---

## 3. CHECKLIST KIỂM ĐỊNH PRODUCTION (HEALTH CHECK)

1. `GET /api/v1/health` $\longrightarrow$ `200 OK` (`{ status: "ok", timestamp: "..." }`).
2. `npm test` trong `ielts-api` $\longrightarrow$ 303/303 tests pass.
3. `npm test` trong `nextband` $\longrightarrow$ 32/32 tests pass.
4. Quét 0 call-site trực tiếp ra database legacy hoặc client-side database authority.
