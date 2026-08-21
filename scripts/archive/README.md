# Scripts Archive Directory

Thư mục này lưu trữ các công cụ, migration lịch sử, và script kiểm thử thực nghiệm đã qua sử dụng:

## 1. migrations/
Lưu trữ các script điều chỉnh Schema / RLS policies / Prisma reconciliation lịch sử:
- migrate_identities.mjs: Chuyển đổi identity user từ MySQL sang Supabase.
- init_contact_leads_table.mjs: Script DDL tạo bảng contact_leads.
- apply_p0_rls_patch.ts: Script áp dụng bản vá RLS Policy P0 ban đầu.
- clean_and_lock_all_policies.ts: Khóa toàn bộ policies Supabase Postgres.
- reconcile_prisma_migrations.ts: Đối soát migration table Prisma.
- inspect_policies.ts: Kiểm tra danh sách policies trên Supabase DB.

## 2. audit_tools/
Các công cụ đối soát bảo mật và kiểm tra sức khỏe hệ thống khi có sự cố (Incident Recovery):
- audit_and_heal_identities.mjs & audit_identities.mjs: Kiểm tra và tự chữa lành identity dữ liệu.
- verify_auth_rbac_matrix.mjs: Kiểm tra ma trận quyền RBAC (Admin, Teacher, Student).
- verify_leads_system.mjs: Kiểm tra hệ thống Contact Lead.
- verify_upload_architecture.mjs: Kiểm tra luồng upload media lên Supabase Storage.
- audit_production_schema.mjs: Kiểm tra schema database trên Production.
- verify_p1_d_production_smoke.ts: Smoke test kết nối và API Production.
- verify_schema_reconcile.ts: Đối soát DB schema.
- test_pooler.mjs: Đo lường latency và kết nối Supabase Connection Pooler.

## 3. speaking_forecast_crawler/
Bộ công cụ crawl và đồng bộ dữ liệu IELTS Speaking Forecast:
- crawl-speaking-forecast.js: Crawler dữ liệu chủ đề speaking.
- sync-mock-data.js: Đồng bộ từ dump JSON sang mockData.ts.
- forecast_2026_q2_full.json: Snapshot dữ liệu crawl Speaking Forecast Q2/2026.

## 4. experiments/
Các script thực nghiệm độc lập:
- benchmark_concurrency.mjs: Đo lường năng lực chịu tải đồng thời.
- setup_gas_doc.js: Script cấu hình tài liệu Google Apps Script.
