-- AlterTable: Thêm is_primary vào bảng branches
ALTER TABLE "branches" ADD COLUMN IF NOT EXISTS "is_primary" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex: Đảm bảo bất biến tại mọi thời điểm chỉ có tối đa 1 active branch là is_primary = true
CREATE UNIQUE INDEX IF NOT EXISTS "branches_one_primary_active" ON "branches"("is_primary") WHERE "is_primary" = true AND "is_active" = true;

-- Update: Tự động gán cơ sở đầu tiên đang active làm Cơ sở chính nếu chưa có cơ sở nào là primary
UPDATE "branches"
SET "is_primary" = true
WHERE id = (
    SELECT id FROM "branches"
    WHERE "is_active" = true
    ORDER BY "created_at" ASC
    LIMIT 1
)
AND NOT EXISTS (
    SELECT 1 FROM "branches" WHERE "is_primary" = true AND "is_active" = true
);
