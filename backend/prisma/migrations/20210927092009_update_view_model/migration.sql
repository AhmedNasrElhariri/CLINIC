-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "choices" DROP NOT NULL;

-- AlterIndex
ALTER INDEX "payrollUserId Revenues_unique_constraint" RENAME TO "payrollUserId_Revenues_unique_constraint";
