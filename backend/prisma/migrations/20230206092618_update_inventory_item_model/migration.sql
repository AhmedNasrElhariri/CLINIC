-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "alertNumberOfUnits" INTEGER,
ADD COLUMN     "sellable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sellingPrice" INTEGER;
