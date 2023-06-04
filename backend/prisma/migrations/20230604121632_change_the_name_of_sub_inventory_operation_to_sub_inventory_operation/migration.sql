/*
  Warnings:

  - The `subOperation` column on the `InventoryHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubInventoryOperation" AS ENUM ('accepted', 'rejected');

-- AlterTable
ALTER TABLE "InventoryHistory" DROP COLUMN "subOperation",
ADD COLUMN     "subOperation" "SubInventoryOperation";

-- DropEnum
DROP TYPE "subInventoryOperation";
