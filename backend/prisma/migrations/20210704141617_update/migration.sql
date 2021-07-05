/*
  Warnings:

  - Added the required column `level` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "Sales" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
