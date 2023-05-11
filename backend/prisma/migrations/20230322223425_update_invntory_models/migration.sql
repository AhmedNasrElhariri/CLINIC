/*
  Warnings:

  - You are about to drop the column `alertNumberOfUnits` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "noOfBoxes" DOUBLE PRECISION,
ADD COLUMN     "purshasingPricePerBox" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "alertNumberOfUnits",
DROP COLUMN "sellingPrice",
ADD COLUMN     "alertNumberOfBoxes" INTEGER,
ADD COLUMN     "sellingPricePerBox" INTEGER,
ADD COLUMN     "sellingPricePerUnit" DOUBLE PRECISION;
