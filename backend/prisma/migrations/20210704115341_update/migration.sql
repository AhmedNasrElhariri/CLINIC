/*
  Warnings:

  - Added the required column `level` to the `MedicineDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicineDefinition" ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "MedicineDefinition" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDefinition" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
