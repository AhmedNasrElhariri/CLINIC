/*
  Warnings:

  - Added the required column `level` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "specialtyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
