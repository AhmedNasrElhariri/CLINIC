/*
  Warnings:

  - The values [accept,reject] on the enum `subInventoryOperation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "subInventoryOperation_new" AS ENUM ('accepted', 'rejected');
ALTER TABLE "InventoryHistory" ALTER COLUMN "subOperation" TYPE "subInventoryOperation_new" USING ("subOperation"::text::"subInventoryOperation_new");
ALTER TYPE "subInventoryOperation" RENAME TO "subInventoryOperation_old";
ALTER TYPE "subInventoryOperation_new" RENAME TO "subInventoryOperation";
DROP TYPE "subInventoryOperation_old";
COMMIT;

-- AlterTable
ALTER TABLE "InventoryItemConsumption" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
