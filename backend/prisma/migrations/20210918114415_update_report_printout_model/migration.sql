-- AlterTable
ALTER TABLE "PatientReport" ADD COLUMN     "context" TEXT NOT NULL DEFAULT E'';

-- AlterIndex
ALTER INDEX "payrollUserId Revenues_unique_constraint" RENAME TO "payrollUserId_Revenues_unique_constraint";
