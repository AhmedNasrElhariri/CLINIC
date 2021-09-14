/*
  Warnings:

  - Added the required column `materialId` to the `FaceOperation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FaceOperation" ADD COLUMN     "materialId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FaceOperation" ADD FOREIGN KEY ("materialId") REFERENCES "MaterialDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER INDEX "payrollUserId Revenues_unique_constraint" RENAME TO "payrollUserId_Revenues_unique_constraint";
